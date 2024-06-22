"use client";
import React, { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import profile from "../assets/Blob.png";
import { useRef } from "react";
import githubLogo from "../assets/github.png";
import linkedinLogo from "../assets/linkedin.png";
import instagramLogo from "../assets/instagram.png";
import xLogo from "../assets/twitter.png";
import gmailLogo from "../assets/gmail.png";
import { FlipWords } from "../components/ui/flip-words";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import { motion } from "framer-motion";
import Navbar from "@/components/Nav";
import { BackgroundBeams } from "@/components/ui/background-beams";

import "../styles/globals.css";
import { LinkPreview } from "@/components/ui/link-preview";

export default function Home1() {
  const words = ["a Web Developer", "a Tech Enthusiast"];

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  const skillVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const tooltipImages: { [key: string]: string } = {
    linkedin: "/images/linkedinpage.png",
    github: "/images/githubpage.png",
    gmail: "/images/gmailpage.png",
    x: "/images/xpage.png",
    instagram: "/images/instapage.png",
  };

  const icons = [
    {
      name: "linkedin",
      url: "https://www.linkedin.com/in/rahul-compani-713a12210",
      src: linkedinLogo,
    },
    {
      name: "github",
      url: "https://github.com/RahulCompani7",
      src: githubLogo,
    },
    {
      name: "gmail",
      url: "https://mail.google.com/mail/?view=cm&fs=1&to=rahulcompani7@gmail.com",
      src: gmailLogo,
    },
    { name: "x", url: "https://x.com/RahulCompani", src: xLogo },
    {
      name: "instagram",
      url: "https://www.instagram.com/rahulcompani",
      src: instagramLogo,
    },
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Function to toggle visibility after 3 seconds
    const toggleVisibility = () => {
      setIsVisible((prevVisible) => !prevVisible); // Toggle visibility
      setTimeout(toggleVisibility, 3000); // Toggle again after 3 seconds
    };

    // Initial call to start the toggle
    const timeoutId = setTimeout(toggleVisibility, 3000);

    // Clean up function to clear timeout when component unmounts or re-renders
    return () => {
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <>
      <div className="section__container  w-full flex flex-col xl:flex-row pt-20 xl:p-20 mt-20 xl:mt-0 justify-around">
        <motion.div
          className="content text-center flex flex-col justify-center items-center xl:items-start xl:text-start z-[100] text-4xl"
          initial="initial"
          animate="animate"
          variants={variants}
        >
          <p className="subtitle">HELLO</p>
          <h1 className="title text-7xl">
            I&apos;m{" "}
            <span className="text-7xl">
              Rahul
              <br />
              <FlipWords
                words={words}
                className="text-center xl:text-start text-4xl text-[#636363]"
              />
            </span>
          </h1>

          <div className="hidden xl:flex social-icons-container justify-start items-center mt-4">
            <div className="social-icons flex gap-4 relative z-100">
              {icons.map((icon, index) => (
                <motion.div
                  key={index}
                  className="transform transition"
                  whileHover={{ translateY: -8 }}
                  initial="initial"
                  animate="animate"
                  variants={variants}
                >
                  <LinkPreview
                    url={icon.url}
                    imageSrc={tooltipImages[icon.name]}
                    isStatic
                  >
                    <Image
                      src={icon.src}
                      alt="CSS"
                      width={50}
                      height={50}
                      className="bg-white rounded-xl"
                    />
                  </LinkPreview>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        <div className="flex justify-center items-center flex-col xl:mt-0 z-[100]">
          <CardContainer>
            <CardBody>
              <CardItem translateZ="1" className="w-full">
                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={imageVariants}
                  className="Profileimage"
                >
                  <div className="flex flex-col items-center">
                    <Image
                      src={profile}
                      height="400"
                      width="400"
                      className="transform transition  hover:translate-y-2 hover:scale-110 duration-300"
                      alt="thumbnail"
                    />
                    <div className="text-sm">
                      <motion.span
                        initial={{ opacity: 0, y: 20 }} // Initial state: invisible and slightly moved down
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          y: isVisible ? 0 : 20,
                        }} // Animation states based on isVisible
                        transition={{ duration: 0.5 }} // Smooth transition duration
                      >
                        Hover Me
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </CardItem>
            </CardBody>
          </CardContainer>

          <div className="flex sm:hidden social-icons-container  justify-center items-center my-4">
            <div className="social-icons flex gap-4">
              {icons.map((icon, index) => (
                <motion.div
                  key={index}
                  className="transform transition"
                  whileHover={{ translateY: -8 }}
                  initial="initial"
                  animate="animate"
                  variants={variants}
                >
                  <LinkPreview
                    url={icon.url}
                    imageSrc={tooltipImages[icon.name]}
                    isStatic
                  >
                    <Image src={icon.src} alt="CSS" width={50} height={50} />
                  </LinkPreview>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <BackgroundBeams />
      </div>
    </>
  );
}
