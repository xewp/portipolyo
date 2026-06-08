export const projectsData = [
  {
    id: 1,
    title: "Power Allure",
    description: "Full-stack booking platform with JWT session management, Cloudinary image uploads, real-time booking flow, and an admin dashboard for talent management.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT", "Cloudinary"],
    image: "/projects/power-allure.png",
    github: "https://github.com/xewp/allure",
    live: "https://allure-client.vercel.app"
  },
  {
    id: 2,
    title: "Billings Dashboard",
    description: "Financial dashboard with Recharts visualizations, Leaflet geographical mapping of billing centers, and automated PDF/CSV report generation via jsPDF and PapaParse.",
    tech: ["React", "Supabase", "Recharts", "Leaflet", "Tailwind CSS", "jsPDF", "PapaParse"],
    image: "/projects/bildash.png",
    github: "https://github.com/xewp/billing_dashboard",
    live: "https://billing-dashboard-demo.vercel.app"
  },
  {
    id: 3,
    title: "Comfort Cards",
    description: "Digital greeting card app with swipe-based navigation, canvas confetti celebrations, and a mobile-first responsive layout built entirely with Framer Motion.",
    tech: ["React", "Vite", "Framer Motion", "Tailwind CSS", "Canvas-Confetti", "React-Swipeable"],
    image: "/projects/comcard.png",
    github: "https://github.com/xewp/comcards",
    live: "https://comcards.vercel.app"
  },
  {
    id: 4,
    title: "Vault-X",
    description: "MERN secret manager with client-side AES-256 encryption and Web Crypto password generation. Plaintext secrets never touch the backend — all encryption happens in the browser.",
    tech: ["React", "Node.js", "Express", "MongoDB", "AES-256", "Web Crypto API", "CSS Modules", "JWT"],
    image: "/projects/vaultx.png",
    github: "https://github.com/xewp/vault-x",
    live: ""
  }
];

export const skillsData = {
  frontend: [
    { name: "React", icon: "⚛️" },
    { name: "JavaScript", icon: "📜" },
    { name: "HTML / CSS", icon: "🌐" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "Framer Motion", icon: "✨" },
  ],
  backend: [
    { name: "Node.js", icon: "🟢" },
    { name: "Express", icon: "⚡" },
    { name: "MongoDB", icon: "🍃" },
    { name: "REST APIs", icon: "🔗" },
    { name: "JWT Auth", icon: "🔐" },
    { name: "Web Crypto / AES-256", icon: "🛡️" },
  ],
  tools: [
    { name: "Git / GitHub", icon: "🔀" },
    { name: "Postman", icon: "📮" },
    { name: "Vite", icon: "⚡" },
    { name: "Vercel / Railway", icon: "🚀" },
    { name: "Supabase", icon: "🐘" },
    { name: "Figma", icon: "🖌️" },
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
