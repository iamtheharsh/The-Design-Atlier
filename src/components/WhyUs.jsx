import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function WhyUs() {
  const containerRef = useRef(null);
  const projectsRef = useRef(null);
  const yearsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Stacking Cards Scroll Animation on Desktop
      if (window.innerWidth >= 992) {
        const cards = gsap.utils.toArray('.why-us-stack-card');
        
        cards.forEach((card, index) => {
          // Shrink/fade card when the next card scrolls up and stacks on it
          if (index < cards.length - 1) {
            gsap.to(card, {
              scale: 0.93,
              opacity: 0.35,
              yPercent: -8,
              transformOrigin: "top center",
              scrollTrigger: {
                trigger: cards[index + 1],
                start: "top 70%",
                end: "top 30%",
                scrub: true
              }
            });
          }
        });
      }

      // 2. Counters animation
      const countObj = { projects: 0, years: 0 };
      gsap.to(countObj, {
        projects: 200,
        years: 15,
        duration: 2.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".why-us-counters-block",
          start: "top 85%",
          toggleActions: "play none none none"
        },
        onUpdate: () => {
          if (projectsRef.current) projectsRef.current.innerText = Math.floor(countObj.projects) + "+";
          if (yearsRef.current) yearsRef.current.innerText = Math.floor(countObj.years) + "+";
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const points = [
    {
      num: '01',
      title: 'Meticulous Craftsmanship',
      desc: 'We curate premium materials from global suppliers—including Italian marble, European oak, and bespoke metal elements—paired with custom joinery that is built to stand the test of time.'
    },
    {
      num: '02',
      title: 'End-to-End Execution',
      desc: 'Our Mumbai-based team manages all aspects of construction, procurement, furniture sourcing, and site supervision, ensuring a hassle-free, turnkey transformation from design to key handover.'
    },
    {
      num: '03',
      title: 'Unrivaled Warranty & Support',
      desc: 'Every space we create is backed by a 10-year warranty, alongside lifetime client-care services, guaranteeing your sanctuary remains as pristine as the day we delivered it.'
    }
  ];

  return (
    <section ref={containerRef} id="why-us" className="why-us-section section">
      <div className="container">
        <div className="why-us-grid">
          {/* Left Column - Pinned Details & Counters */}
          <div className="why-us-left">
            <span className="subtitle">THE VALUE WE BRING</span>
            <h2 className="why-us-title">The Principles of Quiet Luxury</h2>
            <p className="why-us-intro">
              We design homes around the stories, personalities, and practical behaviors of their owners. Our work is defined by warm minimalism, spatial alignment, and execution precision.
            </p>

            {/* Dynamic Counters block */}
            <div className="why-us-counters-block">
              <div className="counter-item">
                <span ref={projectsRef} className="counter-num">0+</span>
                <span className="counter-label">Projects Completed</span>
              </div>
              <div className="counter-item">
                <span ref={yearsRef} className="counter-num">0+</span>
                <span className="counter-label">Years of Experience</span>
              </div>
            </div>

            <div className="why-us-image-wrapper">
              <img 
                src="/images/minimalist_detail.jpg" 
                alt="Minimal luxury interior architectural details" 
                className="why-us-img"
              />
            </div>
          </div>

          {/* Right Column - Apple Style Stacking Cards */}
          <div className="why-us-right">
            <div className="why-us-cards-stack">
              {points.map((point, i) => (
                <div key={i} className="why-us-stack-card">
                  <div className="trust-card-num-row">
                    <span className="trust-num">{point.num}</span>
                    <h3 className="trust-title">{point.title}</h3>
                  </div>
                  <p className="trust-desc">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .why-us-section {
          background-color: var(--color-bg-primary);
          overflow: visible; /* CRITICAL for sticky columns to work */
        }

        .why-us-grid {
          display: grid;
          grid-template-columns: 42% 50%;
          gap: 8%;
          align-items: start; /* CRITICAL: start layout allows sticky element sliding */
        }

        .why-us-left {
          position: sticky;
          top: 150px;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          padding-bottom: 2rem;
        }

        .why-us-title {
          margin: 0;
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          line-height: 1.2;
        }

        .why-us-intro {
          margin: 0;
          color: var(--color-text-body);
          font-size: 1.05rem;
          line-height: 1.7;
        }

        /* Counters block */
        .why-us-counters-block {
          display: flex;
          gap: 3rem;
          margin-bottom: 0.5rem;
        }

        .counter-item {
          display: flex;
          flex-direction: column;
        }

        .counter-num {
          font-family: var(--font-headings);
          font-size: 3.2rem;
          color: var(--color-accent);
          line-height: 1;
          font-weight: 300;
        }

        .counter-label {
          font-family: var(--font-body);
          font-size: 0.725rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-body);
          margin-top: 0.35rem;
        }

        .why-us-image-wrapper {
          width: 100%;
          height: 280px;
          overflow: hidden;
          position: relative;
          border: 1px solid var(--color-border);
        }

        .why-us-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform var(--transition-smooth);
        }

        .why-us-image-wrapper:hover .why-us-img {
          transform: scale(1.04);
        }

        /* Stacking Cards Column */
        .why-us-right {
          position: relative;
          width: 100%;
        }

        .why-us-cards-stack {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .why-us-stack-card {
          position: sticky;
          top: 140px; /* Viewport sticky margin */
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          padding: 3.5rem clamp(2rem, 4vw, 3.5rem);
          margin-bottom: 6rem; /* Creates spacing before next card stacks */
          box-shadow: 0 15px 45px rgba(37, 53, 69, 0.04);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          will-change: transform, opacity;
        }

        /* Incremental z-indexes for natural stacking order */
        .why-us-stack-card:nth-child(1) { z-index: 2; }
        .why-us-stack-card:nth-child(2) { z-index: 3; }
        .why-us-stack-card:nth-child(3) { z-index: 4; margin-bottom: 0; } /* Remove bottom margin for last card */

        .trust-card-num-row {
          display: flex;
          align-items: baseline;
          gap: 1.5rem;
        }

        .trust-num {
          font-family: var(--font-headings);
          font-size: 1.8rem;
          color: var(--color-accent);
          font-weight: 300;
        }

        .trust-title {
          font-family: var(--font-headings);
          font-size: 1.6rem;
          color: var(--color-text-heading);
          font-weight: 400;
          margin: 0;
        }

        .trust-desc {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--color-text-body);
          margin: 0;
          padding-left: 3.25rem;
        }

        @media (max-width: 991px) {
          .why-us-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .why-us-left {
            position: relative;
            top: auto;
            padding-bottom: 0;
          }

          .why-us-image-wrapper {
            height: 300px;
          }

          .why-us-stack-card {
            position: relative;
            top: auto;
            padding: 2.5rem 2rem;
            margin-bottom: 2rem;
            box-shadow: none;
          }

          .why-us-stack-card:last-child {
            margin-bottom: 0;
          }

          .trust-desc {
            padding-left: 0;
          }
        }
      `}</style>
    </section>
  );
}
