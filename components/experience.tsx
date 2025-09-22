"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { VerticalTimeline } from "@/components/ui/vertical-timeline"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
import { Badge } from "@/components/ui/badge"

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
const isInView = useInView(ref, { once: true, amount: 0.2 })
const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.1 })


  const experiences = [
   {
  title: "Software Development Engineer",
  company: "TechMonk (SaaS Startup)",
  period: "JUN 2025 - PRESENT",
  location: "Remote",
  type: "Full-time",
  description: [
    "Worked on the main SaaS product, building backend systems with Node.js, MongoDB, and Google Cloud Platform, directly shaping client engagement workflows",
    "Developed Agent Builder, allowing users to design agent flows, assign agents/tools, and deploy bots to handle product queries, improving self-service resolution by 35%",
    "Designed and launched Exotel integration from scratch, powering voice calls and SMS within the ticketing system, enabling agents to resolve customer issues 30% faster across phone, email, and WhatsApp",
    "Revamped the lead management platform, allowing admins to create multiple categorized forms with round-robin lead assignment, boosting lead distribution efficiency by 40%",
    "Fixed critical production bugs, implemented modular utility functions, improving maintainability and reducing recurring issues by 25%"
  ],
  skills: ["JavaScript", "TypeScript", "Node.js", "MongoDB", "Express.js", "Postman", "Git", "Docker", "AWS", "JWT", "Redis", "GCP", "Indexing", "Cron"],
  logo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.linkedin.com%2Fcompany%2Ftechmonk-io&psig=AOvVaw3issWf8fVEi85Ulkiy_mQ4&ust=1758607798523000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPCN3Nza648DFQAAAAAdAAAAABAE"
}
,
    {
      title: "Software Developer",
      company: "Sustally (SaaS Startup)",
      period: "OCT 2023 - FEB 2025",
      location: "Remote",
      type: "Full-time",
      description: [
        "Led full-stack development of Sustally's core product with Next.js and Node.js",
        "Built scalable dashboard integrating real-time sustainability metrics",
        "Engineered RESTful APIs for Excel data import/export, reducing manual errors by 30%",
        "Developed responsive data entry platforms, improving user experience by 20%",
        "Mentored interns and collaborated in Agile/Scrum environment",
      ],
      skills: ["React.js", "Next.js", "Node.js", "MongoDB", "TypeScript", "Docker", "AWS"],
      logo: "https://media.licdn.com/dms/image/v2/D4E0BAQG6v9wMkNg5bA/company-logo_200_200/company-logo_200_200/0/1701914172156/sustally_logo?e=2147483647&v=beta&t=kVGj6ZY1UiR4qzQrVRLyvnTEidTx6AdVEkWLMtvQ1dg",
    },
    {
      title: "RPA Developer",
      company: "OpenText (Product Based)",
      period: "DEC 2022 - JUN 2023",
      location: "Bengaluru, India",
      type: "Full-time",
      description: [
        "Automated workflows for 20+ enterprise web forms using UiPath",
        "Developed end-to-end RPA solutions improving efficiency by 30%",
        "Built reusable UiPath packages for XML/JSON data comparison",
        "Collaborated in Agile environment using Jira for project management",
      ],
      skills: ["UiPath", "RPA", "XML", "JSON", "Automation", "Jira"],
      logo: "https://images.credly.com/images/7c1f749c-4acb-4ff8-ac1b-02ce2bc331e5/blob.png",
    },
    {
      title: "Freelance Web Developer",
      company: "Self-employed",
      period: "JUN 2023 - OCT 2023",
      location: "Remote",
      type: "Freelance",
      description: [
        "Designed and developed customized portfolio websites",
        "Integrated contact forms, galleries, and SEO optimization",
        "Deployed sites on Vercel for optimal performance",
        "Enhanced client online presence with responsive designs",
      ],
      skills: ["React.js", "Next.js", "Tailwind CSS", "SEO", "Vercel"],
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
  ]

  const testimonials = [
    {
      quote:
        "Rahul consistently delivers high-quality work with exceptional attention to detail and problem-solving skills.",
      name: "Sarah Johnson",
      title: "Project Manager at Sustally",
    },
    {
      quote:
        "Working with Rahul was a pleasure. He's technically skilled and a great team player who communicates effectively.",
      name: "Michael Chen",
      title: "Senior Developer at OpenText",
    },
    {
      quote:
        "Rahul's ability to understand complex requirements and translate them into elegant solutions is remarkable.",
      name: "Emily Rodriguez",
      title: "Freelance Client",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-yellow-50 min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-yellow-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-neutral-600 font-light max-w-2xl mx-auto">
            My professional journey in software development and technology
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-20"
        >
          <VerticalTimeline
            items={experiences.map((exp, index) => ({
              title: exp.title,
              subtitle: exp.company,
              date: exp.period,
              content: (
                <motion.div className="space-y-4" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <motion.img
                        src={exp.logo || "/placeholder.svg"}
                        alt={exp.company}
                        className="w-10 h-10 rounded-full object-cover cursor-pointer"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      />
                      <div>
                        <h3 className="font-bold text-lg text-neutral-900">{exp.title}</h3>
                        <p className="text-neutral-600">{exp.company}</p>
                      </div>
                    </div>
                    <Badge variant={exp.type === "Full-time" ? "default" : "secondary"}>{exp.type}</Badge>
                  </div>

                  <p className="text-sm text-neutral-500 mb-4">{exp.location}</p>

                  <ul className="space-y-2">
                    {exp.description.map((item, idx) => (
                      <motion.li
                        key={idx}
                        className="text-neutral-700 text-sm leading-relaxed cursor-default"
                        whileHover={{ x: 5, color: "#059669" }}
                        transition={{ duration: 0.2 }}
                      >
                        • {item}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-neutral-200">
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <motion.div key={idx} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Badge variant="outline" className="text-xs cursor-pointer">
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ),
              icon: <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full" />,
            }))}
          />
        </motion.div>

        <motion.div
          ref={testimonialsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-neutral-900">What Colleagues Say</h3>
          <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
        </motion.div>
      </div>
    </section>
  )
}
