import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  Briefcase, 
  GraduationCap, 
  ShoppingBag, 
  BookOpen, 
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function DashboardSidebar({ isOpen, setIsOpen }) {
  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'Communities', path: '/community', icon: Users },
    { name: 'Jobs', path: '/jobs', icon: Briefcase },
    { name: 'Learning', path: '/learning', icon: GraduationCap },
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { name: 'Blogs', path: '/blog', icon: BookOpen },
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
          onClick={() => setIsOpen(false)}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={navLinkClass}
            end={item.path === '/dashboard'}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl md:hidden"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 flex-shrink-0 bg-white border-r border-gray-200">
        <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto no-scrollbar">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
}

export default DashboardSidebar;