import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { portfolioData } = useContext(ThemeContext);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Hide everything except logo on admin/login pages
  if (
    location.pathname.startsWith("/admin") ||
    location.pathname === "/admin/login" ||
    location.pathname === "/login"
  ) {
    return (
      <header className="fixed top-0 left-0 w-full px-6 md:px-10 py-5 bg-slate-950 flex justify-between items-center z-50 shadow-lg">
        <div className="logo text-2xl font-bold text-white">
          Portfolio
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 w-full px-6 md:px-10 py-5 bg-slate-950 flex justify-between items-center z-50 shadow-lg">
      <div className="logo text-2xl font-bold text-white">Portfolio</div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8">
        <a href="#Home" className="text-white hover:text-cyan-400 transition">Home</a>
        <a href="#About" className="text-white hover:text-cyan-400 transition">About</a>
        <a href="#Services" className="text-white hover:text-cyan-400 transition">Services</a>
        <a href="#Skills" className="text-white hover:text-cyan-400 transition">Skills</a>
        <a href="#Teamwork" className="text-white hover:text-cyan-400 transition">Teamwork</a>
        <a href="#Projects" className="text-white hover:text-cyan-400 transition">Projects</a>
        <a href="#Contact" className="text-white hover:text-cyan-400 transition">Contact</a>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex flex-col gap-1.5 cursor-pointer"
        onClick={toggleMenu}
      >
        <span className={`w-7 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`w-7 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`w-7 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="absolute top-16 right-0 w-64 bg-slate-950 shadow-2xl rounded-lg md:hidden">
          <nav className="flex flex-col gap-4 p-6">
            <a href="#Home" onClick={closeMenu}>Home</a>
            <a href="#About" onClick={closeMenu}>About</a>
            <a href="#Services" onClick={closeMenu}>Services</a>
            <a href="#Skills" onClick={closeMenu}>Skills</a>
            <a href="#Teamwork" onClick={closeMenu}>Teamwork</a>
            <a href="#Projects" onClick={closeMenu}>Projects</a>
            <a href="#Contact" onClick={closeMenu}>Contact</a>
            {/* <Link to="/admin/login" onClick={closeMenu}>Admin</Link> */}
          </nav>
        </div>
      )}
    </header>
  );
}