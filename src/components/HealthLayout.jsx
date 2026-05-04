
import React from 'react';
import { HealthMenu } from '@/components/health/HealthMenu';
import PublicBreadcrumb from '@/components/PublicBreadcrumb';

export function HealthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <PublicBreadcrumb />
        </div>
      </div>

      {/* Health Navigation Menu */}
      <HealthMenu />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
