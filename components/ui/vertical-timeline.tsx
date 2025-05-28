"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface TimelineItem {
  title: string
  subtitle?: string
  date: string
  content: React.ReactNode
  icon?: React.ReactNode
}

export const VerticalTimeline = ({
  items,
  className,
}: {
  items: TimelineItem[]
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 to-yellow-400" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative flex items-start"
          >
            {/* Timeline dot */}
            <div className="absolute left-6 w-4 h-4 bg-white border-4 border-green-400 rounded-full z-10 flex items-center justify-center">
              {item.icon}
            </div>

            {/* Content */}
            <div className="ml-16 flex-1">
              <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                    {item.subtitle && <p className="text-neutral-600 font-medium">{item.subtitle}</p>}
                  </div>
                  <span className="text-sm text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">{item.date}</span>
                </div>
                {item.content}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
