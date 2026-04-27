import type { AIDecisionTrace, FuzzyRuleCalculation } from '@/lib/ai/types'

type AIDecisionPopupProps = {
  open: boolean
  turn: number
  houseLabel: string
  trace: AIDecisionTrace | null
  finalReason: string | null
  step: number
  paused: boolean
  onPause: () => void
  onResume: () => void
  onClose: () => void
}

type StepState = 'pending' | 'active' | 'done'

const formatDecimal = (value: number) => value.toFixed(2)
const formatAction = (action: string) => action.charAt(0).toUpperCase() + action.slice(1)

function getStepState(currentStep: number, stepIndex: number): StepState {
  if (currentStep > stepIndex) return 'done'
  if (currentStep === stepIndex) return 'active'
  return 'pending'
}

function getRuleStepStart() {
  return 2
}

function getActionTotalsStep(trace: AIDecisionTrace) {
  return getRuleStepStart() + trace.ruleCalculations.length
}

function getFinalStep(trace: AIDecisionTrace) {
  return getActionTotalsStep(trace) + 1
}

function buildStepLabels(trace: AIDecisionTrace) {
  return [
    'Inputs Prepared',
    'Memberships Calculated',
    ...trace.ruleCalculations.map((rule) => `${rule.id} Evaluated`),
    'Action Totals Summed',
    'Final Action Selected',
  ]
}

function stageExplanation(step: number, trace: AIDecisionTrace) {
  const actionStep = getActionTotalsStep(trace)
  const finalStep = getFinalStep(trace)

  if (step === 0) {
    return {
      title: 'Step 1: Inputs Prepared',
      body: 'The AI starts with five plain numbers for this house: own strength, enemy strength, region importance, gold, and aggression.',
    }
  }

  if (step === 1) {
    return {
      title: 'Step 2: Memberships Calculated',
      body: 'Each input is converted into low, medium, and high memberships. One value can belong partly to more than one category.',
    }
  }

  if (step >= getRuleStepStart() && step < actionStep) {
    const rule = trace.ruleCalculations[step - getRuleStepStart()]
    return {
      title: `Rule ${rule.id}: ${formatAction(rule.action)}`,
      body: `${rule.description} The rule strength is the minimum of its condition values, then it is multiplied by the rule intensity.`,
    }
  }

  if (step === actionStep) {
    return {
      title: 'Step 3: Action Totals Summed',
      body: 'All rule contributions are grouped by action. Attack, defend, hold, and reinforce each get their own total.',
    }
  }

  if (step >= finalStep) {
    return {
      title: 'Step 4: Final Action Selected',
      body: 'The action with the highest total becomes the final intention for this turn.',
    }
  }

  return {
    title: 'Fuzzy Decision Visualization',
    body: 'This walkthrough shows exactly how the current turn is evaluated.',
  }
}

function membershipRows(trace: AIDecisionTrace) {
  return [
    {
      label: 'Own Strength',
      values: trace.memberships.ownStrength,
    },
    {
      label: 'Enemy Strength',
      values: trace.memberships.enemyStrength,
    },
    {
      label: 'Region Importance',
      values: trace.memberships.regionImportance,
    },
    {
      label: 'Gold',
      values: trace.memberships.resources,
    },
    {
      label: 'Aggression',
      values: trace.memberships.aggression,
    },
  ]
}

function ruleFormula(rule: FuzzyRuleCalculation) {
  return `min(${rule.conditions.map((condition) => formatDecimal(condition.value)).join(', ')}) = ${formatDecimal(rule.strength)}`
}

function ruleWeight(rule: FuzzyRuleCalculation) {
  if (rule.intensity === 'medium') return 55
  if (rule.intensity === 'mediumHigh') return 72
  return 90
}

