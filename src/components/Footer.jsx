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
    <footer className="bg-dark-lighter border-t border-primary/20 py-8 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-gray-secondary text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-primary font-semibold">My Portfolio</span>.
            All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark-card border border-primary/30 rounded-lg text-gray-light hover:text-primary hover:border-primary transition-all duration-300 hover:scale-110"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="p-2 bg-primary text-dark rounded-lg hover:bg-primary-dark transition-all duration-300 hover:scale-110 group"
            aria-label="Back to top"
          >
            <ArrowUp
              size={20}
              className="group-hover:-translate-y-1 transition-transform duration-300"
            />
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-primary/10 text-center">
          <p className="text-gray-secondary text-sm">
            Built with <span className="text-primary">React</span>,{" "}
            <span className="text-primary">Vite</span>, and{" "}
            <span className="text-primary">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
