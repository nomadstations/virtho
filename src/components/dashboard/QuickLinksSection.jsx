
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function QuickLinksSection({ quickLinks, onOpenSettings }) {
  console.log('[QuickLinksSection] Rendering with quickLinks:', quickLinks);
  console.log('[QuickLinksSection] quickLinks count:', quickLinks?.length);

  if (!quickLinks || quickLinks.length === 0) {
    console.log('[QuickLinksSection] No quick links - showing empty state');
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-lavender-lightest to-lavender-lighter rounded-xl p-6 sm:p-8 border border-lavender-light text-center h-full w-full"
      >
        <div className="max-w-md mx-auto">
          <Settings className="w-12 h-12 text-lavender-light mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Quick Links Selected</h3>
          <p className="text-gray-600 mb-6">
            Customize your dashboard by adding quick links to your most-used sections.
          </p>
          <Button
            onClick={onOpenSettings}
            className="bg-lavender-primary hover:bg-lavender-dark text-white shadow-sm"
          >
            <Settings className="w-4 h-4 mr-2" />
            Open Dashboard Settings
          </Button>
        </div>
      </motion.div>
    );
  }

  console.log('[QuickLinksSection] Rendering tiles for', quickLinks.length, 'links');

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 h-full w-full">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Quick Links</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Fast access to your favorite sections ({quickLinks.length})
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenSettings}
          className="text-lavender-primary hover:text-lavender-dark hover:bg-lavender-lightest"
        >
          <Settings className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Customize</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6 w-full">
        {quickLinks.map((link, index) => {
          console.log('[QuickLinksSection] Rendering tile:', link.name, 'index:', index);
          const IconComponent = link.icon;
          
          return (
            <motion.div 
              key={link.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.05,
                ease: 'easeOut'
              }}
              className="w-full"
            >
              <Link to={link.path} className="block w-full">
                <div className="group flex flex-col items-center justify-start text-center cursor-pointer w-full p-2 sm:p-3 md:p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 h-auto min-h-[120px] sm:min-h-[140px] md:min-h-[160px]">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-2 sm:mb-3 flex items-center justify-center flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-full border-2 border-gray-200 group-hover:border-lavender-light transition-all duration-300 group-hover:shadow-lg" />
                    <div className="absolute inset-0 bg-gradient-to-br from-lavender-primary/0 to-lavender-light/0 group-hover:from-lavender-primary/10 group-hover:to-lavender-light/10 transition-all duration-300 rounded-full" />
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-lavender-primary relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="dashboard-label group-hover:text-lavender-primary transition-colors w-full whitespace-normal break-words px-1">
                    {link.name}
                  </h3>
                  <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-3 h-3 text-lavender-primary mx-auto" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
