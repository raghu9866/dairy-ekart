import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Form, InputGroup, Button, Pagination, Badge } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts, searchProducts } from '../actions/productActions';
import { useNavigate, useParams } from 'react-router-dom';

const ProductsScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { keyword } = useParams();
  
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState(keyword || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [inStockOnly, setInStockOnly] = useState(false);

  const productList = useSelector((state) => state.productList);
  const productSearch = useSelector((state) => state.productSearch);
  
  // Use search results if we have a keyword, otherwise use regular product list
  const isSearchMode = !!keyword;
  const currentState = isSearchMode ? productSearch : productList;
  const { loading, error, products = [], pagination = {}, total = 0, categories = [] } = currentState;

  useEffect(() => {
    const params = {
      page: currentPage,
      limit: 12,
      sortBy,
      ...(filterCategory && { category: filterCategory }),
      ...(priceRange.min && { minPrice: priceRange.min }),
      ...(priceRange.max && { maxPrice: priceRange.max }),
      ...(inStockOnly && { inStock: true })
    };

    if (keyword) {
      dispatch(searchProducts(keyword, params));
    } else {
      dispatch(listProducts(params));
    }
  }, [dispatch, keyword, currentPage, sortBy, filterCategory, priceRange, inStockOnly]);

  // Get available categories from products or from the categories array
  const availableCategories = categories.length > 0 
    ? categories 
    : products ? [...new Set(products.map(p => p.category))] : [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    } else {
      navigate('/products');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleClearFilters = () => {
    setSortBy('name');
    setFilterCategory('');
    setSearchTerm('');
    setPriceRange({ min: '', max: '' });
    setInStockOnly(false);
    setCurrentPage(1);
    navigate('/products');
  };

  const totalPages = pagination.pages || Math.ceil(total / 12) || 1;

  return (
    <Container>
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="display-5 fw-bold" style={{ color: '#2c5f2d' }}>
          <i className="fas fa-shopping-bag me-3"></i>
          {isSearchMode ? `Search Results for "${keyword}"` : 'All Products'}
        </h1>
        <p className="lead text-muted">
          {isSearchMode 
            ? `Found ${total} products matching your search`
            : 'Discover our complete range of fresh dairy products'
          }
        </p>
      </div>

      {/* Search and Filters */}
      <Row className="mb-4">
        <Col md={6}>
          <Form onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="primary" type="submit">
                <i className="fas fa-search"></i>
              </Button>
            </InputGroup>
          </Form>
        </Col>
        <Col md={6}>
          <div className="d-flex gap-2">
            <Form.Select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{ flex: 1 }}
            >
              <option value="">All Categories</option>
              {availableCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
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
      </Row>

      {/* Advanced Filters */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Label>Price Range</Form.Label>
          <div className="d-flex gap-2">
            <Form.Control
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
            />
            <Form.Control
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
            />
          </div>
        </Col>
        <Col md={4} className="d-flex align-items-end">
          <Form.Check
            type="checkbox"
            label="In Stock Only"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
        </Col>
        <Col md={4} className="d-flex align-items-end">
          <Button variant="outline-secondary" onClick={handleClearFilters}>
            <i className="fas fa-times me-2"></i>
            Clear Filters
          </Button>
        </Col>
      </Row>

      {/* Active Filters */}
      {(filterCategory || priceRange.min || priceRange.max || inStockOnly || keyword) && (
        <div className="mb-3">
          <small className="text-muted me-2">Active filters:</small>
          {keyword && <Badge bg="primary" className="me-2">Search: {keyword}</Badge>}
          {filterCategory && <Badge bg="info" className="me-2">Category: {filterCategory}</Badge>}
          {priceRange.min && <Badge bg="warning" className="me-2">Min Price: ${priceRange.min}</Badge>}
          {priceRange.max && <Badge bg="warning" className="me-2">Max Price: ${priceRange.max}</Badge>}
          {inStockOnly && <Badge bg="success" className="me-2">In Stock</Badge>}
        </div>
      )}

      {/* Results Info */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <small className="text-muted">
          Showing {products.length} of {total} products
          {pagination.currentPage && ` (Page ${pagination.currentPage} of ${totalPages})`}
        </small>
        {pagination.currentPage && totalPages > 1 && (
          <small className="text-muted">
            Page {pagination.currentPage} of {totalPages}
          </small>
        )}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-5">
          <Loader size="lg" text="Loading products..." />
        </div>
      ) : error ? (
        <Message variant="danger" dismissible>{error}</Message>
      ) : products.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-search fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">No products found</h4>
          <p className="text-muted">
            Try adjusting your search or filter criteria
          </p>
          <Button 
            variant="primary" 
            onClick={handleClearFilters}
          >
            Show All Products
          </Button>
        </div>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}

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
    </Container>
  );
};

export default ProductsScreen;
