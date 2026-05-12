import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Send, Loader2, MapPin, Phone } from "lucide-react";
import { socialLinks } from "../utils/mockData";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import ScrollReveal, { staggerContainer } from "./ScrollReveal";

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
          borderRadius: "1rem",
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
          borderRadius: "1rem",
          fontWeight: 600,
        },
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 bg-dark overflow-hidden">
      <Toaster position="top-right" />
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent" />
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="w-full mb-20 text-center">
          <h2 className="text-sm uppercase tracking-[0.4em] text-primary font-bold mb-4">Contact</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Get In <span className="text-gradient">Touch</span>
          </h3>
          <p className="text-gray-400 mt-6 max-w-xl mx-auto">
            Ready to start a conversation? Whether you have a project in mind or just want to connect, I'm just a message away.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Info Side */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="space-y-12"
          >
            <div className="space-y-8">
               <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
                }}
                className="flex items-start gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors"
               >
                 <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                   <Mail className="w-6 h-6" />
                 </div>
                 <div>
                   <h4 className="text-white font-bold mb-1">Email Me</h4>
                   <p className="text-gray-400 text-sm mb-2">For inquiries and collaborations</p>
                   <a href="mailto:zziakbautista@gmail.com" className="text-primary font-bold hover:underline">zziakbautista@gmail.com</a>
                 </div>
               </motion.div>

               <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.1 } }
                }}
                className="flex items-start gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors"
               >
                 <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                   <MapPin className="w-6 h-6" />
                 </div>
                 <div>
                   <h4 className="text-white font-bold mb-1">Location</h4>
                   <p className="text-gray-400 text-sm">Philippines (GMT+8)</p>
                   <p className="text-primary font-bold">Open to remote work worldwide</p>
                 </div>
               </motion.div>
            </div>

            <div className="space-y-6">
              <h4 className="text-white font-black text-xl tracking-tight">Social Networks</h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, i) => {
                  const Icon = iconMap[social.icon];
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={{
                        hidden: { opacity: 0, scale: 0.5 },
                        visible: { opacity: 1, scale: 1, transition: { delay: i * 0.1 } }
                      }}
                      whileHover={{ y: -5, backgroundColor: "rgba(102, 255, 0, 0.1)", borderColor: "rgba(102, 255, 0, 0.5)" }}
                      className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary transition-all duration-300"
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl relative"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-2">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell me about your project..."
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading || cooldown > 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
                  cooldown > 0
                    ? "bg-white/10 text-white/30 cursor-not-allowed"
                    : "bg-primary text-dark shadow-[0_0_40px_rgba(102,255,0,0.2)] hover:shadow-[0_0_60px_rgba(102,255,0,0.4)]"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : cooldown > 0 ? (
                  <span>Wait {cooldown}s</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
