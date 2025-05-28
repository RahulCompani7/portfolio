"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useState } from "react"

interface Card {
  title: string
  description: string
  image: string
}

export const ThreeDCardDemo = ({
  cards,
  className,
}: {
  cards: Card[]
  className?: string
}) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
      {cards.map((card, i) => (
        <ThreeDCard key={i} card={card} />
      ))}
    </div>
  )
}

const ThreeDCard = ({ card }: { card: Card }) => {
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x)
  const mouseY = useSpring(y)

  const rotateX = useTransform(mouseY, [-100, 100], [30, -30])
  const rotateY = useTransform(mouseX, [-100, 100], [-30, 30])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct * 100)
    y.set(yPct * 100)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      className="relative w-full h-72 rounded-xl"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05 }}
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 rounded-xl overflow-hidden shadow-xl"
      >
        <img
          src={card.image || "/placeholder.svg"}
          alt={card.title}
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div
          style={{
            transform: "translateZ(50px)",
          }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4"
        >
          <h3
            style={{
              transform: "translateZ(25px)",
            }}
            className="text-xl font-bold text-white"
          >
            {card.title}
          </h3>
          <p
            style={{
              transform: "translateZ(25px)",
            }}
            className="text-sm text-white/80"
          >
            {card.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
