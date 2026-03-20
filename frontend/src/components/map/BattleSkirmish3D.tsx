'use client'

import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Box3, Vector3, type Group } from 'three'

type BattleSkirmish3DProps = {
  visible: boolean
  attackerColor: string
  defenderColor: string
  modelSrc: string
  weaponSources: {
    attackerSword: string
    defenderSword: string
    dagger: string
  }
  phase: 'march' | 'impact' | 'briefing'
  slowMo?: boolean
}

type FighterProps = {
  side: -1 | 1
  accent: string
  modelSrc: string
  weaponSrc: string
  daggerSrc: string
  phase: BattleSkirmish3DProps['phase']
  slowMo?: boolean
}

function WeaponActionModel({ modelSrc, targetSize }: { modelSrc: string; targetSize: number }) {
  const { scene } = useGLTF(modelSrc) as { scene: Group }

  const { clone, fitScale } = useMemo(() => {
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
    const normalizedScale = targetSize / maxDimension

    next.position.set(-center.x, -center.y, -center.z)

    return {
      clone: next,
      fitScale: normalizedScale,
    }
  }, [scene, targetSize])

  return (
    <group scale={fitScale}>
      <primitive object={clone} />
    </group>
  )
}

function Fighter({ side, accent, modelSrc, weaponSrc, daggerSrc, phase, slowMo = false }: FighterProps) {
  const { scene } = useGLTF(modelSrc) as { scene: Group }
  const swordRef = useRef<Group>(null)
  const daggerRef = useRef<Group>(null)

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
    const normalizedScale = 1.6 / maxDimension

    next.position.set(-center.x, -center.y, -center.z)

    return {
      clone: next,
      fitScale: normalizedScale,
      fitYOffset: -(size.y * normalizedScale * 0.16),
    }
  }, [scene])

  useFrame(({ clock }) => {
    const speedFactor = slowMo ? 0.24 : phase === 'impact' ? 0.42 : 0.55
    const t = clock.getElapsedTime() * speedFactor
    const root = clone.parent
    if (!root) return

    const lunge = Math.max(0, Math.sin(t * 2.8)) * (phase === 'impact' ? 0.2 : 0.1)
    const recoil = Math.max(0, Math.sin(t * 2.8 + 1.7)) * 0.08
    root.position.x = side * (1.02 - lunge + recoil)
    root.position.z = -0.12 + Math.sin(t * 0.95 + side) * 0.016
    root.rotation.y = side === -1 ? 0.74 : -0.74
    root.rotation.z = Math.sin(t * 2.8 + side) * (phase === 'impact' ? 0.04 : 0.018)

    const pulse = 0.76 + Math.sin(t * 2.6) * (phase === 'impact' ? 0.18 : 0.12)
    root.scale.setScalar(Math.max(0.0001, fitScale * pulse))

    if (swordRef.current) {
      swordRef.current.rotation.y = side === -1 ? 0.62 : -0.62
      swordRef.current.rotation.x = -1.06 + Math.sin(t * 3.4 + side) * (phase === 'impact' ? 0.26 : 0.14)
      swordRef.current.rotation.z = side === -1 ? 0.38 : -0.38
      swordRef.current.position.x = side * (0.22 + Math.sin(t * 2.1 + side) * 0.03)
      swordRef.current.position.z = 0.15 + Math.sin(t * 2.2 + side) * 0.03
    }

    if (daggerRef.current) {
      daggerRef.current.rotation.y = side === -1 ? 0.92 : -0.92
      daggerRef.current.rotation.x = -0.34 + Math.sin(t * 3.6 + 1.1) * 0.2
      daggerRef.current.rotation.z = side === -1 ? -0.44 : 0.44
      daggerRef.current.position.x = side * (0.11 + Math.sin(t * 2.8 + 0.5) * 0.02)
      daggerRef.current.position.y = 0.41 + Math.sin(t * 1.8 + side) * 0.018
    }
  })

  return (
    <group position={[side * 0.95, fitYOffset - 0.5, -0.1]}>
      <primitive object={clone} />
      <group ref={swordRef} position={[side * 0.22, 0.54, 0.15]}>
        <WeaponActionModel modelSrc={weaponSrc} targetSize={0.42} />
      </group>
      <group ref={daggerRef} position={[side * 0.11, 0.41, 0.13]}>
        <WeaponActionModel modelSrc={daggerSrc} targetSize={0.22} />
      </group>
      <pointLight position={[0, 0.56, 0.22]} intensity={0.76} color={accent} distance={1.9} />
    </group>
  )
}

