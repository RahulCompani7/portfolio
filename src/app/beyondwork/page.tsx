"use client";

import Image from "next/image";
import BeyondWork from "../../components/BeyondWork";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { motion } from "framer-motion";
import Navbar from "@/components/Nav";
import { BackgroundBeams } from "@/components/ui/background-beams";

import "../../styles/globals.css";
import { LinkPreview } from "@/components/ui/link-preview";

export default function BeyondWorkPage() {
  return (
    <div className="p-2 pb-10">
      <Navbar />
      <BeyondWork />
      <BackgroundBeams />
    </div>
  );
}
