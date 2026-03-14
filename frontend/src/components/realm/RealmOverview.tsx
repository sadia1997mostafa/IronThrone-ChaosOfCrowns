'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './RealmOverview.module.css'

const RealmWarTableScene = dynamic(() => import('./RealmWarTableScene'), { ssr: false })

type House = {
  id: string
  name: string
  motto: string
  sigil: string
  color: string
  territories: number
  army: number
  gold: number
  morale: number
  style: string
}

type Territory = {
  id: string
  name: string
  points: string
  owner: string
  sigilMark: string
  armies: string
  stronghold: boolean
  houseSeat: string
  strategicValue: 'low' | 'mid' | 'high'
  x: number
  y: number
}

type RiverPath = {
  id: string
  d: string
}

type TerrainGlyph = {
  id: string
  x: number
  y: number
  kind: 'mountain' | 'forest'
}

type StrongholdNode = {
  id: string
  territoryId: string
  name: string
  x: number
  y: number
  kind: 'capital' | 'fort'
}

type FrontLine = {
  id: string
  from: [number, number]
  to: [number, number]
  type: 'attack' | 'alliance'
}

type CrackPath = {
  id: string
  d: string
}

const HOUSES: House[] = [
  {
    id: 'stark',
    name: 'House Stark',
    motto: 'Winter Is Coming',
    sigil: 'W',
    color: '#7f8ea1',
    territories: 4,
    army: 18400,
    gold: 9200,
    morale: 76,
    style: 'Defensive',
  },
  {
    id: 'lannister',
    name: 'House Lannister',
    motto: 'Hear Me Roar',
    sigil: 'L',
    color: '#b8742c',
    territories: 5,
    army: 20100,
    gold: 16800,
    morale: 71,
    style: 'Economic',
  },
  {
    id: 'targaryen',
    name: 'House Targaryen',
    motto: 'Fire and Blood',
    sigil: 'T',
    color: '#9f3f2d',
    territories: 3,
    army: 17300,
    gold: 11100,
    morale: 84,
    style: 'Aggressive',
  },
  {
    id: 'tyrell',
    name: 'House Tyrell',
    motto: 'Growing Strong',
    sigil: 'R',
    color: '#6f7f3f',
    territories: 4,
    army: 16600,
    gold: 13300,
    morale: 79,
    style: 'Diplomatic',
  },
]

const TERRITORIES: Territory[] = [
  {
    id: 'north',
    name: 'The North',
    owner: 'stark',
    sigilMark: 'WOLF',
    points: '68,28 132,14 210,44 188,124 110,140 58,98',
    armies: '6.4k',
    stronghold: true,
    houseSeat: 'Winterfell',
    strategicValue: 'high',
    x: 130,
    y: 78,
  },
  {
    id: 'westerlands',
    name: 'Westerlands',
    owner: 'lannister',
    sigilMark: 'LION',
    points: '52,150 124,138 146,186 92,234 38,214',
    armies: '5.2k',
    stronghold: true,
    houseSeat: 'Casterly Rock',
    strategicValue: 'high',
    x: 92,
    y: 188,
  },
  {
    id: 'crownlands',
    name: 'Crownlands',
    owner: 'targaryen',
    sigilMark: 'DRAGON',
    points: '166,172 238,146 294,192 270,256 184,252',
    armies: '4.9k',
    stronghold: false,
    houseSeat: "King's Landing",
    strategicValue: 'high',
    x: 234,
    y: 206,
  },
  {
    id: 'reach',
    name: 'The Reach',
    owner: 'tyrell',
    sigilMark: 'ROSE',
    points: '106,246 188,258 220,324 142,382 84,338',
    armies: '5.5k',
    stronghold: true,
    houseSeat: 'Highgarden',
    strategicValue: 'mid',
    x: 148,
    y: 316,
  },
  {
    id: 'stormlands',
    name: 'Stormlands',
    owner: 'targaryen',
    sigilMark: 'FLAME',
    points: '232,266 302,256 336,312 288,372 224,338',
    armies: '4.1k',
    stronghold: false,
    houseSeat: "Storm's End",
    strategicValue: 'mid',
    x: 278,
    y: 320,
  },
  {
    id: 'riverlands',
    name: 'Riverlands',
    owner: 'stark',
    sigilMark: 'TROUT',
    points: '134,150 198,134 226,176 176,230 130,208',
    armies: '3.8k',
    stronghold: false,
    houseSeat: 'Riverrun',
    strategicValue: 'low',
    x: 175,
    y: 182,
  },
]

