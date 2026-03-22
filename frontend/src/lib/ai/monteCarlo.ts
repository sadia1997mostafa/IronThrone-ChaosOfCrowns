import type { RegionInfo } from '@/data/regionData'
import type { RiskLevel } from './types'

type MonteCarloInput = {
  attacker: RegionInfo
  defender: RegionInfo
  iterations?: number
}

export type MonteCarloResult = {
  winChance: number
  expectedAttackerLoss: number
  expectedDefenderLoss: number
  risk: RiskLevel
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export function simulateBattleMonteCarlo(input: MonteCarloInput): MonteCarloResult {
  const { attacker, defender, iterations = 280 } = input

  let wins = 0
  let totalAttackerLoss = 0
  let totalDefenderLoss = 0

  for (let i = 0; i < iterations; i += 1) {
    const randomBonus = Math.floor(Math.random() * 13) - 6
    const attackPower = attacker.army + randomBonus
    const defensePower = defender.army + defender.defense
    const winChance = clamp(0.52 + (attackPower - defensePower) / 170, 0.18, 0.88)

    const attackerWins = Math.random() < winChance
    if (attackerWins) {
      wins += 1
      totalAttackerLoss += Math.max(6, Math.min(Math.round(defender.army * 0.34), Math.floor(attacker.army * 0.58)))
      totalDefenderLoss += Math.max(10, Math.round(defender.army * 0.62))
    } else {
      totalAttackerLoss += Math.max(8, Math.min(Math.round(defender.army * 0.42), Math.floor(attacker.army * 0.72)))
      totalDefenderLoss += Math.max(4, Math.round(attacker.army * 0.22))
    }
  }

  const winChance = wins / iterations
  const expectedAttackerLoss = Math.round(totalAttackerLoss / iterations)
  const expectedDefenderLoss = Math.round(totalDefenderLoss / iterations)

  let risk: RiskLevel = 'Medium'
  if (winChance >= 0.72) risk = 'Low'
  if (winChance <= 0.45) risk = 'High'

  return {
    winChance,
    expectedAttackerLoss,
    expectedDefenderLoss,
    risk,
  }
}
