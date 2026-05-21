import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({ category: '', name: '', percentage: 50, icon: '' });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get('/api/skills');
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'percentage' ? parseInt(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`/api/skills/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('/api/skills', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchSkills();
      setFormData({ category: '', name: '', percentage: 50, icon: '' });
      setEditingId(null);
    } catch (error) {
      alert('Error saving skill: ' + error.message);
    }
  };

  const handleEdit = (skill) => {
    setFormData(skill);
    setEditingId(skill.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this skill?')) {
      try {
        await axios.delete(`/api/skills/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchSkills();
      } catch (error) {
        alert('Error deleting skill: ' + error.message);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-800 p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-white mb-8">{editingId ? 'Edit Skill' : 'Add New Skill'}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Frontend"
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Skill Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., React"
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Percentage</label>
              <input
                type="number"
                name="percentage"
                min="0"
                max="100"
                value={formData.percentage}
                onChange={handleChange}
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-cyan-400 text-slate-900 px-6 py-2 rounded font-semibold hover:bg-cyan-300 transition"
            >
              {editingId ? 'Update Skill' : 'Add Skill'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setFormData({ category: '', name: '', percentage: 50, icon: '' });
                  setEditingId(null);
                }}
                className="bg-slate-700 text-white px-6 py-2 rounded font-semibold hover:bg-slate-600 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Skills List */}
      <div className="bg-slate-800 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-6">All Skills</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Skill</th>
                <th className="text-left p-3">Percentage</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id} className="border-b border-slate-700 hover:bg-slate-700">
                  <td className="p-3">{skill.category}</td>
                  <td className="p-3">{skill.name}</td>
                  <td className="p-3">{skill.percentage}%</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="text-cyan-400 hover:text-cyan-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
