import type { RegionId } from '@/assets/mapPaths'
import type { AIActionType, AIInputState, MCTSPlanningTrace, PlayableHouseId } from './types'

type StrategicRegion = {
  houseId: AIInputState['house']
  army: number
  defense: number
  neighbors: RegionId[]
  resources: string[]
  name: string
}

type StrategicState = {
  house: PlayableHouseId
  regions: Record<RegionId, StrategicRegion>
  resources: AIInputState['resources']
}

type PlannerCandidate = {
  label: string
  regionId: RegionId | null
  targetId: RegionId | null
}

type PlannerResult = {
  regionId: RegionId | null
  targetId: RegionId | null
  trace: MCTSPlanningTrace
}

const MCTS_ITERATIONS = 28
const MCTS_ROLLOUT_DEPTH = 3
const MCTS_EXPLORATION = 1.25

const REINFORCE_GOLD_COST = 20
const HOLD_ARMY_BONUS = 4
const HOLD_GOLD_BONUS = 10
const HOLD_FOOD_BONUS = 12
const HOLD_INFLUENCE_BONUS = 4
const DEFEND_DEFENSE_BONUS = 2
const REINFORCE_ARMY_BONUS = 10

const REGION_IMPORTANCE_BONUS: Partial<Record<RegionId, number>> = {
  riverlands: 10,
  reach: 8,
  westerlands: 8,
  essos: 10,
  north: 6,
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

function regionImportanceScore(regionId: RegionId, region: StrategicRegion) {
  const base = region.resources.length * 10 + region.defense * 0.7 + region.neighbors.length * 4
  return clamp(base + (REGION_IMPORTANCE_BONUS[regionId] || 0), 0, 100)
}

function hashString(value: string) {
  let hash = 2166136261

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }

  return hash >>> 0
}

function createSeededRandom(seed: number) {
  let value = seed >>> 0

  return () => {
    value += 0x6d2b79f5
    let temp = value
    temp = Math.imul(temp ^ (temp >>> 15), temp | 1)
    temp ^= temp + Math.imul(temp ^ (temp >>> 7), temp | 61)
    return ((temp ^ (temp >>> 14)) >>> 0) / 4294967296
  }
}

function cloneState(input: AIInputState): StrategicState {
  const nextRegions = {} as StrategicState['regions']

  for (const regionId of input.availableRegionIds) {
    const region = input.regions[regionId]
    nextRegions[regionId] = {
      houseId: region.houseId as StrategicRegion['houseId'],
      army: region.army,
      defense: region.defense,
      neighbors: [...region.neighbors],
      resources: [...region.resources],
      name: region.name,
    }
  }

  return {
    house: input.house,
    regions: nextRegions,
    resources: { ...input.resources },
  }
}

function controlledRegions(state: StrategicState) {
  return (Object.keys(state.regions) as RegionId[]).filter((regionId) => state.regions[regionId].houseId === state.house)
}

function hostileNeighbors(state: StrategicState, input: AIInputState) {
  return controlledRegions(state).flatMap((sourceId) =>
    state.regions[sourceId].neighbors
      .map((targetId) => ({ sourceId, targetId }))
      .filter(({ targetId }) => {
        const owner = state.regions[targetId].houseId
        if (owner === state.house) return false
        return input.diplomacy[state.house][owner] === 'hostile'
      })
  )
}

function buildCandidates(action: AIActionType, state: StrategicState, input: AIInputState): PlannerCandidate[] {
  if (action === 'attack') {
    return hostileNeighbors(state, input).map(({ sourceId, targetId }) => ({
      label: `${state.regions[sourceId].name} -> ${state.regions[targetId].name}`,
      regionId: sourceId,
      targetId,
    }))
  }

  return controlledRegions(state).map((regionId) => ({
    label: state.regions[regionId].name,
    regionId,
    targetId: null,
  }))
}

function attackAdvantage(state: StrategicState, sourceId: RegionId, targetId: RegionId) {
  return state.regions[sourceId].army - (state.regions[targetId].army + state.regions[targetId].defense)
}

function candidateHeuristic(action: AIActionType, candidate: PlannerCandidate, state: StrategicState, input: AIInputState) {
  if (!candidate.regionId) return -9999

  const region = state.regions[candidate.regionId]

  if (action === 'attack' && candidate.targetId) {
    const target = state.regions[candidate.targetId]
    const importance = regionImportanceScore(candidate.targetId, target)
    const margin = attackAdvantage(state, candidate.regionId, candidate.targetId)
    const expansion = target.neighbors.filter((neighborId) => state.regions[neighborId].houseId !== state.house).length

    return importance * 2.4 + margin * 1.8 + expansion * 7 - target.defense * 2.2
  }

  if (action === 'defend') {
    const nearbyThreat = region.neighbors.reduce((sum, neighborId) => {
      const neighbor = state.regions[neighborId]
      if (neighbor.houseId === state.house) return sum
      return sum + neighbor.army + neighbor.defense
    }, 0)

    return regionImportanceScore(candidate.regionId, region) * 2 + nearbyThreat * 0.65 - region.defense * 3
  }

  if (action === 'reinforce') {
    const frontlinePressure = region.neighbors.reduce((sum, neighborId) => {
      const neighbor = state.regions[neighborId]
      if (neighbor.houseId === state.house) return sum
      return sum + neighbor.army
    }, 0)

    return frontlinePressure * 0.7 + regionImportanceScore(candidate.regionId, region) * 1.8 - region.army * 0.55
  }

  return regionImportanceScore(candidate.regionId, region) * 1.7 + region.neighbors.length * 5 - region.army * 0.15
}

