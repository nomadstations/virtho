
import React, { useState, useEffect } from 'react';
import { X, GripVertical, RotateCcw, Save, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { getMenuItems, saveMenuConfig, resetToDefaults } from '@/constants/menuConfig.js';
import { ManageQuickLinksModal } from '@/components/dashboard/ManageQuickLinksModal.jsx';
import { ManageQuickActionsModal } from '@/components/dashboard/ManageQuickActionsModal.jsx';
import { useQuickLinks } from '@/hooks/useQuickLinks.js';
import { useQuickActions } from '@/hooks/useQuickActions.js';

function DashboardSettings({ isOpen, onClose, onMenuUpdate }) {
  const [menuItems, setMenuItems] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [showQuickLinksModal, setShowQuickLinksModal] = useState(false);
  const [showQuickActionsModal, setShowQuickActionsModal] = useState(false);
  const { toast } = useToast();
  const { quickLinks, availableEntities, updateQuickLinks } = useQuickLinks();
  const { quickActions, availableActions, saveQuickActions, resetToDefaults: resetQuickActions } = useQuickActions();

  useEffect(() => {
    if (isOpen) {
      const items = getMenuItems();
      setMenuItems(items);
      setHasChanges(false);
    }
  }, [isOpen]);

  const toggleVisibility = (id) => {
    setMenuItems(prev => {
      const updated = prev.map(item => 
        item.id === id ? { ...item, visible: !item.visible } : item
      );
      setHasChanges(true);
      return updated;
    });
  };

  const handleReorder = (newOrder) => {
    setMenuItems(newOrder);
    setHasChanges(true);
  };

  const handleSave = () => {
    const success = saveMenuConfig(menuItems);
    if (success) {
      toast({
        title: 'Settings Saved',
        description: 'Dashboard menu configuration has been updated successfully.',
      });
      if (onMenuUpdate) {
        onMenuUpdate();
      }
      onClose();
    } else {
      toast({
        title: 'Error',
        description: 'Failed to save menu configuration. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleReset = () => {
    const defaults = resetToDefaults();
    setMenuItems(defaults);
    setHasChanges(true);
    toast({
      title: 'Reset to Defaults',
      description: 'Menu configuration has been reset to default settings.',
    });
  };

  const handleCancel = () => {
    setMenuItems(getMenuItems());
    setHasChanges(false);
    onClose();
  };

  const handleQuickActionsSave = (actions) => {
    saveQuickActions(actions);
  };

  const handleQuickActionsReset = () => {
    resetQuickActions();
  };

  const mainMenuItems = menuItems.filter(item => item.category === 'Main');
  const settingsItems = menuItems.filter(item => item.category === 'Settings');

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={handleCancel}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[85vh] overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Settings</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Customize your dashboard menu, quick links, and quick actions
                </p>
              </div>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <Tabs defaultValue="menu" className="w-full">
              <div className="px-6 pt-4 border-b border-gray-200">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                  <TabsTrigger value="menu">Menu Items</TabsTrigger>
                  <TabsTrigger value="links">Quick Links</TabsTrigger>
                  <TabsTrigger value="actions">Quick Actions</TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(85vh-240px)]">
                <TabsContent value="menu" className="mt-0 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Menu Customization</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset to Defaults
                      </Button>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      Drag items to reorder, uncheck to hide from sidebar
                    </p>

                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <Reorder.Group
                        axis="y"
                        values={mainMenuItems}
                        onReorder={(newOrder) => {
                          const allItems = [...newOrder, ...settingsItems];
                          handleReorder(allItems);
                        }}
                        className="space-y-2"
                      >
                        {mainMenuItems.map((item) => (
                          <Reorder.Item
                            key={item.id}
                            value={item}
                            className="bg-white rounded-lg border border-gray-200 shadow-sm"
                          >
                            <div className="flex items-center gap-3 p-4">
                              <div className="menu-drag-handle cursor-grab active:cursor-grabbing">
                                <GripVertical className="w-5 h-5 text-gray-400" />
                              </div>
                              
                              <Checkbox
                                id={`menu-${item.id}`}
                                checked={item.visible}
                                onCheckedChange={() => toggleVisibility(item.id)}
                              />
                              
                              <item.iconComponent className="w-5 h-5 text-lavender-primary flex-shrink-0" />
                              
                              <Label
                                htmlFor={`menu-${item.id}`}
                                className="text-gray-900 font-medium cursor-pointer flex-1"
                              >
                                {item.label}
                                {item.comingSoon && (
                                  <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                    Coming Soon
                                  </span>
                                )}
                              </Label>
                              
                              {!item.visible && (
                                <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                                  Hidden
                                </span>
                              )}
                            </div>
                          </Reorder.Item>
                        ))}
                      </Reorder.Group>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="links" className="mt-0">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Manage quick access links displayed on your dashboard
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setShowQuickLinksModal(true)}
                      className="w-full justify-start hover:bg-lavender-lightest hover:border-lavender-light"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Manage Quick Links ({quickLinks.length} selected)
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="actions" className="mt-0">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5 text-amber-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Customize action buttons for common tasks on your dashboard
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setShowQuickActionsModal(true)}
                      className="w-full justify-start border-amber-200 hover:bg-amber-50 hover:border-amber-300"
                    >
                      <Zap className="w-4 h-4 mr-2 text-amber-600" />
                      Manage Quick Actions ({quickActions.length} selected)
                    </Button>
                  </div>
                </TabsContent>
              </div>

              <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
                <div className="text-sm text-gray-600">
                  {hasChanges ? (
                    <span className="text-amber-600 font-medium">• Unsaved changes</span>
                  ) : (
                    <span>No changes</span>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={!hasChanges}
                    className="bg-lavender-primary hover:bg-lavender-dark text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </Tabs>
          </motion.div>
        </div>
      </AnimatePresence>

      <ManageQuickLinksModal
        isOpen={showQuickLinksModal}
        onClose={() => setShowQuickLinksModal(false)}
        quickLinks={quickLinks}
        availableEntities={availableEntities}
        updateQuickLinks={updateQuickLinks}
      />

      <ManageQuickActionsModal
        isOpen={showQuickActionsModal}
        onClose={() => setShowQuickActionsModal(false)}
        availableActions={availableActions}
        selectedActionIds={quickActions.map(a => a.id)}
        onSave={handleQuickActionsSave}
        onReset={handleQuickActionsReset}
      />
    </>
  );
}

function Settings({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

export default DashboardSettings;
