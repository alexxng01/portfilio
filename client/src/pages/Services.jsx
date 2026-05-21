import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Services() {
  const { servicesData } = useContext(ThemeContext);

  if (!servicesData || servicesData.length === 0) {
    return <div className="text-center text-white py-20">Loading services...</div>;
  }

  return (
    <section className="w-full bg-slate-800 py-20 px-6 md:px-12" id="Services">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
          My <span className="text-cyan-400">Services</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div key={service.id} className="bg-slate-900 p-8 rounded-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition">
              <i className={`bx ${service.icon} text-cyan-400 text-4xl mb-4`}></i>
              <h2 className="text-2xl font-bold text-white mb-3">{service.name}</h2>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <a href="#" className="text-cyan-400 hover:text-cyan-300 font-semibold">Learn More →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
