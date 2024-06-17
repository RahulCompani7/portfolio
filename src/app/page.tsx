"use client";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import profile from "../assets/Blob.png";
import htmlLogo from "../assets/html-5.png";
import cssLogo from "../assets/css-3.png";
import Link from "next/link";
import linkedinpage from "../assets/linkedinpage.png";
import { Tooltip as ReactTooltip } from "react-tooltip";
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
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Tabs } from "@/components/ui/tabs";

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

  const containerStyle = {
    position: "relative",
    display: "inline-block",
  };

  const hoverContainerStyle = {
    ...containerStyle,
    ":hover .tooltip": {
      opacity: 1,
      visibility: "visible",
    },
  };

  return (
    <>
      <Navbar />

      <div className="section__container h-full w-full flex flex-col xl:flex-row p-20 mt-52 xl:mt-0 ">
        <div className="content text-center flex flex-col justify-center items-center xl:items-start xl:text-start z-[100]">
          <p className="subtitle">HELLO</p>
          <h1 className="title ">
            I&apos;m{" "}
            <span>
              Rahul
              <br />
              <FlipWords words={words} className="text-center xl:text-start text-xl"/>
            </span>
          </h1>
          <p className="description hidden sm:block text-[#ffffff]">
            Hey there! I&apos;m Rahul, your friendly neighborhood tech wizard.
            Welcome to my digital playground! <br />
            As a web developer extraordinaire, I spend my days sprinkling pixels
            with magic and turning lines of code into works of art. But when
            I&apos;m not crafting digital wonders, you&apos;ll catch me riding
            the waves of the latest tech trends, sharing my wisdom with eager
            minds, or escaping into the pages of a good book. <br />
            From crafting captivating web experiences at Sustally to
            orchestrating digital symphonies at OpenText, my journey has been
            nothing short of exhilarating. Along the way, I&apos;ve tinkered
            with tech, danced with data, and embraced every challenge with a
            grin.
          </p>
          <div className="hidden xl:flex social-icons-container  justify-start items-center mt-4">
            <div className="social-icons flex gap-4 relative z-100">
              <div className="transform transition hover:-translate-y-2">
                <LinkPreview
                  url="https://www.linkedin.com/in/rahul-compani-713a12210"
                  imageSrc="/images/linkedinpage.png"
                  isStatic
                >
                  <Image src={linkedinLogo} alt="CSS" width={50} height={50} />
                </LinkPreview>
              </div>
              <div className="transform transition hover:-translate-y-2">
                <LinkPreview
                  url="https://github.com/RahulCompani7"
                  imageSrc="/images/githubpage.png"
                  isStatic
                >
                  <Image
                    src={githubLogo}
                    className=" bg-white rounded-md"
                    alt="CSS"
                    width={50}
                    height={50}
                  />
                </LinkPreview>
              </div>
              <div className="transform transition hover:-translate-y-2">
                <LinkPreview
                  url="https://mail.google.com/mail/?view=cm&fs=1&to=rahulcompani7@gmail.com"
                  imageSrc="/images/gmailpage.png"
                  isStatic
                >
                  <Image src={gmailLogo} alt="CSS" width={50} height={50} />
                </LinkPreview>
              </div>
              <div className="transform transition hover:-translate-y-2">
                <LinkPreview
                  url="https://x.com/RahulCompani"
                  imageSrc="/images/xpage.png"
                  isStatic
                >
                  <Image
                    src={xLogo}
                    alt="CSS"
                    className=" bg-white rounded-md"
                    width={50}
                    height={50}
                  />
                </LinkPreview>
              </div>
              <div className="transform transition hover:-translate-y-2">
                <LinkPreview
                  url="https://www.instagram.com/rahulcompani"
                  imageSrc="/images/instapage.png"
                  isStatic
                >
                  <Image src={instagramLogo} alt="CSS" width={50} height={50} />
                </LinkPreview>
              </div>
            </div>
          </div>
        </div>
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
                  <Image
                    src={profile}
                    height="400"
                    width="400"
                    className="transform transition  hover:translate-y-2 hover:scale-110"
                    alt="thumbnail"
                  />
                </motion.div>
              </CardItem>
            </CardBody>
          </CardContainer>

          <div className="flex sm:hidden social-icons-container  justify-center items-center my-4">
            <div className="social-icons flex gap-4">
              <LinkPreview
                url="https://www.linkedin.com/in/rahul-compani-713a12210"
                imageSrc="/images/linkedinpage.png"
                isStatic
              >
                <Image src={linkedinLogo} alt="CSS" width={50} height={50} />
              </LinkPreview>
              <LinkPreview
                url="https://github.com/RahulCompani7"
                imageSrc="/images/githubpage.png"
                isStatic
              >
                <Image src={githubLogo} className=" bg-white rounded-md" alt="CSS" width={50} height={50} />
              </LinkPreview>
              <LinkPreview
                url="https://mail.google.com/mail/?view=cm&fs=1&to=rahulcompani7@gmail.com"
                imageSrc="/images/gmailpage.png"
                isStatic
              >
                <Image src={gmailLogo} alt="CSS" width={50} height={50} />
              </LinkPreview>
              <LinkPreview
                url="https://x.com/RahulCompani"
                imageSrc="/images/xpage.png"
                isStatic
              >
                <Image src={xLogo} alt="CSS" className=" bg-white rounded-md" width={50} height={50} />
              </LinkPreview>
              <LinkPreview
                url="https://www.instagram.com/rahulcompani"
                imageSrc="/images/instapage.png"
                isStatic
              >
                <Image src={instagramLogo} alt="CSS" width={50} height={50} />
              </LinkPreview>
            </div>
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </>
  );
}
