export const projectsData = [
  {
    id: 1,
    title: "Power Allure",
    description: "A premium model and talent booking platform featuring secure session management, real-time booking, and a comprehensive admin dashboard for talent management.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT", "Cloudinary"],
    image: "/projects/power-allure.png",
    github: "https://github.com/xewp/allure",
    live: "https://allure-client.vercel.app"
  },
  {
    id: 2,
    title: "Billings Dashboard",
    description: "Financial management system with interactive data visualization, geographical mapping of billing centers, and automated PDF/CSV reporting.",
    tech: ["React", "Supabase", "Recharts", "Leaflet", "Tailwind CSS", "jsPDF", "PapaParse"],
    image: "/projects/bildash.png",
    github: "https://github.com/xewp/billing_dashboard",
    live: "https://billing-dashboard-demo.vercel.app"
  },
  {
    id: 3,
    title: "Comfort Cards",
    description: "A joyful digital greeting card platform with smooth swipe animations, celebratory confetti effects, and a mobile-first responsive design.",
    tech: ["React", "Vite", "Framer Motion", "Tailwind CSS", "Canvas-Confetti", "React-Swipeable"],
    image: "/projects/comcard.png",
    github: "https://github.com/xewp/comcards",
    live: "https://comcards.vercel.app"
  },
  {
    id: 4,
    title: "Vault-X",
    description: "A professional-grade MERN secret manager with client-side AES-256 encryption, in-memory vault key handling, and a built-in Web Crypto password generator — plaintext secrets never touch the backend.",
    tech: ["React", "Node.js", "Express", "MongoDB", "AES-256", "Web Crypto API", "CSS Modules", "JWT"],
    image: "/projects/vaultx.png",
    github: "https://github.com/xewp/vault-x",
    live: ""
  }
];

export const skillsData = {
  frontend: [
    { name: "React", level: 75 },
    { name: "JavaScript", level: 78 },
    { name: "HTML/CSS", level: 82 },
    { name: "Tailwind CSS", level: 80 },
    { name: "Framer Motion", level: 70 }
  ],
  backend: [
    { name: "Node.js", level: 70 },
    { name: "Express", level: 72 },
    { name: "MongoDB", level: 68 },
    { name: "REST APIs", level: 75 },
    { name: "AES-256 / Web Crypto", level: 65 }
  ],
  tools: [
    { name: "Git / GitHub", level: 78 },
    { name: "Postman", level: 72 },
    { name: "Vite", level: 75 },
    { name: "Figma", level: 60 },
    { name: "Vercel / Railway", level: 70 }
  ]
};

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/xewp",
    icon: "Github"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/kaizz-lundgrenn-bautista-349454390/?skipRedirect=true",
    icon: "Linkedin"
  },
  {
    name: "Twitter",
    url: "https://twitter.com/sh4rkSPY",
    icon: "Twitter"
  },
  {
    name: "Email",
    url: "mailto:zziakbautista@gmail.com",
    icon: "Mail"
  }
];
