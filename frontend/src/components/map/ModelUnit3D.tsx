'use client'

import { Suspense, useMemo, type CSSProperties } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Box3, Vector3, type Group } from 'three'

type ModelUnit3DProps = {
  modelSrc: string
  houseColor: string
}

function ModelMesh({ modelSrc, houseColor }: ModelUnit3DProps) {
  const { scene } = useGLTF(modelSrc) as { scene: Group }
  const { clone, fitScale, fitYOffset } = useMemo(() => {
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
    const normalizedScale = 1.7 / maxDimension

    next.position.set(-center.x, -center.y, -center.z)

    return {
      clone: next,
      fitScale: normalizedScale,
      fitYOffset: -(size.y * normalizedScale * 0.18),
    }
  }, [scene])

  return (
    <group rotation={[0, -0.5, 0]} position={[0, fitYOffset - 0.28, 0]} scale={fitScale}>
      <primitive object={clone} />
      <pointLight position={[0.4, 1.2, 0.55]} intensity={1.5} color={houseColor} distance={3.8} />
    </group>
  )
}

export default function ModelUnit3D({ modelSrc, houseColor }: ModelUnit3DProps) {
  const wrapStyle = {
    ['--token-model-color' as string]: houseColor,
  } as CSSProperties

  return (
    <div className="model-token-wrap" style={wrapStyle}>
      <Canvas
        camera={{ position: [0.5, 0.95, 2.2], fov: 30, near: 0.01, far: 200 }}
        gl={{ antialias: true, alpha: true }}
        shadows
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} color="#cfd8e0" />
        <directionalLight position={[1.8, 2.5, 1.6]} intensity={1.65} color="#fff3da" castShadow />
        <directionalLight position={[-1.4, 1.2, -1.2]} intensity={0.85} color="#8ea7bd" />
        <Suspense fallback={null}>
          <ModelMesh modelSrc={modelSrc} houseColor={houseColor} />
        </Suspense>
      </Canvas>
      <span className="model-token-vignette" aria-hidden />
    </div>
  )
}

useGLTF.preload('/models/epic_black_golden_cyber_warrior.glb')
