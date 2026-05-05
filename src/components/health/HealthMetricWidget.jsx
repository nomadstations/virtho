
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function HealthMetricWidget({ 
  label, 
  value, 
  unit, 
  icon, 
  trend, 
  trendValue, 
  status = 'normal',
  className = '' 
}) {
  const statusStyles = {
    normal: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    danger: 'bg-red-50 border-red-200 text-red-900',
  };

  const trendIcons = {
    up: <TrendingUp className="w-4 h-4" />,
    down: <TrendingDown className="w-4 h-4" />,
    stable: <Minus className="w-4 h-4" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`health-metric-widget ${statusStyles[status]} ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && <div className="text-gray-600">{icon}</div>}
          <p className="text-sm font-medium text-gray-700">{label}</p>
        </div>
        {trend && trendValue && (
          <div className="flex items-center gap-1 text-xs font-semibold">
            {trendIcons[trend]}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <p className="text-2xl font-bold">{value}</p>
        {unit && <p className="text-sm font-medium text-gray-600">{unit}</p>}
      </div>
    </motion.div>
  );
}
