
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Building, Users, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ActingOnBehalfDropdown = ({ 
  isOpen, 
  onClose, 
  actingContext, 
  actingEntity, 
  onContextChange 
}) => {
  const dropdownRef = useRef(null);

  const options = [
    { id: 'person-alex', type: 'person', name: 'Alex Developer', icon: User },
    { id: 'org-1', type: 'organization', name: 'Tech Corp', icon: Building },
    { id: 'org-2', type: 'organization', name: 'Design Studio', icon: Building },
    { id: 'group-1', type: 'group', name: 'Frontend Team', icon: Users },
    { id: 'group-2', type: 'group', name: 'Backend Team', icon: Users },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleOptionClick = (option) => {
    onContextChange({ type: option.type, entity: option.name });
    onClose();
  };

  const isSelected = (option) => {
    return option.type === actingContext && option.name === actingEntity;
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={onClose}
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
              <h2 className="text-2xl font-bold text-white">Acting On Behalf</h2>
              <Button 
                onClick={onClose} 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10 transition-colors"
                aria-label="Close acting on behalf dropdown"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-grow p-4 sm:p-6 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
                {options.map((option) => {
                  const IconComponent = option.icon;
                  const selected = isSelected(option);
                  
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionClick(option)}
                      className="group relative"
                      aria-label={`Switch to ${option.name}`}
                    >
                      <div className={`dropdown-tile h-28 sm:h-32 ${selected ? 'ring-2 ring-purple-400' : ''}`}>
                        <IconComponent className="dropdown-tile-icon" strokeWidth={2.5} />
                        <span className="dropdown-tile-label">
                          {option.name}
                        </span>
                        {selected && (
                          <div className="absolute top-2 right-2">
                            <Check className="w-4 h-4 text-purple-300" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {options.length === 0 && (
                <div className="text-center text-gray-300 h-full flex flex-col items-center justify-center">
                  <p className="text-base font-medium text-white">No options available</p>
                  <p className="text-sm mt-2 text-gray-400">Manage your contexts in settings.</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/10">
              <p className="text-sm text-gray-400 text-center">
                Switch between personal, organization, and group contexts
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ActingOnBehalfDropdown;
