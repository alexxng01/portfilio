import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminTeamwork() {
  const navigate = useNavigate();
  const [teamwork, setTeamwork] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    order_index: 1
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchTeamwork();
  }, [navigate]);

  const fetchTeamwork = async () => {
    try {
      const response = await axios.get('/api/teamwork');
      setTeamwork(response.data);
    } catch (error) {
      console.error('Error fetching teamwork:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!formData.title || !formData.description || !formData.image) {
        alert('Please fill all fields');
        return;
      }

      await axios.post('/api/teamwork', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setFormData({ title: '', description: '', image: '', order_index: 1 });
      fetchTeamwork();
      alert('Teamwork item added successfully!');
    } catch (error) {
      console.error('Error adding teamwork:', error);
      alert('Error adding teamwork item');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
      order_index: item.order_index
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!formData.title || !formData.description || !formData.image) {
        alert('Please fill all fields');
        return;
      }

      await axios.put(`/api/teamwork/${editingId}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setEditingId(null);
      setFormData({ title: '', description: '', image: '', order_index: 1 });
      fetchTeamwork();
      alert('Teamwork item updated successfully!');
    } catch (error) {
      console.error('Error updating teamwork:', error);
      alert('Error updating teamwork item');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/teamwork/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTeamwork();
      alert('Teamwork item deleted successfully!');
    } catch (error) {
      console.error('Error deleting teamwork:', error);
      alert('Error deleting teamwork item');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', image: '', order_index: 1 });
  };

  if (loading) return <div className="pt-24 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-cyan-400">Manage Teamwork & Collaboration</h1>

        {/* Form Section */}
        <div className="admin-card mb-12">
          <h2 className="text-2xl font-bold mb-8">
            {editingId ? '✏️ Edit Teamwork Item' : '➕ Add New Teamwork Item'}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-cyan-400">Title</label>
              <input
                type="text"
                placeholder="e.g., UI/UX Design"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="admin-input"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-cyan-400">Image URL</label>
              <input
                type="text"
                placeholder="/images/example.jpeg"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="admin-input"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-cyan-400">Description</label>
            <textarea
              placeholder="Describe your teamwork experience..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="admin-input"
              rows="5"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold mb-2 text-cyan-400">Order Index</label>
            <input
              type="number"
              placeholder="1"
              value={formData.order_index}
              onChange={(e) =>
                setFormData({ ...formData, order_index: parseInt(e.target.value) || 1 })
              }
              className="admin-input"
              min="1"
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            {editingId ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="admin-btn admin-btn-primary"
                >
                  💾 Update Item
                </button>
                <button
                  onClick={handleCancel}
                  className="admin-btn bg-gray-600 text-white hover:bg-gray-700"
                >
                  ❌ Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleAdd}
                className="admin-btn admin-btn-success"
              >
                ✅ Add Item
              </button>
            )}
          </div>
        </div>

        {/* List Section */}
        <div className="admin-card">
          <h2 className="text-2xl font-bold mb-8">🤝 Teamwork Items</h2>

          {teamwork.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No teamwork items yet. Add one to get started!</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {teamwork.map((item) => (
                <div key={item.id} className="border border-slate-600 rounded-lg p-6 bg-slate-800 hover:bg-slate-700 transition-all duration-300">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-lg mb-4 shadow-lg hover:shadow-cyan-500/30 transition-shadow"
                    />
                  )}
                  <h3 className="text-lg font-bold mb-2 text-cyan-400">{item.title}</h3>
                  <p className="text-gray-300 mb-3 text-sm line-clamp-3">{item.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-400 mb-4">
                    <span>Order: #{item.order_index}</span>
                    <span>ID: {item.id}</span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition text-sm font-semibold shadow-lg hover:shadow-blue-500/30"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition text-sm font-semibold shadow-lg hover:shadow-red-500/30"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
