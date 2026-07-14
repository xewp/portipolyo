import { motion, useInView } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Send, Loader2 } from "lucide-react";
import { socialLinks } from "../utils/mockData";
import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_6k86bbn";
const EMAILJS_TEMPLATE_ID = "template_molq4nn";
const EMAILJS_PUBLIC_KEY = "FXr4y7uVb_PHOMwCY";

const iconMap = { Github, Linkedin, Twitter, Mail };

const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const COOLDOWN_SECONDS = 60;
  const COOLDOWN_KEY = "contact_last_sent";

  const getRemainingCooldown = () => {
    const lastSent = parseInt(localStorage.getItem(COOLDOWN_KEY) || "0", 10);
    const elapsed = Math.floor((Date.now() - lastSent) / 1000);
    return Math.max(0, COOLDOWN_SECONDS - elapsed);
  };

  const [cooldown, setCooldown] = useState(getRemainingCooldown);

  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      const remaining = getRemainingCooldown();
      setCooldown(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldown > 0) return;
    setLoading(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          title: "Portfolio Contact",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
      setCooldown(COOLDOWN_SECONDS);
      toast.success("Message sent! I'll get back to you soon.", {
        style: {
          background: "rgb(var(--background))",
          color: "rgb(var(--ink))",
          border: "1px solid rgb(var(--gray-200))",
          fontFamily: "'Geist Mono', monospace",
          fontSize: "13px",
        },
        duration: 4000,
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      toast.error("Failed to send. Please try again or email me directly.", {
        style: {
          background: "rgb(var(--background))",
          color: "rgb(var(--ink))",
          border: "1px solid rgb(var(--gray-200))",
          fontFamily: "'Geist Mono', monospace",
          fontSize: "13px",
        },
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.07, delayChildren: 0.05 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const inputClasses =
    "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-input font-mono text-ui-small text-ink placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors duration-200";

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-4 sm:px-6">
      <Toaster position="top-right" />

      <motion.div
        className="max-w-reading mx-auto"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {/* Section label */}
        <motion.p variants={fadeUp} className="section-label mb-3">
          04 — contact
        </motion.p>

        {/* Title */}
        <motion.h2
          variants={fadeUp}
          className="font-pixel text-[2rem] sm:text-[2.5rem] lowercase leading-none text-ink mb-3"
        >
          contact
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="font-serif text-ui-body text-gray-500 mb-8"
        >
          Have a project in mind or just want to chat? Feel free to reach out.
        </motion.p>

        {/* Hairline */}
        <motion.div variants={fadeUp} className="h-px bg-gray-200 mb-10" />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div variants={fadeUp}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="micro-label block mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Kaizz Bautista"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="micro-label block mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="zziakbautista@gmail.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="micro-label block mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={loading || cooldown > 0}
                className={`group w-full flex items-center justify-center gap-2 px-6 py-2.5 text-ui-small font-medium rounded-input transition-all duration-200 ${
                  cooldown > 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-ink text-background hover:opacity-90"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Sending...
                  </>
                ) : cooldown > 0 ? (
                  <>Wait {cooldown}s</>
                ) : (
                  <>
                    Send Message
                    <Send
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Social / info */}
          <motion.div variants={fadeUp} className="flex flex-col justify-between gap-8">
            <div>
              <p className="micro-label mb-4">Find me on</p>
              <div className="space-y-2">
                {socialLinks.map((social) => {
                  const Icon = iconMap[social.icon];
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 py-2 text-gray-500 hover:text-ink font-mono text-ui-small transition-colors duration-200 no-underline"
                    >
                      <Icon size={15} />
                      <span>{social.name}</span>
                      <span className="inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        ↗
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Direct email */}
            <div className="border-t border-gray-200 pt-5">
              <p className="micro-label mb-2">Email directly</p>
              <a
                href="mailto:zziakbautista@gmail.com"
                className="font-mono text-ui-small text-gray-500 hover:text-ink transition-colors duration-200"
              >
                zziakbautista@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
