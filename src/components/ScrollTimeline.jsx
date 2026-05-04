import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'hero', label: '01', title: 'Start' },
  { id: 'about', label: '02', title: 'Vision' },
  { id: 'features', label: '03', title: 'Aevum Edge' },
  { id: 'innovation', label: '04', title: 'Logic' },
  { id: 'vision', label: '05', title: 'Principles' },
  { id: 'tracks', label: '06', title: 'Tracks' },
  { id: 'incentives', label: '07', title: 'Rewards' }
];

const ScrollTimeline = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      setIsVisible(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 2000); // Fade out after 2 seconds of inactivity
    };

    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div 
      animate={{ 
        opacity: isVisible ? 1 : 0.05,
        filter: isVisible ? 'blur(0px)' : 'blur(2px)'
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        position: 'fixed',
        right: '5px', // Slightly away from scrollbar
        top: '50%',
        transform: 'translateY(-50%)',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1001,
        pointerEvents: isVisible ? 'auto' : 'none',
        alignItems: 'flex-end'
      }}
    >
      {/* Background Track - Pin to edge */}
      <div style={{
        position: 'absolute',
        right: '0',
        width: '1px',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.03)',
      }} />

      {/* Progress Line - Pin to edge */}
      <motion.div style={{
        position: 'absolute',
        right: '0',
        top: 0,
        width: '1px',
        height: '100%',
        backgroundColor: '#fff',
        scaleY,
        transformOrigin: 'top',
      }} />

      {/* Section Indicators */}
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 2,
        paddingRight: '8px', // Closer to the line
        alignItems: 'flex-end'
      }}>
        {sections.map((section, index) => {
          const sectionIndex = sections.findIndex(s => s.id === activeSection);
          const isReached = index <= sectionIndex;
          const isActive = activeSection === section.id;

          return (
            <div 
              key={section.id} 
              onClick={() => scrollToSection(section.id)}
              style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-end',
                cursor: 'pointer',
                pointerEvents: 'auto',
                height: '40px',
                opacity: isReached ? 1 : 0.1,
                transition: 'opacity 0.5s ease',
                position: 'relative'
              }}
            >
              {/* Active Indicator Dash */}
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 5 }}
                    style={{
                      position: 'absolute',
                      right: '-8px', // Touching the line at right:0
                      width: '8px',
                      height: '1px',
                      backgroundColor: '#fff',
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Number */}
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0.4,
                  scale: isActive ? 1.1 : 1,
                  x: isActive ? 0 : 2
                }}
                style={{
                  color: '#fff',
                  fontSize: '0.75rem', // Slightly larger
                  fontWeight: 400,
                  fontFamily: 'Outfit',
                  letterSpacing: '2px',
                  lineHeight: 1,
                  display: 'block',
                  textAlign: 'right'
                }}
              >
                {section.label}
              </motion.span>
              
              {/* Subtext */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 0.5, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    style={{
                      position: 'absolute',
                      top: '28px', // Adjusted for larger number
                      right: 0,
                      color: '#fff',
                      fontSize: '0.55rem', // Slightly larger
                      fontWeight: 300,
                      textTransform: 'uppercase',
                      letterSpacing: '3px',
                      whiteSpace: 'nowrap',
                      textAlign: 'right'
                    }}
                  >
                    {section.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ScrollTimeline;
