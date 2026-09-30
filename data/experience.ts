export type Experience = {
  id: string;
  role: string;
  company?: string;
  period: string;
  location: string;
  description?: string;
  tags?: string[];
};

// Company, description, and tools are optional so each entry contains only
// the details you want to share. Add or reorder roles as your experience grows.
export const experience: Experience[] = [
  {
    id: "freelance-full-stack",
    role: "Full Stack Developer Freelancer",
    company: "Independent",
    period: "Jun 2026 – Present",
    location: "Philippines / Remote",
  },
  {
    id: "full-stack-internship",
    role: "Full Stack Developer Intern",
    company: "TDT Powersteel Corp.",
    period: "Nov 2025 – May 2026",
    location: "Sampaloc, Manila",
  },
];
