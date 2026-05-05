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
      style={{
        paddingTop: isMobile ? '80px' : '0px',
        backgroundColor: '#000',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'visible' // Changed from hidden to visible to restore sticky behavior
      }}
    >
      {/* ── CINEMATIC BACKGROUND ── */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: isMobile ? '400px' : '600px',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden' // Contain background elements here instead
      }}>
        {/* Background Image with Blending */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/assets/bg-timeline.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 1,
          zIndex: 0,
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
        }} />

        {/* Smooth Blur Transition at the bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '220px',
          background: 'linear-gradient(to bottom, transparent, #000)',
          zIndex: 1
        }} />
      </div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        padding: isMobile ? '40px 20px' : '120px 20px 100px',
        marginBottom: isMobile ? '40px' : '60px',
        paddingLeft: '20px',
        paddingRight: '20px'
      }}>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.7rem',
            fontWeight: 800,
            letterSpacing: '5px',
            textTransform: 'uppercase',
            marginBottom: '20px',
            lineHeight: 1.5
          }}>
            <span style={{ width: '20px', height: '1px', backgroundColor: 'currentColor' }} />
            {t('nav_timeline')}
            <span style={{ width: '20px', height: '1px', backgroundColor: 'currentColor' }} />
          </div>

          <h1 className="metallic-text" style={{
            fontSize: isMobile ? '2.8rem' : 'clamp(3.5rem, 9vw, 7.5rem)',
            fontWeight: 900,
            lineHeight: 1.4, // Increased significantly for Vietnamese diacritics
            marginBottom: '16px',
            letterSpacing: '-1px', // Slightly relaxed letter spacing
            textTransform: 'uppercase',
            padding: '0.1em 0', // Proportional padding
            display: 'block'
          }}>
            {t('timeline_page_title')}
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            fontSize: isMobile ? '0.7rem' : '1rem',
            fontWeight: 400,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {t('timeline_page_subtitle')}
          </p>
        </motion.div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <TimelineSection />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .metallic-text {
          background: linear-gradient(to bottom, #fff 30%, rgba(255,255,255,0.4) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .grid-overlay {
          animation: float 20s linear infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-40px) rotate(1deg); }
        }
      `}} />
    </motion.div>
  );
};

export default Timeline;
