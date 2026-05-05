
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FolderKanban } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import ProjectManagementSection from '@/components/dashboard/ProjectManagementSection';

function ProjectsManagementPage() {
  return (
    <>
      <Helmet>
        <title>Projects Management - Dashboard</title>
        <meta name="description" content="Manage your projects, create new projects, and track project progress." />
      </Helmet>

      <DashboardLayout>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Page Header */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                  <FolderKanban className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Projects Management</h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Create, manage, and track all your projects
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Management Section */}
          <ProjectManagementSection />
        </motion.div>
      </DashboardLayout>
    </>
  );
}

export default ProjectsManagementPage;
