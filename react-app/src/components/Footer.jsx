import React from 'react';
import '../styles/footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Ticket App</h3>
            <p>A modern ticket management system built with React, Vue, and Twig.</p>
          </div>
          
          <div className="footer-section">
            <h4>Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/">Documentation</a></li>
              <li><a href="/">Support</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: kolawolejoshua459@gmail.com</p>
            <p>© {currentYear} Ticket App. All rights reserved.</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Built with ❤️ by King for HNG Stage 2</p>
        </div>
      </div>
    </footer>
  );
};