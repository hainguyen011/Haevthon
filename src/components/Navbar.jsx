import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();

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
        padding: '40px 0',
        zIndex: 1000,
        backgroundColor: '#000000',
        borderRight: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Branding - Vertical */}
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img
            src="/assets/aevum-logo.png"
            alt="Aevum"
            style={{ width: '32px', height: '32px', objectFit: 'contain' }}
            onError={(e) => e.target.style.display = 'none'}
          />
        </motion.div>
      </Link>

      {/* Navigation Links - Centered & Evenly Spaced */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '100px',
        alignItems: 'center'
      }}>
        <Link
          to="/"
          style={{
            color: location.pathname === '/' ? 'var(--primary-white)' : 'rgba(255,255,255,0.3)',
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
          {t('nav_home')}
        </Link>
        <Link
          to="/timeline"
          style={{
            color: location.pathname === '/timeline' ? 'var(--primary-white)' : 'rgba(255,255,255,0.3)',
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
          {t('nav_timeline')}
        </Link>
        <Link
          to="/register"
          style={{
            color: location.pathname === '/register' ? 'var(--primary-white)' : 'rgba(255,255,255,0.3)',
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
          {t('nav_register')}
        </Link>
        <Link
          to="/sponsors"
          style={{
            color: location.pathname === '/sponsors' ? 'var(--primary-white)' : 'rgba(255,255,255,0.3)',
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
          {t('nav_sponsors')}
        </Link>
      </div>

      {/* Footer Info */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px'
      }}>
        <div style={{
          transform: 'rotate(-90deg)',
          whiteSpace: 'nowrap',
          fontSize: '0.5rem',
          color: 'rgba(255,255,255,0.2)',
          fontWeight: 800,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginBottom: '20px'
        }}>
          I2FLABS
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
