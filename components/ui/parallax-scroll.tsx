"use client"

import { cn } from "@/lib/utils"
import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"

interface ParallaxScrollProps {
  images: {
    url: string
    title: string
  }[]
  className?: string
}

export const ParallaxScroll = ({ images, className }: ParallaxScrollProps) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  })

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200])
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200])
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200])

  const rotateFirst = useTransform(scrollYProgress, [0, 0.5], [15, -15])
  const rotateSecond = useTransform(scrollYProgress, [0, 0.5], [-15, 15])
  const rotateThird = useTransform(scrollYProgress, [0, 0.5], [15, -15])

  const opacityFirst = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.5])
  const opacitySecond = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.5])
  const opacityThird = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.5])

  const firstRow = images.slice(0, Math.ceil(images.length / 3))
  const secondRow = images.slice(Math.ceil(images.length / 3), Math.ceil((images.length / 3) * 2))
  const thirdRow = images.slice(Math.ceil((images.length / 3) * 2))

  return (
    <div
      className={cn("relative flex h-[40rem] flex-col items-center justify-start overflow-hidden", className)}
      ref={gridRef}
    >
      <motion.div
        style={{
          y: translateFirst,
          rotate: rotateFirst,
          opacity: opacityFirst,
        }}
        className="flex flex-row items-start gap-4 px-4"
      >
        {firstRow.map((image, idx) => (
          <div key={idx} className="relative h-80 w-60 overflow-hidden rounded-lg">
            <img src={image.url || "/placeholder.svg"} alt={image.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-lg font-thin">{image.title}</p>
            </div>
          </div>
        ))}
      </motion.div>
      <motion.div
        style={{
          y: translateSecond,
          rotate: rotateSecond,
          opacity: opacitySecond,
        }}
        className="mt-4 flex flex-row items-start gap-4 px-4"
      >
        {secondRow.map((image, idx) => (
          <div key={idx} className="relative h-80 w-60 overflow-hidden rounded-lg">
            <img src={image.url || "/placeholder.svg"} alt={image.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-lg font-thin">{image.title}</p>
            </div>
          </div>
        ))}
      </motion.div>
      <motion.div
        style={{
          y: translateThird,
          rotate: rotateThird,
          opacity: opacityThird,
        }}
        className="mt-4 flex flex-row items-start gap-4 px-4"
      >
        {thirdRow.map((image, idx) => (
          <div key={idx} className="relative h-80 w-60 overflow-hidden rounded-lg">
            <img src={image.url || "/placeholder.svg"} alt={image.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-lg font-thin">{image.title}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
