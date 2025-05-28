"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ProjectCard } from "@/components/ui/project-card"

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const projects = [
    {
      title: "HeyDJ - Music Suggestion App",
      description:
        "A responsive web app using Spotify API where users suggest and vote on songs via QR code. Features real-time queue updates and cross-device compatibility.",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      technologies: ["React.js", "Spotify API", "Node.js", "Socket.io", "QR Code"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "Nomad Navigator - Travel Planner",
      description:
        "GenAI-powered travel planner with personalized itineraries, real-time collaboration, and budget tracking. Integrates multiple APIs for comprehensive travel planning.",
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      technologies: ["Next.js", "OpenAI API", "Google Maps", "Prisma", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "Portfolio Website Generator",
      description:
        "Automated tool that generates customized portfolio websites based on user preferences and resume data. Features responsive design and easy deployment.",
      image:
        "https://images.unsplash.com/photo-1545235617-7a424c1a60cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      technologies: ["React.js", "Node.js", "Template Engine", "PDF Parser", "Vercel"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      title: "Task Management Dashboard",
      description:
        "Comprehensive task management system with real-time updates, team collaboration features, and performance analytics dashboard.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      technologies: ["Vue.js", "Express.js", "MongoDB", "Chart.js", "WebSocket"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
  ]

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 via-white to-orange-50 min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-neutral-600 font-light max-w-2xl mx-auto">
            A showcase of my technical skills and creative problem-solving abilities
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <motion.h3
            className="text-2xl font-bold text-neutral-900 mb-8 text-center cursor-default"
            whileHover={{ scale: 1.05 }}
          >
            Featured Projects
          </motion.h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <ProjectCard project={project} featured />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.h3
            className="text-2xl font-bold text-neutral-900 mb-8 text-center cursor-default"
            whileHover={{ scale: 1.05 }}
          >
            Other Projects
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
