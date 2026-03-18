import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import Breadcrumb from '@/components/Breadcrumb';
import { getBreadcrumbPaths } from '@/utils/breadcrumbConfig';
import { Card } from '@/components/SharedUI';
import { ROUTES } from '@/constants';

function CreateProjectPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ title: '', description: '', status: 'idea', category: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = { id: Date.now().toString(), ...formData, createdBy: currentUser?.id, createdAt: new Date().toISOString() };
    const projects = JSON.parse(localStorage.getItem('virtho_projects') || '[]');
    projects.push(newProject);
    localStorage.setItem('virtho_projects', JSON.stringify(projects));
    toast({ title: "Project created!" });
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <>
      <Helmet><title>Create Project - Virtho</title></Helmet>
      <DashboardLayout>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto pt-4 pb-8">
          <Breadcrumb paths={getBreadcrumbPaths('/create-project')} />
          <h1 className="text-3xl font-bold text-gray-900 mb-8 mt-4">Create New Project</h1>
          <Card className="p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div><Label className="text-gray-700">Project Title</Label><Input name="title" value={formData.title} onChange={e=>setFormData({...formData,title:e.target.value})} required className="bg-gray-50 border-gray-200 mt-1"/></div>
              <div><Label className="text-gray-700">Description</Label><Textarea name="description" value={formData.description} onChange={e=>setFormData({...formData,description:e.target.value})} required className="bg-gray-50 border-gray-200 mt-1 min-h-[120px]"/></div>
              <div><Label className="text-gray-700">Category</Label><Input name="category" value={formData.category} onChange={e=>setFormData({...formData,category:e.target.value})} required className="bg-gray-50 border-gray-200 mt-1"/></div>
              <div>
                <Label className="text-gray-700 mb-1 block">Status</Label>
                <Select value={formData.status} onValueChange={v=>setFormData({...formData,status:v})}>
                  <SelectTrigger className="bg-gray-50 border-gray-200"><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idea">💡 Idea</SelectItem>
                    <SelectItem value="active">🚀 Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold h-12">Create Project</Button>
                <Button type="button" variant="outline" onClick={() => navigate(ROUTES.DASHBOARD)} className="flex-1 h-12 font-medium">Cancel</Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </DashboardLayout>
    </>
  );
}

export default CreateProjectPage;