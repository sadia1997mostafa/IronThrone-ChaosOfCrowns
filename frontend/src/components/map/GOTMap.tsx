'use client'

import { useMemo, useState } from 'react'
import { mapPaths, type RegionId } from '@/assets/mapPaths'
import { regionData } from '@/data/regionData'

const VIEW_BOX = '0 0 1536 1024'
const regionOrder: RegionId[] = [
  'north',
  'vale',
  'riverlands',
  'westerlands',
  'reach',
  'stormlands',
  'dorne',
  'iron_islands',
  'essos',
  'braavos',
]

export default function GOTMap() {
  const [selectedRegion, setSelectedRegion] = useState<RegionId | null>(null)

  const availableRegions = useMemo(
    () => regionOrder.filter((regionId) => mapPaths[regionId].trim().length > 0),
    []
  )

  return (
    <div className="map-page">
      <div className="map-container">
        <img
          src="/images/map/got-map-final.png"
          alt="Game of Thrones map"
          className="map-image"
          draggable={false}
        />

        <svg className="map-overlay" viewBox={VIEW_BOX} preserveAspectRatio="none" role="img" aria-label="Interactive map regions">
          {availableRegions.map((regionId) => (
            <path
              key={regionId}
              d={mapPaths[regionId]}
              className={`region ${selectedRegion === regionId ? 'active' : ''}`}
              onClick={() => setSelectedRegion(regionId)}
            />
          ))}
        </svg>
      </div>

      <aside className="region-panel" aria-live="polite">
        {selectedRegion ? (
          <>
            <h2>{regionData[selectedRegion].name}</h2>
            <p>
              <strong>House:</strong> {regionData[selectedRegion].house}
            </p>
            <p>
              <strong>Army:</strong> {regionData[selectedRegion].army}
            </p>
            <p>
              <strong>Resources:</strong> {regionData[selectedRegion].resources.join(', ')}
            </p>
            <p>{regionData[selectedRegion].description}</p>
          </>
        ) : (
          <>
            <h2>Region Intel</h2>
            <p>Select a region on the map to open strategic details.</p>
            {availableRegions.length === 0 && (
              <p>
                No region paths loaded yet. Paste path d values into <strong>src/assets/mapPaths.ts</strong>.
              </p>
            )}
          </>
        )}
      </aside>
    </div>
  )
}
