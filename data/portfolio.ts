export type NavItem = {
  label: string;
  href: string;
  id: string;
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: string[];
};

export type ProjectItem = {
  name: string;
  summary: string;
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
  image?: string;
  imageAlt?: string;
};

export const portfolio = {
  name: "Habibur Rahman Tanvir",
  role: "MERN Stack Developer",
  tagline: "Building modern web applications with the MERN ecosystem.",
  introduction:
    "I design and build clean, reliable web experiences with a focus on thoughtful product logic, strong frontend detail, and solid backend integration.",
  about:
    "I am a MERN Stack Developer with a strong interest in building complete web applications that feel polished and work reliably. My work combines frontend craftsmanship, API design, and database-driven application logic to create useful digital products from idea to deployment.",
  location: "Bangladesh",
  email: "TODO: add email",
  githubUrl: "TODO: add GitHub URL",
  linkedinUrl: "TODO: add LinkedIn URL",
  resumeUrl: undefined,
  navItems: [
    { label: "Home", href: "/", id: "home" },
    { label: "About", href: "/about", id: "about" },
    { label: "Skills", href: "/skills", id: "skills" },
    { label: "Projects", href: "/projects", id: "projects" },
    { label: "Contact", href: "/contact", id: "contact" },
  ] as NavItem[],
  skillGroups: [
    {
      title: "Frontend",
      description: "Responsive interfaces and modern UI patterns.",
      skills: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "Responsive Design",
      ],
    },
    {
      title: "Backend",
      description: "RESTful APIs and business logic for dynamic products.",
      skills: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "Authentication",
        "Backend Architecture",
        "API Integration",
      ],
    },
    {
      title: "Database",
      description: "Data modeling and reliable persistence.",
      skills: [
        "MongoDB",
        "Mongoose",
        "Schema Design",
        "CRUD",
        "Data Relationships",
        "Query Optimization",
      ],
    },
    {
      title: "Tools & Workflow",
      description: "Practical engineering workflow and product delivery.",
      skills: [
        "Git",
        "GitHub",
        "Vercel",
        "Postman",
        "Figma",
        "Testing",
        "Agile Workflow",
        "Debugging",
      ],
    },
  ] as SkillGroup[],
  projects: [
    {
      name: "SocialNet",
      summary:
        "TODO: Add a factual summary for SocialNet based on project documentation or owner-provided description.",
      stack: ["MongoDB", "Express", "React", "Node.js"],
      repoUrl: "TODO: add repository URL",
      liveUrl: undefined,
      image: undefined,
      imageAlt: "SocialNet project preview",
    },
    {
      name: "FixFlow",
      summary:
        "TODO: Add a factual summary for FixFlow based on project documentation or owner-provided description.",
      stack: ["MongoDB", "Express", "React", "Node.js"],
      repoUrl: "TODO: add repository URL",
      liveUrl: undefined,
      image: undefined,
      imageAlt: "FixFlow project preview",
    },
  ] as ProjectItem[],
};

export const sectionOrder = [
  "home",
  "about",
  "skills",
  "projects",
  "contact",
] as const;
export const sectionMap = {
  home: "/",
  about: "/about",
  skills: "/skills",
  projects: "/projects",
  contact: "/contact",
} as const;

export const validSections = new Set(Object.keys(sectionMap));
