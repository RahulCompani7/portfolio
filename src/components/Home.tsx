"use client";
import React from "react";
import Image from "next/image";
import profile from "../assets/Blob.png";
import { FlipWords } from "../components/ui/flip-words";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import { motion } from "framer-motion";
import { FloatingDock } from "./ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconBrandInstagram,
  IconMail,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import useInView from "./hooks/useInView";
import "../styles/globals.css";
import { Poller_One } from "next/font/google";

const pollerOne = Poller_One({
  weight: "400",
  subsets: ["latin"], // Adjust subsets as necessary
});

export default function Home1() {
  const words = [
    "a Web Developer",
    "a Tech Enthusiast",
    "a Software Developer",
  ];
  const [setRef, isInView] = useInView({ threshold: 0.1 });

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  const links = [
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/rahul-compani-713a12210",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      title: "Github",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/RahulCompani7",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      title: "Gmail",
      icon: (
        <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=rahulcompani7@gmail.com",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      title: "X",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://x.com/RahulCompani",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.instagram.com/rahulcompani",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ];

  return (
    <div className="section__container w-full flex flex-col xl:flex-row pt-20 xl:p-20 mt-20 xl:mt-0 justify-around">
      <motion.div
        className={`content text-center flex flex-col justify-center items-center xl:items-start xl:text-start z-[100] text-4xl `}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        variants={variants}
      >
        <p className="subtitle text-5xl">HELLO</p>
        <h1 className={`title text-7xl md:text-8xl`}>
          I&apos;m{" "}
          <span className="title text-7xl md:text-8xl">
            <span
              className={`bg-gradient-to-r from-[#0050A5] via-[white] to-[#BB2A2A] bg-clip-text text-transparent animate-gradient-flow transition-opacity duration-500 ${
                isInView ? "opacity-100" : "opacity-0"
              } ${pollerOne.className}`}
              ref={setRef}
            >
              Rahul
            </span>
            <br />
            <FlipWords
              words={words}
              className="text-center xl:text-start text-4xl text-[#636363] mt-5 md:mt-2"
            />
          </span>
        </h1>

        <div className="hidden xl:flex social-icons-container justify-start items-center mt-4 w-full">
          <div className="flex gap-4 relative z-100 w-full">
            <FloatingDock mobileClassName="translate-y-20" items={links} />
          </div>
        </div>
      </motion.div>

      <div className="flex justify-center items-center flex-col xl:mt-0 z-[100] ">
        <CardContainer>
          <CardBody>
            <CardItem translateZ="1" className="w-full">
              <motion.div
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                variants={imageVariants}
                className="Profileimage"
              >
                <div className="flex flex-col items-center">
                  <Image
                    src={profile}
                    height="400"
                    width="400"
                    className="transform transition hover:translate-y-2 hover:scale-110 duration-300"
                    alt="thumbnail"
                  />
                  <div className="hidden xl:flex text-sm">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: isInView ? 1 : 0,
                        y: isInView ? 0 : 20,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      Hover Me
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            </CardItem>
          </CardBody>
        </CardContainer>

        <div className="flex sm:hidden social-icons-container justify-center items-center my-4">
          <div className="social-icons flex gap-4">
            <FloatingDock mobileClassName="translate-y-20" items={links} />
          </div>
        </div>
      </div>
    </div>
  );
}
