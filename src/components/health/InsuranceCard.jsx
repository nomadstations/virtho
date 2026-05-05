
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Calendar, FileText, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function InsuranceCard({ 
  provider, 
  policyNumber, 
  type, 
  coverage, 
  expiryDate, 
  contactNumber,
  status = 'active',
  className = '' 
}) {
  const statusColors = {
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    expired: 'bg-red-100 text-red-700 border-red-200',
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className={`health-card ${className}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900">{provider}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">{type}</p>
              </div>
            </div>
            <Badge className={`${statusColors[status]} capitalize text-xs font-semibold px-2 py-1`}>
              {status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <div>
              <p className="text-gray-600">Policy Number</p>
              <p className="font-semibold text-gray-900">{policyNumber}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <div>
              <p className="text-gray-600">Valid Until</p>
              <p className="font-semibold text-gray-900">{expiryDate}</p>
            </div>
          </div>

          {coverage && (
            <div className="text-sm">
              <p className="text-gray-600 mb-1">Coverage</p>
              <p className="font-semibold text-gray-900">{coverage}</p>
            </div>
          )}

          {contactNumber && (
            <div className="flex items-center gap-2 text-sm pt-2 border-t border-gray-200">
              <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <p className="text-gray-900 font-medium">{contactNumber}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
