import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero({ data, portfolio, layout }) {
  const containerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const hoverTimeoutRef = useRef(null);

  // Reset active slide when layout or data changes
  useEffect(() => {
    setActiveSlide(0);
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [layout, data]);

  // Extract featured slide details for the interactive Luxury Editorial layout
  const rawProjects = portfolio || [];
  const featuredSlides = [];
  if (rawProjects.length >= 3) {
    featuredSlides.push(rawProjects[0], rawProjects[1], rawProjects[2]);
  } else if (rawProjects.length > 0) {
    for (let i = 0; i < 3; i++) {
      featuredSlides.push(rawProjects[i % rawProjects.length]);
    }
  } else {
    // Solid fallbacks if portfolio is empty
    featuredSlides.push(
      { title: data?.title1 || 'Project One', img: data?.img, location: 'Atelier Concept', style: 'Elegance' },
      { title: data?.title2 || 'Project Two', img: data?.img2 || data?.img, location: 'Contemporary Design', style: 'Bespoke' },
      { title: data?.title3 || 'Project Three', img: data?.img3 || data?.img, location: 'Organic Form', style: 'Minimal' }
    );
  }

  // Calculate coordinates slot index based on activeSlide
  const getSlotClass = (index) => {
    let diff = index - activeSlide;
    if (diff < 0) diff += 3;
    return `circle-slot-${diff}`;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (layout === 'luxuryEditorial') {
        // 1. Entrance clipPath wipe reveal
        gsap.fromTo(".luxury-bg-wrapper",
          { clipPath: "circle(0% at 50% 50%)" },
          {
            clipPath: "circle(150% at 50% 50%)",
            duration: 2.2,
            ease: "power4.inOut"
          }
        );

        // 2. SVG wave path and compass drawing animations
        const path = document.querySelector(".luxury-curve-path");
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2.5,
            ease: "power2.inOut",
            delay: 0.4
          });
        }
        
        gsap.fromTo([".arch-compass-circle-1", ".arch-compass-circle-2", ".arch-compass-circle-3"],
          { strokeDasharray: "0 1000", opacity: 0 },
          {
            strokeDasharray: (i) => i === 0 ? "3 6" : i === 1 ? "10 4" : "1000 0",
            opacity: (i) => i === 0 ? 0.28 : i === 1 ? 0.18 : 0.15,
            duration: 2.2,
            ease: "power2.out",
            stagger: 0.2,
            delay: 0.6
          }
        );

        // 3. Title reveal (line-by-line)
        gsap.set(".luxury-text-mask-child", { y: "100%" });
        tl.to(".luxury-text-mask-child", {
          y: "0%",
          duration: 1.4,
          ease: "power4.out",
          stagger: 0.15,
          delay: 0.2
        });

        // 4. Staggered details and CTA
        gsap.set([".luxury-content .subtitle", ".luxury-desc", ".hero-cta-group", ".luxury-active-strip"], { opacity: 0, y: 20 });
        tl.to([".luxury-content .subtitle", ".luxury-desc", ".hero-cta-group", ".luxury-active-strip"], {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.1
        }, "-=0.8");

        // 5. Staggered circles entrance
        gsap.set(".floating-circle-preview", { scale: 0, opacity: 0 });
        gsap.to(".floating-circle-preview", {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "back.out(1.2)",
          stagger: 0.18,
          delay: 0.6
        });
      } else {
        // Entrance reveal for non-luxury layouts
        if (layout !== 'fullBleed') {
          gsap.set(".text-mask-child", { y: "100%" });
        }
        gsap.set([
          ".subtitle", 
          ".hero-desc", 
          ".hero-cta-group", 
          ".hero-stats-strip", 
          ".hero-fullbleed-content p", 
          ".hero-fullbleed-content h1"
        ], { opacity: 0, y: 20 });

        if (layout === 'fullBleed') {
          tl.to(".hero-fullbleed-content h1", {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power4.out"
          });
        } else {
          tl.to(".text-mask-child", {
            y: "0%",
            duration: 1.4,
            ease: "power4.out",
            stagger: 0.12,
            delay: 0.2
          });
        }

        tl.to([".subtitle", ".hero-desc", ".hero-cta-group", ".hero-stats-strip", ".hero-fullbleed-content p"], {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.12
        }, "-=0.8");

        // Background parallax scales
        if (layout === 'fullBleed') {
          gsap.fromTo(".hero-fullbleed-bg img",
            { scale: 1.15 },
            {
              scale: 1.0,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
              }
            }
          );
        } else {
          gsap.fromTo(".hero-img", 
            { scale: 1.15, y: 0 },
            { 
              scale: 1.0, 
              y: () => (window.innerWidth >= 992 && layout === 'split') ? 160 : 0, 
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
              }
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [layout, data]);

  // Mouse Parallax handlers for Luxury Editorial layout
  const handleMouseMove = (e) => {
    if (layout !== 'luxuryEditorial') return;
    const { clientX, clientY } = e;
    const w = window.innerWidth;
    const h = window.innerHeight;

    const x = (clientX - w / 2) / (w / 2);
    const y = (clientY - h / 2) / (h / 2);

    gsap.to(".luxury-bg-image", {
      x: -x * 20,
      y: -y * 20,
      duration: 1.2,
      ease: "power2.out"
    });

    gsap.to(".luxury-content", {
      x: x * 10,
      y: y * 10,
      duration: 1.2,
      ease: "power2.out"
    });

    // Parallax inside circles (apply to inner wrapper to avoid layout transitions clash)
    gsap.to(".circle-parallax-0", {
      x: x * 35,
      y: y * 35,
      duration: 1.4,
      ease: "power2.out"
    });

    gsap.to(".circle-parallax-1", {
      x: x * 20,
      y: y * 45,
      duration: 1.4,
      ease: "power2.out"
    });

    gsap.to(".circle-parallax-2", {
      x: x * 48,
      y: y * 25,
      duration: 1.4,
      ease: "power2.out"
    });

    gsap.to(".luxury-curve-svg", {
      x: x * 15,
      y: y * 15,
      duration: 1.2,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (layout !== 'luxuryEditorial') return;
    gsap.to([
      ".luxury-bg-image", 
      ".luxury-content", 
      ".circle-parallax-0", 
      ".circle-parallax-1", 
      ".circle-parallax-2", 
      ".luxury-curve-svg"
    ], {
      x: 0,
      y: 0,
      duration: 1.6,
      ease: "power3.out"
    });
  };

  const handleCircleMouseEnter = (index) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveSlide(index);
    }, 180); // 180ms threshold to prevent glitching on quick mouse sweeps
  };

  const handleCircleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  // 1. RENDER LAYOUT: Luxury Editorial
  if (layout === 'luxuryEditorial') {
    return (
      <section 
        ref={containerRef} 
        id="home" 
        className="hero-luxury-editorial"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background wrapper with smooth fade transitions */}
        <div className="luxury-bg-wrapper">
          <motion.img
            key={activeSlide}
            src={featuredSlides[activeSlide].img}
            alt={featuredSlides[activeSlide].title}
            initial={{ opacity: 0.15, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="luxury-bg-image"
          />
          <div className="luxury-bg-overlay"></div>
        </div>

        {/* Technical Architectural Drawing & Compass Lines */}
        <svg className="luxury-curve-svg" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Blueprint Grid Axes */}
          <line x1="80%" y1="0" x2="80%" y2="100%" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.25" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.25" />
          
          {/* Architectural Draft Compass circles centered near the slots */}
          <circle className="arch-compass-circle-1" cx="80%" cy="50%" r="280" stroke="var(--color-accent)" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.28" />
          <circle className="arch-compass-circle-2" cx="80%" cy="50%" r="380" stroke="var(--color-border)" strokeWidth="0.6" strokeDasharray="10 4" opacity="0.18" />
          <circle className="arch-compass-circle-3" cx="80%" cy="50%" r="120" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.15" />
          
          {/* Main technical connector curve line connecting circles */}
          <path 
            className="luxury-curve-path" 
            d="M 680,240 Q 1000,100 1200,320 T 1300,560" 
            stroke="var(--color-accent)" 
            strokeWidth="0.8" 
            strokeOpacity="0.45" 
          />
          
          {/* Crosshairs & Ticks */}
          <g opacity="0.3" stroke="var(--color-text-body)" strokeWidth="0.7">
            <line x1="680" y1="230" x2="680" y2="250" />
            <line x1="1200" y1="310" x2="1200" y2="330" />
            <line x1="1300" y1="550" x2="1300" y2="570" />
          </g>
        </svg>

        {/* Editorial copy blocks */}
        <div className="container" style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
          <div className="luxury-content" style={{ pointerEvents: 'auto' }}>
            <span className="subtitle">{data?.subtitle || "STUDIO LANDMARK"}</span>
            <h1 className="luxury-title">
              <span className="luxury-text-mask">
                <span className="luxury-text-mask-child">{data?.title1}</span>
              </span>
              <span className="luxury-text-mask">
                <span className="luxury-text-mask-child">{data?.title2}</span>
              </span>
              <span className="luxury-text-mask">
                <span className="luxury-text-mask-child">{data?.title3}</span>
              </span>
            </h1>
            <p className="luxury-desc">{data?.desc}</p>
            <div className="hero-cta-group">
              <a href="#contact" className="btn btn-primary">Book Consultation</a>
              <a href="#portfolio" className="btn btn-secondary">View Portfolio</a>
            </div>

            {/* Active project display strip */}
            <div className="luxury-active-strip">
              <span className="strip-label">Featured Work</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeSlide}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.35 }}
                  className="strip-val"
                >
                  {featuredSlides[activeSlide]?.title} &bull; {featuredSlides[activeSlide]?.location || featuredSlides[activeSlide]?.style}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Floating circular elements container */}
        <div className="circle-previews-container">
          {featuredSlides.map((slide, index) => {
            const slotClass = getSlotClass(index); // circle-slot-0, circle-slot-1, or circle-slot-2
            return (
              <div
                key={index}
                onMouseEnter={() => handleCircleMouseEnter(index)}
                onMouseLeave={handleCircleMouseLeave}
                onClick={() => setActiveSlide(index)}
                className={`floating-circle-preview ${slotClass}`}
              >
                <div className={`circle-parallax-${index}`} style={{ width: '100%', height: '100%' }}>
                  <div className="circle-inner">
                    <img src={slide.img} alt={slide.title} />
                    <div className="circle-overlay">
                      <span className="circle-proj-num">0{index + 1}</span>
                    </div>
                  </div>
                  {/* Custom tooltip details */}
                  <div className="circle-tooltip">
                    <span className="tooltip-title">{slide.title}</span>
                    <span className="tooltip-desc">{slide.location || slide.style}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // 2. RENDER LAYOUT: Full Bleed
  if (layout === 'fullBleed') {
    return (
      <section ref={containerRef} id="home" className="hero-fullbleed">
        <div className="hero-fullbleed-bg">
          <img src={data.img} alt={data.title1} />
        </div>
        <div className="hero-fullbleed-overlay"></div>
        <div className="hero-fullbleed-content">
          <span className="subtitle">{data.subtitle}</span>
          <h1 className="hero-title">{data.title1} {data.title2} {data.title3}</h1>
          <p>{data.desc}</p>
          <div className="hero-cta-group" style={{ justifyContent: 'center' }}>
            <a href="#contact" className="btn btn-primary">Book Consultation</a>
            <a href="#portfolio" className="btn btn-secondary">View Portfolio</a>
          </div>
        </div>
      </section>
    );
  }

  // 3. RENDER LAYOUT: Asymmetric
  if (layout === 'asymmetric') {
    return (
      <section ref={containerRef} id="home" className="hero-asymmetric">
        <div className="container">
          <div className="asymmetric-grid">
            <div className="asymmetric-images-wrapper">
              <img src={data.img} alt="Main Perspective" className="asym-img-main hero-img" />
              <img src={data.img2 || data.img} alt="Architectural Detail" className="asym-img-floating" />
            </div>
            <div className="asymmetric-content">
              <span className="subtitle">{data.subtitle}</span>
              <h1 className="hero-title" style={{ marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                <span className="text-mask" style={{ display: 'block' }}>
                  <span className="text-mask-child">{data.title1}</span>
                </span>
                <span className="text-mask" style={{ display: 'block', color: 'var(--color-accent)' }}>
                  <span className="text-mask-child">{data.title2}</span>
                </span>
                <span className="text-mask" style={{ display: 'block' }}>
                  <span className="text-mask-child">{data.title3}</span>
                </span>
              </h1>
              <p className="hero-desc">{data.desc}</p>
              <div className="hero-cta-group" style={{ marginTop: '2rem' }}>
                <a href="#contact" className="btn btn-primary">Book Consultation</a>
                <a href="#portfolio" className="btn btn-secondary">View Portfolio</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 4. RENDER LAYOUT: Stacked Grid
  if (layout === 'stacked') {
    return (
      <section ref={containerRef} id="home" className="hero-stacked">
        <div className="container">
          <div className="hero-stacked-header">
            <span className="subtitle">{data.subtitle}</span>
            <h1 className="hero-title">
              <span className="text-mask" style={{ display: 'block' }}>
                <span className="text-mask-child">{data.title1} {data.title2}</span>
              </span>
              <span className="text-mask" style={{ display: 'block' }}>
                <span className="text-mask-child">{data.title3}</span>
              </span>
            </h1>
            <p className="hero-desc">{data.desc}</p>
            <div className="hero-cta-group">
              <a href="#contact" className="btn btn-primary">Book Consultation</a>
              <a href="#portfolio" className="btn btn-secondary">View Portfolio</a>
            </div>
          </div>
          <div className="stacked-images-showcase">
            <img src={data.img} alt="Showcase Main" className="stacked-showcase-img hero-img" />
            <img src={data.img2 || data.img} alt="Showcase Secondary" className="stacked-showcase-img" />
            <img src={data.img3 || data.img} alt="Showcase Tertiary" className="stacked-showcase-img" />
          </div>
        </div>
      </section>
    );
  }

  // 5. RENDER LAYOUT: Split Screen (Default)
  return (
    <section ref={containerRef} id="home" className="hero-section">
      <div className="hero-grid">
        {/* Left Column - Content */}
        <div className="hero-content-col">
          <div className="hero-content-inner">
            <span className="subtitle">{data.subtitle}</span>
            <h1 className="hero-title">
              <span className="text-mask">
                <span className="text-mask-child">{data.title1}</span>
              </span>
              <span className="text-mask">
                <span className="text-mask-child">{data.title2}</span>
              </span>
              <span className="text-mask">
                <span className="text-mask-child">{data.title3}</span>
              </span>
            </h1>
            <p className="hero-desc">{data.desc}</p>
            <div className="hero-cta-group">
              <a href="#contact" className="btn btn-primary">Book Consultation</a>
              <a href="#portfolio" className="btn btn-secondary">View Portfolio</a>
            </div>
            {/* Statistics Strip */}
            <div className="hero-stats-strip">
              {data.stats && data.stats.map((stat, i) => (
                <div key={i} className="stat-item">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Image wrapper */}
        <div className="hero-image-col">
          <div className="hero-image-wrapper">
            <img 
              src={data.img} 
              alt="Premium architectural space" 
              className="hero-img"
            />
            <div className="hero-img-overlay"></div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          width: 100%;
          height: 100vh;
          background-color: var(--color-bg-primary);
          display: flex;
          align-items: stretch;
          border-bottom: 1px solid var(--color-border);
          padding-top: 90px;
          overflow: hidden;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 48% 52%;
          width: 100%;
        }

        .hero-content-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem 8% 2rem 10%;
        }

        .hero-content-inner {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .hero-title {
          font-family: var(--font-headings);
          color: var(--color-text-heading);
          margin: 0;
          font-weight: 300;
          font-size: clamp(2.8rem, 5.5vw, 4.2rem);
          line-height: 1.1;
        }

        .hero-desc {
          color: var(--color-text-body);
          max-width: 480px;
          margin-bottom: 0.5rem;
          font-size: 1.05rem;
        }

        .hero-cta-group {
          display: flex;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .hero-stats-strip {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem 1rem;
          border-top: 1px solid var(--color-border);
          padding-top: 2rem;
          max-width: 500px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-value {
          font-family: var(--font-headings);
          font-size: 2.2rem;
          font-weight: 300;
          color: var(--color-text-heading);
          line-height: 1;
        }

        .stat-label {
          font-family: var(--font-body);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-body);
          font-weight: 400;
        }

        .hero-image-col {
          position: relative;
          background-color: var(--color-bg-secondary);
          overflow: hidden;
        }

        .hero-image-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          will-change: transform;
        }

        .hero-img-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(45, 42, 38, 0.2), rgba(45, 42, 38, 0.4)),
                      radial-gradient(circle at center, transparent 30%, rgba(45, 42, 38, 0.3));
          pointer-events: none;
          z-index: 2;
        }

        @media (min-width: 992px) {
          .hero-stats-strip {
            grid-template-columns: repeat(4, 1fr);
            max-width: 100%;
          }
        }

        @media (max-width: 991px) {
          .hero-section {
            padding-top: 75px;
            height: auto;
            min-height: auto;
          }

          .hero-grid {
            grid-template-columns: 1fr;
          }

          .hero-content-col {
            padding: 4rem 6%;
            order: 2;
          }

          .hero-image-col {
            height: 55vh;
            order: 1;
          }

          .hero-stats-strip {
            grid-template-columns: repeat(2, 1fr);
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
