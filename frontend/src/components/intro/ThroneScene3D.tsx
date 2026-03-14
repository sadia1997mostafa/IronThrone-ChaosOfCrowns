'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, Suspense } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function CameraRig() {
  useFrame(({ camera, clock }) => {
    const elapsed = clock.getElapsedTime()
    camera.position.x = Math.sin(elapsed * 0.12) * 0.95
    camera.position.y = 3.45 + Math.sin(elapsed * 0.17) * 0.16
    camera.position.z = 11.25 + Math.cos(elapsed * 0.13) * 0.42
    camera.lookAt(0, 3.05, -0.15)
  })

  return null
}

function CrownModel() {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const elapsed = useRef(0)
  const radius = 1.34

  const spikes = useMemo(() => {
    const count = 9
    return Array.from({ length: count }, (_, index) => ({
      angle: (index / count) * Math.PI * 2,
      height: index % 2 === 0 ? 1 : 0.56,
      tall: index % 2 === 0,
    }))
  }, [])

  useFrame((_, delta) => {
    elapsed.current += delta

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.24
      groupRef.current.position.y = 6.1 + Math.sin(elapsed.current * 1.2) * 0.08
    }

    if (coreRef.current) {
      const material = coreRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.38 + Math.sin(elapsed.current * 2.3) * 0.12
    }
  })

  return (
    <group ref={groupRef} position={[0, 6.1, 0.3]} scale={1.15}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.08, 18, 72]} />
        <meshStandardMaterial color="#b8944d" metalness={1} roughness={0.18} emissive="#241507" emissiveIntensity={0.15} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.28, 0]}>
        <torusGeometry args={[radius * 0.92, 0.05, 14, 72]} />
        <meshStandardMaterial color="#7a5b2a" metalness={0.95} roughness={0.28} />
      </mesh>

      {spikes.map((spike, index) => (
        <mesh
          key={index}
          position={[
            Math.sin(spike.angle) * radius,
            spike.height / 2 + 0.02,
            Math.cos(spike.angle) * radius,
          ]}
        >
          <coneGeometry args={[spike.tall ? 0.08 : 0.05, spike.height, 7]} />
          <meshStandardMaterial
            color={spike.tall ? '#d6ba7a' : '#a78244'}
            metalness={1}
            roughness={0.14}
            emissive={spike.tall ? '#5a3510' : '#1b1108'}
            emissiveIntensity={spike.tall ? 0.22 : 0.05}
          />
        </mesh>
      ))}

      <mesh ref={coreRef} position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial color="#6f4316" emissive="#a15a1a" transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

function FloatingAsset({
  url,
  position,
  rotation,
  targetSize,
  bob,
  spin,
  startDelay,
}: {
  url: string
  position: [number, number, number]
  rotation: [number, number, number]
  targetSize: number
  bob: number
  spin: number
  startDelay: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(url)

  const model = useMemo(() => scene.clone(true), [scene])

  const normalizedScale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model)
    const size = box.getSize(new THREE.Vector3())
    const maxDimension = Math.max(size.x, size.y, size.z)
    return maxDimension > 0 ? targetSize / maxDimension : 1
  }, [model, targetSize])

  useEffect(() => {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
        const material = child.material
        if (material instanceof THREE.MeshStandardMaterial) {
          material.roughness = Math.min(1, material.roughness * 1.04)
          material.metalness = Math.min(1, material.metalness + 0.06)
        }
      }
    })
  }, [model])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const elapsed = clock.getElapsedTime()

    const entranceProgress = THREE.MathUtils.clamp((elapsed - startDelay) / 1.2, 0, 1)
    const eased = THREE.MathUtils.smoothstep(entranceProgress, 0, 1)

    groupRef.current.visible = entranceProgress > 0
    groupRef.current.scale.setScalar(0.001 + eased)
    groupRef.current.position.y = position[1] - (1 - eased) * 0.65 + Math.sin(elapsed * 0.9 + spin) * bob
    groupRef.current.rotation.y = rotation[1] + elapsed * spin
    groupRef.current.rotation.z = rotation[2] + Math.sin(elapsed * 0.7 + spin) * 0.05
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <primitive object={model} scale={normalizedScale} />
    </group>
  )
}

