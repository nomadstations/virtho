import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Generic Filter Panel that replaces all the individual filter components
const FilterPanel = ({ filterConfig, filters, setFilters, clearFilters }) => {
  const handleArrayFilterChange = (category, value) => {
    const currentValues = filters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setFilters({ ...filters, [category]: newValues });
  };

  return (
    <div className="space-y-8">
      {Object.entries(filterConfig).map(([key, config]) => (
        <div key={key}>
          <h3 className="text-xs font-semibold text-gray-900 mb-4 capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </h3>
          <div className="space-y-3">
            {config.map((item) => (
              <div key={item} className="flex items-center space-x-3">
                <Checkbox 
                  id={`${key}-${item}`} 
                  checked={(filters[key] || []).includes(item)}
                  onCheckedChange={() => handleArrayFilterChange(key, item)}
                  className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <Label htmlFor={`${key}-${item}`} className="text-sm font-medium leading-none cursor-pointer">
                  {item}
                </Label>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <Button 
        variant="outline" 
        onClick={clearFilters}
        className="w-full text-gray-700 border-gray-300 hover:bg-gray-100 font-semibold"
      >
        Clear All Filters
      </Button>
    </div>
  );
};

export default FilterPanel;