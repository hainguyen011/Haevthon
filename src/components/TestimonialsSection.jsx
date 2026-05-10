import React from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TestimonialsSection = () => {
  const { t } = useLanguage();

  const getInitials = (name) => {
    return name
      .split(' ')
      .filter(n => n.length > 0)
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const reviews = [
    { quote: t('testimonial1_quote'), author: t('testimonial1_author') },
    { quote: t('testimonial2_quote'), author: t('testimonial2_author') },
    { quote: t('testimonial3_quote'), author: t('testimonial3_author') },
    { quote: t('testimonial4_quote'), author: t('testimonial4_author') },
    { quote: t('testimonial5_quote'), author: t('testimonial5_author') },
    { quote: t('testimonial6_quote'), author: t('testimonial6_author') },
    { quote: t('testimonial7_quote'), author: t('testimonial7_author') },
    { quote: t('testimonial8_quote'), author: t('testimonial8_author') }
  ].map(r => ({ ...r, initials: getInitials(r.author) }));

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [isPaused, setIsPaused] = React.useState(false);
  
  const x = useMotionValue(0);
  const containerRef = React.useRef(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    if (containerRef.current) {
      setContainerWidth(containerRef.current.scrollWidth / 2);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [reviews]);

  useAnimationFrame(() => {
    if (isPaused || !containerWidth) return;
    
    let moveBy = -0.8; // Base speed
    if (isMobile) moveBy = -1.2;
    
    let currentX = x.get() + moveBy;
    
    // Infinite loop logic
    if (currentX <= -containerWidth) {
      currentX = 0;
    } else if (currentX > 0) {
      currentX = -containerWidth;
    }
    
    x.set(currentX);
  });

  // Duplicating for seamless loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section style={{ 
      padding: isMobile ? '80px 0' : '120px 0', 
      backgroundColor: '#000000',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', marginBottom: isMobile ? '40px' : '80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center' }}
        >
          <h2 style={{ 
            fontSize: isMobile ? '1.8rem' : '2.5rem', 
            fontWeight: 900, 
            textTransform: 'uppercase', 
            letterSpacing: isMobile ? '2px' : '4px',
            marginBottom: '16px'
          }}>
            {t('testimonial_title')}
          </h2>
          <div style={{ width: isMobile ? '40px' : '60px', height: '2px', background: 'var(--primary-white)', margin: '0 auto' }} />
        </motion.div>
      </div>

      <div 
        style={{ position: 'relative', cursor: isPaused ? 'grabbing' : 'grab' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
      >
        {/* Side Gradients */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: isMobile ? '50px' : '200px',
          height: '100%',
          background: 'linear-gradient(to right, #000 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: isMobile ? '50px' : '200px',
          height: '100%',
          background: 'linear-gradient(to left, #000 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }} />

        <motion.div
          ref={containerRef}
          drag="x"
          dragConstraints={{ 
            left: -containerWidth * 2, 
            right: 0 
          }}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={() => setIsPaused(false)}
          style={{
            display: 'flex',
            gap: isMobile ? '16px' : '30px',
            padding: isMobile ? '20px 0' : '40px 0',
            width: 'max-content',
            x: x // Linking to motion value
          }}
        >
          {duplicatedReviews.map((review, index) => (
            <div
              key={index}
              style={{
                flex: isMobile ? '0 0 300px' : '0 0 500px',
                padding: isMobile ? '30px' : '50px',
                backgroundColor: 'rgba(255,255,255,0.02)',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.05)',
                position: 'relative',
                userSelect: 'none'
              }}
            >
              <Quote 
                size={40} 
                style={{ 
                  position: 'absolute', 
                  top: '40px', 
                  right: '40px', 
                  color: 'rgba(255,255,255,0.03)' 
                }} 
              />
              
              <p style={{ 
                fontSize: isMobile ? '1rem' : '1.25rem', 
                fontStyle: 'italic', 
                lineHeight: 1.6, 
                color: 'rgba(255,255,255,0.8)',
                marginBottom: isMobile ? '24px' : '40px',
                minHeight: isMobile ? '100px' : '120px'
              }}>
                "{review.quote}"
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  color: 'var(--primary-white)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  {review.initials}
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-white)' }}>
                    {review.author}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Aevum Community
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
