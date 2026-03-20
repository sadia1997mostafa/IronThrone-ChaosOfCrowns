'use client'

import { useMemo, useRef, useState } from 'react'
import { mapPaths, type RegionId } from '@/assets/mapPaths'
import BattleModal from './BattleModal'
import BattlePath from './BattlePath'
import BattleSkirmish3D from './BattleSkirmish3D'
import ClashEffect from './ClashEffect'
import FloatingStatText from './FloatingStatText'
import UnitToken from './UnitToken'
import { type HouseId, regionData } from '@/data/regionData'

const VIEW_BOX = '0 0 1536 1024'
const regionOrder: RegionId[] = [
  'north',
  'vale',
  'riverlands',
  'westerlands',
  'reach',
  'stormlands',
  'dorne',
  'iron_islands',
  'essos',
  'braavos',
]

const HOUSE_META: Record<HouseId, { label: string; color: string; glyph: string; unitImage: string; unitModel: string }> = {
  stark: {
    label: 'House Stark',
    color: '#7dc4ff',
    glyph: '🐺',
    unitImage: '/images/houses/stark/unit.png',
    unitModel: '/models/epic_black_golden_cyber_warrior.glb',
  },
  lannister: {
    label: 'House Lannister',
    color: '#ff9d67',
    glyph: '🦁',
    unitImage: '/images/houses/lannister/unit.png',
    unitModel: '/models/epic_black_golden_cyber_warrior.glb',
  },
  targaryen: {
    label: 'House Targaryen',
    color: '#ff6f6f',
    glyph: '🐉',
    unitImage: '/images/houses/targaryen/unit.png',
    unitModel: '/models/epic_black_golden_cyber_warrior.glb',
  },
  tyrell: {
    label: 'House Tyrell',
    color: '#a5de8b',
    glyph: '🌿',
    unitImage: '/images/houses/tyrell/unit.png',
    unitModel: '/models/epic_black_golden_cyber_warrior.glb',
  },
}

type FloatingText = {
  id: number
  x: number
  y: number
  text: string
  tone: 'positive' | 'negative' | 'neutral'
}

type BattleContext = {
  attackerId: RegionId
  defenderId: RegionId
  winChance: number
}

type BattlePhase = 'idle' | 'targeting' | 'march' | 'impact' | 'briefing'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const SKIRMISH_WEAPONS = {
  attackerSword: '/models/sword1.glb',
  defenderSword: '/models/sword2.glb',
  dagger: '/models/game_of_thrones_wildlings_dagger.glb',
} as const

