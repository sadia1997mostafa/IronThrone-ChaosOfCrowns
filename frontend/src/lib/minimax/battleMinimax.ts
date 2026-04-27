export const BATTLE_LOSS_PERCENT = 50
const MAX_BATTLE_TURNS_SAFETY = 20
const MIN_TURN_NUMBER_FOR_WITHDRAW = 3
const WITHDRAW_LOSS_PERCENT = 0.05
const CRITICAL_ARMY_PENALTY = 30
const VOLUNTARY_WITHDRAW_PENALTY = 5
const BATTLE_LOSS_FRACTION = BATTLE_LOSS_PERCENT / 100

export enum BattleAction {
  Attack = 'Attack',
  Guard = 'Guard',
  Withdraw = 'Withdraw',
}

export type TurnPlayer = 'max' | 'min'
export type BattleSide = 'attacker' | 'defender'

export type BattleState = {
  attacker_name: string
  defender_name: string
  attacker_army: number
  defender_army: number
  attacker_starting_army: number
  defender_starting_army: number
  region_owner: string
  current_turn_player: TurnPlayer
  battle_over: boolean
  pending_attacker_action: BattleAction | null
  winner: BattleSide | null
  withdrawn_side: BattleSide | null
  turn_number: number
}

type MinimaxResult = {
  score: number
  bestAction: BattleAction | null
  trace: string[]
  tree: MinimaxTraceNode
  terminalState: BattleState
}

type RootActionSummary = {
  action: BattleAction
  score: number
}

export type MinimaxTraceNode = {
  nodeType: 'max' | 'min' | 'terminal'
  title: string
  stateSummary: string
  score: number
  chosenAction: BattleAction | null
  children: Array<{
    action: BattleAction
    label: string
    chosen: boolean
    score: number
    next: MinimaxTraceNode
  }>
}

const ALL_ACTIONS: BattleAction[] = [BattleAction.Attack, BattleAction.Guard, BattleAction.Withdraw]

function legalActionsForState(state: BattleState) {
  if (state.turn_number < MIN_TURN_NUMBER_FOR_WITHDRAW) {
    return [BattleAction.Attack, BattleAction.Guard]
  }

  return ALL_ACTIONS
}

export function createBattleState(input: {
  attacker_name: string
  defender_name: string
  attacker_army: number
  defender_army: number
  region_owner?: string
  current_turn_player?: TurnPlayer
}): BattleState {
  return {
    attacker_name: input.attacker_name,
    defender_name: input.defender_name,
    attacker_army: input.attacker_army,
    defender_army: input.defender_army,
    attacker_starting_army: input.attacker_army,
    defender_starting_army: input.defender_army,
    region_owner: input.region_owner ?? input.defender_name,
    current_turn_player: input.current_turn_player ?? 'max',
    battle_over: false,
    pending_attacker_action: null,
    winner: null,
    withdrawn_side: null,
    turn_number: 1,
  }
}

function roundLoss(army: number, percent: number) {
  return Math.round(army * percent)
}

function applyLoss(army: number, percent: number) {
  return Math.max(0, army - roundLoss(army, percent))
}

function describeState(state: BattleState) {
  return `attacker_army=${state.attacker_army}, defender_army=${state.defender_army}, region_owner=${state.region_owner}, turn=${state.turn_number}, battle_over=${state.battle_over}`
}

function summarizeOutcome(state: BattleState) {
  if (!state.battle_over) {
    return 'Battle continues.'
  }

  if (state.winner === 'attacker') {
    return `${state.attacker_name} wins the region.`
  }

  return `${state.defender_name} keeps the region.`
}

function hasLostHalfStartingArmy(currentArmy: number, startingArmy: number) {
  return currentArmy <= Math.round(startingArmy * (1 - BATTLE_LOSS_FRACTION))
}

export function isTerminalBattleState(state: BattleState) {
  return (
    state.battle_over ||
    hasLostHalfStartingArmy(state.attacker_army, state.attacker_starting_army) ||
    hasLostHalfStartingArmy(state.defender_army, state.defender_starting_army)
  )
}

function isSafetyStop(state: BattleState) {
  return state.turn_number >= MAX_BATTLE_TURNS_SAFETY
}

