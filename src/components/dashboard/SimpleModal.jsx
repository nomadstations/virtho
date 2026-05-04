
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function SimpleModal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay-base" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="modal-container-base"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-base">
              <h2 id="modal-title" className="text-lg font-bold text-gray-900">{title}</h2>
              <button 
                onClick={onClose} 
                className="modal-close-button"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body-base">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
