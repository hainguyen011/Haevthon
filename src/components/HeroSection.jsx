import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

import { homeData } from '../data/homeData.jsx';

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { hero } = homeData;
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section style={{
      minHeight: isMobile ? 'auto' : '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: isMobile ? '100px 20px 60px' : '120px 20px',
      textAlign: 'center',
      position: 'relative',
      backgroundColor: '#000000'
    }}>
      {/* Integrated Logo Headline (Logo replaces 'V') */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ 
          display: 'flex', 
          flexDirection: 'row',
          alignItems: 'center', 
          justifyContent: 'center',
          gap: isMobile ? '0.5rem' : 'clamp(0.5rem, 2vw, 1.5rem)',
          marginBottom: isMobile ? '16px' : '32px',
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? 'clamp(1.8rem, 9vw, 3rem)' : 'clamp(2.5rem, 12vw, 8.5rem)',
            fontWeight: 900,
            margin: 0,
            letterSpacing: isMobile ? '-1px' : '-2px',
            lineHeight: 1,
            textAlign: isMobile ? 'right' : 'right'
          }}
          className="metallic-text"
        >
          HAE
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <svg 
            width="clamp(2.5rem, 10vw, 6rem)" 
            viewBox="0 0 48 46" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ 
              marginTop: '0.1em',
              filter: 'brightness(1.2)'
            }}
          >
            <path 
              fill="#863BFF" 
              d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" 
            />
            <path 
              d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" 
              fill="url(#logo-gradient-v)" 
              fillOpacity="0.4"
            />
            <defs>
              <linearGradient id="logo-gradient-v" x1="24" y1="0" x2="24" y2="46" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h1
          style={{
            fontSize: isMobile ? 'clamp(1.8rem, 9vw, 3rem)' : 'clamp(2.5rem, 12vw, 8.5rem)',
            fontWeight: 900,
            margin: 0,
            letterSpacing: isMobile ? '-1px' : '-2px',
            lineHeight: 1,
            textAlign: isMobile ? 'left' : 'left'
          }}
          className="metallic-text"
        >
          THON
        </h1>
      </motion.div>

      {/* Mission Statement */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          maxWidth: '750px',
          margin: '0 auto 48px',
          color: 'rgba(255,255,255,0.6)',
          fontWeight: 400,
          lineHeight: 1.5,
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
            padding: '16px 44px',
            fontSize: '0.95rem',
            fontWeight: 800,
            backgroundColor: 'var(--primary-white)',
            color: '#000000',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '12px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            transition: 'all 0.3s',
          }}
        >
          {t(hero.cta_primary_key)}
        </button>
        <button
          style={{
            padding: '16px 44px',
            fontSize: '0.95rem',
            fontWeight: 800,
            backgroundColor: 'transparent',
            color: 'var(--primary-white)',
            border: '1px solid rgba(255,255,255,0.2)',
            cursor: 'pointer',
            borderRadius: '12px',
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
          marginTop: isMobile ? '40px' : '100px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1.5fr 1fr',
          gap: isMobile ? '24px' : '20px',
          width: '100%',
          maxWidth: '1000px',
          padding: isMobile ? '32px 10px' : '40px 20px',
          borderTop: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        {hero.stats.map((stat, index) => (
          <div key={index} style={{ 
            textAlign: 'center',
            gridColumn: (isMobile && index === 2) ? 'span 2' : 'span 1'
          }}>
            <span style={{ 
              display: 'block', 
              color: 'rgba(255,255,255,0.3)', 
              fontSize: isMobile ? '0.6rem' : '0.75rem', 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              marginBottom: isMobile ? '4px' : '12px' 
            }}>
              {t(stat.labelKey)}
            </span>
            <span style={{ 
              fontSize: isMobile ? '1.1rem' : '1.5rem', 
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
