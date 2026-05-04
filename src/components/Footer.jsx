import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <footer style={{
      padding: isMobile ? '80px 20px 40px' : '80px 40px 40px',
      backgroundColor: '#000',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      fontFamily: 'inherit'
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '48px' : '60px',
        justifyContent: 'space-between', alignItems: 'flex-start'
      }}>
        <div style={{ flex: isMobile ? 'none' : '1 1 300px', textAlign: 'left', width: isMobile ? '100%' : 'auto' }}>
          <h2 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 900, letterSpacing: '-1px', marginBottom: isMobile ? '8px' : '16px' }}>HAEVTHON 2026</h2>
          {!isMobile && (
            <p style={{ 
              color: 'rgba(255,255,255,0.5)', 
              fontSize: '0.95rem', 
              lineHeight: 1.6, 
              maxWidth: '300px',
              margin: '0'
            }}>
              {t('footer_desc')}
            </p>
          )}
        </div>

        <div style={{ 
          display: 'flex', 
          gap: isMobile ? '24px' : '60px', 
          flexWrap: 'wrap', 
          width: isMobile ? '100%' : 'auto',
          justifyContent: 'flex-start',
          textAlign: 'left'
        }}>
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: isMobile ? '12px' : '20px' }}>
              {t('footer_explore')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '12px' }}>
              {[
                { label: t('nav_home'), path: '/' },
                { label: t('nav_timeline'), path: '/timeline' },
                { label: t('nav_register'), path: '/register' },
                { label: t('nav_sponsors'), path: '/sponsors' }
              ].map(link => (
                <a key={link.label} href={link.path} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: isMobile ? '0.8rem' : '0.9rem', transition: 'color 0.3s' }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: isMobile ? '12px' : '20px' }}>
              {t('footer_connect')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '12px' }}>
              <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: isMobile ? '0.8rem' : '0.9rem', transition: 'color 0.3s' }}>
                Discord Community
              </a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: isMobile ? '0.8rem' : '0.9rem', transition: 'color 0.3s' }}>
                X (Twitter)
              </a>
              <a href={`mailto:${t('contact_email')}`} style={{ 
                color: 'rgba(255,255,255,0.7)', 
                textDecoration: 'none', 
                fontSize: isMobile ? '0.75rem' : '0.9rem', 
                transition: 'color 0.3s',
                wordBreak: 'break-all'
              }}>
                {t('contact_email')}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px', margin: isMobile ? '32px auto 0' : '60px auto 0',
        paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'flex-start', flexWrap: 'wrap', gap: isMobile ? '12px' : '40px',
        color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem',
        textAlign: 'left'
      }}>
        <div>© 2026 I2FLabs. {t('footer_rights')}</div>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'flex-start' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }}>{t('footer_privacy')}</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }}>{t('footer_terms')}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
