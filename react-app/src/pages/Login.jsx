import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { useToast } from '../context/ToastContext';
import '../styles/auth.css';

export const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
    const result = await authService.login(formData.email, formData.password);
    
    if (result.ok) {
      addToast('Login successful!', 'success');
      navigate('/dashboard');
    } else {
      addToast(result.message || 'Login failed', 'error');
    }
    setLoading(false);
  };

  return (
    <main className="auth-page">
      <div className="container">
        <div className="auth-form-wrapper">
          <div className="auth-card">
            <h1>Login</h1>
            <p className="auth-subtitle">Welcome back! Login to your account</p>

            <form onSubmit={handleSubmit} noValidate>
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

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="auth-footer">
              <p>Don't have an account? <Link to="/auth/signup">Sign up</Link></p>
            </div>

            <div className="demo-credentials">
              <p><strong>Demo Credentials:</strong></p>
              <p>Email: demo@ticketapp.test</p>
              <p>Password: Password123!</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};