import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Hero({ data, layout }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance timeline
      const tl = gsap.timeline();

      // Ensure elements start in their hidden state for a clean reveal
      if (layout !== 'fullBleed') {
        gsap.set(".text-mask-child", { y: "100%" });
      }
      gsap.set([".subtitle", ".hero-desc", ".hero-cta-group", ".hero-stats-strip", ".hero-fullbleed-content p", ".hero-fullbleed-content h1"], { opacity: 0, y: 20 });

      // Title line reveals (upwards mask reveal or fade for full-bleed)
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

      // Staggered reveal of narrative text & buttons
      tl.to([".subtitle", ".hero-desc", ".hero-cta-group", ".hero-stats-strip", ".hero-fullbleed-content p"], {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.12
      }, "-=0.8");

      // 2. Parallax and camera slow zoom out on scroll
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
    }, containerRef);

    return () => ctx.revert();
  }, [layout, data]); // Trigger clean timeline when layout or data changes

  // Render Layout: Full Bleed
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

  // Render Layout: Asymmetric
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

  // Render Layout: Stacked Grid
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

  // Default Layout: Split Screen
  return (
    <section ref={containerRef} id="home" className="hero-section">
      <div className="hero-grid">
        {/* Left Column - Content */}
        <div className="hero-content-col">
          <div className="hero-content-inner">
            <span className="subtitle">{data.subtitle}</span>
            
            {/* Elegant sequential text mask reveal */}
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
              <a href="#contact" className="btn btn-primary">
                Book Consultation
              </a>
              <a href="#portfolio" className="btn btn-secondary">
                View Portfolio
              </a>
            </div>
            
            {/* Desktop Statistics Strip */}
            <div className="hero-stats-strip">
              {data.stats.map((stat, i) => (
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
              src={data.img} 
              alt="Premium architectural space" 
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


