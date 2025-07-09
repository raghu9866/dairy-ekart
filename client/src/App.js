
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductScreen';
import ProductsScreen from './pages/ProductsScreen';
import CategoryScreen from './pages/CategoryScreen';
import SearchScreen from './pages/SearchScreen';
import CartScreen from './pages/CartScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ProfileScreen from './pages/ProfileScreen';
import ShippingScreen from './pages/ShippingScreen';
import PaymentScreen from './pages/PaymentScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen';
import OrderScreen from './pages/OrderScreen';
import UserListScreen from './pages/UserListScreen';
import UserEditScreen from './pages/UserEditScreen';
import ProductListScreen from './pages/ProductListScreen';
import ProductEditScreen from './pages/ProductEditScreen';
import OrderListScreen from './pages/OrderListScreen';

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1" style={{ backgroundColor: '#f8f9fa' }}>
          <div style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <Container>
              <Routes>
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/shipping" element={<ShippingScreen />} />
                <Route path="/payment" element={<PaymentScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route path="/order/:id" element={<OrderScreen />} />
                <Route path="/admin/userlist" element={<UserListScreen />} />
                <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
                <Route path="/admin/productlist" element={<ProductListScreen />} />
                <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
                <Route path="/admin/orderlist" element={<OrderListScreen />} />
                <Route path="/product/:id" element={<ProductScreen />} />
                <Route path="/products" element={<ProductsScreen />} />
                <Route path="/search/:keyword" element={<SearchScreen />} />
                <Route path="/category/:category" element={<CategoryScreen />} />
                <Route path="/cart/:id?" element={<CartScreen />} />
                <Route path="/" element={<HomeScreen />} exact />
              </Routes>
            </Container>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
