'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { mapPaths, type RegionId } from '@/assets/mapPaths'
import BattleModal from './BattleModal'
import BattleMinimaxPopup from './BattleMinimaxPopup'
import BattlePath from './BattlePath'
import BattleSkirmish3D from './BattleSkirmish3D'
import ClashEffect from './ClashEffect'
import AIDecisionPanel, { type AIBattleTreeSnapshot, type AIDecisionTreeSnapshot } from './AIDecisionPanel'
import AIDecisionPopup from './AIDecisionPopup'
import EventLog from './EventLog'
import FloatingStatText from './FloatingStatText'
import UnitToken from './UnitToken'
import SimulationBar from './SimulationBar'
import { type HouseId, regionData } from '@/data/regionData'
import { pickAIDecision, previewFuzzyInputs } from '@/lib/ai/aiController'
import type { AIDecisionTrace, FuzzyStrategicOutput } from '@/lib/ai/types'
import { createInitialDiplomacy, PLAYABLE_HOUSES, type DiplomacyMatrix, type RelationState } from '@/lib/helpers/diplomacy'
import { BATTLE_LOSS_PERCENT, BattleAction, chooseBestMove, createBattleState, type BattleState } from '@/lib/minimax/battleMinimax'

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
    glyph: 'ðŸº',
    unitImage: '/images/houses/stark/unit.png',
    unitModel: '/models/epic_black_golden_cyber_warrior.glb',
  },
  lannister: {
    label: 'House Lannister',
    color: '#ff9d67',
    glyph: 'ðŸ¦',
    unitImage: '/images/houses/lannister/unit.png',
    unitModel: '/models/epic_black_golden_cyber_warrior.glb',
  },
  targaryen: {
    label: 'House Targaryen',
    color: '#ff6f6f',
    glyph: 'ðŸ‰',
    unitImage: '/images/houses/targaryen/unit.png',
    unitModel: '/models/epic_black_golden_cyber_warrior.glb',
  },
  tyrell: {
    label: 'House Tyrell',
    color: '#a5de8b',
    glyph: 'ðŸŒ¿',
    unitImage: '/images/houses/tyrell/unit.png',
    unitModel: '/models/epic_black_golden_cyber_warrior.glb',
  },
  neutral: {
    label: 'Neutral Houses',
    color: '#c6ab85',
    glyph: 'âšœ',
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
  projectedScore: number
  projectedBestAction: BattleAction | null
  finalState: BattleState
}

type BattlePhase = 'idle' | 'targeting' | 'march' | 'impact' | 'briefing'
type DecisionAction = 'attack' | 'defend' | 'guard' | 'withdraw' | 'hold' | 'reinforce' | 'fortify' | 'recruit' | 'gather'

type ActionCue = {
  id: number
  action: DecisionAction
  houseId: HouseId
  houseLabel: string
  primaryRegionId: RegionId
  targetRegionId?: RegionId
  message: string
}

