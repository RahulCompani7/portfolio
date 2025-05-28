"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export const GradientCard = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <motion.div
      className={cn("relative overflow-hidden rounded-2xl bg-white shadow-xl border border-neutral-200", className)}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-green-50/50" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
