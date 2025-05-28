"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  sections: {
    name: string
    ref: React.RefObject<HTMLDivElement>
  }[]
}

export default function Navbar({ sections }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("Home")
  const [hidden, setHidden] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = section.ref.current
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.name)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase())
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
    setIsOpen(false)
  }

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-neutral-200/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Enhanced Logo with different colors */}
          <motion.div
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick("Home")}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 rounded-lg blur-sm opacity-75"
                animate={{
                  background: [
                    "linear-gradient(45deg, #3b82f6, #10b981, #f59e0b)",
                    "linear-gradient(45deg, #10b981, #f59e0b, #3b82f6)",
                    "linear-gradient(45deg, #f59e0b, #3b82f6, #10b981)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
              <div className="relative bg-white rounded-lg px-4 py-2 border border-neutral-200">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 font-mono">
                  &lt;RahulCompani/&gt;
                </span>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation with new colors */}
          <nav className="hidden md:flex space-x-1">
            {sections.map((section) => (
              <motion.button
                key={section.name}
                onClick={() => handleNavClick(section.name)}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm transition-all duration-300 cursor-pointer",
                  activeSection === section.name ? "text-white" : "text-gray-600 hover:text-gray-900",
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeSection === section.name && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{
                      background: "linear-gradient(45deg, #3b82f6, #10b981, #f59e0b)",
                      backgroundSize: "200% 200%",
                    }}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      type: "spring",
                      duration: 0.6,
                      backgroundPosition: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                    }}
                  />
                )}
                {section.name}
              </motion.button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <motion.div className="md:hidden" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 transition-colors p-2 cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200"
          >
            <div className="px-4 py-2 space-y-1">
              {sections.map((section) => (
                <motion.button
                  key={section.name}
                  onClick={() => handleNavClick(section.name)}
                  className={cn(
                    "block w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-300 cursor-pointer",
                    activeSection === section.name
                      ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                  )}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ x: 5 }}
                >
                  {section.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
