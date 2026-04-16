import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FolderKanban, 
  Users, 
  Briefcase, 
  GraduationCap, 
  ShoppingBag,
  ArrowRight,
  Clock,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useToast } from '@/components/ui/use-toast';
import { AddOrganizationModal } from '@/components/dashboard/AddOrganizationModal.jsx';
import { AddGroupModal } from '@/components/dashboard/AddGroupModal.jsx';

function DashboardContent() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isAddOrgModalOpen, setIsAddOrgModalOpen] = useState(false);
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);

  const openAddOrgModal = useCallback(() => setIsAddOrgModalOpen(true), []);
  const closeAddOrgModal = useCallback(() => setIsAddOrgModalOpen(false), []);
  
  const openAddGroupModal = useCallback(() => setIsAddGroupModalOpen(true), []);
  const closeAddGroupModal = useCallback(() => setIsAddGroupModalOpen(false), []);

  const handleNotImplemented = () => {
    toast({
      title: "Coming Soon",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  // Explicitly defined 7 quick actions in the requested order
  const quickActions = [
    { label: 'Add Organization', icon: Plus, color: 'bg-amber-100 text-amber-700 hover:bg-amber-200', action: openAddOrgModal },
    { label: 'Add Group', icon: Plus, color: 'bg-teal-100 text-teal-700 hover:bg-teal-200', action: openAddGroupModal },
    { label: 'Add Course', icon: Plus, color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200', action: () => navigate('/dashboard') },
    { label: 'Add Project', icon: Plus, color: 'bg-purple-100 text-purple-700 hover:bg-purple-200', action: () => navigate('/create-project') },
    { label: 'Write a Post', icon: Plus, color: 'bg-pink-100 text-pink-700 hover:bg-pink-200', action: handleNotImplemented },
    { label: 'Create Event', icon: Plus, color: 'bg-green-100 text-green-700 hover:bg-green-200', action: handleNotImplemented },
    { label: 'Add Product', icon: Plus, color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200', action: handleNotImplemented },
  ];

  const navigationAccess = [
    { title: 'My Projects', icon: FolderKanban, path: '/projects', color: 'bg-blue-50 text-blue-600', hover: 'hover:bg-blue-600' },
    { title: 'Communities', icon: Users, path: '/community', color: 'bg-green-50 text-green-600', hover: 'hover:bg-green-600' },
    { title: 'Job Board', icon: Briefcase, path: '/jobs', color: 'bg-yellow-50 text-yellow-600', hover: 'hover:bg-yellow-600' },
    { title: 'Learning Hub', icon: GraduationCap, path: '/learning', color: 'bg-purple-50 text-purple-600', hover: 'hover:bg-purple-600' },
    { title: 'Marketplace', icon: ShoppingBag, path: '/marketplace', color: 'bg-pink-50 text-pink-600', hover: 'hover:bg-pink-600' },
  ];

  const recentActivity = [
    { id: 1, action: 'Logged in to dashboard', time: 'Just now', type: 'system' },
    { id: 2, action: 'Viewed latest projects', time: '2 hours ago', type: 'project' },
    { id: 3, action: 'Updated profile settings', time: 'Yesterday', type: 'user' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <motion.div 
        className="max-w-7xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {currentUser?.name || 'User'}! 👋</h1>
              <p className="text-gray-500 text-lg">Ready to make an impact today?</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div variants={itemVariants} className="mb-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          
          {/* Pill-shaped Quick Actions - Ensure mapping includes ALL items */}
          <div className="flex flex-wrap gap-3 mb-8">
            {quickActions.map((action, index) => (
              <button
                key={`${action.label}-${index}`}
                onClick={action.action}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-200 hover:shadow-sm ${action.color}`}
              >
                <action.icon className="w-4 h-4" />
                {action.label}
              </button>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-4">Jump To...</h3>
          {/* Other Quick Action Items (Navigation) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {navigationAccess.map((item, index) => (
              <Link key={index} to={item.path} className="h-full block">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col items-center text-center h-full cursor-pointer hover:bg-white">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${item.color} group-${item.hover} group-hover:text-white`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-gray-800 font-semibold group-hover:text-purple-600 transition-colors">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity & Stats */}
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
              <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 shadow-md text-white">
            <h2 className="text-xl font-bold mb-6 text-white/90">Your Overview</h2>
            <div className="space-y-6">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-white/70 text-sm font-medium mb-1">Active Projects</p>
                <p className="text-3xl font-bold">0</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-white/70 text-sm font-medium mb-1">Communities Joined</p>
                <p className="text-3xl font-bold">0</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-white/70 text-sm font-medium mb-1">Learning Progress</p>
                <p className="text-3xl font-bold">0%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modals for Quick Actions */}
      <AddOrganizationModal 
        isOpen={isAddOrgModalOpen} 
        onClose={closeAddOrgModal} 
      />
      <AddGroupModal 
        isOpen={isAddGroupModalOpen} 
        onClose={closeAddGroupModal} 
      />
    </>
  );
}

export default DashboardContent;