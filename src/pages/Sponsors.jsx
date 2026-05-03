import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, CheckCircle, Users, Trophy, Clock, Zap, Phone, MapPin, Globe } from 'lucide-react';
import { sponsorsData } from '../data/sponsorsData';
import { useLanguage } from '../context/LanguageContext';

const getWhySponsors = (t) => [
  { icon: <Users size={24} />, num: '500+', label: t('sponsors_why_label1'), desc: t('sponsors_why_desc1') },
  { icon: <Trophy size={24} />, num: '$10K+', label: t('sponsors_why_label2'), desc: t('sponsors_why_desc2') },
  { icon: <Clock size={24} />, num: '48H', label: t('sponsors_why_label3'), desc: t('sponsors_why_desc3') },
  { icon: <Zap size={24} />, num: '100%', label: t('sponsors_why_label4'), desc: t('sponsors_why_desc4') },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  }
};

const SponsorCard = ({ sponsor }) => {
  return (
    <motion.a
      href={sponsor.url}
      variants={itemVariants}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '10px 40px', minHeight: '80px', // Reduced height
        backgroundColor: 'transparent',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'visible',
        cursor: 'pointer',
      }}
      className="sponsor-card"
    >
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
        {sponsor.logo ? (
          <img
            src={sponsor.logo} alt={sponsor.name}
            style={{ 
              maxWidth: sponsor.featured ? '260px' : '200px', 
              maxHeight: '60px', // Tăng tối đa kích thước logo trong giới hạn chiều cao
              objectFit: 'contain', 
              opacity: 0.9, 
              filter: sponsor.id === 'i2flabs' ? 'brightness(0) invert(1)' : 'none',
              transition: 'all 0.3s ease'
            }}
            className="sponsor-logo"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
          />
        ) : null}
        <span 
          className="sponsor-name"
          style={{ 
            display: sponsor.logo ? 'none' : 'block', 
            color: 'rgba(255,255,255,0.4)', 
            fontSize: '1rem', 
            fontWeight: 800, 
            letterSpacing: '3px', 
            textTransform: 'uppercase',
            transition: 'color 0.3s ease'
          }}>
          {sponsor.name}
        </span>
      </div>
    </motion.a>
  );
};

