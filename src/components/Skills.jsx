import { motion } from "framer-motion";
import { skillsData } from "../utils/mockData";
import ScrollReveal, { staggerContainer } from "./ScrollReveal";
import { Code2, Server, Wrench } from "lucide-react";

const SkillItem = ({ name, level }) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-white/80 font-medium group-hover:text-primary transition-colors">{name}</span>
        <span className="text-primary/60 text-xs font-bold">{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: false }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-gradient-to-r from-primary/40 to-primary relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkillCard = ({ title, icon: Icon, skills, delay = 0 }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } }
      }}
      className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/[0.07] transition-all duration-500 group"
    >
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">{title}</h3>
      <div className="space-y-6">
        {skills.map((skill) => (
          <SkillItem key={skill.name} {...skill} />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="relative py-32 bg-dark overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="w-full mb-20 text-center">
          <h2 className="text-sm uppercase tracking-[0.4em] text-primary font-bold mb-4">Expertise</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Technical <span className="text-gradient">Proficiency</span>
          </h3>
          <p className="text-gray-400 mt-6 max-w-xl mx-auto">
            A comprehensive overview of my technological arsenal and proficiency levels in various domains of development.
          </p>
        </ScrollReveal>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <SkillCard 
            title="Frontend" 
            icon={Code2} 
            skills={skillsData.frontend} 
            delay={0.1}
          />
          <SkillCard 
            title="Backend" 
            icon={Server} 
            skills={skillsData.backend} 
            delay={0.2}
          />
          <SkillCard 
            title="Tools & Others" 
            icon={Wrench} 
            skills={skillsData.tools} 
            delay={0.3}
          />
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
