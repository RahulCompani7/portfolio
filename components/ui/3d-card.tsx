"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useRef, useState } from "react"
import { motion } from "framer-motion"

interface Card3DProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

export const Card3D = ({ children, className, containerClassName }: Card3DProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isFocused) return

    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5

    setPosition({ x, y })
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
    setPosition({ x: 0, y: 0 })
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative w-full h-full bg-transparent rounded-xl transition duration-200 group perspective",
        containerClassName,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{
        transform: `rotateY(${position.x * 20}deg) rotateX(${position.y * -20}deg)`,
      }}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-blue-300 to-pink-300 rounded-xl group-hover:opacity-100 opacity-0 transition duration-500",
          "shadow-[0_0_0_6px_rgba(0,0,0,0.1)]",
        )}
        style={{
          opacity,
          transform: `translateZ(50px)`,
        }}
      />
      <div
        className={cn("relative h-full w-full rounded-xl overflow-hidden transition duration-200 z-10", className)}
        style={{
          transform: `translateZ(75px)`,
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}
