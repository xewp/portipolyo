import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.substring(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none"
    >
      <div 
        className={`flex items-center justify-between w-full max-w-5xl px-6 py-3 transition-all duration-500 pointer-events-auto rounded-2xl border ${
          scrolled 
            ? "bg-dark/40 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] scale-95" 
            : "bg-transparent border-transparent scale-100"
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="relative group flex items-center gap-2"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-[0_0_20px_rgba(102,255,0,0.3)] group-hover:shadow-[0_0_30px_rgba(102,255,0,0.5)] transition-all duration-300">
            <span className="text-dark font-black text-xl">K</span>
          </div>
          <span className="hidden sm:block text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors duration-300">
            BAUTISTA
          </span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;

            return (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg flex items-center gap-2 ${
                    isActive
                      ? "text-primary"
                      : "text-gray-light hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Action Button (Optional, but adds premium feel) */}
        <div className="hidden md:block">
          <motion.a
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-primary text-dark text-sm font-bold rounded-xl shadow-[0_0_20px_rgba(102,255,0,0.2)] hover:shadow-[0_0_30px_rgba(102,255,0,0.4)] transition-all duration-300"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-primary hover:bg-primary/10 rounded-xl transition-all duration-300"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-24 left-4 right-4 p-6 bg-dark/90 backdrop-blur-2xl border border-white/10 rounded-3xl md:hidden shadow-2xl pointer-events-auto"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const sectionId = link.href.substring(1);
                const isActive = activeSection === sectionId;

                return (
                  <motion.li 
                    key={link.name}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      className={`block py-3 px-4 text-lg font-medium rounded-2xl transition-all duration-300 ${
                        isActive
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-gray-light hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/5">
                <button 
                  onClick={(e) => handleClick(e, "#contact")}
                  className="w-full py-4 bg-primary text-dark font-bold rounded-2xl shadow-[0_0_20px_rgba(102,255,0,0.3)]"
                >
                  Get In Touch
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;

