import { snapshotHandle } from "./instagram";

const roles = ["scalable SaaS platforms", "serverless cloud systems", "fast, modern web apps", "APIs that don't break"];

const marquee = [
  { name: "Ernst & Young", bg: "#fff", img: "url('/ey.png')", sz: "contain" },
  { name: "TechMonk", bg: "#d9eef8", img: "url('/techmonk.jpg')", sz: "cover" },
  { name: "Sustally", bg: "#000", img: "url('/sustally.png')", sz: "contain" },
  { name: "OpenText", bg: "#0034c8", img: "url('/opentext.jpeg')", sz: "cover" },
  { name: "Vel Tech", bg: "#fff", img: "url('/veltech.png')", sz: "contain" },
];

const stats = [
  { shown: "3+", label: "Years building for production" },
  { shown: "50%", label: "Lift in user engagement" },
  { shown: "40%", label: "Gain in lead distribution efficiency" },
  { shown: "35%", label: "Faster support resolution" },
];

const experience = [
  {
    featured: true,
    title: "Senior Consultant",
    company: "Ernst & Young LLP (EY)",
    location: "Hyderabad, India",
    period: "Jun 2026 — Present",
    dot: "#ffe600",
    logoBg: "#fff",
    logoImg: "/ey.png",
    border: "#ffe60088",
    barOpacity: 1,
    bullets: [
      "Advise enterprise clients on cloud modernization, designing serverless architectures on AWS Lambda to replace legacy batch workflows.",
      "Build and deploy Python-based data processing and automation pipelines integrated with client AWS environments.",
      "Develop backend services and internal tooling in Node.js to support client delivery teams and streamline reporting.",
      "Partner with cross-functional consulting and engineering teams to scope, estimate and deliver cloud engineering workstreams.",
    ],
    stack: ["AWS Lambda", "Python", "Node.js", "AWS", "Docker", "Git"],
  },
  {
    featured: false,
    title: "Software Development Engineer",
    company: "TechMonk Ecom Solutions Pvt. Ltd",
    location: "Mumbai, India",
    period: "Jun 2025 — Mar 2026",
    dot: "#29abe2",
    logoBg: "#d9eef8",
    logoImg: "/techmonk.jpg",
    border: "var(--line)",
    barOpacity: 0.45,
    bullets: [
      "Built the Agent Builder feature — REST APIs plus a React UI for configuring bots, assigning agents and setting deployment channels.",
      "Integrated Exotel telephony with a one-click call button on ticket pages for support staff.",
      "Overhauled lead management with custom forms and round-robin assignment, raising distribution efficiency by 40%.",
      "Fixed critical production bugs and extracted shared utilities, cutting recurring defects by 25%.",
    ],
    stack: ["Node.js", "TypeScript", "React.js", "Next.js", "MongoDB", "Express.js", "Redis", "Docker", "GCP", "JWT"],
  },
  {
    featured: false,
    title: "Software Developer",
    company: "Sustally Technologies Private Limited",
    location: "Remote, India",
    period: "Oct 2023 — Feb 2025",
    dot: "#111",
    logoBg: "#000",
    logoImg: "/sustally.png",
    border: "var(--line)",
    barOpacity: 0.45,
    bullets: [
      "Led the frontend build of a public sustainability dashboard (Next.js + Tailwind) with QR-based real-time metrics — engagement up 50%.",
      "Built REST APIs for Excel bulk import/export via Excel.js, reducing manual reporting errors by 30%.",
      "Shipped mobile-first data entry platforms that auto-aggregate daily uploads into reports, saving 20% of reporting time.",
      "Refactored React and Node.js modules to remove bottlenecks and keep the codebase modular and testable.",
    ],
    stack: ["React.js", "Next.js", "TypeScript", "Node.js", "MongoDB", "Express.js", "Tailwind CSS", "MUI", "Docker", "AWS"],
  },
  {
    featured: false,
    title: "RPA Developer",
    company: "GXS India Technology Centre (OpenText)",
    location: "Bengaluru, India",
    period: "Dec 2022 — Jun 2023",
    dot: "#0034c8",
    logoBg: "#0034c8",
    logoImg: "/opentext.jpeg",
    border: "var(--line)",
    barOpacity: 0.45,
    bullets: [
      "Automated 20+ enterprise web form workflows with UiPath, improving data accuracy for business-critical operations.",
      "Built automation pipelines using FTP scripting, XML parsing and web scraping — throughput up 30%, execution time down 20%.",
    ],
    stack: ["UiPath", "Python", "XML", "JSON", "FTP", "Jira", "Agile"],
  },
];

const projects = [
  {
    title: "HeyDJ",
    description: "Real-time Spotify QR voting app — guests scan, vote on tracks, and the DJ queue reorders live in front of the room.",
    shot: "/heydj.png",
    tech: ["React.js", "Spotify API", "Node.js", "Socket.io", "QR"],
    url: "https://heydj-tau.vercel.app",
  },
  {
    title: "Nomad Navigator",
    description: "AI trip planner wiring together Google Maps, Skyscanner and OpenWeather, with live collaboration and budget tracking.",
    shot: "/nomad.png",
    tech: ["Next.js", "Google Maps", "Skyscanner API", "OpenWeather"],
    url: "https://nomad-navigator-8quy.vercel.app",
  },
];

const skillGroups = [
  { num: "01", label: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "Python", "Java"] },
  { num: "02", label: "Backend", items: ["Node.js", "Express.js", "REST APIs", "MVC", "JWT Auth"] },
  { num: "03", label: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "MUI", "Redux", "Framer Motion"] },
  { num: "04", label: "Cloud & DevOps", items: ["AWS Lambda", "EC2", "S3", "GCP", "Docker", "Serverless", "Git"] },
  { num: "05", label: "Databases", items: ["MongoDB", "MySQL", "Redis"] },
  { num: "06", label: "Tools", items: ["Postman", "Playwright", "Jira", "UiPath", "Excel.js"] },
];

