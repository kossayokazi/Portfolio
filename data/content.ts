export const profile = {
  name: "Kossay",
  email: "kossayokkazi5678@gmail.com",
  whatsapp: "+21621692825",
  github: "https://github.com/kossayokazi",
  linkedin: "https://www.linkedin.com/in/kossay-okazi/",
};

export const about = {
  text: "I'm a full-stack developer with a soft spot for clean interfaces and fast, well-built products. I work mainly with React and TypeScript on the front, and Node.js and MongoDB on the back. I recently built Iterum, an AI-powered Scrum platform with a fully local AI service, so I'm comfortable with everything from a polished UI to the logic behind it. I hold a Bachelor's degree in IT (with excellent honors) and speak Arabic, French, and English, so I'm happy to work with clients in their own language.",
};

export const services = [
  { id: "websites", title: "Business websites", text: "Fast, good-looking sites that turn visitors into customers." },
  { id: "apps", title: "Web apps and SaaS MVPs", text: "From idea to a working product, with authentication, dashboards, and real-time features." },
  { id: "ecommerce", title: "E-commerce stores", text: "Stores that are easy to manage and pleasant to shop." },
  { id: "ai", title: "AI and automation", text: "Practical AI features and workflow automation, including local models that keep your data private." },
];

export const skillGroups = [
  {
    group: "Frontend",
    icon: "code",
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    group: "Backend",
    icon: "server",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Express", level: 75 },
      { name: "Python", level: 65 },
      { name: "Java / Spring Boot", level: 60 },
    ],
  },
  {
    group: "Databases",
    icon: "database",
    skills: [
      { name: "MongoDB", level: 80 },
      { name: "MySQL", level: 75 },
      { name: "Oracle SQL", level: 60 },
      { name: "Supabase", level: 70 },
    ],
  },
  {
    group: "Tools and AI",
    icon: "spark",
    skills: [
      { name: "Git / GitHub", level: 85 },
      { name: "REST APIs", level: 85 },
      { name: "JWT auth", level: 75 },
      { name: "Ollama", level: 70 },
    ],
  },
];

export const experience = [
  { role: "Web Developer", org: "White Honey", period: "Jun 2026 – Sep 2026", text: "Built a web app for product, supplier, and stock management." },
  { role: "PFE Intern", org: "STRATYZE", period: "Feb 2026 – Jun 2026", text: "Built Iterum, an AI-powered Scrum platform, with a teammate." },
  { role: "Summer Intern", org: "Institut Horizon", period: "Jun 2025 – Aug 2025", text: "Delivered software solutions and handled system maintenance." },
  { role: "Advanced Intern", org: "Gafsa Phosphate Company (CPG)", period: "Jan 2025 – Feb 2025", text: "Full-stack web solutions with Node.js and MongoDB." },
];

export const education = {
  degree: "Bachelor's Degree in Information Technology (Excellent)",
  school: "Higher Institute of Technological Studies (ISET), Gafsa",
  year: "2026",
};
export const projects = [
  {
    slug: "iterum", featured: true, category: "ai",
    title: "Iterum",
    oneLiner: "An AI-powered Scrum platform that runs on your own machine, so no data goes to outside AI services.",
    problem: "Agile teams lose hours turning specification documents into backlogs and user stories, and many can't send project data to cloud AI tools.",
    solution: "Iterum generates prioritized backlogs (MoSCoW) and user stories from spec documents using a local AI model. It also includes an in-app AI assistant and five role-based dashboards for Admin, Company, Product Owner, Scrum Master, and Developer.",
    role: "Final-year project, built with a teammate. I built the frontend and the application logic, deployed the platform, and wrote the documentation.",
    highlights: [
      "5 Scrum sprints and 56 user stories delivered, with 96% Definition-of-Done compliance",
      "Live Kanban board and team chat via Socket.IO",
      "Local AI service (FastAPI, Ollama, Mistral 7B), fully decoupled from the main app",
      "Cloudinary uploads, Resend emails, and an automated sprint scheduler",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Python", "FastAPI", "Ollama", "Socket.IO"],
    github: "", live: "",
  },
  {
    slug: "solofact", featured: true, category: "saas",
    title: "SoloFact",
    oneLiner: "A freelance platform for invoices, projects, contracts, and messaging, with AI CV parsing.",
    problem: "Freelancers juggle invoices, contracts, and client messages across scattered tools.",
    solution: "SoloFact covers the whole engagement, from finding a project and applying, to signing a contract and invoicing, to chatting with the client in real time.",
    role: "Started as an academic project; rebuilt independently as a production-style product with far more features.",
    highlights: [
      "AI profile builder: upload a CV (PDF or DOCX) and an LLM fills in the profile for review",
      "Digital contract signing in the browser",
      "Invoice generator with automatic numbering, tax calculation, and PDF export",
      "Kanban board, revenue dashboard, real-time notifications and messaging",
      "3D landing page, dark mode, installable as a mobile app (PWA)",
    ],
    stack: ["React 19", "TypeScript", "Vite", "Tailwind", "Framer Motion", "Three.js", "Node.js", "Express", "Supabase", "WebSockets"],
    github: "https://github.com/kossayokazi/solofact", live: "",
  },
  {
    slug: "business-manager", featured: false, category: "web",
    title: "Business Manager",
    oneLiner: "A web app for small businesses to manage clients, services, and schedules.",
    problem: "Small businesses often track clients, services, and appointments across spreadsheets and paper.",
    solution: "A dashboard for clients and services, calendar-based scheduling, secure login, and a REST API behind it all.",
    role: "Built the full CRUD workflow and the API-driven interface.",
    highlights: [
      "Full CRUD for clients and services",
      "Calendar-based scheduling",
      "Secure authentication",
      "REST API with a Java / Spring Boot backend",
    ],
    stack: ["React", "TypeScript", "Vite", "Spring Boot", "Spring Data JPA", "MySQL"],
    github: "https://github.com/kossayokazi/BusinessManager", live: "",
  },
];