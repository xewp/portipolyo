import { ArrowUpRight, ArrowDown, Download } from "lucide-react";
export default function Hero() {
  return <section id="home" className="hero-section"><div className="hero-inner">
    <p className="hero-intro"><span />hi, my name is</p>
    <h1>kaizz{" "}<br /><span>bautista</span><span className="hero-period" aria-hidden="true">.</span></h1>
    <div className="hero-art" aria-hidden="true"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-flower">✳</div><div className="art-core" /><span className="art-code">&lt;/&gt;</span></div>
    <div className="hero-bottom">
      <div className="hero-role"><span aria-hidden="true">↳</span><h2>Full Stack<br className="role-break" />{" "}Developer</h2></div>
      <div className="hero-description"><p>I ship <span>MERN stack</span> apps — from encrypted secret managers to booking platforms. If it needs auth, real-time data, or a clean UI, I've probably built it at 2 AM.</p>
        <div className="hero-actions">
          <a className="primary-button" href="#projects">View My Work <ArrowUpRight size={18} /></a>
          <a className="text-button" href="#contact">Get in Touch <ArrowUpRight size={16} /></a>
          <a className="text-button cv-link" href="/bautista-kaizz-resume.pdf" download="Kaizz_Bautista_Resume.pdf">Download CV <Download size={16} /></a>
        </div>
      </div>
    </div>
    <a href="#projects" className="scroll-link">scroll <ArrowDown size={15} /></a>
  </div></section>;
}
