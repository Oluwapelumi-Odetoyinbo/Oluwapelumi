import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Experience from './components/Timeline';
import Philosophy from './components/Philosophy';
import Projects from './components/Projects';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {

  useEffect(() => {
    // Refresh ScrollTrigger after all content loads
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="grain">
      <Navigation />
      <main className="max-w-[1200px] mx-auto px-6 sm:px-10 py-8 sm:py-[60px]">
        <Hero />
      </main>
      <Marquee />
      <main className="max-w-[1200px] mx-auto px-6 sm:px-10">
        <About />
        <Experience />
        <Philosophy />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}

export default App;