export default function AIDecisionPopup({
  open,
  turn,
  houseLabel,
  trace,
  finalReason,
  step,
  paused,
  onPause,
  onResume,
  onClose,
}: AIDecisionPopupProps) {
  if (!open || !trace) return null

  const steps = buildStepLabels(trace)
  const explain = stageExplanation(step, trace)
  const actionTotalsStep = getActionTotalsStep(trace)
  const finalStep = getFinalStep(trace)
  const activeRuleIndex = step >= getRuleStepStart() && step < actionTotalsStep ? step - getRuleStepStart() : -1
  const isFinished = step >= finalStep

  return (
    <div className="ai-decision-modal-backdrop" role="dialog" aria-modal="true" aria-label="AI decision flow popup">
      <section className="ai-decision-modal">
        <div className="ai-decision-toolbar">
          <div>
            <p className="ai-decision-eyebrow">
              Turn {turn} | {houseLabel}
            </p>
            <h3 className="ai-decision-title">Fuzzy Decision Visualization</h3>
          </div>

          <div className="ai-decision-toolbar-actions">
            <button
              type="button"
              className="ai-decision-control"
              onClick={onPause}
              disabled={paused || isFinished}
            >
              Pause
            </button>
            <button
              type="button"
              className="ai-decision-control"
              onClick={onResume}
              disabled={!paused || isFinished}
            >
              Resume
            </button>
            <button type="button" className="ai-decision-close" onClick={onClose} aria-label="Close AI decision popup">
              Close
            </button>
          </div>
        </div>

        <div className="ai-decision-layout">
          <div className="ai-decision-sidebar">
            <div className="ai-explainer-block">
              <p className="ai-explainer-title">{explain.title}</p>
              <p className="ai-explainer-body">{explain.body}</p>
              <p className="ai-explainer-body ai-explainer-progress">
                Step {Math.min(step + 1, steps.length)} of {steps.length}
                {paused ? ' | Paused' : ''}
              </p>
            </div>

            <ol className="ai-decision-steps">
              {steps.map((label, index) => {
                const state = getStepState(step, index)
                return (
                  <li key={label} className={`ai-step ai-step-${state}`}>
                    <span className="ai-step-index">{index + 1}</span>
                    <span className="ai-step-label">{label}</span>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="ai-decision-main">
            <div className="ai-tree-live">
              <div className={`ai-tree-live-branch ${step >= 0 ? 'is-on' : ''}`}>
                <p className="ai-tree-live-title">1. Inputs</p>
                <div className="ai-calc-grid">
                  <div className="ai-calc-card">
                    <span className="ai-calc-label">Own Strength</span>
                    <strong>{Math.round(trace.inputs.ownStrength)}</strong>
                  </div>
                  <div className="ai-calc-card">
                    <span className="ai-calc-label">Enemy Strength</span>
                    <strong>{Math.round(trace.inputs.enemyStrength)}</strong>
                  </div>
                  <div className="ai-calc-card">
                    <span className="ai-calc-label">Region Importance</span>
                    <strong>{Math.round(trace.inputs.regionImportance)}</strong>
                  </div>
                  <div className="ai-calc-card">
                    <span className="ai-calc-label">Gold</span>
                    <strong>{Math.round(trace.inputs.resources)}</strong>
                  </div>
                  <div className="ai-calc-card">
                    <span className="ai-calc-label">Aggression</span>
                    <strong>{Math.round(trace.inputs.aggression)}</strong>
                  </div>
                </div>
              </div>

              <div className={`ai-tree-live-branch ${step >= 1 ? 'is-on' : ''}`}>
                <p className="ai-tree-live-title">2. Memberships</p>
                <div className="ai-membership-table">
                  {membershipRows(trace).map((row) => (
                    <div key={row.label} className="ai-membership-row">
                      <span className="ai-membership-label">{row.label}</span>
                      <span>Low {formatDecimal(row.values.low)}</span>
                      <span>Medium {formatDecimal(row.values.medium)}</span>
                      <span>High {formatDecimal(row.values.high)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`ai-tree-live-branch ${step >= getRuleStepStart() ? 'is-on' : ''}`}>
                <p className="ai-tree-live-title">3. Rule Calculations</p>
                <ul className="ai-rule-list">
                  {trace.ruleCalculations.map((rule, index) => {
                    const ruleStep = getRuleStepStart() + index
                    const state = getStepState(step, ruleStep)

                    return (
                      <li
                        key={rule.id}
                        className={`ai-rule-card ai-rule-card-${state} ${activeRuleIndex === index ? 'is-current' : ''}`}
                      >
                        <div className="ai-rule-card-head">
                          <span>
                            {rule.id} {'->'} {formatAction(rule.action)}
                          </span>
                          <strong>{rule.intensity}</strong>
                        </div>
                        <p className="ai-rule-card-text">{rule.description}</p>
                        <div className="ai-rule-condition-list">
                          {rule.conditions.map((condition) => (
                            <span key={`${rule.id}-${condition.label}`} className="ai-rule-condition-chip">
                              {condition.label}: {formatDecimal(condition.value)}
                            </span>
                          ))}
                        </div>
                        <p className="ai-rule-math">{ruleFormula(rule)}</p>
                        <p className="ai-rule-math">
                          Contribution = {formatDecimal(rule.strength)} x {ruleWeight(rule)} = {formatDecimal(rule.contribution)}
                        </p>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className={`ai-tree-live-branch ${step >= actionTotalsStep ? 'is-on' : ''}`}>
                <p className="ai-tree-live-title">4. Action Totals</p>
                <ul className="ai-action-total-list">
                  {trace.actionBreakdown.map((action) => (
                    <li key={action.action} className={trace.finalDecisionLabel.toLowerCase().startsWith(action.label.toLowerCase()) ? 'is-chosen' : ''}>
                      <div className="ai-action-total-head">
                        <span>{action.label}</span>
                        <strong>{formatDecimal(action.total)}</strong>
                      </div>
                      <p className="ai-action-total-formula">
                        {action.contributions.length
                          ? action.contributions.map((entry) => `${entry.ruleId}(${formatDecimal(entry.contribution)})`).join(' + ')
                          : 'No rules contributed'}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`ai-tree-live-branch ai-tree-live-final ${step >= finalStep ? 'is-on' : ''}`}>
                <p className="ai-tree-live-title">5. Final Decision</p>
                <p>{trace.finalDecisionLabel}</p>
                {trace.mcts ? (
                  <p>
                    MCTS Selected: {trace.mcts.selectedLabel} after {trace.mcts.iterations} iterations
                    {typeof trace.mcts.selectedAverageScore === 'number' ? ` (avg ${trace.mcts.selectedAverageScore.toFixed(2)})` : ''}
                  </p>
                ) : null}
                {trace.focusRegionName ? <p>Focus Region: {trace.focusRegionName}</p> : null}
                {trace.targetRegionName ? <p>Target Region: {trace.targetRegionName}</p> : null}
                {finalReason ? <p className="ai-tree-live-reason">{finalReason}</p> : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
