import type { AIFuzzySnapshot, AIDecisionTreeSnapshot } from '@/lib/helpers/aiDecision'

type AIDecisionPanelProps = {
  activeHouseLabel: string
  turn: number
  fuzzy: AIFuzzySnapshot | null
  tree: AIDecisionTreeSnapshot | null
  finalReason: string | null
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

export default function AIDecisionPanel({ activeHouseLabel, turn, fuzzy, tree, finalReason }: AIDecisionPanelProps) {
  if (!fuzzy) {
    return (
      <section className="ai-panel">
        <h3>War Council AI</h3>
        <p>Run AI action to generate strategic fuzzy evaluation for this turn.</p>
      </section>
    )
  }

  return (
    <section className="ai-panel" aria-live="polite">
      <h3>War Council AI</h3>
      <p className="ai-panel-meta">{activeHouseLabel} • Turn {turn}</p>

      <div className="ai-section">
        <p className="ai-section-title">Strategic Evaluation (Fuzzy)</p>
        <DesireRow label="Attack Desire" value={fuzzy.attackDesire} />
        <DesireRow label="Fortify Desire" value={fuzzy.fortifyDesire} />
        <DesireRow label="Recruit Desire" value={fuzzy.recruitDesire} />
        <DesireRow label="Gather Desire" value={fuzzy.gatherDesire} />
        <DesireRow label="Dragon Deploy Desire" value={fuzzy.dragonDeployDesire} />
      </div>

      <div className="ai-section ai-badges">
        <span className="ai-badge">Aggression: {fuzzy.aggressionLevel}</span>
        <span className="ai-badge">Threat: {fuzzy.threatLevel}</span>
        <span className="ai-badge">Desperation: {fuzzy.desperationLevel}</span>
        <span className="ai-badge">Economy: {fuzzy.economyPressure}</span>
        <span className="ai-badge">Border: {fuzzy.borderDanger}</span>
      </div>

      {finalReason ? (
        <div className="ai-section">
          <p className="ai-section-title">Final Decision</p>
          <p className="ai-final">{finalReason}</p>
        </div>
      ) : null}

      {tree ? (
        <div className="ai-section">
          <p className="ai-section-title">Decision Tree</p>
          <div className="ai-tree-view" role="group" aria-label="AI decision tree">
            <div className="ai-tree-root">{activeHouseLabel} Turn</div>

            <div className="ai-tree-branch">
              <p className="ai-tree-title">Strategic State</p>
              <ul className="ai-tree-list">
                <li>Army Power: {Math.round(tree.stateInputs.ownArmyPower)}</li>
                <li>Border Threat: {Math.round(tree.stateInputs.borderThreat)}</li>
                <li>Enemy Weakness: {Math.round(tree.stateInputs.enemyWeakness)}</li>
                <li>Gold Pressure: {Math.round(tree.stateInputs.goldPressure)}</li>
                <li>Neutral Opportunity: {Math.round(tree.stateInputs.neutralOpportunity)}</li>
              </ul>
            </div>

            <div className="ai-tree-branch">
              <p className="ai-tree-title">Strategic Priority (Fuzzy)</p>
              <p className="ai-tree-line">
                TOP: <strong>{tree.topPriority.action.toUpperCase()}</strong> ({Math.round(tree.topPriority.score)})
              </p>
            </div>

            <div className="ai-tree-branch">
              <p className="ai-tree-title">Candidate Actions</p>
              <ul className="ai-tree-list ai-tree-candidates-list">
                {tree.candidateActions.map((candidate) => (
                  <li key={candidate.label} className={candidate.chosen ? 'is-chosen' : ''}>
                    <span>{candidate.label}</span>
                    <strong>{Math.round(candidate.score)}</strong>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ai-tree-branch ai-tree-final">
              <p className="ai-tree-title">Final Decision</p>
              <p className="ai-tree-line">{tree.finalDecisionLabel}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
