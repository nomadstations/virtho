import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Send, Music } from 'lucide-react';
import { FOOTER_LINKS } from '@/constants';
import '@/styles/FooterMenu.css';

function Footer({ variant = 'light', className = '' }) {
  const isDark = variant === 'dark';
  
  const textClass = isDark ? 'text-gray-300' : 'text-gray-600';
  const hoverClass = isDark ? 'hover:text-white' : 'hover:text-lavender-primary';
  const borderClass = isDark ? 'border-white/10' : 'border-gray-200';

  return (
    <footer className={`footer-container ${borderClass} ${className}`}>
      <div className="footer-wrapper">
        <div className="footer-grid">
          <div className="footer-section footer-branding">
            <p className="footer-brand-title">Virtho Foundation</p>
            <p className="footer-brand-tagline">Human Development Hub</p>
            
            <div className="footer-social-links">
              <a 
                href="https://facebook.com" 
                className="footer-social-link" 
                aria-label="Follow us on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="footer-social-icon" />
              </a>
              <a 
                href="https://instagram.com" 
                className="footer-social-link" 
                aria-label="Follow us on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="footer-social-icon" />
              </a>
              <a 
                href="https://linkedin.com" 
                className="footer-social-link" 
                aria-label="Follow us on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="footer-social-icon" />
              </a>
              <a 
                href="https://youtube.com" 
                className="footer-social-link" 
                aria-label="Follow us on YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="footer-social-icon" />
              </a>
              <a 
                href="https://telegram.org" 
                className="footer-social-link" 
                aria-label="Follow us on Telegram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send className="footer-social-icon" />
              </a>
              <a 
                href="https://x.com" 
                className="footer-social-link" 
                aria-label="Follow us on X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg 
                  className="footer-social-icon" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://tiktok.com" 
                className="footer-social-link" 
                aria-label="Follow us on TikTok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Music className="footer-social-icon" />
              </a>
            </div>
            
            <p className="footer-copyright">© {new Date().getFullYear()} Virtho Foundation. All rights reserved.</p>
          </div>
          <div className="footer-section footer-nav-section">
            <div className="footer-nav-wrapper">
              {FOOTER_LINKS.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`footer-link footer-nav-link ${textClass} ${hoverClass}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;