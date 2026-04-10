import type { RegionId } from '@/assets/mapPaths'

export type HouseId = 'stark' | 'lannister' | 'targaryen' | 'tyrell'

export type RegionInfo = {
  name: string
  houseId: HouseId
  house: string
  army: number
  defense: number
  resources: string[]
  description: string
  tokenPosition: {
    x: number
    y: number
  }
  neighbors: RegionId[]
}

export const regionData = {
  north: {
    name: 'The North',
    houseId: 'stark',
    house: 'House Stark',
    army: 85,
    defense: 24,
    resources: ['Timber', 'Food', 'Defensive terrain'],
    description: 'A vast, cold, ancient land ruled by House Stark.',
    tokenPosition: { x: 470, y: 180 },
    neighbors: ['vale', 'riverlands', 'iron_islands'],
  },
  vale: {
    name: 'The Vale',
    houseId: 'stark',
    house: 'House Stark',
    army: 62,
    defense: 21,
    resources: ['Mountain passes', 'Silver', 'Fortified castles'],
    description: 'A defensible highland realm protected by steep mountains and narrow routes.',
    tokenPosition: { x: 930, y: 360 },
    neighbors: ['north', 'riverlands', 'stormlands'],
  },
  riverlands: {
    name: 'Riverlands',
    houseId: 'lannister',
    house: 'House Lannister',
    army: 68,
    defense: 15,
    resources: ['River trade', 'Farmland', 'Crossing routes'],
    description: 'A contested crossroads region where logistics and river control decide wars.',
    tokenPosition: { x: 650, y: 430 },
    neighbors: ['north', 'vale', 'westerlands', 'reach', 'stormlands'],
  },
  westerlands: {
    name: 'The Westerlands',
    houseId: 'lannister',
    house: 'House Lannister',
    army: 74,
    defense: 22,
    resources: ['Gold mines', 'Smithies', 'Trade wealth'],
    description: 'A wealthy western power base driven by mines, ports, and heavy industry.',
    tokenPosition: { x: 360, y: 560 },
    neighbors: ['riverlands', 'reach', 'iron_islands'],
  },
  reach: {
    name: 'The Reach',
    houseId: 'tyrell',
    house: 'House Tyrell',
    army: 79,
    defense: 18,
    resources: ['Grain', 'Vineyards', 'Population'],
    description: 'The breadbasket of the realm with rich fields and large manpower reserves.',
    tokenPosition: { x: 700, y: 760 },
    neighbors: ['westerlands', 'riverlands', 'stormlands', 'dorne'],
  },
  stormlands: {
    name: 'Stormlands',
    houseId: 'tyrell',
    house: 'House Tyrell',
    army: 66,
    defense: 19,
    resources: ['Ship timber', 'Coastal forts', 'War ports'],
    description: 'A rugged coast forged by storms, strong fleets, and hard veteran troops.',
    tokenPosition: { x: 1040, y: 610 },
    neighbors: ['reach', 'riverlands', 'dorne', 'vale'],
  },
  dorne: {
    name: 'Dorne',
    houseId: 'targaryen',
    house: 'House Targaryen',
    army: 58,
    defense: 17,
    resources: ['Sunspear trade', 'Spices', 'Desert tactics'],
    description: 'A hot southern dominion known for mobility, attrition warfare, and resilience.',
    tokenPosition: { x: 1030, y: 860 },
    neighbors: ['reach', 'stormlands'],
  },
  iron_islands: {
    name: 'Iron Islands',
    houseId: 'targaryen',
    house: 'House Targaryen',
    army: 54,
    defense: 13,
    resources: ['Raider fleets', 'Ironworks', 'Naval leverage'],
    description: 'A maritime stronghold that projects influence through aggressive naval raids.',
    tokenPosition: { x: 220, y: 360 },
    neighbors: ['north', 'riverlands', 'westerlands'],
  },
} as Record<RegionId, RegionInfo>
