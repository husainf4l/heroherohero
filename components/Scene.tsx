'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Particles from './Particles'

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
    </Canvas>
  )
}
