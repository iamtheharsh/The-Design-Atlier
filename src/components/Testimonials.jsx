import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

export default function Testimonials({ data, layout }) {
  const containerRef = useRef(null);

  const defaultReviews = [
    {
      quote: "The Design Atelier turned our shell apartment into a refined, breathable Juhu sanctuary. Their attention to wood and stone textures, balanced by beautiful natural lighting, has made everyday living a peaceful experience.",
      author: "Aarav & Meera Shah",
      project: "Upper Penthouse Owners • Juhu, Mumbai"
    },
    {
      quote: "Their modular kitchen layouts are highly efficient, combining professional ergonomics with beautiful neutral finishes. They managed structural civil changes and custom cabinetry setup with absolute precision.",
      author: "Dr. Ritu Vaswani",
      project: "Duplex Apartment • Bandra West, Mumbai"
    },
    {
      quote: "Their 10-year warranty gave us structural confidence, but it was their meticulous carpentry team and material selection that blew us away. The Alibaug villa is our family's ultimate retreat.",
      author: "Vikram Malhotra",
      project: "Luxury Weekend Villa • Alibaug, Maharashtra"
    }
  ];

  const subtitle = data?.subtitle || "CLIENT REVIEWS";
  const title = data?.title || "Living in Their Vision";
  const list = data?.list || defaultReviews;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when data or layout changes to avoid out-of-bounds index issues
  useEffect(() => {
    setCurrentIndex(0);
  }, [data, layout]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (layout === 'depthStacked') {
        // Title reveal
        gsap.fromTo([".depth-title-wrapper .subtitle", ".depth-title-wrapper h2"],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: ".depth-title-wrapper",
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );

        // Stacked container reveal
        gsap.fromTo(".depth-stacked-container, .depth-stacked-nav-buttons",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: ".depth-stacked-container",
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
      } else {
        // Left side titles reveal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".testimonials-left",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });

        tl.fromTo([".testimonials-left .subtitle", ".testimonials-left h2", ".quote-mark-large", ".carousel-controls"],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.15 }
        );

        // Right side wrapper reveal
        gsap.fromTo(".testimonials-right",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".testimonials-right",
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [layout, data]);

  const getCardStyle = (index) => {
    const listLength = list.length;
    let diff = index - currentIndex;
    if (diff < 0) diff += listLength;

    if (diff === 0) {
      return {
        transform: 'translateY(0px) scale(1)',
        zIndex: 10,
        opacity: 1,
        pointerEvents: 'auto',
      };
    } else if (diff === 1) {
      return {
        transform: 'translateY(20px) scale(0.95)',
        zIndex: 9,
        opacity: 0.8,
        pointerEvents: 'none',
      };
    } else if (diff === 2) {
      return {
        transform: 'translateY(40px) scale(0.90)',
        zIndex: 8,
        opacity: 0.6,
        pointerEvents: 'none',
      };
    } else {
      return {
        transform: 'translateY(60px) scale(0.85)',
        zIndex: 7,
        opacity: 0,
        pointerEvents: 'none',
      };
    }
  };

  return (
    <section 
      id="testimonials" 
      ref={containerRef} 
      className="testimonials-section section"
    >
      <div className="container">
        {layout === 'depthStacked' ? (
          /* Layout: Depth Stacked Card Deck */
          <div className="depth-stacked-wrapper">
            <div className="depth-title-wrapper" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="subtitle">{subtitle}</span>
              <h2 style={{ marginTop: '0.5rem' }}>{title}</h2>
            </div>

            <div className="depth-stacked-container">
              {list.map((item, index) => {
                const cardStyle = getCardStyle(index);
                return (
                  <div
                    key={index}
                    className="depth-stacked-card"
                    style={cardStyle}
                  >
                    <div className="quote-mark-large" style={{ fontSize: '6rem', marginTop: '0', height: '40px', display: 'flex', alignItems: 'center' }}>“</div>
                    <p className="depth-stacked-quote">
                      "{item.quote}"
                    </p>
                    <div className="depth-stacked-author-row">
                      <span className="depth-stacked-author">
                        {item.author || item.name}
                      </span>
                      <span className="depth-stacked-project">
                        {item.project || `${item.designation || ''}${item.location ? ' • ' + item.location : ''}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="depth-stacked-nav-buttons">
              <button onClick={prevTestimonial} className="depth-nav-btn" aria-label="Previous Testimonial">
                &larr;
              </button>
              <span className="carousel-indicator" style={{ display: 'flex', alignItems: 'center', margin: '0 0.5rem' }}>
                {currentIndex + 1} / {list.length}
              </span>
              <button onClick={nextTestimonial} className="depth-nav-btn" aria-label="Next Testimonial">
                &rarr;
              </button>
            </div>
          </div>
        ) : (
          /* Layout: Classic Fade Slider */
          <div className="testimonials-grid">
            {/* Left Column: Title & Quote Icon */}
            <div className="testimonials-left">
              <span className="subtitle">{subtitle}</span>
              <h2>{title}</h2>
              
              {/* Elegant large quote icon */}
              <div className="quote-mark-large">“</div>
              
              {/* Carousel Buttons */}
              <div className="carousel-controls">
                <button onClick={prevTestimonial} className="carousel-btn" aria-label="Previous Testimonial">
                  &larr;
                </button>
                <span className="carousel-indicator">
                  {currentIndex + 1} / {list.length}
                </span>
                <button onClick={nextTestimonial} className="carousel-btn" aria-label="Next Testimonial">
                  &rarr;
                </button>
              </div>
            </div>

            {/* Right Column: Sliding Active Review via Framer Motion */}
            <div className="testimonials-right">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentIndex} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                  className="quote-display-card"
                >
                  <p className="quote-text">
                    "{list[currentIndex].quote}"
                  </p>
                  
                  <div className="quote-author-info">
                    <span className="author-name">
                      {list[currentIndex].author || list[currentIndex].name}
                    </span>
                    <span className="author-details">
                      {list[currentIndex].project || `${list[currentIndex].designation || ''}${list[currentIndex].location ? ' • ' + list[currentIndex].location : ''}`}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .testimonials-section {
          background-color: var(--color-bg-secondary);
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: 40% 60%;
          gap: 4rem;
          align-items: center;
        }

        .testimonials-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.5rem;
        }

        .quote-mark-large {
          font-family: var(--font-headings);
          font-size: 8rem;
          line-height: 0.5;
          color: var(--color-accent);
          margin-top: 1rem;
          user-select: none;
        }

        /* Controls */
        .carousel-controls {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .carousel-btn {
          background: none;
          border: 1px solid var(--color-text-heading);
          color: var(--color-text-heading);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          transition: var(--transition-fast);
        }

        .carousel-btn:hover {
          background-color: var(--color-text-heading);
          color: var(--color-bg-primary);
        }

        .carousel-indicator {
          font-family: var(--font-body);
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          color: var(--color-text-body);
        }

        /* Display Card */
        .testimonials-right {
          background-color: var(--color-bg-primary);
          border: 1px solid var(--color-border);
          padding: 4.5rem;
          min-height: 380px;
          display: flex;
          align-items: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
          overflow: hidden;
        }

        .quote-display-card {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          width: 100%;
        }

        .quote-text {
          font-family: var(--font-headings);
          font-size: 1.8rem;
          line-height: 1.6;
          color: var(--color-text-heading);
          font-style: italic;
          font-weight: 300;
        }

        .quote-author-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          border-left: 2px solid var(--color-accent);
          padding-left: 1.5rem;
        }

        .author-name {
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 1rem;
          color: var(--color-text-heading);
        }

        .author-details {
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: var(--color-text-body);
        }

        @media (max-width: 991px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .testimonials-right {
            padding: 3rem;
            min-height: auto;
          }

          .quote-text {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}

