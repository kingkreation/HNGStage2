import React from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import '../styles/landing.css';

export const Landing = () => {
  const isAuthenticated = authService.isAuthenticated();

  return (
    <main className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-decorative-circle hero-circle-1"></div>
        <div className="container">
          <div className="hero-content">
            <h1>Manage Your Tickets Effortlessly</h1>
            <p className="hero-subtitle">
              A modern, responsive ticket management system. Choose your framework: React, Vue.js, or Twig.
            </p>
            <div className="hero-cta">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="btn btn-primary">
                    Go to Dashboard
                  </Link>
                  <Link to="/tickets" className="btn btn-secondary">
                    View Tickets
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/auth/login" className="btn btn-primary">
                    Login
                  </Link>
                  <Link to="/auth/signup" className="btn btn-secondary">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <svg className="hero-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,64L120,69.3C240,75,480,85,720,85.3C960,85,1200,75,1320,69.3L1440,64L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" fill="url(#waveGradient)" />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.05 }} />
            </linearGradient>
          </defs>
        </svg>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Ticket App?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Easy Management</h3>
              <p>Create, view, edit, and delete tickets with an intuitive interface.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure</h3>
              <p>Session-based authentication to keep your data safe.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Responsive</h3>
              <p>Works seamlessly on mobile, tablet, and desktop devices.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast</h3>
              <p>Optimized performance across all framework implementations.</p>
            </div>
          </div>
        </div>
        <div className="hero-decorative-circle hero-circle-2"></div>
      </section>

      {/* Framework Section */}
      <section className="frameworks">
        <div className="container">
          <h2>Available Implementations</h2>
          <div className="frameworks-grid">
            <div className="framework-card">
              <h3>⚛️ React</h3>
              <p>Modern, component-based architecture with hooks and routing.</p>
              <a href="#react" className="btn btn-primary">Learn More</a>
            </div>
            <div className="framework-card">
              <h3>💚 Vue.js</h3>
              <p>Progressive framework with composition API and excellent DX.</p>
              <a href="#vue" className="btn btn-primary">Learn More</a>
            </div>
            <div className="framework-card">
              <h3>🌿 Twig</h3>
              <p>Server-rendered templates with PHP, perfect for backend devs.</p>
              <a href="#twig" className="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Create an account and start managing your tickets today!</p>
            {!isAuthenticated && (
              <Link to="/auth/signup" className="btn btn-primary btn-large">
                Sign Up Now
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};