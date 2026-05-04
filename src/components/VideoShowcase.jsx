import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Play } from 'lucide-react';

const VideoShowcase = () => {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section style={{
      padding: isMobile ? '80px 20px' : '120px 20px',
      backgroundColor: '#000',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '20px'
            }}
          >
            <Play size={14} fill="currentColor" /> {t('video_badge')}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 900,
              letterSpacing: '-2px',
              lineHeight: 1,
              marginBottom: '24px',
              color: '#fff',
              textTransform: 'uppercase'
            }}
          >
            {t('video_title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1.1rem',
              fontWeight: 300,
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            {t('video_subtitle')}
          </motion.p>
        </div>

        {/* Video Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: isMobile ? '20px' : '32px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
            backgroundColor: '#050505'
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/w7iQv-aKlTo?autoplay=0&controls=1&rel=0&modestbranding=1"
            title="Aevum Mission Cinematic"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          ></iframe>
        </motion.div>

      </div>
    </section>
  );
};

export default VideoShowcase;
