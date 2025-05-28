"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const TextGenerateEffect = ({ words, className }: { words: string; className?: string }) => {
  const [renderedText, setRenderedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isGenerating, setIsGenerating] = useState(true)

  useEffect(() => {
    if (currentIndex < words.length && isGenerating) {
      const timeout = setTimeout(() => {
        setRenderedText(words.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 20) // Adjust speed as needed

      return () => clearTimeout(timeout)
    } else {
      setIsGenerating(false)
    }
  }, [currentIndex, words, isGenerating])

  return (
    <div className={cn("font-normal", className)}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        {renderedText}
        {isGenerating && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
            className="ml-1 inline-block h-4 w-[1px] bg-gray-900"
          />
        )}
      </motion.div>
    </div>
  )
}
