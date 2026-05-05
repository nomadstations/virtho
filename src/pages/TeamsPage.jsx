
import React from 'react';
import { Helmet } from 'react-helmet';
import { Users as TeamIcon, UserPlus, Settings, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout.jsx';

export default function TeamsPage() {
  return (
    <>
      <Helmet>
        <title>Teams Management - Virtho Foundation</title>
        <meta name="description" content="Create and manage teams, assign members, and track team performance." />
      </Helmet>

      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="bg-lavender-primary p-3 rounded-xl">
                <TeamIcon className="w-8 h-8 text-white" />
              </div>
              Teams Management
            </h1>
            <p className="text-gray-600 mt-2">
              Organize users into teams and manage collaboration
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TeamIcon className="w-5 h-5 text-lavender-primary" />
                  All Teams
                </CardTitle>
                <CardDescription>View and manage all teams</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Browse all teams, their members, and current projects
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-lavender-primary" />
                  Team Members
                </CardTitle>
                <CardDescription>Manage team composition</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Add or remove members, assign roles and responsibilities
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-lavender-primary" />
                  Team Settings
                </CardTitle>
                <CardDescription>Configure team preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Customize team settings, permissions, and workflows
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-lavender-primary" />
                  Performance
                </CardTitle>
                <CardDescription>Track team metrics and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Monitor team productivity and project completion rates
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-lavender-light bg-lavender-lightest/50">
            <CardHeader>
              <CardTitle className="text-lavender-dark">🚧 Teams Management Coming Soon</CardTitle>
              <CardDescription className="text-gray-700">
                Comprehensive team management tools are currently in development
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-700">
                <strong>Planned Features:</strong>
              </p>
              <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                <li>Create and manage multiple teams</li>
                <li>Team member assignment and role management</li>
                <li>Team-based project organization</li>
                <li>Internal team communication channels</li>
                <li>Team performance analytics and dashboards</li>
                <li>Collaborative workspaces for teams</li>
                <li>Team resource allocation and scheduling</li>
                <li>Cross-team collaboration tools</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                This feature will enable better team collaboration and project management. Stay tuned for updates!
              </p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
}
