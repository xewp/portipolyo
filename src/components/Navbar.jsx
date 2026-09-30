import { useState, useEffect } from "react";
import { Sun, Moon, Monitor, X, Menu, Bot } from "lucide-react";
const navLinks = ["Home", "About", "Projects", "Skills", "Contact"];
export default function Navbar({ theme, onOpenFakeAI }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    const update = () => {
      const current = navLinks.findLast((name) => document.getElementById(name.toLowerCase())?.getBoundingClientRect().top <= 180);
      if (current) setActiveSection(current.toLowerCase());
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    const close = (e) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", close);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("keydown", close); };
  }, []);
  const ThemeIcon = { light: Sun, dark: Moon, system: Monitor }[theme.preference] || Monitor;
  return <header className="site-header">
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="nav-shell">
      <a href="#home" className="wordmark" onClick={() => setMobileOpen(false)}>kaizz<span aria-hidden="true">✳</span></a>
      <nav id="main-navigation" aria-label="Main navigation" className={"main-navigation " + (mobileOpen ? "is-open" : "")}>
        {navLinks.map((name) => <a key={name} href={"#" + name.toLowerCase()} aria-current={activeSection === name.toLowerCase() ? "location" : undefined} onClick={() => setMobileOpen(false)}>{name}</a>)}
        <button className="ai-link" onClick={() => { setMobileOpen(false); onOpenFakeAI(); }}><Bot size={16} />Ask AI</button>
      </nav>
      <div className="nav-tools">
        <button className="theme-button" onClick={theme.cycle} aria-label={"Toggle theme, current: " + theme.preference} title={"Theme: " + theme.preference}><ThemeIcon size={18} /></button>
        <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} aria-controls="main-navigation">{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
    </div>
  </header>;
}
