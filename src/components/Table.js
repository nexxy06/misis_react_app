// src/components/Table.js
import React, { useContext } from 'react';
import { FrogContext } from '../context/FrogContext';
import './Table.css';

const Table = () => {
  const { frogs } = useContext(FrogContext);

  return (
    <div className="table-page">
      <div className="frog-grid">
        {frogs.map(frog => (
          <div key={frog.id} className="frog-card">
            <img 
              src={process.env.PUBLIC_URL + frog.image} 
              alt={frog.name}
              onError={(e) => {
                e.target.src = process.env.PUBLIC_URL + '/images/default-frog.png';
              }}
            />
            <h3>{frog.name}</h3>
            <p>{frog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table; // Важно: default export