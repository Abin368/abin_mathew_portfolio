export const profile = {
  name: "Abin Mathew",
  shortName: "Abin",
  role: "Full Stack Developer (Node.js, React, TypeScript)",
  location: "Kerala, India",
  status: "Open to new opportunities",
  bio: "I build web applications and APIs with React, Node.js and TypeScript. My work covers freight quotation, healthcare, B2B trade and real estate platforms.",
  about: [
    "I’m a full stack developer with 3.5+ years of experience. I started at Cognizant, where I maintained REST APIs for enterprise applications with Node.js, Express and MongoDB, and improved API performance by about 25%. After that I spent over a year building BodyFirst, a multi-tenant gym management SaaS, on my own. I built the backend, the React frontend, Stripe billing, and deployment on AWS with Docker.",
    "Today I work at aTeam Soft Solutions on freight quotation, B2B trade, healthcare and real estate products. My work includes payment and CRM integrations, role-based access control, WebSocket features, and tools that use AI to read customer emails. I like clear data models, tests that cover failure cases, and code that the next developer can read."
  ],
  email: "abinmathew3720@gmail.com",
  photo: "/card-front.png",
  socials: [
    { label: "GitHub", url: "https://github.com/Abin368" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/abin-mathew-444468196" },
    { label: "LeetCode", url: "https://leetcode.com/u/abin_mathew/" },
    { label: "Email", url: "mailto:abinmathew3720@gmail.com" }
  ],
  skills: {
    frontend: [
      "React.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Next.js",
      "MobX",
      "HTML5 & CSS3",
      "Tailwind CSS"
    ],
    backend: [
      "Node.js",
      "Express.js",
      "NestJS",
      "REST APIs",
      "WebSocket",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Prisma",
      "Sequelize",
      "Redis",
      "JWT & RBAC",
      "Zod"
    ],
    tools: [
      "Git & GitHub",
      "Docker",
      "AWS (EC2, S3)",
      "Nginx",
      "PM2",
      "Jest & Supertest",
      "Swagger / OpenAPI",
      "Prometheus & Grafana",
      "Stripe",
      "SendGrid & Twilio",
      "Jira"
    ]
  },
  projects: [
    {
      id: "01",
      title: "BodyFirst",
      category: "Full-Stack SaaS Platform",
      year: "2025",
      description: "A multi-tenant gym management platform where each gym operates as an isolated tenant, with membership management, user roles, and recurring Stripe billing. Built the backend, React frontend, and AWS Docker deployment.",
      tags: ["React", "TypeScript", "MobX", "Node.js", "Express", "MongoDB", "Redis", "Stripe", "Docker", "AWS"],
      link: "https://github.com/Abin368/bodyFirst"
    },
    {
      id: "02",
      title: "aiFreight",
      category: "Freight Quotation Platform (Enterprise)",
      year: "2026",
      description: "An automated quotation desk for ocean freight exports where AI parses customer enquiries, deterministic rules calculate pricing, and staff verify quotes. Built Okargo rates integration, automated PDF quotation templates, and email/phone pipeline.",
      tags: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "React", "Docker"],
      link: ""
    },
    {
      id: "03",
      title: "GenieJackk",
      category: "B2B Trade Platform",
      year: "2025–2026",
      description: "A trade platform for suppliers and buyers featuring tiered pricing, multi-currency transactions, a 9-stage order workflow, and role-based permissions. Engineered 30+ core APIs, AWS S3 storage, and portal features.",
      tags: ["React", "Node.js", "PostgreSQL", "AWS S3", "SendGrid", "Twilio", "Jest"],
      link: ""
    },
    {
      id: "04",
      title: "MuscleBlaze",
      category: "E-Commerce Web Application",
      year: "2024",
      description: "A nutritional supplement store with role-based authentication, sales analytics reports exported to Excel, product catalog management, and AWS EC2 deployment with Nginx and PM2.",
      tags: ["Node.js", "Express", "MongoDB", "EJS", "Nginx", "PM2", "AWS EC2"],
      link: "https://github.com/Abin368/muscleBlaze"
    }
  ]
};
