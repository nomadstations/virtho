
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown, ChevronUp, Download, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export function DocumentCard({ 
  title, 
  type, 
  dateCreated, 
  dateModified, 
  status = 'active',
  content,
  icon,
  className = '' 
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const statusColors = {
    active: 'bg-emerald-100 text-emerald-700',
    draft: 'bg-amber-100 text-amber-700',
    archived: 'bg-gray-100 text-gray-700',
  };

  const handleDownload = () => {
    toast({
      title: 'Download Started',
      description: `Downloading ${title}...`,
    });
  };

  const handleView = () => {
    toast({
      title: 'Opening Document',
      description: `Opening ${title} in viewer...`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <Card className={`health-card overflow-hidden ${className}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                {icon || <FileText className="w-6 h-6 text-purple-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg font-bold text-gray-900 truncate">{title}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">{type}</p>
              </div>
            </div>
            <Badge className={`${statusColors[status]} capitalize text-xs font-semibold px-2 py-1 ml-2 flex-shrink-0`}>
              {status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-600">Created</p>
              <p className="font-semibold text-gray-900">{dateCreated}</p>
            </div>
            <div>
              <p className="text-gray-600">Modified</p>
              <p className="font-semibold text-gray-900">{dateModified}</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2 border-t border-gray-200">
            <Button
              variant="outline"
              size="sm"
              onClick={handleView}
              className="flex-1 text-purple-600 border-purple-300 hover:bg-purple-50"
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          </div>

          {content && (
            <div className="border-t border-gray-200 pt-3">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                <span>Document Details</span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 text-sm text-gray-600 leading-relaxed">
                      {content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
