
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useQuickActions } from '@/hooks/useQuickActions';
import { useToast } from '@/hooks/use-toast';
import { AddOrganizationWizard } from '@/components/dashboard/AddOrganizationWizard.jsx';
import { AddGroupWizard } from '@/components/dashboard/AddGroupWizard.jsx';
import ProjectCreationModal from '@/components/ProjectCreationModal.jsx';
import CourseCreationModal from '@/components/CourseCreationModal.jsx';
import JobCreationModal from '@/components/JobCreationModal.jsx';
import BlogManagementSection from '@/components/dashboard/BlogManagementSection.jsx';
import EventManagementSection from '@/components/dashboard/EventManagementSection.jsx';
import ProductManagementSection from '@/components/dashboard/ProductManagementSection.jsx';
import TeamManagementSection from '@/components/dashboard/TeamManagementSection.jsx';
import { useCourseCreationModal } from '@/hooks/useCourseCreationModal';
import { useJobCreationModal } from '@/hooks/useJobCreationModal';
import { useProjectCreationModal } from '@/hooks/useProjectCreationModal';

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
                className="fixed inset-0 bg-black/60 z-50"
                onClick={() => setIsOpen(false)}
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50 }}
              />
              
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="glossy-dropdown fixed right-0 top-0 h-full w-full max-w-md shadow-2xl flex flex-col z-50 rounded-l-2xl"
                onClick={(e) => e.stopPropagation()}
                style={{ position: 'fixed', top: 0, right: 0, height: '100vh', zIndex: 50 }}
              >
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
                  <Button 
                    onClick={() => setIsOpen(false)} 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-white/10 transition-colors"
                    aria-label="Close quick actions"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex-grow p-4 sm:p-6 overflow-y-auto">
                  {quickActions.length === 0 ? (
                    <div className="text-center text-gray-300 h-full flex flex-col items-center justify-center">
                      <p className="text-base font-medium text-white">No quick actions available.</p>
                      <p className="text-sm mt-2 text-gray-400">Customize your quick actions in dashboard settings.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
                      {quickActions.map((action) => {
                        const IconComponent = action.iconComponent;
                        return (
                          <button
                            key={action.id}
                            onClick={() => handleActionClick(action)}
                            className="group"
                            aria-label={action.label}
                          >
                            <div className="dropdown-tile h-28 sm:h-32">
                              <IconComponent className="dropdown-tile-icon" strokeWidth={2.5} />
                              <span className="dropdown-tile-label">
                                {action.label}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="p-6 border-t border-white/10">
                  <p className="text-sm text-gray-400 text-center">
                    Quick actions for faster workflows
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Modal Components */}
      <AddOrganizationWizard 
        isOpen={isOrgModalOpen}
        onClose={() => setIsOrgModalOpen(false)}
      />

      <AddGroupWizard 
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
      />

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
