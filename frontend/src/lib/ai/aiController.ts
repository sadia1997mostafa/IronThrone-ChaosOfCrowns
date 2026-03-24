import type { RegionId } from '@/assets/mapPaths'
import type { RegionInfo } from '@/data/regionData'
import type { AIInputState, AIDecision, CandidateAction, HouseTraitProfile, PlayableHouseId } from './types'
import { evaluateFuzzyStrategic } from './fuzzyLogic'

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const HOUSE_TRAITS: Record<PlayableHouseId, HouseTraitProfile> = {
  stark: { label: 'House Stark', aggression: 40 },
  lannister: { label: 'House Lannister', aggression: 75 },
  targaryen: { label: 'House Targaryen', aggression: 90 },
  tyrell: { label: 'House Tyrell', aggression: 50 },
}

const REINFORCE_GOLD_COST = 20

const REGION_IMPORTANCE_BONUS: Partial<Record<RegionId, number>> = {
  riverlands: 10,
  reach: 8,
  westerlands: 8,
  essos: 10,
  braavos: 7,
  north: 6,
}

function regionImportanceScore(regionId: RegionId, region: RegionInfo) {
  const base = region.resources.length * 10 + region.defense * 0.7 + region.neighbors.length * 4
  return clamp(base + (REGION_IMPORTANCE_BONUS[regionId] || 0), 0, 100)
}

function buildFrontier(input: AIInputState) {
  const { house, regions, availableRegionIds, diplomacy } = input
  const controlled = availableRegionIds.filter((id) => regions[id].houseId === house)
  const hostileOrNeutralNeighbors = controlled.flatMap((id) =>
    regions[id].neighbors
      .map((neighborId) => ({ sourceId: id, targetId: neighborId }))
      .filter(({ targetId }) => {
        const owner = regions[targetId].houseId
        if (owner === house) return false
        if (owner === 'neutral') return true
        return diplomacy[house][owner] === 'hostile'
      })
  )

  return {
    controlled,
    hostileOrNeutralNeighbors,
  }
}

function buildFuzzyInputs(input: AIInputState) {
  const { house, regions, resources, diplomacy } = input
  const trait = HOUSE_TRAITS[house]
  const { controlled, hostileOrNeutralNeighbors } = buildFrontier(input)

  const ownArmyTotal = controlled.reduce((sum, regionId) => sum + regions[regionId].army, 0)
  const ownStrength = clamp((ownArmyTotal / Math.max(1, controlled.length * 90)) * 100, 0, 100)

  const frontierThreats = hostileOrNeutralNeighbors.map(({ targetId }) => {
    const target = regions[targetId]
    const relationWeight =
      target.houseId === 'neutral' || target.houseId === house ? 1 : diplomacy[house][target.houseId] === 'hostile' ? 1.15 : 1

    // Simple frontier pressure: nearby army plus defense.
    return clamp((target.army + target.defense) * relationWeight, 0, 100)
  })

  const enemyStrength = frontierThreats.length
    ? clamp(frontierThreats.reduce((sum, value) => sum + value, 0) / frontierThreats.length, 0, 100)
    : 25

  const focusTarget = hostileOrNeutralNeighbors
    .map(({ sourceId, targetId }) => ({
      sourceId,
      targetId,
      sourceRegion: regions[sourceId],
      targetRegion: regions[targetId],
      importance: regionImportanceScore(targetId, regions[targetId]),
      attackMargin: regions[sourceId].army - (regions[targetId].army + regions[targetId].defense),
    }))
    .sort((a, b) => b.importance - a.importance || b.attackMargin - a.attackMargin)[0]

  const focusOwnedRegion = controlled
    .map((regionId) => ({
      regionId,
      region: regions[regionId],
      importance: regionImportanceScore(regionId, regions[regionId]),
    }))
    .sort((a, b) => b.importance - a.importance)[0]

  const regionImportance = focusTarget?.importance || focusOwnedRegion?.importance || 50
  const resourceReadiness = clamp((resources.gold / 320) * 100, 0, 100)

  return {
    ownStrength: Math.round(ownStrength * 100) / 100,
    enemyStrength: Math.round(enemyStrength * 100) / 100,
    regionImportance: Math.round(regionImportance * 100) / 100,
    resources: Math.round(resourceReadiness * 100) / 100,
    aggression: trait.aggression,
    focusTarget,
    focusOwnedRegion,
  }
}

