'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles() {
  const pointsRef = useRef<THREE.Points>(null)
  const { size } = useThree()
  
  // Mouse tracking
  const mouse = useRef({ x: 0, y: 0 })
  const mouseVel = useRef({ x: 0, y: 0 })
  const prevMouse = useRef({ x: 0, y: 0 })

  // Load texture
  const texture = useLoader(THREE.TextureLoader, '/streak.png')

  const particleCount = 400

  // Pre-generate particle data
  const particleData = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const baseRadius = new Float32Array(particleCount)
    const angle = new Float32Array(particleCount)
    const angularSpeed = new Float32Array(particleCount)
    const radialPhase = new Float32Array(particleCount)
    const noisePhase = new Float32Array(particleCount)
    const depth = new Float32Array(particleCount)
    const mouseInfluence = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Radial distribution with center clustering (power function)
      baseRadius[i] = Math.pow(Math.random(), 0.7) * 3.5
      
      // Initial angle
      angle[i] = Math.random() * Math.PI * 2
      
      // Angular speed with variation and random direction
      angularSpeed[i] = (0.0002 + Math.random() * 0.001) * (Math.random() > 0.5 ? 1 : -1)
      
      // Phase offsets for oscillations
      radialPhase[i] = Math.random() * Math.PI * 2
      noisePhase[i] = Math.random() * 100
      
      // Depth for parallax effect
      depth[i] = (Math.random() - 0.5) * 4
      
      // Per-particle mouse influence
      mouseInfluence[i] = 0.2 + Math.random() * 0.8
    }

    return { positions, baseRadius, angle, angularSpeed, radialPhase, noisePhase, depth, mouseInfluence }
  }, [])

  // Handle mouse movement
  useFrame((state) => {
    if (!pointsRef.current) return

    const t = state.clock.elapsedTime
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

    // Track mouse position in 3D space
    const normalizedX = (mouse.current.x / size.width) * 2 - 1
    const normalizedY = -(mouse.current.y / size.height) * 2 + 1
    const mouseX = normalizedX * 8
    const mouseY = normalizedY * 6

    // Calculate mouse velocity
    mouseVel.current.x += (normalizedX - prevMouse.current.x) * 0.3
    mouseVel.current.y += (normalizedY - prevMouse.current.y) * 0.3
    
    // Decay velocity slower for bubble effect
    mouseVel.current.x *= 0.95
    mouseVel.current.y *= 0.95
    
    prevMouse.current.x = normalizedX
    prevMouse.current.y = normalizedY

    // Very gentle constant rotation
    const globalSpin = 0.001

    for (let i = 0; i < particleCount; i++) {
      // Update angle for orbital motion (very slow)
      particleData.angle[i] += particleData.angularSpeed[i] + globalSpin

      // Layered breathing effect (very slow)
      const breathPhase = particleData.radialPhase[i]
      const breath1 = Math.sin(t * 0.05 + breathPhase) * 0.3
      const breath2 = Math.sin(t * 0.1 + breathPhase * 1.3) * 0.08
      const currentRadius = particleData.baseRadius[i] * (1 + breath1 + breath2)

      // Convert polar to cartesian
      let x = Math.cos(particleData.angle[i]) * currentRadius
      let y = Math.sin(particleData.angle[i]) * currentRadius

      // Add noise/wobble drift (very slow)
      const noiseSeed = particleData.noisePhase[i]
      x += Math.sin(t * 0.05 + noiseSeed) * 0.06
      y += Math.cos(t * 0.04 + noiseSeed) * 0.06

      // Follow mouse more strongly
      const followStrength = 0.3
      x += (mouseX - x) * followStrength * 0.15
      y += (mouseY - y) * followStrength * 0.15

      // Bubble repulsion when mouse is moving - stronger spread
      const dx = x - mouseX
      const dy = y - mouseY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const velocityMagnitude = Math.sqrt(mouseVel.current.x * mouseVel.current.x + mouseVel.current.y * mouseVel.current.y)
      
      if (distance < 7 && velocityMagnitude > 0.003) {
        const repelStrength = (1 - distance / 7) * velocityMagnitude * 30
        x += (dx / distance) * repelStrength
        y += (dy / distance) * repelStrength
      }

      // Z-axis depth oscillation (very slow)
      const z = particleData.depth[i] + Math.sin(t * 0.04 + noiseSeed) * 0.15

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  // Track mouse movement
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    })
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particleData.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        color="#0ea5e9"
        transparent
        opacity={0.6}
        sizeAttenuation
        alphaTest={0.3}
        blending={THREE.NormalBlending}
        depthWrite={false}
        map={texture}
      />
    </points>
  )
}
