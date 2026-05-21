import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    mode: 'dark',
    primaryColor: '#0ef',
    secondaryColor: '#071b27',
  });

  const [portfolioData, setPortfolioData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [servicesData, setServicesData] = useState([]);
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    fetchPortfolioData();
    fetchAboutData();
    fetchServicesData();
    fetchContactData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const response = await axios.get('/api/portfolio');
      setPortfolioData(response.data);
      
      // Update theme with the latest colors from server
      const newTheme = {
        mode: response.data.theme || 'dark',
        primaryColor: response.data.primary_color || '#0ef',
        secondaryColor: response.data.secondary_color || '#071b27',
      };
      setTheme(newTheme);
      
      // Apply theme colors immediately
      const root = document.documentElement;
      root.style.setProperty('--color-primary', newTheme.primaryColor);
      root.style.setProperty('--color-secondary', newTheme.secondaryColor);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    }
  };

  const fetchAboutData = async () => {
    try {
      const response = await axios.get('/api/about');
      setAboutData(response.data);
    } catch (error) {
      console.error('Error fetching about data:', error);
    }
  };

  const fetchServicesData = async () => {
    try {
      const response = await axios.get('/api/services');
      setServicesData(response.data);
    } catch (error) {
      console.error('Error fetching services data:', error);
    }
  };

  const fetchContactData = async () => {
    try {
      const response = await axios.get('/api/contact');
      setContactData(response.data);
    } catch (error) {
      console.error('Error fetching contact data:', error);
    }
  };

  // Update theme and apply to DOM
  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    const root = document.documentElement;
    root.style.setProperty('--color-primary', newTheme.primaryColor);
    root.style.setProperty('--color-secondary', newTheme.secondaryColor);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme,
      updateTheme,
      portfolioData, 
      setPortfolioData, 
      fetchPortfolioData,
      aboutData,
      setAboutData,
      fetchAboutData,
      servicesData,
      setServicesData,
      fetchServicesData,
      contactData,
      setContactData,
      fetchContactData
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
