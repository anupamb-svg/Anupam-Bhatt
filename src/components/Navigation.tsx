import { Link, useLocation } from "react-router-dom";
import { Moon, Star, PenTool, LayoutGrid, Menu, X, BookOpen, MessageSquare } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

const navItems = [
  { name: "Kundli", path: "/kundli", icon: Star },
  { name: "Hastrekha", path: "/palmistry", icon: PenTool },
  { name: "Numerology", path: "/numerology", icon: LayoutGrid },
  { name: "Blog", path: "/blog", icon: BookOpen },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-border-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-accent-earth rounded-full flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:scale-105">
              AB
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-800 uppercase">
              AB <span className="text-accent-orange">Kundli</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent-orange flex items-center gap-2 px-3 py-2 rounded-lg",
                  location.pathname === item.path ? "text-accent-orange border-b-2 border-accent-orange rounded-none" : "text-gray-600"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
            <Link
              to="/kundli"
              className="px-6 py-2.5 bg-accent-orange text-white text-sm font-semibold rounded-full hover:opacity-90 shadow-lg shadow-orange-900/20 transition-all active:scale-95"
            >
              AI परामर्श
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-gray-800" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-border-soft p-4 space-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-4 text-gray-600 hover:bg-stone-50 rounded-xl transition-colors"
              >
                <item.icon className="w-5 h-5 text-accent-orange" />
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-white border-t border-border-soft pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-accent-earth rounded-full flex items-center justify-center text-white font-bold text-xl">AB</div>
              <span className="text-2xl font-bold text-gray-800 uppercase">
                AB <span className="text-accent-orange">Kundli</span>
              </span>
            </div>
            <p className="text-gray-500 max-w-md leading-relaxed">
              Synthesizing millenia of Vedic wisdom with contemporary artificial intelligence. 
              Our mission is to provide accurate, deep-researched astrological guidance for the digital age.
            </p>
          </div>
          <div>
            <h4 className="text-gray-800 font-bold mb-6">परखें</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link to="/kundli" className="hover:text-accent-orange transition-colors">पाराशर कुंडली</Link></li>
              <li><Link to="/palmistry" className="hover:text-accent-orange transition-colors">हस्तरेखा</Link></li>
              <li><Link to="/numerology" className="hover:text-accent-orange transition-colors">अंकशास्त्र</Link></li>
              <li><Link to="/blog" className="hover:text-accent-orange transition-colors">ब्लॉग</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-800 font-bold mb-6">सहायता</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-accent-orange transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent-orange transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent-orange transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-border-soft flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2026 AB Kundli. All rights reserved. Certified by Parashar Research Lab.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent-orange transition-colors tracking-widest uppercase">Instagram</a>
            <a href="#" className="hover:text-accent-orange transition-colors tracking-widest uppercase">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
