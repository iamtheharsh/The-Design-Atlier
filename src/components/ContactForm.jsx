import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ContactForm() {
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Full Home Interiors',
    budgetRange: '40L - 70L',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Consultation Form Payload:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        projectType: 'Full Home Interiors',
        budgetRange: '40L - 70L',
        message: ''
      });
    }, 4000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left side reveals
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".contact-left",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo([".contact-left .subtitle", ".contact-left h2", ".contact-intro"],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.15 }
      );

      tl.fromTo(".contact-info-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", stagger: 0.1 },
        "-=0.6"
      );

      tl.fromTo(".instant-contact-buttons .btn",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", stagger: 0.1 },
        "-=0.4"
      );

      // Right side card reveal
      gsap.fromTo(".form-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-right",
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
      id="contact" 
      ref={containerRef} 
      className="contact-section section section-dark"
    >
      <div className="container">
        <div className="contact-grid">
          {/* Left Column: Direct Contact Details */}
          <div className="contact-left">
            <span className="subtitle reveal-fade-up">GET IN TOUCH</span>
            
            {/* Headline with elegant text-mask reveal */}
            <h2 className="reveal-fade-up delay-100">
              Let's Create Something Exceptional
            </h2>
            
            <p className="contact-intro reveal-fade-up delay-200">
              Begin your design journey with a personalized consultation. Share your ideas and project constraints with our studio coordinator.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item reveal-fade-up delay-300">
                <span className="contact-info-label">Call or WhatsApp Us</span>
                <a href="tel:+919876543210" className="contact-info-value">+91 98765 43210</a>
              </div>
              <div className="contact-info-item reveal-fade-up delay-400">
                <span className="contact-info-label">Send an Email</span>
                <a href="mailto:design@theatelier.com" className="contact-info-value">design@theatelier.com</a>
              </div>
              <div className="contact-info-item reveal-fade-up delay-500">
                <span className="contact-info-label">Mumbai Studio</span>
                <span className="contact-info-value">
                  The Design Atelier, Level 5, Block B, Juhu Horizon, Juhu Tara Road, Mumbai 400049
                </span>
              </div>
            </div>

            {/* Instant Messaging Buttons */}
            <div className="instant-contact-buttons reveal-fade-up delay-600">
              <a 
                href="https://wa.me/919876543210?text=Hi%2C%20I'd%20like%20to%20inquire%20about%20interior%20design%20services." 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-accent-whatsapp"
              >
                <svg className="whatsapp-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.488 1.459 5.421 1.46h.005c5.543 0 10.05-4.506 10.054-10.05.002-2.686-1.033-5.212-2.918-7.099C17.324 1.58 14.8 1.54 12.01 1.54c-5.544 0-10.05 4.508-10.055 10.052-.001 1.94.506 3.829 1.472 5.434l-.979 3.57 3.65-.958zm10.995-7.466c-.3-.15-1.77-.874-2.045-.974-.275-.1-.475-.15-.675.15-.2.3-.775.974-.95 1.174-.175.2-.35.225-.65.075-1.04-.52-1.84-.95-2.58-2.22-.19-.33.19-.31.55-.99.06-.12.03-.225-.015-.325-.045-.1-.4-.967-.54-1.314-.14-.339-.3-.292-.41-.297-.103-.005-.224-.006-.345-.006-.12 0-.32.045-.49.225-.17.18-.65.637-.65 1.556 0 .92.67 1.808.76 1.93.09.125 1.32 2.017 3.206 2.83.447.193.797.31 1.07.397.45.142.86.122 1.18.075.36-.054 1.77-.723 2.02-1.385.25-.662.25-1.23.175-1.35-.075-.12-.275-.195-.575-.345z" fill="currentColor"/>
                </svg>
                Chat on WhatsApp
              </a>
              <a href="tel:+919876543210" className="btn btn-secondary">
                Direct Call
              </a>
            </div>
          </div>

          {/* Right Column: Lead Form Card */}
          <div className="contact-right">
            <div className="form-card reveal-fade-up delay-300">
              {submitted ? (
                <div className="form-success-state animate-fade-in">
                  <div className="success-brand-mark">
                    <img src="/brand_assets/brand_mark.svg" alt="Brand Accent" />
                  </div>
                  <h3>Thank You</h3>
                  <p>Your design request has been logged. Our studio coordinator will contact you shortly to schedule your portfolio walkthrough.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="enquiry-form">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Meera Shah" 
                      className="form-input" 
                      required 
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765" 
                        className="form-input" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. meera@domain.com" 
                        className="form-input" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="projectType" className="form-label">Project Type</label>
                    <select 
                      id="projectType" 
                      name="projectType" 
                      value={formData.projectType}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Full Home Interiors">Full Home Interiors</option>
                      <option value="Modular Kitchens">Modular Kitchens</option>
                      <option value="Living Room Design">Living Room Design</option>
                      <option value="Master Bedroom Suites">Master Bedroom Suites</option>
                      <option value="Luxury Renovation">Luxury Renovation</option>
                      <option value="Design Consultation">Design Consultation</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="budgetRange" className="form-label">Estimated Budget Range</label>
                    <select 
                      id="budgetRange" 
                      name="budgetRange" 
                      value={formData.budgetRange}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="20L - 40L">₹20 Lakhs - ₹40 Lakhs</option>
                      <option value="40L - 70L">₹40 Lakhs - ₹70 Lakhs</option>
                      <option value="70L - 1Cr">₹70 Lakhs - ₹1 Crore</option>
                      <option value="1Cr+">₹1 Crore +</option>
                    </select>
                  </div>

                  {/* Added Message area */}
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Project Details & Ideas</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share details about your layout and preferences..." 
                      className="form-input" 
                    />
                  </div>

                  <button type="submit" className="btn btn-primary form-submit-btn">
                    Request Design Consultation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background-color: var(--color-text-heading);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 45% 55%;
          gap: 6%;
          align-items: center;
        }

        .contact-left {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .contact-intro {
          color: var(--color-border);
        }

        /* Contact Details */
        .contact-info-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin: 1.5rem 0;
          border-top: 1px solid rgba(216, 208, 196, 0.15);
          padding-top: 1.5rem;
        }

        .contact-info-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .contact-info-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-accent);
          font-weight: 500;
        }

        .contact-info-value {
          font-family: var(--font-headings);
          font-size: 1.35rem;
          color: var(--color-bg-primary);
          font-weight: 300;
        }

        a.contact-info-value:hover {
          color: var(--color-accent);
        }

        /* WhatsApp Button styling */
        .instant-contact-buttons {
          display: flex;
          gap: 1rem;
        }

        .btn-accent-whatsapp {
          background-color: #25D366;
          color: white;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.1rem 2rem;
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .btn-accent-whatsapp:hover {
          background-color: #128C7E;
          transform: translateY(-2px);
        }

        .whatsapp-svg {
          width: 18px;
          height: 18px;
        }

        /* Dark Modern Form Card */
        .form-card {
          background-color: #1C2A38;
          border: 1px solid rgba(216, 208, 196, 0.1);
          padding: 4rem;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
          position: relative;
          min-height: 480px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .enquiry-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .form-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-border);
          font-weight: 500;
        }

        .form-input, .form-select {
          background-color: transparent;
          border: none;
          border-bottom: 1px solid rgba(216, 208, 196, 0.2);
          padding: 0.8rem 0;
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--color-bg-primary);
          font-weight: 300;
          transition: var(--transition-fast);
          width: 100%;
        }

        textarea.form-input {
          resize: none;
        }

        .form-input:focus, .form-select:focus {
          outline: none;
          border-bottom-color: var(--color-accent);
        }

        .form-select option {
          background-color: #1C2A38;
          color: var(--color-bg-primary);
        }

        .form-submit-btn {
          width: 100%;
          margin-top: 1rem;
        }

        /* Success State */
        .form-success-state {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .success-brand-mark {
          width: 80px;
          height: auto;
        }

        .success-brand-mark img {
          width: 100%;
          height: auto;
        }

        @media (max-width: 991px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .form-card {
            padding: 2.5rem;
          }
        }

        @media (max-width: 767px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .instant-contact-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}

