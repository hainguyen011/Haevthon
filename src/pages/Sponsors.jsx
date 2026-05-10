import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, CheckCircle, Users, Trophy, Clock, Zap, Phone, MapPin, Globe, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';
import { sponsorsData } from '../data/sponsorsData';
import { useLanguage } from '../context/LanguageContext';

const getWhySponsors = (t) => [
  { icon: <Users size={24} />, num: '500+', label: t('sponsors_why_label1'), desc: t('sponsors_why_desc1') },
  { icon: <Trophy size={24} />, num: 'MVP', label: t('sponsors_why_label2'), desc: t('sponsors_why_desc2') },
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

const SponsorCard = ({ sponsor, tier }) => {
  const { t } = useLanguage();
  const isDiamond = tier === 'DIAMOND';
  const isGold = tier === 'GOLD';

  return (
    <motion.a
      href={sponsor.url}
      variants={itemVariants}
      whileHover={{ y: -5 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isDiamond ? '40px' : isGold ? '30px' : '20px',
        minHeight: isDiamond ? '180px' : isGold ? '140px' : '100px',
        backgroundColor: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '24px',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
      }}
      className="sponsor-card-v2"
    >
      {/* Glow Effect for Diamond */}
      {isDiamond && (
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none'
        }} />
      )}

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', gap: '16px' }}>
        {sponsor.logo ? (
          <img
            src={sponsor.logo} alt={sponsor.name}
            style={{
              maxWidth: isDiamond ? '240px' : isGold ? '180px' : '140px',
              maxHeight: isDiamond ? '80px' : isGold ? '60px' : '40px',
              objectFit: 'contain',
              opacity: 0.8,
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
            fontSize: isDiamond ? '1.5rem' : '1.1rem',
            fontWeight: 900,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            textAlign: 'center'
          }}>
          {sponsor.name}
        </span>

        {sponsor.id === 'unikorn' && (
          <div style={{
            padding: '4px 12px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '100px',
            fontSize: '0.6rem',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginTop: '8px'
          }}>
            {t('spiritual_sponsor')}
          </div>
        )}

        {sponsor.industry && sponsor.id !== 'unikorn' && (
          <span style={{
            fontSize: '0.6rem',
            fontWeight: 800,
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            {sponsor.industry}
          </span>
        )}
      </div>
    </motion.a>
  );
};

const Sponsors = () => {
  const { t, language } = useLanguage();
  const whySponsors = getWhySponsors(t);
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeQuote, setActiveQuote] = useState(0);

  const testimonials = [
    { text: t('sponsors_quote1_text'), author: t('sponsors_quote1_author'), org: t('sponsors_quote1_org') },
    { text: t('sponsors_quote2_text'), author: t('sponsors_quote2_author'), org: t('sponsors_quote2_org') },
    { text: t('sponsors_quote3_text'), author: t('sponsors_quote3_author'), org: t('sponsors_quote3_org') }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % testimonials.length);
    }, 12000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };

    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }

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
      style={{
        backgroundColor: '#000',
        color: '#fff',
        minHeight: '100vh',
        paddingBottom: '80px'
      }}
    >
      {/* ── HERO ── */}
      <section style={{
        padding: isMobile ? '80px 24px 60px' : '100px 20px 120px',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'flex-start',
        justifyContent: 'space-between',
        gap: isMobile ? '60px' : '40px'
      }}>

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
              fontSize: isMobile ? '2.8rem' : 'clamp(3.5rem, 8vw, 7rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-1.5px',
              marginBottom: '24px',
              textTransform: 'uppercase',
              textAlign: 'left'
            }}>
              <span style={{ display: 'block', whiteSpace: 'nowrap', padding: '0.05em 0' }}>{t('sponsors_hero_title1')}</span>
              <span style={{
                display: 'block',
                whiteSpace: 'nowrap',
                background: 'linear-gradient(to right, #fff, rgba(255,255,255,0.3))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                padding: '0.05em 0'
              }}>{t('sponsors_hero_title2')}</span>
              <span style={{
                display: 'block',
                whiteSpace: 'nowrap',
                background: 'linear-gradient(to right, #A855F7, #6366F1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                padding: '0.05em 0'
              }}>{t('sponsors_hero_title3')}</span>
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
        {!isMobile && (
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
              }}
            />
          </motion.div>
        )}
      </section>

      {/* ── ORGANIZERS & HOSTS ── */}
      {/* ── STICKY MARQUEE ── */}
      <div style={{
        position: 'sticky',
        top: 0,
        left: 0,
        width: '100%',
        height: '80px',
        backgroundColor: 'rgba(0,0,0,0.95)',
        backdropFilter: 'blur(15px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        zIndex: 1000
      }}>
        <div
          className="sponsor-marquee-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '80px',
            padding: 0,
            whiteSpace: 'nowrap'
          }}
        >
          {[...sponsorsData, ...sponsorsData, ...sponsorsData, ...sponsorsData].map((sponsor, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                style={{
                  height: '40px',
                  opacity: 0.6,
                  filter: ['i2flabs', 'cursor'].includes(sponsor.id) ? 'brightness(0) invert(1)' : 'none',
                  transition: 'opacity 0.3s ease'
                }}
              />
              <span style={{
                fontSize: '0.9rem',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: '3px',
                textTransform: 'uppercase'
              }}>
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ paddingLeft: isMobile ? '0' : '80px' }}>
        {/* All content below is padded to make room for sidebar */}

        <section style={{ padding: isMobile ? '60px 24px 0' : '100px 60px 0' }}>
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
              <h2 style={{
                fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 900,
                letterSpacing: isMobile ? '-1px' : '-2px',
                lineHeight: 1.1,
                marginTop: isMobile ? '8px' : '0'
              }}>
                {t('sponsors_org_committee')}
              </h2>
            </motion.div>

            {isMobile ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                {[
                  { src: "/assets/unikorn-logo.png", name: "UNIKORN" },
                  { src: "/assets/I2FLabs-logo.png", name: "I2FLABS" },
                  { src: "/assets/aevum-logo.png", name: "AEVUM" }
                ].map((org, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <img src={org.src} alt={org.name} style={{ height: isMobile ? '45px' : '60px', maxWidth: '100%', objectFit: 'contain' }} />
                    <span style={{
                      fontSize: isMobile ? '0.65rem' : '0.8rem',
                      fontWeight: 900,
                      color: 'rgba(255,255,255,0.3)',
                      letterSpacing: '1.5px'
                    }}>{org.name}</span>
                  </div>
                ))}
              </div>
            ) : (
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
                  />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>UNIKORN</h3>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 300, marginBottom: '20px' }}>
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
            )}
          </div>
        </section>

        {/* ── SHARED VISION / OBJECTIVE ── */}
        <section style={{ padding: isMobile ? '60px 24px' : '100px 60px', borderTop: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: isMobile ? '40px' : '80px',
            alignItems: 'center'
          }}>
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
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}
            >
              {[
                { title: t('sponsors_obj_list1_title'), desc: t('sponsors_obj_list1_desc'), num: '01' },
                { title: t('sponsors_obj_list2_title'), desc: t('sponsors_obj_list2_desc'), num: '02' },
                { title: t('sponsors_obj_list3_title'), desc: t('sponsors_obj_list3_desc'), num: '03' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  style={{ display: 'flex', gap: '0px', alignItems: 'center' }}
                >
                  <div
                    className="number-gradient"
                    style={{
                      fontSize: isMobile ? '3rem' : '5rem',
                      minWidth: isMobile ? '60px' : '120px',
                      textAlign: 'center',
                      opacity: 0.6,
                      fontWeight: 900
                    }}
                  >
                    {item.num}
                  </div>
                  <div className="vision-text-block">
                    <h3 style={{
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      color: '#fff'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      color: 'rgba(255,255,255,0.4)',
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      fontWeight: 300,
                      maxWidth: '450px'
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── WHY SPONSOR ── */}
        <section style={{ padding: isMobile ? '60px 24px' : '100px 60px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
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
                    border: '1px solid rgba(255,255,255,0.03)',
                    borderRadius: '20px',
                    display: 'flex', flexDirection: 'column',
                    position: 'relative', overflow: 'hidden',
                    minHeight: isMobile ? '300px' : '380px',
                    transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    borderColor: 'rgba(255,255,255,0.15)',
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
                    zIndex: 0
                  }}>
                    {/* Additional tech grid or abstract element could go here */}
                  </div>

                  {/* ID Badge */}


                  <div style={{ padding: '40px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>
                      {item.label}
                    </div>
                    <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontWeight: 300 }}>
                      {item.desc}
                    </p>

                    {/* Moderate Centered Text (Fills the gap) */}
                    <div style={{
                      margin: 'auto 0',
                      fontSize: '5rem',
                      fontWeight: 900,
                      letterSpacing: '-2px',
                      lineHeight: 1,
                      color: '#fff',
                      textAlign: 'center',
                      userSelect: 'none',
                      pointerEvents: 'none',
                      fontFamily: 'Outfit, sans-serif',
                      opacity: 0.3,
                      transition: 'all 0.5s ease'
                    }} className="card-bg-text">
                      {item.num}
                    </div>

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
                      HAEVTHON 2026
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MEDIA & REACH ── */}
        <section style={{ padding: isMobile ? '80px 24px' : '120px 60px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '80px' }}
            >
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>
                {t('sponsors_media_title')}
              </div>
              <h2 className="metallic-text" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-3px' }}>
                {t('sponsors_media_heading')}
              </h2>
            </motion.div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '40px'
            }}>
              {[
                { num: t('sponsors_media_stat1_num'), label: t('sponsors_media_stat1_label'), desc: t('sponsors_media_stat1_desc') },
                { num: t('sponsors_media_stat2_num'), label: t('sponsors_media_stat2_label'), desc: t('sponsors_media_stat2_desc') },
                { num: t('sponsors_media_stat3_num'), label: t('sponsors_media_stat3_label'), desc: t('sponsors_media_stat3_desc') }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ textAlign: 'center', position: 'relative' }}
                >
                  <div className="number-gradient" style={{ fontSize: '5rem', fontWeight: 900, marginBottom: '10px' }}>
                    {stat.num}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
                    {stat.label}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', maxWidth: '280px', margin: '0 auto', lineHeight: 1.6 }}>
                    {stat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TALENT PIPELINE (Large Bento Grid Redesign) ── */}
        <section style={{ padding: isMobile ? '80px 24px' : '140px 60px', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gridAutoRows: isMobile ? 'auto' : '320px',
              gap: '24px'
            }}>

              {/* Card 1: Main Title & Description (Large 2x2) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                style={{
                  gridColumn: isMobile ? 'auto' : 'span 2',
                  gridRow: isMobile ? 'auto' : 'span 2',
                  padding: isMobile ? '40px 30px' : '60px',
                  background: 'rgba(255, 255, 255, 0.01)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  letterSpacing: '5px',
                  textTransform: 'uppercase',
                  marginBottom: '24px',
                  fontFamily: "'Be Vietnam Pro', sans-serif"
                }}>
                  {t('sponsors_talent_title')}
                </div>
                <h2 style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                  fontWeight: 900,
                  letterSpacing: '-2px',
                  lineHeight: 1,
                  marginBottom: '32px',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  color: '#fff'
                }}>
                  {t('sponsors_talent_heading')}
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.7,
                  fontWeight: 300,
                  maxWidth: '500px',
                  fontFamily: "'Be Vietnam Pro', sans-serif"
                }}>
                  {t('sponsors_talent_desc')}
                </p>
              </motion.div>

              {/* Card 2: AI Architects (2x1) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                style={{
                  gridColumn: isMobile ? 'auto' : 'span 2',
                  padding: '40px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    {t('sponsors_talent_card1_title')}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', maxWidth: '400px', lineHeight: 1.6, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    {t('sponsors_talent_card1_desc')}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                  {['LAM', 'MULTI-AGENT', 'ORCHESTRATION'].map((tag, i) => (
                    <span key={i} style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1px', color: 'rgba(255,255,255,0.2)' }}>{tag}</span>
                  ))}
                </div>
              </motion.div>

              {/* Card 3: Fullstack Pioneers (1x1) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                style={{
                  padding: '40px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>{t('sponsors_talent_card2_title')}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, fontFamily: "'Be Vietnam Pro', sans-serif" }}>{t('sponsors_talent_card2_desc')}</p>
                </div>
              </motion.div>

              {/* Card 4: Product Visionaries (1x1) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                style={{
                  padding: '40px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>{t('sponsors_talent_card3_title')}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, fontFamily: "'Be Vietnam Pro', sans-serif" }}>{t('sponsors_talent_card3_desc')}</p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── PARTNER TESTIMONIALS ── */}
        <section style={{ padding: isMobile ? '80px 24px' : '100px 60px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              padding: isMobile ? '40px 30px' : '80px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              minHeight: isMobile ? '400px' : '480px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '32px', position: 'relative', zIndex: 10 }}>
                {t('sponsors_quote_title')}
              </div>

              <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Left Control */}
                {!isMobile && (
                  <button
                    onClick={() => setActiveQuote((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                    style={{
                      position: 'absolute',
                      left: '-20px',
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255,255,255,0.2)',
                      cursor: 'pointer',
                      padding: '10px',
                      zIndex: 20,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#fff'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.2)'}
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeQuote}
                    initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                    transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                    style={{ position: 'relative', zIndex: 5, width: '100%' }}
                  >
                    <blockquote style={{
                      fontSize: 'clamp(1.1rem, 2.5vw, 2rem)',
                      fontWeight: 500,
                      fontStyle: 'normal',
                      lineHeight: 1.5,
                      color: 'rgba(255,255,255,0.9)',
                      marginBottom: '40px',
                      fontFamily: 'Inter, sans-serif',
                      maxWidth: '850px',
                      margin: '0 auto 40px'
                    }}>
                      "{testimonials[activeQuote].text}"
                    </blockquote>
                    <cite style={{ fontStyle: 'normal' }}>
                      <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{testimonials[activeQuote].author}</div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.3)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '6px' }}>{testimonials[activeQuote].org}</div>
                    </cite>
                  </motion.div>
                </AnimatePresence>

                {/* Right Control */}
                {!isMobile && (
                  <button
                    onClick={() => setActiveQuote((prev) => (prev + 1) % testimonials.length)}
                    style={{
                      position: 'absolute',
                      right: '-20px',
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255,255,255,0.2)',
                      cursor: 'pointer',
                      padding: '10px',
                      zIndex: 20,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#fff'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.2)'}
                  >
                    <ChevronRight size={24} />
                  </button>
                )}
              </div>

              {/* Slider Navigation Dots */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '48px',
                position: 'relative',
                zIndex: 10
              }}>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveQuote(index)}
                    style={{
                      width: activeQuote === index ? '24px' : '6px',
                      height: '2px',
                      background: activeQuote === index ? '#fff' : 'rgba(255,255,255,0.1)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                      padding: 0
                    }}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM ── */}
        <section id="contact" style={{ padding: isMobile ? '60px 24px 100px' : '80px 40px 120px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: isMobile ? '40px' : '40px',
            alignItems: 'start'
          }}>

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
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .sponsor-card:hover .sponsor-logo {
          opacity: 1 !important;
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
        @keyframes scroll-org {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 5)); }
        }
        
        .organizer-marquee-track {
          animation: scroll-org 20s linear infinite;
        }
      `}} />
    </motion.div>
  );
};

export default Sponsors;