function leafReason(state: BattleState) {
  if (state.withdrawn_side === 'attacker') {
    return `${state.attacker_name} withdrew, so the battle ends here.`
  }

  if (state.withdrawn_side === 'defender') {
    return `${state.defender_name} withdrew, so the battle ends here.`
  }

  const attackerBroken = hasLostHalfStartingArmy(state.attacker_army, state.attacker_starting_army)
  const defenderBroken = hasLostHalfStartingArmy(state.defender_army, state.defender_starting_army)

  if (attackerBroken && defenderBroken) {
    return `Both sides lost at least ${BATTLE_LOSS_PERCENT}% of their starting army, so the defender holds the region.`
  }

  if (defenderBroken) {
    return `${state.defender_name} lost at least ${BATTLE_LOSS_PERCENT}% of its starting army, so the attacker wins the region.`
  }

  if (attackerBroken) {
    return `${state.attacker_name} lost at least ${BATTLE_LOSS_PERCENT}% of its starting army, so the defender holds the region.`
  }

  if (isSafetyStop(state)) {
    return `Safety stop reached after ${MAX_BATTLE_TURNS_SAFETY} turns. This branch is evaluated to prevent infinite recursion.`
  }

  return summarizeOutcome(state)
}

function finishBattle(state: BattleState, updates: Partial<BattleState>): BattleState {
  const nextState: BattleState = {
    ...state,
    ...updates,
    battle_over: true,
    current_turn_player: 'max',
    pending_attacker_action: null,
    turn_number: state.turn_number + 1,
  }

  return nextState
}

function resolveWinner(state: BattleState, attackerArmy: number, defenderArmy: number): BattleSide | null {
  const attackerBroken = hasLostHalfStartingArmy(attackerArmy, state.attacker_starting_army)
  const defenderBroken = hasLostHalfStartingArmy(defenderArmy, state.defender_starting_army)

  if (attackerBroken && defenderBroken) {
    return 'defender'
  }

  if (defenderBroken) {
    return 'attacker'
  }

  if (attackerBroken) {
    return 'defender'
  }

  return null
}

export function applyDirectWithdraw(state: BattleState, side: BattleSide): BattleState {
  if (side === 'attacker') {
    return finishBattle(state, {
      attacker_army: applyLoss(state.attacker_army, WITHDRAW_LOSS_PERCENT),
      region_owner: state.defender_name,
      winner: 'defender',
      withdrawn_side: 'attacker',
    })
  }

  return finishBattle(state, {
    defender_army: applyLoss(state.defender_army, WITHDRAW_LOSS_PERCENT),
    region_owner: state.attacker_name,
    winner: 'attacker',
    withdrawn_side: 'defender',
  })
}

export function applyActionPair(
  state: BattleState,
  attackerAction: BattleAction,
  defenderAction: BattleAction
): BattleState {
  let attackerArmy = state.attacker_army
  let defenderArmy = state.defender_army
  let winner: BattleSide | null = null
  let withdrawnSide: BattleSide | null = null

  if (attackerAction === BattleAction.Attack && defenderAction === BattleAction.Attack) {
    attackerArmy = applyLoss(attackerArmy, 0.25)
    defenderArmy = applyLoss(defenderArmy, 0.25)
  } else if (attackerAction === BattleAction.Attack && defenderAction === BattleAction.Guard) {
    attackerArmy = applyLoss(attackerArmy, 0.12)
    defenderArmy = applyLoss(defenderArmy, 0.22)
  } else if (attackerAction === BattleAction.Attack && defenderAction === BattleAction.Withdraw) {
    attackerArmy = applyLoss(attackerArmy, 0.02)
    defenderArmy = applyLoss(defenderArmy, 0.08)
    winner = 'attacker'
    withdrawnSide = 'defender'
  } else if (attackerAction === BattleAction.Guard && defenderAction === BattleAction.Attack) {
    attackerArmy = applyLoss(attackerArmy, 0.22)
    defenderArmy = applyLoss(defenderArmy, 0.12)
  } else if (attackerAction === BattleAction.Guard && defenderAction === BattleAction.Guard) {
    attackerArmy = applyLoss(attackerArmy, 0.12)
    defenderArmy = applyLoss(defenderArmy, 0.12)
  } else if (attackerAction === BattleAction.Guard && defenderAction === BattleAction.Withdraw) {
    defenderArmy = applyLoss(defenderArmy, 0.05)
    winner = 'attacker'
    withdrawnSide = 'defender'
  } else {
    return applyDirectWithdraw(state, 'attacker')
  }

  winner = winner ?? resolveWinner(state, attackerArmy, defenderArmy)

  if (winner === 'attacker') {
    return finishBattle(state, {
      attacker_army: attackerArmy,
      defender_army: defenderArmy,
      region_owner: state.attacker_name,
      winner,
      withdrawn_side: withdrawnSide,
    })
  }

  if (winner === 'defender') {
    return finishBattle(state, {
      attacker_army: attackerArmy,
      defender_army: defenderArmy,
      region_owner: state.defender_name,
      winner,
      withdrawn_side: withdrawnSide,
    })
  }

  return {
    ...state,
    attacker_army: attackerArmy,
    defender_army: defenderArmy,
    current_turn_player: 'max',
    pending_attacker_action: null,
    battle_over: false,
    withdrawn_side: null,
    winner: null,
    turn_number: state.turn_number + 1,
  }
}

