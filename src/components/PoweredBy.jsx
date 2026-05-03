import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const PoweredBy = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
        width: isExpanded ? 160 : 32,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 2000,
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        borderRadius: '100px',
        cursor: 'pointer',
        overflow: 'hidden',
        background: '#000'
      }}
      whileHover={{ scale: 1.1 }}
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
              width: '32px',
              height: '32px'
            }}
          >
            <img
              src="/assets/aevum-logo.png"
              alt="Aevum"
              style={{ width: '22px', height: '22px', objectFit: 'contain' }}
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
            <span style={{
              fontSize: '0.65rem',
              fontWeight: 800,
              color: 'var(--primary-white)',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              {t('powered_by')}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PoweredBy;
