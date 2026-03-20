'use client'

import { CSSProperties, useState } from 'react'
import ArmyMiniature3D from './ArmyMiniature3D'
import ModelUnit3D from './ModelUnit3D'

type UnitTokenProps = {
  houseKey?: string
  modelSrc?: string
  x: number
  y: number
  army: number
  houseLabel: string
  houseColor: string
  imageSrc?: string
  fallbackGlyph: string
  selected?: boolean
  warning?: boolean
  fortified?: boolean
  onClick?: () => void
}

export default function UnitToken({
  houseKey,
  modelSrc,
  x,
  y,
  army,
  houseLabel,
  houseColor,
  imageSrc,
  fallbackGlyph,
  selected = false,
  warning = false,
  fortified = false,
  onClick,
}: UnitTokenProps) {
  const [imageReady, setImageReady] = useState(Boolean(imageSrc))

  const style = {
    left: `${(x / 1536) * 100}%`,
    top: `${(y / 1024) * 100}%`,
    ['--house-glow' as string]: houseColor,
  } as CSSProperties

  return (
    <button
      type="button"
      className={`unit-token-anchor ${selected ? 'is-selected' : ''} ${warning ? 'is-warning' : ''} ${fortified ? 'is-fortified' : ''}`}
      style={style}
      title={`${houseLabel} • Army ${army}`}
      onClick={onClick}
    >
      <span className="unit-shadow" aria-hidden />
      <span className="unit-pedestal" aria-hidden />
      <span className="unit-glow" aria-hidden />

      <span className="unit-figure" aria-hidden>
        {modelSrc ? (
          <ModelUnit3D modelSrc={modelSrc} houseColor={houseColor} />
        ) : imageReady && imageSrc ? (
          <img
            src={imageSrc}
            alt=""
            className="unit-image"
            onError={() => setImageReady(false)}
            draggable={false}
          />
        ) : (
          <ArmyMiniature3D houseKey={houseKey} houseColor={houseColor} />
        )}
      </span>

      <span className="unit-badge" aria-label={`Army ${army}`}>
        <span aria-hidden>⚔</span> {army}
      </span>
    </button>
  )
}
