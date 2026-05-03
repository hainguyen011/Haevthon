import React from 'react';
import TimelineSection from '../components/TimelineSection';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Timeline = () => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: '100px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="metallic-text" style={{ fontSize: '4rem' }}>{t('timeline_page_title')}</h1>
        <p style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px' }}>
          {t('timeline_page_subtitle')}
        </p>
      </div>
      <TimelineSection />
    </motion.div>
  );
};

export default Timeline;
