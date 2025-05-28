"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useState } from "react"

export const TextHoverEffect = ({
  text,
  className,
}: {
  text: string
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const words = text.split(" ")

  return (
    <div className={cn("w-fit mx-auto", className)}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          className="relative inline-block mr-2 cursor-pointer"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          whileHover={{ scale: 1.1 }}
        >
          {hoveredIndex === idx && (
            <motion.span
              layoutId="word-highlight"
              className="absolute inset-0 -z-10 rounded-md bg-gradient-to-r from-purple-200 to-pink-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
          {word}
        </motion.span>
      ))}
    </div>
  )
}
