import type { AIFuzzySnapshot } from '@/lib/helpers/aiDecision'

type AIDecisionPanelProps = {
  activeHouseLabel: string
  turn: number
  fuzzy: AIFuzzySnapshot | null
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

export default function AIDecisionPanel({ activeHouseLabel, turn, fuzzy, finalReason }: AIDecisionPanelProps) {
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
    </section>
  )
}
