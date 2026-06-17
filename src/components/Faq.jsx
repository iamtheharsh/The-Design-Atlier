import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

export default function Faq() {
  const containerRef = useRef(null);

  const faqs = [
    {
      q: "How much does a project typically cost?",
      a: "Our luxury design projects start with a minimum budget of ₹25 Lakhs for custom apartments, villas, and full-home renovations. Kitchen transformations start at ₹8 Lakhs. The final budget depends entirely on spatial scale, choice of marble, wood grades, and custom fittings selected."
    },
    {
      q: "How long does a project take from discovery to handover?",
      a: "A standard 2-3 BHK luxury apartment takes approximately 12 to 16 weeks to execute once the design drafts are finalized. Large villa projects can take anywhere between 6 to 9 months depending on architectural scale."
    },
    {
      q: "Do you handle complete construction and site execution?",
      a: "Yes. We offer fully integrated end-to-end design and build execution. We employ our own trusted structural engineers, site supervisors, and custom carpentary teams, managing the entire project so you do not have to coordinate with multiple vendors."
    },
    {
      q: "Can I customize the design modules and furniture selections?",
      a: "Absolutely. Everything we design is bespoke. We do not use standard off-the-shelf catalog templates. Every wardrobe module, console table, kitchen unit, and custom lighting fixture is custom-drafted and manufactured to match your space."
    },
    {
      q: "Which geographical locations do you serve?",
      a: "We currently serve clients across all suburbs of Mumbai—including South Mumbai, Bandra, Juhu, Santacruz, Khar, and Worli—as well as select villa projects in Alibaug and Lonavala."
    },
    {
      q: "What warranty coverage is included in the project?",
      a: "We provide a comprehensive 10-year structural warranty on all custom millwork, carpentry, and kitchen carcasses manufactured by our team. Additionally, standard brand warranties apply to all integrated appliances and hardware fittings."
    }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left side titles reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".faq-left",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo([".faq-left .subtitle", ".faq-left h2", ".faq-intro", ".faq-left .btn"],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.15 }
      );

      // Right side accordion list items reveal
      gsap.fromTo(".accordion-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".accordion-list",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="faq" 
      ref={containerRef} 
      className="faq-section section"
    >
      <div className="container">
        <div className="faq-grid">
          {/* Left Column: Context */}
          <div className="faq-left">
            <div className="section-title-wrapper">
              <span className="subtitle">CLEAR ANSWERS</span>
              <h2>Common Questions</h2>
            </div>
            <p className="faq-intro">
              We believe in complete transparency of timelines, execution workflows, and budgets. If you have an inquiry not covered here, feel free to reach out to us.
            </p>
            <a 
              href="#contact" 
              className="btn btn-secondary" 
              style={{ alignSelf: 'flex-start', marginTop: '1.5rem' }}
            >
              Ask a Custom Question
            </a>
          </div>

          {/* Right Column: Accordion list */}
          <div className="faq-right">
            <div className="accordion-list">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div 
                    key={index} 
                    className="accordion-item"
                  >
                    <button 
                      className="accordion-trigger" 
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      <span className="accordion-question">{faq.q}</span>
                      <motion.span 
                        className="accordion-icon"
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                        style={{ color: isOpen ? 'var(--color-accent)' : 'inherit' }}
                      >
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { height: "auto", opacity: 1 },
                            collapsed: { height: 0, opacity: 0 }
                          }}
                          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                          className="accordion-panel"
                        >
                          <p className="accordion-answer">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .faq-section {
          background-color: var(--color-bg-primary);
        }

        .faq-grid {
          display: grid;
          grid-template-columns: 40% 60%;
          gap: 6rem;
          align-items: flex-start;
        }

        .faq-left {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: sticky;
          top: 120px;
        }

        .faq-intro {
          max-width: 380px;
        }

        /* Accordion Stack */
        .accordion-list {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .accordion-item {
          border-bottom: 1px solid var(--color-border);
        }

        .accordion-item:first-child {
          border-top: 1px solid var(--color-border);
        }

        .accordion-trigger {
          width: 100%;
          background: none;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 0;
          cursor: pointer;
          text-align: left;
        }

        .accordion-question {
          font-family: var(--font-body);
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--color-text-heading);
          transition: var(--transition-fast);
          padding-right: 2rem;
        }

        .accordion-trigger:hover .accordion-question {
          color: var(--color-accent);
        }

        .accordion-icon {
          font-family: var(--font-headings);
          font-size: 1.5rem;
          width: 20px;
          text-align: center;
        }

        .accordion-panel {
          overflow: hidden;
        }

        .accordion-answer {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--color-text-body);
          line-height: 1.8;
          padding-bottom: 2rem;
        }

        @media (max-width: 991px) {
          .faq-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .faq-left {
            position: static;
          }
        }
      `}</style>
    </section>
  );
}

