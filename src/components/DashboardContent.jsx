
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useQuickActions } from '@/hooks/useQuickActions';
import { useQuickLinks } from '@/hooks/useQuickLinks';
import { QuickActionsSection } from '@/components/dashboard/QuickActionsSection';
import { QuickLinksSection } from '@/components/dashboard/QuickLinksSection';
import DashboardSettings from '@/components/dashboard/DashboardSettings';
import { FileText, Briefcase, ShoppingBag, Users, Activity, GraduationCap } from 'lucide-react';
import { useCoursesData } from '@/hooks/useCoursesData';
import { useToast } from '@/components/ui/use-toast';

export default function DashboardContent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser, dashboardData } = useAuth();
  const { quickActions } = useQuickActions();
  const { quickLinks } = useQuickLinks();
  const { courses } = useCoursesData();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  console.log('[DashboardContent] Rendering with quickActions:', quickActions);
  console.log('[DashboardContent] quickActions.length:', quickActions.length);

  const activeCoursesCount = courses.filter(c => c.status?.toLowerCase() === 'active').length;

  const stats = [
    { label: 'Total Courses', value: courses.length, icon: <GraduationCap size={24} className="text-yellow-500" /> },
    { label: 'Active Courses', value: activeCoursesCount, icon: <Activity size={24} className="text-green-500" /> },
    { label: 'Total Blogs', value: dashboardData.blogs.length, icon: <FileText size={24} className="text-blue-500" /> },
    { label: 'Total Projects', value: dashboardData.projects.length, icon: <Briefcase size={24} className="text-purple-500" /> },
    { label: 'Total Products', value: dashboardData.products.length, icon: <ShoppingBag size={24} className="text-emerald-500" /> },
    { label: 'Active Teams', value: dashboardData.teams.length, icon: <Users size={24} className="text-indigo-500" /> },
  ];

  const handleActionClick = (action) => {
    console.log('[DashboardContent] Action clicked:', action.id);
    
    try {
      switch (action.id) {
        case 'create-organization':
          toast({
            title: '🏢 Create Organization',
            description: 'Organization creation modal will open here.',
          });
          break;
        
        case 'create-group':
          toast({
            title: '👥 Create Group',
            description: 'Group creation modal will open here.',
          });
          break;
        
        case 'create-project':
          navigate('/create-project');
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
        
        case 'add-course':
          toast({
            title: '🎓 Add Course',
            description: 'Course creation feature coming soon!',
          });
          break;
        
        case 'post-job':
          toast({
            title: '💼 Post a Job',
            description: 'Job posting feature coming soon!',
          });
          break;
        
        default:
          toast({
            title: '🚧 Feature Not Implemented',
            description: `${action.label} functionality is coming soon!`,
          });
      }
    } catch (error) {
      console.error('[DashboardContent] Error executing action:', error);
      toast({
        title: 'Error',
        description: 'There was a problem executing this action. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleOpenSettings = () => {
    console.log('[DashboardContent] Opening settings');
    setIsSettingsOpen(true);
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6 md:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-lavender-primary via-lavender-light to-lavender-lighter rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg text-white w-full"
      >
        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Welcome back, {currentUser.name}! 👋
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-lavender-lightest opacity-90">
            Here's what's happening with your projects and activities today.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 w-full">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
              <div className="flex-shrink-0">{stat.icon}</div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-600 truncate">{stat.label}</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="w-full">
        <QuickLinksSection 
          quickLinks={quickLinks}
          onOpenSettings={handleOpenSettings}
        />
      </div>

      <div className="w-full">
        <QuickActionsSection 
          quickActions={quickActions}
          onActionClick={handleActionClick}
          onOpenSettings={handleOpenSettings}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Recent Activity</h2>
            <p className="text-sm text-gray-600 mt-1">Your latest actions and updates</p>
          </div>
          <Activity className="w-6 h-6 text-lavender-primary" />
        </div>
        <div className="space-y-4">
          {dashboardData.activities.slice(0, 5).map((activity, index) => (
            <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
              <div className="w-2 h-2 rounded-full bg-lavender-primary mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base text-gray-900">{activity.text}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <DashboardSettings 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
}
