import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { useTheme } from "./hooks/useTheme";

function App() {
  const theme = useTheme();

  return (
    <div className="min-h-screen bg-background text-ink transition-colors duration-500">
      {/* Fixed sidebar on desktop, sticky top bar on mobile */}
      <Navbar theme={theme} />

      {/* Content shifts right on desktop to clear the sidebar */}
      <div className="lg:pl-[14rem]">
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
