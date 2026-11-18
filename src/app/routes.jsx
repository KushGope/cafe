import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import ScrollToTop from "../components/layout/ScrollToTop";

// Public pages
import Hero from "../features/home/Hero";
import About from "../features/about/About";
import Contact from "../features/contact/Contact";

// Authentication pages
import Userlogin from "../auth/pages/Userlogin";
import UserSignup from "../auth/pages/UserSignup";
import Adminlogin from "../admin/Adminlogin";
import HomeGate from "../features/home/HomeGate";

// Authentication protection
import ProtectedRoute from "../auth/ProtectedRoute";

// Customer features
import Menu from "../features/menu/Menu";
import Cart from "../features/cart/Cart";
import Order from "../features/orders/Order";

// Admin pages
import Admin from "../admin/Admin";

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* ADMIN LOGIN - ALWAYS ACCESSIBLE */}
        <Route path="/adminlogin" element={<Adminlogin />} />

        {/* CUSTOMER AUTHENTICATION */}
        <Route path="/login" element={<Userlogin />} />
        <Route path="/signup" element={<UserSignup />} />

        {/* ================= PUBLIC ROUTES ================= */}
        <Route element={<HomeGate />}>
          <Route path="/" element={<Hero />} />
          <Route path="/home" element={<Hero />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Customer pages - backend handles authorization */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<Admin />} />
          {/* <Route path="/closed" element={<ShopClosed />} /> */}
        </Route>
        {/* ================= FALLBACK ROUTE ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
