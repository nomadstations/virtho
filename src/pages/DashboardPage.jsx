
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardContent from '@/components/DashboardContent';
import DashboardBreadcrumb from '@/components/DashboardBreadcrumb';
import { useToast } from '@/components/ui/use-toast';

import ModalWrapper from '@/components/common/ModalWrapper';
import AddGroupWizard from '@/components/dashboard/AddGroupWizard';
import AddOrganizationWizard from '@/components/dashboard/AddOrganizationWizard';
import ProjectCreationModal from '@/components/ProjectCreationModal';
import CourseCreationModal from '@/components/CourseCreationModal';
import JobCreationModal from '@/components/JobCreationModal';

import { useProjectCreationModal } from '@/hooks/useProjectCreationModal';
import { useCourseCreationModal } from '@/hooks/useCourseCreationModal';
import { useJobCreationModal } from '@/hooks/useJobCreationModal';

export default function DashboardPage() {
  const { currentUser, dashboardData } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isAddGroupWizardOpen, setIsAddGroupWizardOpen] = useState(false);
  const [isAddOrganizationWizardOpen, setIsAddOrganizationWizardOpen] = useState(false);

  const projectModal = useProjectCreationModal();
  const courseModal = useCourseCreationModal();
  const jobModal = useJobCreationModal();

  const handleQuickActionClick = (action) => {
    console.log('[DashboardPage] Quick Action clicked:', action.id);
    
    switch (action.id) {
      case 'create-organization':
        setIsAddOrganizationWizardOpen(true);
        break;
      
      case 'create-group':
        setIsAddGroupWizardOpen(true);
        break;
      
      case 'create-project':
        projectModal.openModal();
        break;
      
      case 'add-course':
        courseModal.openModal();
        break;
      
      case 'post-job':
        jobModal.openModal();
        break;
      
      case 'create-team':
        toast({
          title: '🚧 Create Team',
          description: 'Team creation feature coming soon!',
        });
        break;
      
      case 'create-post':
        toast({
          title: '✍️ Write a Post',
          description: 'Post creation feature coming soon!',
        });
        break;
      
      case 'create-event':
        toast({
          title: '📅 Create Event',
          description: 'Event creation feature coming soon!',
        });
        break;
      
      case 'add-product':
        toast({
          title: '🛍️ Add Product',
          description: 'Product creation feature coming soon!',
        });
        break;
      
      default:
        toast({
          title: '🚧 Feature Not Implemented',
          description: `${action.label} functionality is coming soon!`,
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Virtho Platform</title>
        <meta name="description" content="Manage your projects, collaborate with teams, and track your progress." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 w-full">
        <main className="w-full max-w-[1920px] mx-auto">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 md:py-6 lg:py-8">
            <DashboardBreadcrumb />
            <div className="mt-4 md:mt-6 lg:mt-8">
              <DashboardContent onQuickActionClick={handleQuickActionClick} />
            </div>
          </div>
        </main>
      </div>

      <ModalWrapper isOpen={isAddGroupWizardOpen} onClose={() => setIsAddGroupWizardOpen(false)}>
        <AddGroupWizard 
          isOpen={isAddGroupWizardOpen} 
          onClose={() => setIsAddGroupWizardOpen(false)} 
        />
      </ModalWrapper>

      <ModalWrapper isOpen={isAddOrganizationWizardOpen} onClose={() => setIsAddOrganizationWizardOpen(false)}>
        <AddOrganizationWizard 
          isOpen={isAddOrganizationWizardOpen} 
          onClose={() => setIsAddOrganizationWizardOpen(false)} 
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
    </>
  );
}
