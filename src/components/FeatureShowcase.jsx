import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { homeData } from '../data/homeData.jsx';

const FeatureShowcase = () => {
  const { t } = useLanguage();
  const { features } = homeData;
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  // High-Fidelity Thematic Images for all 8 Aevum Edge cards
  const featureImages = [
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800", // 1 - Neural Nodes
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800", // 2 - Global Resonance
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800", // 3 - Fiber/Network
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800", // 4 - Data Storage
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800", // 5 - Autonomous Handshake
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800", // 6 - Quantum State Sync
    "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=800", // 7 - Neural Governance
    "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800"  // 8 - Bio-inspired Logic
  ];

  useEffect(() => {
    const updateWidth = () => {
      if (carousel.current) {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const nextSlide = () => {
    if (index < features.length - 1) {
      setIndex(prev => prev + 1);
    } else {
      setIndex(0);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(prev => prev - 1);
    } else {
      setIndex(features.length - 1);
    }
  };

  return (
    <section style={{
      padding: '160px 0',
      backgroundColor: '#000000',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '4px',
              marginBottom: '20px',
              textTransform: 'uppercase'
            }}>
              AEVUM INFRASTRUCTURE
            </div>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              letterSpacing: '-2px',
              margin: 0,
              lineHeight: 1,
              color: '#fff'
            }}>
              THE AEVUM
            </h2>
          </motion.div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={prevSlide}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.02)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s'
              }}
              className="nav-btn"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.02)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s'
              }}
              className="nav-btn"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      <motion.div
        ref={carousel}
        style={{
          cursor: 'grab',
          paddingLeft: 'max(20px, calc((100% - 1200px) / 2))',
          paddingRight: '20px'
        }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: 'grabbing' }}
          animate={{ x: -index * 382 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          style={{
            display: 'flex',
            gap: '32px'
          }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              style={{
                minWidth: '350px',
                maxWidth: '350px',
                background: 'rgba(255,255,255,0.01)',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.06)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '560px',
                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
              className="feature-card-hover"
            >
              {/* Image Header with Blur Bottom Blend */}
              <div style={{
                width: '100%',
                height: '45%',
                position: 'relative',
                overflow: 'hidden',
                maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                backgroundColor: 'rgba(255,255,255,0.02)'
              }}>
                <img
                  src={featureImages[i] || featureImages[0]}
                  alt={t(feature.titleKey)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.6,
                    transition: 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
                  }}
                  className="feature-img"
                  draggable="false"
                  onError={(e) => {
                    e.target.style.opacity = 0;
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, width: '100%', height: '100%',
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)'
                }} />
              </div>

              {/* Content */}
              <div style={{ padding: '40px', flex: 1, display: 'flex', flexDirection: 'column', marginTop: '-30px', position: 'relative', zIndex: 2 }}>
                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: 900,
                  marginBottom: '16px',
                  letterSpacing: '-1px',
                  lineHeight: 1.1,
                  textTransform: 'uppercase',
                  color: '#fff'
                }}>
                  {t(feature.titleKey)}
                </h3>

                <p style={{
                  color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.6,
                  fontSize: '1rem',
                  fontWeight: 300
                }}>
                  {t(feature.descKey)}
                </p>

                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: 'rgba(255,255,255,0.15)',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  letterSpacing: '2px'
                }}>
                  <div style={{ width: '24px', height: '1px', background: 'currentColor' }} />
                  AEVUM PROTOCOL v1.5
                </div>
              </div>

              {/* ID Badge */}
              <div style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                padding: '6px 12px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.6)',
                fontWeight: 900,
                letterSpacing: '1px'
              }}>
                {feature.id.toString().padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .feature-card-hover:hover {
          background: rgba(255,255,255,0.03) !important;
          border-color: rgba(255,255,255,0.12) !important;
        }
        .feature-card-hover:hover .feature-img {
          opacity: 0.8 !important;
        }
        .nav-btn:hover {
          background-color: #fff !important;
          color: #000 !important;
          border-color: #fff !important;
        }
      `}} />
    </section>
  );
};

export default FeatureShowcase;
