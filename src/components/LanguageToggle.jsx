import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: 'fixed',
        top: '30px',
        right: '30px',
        zIndex: 2000,
      }}
    >
      <motion.button
        whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 0.3)' }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleLanguage}
        style={{
          backgroundColor: '#000000',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'var(--primary-white)',
          padding: '10px 20px',
          borderRadius: '100px',
          fontSize: '0.75rem',
          fontWeight: 900,
          cursor: 'pointer',
          letterSpacing: '2px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textTransform: 'uppercase'
        }}
      >
        <span style={{ color: language === 'en' ? 'var(--primary-white)' : 'rgba(255,255,255,0.3)' }}>EN</span>
        <div style={{ width: '1px', height: '12px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
        <span style={{ color: language === 'vi' ? 'var(--primary-white)' : 'rgba(255,255,255,0.3)' }}>VI</span>
      </motion.button>
    </motion.div>
  );
};

export default LanguageToggle;
