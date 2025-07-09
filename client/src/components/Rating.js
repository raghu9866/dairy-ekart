
import React from 'react';

const Rating = ({ value, text, color = '#f4a261', size = '1rem' }) => {
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className="me-1">
        <i
          style={{ 
            color,
            fontSize: size,
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
          className={
            value >= i
              ? 'fas fa-star'
              : value >= i - 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
    );
  }

  return (
    <div className="rating d-flex align-items-center">
      <div className="stars d-flex">
        {stars}
      </div>
      {text && (
        <span 
          className="ms-2 text-muted"
          style={{ 
            fontSize: '0.85rem',
            fontWeight: '500'
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default Rating;
