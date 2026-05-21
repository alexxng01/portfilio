import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import axios from 'axios';

export default function AdminAbout() {
  const { aboutData, fetchAboutData } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    subtitle: '',
    profession: '',
    paragraph1: '',
    paragraph2: '',
    paragraph3: '',
    education: '',
    development_focus: '',
    design_philosophy: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (aboutData) {
      setFormData({
        subtitle: aboutData.subtitle || '',
        profession: aboutData.profession || '',
        paragraph1: aboutData.paragraph1 || '',
        paragraph2: aboutData.paragraph2 || '',
        paragraph3: aboutData.paragraph3 || '',
        education: aboutData.education || '',
        development_focus: aboutData.development_focus || '',
        design_philosophy: aboutData.design_philosophy || '',
      });
    }
  }, [aboutData]);

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
      await axios.put('/api/about', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage('About section updated successfully! ✅');
      fetchAboutData();
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating about section: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8">Edit About Section</h2>

      {message && (
        <div className={`mb-6 p-4 rounded ${message.includes('Error') ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Subtitle */}
        <div>
          <label className="block text-white font-semibold mb-2">Section Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="e.g., Me"
            className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
          />
        </div>

        {/* Profession */}
        <div>
          <label className="block text-white font-semibold mb-2">Your Profession</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            placeholder="e.g., Full Stack Developer"
            className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
          />
        </div>

        {/* Paragraph 1 */}
        <div>
          <label className="block text-white font-semibold mb-2">Paragraph 1</label>
          <textarea
            name="paragraph1"
            value={formData.paragraph1}
            onChange={handleChange}
            placeholder="First paragraph about yourself..."
            rows="3"
            className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
          ></textarea>
        </div>

        {/* Paragraph 2 */}
        <div>
          <label className="block text-white font-semibold mb-2">Paragraph 2</label>
          <textarea
            name="paragraph2"
            value={formData.paragraph2}
            onChange={handleChange}
            placeholder="Second paragraph about yourself..."
            rows="3"
            className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
          ></textarea>
        </div>

        {/* Paragraph 3 */}
        <div>
          <label className="block text-white font-semibold mb-2">Paragraph 3</label>
          <textarea
            name="paragraph3"
            value={formData.paragraph3}
            onChange={handleChange}
            placeholder="Third paragraph about yourself..."
            rows="3"
            className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
          ></textarea>
        </div>

        {/* Info Cards Section */}
        <div className="border-t border-slate-600 pt-6 mt-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">Info Cards</h3>

          {/* Education */}
          <div>
            <label className="block text-white font-semibold mb-2">Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Your education info..."
              className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
            />
          </div>

          {/* Development Focus */}
          <div className="mt-4">
            <label className="block text-white font-semibold mb-2">Development Focus</label>
            <input
              type="text"
              name="development_focus"
              value={formData.development_focus}
              onChange={handleChange}
              placeholder="Your development focus..."
              className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
            />
          </div>

          {/* Design Philosophy */}
          <div className="mt-4">
            <label className="block text-white font-semibold mb-2">Design Philosophy</label>
            <input
              type="text"
              name="design_philosophy"
              value={formData.design_philosophy}
              onChange={handleChange}
              placeholder="Your design philosophy..."
              className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-cyan-400 text-slate-900 font-bold rounded hover:bg-cyan-300 transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      <div className="mt-8 p-4 bg-slate-700 rounded border border-slate-600">
        <h3 className="text-white font-semibold mb-2">Preview of Changes:</h3>
        <p className="text-cyan-400 text-lg">About{formData.subtitle}</p>
        <p className="text-gray-300">{formData.profession}</p>
        <p className="text-gray-400 mt-2">{formData.paragraph1?.substring(0, 100)}...</p>
      </div>
    </div>
  );
}
