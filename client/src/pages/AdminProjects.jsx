import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    github_link: '',
    live_link: '',
    featured: false,
  });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`/api/projects/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('/api/projects', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchProjects();
      setFormData({
        title: '',
        description: '',
        image: '',
        technologies: '',
        github_link: '',
        live_link: '',
        featured: false,
      });
      setEditingId(null);
    } catch (error) {
      alert('Error saving project: ' + error.message);
    }
  };

  const handleEdit = (project) => {
    setFormData(project);
    setEditingId(project.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project?')) {
      try {
        await axios.delete(`/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchProjects();
      } catch (error) {
        alert('Error deleting project: ' + error.message);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-800 p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-white mb-8">{editingId ? 'Edit Project' : 'Add New Project'}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none"
            ></textarea>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Technologies (comma-separated)</label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-white mb-2">GitHub Link</label>
              <input
                type="url"
                name="github_link"
                value={formData.github_link}
                onChange={handleChange}
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Live Link</label>
              <input
                type="url"
                name="live_link"
                value={formData.live_link}
                onChange={handleChange}
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 cursor-pointer"
            />
            <label className="text-white">Mark as Featured</label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-cyan-400 text-slate-900 px-6 py-2 rounded font-semibold hover:bg-cyan-300 transition"
            >
              {editingId ? 'Update Project' : 'Add Project'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    title: '',
                    description: '',
                    image: '',
                    technologies: '',
                    github_link: '',
                    live_link: '',
                    featured: false,
                  });
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

      {/* Projects List */}
      <div className="bg-slate-800 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-6">All Projects</h2>
        <div className="grid gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-slate-700 p-4 rounded hover:bg-slate-600 transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="text-gray-300 text-sm mt-1">{project.description}</p>
                  {project.featured && <span className="text-cyan-400 text-sm font-semibold">★ Featured</span>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
