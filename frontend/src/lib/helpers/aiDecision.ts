import type { RegionId } from '@/assets/mapPaths'
import type { HouseId, RegionInfo } from '@/data/regionData'
import { evaluateFuzzyStrategic } from '@/lib/ai/fuzzyLogic'
import type { FuzzyStrategicOutput, StrategicMetrics } from '@/lib/ai/types'

type PlayableHouseId = Exclude<HouseId, 'neutral'>

export type AIFuzzySnapshot = FuzzyStrategicOutput

export type AIDecision =
  | { action: 'gather'; regionId: RegionId; reason: string; fuzzy: AIFuzzySnapshot }
  | { action: 'recruit'; regionId: RegionId; reason: string; fuzzy: AIFuzzySnapshot }
  | { action: 'fortify'; regionId: RegionId; reason: string; fuzzy: AIFuzzySnapshot }
  | { action: 'attack'; sourceId: RegionId; targetId: RegionId; reason: string; fuzzy: AIFuzzySnapshot }

const randomItem = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)]

function buildStrategicMetrics(input: {
  house: PlayableHouseId
  regions: Record<RegionId, RegionInfo>
  availableRegionIds: RegionId[]
  diplomacy: Record<PlayableHouseId, Record<PlayableHouseId, 'allied' | 'neutral' | 'hostile'>>
  gold: number
}): StrategicMetrics {
  const { house, regions, availableRegionIds, diplomacy, gold } = input

  const controlled = availableRegionIds.filter((id) => regions[id].houseId === house)
  const ownArmyTotal = controlled.reduce((sum, id) => sum + regions[id].army, 0)
  const ownArmyPower = Math.min(100, Math.max(0, (ownArmyTotal / Math.max(1, controlled.length * 90)) * 100))

  const hostileBorders = controlled.flatMap((id) =>
    regions[id].neighbors.filter((neighborId) => {
      const owner = regions[neighborId].houseId
      if (owner === 'neutral' || owner === house) return false
      return diplomacy[house][owner] === 'hostile'
    })
  )

  const borderThreat = Math.min(100, hostileBorders.length * 18)

  const weakTargets = controlled.flatMap((id) =>
    regions[id].neighbors.filter((neighborId) => {
      const target = regions[neighborId]
      return target.houseId !== house && regions[id].army > target.army + target.defense
    })
  )
  const enemyWeakness = Math.min(100, weakTargets.length * 17)

  const neutralTargets = controlled.flatMap((id) =>
    regions[id].neighbors.filter((neighborId) => regions[neighborId].houseId === 'neutral')
  )
  const neutralOpportunity = Math.min(100, neutralTargets.length * 20)

  const avgTargetValue = controlled.length
    ? controlled
        .flatMap((id) => regions[id].neighbors)
        .reduce((sum, targetId) => {
          const target = regions[targetId]
          return sum + target.resources.length * 12 + target.defense
        }, 0) / controlled.length
    : 0
  const targetValue = Math.min(100, avgTargetValue / 2)

  const goldPressure = Math.min(100, Math.max(0, 100 - gold / 7))

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

export function pickAIDecision(input: {
  house: PlayableHouseId
  regions: Record<RegionId, RegionInfo>
  availableRegionIds: RegionId[]
  diplomacy: Record<PlayableHouseId, Record<PlayableHouseId, 'allied' | 'neutral' | 'hostile'>>
  gold: number
}): AIDecision | null {
  const { house, regions, availableRegionIds, diplomacy, gold } = input

  const controlled = availableRegionIds.filter((id) => regions[id].houseId === house)
  if (controlled.length === 0) return null

  const metrics = buildStrategicMetrics(input)
  const fuzzy = evaluateFuzzyStrategic(metrics)

  const attacks: Array<{ sourceId: RegionId; targetId: RegionId; score: number }> = []
  for (const sourceId of controlled) {
    const source = regions[sourceId]
    for (const targetId of source.neighbors) {
      const target = regions[targetId]
      if (target.houseId === house) continue
      if (target.houseId !== 'neutral' && diplomacy[house][target.houseId] !== 'hostile') continue

      const score = source.army - target.army - target.defense
      attacks.push({ sourceId, targetId, score })
    }
  }

  attacks.sort((a, b) => b.score - a.score)

  if (fuzzy.attackDesire >= Math.max(fuzzy.fortifyDesire, fuzzy.recruitDesire, fuzzy.gatherDesire) && attacks.length > 0) {
    const best = attacks[0]
    return {
      action: 'attack',
      sourceId: best.sourceId,
      targetId: best.targetId,
      reason: `${house} attack desire is highest (${Math.round(fuzzy.attackDesire)}), targeting weakest viable border.`,
      fuzzy,
    }
  }

  const lowArmyRegion = controlled.find((id) => regions[id].army <= 45)
  if (fuzzy.gatherDesire >= Math.max(fuzzy.fortifyDesire, fuzzy.recruitDesire) && gold < 220) {
    return {
      action: 'gather',
      regionId: randomItem(controlled),
      reason: `${house} economy pressure is ${fuzzy.economyPressure}; gathering resources.`,
      fuzzy,
    }
  }

  if (fuzzy.recruitDesire >= fuzzy.fortifyDesire && lowArmyRegion) {
    return {
      action: 'recruit',
      regionId: lowArmyRegion,
      reason: `${house} recruitment desire is high (${Math.round(fuzzy.recruitDesire)}), reinforcing weak garrison.`,
      fuzzy,
    }
  }

  const threatened = controlled
    .filter((id) =>
    regions[id].neighbors.some((neighborId) => {
      const neighborOwner = regions[neighborId].houseId
      if (neighborOwner === house || neighborOwner === 'neutral') return false
      return diplomacy[house][neighborOwner] === 'hostile'
    })
    )
    .sort((a, b) => regions[a].defense - regions[b].defense)[0]

  if (threatened && fuzzy.fortifyDesire >= fuzzy.gatherDesire) {
    return {
      action: 'fortify',
      regionId: threatened,
      reason: `${house} border danger is ${fuzzy.borderDanger}; fortifying frontline region.`,
      fuzzy,
    }
  }

  return {
    action: 'gather',
    regionId: randomItem(controlled),
    reason: `${house} defaults to resource consolidation after fuzzy strategic review.`,
    fuzzy,
  }
}
