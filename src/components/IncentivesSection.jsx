import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Target, Cpu, Users, Rocket } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const IncentivesSection = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('main');

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
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2 className="metallic-text" style={{ fontSize: '3.5rem', marginBottom: '16px', fontWeight: 900 }}>{t('incentives_title')}</h2>
          <p style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>{t('incentives_subtitle')}</p>
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
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '100px',
                border: activeTab === tab.id ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.05)',
                backgroundColor: activeTab === tab.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                color: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 700,
                transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                gap: '24px' 
              }}
            >
              {filteredPrizes.map((prize, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    background: 'rgba(255,255,255,0.06)',
                    borderColor: 'rgba(255,255,255,0.15)'
                  }}
                  style={{ 
                    padding: '40px 24px', 
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
                  {/* Watermark Logo Image */}
                  <img 
                    src="/assets/aevum-logo.png" 
                    alt="Aevum"
                    style={{
                      position: 'absolute',
                      bottom: '-20px',
                      left: '-20px',
                      width: '180px',
                      height: 'auto',
                      filter: 'grayscale(1) brightness(10) contrast(0)',
                      opacity: 0.03,
                      pointerEvents: 'none',
                      zIndex: 0
                    }}
                  />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: 800, 
                      marginBottom: '16px', 
                      color: '#fff',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px'
                    }}>
                      {prize.title}
                    </h3>
                    <p style={{ 
                      color: 'rgba(255,255,255,0.5)', 
                      fontSize: '0.9rem', 
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
            marginTop: '80px', 
            textAlign: 'center', 
            padding: '60px 40px', 
            backgroundColor: 'rgba(255,255,255,0.01)',
            borderRadius: '24px',
            border: '1px dashed rgba(255,255,255,0.1)'
          }}
        >
          <Award size={48} style={{ color: '#fff', marginBottom: '24px', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>{t('cta_compete_title')}</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>{t('cta_compete_desc')}</p>
          <button className="btn-primary" onClick={() => window.location.href = '/register'}>{t('cta_apply_now')}</button>
        </motion.div>
      </div>
    </section>
  );
};

export default IncentivesSection;
