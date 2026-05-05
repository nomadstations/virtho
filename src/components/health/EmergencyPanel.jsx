
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export function EmergencyPanel({ title = 'Emergency Information', children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`health-emergency-panel ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-lg font-bold text-red-900">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </motion.div>
  );
}

export function EmergencyItem({ label, value, icon }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-red-200">
      {icon && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <p className="text-base font-bold text-red-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
}
