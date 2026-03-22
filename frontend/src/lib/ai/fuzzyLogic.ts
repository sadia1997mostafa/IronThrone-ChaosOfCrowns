import type { AILinguisticLevel, FuzzyStrategicOutput, StrategicMetrics } from './types'

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value))

const toLevel = (value: number): AILinguisticLevel => {
  if (value >= 67) return 'High'
  if (value >= 34) return 'Medium'
  return 'Low'
}

export function evaluateFuzzyStrategic(metrics: StrategicMetrics): FuzzyStrategicOutput {
  const attackDesire = clamp(
    35 +
      metrics.enemyWeakness * 0.35 +
      metrics.neutralOpportunity * 0.2 +
      metrics.targetValue * 0.18 +
      metrics.ownArmyPower * 0.22 -
      metrics.borderThreat * 0.18 -
      metrics.goldPressure * 0.08
  )

  const fortifyDesire = clamp(
    18 +
      metrics.borderThreat * 0.55 +
      metrics.targetValue * 0.1 -
      metrics.enemyWeakness * 0.16
  )

  const recruitDesire = clamp(
    24 +
      (100 - metrics.ownArmyPower) * 0.45 +
      metrics.borderThreat * 0.2 +
      metrics.goldPressure * 0.12
  )

  const gatherDesire = clamp(
    16 +
      metrics.goldPressure * 0.6 +
      (100 - metrics.ownArmyPower) * 0.1 -
      metrics.enemyWeakness * 0.1
  )

  const dragonDeployDesire = clamp(
    8 +
      metrics.targetValue * 0.42 +
      metrics.enemyWeakness * 0.25 +
      metrics.dragonStamina * 0.35 -
      metrics.borderThreat * 0.08
  )

  const aggressionScore = clamp((attackDesire * 0.7 + dragonDeployDesire * 0.3) / 1)
  const desperationScore = clamp(
    (metrics.borderThreat * 0.35 + metrics.goldPressure * 0.35 + (100 - metrics.ownArmyPower) * 0.3) / 1
  )

  return {
    attackDesire,
    fortifyDesire,
    recruitDesire,
    gatherDesire,
    dragonDeployDesire,
    aggressionLevel: toLevel(aggressionScore),
    threatLevel: toLevel(metrics.borderThreat),
    desperationLevel: toLevel(desperationScore),
    economyPressure: toLevel(metrics.goldPressure),
    borderDanger: toLevel(metrics.borderThreat),
  }
}
