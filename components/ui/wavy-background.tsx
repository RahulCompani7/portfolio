"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
  colors?: string[]
  waveWidth?: number
  backgroundFill?: string
  blur?: number
  speed?: "slow" | "fast"
  waveOpacity?: number
  [key: string]: any
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [waveColors, setWaveColors] = useState<string[]>(
    colors || ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"],
  )
  const [wavesNumber, setWavesNumber] = useState(5)
  const [actualWaveWidth, setActualWaveWidth] = useState(waveWidth || 50)
  const [waveSpeed, setWaveSpeed] = useState(speed === "fast" ? 15 : 30)

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const waveCount = Math.ceil(containerWidth / actualWaveWidth) + 1
      setWavesNumber(waveCount)
    }
  }, [actualWaveWidth])

  const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const createSVGWave = (color: string, index: number) => {
    const waveWidth = actualWaveWidth
    const points = []
    const randomHeight = randomNumber(waveWidth / 2, waveWidth)
    const randomStart = randomNumber(0, waveWidth)

    for (let i = 0; i <= wavesNumber; i++) {
      const point = {
        x: i * waveWidth + randomStart,
        y: i % 2 === 0 ? randomHeight : 0,
      }
      points.push(point)
    }

    const pathData = points
      .map((point, i) => {
        const control1X = point.x + waveWidth / 4
        const control1Y = point.y
        const control2X = point.x + (3 * waveWidth) / 4
        const control2Y = points[(i + 1) % points.length]?.y || 0
        const endX = points[(i + 1) % points.length]?.x || 0
        const endY = points[(i + 1) % points.length]?.y || 0

        return `C ${control1X},${control1Y} ${control2X},${control2Y} ${endX},${endY}`
      })
      .join(" ")

    return (
      <path
        key={index}
        d={`M ${points[0].x},${points[0].y} ${pathData}`}
        fill="none"
        stroke={color}
        strokeWidth="2"
        style={{
          animation: `wave-animation ${waveSpeed}s linear infinite`,
          animationDelay: `${index * 0.5}s`,
          opacity: waveOpacity,
        }}
      />
    )
  }

  return (
    <div
      className={cn("relative flex flex-col items-center justify-center overflow-hidden", containerClassName)}
      ref={containerRef}
      {...props}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        style={{
          filter: `blur(${blur}px)`,
          background: backgroundFill || "transparent",
        }}
        viewBox={`0 0 ${wavesNumber * actualWaveWidth} 200`}
        preserveAspectRatio="none"
      >
        {waveColors.map((color, index) => createSVGWave(color, index))}
      </svg>
      <div className={cn("relative z-10", className)}>{children}</div>

      <style jsx>{`
        @keyframes wave-animation {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${actualWaveWidth}px);
          }
        }
      `}</style>
    </div>
  )
}
