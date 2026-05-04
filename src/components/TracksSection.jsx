import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { homeData } from '../data/homeData.jsx';

const TracksSection = () => {
  const { t } = useLanguage();
  const { tracks } = homeData;

  // Optimized & More Reliable Thematic Images
  const trackImages = [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800", // 1 - AI Agents (verified)
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800", // 2 - Workflow (verified)
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",   // 3 - Marketplace (verified)
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800", // 4 - Wildcard (verified)
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800", // 5 - Data Intelligence (verified)
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800"  // 6 - Open Source (verified)
  ];

  return (
    <section style={{ 
      padding: '120px 20px', 
      backgroundColor: '#000000',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <div style={{ 
            color: 'rgba(255,255,255,0.4)', 
            fontSize: '0.8rem', 
            fontWeight: 800, 
            letterSpacing: '5px',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            Discovery Paths
          </div>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
            fontWeight: 900, 
            marginBottom: '24px',
            letterSpacing: '-2px',
            color: '#fff'
          }}>
            HACKATHON TRACKS
          </h2>
          <div style={{ height: '1px', width: '80px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '0 auto' }}></div>
        </motion.div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px'
        }}>
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.01)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.05)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}
              whileHover={{ 
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.15)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.8)'
              }}
            >
              {/* Image Container with Sophisticated Blur/Fade Blend */}
              <div style={{ 
                width: '100%', 
                height: '240px', 
                overflow: 'hidden',
                position: 'relative',
                maskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)',
                backgroundColor: 'rgba(255,255,255,0.03)' // Placeholder color if image fails
              }}>
                <img 
                  src={trackImages[index] || trackImages[0]} 
                  alt={track.titleKey}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    opacity: 0.7,
                    transition: 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
                  }}
                  className="card-image"
                  onError={(e) => {
                    e.target.style.opacity = 0; // Hide broken image icon
                  }}
                />
                
                {/* Secondary Gradient for color blending */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, width: '100%', height: '100%',
                  background: 'linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.4) 100%)'
                }} />
                
                {/* Track Number Badge */}
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  padding: '6px 14px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  color: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  zIndex: 3,
                  letterSpacing: '1px'
                }}>
                  #{index + 1}
                </div>
              </div>

              {/* Content Area */}
              <div style={{ 
                padding: '0 32px 32px', 
                position: 'relative', 
                zIndex: 2,
                marginTop: '-20px' 
              }}>
                <h3 style={{ 
                  marginBottom: '16px', 
                  fontSize: '1.5rem', 
                  fontWeight: 900,
                  letterSpacing: '-0.5px',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                  color: '#fff'
                }}>
                  {t(track.titleKey)}
                </h3>
                <p style={{ 
                  color: 'rgba(255,255,255,0.4)', 
                  fontSize: '1rem', 
                  lineHeight: 1.6,
                  fontWeight: 300,
                  maxWidth: '90%'
                }}>
                  {t(track.descKey)}
                </p>
              </div>

              {/* Interactive Indicator */}
              <div style={{ 
                marginTop: 'auto',
                padding: '0 32px 32px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'rgba(255,255,255,0.2)',
                fontSize: '0.7rem',
                fontWeight: 800,
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                <div style={{ width: '24px', height: '1px', backgroundColor: 'currentColor' }} />
                EXPLORE TRACK
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .card-image { transform: scale(1); filter: grayscale(20%); }
        div:hover > div > .card-image { filter: grayscale(0%); opacity: 0.9 !important; }
      `}} />
    </section>
  );
};

export default TracksSection;
