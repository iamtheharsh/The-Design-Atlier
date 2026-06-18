import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Services({ data, layout }) {
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

      // Staggered cards reveal (Classic Grid)
      if (layout === 'staggeredGrid') {
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
      }

      // Bento Grid reveal
      if (layout === 'bento') {
        gsap.fromTo(".bento-card",
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: ".services-bento-grid",
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // Stacked List reveal
      if (layout === 'stackedList') {
        gsap.fromTo(".stacked-list-row",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: ".services-stacked-list",
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
      }

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
  }, [layout, data]);

  const getBentoClasses = (index, total) => {
    if (total === 7) {
      if (index === 0) return 'col-span-8 row-span-2';
      if (index === 1) return 'col-span-4';
      if (index === 2) return 'col-span-4';
      if (index === 3) return 'col-span-6';
      if (index === 4) return 'col-span-6';
      if (index === 5) return 'col-span-4';
      if (index === 6) return 'col-span-8';
    }
    if (total === 6) {
      if (index === 0) return 'col-span-6 row-span-2';
      if (index === 1) return 'col-span-6';
      if (index === 2) return 'col-span-4';
      if (index === 3) return 'col-span-8';
      if (index === 4) return 'col-span-8';
      if (index === 5) return 'col-span-4';
    }
    // 4 items
    if (index === 0) return 'col-span-8 row-span-2';
    if (index === 1) return 'col-span-4';
    if (index === 2) return 'col-span-4';
    if (index === 3) return 'col-span-8';
    return 'col-span-6';
  };

  return (
    <section ref={containerRef} id="services" className="services-section section">
      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper services-title-wrapper">
          <span className="subtitle">{data.subtitle}</span>
          <h2 className="services-title-el">{data.title}</h2>
        </div>

        {/* Layout: Bento Grid */}
        {layout === 'bento' && (
          <div className="services-bento-grid">
            {data.list.map((service, index) => {
              const spanClass = getBentoClasses(index, data.list.length);
              const hasImage = !!service.img;

              return (
                <div key={index} className={`bento-card ${spanClass}`}>
                  {hasImage && (
                    <div className="bento-card-bg">
                      <img src={service.img} alt={service.title} />
                      <div className="bento-card-overlay"></div>
                    </div>
                  )}
                  <span className="bento-card-num">{service.num}</span>
                  <div className="bento-card-content">
                    <h3 className="bento-card-title">{service.title}</h3>
                    <p className="bento-card-desc">{service.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Layout: Stacked List */}
        {layout === 'stackedList' && (
          <div className="services-stacked-list">
            {data.list.map((service, index) => (
              <div key={index} className="stacked-list-row">
                <span className="stacked-row-num">{service.num}</span>
                <div className="stacked-row-title">
                  <h3>{service.title}</h3>
                </div>
                <div className="stacked-row-content">
                  <p className="stacked-row-desc">{service.desc}</p>
                  {service.img && (
                    <img src={service.img} alt={service.title} className="stacked-row-img-preview" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Layout: Classic Staggered Grid */}
        {layout === 'staggeredGrid' && (
          <div className="services-grid">
            {data.list.map((service, index) => {
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
        )}

        {/* Section Bottom CTA */}
        <div className="services-footer">
          <p>Have a specialized layout or space requirement?</p>
          <a href="#contact" className="btn btn-primary">
            {data.cta || 'Request Custom Proposal'}
          </a>
        </div>
      </div>

      <style>{`
        .services-section {
          background-color: var(--color-bg-primary);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          margin-bottom: 5rem;
        }

        .service-card {
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

        .services-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          text-align: center;
          border-top: 1px solid var(--color-border);
          padding-top: 3rem;
          margin-top: 3rem;
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

