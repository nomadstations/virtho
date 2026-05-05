import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMenuItems } from '@/constants/menuConfig.js';
import { useToast } from '@/hooks/use-toast';

function DashboardSidebar({ isOpen, setIsOpen }) {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = () => {
    const items = getMenuItems();
    setMenuItems(items);
  };

  useEffect(() => {
    if (window.dashboardMenuUpdateListener) {
      window.removeEventListener('dashboardMenuUpdate', window.dashboardMenuUpdateListener);
    }
    
    window.dashboardMenuUpdateListener = () => {
      loadMenuItems();
    };
    
    window.addEventListener('dashboardMenuUpdate', window.dashboardMenuUpdateListener);
    
    return () => {
      if (window.dashboardMenuUpdateListener) {
        window.removeEventListener('dashboardMenuUpdate', window.dashboardMenuUpdateListener);
      }
    };
  }, []);

  const handleItemClick = (item) => {
    if (item.comingSoon) {
      toast({
        title: 'Coming Soon',
        description: `${item.label} feature is under development and will be available soon.`,
      });
    } else if (item.path) {
      navigate(item.path);
    }
    
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  const isActive = (item) => {
    if (item.path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(item.path);
  };

  const visibleMainItems = menuItems.filter(item => item.visible && item.category === 'Main');

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col py-6 px-4 dashboard-sidebar">
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
        {visibleMainItems.map((item, index) => (
          <motion.button
            key={item.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.05 }}
            onClick={() => handleItemClick(item)}
            className={`sidebar-menu-item w-full ${isActive(item) ? 'active' : ''} ${item.comingSoon ? 'coming-soon' : ''}`}
            aria-label={item.label}
          >
            <item.iconComponent className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">{item.label}</span>
          </motion.button>
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