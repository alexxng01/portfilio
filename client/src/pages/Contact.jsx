import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext';

export default function Contact() {
  const { portfolioData } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSubmitted(false);

    try {
      const response = await axios.post('/api/contact/message', {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Error sending message. Please try again.');
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!portfolioData) return <div className="pt-24">Loading...</div>;

  return (
    <section className="w-full bg-slate-900 py-20 px-6 md:px-12" id="Contact">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Contact<span className="text-cyan-400">Me</span>
          </h2>
          <h4 className="text-xl text-cyan-400 mt-2">Let's work Together</h4>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            I'm always excited to connect with new people, explore fresh ideas, and bring creative visions to life.
            Whether you have a project in mind or just want to say hello, I'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center gap-4 text-lg text-gray-300">
                <i className="bx bxs-envelope text-cyan-400 text-2xl"></i>
                <span>{portfolioData.email}</span>
              </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center gap-4 text-lg text-gray-300">
                <i className="bx bxs-phone text-cyan-400 text-2xl"></i>
                <span>{portfolioData.phone}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-white font-bold mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-2xl hover:text-cyan-300 transition">
                  <i className="bx bxl-facebook-circle"></i>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-2xl hover:text-cyan-300 transition">
                  <i className="bx bxl-twitter"></i>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-2xl hover:text-cyan-300 transition">
                  <i className="bx bxl-instagram"></i>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-2xl hover:text-cyan-300 transition">
                  <i className="bx bxl-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none transition disabled:opacity-50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none transition disabled:opacity-50"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none transition disabled:opacity-50"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  rows="5"
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none transition disabled:opacity-50"
                  placeholder="Your message..."
                ></textarea>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-box w-full mt-6 justify-center disabled:opacity-50">
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {error && (
              <div className="mt-4 p-3 bg-red-600 text-white rounded text-center">
                {error}
              </div>
            )}
            {submitted && (
              <div className="mt-4 p-3 bg-green-600 text-white rounded text-center">
                Message sent successfully! We'll get back to you soon. ✅
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
