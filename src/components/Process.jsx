import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Process({ data, layout }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 992px)",
      isMobile: "(max-width: 991px)"
    }, (context) => {
      const { isDesktop } = context.conditions;

      // Header reveals
      gsap.fromTo([".process-section .subtitle", ".process-section h2"],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".process-section .section-title-wrapper",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Layout: Timeline reveals
      if (layout === 'timeline') {
        // Scroll-bound line progress scrubbing
        gsap.fromTo(".process-line",
          { 
            scaleX: isDesktop ? 0 : 1, 
            scaleY: isDesktop ? 1 : 0 
          },
          {
            scaleX: 1,
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".process-timeline-container",
              start: "top 60%",
              end: "bottom 60%",
              scrub: true
            }
          }
        );

        // Staggered steps entrance
        gsap.fromTo(".process-step",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: ".process-steps",
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // Layout: Transformation reveals
      if (layout === 'transformation') {
        gsap.fromTo([".transformation-info-col", ".transformation-steps-col"],
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".transformation-showcase",
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }, containerRef);

    return () => mm.revert();
  }, [layout, data]);

  return (
    <section ref={containerRef} id="process" className="process-section section">
      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <span className="subtitle">{data.subtitle}</span>
          <h2>{data.title}</h2>
        </div>

        {/* Layout: Before & After Transformation */}
        {layout === 'transformation' && (
          <div className="transformation-showcase">
            <div className="transformation-info-col">
              <div className="comparison-box-header">
                <h4>Visual Transformation Study</h4>
                <p>Witness the shift from structural grid layouts to custom turnkey handovers.</p>
              </div>
              <div className="comparison-split-wrapper">
                <div className="comparison-card">
                  <img src={data.beforeImg} alt="Before state shell" />
                  <span className="comparison-label-badge">{data.beforeLabel}</span>
                </div>
                <div className="comparison-card">
                  <img src={data.afterImg} alt="After state completed design" />
                  <span className="comparison-label-badge">{data.afterLabel}</span>
                </div>
              </div>
            </div>

            <div className="transformation-steps-col">
              <div className="philosophy-pillars-list" style={{ gap: '1.5rem' }}>
                {data.list.map((step, i) => (
                  <div key={i} className="philosophy-pillar" style={{ borderLeftColor: 'var(--color-accent)' }}>
                    <span className="step-subtitle" style={{ fontSize: '0.65rem', color: 'var(--color-accent)' }}>
                      {step.phase} ({step.duration})
                    </span>
                    <h3 className="pillar-title" style={{ fontSize: '1.15rem', textTransform: 'none', margin: '0.25rem 0' }}>
                      {step.title}
                    </h3>
                    <p className="pillar-desc" style={{ fontSize: '0.85rem' }}>
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Layout: Timeline progress tracks (Classic) */}
        {layout === 'timeline' && (
          <div className="process-timeline-container">
            {/* Connector Line (Scrub animated) */}
            <div className="process-line"></div>

            {/* Steps */}
            <div className="process-steps">
              {data.list.map((step, index) => {
                return (
                  <div key={index} className="process-step">
                    {/* Visual Node */}
                    <div className="step-node-wrapper">
                      <div className="step-node">
                        <span className="step-node-number">{step.num}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="step-content">
                      <span className="step-subtitle">{step.phase}</span>
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-desc">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .process-section {
          background-color: var(--color-bg-primary);
          overflow: hidden;
        }

        .process-timeline-container {
          position: relative;
          width: 100%;
          margin-top: 4rem;
        }

        /* Connecting Horizontal Line (Desktop) */
        .process-line {
          position: absolute;
          top: 35px;
          left: 5%;
          right: 5%;
          height: 1px;
          background-color: var(--color-border);
          z-index: 1;
          transform-origin: left;
          will-change: transform;
        }

        .process-steps {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2rem;
          position: relative;
          z-index: 2;
        }

        .process-step {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2rem;
        }

        /* Node Circle */
        .step-node-wrapper {
          width: 100%;
          display: flex;
          justify-content: flex-start;
        }

        .step-node {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background-color: var(--color-bg-primary);
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-smooth);
        }

        .process-step:hover .step-node {
          border-color: var(--color-accent);
          background-color: var(--color-bg-secondary);
          transform: scale(1.05);
        }

        .step-node-number {
          font-family: var(--font-headings);
          font-size: 1.25rem;
          color: var(--color-text-heading);
          font-weight: 300;
        }

        .process-step:hover .step-node-number {
          color: var(--color-accent);
        }

        /* Step Text Content */
        .step-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          text-align: left;
        }

        .step-subtitle {
          font-family: var(--font-body);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-accent);
          font-weight: 500;
        }

        .step-title {
          color: var(--color-text-heading);
          font-weight: 400;
        }

        .step-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--color-text-body);
        }

        @media (max-width: 991px) {
          /* Convert line to vertical track (Mobile) */
          .process-line {
            top: 0;
            left: 35px;
            right: auto;
            width: 1px;
            height: calc(100% - 70px);
            transform-origin: top;
          }

          .process-steps {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .process-step {
            flex-direction: row;
            gap: 3rem;
            align-items: center;
          }

          .step-node-wrapper {
            width: 70px;
          }

          .step-content {
            width: calc(100% - 140px);
          }
        }
      `}</style>
    </section>
  );
}