export default function GOTMap() {
  const [regions, setRegions] = useState(() => ({ ...regionData }))
  const [selectedRegion, setSelectedRegion] = useState<RegionId | null>(null)
  const [attackSource, setAttackSource] = useState<RegionId | null>(null)
  const [battlePath, setBattlePath] = useState<{ from: RegionId; to: RegionId } | null>(null)
  const [clashRegion, setClashRegion] = useState<RegionId | null>(null)
  const [isCinematicActive, setIsCinematicActive] = useState(false)
  const [battleContext, setBattleContext] = useState<BattleContext | null>(null)
  const [isBattleModalOpen, setIsBattleModalOpen] = useState(false)
  const [isResolvingBattle, setIsResolvingBattle] = useState(false)
  const [battleResult, setBattleResult] = useState<string | null>(null)
  const [battlePhase, setBattlePhase] = useState<BattlePhase>('idle')
  const [impactSlowMo, setImpactSlowMo] = useState(false)
  const [fortifiedRegion, setFortifiedRegion] = useState<RegionId | null>(null)
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([])
  const [eventLog, setEventLog] = useState<string[]>([
    'War table awakened. Pick a territory to inspect and command.',
    'Tip: Select an attacker, then click a neighboring enemy region to trigger a cinematic clash.',
  ])
  const floatingIdRef = useRef(0)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const availableRegions = useMemo(
    () => regionOrder.filter((regionId) => mapPaths[regionId].trim().length > 0),
    []
  )

  const selectedData = selectedRegion ? regions[selectedRegion] : null
  const canRecruit = Boolean(selectedRegion) && !isBattleModalOpen && !isResolvingBattle
  const canFortify = Boolean(selectedRegion) && !isBattleModalOpen && !isResolvingBattle
  const canPrimeAttacker = Boolean(selectedRegion) && !isBattleModalOpen && !isResolvingBattle

  const activePathPoints = battlePath
    ? {
        from: regions[battlePath.from].tokenPosition,
        to: regions[battlePath.to].tokenPosition,
      }
    : null

  const activeAttackerHouse = battleContext ? HOUSE_META[regions[battleContext.attackerId].houseId] : null
  const activeDefenderHouse = battleContext ? HOUSE_META[regions[battleContext.defenderId].houseId] : null
  const skirmishVisible =
    isCinematicActive &&
    Boolean(battleContext) &&
    (battlePhase === 'march' || battlePhase === 'impact' || battlePhase === 'briefing')

  const canAttackTarget = (sourceId: RegionId, targetId: RegionId) => {
    const source = regions[sourceId]
    const target = regions[targetId]
    return source.neighbors.includes(targetId) && source.houseId !== target.houseId
  }

  const addEvent = (entry: string) => {
    setEventLog((prev) => [entry, ...prev].slice(0, 9))
  }

  const addFloatingText = (
    x: number,
    y: number,
    text: string,
    tone: 'positive' | 'negative' | 'neutral' = 'neutral'
  ) => {
    const id = ++floatingIdRef.current
    setFloatingTexts((prev) => [...prev, { id, x, y, text, tone }])
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((item) => item.id !== id))
    }, 1700)
  }

  const clearBattleVisuals = () => {
    setBattlePath(null)
    setClashRegion(null)
    setIsCinematicActive(false)
    setBattlePhase('idle')
    setImpactSlowMo(false)
    setAttackSource(null)
  }

  const getAudioCtx = () => {
    if (typeof window === 'undefined') return null
    const AudioCtor = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioCtor) return null
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtor()
    }
    return audioCtxRef.current
  }

  const playWarCue = (type: 'march' | 'impact' | 'result') => {
    const ctx = getAudioCtx()
    if (!ctx) return

    const now = ctx.currentTime
    const master = ctx.createGain()
    master.gain.value = 0.055
    master.connect(ctx.destination)

    if (type === 'march') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(72, now)
      osc.frequency.linearRampToValueAtTime(62, now + 0.18)
      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.7, now + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.19)
      osc.connect(gain)
      gain.connect(master)
      osc.start(now)
      osc.stop(now + 0.2)
      return
    }

    if (type === 'impact') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(240, now)
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.22)
      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(1, now + 0.015)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24)
      osc.connect(gain)
      gain.connect(master)
      osc.start(now)
      osc.stop(now + 0.25)
      return
    }

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.setValueAtTime(108, now)
    osc.frequency.exponentialRampToValueAtTime(74, now + 0.28)
    gain.gain.setValueAtTime(0.001, now)
    gain.gain.linearRampToValueAtTime(0.55, now + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
    osc.connect(gain)
    gain.connect(master)
    osc.start(now)
    osc.stop(now + 0.31)
  }

  const closeBattleModal = () => {
    setIsBattleModalOpen(false)
    setBattleContext(null)
    setBattleResult(null)
    setIsResolvingBattle(false)
    clearBattleVisuals()
  }

  const launchAttackSequence = async (sourceId: RegionId, targetId: RegionId) => {
    if (isBattleModalOpen || isResolvingBattle) return
    if (!canAttackTarget(sourceId, targetId)) {
      addEvent(`Attack blocked: ${regions[targetId].name} is not a valid hostile neighbor.`)
      return
    }

    const attacker = regions[sourceId]
    const defender = regions[targetId]
    const powerDelta = attacker.army - defender.army
    const winChance = Math.max(0.2, Math.min(0.86, 0.55 + powerDelta / 180))

    setAttackSource(sourceId)
    setSelectedRegion(targetId)
    setBattleResult(null)
    setBattleContext({ attackerId: sourceId, defenderId: targetId, winChance })
    setIsCinematicActive(true)
    setBattlePhase('targeting')
    setBattlePath(null)
    addEvent(`Assault order issued: ${attacker.name} advancing on ${defender.name}.`)

    await wait(480)
    setBattlePhase('march')
    playWarCue('march')
    setBattlePath({ from: sourceId, to: targetId })

    await wait(1680)
    setBattlePhase('impact')
    setImpactSlowMo(true)
    playWarCue('impact')
    setClashRegion(targetId)
    setTimeout(() => setImpactSlowMo(false), 820)
    await wait(980)
    setBattlePhase('briefing')
    await wait(260)
    setIsBattleModalOpen(true)
  }

  const handleRegionPick = (regionId: RegionId) => {
    setSelectedRegion(regionId)
    if (attackSource && attackSource !== regionId) {
      void launchAttackSequence(attackSource, regionId)
    }
  }

  const handleRecruit = () => {
    if (!selectedRegion) return
    const bonus = 8 + Math.floor(Math.random() * 9)
    setRegions((prev) => {
      const updated = {
        ...prev,
        [selectedRegion]: {
          ...prev[selectedRegion],
          army: prev[selectedRegion].army + bonus,
        },
      }
      return updated
    })
    const pos = regions[selectedRegion].tokenPosition
    addFloatingText(pos.x, pos.y, `+${bonus} Army`, 'positive')
    addEvent(`Reinforcements deployed to ${regions[selectedRegion].name}: +${bonus} Army.`)
  }

  const handleFortify = () => {
    if (!selectedRegion) return
    setFortifiedRegion(selectedRegion)
    const pos = regions[selectedRegion].tokenPosition
    addFloatingText(pos.x, pos.y, 'Shield Wall', 'neutral')
    addEvent(`${regions[selectedRegion].name} fortifies defensive lines.`)
    setTimeout(() => setFortifiedRegion((prev) => (prev === selectedRegion ? null : prev)), 1300)
  }

  const resolveBattle = async () => {
    if (!battleContext || isResolvingBattle) return
    const attacker = regions[battleContext.attackerId]
    const defender = regions[battleContext.defenderId]

    setIsResolvingBattle(true)
    await wait(500)
    const attackerWins = Math.random() < battleContext.winChance

    if (attackerWins) {
      const attackerLoss = Math.max(6, Math.min(Math.round(defender.army * 0.36), Math.floor(attacker.army * 0.6)))
      const attackerAfter = Math.max(10, attacker.army - attackerLoss)
      const defenderAfter = Math.max(12, Math.round(attackerAfter * 0.55))

      setRegions((prev) => ({
        ...prev,
        [battleContext.attackerId]: {
          ...prev[battleContext.attackerId],
          army: attackerAfter,
        },
        [battleContext.defenderId]: {
          ...prev[battleContext.defenderId],
          army: defenderAfter,
          houseId: prev[battleContext.attackerId].houseId,
          house: prev[battleContext.attackerId].house,
        },
      }))

      const sourcePos = attacker.tokenPosition
      const targetPos = defender.tokenPosition
      addFloatingText(sourcePos.x, sourcePos.y, `-${attackerLoss} Army`, 'negative')
      addFloatingText(targetPos.x, targetPos.y, 'Captured', 'positive')
      addEvent(`${attacker.house} secures ${defender.name}; ${defender.house} forced to retreat.`)
      setBattleResult(`${attacker.house} captures ${defender.name}`)
      playWarCue('result')
    } else {
      const attackerLoss = Math.max(8, Math.min(Math.round(defender.army * 0.45), Math.floor(attacker.army * 0.7)))
      const defenderLoss = Math.max(4, Math.min(Math.round(attacker.army * 0.24), Math.floor(defender.army * 0.45)))
      const attackerAfter = Math.max(8, attacker.army - attackerLoss)
      const defenderAfter = Math.max(8, defender.army - defenderLoss)

      setRegions((prev) => ({
        ...prev,
        [battleContext.attackerId]: {
          ...prev[battleContext.attackerId],
          army: attackerAfter,
        },
        [battleContext.defenderId]: {
          ...prev[battleContext.defenderId],
          army: defenderAfter,
        },
      }))

      const sourcePos = attacker.tokenPosition
      const targetPos = defender.tokenPosition
      addFloatingText(sourcePos.x, sourcePos.y, `-${attackerLoss} Army`, 'negative')
      addFloatingText(targetPos.x, targetPos.y, `-${defenderLoss} Army`, 'negative')
      addEvent(`${defender.house} holds ${defender.name} under heavy assault from ${attacker.house}.`)
      setBattleResult(`${defender.house} holds ${defender.name}`)
      playWarCue('result')
    }

    setIsResolvingBattle(false)
  }

  const runFeaturedBattle = () => {
    void launchAttackSequence('north', 'riverlands')
  }

  return (
    <div className="map-page">
      <div
        className={`map-container ${isCinematicActive ? 'is-cinematic' : ''} ${battlePhase === 'impact' ? 'is-impact' : ''}`}
      >
        {isCinematicActive && <div className="map-cinematic-dim" aria-hidden />}

        <img
          src="/images/map/got-map-final.png"
          alt="Game of Thrones map"
          className="map-image"
          draggable={false}
        />

        <svg className="map-overlay" viewBox={VIEW_BOX} preserveAspectRatio="none" role="img" aria-label="Interactive map regions">
          {availableRegions.map((regionId) => (
            <path
              key={regionId}
              d={mapPaths[regionId]}
              className={`region ${selectedRegion === regionId ? 'active' : ''}`}
              onClick={() => handleRegionPick(regionId)}
            />
          ))}
        </svg>

        {activeAttackerHouse && activeDefenderHouse ? (
          <BattleSkirmish3D
            visible={skirmishVisible}
            attackerColor={activeAttackerHouse.color}
            defenderColor={activeDefenderHouse.color}
            modelSrc={activeAttackerHouse.unitModel}
            weaponSources={SKIRMISH_WEAPONS}
            phase={battlePhase === 'impact' ? 'impact' : battlePhase === 'march' ? 'march' : 'briefing'}
            slowMo={impactSlowMo}
          />
        ) : null}

        {activePathPoints ? <BattlePath from={activePathPoints.from} to={activePathPoints.to} visible /> : null}
        {clashRegion ? (
          <ClashEffect
            x={regions[clashRegion].tokenPosition.x}
            y={regions[clashRegion].tokenPosition.y}
            visible
          />
        ) : null}

        <div className="token-layer" aria-hidden={false}>
          {availableRegions.map((regionId) => {
            const territory = regions[regionId]
            const house = HOUSE_META[territory.houseId]
            const warning =
              Boolean(attackSource) &&
              attackSource !== regionId &&
              canAttackTarget(attackSource as RegionId, regionId)

            return (
              <UnitToken
                key={`token-${regionId}`}
                houseKey={territory.houseId}
                x={territory.tokenPosition.x}
                y={territory.tokenPosition.y}
                army={territory.army}
                houseLabel={territory.house}
                houseColor={house.color}
                modelSrc={house.unitModel}
                imageSrc={house.unitImage}
                fallbackGlyph={house.glyph}
                selected={selectedRegion === regionId || attackSource === regionId}
                warning={warning}
                fortified={fortifiedRegion === regionId}
                onClick={() => handleRegionPick(regionId)}
              />
            )
          })}

          <FloatingStatText items={floatingTexts} />
        </div>
      </div>

      <aside className="region-panel" aria-live="polite">
        <div className="panel-actions">
          <button type="button" className="panel-btn panel-btn-featured" onClick={runFeaturedBattle} disabled={isBattleModalOpen || isResolvingBattle}>
            Demo: North attacks Riverlands
          </button>
        </div>

        {selectedData ? (
          <>
            <h2>{selectedData.name}</h2>
            <p>
              <strong>House:</strong> {selectedData.house}
            </p>
            <p>
              <strong>Army:</strong> {selectedData.army}
            </p>
            <p>
              <strong>Resources:</strong> {selectedData.resources.join(', ')}
            </p>
            <p>{selectedData.description}</p>

            <p>
              <strong>Neighbors:</strong> {selectedData.neighbors.map((id) => regions[id].name).join(', ')}
            </p>

            <div className="panel-actions">
              <button type="button" className="panel-btn" onClick={handleRecruit} disabled={!canRecruit}>
                Recruit (+8 to +16)
              </button>
              <button type="button" className="panel-btn" onClick={handleFortify} disabled={!canFortify}>
                Fortify (Shield Pulse)
              </button>
              <button
                type="button"
                className="panel-btn panel-btn-attack"
                onClick={() => setAttackSource(selectedRegion)}
                disabled={!canPrimeAttacker || !selectedRegion}
              >
                {attackSource === selectedRegion ? 'Attacker Ready' : 'Set as Attacker'}
              </button>
              {attackSource ? (
                <button type="button" className="panel-btn" onClick={() => setAttackSource(null)} disabled={isBattleModalOpen || isResolvingBattle}>
                  Cancel Attack Mode
                </button>
              ) : null}
            </div>

            {attackSource ? (
              <p className="attack-hint">
                Attack mode: click a hostile neighboring region to launch a cinematic clash.
              </p>
            ) : null}
          </>
        ) : (
          <>
            <h2>Region Intel</h2>
            <p>Select a region token or border to open strategic details.</p>
            {availableRegions.length === 0 && (
              <p>
                No region paths loaded yet. Paste path d values into <strong>src/assets/mapPaths.ts</strong>.
              </p>
            )}
          </>
        )}

        <div className="event-log">
          <h3>War Chronicle</h3>
          {eventLog.map((entry, index) => (
            <p key={`${entry}-${index}`}>{entry}</p>
          ))}
        </div>
      </aside>

      {battleContext ? (
        <BattleModal
          open={isBattleModalOpen}
          location={regions[battleContext.defenderId].name}
          attacker={{
            id: battleContext.attackerId,
            name: regions[battleContext.attackerId].name,
            houseLabel: regions[battleContext.attackerId].house,
            houseColor: HOUSE_META[regions[battleContext.attackerId].houseId].color,
            army: regions[battleContext.attackerId].army,
            imageSrc: HOUSE_META[regions[battleContext.attackerId].houseId].unitImage,
            glyph: HOUSE_META[regions[battleContext.attackerId].houseId].glyph,
          }}
          defender={{
            id: battleContext.defenderId,
            name: regions[battleContext.defenderId].name,
            houseLabel: regions[battleContext.defenderId].house,
            houseColor: HOUSE_META[regions[battleContext.defenderId].houseId].color,
            army: regions[battleContext.defenderId].army,
            imageSrc: HOUSE_META[regions[battleContext.defenderId].houseId].unitImage,
            glyph: HOUSE_META[regions[battleContext.defenderId].houseId].glyph,
          }}
          winChance={battleContext.winChance}
          resolving={isResolvingBattle}
          resultText={battleResult}
          onResolve={resolveBattle}
          onClose={closeBattleModal}
        />
      ) : null}
    </div>
  )
}
