import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Building, Users, X, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import styles from '@/styles/HeaderPopups.module.css';

const getEntityIcon = (type) => {
  if (type === 'ORGANIZATION') return Building;
  if (type === 'GROUP') return Users;
  return User;
};

const getUiContextType = (type) => {
  if (type === 'ORGANIZATION') return 'organization';
  if (type === 'GROUP') return 'group';
  return 'person';
};

const ActingOnBehalfDropdown = ({
  isOpen,
  onClose,
  actingContext,
  actingEntity,
  onContextChange,
}) => {
  const dropdownRef = useRef(null);
  const { myEntities, isEntitiesLoading, myEntitiesError } = useAuth();

  const options = myEntities.map((entity) => ({
    id: entity.id,
    type: getUiContextType(entity.type),
    entityType: entity.type,
    name: entity.name,
    status: entity.status,
    icon: getEntityIcon(entity.type),
    rawEntity: entity,
  }));

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
    onContextChange({
      type: option.type,
      entity: option.name,
      entityId: option.id,
      entityType: option.entityType,
      rawEntity: option.rawEntity,
    });

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
            className={styles.popupOverlay}
            onClick={onClose}
          />

          <motion.div
            ref={dropdownRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={styles.headerPopup}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.popupHeader}>
              <h2>Acting On Behalf</h2>

              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                aria-label="Close acting on behalf dropdown"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className={styles.popupContent}>
              {isEntitiesLoading && (
                <div className="emptyState">
                  <p>Loading entities...</p>
                  <p className="subtitle">Fetching your available contexts.</p>
                </div>
              )}

              {!isEntitiesLoading && myEntitiesError && (
                <div className="emptyState">
                  <AlertCircle className="w-6 h-6 mx-auto mb-2 text-red-400" />
                  <p>Could not load entities</p>
                  <p className="subtitle">Please refresh the page and try again.</p>
                </div>
              )}

              {!isEntitiesLoading && !myEntitiesError && options.length > 0 && (
                <div className={styles.popupGrid}>
                  {options.map((option) => {
                    const IconComponent = option.icon;
                    const selected = isSelected(option);

                    return (
                      <button
                        key={option.id}
                        onClick={() => handleOptionClick(option)}
                        className={`${styles.dropdownTile} ${selected ? 'ring-2 ring-purple-400' : ''}`}
                        aria-label={`Switch to ${option.name}`}
                      >
                        <IconComponent strokeWidth={2.5} />
                        <span>{option.name}</span>
                        <small className="text-[10px] uppercase tracking-wide text-gray-400">
                          {option.entityType}
                        </small>

                        {selected && (
                          <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
                            <Check className="w-4 h-4 text-purple-300" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {!isEntitiesLoading && !myEntitiesError && options.length === 0 && (
                <div className="emptyState">
                  <p>No entities available</p>
                  <p className="subtitle">Your account has no active contexts yet.</p>
                </div>
              )}
            </div>

            <div className={styles.popupFooter}>
              <p>Switch between your individual, organization, and group contexts</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ActingOnBehalfDropdown;