import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
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
  const { timeline } = homeData;
  const [expandedItem, setExpandedItem] = useState(null); // format: "phaseIndex-itemIndex"

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
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        
        {/* Central Vertical Axis */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '0',
          bottom: '0',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1) 15%, rgba(255,255,255,0.1) 85%, transparent)',
          transform: 'translateX(-50%)',
          zIndex: 1
        }}>
          <motion.div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, transparent, #fff, transparent)',
              opacity: 0.2
            }}
            animate={{ top: ['-100%', '100%'] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {timeline.phases.map((phase, phaseIdx) => {
            const isEven = phaseIdx % 2 === 0;
            const items = t(phase.itemsKey);
            const statusStyle = getStatusStyle(phase.status);
            const isActive = phase.status === 'active';
            const isDone = phase.status === 'done';
            
            return (
              <div 
                key={phaseIdx} 
                style={{ 
                  display: 'flex', 
                  justifyContent: isEven ? 'flex-start' : 'flex-end',
                  position: 'relative',
                  width: '100%'
                }}
              >
                {/* Node on Timeline */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '40px',
                  transform: 'translateX(-50%)',
                  zIndex: 2
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#000',
                    border: `2px solid ${isActive ? '#fff' : isDone ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    boxShadow: isActive ? '0 0 10px rgba(255,255,255,0.3)' : 'none'
                  }} />
                </div>

                {/* Phase Card */}
                <motion.div
                  initial={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{
                    width: 'calc(50% - 60px)',
                    padding: '40px',
                    backgroundColor: 'rgba(10, 10, 10, 0.9)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: isActive ? '0 30px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 112, 255, 0.1)' : 'none',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  {/* Refined Bolt.new style Blue Electron Border */}
                  {isActive && (
                    <>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '24px',
                        padding: '2px',
                        background: 'conic-gradient(from var(--angle), transparent 40%, #0070ff, #00f2ff, #0070ff, transparent 100%)',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        animation: 'rotate-angle 4s linear infinite',
                        zIndex: 1,
                        pointerEvents: 'none'
                      }} />
                      
                      {/* Inner Glow Trace */}
                      <div style={{
                        position: 'absolute',
                        inset: '0',
                        borderRadius: '24px',
                        border: '1px solid rgba(0, 112, 255, 0.15)',
                        boxShadow: 'inset 0 0 20px rgba(0, 112, 255, 0.05)',
                        zIndex: 1,
                        pointerEvents: 'none'
                      }} />
                    </>
                  )}

                  {/* Ambient Glow for Active Card */}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      top: '-20%',
                      left: '-20%',
                      width: '140%',
                      height: '140%',
                      background: 'radial-gradient(circle at center, rgba(0, 112, 255, 0.08) 0%, transparent 70%)',
                      zIndex: 0,
                      pointerEvents: 'none'
                    }} />
                  )}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ 
                          fontSize: '0.7rem', 
                          color: 'rgba(255,255,255,0.4)', 
                          fontWeight: 800, 
                          letterSpacing: '2px',
                          textTransform: 'uppercase'
                        }}>
                          {t(phase.dateKey)}
                        </span>
                        {phase.locationKey && (
                          <span style={{ 
                            fontSize: '0.7rem', 
                            color: 'rgba(255,255,255,0.5)', 
                            fontWeight: 700, 
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <MapPin size={10} />
                            {t(phase.locationKey)}
                          </span>
                        )}
                      </div>
                      
                      <div style={{
                        padding: '4px 12px',
                        borderRadius: '100px',
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color,
                        fontSize: '0.65rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        border: `1px solid ${statusStyle.border}`,
                        boxShadow: statusStyle.glow,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        {isActive && <motion.div 
                          animate={{ scale: [1, 1.4, 1] }} 
                          transition={{ duration: 1.5, repeat: Infinity }}
                          style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: statusStyle.color }}
                        />}
                        {statusStyle.label}
                      </div>
                    </div>
                    
                    <h3 style={{ 
                      fontSize: '1.8rem', 
                      fontWeight: 900, 
                      color: isActive ? '#fff' : isDone ? 'rgba(255,255,255,0.4)' : 'var(--primary-white)', 
                      marginBottom: '12px',
                      letterSpacing: '-1px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      {t(phase.titleKey)}
                      {isActive && <Zap size={20} fill="#fff" color="#fff" />}
                    </h3>

                    {phase.descKey && (
                      <p style={{ 
                        fontSize: '0.95rem', 
                        color: isActive ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)', 
                        lineHeight: 1.6,
                        marginBottom: '28px',
                        fontWeight: 300
                      }}>
                        {t(phase.descKey)}
                      </p>
                    )}

                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '6px',
                      paddingTop: '24px',
                      borderTop: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      {Array.isArray(items) && items.map((item, itemIdx) => {
                        const itemKey = `${phaseIdx}-${itemIdx}`;
                        const isExpanded = expandedItem === itemKey;
                        const isSpecial = item.isSpecial;
                        
                        return (
                          <div key={itemIdx} style={{ display: 'flex', flexDirection: 'column' }}>
                            <motion.div 
                              onClick={() => toggleExpand(phaseIdx, itemIdx)}
                              style={{ 
                                display: 'flex', 
                                gap: '20px', 
                                alignItems: 'center',
                                padding: '16px 20px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                opacity: (isExpanded || isSpecial) ? 1 : 0.8,
                                backgroundColor: isSpecial ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                                borderRadius: isSpecial ? '12px' : '8px',
                                border: isSpecial ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
                                marginBottom: '2px',
                                position: 'relative'
                              }}
                              className="timeline-item-row"
                            >
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '24px' }}>
                                <CheckCircle2 
                                  size={18} 
                                  color={isDone ? 'rgba(255,255,255,0.3)' : isActive ? '#fff' : 'rgba(255,255,255,0.1)'} 
                                />
                              </div>

                              <span style={{ 
                                fontSize: '0.9rem', 
                                color: isSpecial ? '#fff' : isActive ? '#fff' : 'rgba(255,255,255,0.4)', 
                                fontWeight: (isSpecial || isActive) ? 800 : 600,
                                minWidth: '80px',
                                letterSpacing: '0.5px',
                                fontFamily: 'monospace'
                              }}>
                                {item.time}
                              </span>
                              
                              <MarqueeTitle 
                                title={item.title} 
                                isSpecial={isSpecial} 
                                isActive={isActive} 
                                isDone={isDone} 
                                isExpanded={isExpanded} 
                              />
                              
                              <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ color: isSpecial ? '#fff' : 'rgba(255,255,255,0.2)', flexShrink: 0 }}
                              >
                                <ChevronDown size={14} />
                              </motion.div>
                            </motion.div>
                            
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                                  style={{ overflow: 'hidden' }}
                                >
                                  <div style={{ 
                                    paddingLeft: '64px', 
                                    paddingRight: '20px',
                                    paddingBottom: '20px',
                                    paddingTop: '8px',
                                    fontSize: '0.85rem',
                                    color: isSpecial ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.4)',
                                    lineHeight: 1.6,
                                    fontWeight: 300
                                  }}>
                                    {item.detail}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
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

        @media (max-width: 992px) {
          section { padding: 60px 20px !important; }
          div[style*="left: 50%"] { left: 20px !important; transform: none !important; }
          div[style*="justify-content"] { justify-content: flex-start !important; padding-left: 40px !important; }
          div[style*="width: calc(50% - 60px)"] { width: 100% !important; padding: 32px !important; }
          div[style*="left: 50%"][style*="zIndex: 2"] { left: -7px !important; transform: none !important; }
        }
      `}} />
    </section>
  );
};

export default TimelineSection;
