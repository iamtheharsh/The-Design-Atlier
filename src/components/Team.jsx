import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Team() {
  const containerRef = useRef(null);

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
      gsap.fromTo(".team-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".team-grid",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const team = [
    {
      name: "Ariana Verra",
      role: "Founder & Creative Director",
      desc: "Architect and lead strategist with 15+ years experience designing bespoke apartments and residences globally.",
      img: "/images/founder_ariana.png"
    },
    {
      name: "Kabir Mehta",
      role: "Project Architect",
      desc: "Structural layouts coordinator mapping floor plan structures, structural changes, and daylight vectors.",
      img: "/images/team/kabir.jpg"
    },
    {
      name: "Ananya Sen",
      role: "Senior Interior Designer",
      desc: "Curates material palettes, sourcing textures, heavy linen drapery, stones, and lighting combinations.",
      img: "/images/team/ananya.jpg"
    },
    {
      name: "Rohan Sharma",
      role: "Site Execution Lead",
      desc: "Manages on-site contractors, custom joinery fabrications, civil changes, and final turnkey checks.",
      img: "/images/team/rohan.png"
    }
  ];

  return (
    <section 
      id="team" 
      ref={containerRef} 
      className="team-section section"
    >
      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <span className="subtitle">STUDIO TALENT</span>
          <h2>Our Design Collective</h2>
        </div>

        {/* Team Grid */}
        <div className="team-grid">
          {team.map((member, index) => {
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
          background-color: var(--color-bg-primary);
          border: 1px solid var(--color-border);
          padding: 1rem;
          transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), 
                      opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), 
                      border-color 0.4s ease;
        }

        .team-card:hover {
          border-color: var(--color-accent);
          transform: translateY(-5px);
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

        .team-card:hover .team-img {
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
