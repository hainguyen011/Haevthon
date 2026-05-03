import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import { motion } from 'framer-motion';

const Register = () => {
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
        alignItems: 'center',
        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 80%)',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <RegistrationForm isOpen={true} onClose={() => { }} isFullPage={true} />
      </div>
    </motion.div>
  );
};

export default Register;
