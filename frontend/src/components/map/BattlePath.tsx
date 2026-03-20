type BattlePathProps = {
  from: { x: number; y: number }
  to: { x: number; y: number }
  visible: boolean
}

export default function BattlePath({ from, to, visible }: BattlePathProps) {
  if (!visible) return null

  const cx = (from.x + to.x) / 2
  const cy = (from.y + to.y) / 2 - 56
  const pathD = `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`

  return (
    <svg className="battle-path-layer" viewBox="0 0 1536 1024" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="battle-lane-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4a5460" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#c88a62" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7d2d29" stopOpacity="0.16" />
        </linearGradient>
        <radialGradient id="battle-impact-core" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#f9dfb5" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#d06245" stopOpacity="0" />
        </radialGradient>
        <marker id="battle-duel-head" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto">
          <path d="M1 1 L9 5 L1 9 Z" fill="#bf5f4a" fillOpacity="0.84" />
        </marker>
      </defs>

      <path d={pathD} className="battle-rush-lane" />
      <path d={pathD} className="battle-rush-lane-core" />

      <g className="battle-rush-duel">
        <path d={pathD} className="battle-rush-scout" markerEnd="url(#battle-duel-head)">
          <animate attributeName="stroke-dashoffset" from="0" to="-56" dur="1.1s" repeatCount="indefinite" />
        </path>
        <path d={pathD} className="battle-rush-scout reverse" markerEnd="url(#battle-duel-head)">
          <animate attributeName="stroke-dashoffset" from="0" to="56" dur="1.1s" repeatCount="indefinite" />
        </path>
      </g>

      <g className="battle-mini-clash" transform={`translate(${to.x}, ${to.y})`}>
        <circle r="30" className="battle-mini-shock" fill="url(#battle-impact-core)" />
        <g className="battle-mini-blades">
          <path d="M -8 -14 L -2 -2 L -6 18 L -12 16 L -10 -2 Z" />
          <path d="M 8 -14 L 2 -2 L 6 18 L 12 16 L 10 -2 Z" />
          <path d="M -11 17 L -5 17" />
          <path d="M 5 17 L 11 17" />
        </g>
      </g>

      <path d="M -7 -4 L 7 0 L -7 4 Z" className="battle-march-marker">
        <animateMotion dur="1.25s" repeatCount="indefinite" path={pathD} />
      </path>

      <circle className="battle-rush-pulse" r="3.5">
        <animateMotion dur="0.95s" repeatCount="indefinite" path={pathD} />
      </circle>
      <circle className="battle-rush-pulse delayed" r="3.5">
        <animateMotion dur="0.95s" begin="0.45s" repeatCount="indefinite" path={pathD} />
      </circle>
    </svg>
  )
}