export function previewFuzzyInputs(input: AIInputState) {
  const fuzzyInputs = buildFuzzyInputs(input)

  return {
    ownStrength: fuzzyInputs.ownStrength,
    enemyStrength: fuzzyInputs.enemyStrength,
    regionImportance: fuzzyInputs.regionImportance,
    resources: fuzzyInputs.resources,
    aggression: fuzzyInputs.aggression,
  }
}

function buildReason(house: PlayableHouseId, action: CandidateAction['action'], focusName: string | null) {
  const houseLabel = HOUSE_TRAITS[house].label

  if (action === 'attack') {
    return `${houseLabel} intends to attack${focusName ? ` toward ${focusName}` : ''} because its attack desire is strongest this turn.`
  }

  if (action === 'defend') {
    return `${houseLabel} intends to defend${focusName ? ` around ${focusName}` : ''} because enemy pressure outweighs expansion.`
  }

  if (action === 'reinforce') {
    return `${houseLabel} intends to reinforce${focusName ? ` near ${focusName}` : ''} because strength or supplies need improvement first.`
  }

  return `${houseLabel} holds position${focusName ? ` around ${focusName}` : ''} while conditions remain balanced.`
}

export function pickAIDecision(input: AIInputState): AIDecision | null {
  const { controlled } = buildFrontier(input)
  if (controlled.length === 0) return null

  const fuzzyInputs = buildFuzzyInputs(input)
  const evaluation = evaluateFuzzyStrategic({
    ownStrength: fuzzyInputs.ownStrength,
    enemyStrength: fuzzyInputs.enemyStrength,
    regionImportance: fuzzyInputs.regionImportance,
    resources: fuzzyInputs.resources,
    aggression: fuzzyInputs.aggression,
  })

  const affordableCandidates = evaluation.candidates.filter((candidate) => {
    if (candidate.action !== 'reinforce') return true
    return input.resources.gold >= REINFORCE_GOLD_COST
  })

  const selected = affordableCandidates[0] || evaluation.candidates[0]
  const focusRegionId = fuzzyInputs.focusOwnedRegion?.regionId || fuzzyInputs.focusTarget?.sourceId || null
  const focusRegionName = focusRegionId ? input.regions[focusRegionId].name : null
  const targetRegionId = selected.action === 'attack' ? fuzzyInputs.focusTarget?.targetId || null : null
  const targetRegionName = targetRegionId ? input.regions[targetRegionId].name : null
  const finalDecisionLabel =
    selected.action === 'attack' && targetRegionName
      ? `Attack ${targetRegionName}`
      : selected.action === 'defend' && focusRegionName
        ? `Defend ${focusRegionName}`
        : selected.action === 'reinforce' && focusRegionName
          ? `Reinforce ${focusRegionName}`
          : focusRegionName
            ? `Hold ${focusRegionName}`
            : selected.label

  return {
    action: selected.action,
    regionId: focusRegionId,
    targetId: targetRegionId,
    reason: buildReason(input.house, selected.action, targetRegionName || focusRegionName),
    trace: {
      inputs: {
        ownStrength: fuzzyInputs.ownStrength,
        enemyStrength: fuzzyInputs.enemyStrength,
        regionImportance: fuzzyInputs.regionImportance,
        resources: fuzzyInputs.resources,
        aggression: fuzzyInputs.aggression,
      },
      memberships: evaluation.memberships,
      strategic: evaluation.strategic,
      candidates: evaluation.candidates,
      rules: evaluation.rules,
      ruleCalculations: evaluation.ruleCalculations,
      actionBreakdown: evaluation.actionBreakdown,
      focusRegionId,
      focusRegionName,
      targetRegionId,
      targetRegionName,
      finalDecisionLabel,
    },
  }
}
