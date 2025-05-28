"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface Hobby {
  title: string
  description: string
  image: string
  icon: React.ReactNode
  color: string
}

export const HobbyCard = ({
  hobby,
  className,
}: {
  hobby: Hobby
  className?: string
}) => {
  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-neutral-200 hover:shadow-xl transition-all duration-300",
        className,
      )}
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={hobby.image || "/placeholder.svg"}
          alt={hobby.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Icon */}
        <div className={cn("absolute top-4 right-4 p-3 rounded-full bg-gradient-to-r text-white", hobby.color)}>
          {hobby.icon}
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{hobby.title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-neutral-600 text-sm leading-relaxed">{hobby.description}</p>
      </div>
    </motion.div>
  )
}
