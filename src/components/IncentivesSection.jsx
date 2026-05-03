import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, Rocket, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const IncentivesSection = () => {
  const { t } = useLanguage();

  const prizes = [
    {
      title: t('incentive1_title'),
      desc: t('incentive1_desc'),
      icon: <Rocket size={24} />
    },
    {
      title: t('incentive2_title'),
      desc: t('incentive2_desc'),
      icon: <Briefcase size={24} />
    },
    {
      title: t('incentive3_title'),
      desc: t('incentive3_desc'),
      icon: <TrendingUp size={24} />
    }
  ];

  return (
    <section style={{ padding: '100px 20px', borderTop: '1px solid var(--glass-border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <h2 className="metallic-text" style={{ fontSize: '3rem', marginBottom: '16px' }}>{t('incentives_title')}</h2>
          <p style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px' }}>{t('incentives_subtitle')}</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {prizes.map((prize, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card"
              style={{ padding: '40px', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div style={{ color: 'var(--primary-white)', marginBottom: '20px' }}>{prize.icon}</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>{prize.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{prize.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ 
            marginTop: '80px', 
            textAlign: 'center', 
            padding: '40px', 
            backgroundColor: 'rgba(255,255,255,0.02)',
            borderRadius: '4px',
            border: '1px dashed var(--glass-border)'
          }}
        >
          <Award size={48} style={{ color: 'var(--primary-white)', marginBottom: '20px' }} />
          <h3 style={{ marginBottom: '16px' }}>{t('cta_compete_title')}</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>{t('cta_compete_desc')}</p>
          <button className="btn-primary" onClick={() => window.location.href = '/register'}>{t('cta_apply_now')}</button>
        </motion.div>
      </div>
    </section>
  );
};

export default IncentivesSection;
