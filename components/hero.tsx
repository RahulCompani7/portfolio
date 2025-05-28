"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect-smooth"
import { Github, Linkedin, Instagram, Twitter, ArrowDown, Sparkles } from "lucide-react"
import { FlipWords } from "@/components/ui/flip-words"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { MovingBorder } from "@/components/ui/moving-border"

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [imageHovered, setImageHovered] = useState(false)

  const words = [
    {
      text: "Hi,",
      className: "text-neutral-600 font-light",
    },
    {
      text: "I'm",
      className: "text-neutral-600 font-light",
    },
    {
      text: "Rahul",
      className: "text-neutral-900 font-bold",
    },
    {
      text: "Compani",
      className: "text-neutral-900 font-bold",
    },
  ]

  const roles = ["Full-Stack Developer", "Software Engineer", "Tech Enthusiast", "Problem Solver"]

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/rahulcompani",
      icon: <Github className="h-5 w-5" />,
      color: "hover:text-gray-900",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/rahulcompani",
      icon: <Linkedin className="h-5 w-5" />,
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/rahulcompani",
      icon: <Instagram className="h-5 w-5" />,
      color: "hover:text-pink-600",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/rahulcompani",
      icon: <Twitter className="h-5 w-5" />,
      color: "hover:text-blue-400",
    },
  ]

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-50 via-white to-blue-50 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            // style={{
            //   left: `${Math.random() * 100}%`,
            //   top: `${Math.random() * 100}%`,
            // }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-8"
          >
            <div className="space-y-6">
              <TypewriterEffectSmooth words={words} className="text-4xl sm:text-5xl md:text-6xl" />

              <div className="text-2xl sm:text-3xl md:text-4xl font-light text-neutral-700">
                I'm a <FlipWords words={roles} className="text-blue-600 font-semibold" />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-lg text-neutral-600 font-light max-w-lg leading-relaxed"
              >
                Passionate about building innovative digital experiences that solve real-world problems. I specialize in
                creating scalable web applications with modern technologies.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ShimmerButton onClick={scrollToProjects} className="px-8 py-3 cursor-pointer">
                  <span className="font-medium flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    View My Work
                  </span>
                </ShimmerButton>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-neutral-300 rounded-full text-neutral-700 hover:bg-neutral-50 transition-all duration-300 font-medium cursor-pointer"
              >
                Download CV
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex space-x-6"
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-neutral-500 transition-all duration-300 cursor-pointer ${link.color}`}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Enhanced Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center"
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            <motion.div
              animate={imageHovered ? { scale: 1.05, rotate: 2 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <MovingBorder duration={3000} className="w-80 h-80">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-pink-100 p-2 relative">
                  <motion.img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                    alt="Rahul Compani"
                    className="w-full h-full object-cover rounded-full transition-all duration-500"
                    animate={imageHovered ? { scale: 1.1 } : { scale: 1 }}
                  />

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-full flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: imageHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: imageHovered ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="text-white text-center"
                    >
                      <Sparkles className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Let's Connect!</p>
                    </motion.div>
                  </motion.div>
                </div>
              </MovingBorder>

              {/* Floating elements around image */}
              {imageHovered && (
                <>
                  <motion.div
                    className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full"
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: -360 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  />
                  <motion.div
                    className="absolute top-1/2 -left-8 w-4 h-4 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full"
                    initial={{ scale: 0, x: 0 }}
                    animate={{ scale: 1, x: -10 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="flex flex-col items-center text-neutral-400 cursor-pointer"
            whileHover={{ scale: 1.1, color: "#3b82f6" }}
          >
            <span className="text-sm font-light mb-2">Scroll to explore</span>
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="p-2 rounded-full border border-neutral-300 hover:border-blue-400 transition-colors"
            >
              <ArrowDown className="h-5 w-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
