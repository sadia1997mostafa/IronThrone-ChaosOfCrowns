'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function AstrolabeModel({ reverse = false }: { reverse?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/game_of_thrones_astrolabe.glb')

  const model = useMemo(() => scene.clone(true), [scene])

  const normalizedScale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model)
    const size = box.getSize(new THREE.Vector3())
    const maxDimension = Math.max(size.x, size.y, size.z)
    return maxDimension > 0 ? 1.2 / maxDimension : 1
  }, [model])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const elapsed = clock.getElapsedTime()
    const direction = reverse ? -1 : 1
    groupRef.current.rotation.y = elapsed * 0.8 * direction
    groupRef.current.rotation.z = Math.sin(elapsed * 0.9) * 0.1
    groupRef.current.position.y = Math.sin(elapsed * 1.2) * 0.05
  })

  return (
    <group ref={groupRef}>
      <primitive object={model} scale={normalizedScale} />
    </group>
  )
}

export default function CornerAstrolabe3D({ reverse = false }: { reverse?: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 3.2], fov: 30 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.6} color="#a07f52" />
      <pointLight position={[1.8, 2.4, 3]} intensity={1.2} color="#d8b37a" />
      <pointLight position={[-2, -1.5, 2]} intensity={0.5} color="#6f4a27" />
      <AstrolabeModel reverse={reverse} />
    </Canvas>
  )
}

useGLTF.preload('/models/game_of_thrones_astrolabe.glb')
