"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { GradientCard } from "@/components/ui/gradient-card"
import { NumberTicker } from "@/components/ui/number-ticker"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Trophy } from "lucide-react"

export default function Education() {
  const ref = useRef<HTMLDivElement>(null)
  const certificationsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const certificationsInView = useInView(certificationsRef, { once: false, amount: 0.1 })

  const achievements = [
    { label: "CGPA", value: 9.2, suffix: "/10" },
    { label: "Rank on GeeksforGeeks", value: 24, prefix: "#", suffix: "/2000" },
    { label: "Problems Solved", value: 300, suffix: "+" },
    { label: "Years of Study", value: 4, suffix: "" },
  ]

  const certifications = [
    "The Complete Web Developer Bootcamp",
    "React - The Complete Guide",
    "Machine Learning by Stanford",
    "AWS: Introduction to Cloud",
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Education</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-neutral-600 font-light max-w-2xl mx-auto">
            Building a strong foundation in computer science and continuous learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Main Education Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.3 }}>
              <GradientCard className="p-8 cursor-pointer">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                        B.Tech, Computer Science and Engineering
                      </h3>
                      <p className="text-xl text-neutral-700 font-medium">Vel Tech University</p>
                    </div>
                    <Badge variant="success" className="text-sm font-medium">
                      CGPA: 9.2
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-6 text-neutral-600">
                    <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Aug 2019 - Aug 2023</span>
                    </motion.div>
                    <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">Chennai, India</span>
                    </motion.div>
                  </div>

                  <p className="text-neutral-600 leading-relaxed">
                    Developed a strong foundation in computer science principles and gained practical experience through
                    various projects and competitions. Focused on software development, algorithms, and modern web
                    technologies.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium text-neutral-900">Key Achievements</span>
                    </div>
                    <ul className="space-y-2 text-neutral-600">
                      <motion.li whileHover={{ x: 5 }} className="cursor-default">
                        • Runner-up in Codeathon 22 and PI Pro
                      </motion.li>
                      <motion.li whileHover={{ x: 5 }} className="cursor-default">
                        • Organized coding event Tantraz 22
                      </motion.li>
                      <motion.li whileHover={{ x: 5 }} className="cursor-default">
                        • Active member of Google Developer Student Club (GDSC)
                      </motion.li>
                      <motion.li whileHover={{ x: 5 }} className="cursor-default">
                        • Participated in multiple hackathons and ideathons
                      </motion.li>
                    </ul>
                  </div>
                </div>
              </GradientCard>
            </motion.div>
          </motion.div>

          {/* Stats and University Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* University Image */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                alt="University Campus"
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-lg font-medium">Vel Tech University</p>
                <p className="text-sm opacity-90">Chennai, Tamil Nadu</p>
              </div>
            </motion.div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-neutral-100 cursor-pointer"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neutral-900 mb-1">
                      {achievement.prefix}
                      <NumberTicker value={achievement.value} />
                      {achievement.suffix}
                    </div>
                    <p className="text-sm text-neutral-600">{achievement.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Certifications - Fixed with separate ref and better timing */}
        <motion.div
          ref={certificationsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={certificationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-neutral-900 mb-8">Professional Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={certificationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-neutral-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <p className="text-neutral-700 font-medium text-center">{cert}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
