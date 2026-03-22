import type { HouseId } from '@/data/regionData'

type PlayableHouseId = Exclude<HouseId, 'neutral'>

export type RelationState = 'allied' | 'neutral' | 'hostile'
export type DiplomacyMatrix = Record<PlayableHouseId, Record<PlayableHouseId, RelationState>>

export const PLAYABLE_HOUSES: PlayableHouseId[] = ['stark', 'lannister', 'tyrell', 'targaryen']

export function createInitialDiplomacy(): DiplomacyMatrix {
  const matrix = {} as DiplomacyMatrix

  for (const house of PLAYABLE_HOUSES) {
    matrix[house] = {} as Record<PlayableHouseId, RelationState>
    for (const other of PLAYABLE_HOUSES) {
      if (house === other) {
        matrix[house][other] = 'allied'
      } else {
        matrix[house][other] = 'hostile'
      }
    }
  }

  return matrix
}
