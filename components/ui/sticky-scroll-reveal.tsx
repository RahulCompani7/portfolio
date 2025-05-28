"use client"

import type React from "react"

import { useRef, useState } from "react"
import { useMotionValueEvent, useScroll } from "framer-motion"
import { motion } from "framer-motion"

interface StickyScrollProps {
  content: {
    title: string
    description: string
  }[]
  contentClassName?: string
}

export const StickyScroll = ({ content, contentClassName }: StickyScrollProps) => {
  const [activeCard, setActiveCard] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end end"],
  })

  const cardLength = content.length

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength)
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint)
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index
      }
      return acc
    }, 0)
    setActiveCard(closestBreakpointIndex)
  })

  return (
    <motion.div ref={ref} className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-4">
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={index} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-slate-800"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-lg text-slate-600 mt-4"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

interface StickyScrollRevealProps {
  items: {
    title: React.ReactNode
    description: React.ReactNode
  }[]
}

export const StickyScrollReveal = ({ items }: StickyScrollRevealProps) => {
  const [activeItem, setActiveItem] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const itemHeight = 1 / items.length
    const newActiveItem = Math.min(items.length - 1, Math.max(0, Math.floor(latest / itemHeight)))
    setActiveItem(newActiveItem)
  })

  return (
    <div ref={ref} className="w-full relative">
      <div className="sticky top-20 h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            className="bg-white rounded-xl shadow-xl p-8"
            key={activeItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {items[activeItem].title}
            <div className="mt-6">{items[activeItem].description}</div>
          </motion.div>
        </div>
      </div>
      <div style={{ height: `${items.length * 100}vh` }} />
    </div>
  )
}