const education = [
  {
    logoImg: "/veltech.png",
    period: "May 2023",
    degree: "B.Tech — Computer Science & Engineering",
    school: "Vel Tech R&D Institute of Science and Technology, Chennai",
    detail: "CGPA 9.21 / 10 · First Class with Distinction",
  },
  {
    period: "Mar 2019",
    degree: "Intermediate (12th)",
    school: "Toppers Junior College",
    detail: "920 / 1000 · A Grade · Telangana State Board",
  },
  {
    period: "Mar 2017",
    degree: "SSC (10th)",
    school: "Pace School, Rukminipuri",
    detail: "CGPA 8.7 / 10 · Board of Secondary Education, Telangana",
  },
];

const awards = [
  "Runner-Up — Codeathon '22, Vel Tech",
  "Runner-Up — PI Pro, Vel Tech",
  "Institute Rank #24 of 2,000+ on GeeksforGeeks",
  "300+ problems solved across LeetCode & GFG",
  "Mentor — Google Developer Student Club",
];

const certs = [
  "Complete Web Developer Bootcamp — Udemy",
  "React – The Complete Guide — Udemy",
  "Machine Learning — Stanford / Coursera",
  "AWS: Introduction to Cloud",
];

const menuItems = [
  { label: "About", href: "#about", num: "01" },
  { label: "Experience", href: "#experience", num: "02" },
  { label: "Work", href: "#projects", num: "03" },
  { label: "Skills", href: "#skills", num: "04" },
  { label: "Education", href: "#education", num: "05" },
  { label: "Photos", href: "#photography", num: "06" },
  { label: "Music", href: "#music", num: "07" },
  { label: "Ask me", href: "#terminal", num: "08" },
  { label: "Contact", href: "#contact", num: "09" },
];

export const contactInfo = {
  email: "rahulcompani7@gmail.com",
  phone: "+91 79810 36928",
  location: "Hyderabad, India",
  linkedin: "linkedin.com/in/rahul-compani",
  github: "github.com/RahulCompani7",
  resume: "/Rahul_Compani_Resume.pdf",
  instagram: "https://instagram.com/aurah.lens",
  // Open Spotify > your profile > ... > Share > Copy link to profile, and
  // paste it here. The hero link stays hidden while this is empty — better
  // than guessing an id and sending visitors to a stranger's profile.
  spotify: "",
};

// ---------------------------------------------------------------------------
// Terminal output is DERIVED from the data above rather than hand-written, so
// the shell can never drift out of sync with the rest of the page.
// ---------------------------------------------------------------------------

const terminalCommands = {
  help: [
    "Available commands:",
    "",
    "  about        who I am, briefly",
    "  experience   full role history",
    "  projects     what I've built, with links",
    "  skills       the stack, grouped",
    "  education    degrees and scores",
    "  photography  frames I've shot",
    "  awards       recognition and rankings",
    "  certs        certifications",
    "  contact      email, phone and socials",
    "  resume       download my CV",
    "  theme        switch light / dark",
    "  clear        clear the screen",
    "",
    "Tip: press ↑ / ↓ to cycle through previous commands.",
  ].join("\n"),

  about: [
    "Rahul Compani — Full-stack developer, based in Hyderabad, India.",
    "",
    "3+ years shipping end-to-end SaaS platforms, REST APIs and cloud-native",
    "backends across Node.js, React/Next.js, MongoDB and serverless AWS.",
    "Currently a Senior Consultant at EY, advising enterprise clients on cloud",
    "modernization. I like owning a feature from schema design through to a UI",
    "that actually feels good to use.",
  ].join("\n"),

  experience: experience
    .map((j) =>
      [
        `${j.title} · ${j.company}`,
        `${j.period} · ${j.location}`,
        `stack: ${j.stack.join(", ")}`,
      ].join("\n")
    )
    .join("\n\n"),

  projects: projects
    .map((p) => [p.title, p.description, `tech: ${p.tech.join(", ")}`, p.url].join("\n"))
    .join("\n\n"),

  skills: skillGroups.map((g) => `${g.label}\n  ${g.items.join(", ")}`).join("\n\n"),

  education: education
    .map((e) => [e.degree, e.school, `${e.period} · ${e.detail}`].join("\n"))
    .join("\n\n"),

  // Deliberately doesn't enumerate the photos: the gallery is live, so any
  // list hard-coded here would be wrong the moment a new post goes up.
  photography: [
    "I shoot when I travel, and the gallery on this page pulls straight from",
    `Instagram${snapshotHandle ? ` (@${snapshotHandle})` : ""} — newest frames first, no manual updating.`,
    "",
    "Scroll to 06 — Through the lens to see them full size.",
  ].join("\n"),

  awards: awards.map((a) => `• ${a}`).join("\n"),

  certs: certs.map((c) => `• ${c}`).join("\n"),

  contact: [
    `email      ${contactInfo.email}`,
    `phone      ${contactInfo.phone}`,
    `linkedin   ${contactInfo.linkedin}`,
    `github     ${contactInfo.github}`,
    `location   ${contactInfo.location}`,
    "",
    "Usually reply within a day.",
  ].join("\n"),

  resume: "Downloading Rahul_Compani_Resume.pdf ...",

  // Handled specially by the Terminal component.
  theme: "Theme switched.",
  clear: "",
};

export const portfolioData = {
  roles,
  marquee,
  stats,
  experience,
  projects,
  skillGroups,
  education,
  awards,
  certs,
  menuItems,
  terminalCommands,
};
