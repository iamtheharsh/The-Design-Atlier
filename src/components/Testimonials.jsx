import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

export default function Testimonials() {
  const containerRef = useRef(null);

  const reviews = [
    {
      quote: "The Design Atelier turned our shell apartment into a refined, breathable Juhu sanctuary. Their attention to wood and stone textures, balanced by beautiful natural lighting, has made everyday living a peaceful experience.",
      name: "Aarav & Meera Shah",
      location: "Juhu, Mumbai",
      designation: "Upper Penthouse Owners"
    },
    {
      quote: "Their modular kitchen layouts are highly efficient, combining professional ergonomics with beautiful neutral finishes. They managed structural civil changes and custom cabinetry setup with absolute precision.",
      name: "Dr. Ritu Vaswani",
      location: "Bandra West, Mumbai",
      designation: "Duplex Apartment"
    },
    {
      quote: "Their 10-year warranty gave us structural confidence, but it was their meticulous carpentry team and material selection that blew us away. The Alibaug villa is our family's ultimate retreat.",
      name: "Vikram Malhotra",
      location: "Alibaug, Maharashtra",
      designation: "Luxury Weekend Villa"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="testimonials" 
      ref={containerRef} 
      className="testimonials-section section"
    >
      <div className="container">
        <div className="testimonials-grid">
          {/* Left Column: Title & Quote Icon */}
          <div className="testimonials-left">
            <span className="subtitle">CLIENT REVIEWS</span>
            <h2>Living in Their Vision</h2>
            
            {/* Elegant large quote icon */}
            <div className="quote-mark-large">“</div>
            
            {/* Carousel Buttons */}
            <div className="carousel-controls">
              <button onClick={prevTestimonial} className="carousel-btn" aria-label="Previous Testimonial">
                &larr;
              </button>
              <span className="carousel-indicator">
                {currentIndex + 1} / {reviews.length}
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
                  "{reviews[currentIndex].quote}"
                </p>
                
                <div className="quote-author-info">
                  <span className="author-name">{reviews[currentIndex].name}</span>
                  <span className="author-details">
                    {reviews[currentIndex].designation} &bull; {reviews[currentIndex].location}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
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

