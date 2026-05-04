import React from 'react';
import TimelineSection from '../components/TimelineSection';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Timeline = () => {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: isMobile ? '120px' : '100px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '60px', padding: '0 20px' }}>
        <h1 className="metallic-text" style={{ fontSize: isMobile ? '2.5rem' : '4rem', marginBottom: '12px' }}>{t('timeline_page_title')}</h1>
        <p style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: isMobile ? '0.75rem' : '1rem' }}>
          {t('timeline_page_subtitle')}
        </p>
      </div>
      <TimelineSection />
    </motion.div>
  );
};

export default Timeline;
