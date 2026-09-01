import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  Menu,
  X,
  Sparkles,
  Award,
  Compass,
  MapPin,
} from 'lucide-react';

interface HeaderProps {
  onOpenQuote: () => void;
  onSelectSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote, onSelectSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    onSelectSection(id);
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      return;
    }
    onSelectSection('hero');
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-neutral-900 border-b border-neutral-800 text-xs text-neutral-300 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 text-amber-400 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Compare & Connect with Local Steel Fencing Installers</span>
            </div>
            <div className="flex items-center space-x-1 text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Built for Canadian Winters</span>
            </div>
            <div className="flex items-center space-x-1 text-neutral-400">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>ASTM A653 Galvalume® Steel</span>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <button
              onClick={onOpenQuote}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center space-x-1"
            >
              <span>Get a Free Quote</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/80 shadow-xl'
            : 'bg-neutral-950 border-b border-neutral-800/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div
              onClick={handleLogoClick}
              className="cursor-pointer flex items-center space-x-3 group"
            >
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all">
                <div className="w-full h-full bg-neutral-950 rounded-[6px] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {/* Custom Stylized Steel I-Beam with Maple Leaf */}
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-amber-400 font-black text-xs tracking-tighter">🇨🇦</span>
                    <span className="text-[9px] font-black tracking-widest text-white -mt-0.5">STEEL</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-white font-['Space_Grotesk']">
                    STEEL<span className="text-amber-400">FENCING</span><span className="text-neutral-400 text-sm font-normal">.CA</span>
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                  Architectural & Security Metalwork Canada
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-5 text-sm font-medium text-neutral-300">
              <button
                onClick={() => handleNavClick('visualizer')}
                className="flex items-center space-x-1.5 text-amber-400 hover:text-amber-300 transition-colors py-1 px-2.5 rounded-full bg-amber-500/10 border border-amber-500/30"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>3D Visualizer</span>
              </button>

              <button
                onClick={() => handleNavClick('site-planner')}
                className="flex items-center space-x-1 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Site Planner</span>
              </button>

              <button
                onClick={() => handleNavClick('calculator')}
                className="text-neutral-300 hover:text-amber-400 transition-colors"
              >
                Cost Calculator
              </button>

              <button
                onClick={() => handleNavClick('products')}
                className="hover:text-white transition-colors"
              >
                Fencing Systems
              </button>

              <button
                onClick={() => handleNavClick('climate')}
                className="hover:text-white transition-colors flex items-center space-x-1"
              >
                <span>Canadian Climate Tech</span>
              </button>

              <button
                onClick={() => handleNavClick('comparison')}
                className="hover:text-white transition-colors"
              >
                Steel vs Wood/Vinyl
              </button>

              <button
                onClick={() => handleNavClick('gates')}
                className="hover:text-white transition-colors"
              >
                Automated Gates
              </button>

              <button
                onClick={() => handleNavClick('gallery')}
                className="hover:text-white transition-colors"
              >
                Gallery
              </button>

              <button
                onClick={() => handleNavClick('commercial')}
                className="hover:text-white transition-colors text-neutral-400 hover:text-neutral-200"
              >
                Commercial & Specs
              </button>

              <button
                onClick={() => handleNavClick('faq')}
                className="hover:text-white transition-colors text-neutral-400 hover:text-amber-400"
              >
                FAQ
              </button>

              <Link
                to="/locations"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-1 hover:text-white transition-colors text-neutral-400 hover:text-amber-400"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Lower Mainland Locations</span>
              </Link>
            </nav>

            {/* Header Right Action */}
            <div className="hidden sm:flex items-center space-x-4">
              <button
                id="header-quote-btn"
                onClick={onOpenQuote}
                className="relative group overflow-hidden rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-sm font-bold text-neutral-950 shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 hover:from-amber-400 hover:to-amber-500 transition-all duration-200"
              >
                <span className="flex items-center space-x-1.5">
                  <span>Get Instant Quote</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={onOpenQuote}
                className="bg-amber-500 text-neutral-950 font-bold px-3 py-1.5 rounded-lg text-xs"
              >
                Quote
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-3 pb-6 space-y-3">
            <button
              onClick={() => handleNavClick('visualizer')}
              className="w-full text-left py-2.5 px-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>3D Visualizer Studio</span>
            </button>

            <button
              onClick={() => handleNavClick('site-planner')}
              className="w-full text-left py-2.5 px-3 rounded-lg bg-neutral-900 border border-amber-500/30 text-amber-400 font-semibold flex items-center space-x-2"
            >
              <Compass className="w-4 h-4" />
              <span>📐 Property Site Map Planner</span>
            </button>

            <button
              onClick={() => handleNavClick('calculator')}
              className="w-full text-left py-2.5 px-3 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 font-semibold flex items-center space-x-2"
            >
              <span>⚡ Dynamic Pricing & Tax Calculator</span>
            </button>

            <button
              onClick={() => handleNavClick('products')}
              className="w-full text-left py-2 px-3 text-neutral-300 hover:text-white font-medium"
            >
              Fencing Systems & Profiles
            </button>

            <button
              onClick={() => handleNavClick('climate')}
              className="w-full text-left py-2 px-3 text-neutral-300 hover:text-white font-medium"
            >
              Canadian Climate & Frost Engineering
            </button>

            <button
              onClick={() => handleNavClick('comparison')}
              className="w-full text-left py-2 px-3 text-neutral-300 hover:text-white font-medium"
            >
              Steel vs Wood & Vinyl Lifespan
            </button>

            <button
              onClick={() => handleNavClick('gates')}
              className="w-full text-left py-2 px-3 text-neutral-300 hover:text-white font-medium"
            >
              Automated Cantilever Gates
            </button>

            <button
              onClick={() => handleNavClick('gallery')}
              className="w-full text-left py-2 px-3 text-neutral-300 hover:text-white font-medium"
            >
              Project Gallery & Reviews
            </button>

            <button
              onClick={() => handleNavClick('commercial')}
              className="w-full text-left py-2 px-3 text-neutral-300 hover:text-white font-medium"
            >
              Commercial & Architectural Specs
            </button>

            <button
              onClick={() => handleNavClick('faq')}
              className="w-full text-left py-2 px-3 text-amber-400 hover:text-amber-300 font-semibold"
            >
              FAQ &amp; Canadian Warranties
            </button>

            <Link
              to="/locations"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left py-2 px-3 text-neutral-300 hover:text-white font-medium flex items-center space-x-2"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Lower Mainland Locations</span>
            </Link>

            <div className="pt-3 border-t border-neutral-800 flex flex-col space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3 bg-amber-500 text-neutral-950 font-bold rounded-lg text-center shadow-lg"
              >
                Request Free Turnkey Quote
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
