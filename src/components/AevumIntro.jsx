import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const AevumIntro = () => {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = React.useState(window.innerWidth >= 768 && window.innerWidth < 1024);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define All Grid Items
  const gridItems = [
    {
      id: 'main',
      type: 'main',
      title: t('aevum_intro_title'),
      desc: t('aevum_intro_subtitle'),
      spans: { col: 'span 2', row: 'span 2' }
    },
    {
      id: 'stat',
      type: 'accent',
      num: '01',
      title: t('aevum_intro_stat_title'),
      desc: t('aevum_intro_stat_desc'),
      spans: { col: 'span 1', row: 'span 1' }
    },
    {
      id: 'ch1',
      type: 'chapter',
      num: '02',
      title: t('aevum_story_ch1_title'),
      desc: t('aevum_story_ch1_desc'),
      spans: { col: 'span 1', row: 'span 1' }
    },
    {
      id: 'ch2',
      type: 'chapter',
      num: '03',
      title: t('aevum_story_ch2_title'),
      desc: t('aevum_story_ch2_desc'),
      spans: { col: 'span 1', row: 'span 2' } // Tall
    },
    {
      id: 'living_memory',
      type: 'accent',
      num: '04',
      title: t('aevum_intro_quote_title'), // Now Living Memory
      desc: t('aevum_intro_quote_desc'),
      spans: { col: 'span 1', row: 'span 1' }
    },
    {
      id: 'ch3',
      type: 'chapter',
      num: '05',
      title: t('aevum_story_ch3_title'),
      desc: t('aevum_story_ch3_desc'),
      spans: { col: 'span 2', row: 'span 1' } // Wide
    },
    {
      id: 'tech',
      type: 'accent',
      num: '06',
      title: t('aevum_intro_tech_title'),
      desc: t('aevum_intro_tech_desc'),
      spans: { col: 'span 1', row: 'span 1' }
    }
  ];

  const renderCard = (item, index) => {
    const isMain = item.type === 'main';
    const isAccent = item.type === 'accent';
    const isChapter = item.type === 'chapter';

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{
          backgroundColor: isMain ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.03)',
          borderColor: 'rgba(255,255,255,0.2)'
        }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05, duration: 0.15 }}
        style={{
          gridColumn: isMobile ? 'span 1' : isTablet ? (item.id === 'main' ? 'span 2' : 'span 1') : item.spans.col,
          gridRow: isMobile ? 'span 1' : item.spans.row,
          padding: isMain ? (isMobile ? '32px' : '48px') : '28px',
          backgroundColor: isMain ? 'rgba(255,255,255,0.02)' : isAccent ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.015)',
          border: isMain ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.08)',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isMain ? 'space-between' : 'flex-end',
          position: 'relative',
          overflow: 'hidden',
          minHeight: isMain ? '400px' : '180px',
          cursor: 'default',
          transition: 'border-color 0.15s ease, background-color 0.15s ease'
        }}
      >
        {/* Decorative Background Elements */}
        {isMain && (
          <>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }} />
            <img
              src="/assets/unikorn-logo.png"
              alt="Unikorn Background"
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                width: '240px',
                height: 'auto',
                opacity: 0.04,
                filter: 'grayscale(1) brightness(2)',
                pointerEvents: 'none',
                userSelect: 'none'
              }}
            />
          </>
        )}

        {item.num && (
          <div style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            fontSize: '3.5rem',
            fontWeight: 900,
            color: 'rgba(255,255,255,0.03)',
            lineHeight: 1,
            userSelect: 'none'
          }}>
            {item.num}
          </div>
        )}

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {isMain && (
            <div style={{
              fontSize: '0.65rem',
              fontWeight: 800,
              letterSpacing: '3px',
              color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              marginBottom: '12px'
            }}>
              AGENTIC NARRATIVE
            </div>
          )}

          <h3 style={{
            fontSize: isMain ? 'clamp(1.5rem, 3vw, 2rem)' : '0.8rem',
            fontWeight: 900,
            letterSpacing: isMain ? '-1px' : '0.5px',
            lineHeight: 1.1,
            margin: isMain ? '0 0 16px 0' : '0 0 10px 0',
            textTransform: 'uppercase',
            color: isAccent ? 'rgba(255,255,255,0.5)' : '#fff'
          }}>
            {item.title}
          </h3>

          <p style={{
            fontSize: isMain ? '0.9rem' : '0.75rem',
            color: isMain ? 'rgba(255,255,255,0.6)' : isAccent ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.5)',
            lineHeight: 1.7,
            fontWeight: 400,
            margin: 0,
            maxWidth: isMain ? '650px' : '100%',
            fontStyle: isAccent && item.id === 'quote' ? 'italic' : 'normal'
          }}>
            {item.desc}
          </p>
        </div>

        {/* Badges for Main Card */}
        {isMain && (
          <div style={{
            display: 'flex',
            gap: '16px',
            marginTop: '40px',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 1
          }}>
            <motion.a
              href="https://unikorn.vn/p/aevum?ref=embed-aevum"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src="https://unikorn.vn/api/widgets/badge/aevum?theme=light"
                alt="Unikorn"
                style={{ height: '48px', width: 'auto', borderRadius: '6px', filter: 'grayscale(1) contrast(1.2)', transition: 'all 0.2s ease' }}
              />
            </motion.a>
            <motion.a
              href="https://unikorn.vn/p/aevum?ref=embed-aevum"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src="https://unikorn.vn/api/widgets/badge/aevum/rank?theme=light&type=daily"
                alt="Rank"
                style={{ height: '48px', width: 'auto', borderRadius: '6px', filter: 'grayscale(1) contrast(1.2)', transition: 'all 0.2s ease' }}
              />
            </motion.a>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <section
      style={{
        padding: isMobile ? '60px 20px' : '100px 40px',
        backgroundColor: '#000',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gridAutoRows: 'minmax(200px, auto)',
          gap: '12px',
        }}>
          {gridItems.map((item, index) => renderCard(item, index))}
        </div>
      </div>
    </section>
  );
};

export default AevumIntro;
