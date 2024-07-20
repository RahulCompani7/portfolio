import Image from "next/image";
import { useState, useEffect } from "react";
import useInView from "./hooks/useInView";
import { motion } from "framer-motion";
import "../styles/globals.css";
import Music from "./music";

export default function BeyondWork() {
  const [setRef, isInView] = useInView({ threshold: 0.2 }); // Adjust threshold as needed
  const [travelRef, isTravelInView] = useInView({ threshold: 0.2 });

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 },
  };

  return (
    <div className="p-4 xl:p-10 space-y-10">
      <section className="travel" ref={travelRef}>
        <motion.div
          className="motion-container"
          initial="hidden"
          animate={isTravelInView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold">Travel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Image
                src="/travel1.jpg"
                alt="Travel photo 1"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Image
                src="/travel2.jpg"
                alt="Travel photo 2"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Image
                src="/travel3.jpg"
                alt="Travel photo 3"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Image
                src="/travel4.jpg"
                alt="Travel photo 4"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </motion.div>
          </div>
          <p className="mt-4">
            Traveling is one of my passions. I love exploring new places,
            experiencing different cultures, and capturing moments through
            photography.
          </p>
        </motion.div>
      </section>

      {/* <Music /> */}

      <section className="art" ref={setRef}>
        <motion.div
          className="motion-container"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold">Art</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Image
                src="/art1.jpg"
                alt="Art photo 1"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Image
                src="/art2.jpg"
                alt="Art photo 2"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </motion.div>
          </div>
          <p className="mt-4">
            I like sketching, I just take up some image and start pencil
            sketching. It&apos;s a relaxing and creative outlet for me.
          </p>
        </motion.div>
      </section>

      <section className="cook" ref={setRef}>
        <motion.div
          className="motion-container"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold">Cooking</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Image
                src="/cook1.jpg"
                alt="Cooking photo 1"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Image
                src="/cook2.jpg"
                alt="Cooking photo 2"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </motion.div>
          </div>
          <p className="mt-4">
            I am into food, I explore various cuisines and try to replicate some
            recipes at home. Cooking is a way for me to experiment with flavors
            and create something delicious.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
