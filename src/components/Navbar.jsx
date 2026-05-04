import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Home, Clock, Zap, Award, Menu, X, Globe } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { t, language, toggleLanguage } = useLanguage();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { to: '/', label: t('nav_home'), icon: <Home size={20} />, active: location.pathname === '/' },
    { to: '/timeline', label: t('nav_timeline'), icon: <Clock size={20} />, active: location.pathname === '/timeline' },
    { to: '/register', label: t('nav_register'), icon: <Zap size={20} />, active: location.pathname === '/register' },
    { to: '/sponsors', label: t('nav_sponsors'), icon: <Award size={20} />, active: location.pathname === '/sponsors' }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  // Desktop Sidebar
  if (!isMobile) {
    return (
      <motion.nav
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '60px 0',
          zIndex: 1000,
          backgroundColor: '#000000',
          borderRight: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <motion.div whileHover={{ scale: 1.1 }}>
            <svg width="32" height="31" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="#863BFF" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" />
            </svg>
          </motion.div>
        </Link>

        <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                color: item.active ? 'var(--primary-white)' : 'rgba(255,255,255,0.3)',
                textDecoration: 'none',
                transform: 'rotate(-90deg)',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
                letterSpacing: '4px',
                fontSize: '0.75rem',
                fontWeight: 800,
                transition: 'all 0.3s'
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <button onClick={toggleLanguage} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 800 }}>
            {language.toUpperCase()}
          </button>
          <img src="/assets/aevum-logo.png" alt="Aevum" style={{ width: '40px', opacity: 0.5, filter: 'brightness(0) invert(1)' }} />
        </div>
      </motion.nav>
    );
  }

  // Mobile Header
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '80px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
          zIndex: 2000,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Link to="/" onClick={() => setIsOpen(false)}>
          <svg width="32" height="31" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#863BFF" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" />
          </svg>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button 
            onClick={toggleLanguage}
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid rgba(255,255,255,0.1)', 
              color: '#fff', 
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Globe size={14} /> {language.toUpperCase()}
          </button>
          <button 
            onClick={toggleMenu}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px' }}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              backgroundColor: '#000',
              zIndex: 1999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '140px 40px 80px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', width: '100%' }}>
              {navItems.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    style={{
                      color: item.active ? '#863BFF' : '#fff',
                      textDecoration: 'none',
                      fontSize: '1.75rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '16px',
                      padding: '16px 32px',
                      backgroundColor: item.active ? 'rgba(134, 59, 255, 0.08)' : 'transparent',
                      borderRadius: '16px',
                      width: 'min(90vw, 300px)',
                      position: 'relative',
                      transition: 'all 0.3s'
                    }}
                  >
                    <span style={{ 
                      opacity: 0.2, 
                      fontSize: '0.8rem', 
                      fontFamily: 'monospace',
                      position: 'absolute',
                      left: '20px'
                    }}>
                      0{i + 1}
                    </span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: 'auto', textAlign: 'center' }}>
              <img src="/assets/aevum-logo.png" alt="Aevum" style={{ width: '60px', opacity: 0.3, filter: 'brightness(0) invert(1)' }} />
              <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', marginTop: '12px', letterSpacing: '2px' }}>
                POWERED BY AEVUM
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
