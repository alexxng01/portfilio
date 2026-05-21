import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext';

export default function AdminPortfolio() {
  const { portfolioData, fetchPortfolioData, updateTheme } = useContext(ThemeContext);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (portfolioData) {
      setFormData({
        name: portfolioData.name || '',
        title: portfolioData.title || '',
        bio: portfolioData.bio || '',
        email: portfolioData.email || '',
        phone: portfolioData.phone || '',
        theme: portfolioData.theme || 'dark',
        primary_color: portfolioData.primary_color || '#0ef',
        secondary_color: portfolioData.secondary_color || '#071b27',
        home_text_color: portfolioData.home_text_color || '#ededed',
        home_heading_color: portfolioData.home_heading_color || '#ffffff',
        home_bg_color: portfolioData.home_bg_color || 'rgb(15, 23, 42)',
        home_shadow_type: portfolioData.home_shadow_type || 'glow-md',
      });
    }
  }, [portfolioData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put('/api/portfolio', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Update theme immediately with new colors
      updateTheme({
        mode: formData.theme || 'dark',
        primaryColor: formData.primary_color || '#0ef',
        secondaryColor: formData.secondary_color || '#071b27',
      });
      
      // Fetch fresh data from server
      await fetchPortfolioData();
      alert('✅ Portfolio updated! 🎨 Theme colors & home styling applied instantly.');
    } catch (error) {
      alert('❌ Error updating portfolio: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return <div className="text-white">Loading...</div>;

  return (
    <div className="bg-slate-800 p-8 rounded-lg">
      <h1 className="text-3xl font-bold text-white mb-8">Edit Portfolio Data</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Primary Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                name="primary_color"
                value={formData.primary_color}
                onChange={handleChange}
                className="w-16 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={formData.primary_color}
                onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                className="flex-1 bg-slate-700 text-white px-4 py-2 rounded border border-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">Secondary Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                name="secondary_color"
                value={formData.secondary_color}
                onChange={handleChange}
                className="w-16 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={formData.secondary_color}
                onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                className="flex-1 bg-slate-700 text-white px-4 py-2 rounded border border-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">Theme</label>
            <select
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none transition"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-white mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="5"
            className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none transition"
          ></textarea>
        </div>

        {/* Home Page Styling Section */}
        <div className="border-t border-slate-600 pt-8 mt-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">🏠 Home Page Styling</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white mb-2">Home Text Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="home_text_color"
                  value={formData.home_text_color}
                  onChange={handleChange}
                  className="w-16 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.home_text_color}
                  onChange={(e) => setFormData({ ...formData, home_text_color: e.target.value })}
                  className="flex-1 bg-slate-700 text-white px-4 py-2 rounded border border-slate-600"
                  placeholder="e.g., #ededed"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Paragraph text color</p>
            </div>

            <div>
              <label className="block text-white mb-2">Home Heading Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="home_heading_color"
                  value={formData.home_heading_color}
                  onChange={handleChange}
                  className="w-16 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.home_heading_color}
                  onChange={(e) => setFormData({ ...formData, home_heading_color: e.target.value })}
                  className="flex-1 bg-slate-700 text-white px-4 py-2 rounded border border-slate-600"
                  placeholder="e.g., #ffffff"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">H1 & H3 heading color</p>
            </div>

            <div>
              <label className="block text-white mb-2">Home Background Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="home_bg_color"
                  value={formData.home_bg_color}
                  onChange={handleChange}
                  className="w-16 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.home_bg_color}
                  onChange={(e) => setFormData({ ...formData, home_bg_color: e.target.value })}
                  className="flex-1 bg-slate-700 text-white px-4 py-2 rounded border border-slate-600"
                  placeholder="e.g., rgb(15, 23, 42)"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Section background color</p>
            </div>

            <div>
              <label className="block text-white mb-2">Home Shadow Effect</label>
              <select
                name="home_shadow_type"
                value={formData.home_shadow_type}
                onChange={handleChange}
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none transition"
              >
                <option value="none">None</option>
                <option value="glow-sm">Glow Small</option>
                <option value="glow-md">Glow Medium</option>
                <option value="glow-lg">Glow Large</option>
                <option value="soft">Soft Shadow</option>
                <option value="neon-sm">Neon Small</option>
                <option value="neon-md">Neon Medium</option>
                <option value="neon-lg">Neon Large</option>
                <option value="dynamic">Dynamic</option>
              </select>
              <p className="text-xs text-gray-400 mt-1">Box shadow effect on home content</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-400 text-slate-900 py-2 rounded font-semibold hover:bg-cyan-300 transition disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Portfolio'}
        </button>
      </form>
    </div>
  );
}
