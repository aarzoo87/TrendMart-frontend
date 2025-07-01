import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/homepage";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import CustomerHeaderMenu from "./pages/customer_pages/CustomerHeaderMenu";
import SellerHeaderMenu from "./pages/seller_pages/SellerHeaderMenu";
import SellerDashboard from "./pages/seller_pages/SellerDashboard";
import SellerProducts from "./pages/seller_pages/SellerProducts";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/customer/home" element={<CustomerHeaderMenu />} />
          <Route path="/seller/home" element={<SellerHeaderMenu />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/products" element={<SellerProducts />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
