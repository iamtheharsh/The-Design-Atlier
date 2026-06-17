import React from 'react';

export default function Footer() {
  const links = [
    { name: 'Home', href: '#home' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        {/* Top Section */}
        <div className="footer-top">
          {/* Logo column */}
          <div className="footer-logo-col">
            <img src="/brand_assets/logo_primary.svg" alt="The Design Atelier Logo" className="footer-logo" />
            <p className="footer-tagline">Designing spaces that feel like home.</p>
          </div>

          {/* Links Column */}
          <div className="footer-links-col">
            <span className="footer-title">STUDIO</span>
            <ul className="footer-links-list">
              {links.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Suburbs Served Column */}
          <div className="footer-suburbs-col">
            <span className="footer-title">AREAS SERVED</span>
            <ul className="footer-suburbs-list">
              <li>South Mumbai</li>
              <li>Bandra West</li>
              <li>Juhu</li>
              <li>Worli Sea Face</li>
              <li>Lower Parel</li>
              <li>Alibaug Villas</li>
            </ul>
          </div>

          {/* Contact details column */}
          <div className="footer-contact-col">
            <span className="footer-title">CONTACT</span>
            <div className="footer-contact-info">
              <a href="tel:+919876543210" className="footer-contact-link">+91 98765 43210</a>
              <a href="mailto:design@theatelier.com" className="footer-contact-link">design@theatelier.com</a>
              <p className="footer-address">
                Level 5, Juhu Horizon, Juhu Tara Road, Mumbai 400049
              </p>
            </div>
            
            {/* Social media links */}
            <div className="footer-social-links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-link">Instagram</a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="footer-social-link">Pinterest</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-link">Facebook</a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} The Design Atelier. All rights reserved.
          </p>
          <p className="designer-credit">
            Quiet Luxury, Warm Minimalism.
          </p>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: var(--color-bg-primary);
          padding: 6rem 0 3rem;
          border-top: 1px solid var(--color-border);
        }

        .footer-top {
          display: grid;
          grid-template-columns: 30% 15% 20% 35%;
          gap: 4rem;
          margin-bottom: 5rem;
        }

        .footer-logo-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .footer-logo {
          width: 140px;
          height: auto;
          align-self: flex-start;
        }

        .footer-tagline {
          font-family: var(--font-headings);
          font-size: 1.15rem;
          font-style: italic;
          color: var(--color-text-body);
        }

        /* Lists */
        .footer-title {
          font-family: var(--font-body);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--color-accent);
          font-weight: 500;
          display: block;
          margin-bottom: 1.5rem;
        }

        .footer-links-list, .footer-suburbs-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-link {
          font-size: 0.9rem;
          color: var(--color-text-body);
        }

        .footer-link:hover {
          color: var(--color-accent);
          padding-left: 4px;
        }

        .footer-suburbs-list li {
          font-size: 0.9rem;
          color: var(--color-text-body);
        }

        .footer-contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .footer-contact-link {
          font-size: 1rem;
          color: var(--color-text-heading);
          font-weight: 500;
        }

        .footer-contact-link:hover {
          color: var(--color-accent);
        }

        .footer-address {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--color-text-body);
        }

        .footer-social-links {
          display: flex;
          gap: 1.25rem;
        }

        .footer-social-link {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-body);
          font-weight: 500;
          border-bottom: 1px solid transparent;
        }

        .footer-social-link:hover {
          color: var(--color-accent);
          border-bottom-color: var(--color-accent);
        }

        /* Bottom Row */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid var(--color-border);
          padding-top: 2.5rem;
          font-size: 0.8rem;
          color: var(--color-text-body);
        }

        @media (max-width: 991px) {
          .footer-top {
            grid-template-columns: repeat(2, 1fr);
            gap: 3rem;
          }
        }

        @media (max-width: 767px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
