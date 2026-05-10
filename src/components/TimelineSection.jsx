import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { homeData } from '../data/homeData.jsx';
import { CheckCircle2, MapPin, Zap, ChevronDown, Sparkles } from 'lucide-react';

const MarqueeTitle = ({ title, isSpecial, isActive, isDone, isExpanded }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [shouldMarquee, setShouldMarquee] = useState(false);

  const checkOverflow = () => {
    if (containerRef.current && textRef.current) {
      const hasOverflow = textRef.current.scrollWidth > containerRef.current.clientWidth;
      setShouldMarquee(hasOverflow);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [title]);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flex: 1,
        overflow: 'hidden',
        position: 'relative'
      }}
      className="title-container"
    >
      <span
        ref={textRef}
        style={{
          fontSize: '1.05rem',
          color: isSpecial ? '#fff' : isActive ? 'rgba(255,255,255,0.95)' : isDone ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.6)',
          fontWeight: (isExpanded || isSpecial) ? 600 : 300,
          textDecoration: isDone ? 'line-through' : 'none',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'inline-block',
          transition: 'all 0.3s ease'
        }}
        className={shouldMarquee ? "marquee-text" : ""}
      >
        {title}
      </span>

      {isSpecial && (
        <span style={{
          fontSize: '0.55rem',
          padding: '2px 6px',
          backgroundColor: '#fff',
          color: '#000',
          borderRadius: '4px',
          fontWeight: 900,
          letterSpacing: '0.5px',
          flexShrink: 0,
          position: 'relative',
          zIndex: 5
        }}>
          SPECIAL
        </span>
      )}
    </div>
  );
};

const TimelineSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { timeline } = homeData;
  const [expandedItem, setExpandedItem] = useState(null); // format: "phaseIndex-itemIndex"
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active':
        return {
          color: '#fff',
          bg: 'rgba(255, 255, 255, 0.15)',
          label: t('status_active'),
          glow: '0 0 20px rgba(255, 255, 255, 0.2)',
          border: 'rgba(255, 255, 255, 0.4)'
        };
      case 'done':
        return {
          color: 'rgba(255,255,255,0.4)',
          bg: 'rgba(255, 255, 255, 0.05)',
          label: t('status_done'),
          glow: 'none',
          border: 'rgba(255, 255, 255, 0.1)'
        };
      default:
        return {
          color: 'rgba(255,255,255,0.2)',
          bg: 'transparent',
          label: t('status_upcoming'),
          glow: 'none',
          border: 'rgba(255, 255, 255, 0.05)'
        };
    }
  };

  const toggleExpand = (phaseIdx, itemIdx) => {
    const key = `${phaseIdx}-${itemIdx}`;
    setExpandedItem(expandedItem === key ? null : key);
  };

  return (
    <section style={{
      padding: '100px 20px',
      backgroundColor: '#000',
      position: 'relative',
      overflow: 'visible',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>



        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '80px' : '150px',
          overflow: 'visible'
        }}>
          {timeline.phases.map((phase, phaseIdx) => {
            const isActive = phase.status === 'active';
            const isDone = phase.status === 'done';
            const items = t(phase.itemsKey);

            return (
              <div
                key={phaseIdx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '5.5fr 4.5fr',
                  gap: isMobile ? '40px' : '80px',
                  alignItems: 'flex-start',
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                {/* LEFT: Sticky Phase Info */}
                <div style={{ position: isMobile ? 'relative' : 'sticky', top: isMobile ? '0' : '120px' }}>
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    style={{
                      padding: isMobile ? '32px 24px' : '48px',
                      backgroundColor: 'rgba(10, 10, 10, 0.9)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderRadius: '24px',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: isActive ? '0 30px 60px rgba(0, 0, 0, 0.5)' : 'none',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    {/* Active Border Effect (Silver Electron) */}
                    {isActive && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '24px',
                        padding: '2px',
                        background: 'conic-gradient(from var(--angle), transparent 40%, #A855F7, #863BFF, #A855F7, transparent 100%)',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        animation: 'rotate-angle 4s linear infinite',
                        zIndex: 1,
                        pointerEvents: 'none'
                      }} />
                    )}

                    <div style={{ position: 'relative', zIndex: 2 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                          {t(phase.dateKey)}
                        </span>
                        <div style={{
                          padding: '6px 12px',
                          borderRadius: '100px',
                          backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${isActive ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.05)'}`,
                          fontSize: '0.65rem',
                          fontWeight: 900,
                          color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          {isActive ? t('status_active') : isDone ? t('status_done') : t('status_upcoming')}
                        </div>
                      </div>

                      <h3 style={{
                        fontSize: isMobile ? '1.5rem' : '2rem',
                        fontWeight: 900,
                        color: isActive ? '#fff' : isDone ? 'rgba(255,255,255,0.4)' : '#fff',
                        marginBottom: isMobile ? '16px' : '20px',
                        letterSpacing: '-1px',
                        lineHeight: 1.1
                      }}>
                        {t(phase.titleKey)}
                      </h3>

                      <p style={{
                        fontSize: '1rem',
                        color: 'rgba(255,255,255,0.5)',
                        lineHeight: 1.6,
                        fontWeight: 400
                      }}>
                        {t(phase.descKey)}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* RIGHT: Scrolling Events */}
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '32px' : '48px', paddingLeft: isMobile ? '24px' : '0' }}>
                    {Array.isArray(items) && items.map((item, itemIdx) => {
                      const itemKey = `${phaseIdx}-${itemIdx}`;
                      const isExpanded = expandedItem === itemKey;
                      const isSpecial = item.isSpecial;

                      return (
                        <div key={itemIdx} style={{ position: 'relative' }}>
                          <motion.div
                            onClick={() => toggleExpand(phaseIdx, itemIdx)}
                            style={{ cursor: 'pointer' }}
                          >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <div style={{
                                display: 'flex',
                                alignItems: 'baseline',
                                gap: '8px',
                                marginBottom: '2px'
                              }}>
                                <span style={{
                                  fontSize: '1.1rem',
                                  fontWeight: 900,
                                  color: (item.status === 'active') ? '#ffffff' : 'rgba(255,255,255,0.6)',
                                  letterSpacing: '0.5px',
                                  transition: 'color 0.3s ease'
                                }}>
                                  {item.date || t('not_announced')}
                                </span>
                                <span style={{
                                  fontSize: '0.75rem',
                                  color: (item.status === 'active') ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)',
                                  fontWeight: 700,
                                  fontFamily: 'monospace',
                                  letterSpacing: '1px',
                                  textTransform: 'uppercase'
                                }}>
                                  {item.time} {t('timezone')}
                                </span>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                                <h4 style={{
                                  fontSize: isMobile ? '1.1rem' : '1.4rem',
                                  color: (item.status === 'active') ? '#fff' : 'rgba(255,255,255,0.3)',
                                  fontWeight: 700,
                                  letterSpacing: '-0.5px',
                                  transition: 'color 0.3s ease'
                                }}>
                                  {item.title}
                                </h4>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  {item.status && (
                                    <div style={{
                                      fontSize: '0.65rem',
                                      fontFamily: 'monospace',
                                      fontWeight: 800,
                                      color: item.status === 'active' ? '#fff' : 'rgba(255,255,255,0.3)',
                                      letterSpacing: '1px',
                                      padding: '2px 6px',
                                      border: `1px solid ${item.status === 'active' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
                                      borderRadius: '2px',
                                      textTransform: 'uppercase'
                                    }}>
                                      {t(`status_${item.status}`)}
                                    </div>
                                  )}

                                  {isSpecial && (
                                    <div style={{
                                      padding: '4px 8px',
                                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                      border: '1px solid rgba(255, 255, 255, 0.2)',
                                      borderRadius: '4px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      opacity: (item.status === 'active') ? 1 : 0.3,
                                      transition: 'opacity 0.3s ease'
                                    }}>
                                      <span style={{ fontSize: '0.6rem', fontWeight: 900, color: '#ffffff', letterSpacing: '1px' }}>SPECIAL</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                style={{ overflow: 'hidden' }}
                              >
                                <div style={{
                                  paddingTop: '16px',
                                  fontSize: '1rem',
                                  color: 'rgba(255,255,255,0.4)',
                                  lineHeight: 1.7,
                                  fontWeight: 300,
                                  maxWidth: '600px'
                                }}>
                                  {item.detail}

                                  {item.showRegisterBtn && (
                                    <motion.div
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.2 }}
                                      style={{ marginTop: '24px' }}
                                    >
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          navigate('/register');
                                        }}
                                        style={{
                                          padding: '12px 32px',
                                          backgroundColor: '#fff',
                                          color: '#000',
                                          border: 'none',
                                          borderRadius: '100px',
                                          fontSize: '0.75rem',
                                          fontWeight: 800,
                                          letterSpacing: '1px',
                                          cursor: 'pointer',
                                          textTransform: 'uppercase'
                                        }}
                                      >
                                        {t('hero_cta_register')}
                                      </button>
                                    </motion.div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes rotate-angle {
          to { --angle: 360deg; }
        }

        .timeline-item-row:hover {
          opacity: 1 !important;
        }
        
        .timeline-item-row:hover .marquee-text {
          text-overflow: clip !important;
          animation: marquee 8s linear infinite;
          padding-right: 50px;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
};

export default TimelineSection;
