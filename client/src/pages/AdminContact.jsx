import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import axios from 'axios';

export default function AdminContact() {
  const { contactData, fetchContactData } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    contact_email: '',
    contact_phone: '',
    form_email: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (contactData) {
      setFormData({
        heading: contactData.heading || '',
        description: contactData.description || '',
        contact_email: contactData.contact_email || '',
        contact_phone: contactData.contact_phone || '',
        form_email: contactData.form_email || '',
      });
    }
  }, [contactData]);

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
      await axios.put('/api/contact', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage('Contact section updated successfully! ✅');
      fetchContactData();
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating contact section: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8">Edit Contact Section</h2>

      {message && (
        <div className={`mb-6 p-4 rounded ${message.includes('Error') ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Heading */}
        <div>
          <label className="block text-white font-semibold mb-2">Contact Heading</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            placeholder="e.g., Lets work Together"
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
            placeholder="Tell visitors about contacting you..."
            rows="5"
            className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
          ></textarea>
          <p className="text-xs text-gray-400 mt-1">This text appears at the top of the contact section</p>
        </div>

        {/* Contact Info Section */}
        <div className="border-t border-slate-600 pt-6 mt-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">Contact Information</h3>

          {/* Contact Email */}
          <div>
            <label className="block text-white font-semibold mb-2">Contact Email</label>
            <input
              type="email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
            />
            <p className="text-xs text-gray-400 mt-1">Email displayed on contact page</p>
          </div>

          {/* Contact Phone */}
          <div className="mt-4">
            <label className="block text-white font-semibold mb-2">Contact Phone</label>
            <input
              type="tel"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              placeholder="+1234567890"
              className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
            />
            <p className="text-xs text-gray-400 mt-1">Phone number displayed on contact page</p>
          </div>

          {/* Form Email */}
          <div className="mt-4">
            <label className="block text-white font-semibold mb-2">Form Submission Email</label>
            <input
              type="email"
              name="form_email"
              value={formData.form_email}
              onChange={handleChange}
              placeholder="receiver@email.com"
              className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
            />
            <p className="text-xs text-gray-400 mt-1">Where contact form submissions are sent</p>
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

      {/* Preview */}
      <div className="mt-8 p-6 bg-slate-700 rounded border border-slate-600">
        <h3 className="text-white font-semibold mb-4">Preview of Changes:</h3>
        
        <div className="space-y-3">
          <div>
            <p className="text-cyan-400 font-semibold">Heading:</p>
            <p className="text-white">{formData.heading}</p>
          </div>
          
          <div>
            <p className="text-cyan-400 font-semibold">Description:</p>
            <p className="text-gray-300 text-sm">{formData.description?.substring(0, 100)}...</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div>
              <p className="text-gray-400 text-xs">EMAIL</p>
              <p className="text-white text-sm">{formData.contact_email}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">PHONE</p>
              <p className="text-white text-sm">{formData.contact_phone}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">FORM RECEIVES AT</p>
              <p className="text-white text-sm">{formData.form_email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
