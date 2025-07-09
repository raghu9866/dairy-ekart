
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from '../actions/productActions';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products = [], total = 0 } = productList;

  // Handle both old and new API response formats
  const productArray = Array.isArray(products) ? products : (products.products || []);

  useEffect(() => {
    // Load featured products with limit for homepage
    dispatch(listProducts({ limit: 8, sortBy: '-rating' }));
  }, [dispatch]);

  const categories = [
    { name: 'Fresh Milk', icon: 'fas fa-glass-whiskey', color: '#e3f2fd' },
    { name: 'Cheese', icon: 'fas fa-cheese', color: '#fff3e0' },
    { name: 'Yogurt', icon: 'fas fa-ice-cream', color: '#f3e5f5' },
    { name: 'Butter', icon: 'fas fa-cookie-bite', color: '#e8f5e8' },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section mb-5" style={{
        background: 'linear-gradient(135deg, #2c5f2d 0%, #97bc62 100%)',
        borderRadius: '15px',
        padding: '4rem 2rem',
        color: 'white',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={8} className="mx-auto">
              <h1 className="display-4 fw-bold mb-3">
                Fresh Dairy Products Delivered Daily
              </h1>
              <p className="lead mb-4">
                Farm-fresh milk, cheese, yogurt, and more delivered right to your doorstep. 
                Quality you can taste, freshness you can trust.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Button 
                  variant="light" 
                  size="lg" 
                  onClick={() => navigate('/products')}
                  className="px-4"
                >
                  <i className="fas fa-shopping-bag me-2"></i>
                  Shop Now
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg"
                  onClick={() => navigate('/about')}
                  className="px-4"
                >
                  Learn More
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Categories Section */}
      <Container className="mb-5">
        <h2 className="text-center mb-4" style={{ color: '#2c5f2d', fontWeight: '600' }}>
          Shop by Category
        </h2>
        <Row>
          {categories.map((category, index) => (
            <Col key={index} md={3} sm={6} className="mb-3">
              <Card 
                className="text-center h-100 border-0 category-card"
                style={{ 
                  backgroundColor: category.color,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
              >
                <Card.Body className="py-4">
                  <i 
                    className={`${category.icon} fa-3x mb-3`}
                    style={{ color: '#2c5f2d' }}
                  ></i>
                  <Card.Title style={{ color: '#2c5f2d', fontWeight: '600' }}>
                    {category.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Products Section */}
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ color: '#2c5f2d', fontWeight: '600' }}>
            <i className="fas fa-star me-2" style={{ color: '#f4a261' }}></i>
            Featured Products
          </h2>
          <Button 
            variant="outline-primary" 
            onClick={() => navigate('/products')}
          >
            View All Products <i className="fas fa-arrow-right ms-2"></i>
          </Button>
        </div>
        
        {loading ? (
          <div className="text-center py-5">
            <Loader />
          </div>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {productArray && productArray.slice(0, 8).map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Features Section */}
      <Container className="my-5 py-5" style={{ backgroundColor: '#f8f9fa', borderRadius: '15px' }}>
        <h2 className="text-center mb-5" style={{ color: '#2c5f2d', fontWeight: '600' }}>
          Why Choose Dairy Ekart?
        </h2>
        <Row>
          <Col md={4} className="text-center mb-4">
            <div className="feature-icon mb-3">
              <i className="fas fa-truck fa-3x" style={{ color: '#2c5f2d' }}></i>
            </div>
            <h4 style={{ color: '#2c5f2d' }}>Fast Delivery</h4>
            <p className="text-muted">
              Same-day delivery for orders placed before 2 PM. Fresh products at your doorstep.
            </p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="feature-icon mb-3">
              <i className="fas fa-leaf fa-3x" style={{ color: '#97bc62' }}></i>
            </div>
            <h4 style={{ color: '#2c5f2d' }}>100% Organic</h4>
            <p className="text-muted">
              All our products are sourced from certified organic farms with no harmful chemicals.
            </p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="feature-icon mb-3">
              <i className="fas fa-shield-alt fa-3x" style={{ color: '#f4a261' }}></i>
            </div>
            <h4 style={{ color: '#2c5f2d' }}>Quality Guaranteed</h4>
            <p className="text-muted">
              100% satisfaction guarantee. If you're not happy, we'll make it right.
            </p>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .hero-section {
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="white" opacity="0.1"><polygon points="1000,100 1000,0 200,100"/></svg>');
          background-repeat: no-repeat;
          background-size: cover;
        }
      `}</style>
    </>
  );
};

export default HomeScreen;
