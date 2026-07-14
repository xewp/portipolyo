import { ArrowUp, Github, Linkedin, Mail, Twitter } from "lucide-react";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { Icon: Github, href: "https://github.com/xewp", label: "GitHub" },
    {
      Icon: Linkedin,
      href: "https://www.linkedin.com/in/kaizz-lundgrenn-bautista-349454390/?skipRedirect=true",
      label: "LinkedIn",
    },
    {
      Icon: Twitter,
      href: "https://twitter.com/sh4rkSPY",
      label: "Twitter",
    },
    { Icon: Mail, href: "mailto:zziakbautista@gmail.com", label: "Email" },
  ];

  return (
    <footer className="border-t border-gray-200 py-8 px-4 sm:px-6">
      <div className="max-w-wide mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="font-mono text-micro text-gray-400 uppercase tracking-wider text-center sm:text-left">
            © {new Date().getFullYear()} Kaizz Bautista
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-ink transition-colors duration-200 no-underline"
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group p-2 border border-gray-200 rounded-input text-gray-400 hover:text-ink hover:border-gray-400 transition-all duration-200"
            aria-label="Back to top"
          >
            <ArrowUp
              size={14}
              className="group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </button>
        </div>

        {/* Built-with note */}
        <div className="mt-6 pt-5 border-t border-gray-200 text-center">
          <p className="font-mono text-micro-xs text-gray-400 uppercase tracking-wider">
            Built with React · Vite · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
