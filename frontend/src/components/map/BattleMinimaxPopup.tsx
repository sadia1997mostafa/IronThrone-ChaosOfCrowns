import { useEffect, useMemo, useState } from 'react'
import type { AIBattleTreeSnapshot } from './AIDecisionPanel'
import type { MinimaxTraceNode } from '@/lib/minimax/battleMinimax'

type BattleMinimaxPopupProps = {
  open: boolean
  battleTree: AIBattleTreeSnapshot | null
  focusedPath?: number[] | null
  simulationRunning?: boolean
  canToggleSimulation?: boolean
  onPauseSimulation?: () => void
  onResumeSimulation?: () => void
  onClose: () => void
}

function nodeLabel(node: MinimaxTraceNode) {
  if (node.nodeType === 'max') return 'MAX'
  if (node.nodeType === 'min') return 'MIN'
  return 'LEAF'
}

function armyPair(summary: string) {
  const attacker = summary.match(/attacker_army=(\d+)/)?.[1] ?? '?'
  const defender = summary.match(/defender_army=(\d+)/)?.[1] ?? '?'
  return `A:${attacker} D:${defender}`
}

function parseStateSummary(summary: string) {
  const attacker = summary.match(/attacker_army=(\d+)/)?.[1] ?? '?'
  const defender = summary.match(/defender_army=(\d+)/)?.[1] ?? '?'
  const owner = summary.match(/region_owner=([^,]+)/)?.[1] ?? '?'
  const turn = summary.match(/turn=(\d+)/)?.[1] ?? '?'

  return {
    attacker,
    defender,
    owner,
    turn,
  }
}

function shortActionLabel(label: string) {
  if (label.includes('Attack')) return 'Attack'
  if (label.includes('Guard')) return 'Guard'
  if (label.includes('Withdraw')) return 'Withdraw'
  return label
}

function leafReasonText(node: MinimaxTraceNode) {
  if (node.nodeType !== 'terminal') return null
  return node.title
}

function nodeValueLabel(node: MinimaxTraceNode) {
  return node.nodeType === 'terminal' ? 'Final leaf score' : 'Returned subtree value'
}

function focusNodeFromPath(root: MinimaxTraceNode, path: number[]) {
  let current = root

  for (const index of path) {
    const next = current.children[index]?.next
    if (!next) break
    current = next
  }

  return current
}

function actionPathLabels(root: MinimaxTraceNode, path: number[]) {
  const labels: string[] = []
  let current = root

  for (const index of path) {
    const child = current.children[index]
    if (!child) break
    labels.push(shortActionLabel(child.label))
    current = child.next
  }

  return labels
}

