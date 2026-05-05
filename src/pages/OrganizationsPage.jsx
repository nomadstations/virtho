import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Building2, Plus, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AddOrganizationWizard from '@/components/dashboard/AddOrganizationWizard.jsx';
import DashboardSidebar from '@/components/DashboardSidebar.jsx';
import DashboardBreadcrumb from '@/components/DashboardBreadcrumb.jsx';
import { EmptyState, LoadingSpinner } from '@/components/SharedUI.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

function OrganizationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { myEntities, isEntitiesLoading, myEntitiesError, loadMyEntities } = useAuth();

  const organizations = useMemo(() => {
    return (myEntities || []).filter(entity => entity.type === 'ORGANIZATION');
  }, [myEntities]);

  const filteredOrganizations = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return organizations;
    }

    return organizations.filter(org =>
      org.name?.toLowerCase().includes(normalizedSearch)
    );
  }, [organizations, searchTerm]);

  const openAddModal = () => {
    setIsModalOpen(true);
  };

  const handleOrganizationCreated = async () => {
    await loadMyEntities();
    setIsModalOpen(false);
  };

  return (
    <>
      <Helmet><title>Organizations - Virtho Dashboard</title></Helmet>

      <div className="flex w-full bg-gray-50 min-h-[calc(100vh-5rem)]">
        <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <main className="flex-1 w-full overflow-x-hidden overflow-y-auto">
          <div className="bg-white border-b border-gray-200 pt-6 pb-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsSidebarOpen(true)}
                  aria-label="Toggle Sidebar"
                >
                  <Menu className="w-5 h-5" />
                </Button>
                <div className="flex-1">
                  <DashboardBreadcrumb />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="h-8 w-8 text-purple-600" />
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Organizations</h1>
                  </div>
                  <p className="text-gray-600">Manage your organizations effectively.</p>
                </div>
                <Button onClick={openAddModal} className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm w-full md:w-auto">
                  <Plus className="w-5 h-5 mr-2" /> Add Organization
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
              <div className="relative max-w-md w-full mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-gray-900 border-gray-300 bg-gray-50 focus:bg-white"
                />
              </div>

              {myEntitiesError && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  Failed to load organizations: {myEntitiesError}
                </div>
              )}

              {isEntitiesLoading ? (
                <div className="py-12 flex justify-center">
                  <LoadingSpinner message="Loading organizations..." />
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {filteredOrganizations.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <EmptyState
                        icon={Building2}
                        title="No organizations found"
                        description={searchTerm ? "Try adjusting your search terms." : "You haven't created any organizations yet."}
                        actionText={searchTerm ? "Clear Search" : "Add Organization"}
                        onAction={searchTerm ? () => setSearchTerm('') : openAddModal}
                      />
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-x-auto rounded-lg border border-gray-100">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200 bg-gray-50/50">
                            <th className="py-4 px-4 font-semibold text-gray-700">Name</th>
                            <th className="py-4 px-4 font-semibold text-gray-700">Type</th>
                            <th className="py-4 px-4 font-semibold text-gray-700">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredOrganizations.map((org) => (
                            <tr key={org.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="py-4 px-4 font-bold text-gray-900">{org.name}</td>
                              <td className="py-4 px-4 font-medium text-purple-700">
                                <span className="bg-purple-50 px-2.5 py-1 rounded-md text-xs">
                                  {org.type}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-gray-600">
                                {org.status || '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        </main>
      </div>

      <AddOrganizationWizard
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleOrganizationCreated}
      />
    </>
  );
}

export default OrganizationsPage;