
import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ 
  variant = 'info', 
  children, 
  dismissible = false, 
  icon = true,
  className = ''
}) => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return 'fas fa-check-circle';
      case 'danger':
        return 'fas fa-exclamation-triangle';
      case 'warning':
        return 'fas fa-exclamation-circle';
      case 'info':
        return 'fas fa-info-circle';
      default:
        return 'fas fa-info-circle';
    }
  };

  return (
    <Alert 
      variant={variant} 
      dismissible={dismissible}
      onClose={() => setShow(false)}
      className={`d-flex align-items-center ${className}`}
      style={{
        borderRadius: '8px',
        border: 'none',
        fontSize: '0.95rem',
        fontWeight: '500'
      }}
    >
      {icon && (
        <i className={`${getIcon()} me-3`} style={{ fontSize: '1.1rem' }}></i>
      )}
      <div className="flex-grow-1">
        {children}
      </div>
    </Alert>
  );
};

export default Message;
