import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="pt-24">Loading projects...</div>;

  return (
    <section className="w-full bg-slate-900 py-20 px-6 md:px-12" id="Projects">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Featured <span className="text-cyan-400">Projects</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-slate-800 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20 transition">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              {project.featured && (
                <div className="absolute top-4 right-4 bg-cyan-400 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies && project.technologies.split(',').map((tech, idx) => (
                    <span key={idx} className="tech-badge">
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn outline"
                    >
                      <i className="fab fa-github"></i>
                      Code
                    </a>
                  )}
                  {project.live_link && (
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn primary"
                    >
                      <i className="fas fa-external-link-alt"></i>
                      Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
