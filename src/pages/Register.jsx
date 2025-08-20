import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, UserPlus } from 'lucide-react';

const Register = () => {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = t('validation.nameRequired');
    } else if (formData.name.length < 2) {
      newErrors.name = t('validation.nameMinLength');
    }
    
    if (!formData.email) {
      newErrors.email = t('validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validation.emailInvalid');
    }
    
    if (!formData.password) {
      newErrors.password = t('validation.passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('validation.passwordMinLength');
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('validation.confirmPasswordRequired');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('validation.passwordsDoNotMatch');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const result = await register(formData);
      
      if (result.success) {
        navigate('/');
      } else {
        setErrors({ general: result.error || t('auth.registrationFailed') });
      }
    } catch (error) {
      setErrors({ general: t('auth.registrationFailed') });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ backgroundImage: 'linear-gradient(135deg, #497146ff, #6b9071 , #9fd4a3ff)'}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="auth-form p-4">
              <div className="text-center mb-3">
                <div className="auth-icon mb-2">
                  <UserPlus size={40} />
                </div>
                <h2 className="h4 mb-1">{t('auth.register')}</h2>
                <p className="text-light opacity-75 small">{t('auth.createAccount')}</p>
              </div>

              {errors.general && (
                <div className="alert alert-danger py-2" role="alert">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label small">
                    <User size={16} className="me-2" />
                    {t('auth.fullName')}
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('auth.enterFullName')}
                    required
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label small">
                    <Mail size={16} className="me-2" />
                    {t('auth.email')}
                  </label>
                  <input
                    type="email"
                    className={`form-control form-control-sm ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('auth.enterEmail')}
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label small">
                    <Lock size={16} className="me-2" />
                    {t('auth.password')}
                  </label>
                  <div className="input-group input-group-sm">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control form-control-sm ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder={t('auth.enterPassword')}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-light pass-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label small">
                    <Lock size={16} className="me-2" />
                    {t('auth.confirmPassword')}
                  </label>
                  <div className="input-group input-group-sm">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className={`form-control form-control-sm ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder={t('auth.confirmPassword')}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-light pass-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="agreeTerms" required />
                    <label className="form-check-label text-light small" htmlFor="agreeTerms">
                      {t('auth.agreeToTerms')}
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-light w-100 mb-3 btn-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {t('common.loading')}
                    </>
                  ) : (
                    t('auth.createAccount')
                  )}
                </button>

                <div className="text-center">
                  <span className="text-light opacity-75 small">{t('auth.alreadyHaveAccount')} </span>
                  <Link to="/login" className="text-light text-decoration-none fw-bold small">
                    {t('auth.signIn')}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;


