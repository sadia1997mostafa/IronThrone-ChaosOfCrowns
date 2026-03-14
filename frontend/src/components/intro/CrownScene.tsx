'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Crown geometry built entirely from Three.js primitives ───────────────────

function Crown() {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const elapsed = useRef(0)

  const RADIUS = 2.35

  // 9 alternating tall / short spikes
  const spikes = useMemo(() => {
    const count = 9
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      height: i % 2 === 0 ? 1.75 : 0.9,
      tall: i % 2 === 0,
    }))
  }, [])

  // 8 jewels around the ring, alternating colors
  const jewels = useMemo(
    () => ['#cc0000', '#ff8800', '#ffcc00', '#ff4400', '#cc0000', '#aa7700', '#ffcc00', '#ff4400'],
    []
  )

  useFrame((_, delta) => {
    elapsed.current += delta
    // slow rotation
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.28
    // pulsing inner fire glow
    if (coreRef.current) {
      ;(coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.55 + Math.sin(elapsed.current * 2.8) * 0.35
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main crown ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RADIUS, 0.13, 20, 80]} />
        <meshStandardMaterial
          color="#c9a630"
          metalness={1}
          roughness={0.1}
          emissive="#3a2400"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Lower decorative band */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.46, 0]}>
        <torusGeometry args={[RADIUS * 0.95, 0.08, 16, 80]} />
        <meshStandardMaterial color="#a07828" metalness={1} roughness={0.2} />
      </mesh>

      {/* Crown spikes */}
      {spikes.map(({ angle, height, tall }, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(angle) * RADIUS,
            height / 2 + 0.04,
            Math.cos(angle) * RADIUS,
          ]}
        >
          <coneGeometry args={[tall ? 0.13 : 0.09, height, 8]} />
          <meshStandardMaterial
            color={tall ? '#ffe066' : '#c9a630'}
            metalness={1}
            roughness={0.08}
            emissive={tall ? '#ff4400' : '#1a0e00'}
            emissiveIntensity={tall ? 0.65 : 0.1}
          />
        </mesh>
      ))}

      {/* Jewels */}
      {jewels.map((color, i) => {
        const angle = (i / jewels.length) * Math.PI * 2
        return (
          <mesh
            key={`jewel-${i}`}
            position={[Math.sin(angle) * RADIUS, 0.09, Math.cos(angle) * RADIUS]}
          >
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={3}
              roughness={0.05}
              metalness={0.2}
            />
          </mesh>
        )
      })}

      {/* Inner fire core — opacity pulses via coreRef */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.18, 32, 32]} />
        <meshStandardMaterial
          color="#ff1a00"
          emissive="#ff2200"
          emissiveIntensity={0.6}
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Bright inner heart */}
      <mesh>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ffbb00"
          emissiveIntensity={4}
          transparent
          opacity={0.07}
        />
      </mesh>
    </group>
  )
}

// ─── Rising ember particles ────────────────────────────────────────────────────

function Embers() {
  const pointsRef = useRef<THREE.Points>(null)
  const COUNT = 500

  const { geometry, vel } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const vel = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const r = 1 + Math.random() * 4.5
      positions[i * 3 + 0] = Math.cos(theta) * r
      positions[i * 3 + 1] = (Math.random() - 0.35) * 7
      positions[i * 3 + 2] = Math.sin(theta) * r
      vel[i * 3 + 0] = (Math.random() - 0.5) * 0.007
      vel[i * 3 + 1] = 0.006 + Math.random() * 0.018
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.007
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return { geometry: geo, vel }
  }, [])

  useFrame(() => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 0] += vel[i * 3 + 0]
      pos[i * 3 + 1] += vel[i * 3 + 1]
      pos[i * 3 + 2] += vel[i * 3 + 2]
      // respawn ember at bottom when it floats off the top
      if (pos[i * 3 + 1] > 5) {
        const theta = Math.random() * Math.PI * 2
        const r = 1 + Math.random() * 3
        pos[i * 3 + 0] = Math.cos(theta) * r
        pos[i * 3 + 1] = -3.5
        pos[i * 3 + 2] = Math.sin(theta) * r
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#ff7700"
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.82}
      />
    </points>
  )
}

// ─── Pulsating dynamic fire lights ────────────────────────────────────────────

function FireLights() {
  const centerRef = useRef<THREE.PointLight>(null)
  const elapsed = useRef(0)

  useFrame((_, delta) => {
    elapsed.current += delta
    if (centerRef.current) {
      centerRef.current.intensity = 4 + Math.sin(elapsed.current * 3.2) * 2
    }
  })

  return (
    <>
      {/* Pulsing central fire light */}
      <pointLight ref={centerRef} position={[0, 0, 0]} color="#ff4400" distance={12} />
      {/* Warm top glow */}
      <pointLight position={[0, 5, 0]} color="#ff9900" intensity={2} distance={14} />
      {/* Side accents */}
      <pointLight position={[5, -1, -2]} color="#ffcc44" intensity={1.2} distance={10} />
      <pointLight position={[-5, -1, -2]} color="#cc2200" intensity={1.2} distance={10} />
    </>
  )
}

// ─── Exported canvas wrapper ───────────────────────────────────────────────────

export default function CrownScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.3, 8.5], fov: 42 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.08} color="#ff5500" />
      <FireLights />
      <Crown />
      <Embers />
    </Canvas>
  )
}
