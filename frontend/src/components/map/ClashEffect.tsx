type ClashEffectProps = {
  x: number
  y: number
  visible: boolean
}

export default function ClashEffect({ x, y, visible }: ClashEffectProps) {
  if (!visible) return null

  return (
    <div
      className="clash-effect"
      style={{ left: `${(x / 1536) * 100}%`, top: `${(y / 1024) * 100}%` }}
      aria-hidden
    >
      <span className="clash-pulse" />
      <span className="clash-flash" />
      <span className="clash-blades" />
      <span className="clash-ember e1" />
      <span className="clash-ember e2" />
      <span className="clash-ember e3" />
      <span className="clash-smoke" />
      <span className="clash-ripple" />
    </div>
  )
}
