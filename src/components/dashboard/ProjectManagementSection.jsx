import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SimpleModal } from './SimpleModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProjectManagementSection() {
  const { dashboardData, addProject, updateProject, deleteProject } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const initialForm = { name: '', description: '', image: '', technologies: '', status: 'Active', link: '' };
  const [formData, setFormData] = useState(initialForm);

  const filteredProjects = dashboardData.projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'All' || p.status === statusFilter)
  );

  const handleOpenModal = (project = null) => {
    if (project) {
      setFormData(project);
      setEditingId(project.id);
    } else {
      setFormData(initialForm);
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateProject(editingId, formData);
      toast({ title: 'Success', description: 'Project updated successfully' });
    } else {
      addProject(formData);
      toast({ title: 'Success', description: 'Project created successfully' });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      toast({ title: 'Deleted', description: 'Project has been removed' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Manage Projects</h2>
        <Button onClick={() => handleOpenModal()} className="bg-purple-600 hover:bg-purple-700">
          <Plus size={16} className="mr-2" /> Create Project
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-gray-900"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px] text-gray-900">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="On Hold">On Hold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4 hidden md:table-cell">Technologies</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 hidden sm:table-cell">Link</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProjects.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No projects found.</td></tr>
              ) : (
                filteredProjects.map(project => (
                  <tr key={project.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-900">{project.name}</td>
                    <td className="px-6 py-4 text-gray-600 hidden md:table-cell truncate max-w-[150px]">{project.technologies}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                        project.status === 'Active' ? 'bg-green-50 text-green-700' :
                        project.status === 'Completed' ? 'bg-blue-50 text-blue-700' :
                        'bg-orange-50 text-orange-700'
                      }`}>{project.status}</span>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      {project.link ? <a href={project.link} className="text-purple-600 hover:underline truncate inline-block max-w-[150px]">{project.link}</a> : '-'}
                    </td>
                    <td className="px-6 py-4 flex justify-end gap-2">
                      <button onClick={() => handleOpenModal(project)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(project.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-md"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SimpleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Project" : "Create Project"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="text-gray-900"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <Select value={formData.status} onValueChange={(val) => setFormData({...formData, status: val})}>
                <SelectTrigger className="text-gray-900"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
              <Input value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="text-gray-900"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma-separated)</label>
            <Input value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} placeholder="React, Node.js, Tailwind" className="text-gray-900"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <Textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="text-gray-900"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <Input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="text-gray-900"/>
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">{editingId ? "Save Changes" : "Create Project"}</Button>
        </form>
      </SimpleModal>
    </div>
  );
}