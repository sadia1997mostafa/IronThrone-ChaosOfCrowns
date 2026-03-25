import { runFuzzyReferenceCases } from '@/lib/ai/fuzzyLogic'
import type { AIActionType, AIDecisionTrace, FuzzyStrategicOutput } from '@/lib/ai/types'
import { type BattleAction, type MinimaxTraceNode } from '@/lib/minimax/battleMinimax'

export type AIDecisionTreeSnapshot = {
  stateInputs: {
    ownStrength: number
    enemyStrength: number
    regionImportance: number
    resources: number
    aggression: number
  }
  topPriority: {
    action: AIActionType
    score: number
  }
  candidateActions: Array<{
    label: string
    action: AIActionType
    score: number
    chosen?: boolean
  }>
  finalDecisionLabel: string
}

export type AIBattleTreeSnapshot = {
  attackerName: string
  defenderName: string
  sourceRegionName: string
  targetRegionName: string
  lossPercent: number
  bestAction: BattleAction | null
  score: number
  rootScores: Array<{
    action: BattleAction
    score: number
    chosen: boolean
  }>
  debugOutput: string
  tree: MinimaxTraceNode
}

type AIDecisionPanelProps = {
  activeHouseLabel: string
  turn: number
  fuzzy: FuzzyStrategicOutput | null
  tree: AIDecisionTreeSnapshot | null
  trace?: AIDecisionTrace | null
  battleTree?: AIBattleTreeSnapshot | null
  finalReason: string | null
  simulationNote?: string | null
}

function DesireRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="ai-desire-row">
      <div className="ai-desire-meta">
        <span>{label}</span>
        <span>{Math.round(value)}</span>
      </div>
      <div className="ai-desire-track" aria-hidden>
        <div className="ai-desire-fill" style={{ width: `${Math.max(4, Math.min(100, value))}%` }} />
      </div>
    </div>
  )
}

