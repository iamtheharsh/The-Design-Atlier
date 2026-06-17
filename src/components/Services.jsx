import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Services() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo([".subtitle", ".services-title-el"],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".services-title-wrapper",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Staggered cards reveal
      gsap.fromTo(".service-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // Footer CTA reveal
      gsap.fromTo(".services-footer",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-footer",
            start: "top 92%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      num: '01',
      title: 'Full Home Interiors',
      desc: 'Bespoke design concepts, floor plan zoning, material curation, and absolute turnkey transformation.',
      img: '/images/luxury vills/WhatsApp Image 2026-06-17 at 14.47.26.jpeg'
    },
    {
      num: '02',
      title: 'Modular Kitchens',
      desc: 'Highly ergonomic layout modules integrated with top-tier hardware, cabinets, and premium stone surfaces.',
      img: '/images/Kitchen/WhatsApp Image 2026-06-17 at 14.26.27.jpeg'
    },
    {
      num: '03',
      title: 'Living Room Design',
      desc: 'Comfort-first luxury spaces mapping light flow, ambient lighting, and bespoke central seating.',
      img: '/images/living room/WhatsApp Image 2026-06-17 at 14.28.33.jpeg'
    },
    {
      num: '04',
      title: 'Master Bedroom Suites',
      desc: 'Sanctuary-like spatial layout featuring custom headboards, lighting control, and texture layering.',
      img: '/images/bedroom/WhatsApp Image 2026-06-17 at 14.24.41.jpeg'
    },
    {
      num: '05',
      title: 'Custom Wardrobes',
      desc: 'Walk-in closets and wardrobe storage built with integrated LED lighting and premium timber detailing.',
      img: '/images/bedroom/WhatsApp Image 2026-06-17 at 14.24.42 (1).jpeg'
    },
    {
      num: '06',
      title: 'Luxury Renovation',
      desc: 'Complete restoration of heritage or older structures, structural changes, and modern integration.',
      img: '/images/luxury vills/WhatsApp Image 2026-06-17 at 14.47.27.jpeg'
    },
    {
      num: '07',
      title: 'Design Consultations',
      desc: 'One-on-one sessions with our lead architect to map architectural constraints, styling sheets, and plans.',
      img: '/images/minimalist_detail.jpg'
    }
  ];

  return (
    <section ref={containerRef} id="services" className="services-section section">
      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper services-title-wrapper">
          <span className="subtitle">EXPERTISE AREA</span>
          <h2 className="services-title-el">Bespoke Design Services</h2>
        </div>

        {/* Responsive Grid */}
        <div className="services-grid">
          {services.map((service, index) => {
            return (
              <div 
                key={index} 
                className={`service-card ${index === 6 ? 'service-card-wide' : ''}`}
              >
                <div className="service-img-wrapper">
                  <img src={service.img} alt={service.title} className="service-img" />
                  <div className="service-overlay"></div>
                  <span className="service-num">{service.num}</span>
                </div>
                <div className="service-content">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom CTA */}
        <div className="services-footer">
          <p style={{ marginBottom: '1rem' }}>Looking for a custom project configuration not listed here?</p>
          <a href="#contact" className="btn btn-secondary">Discuss Your Project</a>
        </div>
      </div>

      <style>{`
        .services-section {
          background-color: var(--color-bg-secondary);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          margin-bottom: 4rem;
        }

        .service-card {
          background-color: var(--color-bg-primary);
          border: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), 
                      opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), 
                      border-color 0.4s ease, 
                      box-shadow 0.4s ease;
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.03);
          border-color: var(--color-accent);
        }

        .service-img-wrapper {
          position: relative;
          width: 100%;
          height: 320px;
          overflow: hidden;
        }

        .service-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 6s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .service-card:hover .service-img {
          transform: scale(1.04);
        }

        .service-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(45, 42, 38, 0.3), transparent);
        }

        .service-num {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          font-family: var(--font-headings);
          font-size: 1.25rem;
          color: var(--color-bg-primary);
          z-index: 2;
        }

        .service-content {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex-grow: 1;
        }

        .service-card-title {
          color: var(--color-text-heading);
          font-weight: 400;
        }

        .service-card-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--color-text-body);
        }

        /* 7th Card custom wider footprint styling */
        .service-card-wide {
          grid-column: span 3;
          flex-direction: row;
          align-items: center;
        }

        .service-card-wide:hover {
          transform: translateY(-5px) !important;
        }

        .service-card-wide .service-img-wrapper {
          width: 50%;
          height: 350px;
        }

        .service-card-wide .service-content {
          width: 50%;
          padding: 3.5rem;
        }

        .services-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          text-align: center;
          border-top: 1px solid var(--color-border);
          padding-top: 3rem;
        }

        .services-footer p {
          color: var(--color-text-body);
        }

        @media (max-width: 1199px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .service-card-wide {
            grid-column: span 2;
            flex-direction: column;
          }

          .service-card-wide .service-img-wrapper {
            width: 100%;
            height: 320px;
          }

          .service-card-wide .service-content {
            width: 100%;
            padding: 2rem;
          }
        }

        @media (max-width: 767px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .service-card-wide {
            grid-column: span 1;
            flex-direction: column;
          }

          .service-card-wide .service-img-wrapper {
            width: 100%;
            height: 280px;
          }

          .service-card-wide .service-content {
            width: 100%;
            padding: 2rem;
          }

          .service-img-wrapper {
            height: 280px;
          }
        }
      `}</style>
    </section>
  );
}

