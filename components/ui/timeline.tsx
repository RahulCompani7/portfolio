"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface TimelineItem {
  title: string
  description: string
  icon?: React.ReactNode
}

export const Timeline = ({
  items,
  className,
}: {
  items: TimelineItem[]
  className?: string
}) => {
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(timelineRef, { once: false, amount: 0.2 })

  return (
    <div ref={timelineRef} className={cn("relative mx-auto max-w-3xl", className)}>
      <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-green-400 to-yellow-400" />

      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className={cn("relative mb-12 flex items-center", index % 2 === 0 ? "flex-row" : "flex-row-reverse")}
        >
          <div className="flex-1">
            <div className={cn("relative rounded-lg bg-white p-6 shadow-lg", index % 2 === 0 ? "mr-10" : "ml-10")}>
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-600">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-600">{item.description}</p>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 z-10">
            {item.icon || (
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-yellow-400 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-white" />
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