function BattleTreeNode({ node, depth = 0 }: { node: MinimaxTraceNode; depth?: number }) {
  return (
    <div className={`battle-tree-node battle-tree-node-${node.nodeType}`} style={{ ['--tree-depth' as string]: depth }}>
      <div className="battle-tree-node-head">
        <p className="battle-tree-node-title">{node.title}</p>
        <span className="battle-tree-node-score">Score {node.score}</span>
      </div>
      <p className="battle-tree-node-state">{node.stateSummary}</p>
      {node.chosenAction ? <p className="battle-tree-node-choice">Chosen here: {node.chosenAction}</p> : null}
      {node.children.length ? (
        <div className="battle-tree-children">
          {node.children.map((child, index) => (
            <div key={`${child.label}-${index}`} className={`battle-tree-edge ${child.chosen ? 'is-chosen' : ''}`}>
              <div className="battle-tree-edge-label">
                <span>{child.label}</span>
                <strong>{child.score}</strong>
              </div>
              <BattleTreeNode node={child.next} depth={depth + 1} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

const referenceCases = runFuzzyReferenceCases()

export default function AIDecisionPanel({
  activeHouseLabel,
  turn,
  fuzzy,
  tree,
  trace,
  battleTree,
  finalReason,
  simulationNote,
}: AIDecisionPanelProps) {
  if (!fuzzy && !battleTree) {
    return (
      <section className="ai-panel">
        <h3>War Council AI</h3>
        <p>Run AI action or the minimax demo to inspect how the system chooses a move.</p>
      </section>
    )
  }

  return (
    <section className="ai-panel" aria-live="polite">
      <h3>War Council AI</h3>
      <p className="ai-panel-meta">{activeHouseLabel} • Turn {turn}</p>

      {fuzzy ? (
        <div className="ai-section">
          <p className="ai-section-title">Fuzzy Inputs</p>
          <p className="ai-tree-line">Own Strength: {Math.round(tree?.stateInputs.ownStrength || 0)}</p>
          <p className="ai-tree-line">Enemy Strength: {Math.round(tree?.stateInputs.enemyStrength || 0)}</p>
          <p className="ai-tree-line">Region Importance: {Math.round(tree?.stateInputs.regionImportance || 0)}</p>
          <p className="ai-tree-line">Gold: {Math.round(tree?.stateInputs.resources || 0)}</p>
          <p className="ai-tree-line">Aggression: {Math.round(tree?.stateInputs.aggression || 0)}</p>
        </div>
      ) : null}

      {fuzzy ? (
        <div className="ai-section">
          <p className="ai-section-title">Fuzzy Output</p>
          <DesireRow label="Attack Desire" value={fuzzy.attackDesire} />
          <DesireRow label="Defend Desire" value={fuzzy.defendDesire} />
          <DesireRow label="Hold Desire" value={fuzzy.holdDesire} />
          <DesireRow label="Reinforce Desire" value={fuzzy.reinforceDesire} />
        </div>
      ) : null}

      {fuzzy ? (
        <div className="ai-section ai-badges">
          <span className="ai-badge">Aggression: {fuzzy.aggressionLevel}</span>
          <span className="ai-badge">Pressure: {fuzzy.pressureLevel}</span>
          <span className="ai-badge">Readiness: {fuzzy.readinessLevel}</span>
        </div>
      ) : null}

      {finalReason ? (
        <div className="ai-section">
          <p className="ai-section-title">Final Decision</p>
          <p className="ai-final">{finalReason}</p>
          <p className="ai-tree-line">Pipeline: Inputs {'->'} Memberships {'->'} Fuzzy Rules {'->'} Highest Desire</p>
          {simulationNote ? <p className="ai-tree-line">Simulation: {simulationNote}</p> : null}
        </div>
      ) : null}

      {tree ? (
        <div className="ai-section">
          <p className="ai-section-title">Action Scores</p>
          <ul className="ai-tree-list ai-tree-candidates-list">
            {tree.candidateActions.map((candidate) => (
              <li key={candidate.label} className={candidate.chosen ? 'is-chosen' : ''}>
                <span>{candidate.label}</span>
                <strong>{Math.round(candidate.score)}</strong>
              </li>
            ))}
          </ul>
          <p className="ai-tree-line">Selected: {tree.finalDecisionLabel}</p>
          {trace?.focusRegionName ? <p className="ai-tree-line">Focus Region: {trace.focusRegionName}</p> : null}
          {trace?.attackSourceRegionName ? <p className="ai-tree-line">Attack Source: {trace.attackSourceRegionName}</p> : null}
          {trace?.targetRegionName ? <p className="ai-tree-line">Target Region: {trace.targetRegionName}</p> : null}
        </div>
      ) : null}

      {trace?.mcts ? (
        <div className="ai-section">
          <p className="ai-section-title">MCTS Planner</p>
          <p className="ai-tree-line">
            Selected: {trace.mcts.selectedLabel} ({trace.mcts.iterations} iterations, rollout depth {trace.mcts.rolloutDepth})
          </p>
          <ul className="ai-tree-list ai-tree-candidates-list">
            {trace.mcts.candidates.map((candidate) => (
              <li key={candidate.label} className={candidate.chosen ? 'is-chosen' : ''}>
                <span>{candidate.label} ({candidate.visits} visits)</span>
                <strong>{Math.round(candidate.averageScore)}</strong>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {battleTree ? (
        <div className="ai-section">
          <p className="ai-section-title">Minimax Battle Tree</p>
          <p className="ai-tree-line">
            Battle: {battleTree.attackerName} from {battleTree.sourceRegionName} vs {battleTree.defenderName} at {battleTree.targetRegionName}
          </p>
          <p className="ai-tree-line">Battle stops if either side loses {battleTree.lossPercent}% of the army it started this battle with, or if a side withdraws.</p>
          <p className="ai-final">Minimax selected {battleTree.bestAction} with final score {battleTree.score}.</p>
          <ul className="ai-tree-list ai-tree-candidates-list">
            {battleTree.rootScores.map((root) => (
              <li key={root.action} className={root.chosen ? 'is-chosen' : ''}>
                <span>Root action: {root.action}</span>
                <strong>{root.score}</strong>
              </li>
            ))}
          </ul>
          <div className="battle-tree-diagram">
            <BattleTreeNode node={battleTree.tree} />
          </div>
          <details className="battle-trace-details">
            <summary>Readable step-by-step trace</summary>
            <pre className="battle-trace-output">{battleTree.debugOutput}</pre>
          </details>
        </div>
      ) : null}

      {trace?.rules.length ? (
        <div className="ai-section">
          <p className="ai-section-title">Strongest Rules</p>
          <ul className="ai-tree-list">
            {trace.rules.slice(0, 4).map((rule) => (
              <li key={rule.id}>
                <span>{rule.id}: {rule.description}</span>
                <strong>{Math.round(rule.strength * 100)}%</strong>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {fuzzy ? (
        <div className="ai-section">
          <p className="ai-section-title">Reference Test Cases</p>
          <ul className="ai-tree-list">
            {referenceCases.map((testCase) => (
              <li key={testCase.house}>
                <span>{testCase.house}: expected {testCase.expectedAction}, got {testCase.actualAction}</span>
                <strong>{Math.round(Math.max(testCase.scores.attackDesire, testCase.scores.defendDesire, testCase.scores.holdDesire, testCase.scores.reinforceDesire))}</strong>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}
