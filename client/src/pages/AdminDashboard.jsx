import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext';

import AdminHome from './AdminHome';
import AdminAbout from './AdminAbout';
import AdminServices from './AdminServices';
import AdminContact from './AdminContact';
import AdminPortfolio from './AdminPortfolio';
import AdminSkills from './AdminSkills';
import AdminProjects from './AdminProjects';
import AdminTeamwork from './AdminTeamwork';
import AdminDashboardPage from './AdminDashboardPage';

export default function AdminDashboard({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchPortfolioData } = useContext(ThemeContext);
  const token = localStorage.getItem('adminToken');

  const [isOpen, setIsOpen] = useState(false);
  const [greeting, setGreeting] = useState('');

  // Get greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning ☀️');
    else if (hour < 18) setGreeting('Good Afternoon 🌤️');
    else setGreeting('Good Evening 🌙');
  }, []);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    onLogout();
  };

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Check if on dashboard page
  const isDashboard = location.pathname === '/admin/dashboard' || location.pathname === '/admin/dashboard/';

  return (
    <>
      {/* Top bar button */}
      <div className="fixed top-4 right-8 z-50">
        <button
          onClick={toggleMenu}
          className="flex flex-col gap-1.5 p-2 bg-slate-800 rounded"
        >
          <span className={`w-6 h-0.5 bg-white transition ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white transition ${isOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white transition ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      <div className="min-h-screen bg-slate-900 pt-24 flex">

        {/* Sidebar */}
        <div
          className={`bg-slate-800 p-6 space-y-4 fixed top-20 left-0 h-screen w-64 overflow-y-auto
          transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:top-0`}
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Admin Panel
          </h2>

          <nav className="space-y-2">
            <Link to="/admin/dashboard"
              className="block px-4 py-2 text-cyan-400 hover:bg-slate-700 rounded"
              onClick={closeMenu}
            >
              📊 Dashboard
            </Link>

            <Link to="/admin/dashboard/home"
              className="block px-4 py-2 text-white hover:bg-slate-700 rounded"
              onClick={closeMenu}
            >
              🏠 Home
            </Link>

            <Link to="/admin/dashboard/about"
              className="block px-4 py-2 text-white hover:bg-slate-700 rounded"
              onClick={closeMenu}
            >
              ℹ️ About
            </Link>

            <Link to="/admin/dashboard/services"
              className="block px-4 py-2 text-white hover:bg-slate-700 rounded"
              onClick={closeMenu}
            >
              💼 Services
            </Link>

            <Link to="/admin/dashboard/contact"
              className="block px-4 py-2 text-white hover:bg-slate-700 rounded"
              onClick={closeMenu}
            >
              📧 Contact
            </Link>

            <Link to="/admin/dashboard/portfolio"
              className="block px-4 py-2 text-white hover:bg-slate-700 rounded"
              onClick={closeMenu}
            >
              📋 Portfolio
            </Link>

            <Link to="/admin/dashboard/skills"
              className="block px-4 py-2 text-white hover:bg-slate-700 rounded"
              onClick={closeMenu}
            >
              ⭐ Skills
            </Link>

            <Link to="/admin/dashboard/teamwork"
              className="block px-4 py-2 text-white hover:bg-slate-700 rounded"
              onClick={closeMenu}
            >
              🤝 Teamwork
            </Link>

            <Link to="/admin/dashboard/projects"
              className="block px-4 py-2 text-white hover:bg-slate-700 rounded"
              onClick={closeMenu}
            >
              🚀 Projects
            </Link>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700 rounded mt-6"
            >
              🚪 Logout
            </button>

          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 text-white overflow-y-auto">
          {isDashboard && (
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-cyan-400 mb-2">{greeting}</h1>
              <p className="text-gray-400">Welcome to your admin dashboard</p>
            </div>
          )}
          
          <Routes>
            <Route path="/" element={<AdminDashboardPage />} />
            <Route path="home" element={<AdminHome />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="contact" element={<AdminContact />} />
            <Route path="portfolio" element={<AdminPortfolio />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="teamwork" element={<AdminTeamwork />} />
            <Route path="projects" element={<AdminProjects />} />
          </Routes>
        </div>

      </div>
    </>
  );
}