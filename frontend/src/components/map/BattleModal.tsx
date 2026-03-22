import type { RegionId } from '@/assets/mapPaths'

type BattleSide = {
  id: RegionId
  name: string
  houseLabel: string
  houseColor: string
  army: number
  imageSrc?: string
  glyph: string
}

type BattleModalProps = {
  open: boolean
  location: string
  attacker: BattleSide
  defender: BattleSide
  defenderDefense: number
  winChance: number
  resolving: boolean
  resultText: string | null
  onResolve: () => void
  onClose: () => void
}

export default function BattleModal({
  open,
  location,
  attacker,
  defender,
  defenderDefense,
  winChance,
  resolving,
  resultText,
  onResolve,
  onClose,
}: BattleModalProps) {
  if (!open) return null

  return (
    <div className="battle-modal-backdrop" role="dialog" aria-modal="true" aria-label="Battle Resolution">
      <div className="battle-modal-shell">
        <p className="battle-modal-eyebrow">Engagement Report • {location}</p>
        <div className="battle-modal-grid">
          <BattleCard side="Attacker" data={attacker} />
          <BattleCard side="Defender" data={defender} />
        </div>

        <div className="battle-metrics">
          <span>Attack Strength {attacker.army}</span>
          <span>Defense Strength {defender.army}</span>
          <span>Defense Rating {defenderDefense}</span>
          <span>Victory Probability {Math.round(winChance * 100)}%</span>
        </div>

        {resultText ? <p className="battle-result-banner">{resultText}</p> : null}

        <div className="battle-modal-actions">
          <button type="button" className="battle-btn battle-btn-primary" onClick={onResolve} disabled={resolving || Boolean(resultText)}>
            {resolving ? 'Resolving engagement...' : 'Commit Assault'}
          </button>
          <button type="button" className="battle-btn" onClick={onClose} disabled={resolving}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  )
}

function BattleCard({ side, data }: { side: string; data: BattleSide }) {
  return (
    <article className="battle-side-card" style={{ ['--side-color' as string]: data.houseColor }}>
      <p className="battle-side-label">{side}</p>
      <p className="battle-side-house">{data.houseLabel}</p>
      <div className="battle-side-avatar" aria-hidden>
        {data.imageSrc ? <img src={data.imageSrc} alt="" draggable={false} /> : <span className="battle-avatar-fallback">UNIT</span>}
      </div>
      <p className="battle-side-region">{data.name}</p>
      <p className="battle-side-army">FORCE {data.army}</p>
    </article>
  )
}
