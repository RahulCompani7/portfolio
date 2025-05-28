"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

export const Spotlight = ({
  className,
  fill = "white",
}: {
  className?: string
  fill?: string
}) => {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const spotlight = spotlightRef.current
    if (!spotlight) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      spotlight.style.background = `radial-gradient(600px circle at ${clientX}px ${clientY}px, ${fill}15, transparent 40%)`
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [fill])

  return (
    <div
      ref={spotlightRef}
      className={cn("pointer-events-none absolute inset-0 z-0 transition-all duration-300", className)}
    />
  )
}
