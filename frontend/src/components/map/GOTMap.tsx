'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { mapPaths, type RegionId } from '@/assets/mapPaths'
import BattleModal from './BattleModal'
import BattlePath from './BattlePath'
import BattleSkirmish3D from './BattleSkirmish3D'
import ClashEffect from './ClashEffect'
import AIDecisionPanel, { type AIDecisionTreeSnapshot } from './AIDecisionPanel'
import AIDecisionPopup from './AIDecisionPopup'
import EventLog from './EventLog'
import FloatingStatText from './FloatingStatText'
import UnitToken from './UnitToken'
import SimulationBar from './SimulationBar'
import { type HouseId, regionData } from '@/data/regionData'
import { resolveBattle as calculateBattleResolution } from '@/lib/helpers/battleResolution'
import { pickAIDecision, previewFuzzyInputs } from '@/lib/ai/aiController'
import type { AIDecisionTrace, FuzzyStrategicOutput } from '@/lib/ai/types'
import { createInitialDiplomacy, PLAYABLE_HOUSES, type DiplomacyMatrix, type RelationState } from '@/lib/helpers/diplomacy'

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

type PlayableHouseId = Exclude<HouseId, 'neutral'>

const HOUSE_META: Record<HouseId, { label: string; color: string; glyph: string; unitImage?: string; unitModel?: string }> = {
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
  neutral: {
    label: 'Neutral Houses',
    color: '#c6ab85',
    glyph: '⚜',
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
type DecisionAction = 'attack' | 'defend' | 'hold' | 'reinforce' | 'fortify' | 'recruit' | 'gather'

type ActionCue = {
  id: number
  action: DecisionAction
  houseId: HouseId
  houseLabel: string
  primaryRegionId: RegionId
  targetRegionId?: RegionId
  message: string
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const AUTO_SIMULATION_STEP_MS = 1700
const AUTO_SIMULATION_BATTLE_PAUSE_MS = 900
const AUTO_SIMULATION_RESULT_PAUSE_MS = 1100
const DEMO_TURN_LIMIT = 8
const DECISION_STEP_DELAY_MS = 1800
const DECISION_FINAL_DELAY_MS = 2600
const LEARNING_MODE_SIMPLE = true

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
  const [turn, setTurn] = useState(1)
  const [currentFaction, setCurrentFaction] = useState<PlayableHouseId>('stark')
  const [simulationPhase, setSimulationPhase] = useState<'idle' | 'battle' | 'ending'>('idle')
  const [resourcesByHouse, setResourcesByHouse] = useState<
    Record<PlayableHouseId, { gold: number; food: number; influence: number }>
  >({
    stark: { gold: 230, food: 260, influence: 130 },
    lannister: { gold: 260, food: 220, influence: 140 },
    tyrell: { gold: 240, food: 280, influence: 135 },
    targaryen: { gold: 250, food: 230, influence: 145 },
  })
  const [diplomacy, setDiplomacy] = useState<DiplomacyMatrix>(() => createInitialDiplomacy())
  const [turnBanner, setTurnBanner] = useState<string>('Turn 1 • House Stark')
  const [hasActedThisTurn, setHasActedThisTurn] = useState(false)
  const [aiReason, setAiReason] = useState<string | null>(null)
  const [aiFuzzy, setAiFuzzy] = useState<FuzzyStrategicOutput | null>(null)
  const [aiTree, setAiTree] = useState<AIDecisionTreeSnapshot | null>(null)
  const [aiSimulationNote, setAiSimulationNote] = useState<string | null>(null)
  const [decisionPopupOpen, setDecisionPopupOpen] = useState(false)
  const [decisionPopupStep, setDecisionPopupStep] = useState(0)
  const [decisionPopupTrace, setDecisionPopupTrace] = useState<AIDecisionTrace | null>(null)
  const [decisionPopupReason, setDecisionPopupReason] = useState<string | null>(null)
  const [decisionPopupHouseLabel, setDecisionPopupHouseLabel] = useState<string>('')
  const [decisionPopupPaused, setDecisionPopupPaused] = useState(false)
  const [isAutoSimulating, setIsAutoSimulating] = useState(false)
  const [winnerHouse, setWinnerHouse] = useState<PlayableHouseId | null>(null)
  const [winnerReason, setWinnerReason] = useState<string | null>(null)
  const [actionCue, setActionCue] = useState<ActionCue | null>(null)
  const floatingIdRef = useRef(0)
  const actionCueIdRef = useRef(0)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const decisionPopupPausedRef = useRef(false)
  const decisionVisualizationRunRef = useRef(0)

  const activeResources = resourcesByHouse[currentFaction]

  const availableRegions = useMemo(
    () => regionOrder.filter((regionId) => mapPaths[regionId].trim().length > 0),
    []
  )

  const territoryCounts = useMemo(() => {
    const counts: Record<PlayableHouseId, number> = {
      stark: 0,
      lannister: 0,
      tyrell: 0,
      targaryen: 0,
    }

    for (const regionId of availableRegions) {
      const owner = regions[regionId].houseId
      if (owner !== 'neutral') {
        counts[owner] += 1
      }
    }

    return counts
  }, [availableRegions, regions])

  const currentFuzzyInputs = useMemo(
    () =>
      previewFuzzyInputs({
        house: currentFaction,
        regions,
        availableRegionIds: availableRegions,
        diplomacy,
        resources: activeResources,
      }),
    [activeResources, availableRegions, currentFaction, diplomacy, regions]
  )

  const selectedData = selectedRegion ? regions[selectedRegion] : null
  const isSelectedOwnedByCurrentFaction = selectedData && selectedData.houseId === currentFaction
  const canRecruit = !LEARNING_MODE_SIMPLE && isSelectedOwnedByCurrentFaction && !isBattleModalOpen && !isResolvingBattle && !hasActedThisTurn && !isAutoSimulating
  const canFortify = !LEARNING_MODE_SIMPLE && isSelectedOwnedByCurrentFaction && !isBattleModalOpen && !isResolvingBattle && !hasActedThisTurn && !isAutoSimulating
  const canPrimeAttacker = isSelectedOwnedByCurrentFaction && !isBattleModalOpen && !isResolvingBattle && !hasActedThisTurn && !isAutoSimulating
  const canGatherResources = isSelectedOwnedByCurrentFaction && !isBattleModalOpen && !isResolvingBattle && !hasActedThisTurn && !isAutoSimulating

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
    if (!source.neighbors.includes(targetId)) return false
    if (source.houseId === target.houseId) return false
    if (target.houseId === 'neutral') return true
    if (source.houseId === 'neutral') return false
    return diplomacy[source.houseId][target.houseId] === 'hostile'
  }

  const highlightedNeighbors = useMemo<RegionId[]>(() => {
    if (!selectedRegion) return []
    return regions[selectedRegion].neighbors
  }, [regions, selectedRegion])

  const addEvent = (entry: string) => {
    setEventLog((prev) => [entry, ...prev].slice(0, 9))
  }

  useEffect(() => {
    decisionPopupPausedRef.current = decisionPopupPaused
  }, [decisionPopupPaused])

  const closeDecisionPopup = () => {
    decisionVisualizationRunRef.current += 1
    decisionPopupPausedRef.current = false
    setDecisionPopupPaused(false)
    setDecisionPopupOpen(false)
  }

  const waitForVisualizationStep = async (ms: number, runId: number) => {
    let elapsed = 0

    while (elapsed < ms) {
      if (decisionVisualizationRunRef.current !== runId) return false

      if (decisionPopupPausedRef.current) {
        await wait(120)
        continue
      }

      const slice = Math.min(120, ms - elapsed)
      await wait(slice)
      elapsed += slice
    }

    return decisionVisualizationRunRef.current === runId
  }

  const runDecisionVisualization = async (trace: AIDecisionTrace, reason: string) => {
    const totalSteps = trace.ruleCalculations.length + 4
    const runId = decisionVisualizationRunRef.current + 1
    decisionVisualizationRunRef.current = runId
    setDecisionPopupHouseLabel(HOUSE_META[currentFaction].label)
    setDecisionPopupTrace(trace)
    setDecisionPopupReason(reason)
    setDecisionPopupStep(0)
    setDecisionPopupPaused(false)
    decisionPopupPausedRef.current = false
    setDecisionPopupOpen(true)

    for (let step = 0; step < totalSteps; step += 1) {
      if (decisionVisualizationRunRef.current !== runId) return
      setDecisionPopupStep(step)
      const keepGoing = await waitForVisualizationStep(
        step === totalSteps - 1 ? DECISION_FINAL_DELAY_MS : DECISION_STEP_DELAY_MS,
        runId
      )
      if (!keepGoing) return
    }
  }

  const triggerActionCue = (payload: Omit<ActionCue, 'id'>) => {
    const id = ++actionCueIdRef.current
    setActionCue({ id, ...payload })
    setTimeout(() => {
      setActionCue((prev) => (prev?.id === id ? null : prev))
    }, 1700)
  }

  const buildTreeFromTrace = (trace: AIDecisionTrace): AIDecisionTreeSnapshot => {
    const candidateActions = trace.candidates.map((candidate) => ({
      label: candidate.label,
      action: candidate.action,
      score: candidate.score,
      chosen: trace.finalDecisionLabel.toLowerCase().startsWith(candidate.label.toLowerCase()),
    }))

    const top = candidateActions[0] || {
      action: 'hold' as const,
      score: 0,
    }

    return {
      stateInputs: {
        ownStrength: trace.inputs.ownStrength,
        enemyStrength: trace.inputs.enemyStrength,
        regionImportance: trace.inputs.regionImportance,
        resources: trace.inputs.resources,
        aggression: trace.inputs.aggression,
      },
      topPriority: {
        action: top.action,
        score: top.score,
      },
      candidateActions,
      finalDecisionLabel: trace.finalDecisionLabel,
    }
  }

  const resolveAttackImmediately = async (sourceId: RegionId, targetId: RegionId) => {
    if (!canAttackTarget(sourceId, targetId)) {
      addEvent(`Attack blocked: ${regions[targetId].name} is not a valid hostile neighbor.`)
      return
    }

    const attacker = regions[sourceId]
    const defender = regions[targetId]
    triggerActionCue({
      action: 'attack',
      houseId: attacker.houseId,
      houseLabel: attacker.house,
      primaryRegionId: sourceId,
      targetRegionId: targetId,
      message: `${attacker.house} attacks ${defender.name}`,
    })
    const outcome = calculateBattleResolution({
      attackerArmy: attacker.army,
      defenderArmy: defender.army,
      defenderDefense: defender.defense,
    })

    setHasActedThisTurn(true)
    setSimulationPhase('ending')
    await wait(AUTO_SIMULATION_BATTLE_PAUSE_MS)

    if (outcome.attackerWins) {
      setRegions((prev) => ({
        ...prev,
        [sourceId]: {
          ...prev[sourceId],
          army: outcome.attackerAfter,
        },
        [targetId]: {
          ...prev[targetId],
          army: outcome.defenderAfter,
          houseId: prev[sourceId].houseId,
          house: prev[sourceId].house,
        },
      }))
      addEvent(`${attacker.house} captures ${defender.name}.`)
      await wait(AUTO_SIMULATION_BATTLE_PAUSE_MS)
      return
    }

    setRegions((prev) => ({
      ...prev,
      [sourceId]: {
        ...prev[sourceId],
        army: outcome.attackerAfter,
      },
      [targetId]: {
        ...prev[targetId],
        army: outcome.defenderAfter,
      },
    }))
    addEvent(`${defender.house} holds ${defender.name} after ${attacker.house} assault.`)
    await wait(AUTO_SIMULATION_BATTLE_PAUSE_MS)
  }

  const updateCurrentResources = (delta: Partial<{ gold: number; food: number; influence: number }>) => {
    setResourcesByHouse((prev) => ({
      ...prev,
      [currentFaction]: {
        gold: prev[currentFaction].gold + (delta.gold || 0),
        food: prev[currentFaction].food + (delta.food || 0),
        influence: prev[currentFaction].influence + (delta.influence || 0),
      },
    }))
  }

  const cycleRelation = (house: PlayableHouseId) => {
    if (house === currentFaction) return
    setDiplomacy((prev) => {
      const current = prev[currentFaction][house]
      const next: RelationState = current === 'hostile' ? 'neutral' : current === 'neutral' ? 'allied' : 'hostile'
      addEvent(`${HOUSE_META[currentFaction].label} relation with ${HOUSE_META[house].label} changed to ${next}.`)
      return {
        ...prev,
        [currentFaction]: {
          ...prev[currentFaction],
          [house]: next,
        },
      }
    })
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
    setHasActedThisTurn(true)
    triggerActionCue({
      action: 'attack',
      houseId: attacker.houseId,
      houseLabel: attacker.house,
      primaryRegionId: sourceId,
      targetRegionId: targetId,
      message: `${attacker.house} attacks ${defender.name}`,
    })
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

  const runAutoCinematicAttack = async (sourceId: RegionId, targetId: RegionId) => {
    setAttackSource(sourceId)
    await launchAttackSequence(sourceId, targetId)
    await wait(220)
    await resolveBattle()
    await wait(AUTO_SIMULATION_RESULT_PAUSE_MS)
    closeBattleModal()
  }

  const handleRegionPick = (regionId: RegionId) => {
    setSelectedRegion(regionId)
    if (attackSource && attackSource !== regionId) {
      void launchAttackSequence(attackSource, regionId)
    }
  }

  const handleRecruit = (regionId = selectedRegion) => {
    if (!regionId) return
    if (resourcesByHouse[currentFaction].gold < 40) {
      addEvent(`${HOUSE_META[currentFaction].label} lacks gold to recruit.`)
      return
    }
    const bonus = 8
    setRegions((prev) => {
      const updated = {
        ...prev,
        [regionId]: {
          ...prev[regionId],
          army: prev[regionId].army + bonus,
        },
      }
      return updated
    })
    updateCurrentResources({ gold: -40 })
    setHasActedThisTurn(true)
    setSimulationPhase('ending')
    triggerActionCue({
      action: 'recruit',
      houseId: regions[regionId].houseId,
      houseLabel: regions[regionId].house,
      primaryRegionId: regionId,
      message: `${regions[regionId].house} recruits in ${regions[regionId].name}`,
    })
    const pos = regions[regionId].tokenPosition
    addFloatingText(pos.x, pos.y, `+${bonus} Army`, 'positive')
    addEvent(`${regions[regionId].house} recruited troops in ${regions[regionId].name}: +${bonus} Army.`)
  }

  const handleFortify = (regionId = selectedRegion) => {
    if (!regionId) return
    setFortifiedRegion(regionId)
    setRegions((prev) => ({
      ...prev,
      [regionId]: {
        ...prev[regionId],
        defense: prev[regionId].defense + 2,
      },
    }))
    setHasActedThisTurn(true)
    setSimulationPhase('ending')
    triggerActionCue({
      action: 'fortify',
      houseId: regions[regionId].houseId,
      houseLabel: regions[regionId].house,
      primaryRegionId: regionId,
      message: `${regions[regionId].house} fortifies ${regions[regionId].name}`,
    })
    const pos = regions[regionId].tokenPosition
    addFloatingText(pos.x, pos.y, '+2 Defense', 'neutral')
    addFloatingText(pos.x + 18, pos.y - 16, 'Shield Wall', 'neutral')
    addEvent(`${regions[regionId].house} fortified ${regions[regionId].name}.`)
    setTimeout(() => setFortifiedRegion((prev) => (prev === regionId ? null : prev)), 1300)
  }

  const handleGatherResources = (regionId = selectedRegion) => {
    if (!regionId) return
    const goldBonus = 16 + Math.floor(Math.random() * 20)
    const foodBonus = 22 + Math.floor(Math.random() * 28)
    const influenceBonus = 8 + Math.floor(Math.random() * 12)

    updateCurrentResources({ gold: goldBonus, food: foodBonus, influence: influenceBonus })
    setHasActedThisTurn(true)
    setSimulationPhase('ending')
    triggerActionCue({
      action: 'gather',
      houseId: regions[regionId].houseId,
      houseLabel: regions[regionId].house,
      primaryRegionId: regionId,
      message: `${regions[regionId].house} gathers in ${regions[regionId].name}`,
    })

    const pos = regions[regionId].tokenPosition
    addFloatingText(pos.x, pos.y - 10, `+${goldBonus} Gold`, 'positive')
    addFloatingText(pos.x, pos.y, `+${foodBonus} Food`, 'positive')
    addFloatingText(pos.x + 20, pos.y - 18, `+${influenceBonus} Influence`, 'positive')
    addEvent(
      `${regions[regionId].house} gathered resources in ${regions[regionId].name}: +${goldBonus} Gold, +${foodBonus} Food, +${influenceBonus} Influence.`
    )
  }

  const handleReinforceIntent = (regionId: RegionId | null) => {
    const reinforceCost = 20
    if (!regionId) {
      setHasActedThisTurn(true)
      setSimulationPhase('ending')
      setAiSimulationNote('Intention simulation only: reinforce chosen, but no focus region was available.')
      addEvent('Simulation: reinforce intention recorded, but no region was available to highlight.')
      return
    }

    setResourcesByHouse((prev) => ({
      ...prev,
      [currentFaction]: {
        ...prev[currentFaction],
        gold: Math.max(0, prev[currentFaction].gold - reinforceCost),
      },
    }))

    const pos = regions[regionId].tokenPosition
    addFloatingText(pos.x, pos.y, 'Intent: Reinforce', 'neutral')
    addFloatingText(pos.x + 14, pos.y - 18, `-${reinforceCost} Gold`, 'negative')
    setHasActedThisTurn(true)
    setSimulationPhase('ending')
    setAiSimulationNote(`Reinforce simulation: reserve spending of ${reinforceCost} gold to prepare troops and supplies.`)
    addEvent(`${HOUSE_META[currentFaction].label} reinforces ${regions[regionId].name}: -${reinforceCost} Gold.`)
  }

  const getHouseOrder = (): PlayableHouseId[] => PLAYABLE_HOUSES

  const handleEndTurn = async () => {
    if (isBattleModalOpen || isResolvingBattle) return

    const turnOrder = getHouseOrder()
    const currentIndex = turnOrder.indexOf(currentFaction)
    const nextFaction = turnOrder[(currentIndex + 1) % turnOrder.length]

    if (nextFaction === 'stark') {
      setTurn((prev) => prev + 1)
      addEvent('New round begins across the realm.')
    }

    setCurrentFaction(nextFaction)
    setSimulationPhase('idle')
    setSelectedRegion(null)
    setAttackSource(null)
    setHasActedThisTurn(false)
    setAiReason(null)
    setAiFuzzy(null)
    setAiTree(null)
    setAiSimulationNote(null)
    clearBattleVisuals()
    setTurnBanner(`${HOUSE_META[nextFaction].label} takes the field`)
    setTimeout(() => setTurnBanner(''), 1400)

    const factionRegions = availableRegions.filter((rid) => regions[rid].houseId === nextFaction)
    if (factionRegions.length > 0) {
      const resourcePerRegion = 12
      setResourcesByHouse((prev) => ({
        ...prev,
        [nextFaction]: {
          gold: prev[nextFaction].gold + resourcePerRegion * factionRegions.length,
          food: prev[nextFaction].food + 18 * factionRegions.length,
          influence: prev[nextFaction].influence + 7 * factionRegions.length,
        },
      }))
      addEvent(`${HOUSE_META[nextFaction].label} gains income from ${factionRegions.length} controlled regions.`)
    }

    await wait(600)
  }

  const handleAITakeAction = async (autoMode = false) => {
    if (isBattleModalOpen || isResolvingBattle || hasActedThisTurn) return

    const decision = pickAIDecision({
      house: currentFaction,
      regions,
      availableRegionIds: availableRegions,
      diplomacy,
      resources: resourcesByHouse[currentFaction],
    })

    if (!decision) {
      addEvent(`${HOUSE_META[currentFaction].label} has no legal AI action.`)
      setHasActedThisTurn(true)
      return
    }

    setAiReason(decision.reason)
    setAiFuzzy(decision.trace.strategic)
    setAiTree(buildTreeFromTrace(decision.trace))
    await runDecisionVisualization(decision.trace, decision.reason)
    addEvent('AI Pipeline: fuzzy inputs -> memberships -> rules -> final action.')
    addEvent(`AI: ${decision.reason}`)
    setSelectedRegion(decision.regionId || decision.targetId)

    const cueRegionId = decision.regionId || decision.targetId
    if (cueRegionId) {
      const cueMessage =
        decision.action === 'attack' && decision.targetId
          ? `${HOUSE_META[currentFaction].label} intends to attack ${regions[decision.targetId].name}`
          : decision.action === 'defend'
            ? `${HOUSE_META[currentFaction].label} intends to defend ${regions[cueRegionId].name}`
            : decision.action === 'reinforce'
              ? `${HOUSE_META[currentFaction].label} intends to reinforce ${regions[cueRegionId].name}`
              : `${HOUSE_META[currentFaction].label} holds position in ${regions[cueRegionId].name}`

      triggerActionCue({
        action: decision.action,
        houseId: currentFaction,
        houseLabel: HOUSE_META[currentFaction].label,
        primaryRegionId: cueRegionId,
        targetRegionId: decision.targetId || undefined,
        message: cueMessage,
      })

      const pos = regions[cueRegionId].tokenPosition
      const floatText =
        decision.action === 'attack'
          ? 'Intent: Attack'
          : decision.action === 'defend'
            ? 'Intent: Defend'
            : decision.action === 'reinforce'
              ? 'Intent: Reinforce'
              : 'Intent: Hold'
      addFloatingText(pos.x, pos.y, floatText, 'neutral')
    }

    setHasActedThisTurn(true)
    setSimulationPhase('ending')

    if (decision.action === 'attack') {
      setAiSimulationNote('Intention simulation only: the house would attack, but battle resolution is intentionally disabled for fuzzy-only testing.')
      addEvent('Simulation: attack intention recorded only. No battle executed.')
      return
    }

    if (decision.action === 'defend') {
      setAiSimulationNote('Intention simulation only: the house would defend this focus region this turn.')
      addEvent('Simulation: defend intention recorded only. No defense model executed.')
      return
    }

    if (decision.action === 'reinforce') {
      handleReinforceIntent(decision.regionId)
      return
    }

    setAiSimulationNote('Intention simulation only: the house holds position and waits for a better opportunity.')
    addEvent('Simulation: hold intention recorded only. No map state changed.')
  }

  const startAutoSimulation = () => {
    setWinnerHouse(null)
    setWinnerReason(null)
    setIsAutoSimulating(true)
    addEvent('Auto simulation started: AI council now controls all houses.')
  }

  const stopAutoSimulation = () => {
    setIsAutoSimulating(false)
    addEvent('Auto simulation paused.')
  }

  useEffect(() => {
    const fullControlHouse = PLAYABLE_HOUSES.find((house) => territoryCounts[house] === availableRegions.length)
    if (fullControlHouse && !winnerHouse) {
      setWinnerHouse(fullControlHouse)
      setWinnerReason(`${HOUSE_META[fullControlHouse].label} controls the entire realm.`)
      setIsAutoSimulating(false)
      addEvent(`Victory declared: ${HOUSE_META[fullControlHouse].label} wins the Iron Throne.`)
    }
  }, [availableRegions.length, territoryCounts, winnerHouse])

  useEffect(() => {
    if (!isAutoSimulating) return
    if (winnerHouse) return

    if (turn >= DEMO_TURN_LIMIT) {
      setIsAutoSimulating(false)
      addEvent(`Fuzzy-only demo complete after ${DEMO_TURN_LIMIT} turns. Review the event log and AI panel outputs.`)
      return
    }

    if (isBattleModalOpen || isResolvingBattle) return

    const timer = setTimeout(() => {
      if (!hasActedThisTurn) {
        void handleAITakeAction(true)
        return
      }
      void handleEndTurn()
    }, AUTO_SIMULATION_STEP_MS)

    return () => clearTimeout(timer)
  }, [
    isAutoSimulating,
    winnerHouse,
    turn,
    hasActedThisTurn,
    isBattleModalOpen,
    isResolvingBattle,
    currentFaction,
    territoryCounts,
  ])

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
    if (currentFaction !== 'stark') {
      addEvent('Featured demo battle is available during House Stark turn.')
      return
    }
    setAttackSource('north')
    setSelectedRegion('north')
    void launchAttackSequence('north', 'riverlands')
  }

  return (
    <>
      <SimulationBar
        turn={turn}
        currentFaction={currentFaction}
        phase={simulationPhase}
        aiInputs={currentFuzzyInputs}
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
        {turnBanner ? <div className="turn-banner">{turnBanner}</div> : null}
        {actionCue ? (
          <div
            className={`action-cue action-cue-${actionCue.action}`}
            style={{ ['--cue-color' as string]: HOUSE_META[actionCue.houseId].color }}
            aria-live="polite"
          >
            <p className="action-cue-eyebrow">{actionCue.houseLabel}</p>
            <p className="action-cue-title">{actionCue.action.toUpperCase()}</p>
            <p className="action-cue-body">{actionCue.message}</p>
          </div>
        ) : null}
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
              style={{ ['--region-owner' as string]: HOUSE_META[regions[regionId].houseId].color }}
              onClick={() => handleRegionPick(regionId)}
            />
          ))}
        </svg>

        {activeAttackerHouse && activeDefenderHouse ? (
          <BattleSkirmish3D
            visible={skirmishVisible}
            attackerColor={activeAttackerHouse.color}
            defenderColor={activeDefenderHouse.color}
            modelSrc={activeAttackerHouse.unitModel || '/models/epic_black_golden_cyber_warrior.glb'}
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
          {actionCue ? (
            <>
              <div
                className={`action-marker action-marker-${actionCue.action}`}
                style={{
                  ['--cue-color' as string]: HOUSE_META[actionCue.houseId].color,
                  left: `${(regions[actionCue.primaryRegionId].tokenPosition.x / 1536) * 100}%`,
                  top: `${(regions[actionCue.primaryRegionId].tokenPosition.y / 1024) * 100}%`,
                }}
              />
              {actionCue.targetRegionId ? (
                <div
                  className={`action-marker action-marker-${actionCue.action} is-target`}
                  style={{
                    ['--cue-color' as string]: HOUSE_META[actionCue.houseId].color,
                    left: `${(regions[actionCue.targetRegionId].tokenPosition.x / 1536) * 100}%`,
                    top: `${(regions[actionCue.targetRegionId].tokenPosition.y / 1024) * 100}%`,
                  }}
                />
              ) : null}
            </>
          ) : null}

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
          <button type="button" className="panel-btn panel-btn-featured" onClick={runFeaturedBattle} disabled={isBattleModalOpen || isResolvingBattle || hasActedThisTurn || isAutoSimulating}>
            Demo: North attacks Riverlands
          </button>
          <button
            type="button"
            className="panel-btn"
            onClick={() => void handleAITakeAction()}
            disabled={isBattleModalOpen || isResolvingBattle || hasActedThisTurn || isAutoSimulating}
          >
            AI Take Action
          </button>
          <button
            type="button"
            className="panel-btn"
            onClick={isAutoSimulating ? stopAutoSimulation : startAutoSimulation}
            disabled={Boolean(winnerHouse)}
          >
            {isAutoSimulating ? 'Pause Simulation' : 'Start Simulation'}
          </button>
          <button
            type="button"
            className="panel-btn panel-btn-endturn"
            onClick={handleEndTurn}
            disabled={isBattleModalOpen || isResolvingBattle || isAutoSimulating}
          >
            End {HOUSE_META[currentFaction].label}'s Turn
          </button>
        </div>

        {winnerHouse ? (
          <div className="winner-banner">
            <p className="winner-title">Winner: {HOUSE_META[winnerHouse].label}</p>
            <p className="winner-reason">{winnerReason}</p>
          </div>
        ) : null}

        <AIDecisionPanel
          activeHouseLabel={HOUSE_META[currentFaction].label}
          turn={turn}
          fuzzy={aiFuzzy}
          tree={aiTree}
          trace={decisionPopupTrace}
          finalReason={aiReason}
          simulationNote={aiSimulationNote}
        />

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
              {!LEARNING_MODE_SIMPLE ? (
                <button type="button" className="panel-btn" onClick={() => handleRecruit()} disabled={!canRecruit}>
                  Recruit (+8 Army)
                </button>
              ) : null}
              {!LEARNING_MODE_SIMPLE ? (
                <button type="button" className="panel-btn" onClick={() => handleFortify()} disabled={!canFortify}>
                  Fortify (+2 Defense)
                </button>
              ) : null}
              <button type="button" className="panel-btn" onClick={() => handleGatherResources()} disabled={!canGatherResources}>
                Gather Resources
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
                Attack mode: click a hostile or neutral neighboring region to launch the clash.
              </p>
            ) : null}

            {LEARNING_MODE_SIMPLE ? (
              <p className="attack-hint">
                Learning Mode: only Attack and Gather are enabled to keep strategy easy to follow.
              </p>
            ) : null}

            <p>
              <strong>Turn Action:</strong> {hasActedThisTurn ? 'Used' : 'Available'}
            </p>
            {aiReason ? (
              <p>
                <strong>AI Intent:</strong> {aiReason}
              </p>
            ) : null}

            <div className="diplomacy-block">
              <p>
                <strong>Diplomacy:</strong> click to cycle relation
              </p>
              <div className="panel-actions">
                {PLAYABLE_HOUSES.filter((house) => house !== currentFaction).map((house) => (
                  <button
                    key={`relation-${house}`}
                    type="button"
                    className="panel-btn"
                    onClick={() => cycleRelation(house)}
                    disabled={isBattleModalOpen || isResolvingBattle || hasActedThisTurn}
                  >
                    {HOUSE_META[house].label}: {diplomacy[currentFaction][house]}
                  </button>
                ))}
              </div>
            </div>
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
          defenderDefense={regions[battleContext.defenderId].defense}
          winChance={battleContext.winChance}
          resolving={isResolvingBattle}
          resultText={battleResult}
          onResolve={resolveBattle}
          onClose={closeBattleModal}
        />
      ) : null}

      <AIDecisionPopup
        open={decisionPopupOpen}
        turn={turn}
        houseLabel={decisionPopupHouseLabel}
        trace={decisionPopupTrace}
        finalReason={decisionPopupReason}
        step={decisionPopupStep}
        paused={decisionPopupPaused}
        onPause={() => setDecisionPopupPaused(true)}
        onResume={() => setDecisionPopupPaused(false)}
        onClose={closeDecisionPopup}
      />
      </div>
    </>
  )
}
