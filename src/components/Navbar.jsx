import { useState, useEffect } from "react";
import { Sun, Moon, Monitor, X, Menu, Bot } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

function Navbar({ theme, onOpenFakeAI }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.substring(1));
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const themeIcon = {
    light: <Sun size={14} />,
    dark: <Moon size={14} />,
    system: <Monitor size={14} />,
  };

  /* ── Sidebar (≥1024px) ────────────────────────────────── */
  const sidebar = (
    <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-[14rem] flex-col justify-between border-r border-gray-200 bg-background/95 backdrop-blur-sm z-50 px-5 py-8 transition-colors duration-500">
      {/* Logo / Name */}
      <div>
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="block font-pixel text-lg lowercase tracking-tight text-ink no-underline mb-10"
        >
          kaizz
        </a>

        {/* Nav links */}
        <nav aria-label="Main navigation">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const id = link.href.substring(1);
              const active = activeSection === id;
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`flex items-center gap-2 py-2 px-2 rounded-input font-mono text-ui-small uppercase tracking-wider no-underline transition-colors duration-200 ${
                      active
                        ? "text-ink font-medium"
                        : "text-gray-400 hover:text-ink"
                    }`}
                  >
                    <span
                      className={`text-xs transition-opacity duration-200 ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      →
                    </span>
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Ask AI easter-egg button */}
        <button
          onClick={onOpenFakeAI}
          className="mt-4 flex items-center gap-2 py-2 px-2 rounded-input font-mono text-ui-small uppercase tracking-wider text-gray-400 hover:text-green-500 transition-colors duration-200 group"
        >
          <Bot size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
          Ask AI
        </button>
      </div>

      {/* Theme toggle */}
      <div className="border-t border-gray-200 pt-5">
        <button
          onClick={theme.cycle}
          className="flex items-center gap-2 font-mono text-micro uppercase tracking-wider text-gray-400 hover:text-ink transition-colors duration-200"
          aria-label="Toggle theme"
        >
          {themeIcon[theme.preference]}
          <span>{theme.preference}</span>
        </button>
      </div>
    </aside>
  );

  /* ── Top bar (<1024px) ────────────────────────────────── */
  const topbar = (
    <header
      className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="font-pixel text-lg lowercase tracking-tight text-ink no-underline"
        >
          kaizz
        </a>

        <div className="flex items-center gap-2">
          <button
            onClick={theme.cycle}
            className="p-2 text-gray-400 hover:text-ink transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {themeIcon[theme.preference]}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-ink"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-bryl ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 pb-6 pt-2 bg-background border-t border-gray-200">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const id = link.href.substring(1);
              const active = activeSection === id;
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`block py-2.5 px-3 font-mono text-ui-small uppercase tracking-wider no-underline rounded-input transition-colors duration-200 ${
                      active
                        ? "text-ink font-medium bg-gray-50"
                        : "text-gray-400 hover:text-ink"
                    }`}
                  >
                    {active && <span className="mr-2">→</span>}
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenFakeAI?.();
            }}
            className="mt-4 flex items-center gap-2 py-2.5 px-3 font-mono text-ui-small uppercase tracking-wider text-gray-400 hover:text-green-500 transition-colors duration-200 w-full rounded-input"
          >
            <Bot size={16} className="opacity-80" />
            Ask AI
          </button>
        </nav>
      </div>
    </header>
  );

  return (
    <>
      {sidebar}
      {topbar}
    </>
  );
}

export default Navbar;
