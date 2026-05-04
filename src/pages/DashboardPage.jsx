
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import DashboardContent from '@/components/DashboardContent';
import DashboardBreadcrumb from '@/components/DashboardBreadcrumb';
import { FileText, Briefcase, Calendar, ShoppingBag, FolderGit2, Users, Plus, Activity, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

import BlogManagementSection from '@/components/dashboard/BlogManagementSection';
import ProjectManagementSection from '@/components/dashboard/ProjectManagementSection';
import EventManagementSection from '@/components/dashboard/EventManagementSection';
import ProductManagementSection from '@/components/dashboard/ProductManagementSection';
import PortfolioManagementSection from '@/components/dashboard/PortfolioManagementSection';
import TeamManagementSection from '@/components/dashboard/TeamManagementSection';
import CourseManagementSection from '@/components/dashboard/CourseManagementSection';

import { useCoursesData } from '@/hooks/useCoursesData';
import { getCourseActivities } from '@/utils/CourseActivityLog';

export default function DashboardPage() {
  const { currentUser, dashboardData, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const { courses } = useCoursesData();
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const courseActs = getCourseActivities().map(a => ({
      id: a.id,
      text: `${a.action} course: ${a.courseName}`,
      timestamp: a.timestamp
    }));
    
    const combined = [...(dashboardData.activities || []), ...courseActs]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 6);
      
    setRecentActivities(combined);
  }, [courses, dashboardData.activities]);

  const activeCoursesCount = courses.filter(c => c.status?.toLowerCase() === 'active').length;
  const draftCoursesCount = courses.filter(c => c.status?.toLowerCase() === 'draft').length;

  const stats = [
    { label: 'Total Courses', value: courses.length, icon: <GraduationCap size={24} className="text-yellow-500" /> },
    { label: 'Active Courses', value: activeCoursesCount, icon: <Activity size={24} className="text-green-500" /> },
    { label: 'Total Blogs', value: dashboardData.blogs.length, icon: <FileText size={24} className="text-blue-500" /> },
    { label: 'Total Projects', value: dashboardData.projects.length, icon: <Briefcase size={24} className="text-purple-500" /> },
    { label: 'Total Products', value: dashboardData.products.length, icon: <ShoppingBag size={24} className="text-emerald-500" /> },
    { label: 'Active Teams', value: dashboardData.teams.length, icon: <Users size={24} className="text-indigo-500" /> },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'courses': return <CourseManagementSection />;
      case 'blogs': return <BlogManagementSection />;
      case 'projects': return <ProjectManagementSection />;
      case 'events': return <EventManagementSection />;
      case 'products': return <ProductManagementSection />;
      case 'portfolio': return <PortfolioManagementSection />;
      case 'teams': return <TeamManagementSection />;
      case 'overview':
      default:
        return <DashboardContent />;
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
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
