import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Cpu, Users, ArrowRight } from 'lucide-react';

const AboutHaevthon = () => {
  return (
    <section style={{ 
      padding: '120px 20px', 
      backgroundColor: '#000', 
      color: '#fff',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Background Decorative Element */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center' }}>
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              color: 'rgba(255,255,255,0.4)', 
              fontSize: '0.75rem', 
              fontWeight: 800, 
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '24px'
            }}>
              <Zap size={14} fill="currentColor" /> THE VISION
            </div>
            
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: 900, 
              lineHeight: 1, 
              marginBottom: '32px',
              letterSpacing: '-2px'
            }}>
              HAEVTHON: <span style={{ color: 'rgba(255,255,255,0.3)' }}>ARCHITECTING</span> AUTONOMY
            </h2>
            
            <p style={{ 
              fontSize: '1.15rem', 
              color: 'rgba(255,255,255,0.5)', 
              lineHeight: 1.6, 
              marginBottom: '40px',
              maxWidth: '540px',
              fontWeight: 300
            }}>
              Haevthon is the world's premier arena for Advanced Agentic Systems. We don't just build code; we orchestrate intelligence. Our mission is to empower the next generation of builders to move beyond static automation into the realm of truly autonomous agentic swarms.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Cpu size={16} color="rgba(255,255,255,0.6)" />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, letterSpacing: '0.5px' }}>AGENTIC CORE</h4>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>Building the foundational logic for autonomous AI agents that can think and act.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={16} color="rgba(255,255,255,0.6)" />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, letterSpacing: '0.5px' }}>SWARM INTELLIGENCE</h4>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>Exploring multi-agent collaboration where agents solve complex tasks together.</p>
              </div>
            </div>

            <motion.button 
              whileHover={{ x: 10 }}
              style={{
                marginTop: '48px',
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                padding: 0
              }}
            >
              LEARN MORE ABOUT OUR MISSION <ArrowRight size={18} />
            </motion.button>
          </motion.div>

          {/* Right Side: Visual Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
              position: 'relative',
              width: '100%',
              aspectRatio: '4/3',
              backgroundColor: '#050505'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop" 
                alt="Agentic Core" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
              />
              {/* Overlay Gradient */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))'
              }} />
            </div>

            {/* Floating Card - Now with True Glassmorphism and No Animation */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                padding: '28px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.12)',
                width: '300px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                zIndex: 2
              }}
            >
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                border: '1px solid rgba(255,255,255,0.2)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '16px',
                backgroundColor: 'rgba(255,255,255,0.05)'
              }}>
                <Target size={18} color="white" />
              </div>
              <h5 style={{ fontSize: '0.95rem', fontWeight: 900, marginBottom: '8px', letterSpacing: '1px', color: '#fff' }}>HAEVTHON 2026</h5>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontWeight: 300 }}>
                The definitive destination for pioneering agentic builders worldwide.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutHaevthon;
