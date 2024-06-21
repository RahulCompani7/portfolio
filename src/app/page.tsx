"use client";
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
import Home1 from "@/components/Home";

import "../styles/globals.css";
import { LinkPreview } from "@/components/ui/link-preview";

export default function Home() {
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

  return (
    <>
      <Navbar />

      <Home1 />
      
    </>
  );
}
