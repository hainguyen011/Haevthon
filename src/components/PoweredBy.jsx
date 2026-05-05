import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const PoweredBy = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { t, language } = useLanguage();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Open when scrolling down, close when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (isMobile) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        width: isExpanded ? 240 : 42,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      style={{
        position: 'fixed',
        bottom: 0,
        right: '40px',
        zIndex: 2000,
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '0',
        padding: '0',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      whileHover={{ scale: 1.1 }}
      onClick={() => window.open('https://open-vsx.org/extension/I2FLabs/aevum/reviews', '_blank')}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          /* Logo State (When Retracted) */
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px'
            }}
          >
            <img
              src="/assets/aevum-logo.png"
              alt="Aevum"
              style={{ width: '28px', height: '28px', objectFit: 'contain' }}
              onError={(e) => e.target.style.display = 'none'}
            />
          </motion.div>
        ) : (
          /* Text State (When Expanded) */
          <motion.div
            key="text"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              width: '100%'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '0.45rem',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif'
              }}>
                {t('powered_by_prefix')}
              </span>
              <div style={{ width: '1px', height: '10px', background: 'rgba(255,255,255,0.1)' }} />
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 900,
                letterSpacing: '5px',
                textTransform: 'uppercase',
                background: 'linear-gradient(180deg, #fff 0%, #888 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: "'Outfit', sans-serif",
                marginRight: '-5px' // Offset the last letter spacing
              }}>
                AEVUM
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PoweredBy;