const RIVERS: RiverPath[] = [
  { id: 'trident', d: 'M128 118 C156 128 174 144 186 166 C194 182 192 198 184 214 C176 230 164 250 158 276' },
  { id: 'blackwater', d: 'M238 146 C252 164 264 182 266 206 C268 224 258 242 244 260' },
]

const TERRAIN_GLYPHS: TerrainGlyph[] = [
  { id: 'm-1', x: 86, y: 66, kind: 'mountain' },
  { id: 'm-2', x: 108, y: 58, kind: 'mountain' },
  { id: 'm-3', x: 126, y: 62, kind: 'mountain' },
  { id: 'f-1', x: 154, y: 116, kind: 'forest' },
  { id: 'f-2', x: 206, y: 222, kind: 'forest' },
  { id: 'f-3', x: 276, y: 312, kind: 'forest' },
  { id: 'm-4', x: 84, y: 202, kind: 'mountain' },
  { id: 'f-4', x: 128, y: 328, kind: 'forest' },
]

const STRONGHOLDS: StrongholdNode[] = [
  { id: 'winterfell', territoryId: 'north', name: 'Winterfell', x: 146, y: 96, kind: 'capital' },
  { id: 'casterly-rock', territoryId: 'westerlands', name: 'Casterly Rock', x: 98, y: 196, kind: 'capital' },
  { id: 'kings-landing', territoryId: 'crownlands', name: "King's Landing", x: 246, y: 210, kind: 'capital' },
  { id: 'highgarden', territoryId: 'reach', name: 'Highgarden', x: 156, y: 324, kind: 'capital' },
  { id: 'storms-end', territoryId: 'stormlands', name: "Storm's End", x: 286, y: 324, kind: 'fort' },
  { id: 'riverrun', territoryId: 'riverlands', name: 'Riverrun', x: 184, y: 190, kind: 'fort' },
]

const FRONT_LINES: FrontLine[] = [
  { id: 'line-1', from: [246, 210], to: [286, 324], type: 'attack' },
  { id: 'line-2', from: [146, 96], to: [184, 190], type: 'alliance' },
  { id: 'line-3', from: [98, 196], to: [184, 190], type: 'attack' },
]

const MAP_CRACKS: CrackPath[] = [
  { id: 'c-1', d: 'M46 332 C94 306 128 288 168 274 C214 258 266 256 322 248' },
  { id: 'c-2', d: 'M68 116 C102 122 128 132 156 148 C181 162 199 186 224 208' },
  { id: 'c-3', d: 'M238 62 C254 84 266 104 274 130 C284 161 292 188 308 220' },
  { id: 'c-4', d: 'M96 218 C116 230 134 244 146 264 C154 278 158 292 162 312' },
]

function fmt(v: number) {
  return new Intl.NumberFormat('en-US').format(v)
}

