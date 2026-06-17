import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'About Us', href: '#founder' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">
        {/* Brand Logo - Horizontal SVG for header */}
        <a href="#home" className="nav-logo">
          <img src="/brand_assets/logo_secondary.svg" alt="The Design Atelier" />
        </a>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="nav-link">
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Right CTA Group */}
        <div className="nav-cta-group">
          <a href="#contact" className="btn-nav">
            Book Consultation
          </a>
        </div>

        {/* Mobile Hamburger Toggle via Framer Motion */}
        <button 
          className="nav-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation"
        >
          <motion.span 
            className="hamburger-line"
            animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span 
            className="hamburger-line"
            animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>

        {/* Mobile Drawer Overlay via Framer Motion */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="nav-drawer"
            >
              <ul className="drawer-links">
                {navLinks.map((link, i) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                  >
                    <a 
                      href={link.href} 
                      className="drawer-link" 
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + navLinks.length * 0.05, duration: 0.5 }}
                >
                  <a 
                    href="#contact" 
                    className="btn btn-primary" 
                    style={{ width: '100%', marginTop: '2rem' }}
                    onClick={() => setIsOpen(false)}
                  >
                    Book Consultation
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 90px;
          z-index: 1000;
          background-color: transparent;
          border-bottom: 1px solid transparent;
          transition: var(--transition-smooth);
        }

        .navbar-scrolled {
          height: 80px;
          background-color: rgba(255, 255, 255, 0.95); /* Adjusted to new White Background */
          backdrop-filter: blur(10px);
          border-bottom-color: var(--color-border);
        }

        .nav-container {
          max-width: var(--max-width-content);
          height: 100%;
          margin: 0 auto;
          padding: 0 4%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          height: 100%;
        }

        .nav-logo img {
          height: 48px;
          width: auto;
          object-fit: contain;
          transition: var(--transition-smooth);
        }

        .navbar-scrolled .nav-logo img {
          height: 42px;
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 2.25rem;
        }

        .nav-link {
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-heading);
          position: relative;
          padding: 0.5rem 0;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--color-accent);
          transition: var(--transition-fast);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-cta-group {
          display: flex;
          align-items: center;
        }

        .btn-nav {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1.75rem;
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text-heading);
          border: 1px solid var(--color-text-heading);
          background-color: transparent;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .btn-nav:hover {
          background-color: var(--color-text-heading);
          color: var(--color-bg-primary);
        }

        .nav-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          width: 30px;
          height: 20px;
          position: relative;
          justify-content: space-between;
          flex-direction: column;
          z-index: 1001;
        }

        .hamburger-line {
          display: block;
          height: 2px;
          width: 100%;
          background-color: var(--color-text-heading);
        }

        .nav-drawer {
          position: fixed;
          top: 0;
          right: 0; /* Aligned to right edge, Framer motion animates x translation */
          width: 80%;
          max-width: 400px;
          height: 100vh;
          background-color: var(--color-bg-primary);
          box-shadow: -10px 0 30px rgba(0,0,0,0.05);
          z-index: 999;
          display: flex;
          flex-direction: column;
          padding: 120px 40px 40px;
        }

        .drawer-links {
          display: flex;
          flex-direction: column;
          list-style: none;
          gap: 2rem;
        }

        .drawer-link {
          font-family: var(--font-headings);
          font-size: 1.8rem;
          color: var(--color-text-heading);
          font-weight: 300;
        }

        @media (max-width: 991px) {
          .nav-links, .nav-cta-group {
            display: none;
          }

          .nav-toggle {
            display: flex;
          }

          .navbar {
            height: 75px;
            background-color: rgba(255, 255, 255, 0.95); /* Adjusted to new White Background */
            backdrop-filter: blur(10px);
            border-bottom-color: var(--color-border);
          }

          .nav-logo img {
            height: 38px;
          }
        }
      `}</style>
    </nav>
  );
}
