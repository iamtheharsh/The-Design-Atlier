import React, { useEffect, useState } from 'react';
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

// Niche data & Layout configurator panel
import { nicheData } from './components/nicheData';
import LayoutConfigurator from './components/LayoutConfigurator';

// Motion design libraries
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [currentNiche, setCurrentNiche] = useState('interior'); // 'interior' | 'architecture' | 'agency' | 'saas'
  const [layoutConfig, setLayoutConfig] = useState({
    hero: 'luxuryEditorial', // 'luxuryEditorial' | 'split' | 'fullBleed' | 'asymmetric' | 'stacked'
    services: 'bento',     // 'staggeredGrid' | 'bento' | 'stackedList'
    philosophy: 'sliding', // 'sliding' | 'editorial'
    portfolio: 'masonry',  // 'parallaxGrid' | 'masonry' | 'bentoShowcase'
    process: 'timeline',   // 'timeline' | 'transformation'
    team: 'grid',          // 'grid' | 'staggered'
    testimonials: 'fade',  // 'fade' | 'depthStacked'
    footer: 'columns'      // 'columns' | 'minimal'
  });

  const data = nicheData[currentNiche] || nicheData.interior;

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

    // Refresh GSAP scroll triggers when layout changes
    ScrollTrigger.refresh();

    // Clean up on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateRAF);
    };
  }, [layoutConfig, currentNiche]); // Recalculate ScrollTrigger on state adjustments

  return (
    <>
      <CustomCursor />
      <FloatingWhatsApp />
      <Navbar heroLayout={layoutConfig.hero} />
      <main className="main-content">
        <Hero 
          data={data.hero} 
          portfolio={data.portfolio?.list} 
          layout={layoutConfig.hero} 
        />
        <WhyUs data={data.whyUs} />
        <Services data={data.services} layout={layoutConfig.services} />
        <Philosophy data={data.philosophy} layout={layoutConfig.philosophy} />
        <Founder data={data.team[0]} />
        <Process data={data.process} layout={layoutConfig.process} />
        <Team data={data.team} layout={layoutConfig.team} />
        <Portfolio data={data.portfolio} layout={layoutConfig.portfolio} />
        <Testimonials data={data.testimonials} layout={layoutConfig.testimonials} />
        <PressAwards />
        <Faq data={data.faq} />
        <ContactForm data={data.contact} />
      </main>
      <Footer data={data.contact} layout={layoutConfig.footer} />
      
      {/* Design System playground dashboard overlay */}
      <LayoutConfigurator 
        currentNiche={currentNiche} 
        setCurrentNiche={setCurrentNiche}
        layoutConfig={layoutConfig}
        setLayoutConfig={setLayoutConfig}
      />
    </>
  );
}

export default App;

