import React from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_LINKS } from '@/constants';

function Footer({ variant = 'light', className = '' }) {
  const isDark = variant === 'dark';
  
  const textClass = isDark ? 'text-gray-300' : 'text-gray-600';
  const hoverClass = isDark ? 'hover:text-white' : 'hover:text-purple-700';
  const borderClass = isDark ? 'border-white/10' : 'border-gray-200';

  return (
    <footer className={`w-full mt-auto border-t bg-white relative z-10 ${borderClass} ${className}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className={`${textClass} font-bold text-lg mb-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800`}>Virtho Foundation</p>
            <p className={`${textClass} text-sm font-medium`}>Human Development Hub</p>
            <p className={`${textClass} text-xs mt-3 opacity-80`}>© {new Date().getFullYear()} Virtho Foundation. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center md:justify-end">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.path} to={link.path} className={`${textClass} ${hoverClass} text-sm font-medium transition-colors`}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;