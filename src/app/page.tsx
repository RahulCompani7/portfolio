"use client";

import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

import Navbar from "@/components/Nav";
import Image from "next/image";
import profile from "../assets/Blob.png";
import htmlLogo from "../assets/html-5.png";
import cssLogo from "../assets/css-3.png";
import javaLogo from "../assets/java.png";
import javascriptLogo from "../assets/js.png";
import mysqlLogo from "../assets/mysql.png";
import nextLogo from "../assets/next.png";
import nodeLogo from "../assets/node.png";
import reactLogo from "../assets/physics.png";
import typescriptLogo from "../assets/typescript.png";
import uipathLogo from "../assets/Uipath.jpg";
import mongoDbLogo from "../assets/mongodb-original-wordmark-icon-2015x2048-n6r3kuri.png";
import { motion } from "framer-motion";
import { FlipWords } from "../components/ui/flip-words";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import "./home.css";
import { AuroraBackground } from "../components/ui/aurora-background";

export default function Home() {
  const words = ["a Software Developer", "a Tech Enthusiast"];

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  };

  return (
    <>
      <Navbar />

      <section className="section">
        <div className="section__container">
          <motion.div
            initial="initial"
            animate="animate"
            variants={variants}
            className="content"
          >
            <p className="subtitle">HELLO</p>
            <h1 className="title">
              I&apos;m{" "}
              <span>
                Rahul
                <br />
                <FlipWords words={words} />
              </span>
            </h1>
            <p className="description">
              Welcome to my portfolio! I&apos;m Rahul Compani, a dynamic and
              driven professional immersed in the ever-evolving world of
              technology. With a passion for innovation and a knack for
              problem-solving, I navigate the digital landscape with agility and
              finesse. As a tech enthusiast and digital craftsman, I thrive on
              pushing boundaries and exploring new frontiers. Equipped with a
              blend of creativity and technical prowess, I craft digital
              experiences that inspire and delight. Join me on this journey of
              exploration and innovation, as we shape the future of technology
              together.
            </p>
            <div className="social-icons-container">
              <div className="social-icons">
                <a
                  href="https://www.linkedin.com/in/rahul-compani-713a12210"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="icon linkedin" />
                </a>
                <a
                  href="https://github.com/RahulCompani7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="icon github" />
                </a>
                <a
                  href="https://x.com/RahulCompani"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="icon twitter" />
                </a>
                <a
                  href="https://www.instagram.com/rahulcompani"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="icon instagram" />
                </a>
              </div>
            </div>
          </motion.div>
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
              <CardItem translateZ="100" className="w-full mt-4">
                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={imageVariants}
                  className="Profileimage"
                >
                  <Image
                    src={profile}
                    height="500"
                    width="500"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </motion.div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
        <div className="section__container1">
          <motion.div
            initial="initial"
            animate="animate"
            variants={variants}
            className="content"
          >
            {" "}
            <div className="container">
              <h1>This is what I am good at</h1>
              <div className="skills">
                <div className="skill">
                  <Image src={htmlLogo} alt="HTML" width={100} height={100} />
                  <p>HTML</p>
                </div>
                <div className="skill">
                  <Image src={cssLogo} alt="CSS" width={100} height={100} />
                  <p>CSS</p>
                </div>
                <div className="skill">
                  <Image
                    src={javascriptLogo}
                    alt="JavaScript"
                    width={100}
                    height={100}
                  />
                  <p>JavaScript</p>
                </div>
                <div className="skill">
                  <Image src={javaLogo} alt="Java" width={100} height={100} />
                  <p>Java</p>
                </div>
                <div className="skill">
                  <Image
                    src={typescriptLogo}
                    alt="TypeScript"
                    width={100}
                    height={100}
                  />
                  <p>TypeScript</p>
                </div>
                <div className="skill">
                  <Image src={reactLogo} alt="React" width={100} height={100} />
                  <p>React.js</p>
                </div>
                <div className="skill">
                  <Image
                    src={nextLogo}
                    alt="Next.js"
                    width={100}
                    height={100}
                  />
                  <p>Next.js</p>
                </div>
                <div className="skill">
                  <Image
                    src={nodeLogo}
                    alt="Node.js"
                    width={100}
                    height={100}
                  />
                  <p>Node.js</p>
                </div>
                <div className="skill">
                  <Image src={mysqlLogo} alt="MySQL" width={100} height={100} />
                  <p>MySQL</p>
                </div>
                <div className="skill">
                  <Image
                    src={mongoDbLogo}
                    alt="MongoDB"
                    width={100}
                    height={100}
                  />
                  <p>MongoDB</p>
                </div>
                <div className="skill">
                  <Image
                    src={uipathLogo}
                    alt="UiPath"
                    width={100}
                    height={100}
                  />
                  <p>UiPath</p>
                </div>
                {/* Add other skills in a similar manner */}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
