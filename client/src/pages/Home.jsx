import React, { useContext, useEffect } from 'react';
import Typed from 'typed.js';
import { ThemeContext } from '../context/ThemeContext';
import myImage from "../assets/ME.jpeg";

export default function Home() {
  const { portfolioData } = useContext(ThemeContext);
  const typedRef = React.useRef(null);

  useEffect(() => {
    if (typedRef.current) {
      const professions = [
        portfolioData?.profession1 || 'Frontend Developer',
        portfolioData?.profession2 || 'Backend Developer',
        portfolioData?.profession3 || 'Full-stack Developer'
      ];

      const typed = new Typed(typedRef.current, {
        strings: professions,
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true,
      });

      return () => typed.destroy();
    }
  }, [portfolioData]);

  return (
    <section 
      className="relative w-full min-h-screen flex items-center pt-24 px-6 md:px-12" 
      id="Home"
      style={{
        backgroundColor: portfolioData?.home_bg_color || 'rgb(15, 23, 42)'
      }}
    >
      <div className="flex flex-col-reverse md:flex-row gap-8 max-w-6xl mx-auto w-full">
        {/* Home Content */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 
            className="text-2xl md:text-3xl"
            style={{
              color: portfolioData?.home_text_color || '#ededed'
            }}
          >
            Hello, It's Me
          </h3>
          <h1 
            className="text-4xl md:text-6xl font-bold mt-2"
            style={{
              color: portfolioData?.home_heading_color || '#ffffff'
            }}
          >
            {portfolioData?.name || 'Rahul Kumar Mahato'}
          </h1>
          <h3 
            className="text-2xl md:text-3xl mt-2"
            style={{
              color: portfolioData?.home_text_color || '#ededed'
            }}
          >
            And I'm a <span className="text-cyan-400" ref={typedRef}></span>
          </h3>
          <p 
            className="mt-4 text-base md:text-lg leading-relaxed max-w-xl"
            style={{
              color: portfolioData?.home_text_color || '#ededed'
            }}
          >
            {portfolioData?.bio || 'Full-Stack Developer & Designer'}
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mt-6">
            {portfolioData?.facebook && (
              <a href={portfolioData.facebook} target="_blank" rel="noopener noreferrer" className={`text-cyan-400 text-2xl hover:text-cyan-300 transition ${portfolioData?.home_shadow_type && portfolioData.home_shadow_type !== 'none' ? `shadow-${portfolioData.home_shadow_type}` : ''}`}>
                <i className="bx bxl-facebook"></i>
              </a>
            )}
            {portfolioData?.instagram && (
              <a href={portfolioData.instagram} target="_blank" rel="noopener noreferrer" className={`text-cyan-400 text-2xl hover:text-cyan-300 transition ${portfolioData?.home_shadow_type && portfolioData.home_shadow_type !== 'none' ? `shadow-${portfolioData.home_shadow_type}` : ''}`}>
                <i className="bx bxl-instagram"></i>
              </a>
            )}
            {portfolioData?.whatsapp && (
              <a href={portfolioData.whatsapp} target="_blank" rel="noopener noreferrer" className={`text-cyan-400 text-2xl hover:text-cyan-300 transition ${portfolioData?.home_shadow_type && portfolioData.home_shadow_type !== 'none' ? `shadow-${portfolioData.home_shadow_type}` : ''}`}>
                <i className="bx bxl-whatsapp"></i>
              </a>
            )}
            {portfolioData?.tiktok && (
              <a href={portfolioData.tiktok} target="_blank" rel="noopener noreferrer" className={`text-cyan-400 text-2xl hover:text-cyan-300 transition ${portfolioData?.home_shadow_type && portfolioData.home_shadow_type !== 'none' ? `shadow-${portfolioData.home_shadow_type}` : ''}`}>
                <i className="bx bxl-tiktok"></i>
              </a>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <a href="#Projects" className={`inline-block px-8 py-3 bg-cyan-400 text-slate-900 font-bold rounded hover:bg-cyan-300 transition ${portfolioData?.home_shadow_type && portfolioData.home_shadow_type !== 'none' ? `shadow-${portfolioData.home_shadow_type}` : ''}`}>
              View My Projects
            </a>
            <a href={portfolioData?.cv_file || '/cv/cv-3.docx'} download className={`inline-block px-8 py-3 bg-cyan-400 text-slate-900 font-bold rounded hover:bg-cyan-300 transition ${portfolioData?.home_shadow_type && portfolioData.home_shadow_type !== 'none' ? `shadow-${portfolioData.home_shadow_type}` : ''}`}>
              Download CV
            </a>
          </div>
        </div>

        {/* Home Image */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={portfolioData?.profile_image || myImage}
            alt="Profile"
            className={`w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-cyan-400 ${portfolioData?.home_shadow_type && portfolioData.home_shadow_type !== 'none' ? `shadow-${portfolioData.home_shadow_type}` : ''}`}
          />
        </div>
      </div>
    </section>
  );
}
