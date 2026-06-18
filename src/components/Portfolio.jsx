import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Portfolio({ data, layout }) {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = data.categories || ['All'];
  const filteredProjects = activeCategory === 'All' 
    ? data.list 
    : data.list.filter(p => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered grid cards entrance reveal
      gsap.fromTo(".portfolio-card, .portfolio-card-masonry, .bento-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".portfolio-grid, .masonry-columns-container, .services-bento-grid",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // Parallax scroll on images (for classic parallaxGrid layout)
      if (layout === 'parallaxGrid') {
        const images = gsap.utils.toArray('.parallax-img');
        images.forEach(img => {
          gsap.fromTo(img, 
            { yPercent: -15 },
            { 
              yPercent: 15, 
              ease: "none",
              scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [layout, activeCategory, data]); // Re-initialize GSAP when categories or layouts update

  // Helper to get Bento sizes for portfolio
  const getBentoClasses = (index, total) => {
    if (index === 0) return 'col-span-8 row-span-2';
    if (index === 1) return 'col-span-4';
    if (index === 2) return 'col-span-4';
    if (index === 3) return 'col-span-8';
    return 'col-span-6';
  };

  // Splitting columns for Masonry layout
  const col1 = [];
  const col2 = [];
  const col3 = [];
  filteredProjects.forEach((proj, idx) => {
    if (idx % 3 === 0) col1.push(proj);
    else if (idx % 3 === 1) col2.push(proj);
    else col3.push(proj);
  });

  return (
    <section 
      ref={containerRef} 
      id="portfolio" 
      className="portfolio-section section section-dark"
    >
      <div className="container">
        {/* Header Block */}
        <div className="portfolio-header">
          <div className="section-title-wrapper">
            <span className="subtitle">{data.subtitle}</span>
            <h2>{data.title}</h2>
          </div>

          {/* Filtering Tabs */}
          {categories.length > 1 && (
            <div className="filter-tabs">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(cat)}
                  className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Layout: Bento Showcase */}
        {layout === 'bentoShowcase' && (
          <div className="services-bento-grid">
            {filteredProjects.map((project, index) => {
              const spanClass = getBentoClasses(index, filteredProjects.length);
              return (
                <div key={index} className={`bento-card ${spanClass}`}>
                  <div className="bento-card-bg">
                    <img src={project.img} alt={project.title} />
                    <div className="bento-card-overlay"></div>
                  </div>
                  <div className="bento-card-content">
                    <span className="bento-card-num" style={{ color: 'var(--color-accent)' }}>{project.category}</span>
                    <h3 className="bento-card-title">{project.title}</h3>
                    <p className="bento-card-desc">{project.location} • {project.style}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Layout: Asymmetric Masonry Columns */}
        {layout === 'masonry' && (
          <div className="masonry-columns-container">
            {/* Column 1 */}
            <div className="masonry-column">
              {col1.map((project, idx) => (
                <div key={idx} className="portfolio-card-masonry">
                  <div className="masonry-img-wrapper">
                    <img src={project.img} alt={project.title} className="masonry-img" />
                  </div>
                  <div className="masonry-content">
                    <h3 className="masonry-title">{project.title}</h3>
                    <span className="masonry-meta">{project.location} • {project.style}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Column 2 */}
            <div className="masonry-column">
              {col2.map((project, idx) => (
                <div key={idx} className="portfolio-card-masonry">
                  <div className="masonry-img-wrapper">
                    <img src={project.img} alt={project.title} className="masonry-img" />
                  </div>
                  <div className="masonry-content">
                    <h3 className="masonry-title">{project.title}</h3>
                    <span className="masonry-meta">{project.location} • {project.style}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Column 3 */}
            <div className="masonry-column">
              {col3.map((project, idx) => (
                <div key={idx} className="portfolio-card-masonry">
                  <div className="masonry-img-wrapper">
                    <img src={project.img} alt={project.title} className="masonry-img" />
                  </div>
                  <div className="masonry-content">
                    <h3 className="masonry-title">{project.title}</h3>
                    <span className="masonry-meta">{project.location} • {project.style}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Layout: Parallax Grid (Classic) */}
        {layout === 'parallaxGrid' && (
          <div className="portfolio-grid">
            {filteredProjects.map((project, index) => {
              return (
                <div 
                  key={index} 
                  className="portfolio-card"
                >
                  <div className="portfolio-img-container">
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      className="portfolio-img parallax-img"
                    />
                    
                    {/* Hover Overlay detail */}
                    <div className="portfolio-hover-overlay">
                      <div className="portfolio-hover-content">
                        <span className="portfolio-hover-cat">{project.category}</span>
                        <h3 className="portfolio-hover-title">{project.title}</h3>
                        <span className="portfolio-hover-meta">{project.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="portfolio-info-bottom">
                    <h3 className="portfolio-bottom-title">{project.title}</h3>
                    <div className="portfolio-bottom-row">
                      <span>{project.style}</span>
                      <span>{project.area}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer CTA block */}
        <div className="portfolio-footer">
          <p>Want to see our custom material lists and construction archives?</p>
          <a href="#contact" className="btn btn-secondary">
            Request Full Archive Portfolio
          </a>
        </div>
      </div>

      <style>{`
        .portfolio-header {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 4rem;
          border-bottom: 1px solid rgba(216, 208, 196, 0.1);
          padding-bottom: 2rem;
        }

        .filter-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding-bottom: 1rem;
        }

        .filter-btn {
          background: none;
          border: 1px solid rgba(216, 208, 196, 0.2);
          color: var(--color-border);
          padding: 0.6rem 1.4rem;
          font-family: var(--font-body);
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .filter-btn:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }

        .filter-btn.active {
          background-color: var(--color-accent);
          border-color: var(--color-accent);
          color: var(--color-text-heading);
          font-weight: 500;
        }

        /* Portfolio Grid (Classic) */
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 4.5rem;
        }

        .portfolio-card {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .portfolio-card:nth-child(even) {
          margin-top: 5rem;
        }

        .portfolio-img-container {
          position: relative;
          width: 100%;
          height: 520px;
          overflow: hidden;
          background-color: #1a2733;
        }

        .portfolio-img {
          width: 100%;
          height: 120%; /* Extra height to accommodate parallax translation */
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          will-change: transform;
        }

        /* Overlay details on hover */
        .portfolio-hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(37, 53, 69, 0.8) 20%, transparent 80%);
          opacity: 0;
          transition: opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          z-index: 2;
          display: flex;
          align-items: flex-end;
          padding: 3rem;
        }

        .portfolio-card:hover .portfolio-hover-overlay {
          opacity: 1;
        }

        .portfolio-hover-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          transform: translateY(20px);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .portfolio-card:hover .portfolio-hover-content {
          transform: translateY(0);
        }

        .portfolio-hover-cat {
          font-family: var(--font-body);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--color-accent);
          font-weight: 500;
        }

        .portfolio-hover-title {
          font-family: var(--font-headings);
          font-size: 2rem;
          color: var(--color-bg-primary);
          font-weight: 300;
        }

        .portfolio-hover-meta {
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: var(--color-border);
          font-weight: 300;
        }

        /* Bottom Text Details */
        .portfolio-info-bottom {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          border-left: 1px solid var(--color-accent);
          padding-left: 1.25rem;
        }

        .portfolio-bottom-title {
          color: var(--color-bg-primary);
          font-weight: 400;
        }

        .portfolio-bottom-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--color-border);
        }

        /* Footer CTA block */
        .portfolio-footer {
          margin-top: 5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          border-top: 1px solid rgba(216, 208, 196, 0.1);
          padding-top: 4rem;
          width: 100%;
        }

        .portfolio-footer p {
          font-family: var(--font-headings);
          font-size: clamp(1.2rem, 2vw, 1.6rem);
          font-weight: 300;
          color: var(--color-border);
          line-height: 1.5;
          margin-bottom: 0.5rem;
          width: 100%;
        }

        @media (min-width: 992px) {
          .portfolio-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
          }
          .portfolio-header .section-title-wrapper {
            margin-bottom: 0;
          }
          .filter-tabs {
            border-bottom: none;
            padding-bottom: 0;
          }
        }

        @media (max-width: 767px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .portfolio-card:nth-child(even) {
            margin-top: 0;
          }

          .portfolio-img-container {
            height: 320px;
          }

          .portfolio-hover-overlay {
            padding: 1.5rem;
          }

          .portfolio-hover-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
