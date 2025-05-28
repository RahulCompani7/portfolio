"use client"

import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export const ThreeDMarquee = ({
  images,
  className,
}: {
  images: string[]
  className?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15])
  const rotateY = useTransform(scrollYProgress, [0, 1], [-15, 15])
  const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 100, -100])

  return (
    <div ref={containerRef} className={cn("relative h-80 overflow-hidden", className)}>
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateZ,
          transformStyle: "preserve-3d",
          transformPerspective: 1000,
        }}
        className="absolute inset-0 flex items-center"
      >
        <div className="flex space-x-4 animate-marquee">
          {images.map((image, idx) => (
            <div
              key={idx}
              className="w-60 h-40 relative flex-shrink-0 rounded-lg overflow-hidden"
              style={{
                transform: `translateZ(${(idx % 3) * 20}px)`,
              }}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Marquee image ${idx}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {images.map((image, idx) => (
            <div
              key={`dup-${idx}`}
              className="w-60 h-40 relative flex-shrink-0 rounded-lg overflow-hidden"
              style={{
                transform: `translateZ(${(idx % 3) * 20}px)`,
              }}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Marquee image ${idx}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
