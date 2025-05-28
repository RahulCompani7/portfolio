"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  ...otherProps
}: {
  children: React.ReactNode
  duration?: number
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("relative overflow-hidden rounded-full p-[4px] bg-transparent", className)} {...otherProps}>
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, #3B82F6, #8B5CF6, #EC4899, #3B82F6)",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: duration / 1000,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <div className="relative z-10 rounded-full bg-white">{children}</div>
    </div>
  )
}
