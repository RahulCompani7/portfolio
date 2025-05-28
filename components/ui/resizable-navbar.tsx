"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform } from "framer-motion"

export const ResizablePanel = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const { scrollY } = useScroll()
  const height = useTransform(scrollY, [0, 100], [80, 60])
  const opacity = useTransform(scrollY, [0, 100], [1, 0.8])
  const background = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.9)"])
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 0 0 rgba(0, 0, 0, 0)", "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"],
  )

  return (
    <motion.div
      style={{ height, background, boxShadow }}
      className={cn("w-full transition-all duration-200", className)}
    >
      <motion.div style={{ opacity }} className="h-full">
        {children}
      </motion.div>
    </motion.div>
  )
}
