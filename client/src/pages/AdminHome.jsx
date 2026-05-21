import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import axios from 'axios';

export default function AdminHome() {
  const { portfolioData, fetchPortfolioData } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    profession1: 'Frontend Developer',
    profession2: 'Backend Developer',
    profession3: 'Full-stack Developer',
    email: '',
    phone: '',
    facebook: 'https://www.facebook.com',
    instagram: 'https://www.instagram.com',
    whatsapp: 'https://wa.me/971508394178',
    tiktok: 'https://www.tiktok.com',
    profileImage: '/images/ME.jpeg',
    cvFile: '/cv/cv-3.docx',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (portfolioData) {
      setFormData(prev => ({
        ...prev,
        name: portfolioData.name || '',
        title: portfolioData.title || '',
        bio: portfolioData.bio || '',
        email: portfolioData.email || '',
        phone: portfolioData.phone || '',
        profession1: portfolioData.profession1 || 'Frontend Developer',
        profession2: portfolioData.profession2 || 'Backend Developer',
        profession3: portfolioData.profession3 || 'Full-stack Developer',
        facebook: portfolioData.facebook || 'https://www.facebook.com',
        instagram: portfolioData.instagram || 'https://www.instagram.com',
        whatsapp: portfolioData.whatsapp || 'https://wa.me/971508394178',
        tiktok: portfolioData.tiktok || 'https://www.tiktok.com',
        profileImage: portfolioData.profile_image || '/images/ME.jpeg',
        cvFile: portfolioData.cv_file || '/cv/cv-3.docx',
      }));
    }
  }, [portfolioData]);

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
      const response = await axios.put('/api/portfolio', {
        name: formData.name,
        title: formData.title,
        bio: formData.bio,
        email: formData.email,
        phone: formData.phone,
        profession1: formData.profession1,
        profession2: formData.profession2,
        profession3: formData.profession3,
        facebook: formData.facebook,
        instagram: formData.instagram,
        whatsapp: formData.whatsapp,
        tiktok: formData.tiktok,
        profile_image: formData.profileImage,
        cv_file: formData.cvFile,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage('Home page data updated successfully! ✅');
      fetchPortfolioData();
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating home page data: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8">Edit Home Page Content</h2>

      {message && (
        <div className={`mb-6 p-4 rounded ${message.includes('Error') ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-white font-semibold mb-2">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
          />
          <p className="text-xs text-gray-400 mt-1">This appears as the main heading on home page</p>
        </div>

        {/* Title */}
        <div>
          <label className="block text-white font-semibold mb-2">Your Title/Profession</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Full-stack Developer"
            className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
          />
          <p className="text-xs text-gray-400 mt-1">Your main profession title</p>
        </div>

        {/* Bio/Description */}
        <div>
          <label className="block text-white font-semibold mb-2">Bio/Description</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell about yourself..."
            rows="4"
            className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
          ></textarea>
          <p className="text-xs text-gray-400 mt-1">This is shown below your name on the home page</p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-white font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-white font-semibold mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+971508394178"
            className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
          />
        </div>

        {/* Profile Image and CV */}
        <div className="border-t border-slate-600 pt-6 mt-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">Profile & Files</h3>

          <div>
            <label className="block text-white font-semibold mb-2">Profile Image URL</label>
            <input
              type="text"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              placeholder="/images/ME.jpeg"
              className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
            />
            <p className="text-xs text-gray-400 mt-1">URL to profile image shown on home page</p>
          </div>

          <div className="mt-4">
            <label className="block text-white font-semibold mb-2">CV File URL</label>
            <input
              type="text"
              name="cvFile"
              value={formData.cvFile}
              onChange={handleChange}
              placeholder="/cv/cv-3.docx"
              className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
            />
            <p className="text-xs text-gray-400 mt-1">URL to CV file for download button</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-slate-600 pt-6 mt-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">Social Media Links</h3>

          <div>
            <label className="block text-white font-semibold mb-2">Facebook Link</label>
            <input
              type="url"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
            />
          </div>

          <div className="mt-4">
            <label className="block text-white font-semibold mb-2">Instagram Link</label>
            <input
              type="url"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
            />
          </div>

          <div className="mt-4">
            <label className="block text-white font-semibold mb-2">WhatsApp Link</label>
            <input
              type="url"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
            />
          </div>

          <div className="mt-4">
            <label className="block text-white font-semibold mb-2">TikTok Link</label>
            <input
              type="url"
              name="tiktok"
              value={formData.tiktok}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
            />
          </div>
        </div>

        {/* Professions */}
        <div className="border-t border-slate-600 pt-6 mt-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">Typing Animation Professions</h3>
          <p className="text-gray-400 mb-4 text-sm">These professions will cycle through in the typing animation</p>

          <div>
            <label className="block text-white font-semibold mb-2">Profession 1</label>
            <input
              type="text"
              name="profession1"
              value={formData.profession1}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
            />
          </div>

          <div className="mt-4">
            <label className="block text-white font-semibold mb-2">Profession 2</label>
            <input
              type="text"
              name="profession2"
              value={formData.profession2}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
            />
          </div>

          <div className="mt-4">
            <label className="block text-white font-semibold mb-2">Profession 3</label>
            <input
              type="text"
              name="profession3"
              value={formData.profession3}
              onChange={handleChange}
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
        <p className="text-cyan-400 text-lg">{formData.name}</p>
        <p className="text-gray-300">{formData.title}</p>
        <p className="text-gray-400 mt-2">{formData.bio}</p>
      </div>
    </div>
  );
}
