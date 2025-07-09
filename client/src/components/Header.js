import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Badge, Form, FormControl, Button } from 'react-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/search/${searchKeyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header>
      <Navbar bg="success" variant="dark" expand="lg" collapseOnSelect className="py-3" style={{ backgroundColor: '#2c5f2d !important' }}>
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <i className="fas fa-leaf me-2" style={{ color: '#97bc62' }}></i>
            <span style={{ fontWeight: '700', fontSize: '1.5rem' }}>Dairy Ekart</span>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Search Bar */}
            <Form className="d-flex mx-auto" style={{ width: '400px' }} onSubmit={searchHandler}>
              <FormControl
                type="search"
                placeholder="Search for dairy products..."
                className="me-2"
                aria-label="Search"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                style={{ borderRadius: '20px' }}
              />
              <Button variant="outline-light" type="submit" style={{ borderRadius: '20px' }}>
                <i className="fas fa-search"></i>
              </Button>
            </Form>

            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart" className="d-flex align-items-center position-relative me-3">
                <i className="fas fa-shopping-cart me-1"></i>
                <span>Cart</span>
                {cartItems.length > 0 && (
                  <Badge 
                    bg="warning" 
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: '0.7rem' }}
                  >
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
              
              {userInfo ? (
                <NavDropdown title={
                  <span className="d-flex align-items-center">
                    <i className="fas fa-user-circle me-2"></i>
                    {userInfo.name}
                  </span>
                } id="username" className="me-2">
                  <NavDropdown.Item as={Link} to="/profile">
                    <i className="fas fa-user me-2"></i>Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/orders">
                    <i className="fas fa-list me-2"></i>My Orders
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login" className="d-flex align-items-center">
                  <i className="fas fa-sign-in-alt me-1"></i>
                  <span>Sign In</span>
                </Nav.Link>
              )}
              
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={
                  <span className="d-flex align-items-center">
                    <i className="fas fa-cog me-2"></i>
                    Admin
                  </span>
                } id="adminmenu">
                  <NavDropdown.Item as={Link} to="/admin/userlist">
                    <i className="fas fa-users me-2"></i>Users
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/productlist">
                    <i className="fas fa-box me-2"></i>Products
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/orderlist">
                    <i className="fas fa-clipboard-list me-2"></i>Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;