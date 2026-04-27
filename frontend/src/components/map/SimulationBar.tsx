'use client'

import type { HouseId } from '@/data/regionData'

type PlayableHouseId = HouseId

type SimulationBarProps = {
  turn: number
  currentFaction: PlayableHouseId | null
  phase: 'idle' | 'battle' | 'ending'
  factionColors: Record<PlayableHouseId, string>
  aiInputs?: {
    ownStrength: number
    enemyStrength: number
    regionImportance: number
    resources: number
    aggression: number
  } | null
}

export default function SimulationBar({
  turn,
  currentFaction,
  phase,
  factionColors,
  aiInputs,
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

      {aiInputs ? (
        <>
          <div className="sim-divider" aria-hidden />

          <div className="sim-section sim-ai-group">
            <span className="sim-label sim-ai-title">Fuzzy Inputs</span>
            <div className="sim-ai-grid">
              <span className="sim-ai-pill">Own {Math.round(aiInputs.ownStrength)}</span>
              <span className="sim-ai-pill">Enemy {Math.round(aiInputs.enemyStrength)}</span>
              <span className="sim-ai-pill">Region {Math.round(aiInputs.regionImportance)}</span>
              <span className="sim-ai-pill">Gold Input {Math.round(aiInputs.resources)}</span>
              <span className="sim-ai-pill">Aggro {Math.round(aiInputs.aggression)}</span>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
