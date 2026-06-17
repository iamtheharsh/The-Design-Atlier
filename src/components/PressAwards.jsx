import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function PressAwards() {
  const [ref, isRevealed] = useScrollReveal(0.15);

  const awards = [
    { title: "Top Luxury Interior Studio", year: "2024", body: "National Design Guild Awards" },
    { title: "Design Excellence Award", year: "2023", body: "Architectural Association Forum" },
    { title: "Featured Studio Profile", year: "2024", body: "Premium Living Annual Issue" },
    { title: "Luxury Home Design Recognition", year: "2022", body: "Mumbai Design Biennale" }
  ];

  const press = [
    "Architectural Living",
    "Luxury Spaces Journal",
    "Modern Residence Magazine",
    "Design Collective"
  ];

  return (
    <section 
      id="awards" 
      ref={ref} 
      className={`awards-section section ${isRevealed ? 'reveal-active' : ''}`}
    >
      <div className="container">
        {/* Split Grid */}
        <div className="awards-grid">
          {/* Left Side: Awards list */}
          <div className="awards-left">
            <span className="subtitle reveal-fade-up">CREDENTIALS</span>
            <h2 className="reveal-fade-up delay-100">Recognition & Awards</h2>
            
            <div className="awards-list">
              {awards.map((award, i) => (
                <div key={i} className={`award-item reveal-fade-up delay-${(i + 1) * 150}`}>
                  <div className="award-header-row">
                    <h3 className="award-title">{award.title}</h3>
                    <span className="award-year">{award.year}</span>
                  </div>
                  <p className="award-body">{award.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Press Mentions */}
          <div className="press-right">
            <span className="subtitle reveal-fade-up">MEDIA MENTIONS</span>
            <h2 className="reveal-fade-up delay-100">Mentions in Press</h2>

            <div className="press-grid">
              {press.map((item, i) => (
                <div 
                  key={i} 
                  className={`press-item reveal-fade-up delay-${(i + 1) * 150}`}
                >
                  <span className="press-logo-text">{item}</span>
                  <div className="press-divider"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .awards-section {
          background-color: var(--color-bg-secondary);
          border-bottom: 1px solid var(--color-border);
        }

        .awards-grid {
          display: grid;
          grid-template-columns: 50% 50%;
          gap: 6rem;
        }

        .awards-left, .press-right {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Awards Stack */
        .awards-list {
          display: flex;
          flex-direction: column;
          margin-top: 1.5rem;
        }

        .award-item {
          padding: 1.5rem 0;
          border-bottom: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .award-item:first-child {
          padding-top: 0;
        }

        .award-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .award-header-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .award-title {
          font-family: var(--font-body);
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--color-text-heading);
        }

        .award-year {
          font-family: var(--font-headings);
          font-size: 1.25rem;
          color: var(--color-accent);
          font-weight: 400;
        }

        .award-body {
          font-size: 0.9rem;
          color: var(--color-text-body);
        }

        /* Press items styling */
        .press-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-top: 1.5rem;
          height: 100%;
          align-content: start;
        }

        .press-item {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          justify-content: center;
          padding: 1.5rem;
          background-color: var(--color-bg-primary);
          border: 1px solid var(--color-border);
          text-align: center;
          transition: var(--transition-fast);
        }

        .press-item:hover {
          border-color: var(--color-accent);
        }

        .press-logo-text {
          font-family: var(--font-headings);
          font-size: 1.35rem;
          font-weight: 300;
          color: var(--color-text-heading);
          letter-spacing: 0.05em;
          text-transform: capitalize;
          opacity: 0.8;
        }

        .press-divider {
          width: 20px;
          height: 1.5px;
          background-color: var(--color-accent);
          margin: 0 auto;
        }

        @media (max-width: 991px) {
          .awards-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }

        @media (max-width: 576px) {
          .press-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
