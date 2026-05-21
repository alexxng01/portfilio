import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Teamwork() {
  const [teamwork, setTeamwork] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamwork();
  }, []);

  const fetchTeamwork = async () => {
    try {
      const response = await axios.get('/api/teamwork');
      setTeamwork(response.data);
    } catch (error) {
      console.error('Error fetching teamwork:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="pt-24 text-center text-white">Loading teamwork...</div>;

  return (
    <section className="teamwork-section" id="Teamwork">
      <div className="teamwork-container">
        <h1 className="teamwork-title">
          Latest <span className="teamwork-highlight">Teamwork</span>
        </h1>

        <div className="teamwork-grid">
          {teamwork.map((item) => (
            <div key={item.id} className="teamwork-item">
              <img src={item.image} alt={item.title} className="teamwork-image" />
              <div className="teamwork-overlay">
                <h5 className="teamwork-overlay-title">{item.title}</h5>
                <p className="teamwork-overlay-desc">{item.description}</p>
                <a href="#" onClick={(e) => e.preventDefault()} className="teamwork-overlay-link">
                  <i className="bx bx-link-external"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
