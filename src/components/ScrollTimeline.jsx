import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const ScrollTimeline = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isVisible, setIsVisible] = useState(true);
  const scrollTimeout = useRef(null);

  const sections = useMemo(() => [
    { id: 'hero', label: '01', title: t('timeline_nav_hero') },
    { id: 'about', label: '02', title: t('timeline_nav_about') },
    { id: 'features', label: '03', title: t('timeline_nav_features') },
    { id: 'innovation', label: '04', title: t('timeline_nav_innovation') },
    { id: 'vision', label: '05', title: t('timeline_nav_vision') },
    { id: 'tracks', label: '06', title: t('timeline_nav_tracks') },
    { id: 'incentives', label: '07', title: t('timeline_nav_incentives') }
  ], [t]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    const handleScroll = () => {
      setIsVisible(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      
      scrollTimeout.current = setTimeout(() => {
        setIsVisible(false);
      }, 2000); // Hide after 2s of inactivity
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: [0, 0.1, 0.5],
        rootMargin: "-15% 0px -65% 0px"
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  if (isMobile) return null;

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -20, 
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none'
      }}
    >
      {/* Glass Container */}
      <div style={{
        marginTop: '10px',
        padding: '10px 32px',
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        gap: '40px',
        position: 'relative',
        overflow: 'hidden',
        pointerEvents: 'auto'
      }}>
        {/* Progress Line at Bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'rgba(255,255,255,0.05)'
        }} />
        
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1.5px',
            background: 'linear-gradient(90deg, transparent, #fff, transparent)',
            scaleX,
            transformOrigin: '0%',
            filter: 'drop-shadow(0 0 5px #fff)'
          }}
        />

        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          const activeIndex = sections.findIndex(s => s.id === activeSection);
          const isReached = index <= activeIndex;

          return (
            <div
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                opacity: isReached ? 1 : 0.2,
                transition: 'all 0.4s ease',
                position: 'relative'
              }}
            >
              <span style={{
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700,
                fontFamily: 'monospace',
                opacity: isActive ? 1 : 0.4
              }}>
                {section.label}
              </span>
              <span style={{
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: isActive ? 600 : 400,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                whiteSpace: 'nowrap'
              }}>
                {section.title}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ScrollTimeline;
