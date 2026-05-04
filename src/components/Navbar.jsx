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
        padding: '60px 0', // Increased padding for better balance
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
          <svg 
            width="32" 
            height="31" 
            viewBox="0 0 48 46" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              fill="#863BFF" 
              d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0-3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" 
            />
          </svg>
        </motion.div>
      </Link>

      {/* Navigation Links - Centered & Perfectly Evenly Spaced */}
      <div style={{
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '20px 0'
      }}>
        {[
          { to: '/', label: t('nav_home'), active: location.pathname === '/' },
          { to: '/timeline', label: t('nav_timeline'), active: location.pathname === '/timeline' },
          { to: '/register', label: t('nav_register'), active: location.pathname === '/register' },
          { to: '/sponsors', label: t('nav_sponsors'), active: location.pathname === '/sponsors' }
        ].map((item) => (
          <div key={item.to} style={{ 
            height: '60px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <Link
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
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '20px'
      }}>
        <img 
          src="/assets/aevum-logo.png" 
          alt="Aevum" 
          style={{ 
            width: '40px', 
            height: 'auto',
            opacity: 0.5,
            filter: 'brightness(0) invert(1)' 
          }} 
        />
      </div>
    </motion.nav>
  );
};

export default Navbar;
