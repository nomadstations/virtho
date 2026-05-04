import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

export function ManageQuickLinksModal({ isOpen, onClose, quickLinks, availableEntities, updateQuickLinks }) {
  const [selectedEntities, setSelectedEntities] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setSelectedEntities(quickLinks);
    }
  }, [isOpen, quickLinks]);

  const isSelected = (entity) => {
    return selectedEntities.some(selected => selected.id === entity.id);
  };

  const toggleEntity = (entity) => {
    setSelectedEntities(prev => {
      const exists = prev.some(selected => selected.id === entity.id);
      if (exists) {
        return prev.filter(selected => selected.id !== entity.id);
      } else {
        return [...prev, entity];
      }
    });
  };

  const handleSave = () => {
    updateQuickLinks(selectedEntities);
    toast({
      title: 'Success',
      description: `Quick links updated successfully! (${selectedEntities.length} selected)`,
    });
    onClose();
  };

  const handleCancel = () => {
    setSelectedEntities(quickLinks);
    onClose();
  };

  const groupedEntities = availableEntities.reduce((acc, entity) => {
    if (!acc[entity.category]) {
      acc[entity.category] = [];
    }
    acc[entity.category].push(entity);
    return acc;
  }, {});

  if (!isOpen) return null;

  return (
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
              <h2 className="text-2xl font-bold text-gray-900">Manage Quick Links</h2>
              <p className="text-sm text-gray-600 mt-1">
                Select entities to display in your quick links section ({selectedEntities.length} selected)
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

          <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Selected Quick Links</h3>
                  <span className="text-sm font-medium text-white bg-lavender-primary px-3 py-1 rounded-full">
                    {selectedEntities.length}
                  </span>
                </div>
                <div className="bg-lavender-lightest rounded-xl p-4 border-2 border-lavender-lighter min-h-[300px]">
                  {selectedEntities.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      No quick links selected
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selectedEntities.map((entity) => (
                        <div
                          key={entity.id}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg border border-lavender-light shadow-sm"
                        >
                          <entity.icon className="w-5 h-5 text-lavender-primary flex-shrink-0" />
                          <span className="text-gray-900 font-medium flex-1">{entity.name}</span>
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Entities</h3>
                <div className="space-y-6">
                  {Object.entries(groupedEntities).map(([category, entities]) => (
                    <div key={category}>
                      <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
                        {category}
                      </h4>
                      <div className="space-y-2">
                        {entities.map((entity) => (
                          <div
                            key={entity.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                              isSelected(entity)
                                ? 'bg-lavender-lightest border-lavender-light shadow-sm'
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                            onClick={() => toggleEntity(entity)}
                          >
                            <Checkbox
                              id={entity.id}
                              checked={isSelected(entity)}
                              onCheckedChange={() => toggleEntity(entity)}
                              className="flex-shrink-0"
                            />
                            <entity.icon className={`w-5 h-5 flex-shrink-0 ${
                              isSelected(entity) ? 'text-lavender-primary' : 'text-gray-600'
                            }`} />
                            <Label
                              htmlFor={entity.id}
                              className="text-gray-900 font-medium cursor-pointer flex-1"
                            >
                              {entity.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              Quick links help you access frequently used sections quickly
            </p>
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
                className="bg-lavender-primary hover:bg-lavender-dark text-white shadow-sm"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}