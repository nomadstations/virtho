
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function HealthCard({ title, icon, children, className = '', variant = 'default' }) {
  const variantStyles = {
    default: 'bg-white border-gray-200',
    wellness: 'bg-emerald-50 border-emerald-200',
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-amber-50 border-amber-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className={`health-card ${variantStyles[variant]} ${className}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                {icon}
              </div>
            )}
            <CardTitle className="text-lg font-bold text-gray-900">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  );
}
