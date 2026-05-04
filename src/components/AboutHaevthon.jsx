import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Cpu, Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AboutHaevthon = () => {
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
      color: '#fff',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Background Decorative Element */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        filter: 'blur(80px)',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', 
          gap: isMobile ? '40px' : '80px', 
          alignItems: 'center' 
        }}>

          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '24px'
            }}>
              <svg width="14" height="13" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" />
              </svg> {t('about_badge')}
            </div>

            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              lineHeight: 1,
              marginBottom: '32px',
              letterSpacing: '-2px'
            }}>
              {t('about_title_part1')} <span style={{ color: 'rgba(255,255,255,0.3)' }}>{t('about_title_part2')}</span> {t('about_title_part3')}
            </h2>

            <p style={{
              fontSize: '1.15rem',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.6,
              marginBottom: '40px',
              maxWidth: '540px',
              fontWeight: 300
            }}>
              {t('about_desc')}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Cpu size={16} color="rgba(255,255,255,0.6)" />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, letterSpacing: '0.5px' }}>{t('about_core_title')}</h4>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{t('about_core_desc')}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={16} color="rgba(255,255,255,0.6)" />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, letterSpacing: '0.5px' }}>{t('about_swarm_title')}</h4>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{t('about_swarm_desc')}</p>
              </div>
            </div>

            <motion.button
              style={{
                marginTop: '48px',
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                padding: 0
              }}
            >
              {t('about_cta')} <ArrowRight size={18} />
            </motion.button>
          </motion.div>

          {/* Right Side: Visual Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ 
              position: 'relative', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', 
              alignItems: 'center' 
            }}
          >
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
              position: 'relative',
              width: '100%',
              aspectRatio: '4/3',
              backgroundColor: '#050505'
            }}>
              <img
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop"
                alt="Agentic Core"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
              />
              {/* Overlay Gradient */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))'
              }} />
            </div>

            {/* Floating Card - Now with True Glassmorphism and No Animation */}
            <div
              style={{
                position: isMobile ? 'relative' : 'absolute',
                bottom: isMobile ? '0' : '24px',
                right: isMobile ? '0' : '24px',
                marginTop: isMobile ? '20px' : '0',
                padding: '28px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.12)',
                width: isMobile ? '100%' : '300px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                zIndex: 2
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                backgroundColor: 'rgba(255,255,255,0.05)'
              }}>
                <Target size={18} color="white" />
              </div>
              <h5 style={{ fontSize: '0.95rem', fontWeight: 900, marginBottom: '8px', letterSpacing: '1px', color: '#fff' }}>{t('about_card_title')}</h5>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontWeight: 300 }}>
                {t('about_card_desc')}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutHaevthon;