export function evaluateBattleState(state: BattleState) {
  const armyDifference = state.attacker_army - state.defender_army
  let score = state.region_owner === state.attacker_name ? 100 + armyDifference : -100 + armyDifference

  if (state.withdrawn_side === 'attacker') {
    score -= VOLUNTARY_WITHDRAW_PENALTY
  }

  if (hasLostHalfStartingArmy(state.attacker_army, state.attacker_starting_army)) {
    score -= CRITICAL_ARMY_PENALTY
  }

  return score
}

function minimax(state: BattleState, depth = 0): MinimaxResult {
  const indent = '  '.repeat(depth)

  if (isTerminalBattleState(state) || isSafetyStop(state)) {
    const score = evaluateBattleState(state)
    const reason = leafReason(state)
    const tree: MinimaxTraceNode = {
      nodeType: 'terminal',
      title: reason,
      stateSummary: describeState(state),
      score,
      chosenAction: null,
      children: [],
    }
    return {
      score,
      bestAction: null,
      trace: [
        `${indent}Leaf reached: ${reason}`,
        `${indent}New state: ${describeState(state)}`,
        `${indent}Leaf score: ${score}`,
      ],
      tree,
      terminalState: state,
    }
  }

  if (state.current_turn_player === 'max') {
    let bestScore = Number.NEGATIVE_INFINITY
    let bestAction: BattleAction | null = null
    let bestTerminalState: BattleState | null = null
    const trace: string[] = [`${indent}Max node starts with ${describeState(state)}`]
    const children: MinimaxTraceNode['children'] = []

    for (const action of legalActionsForState(state)) {
      trace.push(`${indent}${depth === 0 ? 'Root action' : 'Max considers'}: ${action}`)

      let nextState: BattleState
      if (action === BattleAction.Withdraw) {
        nextState = applyDirectWithdraw(state, 'attacker')
        trace.push(`${indent}New state: ${describeState(nextState)}`)
      } else {
        nextState = {
          ...state,
          current_turn_player: 'min',
          pending_attacker_action: action,
        }
        trace.push(`${indent}Attacker locks in ${action}. Defender will reply next.`)
      }

      const result = minimax(nextState, depth + 1)
      trace.push(...result.trace)
      trace.push(`${indent}${depth === 0 ? 'Backtracking root action' : 'Backtracking action'} ${action}: score ${result.score}`)

      if (result.score > bestScore) {
        bestScore = result.score
        bestAction = action
        bestTerminalState = result.terminalState
      }

      children.push({
        action,
        label: depth === 0 ? `Root action: ${action}` : `Max considers: ${action}`,
        chosen: false,
        score: result.score,
        next: result.tree,
      })
    }

    const tree: MinimaxTraceNode = {
      nodeType: 'max',
      title: depth === 0 ? 'Root Max Node' : 'Max Node',
      stateSummary: describeState(state),
      score: bestScore,
      chosenAction: bestAction,
      children: children.map((child) => ({
        ...child,
        chosen: child.action === bestAction,
      })),
    }
    trace.push(`${indent}Max node chose ${bestAction} with score ${bestScore}`)
    return {
      score: bestScore,
      bestAction,
      trace,
      tree,
      terminalState: bestTerminalState ?? state,
    }
  }

  const attackerAction = state.pending_attacker_action
  const trace: string[] = [`${indent}Min node responds to attacker action ${attackerAction}`]
  let bestScore = Number.POSITIVE_INFINITY
  let bestAction: BattleAction | null = null
  let bestTerminalState: BattleState | null = null
  const children: MinimaxTraceNode['children'] = []

  for (const defenderAction of legalActionsForState(state)) {
    trace.push(`${indent}Opponent reply: ${defenderAction}`)

    const nextState =
      defenderAction === BattleAction.Withdraw
        ? applyActionPair(state, attackerAction ?? BattleAction.Attack, BattleAction.Withdraw)
        : applyActionPair(state, attackerAction ?? BattleAction.Attack, defenderAction)

    trace.push(`${indent}New state: ${describeState(nextState)}`)
    const result = minimax(nextState, depth + 1)
    trace.push(...result.trace)
    trace.push(`${indent}Backtracking reply ${defenderAction}: score ${result.score}`)

    if (result.score < bestScore) {
      bestScore = result.score
      bestAction = defenderAction
      bestTerminalState = result.terminalState
    }

    children.push({
      action: defenderAction,
      label: `Opponent reply: ${defenderAction}`,
      chosen: false,
      score: result.score,
      next: result.tree,
    })
  }

  const tree: MinimaxTraceNode = {
    nodeType: 'min',
    title: `Min Node after attacker chose ${attackerAction}`,
    stateSummary: describeState(state),
    score: bestScore,
    chosenAction: bestAction,
    children: children.map((child) => ({
      ...child,
      chosen: child.action === bestAction,
    })),
  }
  trace.push(`${indent}Min node chose ${bestAction} with score ${bestScore}`)
  return {
    score: bestScore,
    bestAction,
    trace,
    tree,
    terminalState: bestTerminalState ?? state,
  }
}

