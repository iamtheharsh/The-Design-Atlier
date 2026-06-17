import React, { useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import Services from './components/Services';
import Philosophy from './components/Philosophy';
import Founder from './components/Founder';
import Process from './components/Process';
import Team from './components/Team';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import PressAwards from './components/PressAwards';
import Faq from './components/Faq';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

// Motion design libraries
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential out
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Update ScrollTrigger on scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP ticker with Lenis
    const updateRAF = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateRAF);
    gsap.ticker.lagSmoothing(0);

    // Clean up on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateRAF);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <FloatingWhatsApp />
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <Philosophy />
        <Founder />
        <Process />
        <Team />
        <Portfolio />
        <Testimonials />
        <PressAwards />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

export default App;

