import { motion } from 'framer-motion'
import { OverlayEvent } from './mapData'

type MapOverlaysProps = {
  overlays: OverlayEvent[]
}

export function MapOverlays({ overlays }: MapOverlaysProps) {
  return (
    <g className="pointer-events-none">
      {overlays.map((overlay) => {
        if ((overlay.type === 'attack' || overlay.type === 'alliance' || overlay.type === 'dragon') && overlay.to) {
          return (
            <motion.g key={overlay.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
              <path
                d={curvedPath(overlay.from, overlay.to, overlay.type === 'dragon' ? 0.26 : 0.18)}
                fill="none"
                stroke={glowColor(overlay.type)}
                strokeWidth={overlay.type === 'dragon' ? 7.8 : 6.2}
                opacity={0.22}
              />
              <path
                d={curvedPath(overlay.from, overlay.to, overlay.type === 'dragon' ? 0.26 : 0.18)}
                fill="none"
                stroke={lineColor(overlay.type)}
                strokeWidth={overlay.type === 'dragon' ? 3.2 : 2.3}
                strokeDasharray={overlay.type === 'alliance' ? '7 7' : '10 6'}
                markerEnd={`url(#${markerId(overlay.type)})`}
                opacity={0.85}
              />
              <motion.path
                d={curvedPath(overlay.from, overlay.to, overlay.type === 'dragon' ? 0.26 : 0.18)}
                fill="none"
                stroke="rgba(252,237,205,0.46)"
                strokeWidth={1}
                strokeDasharray="2 14"
                opacity={0.45}
                animate={{ strokeDashoffset: [0, -36] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
              />
              {overlay.label ? (
                <text
                  x={(overlay.from[0] + overlay.to[0]) / 2}
                  y={(overlay.from[1] + overlay.to[1]) / 2 - 12}
                  textAnchor="middle"
                  className="fill-[#f1d7ac] text-[12px] tracking-[0.14em] uppercase"
                >
                  {overlay.label}
                </text>
              ) : null}
            </motion.g>
          )
        }

        const [x, y] = overlay.from

        if (overlay.type === 'defend') {
          return (
            <g key={overlay.id} transform={`translate(${x} ${y})`}>
              <circle r={16} fill="rgba(78,111,145,0.26)" />
              <text textAnchor="middle" y={6} className="fill-[#b8d5ef] text-[16px]">🛡</text>
            </g>
          )
        }

        if (overlay.type === 'battle') {
          return (
            <motion.g
              key={overlay.id}
              transform={`translate(${x} ${y})`}
              animate={{ scale: [1, 1.07, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            >
              <circle r={17} fill="rgba(158,70,54,0.26)" />
              <text textAnchor="middle" y={6} className="fill-[#f2b7a5] text-[15px]">⚔</text>
            </motion.g>
          )
        }

        if (overlay.type === 'recruit') {
          return (
            <g key={overlay.id} transform={`translate(${x} ${y})`}>
              <circle r={15} fill="rgba(89,123,80,0.26)" />
              <text textAnchor="middle" y={6} className="fill-[#d3e7ba] text-[14px]">⛑</text>
            </g>
          )
        }

        if (overlay.type === 'burn') {
          return (
            <motion.g
              key={overlay.id}
              transform={`translate(${x} ${y})`}
              animate={{ scale: [1, 1.14, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}
            >
              <circle r={18} fill="rgba(185,83,44,0.3)" />
              <text textAnchor="middle" y={6} className="fill-[#f6bf87] text-[15px]">🔥</text>
            </motion.g>
          )
        }

        if (overlay.type === 'captured') {
          return (
            <motion.g
              key={overlay.id}
              transform={`translate(${x} ${y})`}
              animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.95, 0.55] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
            >
              <circle r={22} fill="rgba(219,177,100,0.2)" stroke="rgba(233,197,130,0.65)" strokeWidth={1.4} />
            </motion.g>
          )
        }

        return null
      })}
    </g>
  )
}

function curvedPath(from: [number, number], to: [number, number], bend: number) {
  const [x1, y1] = from
  const [x2, y2] = to
  const cx = (x1 + x2) / 2
  const cy = (y1 + y2) / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const nx = -dy * bend
  const ny = dx * bend
  return `M ${x1} ${y1} Q ${cx + nx} ${cy + ny} ${x2} ${y2}`
}

function markerId(type: OverlayEvent['type']) {
  if (type === 'alliance') return 'arrow-alliance'
  if (type === 'dragon') return 'arrow-dragon'
  return 'arrow-attack'
}

function lineColor(type: OverlayEvent['type']) {
  if (type === 'alliance') return 'rgba(117,186,225,0.9)'
  if (type === 'dragon') return 'rgba(233,136,85,0.96)'
  return 'rgba(228,111,88,0.9)'
}

function glowColor(type: OverlayEvent['type']) {
  if (type === 'alliance') return 'rgba(117,186,225,0.56)'
  if (type === 'dragon') return 'rgba(233,136,85,0.62)'
  return 'rgba(228,111,88,0.55)'
}
