import Hero from "../components/sections/Hero";
import { SelectedWork } from "../components/sections/SelectedWork";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";
import { Navbar } from "../components/ui/Navbar";
import { CustomCursor } from "../components/ui/CustomCursor";
import { RouteTransition } from "../components/ui/RouteTransition";
import ScrollProgress from "../components/ui/ScrollProgress";
import Providers from "../components/ui/Providers";

export default function App() {
  return (
    <Providers>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <Navbar />
      <CustomCursor />
      <RouteTransition>
        <main id="main" tabIndex={-1}>
          <Hero />
          <SelectedWork />
          <About />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </RouteTransition>
    </Providers>
  );
}
