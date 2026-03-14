export type HouseOwner = 'stark' | 'lannister' | 'targaryen' | 'tyrell' | 'neutral'

export type Territory = {
  id: string
  name: string
  owner: HouseOwner
  army: number
  morale: number
  defense: number
  resourceValue: number
  neighbors: string[]
  isCapital?: boolean
  recentEvent?: string
  x?: number
  y?: number
  path: string
  sigil?: string
}

export type OverlayType =
  | 'attack'
  | 'alliance'
  | 'defend'
  | 'battle'
  | 'recruit'
  | 'dragon'
  | 'burn'
  | 'captured'

export type OverlayEvent = {
  id: string
  type: OverlayType
  from: [number, number]
  to?: [number, number]
  territoryId?: string
  label?: string
}

export type TerrainMarker = {
  id: string
  kind: 'mountain' | 'forest' | 'castle'
  x: number
  y: number
  scale?: number
}

export type RiverPath = {
  id: string
  d: string
}

export const OWNER_META: Record<HouseOwner, { label: string; tint: string; stroke: string; glow: string }> = {
  stark: {
    label: 'House Stark',
    tint: 'rgba(124, 146, 165, 0.64)',
    stroke: 'rgba(185, 204, 220, 0.9)',
    glow: 'rgba(140, 174, 205, 0.55)',
  },
  lannister: {
    label: 'House Lannister',
    tint: 'rgba(165, 116, 61, 0.68)',
    stroke: 'rgba(231, 188, 117, 0.92)',
    glow: 'rgba(227, 176, 90, 0.55)',
  },
  targaryen: {
    label: 'House Targaryen',
    tint: 'rgba(129, 50, 42, 0.72)',
    stroke: 'rgba(218, 115, 94, 0.92)',
    glow: 'rgba(228, 112, 80, 0.58)',
  },
  tyrell: {
    label: 'House Tyrell',
    tint: 'rgba(90, 117, 72, 0.7)',
    stroke: 'rgba(168, 194, 132, 0.9)',
    glow: 'rgba(146, 188, 122, 0.56)',
  },
  neutral: {
    label: 'Crown Stewardship',
    tint: 'rgba(138, 113, 77, 0.56)',
    stroke: 'rgba(210, 180, 135, 0.86)',
    glow: 'rgba(203, 166, 110, 0.45)',
  },
}

export const TERRITORIES: Territory[] = [
  {
    id: 'north',
    name: 'The North',
    owner: 'stark',
    army: 18400,
    morale: 76,
    defense: 71,
    resourceValue: 63,
    neighbors: ['riverlands', 'vale'],
    isCapital: true,
    recentEvent: 'Scouts report White Harbor supply gains.',
    x: 395,
    y: 135,
    sigil: 'Direwolf',
    path: 'M246 58 L411 40 L588 80 L620 190 L554 252 L440 270 L300 236 L226 150 Z',
  },
  {
    id: 'westerlands',
    name: 'Westerlands',
    owner: 'lannister',
    army: 20100,
    morale: 71,
    defense: 79,
    resourceValue: 90,
    neighbors: ['riverlands', 'reach', 'isles'],
    isCapital: true,
    recentEvent: 'Gold convoy secured near Lannisport.',
    x: 232,
    y: 324,
    sigil: 'Lion',
    path: 'M128 250 L268 234 L320 312 L282 418 L182 440 L104 372 Z',
  },
  {
    id: 'riverlands',
    name: 'Riverlands',
    owner: 'neutral',
    army: 9300,
    morale: 58,
    defense: 49,
    resourceValue: 68,
    neighbors: ['north', 'westerlands', 'crownlands', 'reach', 'vale'],
    recentEvent: 'Riverrun requests allied relief.',
    x: 376,
    y: 320,
    sigil: 'Trout',
    path: 'M286 246 L448 238 L512 294 L486 388 L334 402 L276 312 Z',
  },
  {
    id: 'vale',
    name: 'Vale',
    owner: 'stark',
    army: 12100,
    morale: 73,
    defense: 82,
    resourceValue: 66,
    neighbors: ['north', 'riverlands', 'crownlands'],
    recentEvent: 'Mountain pass fortification complete.',
    x: 562,
    y: 246,
    sigil: 'Falcon',
    path: 'M516 196 L658 190 L734 264 L698 370 L576 356 L498 288 Z',
  },
  {
    id: 'crownlands',
    name: 'Crownlands',
    owner: 'targaryen',
    army: 17300,
    morale: 84,
    defense: 65,
    resourceValue: 78,
    neighbors: ['riverlands', 'vale', 'stormlands', 'reach'],
    isCapital: true,
    recentEvent: 'Royal decree: levy doubled in Blackwater bay.',
    x: 520,
    y: 360,
    sigil: 'Dragon',
    path: 'M478 304 L604 300 L666 360 L632 456 L514 468 L458 408 Z',
  },
  {
    id: 'reach',
    name: 'The Reach',
    owner: 'tyrell',
    army: 16600,
    morale: 79,
    defense: 62,
    resourceValue: 88,
    neighbors: ['westerlands', 'riverlands', 'crownlands', 'stormlands', 'dorne'],
    isCapital: true,
    recentEvent: 'Harvest levy raises grain reserves by 12%.',
    x: 350,
    y: 500,
    sigil: 'Rose',
    path: 'M244 404 L438 396 L494 470 L464 596 L310 620 L216 532 Z',
  },
  {
    id: 'stormlands',
    name: 'Stormlands',
    owner: 'targaryen',
    army: 14100,
    morale: 67,
    defense: 57,
    resourceValue: 60,
    neighbors: ['crownlands', 'reach', 'dorne'],
    recentEvent: 'War drums heard along the rainwood frontier.',
    x: 606,
    y: 520,
    sigil: 'Stag',
    path: 'M546 456 L686 448 L754 518 L710 612 L590 620 L520 542 Z',
  },
  {
    id: 'dorne',
    name: 'Dorne',
    owner: 'neutral',
    army: 10800,
    morale: 64,
    defense: 54,
    resourceValue: 72,
    neighbors: ['reach', 'stormlands'],
    recentEvent: 'Sunspear emissaries request a neutral corridor.',
    x: 502,
    y: 654,
    sigil: 'Sun Spear',
    path: 'M324 604 L622 598 L718 662 L656 742 L384 748 L286 688 Z',
  },
  {
    id: 'isles',
    name: 'Iron Isles',
    owner: 'neutral',
    army: 7400,
    morale: 69,
    defense: 52,
    resourceValue: 55,
    neighbors: ['westerlands'],
    recentEvent: 'Longships sighted beyond the western reefs.',
    x: 84,
    y: 346,
    sigil: 'Kraken',
    path: 'M26 280 L96 266 L126 318 L104 394 L40 406 L12 334 Z',
  },
]

