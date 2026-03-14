'use client'

import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { MapOverlays } from './MapOverlays'
import { OWNER_META, OVERLAY_EVENTS, RIVERS, TERRAIN_MARKERS, TERRITORIES, Territory } from './mapData'
import { TerritoryPath } from './TerritoryPath'
import { TerritoryTooltip } from './TerritoryTooltip'

export function RealmMap() {
  const [selectedId, setSelectedId] = useState<string>('north')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const dustParticles = useMemo(
    () => [
      { left: '8%', top: '18%', size: 3, delay: 0.1, duration: 7.4 },
      { left: '14%', top: '42%', size: 2, delay: 1.5, duration: 8.2 },
      { left: '22%', top: '26%', size: 2, delay: 2.1, duration: 6.8 },
      { left: '32%', top: '12%', size: 3, delay: 0.8, duration: 9.4 },
      { left: '38%', top: '48%', size: 2, delay: 1.9, duration: 7.6 },
      { left: '51%', top: '20%', size: 3, delay: 2.8, duration: 8.6 },
      { left: '57%', top: '64%', size: 2, delay: 1.2, duration: 9.1 },
      { left: '68%', top: '34%', size: 2, delay: 0.4, duration: 7.2 },
      { left: '74%', top: '18%', size: 3, delay: 2.3, duration: 8.9 },
      { left: '81%', top: '46%', size: 2, delay: 1.1, duration: 7.7 },
      { left: '88%', top: '28%', size: 2, delay: 2.9, duration: 8.4 },
      { left: '92%', top: '62%', size: 3, delay: 1.6, duration: 9.7 },
    ],
    []
  )

  const selectedTerritory = useMemo<Territory | null>(
    () => TERRITORIES.find((territory) => territory.id === selectedId) || null,
    [selectedId]
  )

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#040302] text-[#f0d9ae]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_700px_at_12%_-10%,rgba(196,122,42,0.26),transparent_58%),radial-gradient(900px_600px_at_90%_15%,rgba(255,182,91,0.18),transparent_56%),radial-gradient(900px_700px_at_18%_86%,rgba(90,56,31,0.42),transparent_62%),radial-gradient(1100px_900px_at_60%_120%,rgba(64,41,25,0.62),transparent_65%),linear-gradient(145deg,#040303_0%,#0f0a07_45%,#070505_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(12deg,rgba(255,255,255,0.014)_0,rgba(255,255,255,0.014)_1px,transparent_1px,transparent_12px)] opacity-50" />

      <div className="pointer-events-none absolute left-6 top-6 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,185,100,0.4)_0%,rgba(255,185,100,0.05)_64%,transparent_72%)] blur-2xl" />
      <div className="pointer-events-none absolute right-8 top-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,204,132,0.38)_0%,rgba(255,204,132,0.06)_62%,transparent_74%)] blur-2xl" />
      <div className="pointer-events-none absolute bottom-12 left-1/3 h-36 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(120,74,40,0.32)_0%,rgba(120,74,40,0.04)_66%,transparent_74%)] blur-2xl" />

      {dustParticles.map((particle, index) => (
        <motion.span
          key={`dust-${index}`}
          className="pointer-events-none absolute rounded-full bg-[rgba(253,224,169,0.45)]"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          animate={{ y: [0, -14, 0], opacity: [0.12, 0.55, 0.12] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <motion.div
        className="pointer-events-none absolute left-1/2 top-[22%] h-72 w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,198,114,0.17)_0%,rgba(255,198,114,0.02)_60%,transparent_74%)] blur-3xl"
        animate={{ opacity: [0.22, 0.34, 0.22], scale: [0.98, 1.03, 0.98] }}
        transition={{ duration: 8.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 grid h-full grid-cols-[minmax(0,1fr)_360px] gap-4 p-4">
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-amber-900/55 bg-[linear-gradient(180deg,rgba(55,35,21,0.76),rgba(18,11,8,0.9))] shadow-[inset_0_0_0_1px_rgba(235,199,141,0.1),inset_0_-26px_38px_rgba(0,0,0,0.28),0_30px_70px_rgba(0,0,0,0.52)]"
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(18deg,rgba(255,255,255,0.018)_0,rgba(255,255,255,0.018)_1px,transparent_1px,transparent_11px)] opacity-60" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,206,132,0.08),transparent)]" />

          <header className="relative z-20 flex items-center justify-between border-b border-amber-900/45 px-5 py-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#dbbb8b]">Royal Strategy Atlas</p>
              <h1 className="mt-1 text-2xl uppercase tracking-[0.1em] text-[#f3d9ac] drop-shadow-[0_1px_8px_rgba(245,208,148,0.18)]">Realm Simulation War Table</h1>
            </div>
            <div className="flex gap-2 text-[10px] uppercase tracking-[0.14em]">
              <span className="rounded border border-amber-700/45 bg-amber-900/20 px-2 py-1">Turn 07</span>
              <span className="rounded border border-amber-700/45 bg-amber-900/20 px-2 py-1">AI Sync Active</span>
              <span className="rounded border border-amber-700/45 bg-amber-900/20 px-2 py-1">War Fog: Low</span>
            </div>
          </header>

          <div className="relative h-[calc(100%-73px)] p-4">
            <svg viewBox="0 0 1000 780" className="h-full w-full" role="img" aria-label="Fantasy war table map">
              <defs>
                <linearGradient id="parchmentLand" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#c8a26e" />
                  <stop offset="44%" stopColor="#a87849" />
                  <stop offset="78%" stopColor="#8a5d39" />
                  <stop offset="100%" stopColor="#6f482c" />
                </linearGradient>

                <linearGradient id="parchmentWarmGlow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(255,205,128,0.22)" />
                  <stop offset="48%" stopColor="rgba(255,205,128,0.04)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.16)" />
                </linearGradient>

                <linearGradient id="seaDepth" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#223344" />
                  <stop offset="40%" stopColor="#162430" />
                  <stop offset="100%" stopColor="#070f16" />
                </linearGradient>

                <linearGradient id="seaShine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(214,234,246,0.16)" />
                  <stop offset="60%" stopColor="rgba(214,234,246,0.02)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
                </linearGradient>

                <radialGradient id="paperVignette" cx="50%" cy="52%" r="72%">
                  <stop offset="0%" stopColor="rgba(0,0,0,0)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.36)" />
                </radialGradient>

                <radialGradient id="metalGold" cx="28%" cy="24%" r="72%">
                  <stop offset="0%" stopColor="#f4d290" />
                  <stop offset="55%" stopColor="#b67d3a" />
                  <stop offset="100%" stopColor="#704420" />
                </radialGradient>

                <linearGradient id="armyBadgeShell" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(66,46,29,0.94)" />
                  <stop offset="100%" stopColor="rgba(27,18,12,0.95)" />
                </linearGradient>

                <radialGradient id="markerPedestal" cx="35%" cy="30%" r="75%">
                  <stop offset="0%" stopColor="#8a5f3b" />
                  <stop offset="100%" stopColor="#3d2618" />
                </radialGradient>

                <pattern id="territoryGrain" width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(11)">
                  <rect width="36" height="36" fill="rgba(0,0,0,0)" />
                  <path d="M0 18 H36" stroke="rgba(39,25,15,0.16)" strokeWidth="1" />
                  <path d="M0 6 H36" stroke="rgba(247,214,160,0.08)" strokeWidth="1" />
                </pattern>

                <pattern id="seaRings" width="64" height="64" patternUnits="userSpaceOnUse" patternTransform="rotate(16)">
                  <path d="M6 32 C18 20, 46 20, 58 32" fill="none" stroke="rgba(172,205,229,0.11)" strokeWidth="1.1" />
                  <path d="M0 40 C14 28, 50 28, 64 40" fill="none" stroke="rgba(172,205,229,0.07)" strokeWidth="0.9" />
                </pattern>

                <pattern id="parchmentStains" width="160" height="160" patternUnits="userSpaceOnUse">
                  <circle cx="36" cy="28" r="26" fill="rgba(79,52,29,0.1)" />
                  <circle cx="126" cy="88" r="18" fill="rgba(63,42,24,0.12)" />
                  <ellipse cx="86" cy="132" rx="34" ry="20" fill="rgba(97,66,40,0.08)" />
                </pattern>

                <pattern id="parchmentFibers" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
                  <path d="M0 24 H80" stroke="rgba(48,31,18,0.08)" strokeWidth="1" />
                  <path d="M0 46 H80" stroke="rgba(236,199,139,0.06)" strokeWidth="1" />
                  <path d="M0 68 H80" stroke="rgba(48,31,18,0.06)" strokeWidth="1" />
                </pattern>

                <filter id="sheetInnerShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feOffset dx="0" dy="2" />
                  <feGaussianBlur stdDeviation="3" result="offset-blur" />
                  <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                  <feFlood floodColor="rgba(34,22,14,0.45)" result="color" />
                  <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                  <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                </filter>

                <filter id="mapSheetShadow" x="-20%" y="-20%" width="140%" height="160%">
                  <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="rgba(0,0,0,0.5)" />
                </filter>

                <filter id="parchmentNoise" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
                  <feColorMatrix type="saturate" values="0" />
                  <feComponentTransfer>
                    <feFuncA type="table" tableValues="0 0.1" />
                  </feComponentTransfer>
                </filter>

                <filter id="territorySoftGlow" x="-25%" y="-25%" width="150%" height="150%">
                  <feGaussianBlur stdDeviation="3.4" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <marker id="arrow-attack" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse">
                  <path d="M0 0 L8 4 L0 8 Z" fill="rgba(228,111,88,0.95)" />
                </marker>

                <marker id="arrow-alliance" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse">
                  <path d="M0 0 L8 4 L0 8 Z" fill="rgba(117,186,225,0.95)" />
                </marker>

                <marker id="arrow-dragon" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse">
                  <path d="M0 0 L8 4 L0 8 Z" fill="rgba(233,136,85,0.95)" />
                </marker>

                <linearGradient id="owner-stark" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(132,150,168,0.62)" />
                  <stop offset="100%" stopColor="rgba(84,102,122,0.72)" />
                </linearGradient>
                <linearGradient id="owner-lannister" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(170,118,63,0.68)" />
                  <stop offset="100%" stopColor="rgba(118,70,39,0.75)" />
                </linearGradient>
                <linearGradient id="owner-targaryen" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(141,58,48,0.72)" />
                  <stop offset="100%" stopColor="rgba(92,34,30,0.8)" />
                </linearGradient>
                <linearGradient id="owner-tyrell" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(96,126,76,0.7)" />
                  <stop offset="100%" stopColor="rgba(61,86,50,0.77)" />
                </linearGradient>
                <linearGradient id="owner-neutral" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(139,113,78,0.58)" />
                  <stop offset="100%" stopColor="rgba(103,81,56,0.7)" />
                </linearGradient>
              </defs>

              <g transform="translate(40 20)">
                <path
                  d="M16 40 C30 20 70 14 108 18 L842 24 C876 30 894 46 892 82 L884 670 C880 706 858 724 822 726 L84 720 C50 716 24 694 22 660 L14 86 C14 66 8 52 16 40 Z"
                  fill="url(#seaDepth)"
                  filter="url(#mapSheetShadow)"
                />

                <rect x="28" y="32" width="840" height="684" rx="28" fill="url(#seaRings)" opacity="0.66" />
                <rect x="28" y="32" width="840" height="684" rx="28" fill="url(#seaShine)" opacity="0.4" />

                <path
                  d="M54 58 C72 44 100 40 130 42 L816 46 C844 50 858 66 856 92 L848 648 C844 676 826 692 798 694 L108 690 C76 688 54 668 50 640 L44 98 C44 80 42 68 54 58 Z"
                  fill="url(#parchmentLand)"
                  stroke="rgba(95,64,37,0.9)"
                  strokeWidth="2.4"
                  filter="url(#sheetInnerShadow)"
                />

                <path
                  d="M54 58 C72 44 100 40 130 42 L816 46 C844 50 858 66 856 92 L848 648 C844 676 826 692 798 694 L108 690 C76 688 54 668 50 640 L44 98 C44 80 42 68 54 58 Z"
                  fill="url(#parchmentWarmGlow)"
                  opacity="0.5"
                />

                <path
                  d="M54 58 C72 44 100 40 130 42 L816 46 C844 50 858 66 856 92 L848 648 C844 676 826 692 798 694 L108 690 C76 688 54 668 50 640 L44 98 C44 80 42 68 54 58 Z"
                  fill="url(#parchmentStains)"
                  opacity="0.5"
                />

                <path
                  d="M54 58 C72 44 100 40 130 42 L816 46 C844 50 858 66 856 92 L848 648 C844 676 826 692 798 694 L108 690 C76 688 54 668 50 640 L44 98 C44 80 42 68 54 58 Z"
                  fill="url(#parchmentFibers)"
                  opacity="0.42"
                />

                <path
                  d="M54 58 C72 44 100 40 130 42 L816 46 C844 50 858 66 856 92 L848 648 C844 676 826 692 798 694 L108 690 C76 688 54 668 50 640 L44 98 C44 80 42 68 54 58 Z"
                  fill="rgba(50,32,19,0.2)"
                  filter="url(#parchmentNoise)"
                />

                <rect x="42" y="30" width="852" height="686" rx="32" fill="url(#paperVignette)" />

                {RIVERS.map((river) => (
                  <path
                    key={river.id}
                    d={river.d}
                    fill="none"
                    stroke="rgba(96,140,172,0.88)"
                    strokeWidth={3.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="pointer-events-none"
                  />
                ))}

                {TERRAIN_MARKERS.map((marker) => {
                  if (marker.kind === 'mountain') {
                    return (
                      <g key={marker.id} transform={`translate(${marker.x} ${marker.y}) scale(${marker.scale || 1})`} className="pointer-events-none">
                        <path d="M-10 10 L0 -12 L10 10 Z" fill="rgba(80,58,37,0.48)" stroke="rgba(52,36,22,0.66)" strokeWidth={1.2} />
                        <path d="M-4 2 L0 -5 L4 2" fill="none" stroke="rgba(221,189,139,0.26)" strokeWidth={1} />
                        <path d="M-8 9 L0 -8 L8 9" fill="none" stroke="rgba(31,20,12,0.38)" strokeWidth={0.9} />
                      </g>
                    )
                  }

                  if (marker.kind === 'forest') {
                    return (
                      <g key={marker.id} transform={`translate(${marker.x} ${marker.y}) scale(${marker.scale || 1})`} className="pointer-events-none">
                        <ellipse cy="8" rx="7" ry="2.6" fill="rgba(0,0,0,0.2)" />
                        <path d="M0 -10 L7 2 H-7 Z" fill="rgba(60,83,48,0.56)" />
                        <path d="M0 -3 L6 8 H-6 Z" fill="rgba(53,74,42,0.58)" />
                        <path d="M0 8 L0 12" stroke="rgba(58,39,26,0.6)" strokeWidth={1.1} />
                      </g>
                    )
                  }

                  return (
                    <g key={marker.id} transform={`translate(${marker.x} ${marker.y}) scale(${marker.scale || 1})`} className="pointer-events-none">
                      <ellipse cy="8" rx="8.6" ry="3.1" fill="rgba(0,0,0,0.3)" />
                      <ellipse cy="4.2" rx="6.7" ry="2.8" fill="url(#markerPedestal)" stroke="rgba(58,37,20,0.84)" strokeWidth={0.9} />
                      <circle r={7.7} fill="url(#metalGold)" stroke="rgba(58,37,20,0.94)" strokeWidth={1.15} />
                      <path d="M-3.5 4 L0 -5 L3.5 4 Z" fill="rgba(49,31,17,0.92)" />
                    </g>
                  )
                })}

                {TERRITORIES.map((territory) => (
                  <TerritoryPath
                    key={territory.id}
                    territory={territory}
                    isSelected={selectedId === territory.id}
                    isHovered={hoveredId === territory.id}
                    onHover={setHoveredId}
                    onSelect={setSelectedId}
                  />
                ))}

                <MapOverlays overlays={OVERLAY_EVENTS} />

                <path
                  d="M58 64 C68 56 86 52 104 54 L812 58 C834 62 846 74 844 96 L838 642 C834 662 820 676 800 678 L112 674 C90 672 74 658 70 638 L64 106 C64 88 58 78 58 64 Z"
                  fill="none"
                  stroke="rgba(228,186,126,0.24)"
                  strokeWidth={2}
                  className="pointer-events-none"
                />

                <g className="pointer-events-none" opacity="0.75">
                  <path d="M78 70 L124 70 L106 88" fill="none" stroke="rgba(226,185,124,0.42)" strokeWidth="1.5" />
                  <path d="M818 70 L772 70 L790 88" fill="none" stroke="rgba(226,185,124,0.42)" strokeWidth="1.5" />
                  <path d="M76 650 L120 650 L102 632" fill="none" stroke="rgba(226,185,124,0.42)" strokeWidth="1.5" />
                  <path d="M820 650 L776 650 L794 632" fill="none" stroke="rgba(226,185,124,0.42)" strokeWidth="1.5" />
                </g>
              </g>
            </svg>

            <div className="pointer-events-none absolute inset-0 rounded-xl border border-amber-700/30" />
          </div>
        </motion.article>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="grid h-full grid-rows-[1fr_auto] gap-4"
        >
          <TerritoryTooltip territory={selectedTerritory} />

          <div className="rounded-xl border border-amber-800/45 bg-[linear-gradient(180deg,rgba(52,34,21,0.92),rgba(27,17,11,0.95))] p-4 shadow-[inset_0_0_0_1px_rgba(235,199,141,0.08)]">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#d7b783]">Noble Houses</p>
            <div className="mt-3 grid grid-cols-1 gap-2 text-xs uppercase tracking-[0.14em]">
              {Object.entries(OWNER_META).map(([owner, meta]) => (
                <div key={owner} className="flex items-center justify-between rounded border border-amber-900/45 bg-[rgba(20,13,9,0.45)] px-3 py-2">
                  <span className="text-[#e7cc9f]">{meta.label}</span>
                  <span className="h-3 w-7 rounded-sm" style={{ background: meta.tint, border: `1px solid ${meta.stroke}` }} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
