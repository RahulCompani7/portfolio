"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export const ColorfulText = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <motion.h2 className={cn("text-2xl font-bold relative", className)} whileHover={{ scale: 1.05 }}>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 animate-gradient-x">
        {children}
      </span>
    </motion.h2>
  )
}