function SmokeWisps() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 180

  const { geometry, velocity } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocity = new Float32Array(count * 3)

    for (let index = 0; index < count; index += 1) {
      const angle = Math.random() * Math.PI * 2
      const radius = 0.8 + Math.random() * 3.8
      positions[index * 3] = Math.cos(angle) * radius
      positions[index * 3 + 1] = 0.5 + Math.random() * 2.8
      positions[index * 3 + 2] = Math.sin(angle) * radius * 0.7
      velocity[index * 3] = (Math.random() - 0.5) * 0.0012
      velocity[index * 3 + 1] = 0.0015 + Math.random() * 0.0022
      velocity[index * 3 + 2] = (Math.random() - 0.5) * 0.0012
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return { geometry, velocity }
  }, [])

  useFrame(() => {
    if (!pointsRef.current) return

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] += velocity[index * 3]
      positions[index * 3 + 1] += velocity[index * 3 + 1]
      positions[index * 3 + 2] += velocity[index * 3 + 2]

      if (positions[index * 3 + 1] > 5.4) {
        const angle = Math.random() * Math.PI * 2
        const radius = 0.7 + Math.random() * 3.6
        positions[index * 3] = Math.cos(angle) * radius
        positions[index * 3 + 1] = 0.45
        positions[index * 3 + 2] = Math.sin(angle) * radius * 0.7
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#9f8570"
        size={0.18}
        transparent
        opacity={0.14}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

function Sword({
  position,
  rotation,
  scale = 1,
  bladeHeight = 1.8,
  bladeWidth = 0.08,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale?: number
  bladeHeight?: number
  bladeWidth?: number
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh position={[0, bladeHeight * 0.5, 0]}>
        <boxGeometry args={[bladeWidth, bladeHeight, 0.12]} />
        <meshStandardMaterial color="#7d7b78" metalness={0.82} roughness={0.32} />
      </mesh>
      <mesh position={[0, bladeHeight + 0.14, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[bladeWidth * 1.35, 0.34, 5]} />
        <meshStandardMaterial color="#8a8783" metalness={0.88} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.32, 0.08, 0.18]} />
        <meshStandardMaterial color="#5c4020" metalness={0.55} roughness={0.68} />
      </mesh>
      <mesh position={[0, -0.17, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.34, 10]} />
        <meshStandardMaterial color="#3c2615" metalness={0.22} roughness={0.85} />
      </mesh>
    </group>
  )
}

function ThroneModel() {
  const groupRef = useRef<THREE.Group>(null)

  const swords = useMemo(() => {
    const backFan = Array.from({ length: 23 }, (_, index) => {
      const spread = -1 + (index / 22) * 2
      const centerBias = 1 - Math.abs(spread)
      return {
        position: [spread * 2.75, 3.15 + Math.abs(spread) * 0.95, -1.2 + centerBias * 0.22] as [number, number, number],
        rotation: [0.05, spread * 0.06, spread * -0.88] as [number, number, number],
        scale: 0.86 + centerBias * 0.24,
        bladeHeight: 2.2 + centerBias * 2.2,
        bladeWidth: 0.06 + centerBias * 0.02,
      }
    })

    const sideWalls = Array.from({ length: 16 }, (_, index) => {
      const left = index < 8
      const localIndex = left ? index : index - 8
      const rise = localIndex / 7
      return {
        position: [left ? -2.95 + rise * 0.3 : 2.95 - rise * 0.3, 1.05 + localIndex * 0.56, 0.55 - rise * 0.9] as [number, number, number],
        rotation: [0.12, left ? 0.24 : -0.24, left ? -1.18 + rise * 0.16 : 1.18 - rise * 0.16] as [number, number, number],
        scale: 0.84,
        bladeHeight: 1.55 + rise * 1.2,
        bladeWidth: 0.07,
      }
    })

    const lowerFan = Array.from({ length: 12 }, (_, index) => {
      const spread = -1 + (index / 11) * 2
      return {
        position: [spread * 2.4, 1.45 + Math.abs(spread) * 0.28, -0.15] as [number, number, number],
        rotation: [0.14, 0, spread * -0.58] as [number, number, number],
        scale: 0.78,
        bladeHeight: 1.55,
        bladeWidth: 0.07,
      }
    })

    const crownHalo = Array.from({ length: 10 }, (_, index) => {
      const spread = -1 + (index / 9) * 2
      const centerBias = 1 - Math.abs(spread)
      return {
        position: [spread * 1.55, 5.15 + centerBias * 0.9, -0.96 - centerBias * 0.1] as [number, number, number],
        rotation: [0.08, spread * 0.08, spread * -0.42] as [number, number, number],
        scale: 0.64 + centerBias * 0.08,
        bladeHeight: 1.6 + centerBias * 1.35,
        bladeWidth: 0.05,
      }
    })

    const seatDaggers = Array.from({ length: 8 }, (_, index) => {
      const spread = -1 + (index / 7) * 2
      return {
        position: [spread * 1.18, 2.18 + Math.abs(spread) * 0.12, 0.18] as [number, number, number],
        rotation: [0.6, 0, spread * -0.18] as [number, number, number],
        scale: 0.48,
        bladeHeight: 1.2,
        bladeWidth: 0.05,
      }
    })

    return [...backFan, ...sideWalls, ...lowerFan, ...crownHalo, ...seatDaggers]
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const elapsed = clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(elapsed * 0.18) * 0.05
    groupRef.current.position.y = Math.sin(elapsed * 0.42) * 0.05 - 0.18
  })

  return (
    <group ref={groupRef} position={[0, -0.18, 0]} scale={1.08}>
      <mesh position={[0, 0.18, 0.08]} receiveShadow>
        <boxGeometry args={[5.2, 0.42, 3.5]} />
        <meshStandardMaterial color="#261912" metalness={0.08} roughness={0.92} />
      </mesh>

      <mesh position={[0, 0.52, 1.18]} rotation={[-0.4, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.1, 0.16, 1.2]} />
        <meshStandardMaterial color="#342219" metalness={0.12} roughness={0.88} />
      </mesh>

      <mesh position={[0, 0.86, 0.62]} rotation={[-0.18, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.05, 0.22, 1.65]} />
        <meshStandardMaterial color="#433025" metalness={0.14} roughness={0.84} />
      </mesh>

      <mesh position={[0, 1.58, 0.14]} rotation={[0.28, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.82, 0.24, 1.06]} />
        <meshStandardMaterial color="#3b2920" metalness={0.12} roughness={0.86} />
      </mesh>

      <mesh position={[0, 3.05, -0.98]} rotation={[0.08, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 4.45, 0.34]} />
        <meshStandardMaterial color="#382824" metalness={0.22} roughness={0.74} />
      </mesh>

      <mesh position={[0, 4.15, -1.12]} rotation={[0.06, 0, 0]} castShadow>
        <boxGeometry args={[0.8, 3.4, 0.22]} />
        <meshStandardMaterial color="#2d201b" metalness={0.24} roughness={0.78} />
      </mesh>

      <mesh position={[-1.56, 1.42, 0.38]} rotation={[0.08, 0.04, -0.32]} castShadow>
        <boxGeometry args={[0.26, 1.95, 0.3]} />
        <meshStandardMaterial color="#4a3220" metalness={0.16} roughness={0.82} />
      </mesh>
      <mesh position={[1.56, 1.42, 0.38]} rotation={[0.08, -0.04, 0.32]} castShadow>
        <boxGeometry args={[0.26, 1.95, 0.3]} />
        <meshStandardMaterial color="#4a3220" metalness={0.16} roughness={0.82} />
      </mesh>

      <mesh position={[-0.95, 1.84, 0.34]} rotation={[0, 0.04, -0.16]} castShadow>
        <boxGeometry args={[1.22, 0.14, 0.26]} />
        <meshStandardMaterial color="#573928" metalness={0.16} roughness={0.74} />
      </mesh>
      <mesh position={[0.95, 1.84, 0.34]} rotation={[0, -0.04, 0.16]} castShadow>
        <boxGeometry args={[1.22, 0.14, 0.26]} />
        <meshStandardMaterial color="#573928" metalness={0.16} roughness={0.74} />
      </mesh>

      <mesh position={[0, 5.22, -1.04]} rotation={[0.08, 0, 0]} castShadow>
        <boxGeometry args={[0.92, 0.16, 0.26]} />
        <meshStandardMaterial color="#4b3628" metalness={0.26} roughness={0.68} />
      </mesh>

      <mesh position={[0, 2.42, -0.84]} rotation={[0.52, 0, 0]} castShadow>
        <coneGeometry args={[0.58, 1.08, 4]} />
        <meshStandardMaterial color="#2a1c15" metalness={0.14} roughness={0.88} />
      </mesh>

      <mesh position={[0, 2.08, 0.44]} rotation={[0.16, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.02, 0.14, 0.78]} />
        <meshStandardMaterial color="#4d382b" metalness={0.12} roughness={0.84} />
      </mesh>

      <mesh position={[0, 2.68, 0.08]} rotation={[0.72, 0, 0]} castShadow>
        <boxGeometry args={[0.34, 1.1, 0.16]} />
        <meshStandardMaterial color="#53382a" metalness={0.14} roughness={0.82} />
      </mesh>

      {swords.map((sword, index) => (
        <Sword
          key={index}
          position={sword.position}
          rotation={sword.rotation}
          scale={sword.scale}
          bladeHeight={sword.bladeHeight}
          bladeWidth={sword.bladeWidth}
        />
      ))}
    </group>
  )
}

function Dragon({ radius, speed, phase, altitude, scale }: { radius: number; speed: number; phase: number; altitude: number; scale: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const leftWingRef = useRef<THREE.Group>(null)
  const rightWingRef = useRef<THREE.Group>(null)
  const tailRef = useRef<THREE.Mesh>(null)

  const wingShape = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    shape.lineTo(1.9, 0.24)
    shape.lineTo(3.3, 1.35)
    shape.lineTo(1.4, 0.78)
    shape.lineTo(0.25, 0.34)
    shape.closePath()
    return shape
  }, [])

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime() * speed + phase
    const x = Math.cos(elapsed) * radius
    const z = Math.sin(elapsed) * (radius * 0.48)
    const y = altitude + Math.sin(elapsed * 1.6) * 0.34

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z)

      const nextX = Math.cos(elapsed + 0.02) * radius
      const nextZ = Math.sin(elapsed + 0.02) * (radius * 0.48)
      groupRef.current.lookAt(nextX, y + 0.08, nextZ)
      groupRef.current.rotation.z = Math.sin(elapsed * 1.3) * 0.12
    }

    const flap = Math.sin(clock.getElapsedTime() * 7 + phase) * 0.55
    if (leftWingRef.current) leftWingRef.current.rotation.z = flap - 0.18
    if (rightWingRef.current) rightWingRef.current.rotation.z = -flap + 0.18
    if (tailRef.current) tailRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 4 + phase) * 0.28
  })

  return (
    <group ref={groupRef} scale={scale}>
      <mesh castShadow>
        <capsuleGeometry args={[0.16, 1.1, 6, 10]} />
        <meshStandardMaterial color="#1b130f" metalness={0.04} roughness={0.96} />
      </mesh>

      <mesh position={[0.72, 0.06, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
        <coneGeometry args={[0.18, 0.54, 8]} />
        <meshStandardMaterial color="#201711" roughness={0.94} />
      </mesh>

      <mesh ref={tailRef} position={[-0.88, -0.03, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <coneGeometry args={[0.12, 0.92, 8]} />
        <meshStandardMaterial color="#1c130f" roughness={0.94} />
      </mesh>

      <group ref={leftWingRef} position={[-0.15, 0.08, 0.18]} rotation={[0.2, 0.18, -0.3]}>
        <mesh rotation={[0, 0, Math.PI]} castShadow>
          <shapeGeometry args={[wingShape]} />
          <meshStandardMaterial color="#241710" side={THREE.DoubleSide} roughness={0.95} />
        </mesh>
      </group>

      <group ref={rightWingRef} position={[-0.15, 0.08, -0.18]} rotation={[-0.2, -0.18, 0.3]}>
        <mesh rotation={[0, Math.PI, Math.PI]} castShadow>
          <shapeGeometry args={[wingShape]} />
          <meshStandardMaterial color="#241710" side={THREE.DoubleSide} roughness={0.95} />
        </mesh>
      </group>
    </group>
  )
}

function Embers() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 320

  const { geometry, velocity } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocity = new Float32Array(count * 3)

    for (let index = 0; index < count; index += 1) {
      const theta = Math.random() * Math.PI * 2
      const radius = 1 + Math.random() * 5
      positions[index * 3] = Math.cos(theta) * radius
      positions[index * 3 + 1] = -1.4 + Math.random() * 6.4
      positions[index * 3 + 2] = Math.sin(theta) * radius * 0.65
      velocity[index * 3] = (Math.random() - 0.5) * 0.0025
      velocity[index * 3 + 1] = 0.008 + Math.random() * 0.012
      velocity[index * 3 + 2] = (Math.random() - 0.5) * 0.0025
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    return { geometry, velocity }
  }, [])

  useFrame(() => {
    if (!pointsRef.current) return

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] += velocity[index * 3]
      positions[index * 3 + 1] += velocity[index * 3 + 1]
      positions[index * 3 + 2] += velocity[index * 3 + 2]

      if (positions[index * 3 + 1] > 6.1) {
        const theta = Math.random() * Math.PI * 2
        const radius = 0.9 + Math.random() * 4.4
        positions[index * 3] = Math.cos(theta) * radius
        positions[index * 3 + 1] = -1.5
        positions[index * 3 + 2] = Math.sin(theta) * radius * 0.65
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial color="#c08a46" size={0.05} transparent opacity={0.75} sizeAttenuation />
    </points>
  )
}

function Stage() {
  return (
    <>
      <color attach="background" args={['#090604']} />
      <fog attach="fog" args={['#090604', 10, 20]} />

      <ambientLight intensity={0.22} color="#6d5436" />
      <directionalLight position={[2.2, 8.4, 6]} intensity={1.75} color="#f2d7a8" castShadow />
      <spotLight position={[-5.2, 7.4, 4.2]} angle={0.34} penumbra={0.7} intensity={1.9} color="#8a5627" />
      <spotLight position={[4.8, 6.4, 2.6]} angle={0.28} penumbra={0.8} intensity={0.95} color="#6d3c18" />
      <pointLight position={[0, 5.2, 1.5]} intensity={2.7} distance={12} color="#d0a06a" />
      <pointLight position={[0, 1.5, 3.6]} intensity={1.55} distance={9} color="#4f2b12" />
      <pointLight position={[0, 3.8, -2.2]} intensity={0.75} distance={8} color="#b8c0d2" />
      <pointLight position={[4.9, 5.4, 4.1]} intensity={1.45} distance={10} color="#e0b178" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, 0]} receiveShadow>
        <circleGeometry args={[11, 64]} />
        <meshStandardMaterial color="#130d09" roughness={0.96} metalness={0.08} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.44, 0]}>
        <ringGeometry args={[2.4, 6.2, 64]} />
        <meshBasicMaterial color="#4b2e16" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>

      <ThroneModel />
      <CrownModel />
      <Dragon radius={7.4} speed={0.36} phase={0.2} altitude={5.7} scale={0.86} />
      <Dragon radius={6.2} speed={-0.42} phase={1.8} altitude={4.8} scale={0.62} />
      <Dragon radius={8.1} speed={0.28} phase={3.4} altitude={6.3} scale={0.72} />
      <Suspense fallback={null}>
        <FloatingAsset
          url="/models/iron_throne_from_game_of_thrones.glb"
          position={[0, 4.05, 2.95]}
          rotation={[0.1, 0.15, 0]}
          targetSize={1.7}
          bob={0.08}
          spin={0.3}
          startDelay={1.0}
        />
        <FloatingAsset
          url="/models/game_of_thrones_wildlings_dagger.glb"
          position={[-3.2, 3.35, 3.25]}
          rotation={[0.62, -0.34, -1.18]}
          targetSize={0.9}
          bob={0.09}
          spin={0.34}
          startDelay={1.55}
        />
        <FloatingAsset
          url="/models/game_of_thrones_wildlings_dagger.glb"
          position={[3.2, 3.35, 3.25]}
          rotation={[0.62, 0.34, 1.18]}
          targetSize={0.9}
          bob={0.09}
          spin={-0.34}
          startDelay={2.0}
        />
        <FloatingAsset
          url="/models/game_of_thrones_astrolabe.glb"
          position={[-2.2, 4.55, 3.5]}
          rotation={[0.2, 0.52, -0.16]}
          targetSize={1.35}
          bob={0.06}
          spin={0.28}
          startDelay={0.9}
        />
        <FloatingAsset
          url="/models/game_of_thrones_astrolabe.glb"
          position={[2.2, 2.05, 3.5]}
          rotation={[0.2, -0.52, 0.16]}
          targetSize={1.35}
          bob={0.06}
          spin={-0.28}
          startDelay={1.15}
        />
      </Suspense>
      <Embers />
      <SmokeWisps />
      <CameraRig />
    </>
  )
}

useGLTF.preload('/models/iron_throne_from_game_of_thrones.glb')
useGLTF.preload('/models/game_of_thrones_astrolabe.glb')
useGLTF.preload('/models/game_of_thrones_wildlings_dagger.glb')

export default function ThroneScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 3.45, 11.25], fov: 29 }}
      gl={{ antialias: true, alpha: true }}
      shadows
      style={{ background: 'transparent' }}
    >
      <Stage />
    </Canvas>
  )
}