export const RIVERS: RiverPath[] = [
  {
    id: 'trident-main',
    d: 'M376 210 C388 248 390 278 386 320 C382 362 370 408 356 454 C342 500 334 548 336 620',
  },
  {
    id: 'blackwater',
    d: 'M524 286 C538 312 548 338 548 370 C548 404 534 438 520 470',
  },
  {
    id: 'red-fork',
    d: 'M332 276 C350 300 358 322 360 350 C362 382 356 420 338 458',
  },
]

export const TERRAIN_MARKERS: TerrainMarker[] = [
  { id: 'm-1', kind: 'mountain', x: 560, y: 140, scale: 1.1 },
  { id: 'm-2', kind: 'mountain', x: 590, y: 156, scale: 0.95 },
  { id: 'm-3', kind: 'mountain', x: 618, y: 176, scale: 1 },
  { id: 'm-4', kind: 'mountain', x: 212, y: 292, scale: 0.95 },
  { id: 'm-5', kind: 'mountain', x: 246, y: 306, scale: 0.9 },
  { id: 'm-6', kind: 'mountain', x: 640, y: 546, scale: 0.9 },
  { id: 'f-1', kind: 'forest', x: 330, y: 166, scale: 1.05 },
  { id: 'f-2', kind: 'forest', x: 460, y: 206, scale: 0.95 },
  { id: 'f-3', kind: 'forest', x: 394, y: 450, scale: 1 },
  { id: 'f-4', kind: 'forest', x: 280, y: 518, scale: 0.95 },
  { id: 'f-5', kind: 'forest', x: 612, y: 514, scale: 1 },
  { id: 'c-1', kind: 'castle', x: 518, y: 366, scale: 1.05 },
  { id: 'c-2', kind: 'castle', x: 238, y: 322, scale: 0.95 },
  { id: 'c-3', kind: 'castle', x: 356, y: 494, scale: 0.95 },
]

export const OVERLAY_EVENTS: OverlayEvent[] = [
  {
    id: 'ov-attack-1',
    type: 'attack',
    from: [518, 366],
    to: [604, 520],
    label: 'Siege Route',
  },
  {
    id: 'ov-alliance-1',
    type: 'alliance',
    from: [356, 494],
    to: [238, 322],
    label: 'Trade Pact',
  },
  {
    id: 'ov-defend-1',
    type: 'defend',
    territoryId: 'north',
    from: [395, 135],
    label: 'Shield Wall',
  },
  {
    id: 'ov-battle-1',
    type: 'battle',
    territoryId: 'riverlands',
    from: [376, 320],
    label: 'Clash',
  },
  {
    id: 'ov-recruit-1',
    type: 'recruit',
    territoryId: 'reach',
    from: [350, 500],
    label: 'New Levy',
  },
  {
    id: 'ov-dragon-1',
    type: 'dragon',
    from: [518, 366],
    to: [356, 494],
    label: 'Dragon Flight',
  },
  {
    id: 'ov-burn-1',
    type: 'burn',
    territoryId: 'reach',
    from: [336, 530],
    label: 'Fields Burned',
  },
  {
    id: 'ov-captured-1',
    type: 'captured',
    territoryId: 'riverlands',
    from: [376, 320],
    label: 'Claimed',
  },
]
