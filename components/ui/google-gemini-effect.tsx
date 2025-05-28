"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const GoogleGeminiEffect = ({
  className,
  imageUrl,
  pathLengths = [0.2, 0.4, 0.6],
}: {
  className?: string
  imageUrl: string
  pathLengths?: number[]
}) => {
  const [paths, setPaths] = useState<SVGPathElement[]>([])
  const [isInView, setIsInView] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (svgRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting)
        },
        { threshold: 0.1 },
      )

      observer.observe(svgRef.current)
      return () => observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (svgRef.current) {
      const svgPaths = Array.from(svgRef.current.querySelectorAll("path"))
      setPaths(svgPaths)
      setDimensions({
        width: svgRef.current.clientWidth,
        height: svgRef.current.clientHeight,
      })
    }
  }, [])

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute inset-0 z-10"
      >
        <img src={imageUrl || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover rounded-2xl" />
      </motion.div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${dimensions.width || 400} ${dimensions.height || 400}`}
        className="absolute inset-0 z-20 w-full h-full"
      >
        <defs>
          <clipPath id="clip">
            {paths.map((_, index) => (
              <motion.path
                key={index}
                d={generateRandomPath(dimensions.width || 400, dimensions.height || 400)}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isInView ? pathLengths[index % pathLengths.length] : 0 }}
                transition={{ duration: 2, delay: index * 0.5 }}
              />
            ))}
          </clipPath>
        </defs>

        <g clipPath="url(#clip)">
          <foreignObject width="100%" height="100%">
            <div className="w-full h-full">
              <img src={imageUrl || "/placeholder.svg"} alt="Clipped Profile" className="w-full h-full object-cover" />
            </div>
          </foreignObject>
        </g>

        {paths.map((_, index) => (
          <motion.path
            key={`stroke-${index}`}
            d={generateRandomPath(dimensions.width || 400, dimensions.height || 400)}
            fill="none"
            stroke="white"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0.5 }}
            animate={{ pathLength: isInView ? pathLengths[index % pathLengths.length] : 0 }}
            transition={{ duration: 2, delay: index * 0.5 }}
          />
        ))}
      </svg>
    </div>
  )
}

const generateRandomPath = (width: number, height: number) => {
  const startX = Math.random() * width
  const startY = Math.random() * height
  const endX = Math.random() * width
  const endY = Math.random() * height
  const controlX1 = Math.random() * width
  const controlY1 = Math.random() * height
  const controlX2 = Math.random() * width
  const controlY2 = Math.random() * height

  return `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`
}
