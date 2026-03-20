import { useId } from 'react'

type ArmyMiniature3DProps = {
  houseKey?: string
  houseColor: string
}

export default function ArmyMiniature3D({ houseKey = 'neutral', houseColor }: ArmyMiniature3DProps) {
  const uid = useId().replace(/:/g, '')
  const steelId = `steel-${uid}`
  const darkSteelId = `dark-steel-${uid}`
  const tunicId = `tunic-${uid}`
  const leatherId = `leather-${uid}`
  const faceId = `face-${uid}`

  const isStark = houseKey === 'stark'
  const isLannister = houseKey === 'lannister'
  const isTargaryen = houseKey === 'targaryen'
  const isTyrell = houseKey === 'tyrell'

  return (
    <div className="army-miniature" style={{ ['--mini-house' as string]: houseColor }}>
      <svg viewBox="0 0 126 198" className="army-miniature-svg" role="img" aria-label="war-table soldier miniature">
        <defs>
          <linearGradient id={steelId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f3f8fc" />
            <stop offset="38%" stopColor="#9ea8b3" />
            <stop offset="100%" stopColor="#4a5562" />
          </linearGradient>
          <linearGradient id={darkSteelId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#596472" />
            <stop offset="100%" stopColor="#262d36" />
          </linearGradient>
          <linearGradient id={tunicId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--mini-house)" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#1d2530" stopOpacity="0.98" />
          </linearGradient>
          <linearGradient id={leatherId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5e4837" />
            <stop offset="100%" stopColor="#2f241d" />
          </linearGradient>
          <radialGradient id={faceId} cx="50%" cy="46%" r="56%">
            <stop offset="0%" stopColor="#d6b69f" />
            <stop offset="100%" stopColor="#7a5f52" />
          </radialGradient>
        </defs>

        <ellipse cx="63" cy="187" rx="25" ry="7" fill="rgba(5, 6, 8, 0.52)" />

        <path d="M88 116 L106 126 L101 172 L81 174 L78 129 Z" fill={`url(#${steelId})`} opacity="0.58" />
        <path d="M90 121 L101 128 L97 168 L84 168 L82 132 Z" fill={`url(#${darkSteelId})`} opacity="0.7" />

        <path d="M61 138 L99 165 L95 171 L59 145 Z" fill={`url(#${steelId})`} opacity="0.92" />
        <path d="M56 144 L61 138 L64 143 L60 148 Z" fill="#f1f4f8" />

        <path d="M27 114 L40 120 L34 168 L19 164 Z" fill={`url(#${steelId})`} opacity="0.62" />

        <path d="M36 66 L88 66 L95 160 L29 160 Z" fill={`url(#${tunicId})`} />
        <path d="M46 105 L81 105 L80 160 L45 160 Z" fill="rgba(13, 18, 23, 0.28)" />
        <path d="M45 70 L80 70 L75 88 L50 88 Z" fill="rgba(22, 27, 36, 0.4)" />
        <path d="M36 83 L88 83" stroke="rgba(25, 14, 10, 0.56)" strokeWidth="2.4" />

        {isStark ? <path d="M58 100 L63 95 L68 100 L66 106 L60 106 Z" className="miniature-crest" /> : null}
        {isLannister ? <path d="M54 99 C57 93 69 93 72 99 C69 104 57 104 54 99 Z" className="miniature-crest" /> : null}
        {isTargaryen ? <path d="M56 104 C60 95 66 95 70 104 C66 109 60 109 56 104 Z" className="miniature-crest" /> : null}
        {isTyrell ? <circle cx="63" cy="101" r="5" className="miniature-crest" /> : null}

        <ellipse cx="63" cy="37" rx="15" ry="17" fill="rgba(24, 17, 13, 0.24)" />
        <ellipse cx="63" cy="38" rx="13" ry="15" fill={`url(#${faceId})`} />
        <path d="M52 45 C57 51, 69 51, 74 45 L74 56 L52 56 Z" fill="#2a1e1a" opacity="0.88" />

        <path d="M41 48 L86 48 L92 67 L33 67 Z" fill={`url(#${darkSteelId})`} />
        <path d="M45 47 L82 47 L86 62 L40 62 Z" fill={`url(#${steelId})`} opacity="0.88" />

        <path d="M48 37 C52 20, 74 20, 79 37 L74 48 L52 48 Z" fill={`url(#${steelId})`} />
        {isTargaryen ? <path d="M63 16 L71 28 L67 43 L59 43 L55 28 Z" fill={`url(#${steelId})`} /> : null}
        {!isTargaryen ? <rect x="61" y="26" width="4" height="20" fill="#646f7c" /> : null}

        <path d="M34 72 L49 72 L45 121 L29 116 Z" fill={`url(#${darkSteelId})`} />
        <path d="M80 72 L95 82 L91 122 L77 112 Z" fill={`url(#${darkSteelId})`} />

        <path d="M44 67 L82 67" stroke={`url(#${leatherId})`} strokeWidth="2.7" />
        <path d="M52 122 L75 122" stroke={`url(#${leatherId})`} strokeWidth="2.7" />

        <path d="M48 160 L61 160 L59 184 L44 186 Z" fill="rgba(18, 19, 22, 0.88)" />
        <path d="M66 160 L79 160 L82 184 L67 186 Z" fill="rgba(18, 19, 22, 0.88)" />

        {isTyrell ? <path d="M97 138 L106 160" stroke={`url(#${steelId})`} strokeWidth="2.1" /> : null}
        {isLannister ? <path d="M90 131 L105 131" stroke={`url(#${steelId})`} strokeWidth="2" /> : null}

        <path className="miniature-glint" d="M38 56 L47 46 L50 48 L41 60 Z" fill="rgba(255,255,255,0.5)" />
      </svg>
    </div>
  )
}
