import React, { useState, useEffect } from 'react';

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a 
      href="https://wa.me/919876543210?text=Hi%2C%20I'd%20like%20to%20schedule%20a%20consultation%20with%20The%20Design%20Atelier."
      target="_blank"
      rel="noreferrer"
      className={`floating-whatsapp-btn ${visible ? 'wa-visible' : ''}`}
      aria-label="Contact us on WhatsApp"
    >
      <svg className="wa-btn-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.488 1.459 5.421 1.46h.005c5.543 0 10.05-4.506 10.054-10.05.002-2.686-1.033-5.212-2.918-7.099C17.324 1.58 14.8 1.54 12.01 1.54c-5.544 0-10.05 4.508-10.055 10.052-.001 1.94.506 3.829 1.472 5.434l-.979 3.57 3.65-.958zm10.995-7.466c-.3-.15-1.77-.874-2.045-.974-.275-.1-.475-.15-.675.15-.2.3-.775.974-.95 1.174-.175.2-.35.225-.65.075-1.04-.52-1.84-.95-2.58-2.22-.19-.33.19-.31.55-.99.06-.12.03-.225-.015-.325-.045-.1-.4-.967-.54-1.314-.14-.339-.3-.292-.41-.297-.103-.005-.224-.006-.345-.006-.12 0-.32.045-.49.225-.17.18-.65.637-.65 1.556 0 .92.67 1.808.76 1.93.09.125 1.32 2.017 3.206 2.83.447.193.797.31 1.07.397.45.142.86.122 1.18.075.36-.054 1.77-.723 2.02-1.385.25-.662.25-1.23.175-1.35-.075-.12-.275-.195-.575-.345z" fill="currentColor"/>
      </svg>
      
      <style>{`
        .floating-whatsapp-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 54px;
          height: 54px;
          background-color: var(--color-accent); /* Champagne Gold background */
          color: var(--color-text-heading);      /* Charcoal logo color */
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          z-index: 999;
          opacity: 0;
          transform: translateY(20px) scale(0.8);
          pointer-events: none;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), 
                      opacity 0.4s ease, 
                      background-color 0.3s ease, 
                      color 0.3s ease;
        }

        .wa-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .floating-whatsapp-btn:hover {
          transform: scale(1.08);
          background-color: var(--color-text-heading);
          color: var(--color-bg-primary);
        }

        .wa-btn-svg {
          width: 22px;
          height: 22px;
        }

        @media (max-width: 767px) {
          .floating-whatsapp-btn {
            bottom: 20px;
            right: 20px;
            width: 48px;
            height: 48px;
          }
          .wa-btn-svg {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </a>
  );
}
