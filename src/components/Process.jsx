import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Process() {
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
    }, containerRef);

    return () => mm.revert();
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Discovery',
      subtitle: 'Consultation & Site Review',
      desc: 'We conduct a thorough alignment meeting to map your functional preferences, budget requirements, lifestyle behaviors, and perform exact site measurements.'
    },
    {
      num: '02',
      title: 'Concept',
      subtitle: 'Space Planning & Moods',
      desc: 'Our architects draft initial 2D layout options, traffic flow maps, and curated texture boards (wood, stone, metal options) to define the design direction.'
    },
    {
      num: '03',
      title: 'Design',
      subtitle: '3D Renderings & Specifications',
      desc: 'We generate photorealistic 3D visual models and detailed technical drawings. Every single piece of furniture, paint code, and stone finish is documented.'
    },
    {
      num: '04',
      title: 'Execution',
      subtitle: 'Craftsmanship & Auditing',
      desc: 'Our trusted engineers take over construction, managing custom millwork fabrication, electrical mapping, and stone installations with rigorous quality audits.'
    },
    {
      num: '05',
      title: 'Handover',
      subtitle: 'Styling & Reveal',
      desc: 'We perform complete professional deep cleaning, curate artwork and styling placements, and hand over your timeless new sanctuary keys.'
    }
  ];

  return (
    <section ref={containerRef} id="process" className="process-section section">
      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <span className="subtitle">METHODOLOGY</span>
          <h2>The Execution Journey</h2>
        </div>

        {/* Timeline Container */}
        <div className="process-timeline-container">
          {/* Connector Line (Scrub animated) */}
          <div className="process-line"></div>

          {/* Steps */}
          <div className="process-steps">
            {steps.map((step, index) => {
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
                    <span className="step-subtitle">{step.subtitle}</span>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
          .process-line {
            display: block;
            position: absolute;
            top: 30px;
            bottom: 30px;
            left: 30px; /* Centered with vertical nodes */
            width: 1px;
            height: auto;
            background-color: var(--color-border);
            z-index: 1;
            transform-origin: top;
            will-change: transform;
          }

          .process-steps {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .process-step {
            flex-direction: row;
            align-items: flex-start;
            gap: 2rem;
          }

          .step-node-wrapper {
            width: auto;
          }

          .step-node {
            width: 60px;
            height: 60px;
            flex-shrink: 0;
          }

          .step-content {
            padding-top: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
}

