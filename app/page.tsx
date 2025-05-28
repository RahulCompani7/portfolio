"use client"

import { useRef } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Education from "@/components/education"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import BeyondWork from "@/components/beyond-work"
import TravelGallery from "@/components/travel-gallery"
import Footer from "@/components/footer"
import { BackgroundBeams } from "@/components/ui/background-beams"

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const beyondWorkRef = useRef<HTMLDivElement>(null)
  const travelGalleryRef = useRef<HTMLDivElement>(null)

  const sections = [
    { name: "Home", ref: heroRef },
    { name: "Education", ref: educationRef },
    { name: "Experience", ref: experienceRef },
    { name: "Projects", ref: projectsRef },
    { name: "Beyond Work", ref: beyondWorkRef },
    { name: "Travel", ref: travelGalleryRef },
  ]

  return (
    <main className="relative overflow-hidden">
      <Navbar sections={sections} />

      <div ref={heroRef} id="home">
        <Hero />
      </div>

      <div ref={educationRef} id="education">
        <Education />
      </div>

      <div ref={experienceRef} id="experience">
        <Experience />
      </div>

      <div ref={projectsRef} id="projects">
        <Projects />
      </div>

      <div ref={beyondWorkRef} id="beyond-work">
        <BeyondWork />
      </div>

      <div ref={travelGalleryRef} id="travel">
        <TravelGallery />
      </div>

      <Footer />
      <BackgroundBeams />
    </main>
  )
}