function BladeImpact({
  phase,
  attackerColor,
  defenderColor,
  weaponSources,
  slowMo = false,
}: {
  phase: BattleSkirmish3DProps['phase']
  attackerColor: string
  defenderColor: string
  weaponSources: BattleSkirmish3DProps['weaponSources']
  slowMo?: boolean
}) {
  const orbRef = useRef<any>(null)
  const sparkRingRef = useRef<any>(null)
  const centerDaggerRef = useRef<Group>(null)
  const crossSwordARef = useRef<Group>(null)
  const crossSwordBRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    const speedFactor = slowMo ? 0.24 : phase === 'impact' ? 0.44 : 0.55
    const t = clock.getElapsedTime() * speedFactor
    const pulse = phase === 'impact' ? 1.36 : 0.62
    if (!orbRef.current) return
    orbRef.current.scale.setScalar(0.55 + Math.max(0, Math.sin(t * 8)) * 0.45 * pulse)

    if (sparkRingRef.current) {
      sparkRingRef.current.rotation.z = t * 2.9
      sparkRingRef.current.scale.setScalar(0.82 + Math.max(0, Math.sin(t * 4.8)) * (phase === 'impact' ? 0.32 : 0.14))
    }

    if (centerDaggerRef.current) {
      centerDaggerRef.current.rotation.y = t * 2.6
      centerDaggerRef.current.rotation.x = -0.55 + Math.sin(t * 3.2) * 0.2
      centerDaggerRef.current.position.y = 0.02 + Math.sin(t * 1.8) * 0.04
    }

    if (crossSwordARef.current && crossSwordBRef.current) {
      const swing = Math.sin(t * 4.1) * (phase === 'impact' ? 0.21 : 0.1)
      crossSwordARef.current.rotation.z = 0.63 + swing
      crossSwordBRef.current.rotation.z = -0.63 - swing
    }
  })

  return (
    <group position={[0, 0.25, 0.15]}>
      <mesh ref={orbRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#dcc6a8" emissive="#a85e46" emissiveIntensity={phase === 'impact' ? 2.2 : 0.95} />
      </mesh>
      <mesh ref={sparkRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.09, 0.16, 28]} />
        <meshBasicMaterial color="#d8b89d" transparent opacity={phase === 'impact' ? 0.56 : 0.26} side={2 as any} />
      </mesh>
      <group ref={crossSwordARef} position={[-0.11, 0.03, 0.1]} rotation={[0.8, 0, 0.7]}>
        <WeaponActionModel modelSrc={weaponSources.attackerSword} targetSize={0.24} />
      </group>
      <group ref={crossSwordBRef} position={[0.11, 0.03, 0.1]} rotation={[0.8, 0, -0.7]}>
        <WeaponActionModel modelSrc={weaponSources.defenderSword} targetSize={0.24} />
      </group>
      <group ref={centerDaggerRef} position={[0, 0.02, 0.14]}>
        <WeaponActionModel modelSrc={weaponSources.dagger} targetSize={0.16} />
      </group>
      <pointLight position={[0, 0, 0]} intensity={phase === 'impact' ? 2.2 : 1.2} color="#c57f63" distance={2.1} />
      <pointLight position={[0, 0.08, 0.15]} intensity={0.95} color={attackerColor} distance={1.7} />
      <pointLight position={[0, -0.03, -0.15]} intensity={0.95} color={defenderColor} distance={1.7} />
    </group>
  )
}

export default function BattleSkirmish3D({
  visible,
  attackerColor,
  defenderColor,
  modelSrc,
  weaponSources,
  phase,
  slowMo = false,
}: BattleSkirmish3DProps) {
  if (!visible) return null

  return (
    <div className={`battle-skirmish-overlay ${phase === 'impact' ? 'is-impact' : ''} ${slowMo ? 'is-slowmo' : ''}`} aria-hidden>
      <Canvas camera={{ position: [0, 1.1, 3.55], fov: 28, near: 0.01, far: 100 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.4]}>
        <ambientLight intensity={0.33} color="#a4acb5" />
        <directionalLight position={[2.2, 2.7, 1.6]} intensity={1.25} color="#ebe1d2" castShadow />
        <directionalLight position={[-2.2, 1.6, -1.6]} intensity={0.62} color="#7b8795" />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.28, 0]} receiveShadow>
          <circleGeometry args={[2.3, 40]} />
          <meshStandardMaterial color="#2c2623" roughness={0.92} metalness={0.22} />
        </mesh>

        <Suspense fallback={null}>
          <Fighter
            side={-1}
            accent={attackerColor}
            modelSrc={modelSrc}
            weaponSrc={weaponSources.attackerSword}
            daggerSrc={weaponSources.dagger}
            phase={phase}
            slowMo={slowMo}
          />
          <Fighter
            side={1}
            accent={defenderColor}
            modelSrc={modelSrc}
            weaponSrc={weaponSources.defenderSword}
            daggerSrc={weaponSources.dagger}
            phase={phase}
            slowMo={slowMo}
          />
          <BladeImpact
            phase={phase}
            attackerColor={attackerColor}
            defenderColor={defenderColor}
            weaponSources={weaponSources}
            slowMo={slowMo}
          />
        </Suspense>
      </Canvas>
      <span className="battle-skirmish-hud">Tactical feed // melee contact</span>
    </div>
  )
}

useGLTF.preload('/models/epic_black_golden_cyber_warrior.glb')
useGLTF.preload('/models/sword1.glb')
useGLTF.preload('/models/sword2.glb')
useGLTF.preload('/models/game_of_thrones_wildlings_dagger.glb')
