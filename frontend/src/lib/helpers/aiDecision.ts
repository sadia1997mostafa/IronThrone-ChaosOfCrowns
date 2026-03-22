import type { RegionId } from '@/assets/mapPaths'
import type { HouseId, RegionInfo } from '@/data/regionData'

type PlayableHouseId = Exclude<HouseId, 'neutral'>

export type AIDecision =
  | { action: 'gather'; regionId: RegionId; reason: string }
  | { action: 'recruit'; regionId: RegionId; reason: string }
  | { action: 'fortify'; regionId: RegionId; reason: string }
  | { action: 'attack'; sourceId: RegionId; targetId: RegionId; reason: string }

const randomItem = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)]

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

  const lowArmyRegion = controlled.find((id) => regions[id].army <= 45)
  if (gold < 180) {
    return {
      action: 'gather',
      regionId: randomItem(controlled),
      reason: `${house} gathers resources due to low gold reserves.`,
    }
  }

  if (lowArmyRegion) {
    return {
      action: 'recruit',
      regionId: lowArmyRegion,
      reason: `${house} recruits to reinforce a weak garrison.`,
    }
  }

  const threatened = controlled.find((id) =>
    regions[id].neighbors.some((neighborId) => {
      const neighborOwner = regions[neighborId].houseId
      if (neighborOwner === house || neighborOwner === 'neutral') return false
      return diplomacy[house][neighborOwner] === 'hostile'
    })
  )

  if (threatened && Math.random() < 0.55) {
    return {
      action: 'fortify',
      regionId: threatened,
      reason: `${house} fortifies a threatened border region.`,
    }
  }

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

  if (attacks.length > 0) {
    attacks.sort((a, b) => b.score - a.score)
    const best = attacks[0]
    if (best.score > -8 || Math.random() < 0.4) {
      return {
        action: 'attack',
        sourceId: best.sourceId,
        targetId: best.targetId,
        reason: `${house} attacks a weaker neighboring region.`,
      }
    }
  }

  return {
    action: 'gather',
    regionId: randomItem(controlled),
    reason: `${house} consolidates economy before next engagement.`,
  }
}
