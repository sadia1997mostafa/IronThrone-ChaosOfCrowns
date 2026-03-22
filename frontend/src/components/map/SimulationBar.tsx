'use client'

import type { HouseId } from '@/data/regionData'

type SimulationBarProps = {
  turn: number
  currentFaction: HouseId | null
  phase: 'idle' | 'battle' | 'ending'
  gold: number
  food: number
  influence: number
  factionColors: Record<HouseId, string>
}

export default function SimulationBar({
  turn,
  currentFaction,
  phase,
  gold,
  food,
  influence,
  factionColors,
}: SimulationBarProps) {
  const factionLabel = currentFaction ? {
    stark: 'House Stark',
    lannister: 'House Lannister',
    targaryen: 'House Targaryen',
    tyrell: 'House Tyrell',
  }[currentFaction] : 'DYNASTY PHASE'

  const factionColor = currentFaction ? factionColors[currentFaction] : '#7dc4ff'

  return (
    <div className="simulation-bar">
      <div className="sim-section sim-turn">
        <span className="sim-label">TURN</span>
        <span className="sim-value">{turn}</span>
      </div>

      <div className="sim-section sim-faction" style={{ ['--faction-color' as string]: factionColor }}>
        <span className="sim-label">ACTIVE HOUSE</span>
        <span className="sim-value">{factionLabel}</span>
      </div>

      <div className="sim-section sim-phase">
        <span className="sim-label">PHASE</span>
        <span className={`sim-value phase-${phase}`}>{phase.toUpperCase()}</span>
      </div>

      <div className="sim-divider" aria-hidden />

      <div className="sim-section sim-resource sim-gold">
        <span className="sim-icon">💰</span>
        <span className="sim-label">Gold</span>
        <span className="sim-value">{gold}</span>
      </div>

      <div className="sim-section sim-resource sim-food">
        <span className="sim-icon">🌾</span>
        <span className="sim-label">Food</span>
        <span className="sim-value">{food}</span>
      </div>

      <div className="sim-section sim-resource sim-influence">
        <span className="sim-icon">⚜️</span>
        <span className="sim-label">Influence</span>
        <span className="sim-value">{influence}</span>
      </div>
    </div>
  )
}
