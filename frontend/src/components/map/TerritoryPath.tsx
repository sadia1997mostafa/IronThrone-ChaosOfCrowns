import { motion } from 'framer-motion'
import { OWNER_META, Territory } from './mapData'

type TerritoryPathProps = {
  territory: Territory
  isSelected: boolean
  isHovered: boolean
  onHover: (id: string | null) => void
  onSelect: (id: string) => void
}

export function TerritoryPath({ territory, isSelected, isHovered, onHover, onSelect }: TerritoryPathProps) {
  const meta = OWNER_META[territory.owner]

  return (
    <g
      className="cursor-pointer"
      onMouseEnter={() => onHover(territory.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(territory.id)}
      onBlur={() => onHover(null)}
      onClick={() => onSelect(territory.id)}
      role="button"
      aria-label={`Select ${territory.name}`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect(territory.id)
        }
      }}
    >
      <motion.path
        d={territory.path}
        fill={`url(#owner-${territory.owner})`}
        stroke={isSelected || isHovered ? meta.stroke : 'rgba(38, 25, 16, 0.82)'}
        strokeWidth={isSelected ? 3.4 : isHovered ? 2.8 : 2.2}
        className="transition-all duration-500"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        animate={{
          filter: isSelected
            ? `drop-shadow(0 0 14px ${meta.glow})`
            : isHovered
              ? `drop-shadow(0 0 10px ${meta.glow})`
              : 'drop-shadow(0 2px 4px rgba(0,0,0,0.24))',
          scale: isSelected ? 1.013 : isHovered ? 1.008 : 1,
        }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      />

      <path
        d={territory.path}
        fill="none"
        stroke="rgba(27,16,10,0.45)"
        strokeWidth={3.2}
        className="pointer-events-none"
      />

      <path
        d={territory.path}
        fill="none"
        stroke="rgba(248,219,165,0.16)"
        strokeWidth={1.4}
        className="pointer-events-none"
      />

      <path
        d={territory.path}
        fill="none"
        stroke={isSelected ? 'rgba(250,226,174,0.82)' : 'rgba(255,229,178,0.22)'}
        strokeWidth={isSelected ? 1.8 : 1.1}
        strokeDasharray={isSelected ? '3 4' : '2 5'}
        className="pointer-events-none"
      />

      <path
        d={territory.path}
        fill="url(#territoryGrain)"
        opacity={0.45}
        className="pointer-events-none"
      />

      {territory.x && territory.y ? (
        <>
          <text
            x={territory.x + 1}
            y={territory.y + 1}
            className="pointer-events-none select-none fill-[rgba(18,12,8,0.35)] text-[20px] font-semibold tracking-[0.11em]"
            textAnchor="middle"
          >
            {territory.name.toUpperCase()}
          </text>
          <text
            x={territory.x}
            y={territory.y}
            className="pointer-events-none select-none fill-[#2f2014] text-[20px] font-semibold tracking-[0.11em]"
            textAnchor="middle"
          >
            {territory.name.toUpperCase()}
          </text>

          <text
            x={territory.x}
            y={territory.y + 30}
            className="pointer-events-none select-none fill-[rgba(47,32,20,0.45)] text-[16px] tracking-[0.16em]"
            textAnchor="middle"
          >
            {territory.sigil?.toUpperCase()}
          </text>

          <g className="pointer-events-none" transform={`translate(${territory.x + 94} ${territory.y - 18})`}>
            <ellipse cx="1" cy="1" rx={34} ry={14.5} fill="rgba(0,0,0,0.3)" />
            <rect
              x={-32}
              y={-14}
              width={66}
              height={25}
              rx={12.5}
              fill="url(#armyBadgeShell)"
              stroke="rgba(241,202,143,0.45)"
              strokeWidth={1.2}
            />
            <text x={1} y={-1} textAnchor="middle" className="fill-[#f0d3a6] text-[8px] tracking-[0.16em] uppercase">
              Levy
            </text>
            <text x={1} y={8} textAnchor="middle" className="fill-[#efcd9b] text-[12px] tracking-[0.06em] font-semibold">
              {territory.army.toLocaleString()}
            </text>
          </g>

          {isSelected ? (
            <g className="pointer-events-none" transform={`translate(${territory.x} ${territory.y})`}>
              <circle r={42} fill="none" stroke={meta.glow} strokeWidth={1.4} strokeDasharray="4 6" opacity={0.8} />
              <circle r={48} fill="none" stroke="rgba(248,225,184,0.25)" strokeWidth={1.1} strokeDasharray="2 8" opacity={0.72} />
            </g>
          ) : null}
        </>
      ) : null}

      {territory.isCapital && territory.x && territory.y ? (
        <g className="pointer-events-none" transform={`translate(${territory.x - 92} ${territory.y - 10})`}>
          <ellipse cy="7" rx="9.8" ry="3.2" fill="rgba(0,0,0,0.34)" />
          <ellipse cy="3.6" rx="7.4" ry="3" fill="url(#markerPedestal)" stroke="rgba(58,37,20,0.82)" strokeWidth={0.9} />
          <circle r={8.8} fill="url(#metalGold)" stroke="rgba(55,34,18,0.9)" strokeWidth={1.3} />
          <path d="M-4 4.6 L0 -6 L4 4.6 Z" fill="rgba(52,34,18,0.92)" stroke="rgba(17,11,7,0.9)" strokeWidth={0.6} />
        </g>
      ) : null}
    </g>
  )
}
