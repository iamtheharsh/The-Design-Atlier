import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Team({ data, layout }) {
  const containerRef = useRef(null);

  const subtitle = data?.subtitle || "STUDIO TALENT";
  const title = data?.title || "Our Design Collective";
  const list = Array.isArray(data) ? data : (data?.list || []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo([".team-section .subtitle", ".team-section h2"],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".team-section .section-title-wrapper",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Staggered cards reveal
      gsap.fromTo(".team-card, .team-staggered-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: layout === 'staggered' ? ".team-staggered-grid" : ".team-grid",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [layout, data]);

  return (
    <section 
      id="team" 
      ref={containerRef} 
      className="team-section section"
    >
      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <span className="subtitle">{subtitle}</span>
          <h2>{title}</h2>
        </div>

        {layout === 'staggered' ? (
          /* Layout: Staggered Depth portraits */
          <div className="team-staggered-grid">
            {list.map((member, index) => (
              <div key={index} className="team-staggered-card">
                <div className="team-img-wrapper">
                  <img src={member.img} alt={member.name} className="team-img" />
                  <div className="team-card-overlay"></div>
                </div>
                <div className="team-info">
                  <span className="team-role">{member.role}</span>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-desc">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Layout: Portrait Grid (Classic) */
          <div className="team-grid">
            {list.map((member, index) => {
              return (
                <div 
                  key={index} 
                  className="team-card"
                >
                  <div className="team-img-wrapper">
                    <img src={member.img} alt={member.name} className="team-img" />
                    <div className="team-card-overlay"></div>
                  </div>
                  <div className="team-info">
                    <span className="team-role">{member.role}</span>
                    <h3 className="team-name">{member.name}</h3>
                    <p className="team-desc">{member.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .team-section {
          background-color: var(--color-bg-primary);
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .team-card {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          text-align: left;
        }

        .team-img-wrapper {
          position: relative;
          width: 100%;
          height: 300px;
          overflow: hidden;
        }

        .team-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform var(--transition-smooth);
        }

        .team-card:hover .team-img, .team-staggered-card:hover .team-img {
          transform: scale(1.03);
        }

        .team-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(45, 42, 38, 0.1), transparent);
        }

        /* Info details */
        .team-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          text-align: left;
        }

        .team-role {
          font-family: var(--font-body);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-accent);
          font-weight: 500;
        }

        .team-name {
          color: var(--color-text-heading);
          font-weight: 400;
          font-size: 1.25rem;
        }

        .team-desc {
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--color-text-body);
        }

        @media (max-width: 991px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
        }

        @media (max-width: 576px) {
          .team-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
