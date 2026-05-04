import React, { useState, useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, X, Zap, Shield, Sparkles, Users, ChevronDown, Cpu, Network, Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// --- Custom Select Component (with Editable support) ---
const CustomSelect = ({ value, onChange, options, placeholder, label, error, isEditable = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync searchTerm with value when closed
  useEffect(() => {
    if (!isOpen) {
      const selectedOption = options.find(opt => opt.value === value);
      setSearchTerm(selectedOption ? selectedOption.label : value || '');
    }
  }, [value, isOpen, options]);

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="custom-select-container" ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <label style={{
          fontSize: '0.65rem',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}>{label}</label>
        {error && <span style={{ color: '#ff4d4d', fontSize: '0.6rem', fontWeight: 600 }}>{error.message}</span>}
      </div>

      <div
        onClick={() => {
          setIsOpen(!isOpen);
          if (isEditable && inputRef.current) inputRef.current.focus();
        }}
        style={{
          width: '100%',
          height: '38px',
          padding: '0 12px',
          borderRadius: '8px',
          backgroundColor: 'rgba(255,255,255,0.02)',
          border: `1px solid ${error ? 'rgba(255, 77, 77, 0.5)' : (isOpen ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)')}`,
          color: value || searchTerm ? 'white' : 'rgba(255,255,255,0.3)',
          fontSize: '0.85rem',
          cursor: isEditable ? 'text' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.3s ease',
        }}
      >
        {isEditable ? (
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onChange(e.target.value);
              setIsOpen(true);
            }}
            placeholder={placeholder}
            onFocus={() => setIsOpen(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '0.85rem',
              outline: 'none',
              width: '100%',
              padding: 0,
            }}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginRight: '8px'
          }}>
            {searchTerm || placeholder}
          </span>
        )}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <ChevronDown size={14} color="rgba(255,255,255,0.4)" strokeWidth={2.5} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && filteredOptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              backgroundColor: '#0a0a0a',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
              zIndex: 9999,
              overflowY: 'auto',
              maxHeight: '200px',
              marginTop: '4px',
              padding: '6px'
            }}
          >
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setSearchTerm(option.label);
                  setIsOpen(false);
                }}
                style={{
                  padding: '10px 12px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  color: (value === option.value) ? '#fff' : 'rgba(255,255,255,0.5)',
                  backgroundColor: (value === option.value) ? 'rgba(255,255,255,0.08)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onMouseEnter={(e) => {
                  if (value !== option.value) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (value !== option.value) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                  }
                }}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RegistrationForm = ({ isOpen, onClose, isFullPage = false }) => {
  const { t } = useLanguage();
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [currentStep, setCurrentStep] = useState(0); // 0: Survey, 1: Registration
  const [regType, setRegType] = useState('individual'); // 'individual' or 'team'
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const registrationSchema = z.object({
    // Survey Fields
    hasParticipated: z.string().min(1, 'Required'),
    foundVia: z.string().min(1, 'Required'),
    mainGoal: z.string().min(1, 'Required'),
    teamStatus: z.string().min(1, 'Required'),
    primaryRole: z.string().min(1, 'Required'),
    techInterest: z.string().min(2, 'Required'),
    vibeLevel: z.string().min(1, 'Required'),
    aevummasLevel: z.string().min(1, 'Required'),
    // Registration Fields
    fullName: z.string().min(2, t('err_name_min')),
    email: z.string().email(t('err_email_invalid')),
    discord: z.string().min(2, t('err_discord_required')),
    linkedin: z.string().url(t('err_linkedin_invalid')).optional().or(z.literal('')),
    github: z.string().url(t('err_github_invalid')),
    facebook: z.string().url(t('err_facebook_invalid')).optional().or(z.literal('')),
    country: z.string().min(1, 'Required'),
    age: z.string().min(1, 'Required').regex(/^\d+$/, t('err_age_numeric')),
    gender: z.string().min(1, 'Required'),
    city: z.string().min(1, 'Required'),
    residence: z.string().optional().or(z.literal('')),
    teamName: regType === 'team' ? z.string().min(2, t('err_team_required')) : z.string().optional(),
    role: z.string().min(1, t('err_role_required')),
    experience: z.string().min(1, t('err_experience_required')),
    skills: z.string().min(2, t('err_skills_required')),
    interest: z.string().min(10, t('err_interest_min')),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    reset,
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      hasParticipated: '',
      foundVia: '',
      mainGoal: '',
      teamStatus: '',
      primaryRole: '',
      techInterest: '',
      vibeLevel: '',
      aevummasLevel: '',
      country: 'vietnam',
      age: '',
      gender: '',
      role: '',
      experience: '',
    },
    shouldUnregister: false
  });

  const nextStep = async () => {
    const fieldsToValidate = ['hasParticipated', 'foundVia', 'mainGoal', 'teamStatus', 'primaryRole', 'techInterest', 'vibeLevel', 'aevummasLevel'];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(1);
    }
  };

  const onSubmit = async (data) => {
    try {
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyriWoj8wUJg9YNbhOqWBr_BJLSfTN-HijIv_Ilqp8eC1LnAlF7jR45mwC8n3NKpeaNuw/exec';
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
      formData.append('regType', regType);

      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });

      setToast({
        show: true,
        message: t('reg_success_title'),
        type: 'success'
      });
      
      reset();
    } catch (error) {
      console.error('Registration Error:', error);
      alert('Đã có lỗi xảy ra. Vui lòng thử lại sau!');
    }
  };

  const inputStyle = {
    width: '100%',
    height: '38px',
    padding: '0 12px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'white',
    fontSize: '0.85rem',
    outline: 'none',
    transition: 'all 0.3s ease',
  };

  const inputErrorStyle = {
    ...inputStyle,
    borderColor: 'rgba(255, 77, 77, 0.5)',
    backgroundColor: 'rgba(255, 77, 77, 0.02)',
    boxShadow: '0 0 0 1px rgba(255, 77, 77, 0.1)',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '4px',
    fontSize: '0.65rem',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  };

  const formContent = (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      style={{
        width: '100%',
        maxWidth: '1150px',
        minHeight: isMobile ? 'auto' : '500px',
        height: isMobile ? 'auto' : 'auto',
        backgroundColor: isMobile ? 'transparent' : '#000',
        background: isMobile ? 'none' : 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, #000 100%)',
        borderRadius: isMobile ? '0' : '24px',
        border: isMobile ? 'none' : '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        boxShadow: isMobile ? 'none' : '0 50px 100px rgba(0,0,0,0.9)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        overflowY: isMobile ? 'visible' : 'visible',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {!isFullPage && (
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', padding: '8px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', border: 'none', cursor: 'pointer', zIndex: 10 }}>
          <X size={16} />
        </button>
      )}

      {/* Aevum Success Popup */}
      <AnimatePresence>
        {toast.show && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setToast(prev => ({ ...prev, show: false }))}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(20px)'
              }}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '380px',
                backgroundColor: '#050505',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '40px 32px',
                textAlign: 'center',
                boxShadow: '0 40px 80px rgba(0,0,0,1)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                marginBottom: '32px',
                display: 'flex',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    width: '72px',
                    height: '72px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg 
                    width="64" 
                    height="61" 
                    viewBox="0 0 48 46" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      fill="#863BFF" 
                      d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" 
                    />
                  </svg>
                </motion.div>
              </div>

              <h3 style={{
                fontSize: '1.6rem',
                fontWeight: 900,
                color: '#fff',
                marginBottom: '12px',
                letterSpacing: '-1px',
                textTransform: 'uppercase'
              }}>
                {t('reg_success_title')}
              </h3>
              
              <p style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                marginBottom: '32px',
                fontWeight: 300,
                letterSpacing: '0.3px',
                padding: '0 10px'
              }}>
                {t('reg_success_desc')}
              </p>

              <motion.button
                onClick={() => setToast(prev => ({ ...prev, show: false }))}
                style={{
                  width: '100%',
                  height: '48px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  color: '#000',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  letterSpacing: '1.5px',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                {t('reg_btn_close')}
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="registration-container" style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: '100%',
        height: 'auto',
        position: 'relative',
        alignItems: 'stretch'
      }}>
        {/* Left Side: Information */}
          <div style={{
            width: isMobile ? '100%' : '24%',
            padding: isMobile ? '20px 24px' : '40px',
            background: 'transparent',
            borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.05)',
            borderBottom: isMobile ? '1px solid rgba(255,255,255,0.05)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: isMobile ? 'flex-start' : 'center',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <div style={{ marginBottom: isMobile ? '0' : '32px' }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '10px', 
                backgroundColor: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: isMobile ? '16px' : '20px',
                margin: isMobile ? '0 auto 16px' : '0 0 20px'
              }}>
                <svg width="20" height="19" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#000" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" />
                </svg>
              </div>
              <h2 style={{ fontSize: isMobile ? '1.2rem' : '1.8rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '12px', letterSpacing: '-1px' }}>
                IGNITE THE <span style={{ color: 'rgba(255,255,255,0.3)' }}>AGENTIC ERA</span>
              </h2>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div style={{ 
            width: isMobile ? '100%' : '76%',
            padding: isMobile ? '32px 24px' : '40px 48px',
            display: 'flex',
            flexDirection: 'column',
            height: 'auto'
          }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', height: '100%' }}>
              <AnimatePresence mode="wait">
                {currentStep === 0 ? (
                  <motion.div
                    key="survey"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                >
                  <div style={{ 
                    marginBottom: '24px', 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: isMobile ? 'flex-start' : 'space-between', 
                    alignItems: isMobile ? 'flex-start' : 'flex-start',
                    gap: isMobile ? '12px' : '0'
                  }}>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#fff', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                        {t('reg_survey_title') || 'PRE-REGISTRATION SURVEY'}
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>
                        {t('reg_survey_subtitle') || 'Please answer a few quick questions to help us prepare.'}
                      </p>
                    </div>
                    <div style={{ 
                      fontSize: '0.65rem', 
                      fontWeight: 900, 
                      color: '#fff', 
                      backgroundColor: 'rgba(255,255,255,0.04)', 
                      padding: '3px 10px', 
                      borderRadius: '4px',
                      letterSpacing: '2px',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      01 <span style={{ color: 'rgba(255,255,255,0.2)' }}>/ 02</span>
                    </div>
                  </div>

                  <Controller
                    name="hasParticipated"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        {...field}
                        label={t('reg_survey_q1')}
                        placeholder={t('reg_placeholder_select_answer')}
                        options={[
                          { value: 'yes', label: t('reg_survey_q1_yes') },
                          { value: 'no', label: t('reg_survey_q1_no') },
                        ]}
                        error={errors.hasParticipated}
                      />
                    )}
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
                    <Controller
                      name="foundVia"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          label={t('reg_survey_q2')}
                          placeholder={t('reg_placeholder_select_source')}
                          options={[
                            { value: 'social', label: t('reg_survey_q2_social') },
                            { value: 'friend', label: t('reg_survey_q2_friend') },
                            { value: 'community', label: t('reg_survey_q2_community') },
                            { value: 'other', label: t('reg_survey_q2_other') },
                          ]}
                          error={errors.foundVia}
                        />
                      )}
                    />

                    <Controller
                      name="mainGoal"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          label={t('reg_survey_q3')}
                          placeholder={t('reg_placeholder_select_goal')}
                          options={[
                            { value: 'learn', label: t('reg_survey_q3_learn') },
                            { value: 'net', label: t('reg_survey_q3_net') },
                            { value: 'prize', label: t('reg_survey_q3_prize') },
                            { value: 'job', label: t('reg_survey_q3_job') },
                          ]}
                          error={errors.mainGoal}
                        />
                      )}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
                    <Controller
                      name="teamStatus"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          label={t('reg_survey_q4_label')}
                          placeholder={t('reg_placeholder_select_status')}
                          options={[
                            { value: 'looking', label: t('reg_survey_q4_yes') },
                            { value: 'has_team', label: t('reg_survey_q4_no') },
                            { value: 'solo', label: t('reg_survey_q4_solo') },
                          ]}
                          error={errors.teamStatus}
                        />
                      )}
                    />

                    <Controller
                      name="primaryRole"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          label={t('reg_survey_q5_label')}
                          placeholder={t('reg_placeholder_select_role')}
                          options={[
                            { value: 'dev', label: t('reg_survey_q5_dev') },
                            { value: 'ai', label: t('reg_survey_q5_ai') },
                            { value: 'design', label: t('reg_survey_q5_design') },
                            { value: 'biz', label: t('reg_survey_q5_biz') },
                          ]}
                          error={errors.primaryRole}
                        />
                      )}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={labelStyle}>{t('reg_survey_q8_label')}</label>
                      {errors.techInterest && <span className="error-msg" style={{ fontSize: '0.6rem', marginBottom: '4px' }}>{errors.techInterest.message}</span>}
                    </div>
                    <input 
                      {...register('techInterest')} 
                      placeholder="OpenAI, LangChain, Autogen..." 
                      style={errors.techInterest ? inputErrorStyle : inputStyle} 
                      className="minimal-input" 
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
                    <Controller
                      name="vibeLevel"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          label={t('reg_survey_q9_label')}
                          placeholder={t('reg_placeholder_select_level')}
                          options={[
                            { value: 'new', label: t('reg_survey_q9_new') },
                            { value: 'exploring', label: t('reg_survey_q9_exploring') },
                            { value: 'coder', label: t('reg_survey_q9_coder') },
                            { value: 'master', label: t('reg_survey_q9_master') },
                          ]}
                          error={errors.vibeLevel}
                        />
                      )}
                    />

                    <Controller
                      name="aevummasLevel"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          label={t('reg_survey_q10_label')}
                          placeholder={t('reg_placeholder_select_level')}
                          options={[
                            { value: 'new', label: t('reg_survey_q10_new') },
                            { value: 'fan', label: t('reg_survey_q10_fan') },
                            { value: 'true', label: t('reg_survey_q10_true') },
                          ]}
                          error={errors.aevummasLevel}
                        />
                      )}
                    />
                  </div>

                  <button 
                    type="button" 
                    onClick={nextStep} 
                    className="btn-primary" 
                    style={{ width: '100%', justifyContent: 'center', height: '46px', marginTop: '12px' }}
                  >
                    {t('reg_btn_next')}
                  </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="reg-step"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                    >
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: isMobile ? 'flex-start' : 'center', 
                    justifyContent: isMobile ? 'flex-start' : 'space-between', 
                    marginBottom: '16px',
                    gap: isMobile ? '12px' : '0'
                  }}>
                    <button 
                      type="button" 
                      onClick={() => setCurrentStep(0)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'rgba(255,255,255,0.4)', 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '4px',
                        fontSize: '0.65rem', 
                        fontWeight: 900,
                        padding: 0,
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                    >
                      <ChevronDown size={14} style={{ transform: 'rotate(90deg)' }} />
                      {t('reg_btn_back_survey')}
                    </button>
                    <div style={{ 
                      fontSize: '0.65rem', 
                      fontWeight: 900, 
                      color: 'rgba(255,255,255,0.6)', 
                      backgroundColor: 'rgba(255,255,255,0.03)', 
                      padding: '4px 10px', 
                      borderRadius: '5px',
                      letterSpacing: '2px',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      02 <span style={{ color: 'rgba(255,255,255,0.15)' }}>/ 02</span>
                    </div>
                  </div>
                  <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.05)', marginBottom: '16px' }} />

                  <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '12px', marginBottom: '20px', width: 'fit-content', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <button type="button" onClick={() => setRegType('individual')} style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', backgroundColor: regType === 'individual' ? 'rgba(255,255,255,0.08)' : 'transparent', color: regType === 'individual' ? '#fff' : 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s ease' }}>
                      {t('reg_type_individual')}
                    </button>
                    <button type="button" onClick={() => setRegType('team')} style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', backgroundColor: regType === 'team' ? 'rgba(255,255,255,0.08)' : 'transparent', color: regType === 'team' ? '#fff' : 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s ease' }}>
                      {t('reg_type_team')}
                    </button>
                  </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={labelStyle}>{t('reg_label_name')}</label>
                    {errors.fullName && <span className="error-msg" style={{ fontSize: '0.6rem', marginBottom: '4px' }}>{errors.fullName.message}</span>}
                  </div>
                  <input {...register('fullName')} placeholder={t('reg_placeholder_name')} style={errors.fullName ? inputErrorStyle : inputStyle} className="minimal-input" />
                </div>
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={labelStyle}>{t('reg_label_email')}</label>
                    {errors.email && <span className="error-msg" style={{ fontSize: '0.6rem', marginBottom: '4px' }}>{errors.email.message}</span>}
                  </div>
                  <input {...register('email')} placeholder={t('reg_placeholder_email')} style={errors.email ? inputErrorStyle : inputStyle} className="minimal-input" />
                </div>
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={labelStyle}>{t('reg_discord_label')}</label>
                    {errors.discord && <span className="error-msg" style={{ fontSize: '0.6rem', marginBottom: '4px' }}>{errors.discord.message}</span>}
                  </div>
                  <input {...register('discord')} placeholder={t('reg_discord_ph')} style={errors.discord ? inputErrorStyle : inputStyle} className="minimal-input" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={labelStyle}>{t('reg_age_label')}</label>
                    {errors.age && <span className="error-msg" style={{ fontSize: '0.6rem', marginBottom: '4px' }}>{errors.age.message}</span>}
                  </div>
                  <input type="number" {...register('age')} placeholder="18, 20, 25..." style={errors.age ? inputErrorStyle : inputStyle} className="minimal-input" />
                </div>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      label={t('reg_gender_label')}
                      placeholder={t('reg_placeholder_select')}
                      options={[
                        { value: 'male', label: t('reg_gender_male') },
                        { value: 'female', label: t('reg_gender_female') },
                        { value: 'other', label: t('reg_gender_other') },
                      ]}
                      error={errors.gender}
                    />
                  )}
                />
                <Controller
                  name="country"
                  control={control}
                  defaultValue="vietnam"
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      label={t('reg_country_label')}
                      placeholder={t('reg_placeholder_select_country')}
                      options={[
                        { value: 'vietnam', label: 'Việt Nam' },
                        { value: 'international', label: 'International' },
                      ]}
                      error={errors.country}
                    />
                  )}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px' }}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      label={t('reg_city_label')}
                      placeholder={t('reg_placeholder_select_city')}
                      isEditable={true}
                      options={[
                        { value: 'hcm', label: 'TP. Hồ Chí Minh' },
                        { value: 'hanoi', label: 'Hà Nội' },
                        { value: 'danang', label: 'Đà Nẵng' },
                        { value: 'cantho', label: 'Cần Thơ' },
                        { value: 'haiphong', label: 'Hải Phòng' },
                        { value: 'other', label: 'Khác' },
                      ]}
                      error={errors.city}
                    />
                  )}
                />
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={labelStyle}>{t('reg_location_label')}</label>
                    {errors.residence && <span className="error-msg" style={{ fontSize: '0.6rem', marginBottom: '4px' }}>{errors.residence.message}</span>}
                  </div>
                  <input {...register('residence')} placeholder={t('reg_placeholder_residence')} style={errors.residence ? inputErrorStyle : inputStyle} className="minimal-input" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={labelStyle}>{t('reg_linkedin_label')}</label>
                    {errors.linkedin && <span className="error-msg" style={{ fontSize: '0.6rem', marginBottom: '4px' }}>{errors.linkedin.message}</span>}
                  </div>
                  <input {...register('linkedin')} placeholder="linkedin.com/in/..." style={errors.linkedin ? inputErrorStyle : inputStyle} className="minimal-input" />
                </div>
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={labelStyle}>{t('reg_github_label')}</label>
                    {errors.github && <span className="error-msg" style={{ fontSize: '0.6rem', marginBottom: '4px' }}>{errors.github.message}</span>}
                  </div>
                  <input {...register('github')} placeholder="github.com/..." style={errors.github ? inputErrorStyle : inputStyle} className="minimal-input" />
                </div>
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={labelStyle}>{t('reg_facebook_label')}</label>
                    {errors.facebook && <span className="error-msg" style={{ fontSize: '0.6rem', marginBottom: '4px' }}>{errors.facebook.message}</span>}
                  </div>
                  <input {...register('facebook')} placeholder="facebook.com/..." style={errors.facebook ? inputErrorStyle : inputStyle} className="minimal-input" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '24px' }}>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      label={t('reg_label_role')}
                      placeholder={t('reg_placeholder_role')}
                      isEditable={true}
                      options={[
                        { value: 'ai_engineer', label: t('reg_role_ai') },
                        { value: 'fullstack', label: t('reg_role_fullstack') },
                        { value: 'product_designer', label: t('reg_role_designer') },
                        { value: 'product_manager', label: t('reg_role_manager') },
                      ]}
                      error={errors.role}
                    />
                  )}
                />
                <Controller
                  name="experience"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      label={t('reg_label_experience')}
                      placeholder={t('reg_placeholder_experience')}
                      isEditable={true}
                      options={[
                        { value: 'student_hs', label: t('reg_exp_student_hs') },
                        { value: 'student_uni', label: t('reg_exp_student_uni') },
                        { value: 'fresher', label: t('reg_exp_fresher') },
                        { value: 'junior', label: t('reg_exp_junior') },
                        { value: 'mid', label: t('reg_exp_mid') },
                        { value: 'senior', label: t('reg_exp_senior') },
                        { value: 'expert', label: t('reg_exp_expert') },
                      ]}
                      error={errors.experience}
                    />
                  )}
                />
                <div className="form-group">
                  <label style={labelStyle}>{t('reg_skills_label')}</label>
                  <input {...register('skills')} placeholder="React, Python, GPT-4..." style={errors.skills ? inputErrorStyle : inputStyle} className="minimal-input" />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {regType === 'team' && (
                  <motion.div key="team" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={labelStyle}>{t('reg_team_label')}</label>
                      {errors.teamName && <span className="error-msg" style={{ fontSize: '0.6rem', marginBottom: '4px' }}>{errors.teamName.message}</span>}
                    </div>
                    <input {...register('teamName')} placeholder={t('reg_placeholder_name')} style={errors.teamName ? inputErrorStyle : inputStyle} className="minimal-input" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={labelStyle}>{t('reg_bio_label')}</label>
                  {errors.interest && <span className="error-msg" style={{ fontSize: '0.6rem', marginBottom: '4px' }}>{errors.interest.message}</span>}
                </div>
                <textarea
                  {...register('interest')}
                  placeholder={t('reg_placeholder_interest')}
                  rows="2"
                  style={{
                    ...(errors.interest ? inputErrorStyle : inputStyle),
                    height: '60px',
                    padding: '8px 12px',
                    lineHeight: '1.4',
                    resize: 'none'
                  }}
                  className="minimal-input custom-scrollbar"
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary" style={{
                width: '100%',
                justifyContent: 'center',
                height: '46px',
                marginTop: '4px',
                fontSize: '0.9rem',
                fontWeight: 800,
                fontFamily: 'inherit' // Ensure it uses the Vietnamese-friendly font from body
              }}>
                {isSubmitting ? t('reg_btn_submitting') : t('reg_btn_submit')}
              </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
          </div>
        </div>


      <style dangerouslySetInnerHTML={{
        __html: `
        .minimal-input:focus { border-color: rgba(255,255,255,0.3) !important; background-color: rgba(255,255,255,0.04) !important; }
        .error-msg { color: #ff4d4d; font-size: 0.65rem; margin-top: 4px; font-weight: 500; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }

        @media (max-width: 950px) {
          .registration-container { flex-direction: column !important; }
        }
      `}} />
    </motion.div>
  );

  if (isFullPage) return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#000' }}>
      {formContent}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.98)', backdropFilter: 'blur(30px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} onClick={onClose}>
          {formContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationForm;
