"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useState } from "react"

interface Tab {
  title: string
  value: string
  content?: React.ReactNode
}

export const AnimatedTabs = ({
  tabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[]
  containerClassName?: string
  activeTabClassName?: string
  tabClassName?: string
  contentClassName?: string
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].value)
  const activeIndex = tabs.findIndex((tab) => tab.value === activeTab)

  return (
    <div className={cn("w-full", containerClassName)}>
      <div className="flex items-center justify-center relative mb-8">
        <div className="flex items-center justify-start relative z-0 rounded-full p-1 bg-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition-all",
                activeTab === tab.value ? "text-white" : "hover:text-gray-900",
                tabClassName,
              )}
            >
              {activeTab === tab.value && (
                <motion.div
                  layoutId="active-pill"
                  className={cn(
                    "absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-purple-400",
                    activeTabClassName,
                  )}
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={cn("relative", contentClassName)}>
        {tabs.map((tab) => (
          <motion.div
            key={tab.value}
            initial={{ opacity: 0 }}
            animate={{
              opacity: activeTab === tab.value ? 1 : 0,
              x: activeTab === tab.value ? 0 : activeIndex > tabs.findIndex((t) => t.value === tab.value) ? -20 : 20,
            }}
            transition={{ duration: 0.3 }}
            className={cn("absolute inset-0", activeTab === tab.value ? "relative" : "hidden")}
          >
            {tab.content}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
