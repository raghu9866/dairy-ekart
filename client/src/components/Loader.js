
import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ size = 'lg', text = 'Loading...', variant = 'primary' }) => {
  const sizeMap = {
    sm: { width: '1.5rem', height: '1.5rem' },
    md: { width: '3rem', height: '3rem' },
    lg: { width: '4rem', height: '4rem' },
    xl: { width: '6rem', height: '6rem' }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-4">
      <Spinner
        animation="border"
        role="status"
        variant={variant}
        style={{
          ...sizeMap[size],
          margin: 'auto',
          display: 'block',
        }}
      />
      {text && (
        <div className="mt-3 text-muted fw-medium" style={{ fontSize: '0.9rem' }}>
          {text}
        </div>
      )}
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .spinner-border {
          animation: spin 1s linear infinite, pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;
