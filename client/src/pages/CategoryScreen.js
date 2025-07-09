import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Button, Breadcrumb, Form, Pagination, Badge } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getProductsByCategory } from '../actions/productActions';
import { useNavigate, useParams, Link } from 'react-router-dom';

const CategoryScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category } = useParams();

  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [inStockOnly, setInStockOnly] = useState(false);

  const productCategory = useSelector((state) => state.productCategory);
  const { loading, error, products = [], pagination = {}, total = 0 } = productCategory;

  useEffect(() => {
    if (category) {
      const params = {
        page: currentPage,
        limit: 12,
        sortBy,
        ...(priceRange.min && { minPrice: priceRange.min }),
        ...(priceRange.max && { maxPrice: priceRange.max }),
        ...(inStockOnly && { inStock: true })
      };

      dispatch(getProductsByCategory(category, params));
    }
  }, [dispatch, category, currentPage, sortBy, priceRange, inStockOnly]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleClearFilters = () => {
    setSortBy('name');
    setPriceRange({ min: '', max: '' });
    setInStockOnly(false);
    setCurrentPage(1);
  };

  const totalPages = pagination.pages || Math.ceil(total / 12) || 1;

  // Get category display name
  const getCategoryDisplayName = (cat) => {
    const categoryMap = {
      'milk': 'Fresh Milk',
      'cheese': 'Cheese',
      'yogurt': 'Yogurt', 
      'butter': 'Butter',
      'ghee': 'Ghee',
      'honey': 'Honey'
    };
    return categoryMap[cat.toLowerCase()] || cat;
  };

  const getCategoryIcon = (cat) => {
    const iconMap = {
      'milk': 'fas fa-glass-whiskey',
      'cheese': 'fas fa-cheese',
      'yogurt': 'fas fa-ice-cream',
      'butter': 'fas fa-cookie-bite',
      'ghee': 'fas fa-jar',
      'honey': 'fas fa-honeypot'
    };
    return iconMap[cat.toLowerCase()] || 'fas fa-box';
  };

  const getCategoryDescription = (cat) => {
    const descMap = {
      'milk': 'Fresh, pure milk products rich in calcium and nutrients',
      'cheese': 'Artisanal cheeses made from the finest milk',
      'yogurt': 'Creamy, probiotic-rich yogurt for a healthy lifestyle',
      'butter': 'Premium butter made from fresh cream',
      'ghee': 'Pure, organic ghee with rich flavor and nutrition',
      'honey': 'Natural, organic honey straight from the hive'
    };
    return descMap[cat.toLowerCase()] || 'Quality dairy products for your family';
  };

  if (!category) {
    navigate('/products');
    return null;
  }

  return (
    <Container>
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item as={Link} to="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item as={Link} to="/products">Products</Breadcrumb.Item>
        <Breadcrumb.Item active>{getCategoryDisplayName(category)}</Breadcrumb.Item>
      </Breadcrumb>

      {/* Category Header */}
      <div className="mb-5 text-center">
        <div className="mb-3">
          <i 
            className={`${getCategoryIcon(category)} fa-4x`}
            style={{ color: '#2c5f2d' }}
          ></i>
        </div>
        <h1 className="display-4 fw-bold mb-3" style={{ color: '#2c5f2d' }}>
          {getCategoryDisplayName(category)}
        </h1>
        <p className="lead text-muted mb-4">
          {getCategoryDescription(category)}
        </p>
        <Button 
          variant="outline-primary" 
          onClick={() => navigate('/products')}
          className="me-2"
        >
          <i className="fas fa-th-large me-2"></i>
          View All Products
        </Button>
        <Button 
          variant="primary"
          onClick={() => navigate('/')}
        >
          <i className="fas fa-home me-2"></i>
          Back to Home
        </Button>
      </div>

      {/* Filters and Sorting */}
      <Row className="mb-4">
        <Col md={6}>
          <div className="d-flex gap-2">
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ flex: 1 }}
            >
              <option value="name">Sort by Name</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="-rating">Highest Rated</option>
              <option value="-createdAt">Newest First</option>
            </Form.Select>
          </div>
        </Col>
        <Col md={6}>
          <div className="d-flex gap-2">
            <Form.Control
              type="number"
              placeholder="Min Price"
              value={priceRange.min}
              onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
              style={{ flex: 1 }}
            />
            <Form.Control
              type="number"
              placeholder="Max Price"
              value={priceRange.max}
              onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
              style={{ flex: 1 }}
            />
            <Button variant="outline-secondary" onClick={handleClearFilters}>
              <i className="fas fa-times"></i>
            </Button>
          </div>
        </Col>
      </Row>

      {/* Active Filters */}
      {(priceRange.min || priceRange.max || inStockOnly) && (
        <div className="mb-3">
          <small className="text-muted me-2">Active filters:</small>
          {priceRange.min && <Badge bg="warning" className="me-2">Min Price: ${priceRange.min}</Badge>}
          {priceRange.max && <Badge bg="warning" className="me-2">Max Price: ${priceRange.max}</Badge>}
          {inStockOnly && <Badge bg="success" className="me-2">In Stock</Badge>}
        </div>
      )}

      {/* Products Section */}
      {loading ? (
        <div className="text-center py-5">
          <Loader size="lg" text={`Loading ${getCategoryDisplayName(category).toLowerCase()}...`} />
        </div>
      ) : error ? (
        <Message variant="danger" dismissible>{error}</Message>
      ) : products.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">No products found in this category</h4>
          <p className="text-muted">
            We're working to add more {getCategoryDisplayName(category).toLowerCase()} products soon!
          </p>
          <Button 
            variant="primary" 
            onClick={() => navigate('/products')}
          >
            Browse All Products
          </Button>
        </div>
      ) : (
        <>
          {/* Results Count */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 style={{ color: '#2c5f2d' }}>
              {products.length} Product{products.length !== 1 ? 's' : ''} Found
            </h3>
            <small className="text-muted">
              {total} total {getCategoryDisplayName(category).toLowerCase()} products
              {pagination.currentPage && ` (Page ${pagination.currentPage} of ${totalPages})`}
            </small>
          </div>

          {/* Products Grid */}
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                <Product product={product} />
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.First 
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Prev 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 2 && page <= currentPage + 2)
                  ) {
                    return (
                      <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Pagination.Item>
                    );
                  } else if (page === currentPage - 3 || page === currentPage + 3) {
                    return <Pagination.Ellipsis key={page} />;
                  }
                  return null;
                })}
                
                <Pagination.Next 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last 
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}

          {/* Related Categories */}
          <div className="mt-5 p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '15px' }}>
            <h4 className="mb-3" style={{ color: '#2c5f2d' }}>
              Explore Other Categories
            </h4>
            <Row>
              {['milk', 'cheese', 'yogurt', 'butter', 'ghee', 'honey']
                .filter(cat => cat !== category.toLowerCase())
                .slice(0, 4)
                .map(cat => (
                <Col key={cat} md={3} sm={6} className="mb-3">
                  <Button
                    variant="outline-primary"
                    className="w-100 h-100 d-flex flex-column align-items-center p-3"
                    onClick={() => navigate(`/category/${cat}`)}
                    style={{ minHeight: '100px' }}
                  >
                    <i className={`${getCategoryIcon(cat)} fa-2x mb-2`}></i>
                    <span>{getCategoryDisplayName(cat)}</span>
                  </Button>
                </Col>
              ))}
            </Row>
          </div>
        </>
      )}
    </Container>
  );
};

export default CategoryScreen;