export default function BattleMinimaxPopup({
  open,
  battleTree,
  focusedPath = null,
  simulationRunning = false,
  canToggleSimulation = false,
  onPauseSimulation,
  onResumeSimulation,
  onClose,
}: BattleMinimaxPopupProps) {
  const [path, setPath] = useState<number[]>([])

  useEffect(() => {
    if (open) setPath([])
  }, [open, battleTree])

  useEffect(() => {
    if (open && focusedPath) {
      setPath(focusedPath)
    }
  }, [focusedPath, open])

  const rootNode = battleTree?.tree ?? null
  const focusedNode = useMemo(() => (rootNode ? focusNodeFromPath(rootNode, path) : null), [rootNode, path])
  const breadcrumb = useMemo(() => (rootNode ? actionPathLabels(rootNode, path) : []), [rootNode, path])

  if (!open || !battleTree || !rootNode || !focusedNode) return null

  const isLeaf = focusedNode.children.length === 0
  const focusedState = parseStateSummary(focusedNode.stateSummary)

  return (
    <div className="ai-decision-modal-backdrop" role="dialog" aria-modal="true" aria-label="Minimax battle simulation">
      <section className="ai-decision-modal battle-minimax-walkthrough">
        <div className="ai-decision-toolbar">
          <div>
            <p className="ai-decision-eyebrow">Minimax Battle Simulation</p>
            <h3 className="ai-decision-title">
              {battleTree.attackerName} vs {battleTree.defenderName}
            </h3>
          </div>

          <div className="ai-decision-toolbar-actions">
            {canToggleSimulation ? (
              <button
                type="button"
                className="ai-decision-control"
                onClick={simulationRunning ? onPauseSimulation : onResumeSimulation}
              >
                {simulationRunning ? 'Pause Simulation' : 'Resume Simulation'}
              </button>
            ) : null}
            <button type="button" className="ai-decision-control" onClick={() => setPath((current) => current.slice(0, -1))} disabled={path.length === 0}>
              Back
            </button>
            <button type="button" className="ai-decision-close" onClick={onClose}>
              Close
            </button>
          </div>
        </div>

        <div className="battle-minimax-walkthrough-head">
          <p className="battle-minimax-clean-battle">
            {battleTree.attackerName} ({battleTree.sourceRegionName}) vs {battleTree.defenderName} ({battleTree.targetRegionName})
          </p>
          <p className="battle-minimax-clean-rule">End rule: lose {battleTree.lossPercent}% of starting army or withdraw.</p>
          <p className="battle-minimax-step-label">
            {breadcrumb.length ? `Path: Root -> ${breadcrumb.join(' -> ')}` : 'Path: Root'}
          </p>
          <p className="battle-minimax-step-help">
            Each child score is the value returned from deeper minimax search. Use <strong>Expand</strong> to inspect how that value is produced until a terminal leaf.
          </p>
        </div>

        {!simulationRunning ? (
          <div className="battle-node-guide battle-node-guide-paused">
            <p>Paused. Expand any branch to inspect the tree, then resume when you are ready to continue.</p>
          </div>
        ) : null}

        <div className="battle-node-explorer">
          <div className="battle-node-guide">
            {path.length === 0 ? (
              <p>Start at the root. Each child score is a value returned from deeper minimax search.</p>
            ) : isLeaf ? (
              <p>You reached a leaf. Read the reason below, then this score backtracks upward to the parent node.</p>
            ) : (
              <p>You are now inspecting how this returned score was computed. Expand a child to go deeper.</p>
            )}
          </div>

          <div className={`battle-node-focus battle-node-focus-${focusedNode.nodeType}`}>
            <span className="battle-node-focus-kind">{nodeLabel(focusedNode)}</span>
            <div className="battle-node-focus-state">
              <span className="battle-node-focus-state-line">
                Current state: {armyPair(focusedNode.stateSummary)}
              </span>
              <span className="battle-node-focus-state-line">
                Region owner: {focusedState.owner} | Turn: {focusedState.turn}
              </span>
            </div>
            <span className="battle-node-focus-score-label">{nodeValueLabel(focusedNode)}</span>
            <strong className="battle-node-focus-score">{focusedNode.score}</strong>
            {focusedNode.chosenAction ? <p className="battle-node-focus-choice">Chosen child: {focusedNode.chosenAction}</p> : null}
          </div>

          {!isLeaf ? (
            <div className="battle-node-children-grid">
              {focusedNode.children.map((child, index) => (
                <div key={`${child.label}-${index}`} className={`battle-node-child-card ${child.chosen ? 'is-chosen' : ''}`}>
                  <p className="battle-node-child-action">{shortActionLabel(child.label)}</p>
                  <div className={`battle-node-child-kind battle-node-child-kind-${child.next.nodeType}`}>{nodeLabel(child.next)}</div>
                  <p className="battle-node-child-score-label">{nodeValueLabel(child.next)}</p>
                  <strong className="battle-node-child-score">{child.score}</strong>
                  <p className="battle-node-child-army">{armyPair(child.next.stateSummary)}</p>
                  {child.next.children.length === 0 ? <p className="battle-node-child-reason">{leafReasonText(child.next)}</p> : null}
                  <div className="battle-node-child-meta">
                    {child.chosen ? <span className="battle-node-badge">Chosen here</span> : null}
                    {child.next.children.length === 0 ? <span className="battle-node-badge">Leaf</span> : null}
                  </div>
                  {child.next.children.length > 0 ? (
                    <button type="button" className="ai-decision-control battle-node-expand" onClick={() => setPath((current) => [...current, index])}>
                      Expand
                    </button>
                  ) : (
                    <button type="button" className="ai-decision-control battle-node-expand" disabled>
                      End
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="battle-node-leaf-note">
              <p><strong>Why this is a leaf:</strong> {focusedNode.title}</p>
              <p>This score is returned upward to the parent during backtracking.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
