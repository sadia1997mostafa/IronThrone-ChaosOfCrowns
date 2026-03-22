import type { CandidateAction, FuzzyStrategicOutput } from './types'

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

function actionWeight(action: CandidateAction['action'], strategic: FuzzyStrategicOutput): number {
  if (action === 'attack') return strategic.attackDesire
  if (action === 'fortify') return strategic.fortifyDesire
  if (action === 'recruit') return strategic.recruitDesire
  return strategic.gatherDesire
}

export function scoreCandidatesMinimax(
  candidates: CandidateAction[],
  strategic: FuzzyStrategicOutput
): CandidateAction[] {
  return candidates
    .map((candidate) => {
      const tactical = candidate.score || 0
      const weighted = tactical * 0.56 + actionWeight(candidate.action, strategic) * 0.44
      return {
        ...candidate,
        score: Math.round(clamp(weighted, -100, 100) * 10) / 10,
      }
    })
    .sort((a, b) => (b.score || 0) - (a.score || 0))
}
