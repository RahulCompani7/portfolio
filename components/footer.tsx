"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Instagram, Twitter, Mail, Phone, Heart } from "lucide-react"

export default function Footer() {
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

  return (
    <footer className="bg-gradient-to-br from-neutral-50 to-white py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-4"
            >
              <motion.h2 className="text-2xl font-bold relative cursor-default" whileHover={{ scale: 1.05 }}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 animate-gradient-x">
                  Rahul Compani
                </span>
              </motion.h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-600 mb-6 cursor-default"
            >
              Full-Stack Developer based in India, specializing in building exceptional digital experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex space-x-4"
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-500 transition-all duration-300 cursor-pointer ${link.color}`}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 cursor-default"
            >
              Contact
            </motion.h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-2"
            >
              <motion.div
                className="flex items-center space-x-2 text-gray-600 cursor-pointer"
                whileHover={{ x: 5, color: "#4f46e5" }}
              >
                <Mail className="h-4 w-4" />
                <a href="mailto:rahulcompani7@gmail.com" className="hover:underline">
                  rahulcompani7@gmail.com
                </a>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 text-gray-600 cursor-pointer"
                whileHover={{ x: 5, color: "#4f46e5" }}
              >
                <Phone className="h-4 w-4" />
                <a href="tel:+917981036928" className="hover:underline">
                  +91 - 7981036928
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <motion.p
            className="text-gray-500 text-sm flex items-center justify-center gap-2 cursor-default"
            whileHover={{ scale: 1.02 }}
          >
            © {new Date().getFullYear()} Rahul Compani. Made with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              <Heart className="h-4 w-4 text-red-500 fill-current" />
            </motion.span>
            and lots of ☕
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
