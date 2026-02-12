import { useEffect } from 'react';
import Lenis from 'lenis';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import OpenSource from './components/OpenSource';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      // Cleanup if necessary
    }
  }, []);

  return (
    <div className="bg-background min-h-screen text-primary selection:bg-rose-500/30 selection:text-rose-200">
      <main>
        <Hero />
        <Experience />
        <OpenSource />
        <Projects />
        <About />
        <Contact />
      </main>
    </div>
  )
}

export default App;
