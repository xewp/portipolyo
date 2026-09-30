export const site = {
  name: "Kaizz Bautista",
  role: "Full Stack Developer",
  initials: "KB",
  email: "zziakbautista@gmail.com",
  siteUrl: "https://xewp.vercel.app",
  availability: "Open to thoughtful collaborations",
  heroHeadline: ["Thoughtful", "by design."],
  heroIntro: "Full Stack Developer",
  heroDescription:
    "I turn complex ideas into clear, considered digital experiences. A careful eye for design. A hands-on approach to building.",
  bio: [
    "I approach every project with curiosity, a clear point of view, and a belief that good digital work should feel effortless to use.",
    "My practice connects thoughtful interfaces with full-stack development and AI-assisted workflows. From the first sketch to the last interaction, I care about the details that make an idea work in the real world.",
  ],
  location: "Philippines / Remote",
  socials: [
    { label: "GitHub", href: "https://github.com/xewp" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kaizz-lundgrenn-bautista-349454390/?skipRedirect=true",
    },
    { label: "Twitter", href: "https://twitter.com/sh4rkSPY" },
  ],
  skills: [
    {
      category: "Frontend",
      items: [
        "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS",
        "Framer Motion", "Vite",
      ],
    },
    {
      category: "Backend",
      items: [
        "Node.js", "Express.js", "MongoDB", "Supabase", "REST APIs", "JWT",
        "AES-256 Encryption",
      ],
    },
    {
      category: "AI & Machine Learning",
      items: [
        "OpenAI API", "Anthropic Claude", "LangChain", "LlamaIndex",
        "Claude Code", "Prompt Engineering",
      ],
    },
    {
      category: "Developer Tools",
      items: ["Git", "GitHub", "Postman", "Figma", "Vercel"],
    },
  ],
} as const;

// All section copy lives here so the page can be edited without changing JSX.
export const sectionCopy = {
  about: {
    number: "02",
    label: "A little context",
    title: "A curious mind.\nA considered approach.",
    locationLabel: "Based in",
    skillsLabel: "The working toolkit",
  },
  experience: {
    number: "03",
    label: "The path so far",
    title: "Always\nbuilding forward.",
    intro:
      "From an internship in Manila to independent full-stack work, each chapter shapes how I build.",
    timelineLabel: "Professional experience",
  },
  contact: {
    number: "04",
    label: "Start a conversation",
    title: "Have something\nin mind?",
    intro:
      "A new idea, an interesting challenge, or a simple hello. I’d love to hear what you’re thinking.",
    socialLabel: "Elsewhere on the internet",
    opensInNewTab: "(opens in a new tab)",
    formTitle: "Leave a note",
    emailSubject: "Portfolio Contact",
    nameLabel: "Your name",
    namePlaceholder: "Alex Morgan",
    emailLabel: "Email address",
    emailPlaceholder: "alex@example.com",
    messageLabel: "What are you thinking?",
    messagePlaceholder: "Tell me a little about your project…",
    submitLabel: "Send message",
    sendingLabel: "Sending…",
    cooldownLabel: "Send again in",
    successMessage: "Your message is on its way. Thanks for reaching out.",
    errorMessage: "Your message couldn’t be sent. Please try again or email me directly.",
    validationMessage: "Please enter a name of at least 2 characters and a message of at least 10 characters, excluding surrounding spaces.",
    setupMessage: "The contact form is being set up. Please use the email link for now.",
  },
  footer: {
    copyright: "All rights reserved.",
    backToTop: "Back to top",
  },
} as const;

export const navigation = [
  { label: "Work", href: "#work", number: "01" },
  { label: "About", href: "#about", number: "02" },
  { label: "Experience", href: "#experience", number: "03" },
  { label: "Contact", href: "#contact", number: "04" },
] as const;
