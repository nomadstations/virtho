
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building, Users, User, Briefcase, BookOpen, Calendar, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const QUICK_LINKS = [
  { id: 'organizations', name: 'Organizations', icon: Building, path: '/organizations' },
  { id: 'groups', name: 'Groups', icon: Users, path: '/groups' },
  { id: 'users', name: 'Users', icon: User, path: '/dashboard' },
  { id: 'teams', name: 'Teams', icon: Users, path: '/dashboard' },
  { id: 'projects', name: 'Projects', icon: Briefcase, path: '/projects' },
  { id: 'communities', name: 'Communities', icon: Users, path: '/community' },
  { id: 'courses', name: 'Courses', icon: BookOpen, path: '/learning' },
  { id: 'events', name: 'Events', icon: Calendar, path: '/dashboard' },
  { id: 'jobs', name: 'Jobs', icon: Briefcase, path: '/jobs' },
  { id: 'goods-services', name: 'Goods & Services', icon: ShoppingBag, path: '/marketplace' },
];

const QuickLinksDropdown = ({ isOpen, setIsOpen }) => {
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-full max-w-md glass-card-dark shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">Quick Links</h2>
              <Button 
                onClick={() => setIsOpen(false)} 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10"
              >
                <X />
              </Button>
            </div>

            <div className="flex-grow p-4 sm:p-6 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {QUICK_LINKS.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Link
                      key={link.id}
                      to={link.path}
                      onClick={handleLinkClick}
                      className="group"
                    >
                      <div className="dropdown-tile h-28 sm:h-32">
                        <IconComponent className="dropdown-tile-icon" />
                        <span className="dropdown-tile-label">
                          {link.name}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="p-6 border-t border-white/10">
              <p className="text-sm text-gray-400 text-center">
                Quick access to your most used sections
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickLinksDropdown;
