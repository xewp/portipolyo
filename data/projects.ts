export type Project = {
  id: number;
  slug: string;
  title: string;
  role: string;
  description: string;
  tech: string[];
  image: string;
  imageSrcSet?: string;
  imageAlt: string;
  github: string;
  live: string;
  caseStudy: {
    overview: string;
    challenge: string;
    approach: string;
    outcome: string;
  };
};

// Full-stack roles confirmed by the portfolio owner. Project dates are intentionally omitted.
// Case studies describe the documented implementation without invented impact metrics.
export const projects: Project[] = [
  {
    "id": 1,
    "slug": "storyforge-ai",
    "title": "Storyforge AI",
    "role": "Full Stack Developer",
    "description": "Full-stack AI content workspace with Gemini, Groq, Mistral, and OpenRouter integrations. Turns a topic brief into research, strategy, outlines, scripts, and supporting content with persistent projects and export tools.",
    "tech": [
      "React",
      "Node.js",
      "Express",
      "Supabase",
      "PostgreSQL",
      "Multiple LLMs",
      "Tailwind CSS",
      "Framer Motion",
      "React Query"
    ],
    "image": "/projects/aurapres.png",
    "imageSrcSet": "/projects/aurapres-640.webp 640w, /projects/aurapres-1280.webp 1024w",
    "imageAlt": "Storyforge AI content engine interface",
    "github": "",
    "live": "https://storyforge-kappa-ten.vercel.app",
    "caseStudy": {
      "overview": "I built Storyforge AI as a full-stack workspace for creators who want to turn a topic into an organized content package. A guided brief captures the platform, niche, audience, tone, and desired outputs. The application then brings research, strategy, outlines, scripts, and supporting planning assets into a persistent project workspace.",
      "challenge": "Content creation involves several dependent steps: a script needs an outline, an outline needs a direction, and each output needs to stay aligned with the original brief. The engineering challenge was to connect those steps into a coherent workflow while handling long-running AI requests, failed responses, and the need to revisit individual outputs without starting the entire project again.",
      "approach": "I developed the React interface and Node.js/Express API, connected Supabase authentication and PostgreSQL storage, and implemented the generation workflow across both layers. Research and strategy run in parallel before the outline and script stages, followed by the selected supporting agents. The API starts the generation job while the workspace polls its progress and displays saved assets. I built provider adapters for Gemini, Groq, Mistral, and OpenRouter, with routing, retries, fallback handling, and shared response parsing. The workspace also supports regenerating individual assets, copying content, downloading JSON, and exporting the project as Markdown.",
      "outcome": "The result is a connected content-production workspace rather than a collection of separate prompts. Project briefs and generated assets persist, generation progress is visible, and creators can refine individual pieces or export the complete package. The project demonstrates my ownership of the interface, authentication, storage, backend orchestration, and AI-provider integrations."
    }
  },
  {
    "id": 2,
    "slug": "aura-select",
    "title": "Aura Select",
    "role": "Full Stack Developer",
    "description": "Full-stack talent-booking platform with JWT sessions, email verification, Cloudinary galleries, API-backed booking requests, and dedicated customer and administration interfaces.",
    "tech": [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "JWT",
      "Cloudinary"
    ],
    "image": "/projects/power-allure.png",
    "imageSrcSet": "/projects/power-allure-640.webp 640w, /projects/power-allure-1280.webp 1024w",
    "imageAlt": "Aura Select booking platform interface",
    "github": "",
    "live": "https://aura-select.onrender.com",
    "caseStudy": {
      "overview": "I built Aura Select as a full-stack talent-booking platform with separate customer and administration interfaces. Customers can browse talent profiles, save favorites, submit booking requests, and review their booking history. Administrators manage talent galleries, customer approvals, booking statuses, and operational settings through a dedicated dashboard.",
      "challenge": "A booking platform has to support two different workflows: customers need a clear path from discovering talent to submitting a request, while staff need control over profiles, availability-related scheduling, and request status. The application also needs to distinguish verified customers, administrators, and superadministrators so each person can access the appropriate tools.",
      "approach": "I developed the React customer and admin applications, the Express API, and MongoDB models with Mongoose. I implemented JWT session management, email OTP verification, and an account-approval flow before customers can proceed. Booking requests are stored through the API and connected to customer history, admin status controls, and a booking calendar. Cloudinary handles uploaded talent images and galleries. The administration layer includes model approval, settings, audit logs, and role-specific access, while email notifications support account and booking-related events.",
      "outcome": "Aura Select brings talent discovery, customer verification, booking requests, and back-office management into one system. Customers have an authenticated request-and-history workflow, and administrators have the tools to manage profiles and the booking lifecycle. My full-stack contribution covers both React interfaces, the API, database models, authentication, uploads, and administrative workflows."
    }
  },
  {
    "id": 3,
    "slug": "novasync",
    "title": "NovaSync",
    "role": "Full Stack Developer",
    "description": "Full-stack billing platform with Supabase authentication and data, Recharts analytics, Leaflet branch mapping, and PDF/CSV report exports through jsPDF and PapaParse.",
    "tech": [
      "React",
      "Supabase",
      "Recharts",
      "Leaflet",
      "Tailwind CSS",
      "jsPDF",
      "PapaParse"
    ],
    "image": "/projects/bildash.png",
    "imageSrcSet": "/projects/bildash-640.webp 640w, /projects/bildash-1280.webp 1024w",
    "imageAlt": "NovaSync financial dashboard interface",
    "github": "",
    "live": "https://novasync-tau.vercel.app/",
    "caseStudy": {
      "overview": "I built NovaSync as a full-stack billing-operations platform that connects invoice management, spending analysis, and branch-level visibility in an authenticated workspace. Its five main views cover the overview dashboard, billing records, analytics, locations, and activity history. Supabase provides authentication and the PostgreSQL data layer behind the React interface.",
      "challenge": "Billing data becomes harder to work with when due dates, payment status, departments, branches, and change history are scattered across separate views. The design objective was to make those relationships clear and navigable: users should be able to move from a financial overview to the underlying records, understand where costs are concentrated, and produce reports they can share.",
      "approach": "I connected the React application to Supabase authentication and relational data, then built billing creation, editing, filtering, pagination, duplicate warnings, and deletion with an undo window. Recharts turns the stored records into spending trends, department and branch comparisons, upcoming payment windows, and overdue age groups. Leaflet presents aggregated branch data on an interactive map with search and comparison controls. I added PDF generation with jsPDF and CSV exports with PapaParse, along with shared reference-data caching. The repository also includes database hardening definitions for role policies, billing-number sequences, audit triggers, and indexes.",
      "outcome": "The application combines record management, operational charts, geographic views, activity history, and exportable reports. It gives the same billing information several useful perspectives while keeping authentication and persistence connected to the interface. The work demonstrates end-to-end ownership of the React workflows, Supabase integration, analytical views, mapping, and report generation."
    }
  },
  {
    "id": 4,
    "slug": "comfort-cards",
    "title": "Comfort Cards",
    "role": "Full Stack Developer",
    "description": "Digital greeting card app with swipe-based navigation, canvas confetti celebrations, and a mobile-first responsive layout built entirely with Framer Motion.",
    "tech": [
      "React",
      "Vite",
      "Framer Motion",
      "Tailwind CSS",
      "Canvas-Confetti",
      "React-Swipeable"
    ],
    "image": "/projects/comcard.png",
    "imageSrcSet": "/projects/comcard-640.webp 640w, /projects/comcard-1280.webp 1024w",
    "imageAlt": "Comfort Cards digital greeting card interface",
    "github": "",
    "live": "https://comcards.vercel.app",
    "caseStudy": {
      "overview": "I developed Comfort Cards end to end as a digital greeting-card experience built around personal messages, swipe navigation, and playful visual feedback. The responsive React application lets visitors move through cards while animated transitions and confetti add a celebratory finish. My project role was Full Stack Developer.",
      "challenge": "A digital greeting can feel static when the message is presented as one block of text. The interaction challenge was to give the greeting a sense of progression without making navigation complicated on a small screen. Gesture handling, readable layouts, and animation needed to work together so the effects supported the message.",
      "approach": "I built the application with React and Vite and used Tailwind CSS for the responsive layouts. React-Swipeable connects touch gestures to the card-navigation flow, while Framer Motion controls transitions between cards. Canvas-Confetti supplies the celebration effect. I brought layout, navigation, gesture input, and animated feedback together as one coherent user experience.",
      "outcome": "Comfort Cards turns a simple greeting into a guided interactive experience with swipe navigation, animated cards, and confetti celebrations. It shows how responsive layouts and carefully chosen interactions can give a small application a distinct personality. The live version is available through the project link."
    }
  },
  {
    "id": 5,
    "slug": "vault-x",
    "title": "Vault-X",
    "role": "Full Stack Developer",
    "description": "MERN secret manager with client-side AES-256 encryption and Web Crypto password generation. Plaintext secrets never touch the backend — all encryption happens in the browser.",
    "tech": [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "AES-256",
      "Web Crypto API",
      "CSS Modules",
      "JWT"
    ],
    "image": "/projects/vaultx.png",
    "imageSrcSet": "/projects/vaultx-640.webp 640w, /projects/vaultx-1280.webp 1024w",
    "imageAlt": "Vault-X encrypted secret manager interface",
    "github": "",
    "live": "",
    "caseStudy": {
      "overview": "I built Vault-X as a full-stack secret manager using MongoDB, Express, React, and Node.js. Its defining architectural decision is a browser-side encryption boundary: secrets are encrypted with AES-256 before they are sent to the backend. The application also includes password generation through the Web Crypto API and JWT-based authentication.",
      "challenge": "Secret management requires a clear separation between the interface where sensitive values are entered and the server where records are stored. The central engineering challenge was to keep plaintext secrets out of the backend while still supporting an authenticated web application. Encryption and password generation therefore needed to happen in the browser as part of the application flow.",
      "approach": "I implemented the React interface with CSS Modules and placed AES-256 encryption on the client side. The Node.js and Express backend supports the application API, MongoDB provides persistence, and JWT manages authenticated access. I used the Web Crypto API for password generation, keeping that functionality alongside the browser-side security operations. This separates the client’s handling of readable secrets from the backend’s handling of encrypted records.",
      "outcome": "Vault-X brings authentication, encrypted secret storage, and browser-generated passwords into a MERN application. Its documented design keeps plaintext secrets out of the storage API by encrypting them before transmission. The project demonstrates full-stack ownership across the interface, API, database, authentication, and client-side encryption workflow."
    }
  }
];
