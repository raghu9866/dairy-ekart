
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Row, 
  Col, 
  Image, 
  ListGroup, 
  Card, 
  Button, 
  Form, 
  Badge,
  Container,
  Breadcrumb
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails } from '../actions/productActions';
import { useNavigate, useParams } from 'react-router-dom';

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <Container>
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          <i className="fas fa-home me-2"></i>Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      {loading ? (
        <Loader text="Loading product details..." />
      ) : error ? (
        <Message variant="danger" dismissible>{error}</Message>
      ) : (
        <Row className="g-4">
          {/* Product Image */}
          <Col lg={6}>
            <Card className="border-0 shadow-sm">
              <div className="position-relative">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fluid 
                  className="rounded"
                  style={{ 
                    width: '100%', 
                    height: '500px', 
                    objectFit: 'cover'
                  }}
                />
                {product.countInStock === 0 && (
                  <Badge 
                    bg="danger" 
                    className="position-absolute top-0 end-0 m-3"
                    style={{ fontSize: '0.9rem' }}
                  >
                    Out of Stock
                  </Badge>
                )}
              </div>
            </Card>
          </Col>

          {/* Product Details */}
          <Col lg={6}>
            <Row className="h-100">
              {/* Product Info */}
              <Col lg={7} className="mb-4">
                <Card className="border-0 h-100">
                  <Card.Body>
                    <h1 className="h3 mb-3" style={{ color: '#2c5f2d', fontWeight: '600' }}>
                      {product.name}
                    </h1>
                    
                    <div className="mb-3">
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                        size="1.1rem"
                      />
                    </div>

                    <div className="mb-4">
                      <h3 style={{ color: '#2c5f2d', fontWeight: '700' }}>
                        ₹{product.price}
                      </h3>
                    </div>

                    <div className="mb-4">
                      <h6 className="text-muted mb-2">Description:</h6>
                      <p className="text-muted" style={{ lineHeight: '1.6' }}>
                        {product.description}
                      </p>
                    </div>

                    {product.brand && (
                      <div className="mb-3">
                        <strong className="text-muted">Brand: </strong>
                        <span className="text-dark">{product.brand}</span>
                      </div>
                    )}

                    {product.category && (
                      <div className="mb-3">
                        <strong className="text-muted">Category: </strong>
                        <Badge 
                          bg="light" 
                          text="dark" 
                          className="ms-2"
                          style={{ fontSize: '0.8rem' }}
                        >
                          {product.category}
                        </Badge>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>

              {/* Purchase Card */}
              <Col lg={5}>
                <Card className="shadow-sm sticky-top" style={{ top: '2rem' }}>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="px-0 py-3">
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            <strong style={{ color: '#2c5f2d', fontSize: '1.2rem' }}>
                              ₹{product.price}
                            </strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item className="px-0 py-3">
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {product.countInStock > 0 ? (
                              <Badge bg="success" className="px-3 py-2">
                                <i className="fas fa-check me-2"></i>
                                In Stock ({product.countInStock} available)
                              </Badge>
                            ) : (
                              <Badge bg="danger" className="px-3 py-2">
                                <i className="fas fa-times me-2"></i>
                                Out Of Stock
                              </Badge>
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {product.countInStock > 0 && (
                        <ListGroup.Item className="px-0 py-3">
                          <Row className="align-items-center">
                            <Col xs={4}>Qty:</Col>
                            <Col>
                              <Form.Select
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                                style={{ borderRadius: '8px' }}
                              >
                                {[...Array(Math.min(product.countInStock, 10)).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </Form.Select>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}

                      <ListGroup.Item className="px-0 pt-3 border-0">
                        <Button
                          onClick={addToCartHandler}
                          disabled={product.countInStock === 0}
                          variant="primary"
                          size="lg"
                          className="w-100 py-3"
                          style={{
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '1rem'
                          }}
                        >
                          <i className="fas fa-shopping-cart me-2"></i>
                          {product.countInStock === 0 ? 'Out of Stock' : 'Add To Cart'}
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductScreen;
