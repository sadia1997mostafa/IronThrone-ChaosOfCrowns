'use client'

import { useMemo, useRef, useState } from 'react'
import { mapPaths, type RegionId } from '@/assets/mapPaths'
import BattleModal from './BattleModal'
import BattlePath from './BattlePath'
import BattleSkirmish3D from './BattleSkirmish3D'
import ClashEffect from './ClashEffect'
import EventLog from './EventLog'
import FloatingStatText from './FloatingStatText'
import UnitToken from './UnitToken'
import SimulationBar from './SimulationBar'
import { type HouseId, regionData } from '@/data/regionData'
import { resolveBattle as calculateBattleResolution } from '@/lib/helpers/battleResolution'

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
  randomBonus: number
}

type BattlePhase = 'idle' | 'targeting' | 'march' | 'impact' | 'briefing'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const SKIRMISH_WEAPONS = {
  attackerSword: '/models/sword1.glb',
  defenderSword: '/models/sword2.glb',
  dagger: '/models/game_of_thrones_wildlings_dagger.glb',
} as const

const FEATURED_BATTLE = {
  attacker: 'north' as RegionId,
  defender: 'riverlands' as RegionId,
}

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
  const [turn, setTurn] = useState(1)
  const [currentFaction, setCurrentFaction] = useState<HouseId>('stark')
  const [simulationPhase, setSimulationPhase] = useState<'idle' | 'battle' | 'ending'>('idle')
  const [gold, setGold] = useState(850)
  const [food, setFood] = useState(720)
  const [influence, setInfluence] = useState(480)
  const floatingIdRef = useRef(0)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const availableRegions = useMemo(
    () => regionOrder.filter((regionId) => mapPaths[regionId].trim().length > 0),
    []
  )

  const selectedData = selectedRegion ? regions[selectedRegion] : null
  const isSelectedOwnedByCurrentFaction = selectedData && selectedData.houseId === currentFaction
  const canRecruit = isSelectedOwnedByCurrentFaction && !isBattleModalOpen && !isResolvingBattle
  const canFortify = isSelectedOwnedByCurrentFaction && !isBattleModalOpen && !isResolvingBattle
  const canPrimeAttacker = isSelectedOwnedByCurrentFaction && !isBattleModalOpen && !isResolvingBattle
  const canGatherResources = isSelectedOwnedByCurrentFaction && !isBattleModalOpen && !isResolvingBattle

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
    if (sourceId !== FEATURED_BATTLE.attacker || targetId !== FEATURED_BATTLE.defender) {
      return false
    }

    const source = regions[sourceId]
    const target = regions[targetId]
    return source.neighbors.includes(targetId) && source.houseId !== target.houseId
  }

  const highlightedNeighbors = useMemo<RegionId[]>(() => {
    if (!selectedRegion) return []
    return regions[selectedRegion].neighbors
  }, [regions, selectedRegion])

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
    const preBattle = calculateBattleResolution({
      attackerArmy: attacker.army,
      defenderArmy: defender.army,
      defenderDefense: defender.defense,
    })

    setAttackSource(sourceId)
    setSelectedRegion(targetId)
    setBattleResult(null)
    setBattleContext({
      attackerId: sourceId,
      defenderId: targetId,
      winChance: preBattle.winChance,
      randomBonus: preBattle.randomBonus,
    })
    setIsCinematicActive(true)
    setBattlePhase('targeting')
    setBattlePath(null)
    setSimulationPhase('battle')
    addEvent(`${attacker.house} attacked ${defender.name}.`)

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
    addEvent(`${regions[selectedRegion].house} recruited troops in ${regions[selectedRegion].name}: +${bonus} Army.`)
  }

  const handleFortify = () => {
    if (!selectedRegion) return
    setFortifiedRegion(selectedRegion)
    const pos = regions[selectedRegion].tokenPosition
    addFloatingText(pos.x, pos.y, 'Shield Wall', 'neutral')
    addEvent(`${regions[selectedRegion].house} fortified ${regions[selectedRegion].name}.`)
    setTimeout(() => setFortifiedRegion((prev) => (prev === selectedRegion ? null : prev)), 1300)
  }

  const handleGatherResources = () => {
    if (!selectedRegion) return
    const goldBonus = 40 + Math.floor(Math.random() * 80)
    const foodBonus = 60 + Math.floor(Math.random() * 100)
    const influenceBonus = 20 + Math.floor(Math.random() * 45)
    
    setGold((prev) => prev + goldBonus)
    setFood((prev) => prev + foodBonus)
    setInfluence((prev) => prev + influenceBonus)
    
    const pos = regions[selectedRegion].tokenPosition
    addFloatingText(pos.x, pos.y, `+${foodBonus} Food`, 'positive')
    addEvent(
      `${regions[selectedRegion].house} gathered resources in ${regions[selectedRegion].name}: +${goldBonus} Gold, +${foodBonus} Food, +${influenceBonus} Influence.`
    )
  }

  const getHouseOrder = (): HouseId[] => ['stark', 'lannister', 'tyrell', 'targaryen']

  const handleEndTurn = async () => {
    if (isBattleModalOpen || isResolvingBattle) return

    const turnOrder = getHouseOrder()
    const currentIndex = turnOrder.indexOf(currentFaction)
    const nextFaction = turnOrder[(currentIndex + 1) % turnOrder.length]

    // Auto-generate some events for the turn change
    if (nextFaction === 'stark') {
      setTurn((prev) => prev + 1)
      addEvent('═══════════════════════════════════')
    }

    setCurrentFaction(nextFaction)
    setSimulationPhase('idle')
    setSelectedRegion(null)
    setAttackSource(null)
    clearBattleVisuals()

    // Grant resources to the new faction regions
    const factionRegions = availableRegions.filter((rid) => regions[rid].houseId === nextFaction)
    if (factionRegions.length > 0) {
      const resourcePerRegion = 30
      setGold((prev) => prev + resourcePerRegion * factionRegions.length)
      setFood((prev) => prev + 45 * factionRegions.length)
      setInfluence((prev) => prev + 15 * factionRegions.length)
      addEvent(`${HOUSE_META[nextFaction].label} gains income from ${factionRegions.length} controlled regions.`)
    }

    await wait(600)
  }

  const resolveBattle = async () => {
    if (!battleContext || isResolvingBattle) return
    const attacker = regions[battleContext.attackerId]
    const defender = regions[battleContext.defenderId]

    setIsResolvingBattle(true)
    await wait(500)
    const outcome = calculateBattleResolution({
      attackerArmy: attacker.army,
      defenderArmy: defender.army,
      defenderDefense: defender.defense,
    })

    if (outcome.attackerWins) {
      setRegions((prev) => ({
        ...prev,
        [battleContext.attackerId]: {
          ...prev[battleContext.attackerId],
          army: outcome.attackerAfter,
        },
        [battleContext.defenderId]: {
          ...prev[battleContext.defenderId],
          army: outcome.defenderAfter,
          houseId: prev[battleContext.attackerId].houseId,
          house: prev[battleContext.attackerId].house,
        },
      }))

      const sourcePos = attacker.tokenPosition
      const targetPos = defender.tokenPosition
      addFloatingText(sourcePos.x, sourcePos.y, `-${outcome.attackerLoss} Army`, 'negative')
      addFloatingText(targetPos.x, targetPos.y, 'Captured', 'positive')
      addEvent(`${defender.name} was captured by ${attacker.house}.`)
      setBattleResult(`${attacker.house} captures ${defender.name}`)
      playWarCue('result')
    } else {
      setRegions((prev) => ({
        ...prev,
        [battleContext.attackerId]: {
          ...prev[battleContext.attackerId],
          army: outcome.attackerAfter,
        },
        [battleContext.defenderId]: {
          ...prev[battleContext.defenderId],
          army: outcome.defenderAfter,
        },
      }))

      const sourcePos = attacker.tokenPosition
      const targetPos = defender.tokenPosition
      addFloatingText(sourcePos.x, sourcePos.y, `-${outcome.attackerLoss} Army`, 'negative')
      addFloatingText(targetPos.x, targetPos.y, `-${outcome.defenderLoss} Army`, 'negative')
      addEvent(`${defender.house} holds ${defender.name} under heavy assault from ${attacker.house}.`)
      setBattleResult(`${defender.house} holds ${defender.name}`)
      playWarCue('result')
    }

    setSimulationPhase('ending')
    setIsResolvingBattle(false)
  }

  const runFeaturedBattle = () => {
    setAttackSource(FEATURED_BATTLE.attacker)
    setSelectedRegion(FEATURED_BATTLE.attacker)
    void launchAttackSequence(FEATURED_BATTLE.attacker, FEATURED_BATTLE.defender)
  }

  return (
    <>
      <SimulationBar
        turn={turn}
        currentFaction={currentFaction}
        phase={simulationPhase}
        gold={gold}
        food={food}
        influence={influence}
        factionColors={{
          stark: HOUSE_META.stark.color,
          lannister: HOUSE_META.lannister.color,
          targaryen: HOUSE_META.targaryen.color,
          tyrell: HOUSE_META.tyrell.color,
        }}
      />
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
              className={`region ${selectedRegion === regionId ? 'active' : ''} ${highlightedNeighbors.includes(regionId) ? 'neighbor' : ''}`}
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
          <button
            type="button"
            className="panel-btn panel-btn-endturn"
            onClick={handleEndTurn}
            disabled={isBattleModalOpen || isResolvingBattle}
          >
            End {HOUSE_META[currentFaction].label}'s Turn
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
              <strong>Defense:</strong> {selectedData.defense}
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
                Fortify (Shield)
              </button>
              <button type="button" className="panel-btn" onClick={handleGatherResources} disabled={!canGatherResources}>
                Harvest (+40/+60/+20)
              </button>
              <button
                type="button"
                className="panel-btn panel-btn-attack"
                onClick={() => setAttackSource(FEATURED_BATTLE.attacker)}
                disabled={!canPrimeAttacker || selectedRegion !== FEATURED_BATTLE.attacker}
              >
                {attackSource === FEATURED_BATTLE.attacker ? 'Stark Attacker Ready' : 'Set Stark as Attacker'}
              </button>
              {attackSource ? (
                <button type="button" className="panel-btn" onClick={() => setAttackSource(null)} disabled={isBattleModalOpen || isResolvingBattle}>
                  Cancel Attack Mode
                </button>
              ) : null}
            </div>

            {attackSource ? (
              <p className="attack-hint">
                Attack mode: click Riverlands to launch the featured North to Riverlands clash.
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

        <EventLog entries={eventLog} />
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
    </>
  )
}
