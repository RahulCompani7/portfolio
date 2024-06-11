"use client";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
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
import githubLogo from "../assets/github.png";
import linkedinLogo from "../assets/linkedin.png";
import instagramLogo from "../assets/instagram.png";
import xLogo from "../assets/twitter.png";
import gmailLogo from "../assets/gmail.png";
import { FlipWords } from "../components/ui/flip-words";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import { motion } from "framer-motion";
import Navbar from "@/components/Nav";
import "../styles/globals.css";
export default function Home() {
  const words = ["a Software Developer", "a Tech Enthusiast"];

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

  return (
    <>
      <Navbar />
      

      <section className=" section bg-extra-light">
        <div className="section__container min-h-screen flex px-16">
          <div className="content w-2/4 flex justify-center">
            <p className="subtitle">HELLO</p>
            <h1 className="title">
              I'm{" "}
              <span>
                Rahul
                <br />
                <FlipWords words={words} />
              </span>
            </h1>
            <p className="description">
              Welcome to my portfolio! I'm Rahul Compani, a dynamic and driven
              professional immersed in the ever-evolving world of technology.
              With a passion for innovation and a knack for problem-solving, I
              navigate the digital landscape with agility and finesse. As a tech
              enthusiast and digital craftsman, I thrive on pushing boundaries
              and exploring new frontiers. Equipped with a blend of creativity
              and technical prowess, I craft digital experiences that inspire
              and delight. Join me on this journey of exploration and
              innovation, as we shape the future of technology together.
            </p>
          </div>
          <div className="w-2/4 flex justify-center items-center">
            <CardContainer>
              <CardBody>
                <CardItem translateZ="1" className="w-full mt-4">
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
                      className=""
                      alt="thumbnail"
                    />
                  </motion.div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
          <div className="social-icons-container w-1/4 flex justify-center items-center">
            <div className="social-icons flex flex-col gap-4">
              <a
                href="https://www.linkedin.com/in/rahul-compani-713a12210"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={linkedinLogo} alt="CSS" width={75} height={75} />
              </a>
              <a
                href="https://github.com/RahulCompani7"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={githubLogo} alt="CSS" width={75} height={75} />
              </a>
              <a
                href="https://x.com/RahulCompani"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={xLogo} alt="CSS" width={75} height={75} />
              </a>
              <a
                href="https://www.instagram.com/rahulcompani"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={instagramLogo} alt="CSS" width={75} height={75} />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=rahulcompani7@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={gmailLogo} alt="CSS" width={75} height={75} />
              </a>
            </div>
          </div>
        </div>
        <div className="section__container1 mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={skillVariants}
            className="content"
          >
            <div className="container">
              <h1 className="text-2xl font-bold mb-8">
                This is what I am good at
              </h1>
              <div className="skills flex flex-wrap justify-center">
                <div className="skill m-4 text-center">
                  <Image src={htmlLogo} alt="HTML" width={100} height={100} />
                  <p className="mt-2">HTML</p>
                </div>
                <div className="skill m-4 text-center">
                  <Image src={cssLogo} alt="CSS" width={100} height={100} />
                  <p className="mt-2">CSS</p>
                </div>
                <div className="skill m-4 text-center">
                  <Image
                    src={javascriptLogo}
                    alt="JavaScript"
                    width={100}
                    height={100}
                  />
                  <p className="mt-2">JavaScript</p>
                </div>
                <div className="skill m-4 text-center">
                  <Image src={javaLogo} alt="Java" width={100} height={100} />
                  <p className="mt-2">Java</p>
                </div>
                <div className="skill m-4 text-center">
                  <Image
                    src={typescriptLogo}
                    alt="TypeScript"
                    width={100}
                    height={100}
                  />
                  <p className="mt-2">TypeScript</p>
                </div>
                <div className="skill m-4 text-center">
                  <Image src={reactLogo} alt="React" width={100} height={100} />
                  <p className="mt-2">React.js</p>
                </div>
                <div className="skill m-4 text-center">
                  <Image
                    src={nextLogo}
                    alt="Next.js"
                    width={100}
                    height={100}
                  />
                  <p className="mt-2">Next.js</p>
                </div>
                <div className="skill m-4 text-center">
                  <Image
                    src={nodeLogo}
                    alt="Node.js"
                    width={100}
                    height={100}
                  />
                  <p className="mt-2">Node.js</p>
                </div>
                <div className="skill m-4 text-center">
                  <Image src={mysqlLogo} alt="MySQL" width={100} height={100} />
                  <p className="mt-2">MySQL</p>
                </div>
                <div className="skill m-4 text-center">
                  <Image
                    src={mongoDbLogo}
                    alt="MongoDB"
                    width={100}
                    height={100}
                  />
                  <p className="mt-2">MongoDB</p>
                </div>
                <div className="skill m-4 text-center">
                  <Image
                    src={uipathLogo}
                    alt="UiPath"
                    width={100}
                    height={100}
                  />
                  <p className="mt-2">UiPath</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
