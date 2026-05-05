
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useQuickActions } from '@/hooks/useQuickActions';
import { useToast } from '@/hooks/use-toast';
import ModalWrapper from '@/components/common/ModalWrapper';
import AddOrganizationWizard from '@/components/dashboard/AddOrganizationWizard';
import AddGroupWizard from '@/components/dashboard/AddGroupWizard';
import ProjectCreationModal from '@/components/ProjectCreationModal';
import CourseCreationModal from '@/components/CourseCreationModal';
import JobCreationModal from '@/components/JobCreationModal';
import BlogManagementSection from '@/components/dashboard/BlogManagementSection';
import EventManagementSection from '@/components/dashboard/EventManagementSection';
import ProductManagementSection from '@/components/dashboard/ProductManagementSection';
import TeamManagementSection from '@/components/dashboard/TeamManagementSection';
import { useCourseCreationModal } from '@/hooks/useCourseCreationModal';
import { useJobCreationModal } from '@/hooks/useJobCreationModal';
import { useProjectCreationModal } from '@/hooks/useProjectCreationModal';
import styles from '@/styles/HeaderPopups.module.css';

const QuickActionsDropdown = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { quickActions } = useQuickActions();

  // Modal states
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Use existing modal hooks
  const projectModal = useProjectCreationModal();
  const courseModal = useCourseCreationModal();
  const jobModal = useJobCreationModal();

  const handleActionClick = (action) => {
    console.log('[QuickActionsDropdown] Action clicked:', action.id);
    
    setIsOpen(false);

    try {
      switch (action.id) {
        case 'create-organization':
          setIsOrgModalOpen(true);
          break;
        
        case 'create-group':
          setIsGroupModalOpen(true);
          break;
        
        case 'create-project':
          projectModal.openModal();
          break;
        
        case 'create-team':
          setIsTeamModalOpen(true);
          break;
        
        case 'create-post':
          setIsBlogModalOpen(true);
          break;
        
        case 'create-event':
          setIsEventModalOpen(true);
          break;
        
        case 'add-product':
          setIsProductModalOpen(true);
          break;
        
        case 'add-course':
          courseModal.openModal();
          break;
        
        case 'post-job':
          jobModal.openModal();
          break;
        
        default:
          toast({
            title: '🚧 Feature Not Implemented',
            description: `${action.label} functionality is coming soon!`,
          });
      }
    } catch (error) {
      console.error('[QuickActionsDropdown] Error executing action:', error);
      toast({
        title: 'Error',
        description: 'There was a problem executing this action. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      {ReactDOM.createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.popupOverlay}
                onClick={() => setIsOpen(false)}
              />
              
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={styles.headerPopup}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.popupHeader}>
                  <h2>Quick Actions</h2>
                  <Button 
                    onClick={() => setIsOpen(false)} 
                    variant="ghost" 
                    size="icon"
                    aria-label="Close quick actions"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className={styles.popupContent}>
                  {quickActions.length === 0 ? (
                    <div className="emptyState">
                      <p>No quick actions available.</p>
                      <p className="subtitle">Customize your quick actions in dashboard settings.</p>
                    </div>
                  ) : (
                    <div className={styles.popupGrid}>
                      {quickActions.map((action) => {
                        const IconComponent = action.iconComponent;
                        return (
                          <button
                            key={action.id}
                            onClick={() => handleActionClick(action)}
                            className={styles.dropdownTile}
                            aria-label={action.label}
                          >
                            <IconComponent strokeWidth={2.5} />
                            <span>{action.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className={styles.popupFooter}>
                  <p>Quick actions for faster workflows</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Modal Components with ModalWrapper */}
      <ModalWrapper isOpen={isOrgModalOpen} onClose={() => setIsOrgModalOpen(false)}>
        <AddOrganizationWizard 
          isOpen={isOrgModalOpen}
          onClose={() => setIsOrgModalOpen(false)}
        />
      </ModalWrapper>

      <ModalWrapper isOpen={isGroupModalOpen} onClose={() => setIsGroupModalOpen(false)}>
        <AddGroupWizard 
          isOpen={isGroupModalOpen}
          onClose={() => setIsGroupModalOpen(false)}
        />
      </ModalWrapper>

      <ModalWrapper isOpen={projectModal.isModalOpen} onClose={projectModal.closeModal}>
        <ProjectCreationModal
          isOpen={projectModal.isModalOpen}
          onClose={projectModal.closeModal}
          formData={projectModal.formData}
          errors={projectModal.errors}
          isSubmitting={projectModal.isSubmitting}
          onInputChange={projectModal.handleInputChange}
          onImageUpload={projectModal.handleImageUpload}
          onSubmit={projectModal.handleSubmit}
          constants={projectModal.constants}
        />
      </ModalWrapper>

      <ModalWrapper isOpen={courseModal.isModalOpen} onClose={courseModal.closeModal}>
        <CourseCreationModal
          isOpen={courseModal.isModalOpen}
          onClose={courseModal.closeModal}
          formData={courseModal.formData}
          errors={courseModal.errors}
          isSubmitting={courseModal.isSubmitting}
          onInputChange={courseModal.handleInputChange}
          onImageUpload={courseModal.handleImageUpload}
          onSubmit={courseModal.handleSubmit}
          constants={courseModal.constants}
        />
      </ModalWrapper>

      <ModalWrapper isOpen={jobModal.isModalOpen} onClose={jobModal.closeModal}>
        <JobCreationModal
          isOpen={jobModal.isModalOpen}
          onClose={jobModal.closeModal}
          formData={jobModal.formData}
          errors={jobModal.errors}
          isSubmitting={jobModal.isSubmitting}
          onInputChange={jobModal.handleInputChange}
          onImageUpload={jobModal.handleImageUpload}
          onSubmit={jobModal.handleSubmit}
          constants={jobModal.constants}
        />
      </ModalWrapper>

      {/* Embedded management sections for Blog, Event, Product, Team */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4" onClick={() => setIsBlogModalOpen(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Write a Post</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsBlogModalOpen(false)} aria-label="Close">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6">
              <BlogManagementSection />
            </div>
          </div>
        </div>
      )}

      {isEventModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4" onClick={() => setIsEventModalOpen(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Create Event</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsEventModalOpen(false)} aria-label="Close">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6">
              <EventManagementSection />
            </div>
          </div>
        </div>
      )}

      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4" onClick={() => setIsProductModalOpen(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Add Product</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsProductModalOpen(false)} aria-label="Close">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6">
              <ProductManagementSection />
            </div>
          </div>
        </div>
      )}

      {isTeamModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4" onClick={() => setIsTeamModalOpen(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Create Team</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsTeamModalOpen(false)} aria-label="Close">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6">
              <TeamManagementSection />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActionsDropdown;
