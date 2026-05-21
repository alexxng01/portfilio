import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && window.location.pathname !== '/admin/login') {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('adminToken', newToken);
    navigate('/admin/dashboard');
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <Routes>
      <Route path="/login" element={<AdminLogin onLogin={handleLogin} />} />
      <Route path="/dashboard/*" element={token ? <AdminDashboard onLogout={handleLogout} /> : <AdminLogin onLogin={handleLogin} />} />
    </Routes>
  );
}
