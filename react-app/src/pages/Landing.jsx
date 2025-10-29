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
            <h1>Streamline Your Support Workflow</h1>
            <p className="hero-subtitle">
              A powerful ticket management system built with modern web technologies. Organize, track, and resolve customer issues efficiently across your entire team.
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
          <h2>Everything You Need to Manage Tickets</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3>Intuitive Management</h3>
              <p>Create, organize, and track tickets with a clean interface designed for productivity and ease of use.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3>Secure Access</h3>
              <p>Protected with session-based authentication ensuring your tickets and data remain private and secure.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3>Fully Responsive</h3>
              <p>Access your tickets anywhere with a responsive design that works flawlessly on desktop, tablet, and mobile.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3>Lightning Fast</h3>
              <p>Built with performance in mind, delivering instant responses and smooth interactions across all devices.</p>
            </div>
          </div>
        </div>
        <div className="hero-decorative-circle hero-circle-2"></div>
      </section>

      {/* Frameworks Section */}
      <section className="frameworks">
        <div className="container">
          <h2>Built with Modern Technologies</h2>
          <div className="frameworks-grid">
            <div className="framework-card">
              <div className="framework-badge">React</div>
              <h3>React Implementation</h3>
              <p>Component-based architecture powered by React 18 with hooks, routing, and efficient state management.</p>
              <a href="https://kinghngstage2.vercel.app/" className="btn btn-outline">Learn More</a>
            </div>
            <div className="framework-card">
              <div className="framework-badge">Vue</div>
              <h3>Vue.js Implementation</h3>
              <p>Progressive framework leveraging Vue 3 Composition API for reactive, maintainable code with excellent developer experience.</p>
              <a href="#vue" className="btn btn-outline">Learn More</a>
            </div>
            <div className="framework-card">
              <div className="framework-badge">PHP</div>
              <h3>Twig Implementation</h3>
              <p>Server-side rendering with Twig templates and PHP, providing a traditional yet powerful approach for backend developers.</p>
              <a href="#twig" className="btn btn-outline">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Workflow?</h2>
            <p>Join thousands of teams already managing their support tickets more efficiently.</p>
            {!isAuthenticated && (
              <Link to="/auth/signup" className="btn btn-primary btn-large">
                Create Free Account
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