const Sponsors = () => {
  const { t } = useLanguage();
  const whySponsors = getWhySponsors(t);
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
    
    // Add window resize listener to recalculate width
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingLeft: '80px', backgroundColor: '#000', color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}
    >
      {/* ── HERO ── */}
      <section style={{ padding: '100px 20px 120px', maxWidth: '1200px', margin: '0 auto', position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>

        <div style={{ flex: '1 1 300px', position: 'relative', zIndex: 1, paddingTop: '20px' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 800,
            letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '20px'
          }}>
            {t('sponsors_partnership_opp')}
          </div>

          <h1 style={{
            fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontWeight: 900,
            lineHeight: 0.9, letterSpacing: '-4px', marginBottom: '24px',
            textTransform: 'uppercase'
          }}>
            {t('sponsors_hero_title1')}<br />
            <span style={{ 
              background: 'linear-gradient(to right, #fff, rgba(255,255,255,0.3))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>{t('sponsors_hero_title2')}</span><br />
            {t('sponsors_hero_title3')}
          </h1>

          <p style={{
            fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6,
            maxWidth: '580px', fontWeight: 300, marginBottom: '32px'
          }}>
            {t('sponsors_hero_desc')}
          </p>

          <motion.a 
            href="#contact" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              padding: '18px 36px',
              backgroundColor: '#fff', color: '#000',
              borderRadius: '100px', fontWeight: 800, fontSize: '0.9rem',
              letterSpacing: '1px', textDecoration: 'none'
            }}
          >
            {t('sponsors_hero_btn')} <ArrowRight size={18} />
          </motion.a>
          </motion.div>
        </div>

        {/* Right side: Vector Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
          style={{ flex: '1 1 250px', display: 'flex', justifyContent: 'flex-end', position: 'relative', zIndex: 1 }}
        >
          <img 
            src="/assets/rocket.png" 
            alt="Agentic Revolution Graphic" 
            style={{ 
              width: '100%', 
              maxWidth: '500px', 
              objectFit: 'contain', 
              opacity: 0.85,
              transform: 'scale(1.3)',
              transformOrigin: 'center center',
              WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
              maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
            }} 
          />
        </motion.div>
      </section>

      {/* ── CURRENT SPONSORS MARQUEE (Auto Sliding) - FIXED BOTTOM ── */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '80px', // Offset for sidebar (Navbar width)
        right: 0,
        zIndex: 9999, // Layer trên cùng
        backgroundColor: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '100%', position: 'relative' }}>
          
          {/* Fading Edges */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '150px', height: '100%',
            background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, transparent 100%)', zIndex: 10,
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '150px', height: '100%',
            background: 'linear-gradient(to left, rgba(0,0,0,1) 0%, transparent 100%)', zIndex: 10,
            pointerEvents: 'none'
          }} />

          {/* Marquee Track */}
          <div 
            className="sponsor-marquee-track"
            style={{ 
              display: 'flex', 
              width: 'max-content',
              gap: '60px',
              padding: '10px 0' // Thinner padding for fixed bar
            }}
          >
            {/* Duplicated for infinite loop */}
            {[...sponsorsData, ...sponsorsData, ...sponsorsData].map((sponsor, index) => (
              <div key={`${sponsor.id}-${index}`} style={{ minWidth: '280px', display: 'flex', justifyContent: 'center' }}>
                <SponsorCard sponsor={sponsor} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ORGANIZERS & HOSTS ── */}
      <section style={{ padding: '100px 60px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '60px', textAlign: 'center' }}
          >
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('sponsors_hosted_by')}
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-2px' }}>
              {t('sponsors_org_committee')}
            </h2>
          </motion.div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px', justifyContent: 'center'
          }}>
            {/* Unikorn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                padding: '48px 40px', backgroundColor: 'transparent',
                border: 'none',
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
              }}
            >
              <img 
                src="/assets/unikorn-logo.png" 
                alt="Unikorn Logo" 
                style={{ 
                  maxHeight: '100px', 
                  marginBottom: '24px',
                  objectFit: 'contain'
                }} 
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
              />
              <div style={{ display: 'none', width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', marginBottom: '24px', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '1.2rem' }}>UKN</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>UNIKORN</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 300 }}>
                {t('sponsors_unikorn_desc')}
              </p>
            </motion.div>

            {/* I2FLabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                padding: '48px 40px', backgroundColor: 'transparent',
                border: 'none',
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
              }}
            >
              <img 
                src="/assets/I2FLabs-logo.png" 
                alt="I2FLabs Logo" 
                style={{ 
                  maxHeight: '100px', 
                  marginBottom: '24px',
                  objectFit: 'contain'
                }} 
              />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>I2FLABS</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 300 }}>
                {t('sponsors_i2flabs_desc')}
              </p>
            </motion.div>

            {/* Aevum Plan Manager */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                padding: '48px 40px', backgroundColor: 'transparent',
                border: 'none',
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
              }}
            >
              <img 
                src="/assets/aevum-logo.png" 
                alt="Aevum Plan Manager Logo" 
                style={{ 
                  maxHeight: '100px', 
                  marginBottom: '24px',
                  objectFit: 'contain'
                }} 
              />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>AEVUM PLAN MANAGER</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 300 }}>
                {t('sponsors_aevum_desc')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SHARED VISION / OBJECTIVE ── */}
      <section style={{ padding: '100px 60px', borderTop: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('sponsors_obj_title')}
            </div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-2px', marginBottom: '24px', lineHeight: 1.1 }}>
              {t('sponsors_obj_heading')}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', lineHeight: 1.7, fontWeight: 300 }}>
              {t('sponsors_obj_desc')}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {[
              { title: t('sponsors_obj_list1_title'), desc: t('sponsors_obj_list1_desc'), num: '01' },
              { title: t('sponsors_obj_list2_title'), desc: t('sponsors_obj_list2_desc'), num: '02' },
              { title: t('sponsors_obj_list3_title'), desc: t('sponsors_obj_list3_desc'), num: '03' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <div style={{ color: 'rgba(255,255,255,0.15)', fontSize: '3rem', fontWeight: 900, lineHeight: 0.8, letterSpacing: '-2px' }}>
                  {item.num}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.6, fontWeight: 300 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY SPONSOR ── */}
      <section style={{ padding: '100px 60px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '60px' }}
          >
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('sponsors_stats_title')}
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-2px' }}>
              {t('sponsors_why_title')}
            </h2>
          </motion.div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px'
          }}>
            {whySponsors.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                style={{ 
                  background: 'rgba(255,255,255,0.01)', 
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '24px',
                  display: 'flex', flexDirection: 'column',
                  position: 'relative', overflow: 'hidden',
                  minHeight: '380px',
                  transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
                }}
                whileHover={{ 
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.15)',
                  y: -10,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                }}
              >
                {/* Image/Gradient Header with Blur Bottom Blend */}
                <div style={{
                  width: '100%',
                  height: '40%',
                  position: 'absolute',
                  top: 0, left: 0,
                  overflow: 'hidden',
                  maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 70%)',
                  zIndex: 0
                }}>
                  {/* Additional tech grid or abstract element could go here */}
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
                  letterSpacing: '1px',
                  zIndex: 2
                }}>
                  0{i + 1}
                </div>

                <div style={{ padding: '40px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
                  <div style={{ 
                    width: '56px', height: '56px', borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    {item.icon}
                  </div>
                  
                  <div style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1, marginBottom: '8px' }}>
                    {item.num}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
                    {item.label}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontWeight: 300 }}>
                    {item.desc}
                  </p>

                  {/* Footer Line */}
                  <div style={{ 
                    marginTop: 'auto', 
                    paddingTop: '24px',
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    color: 'rgba(255,255,255,0.15)', 
                    fontSize: '0.7rem', 
                    fontWeight: 800, 
                    letterSpacing: '2px' 
                  }}>
                    <div style={{ width: '24px', height: '1px', background: 'currentColor' }} />
                    HAEVTHON 2026
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="contact" style={{ padding: '80px 40px 120px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', alignItems: 'start' }}>

          {/* Left: Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('sponsors_contact_title')}
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-2px', marginBottom: '16px', lineHeight: 1.1 }}>
              {t('sponsors_contact_heading1')}<br />
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>{t('sponsors_contact_heading2')}</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.6, fontWeight: 300, marginBottom: '32px', maxWidth: '420px' }}>
              {t('sponsors_contact_desc')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Mail size={20} />
                <span style={{ fontSize: '1rem', fontWeight: 500 }}>{t('contact_email')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Phone size={20} />
                <span style={{ fontSize: '1rem', fontWeight: 500 }}>{t('contact_phone')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <MapPin size={20} />
                <span style={{ fontSize: '1rem', fontWeight: 500 }}>{t('contact_address')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Globe size={20} />
                <a href={`https://${t('contact_website')}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}>
                  {t('contact_website')}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{
              padding: '40px', backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px'
            }}>
              {submitted ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{ textAlign: 'center', padding: '20px 0' }}
                >
                  <CheckCircle size={48} style={{ margin: '0 auto 24px', color: 'rgba(255,255,255,0.8)' }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '12px' }}>{t('sponsors_form_success_title')}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                    {t('sponsors_form_success_desc')}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 180px' }}>
                      <label style={{
                        display: 'block', fontSize: '0.72rem', fontWeight: 800,
                        letterSpacing: '2px', textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.4)', marginBottom: '8px'
                      }}>
                        {t('sponsors_form_name')}
                      </label>
                      <input
                        type="text" required placeholder={t('sponsors_form_name_ph')}
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        className="compact-input"
                      />
                    </div>
                    
                    <div style={{ flex: '1 1 180px' }}>
                      <label style={{
                        display: 'block', fontSize: '0.72rem', fontWeight: 800,
                        letterSpacing: '2px', textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.4)', marginBottom: '8px'
                      }}>
                        {t('sponsors_form_email')}
                      </label>
                      <input
                        type="email" required placeholder={t('sponsors_form_email_ph')}
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        className="compact-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{
                      display: 'block', fontSize: '0.72rem', fontWeight: 800,
                      letterSpacing: '2px', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.4)', marginBottom: '8px'
                    }}>
                      {t('sponsors_form_company')}
                    </label>
                    <input
                      type="text" placeholder={t('sponsors_form_company_ph')}
                      value={form.company}
                      onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                      className="compact-input"
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block', fontSize: '0.72rem', fontWeight: 800,
                      letterSpacing: '2px', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.4)', marginBottom: '8px'
                    }}>
                      {t('sponsors_form_interest')}
                    </label>
                    <textarea
                      required rows={3}
                      placeholder={t('sponsors_form_interest_ph')}
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      className="compact-input"
                      style={{ resize: 'vertical', lineHeight: 1.5 }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, backgroundColor: '#e0e0e0' }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: '14px 24px',
                      backgroundColor: '#fff', color: '#000',
                      border: 'none', borderRadius: '12px',
                      fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px',
                      cursor: 'pointer', fontFamily: 'inherit',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      marginTop: '8px'
                    }}
                  >
                    {t('sponsors_form_submit')} <ArrowRight size={18} />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .sponsor-card:hover .sponsor-logo {
          opacity: 1 !important;
          transform: scale(1.1);
        }
        .sponsor-card:hover .sponsor-name {
          color: #fff !important;
        }
        
        /* Auto Sliding Animation */
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        
        .sponsor-marquee-track {
          animation: scroll 30s linear infinite;
        }
        
        .sponsor-marquee-track:hover {
          animation-play-state: paused;
        }

        .compact-input {
          width: 100%;
          padding: 12px 16px;
          background-color: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: #fff;
          font-size: 0.95rem;
          outline: none;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.3s, background-color 0.3s;
        }
        .compact-input:focus {
          border-color: rgba(255,255,255,0.5);
          background-color: rgba(255,255,255,0.05);
        }
      `}} />
    </motion.div>
  );
};

export default Sponsors;
