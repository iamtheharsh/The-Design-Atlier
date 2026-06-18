import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Philosophy({ data, layout }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for left column manifesto narrative
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo([".philosophy-left .subtitle", ".philosophy-left h2", ".philosophy-intro"],
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.12 }
      );

      // Staggered reveal of pillars
      tl.fromTo(".philosophy-pillar",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power3.out", stagger: 0.15 },
        "-=0.6"
      );

      if (layout === 'sliding') {
        // Right column sliding block clip-path image reveal
        gsap.fromTo(".philosophy-image-wrapper",
          { clipPath: "inset(0 100% 0 0)", scale: 1.12 },
          {
            clipPath: "inset(0 0% 0 0)",
            scale: 1.0,
            duration: 1.8,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: ".philosophy-right",
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      } else {
        // Editorial visuals stagger reveal
        gsap.fromTo([".editorial-img-back", ".editorial-img-front"],
          { opacity: 0, y: 40, scale: 1.05 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".philosophy-editorial-visuals",
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [layout, data]);

  return (
    <section 
      id="philosophy" 
      ref={containerRef} 
      className="philosophy-section section"
    >
      <div className="container">
        {layout === 'editorial' ? (
          /* Layout: Editorial Overlap */
          <div className="philosophy-editorial">
            <div className="philosophy-editorial-visuals">
              <img src={data.img} alt="Textured architectural background layer" className="editorial-img-back" />
              <img src={data.img} alt="Fine architectural focus layer" className="editorial-img-front" />
            </div>
            
            <div className="philosophy-left">
              <span className="subtitle">{data.subtitle}</span>
              <h2>{data.title}</h2>
              <p className="philosophy-intro">{data.intro}</p>

              <div className="philosophy-pillars-list" style={{ marginTop: '2.5rem' }}>
                {data.pillars.map((pillar, i) => (
                  <div key={i} className="philosophy-pillar">
                    <h3 className="pillar-title">{pillar.title}</h3>
                    <p className="pillar-desc">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Layout: Sliding Wipes (Classic) */
          <div className="philosophy-grid">
            {/* Left Column: Narrative Copy */}
            <div className="philosophy-left">
              <span className="subtitle">{data.subtitle}</span>
              <h2>{data.title}</h2>
              <p className="philosophy-intro">{data.intro}</p>

              <div className="philosophy-pillars-list">
                {data.pillars.map((pillar, i) => (
                  <div key={i} className="philosophy-pillar">
                    <h3 className="pillar-title">{pillar.title}</h3>
                    <p className="pillar-desc">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Architectural Image Composition */}
            <div className="philosophy-right">
              <div className="philosophy-image-wrapper">
                <img 
                  src={data.img} 
                  alt="Tactile textures and minimal architectural lines" 
                  className="philosophy-img"
                />
                <div className="philosophy-image-badge">
                  <span>{data.badge || 'WARM MINIMALISM'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .philosophy-section {
          background-color: var(--color-bg-primary);
        }

        .philosophy-grid {
          display: grid;
          grid-template-columns: 50% 50%;
          gap: 6%;
          align-items: center;
        }

        .philosophy-left {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .philosophy-intro {
          font-size: 1.1rem;
          color: var(--color-text-heading);
          margin-bottom: 1rem;
        }

        .philosophy-pillars-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .philosophy-pillar {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          border-left: 2px solid var(--color-accent);
          padding-left: 1.5rem;
        }

        .pillar-title {
          font-family: var(--font-body);
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--color-text-heading);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .pillar-desc {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--color-text-body);
        }

        /* Image Column */
        .philosophy-right {
          display: flex;
          justify-content: center;
        }

        .philosophy-image-wrapper {
          position: relative;
          width: 100%;
          height: 600px;
          overflow: hidden;
          background-color: var(--color-bg-secondary);
          clip-path: inset(0 100% 0 0); /* Initial reveal state for GSAP sync */
          will-change: clip-path, transform;
        }

        .philosophy-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform var(--transition-smooth);
        }

        .philosophy-image-wrapper:hover .philosophy-img {
          transform: scale(1.03);
        }

        .philosophy-image-badge {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          background-color: var(--color-text-heading);
          color: var(--color-bg-primary);
          padding: 0.5rem 1.25rem;
          font-family: var(--font-body);
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        @media (max-width: 991px) {
          .philosophy-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .philosophy-image-wrapper {
            height: 400px;
          }
        }
      `}</style>
    </section>
  );
}
