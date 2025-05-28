"use client"

import { cn } from "@/lib/utils"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { useState } from "react"

interface DraggableCardProps {
  title: string
  description: string
  image: string
  initialPosition: {
    x: number
    y: number
  }
  className?: string
}

export const DraggableCard = ({ title, description, image, initialPosition, className }: DraggableCardProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const x = useMotionValue(initialPosition.x)
  const y = useMotionValue(initialPosition.y)

  const rotateX = useTransform(y, [0, 300], [10, -10])
  const rotateY = useTransform(x, [0, 300], [-10, 10])

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      whileDrag={{ scale: 1.1, zIndex: 10 }}
      style={{ x, y, rotateX, rotateY }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className={cn(
        "absolute cursor-grab active:cursor-grabbing bg-white rounded-xl overflow-hidden shadow-lg w-64",
        isDragging ? "z-50 shadow-xl" : "z-0",
        className,
      )}
    >
      <div className="h-32 overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-thin mb-2">{title}</h3>
        <p className="text-sm text-gray-600 font-thin">{description}</p>
      </div>
    </motion.div>
  )
}
