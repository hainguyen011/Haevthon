import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Cpu, Zap, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { homeData } from '../data/homeData.jsx';

const InnovationSection = () => {
  const { t } = useLanguage();
  const { innovation } = homeData;
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section style={{
      padding: isMobile ? '100px 0' : '180px 0',
      backgroundColor: '#000000',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Immersive Background Flag */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url("https://st4.depositphotos.com/2397649/23813/i/450/depositphotos_238135506-stock-photo-flag-vietnam-copy-space-your.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: '25% center',
          backgroundAttachment: isMobile ? 'scroll' : 'fixed',
          opacity: 0.2,
          filter: 'contrast(1.1) brightness(2.0) saturate(0.8)',
          zIndex: 0
        }}
      />

      {/* Cinematic Overlays */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1
      }} />

      <div style={{
        width: '100%',
        padding: isMobile ? '0 20px' : '0 80px',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '80px'
        }}>
          {/* Content Top */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ maxWidth: '900px' }}
          >

            <h2 style={{
              fontSize: isMobile ? '2.5rem' : 'clamp(3.5rem, 7vw, 5.5rem)',
              fontWeight: 950,
              lineHeight: 1.1,
              marginBottom: '40px',
              letterSpacing: '-3px',
              color: '#ffffff',
              maxWidth: '1100px'
            }}>
              {t('innovation_title_part1')} <span style={{ color: 'rgba(255,255,255,0.2)' }}>{t('innovation_title_part2')}</span> {t('innovation_title_part3')}
            </h2>

            <p style={{
              fontSize: isMobile ? '1.1rem' : '1.4rem',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.6,
              fontWeight: 300,
              maxWidth: '750px'
            }}>
              {t('innovation_desc_main')}
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '60px' : '80px',
            marginTop: '40px'
          }}>
            {[
              { titleKey: "innovation_item1_title", descKey: "innovation_item1_desc", index: "01" },
              { titleKey: "innovation_item2_title", descKey: "innovation_item2_desc", index: "02" },
              { titleKey: "innovation_item3_title", descKey: "innovation_item3_desc", index: "03" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px',
                  paddingTop: '32px',
                  borderTop: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <div style={{
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '2px'
                }}>
                  <span>{item.index}</span>
                </div>

                <div>
                  <h4 style={{
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    marginBottom: '16px',
                    letterSpacing: '-1px',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    lineHeight: 1.2
                  }}>
                    {t(item.titleKey)}
                  </h4>
                  <p style={{
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.4)',
                    lineHeight: 1.6,
                    fontWeight: 300
                  }}>
                    {t(item.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
