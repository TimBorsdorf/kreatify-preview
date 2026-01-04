// src/App.jsx (nur der relevante Teil)
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppFloating from "./components/WhatsAppFloating.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import Home from "./pages/Home.jsx";
import Targetgroups from "./pages/Targetgroups.jsx";
import Category from "./pages/Category.jsx";
import Packages from "./pages/Packages.jsx";
import Inquiry from "./pages/Inquiry.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <ScrollToTop />
      <Navbar />

      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/zielgruppen" element={<Targetgroups />} />
          <Route path="/zielgruppen/:slug" element={<Category />} />
          <Route path="/pakete" element={<Packages />} />
          <Route path="/anfrage" element={<Inquiry />} />
          <Route path="/kontakt" element={<Navigate to="/anfrage" replace />} />
          <Route path="/ueber-uns" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <WhatsAppFloating />
    </div>
  );
}
