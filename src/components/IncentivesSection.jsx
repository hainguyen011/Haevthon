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
                gridTemplateColumns: isMobile ? 'none' : 'repeat(3, 1fr)', 
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
                  style={{ 
                    flex: isMobile ? '0 0 280px' : '1',
                    scrollSnapAlign: 'center',
                    padding: isMobile ? '60px 20px 50px' : '70px 24px 60px', 
                    background: 'rgba(255, 255, 255, 0.03)', 
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 0,
                    border: 'none',
                    '--prize-color': prize.color
                  }}
                >
                    {/* Full Card Background Logo */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 0,
                    pointerEvents: 'none',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src="/assets/haevthon-logo.png" 
                      alt="" 
                      style={{ 
                        width: '200px', 
                        height: '200px', 
                        opacity: 0.1, 
                        objectFit: 'contain',
                        transform: 'rotate(-15deg) translate(15%, 15%)',
                      }} 
                    />
                  </div>

                  {/* Bottom Accent Line */}
                  {/* Bottom Branded Footer */}
                  <div style={{ 
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'rgba(168, 85, 247, 0.4)',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '8px', 
                    letterSpacing: '3px', 
                    padding: '8px 0',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    zIndex: 2,
                    borderRadius: 0
                  }}>
                    Certified by Haevthon Foundation
                  </div>
                  
                  {/* Top Branded Bar */}
                  <div style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    background: '#A855F7',
                    color: '#fff',
                    fontSize: '10px', 
                    letterSpacing: '2px', 
                    padding: '8px 0',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    zIndex: 2,
                    borderRadius: 0
                  }}>
                    Haevthon Agentic Hackathon 2026
                  </div>

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{ 
                      fontFamily: "'Outfit', 'Inter', sans-serif",
                      fontSize: isMobile ? '1.1rem' : '1.3rem', 
                      fontWeight: 900, 
                      marginBottom: isMobile ? '8px' : '10px', 
                      color: '#fff',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                      textAlign: 'center'
                    }}>
                      {prize.title}
                    </h3>
                    <p style={{ 
                      color: 'rgba(255,255,255,0.7)', 
                      fontSize: isMobile ? '0.75rem' : '0.85rem', 
                      fontWeight: 300,
                      lineHeight: 1.5,
                      textAlign: 'center',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
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
