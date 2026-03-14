import { OWNER_META, Territory } from './mapData'

type TerritoryTooltipProps = {
  territory: Territory | null
}

export function TerritoryTooltip({ territory }: TerritoryTooltipProps) {
  if (!territory) {
    return (
      <aside className="h-full rounded-xl border border-amber-800/45 bg-[linear-gradient(180deg,rgba(55,37,23,0.93),rgba(28,18,12,0.95))] p-5 text-[#d7bd94] shadow-[inset_0_0_0_1px_rgba(235,199,141,0.08),inset_0_-18px_26px_rgba(0,0,0,0.24)]">
        <div className="pointer-events-none mb-3 flex items-center justify-between text-[#cfae79]">
          <span>✦</span>
          <span className="h-px w-24 bg-amber-700/45" />
          <span>✦</span>
        </div>
        <h3 className="font-semibold uppercase tracking-[0.18em] text-[#f1d6aa]">Territory Briefing</h3>
        <p className="mt-4 text-sm leading-relaxed text-[#c5a882]">
          Select a territory on the map to inspect military strength, morale, defenses, resources, and active events.
        </p>
      </aside>
    )
  }

  const owner = OWNER_META[territory.owner]

  return (
    <aside className="relative h-full overflow-hidden rounded-xl border border-amber-800/45 bg-[linear-gradient(180deg,rgba(55,37,23,0.94),rgba(28,18,12,0.96))] p-5 text-[#e7cfab] shadow-[inset_0_0_0_1px_rgba(235,199,141,0.08),inset_0_-20px_30px_rgba(0,0,0,0.24),0_14px_28px_rgba(0,0,0,0.3)]">
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(14deg,rgba(255,255,255,0.014)_0,rgba(255,255,255,0.014)_1px,transparent_1px,transparent_10px)] opacity-40" />
      <div className="relative z-10">
        <div className="mb-3 flex items-center justify-between text-[#cfae79]">
          <span>✦</span>
          <span className="h-px w-24 bg-amber-700/45" />
          <span>✦</span>
        </div>
      <p className="text-[11px] uppercase tracking-[0.24em] text-[#d8b680]">Territory Briefing</p>
      <h3 className="mt-2 text-2xl uppercase tracking-[0.1em] text-[#f3d9ad] drop-shadow-[0_1px_8px_rgba(245,208,148,0.2)]">{territory.name}</h3>
      <p className="mt-1 text-sm uppercase tracking-[0.15em]" style={{ color: owner.stroke }}>
        {owner.label}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <StatCell label="Army" value={territory.army.toLocaleString()} />
        <StatCell label="Morale" value={`${territory.morale}%`} />
        <StatCell label="Defense" value={`${territory.defense}%`} />
        <StatCell label="Resources" value={`${territory.resourceValue}/100`} />
      </div>

      <div className="mt-5 rounded-lg border border-amber-900/45 bg-[rgba(20,13,9,0.5)] p-3 shadow-[inset_0_0_0_1px_rgba(236,197,136,0.05)]">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#d7b783]">Recent Event</p>
        <p className="mt-2 text-sm leading-relaxed text-[#e6cc9f]">{territory.recentEvent || 'No major incidents reported this turn.'}</p>
      </div>

      <div className="mt-5 rounded-lg border border-amber-900/45 bg-[rgba(20,13,9,0.5)] p-3 shadow-[inset_0_0_0_1px_rgba(236,197,136,0.05)]">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#d7b783]">Neighboring Territories</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {territory.neighbors.map((neighbor) => (
            <span
              key={neighbor}
              className="rounded border border-amber-800/45 bg-[rgba(98,63,35,0.34)] px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-[#ecd2a4]"
            >
              {neighbor.replace('-', ' ')}
            </span>
          ))}
        </div>
      </div>
      </div>
    </aside>
  )
}

type StatCellProps = {
  label: string
  value: string
}

function StatCell({ label, value }: StatCellProps) {
  return (
    <div className="rounded-lg border border-amber-900/45 bg-[linear-gradient(180deg,rgba(34,22,14,0.62),rgba(18,12,8,0.56))] p-3 shadow-[inset_0_0_0_1px_rgba(236,197,136,0.05)]">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[#d7b783]">{label}</p>
      <p className="mt-1 text-base font-semibold tracking-[0.04em] text-[#f2d9ad]">{value}</p>
    </div>
  )
}
