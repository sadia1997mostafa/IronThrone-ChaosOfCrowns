import type { RegionId } from '@/assets/mapPaths'
import type { AIInputState, AIDecision, AIDecisionTrace, CandidateAction, StrategicMetrics } from './types'
import { evaluateFuzzyStrategic } from './fuzzyLogic'
import { scoreCandidatesMinimax } from './minimax'
import { simulateBattleMonteCarlo } from './monteCarlo'

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function buildStrategicMetrics(input: AIInputState): StrategicMetrics {
  const { house, regions, availableRegionIds, diplomacy, resources } = input
  const controlled = availableRegionIds.filter((id) => regions[id].houseId === house)

  const ownArmyTotal = controlled.reduce((sum, id) => sum + regions[id].army, 0)
  const ownArmyPower = clamp((ownArmyTotal / Math.max(1, controlled.length * 95)) * 100, 0, 100)

  const hostileBorders = controlled.flatMap((id) =>
    regions[id].neighbors.filter((neighborId) => {
      const owner = regions[neighborId].houseId
      if (owner === 'neutral' || owner === house) return false
      return diplomacy[house][owner] === 'hostile'
    })
  )

  const borderThreat = clamp(hostileBorders.length * 18, 0, 100)

  const weakTargets = controlled.flatMap((id) =>
    regions[id].neighbors.filter((neighborId) => {
      const n = regions[neighborId]
      if (n.houseId === house) return false
      return n.army + n.defense <= regions[id].army + 14
    })
  )

  const enemyWeakness = clamp(weakTargets.length * 16, 0, 100)

  const neutralTargets = controlled.flatMap((id) =>
    regions[id].neighbors.filter((neighborId) => regions[neighborId].houseId === 'neutral')
  )
  const neutralOpportunity = clamp(neutralTargets.length * 20, 0, 100)

  const avgTargetValue = controlled.length
    ? controlled
        .flatMap((id) => regions[id].neighbors)
        .reduce((acc, targetId) => {
          const target = regions[targetId]
          return acc + (target.resources.length * 10 + target.defense * 0.8)
        }, 0) / controlled.length
    : 0

  const targetValue = clamp(avgTargetValue / 2.2, 0, 100)
  const goldPressure = clamp(100 - resources.gold / 7, 0, 100)

  return {
    ownArmyPower,
    enemyWeakness,
    goldPressure,
    borderThreat,
    neutralOpportunity,
    targetValue,
    dragonStamina: 62,
  }
}

function buildCandidates(input: AIInputState): CandidateAction[] {
  const { house, regions, availableRegionIds, diplomacy } = input
  const controlled = availableRegionIds.filter((id) => regions[id].houseId === house)
  const candidates: CandidateAction[] = []

  for (const regionId of controlled) {
    const territory = regions[regionId]
    candidates.push({
      key: `recruit-${regionId}`,
      action: 'recruit',
      regionId,
      label: `Recruit in ${territory.name}`,
      score: Math.max(0, 90 - territory.army),
    })

    candidates.push({
      key: `fortify-${regionId}`,
      action: 'fortify',
      regionId,
      label: `Fortify ${territory.name}`,
      score: territory.defense < 28 ? 56 + (28 - territory.defense) : 28,
    })

    candidates.push({
      key: `gather-${regionId}`,
      action: 'gather',
      regionId,
      label: `Gather in ${territory.name}`,
      score: territory.resources.length * 14,
    })

    for (const targetId of territory.neighbors) {
      const target = regions[targetId]
      if (target.houseId === house) continue
      if (target.houseId !== 'neutral' && diplomacy[house][target.houseId] !== 'hostile') continue

      const attackPower = territory.army
      const defensePower = target.army + target.defense
      candidates.push({
        key: `attack-${regionId}-${targetId}`,
        action: 'attack',
        sourceId: regionId,
        targetId,
        label: `Attack ${target.name} from ${territory.name}`,
        score: attackPower - defensePower,
        metadata: {
          attackPower,
          defensePower,
        },
      })
    }
  }

  return candidates
}

function toDecision(
  best: CandidateAction,
  reason: string,
  trace: AIDecisionTrace
): AIDecision {
  if (best.action === 'attack' && best.sourceId && best.targetId) {
    return {
      action: 'attack',
      sourceId: best.sourceId,
      targetId: best.targetId,
      reason,
      trace,
    }
  }

  if (best.action === 'fortify' && best.regionId) {
    return {
      action: 'fortify',
      regionId: best.regionId,
      reason,
      trace,
    }
  }

  if (best.action === 'recruit' && best.regionId) {
    return {
      action: 'recruit',
      regionId: best.regionId,
      reason,
      trace,
    }
  }

  if (best.regionId) {
    return {
      action: 'gather',
      regionId: best.regionId,
      reason,
      trace,
    }
  }

  throw new Error('Invalid AI decision candidate')
}

export function pickAIDecision(input: AIInputState): AIDecision | null {
  const { house, regions } = input
  const candidates = buildCandidates(input)
  if (candidates.length === 0) return null

  const metrics = buildStrategicMetrics(input)
  const strategic = evaluateFuzzyStrategic(metrics)
  const scoredCandidates = scoreCandidatesMinimax(candidates, strategic)

  let selected = scoredCandidates[0]
  let battlePrediction: AIDecisionTrace['battlePrediction'] = null

  if (selected.action === 'attack' && selected.sourceId && selected.targetId) {
    const prediction = simulateBattleMonteCarlo({
      attacker: regions[selected.sourceId],
      defender: regions[selected.targetId],
    })

    battlePrediction = {
      targetId: selected.targetId,
      targetName: regions[selected.targetId].name,
      winChance: prediction.winChance,
      expectedAttackerLoss: prediction.expectedAttackerLoss,
      expectedDefenderLoss: prediction.expectedDefenderLoss,
      risk: prediction.risk,
    }

    if (prediction.risk === 'High') {
      const fallback = scoredCandidates.find((candidate) => candidate.action !== 'attack')
      if (fallback) selected = fallback
    }
  }

  const reason = `${house} chooses ${selected.label.toLowerCase()} based on strategic pressure and tactical score.`
  const trace: AIDecisionTrace = {
    strategic,
    candidates,
    scoredCandidates,
    battlePrediction,
    finalDecisionLabel: selected.label,
  }

  return toDecision(selected, reason, trace)
}
