'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  baseX: number
  baseY: number
}

interface Mouse {
  x: number
  y: number
}

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const mouseRef = useRef<Mouse>({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: e.clientX,
      y: e.clientY
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configuration
    const particleCount = 100
    const maxDistance = 150
    const speed = 0.4
    const mouseRadius = 100

    // Fonction pour redimensionner le canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initialiser les particules
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particlesRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * 2 + 0.5
        })
      }
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Mettre à jour et dessiner les particules
      particlesRef.current.forEach((particle, i) => {
        // Mouvement de base
        particle.baseX += particle.vx
        particle.baseY += particle.vy

        // Rebond sur les bords
        if (particle.baseX <= 0 || particle.baseX >= canvas.width) particle.vx *= -1
        if (particle.baseY <= 0 || particle.baseY >= canvas.height) particle.vy *= -1

        // Garder dans les limites
        particle.baseX = Math.max(0, Math.min(canvas.width, particle.baseX))
        particle.baseY = Math.max(0, Math.min(canvas.height, particle.baseY))

        // Interaction avec la souris
        const dx = mouseRef.current.x - particle.baseX
        const dy = mouseRef.current.y - particle.baseY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius
          const angle = Math.atan2(dy, dx)
          particle.x = particle.baseX - Math.cos(angle) * force * 30
          particle.y = particle.baseY - Math.sin(angle) * force * 30
        } else {
          // Retour vers la position de base
          particle.x += (particle.baseX - particle.x) * 0.05
          particle.y += (particle.baseY - particle.y) * 0.05
        }

        // Dessiner la particule avec un effet de glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        )
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)')
        gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.4)')
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Point central plus brillant
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(147, 197, 253, 0.9)'
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
            
            // Opacité basée sur la distance
            const opacity = (1 - distance / maxDistance) * 0.4
            
            // Gradient pour les lignes
            const lineGradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            )
            lineGradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`)
            lineGradient.addColorStop(0.5, `rgba(147, 197, 253, ${opacity * 0.8})`)
            lineGradient.addColorStop(1, `rgba(59, 130, 246, ${opacity})`)
            
            ctx.strokeStyle = lineGradient
            ctx.lineWidth = 1
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
    window.addEventListener('resize', () => {
      resizeCanvas()
      initParticles()
    })
    
    window.addEventListener('mousemove', handleMouseMove)

    // Nettoyage
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: 1,
        background: 'transparent'
      }}
    />
  )
}