import React, { useState } from 'react';
import {
  Smartphone,
  Shield,
  Zap,
  Snowflake,
  Wifi,
  Key,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Sliders,
  Radio,
  Camera,
  ShieldAlert,
  Sun,
} from 'lucide-react';
import { GATE_OPTIONS, SECURITY_PACKAGES } from '../data/products';

interface GateAutomationProps {
  onOpenQuote: () => void;
  onOpenVisualizer: () => void;
}

export const GateAutomation: React.FC<GateAutomationProps> = ({ onOpenQuote, onOpenVisualizer }) => {
  const [activeCategory, setActiveCategory] = useState<'residential-commercial' | 'high-speed-barrier' | 'security-access'>('residential-commercial');

  return (
    <section id="gates" className="py-16 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400 mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Automated Entry, Barrier Arms &amp; Smart Access</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Engineered Gate &amp; Barrier Automation Systems
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3">
            Traditional ground-track gates freeze solid in Canadian blizzards. Our cantilever systems, high-speed barrier arms, and telescopic gates float above snow drifts with brushless -40°C rated motors.
          </p>

          {/* Category Toggle */}
          <div className="inline-flex p-1 bg-neutral-900 rounded-2xl border border-neutral-800 mt-6">
            <button
              onClick={() => setActiveCategory('residential-commercial')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'residential-commercial'
                  ? 'bg-amber-500 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Estate &amp; Sliding Gates
            </button>
            <button
              onClick={() => setActiveCategory('high-speed-barrier')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'high-speed-barrier'
                  ? 'bg-amber-500 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              High-Speed &amp; Barrier Boom Arms
            </button>
            <button
              onClick={() => setActiveCategory('security-access')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'security-access'
                  ? 'bg-amber-500 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Security Intercoms &amp; Access Control
            </button>
          </div>
        </div>

        {/* 1. Category 1: Estate & Sliding Gates */}
        {activeCategory === 'residential-commercial' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Cantilever Slide */}
            <div className="p-6 bg-neutral-900/60 rounded-3xl border border-neutral-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="relative h-44 rounded-2xl overflow-hidden border border-neutral-800">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                    alt="Trackless Cantilever Sliding Gate"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-amber-500 text-neutral-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    Canadian Winter Champion
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                  Trackless Cantilever Slide
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Floats 4&quot; above snow and ice. Enclosed internal roller carriage requires zero snow shoveling or ground tracks.
                </p>
                <ul className="space-y-1.5 text-xs text-neutral-300 pt-2 border-t border-neutral-800">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Spans up to 32ft single / 64ft double</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Heavy dual counterbalance tail</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Sub-zero brushless 24V motor</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
                <span className="text-amber-400 font-bold text-xs">From $2,800 CAD</span>
                <button
                  onClick={onOpenVisualizer}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Configure 3D
                </button>
              </div>
            </div>

            {/* Wrought Iron Estate Gate */}
            <div className="p-6 bg-neutral-900/60 rounded-3xl border border-neutral-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="relative h-44 rounded-2xl overflow-hidden border border-neutral-800">
                  <img
                    src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80"
                    alt="Arched Wrought Iron Estate Gate"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-neutral-900 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-neutral-700 uppercase">
                    Heritage Luxury
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                  Arched Wrought Iron Estate Gate
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Grand sweeping arched crest profile, hand-forged rings and scrollwork, powered by sealed hydraulic linear actuators.
                </p>
                <ul className="space-y-1.5 text-xs text-neutral-300 pt-2 border-t border-neutral-800">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Heavy forged steel ball-bearing hinges</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Hydraulic actuators with soft-stop</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Solar charging &amp; battery backup ready</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
                <span className="text-amber-400 font-bold text-xs">From $2,450 CAD</span>
                <button
                  onClick={onOpenVisualizer}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Configure 3D
                </button>
              </div>
            </div>

            {/* Smart Walk & Pool Gate */}
            <div className="p-6 bg-neutral-900/60 rounded-3xl border border-neutral-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="relative h-44 rounded-2xl overflow-hidden border border-neutral-800">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
                    alt="Pedestrian Walk Gate"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-neutral-900 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-neutral-700 uppercase">
                    Pool &amp; Perimeter
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                  Pedestrian Walk &amp; Pool Gate
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Canadian building code compliant self-closing hydraulic hinges with tamper-resistant keyed or digital keypad latch.
                </p>
                <ul className="space-y-1.5 text-xs text-neutral-300 pt-2 border-t border-neutral-800">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Hydraulic self-closing safety hinges</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Keyless digital PIN code / RFID lock</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Precision matched to fence profile</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
                <span className="text-amber-400 font-bold text-xs">From $650 CAD</span>
                <button
                  onClick={onOpenVisualizer}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Configure 3D
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. Category 2: High-Speed & Barrier Boom Arms */}
        {activeCategory === 'high-speed-barrier' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Automatic Boom Barrier */}
            <div className="p-6 bg-neutral-900/60 rounded-3xl border border-neutral-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/30 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase">Ultra High-Speed</span>
                  <span className="text-xs font-mono font-bold text-white">1.5 - 3.0s Open</span>
                </div>
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                  Automatic Barrier Boom Arm
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Commercial vehicular traffic management barrier with high-visibility LED illuminated boom arm and breakaway safety pivots.
                </p>
                <ul className="space-y-1.5 text-xs text-neutral-300 pt-2 border-t border-neutral-800">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>10,000+ daily duty continuous cycles</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Integrated red/green LED signaling</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>In-ground vehicle loop detector ready</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
                <span className="text-amber-400 font-bold text-xs">From $3,450 CAD</span>
                <button
                  onClick={onOpenVisualizer}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Configure 3D
                </button>
              </div>
            </div>

            {/* Telescopic Sliding Gate */}
            <div className="p-6 bg-neutral-900/60 rounded-3xl border border-neutral-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-sky-500/10 rounded-2xl border border-sky-500/30 flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-400 uppercase">Space-Saving</span>
                  <span className="text-xs font-mono font-bold text-white">50% Shorter Backrun</span>
                </div>
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                  Telescopic Multi-Leaf Sliding
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Dual linked sliding panels open at 2X speed, overlapping compactly into tight side setbacks where standard gates won&apos;t fit.
                </p>
                <ul className="space-y-1.5 text-xs text-neutral-300 pt-2 border-t border-neutral-800">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Synchronized cable-drive speed system</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Ideal for tight driveway property lines</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Heavy galvanized guide carriages</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
                <span className="text-amber-400 font-bold text-xs">From $3,950 CAD</span>
                <button
                  onClick={onOpenVisualizer}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Configure 3D
                </button>
              </div>
            </div>

            {/* High-Speed Bi-Fold Speed Gate */}
            <div className="p-6 bg-neutral-900/60 rounded-3xl border border-neutral-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase">Speed Security</span>
                  <span className="text-xs font-mono font-bold text-white">3.5s Full Cycle</span>
                </div>
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                  Bi-Fold Accordion Speed Gate
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  High-security commercial gate folding in seconds without overhead track, combining the speed of a barrier with full fence security.
                </p>
                <ul className="space-y-1.5 text-xs text-neutral-300 pt-2 border-t border-neutral-800">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Anti-tailgating ultra rapid opening</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Continuous duty brushless DC drive</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Tamper-proof internal hinge wiring</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
                <span className="text-amber-400 font-bold text-xs">From $4,650 CAD</span>
                <button
                  onClick={onOpenVisualizer}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Configure 3D
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. Category 3: Security Intercoms & Access Control */}
        {activeCategory === 'security-access' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {SECURITY_PACKAGES.filter((s) => s.id !== 'none').map((pkg) => (
              <div
                key={pkg.id}
                className="p-6 bg-neutral-900/60 rounded-3xl border border-neutral-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    {pkg.id === 'smart-intercom-camera' && <Camera className="w-6 h-6" />}
                    {pkg.id === 'rfid-keypad-loop' && <Radio className="w-6 h-6" />}
                    {pkg.id === 'commercial-high-security' && <ShieldAlert className="w-6 h-6" />}
                  </div>
                  <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {pkg.description}
                  </p>
                  <ul className="space-y-1.5 text-xs text-neutral-300 pt-2 border-t border-neutral-800">
                    {pkg.includes.map((inc, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
                  <span className="text-amber-400 font-bold text-xs">+${pkg.price} CAD</span>
                  <button
                    onClick={onOpenVisualizer}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Add to Estimate
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Smart Access Features Banner */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Smart IoT Connectivity &amp; Mobile Control
            </span>
            <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              Control Your Gate From Anywhere in the World
            </h3>
            <p className="text-xs text-neutral-300 max-w-2xl">
              Open with Apple CarPlay, Siri, Google Assistant, smartphone app, or vehicle transponders. Receive instant 1080p video delivery alerts and generate temporary guest PIN codes.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={onOpenVisualizer}
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              Add Gate to 3D Visualizer
            </button>
            <button
              onClick={onOpenQuote}
              className="px-5 py-3 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl border border-neutral-700 transition-colors cursor-pointer"
            >
              Custom Gate Quote
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
