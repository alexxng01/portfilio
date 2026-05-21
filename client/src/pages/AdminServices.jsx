import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import axios from 'axios';

export default function AdminServices() {
  const { servicesData, fetchServicesData } = useContext(ThemeContext);
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (servicesData) {
      setServices(servicesData);
    }
  }, [servicesData]);

  const handleEdit = (service) => {
    setEditingId(service.id);
    setFormData({
      name: service.name,
      description: service.description,
      icon: service.icon,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`/api/services/${editingId}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage('Service updated successfully! ✅');
      setEditingId(null);
      setFormData({ name: '', description: '', icon: '' });
      fetchServicesData();
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating service: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', icon: '' });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8">Edit Services</h2>

      {message && (
        <div className={`mb-6 p-4 rounded ${message.includes('Error') ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200'}`}>
          {message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Services List */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Services List</h3>
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="bg-slate-700 p-4 rounded border border-slate-600">
                <div className="flex items-start gap-4">
                  <i className={`bx ${service.icon} text-cyan-400 text-3xl`}></i>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{service.name}</h4>
                    <p className="text-gray-400 text-sm mt-1">{service.description?.substring(0, 60)}...</p>
                  </div>
                  <button
                    onClick={() => handleEdit(service)}
                    className="px-3 py-1 bg-cyan-400 text-slate-900 rounded text-sm font-semibold hover:bg-cyan-300 transition"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Form */}
        <div>
          {editingId ? (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Edit Service</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Service Name */}
                <div>
                  <label className="block text-white font-semibold mb-2">Service Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Service name..."
                    className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-white font-semibold mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Service description..."
                    rows="4"
                    className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
                  ></textarea>
                </div>

                {/* Icon */}
                <div>
                  <label className="block text-white font-semibold mb-2">Icon Class (BoxIcons)</label>
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    placeholder="e.g., bx-code"
                    className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
                  />
                  <p className="text-xs text-gray-400 mt-1">https://boxicons.com</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-cyan-400 text-slate-900 font-bold rounded hover:bg-cyan-300 transition disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-4 py-2 bg-slate-600 text-white font-bold rounded hover:bg-slate-500 transition"
                  >
                    Cancel
                  </button>
                </div>

                {/* Preview */}
                <div className="mt-4 p-4 bg-slate-600 rounded border border-slate-500">
                  <p className="text-white text-sm font-semibold">Preview:</p>
                  <div className="mt-2 text-cyan-400">
                    <i className={`bx ${formData.icon} text-2xl`}></i>
                    <p className="mt-1 text-white">{formData.name}</p>
                    <p className="text-gray-300 text-sm mt-1">{formData.description?.substring(0, 60)}</p>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-slate-700 p-6 rounded border border-slate-600">
              <p className="text-gray-300">Select a service from the list to edit</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
