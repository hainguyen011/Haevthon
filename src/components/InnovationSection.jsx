import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Cpu, Zap, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { homeData } from '../data/homeData.jsx';

const InnovationSection = () => {
  const { t } = useLanguage();
  const { innovation } = homeData;

  return (
    <section style={{ 
      minHeight: '100vh',
      padding: '120px 20px', 
      backgroundColor: '#000000',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center' }}>
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              color: 'rgba(255,255,255,0.5)', 
              fontSize: '0.75rem', 
              fontWeight: 800, 
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '32px',
              padding: '8px 16px',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '100px'
            }}>
              <Lightbulb size={14} /> {t(innovation.badgeKey)}
            </div>
            
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)', 
              fontWeight: 900, 
              lineHeight: 1.1, 
              marginBottom: '32px',
              letterSpacing: '-2px'
            }}>
              DRIVING THE <span style={{ color: 'rgba(255,255,255,0.3)' }}>INNOVATION</span> WAVE
            </h2>
            
            <p style={{ 
              fontSize: '1.1rem', 
              color: 'rgba(255,255,255,0.5)', 
              lineHeight: 1.7, 
              marginBottom: '48px',
              fontWeight: 300,
              maxWidth: '540px'
            }}>
              Vietnam is rapidly emerging as a global hub for AI development. Haevthon is designed to empower local talent to build world-class Agentic Solutions that redefine autonomy.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {[
                { icon: <Cpu size={20} />, title: "CATALYZING GROWTH", desc: "Hackathons are the engine of rapid prototyping, turning wild ideas into viable startups." },
                { icon: <Zap size={20} />, title: "VIETNAM'S AI ERA", desc: "With a booming tech ecosystem, Vietnam is rapidly becoming Southeast Asia's powerhouse." },
                { icon: <Globe size={20} />, title: "BUILDING THE FUTURE", desc: "Haevthon is a movement to empower the next generation of global builders." }
              ].map((item, index) => (
                <div key={index} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{ 
                    color: 'white', 
                    padding: '12px', 
                    backgroundColor: 'rgba(255,255,255,0.03)', 
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '6px', letterSpacing: '0.5px' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: High-Fidelity Thematic Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            style={{ 
              position: 'relative', 
              borderRadius: '32px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 50px 100px rgba(0,0,0,0.8)',
              aspectRatio: '0.85/1',
              backgroundColor: '#050505'
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop" 
              alt="Agentic AI Visualization" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                opacity: 0.8
              }} 
            />
            
            {/* Overlay Gradient */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
              pointerEvents: 'none'
            }} />

            {/* Floating Glass Stat */}
            <div style={{
              position: 'absolute',
              bottom: '40px',
              left: '40px',
              right: '40px',
              padding: '32px',
              backgroundColor: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '4.5rem', fontWeight: 900, color: 'white', lineHeight: 1, marginBottom: '8px' }}>92%</div>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Agree AI Agents are the Future of Tech
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
