import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import { motion } from 'framer-motion';

const Register = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: isMobile ? 'flex-start' : 'center',
        padding: isMobile ? '100px 0 60px' : '40px 20px',
        backgroundColor: '#000'
      }}
    >
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <RegistrationForm isOpen={true} onClose={() => { }} isFullPage={true} />
      </div>
    </motion.div>
  );
};

export default Register;
