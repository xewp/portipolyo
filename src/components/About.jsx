import { motion } from "framer-motion";
import ScrollReveal, { staggerContainer } from "./ScrollReveal";

const techStack = [
  { name: "MongoDB", icon: "🍃", category: "Database" },
  { name: "Express", icon: "⚡", category: "Backend" },
  { name: "React", icon: "⚛️", category: "Frontend" },
  { name: "Node.js", icon: "🟢", category: "Backend" },
  { name: "JavaScript", icon: "📜", category: "Language" },
  { name: "Tailwind CSS", icon: "🎨", category: "Styling" },
  { name: "Git", icon: "🔀", category: "Tools" },
  { name: "PostgreSQL", icon: "🐘", category: "Database" },
];

const About = () => {
  return (
    <section id="about" className="relative min-h-screen py-32 overflow-hidden bg-dark">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-green-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="w-full mb-20">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-sm uppercase tracking-[0.4em] text-primary font-bold mb-4">Discovery</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              About <span className="text-gradient">Me</span>
            </h3>
            <div className="w-20 h-1 bg-primary mt-6 rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Bio side */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="space-y-8"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
              }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium mb-4">
                I'm <span className="text-primary">Kaizz Bautista</span>, a Computer Science student dedicated to building high-quality full-stack applications.
              </p>
              <p className="text-gray-400 leading-relaxed">
                My journey into development was driven by a desire to solve real-world problems. From securing data with Vault-X to crafting seamless user interfaces, I focus on the intersection of security, performance, and design.
              </p>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } }
              }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">01</span>
                My Philosophy
              </h4>
              <p className="text-gray-400 leading-relaxed">
                I believe that code should not only function perfectly but also be maintainable and elegant. I'm constantly sharpening my skills in modern architectures and best practices.
              </p>
            </motion.div>
          </motion.div>

          {/* Tech Stack side */}
          <div className="relative">
             <ScrollReveal width="100%">
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                 {techStack.map((tech, i) => (
                   <motion.div
                    key={tech.name}
                    whileHover={{ 
                      y: -10, 
                      backgroundColor: "rgba(102, 255, 0, 0.1)",
                      borderColor: "rgba(102, 255, 0, 0.3)" 
                    }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center gap-3 transition-colors duration-300 group"
                   >
                     <span className="text-4xl group-hover:scale-125 transition-transform duration-300">{tech.icon}</span>
                     <span className="text-xs font-bold text-white/60 tracking-widest uppercase text-center">{tech.name}</span>
                     <div className="absolute -bottom-2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-dark text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                       {tech.category}
                     </div>
                   </motion.div>
                 ))}
               </div>
             </ScrollReveal>

             {/* Decorative background for tech stack */}
             <div className="absolute -z-10 inset-0 border border-primary/5 rounded-full scale-150 blur-3xl opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
