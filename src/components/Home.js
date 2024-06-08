import React from "react";
import { motion } from "framer-motion";
import "./Home.css";
import profile from "./assets/Blob.png";
import Navbar from "./Nav";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="section">
        <motion.div
          className="section__container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="content"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <p className="subtitle">HELLO</p>
            <h1 className="title">
              I'm{" "}
              <span>
                Rahul
                <br />a
              </span>{" "}
              Software Developer
            </h1>
            <p className="description">
              Welcome to my portfolio! I'm Rahul Compani, a dynamic and driven
              professional equipped with practical experience in Web
              Development. Eager to dive into challenging opportunities, I bring
              a zest for learning and a commitment to excellence. Ready to
              infuse energy and expertise into a vibrant team, contributing to
              the success of an innovative organization.
            </p>
            <div className="social-icons-container">
              {" "}
              {/* Wrap social icons with a div */}
              <div className="social-icons">
                <a
                  href="https://www.linkedin.com/in/rahul-compani-713a12210/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="icon linkedin" />
                </a>
                <a
                  href="https://github.com/RahulCompani"
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
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="icon instagram" />
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="image"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <img src={profile} alt="profile" />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
