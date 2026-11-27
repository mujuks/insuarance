import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import HowItWorks from "./pages/HowItWorks";
import Quote from "./pages/Quote";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Terms from "./pages/Terms";
import About from "./pages/About";
import Claims from "./pages/Claims";
import Contact from "./pages/Contact";

function ScrollTop(): null {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App(): React.JSX.Element {
  return (
    <>
      <ScrollTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}
