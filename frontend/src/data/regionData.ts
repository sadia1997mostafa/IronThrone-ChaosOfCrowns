import type { RegionId } from '@/assets/mapPaths'

export type RegionInfo = {
  name: string
  house: string
  army: number
  resources: string[]
  description: string
}

export const regionData: Record<RegionId, RegionInfo> = {
  north: {
    name: 'The North',
    house: 'House Stark',
    army: 85,
    resources: ['Timber', 'Food', 'Defensive terrain'],
    description: 'A vast, cold, ancient land ruled by House Stark.',
  },
  vale: {
    name: 'The Vale',
    house: 'House Stark',
    army: 62,
    resources: ['Mountain passes', 'Silver', 'Fortified castles'],
    description: 'A defensible highland realm protected by steep mountains and narrow routes.',
  },
  riverlands: {
    name: 'Riverlands',
    house: 'House Tyrell',
    army: 68,
    resources: ['River trade', 'Farmland', 'Crossing routes'],
    description: 'A contested crossroads region where logistics and river control decide wars.',
  },
  westerlands: {
    name: 'The Westerlands',
    house: 'House Lannister',
    army: 74,
    resources: ['Gold mines', 'Smithies', 'Trade wealth'],
    description: 'A wealthy western power base driven by mines, ports, and heavy industry.',
  },
  reach: {
    name: 'The Reach',
    house: 'House Tyrell',
    army: 79,
    resources: ['Grain', 'Vineyards', 'Population'],
    description: 'The breadbasket of the realm with rich fields and large manpower reserves.',
  },
  stormlands: {
    name: 'Stormlands',
    house: 'House Targaryen',
    army: 66,
    resources: ['Ship timber', 'Coastal forts', 'War ports'],
    description: 'A rugged coast forged by storms, strong fleets, and hard veteran troops.',
  },
  dorne: {
    name: 'Dorne',
    house: 'House Targaryen',
    army: 58,
    resources: ['Sunspear trade', 'Spices', 'Desert tactics'],
    description: 'A hot southern dominion known for mobility, attrition warfare, and resilience.',
  },
  iron_islands: {
    name: 'Iron Islands',
    house: 'House Lannister',
    army: 54,
    resources: ['Raider fleets', 'Ironworks', 'Naval leverage'],
    description: 'A maritime stronghold that projects influence through aggressive naval raids.',
  },
  essos: {
    name: 'Essos',
    house: 'House Targaryen',
    army: 71,
    resources: ['City-state alliances', 'Trade routes', 'Mercenary companies'],
    description: 'A vast eastern continent where wealth, fleets, and hired blades shape power.',
  },
  braavos: {
    name: 'Braavos',
    house: 'House Targaryen',
    army: 60,
    resources: ['Banking power', 'Mercenaries', 'Sea commerce'],
    description: 'A wealthy eastern city-state whose coin and contracts can shape entire wars.',
  },
}
