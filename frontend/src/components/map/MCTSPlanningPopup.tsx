import { useEffect, useMemo, useState } from 'react'
import type { MCTSPlanningTrace } from '@/lib/ai/types'

type MCTSPlanningPopupProps = {
  open: boolean
  trace: MCTSPlanningTrace | null
  autoCloseAfterPlayback?: boolean
  onClose: () => void
}

const AUTO_STEP_MS = 650
const AUTO_CLOSE_AFTER_COMPLETE_MS = 900

export default function MCTSPlanningPopup({ open, trace, autoCloseAfterPlayback = false, onClose }: MCTSPlanningPopupProps) {
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!open) {
      setStep(0)
      setPaused(false)
      return
    }

    setStep(0)
    setPaused(false)
  }, [open, trace])

  useEffect(() => {
    if (!open || paused || !trace) return
    if (step >= trace.iterationLog.length) return

    const timer = setTimeout(() => {
      setStep((current) => Math.min(current + 1, trace.iterationLog.length))
    }, AUTO_STEP_MS)

    return () => clearTimeout(timer)
  }, [open, paused, step, trace])

  useEffect(() => {
    if (!open || !trace || !autoCloseAfterPlayback) return
    if (step < trace.iterationLog.length) return

    const timer = setTimeout(() => {
      onClose()
    }, AUTO_CLOSE_AFTER_COMPLETE_MS)

    return () => clearTimeout(timer)
  }, [autoCloseAfterPlayback, onClose, open, step, trace])

  const currentIteration = useMemo(() => {
    if (!trace) return null
    return trace.iterationLog[Math.max(0, Math.min(step - 1, trace.iterationLog.length - 1))] ?? null
  }, [step, trace])

  const currentIterationIndex = useMemo(() => {
    if (!trace || trace.iterationLog.length === 0 || step === 0) return -1
    return Math.max(0, Math.min(step - 1, trace.iterationLog.length - 1))
  }, [step, trace])

  if (!open || !trace) return null

  const liveCandidates = currentIteration?.candidateSnapshots ?? trace.candidates
  const chosenLabel = currentIteration?.bestLabelAfter ?? trace.selectedLabel
  const progressLabel =
    trace.iterationLog.length === 0
      ? 'No rollouts recorded'
      : step === 0
        ? 'Ready to start rollouts'
        : step >= trace.iterationLog.length
          ? 'Search complete'
          : `Iteration ${step} of ${trace.iterationLog.length}`

  return (
    <div className="ai-decision-modal-backdrop" role="dialog" aria-modal="true" aria-label="MCTS planning simulation">
      <section className="ai-decision-modal mcts-modal">
        <div className="ai-decision-toolbar">
          <div>
            <p className="ai-decision-eyebrow">MCTS Planning Simulation</p>
            <h3 className="ai-decision-title">Search rollout timeline</h3>
          </div>

          <div className="ai-decision-toolbar-actions">
            <button type="button" className="ai-decision-control" onClick={() => setPaused((current) => !current)}>
              {paused ? 'Resume' : 'Pause'}
            </button>
            <button
              type="button"
              className="ai-decision-control"
              onClick={() => setStep((current) => Math.max(0, current - 1))}
              disabled={step === 0}
            >
              Back
            </button>
            <button
              type="button"
              className="ai-decision-control"
              onClick={() => setStep((current) => Math.min(trace.iterationLog.length, current + 1))}
              disabled={step >= trace.iterationLog.length}
            >
              Next
            </button>
            <button type="button" className="ai-decision-close" onClick={onClose}>
              Close
            </button>
          </div>
        </div>

        <div className="mcts-modal-head">
          <p className="mcts-modal-summary">
            Selected path: {trace.selectedLabel} | {trace.iterations} iterations | rollout depth {trace.rolloutDepth} | exploration {trace.exploration}
          </p>
          <p className="mcts-modal-progress">{progressLabel}</p>
          <p className="mcts-modal-progress">Final average: {trace.selectedAverageScore.toFixed(2)}</p>
        </div>

        <div className="mcts-modal-layout">
          <div className="mcts-modal-main">
            {currentIteration ? (
              <article className="mcts-iteration-card mcts-iteration-card-current">
                <div className="mcts-iteration-head">
                  <span>Iteration {currentIteration.iteration}</span>
                  <strong>Rollout {currentIteration.rolloutScore.toFixed(2)}</strong>
                </div>
                <p className="mcts-iteration-line">
                  Selected {currentIteration.selectedLabel} | visits before {currentIteration.selectedVisitsBefore} | avg before {currentIteration.selectedAverageBefore.toFixed(2)}
                </p>
                <p className="mcts-iteration-line">
                  Best now {currentIteration.bestLabelAfter} at {currentIteration.bestAverageAfter.toFixed(2)}
                </p>
              </article>
            ) : (
              <article className="mcts-iteration-card mcts-iteration-card-current">
                <p className="mcts-iteration-line">The search starts by exploring unvisited candidates first, then balances average score against exploration.</p>
              </article>
            )}

            <div className="mcts-candidate-grid">
              {liveCandidates.map((candidate) => (
                <div key={candidate.label} className={`mcts-candidate-card ${candidate.label === chosenLabel ? 'is-chosen' : ''}`}>
                  <div className="mcts-candidate-head">
                    <span>{candidate.label}</span>
                    <strong>{candidate.visits} visits</strong>
                  </div>
                  <div className="mcts-candidate-meter" aria-hidden>
                    <div className="mcts-candidate-meter-fill" style={{ width: `${Math.max(8, Math.min(100, candidate.averageScore))}%` }} />
                  </div>
                  <div className="mcts-candidate-foot">
                    <span>Avg {candidate.averageScore.toFixed(2)}</span>
                    {candidate.label === chosenLabel ? <strong>Chosen</strong> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="mcts-modal-side">
            <p className="mcts-modal-side-title">Rollout log</p>
            <div className="mcts-iteration-log">
              {trace.iterationLog.map((entry, index) => (
                <article
                  key={entry.iteration}
                  className={`mcts-iteration-card ${index === currentIterationIndex ? 'mcts-iteration-card-current' : ''} ${index < step ? 'is-complete' : ''}`}
                >
                  <div className="mcts-iteration-head">
                    <span>Iteration {entry.iteration}</span>
                    <strong>{entry.selectedLabel}</strong>
                  </div>
                  <p className="mcts-iteration-line">Rollout {entry.rolloutScore.toFixed(2)} | best {entry.bestLabelAfter}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
