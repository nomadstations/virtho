import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SimpleModal } from './SimpleModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function EventManagementSection() {
  const { dashboardData, addEvent, updateEvent, deleteEvent } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const initialForm = { title: '', date: '', location: '', description: '', image: '', capacity: '' };
  const [formData, setFormData] = useState(initialForm);

  const filteredEvents = dashboardData.events.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (event = null) => {
    if (event) {
      setFormData(event);
      setEditingId(event.id);
    } else {
      setFormData(initialForm);
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateEvent(editingId, formData);
      toast({ title: 'Success', description: 'Event updated successfully' });
    } else {
      addEvent(formData);
      toast({ title: 'Success', description: 'Event created successfully' });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
      toast({ title: 'Deleted', description: 'Event has been removed' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Manage Events</h2>
        <Button onClick={() => handleOpenModal()} className="bg-purple-600 hover:bg-purple-700">
          <Plus size={16} className="mr-2" /> Create Event
        </Button>
      </div>

      <div className="flex bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search events..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-gray-900"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Capacity</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredEvents.length === 0 ? (
              <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No events found.</td></tr>
            ) : (
              filteredEvents.map(event => (
                <tr key={event.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900">{event.title}</td>
                  <td className="px-6 py-4 text-gray-600">{event.date}</td>
                  <td className="px-6 py-4 text-gray-600">{event.location}</td>
                  <td className="px-6 py-4 text-gray-600">{event.capacity}</td>
                  <td className="px-6 py-4 flex justify-end gap-2">
                    <button onClick={() => handleOpenModal(event)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(event.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-md"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <SimpleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Event" : "Create Event"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
            <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="text-gray-900"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <Input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="text-gray-900"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
              <Input type="number" required value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} className="text-gray-900"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <Input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="text-gray-900"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <Textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="text-gray-900"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <Input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="text-gray-900"/>
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">{editingId ? "Save Changes" : "Create Event"}</Button>
        </form>
      </SimpleModal>
    </div>
  );
}