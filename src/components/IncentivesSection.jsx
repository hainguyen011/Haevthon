import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Target, Cpu, Users, Rocket } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const IncentivesSection = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('main');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabs = [
    { id: 'main', label: t('tab_main_prizes') || 'Main Prizes' },
    { id: 'tech', label: t('tab_tech_awards') || 'Technical' },
    { id: 'team', label: t('tab_team_awards') || 'Team' },
    { id: 'impact', label: t('tab_impact_awards') || 'Impact' },
    { id: 'community', label: t('tab_community_awards') || 'Community' },
    { id: 'special', label: t('tab_special_awards') || 'Special ✨' }
  ];

  const allPrizes = [
    { id: 'main', title: t('incentive1_title'), desc: t('incentive1_desc'), color: '#FFD700' },
    { id: 'main', title: t('incentive2_title'), desc: t('incentive2_desc'), color: '#C0C0C0' },
    { id: 'main', title: t('incentive3_title'), desc: t('incentive3_desc'), color: '#CD7F32' },
    { id: 'main', title: t('incentive19_title'), desc: t('incentive19_desc'), color: '#ff9a9e' },
    { id: 'main', title: t('incentive20_title'), desc: t('incentive20_desc'), color: '#fad0c4' },
    { id: 'main', title: t('incentive21_title'), desc: t('incentive21_desc'), color: '#a1c4fd' },

    { id: 'tech', title: t('incentive4_title'), desc: t('incentive4_desc'), color: '#4facfe' },
    { id: 'tech', title: t('incentive8_title'), desc: t('incentive8_desc'), color: '#00f2fe' },
    { id: 'tech', title: t('incentive6_title'), desc: t('incentive6_desc'), color: '#a8edea' },
    { id: 'tech', title: t('incentive22_title'), desc: t('incentive22_desc'), color: '#f093fb' },
    { id: 'tech', title: t('incentive23_title'), desc: t('incentive23_desc'), color: '#f5576c' },
    { id: 'tech', title: t('incentive24_title'), desc: t('incentive24_desc'), color: '#48c6ef' },

    { id: 'team', title: t('incentive10_title'), desc: t('incentive10_desc'), color: '#f093fb' },
    { id: 'team', title: t('incentive11_title'), desc: t('incentive11_desc'), color: '#f5576c' },
    { id: 'team', title: t('incentive12_title'), desc: t('incentive12_desc'), color: '#48c6ef' },
    { id: 'team', title: t('incentive25_title'), desc: t('incentive25_desc'), color: '#84fab0' },
    { id: 'team', title: t('incentive26_title'), desc: t('incentive26_desc'), color: '#8fd3f4' },
    { id: 'team', title: t('incentive27_title'), desc: t('incentive27_desc'), color: '#ebedee' },

    { id: 'impact', title: t('incentive13_title'), desc: t('incentive13_desc'), color: '#84fab0' },
    { id: 'impact', title: t('incentive14_title'), desc: t('incentive14_desc'), color: '#8fd3f4' },
    { id: 'impact', title: t('incentive15_title'), desc: t('incentive15_desc'), color: '#ebedee' },
    { id: 'impact', title: t('incentive28_title'), desc: t('incentive28_desc'), color: '#ffecd2' },
    { id: 'impact', title: t('incentive29_title'), desc: t('incentive29_desc'), color: '#fcb69f' },
    { id: 'impact', title: t('incentive30_title'), desc: t('incentive30_desc'), color: '#ff9a9e' },

    { id: 'community', title: t('incentive5_title'), desc: t('incentive5_desc'), color: '#ff9a9e' },
    { id: 'community', title: t('incentive7_title'), desc: t('incentive7_desc'), color: '#fad0c4' },
    { id: 'community', title: t('incentive9_title'), desc: t('incentive9_desc'), color: '#a1c4fd' },
    { id: 'community', title: t('incentive31_title'), desc: t('incentive31_desc'), color: '#4facfe' },
    { id: 'community', title: t('incentive32_title'), desc: t('incentive32_desc'), color: '#00f2fe' },
    { id: 'community', title: t('incentive33_title'), desc: t('incentive33_desc'), color: '#a8edea' },

    { id: 'special', title: t('incentive16_title'), desc: t('incentive16_desc'), color: '#ffecd2' },
    { id: 'special', title: t('incentive17_title'), desc: t('incentive17_desc'), color: '#fcb69f' },
    { id: 'special', title: t('incentive18_title'), desc: t('incentive18_desc'), color: '#ff9a9e' },
    { id: 'special', title: t('incentive34_title'), desc: t('incentive34_desc'), color: '#f093fb' },
    { id: 'special', title: t('incentive35_title'), desc: t('incentive35_desc'), color: '#f5576c' },
    { id: 'special', title: t('incentive36_title'), desc: t('incentive36_desc'), color: '#48c6ef' },
  ];

  const filteredPrizes = allPrizes.filter(p => p.id === activeTab);

  return (
    <section style={{ padding: '100px 20px', borderTop: '1px solid var(--glass-border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '48px' }}
        >
          <h2 className="metallic-text" style={{ fontSize: isMobile ? '2.2rem' : '3.5rem', marginBottom: '16px', fontWeight: 900 }}>{t('incentives_title')}</h2>
          <p style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: isMobile ? '0.7rem' : '0.9rem' }}>{t('incentives_subtitle')}</p>
        </motion.div>

        {/* Tab Switcher */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '12px', 
          marginBottom: '64px',
          flexWrap: 'wrap'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                padding: '8px 16px',
                opacity: activeTab === tab.id ? 1 : 0.3,
                transition: 'opacity 0.3s ease',
                fontFamily: "'Be Vietnam Pro', sans-serif"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ minHeight: '400px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              style={{ 
                display: isMobile ? 'flex' : 'grid', 
                gridTemplateColumns: isMobile ? 'none' : 'repeat(auto-fit, minmax(320px, 1fr))', 
                gap: isMobile ? '16px' : '24px',
                overflowX: isMobile ? 'auto' : 'visible',
                paddingBottom: isMobile ? '20px' : '0',
                paddingLeft: isMobile ? '4px' : '0',
                paddingRight: isMobile ? '4px' : '0',
                scrollSnapType: isMobile ? 'x mandatory' : 'none',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
              className="prizes-container"
            >
              {filteredPrizes.map((prize, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  whileHover={{ 
                    background: 'rgba(255,255,255,0.06)',
                    borderColor: 'rgba(255,255,255,0.15)'
                  }}
                  style={{ 
                    flex: isMobile ? '0 0 280px' : '1',
                    scrollSnapAlign: 'center',
                    padding: isMobile ? '32px 20px' : '40px 24px', 
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: `
                      0 10px 30px rgba(0, 0, 0, 0.2),
                      inset 0 0 0 1px rgba(255,255,255,0.03)
                    `,
                  }}
                >
                  {/* Watermark Logo SVG - Revived and Centered */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '120px',
                    opacity: 0.06,
                    pointerEvents: 'none',
                    zIndex: 0,
                    transform: 'translate(-50%, -50%) rotate(-15deg)',
                    filter: `drop-shadow(0 0 15px ${prize.color}11)`
                  }}>
                    <svg viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
                      <path fill={prize.color} d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0-3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" />
                    </svg>
                  </div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{ 
                      fontSize: isMobile ? '1rem' : '1.2rem', 
                      fontWeight: 800, 
                      marginBottom: isMobile ? '12px' : '16px', 
                      color: '#fff',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px'
                    }}>
                      {prize.title}
                    </h3>
                    <p style={{ 
                      color: 'rgba(255,255,255,0.5)', 
                      fontSize: isMobile ? '0.8rem' : '0.9rem', 
                      lineHeight: 1.6 
                    }}>
                      {prize.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ 
            marginTop: isMobile ? '40px' : '80px', 
            textAlign: 'center', 
            padding: isMobile ? '40px 20px' : '60px 40px', 
            backgroundColor: 'rgba(255,255,255,0.01)',
            borderRadius: '24px',
            border: '1px dashed rgba(255,255,255,0.1)'
          }}
        >
          <Award size={isMobile ? 32 : 48} style={{ color: '#fff', marginBottom: '24px', opacity: 0.5 }} />
          <h3 style={{ fontSize: isMobile ? '1.4rem' : '1.8rem', fontWeight: 800, marginBottom: '16px' }}>{t('cta_compete_title')}</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px', fontSize: isMobile ? '0.85rem' : '1rem' }}>{t('cta_compete_desc')}</p>
          <button className="btn-primary" onClick={() => window.location.href = '/register'}>{t('cta_apply_now')}</button>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .prizes-container::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
};

export default IncentivesSection;
