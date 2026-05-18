import React from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
  Printer,
  ArrowRight,
  ChevronRight,
  Info,
  CheckCircle2,
  MessageSquare,
  Mail,
  Code,
  Zap,
  Target,
  ShieldCheck,
  HelpCircle,
  Award,
  BookOpen,
  ClipboardCheck,
  Globe,
  Coffee,
  Moon,
  Droplet,
  Users,
  ArrowLeft
} from 'lucide-react';
import { handbookData } from '../data/handbookData';
import { homeData } from '../data/homeData.jsx';
import { useLanguage } from '../context/LanguageContext';

const Handbook = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = React.useState('submission');
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1024);
  const [expandedGroup, setExpandedGroup] = React.useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navGroups = [
    {
      label: t('hb_group_hackathon'),
      items: [
        { id: 'intro', label: t('hb_nav_intro'), icon: <ArrowLeft size={16} /> },
        { id: 'essentials', label: t('hb_nav_essentials'), icon: <ArrowLeft size={16} /> },
        { id: 'tasks', label: t('hb_nav_tasks'), icon: <ArrowLeft size={16} /> },
      ]
    },
    {
      label: t('hb_group_unikorn'),
      items: [
        { id: 'unikorn-intro', label: t('hb_nav_unikorn_intro'), icon: <ArrowLeft size={16} /> },
        { id: 'unikorn-pmf', label: t('hb_nav_unikorn_pmf'), icon: <ArrowLeft size={16} /> },
        { id: 'unikorn-community', label: t('hb_nav_unikorn_community'), icon: <ArrowLeft size={16} /> },
        { id: 'unikorn-scaling', label: t('hb_nav_unikorn_scaling'), icon: <ArrowLeft size={16} /> },
      ]
    },
    {
      label: t('hb_group_technical'),
      items: [
        { id: 'rules', label: t('hb_nav_rules'), icon: <ArrowLeft size={16} /> },
        { id: 'submission_docs', label: t('hb_nav_submission'), icon: <ArrowLeft size={16} /> },
      ]
    },
    {
      label: t('hb_group_aevum'),
      items: [
        { id: 'solutions', label: t('hb_nav_solutions'), icon: <ArrowLeft size={16} /> },
        { id: 'tips', label: t('hb_nav_tips'), icon: <ArrowLeft size={16} /> },
      ]
    },
    {
      label: t('hb_group_verify'),
      items: [
        { id: 'checklist', label: t('hb_nav_checklist'), icon: <ArrowLeft size={16} /> },
      ]
    }
  ];

  const allNavItems = navGroups.flatMap(g => g.items);

  const isScrollingManually = React.useRef(false);
  const SCROLL_OFFSET = 150;

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);

    let scrollTimeout;
    const handleScroll = () => {
      if (isScrollingManually.current) return;

      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }

      scrollTimeout = window.requestAnimationFrame(() => {
        const sections = allNavItems.map(item => document.getElementById(item.id));
        const scrollPosition = window.scrollY + SCROLL_OFFSET + 50;

        for (let i = sections.length - 1; i >= 0; i--) {
          if (sections[i] && sections[i].offsetTop <= scrollPosition) {
            const newActiveId = allNavItems[i].id;
            if (activeSection !== newActiveId) {
              setActiveSection(newActiveId);

              const groupIdx = navGroups.findIndex(g => g.items.some(item => item.id === newActiveId));
              if (groupIdx !== -1 && expandedGroup !== groupIdx) {
                setExpandedGroup(groupIdx);
              }
            }
            break;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) window.cancelAnimationFrame(scrollTimeout);
    };
  }, [allNavItems, activeSection, expandedGroup]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      isScrollingManually.current = true;
      setActiveSection(id);

      const groupIdx = navGroups.findIndex(g => g.items.some(item => item.id === id));
      if (groupIdx !== -1) setExpandedGroup(groupIdx);

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - SCROLL_OFFSET;

      window.scrollTo({ top: offsetPosition, behavior: 'auto' });

      // Re-enable scroll spy after animation finishes
      setTimeout(() => {
        isScrollingManually.current = false;
      }, 1000);
    }
  };

  const SectionTitle = ({ children, subtitle }) => (
    <motion.div
      style={{ marginBottom: '80px' }}
    >
      <div style={{
        color: 'rgba(255,255,255,0.25)',
        fontSize: '0.7rem',
        fontWeight: 800,
        letterSpacing: '6px',
        textTransform: 'uppercase',
        marginBottom: '20px',
        fontFamily: "'JetBrains Mono', 'Courier New', monospace"
      }}>
        {subtitle}
      </div>
      <h2 style={{
        fontSize: isMobile ? '2.5rem' : '4rem',
        fontWeight: 950,
        color: 'rgba(255,255,255,0.9)',
        margin: 0,
        letterSpacing: '-4px',
        lineHeight: 1,
        fontFamily: "'Be Vietnam Pro', sans-serif",
        textTransform: 'uppercase'
      }}>
        {children}
      </h2>
    </motion.div>
  );

  const DocBlock = ({ children, style = {}, tag }) => (
    <div
      style={{
        padding: isMobile ? '24px 0' : '40px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'relative',
        ...style
      }}
    >
      {tag && (
        <div style={{
          position: 'absolute', top: '40px', right: 0,
          fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '0.65rem',
          color: 'rgba(255,255,255,0.2)', fontWeight: 800, letterSpacing: '2px'
        }}>
          [{tag}]
        </div>
      )}
      {children}
    </div>
  );

  const Callout = ({ title, children, icon: IconComp }) => (
    <div style={{
      padding: '32px',
      backgroundColor: 'rgba(255,255,255,0.02)',
      borderLeft: '2px solid rgba(255,255,255,0.9)',
      borderRadius: '4px',
      margin: '24px 0'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        {IconComp && <IconComp size={18} color="rgba(255,255,255,0.9)" />}
        <h4 style={{ fontSize: '1rem', fontWeight: 900, margin: 0, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{title}</h4>
      </div>
      <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  );



  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: 'rgba(255,255,255,0.9)', fontFamily: "'Inter', 'Be Vietnam Pro', sans-serif" }}>

      {/* SCROLL PROGRESS BAR */}
      <motion.div
        className="scroll-progress"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(to right, #fff, #333)',
          transformOrigin: '0%',
          scaleX,
          zIndex: 1000
        }}
      />

      {/* GLOBAL BACKGROUND FLOATING LOGOS */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {/* I2FLabs Logo - Middle Left */}
        <motion.div
          animate={{
            y: [0, 40, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ position: 'absolute', top: '40%', left: '-10%', width: '35vw', opacity: 0.015 }}
        >
          <img src="/assets/I2FLabs-logo.png" alt="" style={{ width: '100%', filter: 'grayscale(1)' }} />
        </motion.div>
      </div>

      <div style={{
        maxWidth: '1600px', margin: '0 auto', display: 'flex', alignItems: 'flex-start',
        gap: isMobile ? '0' : '40px', padding: isMobile ? '60px 24px' : '0 60px 100px',
        position: 'relative', zIndex: 1
      }}>
        {/* ROTATING CENTER DECORATOR */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            left: '75%', // Back to right divider line
            top: 0,
            bottom: 0,
            width: '1px',
            pointerEvents: 'none'
          }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              style={{
                position: 'fixed',
                top: '50%',
                left: 'calc(50% + 340px)',
                transform: 'translate(-50%, -50%)',
                width: '450px', 
                height: '450px',
                opacity: 0.2,
                zIndex: -1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img src="/assets/haevthon-logo.png" alt="" style={{ width: '360px', height: '360px' }} />
            </motion.div>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <main style={{
          flex: isMobile ? '1' : '7.5',
          minWidth: 0,
          borderRight: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
          paddingRight: isMobile ? '0' : '100px',
          paddingTop: isMobile ? '0' : '80px'
        }}>

          {/* HERO SECTION */}
          <section id="hero" style={{ marginBottom: '120px' }}>
            <motion.div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'rgba(255,255,255,0.3)', letterSpacing: '8px', textTransform: 'uppercase', marginBottom: '24px' }}>
                {t('hb_hero_manual')}
              </div>
              <h1 style={{
                fontSize: isMobile ? '4rem' : 'clamp(5rem, 12vw, 10rem)',
                fontWeight: 950,
                margin: 0,
                letterSpacing: '-8px',
                lineHeight: 0.8,
                color: 'rgba(255,255,255,0.9)'
              }}>
                <span className="shimmer-text">{t('hb_hero_title_top')}</span><br />
                <span style={{
                  fontSize: '0.22em',
                  letterSpacing: '12px',
                  fontWeight: 950,
                  color: 'rgba(255,255,255,0.5)',
                  display: 'block',
                  marginTop: '8px',
                  marginLeft: '-2px',
                  textTransform: 'uppercase'
                }}>
                  {t('hb_hero_title_bottom')}
                </span>
              </h1>
              <p style={{
                fontSize: '1.25rem',
                color: 'rgba(255,255,255,0.4)',
                maxWidth: '800px',
                lineHeight: 1.6,
                marginTop: '60px',
                fontWeight: 400,
                letterSpacing: '-0.2px'
              }}>
                {t('hb_hero_desc')}
              </p>


            </motion.div>
          </section>

          {/* INTRODUCTION CONTENT */}
          <section id="intro" style={{ marginBottom: '120px' }}>
            <motion.div>
              <SectionTitle subtitle="Event Definition">{t('hb_nav_intro')}</SectionTitle>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', marginTop: '60px' }}>
                <div style={{ padding: '0 0 60px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <h3 style={{ fontSize: '2rem', fontWeight: 950, marginBottom: '24px', letterSpacing: '-1.5px', color: '#fff' }}>{t(handbookData.essentials.essence.title)}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.2rem', lineHeight: 1.7, margin: 0, maxWidth: '900px' }}>{t(handbookData.essentials.essence.desc)}</p>
                </div>
                <div style={{ padding: '0 0 60px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <h3 style={{ fontSize: '2rem', fontWeight: 950, marginBottom: '24px', letterSpacing: '-1.5px', color: '#fff' }}>{t(handbookData.essentials.loop.title)}</h3>
                  
                  {/* HORIZONTAL STEP WORKFLOW */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isMobile ? '12px' : '20px',
                    margin: '40px 0',
                    overflowX: 'auto',
                    paddingBottom: '20px',
                    width: '100%'
                  }}>
                    {handbookData.essentials.loop.steps.map((stepKey, idx) => {
                      const StepIcon = [Target, Code, Zap, ShieldCheck, ClipboardCheck][idx];
                      return (
                        <React.Fragment key={idx}>
                          <motion.div
                            whileHover={{ opacity: 1, borderColor: 'rgba(255,255,255,0.35)', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            style={{
                              flex: '1',
                              minWidth: isMobile ? '240px' : '220px',
                              minHeight: '180px',
                              padding: '28px 24px',
                              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              borderRadius: '16px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              position: 'relative',
                              backdropFilter: 'blur(12px)',
                              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#fff'
                              }}>
                                <StepIcon size={20} />
                              </div>
                              <span style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '0.9rem',
                                fontWeight: 900,
                                color: 'rgba(255,255,255,0.25)',
                                letterSpacing: '1px'
                              }}>
                                0{idx + 1}
                              </span>
                            </div>
                            
                            <h4 style={{
                              fontSize: '1.2rem',
                              fontWeight: 900,
                              color: '#fff',
                              margin: '28px 0 0 0',
                              lineHeight: 1.4,
                              letterSpacing: '-0.3px'
                            }}>
                              {t(stepKey)}
                            </h4>
                          </motion.div>
                          
                          {idx < handbookData.essentials.loop.steps.length - 1 && (
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: 'rgba(255,255,255,0.02)',
                              border: '1px solid rgba(255,255,255,0.05)',
                              flexShrink: 0
                            }}>
                              <ArrowRight size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  <div style={{
                    padding: '28px 36px',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    borderLeft: '2px solid #fff',
                    borderRadius: '0 8px 8px 0',
                    marginTop: '20px'
                  }}>
                    <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.15rem', lineHeight: 1.7, margin: 0 }}>
                      {t(handbookData.essentials.loop.desc)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* ESSENTIALS & SURVIVAL */}
          <section id="essentials" style={{ marginBottom: '120px' }}>
            <SectionTitle subtitle="Survival Guide">{t(handbookData.essentials.title)}</SectionTitle>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
              {handbookData.essentials.survival.items.map((item, idx) => {
                const IconComp = {
                  coffee: Coffee,
                  moon: Moon,
                  droplet: Droplet,
                  users: Users
                }[item.icon];

                return (
                  <div key={idx} style={{
                    textAlign: 'center',
                    padding: '40px 24px',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.03)', marginBottom: '24px' }}>
                      {IconComp && <IconComp size={28} color="#fff" />}
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 950, marginBottom: '16px', letterSpacing: '-0.5px' }}>{t(item.title)}</h4>
                    <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: 0 }}>{t(item.desc)}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ACTION PLAN */}
          <section id="tasks" style={{ marginBottom: '120px' }}>
            <SectionTitle subtitle="Operational Timeline">{t(handbookData.hackathonTasks.title)}</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '32px' }}>
              {handbookData.hackathonTasks.list.map((task, idx) => (
                <div key={idx} style={{
                  padding: '32px',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '4px'
                }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 950, color: '#fff', marginBottom: '16px', fontFamily: "'JetBrains Mono', 'Courier New', monospace", letterSpacing: '-1px' }}>{task.time}</div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 950, marginBottom: '10px', letterSpacing: '-0.2px' }}>{t(task.title)}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: 0 }}>{t(task.desc)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* UNIKORN PHASE INTRODUCTION */}
          <section id="unikorn-intro" style={{ marginBottom: '120px' }}>
            <SectionTitle subtitle={t('hb_unikorn_subtitle_intro')}>{t(handbookData.unikornRound.introTitle)}</SectionTitle>
            <div style={{ padding: '0 0 60px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.2rem', lineHeight: 1.7, margin: '0 0 32px', maxWidth: '900px' }}>
                {t(handbookData.unikornRound.introDesc)}
              </p>
              <a
                href="https://unikorn.vn"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '16px 32px',
                  backgroundColor: '#fff', color: '#000', textDecoration: 'none', fontWeight: 900,
                  fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '4px'
                }}
              >
                {t('hb_unikorn_explore_btn')} <ArrowRight size={16} />
              </a>
            </div>
          </section>

          {/* UNIKORN PHASE - STAGE 1: PMF */}
          <section id="unikorn-pmf" style={{ marginBottom: '120px' }}>
            <SectionTitle subtitle={t(handbookData.unikornRound.subtitle)}>{t(handbookData.unikornRound.items[0].title)}</SectionTitle>
            <div style={{ padding: '0 0 48px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '2px', marginBottom: '16px' }}>
                [STAGE_01]
              </div>
              <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '900px' }}>{t(handbookData.unikornRound.items[0].desc)}</p>
              <div style={{
                padding: '24px 32px',
                backgroundColor: 'rgba(255,255,255,0.02)',
                borderLeft: '1px solid #fff',
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.6
              }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '8px', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Expert Advice:</strong>
                {t(handbookData.unikornRound.items[0].advice)}
              </div>
            </div>
          </section>

          {/* UNIKORN PHASE - STAGE 2: COMMUNITY */}
          <section id="unikorn-community" style={{ marginBottom: '120px' }}>
            <SectionTitle subtitle="Direct Engagement">{t(handbookData.unikornRound.items[1].title)}</SectionTitle>
            <div style={{ padding: '0 0 48px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '2px', marginBottom: '16px' }}>
                [STAGE_02]
              </div>
              <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '900px' }}>{t(handbookData.unikornRound.items[1].desc)}</p>
              <div style={{
                padding: '24px 32px',
                backgroundColor: 'rgba(255,255,255,0.02)',
                borderLeft: '1px solid #fff',
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.6
              }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '8px', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Expert Advice:</strong>
                {t(handbookData.unikornRound.items[1].advice)}
              </div>
            </div>
          </section>

          {/* UNIKORN PHASE - STAGE 3: SCALING */}
          <section id="unikorn-scaling" style={{ marginBottom: '120px' }}>
            <SectionTitle subtitle="Global Expansion">{t(handbookData.unikornRound.items[2].title)}</SectionTitle>
            <div style={{ padding: '0 0 48px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '2px', marginBottom: '16px' }}>
                [STAGE_03]
              </div>
              <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '900px' }}>{t(handbookData.unikornRound.items[2].desc)}</p>
              <div style={{
                padding: '24px 32px',
                backgroundColor: 'rgba(255,255,255,0.02)',
                borderLeft: '1px solid #fff',
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.6
              }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '8px', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Expert Advice:</strong>
                {t(handbookData.unikornRound.items[2].advice)}
              </div>
            </div>
          </section>

          {/* RULES SECTION */}
          <section id="rules" style={{ marginBottom: '120px' }}>
            <SectionTitle subtitle="Legal Framework">{t(handbookData.rules.title)}</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '32px 48px' }}>
              {handbookData.rules.list.map((rule) => (
                <DocBlock key={rule.id} style={{ padding: '24px 0' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '8px', color: '#fff' }}>{t(rule.title)}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{t(rule.desc)}</p>
                </DocBlock>
              ))}
            </div>
          </section>

          {/* SUBMISSION */}
          <section id="submission_docs" style={{ marginBottom: '120px' }}>
            <SectionTitle subtitle="Compliance Protocol">{t(handbookData.submission.title)}</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '40px' }}>
              {handbookData.submission.items.map((item, idx) => (
                <DocBlock key={idx}>
                  <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.4rem', fontWeight: 950, margin: '0 0 16px', letterSpacing: '-1px' }}>{t(item.title)}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: '24px', fontSize: '1rem' }}>{t(item.desc)}</p>
                      <div style={{
                        padding: '16px 20px',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        borderLeft: '1px solid #fff',
                        fontSize: '0.9rem',
                        fontFamily: "'JetBrains Mono', monospace"
                      }}>
                        <span style={{ color: '#fff', fontWeight: 500 }}>{t(item.requirement)}</span>
                      </div>
                    </div>
                  </div>
                </DocBlock>
              ))}
            </div>
          </section>

          {/* AGENTIC SOLUTIONS */}
          <section id="solutions" style={{ marginBottom: '120px' }}>
            <SectionTitle subtitle="Architectural Patterns">{t(handbookData.agenticSolutions.title)}</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {handbookData.agenticSolutions.list.map((item, idx) => (
                <div key={idx} style={{ padding: '0 0 32px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 950, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px', color: '#fff', letterSpacing: '-0.5px' }}>
                    {t(item.title)}
                  </h4>
                  <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: 0 }}>{t(item.desc)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PRO TIPS */}
          <section id="tips" style={{ marginBottom: '120px' }}>
            <SectionTitle subtitle="Strategic Advantage">{t(handbookData.proTips.title)}</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginTop: '40px' }}>
              {handbookData.proTips.list.map((tip, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <div style={{
                    fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)',
                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                    letterSpacing: '2px', marginBottom: '12px'
                  }}>
                    [{t(tip.tag)}]
                  </div>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 950, color: '#fff', marginBottom: '12px', letterSpacing: '-0.5px' }}>{t(tip.title)}</h4>
                  <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: 0, maxWidth: '850px' }}>{t(tip.desc)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FINAL CHECKLIST */}
          <section id="checklist" style={{ marginBottom: '120px' }}>
            <SectionTitle subtitle="Final Verification">{t(handbookData.finalChecklist.title)}</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
              {handbookData.finalChecklist.list.map((item, idx) => (
                <div key={idx} style={{ borderBottom: 'none' }}>
                  <label style={{
                    display: 'flex', alignItems: 'flex-start', gap: '24px', padding: '24px', backgroundColor: 'rgba(255,255,255,0.01)',
                    borderRadius: '8px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)',
                    height: '100%'
                  }} className="checklist-item">
                    <input type="checkbox" style={{ width: '22px', height: '22px', flexShrink: 0, accentColor: '#fff', cursor: 'pointer', marginTop: '3px' }} />
                    <div>
                      <div style={{ fontWeight: 950, fontSize: '1.15rem', color: '#fff', marginBottom: '6px', letterSpacing: '-0.2px' }}>{t(item.task)}</div>
                      <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.5 }}>{t(item.desc)}</div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </section>

        </main>

        {/* SIDEBAR NAVIGATION - MONOCHROME STYLE (RIGHT ALIGNED) */}
        {!isMobile && (
          <aside style={{
            flex: '2.5',
            height: 'fit-content',
            position: 'sticky',
            top: '0',
            zIndex: 10,
            minWidth: '250px',
            paddingTop: '40px',
            paddingLeft: '40px'
          }}>
            <div style={{ marginBottom: '60px', textAlign: 'right' }}>
              <div style={{ height: '2px', width: '32px', backgroundColor: 'rgba(255,255,255,0.9)', marginBottom: '16px', marginLeft: 'auto' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'rgba(255,255,255,0.9)', letterSpacing: '4px' }}>{t('hb_sidebar_title')}</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {navGroups.map((group, groupIdx) => {
                const isExpanded = expandedGroup === groupIdx;

                return (
                  <div key={groupIdx} style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                    <button
                      onClick={() => setExpandedGroup(isExpanded ? null : groupIdx)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px',
                        padding: '12px 20px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer',
                        textAlign: 'right'
                      }}
                    >
                      <span style={{
                        fontSize: '0.75rem', color: isExpanded ? '#fff' : 'rgba(255,255,255,0.3)',
                        fontWeight: 900, letterSpacing: '2.5px', textTransform: 'uppercase',
                        fontFamily: "'JetBrains Mono', 'Courier New', monospace"
                      }}>
                        {group.label}
                      </span>
                      <ChevronRight
                        size={14}
                        style={{
                          transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                          color: isExpanded ? '#fff' : 'rgba(255,255,255,0.2)'
                        }}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '2px', paddingBottom: '16px', paddingRight: '20px' }}
                        >
                          {group.items.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => scrollToSection(item.id)}
                              style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', padding: '12px 16px', borderRadius: '4px',
                                border: '1px solid transparent', cursor: 'pointer',
                                backgroundColor: 'transparent',
                                color: activeSection === item.id ? '#fff' : 'rgba(255,255,255,0.4)',
                                fontWeight: 500,
                                fontSize: '0.95rem', textAlign: 'right', position: 'relative'
                              }}
                            >
                              <span>{item.label}</span>
                              <span style={{ opacity: activeSection === item.id ? 1 : 0.3 }}>{item.icon}</span>
                              {activeSection === item.id && (
                                <div style={{ position: 'absolute', right: '-20px', width: '2px', height: '16px', backgroundColor: '#fff' }} />
                              )}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </aside>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .shimmer-text {
          background: linear-gradient(to right, #fff 20%, #888 40%, #888 60%, #fff 80%);
          background-size: 200% auto;
          color: #000;
          background-clip: text;
          text-fill-color: transparent;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 5s linear infinite;
        }
        @keyframes shimmer { to { background-position: 200% center; } }
        
        .checklist-item:hover {
          background-color: rgba(255,255,255,0.03) !important;
          border-color: rgba(255, 255, 255, 0.4) !important;
        }
        
        input[type="checkbox"] {
          appearance: none;
          background-color: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 4px;
          position: relative;
        }
        input[type="checkbox"]:checked {
          background-color: #fff;
          border-color: #fff;
        }
        input[type="checkbox"]:checked::after {
          content: '✓';
          position: absolute;
          color: black;
          font-size: 14px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}} />
    </div>
  );
};

export default Handbook;
