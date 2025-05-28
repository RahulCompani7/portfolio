"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

export const NumberTicker = ({
  value,
  direction = "up",
  delay = 0,
  className,
}: {
  value: number
  direction?: "up" | "down"
  delay?: number
  className?: string
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(direction === "down" ? value : 0)

  useEffect(() => {
    if (!inView) return

    const timer = setTimeout(() => {
      const startValue = direction === "down" ? value : 0
      const endValue = direction === "down" ? 0 : value
      const duration = 2000
      const startTime = Date.now()

      const updateValue = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / duration, 1)

        const currentValue = startValue + (endValue - startValue) * progress
        setDisplayValue(Math.floor(currentValue))

        if (progress < 1) {
          requestAnimationFrame(updateValue)
        }
      }

      updateValue()
    }, delay)

    return () => clearTimeout(timer)
  }, [inView, value, direction, delay])

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  )
}
