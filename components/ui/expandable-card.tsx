"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useState } from "react"

interface ExpandableCardProps {
  title: string
  description: string
  image: string
  className?: string
}

export const ExpandableCard = ({ title, description, image, className }: ExpandableCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      layout
      className={cn(
        "bg-white rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300",
        className,
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <motion.div layout className="relative">
        <motion.img
          layout
          src={image}
          alt={title}
          className={cn("w-full object-cover transition-all duration-300", isExpanded ? "h-48" : "h-40")}
        />
        <motion.div layout className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <motion.h3 layout className="absolute bottom-4 left-4 text-white text-xl font-thin">
          {title}
        </motion.h3>
      </motion.div>

      <motion.div
        layout
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.p
          layout
          className={cn(
            "text-gray-600 font-thin overflow-hidden transition-all duration-300",
            isExpanded ? "h-auto" : "h-0 opacity-0",
          )}
        >
          {description}
        </motion.p>

        <motion.div layout className="mt-4 flex justify-end">
          <motion.button layout className="text-sm text-gray-500 font-thin">
            {isExpanded ? "Show less" : "Learn more"}
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
