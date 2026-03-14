'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type SceneProps = {
  className?: string
}

function CameraRig() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime()
    camera.position.x = Math.sin(t * 0.18) * 0.9
    camera.position.y = 5.35 + Math.sin(t * 0.24) * 0.14
    camera.position.z = 10.8 + Math.cos(t * 0.14) * 0.35
    camera.lookAt(0, 0.95, 0)
  })

  return null
}

function SparkField() {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const amount = 260
    const arr = new Float32Array(amount * 3)

    for (let i = 0; i < amount; i += 1) {
      const i3 = i * 3
      arr[i3] = (Math.random() - 0.5) * 15
      arr[i3 + 1] = Math.random() * 4.5 + 0.1
      arr[i3 + 2] = (Math.random() - 0.5) * 12
    }

    return arr
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return

    const pos = pointsRef.current.geometry.attributes.position
    const elapsed = clock.getElapsedTime()

    for (let i = 0; i < pos.count; i += 1) {
      const y = pos.getY(i) + 0.007 + Math.sin(elapsed * 0.55 + i * 0.17) * 0.0009
      pos.setY(i, y > 5.3 ? 0.12 : y)
    }

    pos.needsUpdate = true
    pointsRef.current.rotation.y = elapsed * 0.028
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#e6b04f"
        size={0.055}
        sizeAttenuation
        transparent
        opacity={0.68}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function HouseNodes() {
  const houses = [
    { color: '#95a9c9', pos: [-2.85, 1.42, 0.45] as [number, number, number], phase: 0 },
    { color: '#d8b16a', pos: [2.7, 1.38, 0.2] as [number, number, number], phase: 1.5 },
    { color: '#be5a53', pos: [0.25, 1.35, -2.45] as [number, number, number], phase: 3.1 },
    { color: '#8cb67c', pos: [-0.95, 1.3, 2.32] as [number, number, number], phase: 4.4 },
  ]

  return (
    <group>
      {houses.map((house, idx) => (
        <Float key={idx} speed={1.1} rotationIntensity={0.08} floatIntensity={0.25}>
          <mesh position={house.pos}>
            <sphereGeometry args={[0.14, 20, 20]} />
            <meshStandardMaterial
              color={house.color}
              emissive={house.color}
              emissiveIntensity={0.65}
              metalness={0.45}
              roughness={0.25}
            />
          </mesh>
          <pointLight
            position={[house.pos[0], house.pos[1] + 0.2, house.pos[2]]}
            intensity={0.4}
            distance={1.65}
            color={house.color}
          />
        </Float>
      ))}
    </group>
  )
}

function WarTable() {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ringRef.current) return

    const t = clock.getElapsedTime()
    ringRef.current.rotation.y = t * 0.06
  })

  return (
    <group position={[0, 0.2, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[6.4, 6.65, 0.85, 64]} />
        <meshStandardMaterial color="#14100d" metalness={0.63} roughness={0.48} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.46, 0]}>
        <cylinderGeometry args={[5.65, 5.65, 0.18, 48]} />
        <meshStandardMaterial color="#2b1c13" metalness={0.6} roughness={0.34} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.57, 0]}>
        <circleGeometry args={[4.7, 64]} />
        <meshStandardMaterial
          color="#c9953f"
          emissive="#9b5a20"
          emissiveIntensity={0.3}
          transparent
          opacity={0.48}
          metalness={0.22}
          roughness={0.17}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.59, 0]}>
        <ringGeometry args={[4.05, 4.55, 72]} />
        <meshStandardMaterial
          color="#f0c56f"
          emissive="#cf8c36"
          emissiveIntensity={0.92}
          transparent
          opacity={0.76}
          side={THREE.DoubleSide}
        />
      </mesh>

      <HouseNodes />
    </group>
  )
}

export default function RealmWarTableScene({ className }: SceneProps) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 5.35, 10.8], fov: 34 }}
        style={{ pointerEvents: 'none' }}
      >
        <color attach="background" args={['#090706']} />
        <fog attach="fog" args={['#0b0806', 6.5, 24]} />

        <ambientLight intensity={0.35} color="#e7c484" />
        <hemisphereLight intensity={0.2} color="#bca480" groundColor="#100c09" />

        <directionalLight
          position={[6.2, 8.6, 4.8]}
          intensity={1.05}
          color="#f0c884"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <pointLight position={[-4.5, 2.8, -1.4]} intensity={0.45} color="#8a6271" />
        <pointLight position={[3.9, 2.4, 2.8]} intensity={0.4} color="#7d95ad" />

        <WarTable />
        <SparkField />
        <CameraRig />
      </Canvas>
    </div>
  )
}
