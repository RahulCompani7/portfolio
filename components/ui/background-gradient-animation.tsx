"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

export const BackgroundGradientAnimation = ({
  className,
}: {
  className?: string
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let gradients: Gradient[] = []
    const gradientCount = 5

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initGradients()
    }

    class Gradient {
      x: number
      y: number
      radius: number
      color1: string
      color2: string
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 300 + 200
        this.color1 = this.getRandomColor(0.2)
        this.color2 = this.getRandomColor(0)
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
      }

      getRandomColor(alpha: number): string {
        const colors = [
          `rgba(255, 182, 193, ${alpha})`, // Light pink
          `rgba(173, 216, 230, ${alpha})`, // Light blue
          `rgba(240, 230, 140, ${alpha})`, // Light yellow
          `rgba(144, 238, 144, ${alpha})`, // Light green
          `rgba(221, 160, 221, ${alpha})`, // Light purple
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < -this.radius) this.x = canvas.width + this.radius
        if (this.x > canvas.width + this.radius) this.x = -this.radius
        if (this.y < -this.radius) this.y = canvas.height + this.radius
        if (this.y > canvas.height + this.radius) this.y = -this.radius
      }

      draw() {
        if (!ctx) return
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
        gradient.addColorStop(0, this.color1)
        gradient.addColorStop(1, this.color2)

        ctx.globalCompositeOperation = "lighter"
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const initGradients = () => {
      gradients = []
      for (let i = 0; i < gradientCount; i++) {
        gradients.push(new Gradient())
      }
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const gradient of gradients) {
        gradient.update()
        gradient.draw()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className={cn("absolute inset-0 w-full h-full", className)} />
}
