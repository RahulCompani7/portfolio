"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SparkleType {
  id: string
  createdAt: number
  size: number
  style: {
    top: string
    left: string
    zIndex: number
  }
}

export const SparklesCore = ({
  id,
  background,
  minSize,
  maxSize,
  particleDensity,
  className,
  particleColor,
}: {
  id?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  className?: string
  particleColor?: string
}) => {
  const [sparkles, setSparkles] = useState<SparkleType[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = false
  const DEFAULT_PARTICLE_COLOR = particleColor || "#FFC700"

  useEffect(() => {
    if (prefersReducedMotion) return

    const generateSparkle = () => {
      const containerWidth = containerRef.current?.offsetWidth || 0
      const containerHeight = containerRef.current?.offsetHeight || 0

      return {
        id: Math.random().toString(36).slice(2),
        createdAt: Date.now(),
        size: Math.random() * (maxSize || 20 - (minSize || 10)) + (minSize || 10),
        style: {
          top: Math.random() * containerHeight + "px",
          left: Math.random() * containerWidth + "px",
          zIndex: Math.floor(Math.random() * 3),
        },
      }
    }

    const density = particleDensity || 1
    let sparkleCount =
      Math.floor(((containerRef.current?.offsetWidth || 0) * (containerRef.current?.offsetHeight || 0)) / 10000) *
      density

    // Ensure a minimum number of sparkles
    sparkleCount = Math.max(sparkleCount, 10)

    // Create initial sparkles
    const initialSparkles = Array.from({ length: sparkleCount }, () => generateSparkle())
    setSparkles(initialSparkles)

    // Set up interval to add new sparkles
    const interval = setInterval(() => {
      setSparkles((currentSparkles) => {
        const now = Date.now()
        const filtered = currentSparkles.filter((sparkle) => now - sparkle.createdAt < 1000)

        if (filtered.length < sparkleCount) {
          return [...filtered, generateSparkle()]
        }

        return filtered
      })
    }, 100)

    return () => clearInterval(interval)
  }, [prefersReducedMotion, maxSize, minSize, particleDensity, particleColor])

  return (
    <div
      ref={containerRef}
      id={id}
      className={cn("w-full h-full absolute inset-0 -z-10", className)}
      style={{
        background,
      }}
    >
      {sparkles.map((sparkle) => (
        <Sparkle key={sparkle.id} color={DEFAULT_PARTICLE_COLOR} size={sparkle.size} style={sparkle.style} />
      ))}
    </div>
  )
}

const Sparkle = ({
  color,
  size,
  style,
}: {
  color: string
  size: number
  style: {
    top: string
    left: string
    zIndex: number
  }
}) => {
  const path = `M${size / 2} 0 L${size / 2.5} ${size / 2.5} L0 ${size / 2} L${size / 2.5} ${size / 1.5} L${size / 2} ${size} L${size / 1.5} ${size / 1.5} L${size} ${size / 2} L${size / 1.5} ${size / 2.5} Z`

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        ...style,
        position: "absolute",
      }}
      initial={{ scale: 0, rotate: 0 }}
      animate={{ scale: 1, rotate: 180 }}
      exit={{ scale: 0, rotate: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <path d={path} fill={color} />
    </motion.svg>
  )
}
