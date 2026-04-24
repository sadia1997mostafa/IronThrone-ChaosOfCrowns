'use client'

import { Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, useGLTF } from '@react-three/drei'
import { Box3, Vector3, type Group } from 'three'

type VictoryCelebrationModalProps = {
  open: boolean
  winnerLabel: string
  winnerColor: string
  onClose: () => void
}

function CrownModel() {
  const { scene } = useGLTF('/models/viseris_crown.glb') as { scene: Group }

  const clone = useMemo(() => {
    const next = scene.clone(true)
    next.traverse((obj: any) => {
      if (obj.isMesh && obj.material) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })

    const box = new Box3().setFromObject(next)
    const size = new Vector3()
    const center = new Vector3()
    box.getSize(size)
    box.getCenter(center)

    const maxDimension = Math.max(size.x, size.y, size.z) || 1
    const normalizedScale = 2.2 / maxDimension

    next.position.set(-center.x, -center.y, -center.z)
    next.scale.setScalar(normalizedScale)

    return next
  }, [scene])

  useFrame((state) => {
    clone.rotation.y = state.clock.elapsedTime * 0.35
  })

  return <primitive object={clone} position={[0, -0.24, 0]} />
}

export default function VictoryCelebrationModal({
  open,
  winnerLabel,
  winnerColor,
  onClose,
}: VictoryCelebrationModalProps) {
  if (!open) return null

  return (
    <div className="victory-modal-backdrop" role="dialog" aria-modal="true" aria-label="Victory celebration">
      <div className="victory-modal" style={{ ['--victory-color' as string]: winnerColor }}>
        <p className="victory-eyebrow">The Iron Throne Is Claimed</p>
        <h2 className="victory-title">{winnerLabel} Wins The Realm</h2>
        <p className="victory-subtitle">The banners rise, horns thunder, and the crown answers to a new ruler.</p>

        <div className="victory-crown-stage" aria-hidden>
          <Canvas camera={{ position: [0, 0.35, 4.1], fov: 29 }} gl={{ antialias: true, alpha: true }} shadows dpr={[1, 1.5]}>
            <ambientLight intensity={0.42} color="#d5c5ad" />
            <directionalLight position={[2.4, 2.8, 1.8]} intensity={1.35} color="#ffe8bc" castShadow />
            <directionalLight position={[-2.2, 1.4, -1.2]} intensity={0.66} color="#9eb5c9" />
            <pointLight position={[0, 0.6, 0]} intensity={1.1} color={winnerColor} distance={6} />

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]} receiveShadow>
              <circleGeometry args={[2.35, 44]} />
              <meshStandardMaterial color="#1f1713" roughness={0.92} metalness={0.14} />
            </mesh>

            <Suspense fallback={null}>
              <Float speed={1.15} rotationIntensity={0.22} floatIntensity={0.42}>
                <CrownModel />
              </Float>
            </Suspense>
          </Canvas>
        </div>

        <button type="button" className="victory-close-btn" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  )
}

useGLTF.preload('/models/viseris_crown.glb')
