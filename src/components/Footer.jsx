import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer style={{
      padding: '80px 40px 40px',
      backgroundColor: '#000',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      fontFamily: 'inherit'
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', flexWrap: 'wrap', gap: '60px',
        justifyContent: 'space-between', alignItems: 'flex-start'
      }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px', marginBottom: '16px' }}>HAEVTHON 2026</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '300px' }}>
            Empowering the next generation of autonomous AI systems. Built by builders, for builders.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '20px' }}>
              Explore
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Home', 'Timeline', 'Register', 'Sponsors'].map(link => (
                <a key={link} href={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase()}`} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.7)'}>
                  {link}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '20px' }}>
              Connect
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.7)'}>
                Discord Community
              </a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.7)'}>
                X (Twitter)
              </a>
              <a href={`mailto:${t('contact_email')}`} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.7)'}>
                {t('contact_email')}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px', margin: '60px auto 0',
        paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', gap: '40px',
        color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem'
      }}>
        <div>© 2026 I2FLabs. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'rgba(255,255,255,0.6)'} onMouseOut={e => e.target.style.color = 'inherit'}>Privacy Policy</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'rgba(255,255,255,0.6)'} onMouseOut={e => e.target.style.color = 'inherit'}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
