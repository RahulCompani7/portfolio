"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import openTextLogo from "../assets/opentext_logo.jpg";
import sustallyLogo from "../assets/sustally_logo.jpg";
import { PinContainer } from "./ui/3d-pin";
import "../styles/globals.css";
import useInView from "./hooks/useInView";

const experienceVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Experience() {
  const [setRef1, inView1] = useInView({ threshold: 0.1 });
  const [setRef2, inView2] = useInView({ threshold: 0.1 });
  const [setRef3, inView3] = useInView({ threshold: 0.1 });

  return (
    <div className="p-4 xl:p-10">
      {/* Experience 1 */}
      <motion.div
        ref={setRef1}
        initial="hidden"
        animate={inView1 ? "visible" : "hidden"}
        variants={experienceVariants}
        className="mb-8 flex flex-col xl:flex-row border border-slate-700 p-4 rounded-xl bg-[#090909]"
      >
        <div className="flex flex-col mb-2 xl:w-1/3 w-full">
          <PinContainer
            title="/sustally.com"
            href="https://sustally.com/"
            width="17rem"
            height="20rem"
          >
            <span className="flex justify-start items-center">
              <Image src={sustallyLogo} alt="Sustally Logo" height={200} />
            </span>

            <span>
              <h3 className="text-lg font-semibold">
                Software Developer - Sustally
              </h3>
              <p className="text-sm text-gray-400">DEC 2023 - PRESENT</p>
            </span>
          </PinContainer>
        </div>
        <div className="xl:w-2/3 w-full flex justify-center items-center">
          <div>
            <ul className="list-disc ml-6 text-gray-300 text-base">
              <li>
                Led end-to-end development and maintenance of company website
                and product utilizing Next.js, TypeScript, Node.js, and MongoDB.
              </li>
              <li>
                Spearheaded implementation of new features, amplifying user
                experience and functionality, resulting in a 50% increase in
                user engagement.
              </li>
              <li>
                Collaborated cross-functionally to seamlessly integrate features
                and ensure optimal performance, enhancing overall product
                reliability by 20%.
              </li>
              <li>
                Mentored and supervised interns, imparting industry best
                practices.
              </li>
            </ul>
            <div className="mt-4 text-gray-400 text-sm flex flex-wrap">
              <span className="border rounded-xl px-4 py-2 m-2">Next.js</span>
              <span className="border rounded-xl px-4 py-2 m-2">
                TypeScript
              </span>
              <span className="border rounded-xl px-4 py-2 m-2">Node.js</span>
              <span className="border rounded-xl px-4 py-2 m-2">MongoDB</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Experience 2 */}
      <motion.div
        ref={setRef2}
        initial="hidden"
        animate={inView2 ? "visible" : "hidden"}
        variants={experienceVariants}
        className="mb-8 flex flex-col xl:flex-row border border-slate-700 p-4 rounded-xl bg-[#090909]"
      >
        <div className="flex flex-col mb-2 xl:w-1/3 w-full">
          <PinContainer
            title="/sustally.com"
            href="https://sustally.com/"
            width="17rem"
            height="20rem"
          >
            <span className="flex justify-start items-center">
              <Image src={sustallyLogo} alt="Sustally Logo" height={200} />
            </span>

            <span>
              <h3 className="text-lg font-semibold">
                Full Stack Developer Intern, Sustally
              </h3>
              <p className="text-sm text-gray-400">OCT 2023 - DEC 2023</p>
            </span>
          </PinContainer>
        </div>
        <div className="xl:w-2/3 w-full flex justify-center items-center">
          <div>
            <ul className="list-disc ml-6 text-gray-300 text-base">
              <li>
                Developed a web application using React.js for crafting
                questionnaire-based assessments.
              </li>
              <li>
                Platform empowers reviewers to evaluate questions and frameworks
                with ease by generating unique links, offering the capacity to
                monitor the progress of multiple users through visually
                informative charts.
              </li>
              <li>
                Integrated Google Cloud's Natural Language API for sentiment
                analysis, improving the accuracy of assessments by 20%.
              </li>
            </ul>
            <div className="mt-4 text-gray-400 text-sm flex flex-wrap">
              <span className="border rounded-xl px-4 py-2 m-2">React.js</span>
              <span className="border rounded-xl px-4 py-2 m-2">
                Google Cloud Natural Language API
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Experience 3 */}
      <motion.div
        ref={setRef3}
        initial="hidden"
        animate={inView3 ? "visible" : "hidden"}
        variants={experienceVariants}
        className="mb-8 flex flex-col xl:flex-row border border-slate-700 p-4 rounded-xl bg-[#090909]"
      >
        <div className="flex flex-col mb-2 xl:w-1/3 w-full">
          <PinContainer
            title="/opentext.com"
            href="https://opentext.com/"
            width="17rem"
            height="20rem"
          >
            <span className="flex justify-start items-center">
              <Image src={openTextLogo} alt="OpenText Logo" height={200} />
            </span>

            <span>
              <h3 className="text-lg font-semibold">
                Engineering Intern, OpenText
              </h3>
              <p className="text-sm text-gray-400">DEC 2022 - JUNE 2023</p>
            </span>
          </PinContainer>
        </div>
        <div className="xl:w-2/3 w-full flex justify-center items-center">
          <div>
            <ul className="list-disc ml-6 text-gray-300 text-base">
              <li>
                Automated the Form Validation Process using RPA Tools for over
                10 companies, enhancing efficiency and accuracy in data
                processing.
              </li>
              <li>
                Engineered a comprehensive workflow for Outbound Web Forms,
                integrating FTP Script, XML parsing, Scraping, and Outbound
                Automation to ensure seamless operations from start to finish,
                resulting in a 30% increase in process efficiency.
              </li>
              <li>
                Innovatively crafted custom UiPath packages tailored for XML and
                JSON comparison, significantly boosting project efficiency and
                accuracy by 20%.
              </li>
            </ul>
            <div className="mt-4 text-gray-400 text-sm flex flex-wrap">
              <span className="border rounded-xl px-4 py-2 m-2">
                Automation
              </span>
              <span className="border rounded-xl px-4 py-2 m-2">RPA</span>
              <span className="border rounded-xl px-4 py-2 m-2">UiPath</span>
              <span className="border rounded-xl px-4 py-2 m-2">
                Form Validation
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