function RealmMap({
  selectedTerritoryId,
  onSelectTerritory,
}: {
  selectedTerritoryId: string
  onSelectTerritory: (territoryId: string) => void
}) {
  const ownerColor = Object.fromEntries(HOUSES.map((h) => [h.id, h.color]))
  const [hoveredTerritoryId, setHoveredTerritoryId] = useState<string | null>(null)

  const activeTerritory = useMemo(
    () => TERRITORIES.find((territory) => territory.id === hoveredTerritoryId) || TERRITORIES.find((territory) => territory.id === selectedTerritoryId),
    [hoveredTerritoryId, selectedTerritoryId]
  )

  const activeHouse = useMemo(() => HOUSES.find((house) => house.id === activeTerritory?.owner), [activeTerritory])

  return (
    <div className={styles.mapShell}>
      <div className={styles.mapHeaderRow}>
        <span className={styles.panelTag}>Realm Map</span>
        <h2>War Table Atlas</h2>
      </div>
      <div className={styles.mapCanvasWrap}>
        <svg viewBox="0 0 360 420" className={styles.realmMap} role="img" aria-label="Realm map">
          <defs>
            <clipPath id="sheet-clip">
              <path d="M20 28 C34 18 58 14 80 16 L318 20 C338 22 348 36 346 56 L340 372 C338 392 324 404 304 404 L44 402 C26 400 14 390 14 370 L18 62 C18 48 12 36 20 28 Z" />
            </clipPath>
            <filter id="aged-grain" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" result="noise" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncA type="table" tableValues="0 0.08" />
              </feComponentTransfer>
            </filter>
            <filter id="territory-lift" x="-30%" y="-30%" width="180%" height="180%">
              <feDropShadow dx="0" dy="1" stdDeviation="0.8" floodColor="rgba(24,16,10,0.55)" />
              <feDropShadow dx="0" dy="0" stdDeviation="0.6" floodColor="rgba(230,189,117,0.18)" />
            </filter>
            <filter id="marker-shadow" x="-120%" y="-120%" width="340%" height="340%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.8" floodColor="rgba(0,0,0,0.6)" />
            </filter>
            <radialGradient id="marker-metal" cx="30%" cy="30%" r="78%">
              <stop offset="0%" stopColor="#f4d292" />
              <stop offset="45%" stopColor="#c08b43" />
              <stop offset="100%" stopColor="#6f4724" />
            </radialGradient>
            <radialGradient id="marker-wood" cx="35%" cy="35%" r="80%">
              <stop offset="0%" stopColor="#8e613b" />
              <stop offset="55%" stopColor="#5d3b24" />
              <stop offset="100%" stopColor="#2d1c12" />
            </radialGradient>
            <pattern id="sea-rings" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
              <circle cx="13" cy="13" r="5" fill="none" stroke="rgba(143,170,201,0.12)" strokeWidth="0.9" />
            </pattern>
            <pattern id="coast-curves" width="48" height="48" patternUnits="userSpaceOnUse" patternTransform="rotate(14)">
              <path d="M4 24 C14 14, 34 14, 44 24" fill="none" stroke="rgba(160,194,224,0.1)" strokeWidth="0.9" />
              <path d="M0 30 C10 20, 38 20, 48 30" fill="none" stroke="rgba(160,194,224,0.08)" strokeWidth="0.7" />
            </pattern>
            <marker id="arrow-attack" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 z" fill="rgba(226,103,78,0.95)" />
            </marker>
            <marker id="arrow-alliance" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 z" fill="rgba(115,183,221,0.95)" />
            </marker>
          </defs>

          <rect x="8" y="8" width="344" height="404" rx="22" className={styles.mapFrame} />
          <rect x="18" y="18" width="324" height="384" rx="18" className={styles.mapSeaBase} />
          <rect x="18" y="18" width="324" height="384" rx="18" className={styles.mapSeaPattern} />
          <rect x="18" y="18" width="324" height="384" rx="18" className={styles.mapSeaCurves} />

          <g clipPath="url(#sheet-clip)">
            <rect x="18" y="18" width="324" height="384" rx="18" className={styles.mapParchmentBase} />
            <rect x="18" y="18" width="324" height="384" rx="18" className={styles.mapParchmentFiber} filter="url(#aged-grain)" />

            {RIVERS.map((river) => (
              <path key={river.id} d={river.d} className={styles.riverPath} />
            ))}

            {FRONT_LINES.map((line) => (
              <line
                key={line.id}
                x1={line.from[0]}
                y1={line.from[1]}
                x2={line.to[0]}
                y2={line.to[1]}
                className={line.type === 'attack' ? styles.attackLine : styles.allianceLine}
                markerEnd={line.type === 'attack' ? 'url(#arrow-attack)' : 'url(#arrow-alliance)'}
              />
            ))}

            {TERRITORIES.map((t, i) => (
              <g
                key={t.id}
                className={styles.territoryGroup}
                style={{ animationDelay: `${i * 0.15}s` }}
                onMouseEnter={() => setHoveredTerritoryId(t.id)}
                onMouseLeave={() => setHoveredTerritoryId(null)}
                onClick={() => onSelectTerritory(t.id)}
              >
                <polygon
                  points={t.points}
                  fill={ownerColor[t.owner]}
                  className={`${styles.territoryShape} ${selectedTerritoryId === t.id ? styles.territorySelected : ''}`}
                  stroke="rgba(15,10,8,0.9)"
                  strokeWidth="2.2"
                  filter="url(#territory-lift)"
                />
                <polygon points={t.points} className={styles.territoryGrainOverlay} filter="url(#aged-grain)" />
                <text x={t.x} y={t.y} className={styles.territoryLabel}>{t.name}</text>
                <text x={t.x} y={t.y + 15} className={styles.territoryArmy}>{t.armies}</text>
                <text x={t.x} y={t.y + 31} className={styles.territorySigil}>{t.sigilMark}</text>
              </g>
            ))}

            {TERRAIN_GLYPHS.map((glyph) => (
              <g key={glyph.id} transform={`translate(${glyph.x},${glyph.y})`} className={styles.terrainGlyph}>
                {glyph.kind === 'mountain' ? (
                  <path d="M-8 8 L0 -10 L8 8 Z" fill="rgba(80,61,43,0.36)" stroke="rgba(58,43,30,0.55)" strokeWidth="1" />
                ) : (
                  <path d="M0 -10 L6 0 H-6 Z M0 -2 L5 7 H-5 Z" fill="rgba(56,76,49,0.46)" stroke="rgba(41,55,36,0.56)" strokeWidth="0.7" />
                )}
              </g>
            ))}

            {MAP_CRACKS.map((crack) => (
              <path key={crack.id} d={crack.d} className={styles.mapCrack} />
            ))}

            {STRONGHOLDS.map((node) => (
              <g key={node.id} className={styles.strongholdNode} transform={`translate(${node.x},${node.y})`} filter="url(#marker-shadow)">
                <ellipse cx="0" cy="7.5" rx="8.5" ry="3.1" className={styles.strongholdShadow} />
                <ellipse cx="0" cy="4.2" rx="6.3" ry="2.9" className={styles.strongholdBase} />
                <circle r={node.kind === 'capital' ? 5.8 : 4.6} className={styles.strongholdCore} />
                <path d="M-3.9 4.6 L0 -4.6 L3.9 4.6 Z" className={styles.strongholdCrown} />
              </g>
            ))}
          </g>

          <path d="M20 28 C34 18 58 14 80 16 L318 20 C338 22 348 36 346 56 L340 372 C338 392 324 404 304 404 L44 402 C26 400 14 390 14 370 L18 62 C18 48 12 36 20 28 Z" className={styles.mapPaperEdge} />
          <circle cx="34" cy="34" r="42" className={styles.mapCandleGlow} />
          <circle cx="328" cy="46" r="48" className={styles.mapCandleGlow} />
        </svg>

        {activeTerritory && activeHouse && (
          <div className={styles.mapTooltip}>
            <p className={styles.mapTooltipHouse}>{activeHouse.name}</p>
            <h3>{activeTerritory.name}</h3>
            <div className={styles.mapTooltipRow}>
              <span>Seat</span>
              <strong>{activeTerritory.houseSeat}</strong>
            </div>
            <div className={styles.mapTooltipRow}>
              <span>Armies</span>
              <strong>{activeTerritory.armies}</strong>
            </div>
            <div className={styles.mapTooltipRow}>
              <span>Value</span>
              <strong>{activeTerritory.strategicValue}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function RealmOverview() {
  const router = useRouter()
  const [selectedTerritoryId, setSelectedTerritoryId] = useState<string>('north')

  const quickStats = useMemo(() => {
    const highValueTerritories = TERRITORIES.filter((territory) => territory.strategicValue === 'high').length
    const capitals = STRONGHOLDS.filter((node) => node.kind === 'capital').length
    return { highValueTerritories, capitals }
  }, [])

  return (
    <main className={styles.root}>
      <div className={styles.backdrop} />

      {/* ── TOP HUD BAR ── */}
      <motion.header
        className={styles.header}
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.headerLeft}>
          <p className={styles.kicker}>⚔ War Table · Realm Overview</p>
          <h1>The Realm Stands Divided</h1>
        </div>
        <div className={styles.headerMeta}>
          <span>Turn 0</span>
          <span>AI vs AI</span>
          <span>{quickStats.capitals} Capitals</span>
          <span>{quickStats.highValueTerritories} High Value</span>
          <span>Diplomacy Active</span>
        </div>
      </motion.header>

      {/* ── MAIN CONTENT ── */}
      <section className={styles.mainGrid}>
        <motion.div
          className={styles.leftColumn}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.sceneCard}>
            <div className={styles.sceneCardHeader}>
              <span className={styles.panelTag}>Royal War Table</span>
              <h2>Chamber Projection</h2>
            </div>
            <RealmWarTableScene className={styles.sceneViewport} />
          </div>
          <RealmMap selectedTerritoryId={selectedTerritoryId} onSelectTerritory={setSelectedTerritoryId} />
        </motion.div>

        <motion.aside
          className={styles.rightColumn}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.panelTitleWrap}>
            <span className={styles.panelTag}>Command Ledger</span>
            <h2>House Readiness</h2>
          </div>
          <div className={styles.houseList}>
            {HOUSES.map((house) => (
              <article key={house.id} className={styles.houseCard}>
                <div className={styles.houseCardTop}>
                  <div className={styles.houseSigil} style={{ borderColor: house.color, color: house.color }}>
                    {house.sigil}
                  </div>
                  <div className={styles.houseInfo}>
                    <h3>{house.name}</h3>
                    <p>{house.motto}</p>
                  </div>
                  <span className={styles.aiStyle}>{house.style}</span>
                </div>
                <div className={styles.metrics}>
                  <span>Terr. {house.territories}</span>
                  <span>Army {fmt(house.army)}</span>
                  <span>Gold {fmt(house.gold)}</span>
                </div>
                <div className={styles.moraleRow}>
                  <span>Morale</span>
                  <span>{house.morale}%</span>
                </div>
                <div className={styles.moraleBarTrack}>
                  <div className={styles.moraleBarFill} style={{ width: `${house.morale}%`, background: house.color }} />
                </div>
              </article>
            ))}
          </div>
        </motion.aside>
      </section>

      {/* ── BOTTOM HUD BAR ── */}
      <motion.footer
        className={styles.bottomBar}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.aiMethods}>
          <span>Minimax</span>
          <span>MCTS</span>
          <span>Fuzzy Logic</span>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.primaryButton} onClick={() => router.push('/simulation')}>
            Begin the War
          </button>
          <button className={styles.secondaryButton}>View Houses</button>
          <button className={styles.secondaryGhost}>Reset Realm</button>
        </div>
      </motion.footer>
    </main>
  )
}
