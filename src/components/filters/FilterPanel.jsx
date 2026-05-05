
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const FilterPanel = ({ filterConfig, filters, setFilters, clearFilters }) => {
  const handleCheckboxChange = (filterType, value) => {
    setFilters(prev => {
      const currentValues = prev[filterType] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [filterType]: newValues };
    });
  };

  const hasActiveFilters = Object.values(filters).some(arr => arr && arr.length > 0);

  return (
    <div className="space-y-6">
      {/* User Types Filter */}
      {filterConfig.userTypes && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">User Type</h3>
          <div className="space-y-2.5">
            {filterConfig.userTypes.map((type) => {
              const typeValue = typeof type === 'object' ? type.value : type;
              const typeLabel = typeof type === 'object' ? type.label : type;
              
              return (
                <div key={typeValue} className="flex items-center space-x-2.5">
                  <Checkbox
                    id={`type-${typeValue}`}
                    checked={filters.userTypes?.includes(typeValue) || false}
                    onCheckedChange={() => handleCheckboxChange('userTypes', typeValue)}
                    className="border-gray-300"
                  />
                  <Label
                    htmlFor={`type-${typeValue}`}
                    className="text-sm text-gray-700 cursor-pointer font-medium"
                  >
                    {typeLabel}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Locations Filter */}
      {filterConfig.locations && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
          <div className="space-y-2.5">
            {filterConfig.locations.map((location) => (
              <div key={location} className="flex items-center space-x-2.5">
                <Checkbox
                  id={`location-${location}`}
                  checked={filters.locations?.includes(location) || false}
                  onCheckedChange={() => handleCheckboxChange('locations', location)}
                  className="border-gray-300"
                />
                <Label
                  htmlFor={`location-${location}`}
                  className="text-sm text-gray-700 cursor-pointer font-medium"
                >
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Levels Filter */}
      {filterConfig.activityLevels && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Activity Level</h3>
          <div className="space-y-2.5">
            {filterConfig.activityLevels.map((level) => (
              <div key={level} className="flex items-center space-x-2.5">
                <Checkbox
                  id={`activity-${level}`}
                  checked={filters.activityLevels?.includes(level) || false}
                  onCheckedChange={() => handleCheckboxChange('activityLevels', level)}
                  className="border-gray-300"
                />
                <Label
                  htmlFor={`activity-${level}`}
                  className="text-sm text-gray-700 cursor-pointer font-medium"
                >
                  {level}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories Filter (for other filter types) */}
      {filterConfig.categories && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
          <div className="space-y-2.5">
            {filterConfig.categories.map((category) => (
              <div key={category} className="flex items-center space-x-2.5">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories?.includes(category) || false}
                  onCheckedChange={() => handleCheckboxChange('categories', category)}
                  className="border-gray-300"
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm text-gray-700 cursor-pointer font-medium"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Statuses Filter (for projects) */}
      {filterConfig.statuses && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Status</h3>
          <div className="space-y-2.5">
            {filterConfig.statuses.map((status) => (
              <div key={status} className="flex items-center space-x-2.5">
                <Checkbox
                  id={`status-${status}`}
                  checked={filters.statuses?.includes(status) || false}
                  onCheckedChange={() => handleCheckboxChange('statuses', status)}
                  className="border-gray-300"
                />
                <Label
                  htmlFor={`status-${status}`}
                  className="text-sm text-gray-700 cursor-pointer font-medium capitalize"
                >
                  {status}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-gray-200">
          <Button
            onClick={clearFilters}
            variant="outline"
            className="w-full text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-gray-300"
          >
            <X className="w-4 h-4 mr-2" />
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
