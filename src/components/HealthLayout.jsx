
import React from 'react';
import { HealthMenu } from '@/components/health/HealthMenu';
import PublicBreadcrumb from '@/components/PublicBreadcrumb';

export function HealthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb - no z-index conflicts */}
      <div className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <PublicBreadcrumb />
        </div>
      </div>

      {/* Health Navigation Menu - no z-index conflicts */}
      <HealthMenu />

      {/* Main Content - no position/z-index to avoid clipping dropdowns */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
