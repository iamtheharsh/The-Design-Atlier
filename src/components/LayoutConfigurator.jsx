import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LayoutConfigurator({ 
  currentNiche, 
  setCurrentNiche, 
  layoutConfig, 
  setLayoutConfig 
}) {
  const [isOpen, setIsOpen] = useState(false);

  const niches = [
    { id: 'interior', name: 'Interior Design' },
    { id: 'architecture', name: 'Architecture' },
    { id: 'agency', name: 'Creative Agency' },
    { id: 'saas', name: 'SaaS Platform' }
  ];

  const controls = [
    {
      section: 'Hero Layout',
      key: 'hero',
      options: [
        { value: 'luxuryEditorial', label: 'Luxury Editorial' },
        { value: 'split', label: 'Split Screen' },
        { value: 'fullBleed', label: 'Full Bleed' },
        { value: 'asymmetric', label: 'Asymmetric' },
        { value: 'stacked', label: 'Stacked Grid' }
      ]
    },
    {
      section: 'Services Layout',
      key: 'services',
      options: [
        { value: 'staggeredGrid', label: 'Staggered Grid' },
        { value: 'bento', label: 'Bento Grid' },
        { value: 'stackedList', label: 'Stacked List' }
      ]
    },
    {
      section: 'Philosophy Layout',
      key: 'philosophy',
      options: [
        { value: 'sliding', label: 'Sliding Mask' },
        { value: 'editorial', label: 'Editorial Overlap' }
      ]
    },
    {
      section: 'Portfolio Layout',
      key: 'portfolio',
      options: [
        { value: 'parallaxGrid', label: 'Parallax Grid' },
        { value: 'masonry', label: 'Masonry Columns' },
        { value: 'bentoShowcase', label: 'Bento Showcase' }
      ]
    },
    {
      section: 'Process Layout',
      key: 'process',
      options: [
        { value: 'timeline', label: 'Scrub Timeline' },
        { value: 'transformation', label: 'Before & After' }
      ]
    },
    {
      section: 'Team Layout',
      key: 'team',
      options: [
        { value: 'grid', label: 'Portrait Grid' },
        { value: 'staggered', label: 'Staggered Depth' }
      ]
    },
    {
      section: 'Testimonials Layout',
      key: 'testimonials',
      options: [
        { value: 'fade', label: 'Slider Fade' },
        { value: 'depthStacked', label: 'Depth Stacked' }
      ]
    },
    {
      section: 'Footer Layout',
      key: 'footer',
      options: [
        { value: 'columns', label: 'Multi Column' },
        { value: 'minimal', label: 'Minimal Editorial' }
      ]
    }
  ];

  const handleConfigChange = (key, value) => {
    setLayoutConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        className={`config-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Design System Playground"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="config-gear-icon">
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor"/>
        </svg>
      </button>

      {/* Floating Glassmorphic Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 22, stiffness: 200 }}
            className="config-panel no-scrollbar"
          >
            <div className="config-header">
              <h3>Design System Playground</h3>
              <p>Configure layouts & use cases in real time</p>
            </div>

            {/* Niche Selection */}
            <div className="config-section">
              <span className="config-section-title">ACTIVE USE CASE (NICHE)</span>
              <div className="niche-selector-grid">
                {niches.map(niche => (
                  <button 
                    key={niche.id}
                    className={`niche-btn ${currentNiche === niche.id ? 'active' : ''}`}
                    onClick={() => setCurrentNiche(niche.id)}
                  >
                    {niche.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="config-divider"></div>

            {/* Layout Customizations */}
            <div className="config-section">
              <span className="config-section-title">SECTION LAYOUT VARIANTS</span>
              <div className="controls-list">
                {controls.map(control => (
                  <div key={control.key} className="control-item">
                    <span className="control-label">{control.section}</span>
                    <div className="options-row">
                      {control.options.map(opt => (
                        <button
                          key={opt.value}
                          className={`opt-btn ${layoutConfig[control.key] === opt.value ? 'active' : ''}`}
                          onClick={() => handleConfigChange(control.key, opt.value)}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="config-footer">
              <span>The Design Atelier • Responsive Framework</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .config-toggle-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: var(--color-text-heading);
          color: var(--color-bg-primary);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease;
        }

        .config-toggle-btn:hover {
          transform: scale(1.05) rotate(45deg);
          background-color: var(--color-accent);
          color: white;
        }

        .config-toggle-btn.active {
          transform: rotate(90deg);
          background-color: var(--color-accent);
          color: white;
        }

        .config-gear-icon {
          width: 26px;
          height: 26px;
        }

        .config-panel {
          position: fixed;
          bottom: 6.5rem;
          right: 2rem;
          width: 380px;
          max-height: 70vh;
          overflow-y: auto;
          background: rgba(37, 53, 69, 0.92); /* Deep Slate backdrop */
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
          z-index: 9999;
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .config-header h3 {
          font-family: var(--font-headings);
          font-size: 1.25rem;
          color: var(--color-bg-primary);
          margin: 0 0 0.25rem 0;
          font-weight: 300;
          letter-spacing: 0.02em;
        }

        .config-header p {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }

        .config-section {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .config-section-title {
          font-family: var(--font-body);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: var(--color-accent);
          text-transform: uppercase;
        }

        .niche-selector-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.65rem;
        }

        .niche-btn {
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.85);
          padding: 0.75rem 0.5rem;
          font-family: var(--font-body);
          font-size: 0.75rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .niche-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .niche-btn.active {
          background-color: var(--color-accent);
          border-color: var(--color-accent);
          color: white;
          font-weight: 500;
        }

        .config-divider {
          width: 100%;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.1);
        }

        .controls-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .control-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .control-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
        }

        .options-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .opt-btn {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.65);
          padding: 0.45rem 0.65rem;
          font-family: var(--font-body);
          font-size: 0.7rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .opt-btn:hover {
          background-color: rgba(255, 255, 255, 0.08);
          color: white;
        }

        .opt-btn.active {
          background-color: white;
          border-color: white;
          color: var(--color-text-heading);
          font-weight: 500;
        }

        .config-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 1rem;
          font-family: var(--font-body);
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.3);
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (max-width: 576px) {
          .config-panel {
            width: 85%;
            right: 7.5%;
            bottom: 6rem;
          }
          .config-toggle-btn {
            bottom: 1.5rem;
            right: 1.5rem;
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </>
  );
}
