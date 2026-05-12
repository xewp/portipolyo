import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Mail, Twitter, Heart } from "lucide-react";

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
    <footer className="relative py-20 bg-dark overflow-hidden">
      {/* Decorative Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col items-center gap-12">
          {/* Logo / Name */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-[0_0_20px_rgba(102,255,0,0.3)]">
                <span className="text-dark font-black text-2xl">K</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white uppercase">Bautista<span className="text-primary">.</span></h2>
          </motion.div>

          {/* Navigation Links (Simplified for footer) */}
          <nav className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-500">
            {["Home", "About", "Projects", "Skills", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ Icon, href, label }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, backgroundColor: "rgba(102,255,0,0.1)", borderColor: "rgba(102,255,0,0.5)" }}
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-primary transition-all duration-300"
                aria-label={label}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="w-full pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm flex items-center gap-2">
              © {new Date().getFullYear()} Designed & Built with <Heart size={14} className="text-primary animate-pulse" /> by <span className="text-white font-bold">Kaizz Bautista</span>
            </p>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/60 hover:text-primary hover:border-primary/50 transition-all duration-300"
            >
              <span className="text-xs font-black uppercase tracking-widest">Back to top</span>
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Background Orbs */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
    </footer>
  );
}

export default Footer;
