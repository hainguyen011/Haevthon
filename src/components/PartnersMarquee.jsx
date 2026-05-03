import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const PartnersMarquee = () => {
  const { t } = useLanguage();

  const partners = [
    "Gemini", "Cursor", "Claude", "Unikorn", "Copilot", 
    "OpenAI", "Meta", "Microsoft", "Mistral", "Anthropic",
    "NVIDIA", "Groq"
  ];

  // Double the partners to create a seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section style={{ 
      padding: '60px 0', 
      backgroundColor: '#000000',
      borderTop: '1px solid rgba(255,255,255,0.03)',
      borderBottom: '1px solid rgba(255,255,255,0.03)',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto 40px auto', padding: '0 20px' }}>
        <h3 style={{ 
          fontSize: '0.75rem', 
          fontWeight: 800, 
          color: 'rgba(255,255,255,0.3)', 
          textAlign: 'center',
          letterSpacing: '5px',
          textTransform: 'uppercase'
        }}>
          {t('partners_title')}
        </h3>
      </div>

      <div style={{ position: 'relative', display: 'flex', overflow: 'hidden' }}>
        {/* Gradients for fading effect on sides */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '150px',
          height: '100%',
          background: 'linear-gradient(to right, #000 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '150px',
          height: '100%',
          background: 'linear-gradient(to left, #000 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }} />

        <motion.div
          animate={{
            x: ['0%', '-50%']
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            gap: '80px',
            padding: '20px 0'
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={index}
              style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.15)',
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: '-1px',
                transition: 'color 0.3s ease',
                cursor: 'default',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.15)'}
            >
              {partner}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersMarquee;