export function chooseBestMove(state: BattleState) {
  const result = minimax(state)
  return {
    bestAction: result.bestAction,
    score: result.score,
    debugOutput: result.trace.join('\n'),
    tree: result.tree,
    finalState: result.terminalState,
  }
}

function buildDemoBlock(title: string, state: BattleState) {
  const result = chooseBestMove(state)
  const rootSummaries = summarizeRootActions(state)

  const summaryLines = rootSummaries.map((entry) => `- ${entry.action}: ${entry.score}`).join('\n')

  return [
    `=== ${title} ===`,
    `Initial battle state: ${describeState(state)}`,
    `Root action scores:`,
    summaryLines,
    `Final selected best move: ${result.bestAction} (score ${result.score})`,
    `Full minimax reasoning:`,
    result.debugOutput,
  ].join('\n')
}

function summarizeRootActions(state: BattleState): RootActionSummary[] {
  const rootState: BattleState = { ...state, current_turn_player: 'max', pending_attacker_action: null }

  return legalActionsForState(rootState).map((action) => {
    if (action === BattleAction.Withdraw) {
      return {
        action,
        score: minimax(applyDirectWithdraw(rootState, 'attacker'), 1).score,
      }
    }

    return {
      action,
      score: minimax({ ...rootState, current_turn_player: 'min', pending_attacker_action: action }, 1).score,
    }
  })
}

export function runBattleMinimaxDemo() {
  const attackExample = createBattleState({
    attacker_name: 'House Targaryen',
    defender_name: 'House Lannister',
    attacker_army: 18,
    defender_army: 12,
  })

  const withdrawExample = createBattleState({
    attacker_name: 'House Targaryen',
    defender_name: 'House Lannister',
    attacker_army: 12,
    defender_army: 30,
  })

  return [
    buildDemoBlock('Example 1: Attack Is Best', attackExample),
    '',
    buildDemoBlock('Example 2: Withdraw Is Best', withdrawExample),
  ].join('\n')
}
