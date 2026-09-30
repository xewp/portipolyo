"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { heroCopy } from "../../data/ui";
import { site } from "../../data/site";
import { fadeReveal, reveal, staggerHero } from "../../lib/motion";
import { MagneticLink } from "../ui/MagneticLink";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const variants = reduced ? fadeReveal : reveal;

  return (
    <section ref={ref} id="home" className="hero section-shell" aria-labelledby="hero-title">
      <motion.div variants={staggerHero} initial="hidden" animate="visible" className="hero-content">
        <motion.div variants={variants} className="hero-topline">
          <p className="eyebrow">{site.name} <span aria-hidden="true">/</span> {site.role}</p>
          <p className="hero-availability"><span aria-hidden="true" />{site.availability}</p>
        </motion.div>
        <h1 id="hero-title" className="hero-headline font-display">
          {site.heroHeadline.map((line, lineIndex) => (
            <span className={lineIndex === 1 ? "headline-line headline-accent" : "headline-line"} key={line}>
              {line.split(" ").map((word, index) => <motion.span variants={variants} className="headline-word" key={`${word}-${index}`}>{word}{index < line.split(" ").length - 1 ? "\u00a0" : ""}</motion.span>)}
            </span>
          ))}
        </h1>
        <motion.div variants={variants} className="hero-orbit" aria-hidden="true"><motion.div className="orbit-graphic" style={{ y: reduced ? 0 : y }}>
          <div className="orbit-track" /><div className="orbit-track orbit-tilted" />
          <div className="orbit-center"><span>+</span></div>
          <span className="orbit-node node-one" /><span className="orbit-node node-two" />
          <span className="orbit-coordinate coordinate-top">{heroCopy.orbitTop}</span>
          <span className="orbit-coordinate coordinate-bottom">{heroCopy.orbitBottom}</span>
        </motion.div></motion.div>
        <motion.div variants={variants} className="hero-bottom">
          <div className="hero-statement"><span className="hero-footnote">{heroCopy.footnote}</span><p>{site.heroIntro}</p></div>
          <div className="hero-summary"><p>{site.heroDescription}</p><div className="hero-actions">
            <MagneticLink href="#work" className="button-primary">{heroCopy.primaryCta} <ArrowUpRight size={18} aria-hidden="true" /></MagneticLink>
            <MagneticLink href="#contact" className="button-secondary">{heroCopy.secondaryCta} <ArrowUpRight size={18} aria-hidden="true" /></MagneticLink>
          </div></div>
        </motion.div>
        <motion.a variants={variants} href="#work" className="hero-scroll"><ArrowDown size={14} aria-hidden="true" /> {heroCopy.scrollHint}</motion.a>
      </motion.div>
    </section>
  );
}
