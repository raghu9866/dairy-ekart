
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#2c5f2d', 
      color: 'white',
      marginTop: '5rem'
    }}>
      <Container>
        <Row className="py-5">
          {/* Company Info */}
          <Col lg={4} md={6} className="mb-4">
            <h5 className="mb-3" style={{ color: '#97bc62', fontWeight: '600' }}>
              <i className="fas fa-leaf me-2"></i>
              Dairy Ekart
            </h5>
            <p className="mb-3" style={{ color: '#cbd5d0' }}>
              Fresh dairy products delivered daily from local farms to your doorstep. 
              Quality you can taste, freshness you can trust.
            </p>
            <div className="d-flex gap-3">
              <Button 
                variant="outline-light" 
                size="sm" 
                className="rounded-circle p-2"
                style={{ width: '40px', height: '40px' }}
              >
                <i className="fab fa-facebook-f"></i>
              </Button>
              <Button 
                variant="outline-light" 
                size="sm" 
                className="rounded-circle p-2"
                style={{ width: '40px', height: '40px' }}
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <Button 
                variant="outline-light" 
                size="sm" 
                className="rounded-circle p-2"
                style={{ width: '40px', height: '40px' }}
              >
                <i className="fab fa-instagram"></i>
              </Button>
              <Button 
                variant="outline-light" 
                size="sm" 
                className="rounded-circle p-2"
                style={{ width: '40px', height: '40px' }}
              >
                <i className="fab fa-linkedin-in"></i>
              </Button>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="mb-3" style={{ color: '#97bc62', fontWeight: '600' }}>Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none" style={{ color: '#cbd5d0' }}>
                  <i className="fas fa-home me-2"></i>Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="text-decoration-none" style={{ color: '#cbd5d0' }}>
                  <i className="fas fa-shopping-bag me-2"></i>Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-decoration-none" style={{ color: '#cbd5d0' }}>
                  <i className="fas fa-info-circle me-2"></i>About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-decoration-none" style={{ color: '#cbd5d0' }}>
                  <i className="fas fa-envelope me-2"></i>Contact
                </Link>
              </li>
            </ul>
          </Col>

          {/* Categories */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="mb-3" style={{ color: '#97bc62', fontWeight: '600' }}>Categories</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/category/milk" className="text-decoration-none" style={{ color: '#cbd5d0' }}>
                  <i className="fas fa-glass-whiskey me-2"></i>Fresh Milk
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/category/cheese" className="text-decoration-none" style={{ color: '#cbd5d0' }}>
                  <i className="fas fa-cheese me-2"></i>Cheese
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/category/yogurt" className="text-decoration-none" style={{ color: '#cbd5d0' }}>
                  <i className="fas fa-ice-cream me-2"></i>Yogurt
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/category/butter" className="text-decoration-none" style={{ color: '#cbd5d0' }}>
                  <i className="fas fa-cookie-bite me-2"></i>Butter
                </Link>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col lg={4} md={6} className="mb-4">
            <h6 className="mb-3" style={{ color: '#97bc62', fontWeight: '600' }}>Contact Info</h6>
            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <i className="fas fa-map-marker-alt me-3" style={{ color: '#97bc62' }}></i>
                <span style={{ color: '#cbd5d0' }}>123 Farm Road, Green Valley, City 12345</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <i className="fas fa-phone me-3" style={{ color: '#97bc62' }}></i>
                <span style={{ color: '#cbd5d0' }}>+1 (555) 123-4567</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <i className="fas fa-envelope me-3" style={{ color: '#97bc62' }}></i>
                <span style={{ color: '#cbd5d0' }}>info@dairyekart.com</span>
              </div>
              <div className="d-flex align-items-center">
                <i className="fas fa-clock me-3" style={{ color: '#97bc62' }}></i>
                <span style={{ color: '#cbd5d0' }}>Mon - Sat: 6:00 AM - 8:00 PM</span>
              </div>
            </div>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <Row className="border-top pt-4 pb-3" style={{ borderColor: '#4a7c59 !important' }}>
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0" style={{ color: '#cbd5d0', fontSize: '0.9rem' }}>
              &copy; {new Date().getFullYear()} Dairy Ekart. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <Link to="/privacy" className="text-decoration-none" style={{ color: '#cbd5d0', fontSize: '0.9rem' }}>
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-decoration-none" style={{ color: '#cbd5d0', fontSize: '0.9rem' }}>
                Terms of Service
              </Link>
              <Link to="/faq" className="text-decoration-none" style={{ color: '#cbd5d0', fontSize: '0.9rem' }}>
                FAQ
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
