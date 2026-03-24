import { runFuzzyReferenceCases } from '@/lib/ai/fuzzyLogic'
import type { AIActionType, AIDecisionTrace, FuzzyStrategicOutput } from '@/lib/ai/types'

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

type AIDecisionPanelProps = {
  activeHouseLabel: string
  turn: number
  fuzzy: FuzzyStrategicOutput | null
  tree: AIDecisionTreeSnapshot | null
  trace?: AIDecisionTrace | null
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

const referenceCases = runFuzzyReferenceCases()

export default function AIDecisionPanel({
  activeHouseLabel,
  turn,
  fuzzy,
  tree,
  trace,
  finalReason,
  simulationNote,
}: AIDecisionPanelProps) {
  if (!fuzzy) {
    return (
      <section className="ai-panel">
        <h3>War Council AI</h3>
        <p>Run AI action to inspect the fuzzy-only decision system for this turn.</p>
      </section>
    )
  }

  return (
    <section className="ai-panel" aria-live="polite">
      <h3>War Council AI</h3>
      <p className="ai-panel-meta">{activeHouseLabel} • Turn {turn}</p>

      <div className="ai-section">
        <p className="ai-section-title">Fuzzy Inputs</p>
        <p className="ai-tree-line">Own Strength: {Math.round(tree?.stateInputs.ownStrength || 0)}</p>
        <p className="ai-tree-line">Enemy Strength: {Math.round(tree?.stateInputs.enemyStrength || 0)}</p>
        <p className="ai-tree-line">Region Importance: {Math.round(tree?.stateInputs.regionImportance || 0)}</p>
        <p className="ai-tree-line">Gold: {Math.round(tree?.stateInputs.resources || 0)}</p>
        <p className="ai-tree-line">Aggression: {Math.round(tree?.stateInputs.aggression || 0)}</p>
      </div>

      <div className="ai-section">
        <p className="ai-section-title">Fuzzy Output</p>
        <DesireRow label="Attack Desire" value={fuzzy.attackDesire} />
        <DesireRow label="Defend Desire" value={fuzzy.defendDesire} />
        <DesireRow label="Hold Desire" value={fuzzy.holdDesire} />
        <DesireRow label="Reinforce Desire" value={fuzzy.reinforceDesire} />
      </div>

      <div className="ai-section ai-badges">
        <span className="ai-badge">Aggression: {fuzzy.aggressionLevel}</span>
        <span className="ai-badge">Pressure: {fuzzy.pressureLevel}</span>
        <span className="ai-badge">Readiness: {fuzzy.readinessLevel}</span>
      </div>

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
          {trace?.targetRegionName ? <p className="ai-tree-line">Target Region: {trace.targetRegionName}</p> : null}
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
    </section>
  )
}
