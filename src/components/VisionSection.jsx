import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, FastForward } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const VisionSection = () => {
  const { t } = useLanguage();
  
  const principles = [
    {
      title: t('vision_p1_title'),
      desc: t('vision_p1_desc'),
      icon: <Target size={24} />
    },
    {
      title: t('vision_p2_title'),
      desc: t('vision_p2_desc'),
      icon: <Lightbulb size={24} />
    },
    {
      title: t('vision_p3_title'),
      desc: t('vision_p3_desc'),
      icon: <FastForward size={24} />
    }
  ];

  return (
    <section style={{ padding: '100px 20px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="metallic-text" style={{ fontSize: '3rem', marginBottom: '24px', whiteSpace: 'pre-line' }}>
              {t('vision_title')}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '32px' }}>
              {t('vision_desc').split('**').map((part, i) => i % 2 === 1 ? <strong key={i} style={{color: 'var(--primary-white)'}}>{part}</strong> : part)}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {principles.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: '0px', alignItems: 'center' }}>
                  <div 
                    className="number-gradient" 
                    style={{ 
                      fontSize: '3rem', 
                      minWidth: '80px',
                      textAlign: 'center',
                      opacity: 0.6
                    }}
                  >
                    0{i + 1}
                  </div>
                  <div className="vision-text-block" style={{ paddingLeft: '20px' }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#fff', textTransform: 'uppercase' }}>{p.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5, maxWidth: '400px' }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ padding: '20px 0', position: 'relative' }}
          >
            <h3 style={{ fontSize: '2rem', marginBottom: '32px' }}>{t('vision_scoring_title')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { label: t('vision_score_exec'), val: '40%' },
                { label: t('vision_score_product'), val: '25%' },
                { label: t('vision_score_util'), val: '20%' },
                { label: t('vision_score_innov'), val: '15%' }
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem', fontWeight: 700 }}>
                    <span>{item.label}</span>
                    <span>{item.val}</span>
                  </div>
                  <div style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: item.val }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      style={{ height: '100%', backgroundColor: 'var(--primary-white)' }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
