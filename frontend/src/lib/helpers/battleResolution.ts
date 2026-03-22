type ResolveBattleInput = {
  attackerArmy: number
  defenderArmy: number
  defenderDefense: number
}

export type BattleResolution = {
  attackerWins: boolean
  randomBonus: number
  winChance: number
  attackerAfter: number
  defenderAfter: number
  attackerLoss: number
  defenderLoss: number
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export function resolveBattle(input: ResolveBattleInput): BattleResolution {
  const { attackerArmy, defenderArmy, defenderDefense } = input

  const randomBonus = Math.floor(Math.random() * 13) - 6
  const attackPower = attackerArmy + randomBonus
  const defensePower = defenderArmy + defenderDefense
  const powerDelta = attackPower - defensePower
  const winChance = clamp(0.52 + powerDelta / 170, 0.2, 0.86)
  const attackerWins = Math.random() < winChance

  if (attackerWins) {
    const attackerLoss = Math.max(6, Math.min(Math.round(defenderArmy * 0.34), Math.floor(attackerArmy * 0.58)))
    const attackerAfter = Math.max(10, attackerArmy - attackerLoss)
    const defenderAfter = Math.max(12, Math.round(attackerAfter * 0.56))
    const defenderLoss = Math.max(10, defenderArmy - defenderAfter)

    return {
      attackerWins,
      randomBonus,
      winChance,
      attackerAfter,
      defenderAfter,
      attackerLoss,
      defenderLoss,
    }
  }

  const attackerLoss = Math.max(8, Math.min(Math.round(defenderArmy * 0.42), Math.floor(attackerArmy * 0.7)))
  const defenderLoss = Math.max(4, Math.min(Math.round(attackerArmy * 0.24), Math.floor(defenderArmy * 0.42)))
  const attackerAfter = Math.max(8, attackerArmy - attackerLoss)
  const defenderAfter = Math.max(8, defenderArmy - defenderLoss)

  return {
    attackerWins,
    randomBonus,
    winChance,
    attackerAfter,
    defenderAfter,
    attackerLoss,
    defenderLoss,
  }
}
