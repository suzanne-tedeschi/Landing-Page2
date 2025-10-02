'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

interface ConstellationBackgroundProps {
  height?: string
  density?: number
  speed?: number
}

export default function ConstellationBackgroundExtended({ 
  height = "100vh", 
  density = 80,
  speed = 0.8 
}: ConstellationBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configuration pour extension
    const particleCount = density
    const maxDistance = 120

    // Fonction pour redimensionner le canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    // Initialiser les particules
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed * (0.4 + Math.random() * 0.8),
          vy: (Math.random() - 0.5) * speed * (0.4 + Math.random() * 0.8),
          size: Math.random() * 2 + 0.3
        })
      }
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Mettre à jour et dessiner les particules
      particlesRef.current.forEach((particle, i) => {
        // Mouvement
        particle.x += particle.vx
        particle.y += particle.vy

        // Rebond sur les bords
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1

        // Garder dans les limites
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Dessiner la particule avec effet de glow
        const glowIntensity = 0.5 + Math.sin(Date.now() * 0.001 + i) * 0.15
        
        // Halo externe très subtil
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${glowIntensity * 0.08})`
        ctx.fill()
        
        // Point principal
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${glowIntensity * 0.6})`
        ctx.fill()

        // Dessiner les connexions
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            
            // Opacité très subtile
            const baseOpacity = (1 - distance / maxDistance) * 0.12
            const pulseOpacity = Math.sin(Date.now() * 0.002) * 0.03
            const opacity = baseOpacity + pulseOpacity
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, opacity)})`
            ctx.lineWidth = 0.4
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // Initialisation
    resizeCanvas()
    initParticles()
    animate()

    // Event listeners
    const handleResize = () => {
      resizeCanvas()
      initParticles()
    }

    window.addEventListener('resize', handleResize)

    // Nettoyage
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [density, speed])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: 1,
        background: 'transparent',
        height: height
      }}
    />
  )
}