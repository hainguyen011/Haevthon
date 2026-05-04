import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, Code, ExternalLink } from 'lucide-react';

const AevumEvolution = () => {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const features = [
    { id: '01', key: 'feature_squad_v2' },
    { id: '02', key: 'feature_pipernet_ioa' },
    { id: '03', key: 'feature_vibe_profiling' },
    { id: '04', key: 'feature_thought_stream' },
    { id: '05', key: 'feature_memory_pulse' },
    { id: '06', key: 'feature_persona_evo' }
  ];

  return (
    <section style={{
      padding: isMobile ? '80px 20px' : '120px 20px',
      backgroundColor: '#000',
      color: '#fff',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          marginBottom: '80px',
          gap: isMobile ? '24px' : '0'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '20px'
            }}>
              TECHNICAL STACK
            </div>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              letterSpacing: '-2px',
              lineHeight: 1,
              margin: 0
            }}>
              {t('evolution_title')}
            </h2>
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.4)',
            maxWidth: '400px',
            fontSize: '1rem',
            lineHeight: 1.6,
            fontWeight: 300,
            textAlign: isMobile ? 'left' : 'right'
          }}>
            {t('evolution_subtitle')}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '24px'
        }}>
          {features.map((feat, i) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: '40px',
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s'
              }}
              className="evo-card"
            >
              <div style={{
                fontSize: '0.8rem',
                fontWeight: 900,
                color: 'rgba(255,255,255,0.2)',
                marginBottom: '24px',
                letterSpacing: '2px'
              }}>
                FEATURE {feat.id}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                marginBottom: '16px',
                color: '#fff'
              }}>
                {t(`${feat.key}_title`)}
              </h3>
              <p style={{
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.6,
                fontSize: '0.95rem',
                fontWeight: 300,
                marginBottom: '32px'
              }}>
                {t(`${feat.key}_desc`)}
              </p>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer'
                }}>
                  <Code size={14} /> SOURCE
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer'
                }}>
                  <ExternalLink size={14} /> DOCS
                </div>
              </div>

              <div style={{
                position: 'absolute',
                top: '40px',
                right: '40px',
                color: 'rgba(255,255,255,0.1)'
              }}>
                <ArrowUpRight size={24} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          style={{
            marginTop: '60px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <motion.button
            style={{
              backgroundColor: '#fff',
              color: '#000',
              padding: '16px 32px',
              borderRadius: '100px',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '2px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {t('evo_learn_more')}
          </motion.button>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .evo-card:hover {
          background-color: rgba(255,255,255,0.04) !important;
          border-color: rgba(255,255,255,0.12) !important;
        }
      `}} />
    </section>
  );
};

export default AevumEvolution;
