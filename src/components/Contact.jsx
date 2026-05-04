import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Send, Loader2 } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { socialLinks } from "../utils/mockData";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_6k86bbn";
const EMAILJS_TEMPLATE_ID = "template_molq4nn";
const EMAILJS_PUBLIC_KEY = "FXr4y7uVb_PHOMwCY";

const iconMap = {
  Github,
  Linkedin,
  Twitter,
  Mail,
};

const Contact = () => {
  const [ref, isVisible] = useScrollReveal(0.2);
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
          background: "#0f1a0f",
          color: "#66ff00",
          border: "1px solid rgba(102, 255, 0, 0.3)",
          fontWeight: 600,
        },
        iconTheme: { primary: "#66ff00", secondary: "#0f1a0f" },
        duration: 4000,
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      toast.error("Failed to send. Please try again or email me directly.", {
        style: {
          background: "#1a0f0f",
          color: "#ff4444",
          border: "1px solid rgba(255, 68, 68, 0.3)",
          fontWeight: 600,
        },
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="min-h-screen py-20 px-6 bg-dark">
      <Toaster position="top-right" />
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex-1 h-[2px] bg-gradient-to-l from-primary to-transparent"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-primary to-transparent"></div>
          </div>
          <p className="text-gray-secondary text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-light font-medium mb-2"
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
                  className="w-full px-4 py-3 bg-dark-card border border-primary/30 rounded-lg text-white placeholder-gray-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="Kaizz Bautista"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-light font-medium mb-2"
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
                  className="w-full px-4 py-3 bg-dark-card border border-primary/30 rounded-lg text-white placeholder-gray-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="zziakbautista@gmail.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-light font-medium mb-2"
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
                  className="w-full px-4 py-3 bg-dark-card border border-primary/30 rounded-lg text-white placeholder-gray-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading || cooldown > 0}
                className={`group w-full px-8 py-4 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed ${
                  cooldown > 0
                    ? "bg-gray-600 text-gray-400 opacity-70"
                    : "bg-primary text-dark hover:bg-primary-dark hover:glow-primary-lg"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : cooldown > 0 ? (
                  <>
                    <Loader2 className="w-5 h-5" />
                    Wait {cooldown}s before sending again
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Social Links & Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Let's Connect
              </h3>
              <p className="text-gray-secondary leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision. Connect with me on
                social media or drop me an email.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-primary">
                Find me on:
              </h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => {
                  const Icon = iconMap[social.icon];
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-4 py-2 bg-dark-card border border-primary/30 rounded-lg text-gray-light hover:text-primary hover:border-primary transition-all duration-300 hover:scale-105"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Email */}
            <div className="p-6 bg-dark-card border border-primary/30 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-6 h-6 text-primary" />
                <h4 className="text-xl font-semibold text-white">Email</h4>
              </div>
              <a
                href="mailto:zziakbautista@gmail.com"
                className="text-gray-light hover:text-primary transition-colors duration-300"
              >
                zziakbautista@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
