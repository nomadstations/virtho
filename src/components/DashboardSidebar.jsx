
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Building2,
  Users,
  LayoutDashboard, 
  FolderKanban, 
  Briefcase, 
  GraduationCap, 
  ShoppingBag, 
  BookOpen,
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function DashboardSidebar({ isOpen, setIsOpen }) {
  // STRICT ORDER ENFORCEMENT: Organizations at Position 1, Groups at Position 2
  const navItems = [
    { id: 'organizations', name: 'Organizations', path: '/organizations', icon: Building2 },
    { id: 'groups', name: 'Groups', path: '/groups', icon: Users },
    { id: 'dashboard', name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { id: 'projects', name: 'Projects', path: '/projects', icon: FolderKanban },
    { id: 'communities', name: 'Communities', path: '/community', icon: Users },
    { id: 'jobs', name: 'Jobs', path: '/jobs', icon: Briefcase },
    { id: 'learning', name: 'Learning', path: '/learning', icon: GraduationCap },
    { id: 'marketplace', name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { id: 'blogs', name: 'Blogs', path: '/blogs', icon: BookOpen },
  ];

  const navLinkClass = ({ isActive }) =>
    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? 'bg-purple-600 text-white shadow-md'
        : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
    }`;

  const SidebarContent = () => (
    <div className="h-full flex flex-col py-6 px-4">
      <div className="flex items-center justify-between mb-8 px-2 md:hidden">
        <h2 className="text-xl font-bold text-gray-800">Menu</h2>
        <button 
          onClick={() => setIsOpen && setIsOpen(false)}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            onClick={() => setIsOpen && setIsOpen(false)}
            className={navLinkClass}
            end={item.path === '/dashboard' || item.path === '/organizations' || item.path === '/groups'}
          >
            <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="font-medium truncate">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen && setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl md:hidden flex flex-col"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      <aside className="hidden md:flex w-64 lg:w-72 flex-shrink-0 bg-white border-r border-gray-200 h-[calc(100vh-5rem)] sticky top-20 flex-col z-10">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
}

export default DashboardSidebar;
