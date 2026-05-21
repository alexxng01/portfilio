import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function About() {
  const { aboutData } = useContext(ThemeContext);

  if (!aboutData) return <div className="pt-24 text-white text-center">Loading...</div>;

  return (
    <section className="w-full bg-slate-900 py-20 px-6 md:px-12" id="About">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {aboutData.title || 'About'}<span className="text-cyan-400">{aboutData.subtitle || 'Me'}</span>
          </h2>
          <h4 className="text-xl text-cyan-400 mt-2">{aboutData.profession || 'Full Stack Developer'}</h4>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column - Text */}
          <div className="flex-1">
            {aboutData.paragraph1 && (
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                {aboutData.paragraph1}
              </p>
            )}
            {aboutData.paragraph2 && (
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                {aboutData.paragraph2}
              </p>
            )}
            {aboutData.paragraph3 && (
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                {aboutData.paragraph3}
              </p>
            )}
          </div>

          {/* Right Column - Cards */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-900 rounded-lg text-blue-400 text-2xl">
                  <i className={aboutData.education_icon || 'fas fa-graduation-cap'}></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Education</h3>
                  <p className="text-gray-400">{aboutData.education || 'Computer Science Student at Techspire College, Kathmandu'}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-900 rounded-lg text-green-400 text-2xl">
                  <i className={aboutData.development_icon || 'fas fa-code'}></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Development Focus</h3>
                  <p className="text-gray-400">{aboutData.development_focus || 'Full-stack web development with modern technologies and best practices'}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-900 rounded-lg text-purple-400 text-2xl">
                  <i className={aboutData.design_icon || 'fas fa-palette'}></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Design Philosophy</h3>
                  <p className="text-gray-400">{aboutData.design_philosophy || 'Creating intuitive and beautiful user interfaces with Figma and modern design principles'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="btn-box inline-block">More About Me</button>
        </div>
      </div>
    </section>
  );
}
