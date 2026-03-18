import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, FileText, Briefcase, Calendar, ShoppingBag, FolderGit2, Users, GraduationCap, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

function DashboardLayout({ children, activeTab, setActiveTab }) {
  const { logout, currentUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'courses', label: 'Courses', icon: <GraduationCap size={20} /> },
    { id: 'blogs', label: 'Blogs', icon: <FileText size={20} /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase size={20} /> },
    { id: 'events', label: 'Events', icon: <Calendar size={20} /> },
    { id: 'products', label: 'Products', icon: <ShoppingBag size={20} /> },
    { id: 'portfolio', label: 'Portfolio', icon: <FolderGit2 size={20} /> },
    { id: 'teams', label: 'Teams', icon: <Users size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id 
                  ? 'bg-purple-50 text-purple-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4 px-2">
            <img src={currentUser?.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{currentUser?.name}</p>
              <p className="text-xs text-gray-500 truncate">{currentUser?.role}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700" onClick={logout}>
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-white rounded-md shadow-sm border border-gray-200 text-gray-700">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <motion.aside 
            initial={{ x: -250 }} animate={{ x: 0 }}
            className="w-64 bg-white h-full flex flex-col shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
            </div>
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                    activeTab === item.id ? 'bg-purple-50 text-purple-700' : 'text-gray-600'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </motion.aside>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-gray-50/50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto mt-12 md:mt-0">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;