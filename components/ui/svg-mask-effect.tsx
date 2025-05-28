"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export const SVGMaskEffect = ({
  src,
  title,
  description,
  className,
}: {
  src: string
  title: string
  description: string
  className?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting)
        },
        { threshold: 0.1 },
      )

      observer.observe(containerRef.current)
      return () => observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-xl", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 z-10"
      >
        <img src={src || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      </motion.div>

      <svg className="absolute inset-0 z-20 w-full h-full">
        <defs>
          <mask id="mask">
            <rect width="100%" height="100%" fill="white" />
            <motion.circle
              cx="50%"
              cy="50%"
              r={isHovered ? "60%" : "0%"}
              fill="black"
              initial={false}
              animate={{ r: isHovered ? "60%" : "0%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </mask>
        </defs>

        <foreignObject width="100%" height="100%" mask="url(#mask)">
          <div className="w-full h-full bg-black/70 flex flex-col items-center justify-center p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
            <p className="text-gray-200">{description}</p>
          </div>
        </foreignObject>
      </svg>
    </div>
  )
}
