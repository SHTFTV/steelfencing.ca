import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Mail,
  Award,
  Sparkles,
} from 'lucide-react';
import { LOWER_MAINLAND_CITIES } from '../data/installerPartner';

interface FooterProps {
  onOpenQuote: () => void;
  onSelectSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote, onSelectSection }) => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs border-t border-neutral-800">
      
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-neutral-950 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-neutral-900">
              Ready to Upgrade to Lifetime Steel?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight font-['Space_Grotesk'] text-neutral-950">
              Book Your Canadian On-Site Assessment Today
            </h3>
            <p className="text-xs font-semibold text-neutral-900 mt-1">
              Zero pressure, precision laser boundary measurements, and free material swatches.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenQuote}
              className="px-6 py-3.5 bg-white hover:bg-neutral-100 text-neutral-950 font-black rounded-xl text-xs shadow-xl transition-colors"
            >
              Get Turnkey Quote
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Credentials */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-neutral-950 font-black text-xs">
                🇨🇦
              </div>
              <span className="font-black text-xl text-white tracking-tight font-['Space_Grotesk']">
                STEEL<span className="text-amber-400">FENCING</span>.CA
              </span>
            </div>

            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Compare architectural horizontal slat steel fencing, corrugated privacy systems, ornamental pool enclosures, and cantilever automated driveway gates, and connect with a local installer.
            </p>

            <div className="flex items-center space-x-4 pt-2 text-neutral-300">
              <div className="flex items-center space-x-1 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Built for Canadian Winters</span>
              </div>
              <div className="flex items-center space-x-1 text-[11px]">
                <Award className="w-4 h-4 text-amber-400" />
                <span>ASTM A653</span>
              </div>
            </div>
          </div>

          {/* Col 2: Products & Systems */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-['Space_Grotesk']">
              Planning &amp; Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectSection('visualizer')} className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Interactive 3D Visualizer</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('site-planner')} className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center space-x-1">
                  <span>📐 Property Site Map Planner</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('calculator')} className="hover:text-white transition-colors">
                  Cost &amp; Provincial Tax Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('products')} className="hover:text-white transition-colors">
                  Nordic™ Horizontal Slat
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('products')} className="hover:text-white transition-colors">
                  Apex™ Corrugated Privacy
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('products')} className="hover:text-white transition-colors">
                  Highland™ Ornamental Spear
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Lower Mainland Locations (real installer, real cities) */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-['Space_Grotesk']">
              Lower Mainland Locations
            </h4>
            <ul className="space-y-2 text-neutral-400">
              {LOWER_MAINLAND_CITIES.slice(0, 6).map((city) => (
                <li key={city.slug}>
                  <Link to={`/locations/${city.slug}`} className="hover:text-amber-400 transition-colors">
                    {city.name}, BC
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/locations" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                  View all locations →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-['Space_Grotesk']">
              Get in Touch
            </h4>
            <div className="space-y-2.5">
              <button
                onClick={onOpenQuote}
                className="flex items-center space-x-2 text-white hover:text-amber-400 transition-colors font-bold"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Request a Free Quote</span>
              </button>
              <p className="text-neutral-400">
                Submit your project details and we&apos;ll connect you with a local installer.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} SteelFencing.ca. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-400 cursor-pointer">CSI 32 31 19 MasterFormat</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
