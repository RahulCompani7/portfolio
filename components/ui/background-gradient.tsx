"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useRef, useState } from "react"

interface BackgroundGradientProps {
  className?: string
  containerClassName?: string
  children: React.ReactNode
}

export const BackgroundGradient = ({ className, containerClassName, children }: BackgroundGradientProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setPosition({ x, y })
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      <div
        className={cn("pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300", className)}
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x * 100}% ${position.y * 100}%, rgba(120, 119, 198, 0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  )
}
