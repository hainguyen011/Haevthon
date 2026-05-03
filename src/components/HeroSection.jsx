import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

import { homeData } from '../data/homeData.jsx';

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { hero } = homeData;

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '120px 20px',
      textAlign: 'center',
      position: 'relative',
      backgroundColor: '#000000'
    }}>
      {/* Small Logo & Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <img
          src={hero.logo}
          alt="Aevum"
          style={{ width: '128px', height: '128px', objectFit: 'contain', marginBottom: '16px' }}
          onError={(e) => e.target.style.display = 'none'}
        />
        <p style={{
          letterSpacing: '4px',
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          fontWeight: 700
        }}>
          {hero.badge}
        </p>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          fontSize: 'clamp(4rem, 15vw, 10rem)',
          fontWeight: 900,
          margin: '0 0 24px 0',
          letterSpacing: '-4px',
          lineHeight: 0.85
        }}
        className="metallic-text"
      >
        {t(hero.titleKey)}
      </motion.h1>

      {/* Mission Statement */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
          maxWidth: '750px',
          margin: '0 auto 48px',
          color: 'rgba(255,255,255,0.7)',
          fontWeight: 400,
          lineHeight: 1.4,
          letterSpacing: '0.5px'
        }}
      >
        {t(hero.subtitleKey)}
      </motion.p>

      {/* Call to Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <button
          onClick={() => navigate('/register')}
          style={{
            padding: '18px 48px',
            fontSize: '1rem',
            fontWeight: 800,
            backgroundColor: 'var(--primary-white)',
            color: '#000000',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '2px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            transition: 'all 0.3s',
            boxShadow: '0 4px 15px rgba(255,255,255,0.1)'
          }}
        >
          {t(hero.cta_primary_key)}
        </button>
        <button
          style={{
            padding: '18px 48px',
            fontSize: '1rem',
            fontWeight: 800,
            backgroundColor: 'transparent',
            color: 'var(--primary-white)',
            border: '2px solid rgba(255,255,255,0.2)',
            cursor: 'pointer',
            borderRadius: '2px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            transition: 'all 0.3s'
          }}
          className="secondary-btn-hover"
        >
          {t(hero.cta_secondary_key)}
        </button>
      </motion.div>

      {/* Event Details Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        style={{
          marginTop: '100px',
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr 1fr', // Give middle item (Format) more space
          gap: '20px',
          width: '100%',
          maxWidth: '1000px',
          padding: '40px 0',
          borderTop: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        {hero.stats.map((stat, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <span style={{ 
              display: 'block', 
              color: 'rgba(255,255,255,0.4)', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              letterSpacing: '3px', 
              marginBottom: '12px' 
            }}>
              {t(stat.labelKey)}
            </span>
            <span style={{ 
              fontSize: '1.5rem', 
              fontWeight: 900, 
              color: 'var(--primary-white)',
              letterSpacing: '-0.5px'
            }}>
              {stat.valueKey ? t(stat.valueKey) : stat.value}
            </span>
          </div>
        ))}
      </motion.div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .secondary-btn-hover:hover {
          border-color: var(--primary-white) !important;
        }
      `}} />
    </section>
  );
};

export default HeroSection;
