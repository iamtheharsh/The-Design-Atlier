import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function WhyUs() {
  const containerRef = useRef(null);
  const projectsRef = useRef(null);
  const yearsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance timeline for left column
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo([".subtitle", ".why-us-title", ".why-us-intro", ".why-us-counters-block", ".why-us-image-wrapper"],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.15 }
      );

      // Counters animation using GSAP tween mapping to elements
      const countObj = { projects: 0, years: 0 };
      
      gsap.to(countObj, {
        projects: 200,
        years: 15,
        duration: 2.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".why-us-counters-block",
          start: "top 85%",
          toggleActions: "play none none none"
        },
        onUpdate: () => {
          if (projectsRef.current) projectsRef.current.innerText = Math.floor(countObj.projects) + "+";
          if (yearsRef.current) yearsRef.current.innerText = Math.floor(countObj.years) + "+";
        }
      });

      // 2. Right column trust cards reveal stagger
      gsap.fromTo(".trust-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".trust-cards-list",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const points = [
    {
      num: '01',
      title: 'Meticulous Craftsmanship',
      desc: 'We curate premium materials from global suppliers—including Italian marble, European oak, and bespoke metal elements—paired with custom joinery that is built to stand the test of time.'
    },
    {
      num: '02',
      title: 'End-to-End Execution',
      desc: 'Our Mumbai-based team manages all aspects of construction, procurement, furniture sourcing, and site supervision, ensuring a hassle-free, turnkey transformation from design to key handover.'
    },
    {
      num: '03',
      title: 'Unrivaled Warranty & Support',
      desc: 'Every space we create is backed by a 10-year warranty, alongside lifetime client-care services, guaranteeing your sanctuary remains as pristine as the day we delivered it.'
    }
  ];

  return (
    <section ref={containerRef} id="why-us" className="why-us-section section">
      <div className="container">
        <div className="why-us-grid">
          {/* Left Column - Headline & Detail Image */}
          <div className="why-us-left">
            <span className="subtitle">THE VALUE WE BRING</span>
            <h2 className="why-us-title">The Principles of Quiet Luxury</h2>
            <p className="why-us-intro">
              We design homes around the stories, personalities, and practical behaviors of their owners. Our work is defined by warm minimalism, spatial alignment, and execution precision.
            </p>

            {/* Dynamic Counters block */}
            <div className="why-us-counters-block">
              <div className="counter-item">
                <span ref={projectsRef} className="counter-num">0+</span>
                <span className="counter-label">Projects Completed</span>
              </div>
              <div className="counter-item">
                <span ref={yearsRef} className="counter-num">0+</span>
                <span className="counter-label">Years of Experience</span>
              </div>
            </div>

            <div className="why-us-image-wrapper">
              <img 
                src="/images/minimalist_detail.jpg" 
                alt="Minimal luxury interior architectural details" 
                className="why-us-img"
              />
            </div>
          </div>

          {/* Right Column - Trust Cards */}
          <div className="why-us-right">
            <div className="trust-cards-list">
              {points.map((point, i) => (
                <div key={i} className="trust-card">
                  <div className="trust-card-num-row">
                    <span className="trust-num">{point.num}</span>
                    <h3 className="trust-title">{point.title}</h3>
                  </div>
                  <p className="trust-desc">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .why-us-section {
          background-color: var(--color-bg-primary);
        }

        .why-us-grid {
          display: grid;
          grid-template-columns: 45% 55%;
          gap: 8%;
          align-items: flex-start;
        }

        .why-us-left {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .why-us-title {
          margin: 0;
        }

        .why-us-intro {
          margin-bottom: 0.5rem;
        }

        /* Counters block */
        .why-us-counters-block {
          display: flex;
          gap: 3rem;
          margin-bottom: 1rem;
        }

        .counter-item {
          display: flex;
          flex-direction: column;
        }

        .counter-num {
          font-family: var(--font-headings);
          font-size: 3rem;
          color: var(--color-accent);
          line-height: 1;
          font-weight: 300;
        }

        .counter-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-body);
          margin-top: 0.25rem;
        }

        .why-us-image-wrapper {
          width: 100%;
          height: 380px;
          overflow: hidden;
          position: relative;
        }

        .why-us-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-smooth);
        }

        .why-us-image-wrapper:hover .why-us-img {
          transform: scale(1.05);
        }

        /* Trust Cards Column */
        .why-us-right {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: center;
        }

        .trust-cards-list {
          display: flex;
          flex-direction: column;
        }

        .trust-card {
          padding: 2.25rem 0;
          border-bottom: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          transition: var(--transition-smooth);
        }

        .trust-card:first-child {
          padding-top: 0;
        }

        .trust-card:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .trust-card-num-row {
          display: flex;
          align-items: baseline;
          gap: 1.5rem;
        }

        .trust-num {
          font-family: var(--font-headings);
          font-size: 1.5rem;
          color: var(--color-accent);
          font-weight: 300;
        }

        .trust-title {
          color: var(--color-text-heading);
          font-weight: 400;
        }

        .trust-desc {
          font-size: 0.95rem;
          line-height: 1.8;
          color: var(--color-text-body);
          padding-left: 3.25rem;
        }

        @media (max-width: 991px) {
          .why-us-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .why-us-image-wrapper {
            height: 300px;
          }

          .trust-card {
            padding: 2rem 0;
          }

          .trust-desc {
            padding-left: 0;
          }
        }
      `}</style>
    </section>
  );
}

