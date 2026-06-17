import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Founder() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Portrait image clip-path vertical reveal
      gsap.fromTo(".founder-image-wrapper",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.6,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: ".founder-left",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // 2. Gold border offset slides in
      gsap.fromTo(".founder-border-accent",
        { x: 30, y: 30, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1.6,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: ".founder-left",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // 3. Right column narrative reveals
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".founder-right",
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo([".founder-right .subtitle", ".founder-name", ".founder-role", ".founder-divider", ".founder-message"],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.12 }
      );

      tl.fromTo(".founder-detail-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", stagger: 0.1 },
        "-=0.6"
      );

      tl.fromTo(".founder-cta-row",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="founder" 
      ref={containerRef} 
      className="founder-section section"
    >
      <div className="container">
        <div className="founder-grid">
          {/* Left Column: Portrait */}
          <div className="founder-left">
            <div className="founder-image-wrapper">
              <img 
                src="/images/founder_ariana.png" 
                alt="Ariana Verra, Founder and Creative Director of The Design Atelier" 
                className="founder-img"
              />
              {/* Fine gold border detail */}
              <div className="founder-border-accent"></div>
            </div>
          </div>

          {/* Right Column: Narrative details */}
          <div className="founder-right">
            <span className="subtitle">STUDIO LEADERSHIP</span>
            <h2 className="founder-name">Ariana Verra</h2>
            <span className="founder-role">Founder & Creative Director</span>
            
            <div className="founder-divider"></div>

            {/* Aspirational message statement */}
            <p className="founder-message">
              "Every home tells a story. Our role is to shape spaces that feel timeless, personal, and deeply connected to the people who live within them."
            </p>

            <div className="founder-details-grid">
              <div className="founder-detail-item">
                <span className="founder-detail-label">Signature Style</span>
                <span className="founder-detail-value">Warm Minimalism, Textured Neutrals</span>
              </div>
              <div className="founder-detail-item">
                <span className="founder-detail-label">Design Philosophy</span>
                <span className="founder-detail-value">Form is function elevated by tactile authenticity.</span>
              </div>
              <div className="founder-detail-item">
                <span className="founder-detail-label">Background</span>
                <span className="founder-detail-value">15+ Years leading high-end residential interiors globally.</span>
              </div>
              <div className="founder-detail-item">
                <span className="founder-detail-label">Specialization</span>
                <span className="founder-detail-value">Luxury apartments, penthouses, and custom coastal villas.</span>
              </div>
            </div>

            {/* Direct Conversion Action */}
            <div className="founder-cta-row">
              <a href="#contact" className="btn btn-secondary">
                Schedule a Design Call
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .founder-section {
          background-color: var(--color-bg-secondary);
        }

        .founder-grid {
          display: grid;
          grid-template-columns: 45% 55%;
          gap: 6%;
          align-items: center;
        }

        .founder-left {
          position: relative;
        }

        .founder-image-wrapper {
          position: relative;
          width: 100%;
          height: 600px;
          overflow: hidden;
          clip-path: inset(0 0 100% 0); /* Initial mask for sync */
          will-change: clip-path;
        }

        .founder-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform var(--transition-smooth);
        }

        .founder-image-wrapper:hover .founder-img {
          transform: scale(1.03);
        }

        .founder-border-accent {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          right: -1.5rem;
          bottom: -1.5rem;
          border: 1px solid var(--color-accent);
          pointer-events: none;
          z-index: -1;
          opacity: 0;
          will-change: transform, opacity;
        }

        /* Right Content */
        .founder-right {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .founder-name {
          margin: 0;
        }

        .founder-role {
          font-family: var(--font-body);
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-accent);
          font-weight: 500;
          margin-top: -0.5rem;
        }

        .founder-divider {
          width: 60px;
          height: 1px;
          background-color: var(--color-accent);
          margin: 0.5rem 0;
        }

        .founder-message {
          font-family: var(--font-headings);
          font-size: 1.8rem;
          line-height: 1.5;
          color: var(--color-text-heading);
          font-style: italic;
          font-weight: 300;
          margin-bottom: 1rem;
        }

        /* Detail grids */
        .founder-details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem 1.5rem;
          border-top: 1px solid var(--color-border);
          padding-top: 2rem;
          margin-bottom: 1rem;
        }

        .founder-detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .founder-detail-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-accent);
          font-weight: 500;
        }

        .founder-detail-value {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--color-text-body);
        }

        .founder-cta-row {
          margin-top: 1.5rem;
        }

        @media (max-width: 991px) {
          .founder-grid {
            grid-template-columns: 1fr;
            gap: 5rem;
          }

          .founder-image-wrapper {
            height: 480px;
          }

          .founder-border-accent {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