function applyCandidate(action: AIActionType, candidate: PlannerCandidate, state: StrategicState) {
  const nextState: StrategicState = {
    house: state.house,
    regions: Object.fromEntries(
      (Object.keys(state.regions) as RegionId[]).map((regionId) => [
        regionId,
        {
          ...state.regions[regionId],
          neighbors: [...state.regions[regionId].neighbors],
          resources: [...state.regions[regionId].resources],
        },
      ])
    ) as StrategicState['regions'],
    resources: { ...state.resources },
  }

  if (!candidate.regionId) return nextState

  if (action === 'attack' && candidate.targetId) {
    const source = nextState.regions[candidate.regionId]
    const target = nextState.regions[candidate.targetId]
    const margin = source.army - (target.army + target.defense)
    const attackerLossRate = margin >= 0 ? 0.16 : 0.27
    const defenderLossRate = margin >= 0 ? 0.38 : 0.14
    const attackerAfter = Math.max(1, source.army - Math.round(source.army * attackerLossRate))
    const defenderAfter = Math.max(0, target.army - Math.round(target.army * defenderLossRate))

    if (margin >= 0 || defenderAfter <= Math.max(6, Math.round(target.army * 0.4))) {
      const occupyingArmy = Math.max(1, Math.round(attackerAfter * 0.45))
      source.army = Math.max(1, attackerAfter - occupyingArmy)
      target.houseId = state.house
      target.army = occupyingArmy
      nextState.resources.gold += target.resources.length * 4
      nextState.resources.influence += 3
    } else {
      source.army = attackerAfter
      target.army = Math.max(1, defenderAfter)
    }

    return nextState
  }

  if (action === 'defend') {
    nextState.regions[candidate.regionId].defense += DEFEND_DEFENSE_BONUS
    nextState.regions[candidate.regionId].army += 1
    nextState.resources.influence += 2
    return nextState
  }

  if (action === 'reinforce') {
    if (nextState.resources.gold >= REINFORCE_GOLD_COST) {
      nextState.resources.gold -= REINFORCE_GOLD_COST
      nextState.regions[candidate.regionId].army += REINFORCE_ARMY_BONUS
    } else {
      nextState.regions[candidate.regionId].army += Math.max(2, Math.round(REINFORCE_ARMY_BONUS * 0.4))
    }
    return nextState
  }

  nextState.regions[candidate.regionId].army += HOLD_ARMY_BONUS
  nextState.resources.gold += HOLD_GOLD_BONUS
  nextState.resources.food += HOLD_FOOD_BONUS
  nextState.resources.influence += HOLD_INFLUENCE_BONUS
  return nextState
}

function evaluateStrategicState(state: StrategicState, input: AIInputState) {
  const controlled = controlledRegions(state)
  const regionCount = controlled.length
  const armyTotal = controlled.reduce((sum, regionId) => sum + state.regions[regionId].army, 0)
  const defenseTotal = controlled.reduce((sum, regionId) => sum + state.regions[regionId].defense, 0)
  const contestedFrontier = hostileNeighbors(state, input)
  const frontierAdvantage = contestedFrontier.reduce(
    (sum, { sourceId, targetId }) => sum + attackAdvantage(state, sourceId, targetId),
    0
  )

  return regionCount * 120 + armyTotal * 1.8 + defenseTotal * 1.1 + state.resources.gold * 0.7 + state.resources.influence * 0.45 + frontierAdvantage * 0.35
}

function rolloutActionWeights(state: StrategicState, input: AIInputState) {
  const controlled = controlledRegions(state)
  const hostile = hostileNeighbors(state, input)
  const ownArmy = controlled.reduce((sum, regionId) => sum + state.regions[regionId].army, 0)
  const threat = hostile.reduce((sum, { targetId }) => sum + state.regions[targetId].army + state.regions[targetId].defense, 0)
  const averageOwnArmy = controlled.length ? ownArmy / controlled.length : 0

  return {
    attack: hostile.length ? Math.max(12, 28 + averageOwnArmy * 0.35 - threat * 0.08) : 0,
    defend: hostile.length ? Math.max(10, 16 + threat * 0.09) : 6,
    reinforce: Math.max(8, state.resources.gold >= REINFORCE_GOLD_COST ? 18 : 10),
    hold: Math.max(6, 10 + state.resources.gold * 0.03),
  }
}

