"use client"

import React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

export const HeroParallax = ({
  products,
  className,
}: {
  products: {
    title: string
    link: string
    thumbnail: string
  }[]
  className?: string
}) => {
  const firstRow = products.slice(0, 2)
  const secondRow = products.slice(2, 4)
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300])

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600">
          Featured Projects
        </h3>
        <p className="text-gray-600 mt-2">Some of my best work</p>
      </div>

      <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 mb-10" style={{ y: y1 }}>
        {firstRow.map((product) => (
          <ProductCard product={product} key={product.title} />
        ))}
      </motion.div>
      <motion.div className="flex flex-row space-x-10" style={{ y: y2 }}>
        {secondRow.map((product) => (
          <ProductCard product={product} key={product.title} />
        ))}
      </motion.div>
    </div>
  )
}

const ProductCard = ({
  product,
}: {
  product: {
    title: string
    link: string
    thumbnail: string
  }
}) => {
  return (
    <a href={product.link} className="group/product h-96 w-[30rem] relative flex-shrink-0 rounded-xl overflow-hidden">
      <img
        src={product.thumbnail || "/placeholder.svg"}
        alt={product.title}
        className="object-cover object-left-top absolute h-full w-full inset-0 group-hover/product:scale-105 transition duration-500"
      />
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none transition duration-500"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-bold text-xl transition duration-500">
        {product.title}
      </h2>
    </a>
  )
}
