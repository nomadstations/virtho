import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { FileText, Briefcase, Calendar, ShoppingBag, FolderGit2, Users, Plus, Activity, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sub-components for sections
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
    // Combine standard mock activities with dynamic course activities
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
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
            
            {/* User Profile Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-50 shrink-0">
                <img src={currentUser?.avatar} alt={currentUser?.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900">{currentUser?.name}</h3>
                <p className="text-purple-600 font-medium mb-2">{currentUser?.role} • Member since {currentUser?.memberSince}</p>
                <p className="text-gray-600 max-w-2xl">{currentUser?.bio}</p>
              </div>
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 md:self-start" onClick={logout}>
                Log Out
              </Button>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">{stat.icon}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Activity Feed */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity size={20} className="text-purple-600" /> Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivities.map(act => (
                    <div key={act.id} className="flex gap-4 items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                      <div>
                        <p className="text-gray-800 text-sm font-medium">{act.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{new Date(act.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                  {recentActivities.length === 0 && (
                    <p className="text-gray-500 text-sm">No recent activity.</p>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button onClick={() => setActiveTab('courses')} className="w-full justify-start bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-none shadow-none font-medium">
                    <Plus size={16} className="mr-2" /> Add Course
                  </Button>
                  <Button onClick={() => setActiveTab('projects')} className="w-full justify-start bg-blue-50 text-blue-700 hover:bg-blue-100 border-none shadow-none font-medium">
                    <Plus size={16} className="mr-2" /> Add Project
                  </Button>
                  <Button onClick={() => setActiveTab('blogs')} className="w-full justify-start bg-purple-50 text-purple-700 hover:bg-purple-100 border-none shadow-none font-medium">
                    <Plus size={16} className="mr-2" /> Write a Post
                  </Button>
                  <Button onClick={() => setActiveTab('events')} className="w-full justify-start bg-pink-50 text-pink-700 hover:bg-pink-100 border-none shadow-none font-medium">
                    <Plus size={16} className="mr-2" /> Create Event
                  </Button>
                  <Button onClick={() => setActiveTab('products')} className="w-full justify-start bg-green-50 text-green-700 hover:bg-green-100 border-none shadow-none font-medium">
                    <Plus size={16} className="mr-2" /> Add Product
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Virtho Platform</title>
        <meta name="description" content="Manage your projects, collaborate with teams, and track your progress." />
      </Helmet>
      
      <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </DashboardLayout>
    </>
  );
}