function pickWeightedAction(random: () => number, weights: Record<AIActionType, number>) {
  const total = Object.values(weights).reduce((sum, value) => sum + value, 0)
  if (total <= 0) return 'hold' as AIActionType

  let threshold = random() * total

  for (const action of ['attack', 'defend', 'reinforce', 'hold'] as AIActionType[]) {
    threshold -= weights[action]
    if (threshold <= 0) return action
  }

  return 'hold'
}

function pickWeightedCandidate(
  action: AIActionType,
  candidates: PlannerCandidate[],
  state: StrategicState,
  input: AIInputState,
  random: () => number
) {
  const scored = candidates.map((candidate) => ({
    candidate,
    score: Math.max(1, candidateHeuristic(action, candidate, state, input) + 120),
  }))
  const total = scored.reduce((sum, entry) => sum + entry.score, 0)
  let threshold = random() * total

  for (const entry of scored) {
    threshold -= entry.score
    if (threshold <= 0) return entry.candidate
  }

  return scored[scored.length - 1]?.candidate ?? candidates[0]
}

function rollout(state: StrategicState, input: AIInputState, random: () => number) {
  let currentState = state

  for (let depth = 0; depth < MCTS_ROLLOUT_DEPTH; depth += 1) {
    const weights = rolloutActionWeights(currentState, input)
    const action = pickWeightedAction(random, weights)
    const candidates = buildCandidates(action, currentState, input)

    if (candidates.length === 0) {
      currentState = applyCandidate('hold', { label: 'Fallback Hold', regionId: controlledRegions(currentState)[0] ?? null, targetId: null }, currentState)
      continue
    }

    const chosenCandidate = pickWeightedCandidate(action, candidates, currentState, input, random)
    currentState = applyCandidate(action, chosenCandidate, currentState)
  }

  return evaluateStrategicState(currentState, input)
}

export function planWithMCTS(input: AIInputState, action: AIActionType): PlannerResult | null {
  const initialState = cloneState(input)
  const rootCandidates = buildCandidates(action, initialState, input)

  if (rootCandidates.length === 0) return null

  const seedSource = [
    input.house,
    action,
    input.resources.gold,
    input.resources.food,
    input.resources.influence,
    ...input.availableRegionIds.map((regionId) => `${regionId}:${input.regions[regionId].houseId}:${input.regions[regionId].army}:${input.regions[regionId].defense}`),
  ].join('|')
  const random = createSeededRandom(hashString(seedSource))

  const stats = rootCandidates.map((candidate) => ({
    candidate,
    visits: 0,
    totalScore: 0,
  }))

  for (let iteration = 0; iteration < MCTS_ITERATIONS; iteration += 1) {
    let selected = stats.find((entry) => entry.visits === 0)

    if (!selected) {
      const totalVisits = stats.reduce((sum, entry) => sum + entry.visits, 0)
      selected = stats.reduce((best, current) => {
        const currentAverage = current.totalScore / current.visits
        const currentUct = currentAverage + MCTS_EXPLORATION * Math.sqrt(Math.log(totalVisits) / current.visits)

        if (!best) return current

        const bestAverage = best.totalScore / best.visits
        const bestUct = bestAverage + MCTS_EXPLORATION * Math.sqrt(Math.log(totalVisits) / best.visits)
        return currentUct > bestUct ? current : best
      }, undefined as ((typeof stats)[number] | undefined))
    }

    if (!selected) continue

    const expandedState = applyCandidate(action, selected.candidate, initialState)
    const score = rollout(expandedState, input, random)
    selected.visits += 1
    selected.totalScore += score
  }

  const best = stats.reduce((currentBest, entry) => {
    if (!currentBest) return entry
    const currentAverage = entry.totalScore / Math.max(1, entry.visits)
    const bestAverage = currentBest.totalScore / Math.max(1, currentBest.visits)
    return currentAverage > bestAverage ? entry : currentBest
  }, null as (typeof stats)[number] | null)

  if (!best) return null

  return {
    regionId: best.candidate.regionId,
    targetId: best.candidate.targetId,
    trace: {
      iterations: MCTS_ITERATIONS,
      rolloutDepth: MCTS_ROLLOUT_DEPTH,
      selectedLabel: best.candidate.label,
      candidates: stats
        .map((entry) => ({
          label: entry.candidate.label,
          regionId: entry.candidate.regionId,
          regionName: entry.candidate.regionId ? input.regions[entry.candidate.regionId].name : null,
          targetId: entry.candidate.targetId,
          targetName: entry.candidate.targetId ? input.regions[entry.candidate.targetId].name : null,
          visits: entry.visits,
          averageScore: Math.round((entry.totalScore / Math.max(1, entry.visits)) * 100) / 100,
          chosen: entry.candidate.label === best.candidate.label,
        }))
        .sort((a, b) => b.averageScore - a.averageScore),
    },
  }
}
