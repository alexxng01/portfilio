import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Skills from './pages/Skills';
import Teamwork from './pages/Teamwork';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import './App.css';

function App() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Set CSS variables for theme
    const root = document.documentElement;
    
    // Apply primary and secondary colors
    root.style.setProperty('--color-primary', theme.primaryColor || '#0ef');
    root.style.setProperty('--color-secondary', theme.secondaryColor || '#071b27');
    
    // Apply theme class
    if (theme.mode === 'dark') {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
    
    // Log for debugging
    console.log('Theme updated:', theme);
  }, [theme]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <About />
              <Services />
              <Skills />
              <Teamwork />
              <Projects />
              <Contact />
            </>
          } />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
