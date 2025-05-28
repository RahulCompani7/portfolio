"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { HobbyCard } from "@/components/ui/hobby-card"
import { Camera, Dumbbell, Music, Plane, BookOpen } from "lucide-react"

export default function BeyondWork() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  const hobbies = [
    {
      title: "Travel & Exploration",
      description:
        "Exploring new cultures, cuisines, and destinations around the world. Each journey brings new perspectives and unforgettable memories.",
      image:
        "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      icon: <Plane className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Fitness & Wellness",
      description:
        "Maintaining physical and mental health through regular gym sessions, yoga, and outdoor activities. Fitness is my daily dose of energy.",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      icon: <Dumbbell className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Music & Guitar",
      description:
        "Playing guitar and exploring different music genres. Music is my creative outlet and a way to unwind after coding sessions.",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      icon: <Music className="h-6 w-6" />,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Photography",
      description:
        "Capturing moments and landscapes during travels. Photography helps me see the world through a different lens and preserve memories.",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      icon: <Camera className="h-6 w-6" />,
      color: "from-amber-500 to-yellow-500",
    },
    {
      title: "Reading & Learning",
      description:
        "Books on technology, personal development, and science fiction. Continuous learning keeps me curious and inspired.",
      image:
        "https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      icon: <BookOpen className="h-6 w-6" />,
      color: "from-indigo-500 to-blue-500",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-white to-red-50 min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Beyond Work</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-neutral-600 font-light max-w-2xl mx-auto">
            Life is more than just code. Here's what keeps me inspired and balanced outside of work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={hobby.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <HobbyCard hobby={hobby} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
