
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-0 product-card h-100" style={{ 
      borderRadius: '12px', 
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      border: 'none',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="position-relative overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <Card.Img 
            src={product.image} 
            variant="top" 
            style={{ 
              height: '200px', 
              objectFit: 'cover',
              transition: 'transform 0.3s ease'
            }}
            className="product-image"
          />
        </Link>
        {product.countInStock === 0 && (
          <Badge 
            bg="danger" 
            className="position-absolute top-0 end-0 m-2"
            style={{ fontSize: '0.7rem' }}
          >
            Out of Stock
          </Badge>
        )}
        {product.countInStock > 0 && product.countInStock < 10 && (
          <Badge 
            bg="warning" 
            className="position-absolute top-0 end-0 m-2"
            style={{ fontSize: '0.7rem' }}
          >
            Low Stock
          </Badge>
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <Card.Title 
            as="div" 
            className="mb-2"
            style={{ 
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#2d3748',
              lineHeight: '1.4',
              height: '2.8rem',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {product.name}
          </Card.Title>
        </Link>

        <Card.Text as="div" className="mb-2">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Card.Text 
            as="h4" 
            className="mb-0"
            style={{ 
              color: '#2c5f2d', 
              fontWeight: '700',
              fontSize: '1.3rem'
            }}
          >
            ₹{product.price}
          </Card.Text>
          <small className="text-muted">
            {product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of stock'}
          </small>
        </div>

        {product.brand && (
          <small className="text-muted mt-1">
            Brand: {product.brand}
          </small>
        )}
      </Card.Body>

      <style jsx>{`
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .product-card:hover .product-image {
          transform: scale(1.05);
        }
      `}</style>
    </Card>
  );
};

export default Product;