type BattleStepSummary = {
  round: number
  attackerAction: BattleAction | null
  defenderAction: BattleAction | null
  attackerArmyBefore: number
  defenderArmyBefore: number
  attackerArmyAfter: number | null
  defenderArmyAfter: number | null
  resolutionText: string
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const AUTO_SIMULATION_STEP_MS = 1150
const AUTO_SIMULATION_BATTLE_PAUSE_MS = 650
const AUTO_SIMULATION_RESULT_PAUSE_MS = 760
const DECISION_STEP_DELAY_MS = 1300
const DECISION_FINAL_DELAY_MS = 1700
const AUTO_DECISION_STEP_DELAY_MS = 650
const AUTO_DECISION_FINAL_DELAY_MS = 900
const AUTO_ATTACK_CINEMATIC_SCALE = 0.55
const BATTLE_WINNER_BANNER_MS = 2200
const SIMULATION_RESUME_BANNER_MS = 1200
const LEARNING_MODE_SIMPLE = true
const AI_DEFEND_DEFENSE_BONUS = 2
const AI_REINFORCE_GOLD_COST = 20
const AI_REINFORCE_ARMY_BONUS = 10
const AI_HOLD_ARMY_BONUS = 4
const AI_HOLD_GOLD_BONUS = 10
const AI_HOLD_FOOD_BONUS = 12
const AI_HOLD_INFLUENCE_BONUS = 4
const AI_CAPTURE_GARRISON_SHARE = 0.6

const SKIRMISH_WEAPONS = {
  attackerSword: '/models/sword1.glb',
  defenderSword: '/models/sword2.glb',
  dagger: '/models/sword1.glb',
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
  const [turnBanner, setTurnBanner] = useState<string>('Turn 1 â€¢ House Stark')
  const [hasActedThisTurn, setHasActedThisTurn] = useState(false)
  const [aiReason, setAiReason] = useState<string | null>(null)
  const [aiFuzzy, setAiFuzzy] = useState<FuzzyStrategicOutput | null>(null)
  const [aiTree, setAiTree] = useState<AIDecisionTreeSnapshot | null>(null)
  const [aiBattleTree, setAiBattleTree] = useState<AIBattleTreeSnapshot | null>(null)
  const [battleMinimaxPopupOpen, setBattleMinimaxPopupOpen] = useState(false)
  const [battlePlaybackPath, setBattlePlaybackPath] = useState<number[] | null>(null)
  const [battleStepSummary, setBattleStepSummary] = useState<BattleStepSummary | null>(null)
  const [aiSimulationNote, setAiSimulationNote] = useState<string | null>(null)
  const [decisionPopupOpen, setDecisionPopupOpen] = useState(false)
  const [decisionPopupStep, setDecisionPopupStep] = useState(0)
  const [decisionPopupTrace, setDecisionPopupTrace] = useState<AIDecisionTrace | null>(null)
  const [decisionPopupReason, setDecisionPopupReason] = useState<string | null>(null)
  const [decisionPopupHouseLabel, setDecisionPopupHouseLabel] = useState<string>('')
  const [decisionPopupPaused, setDecisionPopupPaused] = useState(false)
  const [isAutoSimulating, setIsAutoSimulating] = useState(false)
  const [hasSimulationStarted, setHasSimulationStarted] = useState(false)
  const [isSimulationSequenceBusy, setIsSimulationSequenceBusy] = useState(false)
  const [actionCue, setActionCue] = useState<ActionCue | null>(null)
  const floatingIdRef = useRef(0)
  const actionCueIdRef = useRef(0)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const decisionPopupPausedRef = useRef(false)
  const decisionVisualizationRunRef = useRef(0)
  const isAutoSimulatingRef = useRef(false)
  const pendingAutoBattleResumeRef = useRef<(() => void) | null>(null)

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

  const totalArmyByHouse = useMemo(() => {
    const totals: Record<PlayableHouseId, number> = {
      stark: 0,
      lannister: 0,
      tyrell: 0,
      targaryen: 0,
    }

    for (const regionId of availableRegions) {
      const owner = regions[regionId].houseId
      if (owner !== 'neutral') {
        totals[owner] += regions[regionId].army
      }
    }

    return totals
  }, [availableRegions, regions])

  const leaderBoard = useMemo(() => {
    const standings = PLAYABLE_HOUSES.map((houseId) => ({
      houseId,
      regions: territoryCounts[houseId],
      army: totalArmyByHouse[houseId],
      gold: resourcesByHouse[houseId].gold,
    })).sort((a, b) => b.regions - a.regions || b.army - a.army || b.gold - a.gold)

    const first = standings[0]
    const second = standings[1]
    const isExactTie =
      Boolean(first && second) &&
      first.regions === second.regions &&
      first.army === second.army &&
      first.gold === second.gold

    return {
      standings,
      leaderHouse: isExactTie ? null : first?.houseId ?? null,
      leaderReason: isExactTie
        ? `Tie at ${first?.regions ?? 0} regions, ${first?.army ?? 0} army, and ${first?.gold ?? 0} gold.`
        : first
          ? `${HOUSE_META[first.houseId].label} leads with ${first.regions} regions, ${first.army} total army, and ${first.gold} gold.`
          : null,
    }
  }, [resourcesByHouse, territoryCounts, totalArmyByHouse])

  const fullControlWinner = useMemo(
    () => PLAYABLE_HOUSES.find((house) => territoryCounts[house] === availableRegions.length) ?? null,
    [availableRegions.length, territoryCounts]
  )

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

  useEffect(() => {
    isAutoSimulatingRef.current = isAutoSimulating
  }, [isAutoSimulating])

  const closeDecisionPopup = () => {
    decisionVisualizationRunRef.current += 1
    decisionPopupPausedRef.current = false
    setDecisionPopupPaused(false)
    setDecisionPopupOpen(false)
  }

  useEffect(() => {
    if (simulationPhase === 'battle' && decisionPopupOpen) {
      closeDecisionPopup()
    }
  }, [simulationPhase, decisionPopupOpen])

  const waitForVisualizationStep = async (ms: number, runId: number, respectSimulationPause = false) => {
    let elapsed = 0

    while (elapsed < ms) {
      if (decisionVisualizationRunRef.current !== runId) return false

      if (decisionPopupPausedRef.current || (respectSimulationPause && !isAutoSimulatingRef.current)) {
        await wait(120)
        continue
      }

      const slice = Math.min(120, ms - elapsed)
      await wait(slice)
      elapsed += slice
    }

    return decisionVisualizationRunRef.current === runId
  }

  const waitForSimulationProgress = async (ms: number) => {
    let elapsed = 0

    while (elapsed < ms) {
      if (!isAutoSimulatingRef.current) {
        await wait(120)
        continue
      }

      const slice = Math.min(120, ms - elapsed)
      await wait(slice)
      elapsed += slice
    }
  }

  const waitForAutoBattleResume = () =>
    new Promise<void>((resolve) => {
      pendingAutoBattleResumeRef.current = () => {
        pendingAutoBattleResumeRef.current = null
        resolve()
      }
    })

  const announceBanner = async (message: string, duration: number) => {
    setTurnBanner(message)
    await waitForSimulationProgress(duration)
    setTurnBanner((current) => (current === message ? '' : current))
  }

  const parseBattleStateSummary = (summary: string) => {
    const attackerArmy = Number(summary.match(/attacker_army=(\d+)/)?.[1] ?? NaN)
    const defenderArmy = Number(summary.match(/defender_army=(\d+)/)?.[1] ?? NaN)
    const regionOwner = summary.match(/region_owner=([^,]+)/)?.[1] ?? ''
    const turnNumber = Number(summary.match(/turn=(\d+)/)?.[1] ?? NaN)

    if (Number.isNaN(attackerArmy) || Number.isNaN(defenderArmy) || Number.isNaN(turnNumber)) {
      return null
    }

    return {
      attackerArmy,
      defenderArmy,
      regionOwner,
      turnNumber,
    }
  }

  const runDecisionVisualization = async (trace: AIDecisionTrace, reason: string, fastMode = false) => {
    const totalSteps = trace.ruleCalculations.length + 4
    const runId = decisionVisualizationRunRef.current + 1
    const stepDelay = fastMode ? AUTO_DECISION_STEP_DELAY_MS : DECISION_STEP_DELAY_MS
    const finalDelay = fastMode ? AUTO_DECISION_FINAL_DELAY_MS : DECISION_FINAL_DELAY_MS
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
        step === totalSteps - 1 ? finalDelay : stepDelay,
        runId,
        fastMode
      )
      if (!keepGoing) return
    }

    if (fastMode && decisionVisualizationRunRef.current === runId) {
      setDecisionPopupOpen(false)
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

  const evaluateMinimaxBattle = (sourceId: RegionId, targetId: RegionId) => {
    const attacker = regions[sourceId]
    const defender = regions[targetId]
    const battleState = createBattleState({
      attacker_name: attacker.house,
      defender_name: defender.house,
      attacker_army: attacker.army,
      defender_army: defender.army,
      region_owner: defender.house,
    })
    const result = chooseBestMove(battleState)

    return {
      result,
      snapshot: {
      attackerName: attacker.house,
      defenderName: defender.house,
      sourceRegionName: attacker.name,
      targetRegionName: defender.name,
      lossPercent: BATTLE_LOSS_PERCENT,
      bestAction: result.bestAction,
      score: result.score,
      rootScores: Object.values(BattleAction).map((action) => {
        const branch = result.tree.children.find((entry) => entry.action === action)
        return {
          action,
          score: branch?.score ?? result.score,
          chosen: action === result.bestAction,
        }
      }),
      debugOutput: result.debugOutput,
      tree: result.tree,
      },
    }
  }

  const runDirectMinimaxDemo = () => {
    const sourceId: RegionId = 'essos'
    const targetId: RegionId = 'westerlands'
    const { snapshot } = evaluateMinimaxBattle(sourceId, targetId)

    setAiFuzzy(null)
    setAiTree(null)
    setAiBattleTree(snapshot)
    setBattleMinimaxPopupOpen(true)
    setAiReason('Direct battle demo: House Targaryen attacks House Lannister. This bypasses fuzzy logic and map movement so you can inspect minimax only.')
    setAiSimulationNote('Standalone minimax demo only: no fuzzy decision, no pathfinding, no live battle resolution. The panel is showing the battle state-space tree directly.')
    setDecisionPopupTrace(null)
    setDecisionPopupReason(null)
    setSelectedRegion(targetId)
    setAttackSource(sourceId)
    triggerActionCue({
      action: 'attack',
      houseId: 'targaryen',
      houseLabel: HOUSE_META.targaryen.label,
      primaryRegionId: sourceId,
      targetRegionId: targetId,
      message: 'Direct demo: House Targaryen attacks House Lannister',
    })
    addEvent('Direct minimax demo loaded: House Targaryen vs House Lannister.')
  }

  const resolveAttackImmediately = async (sourceId: RegionId, targetId: RegionId) => {
    if (!canAttackTarget(sourceId, targetId)) {
      addEvent(`Attack blocked: ${regions[targetId].name} is not a valid hostile neighbor.`)
      return
    }
    await resolveMinimaxBattle(sourceId, targetId, true)
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

  const animateBattleArmies = async (
    sourceId: RegionId,
    targetId: RegionId,
    fromAttacker: number,
    fromDefender: number,
    toAttacker: number,
    toDefender: number
  ) => {
    const steps = 6

    for (let step = 1; step <= steps; step += 1) {
      const nextAttacker = Math.round(fromAttacker + ((toAttacker - fromAttacker) * step) / steps)
      const nextDefender = Math.round(fromDefender + ((toDefender - fromDefender) * step) / steps)

      setRegions((prev) => ({
        ...prev,
        [sourceId]: {
          ...prev[sourceId],
          army: nextAttacker,
        },
        [targetId]: {
          ...prev[targetId],
          army: nextDefender,
        },
      }))

      await waitForSimulationProgress(90)
    }
  }

  const clearBattleVisuals = () => {
    setBattlePath(null)
    setClashRegion(null)
    setIsCinematicActive(false)
    setBattlePhase('idle')
    setImpactSlowMo(false)
    setAttackSource(null)
    setBattleStepSummary(null)
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

  const launchAttackSequence = async (sourceId: RegionId, targetId: RegionId, fastMode = false, showBattleModal = true) => {
    if (isBattleModalOpen || isResolvingBattle) return
    if (!canAttackTarget(sourceId, targetId)) {
      addEvent(`Attack blocked: ${regions[targetId].name} is not a valid hostile neighbor.`)
      return
    }

    const attacker = regions[sourceId]
    const defender = regions[targetId]
    const { result, snapshot } = evaluateMinimaxBattle(sourceId, targetId)

    setAttackSource(sourceId)
    setSelectedRegion(targetId)
    setBattleResult(null)
    setAiBattleTree(snapshot)
    setBattleContext({
      attackerId: sourceId,
      defenderId: targetId,
      winChance: projectBattleConfidence(result.score),
      projectedScore: result.score,
      projectedBestAction: result.bestAction,
      finalState: result.finalState,
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

    const cinematicDelay = (ms: number) => Math.max(100, Math.round(ms * (fastMode ? AUTO_ATTACK_CINEMATIC_SCALE : 1)))

    if (fastMode) {
      await waitForSimulationProgress(cinematicDelay(480))
    } else {
      await wait(cinematicDelay(480))
    }
    setBattlePhase('march')
    playWarCue('march')
    setBattlePath({ from: sourceId, to: targetId })

    if (fastMode) {
      await waitForSimulationProgress(cinematicDelay(1680))
    } else {
      await wait(cinematicDelay(1680))
    }
    setBattlePhase('impact')
    setImpactSlowMo(true)
    playWarCue('impact')
    setClashRegion(targetId)
    setTimeout(() => setImpactSlowMo(false), cinematicDelay(820))
    if (fastMode) {
      await waitForSimulationProgress(cinematicDelay(980))
    } else {
      await wait(cinematicDelay(980))
    }
    setBattlePhase('briefing')
    if (fastMode) {
      await waitForSimulationProgress(cinematicDelay(260))
    } else {
      await wait(cinematicDelay(260))
    }
    setIsBattleModalOpen(showBattleModal)
  }

  const runAutoCinematicAttack = async (sourceId: RegionId, targetId: RegionId) => {
    setAttackSource(sourceId)
    await launchAttackSequence(sourceId, targetId, true, false)
    setDecisionPopupOpen(false)
    await wait(80)
    const winnerMessage = await runAutoMinimaxBattlePlayback(sourceId, targetId)
    await announceBanner(winnerMessage, BATTLE_WINNER_BANNER_MS)
    await announceBanner('Simulation resumes...', SIMULATION_RESUME_BANNER_MS)
    await waitForSimulationProgress(AUTO_SIMULATION_RESULT_PAUSE_MS)
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
    const reinforceCost = AI_REINFORCE_GOLD_COST
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

  const resolveAIReinforce = (regionId: RegionId | null) => {
    if (!regionId) {
      setHasActedThisTurn(true)
      setSimulationPhase('ending')
      setAiSimulationNote('Reinforce was chosen, but no focus region was available.')
      addEvent('Reinforce skipped because no focus region was available.')
      return
    }

    setResourcesByHouse((prev) => ({
      ...prev,
      [currentFaction]: {
        ...prev[currentFaction],
        gold: Math.max(0, prev[currentFaction].gold - AI_REINFORCE_GOLD_COST),
      },
    }))

    setRegions((prev) => ({
      ...prev,
      [regionId]: {
        ...prev[regionId],
        army: prev[regionId].army + AI_REINFORCE_ARMY_BONUS,
      },
    }))

    const pos = regions[regionId].tokenPosition
    addFloatingText(pos.x, pos.y, `+${AI_REINFORCE_ARMY_BONUS} Army`, 'positive')
    addFloatingText(pos.x + 16, pos.y - 16, `-${AI_REINFORCE_GOLD_COST} Gold`, 'negative')
    setHasActedThisTurn(true)
    setSimulationPhase('ending')
    setAiSimulationNote(
      `Reinforce executed: ${regions[regionId].name} gains ${AI_REINFORCE_ARMY_BONUS} army for ${AI_REINFORCE_GOLD_COST} gold.`
    )
    addEvent(
      `${HOUSE_META[currentFaction].label} reinforces ${regions[regionId].name}: +${AI_REINFORCE_ARMY_BONUS} Army, -${AI_REINFORCE_GOLD_COST} Gold.`
    )
  }

  const resolveAIDefend = (regionId: RegionId | null) => {
    if (!regionId) {
      setHasActedThisTurn(true)
      setSimulationPhase('ending')
      setAiSimulationNote('Defend was chosen, but no focus region was available.')
      addEvent('Defend skipped because no focus region was available.')
      return
    }

    setRegions((prev) => ({
      ...prev,
      [regionId]: {
        ...prev[regionId],
        defense: prev[regionId].defense + AI_DEFEND_DEFENSE_BONUS,
      },
    }))

    const pos = regions[regionId].tokenPosition
    addFloatingText(pos.x, pos.y, `+${AI_DEFEND_DEFENSE_BONUS} Defense`, 'neutral')
    setHasActedThisTurn(true)
    setSimulationPhase('ending')
    setAiSimulationNote(`Defend executed: ${regions[regionId].name} gains +${AI_DEFEND_DEFENSE_BONUS} defense this turn.`)
    addEvent(`${HOUSE_META[currentFaction].label} fortifies ${regions[regionId].name} and raises its defense.`)
  }

  const resolveAIHold = (regionId: RegionId | null) => {
    const fallbackRegionId = availableRegions.find((rid) => regions[rid].houseId === currentFaction) ?? null
    const targetRegionId = regionId ?? fallbackRegionId

    updateCurrentResources({
      gold: AI_HOLD_GOLD_BONUS,
      food: AI_HOLD_FOOD_BONUS,
      influence: AI_HOLD_INFLUENCE_BONUS,
    })

    if (targetRegionId) {
      setRegions((prev) => ({
        ...prev,
        [targetRegionId]: {
          ...prev[targetRegionId],
          army: prev[targetRegionId].army + AI_HOLD_ARMY_BONUS,
        },
      }))

      const pos = regions[targetRegionId].tokenPosition
      addFloatingText(pos.x, pos.y, `+${AI_HOLD_ARMY_BONUS} Army`, 'positive')
      addFloatingText(pos.x + 16, pos.y - 14, `+${AI_HOLD_GOLD_BONUS} Gold`, 'positive')
      addFloatingText(pos.x - 12, pos.y - 20, 'Hold', 'neutral')
      setSelectedRegion(targetRegionId)
      setAiSimulationNote(
        `Hold executed: ${regions[targetRegionId].name} consolidates with +${AI_HOLD_ARMY_BONUS} army and the house gathers resources.`
      )
      addEvent(
        `${HOUSE_META[currentFaction].label} holds ${regions[targetRegionId].name}: +${AI_HOLD_ARMY_BONUS} Army, +${AI_HOLD_GOLD_BONUS} Gold.`
      )
    } else {
      setAiSimulationNote(
        `${HOUSE_META[currentFaction].label} holds position and gathers resources for a stronger future turn.`
      )
      addEvent(`${HOUSE_META[currentFaction].label} holds position: +${AI_HOLD_GOLD_BONUS} Gold gathered.`)
    }

    setHasActedThisTurn(true)
    setSimulationPhase('ending')
  }

  const applyMinimaxBattleResult = (
    sourceId: RegionId,
    targetId: RegionId,
    finalState: BattleState,
    attackerHouseId: HouseId,
    attackerHouseLabel: string,
    defenderHouseLabel: string
  ) => {
    const attackerWon = finalState.region_owner === attackerHouseLabel
    const occupyingArmy = attackerWon
      ? Math.min(finalState.attacker_army, Math.max(1, Math.round(finalState.attacker_army * AI_CAPTURE_GARRISON_SHARE)))
      : finalState.defender_army
    const returningArmy = attackerWon ? Math.max(0, finalState.attacker_army - occupyingArmy) : finalState.attacker_army

    setRegions((prev) => ({
      ...prev,
      [sourceId]: {
        ...prev[sourceId],
        army: returningArmy,
      },
      [targetId]: {
        ...prev[targetId],
        army: occupyingArmy,
        houseId: attackerWon ? attackerHouseId : prev[targetId].houseId,
        house: attackerWon ? attackerHouseLabel : prev[targetId].house,
      },
    }))

    const sourcePos = regions[sourceId].tokenPosition
    const targetPos = regions[targetId].tokenPosition
    addFloatingText(sourcePos.x, sourcePos.y, `${returningArmy} Return`, attackerWon ? 'neutral' : 'negative')
    addFloatingText(targetPos.x, targetPos.y, attackerWon ? `${occupyingArmy} Occupy` : `${occupyingArmy} Hold`, attackerWon ? 'positive' : 'neutral')

    setSimulationPhase('ending')
    setAiSimulationNote(
      attackerWon
        ? `Battle executed with minimax. ${attackerHouseLabel} captures ${regions[targetId].name} after optimal battle play.`
        : `Battle executed with minimax. ${defenderHouseLabel} holds ${regions[targetId].name} after optimal battle play.`
    )
    addEvent(
      attackerWon
        ? `${attackerHouseLabel} captures ${regions[targetId].name} by minimax battle resolution.`
        : `${defenderHouseLabel} holds ${regions[targetId].name} after minimax battle resolution.`
    )
  }

  const resolveMinimaxBattle = async (sourceId: RegionId, targetId: RegionId, autoMode = false) => {
    const attacker = regions[sourceId]
    const defender = regions[targetId]
    const { result, snapshot } = evaluateMinimaxBattle(sourceId, targetId)

    setAiBattleTree(snapshot)
    setBattleMinimaxPopupOpen(true)
    setSelectedRegion(targetId)
    setAttackSource(sourceId)
    setHasActedThisTurn(true)
    setSimulationPhase('battle')

    triggerActionCue({
      action: 'attack',
      houseId: attacker.houseId,
      houseLabel: attacker.house,
      primaryRegionId: sourceId,
      targetRegionId: targetId,
      message: `${attacker.house} attacks ${defender.name}`,
    })

    addEvent(
      `${attacker.house} attacks ${defender.name}. Minimax chooses ${result.bestAction} and projects final score ${result.score}.`
    )

    await wait(autoMode ? AUTO_SIMULATION_BATTLE_PAUSE_MS / 2 : AUTO_SIMULATION_BATTLE_PAUSE_MS)
    applyMinimaxBattleResult(sourceId, targetId, result.finalState, attacker.houseId, attacker.house, defender.house)
  }

  const runAutoMinimaxBattlePlayback = async (sourceId: RegionId, targetId: RegionId) => {
    const attacker = regions[sourceId]
    const defender = regions[targetId]
    const { result, snapshot } = evaluateMinimaxBattle(sourceId, targetId)
    let node = result.tree
    let path: number[] = []
    let currentAttackerArmy = attacker.army
    let currentDefenderArmy = defender.army
    let currentRound = 1
    let pendingAttackerAction: BattleAction | null = null

    setAiBattleTree(snapshot)
    setAiSimulationNote(`${attacker.house} begins minimax battle planning against ${defender.house}.`)

    while (node.children.length > 0) {
      const chosenIndex = node.children.findIndex((child) => child.chosen)
      if (chosenIndex < 0) break

      const chosenChild = node.children[chosenIndex]
      const actingHouse = node.nodeType === 'max' ? attacker.house : defender.house
      const parsed = parseBattleStateSummary(chosenChild.next.stateSummary)
      const actionCueType: DecisionAction =
        chosenChild.action === BattleAction.Attack
          ? 'attack'
          : chosenChild.action === BattleAction.Guard
            ? 'guard'
            : 'withdraw'

      setBattlePlaybackPath(path)
      setBattleMinimaxPopupOpen(true)
      setAiSimulationNote(`${actingHouse} chooses ${chosenChild.action}.`)
      addEvent(`${actingHouse} chooses ${chosenChild.action}.`)
      if (node.nodeType === 'max') {
        pendingAttackerAction = chosenChild.action
        setBattleStepSummary({
          round: currentRound,
          attackerAction: chosenChild.action,
          defenderAction: null,
          attackerArmyBefore: currentAttackerArmy,
          defenderArmyBefore: currentDefenderArmy,
          attackerArmyAfter: null,
          defenderArmyAfter: null,
          resolutionText: `${attacker.house} is committing to ${chosenChild.action}. ${defender.house} will answer next.`,
        })
      }
      await waitForSimulationProgress(1200)
      setBattleMinimaxPopupOpen(false)

      triggerActionCue({
        action: actionCueType,
        houseId: node.nodeType === 'max' ? attacker.houseId : defender.houseId,
        houseLabel: actingHouse,
        primaryRegionId: node.nodeType === 'max' ? sourceId : targetId,
        targetRegionId: chosenChild.action === BattleAction.Attack ? (node.nodeType === 'max' ? targetId : sourceId) : undefined,
        message: `${actingHouse} chooses ${chosenChild.action}`,
      })

      if (chosenChild.action === BattleAction.Attack) {
        setClashRegion(targetId)
        playWarCue('impact')
        addFloatingText(regions[node.nodeType === 'max' ? sourceId : targetId].tokenPosition.x, regions[node.nodeType === 'max' ? sourceId : targetId].tokenPosition.y, 'Attack', 'negative')
        addFloatingText(regions[node.nodeType === 'max' ? targetId : sourceId].tokenPosition.x, regions[node.nodeType === 'max' ? targetId : sourceId].tokenPosition.y, 'Clash', 'negative')
      } else if (chosenChild.action === BattleAction.Guard) {
        addFloatingText(regions[node.nodeType === 'max' ? sourceId : targetId].tokenPosition.x, regions[node.nodeType === 'max' ? sourceId : targetId].tokenPosition.y, 'Guard', 'neutral')
      } else {
        addFloatingText(
          node.nodeType === 'max' ? regions[sourceId].tokenPosition.x : regions[targetId].tokenPosition.x,
          node.nodeType === 'max' ? regions[sourceId].tokenPosition.y : regions[targetId].tokenPosition.y,
          'Withdraw',
          'neutral'
        )
      }

      path = [...path, chosenIndex]
      setBattlePlaybackPath(path)

      if (node.nodeType === 'min' && parsed) {
        setBattleStepSummary({
          round: currentRound,
          attackerAction: pendingAttackerAction,
          defenderAction: chosenChild.action,
          attackerArmyBefore: currentAttackerArmy,
          defenderArmyBefore: currentDefenderArmy,
          attackerArmyAfter: parsed.attackerArmy,
          defenderArmyAfter: parsed.defenderArmy,
          resolutionText: `${defender.house} answers with ${chosenChild.action}. The exchange is now resolved.`,
        })
        await animateBattleArmies(sourceId, targetId, currentAttackerArmy, currentDefenderArmy, parsed.attackerArmy, parsed.defenderArmy)
        currentAttackerArmy = parsed.attackerArmy
        currentDefenderArmy = parsed.defenderArmy
        currentRound += 1
        addFloatingText(regions[sourceId].tokenPosition.x, regions[sourceId].tokenPosition.y - 14, `A:${parsed.attackerArmy}`, 'neutral')
        addFloatingText(regions[targetId].tokenPosition.x, regions[targetId].tokenPosition.y - 14, `D:${parsed.defenderArmy}`, 'neutral')
        setAiSimulationNote(
          `${actingHouse} chooses ${chosenChild.action}. Battle state becomes A:${parsed.attackerArmy} D:${parsed.defenderArmy}.`
        )
      } else if (parsed) {
        setAiSimulationNote(`${actingHouse} chooses ${chosenChild.action}. ${node.nodeType === 'max' ? defender.house : attacker.house} must answer next.`)
      }

      await waitForSimulationProgress(1450)
      node = chosenChild.next

      if (node.nodeType === 'terminal') {
        setBattlePlaybackPath(path)
        setBattleMinimaxPopupOpen(true)
        setAiSimulationNote(node.title)
        addEvent(node.title)
        await waitForSimulationProgress(1700)
        setBattleMinimaxPopupOpen(false)
      }
    }

    applyMinimaxBattleResult(sourceId, targetId, result.finalState, attacker.houseId, attacker.house, defender.house)
    setBattlePlaybackPath(null)
    setBattleMinimaxPopupOpen(false)
    return `${result.finalState.region_owner} wins the battle`
  }

  const projectBattleConfidence = (score: number) => Math.max(0.05, Math.min(0.95, 0.5 + score / 300))

  const getHouseOrder = (): PlayableHouseId[] => PLAYABLE_HOUSES

  const handleEndTurn = async () => {
    if (isBattleModalOpen || isResolvingBattle || isSimulationSequenceBusy) return

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
    setAiBattleTree(null)
    setBattleMinimaxPopupOpen(false)
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
    if (isBattleModalOpen || isResolvingBattle || hasActedThisTurn || isSimulationSequenceBusy) return

    setIsSimulationSequenceBusy(true)

    try {
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
      setAiBattleTree(null)
      await runDecisionVisualization(decision.trace, decision.reason, autoMode)
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

      if (decision.action === 'attack') {
        if (decision.trace.attackSourceRegionId && decision.targetId) {
          if (autoMode) {
            await runAutoCinematicAttack(decision.trace.attackSourceRegionId, decision.targetId)
          } else {
            await resolveMinimaxBattle(decision.trace.attackSourceRegionId, decision.targetId, false)
          }
        } else {
          setHasActedThisTurn(true)
          setSimulationPhase('ending')
          setAiSimulationNote('Attack was selected, but the exact battle pair could not be prepared for minimax resolution.')
          addEvent('Attack was selected, but no valid minimax battle pair was available.')
        }
        return
      }

      if (decision.action === 'defend') {
        resolveAIDefend(decision.regionId)
        return
      }

      if (decision.action === 'reinforce') {
        resolveAIReinforce(decision.regionId)
        return
      }

      resolveAIHold(decision.regionId)
    } finally {
      setIsSimulationSequenceBusy(false)
    }
  }

  const startAutoSimulation = () => {
    const isResume = hasSimulationStarted
    setHasSimulationStarted(true)
    setIsAutoSimulating(true)
    addEvent(isResume ? 'Auto simulation resumed.' : 'Auto simulation started: AI council now controls all houses.')

    if (pendingAutoBattleResumeRef.current) {
      pendingAutoBattleResumeRef.current()
    }
  }

  const stopAutoSimulation = () => {
    setIsAutoSimulating(false)
    addEvent('Auto simulation paused.')
  }

  useEffect(() => {
    if (!fullControlWinner) return
    setIsAutoSimulating(false)
    addEvent(`Victory declared: ${HOUSE_META[fullControlWinner].label} controls the entire realm.`)
  }, [fullControlWinner])

  useEffect(() => {
    if (!isAutoSimulating) return
    if (fullControlWinner) return

    if (isBattleModalOpen || isResolvingBattle || isSimulationSequenceBusy) return

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
    fullControlWinner,
    turn,
    hasActedThisTurn,
    isBattleModalOpen,
    isResolvingBattle,
    isSimulationSequenceBusy,
    currentFaction,
    territoryCounts,
  ])

  const resolveBattle = async () => {
    if (!battleContext || isResolvingBattle) return
    const attacker = regions[battleContext.attackerId]
    const defender = regions[battleContext.defenderId]
    const attackerWon = battleContext.finalState.region_owner === attacker.house
    const occupyingArmy = attackerWon
      ? Math.min(
          battleContext.finalState.attacker_army,
          Math.max(1, Math.round(battleContext.finalState.attacker_army * AI_CAPTURE_GARRISON_SHARE))
        )
      : battleContext.finalState.defender_army
    const returningArmy = attackerWon
      ? Math.max(0, battleContext.finalState.attacker_army - occupyingArmy)
      : battleContext.finalState.attacker_army

    setIsResolvingBattle(true)
    await wait(500)

    if (attackerWon) {
      setRegions((prev) => ({
        ...prev,
        [battleContext.attackerId]: {
          ...prev[battleContext.attackerId],
          army: returningArmy,
        },
        [battleContext.defenderId]: {
          ...prev[battleContext.defenderId],
          army: occupyingArmy,
          houseId: prev[battleContext.attackerId].houseId,
          house: prev[battleContext.attackerId].house,
        },
      }))

      const sourcePos = attacker.tokenPosition
      const targetPos = defender.tokenPosition
      addFloatingText(sourcePos.x, sourcePos.y, `${returningArmy} Return`, 'neutral')
      addFloatingText(targetPos.x, targetPos.y, `${occupyingArmy} Occupy`, 'positive')
      addEvent(`${defender.name} was captured by ${attacker.house} using minimax battle resolution.`)
      setBattleResult(`${attacker.house} captures ${defender.name}`)
      playWarCue('result')
    } else {
      setRegions((prev) => ({
        ...prev,
        [battleContext.attackerId]: {
          ...prev[battleContext.attackerId],
          army: battleContext.finalState.attacker_army,
        },
        [battleContext.defenderId]: {
          ...prev[battleContext.defenderId],
          army: battleContext.finalState.defender_army,
        },
      }))

      const sourcePos = attacker.tokenPosition
      const targetPos = defender.tokenPosition
      addFloatingText(sourcePos.x, sourcePos.y, `A:${battleContext.finalState.attacker_army}`, 'negative')
      addFloatingText(targetPos.x, targetPos.y, `D:${battleContext.finalState.defender_army}`, 'neutral')
      addEvent(`${defender.house} holds ${defender.name} after minimax battle resolution.`)
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
        {simulationPhase === 'battle' && battleStepSummary ? (
          <div className="battle-turn-hud" aria-live="polite">
            <p className="battle-turn-hud-round">Round {battleStepSummary.round}</p>
            <p className="battle-turn-hud-line">
              {regions[attackSource || availableRegions[0]]?.house || 'Attacker'} chose {battleStepSummary.attackerAction ?? 'Waiting'}
            </p>
            <p className="battle-turn-hud-line">
              {selectedRegion ? regions[selectedRegion].house : 'Defender'} chose {battleStepSummary.defenderAction ?? 'Waiting'}
            </p>
            <p className="battle-turn-hud-score">
              {battleStepSummary.attackerArmyBefore}
              {battleStepSummary.attackerArmyAfter !== null ? ` -> ${battleStepSummary.attackerArmyAfter}` : ''}
              {' / '}
              {battleStepSummary.defenderArmyBefore}
              {battleStepSummary.defenderArmyAfter !== null ? ` -> ${battleStepSummary.defenderArmyAfter}` : ''}
            </p>
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
            className="panel-btn panel-btn-featured"
            onClick={runDirectMinimaxDemo}
            disabled={isBattleModalOpen || isResolvingBattle || isAutoSimulating}
          >
            Demo: Targaryen vs Lannister
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
            disabled={Boolean(fullControlWinner)}
          >
            {isAutoSimulating ? 'Pause Simulation' : hasSimulationStarted ? 'Resume Simulation' : 'Start Simulation'}
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

        {leaderBoard.leaderHouse || leaderBoard.leaderReason ? (
          <div className="winner-banner">
            <p className="winner-title">
              {fullControlWinner
                ? `Winner: ${HOUSE_META[fullControlWinner].label}`
                : leaderBoard.leaderHouse
                  ? `Current Leader: ${HOUSE_META[leaderBoard.leaderHouse].label}`
                  : 'Current Leader: Draw'}
            </p>
            <p className="winner-reason">
              {fullControlWinner
                ? `${HOUSE_META[fullControlWinner].label} controls the entire realm.`
                : leaderBoard.leaderReason}
            </p>
          </div>
        ) : null}

        {simulationPhase === 'battle' && battleStepSummary ? (
          <div className="battle-step-banner">
            <p className="battle-step-title">Battle Round {battleStepSummary.round}</p>
            <p className="battle-step-line">
              Attacker: {battleStepSummary.attackerAction ?? 'Waiting'}
              {battleStepSummary.defenderAction ? ` | Defender: ${battleStepSummary.defenderAction}` : ' | Defender: deciding...'}
            </p>
            <p className="battle-step-line">
              Army: A {battleStepSummary.attackerArmyBefore}
              {battleStepSummary.attackerArmyAfter !== null ? ` -> ${battleStepSummary.attackerArmyAfter}` : ''} | D {battleStepSummary.defenderArmyBefore}
              {battleStepSummary.defenderArmyAfter !== null ? ` -> ${battleStepSummary.defenderArmyAfter}` : ''}
            </p>
            <p className="battle-step-reason">{battleStepSummary.resolutionText}</p>
          </div>
        ) : null}

        <AIDecisionPanel
          activeHouseLabel={HOUSE_META[currentFaction].label}
          turn={turn}
          fuzzy={simulationPhase === 'battle' ? null : aiFuzzy}
          tree={simulationPhase === 'battle' ? null : aiTree}
          trace={simulationPhase === 'battle' ? null : decisionPopupTrace}
          battleTree={aiBattleTree}
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
          projectedAction={battleContext.projectedBestAction}
          projectedScore={battleContext.projectedScore}
          resolving={isResolvingBattle}
          resultText={battleResult}
          onResolve={resolveBattle}
          onClose={closeBattleModal}
        />
      ) : null}

      <AIDecisionPopup
        open={decisionPopupOpen && simulationPhase !== 'battle'}
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
      <BattleMinimaxPopup
        open={battleMinimaxPopupOpen}
        battleTree={aiBattleTree}
        focusedPath={battlePlaybackPath}
        simulationRunning={isAutoSimulating}
        canToggleSimulation={hasSimulationStarted}
        onPauseSimulation={stopAutoSimulation}
        onResumeSimulation={startAutoSimulation}
        onClose={() => setBattleMinimaxPopupOpen(false)}
      />
      </div>
    </>
  )
}
