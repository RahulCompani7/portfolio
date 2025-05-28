"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

export const GlowingStarsBackgroundCard = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const [mouseEnter, setMouseEnter] = useState(false)

  return (
    <div
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/[0.3] p-2 group",
        containerClassName,
      )}
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
    >
      <div className="absolute inset-0 z-0">
        <StarField mouseEnter={mouseEnter} />
      </div>
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  )
}

const StarField = ({ mouseEnter }: { mouseEnter: boolean }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; alpha: number }>>([])

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect()
        const stars = []
        const count = 20
        for (let i = 0; i < count; i++) {
          const x = Math.random() * width
          const y = Math.random() * height
          const size = Math.random() * 1 + 0.5
          const alpha = Math.random() * 0.5 + 0.5
          stars.push({ x, y, size, alpha })
        }
        setStars(stars)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 rounded-full overflow-hidden">
      {stars.map((star, index) => (
        <div
          key={index}
          className={cn(
            "absolute rounded-full bg-white transition-all duration-300",
            mouseEnter ? "opacity-100 scale-110" : "opacity-50",
          )}
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.alpha,
          }}
        />
      ))}
    </div>
  )
}
