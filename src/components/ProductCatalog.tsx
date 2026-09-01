import React, { useState } from 'react';
import { FENCE_PRODUCTS, GATE_OPTIONS, SECURITY_PACKAGES } from '../data/products';
import { FenceStyleId, FenceMaterialFamily, GateType, SecurityPackageType, MaterialGradeId } from '../types';
import { SteelGradeComparisonChart } from './SteelGradeComparisonChart';
import {
  Shield,
  Layers,
  Wind,
  Volume2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Maximize2,
  FileCheck,
  Radio,
  Zap,
  Lock,
  Camera,
  Sun,
  ShieldAlert,
  Cpu,
  Smartphone,
  Sliders,
  BarChart2,
  Award,
} from 'lucide-react';

interface ProductCatalogProps {
  onSelectProductForVisualizer: (styleId: FenceStyleId) => void;
  onSelectGateForVisualizer?: (gateId: GateType) => void;
  onSelectSecurityForVisualizer?: (secId: SecurityPackageType) => void;
  onSelectGradeForEstimate?: (gradeId: MaterialGradeId) => void;
  onOpenQuote: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProductForVisualizer,
  onSelectGateForVisualizer,
  onSelectSecurityForVisualizer,
  onSelectGradeForEstimate,
  onOpenQuote,
}) => {
  const [activeTab, setActiveTab] = useState<'fences' | 'grades' | 'gates' | 'security'>('fences');
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState<'all' | FenceMaterialFamily | 'commercial' | 'acoustic' | 'art'>('all');
  const [selectedStyle, setSelectedStyle] = useState<FenceStyleId>('nordic-slat');
  const [selectedGate, setSelectedGate] = useState<GateType>('cantilever-sliding');
  const [selectedSecurity, setSelectedSecurity] = useState<SecurityPackageType>('smart-intercom-camera');

  const filteredProducts = FENCE_PRODUCTS.filter((p) => {
    if (selectedMaterialFilter === 'all') return true;
    if (selectedMaterialFilter === 'commercial') return p.category === 'Commercial & Industrial';
    if (selectedMaterialFilter === 'acoustic') return p.category === 'Acoustic Barrier';
    if (selectedMaterialFilter === 'art') return p.category === 'Architectural Art';
    return p.materialFamily === selectedMaterialFilter;
  });

  const activeProduct = FENCE_PRODUCTS.find((p) => p.id === selectedStyle) || filteredProducts[0] || FENCE_PRODUCTS[0];
  const activeGate = GATE_OPTIONS.find((g) => g.id === selectedGate) || GATE_OPTIONS[3];
  const activeSecurity = SECURITY_PACKAGES.find((s) => s.id === selectedSecurity) || SECURITY_PACKAGES[1];

  return (
    <section id="products" className="py-16 bg-neutral-900/50 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Full Perimeter Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
              Fencing, Barrier Gates &amp; Security Systems
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Engineered for extreme Canadian climate conditions. From contemporary horizontal steel slats and hand-forged wrought iron to marine-grade aluminum, high-speed barrier boom gates, and cellular access control.
            </p>
          </div>

          {/* Master View Switcher */}
          <div className="inline-flex flex-wrap p-1 bg-neutral-950 rounded-2xl border border-neutral-800 gap-1">
            <button
              onClick={() => setActiveTab('fences')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'fences'
                  ? 'bg-amber-500 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Fencing Profiles ({FENCE_PRODUCTS.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('grades')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'grades'
                  ? 'bg-amber-500 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Steel Grade Comparison Chart</span>
            </button>
            <button
              onClick={() => setActiveTab('gates')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'gates'
                  ? 'bg-amber-500 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Barrier &amp; Gates ({GATE_OPTIONS.length - 1})</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'security'
                  ? 'bg-amber-500 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Smart Security &amp; Motors</span>
            </button>
          </div>
        </div>

        {/* TAB 1: FENCING PROFILES */}
        {activeTab === 'fences' && (
          <div className="space-y-6">
            {/* Category Filter Badges */}
            <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
              {[
                { id: 'all', label: `All Systems (${FENCE_PRODUCTS.length})` },
                { id: 'steel', label: 'Steel Privacy & Slat' },
                { id: 'wrought-iron', label: 'Hand-Forged Wrought Iron' },
                { id: 'ornamental', label: 'Ornamental Security' },
                { id: 'aluminum', label: 'Marine 6005-T5 Aluminum' },
                { id: 'commercial', label: 'Industrial & Prison Mesh' },
                { id: 'acoustic', label: 'Acoustic Sound Barrier' },
                { id: 'art', label: 'CNC Laser Art Screens' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedMaterialFilter(cat.id as any);
                    const matching = FENCE_PRODUCTS.filter((p) => {
                      if (cat.id === 'all') return true;
                      if (cat.id === 'commercial') return p.category === 'Commercial & Industrial';
                      if (cat.id === 'acoustic') return p.category === 'Acoustic Barrier';
                      if (cat.id === 'art') return p.category === 'Architectural Art';
                      return p.materialFamily === cat.id;
                    });
                    if (matching.length > 0) setSelectedStyle(matching[0].id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                    selectedMaterialFilter === cat.id
                      ? 'bg-neutral-800 text-amber-400 border-amber-500/50 shadow-sm'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Product Navigation Pills */}
            <div className="flex overflow-x-auto pb-3 gap-2 no-scrollbar border-b border-neutral-800 mb-6">
              {filteredProducts.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => setSelectedStyle(prod.id)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center space-x-2 cursor-pointer ${
                    selectedStyle === prod.id
                      ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20'
                      : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-neutral-800'
                  }`}
                >
                  <span>{prod.name}</span>
                </button>
              ))}
            </div>

            {/* Active Product Detailed Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              
              {/* Left: Product Imagery & Badges (6 cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 border border-neutral-800 group">
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-4 left-4 bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-700 text-xs font-bold text-white flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>{activeProduct.category}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-amber-400 text-xs font-bold uppercase tracking-wider">Starting From</p>
                    <p className="text-2xl font-black text-white font-['Space_Grotesk']">
                      ${activeProduct.basePricePerFoot} <span className="text-xs font-normal text-neutral-400">CAD / Linear Foot (Supply)</span>
                    </p>
                  </div>
                </div>

                {/* Technical Engineering Armor Shield */}
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center space-x-1.5">
                      <Shield className="w-4 h-4 text-amber-400" />
                      <span>Canadian Engineered Sub-Zero Material Spec</span>
                    </span>
                    <span className="text-emerald-400 font-mono text-[11px]">{activeProduct.specs.warrantyYears}-Year Direct Warranty</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono text-[10px]">
                    <div className="p-2 bg-neutral-950 rounded border border-neutral-800 text-neutral-300">
                      <span className="block text-amber-400 font-bold">Core Material</span>
                      <span className="truncate">{activeProduct.specs.steelGauge.split('/')[0]}</span>
                    </div>
                    <div className="p-2 bg-neutral-950 rounded border border-neutral-800 text-neutral-300">
                      <span className="block text-amber-400 font-bold">Wind Rating</span>
                      <span>{activeProduct.specs.windLoadKmH} km/h</span>
                    </div>
                    <div className="p-2 bg-neutral-950 rounded border border-amber-500/50 text-amber-300">
                      <span className="block text-amber-400 font-bold">Corrosion</span>
                      <span>100% Anti-Rust</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Technical Specifications & Features (6 cols) */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{activeProduct.tagline}</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 font-['Space_Grotesk']">
                    {activeProduct.name}
                  </h3>
                  <p className="text-neutral-300 text-sm mt-3 leading-relaxed">
                    {activeProduct.description}
                  </p>
                </div>

                {/* Key Feature List */}
                <div className="space-y-2">
                  {activeProduct.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 p-4 bg-neutral-900 rounded-2xl border border-neutral-800 text-xs">
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Material Gauge / Spec</span>
                    <span className="font-bold text-white">{activeProduct.specs.steelGauge}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Wind Load Tested</span>
                    <span className="font-bold text-emerald-400">{activeProduct.specs.windLoadKmH} km/h (Class 3 Gale)</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Anti-Corrosion Warranty</span>
                    <span className="font-bold text-amber-400">{activeProduct.specs.warrantyYears} Years Direct Replacement</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Available Heights</span>
                    <span className="font-bold text-white">
                      {activeProduct.heightsAvailable.map((h) => `${h}'`).join(', ')}
                    </span>
                  </div>
                </div>

                {/* Recommended Applications */}
                <div>
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-1.5">
                    Ideal Applications:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProduct.recommendedFor.map((app, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-neutral-900 text-neutral-300 border border-neutral-800 rounded-md text-xs"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => onSelectProductForVisualizer(activeProduct.id)}
                    className="flex-1 py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Configure {activeProduct.name.split('™')[0]} in 3D</span>
                  </button>
                  <button
                    onClick={onOpenQuote}
                    className="py-3.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl border border-neutral-700 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Request Material Swatch Sample</span>
                  </button>
                </div>

              </div>

            </div>

            {/* Visual Comparison Chart: Standard vs High-Durability Steel */}
            <SteelGradeComparisonChart
              onSelectGradeForEstimate={onSelectGradeForEstimate}
              onOpenQuote={onOpenQuote}
            />
          </div>
        )}

        {/* TAB: STEEL GRADE COMPARISON CHART DEDICATED VIEW */}
        {activeTab === 'grades' && (
          <div className="space-y-6">
            <SteelGradeComparisonChart
              onSelectGradeForEstimate={onSelectGradeForEstimate}
              onOpenQuote={onOpenQuote}
            />
          </div>
        )}

        {/* TAB 2: GATES & BARRIER SYSTEMS */}
        {activeTab === 'gates' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-neutral-800 pb-4">
              {GATE_OPTIONS.filter((g) => g.id !== 'none').map((gate) => (
                <button
                  key={gate.id}
                  onClick={() => setSelectedGate(gate.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedGate === gate.id
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-md'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <span className="text-[10px] font-bold text-amber-400 block uppercase tracking-wider">{gate.category}</span>
                  <span className="text-xs font-extrabold text-white block mt-0.5">{gate.name}</span>
                  <span className="text-[11px] text-neutral-400 block mt-1">{gate.priceFormula}</span>
                </button>
              ))}
            </div>

            {/* Active Gate Detailed Breakdown */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <div className="p-6 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-2xl border border-neutral-800">
                    <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 mb-3">
                      <Zap className="w-3.5 h-3.5" />
                      <span>{activeGate.category} Engineering</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk']">
                      {activeGate.name}
                    </h3>
                    <p className="text-amber-400 text-xs font-semibold mt-1">{activeGate.tagline}</p>
                    <p className="text-neutral-300 text-sm mt-3 leading-relaxed">
                      {activeGate.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-neutral-800 text-xs">
                      <div>
                        <span className="text-neutral-400 block text-[11px]">Opening Span Width</span>
                        <span className="font-bold text-white">{activeGate.typicalWidths}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[11px]">Base Investment</span>
                        <span className="font-bold text-amber-400">{activeGate.priceFormula}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-5">
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    Core Mechanical Specifications:
                  </h4>
                  <div className="space-y-2.5">
                    {activeGate.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-3 bg-neutral-900 rounded-xl border border-neutral-800 text-xs text-neutral-200">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>Automated Cold-Weather Brushless Motors (-40°C rated) Available</span>
                    </div>
                    <button
                      onClick={() => {
                        if (onSelectGateForVisualizer) {
                          onSelectGateForVisualizer(activeGate.id);
                        } else {
                          onSelectProductForVisualizer('nordic-slat');
                        }
                      }}
                      className="px-3 py-1.5 bg-amber-500 text-neutral-950 font-bold rounded-lg hover:bg-amber-400 transition-colors cursor-pointer text-xs"
                    >
                      Test in 3D
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SMART SECURITY & AUTOMATION */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SECURITY_PACKAGES.filter((s) => s.id !== 'none').map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedSecurity(pkg.id)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedSecurity === pkg.id
                      ? 'bg-neutral-950 border-amber-500 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500'
                      : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        {pkg.id === 'smart-intercom-camera' && <Camera className="w-5 h-5" />}
                        {pkg.id === 'rfid-keypad-loop' && <Radio className="w-5 h-5" />}
                        {pkg.id === 'commercial-high-security' && <ShieldAlert className="w-5 h-5" />}
                      </div>
                      <span className="text-amber-400 font-extrabold text-sm font-['Space_Grotesk']">
                        +${pkg.price} CAD
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-white">{pkg.name}</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">{pkg.description}</p>

                    <div className="space-y-1.5 pt-2 border-t border-neutral-800/80">
                      {pkg.includes.map((inc, i) => (
                        <div key={i} className="flex items-start space-x-2 text-[11px] text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectSecurityForVisualizer) {
                        onSelectSecurityForVisualizer(pkg.id);
                      } else {
                        onSelectProductForVisualizer('nordic-slat');
                      }
                    }}
                    className="w-full mt-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-neutral-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>Configure with Gate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Solar Off-Grid & Power Resilience Banner */}
            <div className="p-6 bg-gradient-to-r from-amber-500/10 via-neutral-950 to-neutral-900 rounded-2xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-white">Off-Grid Solar Power Resilience Kit (+$680 CAD)</h4>
                  <p className="text-xs text-neutral-300 mt-0.5 max-w-xl">
                    Operate automated gates and security cameras in remote driveways and rural acreages without expensive trench wiring. Dual AGM deep-cycle battery bank with MPPT solar charge controller.
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenQuote}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs rounded-xl whitespace-nowrap shadow-lg cursor-pointer"
              >
                Inquire for Solar
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
