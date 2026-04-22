import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar, Footer } from "./components/Navigation";
import { Home } from "./pages/Home";
import { Kundli } from "./pages/Kundli";
import { Palmistry } from "./pages/Palmistry";
import { Numerology } from "./pages/Numerology";
import { Blog } from "./pages/Blog";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kundli" element={<Kundli />} />
            <Route path="/palmistry" element={<Palmistry />} />
            <Route path="/numerology" element={<Numerology />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

