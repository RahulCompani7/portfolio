import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Navbar from "./Nav";
import styled from "styled-components";
import "./About.css";
import sustally from "./assets/sustally.png";

const AboutSection = styled.section`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--extra-light);
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--primary-color-dark);
  text-align: center;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-dark);
  text-align: center;
`;

const ItemTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
`;

const ItemSubtitle = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-light);
  margin-bottom: 0.5rem;
`;

const ItemContent = styled.p`
  font-size: 1rem;
  color: var(--text-dark);
  margin-top: 0.5rem;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  max-height: ${(props) => (props.visible ? "500px" : "0")};
  overflow: hidden;
  transition: opacity 0.3s, max-height 0.3s;
`;

const TimelineElement = ({ role, company, period, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{
          background: "var(--primary-color-light)",
          color: "#fff",
          width: "calc(50% - 1rem)",
          margin: "0 auto",
        }}
        contentArrowStyle={{
          borderRight: "7px solid var(--primary-color-light)",
        }}
        date={period}
        iconStyle={{
          background: "var(--primary-color-light)",
          color: "#fff",
        }}
        icon={<img src={sustally} alt="Dummy Logo" />}
      >
        <ItemTitle className="vertical-timeline-element-title">
          {role} - {company}
        </ItemTitle>
        <ItemSubtitle className="vertical-timeline-element-subtitle">
          {period}
        </ItemSubtitle>
        <ItemContent visible={isHovered}>{description}</ItemContent>
      </VerticalTimelineElement>
    </motion.div>
  );
};

const About = () => {
  const experiences = [
    {
      company: "Sustally",
      role: "Software Developer",
      period: "DEC 2023 - PRESENT",
      description:
        "Led end-to-end development and maintenance of company website and product utilizing Next.js, TypeScript, Node.js, and MongoDB. Spearheaded the implementation of new features, resulting in a 50% increase in user engagement.",
    },
    {
      company: "Sustally",
      role: "Full Stack Developer Intern",
      period: "OCT 2023 - DEC 2023",
      description:
        "Developed a web application using React.js for crafting questionnaire-based assessments. Integrated Google Cloud's Natural Language API for sentiment analysis.",
    },
    {
      company: "OpenText",
      role: "Engineering Intern",
      period: "DEC 2022 - JUNE 2023",
      description:
        "Automated the Form Validation Process using RPA Tools for over 10 companies. Engineered a comprehensive workflow for Outbound Web Forms.",
    },
  ];

  const education = [
    {
      institution:
        "Vel Tech Rangarajan Dr.Sagunthala R&D Institute of Science and Technology",
      degree: "B.Tech in Computer Science",
      period: "AUG 2019 - AUG 2023",
      description: "CGPA - 9.2",
    },
  ];

  return (
    <div>
      <Navbar />
      <AboutSection>
        <Title>Meet Rahul Compani</Title>
        <Subtitle>Career Objective</Subtitle>
        <ItemContent>
          Dynamic and driven professional, equipped with practical experience in
          Web Development. Eager to dive into challenging opportunities. I bring
          a zest for learning and a commitment to excellence. Ready to infuse
          energy and expertise into a vibrant team, contributing to the success
          of an innovative organization.
        </ItemContent>
        <Subtitle>Work Experience</Subtitle>
        <VerticalTimeline layout="1-column">
          {experiences.map((experience, index) => (
            <TimelineElement
              key={index}
              role={experience.role}
              company={experience.company}
              period={experience.period}
              description={experience.description}
            />
          ))}
        </VerticalTimeline>
        <Subtitle>Education</Subtitle>
        <VerticalTimeline layout="1-column">
          {education.map((edu, index) => (
            <TimelineElement
              key={index}
              role={edu.degree}
              company={edu.institution}
              period={edu.period}
              description={edu.description}
            />
          ))}
        </VerticalTimeline>
      </AboutSection>
    </div>
  );
};

export default About;
