'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles() {
  const pointsRef = useRef<THREE.Points>(null)
  const { size } = useThree()
  
  // Mouse tracking
  const mouse = useRef({ x: 0, y: 0 })
  const mouseVel = useRef({ x: 0, y: 0 })
  const prevMouse = useRef({ x: 0, y: 0 })

  const particleCount = 300

  // Create energy streak texture (elongated glow)
  const streakTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 32
    const ctx = canvas.getContext('2d')!
    
    // Create horizontal gradient for streak effect
    const gradient = ctx.createLinearGradient(0, 16, 128, 16)
    gradient.addColorStop(0, 'rgba(147, 197, 253, 0)') // transparent blue
    gradient.addColorStop(0.3, 'rgba(96, 165, 250, 0.8)') // bright blue
    gradient.addColorStop(0.7, 'rgba(59, 130, 246, 0.6)') // soft blue
    gradient.addColorStop(1, 'rgba(37, 99, 235, 0)') // fade to transparent
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 128, 32)
    
    // Add soft glow blur effect
    ctx.filter = 'blur(4px)'
    ctx.globalCompositeOperation = 'lighter'
    ctx.fillRect(0, 0, 128, 32)
    
    const texture = new THREE.CanvasTexture(canvas)
    return texture
  }, [])

  // Energy streak particle data
  const particleData = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const baseRadius = new Float32Array(particleCount)
    const angle = new Float32Array(particleCount)
    const speed = new Float32Array(particleCount)
    const orbitSpeed = new Float32Array(particleCount)
    const noisePhase = new Float32Array(particleCount)
    const depth = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Start from center and expand outward
      baseRadius[i] = (i / particleCount) * 5 // distributed from 0 to 5
      angle[i] = Math.random() * Math.PI * 2
      speed[i] = 0.001 + Math.random() * 0.002 // varied speeds
      orbitSpeed[i] = 0.3 + Math.random() * 0.4 // circular/spiral speed
      noisePhase[i] = Math.random() * 1000
      depth[i] = (Math.random() - 0.5) * 1.5
      
      // Size based on distance from center (small in middle, larger at edges)
      sizes[i] = 0.05 + (i / particleCount) * 0.4 // 0.05 to 0.45

      // Initialize positions
      positions[i * 3] = Math.cos(angle[i]) * baseRadius[i]
      positions[i * 3 + 1] = Math.sin(angle[i]) * baseRadius[i]
      positions[i * 3 + 2] = depth[i]
    }

    return { positions, sizes, baseRadius, angle, speed, orbitSpeed, noisePhase, depth }
  }, [])  // Clean, smooth particle animation
  useFrame((state) => {
    if (!pointsRef.current) return

    const t = state.clock.elapsedTime
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

    // Track mouse position
    const normalizedX = (mouse.current.x / size.width) * 2 - 1
    const normalizedY = -(mouse.current.y / size.height) * 2 + 1
    const mouseX = normalizedX * 7
    const mouseY = normalizedY * 5

    // Calculate mouse velocity
    mouseVel.current.x += (normalizedX - prevMouse.current.x) * 0.2
    mouseVel.current.y += (normalizedY - prevMouse.current.y) * 0.2
    
    mouseVel.current.x *= 0.85
    mouseVel.current.y *= 0.85
    
    prevMouse.current.x = normalizedX
    prevMouse.current.y = normalizedY

    const sizes = pointsRef.current.geometry.attributes.size.array as Float32Array

    for (let i = 0; i < particleCount; i++) {
      // Keep particles evenly distributed on circle
      const anglePosition = particleData.angle[i]
      
      // Enhanced wavy motion - multiple wave layers
      const minRadius = 1.8
      const maxRadius = 3.5
      
      // Primary wave - travels around the circle
      const wave1 = Math.sin(t * 1.5 + anglePosition * 3) * 0.5 + 0.5 // Fast wave
      
      // Secondary wave - opposite direction
      const wave2 = Math.sin(t * 0.9 - anglePosition * 2.5) * 0.3 // Counter-rotating
      
      // Tertiary wave - slow breathing
      const wave3 = Math.sin(t * 0.6) * 0.4 // Global pulse
      
      // Combine waves for complex motion
      const waveAmplitude = wave1 + wave2 + wave3
      const currentRadius = minRadius + waveAmplitude * (maxRadius - minRadius)
      
      // Calculate position
      let x = Math.cos(anglePosition) * currentRadius
      let y = Math.sin(anglePosition) * currentRadius
      
      // Strong perpendicular wave (creates S-curves)
      const perpWave = Math.sin(t * 2.5 + anglePosition * 4) * 0.35
      x += Math.cos(anglePosition + Math.PI / 2) * perpWave
      y += Math.sin(anglePosition + Math.PI / 2) * perpWave
      
      // Flowing undulation
      const flowX = Math.sin(t * 1.8 + anglePosition) * 0.25
      const flowY = Math.cos(t * 2.2 + anglePosition * 1.3) * 0.25
      x += flowX
      y += flowY
      
      // Move entire circle with mouse (smooth trailing)
      x += mouseX * 0.4
      y += mouseY * 0.4
      
      // Calculate distance from mouse
      const dx = x - mouseX
      const dy = y - mouseY
      const distFromMouse = Math.sqrt(dx * dx + dy * dy)
      
      // Calculate if particle is on the mouse side
      const particleAngle = Math.atan2(y, x)
      const mouseAngle = Math.atan2(mouseY, mouseX)
      let angleDiff = particleAngle - mouseAngle
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2
      
      const isMouseSide = Math.abs(angleDiff) < Math.PI / 2
      
      // Push particles out on mouse side, pull in on opposite side
      if (isMouseSide && distFromMouse < 4) {
        const pushStrength = (1 - distFromMouse / 4) * 0.6
        x += (dx / distFromMouse) * pushStrength
        y += (dy / distFromMouse) * pushStrength
      } else if (!isMouseSide) {
        const pullStrength = 0.12
        const angleToCenter = Math.atan2(-y, -x)
        x += Math.cos(angleToCenter) * pullStrength
        y += Math.sin(angleToCenter) * pullStrength
      }
      
      // Dynamic sizing based on wave position - much tinier
      const radiusProgress = (currentRadius - minRadius) / (maxRadius - minRadius)
      const normalizedProgress = Math.max(0, Math.min(1, radiusProgress))
      
      // Add multiple size wave effects
      const sizeWave1 = Math.sin(t * 3.5 + anglePosition * 3) * 0.12 + 1
      const sizeWave2 = Math.sin(t * 2.8 - anglePosition * 2) * 0.08 + 1
      const sizeGrowth = Math.pow(normalizedProgress, 0.8)
      const targetSize = (0.001 + sizeGrowth * 0.18) * sizeWave1 * sizeWave2 // 0.001 to 0.19 (much smaller)
      
      particleData.sizes[i] += (targetSize - particleData.sizes[i]) * 0.15
      sizes[i] = particleData.sizes[i]
      
      // Z-axis depth with multiple wave layers
      const z = particleData.depth[i] + 
                Math.sin(t * 0.8 + anglePosition * 2.5) * 0.5 +
                Math.cos(t * 2.2 + anglePosition * 1.8) * 0.3 +
                Math.sin(t * 1.5 - anglePosition) * 0.2

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }

    pointsRef.current.geometry.attributes.size.needsUpdate = true

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
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={particleData.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        color="#3b82f6"
        map={streakTexture}
        transparent
        opacity={0.75}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  )
}
