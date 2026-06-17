import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Detect mobile/touch device
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouchDevice) return;

    // Quick setters for translation properties (maps to transform: translate3d)
    const setDotX = gsap.quickSetter(dotRef.current, "x", "px");
    const setDotY = gsap.quickSetter(dotRef.current, "y", "px");
    const setRingX = gsap.quickSetter(ringRef.current, "x", "px");
    const setRingY = gsap.quickSetter(ringRef.current, "y", "px");

    const mouse = { x: 0, y: 0 };
    const trail = { x: 0, y: 0 };

    let isVisible = false;

    const handleMouseMove = (e) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to([dotRef.current, ringRef.current], { opacity: (i) => i === 0 ? 1 : 0.35, duration: 0.3 });
      }

      mouse.x = e.clientX;
      mouse.y = e.clientY;

      setDotX(mouse.x);
      setDotY(mouse.y);
    };

    const handleMouseLeave = () => {
      isVisible = false;
      gsap.to([dotRef.current, ringRef.current], { opacity: 0, duration: 0.3 });
    };

    // Smooth LERP (Linear Interpolation) tracking loop run via GSAP ticker
    const tick = () => {
      trail.x += (mouse.x - trail.x) * 0.15;
      trail.y += (mouse.y - trail.y) * 0.15;
      
      setRingX(trail.x);
      setRingY(trail.y);
    };

    gsap.ticker.add(tick);

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.filter-tab') ||
        target.closest('.accordion-trigger') ||
        target.classList.contains('portfolio-card') ||
        target.closest('.portfolio-card') ||
        target.closest('.carousel-btn');

      if (isInteractive) {
        dotRef.current?.classList.add('cursor-hovered');
        ringRef.current?.classList.add('ring-hovered');
      } else {
        dotRef.current?.classList.remove('cursor-hovered');
        ringRef.current?.classList.remove('ring-hovered');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Return empty fragment if pointer support doesn't match
  const isTouch = typeof window !== 'undefined' && (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
  if (isTouch) return null;

  return (
    <>
      {/* Inner Dot Cursor */}
      <div ref={dotRef} className="custom-cursor-dot" />
      {/* Outer Trailing Circle */}
      <div ref={ringRef} className="custom-cursor-ring" />

      <style>{`
        .custom-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          margin-top: -4px;
          margin-left: -4px;
          border-radius: 50%;
          background-color: var(--color-accent); /* Gold Dot */
          z-index: 9999;
          pointer-events: none;
          opacity: 0;
          will-change: transform;
          transition: width 0.3s cubic-bezier(0.25, 1, 0.5, 1), 
                      height 0.3s cubic-bezier(0.25, 1, 0.5, 1), 
                      background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .custom-cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 32px;
          height: 32px;
          margin-top: -16px;
          margin-left: -16px;
          border-radius: 50%;
          border: 1px solid var(--color-text-heading);
          opacity: 0;
          z-index: 9998;
          pointer-events: none;
          will-change: transform;
          transition: width 0.3s cubic-bezier(0.25, 1, 0.5, 1), 
                      height 0.3s cubic-bezier(0.25, 1, 0.5, 1), 
                      border-color 0.3s cubic-bezier(0.25, 1, 0.5, 1),
                      opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* Hover Expansion Visuals */
        .cursor-hovered {
          width: 4px;
          height: 4px;
          margin-top: -2px;
          margin-left: -2px;
          background-color: var(--color-text-heading);
        }

        .ring-hovered {
          width: 48px;
          height: 48px;
          margin-top: -24px;
          margin-left: -24px;
          border-color: var(--color-accent); /* Gold ring expansion */
          border-width: 1px;
        }

        /* Prevent default mouse pointer cursor on desktop */
        @media (min-width: 992px) {
          body, button, a, input, select, textarea, .filter-tab, .accordion-trigger, .carousel-btn {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
