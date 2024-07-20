"use client";

import Experience from "./experience";
import Education from "./Education";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BoxesCore } from "./ui/background-boxes";

import "../styles/globals.css";
import { Tabs } from "./ui/tabs";
export default function Home2() {
  const tabs = [
    {
      title: "Experience",
      value: "Experience",
      content: (
        <div className="w-full overflow-hidden relative min-h-screen rounded-2xl p-5 xl:p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#131313] to-[#090909] ">
          <p>Experience</p>
          <Experience />
        </div>
      ),
    },
    {
      title: "Education",
      value: "Education",
      content: (
        <div className="w-full overflow-hidden relative min-h-screen rounded-2xl p-5 xl:p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#131313] to-[#090909]  ">
          <p>Education</p>
          <Education />
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="h-full w-full   p-4 xl:p-20 ">
        <Tabs tabs={tabs} />
        <BackgroundBeams />
      </div>
    </>
  );
}
