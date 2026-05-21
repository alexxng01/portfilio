import React, { useState } from 'react';
import axios from 'axios';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('admin@portfolio.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      onLogin(response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-slate-800 rounded-lg p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Admin Login</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none transition"
              placeholder="admin@portfolio.com"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-400 outline-none transition"
              placeholder="Enter password"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-600 text-white rounded text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-400 text-slate-900 py-2 rounded font-semibold hover:bg-cyan-300 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* <div className="mt-6 p-4 bg-slate-700 rounded text-sm text-gray-300">
          <p className="font-semibold text-white mb-2">Demo Credentials:</p>
          <p>Email: admin@portfolio.com</p>
          <p>Password: admin123</p>
        </div> */}
      </div>
    </div>
  );
}
