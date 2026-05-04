
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ConfirmLogoutDialog } from '@/components/ConfirmLogoutDialog';

export function UserAvatarDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isDropdownOpen]);

  const handleMenuItemClick = (action) => {
    setIsDropdownOpen(false);
    
    if (action === 'profile') {
      navigate('/profile');
    } else if (action === 'settings') {
      navigate('/settings');
    } else if (action === 'logout') {
      setIsLogoutDialogOpen(true);
    }
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="user-avatar-button flex items-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lavender-primary focus:ring-offset-2 rounded-full"
          aria-label="User menu"
          aria-expanded={isDropdownOpen}
        >
          {currentUser?.avatar ? (
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-transparent hover:border-lavender-light transition-all hover:scale-105 hover:shadow-lg">
              <img
                src={currentUser.avatar}
                alt={currentUser?.name || 'User'}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-lavender-primary text-white font-bold flex items-center justify-center text-sm md:text-base border-2 border-transparent hover:border-lavender-light transition-all hover:scale-105 hover:shadow-lg cursor-pointer">
              {getInitials(currentUser?.name)}
            </div>
          )}
          <ChevronDown
            className={`w-4 h-4 text-gray-600 transition-transform duration-200 hidden md:block ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {ReactDOM.createPortal(
        <AnimatePresence>
          {isDropdownOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-50"
                onClick={() => setIsDropdownOpen(false)}
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50 }}
              />
              
              <motion.div
                ref={dropdownRef}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="glossy-dropdown fixed right-0 top-0 h-full w-full max-w-md shadow-2xl flex flex-col z-50 rounded-l-2xl"
                onClick={(e) => e.stopPropagation()}
                style={{ position: 'fixed', top: 0, right: 0, height: '100vh', zIndex: 50 }}
              >
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white">Account</h2>
                    <p className="text-sm text-gray-300 mt-1 truncate">
                      {currentUser?.name || 'User'}
                    </p>
                  </div>
                  <Button 
                    onClick={() => setIsDropdownOpen(false)} 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-white/10 transition-colors flex-shrink-0"
                    aria-label="Close account menu"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex-grow p-6 overflow-y-auto space-y-3">
                  <button
                    onClick={() => handleMenuItemClick('profile')}
                    className="glossy-dropdown-item w-full flex items-center gap-4 p-4 rounded-lg transition-all"
                  >
                    <User className="w-5 h-5 text-white flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <span className="text-white font-medium text-base">Profile</span>
                      <p className="text-xs text-gray-400 mt-0.5">View and edit your profile</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleMenuItemClick('settings')}
                    className="glossy-dropdown-item w-full flex items-center gap-4 p-4 rounded-lg transition-all"
                  >
                    <Settings className="w-5 h-5 text-white flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <span className="text-white font-medium text-base">Settings</span>
                      <p className="text-xs text-gray-400 mt-0.5">Manage your preferences</p>
                    </div>
                  </button>

                  <div className="border-t border-white/10 my-3 pt-3">
                    <button
                      onClick={() => handleMenuItemClick('logout')}
                      className="glossy-dropdown-item w-full flex items-center gap-4 p-4 rounded-lg transition-all"
                    >
                      <LogOut className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <span className="text-red-400 font-medium text-base">Logout</span>
                        <p className="text-xs text-gray-400 mt-0.5">Sign out of your account</p>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="p-6 border-t border-white/10">
                  <p className="text-sm text-gray-400 text-center">
                    {currentUser?.email || 'user@example.com'}
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      <ConfirmLogoutDialog
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
      />
    </>
  );
}
