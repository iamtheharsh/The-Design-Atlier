import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance timeline
      const tl = gsap.timeline();

      // Ensure elements start in their hidden state for a clean reveal
      gsap.set(".text-mask-child", { y: "100%" });
      gsap.set([".subtitle", ".hero-desc", ".hero-cta-group", ".hero-stats-strip"], { opacity: 0, y: 20 });

      // Title line reveals (upwards mask reveal)
      tl.to(".text-mask-child", {
        y: "0%",
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.2
      });

      // Staggered reveal of narrative text & buttons
      tl.to([".subtitle", ".hero-desc", ".hero-cta-group", ".hero-stats-strip"], {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.12
      }, "-=0.8");

      // 2. Parallax and camera slow zoom out on scroll
      gsap.fromTo(".hero-img", 
        { scale: 1.15, y: 0 },
        { 
          scale: 1.0, 
          y: () => window.innerWidth >= 992 ? 160 : 0, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '200+', label: 'Projects Completed' },
    { value: '15+', label: 'Years Experience' },
    { value: '5', label: 'Cities Served' },
    { value: '10-Yr', label: 'Warranty Included' },
  ];

  return (
    <section ref={containerRef} id="home" className="hero-section">
      <div className="hero-grid">
        {/* Left Column - Content */}
        <div className="hero-content-col">
          <div className="hero-content-inner">
            <span className="subtitle">THE DESIGN ATELIER</span>
            
            {/* Elegant sequential text mask reveal */}
            <h1 className="hero-title">
              <span className="text-mask">
                <span className="text-mask-child">Designing Spaces</span>
              </span>
              <span className="text-mask">
                <span className="text-mask-child">That Reflect</span>
              </span>
              <span className="text-mask">
                <span className="text-mask-child">Your Lifestyle</span>
              </span>
            </h1>

            <p className="hero-desc">
              Luxury residential interiors crafted with timeless elegance and meticulous attention to detail.
            </p>

            <div className="hero-cta-group">
              <a href="#contact" className="btn btn-primary">
                Book Consultation
              </a>
              <a href="#portfolio" className="btn btn-secondary">
                View Portfolio
              </a>
            </div>
            
            {/* Desktop Statistics Strip */}
            <div className="hero-stats-strip">
              {stats.map((stat, i) => (
                <div key={i} className="stat-item">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Image with Parallax & Slow Zoom */}
        <div className="hero-image-col">
          <div className="hero-image-wrapper">
            <img 
              src="/images/living room/WhatsApp Image 2026-06-17 at 14.28.32.jpeg" 
              alt="Luxury Minimal Living Room Design by The Design Atelier" 
              className="hero-img"
            />
            {/* Dark vignette overlay */}
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

        /* Stats Strip */
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

        /* Image Column */
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

        /* Dark editorial vignette overlay */
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


