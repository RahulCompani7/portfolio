"use client";
import { useRef } from "react";

import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import profile from "../../assets/Blob.png";
import htmlLogo from "../../assets/html-5.png";
import cssLogo from "../../assets/css-3.png";
import Link from "next/link";
import linkedinpage from "../../assets/linkedinpage.png";
import { Tooltip as ReactTooltip } from "react-tooltip";
import javaLogo from "../../assets/java.png";
import javascriptLogo from "../../assets/js.png";
import mysqlLogo from "../../assets/mysql.png";
import nextLogo from "../../assets/next.png";
import nodeLogo from "../../assets/node.png";
import reactLogo from "../../assets/physics.png";
import typescriptLogo from "../../assets/typescript.png";
import uipathLogo from "../../assets/Uipath.jpg";
import mongoDbLogo from "../../assets/mongodb-original-wordmark-icon-2015x2048-n6r3kuri.png";
import githubLogo from "../../assets/github.png";
import linkedinLogo from "../../assets/linkedin.png";
import instagramLogo from "../../assets/instagram.png";
import xLogo from "../../assets/twitter.png";
import gmailLogo from "../../assets/gmail.png";
import { FlipWords } from "../../components/ui/flip-words";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";
import { motion } from "framer-motion";
import Navbar from "@/components/Nav";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Tabs } from "@/components/ui/tabs";
import aboutlogo from "../../assets/About.png";
import "../../styles/globals.css";
import useInView from "../../components/hooks/useInView";
import { LinkPreview } from "@/components/ui/link-preview";
import Home2 from "@/components/Home2";

export default function About() {
  const containerStyle = {
    position: "relative",
    display: "inline-block",
  };

  const words = ["a Web Developer", "a Tech Enthusiast"];

  const skills = [
    { src: htmlLogo, alt: "HTML5" },
    { src: cssLogo, alt: "CSS3" },
    { src: javascriptLogo, alt: "JavaScript" },
    { src: typescriptLogo, alt: "TypeScript" },
    { src: reactLogo, alt: "React.js" },
    { src: nextLogo, alt: "Next.js" },
    { src: nodeLogo, alt: "Node.js" },
    { src: javaLogo, alt: "Java" },
    { src: mysqlLogo, alt: "MySQL" },
    { src: mongoDbLogo, alt: "MongoDB" },
    { src: uipathLogo, alt: "UiPath" },
  ];

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const skillsRef = useRef(null);

  const [setTitleRef, titleInView] = useInView({ threshold: 0.1 });
  const [setDescriptionRef, descriptionInView] = useInView({ threshold: 0.1 });
  const [setSkillsRef, skillsInView] = useInView({ threshold: 0.1 });

  return (
    <div className="p-2 pb-10">
      <Navbar />
      <div className="section__container flex xl:flex-row flex-col-reverse xl:mt-0 mt-2 justify-around items-center pt-28">
        <div className="description text-[#ffffff] flex flex-col items-start xl:w-1/2 px-6 ">
          <motion.h1
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: titleInView ? 1 : 0 }}
            transition={{ duration: 1.5 }}
            ref={titleRef}
          >
            I&apos;m Rahul Compani, your friendly neighborhood tech wizard.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: descriptionInView ? 1 : 0,
              y: descriptionInView ? 0 : 20,
            }}
            transition={{ duration: 1.5 }}
            className="text-md leading-relaxed"
            ref={descriptionRef}
          >
            Welcome to my digital playground! As a web developer extraordinaire,
            I spend my days sprinkling pixels with magic and turning lines of
            code into works of art. But when I&apos;m not crafting digital
            wonders, you&apos;ll catch me riding the waves of the latest tech
            trends, sharing my wisdom with eager minds, or escaping into the
            pages of a good book.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: descriptionInView ? 1 : 0,
              y: descriptionInView ? 0 : 20,
            }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-md leading-relaxed mt-4"
          >
            From crafting captivating web experiences at Sustally to
            orchestrating digital symphonies at OpenText, my journey has been
            nothing short of exhilarating. Along the way, I&apos;ve tinkered
            with tech, danced with data, and embraced every challenge with a
            grin.
          </motion.p>
        </div>
        <div className="xl:w-1/3">
          <motion.div
            className="w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: titleInView ? 1 : 0,
              scale: titleInView ? 1 : 0.5,
            }}
            transition={{ duration: 1 }}
          >
            <Image
              src={aboutlogo}
              alt="aboutlogo"
              layout="responsive"
              width={250}
              height={250}
            />
          </motion.div>
        </div>
      </div>

      <div className="h-full w-full flex flex-col items-center px-5 ">
        <motion.h2
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: skillsInView ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          ref={skillsRef}
        >
          And this is what I am good at...
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: skillsInView ? 1 : 0,
                scale: skillsInView ? 1 : 0.8,
              }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: skillsInView ? 1 : 0,
                  scale: skillsInView ? 1 : 0.8,
                }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="w-20 h-20"
                style={{
                  backgroundColor: skill.alt === "Next.js" ? "#ffffff" : "", // Invert colors for Next.js logo
                  padding: "10px",
                  borderRadius: "8px",
                  display: "inline-block",
                }}
              >
                <Image src={skill.src} alt={skill.alt} layout="responsive" />
              </motion.div>
              <motion.p
                className="text-sm text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: skillsInView ? 1 : 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
              >
                {skill.alt}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>

      <Home2 />

      <BackgroundBeams />
    </div>
  );
}
