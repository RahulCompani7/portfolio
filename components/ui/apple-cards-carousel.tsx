"use client"

import { cn } from "@/lib/utils"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useRef, useState } from "react"

interface AppleCardsCarouselProps {
  items: {
    title: string
    description: string
    image: string
  }[]
  className?: string
}

export const AppleCardsCarousel = ({ items, className }: AppleCardsCarouselProps) => {
  const [activeCard, setActiveCard] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const springConfig = { damping: 30, stiffness: 200 }
  const springX = useSpring(x, springConfig)

  const handleDragEnd = () => {
    const containerWidth = containerRef.current?.offsetWidth || 0
    const cardWidth = containerWidth / items.length
    const draggedDistance = x.get()

    if (draggedDistance < -cardWidth / 4 && activeCard < items.length - 1) {
      setActiveCard(activeCard + 1)
    } else if (draggedDistance > cardWidth / 4 && activeCard > 0) {
      setActiveCard(activeCard - 1)
    }

    x.set(0)
  }

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden w-full h-[400px]", className)}>
      <motion.div
        className="flex items-center h-full"
        style={{ x: springX }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={cn(
              "relative min-w-full h-full px-4 transition-all duration-300",
              activeCard === index ? "opacity-100 scale-100" : "opacity-50 scale-90",
            )}
            animate={{
              scale: activeCard === index ? 1 : 0.9,
              opacity: activeCard === index ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
              <div className="h-48 overflow-hidden">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-xl font-thin mb-2">{item.title}</h3>
                <p className="text-gray-600 font-thin">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveCard(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              activeCard === index ? "bg-gray-800 w-4" : "bg-gray-300",
            )}
          />
        ))}
      </div>
    </div>
  )
}
