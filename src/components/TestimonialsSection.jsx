import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TestimonialsSection = () => {
  const { t } = useLanguage();

  const reviews = [
    {
      quote: t('testimonial1_quote'),
      author: t('testimonial1_author'),
      initials: 'AA'
    },
    {
      quote: t('testimonial2_quote'),
      author: t('testimonial2_author'),
      initials: 'SB'
    },
    {
      quote: t('testimonial3_quote'),
      author: t('testimonial3_author'),
      initials: 'DS'
    },
    {
      quote: t('testimonial4_quote'),
      author: t('testimonial4_author'),
      initials: 'OC'
    }
  ];

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

      <div style={{ position: 'relative' }}>
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
          animate={{
            x: ['0%', '-50%']
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: isMobile ? 30 : 50,
              ease: "linear",
            },
          }}
          style={{
            display: 'flex',
            gap: isMobile ? '16px' : '30px',
            padding: isMobile ? '20px 0' : '40px 0'
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
                position: 'relative'
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
