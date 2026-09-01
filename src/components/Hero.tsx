import React, { useState } from 'react';
import {
  Shield,
  Snowflake,
  Wind,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Calculator,
  Compass,
} from 'lucide-react';
import { formatCAD } from '../utils/calculator';

interface HeroProps {
  onOpenVisualizer: () => void;
  onOpenSitePlanner?: () => void;
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenVisualizer, onOpenSitePlanner, onOpenQuote }) => {
  const [quickFootage, setQuickFootage] = useState<number>(120);
  const [quickStyle, setQuickStyle] = useState<'nordic' | 'corrugated' | 'ornamental'>('nordic');

  // Quick price preview calculation
  const baseRates = { nordic: 145, corrugated: 125, ornamental: 115 };
  const estimatedTotal = quickFootage * baseRates[quickStyle];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-neutral-800 bg-neutral-950">
      {/* Background Architectural Grid & Subtle Ambient Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-600/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-amber-500/30 text-xs font-semibold text-amber-400">
              <span className="flex h-2 w-2 rounded-full bg-amber-400"></span>
              <span>Compare Canadian Architectural Steel Fencing</span>
              <span className="text-neutral-500">|</span>
              <span className="text-neutral-300">Connect With a Local Installer</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] font-['Space_Grotesk']">
              Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">Canadian Extremes</span>.
              <br />
              Built for Distinction.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
              Replace rotting wood and brittle vinyl with galvanized Galvalume® steel, engineered
              for -45°C deep freeze, heavy snowbanks, and 160 km/h wind gusts. Ask your installer about their specific warranty terms.
            </p>

            {/* Core Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-start space-x-2.5 p-3 rounded-lg bg-neutral-900/90 border border-neutral-800">
                <Snowflake className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-bold text-white">Frost Heave Proof</h2>
                  <p className="text-[11px] text-neutral-400">Deep frost & screw-pile engineered</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 p-3 rounded-lg bg-neutral-900/90 border border-neutral-800">
                <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-bold text-white">Long-Life Coating</h2>
                  <p className="text-[11px] text-neutral-400">Multi-layer TGIC powder coat</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 p-3 rounded-lg bg-neutral-900/90 border border-neutral-800 col-span-2 sm:col-span-1">
                <Wind className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-bold text-white">160 km/h Rated</h2>
                  <p className="text-[11px] text-neutral-400">High-wind structural integrity</p>
                </div>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                id="hero-open-visualizer-btn"
                onClick={onOpenVisualizer}
                className="inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-extrabold text-base shadow-xl shadow-amber-500/25 hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-500/40 transition-all cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                <span>Launch 3D Designer</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              {onOpenSitePlanner && (
                <button
                  id="hero-open-site-planner-btn"
                  onClick={onOpenSitePlanner}
                  className="inline-flex items-center justify-center space-x-2 px-5 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-amber-400 font-bold text-base border border-amber-500/40 hover:border-amber-500 transition-all cursor-pointer shadow-lg"
                >
                  <Compass className="w-5 h-5 text-amber-400" />
                  <span>Property Site Planner</span>
                </button>
              )}

              <button
                id="hero-request-quote-btn"
                onClick={onOpenQuote}
                className="inline-flex items-center justify-center space-x-2 px-5 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-base border border-neutral-700 transition-all cursor-pointer"
              >
                <span>Free Quote</span>
              </button>
            </div>

            {/* Trust Proof Metrics */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-400 border-t border-neutral-800/80">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Steel Fencing Specialists Across Canada</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Rot • Zero Staining</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase & Instant Calculator Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-neutral-800/90 to-neutral-900/90 p-1 border border-neutral-700/80 shadow-2xl">
              {/* Top Photo Banner */}
              <div className="relative h-56 sm:h-64 rounded-t-xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern Canadian architectural horizontal steel slat fence in matte black"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
                <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-bold text-white border border-neutral-700 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Nordic Series™ Matte Obsidian</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Style Inspiration — Ontario</p>
                  <p className="text-sm font-bold truncate">Horizontal Slat Privacy & Cantilever Driveway Gate</p>
                </div>
              </div>

              {/* Instant Quick Estimator Box */}
              <div className="p-5 bg-neutral-950 rounded-b-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Instant Canadian Estimate
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400">Live Cost Engine</span>
                </div>

                {/* Style Choice */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-900 rounded-lg border border-neutral-800 text-xs">
                  <button
                    onClick={() => setQuickStyle('nordic')}
                    className={`py-1.5 px-2 rounded-md font-semibold transition-all ${
                      quickStyle === 'nordic'
                        ? 'bg-amber-500 text-neutral-950 shadow'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    Modern Slat
                  </button>
                  <button
                    onClick={() => setQuickStyle('corrugated')}
                    className={`py-1.5 px-2 rounded-md font-semibold transition-all ${
                      quickStyle === 'corrugated'
                        ? 'bg-amber-500 text-neutral-950 shadow'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    Corrugated
                  </button>
                  <button
                    onClick={() => setQuickStyle('ornamental')}
                    className={`py-1.5 px-2 rounded-md font-semibold transition-all ${
                      quickStyle === 'ornamental'
                        ? 'bg-amber-500 text-neutral-950 shadow'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    Ornamental
                  </button>
                </div>

                {/* Footage Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-neutral-400">Perimeter Footage:</span>
                    <span className="text-amber-400 font-bold">{quickFootage} Linear Feet (~{(quickFootage * 0.3048).toFixed(1)}m)</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="400"
                    step="10"
                    value={quickFootage}
                    onChange={(e) => setQuickFootage(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                    <span>30 ft (Townhouse)</span>
                    <span>150 ft (Standard Lot)</span>
                    <span>400+ ft (Acreage)</span>
                  </div>
                </div>

                {/* Estimate Result Display */}
                <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-neutral-400 block">Est. Turnkey Installed:</span>
                    <span className="text-xl font-extrabold text-white tracking-tight">
                      {formatCAD(estimatedTotal)} <span className="text-xs font-normal text-neutral-400">CAD</span>
                    </span>
                  </div>
                  <button
                    onClick={onOpenVisualizer}
                    className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-amber-400 hover:text-amber-300 text-xs font-bold rounded-lg border border-neutral-700 transition-colors flex items-center space-x-1"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Customize in 3D</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
