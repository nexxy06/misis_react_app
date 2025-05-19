import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Table.css';

const Table = () => {
  const [frogs, setFrogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFrogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/frogs');
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        const data = await response.json();
        setFrogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFrogs();
  }, []);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="frog-gallery">
      <h2>Список лягушек</h2>
      <div className="frog-grid">
        {frogs.map(frog => (
          <div 
            key={frog.id} 
            className="frog-card"
            onClick={() => navigate(`/frogs/${frog.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={`http://localhost:5000${frog.image}`} 
              alt={frog.title}
              onError={(e) => {
                e.target.src = '/placeholder-frog.jpg';
                e.target.onerror = null;
              }}
            />
            <h3>{frog.title}</h3>
            <p>{frog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;