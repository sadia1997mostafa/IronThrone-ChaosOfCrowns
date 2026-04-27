import type { CSSProperties } from 'react'
import type { HouseId } from '@/data/regionData'

type RegionBannerTokenProps = {
  x: number
  y: number
  houseId: HouseId
  houseColor: string
  houseLabel: string
  bannerSrc: string
  previousBannerSrc?: string
  isChanging: boolean
}

const MAP_WIDTH = 1536
const MAP_HEIGHT = 1024

export default function RegionBannerToken({
  x,
  y,
  houseId,
  houseColor,
  houseLabel,
  bannerSrc,
  previousBannerSrc,
  isChanging,
}: RegionBannerTokenProps) {
  const bannerOffsetPx = y < 240 ? 74 : y < 320 ? 84 : 96

  const style = {
    left: `${(x / MAP_WIDTH) * 100}%`,
    top: `${(y / MAP_HEIGHT) * 100}%`,
    ['--banner-color' as string]: houseColor,
    ['--banner-offset-px' as string]: `${bannerOffsetPx}px`,
  } as CSSProperties

  return (
    <div className={`region-banner-anchor is-${houseId} ${isChanging ? 'is-changing' : ''}`} style={style} aria-hidden>
      <span className="region-banner-glow" />
      <span className="region-banner-pole" />
      <span className="region-banner-finial" />
      <div className="region-banner-cloth">
        {isChanging && previousBannerSrc ? (
          <img
            src={previousBannerSrc}
            alt=""
            className="region-banner-face region-banner-face-prev"
            draggable={false}
          />
        ) : null}
        <img
          src={bannerSrc}
          alt=""
          className="region-banner-face region-banner-face-current"
          draggable={false}
        />
        <span className="region-banner-fabric-depth" />
        <span className="region-banner-fabric-sheen" />
      </div>
      <span className="region-banner-base-shadow" />
      <span className="region-banner-label">{houseLabel.replace('House ', '')}</span>
    </div>
  )
}
