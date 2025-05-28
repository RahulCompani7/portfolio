"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useRef, useState } from "react"

interface TextRevealCardProps {
  text: string
  revealText: string
  children?: React.ReactNode
  className?: string
  gradient?: string
}

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
  gradient = "from-blue-500 to-pink-500",
}: TextRevealCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    setPosition({ x, y })
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden rounded-xl p-8 group", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          gradient,
        )}
        style={{
          transform: `translateX(${position.x * 25}px) translateY(${position.y * 25}px)`,
        }}
      />
      <div className="relative z-10">
        <div className="text-2xl font-bold text-center mb-4">{text}</div>
        <div
          className={cn(
            "text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300 text-center",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          )}
        >
          {revealText}
        </div>
      </div>
      <div className="relative z-10 mt-4">{children}</div>
    </div>
  )
}
