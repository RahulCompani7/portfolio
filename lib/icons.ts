// Maps skill/tool names shown in the Skills section to a Simple Icons slug.
// Icons are pulled from the public Simple Icons CDN (https://cdn.simpleicons.org).
// Anything without a good brand-icon match (e.g. "REST APIs", "MVC") is left
// out on purpose — LogoTile falls back to initials automatically.
export const skillIconSlugs: Record<string, string> = {
  "JavaScript (ES6+)": "javascript",
  "TypeScript": "typescript",
  "Python": "python",
  "Node.js": "nodedotjs",
  "Express.js": "express",
  "JWT Auth": "jsonwebtokens",
  "React.js": "react",
  "Next.js": "nextdotjs",
  "Tailwind CSS": "tailwindcss",
  "MUI": "mui",
  "Redux": "redux",
  "Framer Motion": "framer",
  "GCP": "googlecloud",
  "Docker": "docker",
  "Serverless": "serverless",
  "Git": "git",
  "MongoDB": "mongodb",
  "MySQL": "mysql",
  "Redis": "redis",
  "Postman": "postman",
  "Jira": "jira",
  "UiPath": "uipath",
};

export function skillIconSrc(name: string): string | null {
  const slug = skillIconSlugs[name];
  return slug ? `https://cdn.simpleicons.org/${slug}` : null;
}
