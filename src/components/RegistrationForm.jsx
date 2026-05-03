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
const CustomSelect = ({ value, onChange, options, placeholder, label, error, isEditable = false }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const selectedOption = options.find(opt => opt.value === value);
  const displayValue = selectedOption ? selectedOption.label : value;

  return (
    <div className="custom-select-container" ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <label style={{
        display: 'block',
        marginBottom: '6px',
        fontSize: '0.65rem',
        fontWeight: 700,
        color: 'rgba(255,255,255,0.4)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
      }}>{label}</label>
      
      <div 
        onClick={() => {
          setIsOpen(!isOpen);
          if (isEditable && inputRef.current) inputRef.current.focus();
        }}
        style={{
          width: '100%',
          height: '42px',
          padding: '0 14px',
          borderRadius: '8px',
          backgroundColor: 'rgba(255,255,255,0.02)',
          border: `1px solid ${isOpen ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
          color: displayValue ? 'white' : 'rgba(255,255,255,0.3)',
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
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
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
            {displayValue || placeholder}
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
        {isOpen && (
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
              zIndex: 100,
              overflow: 'hidden',
              marginTop: '4px',
              padding: '6px'
            }}
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(isEditable ? option.label : option.value);
                  setIsOpen(false);
                }}
                style={{
                  padding: '10px 12px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  color: (value === option.value || value === option.label) ? '#fff' : 'rgba(255,255,255,0.5)',
                  backgroundColor: (value === option.value || value === option.label) ? 'rgba(255,255,255,0.08)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onMouseEnter={(e) => {
                  if (value !== option.value && value !== option.label) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (value !== option.value && value !== option.label) {
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
      {error && <p style={{ color: '#ff4d4d', fontSize: '0.65rem', marginTop: '4px', fontWeight: 500, paddingLeft: '4px' }}>{error.message}</p>}
    </div>
  );
};

const RegistrationForm = ({ isOpen, onClose, isFullPage = false }) => {
  const { t } = useLanguage();
  const [isSuccess, setIsSuccess] = useState(false);
  const [regType, setRegType] = useState('individual'); // 'individual' or 'team'

  const registrationSchema = z.object({
    fullName: z.string().min(2, t('err_name_min')),
    email: z.string().email(t('err_email_invalid')),
    discord: z.string().min(2, 'Vui lòng nhập Discord ID'),
    linkedin: z.string().url('LinkedIn URL không hợp lệ').optional().or(z.literal('')),
    github: z.string().url('Github/Portfolio URL không hợp lệ').optional().or(z.literal('')),
    teamName: regType === 'team' ? z.string().min(2, 'Vui lòng nhập tên đội') : z.string().optional(),
    role: z.string().min(1, t('err_role_required')),
    experience: z.string().min(1, t('err_experience_required')),
    skills: z.string().min(2, 'Vui lòng nhập kỹ năng chính'),
    interest: z.string().min(10, t('err_interest_min')),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      role: '',
      experience: '',
    }
  });

  const onSubmit = async (data) => {
    console.log('Form Submitted:', { ...data, regType });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    reset();
    onClose();
  };

  const inputStyle = {
    width: '100%',
    height: '42px',
    padding: '0 14px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'white',
    fontSize: '0.85rem',
    outline: 'none',
    transition: 'all 0.3s ease',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '0.65rem',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  };

  const successContent = (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ color: '#fff', marginBottom: '20px' }}>
        <CheckCircle2 size={56} strokeWidth={1} />
      </motion.div>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '12px' }}>{t('reg_success_title')}</h2>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '24px' }}>{t('reg_success_desc')}</p>
      <button onClick={handleClose} className="btn-primary" style={{ margin: '0 auto' }}>{t('reg_btn_close')}</button>
    </div>
  );

  const formContent = (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      style={{
        width: '100%',
        maxWidth: '1200px',
        backgroundColor: '#050505',
        borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        boxShadow: '0 50px 100px rgba(0,0,0,0.9)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {!isFullPage && (
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', padding: '8px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', border: 'none', cursor: 'pointer', zIndex: 10 }}>
          <X size={16} />
        </button>
      )}

      {isSuccess ? successContent : (
        <>
          {/* Left Side: Information */}
          <div style={{ 
            width: '28%', 
            padding: '48px', 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03), transparent)',
            borderRight: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Zap size={18} color="#000" fill="#000" />
              </div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-1.5px' }}>
                IGNITE THE <span style={{ color: 'rgba(255,255,255,0.3)' }}>AGENTIC ERA</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 300 }}>
                Join Haevthon to architect the next generation of autonomous intelligence and agentic systems.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: Cpu, text: 'Advanced Agentic Frameworks' },
                { icon: Network, text: 'Multi-Agent Orchestration' },
                { icon: Globe, text: 'Global Builder Community' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <item.icon size={12} color="rgba(255,255,255,0.2)" />
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: The Form */}
          <div style={{ width: '72%', padding: '48px 64px' }}>
            
            <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '12px', marginBottom: '32px', width: 'fit-content', border: '1px solid rgba(255,255,255,0.05)' }}>
              <button type="button" onClick={() => setRegType('individual')} style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', backgroundColor: regType === 'individual' ? 'rgba(255,255,255,0.08)' : 'transparent', color: regType === 'individual' ? '#fff' : 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s ease' }}>
                CÁ NHÂN
              </button>
              <button type="button" onClick={() => setRegType('team')} style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', backgroundColor: regType === 'team' ? 'rgba(255,255,255,0.08)' : 'transparent', color: regType === 'team' ? '#fff' : 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s ease' }}>
                ĐĂNG KÝ ĐỘI
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                <div className="form-group">
                  <label style={labelStyle}>HỌ VÀ TÊN</label>
                  <input {...register('fullName')} placeholder="Nguyễn Văn A" style={inputStyle} className="minimal-input" />
                  {errors.fullName && <p className="error-msg">{errors.fullName.message}</p>}
                </div>
                <div className="form-group">
                  <label style={labelStyle}>EMAIL</label>
                  <input {...register('email')} placeholder="an@haevthon.com" style={inputStyle} className="minimal-input" />
                  {errors.email && <p className="error-msg">{errors.email.message}</p>}
                </div>
                <div className="form-group">
                  <label style={labelStyle}>DISCORD ID</label>
                  <input {...register('discord')} placeholder="username#1234" style={inputStyle} className="minimal-input" />
                  {errors.discord && <p className="error-msg">{errors.discord.message}</p>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div className="form-group">
                  <label style={labelStyle}>LINKEDIN URL</label>
                  <input {...register('linkedin')} placeholder="linkedin.com/in/..." style={inputStyle} className="minimal-input" />
                  {errors.linkedin && <p className="error-msg">{errors.linkedin.message}</p>}
                </div>
                <div className="form-group">
                  <label style={labelStyle}>GITHUB / PORTFOLIO</label>
                  <input {...register('github')} placeholder="github.com/..." style={inputStyle} className="minimal-input" />
                  {errors.github && <p className="error-msg">{errors.github.message}</p>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '24px' }}>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      label="VAI TRÒ"
                      placeholder="Chọn hoặc nhập..."
                      isEditable={true}
                      options={[
                        { value: 'developer', label: 'Developer' },
                        { value: 'designer', label: 'Designer' },
                        { value: 'product', label: 'Product' },
                        { value: 'business', label: 'Business' },
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
                      label="KINH NGHIỆM"
                      placeholder="Chọn hoặc nhập..."
                      isEditable={true}
                      options={[
                        { value: 'junior', label: 'Junior' },
                        { value: 'mid', label: 'Mid' },
                        { value: 'senior', label: 'Senior' },
                        { value: 'expert', label: 'Expert' },
                      ]}
                      error={errors.experience}
                    />
                  )}
                />
                <div className="form-group">
                  <label style={labelStyle}>SKILLS / TECH STACK</label>
                  <input {...register('skills')} placeholder="React, Python, GPT-4..." style={inputStyle} className="minimal-input" />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {regType === 'team' && (
                  <motion.div key="team" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="form-group">
                    <label style={labelStyle}>TÊN ĐỘI / DỰ ÁN</label>
                    <input {...register('teamName')} placeholder="Nhập tên đội của bạn..." style={inputStyle} className="minimal-input" />
                    {errors.teamName && <p className="error-msg">{errors.teamName.message}</p>}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="form-group">
                <label style={labelStyle}>ĐỊNH HƯỚNG DỰ ÁN / GIỚI THIỆU BẢN THÂN</label>
                <textarea 
                  {...register('interest')} 
                  placeholder="Chia sẻ ngắn gọn về ý tưởng hoặc kỹ năng bạn muốn đóng góp..." 
                  rows="2" 
                  style={{ 
                    ...inputStyle, 
                    height: 'auto',
                    minHeight: '100px',
                    padding: '16px 18px',
                    lineHeight: '1.6',
                    resize: 'none' 
                  }} 
                  className="minimal-input custom-scrollbar" 
                />
                {errors.interest && <p className="error-msg">{errors.interest.message}</p>}
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ width: '100%', justifyContent: 'center', height: '52px', marginTop: '8px', fontSize: '0.9rem', fontWeight: 800 }}>
                {isSubmitting ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN ĐĂNG KÝ'}
              </button>
            </form>
          </div>
        </>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        .minimal-input:focus { border-color: rgba(255,255,255,0.3) !important; background-color: rgba(255,255,255,0.04) !important; }
        .error-msg { color: #ff4d4d; font-size: 0.65rem; margin-top: 4px; font-weight: 500; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }

        @media (max-width: 950px) {
          div[style*="flex-direction: row"] { flex-direction: column !important; }
          div[style*="width: 28%"], div[style*="width: 72%"] { width: 100% !important; padding: 32px !important; }
          div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}} />
    </motion.div>
  );

  if (isFullPage) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', padding: '20px' }}>
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
