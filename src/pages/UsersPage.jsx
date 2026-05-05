
import React from 'react';
import { Helmet } from 'react-helmet';
import { UserCircle, Users as UsersIcon, Shield, Mail, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout.jsx';

export default function UsersPage() {
  return (
    <>
      <Helmet>
        <title>Users Management - Virtho Foundation</title>
        <meta name="description" content="Manage users, permissions, and access control across your organization." />
      </Helmet>

      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="bg-lavender-primary p-3 rounded-xl">
                <UserCircle className="w-8 h-8 text-white" />
              </div>
              Users Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage user accounts, roles, and permissions
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UsersIcon className="w-5 h-5 text-lavender-primary" />
                  All Users
                </CardTitle>
                <CardDescription>View and manage all user accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Total registered users and their activity status
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-lavender-primary" />
                  Permissions
                </CardTitle>
                <CardDescription>Configure user roles and access</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Manage role-based access control and permissions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-lavender-primary" />
                  Invitations
                </CardTitle>
                <CardDescription>Send and track user invitations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Invite new users and manage pending invitations
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-lavender-primary" />
                  Activity Log
                </CardTitle>
                <CardDescription>Monitor user activity and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Track user logins, actions, and system usage
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-lavender-light bg-lavender-lightest/50">
            <CardHeader>
              <CardTitle className="text-lavender-dark">🚧 Users Management Coming Soon</CardTitle>
              <CardDescription className="text-gray-700">
                Full user management functionality is currently under development
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-700">
                <strong>Planned Features:</strong>
              </p>
              <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                <li>User directory with advanced search and filtering</li>
                <li>Role-based access control (RBAC) system</li>
                <li>Bulk user import and export</li>
                <li>User profile management and verification</li>
                <li>Activity monitoring and audit logs</li>
                <li>Custom user groups and permissions</li>
                <li>Email invitation system</li>
                <li>User onboarding workflows</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                This functionality will be available in an upcoming release. For now, you can manage basic user settings through the Settings page.
              </p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
}
