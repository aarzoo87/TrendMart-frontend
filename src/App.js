import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/homepage";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import CustomerHeaderMenu from "./pages/customer_pages/CustomerHeaderMenu";
import SellerHeaderMenu from "./pages/seller_pages/SellerHeaderMenu";
import SellerDashboard from "./pages/seller_pages/SellerDashboard";
import SellerProducts from "./pages/seller_pages/SellerProducts";
import CustomerProduct from "./pages/customer_pages/CustomerProduct";
import ProductDetailPage from "./pages/customer_pages/ProductDetailPage";
import CustomerCart from "./pages/customer_pages/CustomerCart";
import CustomerCheckout from "./pages/customer_pages/CustomerCheckout";
import SellerOrders from "./pages/seller_pages/SellerOrders";
import SellerSales from "./pages/seller_pages/SellerSales";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/customer/home" element={<CustomerHeaderMenu />} />
          <Route path="/customer/products" element={<CustomerProduct />} />
          <Route path="/customer/cart" element={<CustomerCart />} />
          <Route path="/customer/checkout" element={<CustomerCheckout />} />
          <Route path="/product/:product_id" element={<ProductDetailPage />} />
          <Route path="/seller/home" element={<SellerHeaderMenu />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/products" element={<SellerProducts />} />
          <Route path="/seller/orders" element={<SellerOrders />} />
          <Route path="/seller/sales" element={<SellerSales />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
