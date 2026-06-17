import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Portfolio() {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Living Spaces', 'Bedrooms', 'Kitchens', 'Bathrooms', 'Luxury Villas', 'Modern Apartments'];
  
  const projects = [
    {
      title: 'Bandra Coastal Lounge',
      category: 'Living Spaces',
      img: '/images/living room/WhatsApp Image 2026-06-17 at 14.28.32.jpeg',
      location: 'Bandra West, Mumbai',
      style: 'Quiet Luxury',
      area: '2,400 sq. ft.'
    },
    {
      title: 'The Juhu Horizon Atrium',
      category: 'Living Spaces',
      img: '/images/living room/WhatsApp Image 2026-06-17 at 14.28.33.jpeg',
      location: 'Juhu, Mumbai',
      style: 'Warm Minimalist',
      area: '2,800 sq. ft.'
    },
    {
      title: 'Luminous Oak Pavilion',
      category: 'Living Spaces',
      img: '/images/living room/WhatsApp Image 2026-06-17 at 14.28.33 (1).jpeg',
      location: 'Worli, Mumbai',
      style: 'Earthy Modern',
      area: '2,600 sq. ft.'
    },
    {
      title: 'Monochromatic Serif Lounge',
      category: 'Living Spaces',
      img: '/images/living room/WhatsApp Image 2026-06-17 at 14.28.33 (2).jpeg',
      location: 'Lower Parel, Mumbai',
      style: 'Monochromatic',
      area: '2,150 sq. ft.'
    },
    {
      title: 'The Architectural Salon',
      category: 'Living Spaces',
      img: '/images/living room/WhatsApp Image 2026-06-17 at 14.28.34.jpeg',
      location: 'Prabhadevi, Mumbai',
      style: 'Sleek Contemporary',
      area: '3,000 sq. ft.'
    },
    {
      title: 'The Glasshouse Pavilion',
      category: 'Living Spaces',
      img: '/images/living room/WhatsApp Image 2026-06-17 at 14.28.34 (1).jpeg',
      location: 'Alibaug, Maharashtra',
      style: 'Quiet Luxury',
      area: '3,800 sq. ft.'
    },
    {
      title: 'The Juhu Master Sanctuary',
      category: 'Bedrooms',
      img: '/images/bedroom/WhatsApp Image 2026-06-17 at 14.24.41.jpeg',
      location: 'Juhu, Mumbai',
      style: 'Warm Minimalist',
      area: '1,600 sq. ft.'
    },
    {
      title: 'Earthy Linen Suite',
      category: 'Bedrooms',
      img: '/images/bedroom/WhatsApp Image 2026-06-17 at 14.24.41 (1).jpeg',
      location: 'Bandra, Mumbai',
      style: 'Earthy Editorial',
      area: '1,400 sq. ft.'
    },
    {
      title: 'The Textured Chamber',
      category: 'Bedrooms',
      img: '/images/bedroom/WhatsApp Image 2026-06-17 at 14.24.41 (2).jpeg',
      location: 'Colaba, Mumbai',
      style: 'Bespoke Luxury',
      area: '1,850 sq. ft.'
    },
    {
      title: 'Sanctuary of Light',
      category: 'Bedrooms',
      img: '/images/bedroom/WhatsApp Image 2026-06-17 at 14.24.42.jpeg',
      location: 'Altamount Road, Mumbai',
      style: 'Quiet Luxury',
      area: '2,100 sq. ft.'
    },
    {
      title: 'Sophisticated Master Retreat',
      category: 'Bedrooms',
      img: '/images/bedroom/WhatsApp Image 2026-06-17 at 14.24.42 (1).jpeg',
      location: 'Lokhandwala, Mumbai',
      style: 'Modern Serif',
      area: '1,900 sq. ft.'
    },
    {
      title: 'Textured Linen Chamber',
      category: 'Bedrooms',
      img: '/images/bedroom/WhatsApp Image 2026-06-17 at 14.24.42 (2).jpeg',
      location: 'Worli Sea Face, Mumbai',
      style: 'Warm Editorial',
      area: '1,750 sq. ft.'
    },
    {
      title: 'The Brass Kitchen Suite',
      category: 'Kitchens',
      img: '/images/Kitchen/WhatsApp Image 2026-06-17 at 14.26.27.jpeg',
      location: 'Prabhadevi, Mumbai',
      style: 'Sleek Architectural',
      area: '900 sq. ft.'
    },
    {
      title: 'Marble-Clad Culinary Studio',
      category: 'Kitchens',
      img: '/images/Kitchen/WhatsApp Image 2026-06-17 at 14.26.28.jpeg',
      location: 'Worli, Mumbai',
      style: 'Quiet Luxury',
      area: '850 sq. ft.'
    },
    {
      title: 'Minimalist Walnut Kitchen',
      category: 'Kitchens',
      img: '/images/Kitchen/WhatsApp Image 2026-06-17 at 14.26.28 (1).jpeg',
      location: 'Bandra, Mumbai',
      style: 'Warm Minimalist',
      area: '1,100 sq. ft.'
    },
    {
      title: 'The Architectural Galley',
      category: 'Kitchens',
      img: '/images/Kitchen/WhatsApp Image 2026-06-17 at 14.26.28 (2).jpeg',
      location: 'Juhu Beach, Mumbai',
      style: 'Sleek Modern',
      area: '950 sq. ft.'
    },
    {
      title: 'Luminous Oak Kitchen',
      category: 'Kitchens',
      img: '/images/Kitchen/WhatsApp Image 2026-06-17 at 14.26.29.jpeg',
      location: 'Lower Parel, Mumbai',
      style: 'Nordic Editorial',
      area: '780 sq. ft.'
    },
    {
      title: 'Monolithic Stone Bath Suite',
      category: 'Bathrooms',
      img: '/images/bathroomo/WhatsApp Image 2026-06-17 at 14.47.28.jpeg',
      location: 'Bandra, Mumbai',
      style: 'Quiet Luxury',
      area: '320 sq. ft.'
    },
    {
      title: 'Travertine Arch Powder Room',
      category: 'Bathrooms',
      img: '/images/bathroomo/WhatsApp Image 2026-06-17 at 14.47.28 (1).jpeg',
      location: 'Juhu, Mumbai',
      style: 'Warm Minimalist',
      area: '210 sq. ft.'
    },
    {
      title: 'The Terrazzo Spa Chamber',
      category: 'Bathrooms',
      img: '/images/bathroomo/WhatsApp Image 2026-06-17 at 14.47.28 (2).jpeg',
      location: 'Worli, Mumbai',
      style: 'Sleek Modern',
      area: '400 sq. ft.'
    },
    {
      title: 'Luminous Fluted Glass Oasis',
      category: 'Bathrooms',
      img: '/images/bathroomo/WhatsApp Image 2026-06-17 at 14.47.29.jpeg',
      location: 'Lower Parel, Mumbai',
      style: 'Monochromatic',
      area: '280 sq. ft.'
    },
    {
      title: 'Minimalist Brass Ensuite',
      category: 'Bathrooms',
      img: '/images/bathroomo/WhatsApp Image 2026-06-17 at 14.47.29 (1).jpeg',
      location: 'Altamount Road, Mumbai',
      style: 'Bespoke Premium',
      area: '350 sq. ft.'
    },
    {
      title: 'The Juhu Archway Villa',
      category: 'Luxury Villas',
      img: '/images/luxury vills/WhatsApp Image 2026-06-17 at 14.47.26.jpeg',
      location: 'Juhu, Mumbai',
      style: 'High-End Contemporary',
      area: '5,500 sq. ft.'
    },
    {
      title: 'Alibaug Coastal Pavilion',
      category: 'Luxury Villas',
      img: '/images/luxury vills/WhatsApp Image 2026-06-17 at 14.47.26 (1).jpeg',
      location: 'Alibaug, Maharashtra',
      style: 'Warm Minimalist',
      area: '6,200 sq. ft.'
    },
    {
      title: 'The Glasshouse Oasis',
      category: 'Luxury Villas',
      img: '/images/luxury vills/WhatsApp Image 2026-06-17 at 14.47.27.jpeg',
      location: 'Lonavala, Maharashtra',
      style: 'Quiet Luxury',
      area: '7,500 sq. ft.'
    },
    {
      title: 'Brutalist Cliffside Villa',
      category: 'Luxury Villas',
      img: '/images/luxury vills/WhatsApp Image 2026-06-17 at 14.47.27 (1).jpeg',
      location: 'Alibaug Coast, Maharashtra',
      style: 'Brutalist Minimal',
      area: '6,800 sq. ft.'
    },
    {
      title: 'The Palm Avenue Villa',
      category: 'Luxury Villas',
      img: '/images/luxury vills/WhatsApp Image 2026-06-17 at 14.47.27 (2).jpeg',
      location: 'Juhu Scheme, Mumbai',
      style: 'Bespoke Luxury',
      area: '5,800 sq. ft.'
    },
    {
      title: 'Altamount Road Penthouse',
      category: 'Modern Apartments',
      img: '/images/penthouse_bedroom.jpg',
      location: 'Altamount Road, Mumbai',
      style: 'Earthy Editorial',
      area: '3,200 sq. ft.'
    },
    {
      title: 'Lodha Ciel Residence',
      category: 'Modern Apartments',
      img: '/images/residence_bedroom.jpg',
      location: 'Lower Parel, Mumbai',
      style: 'New Classic',
      area: '2,400 sq. ft.'
    }
  ];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo([".portfolio-section .subtitle", ".portfolio-section h2"],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".portfolio-header",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Grid cards entrance reveals
      gsap.fromTo(".portfolio-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".portfolio-grid",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // Smooth parallax scaling translations inside container limits
      const cards = gsap.utils.toArray(".portfolio-card");
      cards.forEach((card) => {
        const img = card.querySelector(".portfolio-img");
        if (img) {
          gsap.fromTo(img,
            { yPercent: -12 },
            {
              yPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        }
      });

      // Footer CTA reveal
      gsap.fromTo(".portfolio-footer",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".portfolio-footer",
            start: "top 92%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    // Give a short timeout for the DOM layout to calculate bounds before refreshing coordinates
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [activeCategory]);

  return (
    <section 
      id="portfolio" 
      ref={containerRef} 
      className="portfolio-section section section-dark"
    >
      <div className="container">
        {/* Title & Filter Tabs */}
        <div className="portfolio-header">
          <div className="section-title-wrapper">
            <span className="subtitle">OUR WORK</span>
            <h2>Curated Portfolios</h2>
          </div>

          {/* Elegant Tabs */}
          <div className="filter-tabs no-scrollbar">
            {categories.map((cat, i) => (
              <button
                key={i}
                className={`filter-tab ${activeCategory === cat ? 'filter-tab-active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Editorial Staggered Grid */}
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
                    className="portfolio-img" 
                  />
                  
                  {/* Floating Micro-Detail Badge */}
                  <div className="portfolio-badge">{project.style}</div>
                  
                  {/* Hover overlay with detail content */}
                  <div className="portfolio-hover-overlay">
                    <div className="portfolio-hover-content">
                      <span className="portfolio-hover-cat">{project.category}</span>
                      <h3 className="portfolio-hover-title">{project.title}</h3>
                      <p className="portfolio-hover-meta">
                        {project.location} &bull; {project.area}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="portfolio-info-bottom">
                  <h4 className="portfolio-bottom-title">{project.title}</h4>
                  <div className="portfolio-bottom-row">
                    <span className="portfolio-bottom-loc">{project.location}</span>
                    <span className="portfolio-bottom-area">{project.area}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom CTA */}
        <div className="portfolio-footer">
          <p>Each space is a custom exploration of form and tactile depth.</p>
          <a href="#contact" className="btn btn-primary">Explore Possibilities</a>
        </div>
      </div>

      <style>{`
        .portfolio-section {
          background-color: var(--color-text-heading);
        }

        .portfolio-header {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 4rem;
        }

        /* Filter Tabs */
        .filter-tabs {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(216, 208, 196, 0.15);
        }

        .filter-tab {
          background: none;
          border: none;
          padding: 0.75rem 0.5rem;
          font-family: var(--font-body);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-border);
          cursor: pointer;
          white-space: nowrap;
          position: relative;
          transition: var(--transition-fast);
        }

        .filter-tab:hover {
          color: var(--color-bg-primary);
        }

        .filter-tab-active {
          color: var(--color-bg-primary);
          font-weight: 500;
        }

        .filter-tab-active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 1.5px;
          background-color: var(--color-accent);
        }

        /* Staggered Layout Grid */
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3.5rem;
        }

        .portfolio-card {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          cursor: pointer;
        }

        /* Staggering columns for editorial look */
        .portfolio-card:nth-child(even) {
          margin-top: 4rem;
        }

        .portfolio-img-container {
          position: relative;
          width: 100%;
          height: 480px;
          overflow: hidden;
          background-color: #1a1816;
          border: 1px solid rgba(216, 208, 196, 0.1);
        }

        .portfolio-img {
          position: absolute;
          top: -10%;
          left: 0;
          width: 100%;
          height: 120%;
          object-fit: cover;
          display: block;
          will-change: transform;
        }

        .portfolio-badge {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          background-color: rgba(45, 42, 38, 0.85);
          backdrop-filter: blur(5px);
          padding: 0.4rem 1rem;
          font-family: var(--font-body);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-bg-primary);
          z-index: 2;
          font-weight: 400;
          border: 1px solid rgba(216, 208, 196, 0.15);
        }

        /* Hover Overlay */
        .portfolio-hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(45, 42, 38, 0.9);
          opacity: 0;
          display: flex;
          align-items: flex-end;
          padding: 3rem;
          transition: var(--transition-smooth);
          z-index: 3;
        }

        .portfolio-card:hover .portfolio-hover-overlay {
          opacity: 1;
        }

        .portfolio-hover-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          transform: translateY(20px);
          transition: var(--transition-smooth);
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


