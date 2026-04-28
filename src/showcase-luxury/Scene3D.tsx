'use client'
import { useRef, Suspense, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { brand } from './brand'

// Positions Y des 3 produits dans la scène
export const PRODUCT_Y = [0, -7, -14] as const

// Timing de scroll par produit (0 → 1)
export const STAGES = {
  parfum:  { stable: [0, 0.18],      transition: [0.18, 0.38] },
  bougie:  { stable: [0.38, 0.58],   transition: [0.58, 0.78] },
  bague:   { stable: [0.78, 1.0],    transition: [1.0, 1.0]   },
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

// Un produit centré et scalé automatiquement
function ProductModel({ path, worldY }: { path: string; worldY: number }) {
  const outerRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(path)

  useEffect(() => {
    if (!innerRef.current) return
    const box = new THREE.Box3().setFromObject(innerRef.current)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    innerRef.current.position.sub(center)
    if (maxDim > 0) innerRef.current.scale.setScalar(1.9 / maxDim)
  }, [scene])

  useFrame((_, delta) => {
    if (outerRef.current) outerRef.current.rotation.y += delta * 0.22
  })

  return (
    <group ref={outerRef} position={[0, worldY, 0]}>
      <group ref={innerRef}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

// Caméra animée par le scroll (ref partagée, pas de setState)
function AnimatedCamera({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const camRef = useRef<THREE.PerspectiveCamera>(null)
  const { set } = useThree()
  const posRef = useRef(new THREE.Vector3(0, 0, 4))
  const lookRef = useRef(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    if (camRef.current) set({ camera: camRef.current })
  }, [set])

  useFrame(() => {
    const p = scrollRef.current
    let targetY = 0
    let targetZ = 4.0

    if (p <= 0.18) {
      // stable parfum
      targetY = 0; targetZ = 4.0
    } else if (p <= 0.38) {
      // transition parfum→bougie
      const t = easeInOut((p - 0.18) / 0.20)
      targetY = THREE.MathUtils.lerp(0, -7, t)
      targetZ = 4.0 + 0.8 * Math.sin(t * Math.PI)
    } else if (p <= 0.58) {
      // stable bougie
      targetY = -7; targetZ = 4.0
    } else if (p <= 0.78) {
      // transition bougie→bague
      const t = easeInOut((p - 0.58) / 0.20)
      targetY = THREE.MathUtils.lerp(-7, -14, t)
      targetZ = 4.0 + 0.8 * Math.sin(t * Math.PI)
    } else {
      // stable bague
      targetY = -14; targetZ = 4.0
    }

    posRef.current.lerp(new THREE.Vector3(0, targetY, targetZ), 0.04)
    lookRef.current.lerp(new THREE.Vector3(0, targetY, 0), 0.04)

    if (camRef.current) {
      camRef.current.position.copy(posRef.current)
      camRef.current.lookAt(lookRef.current)
    }
  })

  return <PerspectiveCamera ref={camRef} makeDefault fov={40} near={0.1} far={60} />
}

// Lumières dynamiques selon la position caméra
function DynamicLights({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const keyRef = useRef<THREE.DirectionalLight>(null)
  const rimRef = useRef<THREE.DirectionalLight>(null)
  const fillRef = useRef<THREE.PointLight>(null)

  const parfumColor = useMemo(() => new THREE.Color('#ffd4a0'), [])
  const bougieColor = useMemo(() => new THREE.Color('#ffb060'), [])
  const bagueColor  = useMemo(() => new THREE.Color('#d0e8ff'), [])

  useFrame(() => {
    const p = scrollRef.current
    let color = parfumColor.clone()

    if (p < 0.18) {
      color = parfumColor.clone()
    } else if (p < 0.50) {
      const t = Math.min((p - 0.18) / 0.32, 1)
      color = parfumColor.clone().lerp(bougieColor, t)
    } else if (p < 0.78) {
      const t = Math.min((p - 0.50) / 0.28, 1)
      color = bougieColor.clone().lerp(bagueColor, t)
    } else {
      color = bagueColor.clone()
    }

    if (keyRef.current) {
      keyRef.current.color.copy(color)
      // La lumière suit la caméra en Y
      const camY = scrollRef.current * -14
      keyRef.current.position.set(3, camY + 4, 5)
    }
    if (fillRef.current) {
      fillRef.current.color.copy(color)
      const camY = scrollRef.current * -14
      fillRef.current.position.set(-2, camY + 1, 3)
    }
  })

  return (
    <>
      <directionalLight ref={keyRef} intensity={2.8} position={[3, 4, 5]} />
      <directionalLight ref={rimRef} intensity={0.5} color="#4060a0" position={[-2, -2, -4]} />
      <pointLight ref={fillRef} intensity={1.2} distance={8} position={[-2, 1, 3]} />
      <ambientLight intensity={0.12} />
    </>
  )
}

interface Scene3DProps {
  scrollRef: React.RefObject<number>
}

export function Scene3D({ scrollRef }: Scene3DProps) {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      dpr={[1, 1.5]}
      style={{ background: brand.bg }}
    >
      <color attach="background" args={[brand.bg]} />
      {/* Fog : masque les autres produits hors viewport */}
      <fog attach="fog" args={[brand.bg, 5.5, 11]} />

      <AnimatedCamera scrollRef={scrollRef} />
      <DynamicLights scrollRef={scrollRef} />

      <Suspense fallback={null}>
        <ProductModel path="/models/parfum.glb" worldY={PRODUCT_Y[0]} />
        <ProductModel path="/models/bougie.glb" worldY={PRODUCT_Y[1]} />
        <ProductModel path="/models/bague.glb"  worldY={PRODUCT_Y[2]} />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/models/parfum.glb')
useGLTF.preload('/models/bougie.glb')
useGLTF.preload('/models/bague.glb')
