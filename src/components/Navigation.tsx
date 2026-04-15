import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Zap, User as UserIcon, Shield } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Consulting", path: "/online-consulting" },
  { name: "Estimator", path: "/estimator" },
  { name: "Market", path: "/shop" },
  { name: "Tutorials", path: "/tutorials" },
  { name: "Services", path: "/services" },
  { name: "Pros", path: "/pros" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAdmin, login, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-4" : "bg-transparent py-8"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic text-white">ACDC <span className="text-orange-500">PROS</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 hover:text-orange-500 ${
                location.pathname === link.path ? "text-orange-500" : "text-white/40"
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 border-l border-white/10 pl-8">
            {user ? (
              <div className="flex items-center gap-4">
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-orange-500 hover:text-white transition-colors"
                  >
                    <Shield className="w-3 h-3" /> Admin
                  </Link>
                )}
                <button 
                  onClick={logout}
                  className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={login}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
              >
                <UserIcon className="w-3 h-3" /> Login
              </button>
            )}
            
            <Link to="/emergency" className="px-6 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-500 italic">
              Emergency 24/7
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-white"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black border-b border-white/10 p-8 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-2xl font-black uppercase italic tracking-tighter ${
                    location.pathname === link.path ? "text-orange-500" : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" className="text-2xl font-black uppercase italic tracking-tighter text-orange-500">
                      Admin Dashboard
                    </Link>
                  )}
                  <button onClick={logout} className="text-left text-2xl font-black uppercase italic tracking-tighter text-white/40">
                    Logout
                  </button>
                </>
              ) : (
                <button onClick={login} className="text-left text-2xl font-black uppercase italic tracking-tighter text-white">
                  Login
                </button>
              )}

              <Link to="/emergency" className="w-full py-4 bg-orange-500 text-white font-bold uppercase tracking-widest text-xs text-center italic">
                Emergency 24/7
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
