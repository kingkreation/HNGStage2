import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { useToast } from '../context/ToastContext';
import '../styles/auth.css';

export const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    // Redirect if already authenticated
    if (authService.isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const result = await authService.signup(formData.name, formData.email, formData.password);
    
    if (result.ok) {
      addToast('Account created successfully!', 'success');
      navigate('/dashboard');
    } else {
      addToast(result.message || 'Signup failed', 'error');
    }
    setLoading(false);
  };

  return (
    <main className="auth-page">
      <div className="container">
        <div className="auth-form-wrapper">
          <div className="auth-card">
            <h1>Create Account</h1>
            <p className="auth-subtitle">Join us and start managing your tickets</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'field-error' : ''}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  disabled={loading}
                />
                {errors.name && (
                  <div id="name-error" className="error-message" role="alert">
                    ⚠️ {errors.name}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'field-error' : ''}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  disabled={loading}
                />
                {errors.email && (
                  <div id="email-error" className="error-message" role="alert">
                    ⚠️ {errors.email}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'field-error' : ''}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  disabled={loading}
                />
                {errors.password && (
                  <div id="password-error" className="error-message" role="alert">
                    ⚠️ {errors.password}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'field-error' : ''}
                  aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                  disabled={loading}
                />
                {errors.confirmPassword && (
                  <div id="confirmPassword-error" className="error-message" role="alert">
                    ⚠️ {errors.confirmPassword}
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <div className="auth-footer">
              <p>Already have an account? <Link to="/auth/login">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};