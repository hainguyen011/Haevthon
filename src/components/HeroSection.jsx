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
      alignItems: 'flex-start',
      padding: isMobile ? '120px 24px 60px' : '120px 8%',
      textAlign: 'left',
      position: 'relative',
      backgroundColor: '#000000',
      overflow: 'hidden'
    }}>
      {/* Dynamic Grid Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), 
                          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(circle at 20% 50%, black, transparent 80%)',
        pointerEvents: 'none'
      }} />

      {/* Floating Particles (Subtle) */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, 20],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          style={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            pointerEvents: 'none'
          }}
        />
      ))}

      {/* Background Radial Glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '20%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, rgba(134, 59, 255, 0.02) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />

      {/* Main Content Container */}
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
        {/* Massive Typographic Stack */}
        <div style={{ position: 'relative', marginBottom: '40px' }}>
          {/* Background Rotating Logo */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '35%', // Slightly more to the left to balance the long word
              transform: 'translate(-50%, -50%)',
              width: isMobile ? '130%' : '150%',
              height: isMobile ? '130%' : '150%',
              opacity: 0.05, // Softer for better readability
              pointerEvents: 'none',
              zIndex: -1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src="/favicon.svg"
              alt="Rotating Logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </motion.div>

          {/* Line 1: HAEVTHON */}
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: isMobile ? 'clamp(3rem, 15vw, 6rem)' : 'clamp(6rem, 20vw, 15rem)',
              fontWeight: 950,
              margin: 0,
              letterSpacing: isMobile ? '-2px' : '-8px',
              lineHeight: 0.85,
              color: '#fff',
              position: 'relative'
            }}
          >
            <span className="shimmer-text">HAEVTHON</span>
          </motion.h1>

          {/* Line 2: AGENTIC HACKATHON 2026 (Refined Small Style) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
              fontWeight: 800,
              margin: '24px 0 0 4px', // More breathing room below Line 1
              letterSpacing: '10px', // Even more editorial
              color: 'rgba(255,255,255,0.9)',
              position: 'relative',
              textTransform: 'uppercase',
            }}
          >
            <span className="shimmer-text">AGENTIC HACKATHON 2026</span>
          </motion.div>
        </div>

        {/* Mission Statement */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            maxWidth: '700px',
            marginBottom: '64px',
            color: 'rgba(255,255,255,0.4)',
            fontWeight: 400,
            lineHeight: 1.8,
            letterSpacing: '0.5px',
            textAlign: 'left'
          }}
        >
          {t(hero.subtitleKey)}
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            justifyContent: 'flex-start'
          }}
        >
          <button
            onClick={() => navigate('/register')}
            className="hero-btn-primary"
            style={{
              padding: '22px 64px',
              fontSize: '0.85rem',
              fontWeight: 800,
              backgroundColor: '#ffffff',
              color: '#000000',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '100px',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            {t(hero.cta_primary_key)}
          </button>
          <button
            className="hero-btn-secondary"
            style={{
              padding: '22px 64px',
              fontSize: '0.85rem',
              fontWeight: 700,
              backgroundColor: 'rgba(255,255,255,0.02)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer',
              borderRadius: '100px',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            {t(hero.cta_secondary_key)}
          </button>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .shimmer-text {
          background: linear-gradient(
            to right,
            #fff 20%,
            #888 40%,
            #888 60%,
            #fff 80%
          );
          background-size: 200% auto;
          color: #000;
          background-clip: text;
          text-fill-color: transparent;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 5s linear infinite;
        }

        @keyframes shimmer {
          to {
            background-position: 200% center;
          }
        }

        .hero-btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          filter: brightness(0.9);
          box-shadow: 0 10px 30px rgba(255,255,255,0.1);
        }
        .hero-btn-secondary:hover {
          background-color: rgba(255,255,255,0.06) !important;
          border-color: rgba(255,255,255,0.2) !important;
          transform: translateY(-3px);
        }
      `}} />
    </section>
  );
};

export default HeroSection;
