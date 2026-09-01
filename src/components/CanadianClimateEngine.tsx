import React, { useState } from 'react';
import { CANADIAN_PROVINCES } from '../data/climateData';
import { SOIL_TYPES, getSoilType } from '../data/soilData';
import { CanadianProvinceData, SoilTypeId, SoilTypeOption, FenceConfig, PostMountType } from '../types';
import {
  Snowflake,
  Shield,
  MapPin,
  CheckCircle,
  ThermometerSnowflake,
  AlertCircle,
  Sparkles,
  Mountain,
  Layers,
  Wrench,
  ArrowRight,
  Calculator,
  Compass,
  Zap,
  Info,
  Check,
} from 'lucide-react';

interface CanadianClimateEngineProps {
  config?: FenceConfig;
  onChangeConfig?: (config: FenceConfig) => void;
  onOpenQuote: (customConfig?: FenceConfig) => void;
  onScrollToCalculator?: () => void;
  onScrollToSitePlanner?: () => void;
}

export const CanadianClimateEngine: React.FC<CanadianClimateEngineProps> = ({
  config,
  onChangeConfig,
  onOpenQuote,
  onScrollToCalculator,
  onScrollToSitePlanner,
}) => {
  // Local or synced province state
  const initialProv = CANADIAN_PROVINCES.find((p) => p.code === config?.province) || CANADIAN_PROVINCES[0];
  const [selectedProvince, setSelectedProvince] = useState<CanadianProvinceData>(initialProv);

  // Local or synced soil state
  const initialSoilId: SoilTypeId = config?.soilType || 'standard-loam';
  const [selectedSoilId, setSelectedSoilId] = useState<SoilTypeId>(initialSoilId);

  const selectedSoil: SoilTypeOption = getSoilType(selectedSoilId);

  // Synchronize when external config changes
  React.useEffect(() => {
    if (config?.province) {
      const p = CANADIAN_PROVINCES.find((prov) => prov.code === config.province);
      if (p) setSelectedProvince(p);
    }
    if (config?.soilType) {
      setSelectedSoilId(config.soilType);
    }
  }, [config?.province, config?.soilType]);

  // Handle Soil Selection and dynamically update postMount
  const handleSelectSoil = (soilId: SoilTypeId) => {
    setSelectedSoilId(soilId);
    const targetSoil = getSoilType(soilId);
    if (onChangeConfig && config) {
      onChangeConfig({
        ...config,
        soilType: soilId,
        postMount: targetSoil.recommendedPostMount,
      });
    }
  };

  // Handle Province Selection
  const handleSelectProvince = (prov: CanadianProvinceData) => {
    setSelectedProvince(prov);
    if (onChangeConfig && config) {
      onChangeConfig({
        ...config,
        province: prov.code,
      });
    }
  };

  // Handle Direct Post Mount Override
  const handleSelectPostMount = (mount: PostMountType) => {
    if (onChangeConfig && config) {
      onChangeConfig({
        ...config,
        postMount: mount,
      });
    }
  };

  const currentMount = config?.postMount || selectedSoil.recommendedPostMount;

  // Calculate adjusted foundation depth based on province frost depth and soil multiplier
  const calculatedFrostDepthInches = Math.round(selectedProvince.frostDepthInches * selectedSoil.postDepthMultiplier);

  return (
    <section id="climate" className="py-20 bg-neutral-950 border-b border-neutral-800 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-sky-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-xs font-semibold text-sky-400 mb-3 shadow-sm">
            <ThermometerSnowflake className="w-3.5 h-3.5" />
            <span>Canadian Climate &amp; Geotechnical Foundation Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Space_Grotesk']">
            Engineered for <span className="text-sky-400">Canadian Frost Lines</span> &amp; Soil Profiles
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            In Canada, fence failures are most commonly caused by frost heaving and inadequate post anchoring below the ground line. Select your regional zone and property soil type to auto-configure optimal post foundation engineering.
          </p>
        </div>

        {/* 1. Interactive Dual Selector (Provinces & Soil Types) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left Column: Province & Climate Zone (5 cols) */}
          <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  1. Select Regional Climate Zone
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                {selectedProvince.code}
              </span>
            </div>

            <div className="space-y-2">
              {CANADIAN_PROVINCES.map((prov) => {
                const isSelected = selectedProvince.code === prov.code;
                return (
                  <button
                    key={prov.code}
                    onClick={() => handleSelectProvince(prov)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between text-xs cursor-pointer ${
                      isSelected
                        ? 'bg-sky-500/15 border-sky-500 text-white shadow-md'
                        : 'bg-neutral-950/80 border-neutral-800/80 text-neutral-400 hover:border-neutral-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-sky-400' : 'bg-neutral-600'}`} />
                      <div>
                        <span className="font-bold text-sm text-white block">{prov.name}</span>
                        <span className="text-[11px] text-neutral-400">
                          Frost Line: {prov.frostDepthInches}&quot; ({Math.round(prov.frostDepthInches * 2.54)} cm) | Min: {prov.avgWinterLowC}°C
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        prov.snowLoadRating === 'Extreme'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {prov.snowLoadRating} Snow Load
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Soil Type Selector (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  2. Select Property Soil &amp; Ground Conditions
                </span>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Auto-Adjusts Post Foundation
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SOIL_TYPES.map((soil) => {
                const isSelected = selectedSoilId === soil.id;
                const heaveBadgeColor =
                  soil.frostHeaveRisk === 'Severe'
                    ? 'text-red-400 bg-red-500/10 border-red-500/30'
                    : soil.frostHeaveRisk === 'High'
                    ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                    : soil.frostHeaveRisk === 'Moderate'
                    ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
                    : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';

                return (
                  <button
                    key={soil.id}
                    onClick={() => handleSelectSoil(soil.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg'
                        : 'bg-neutral-950/80 border-neutral-800/80 text-neutral-400 hover:border-neutral-700 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-white line-clamp-1">{soil.shortName}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${heaveBadgeColor}`}>
                          {soil.frostHeaveRisk} Heave Risk
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-400 line-clamp-2 leading-tight">
                        {soil.tagline}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[10px]">
                      <span className="text-neutral-400">Foundation:</span>
                      <span className="font-bold text-amber-400 font-mono line-clamp-1">
                        {soil.recommendedMountName.split(' ')[0]} {soil.recommendedMountName.split(' ')[1] || ''}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* 2. Geotechnical Foundation Analysis & Dynamic Strata Cross-Section */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                  Geotechnical Engineering Report
                </span>
                <span className="text-neutral-600">•</span>
                <span className="text-xs font-mono text-neutral-400">
                  {selectedProvince.name} + {selectedSoil.shortName}
                </span>
              </div>
              <h3 className="text-2xl font-black text-white mt-1 font-['Space_Grotesk']">
                Foundation Requirement: <span className="text-amber-400">{selectedSoil.recommendedMountName}</span>
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono text-neutral-300">
                Auger Difficulty: <strong className="text-white">{selectedSoil.augerDifficulty}</strong>
              </span>
              <span className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono text-neutral-300">
                Active Frost Depth: <strong className="text-sky-400">{calculatedFrostDepthInches}&quot; Target</strong>
              </span>
            </div>
          </div>

          {/* Grid Layout: Visual Cross-Section (Left) & Technical Specs (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Ground Strata SVG Cross Section (5 cols) */}
            <div className="lg:col-span-5 bg-neutral-950 border border-neutral-800 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-white flex items-center space-x-1.5">
                  <Compass className="w-3.5 h-3.5 text-sky-400" />
                  <span>Sub-Grade Strata Cross-Section</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-400">Scale 1:15</span>
              </div>

              {/* Cross-Section Graphic SVG */}
              <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900">
                <svg viewBox="0 0 320 340" className="w-full h-auto">
                  {/* Sky / Air Zone (Top 70px) */}
                  <rect x="0" y="0" width="320" height="70" fill="#0f172a" opacity="0.8" />
                  
                  {/* Above Ground Steel Post */}
                  <rect x="145" y="10" width="30" height="60" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" rx="2" />
                  <line x1="145" y1="35" x2="175" y2="35" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="185" y="40" fill="#f59e0b" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    6-8&apos; Steel Post
                  </text>

                  {/* Snow / Winter Crust Marker */}
                  <rect x="0" y="66" width="320" height="4" fill="#e0f2fe" opacity="0.9" />
                  <text x="15" y="60" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    Grade Line (0&quot;)
                  </text>

                  {/* Active Frost Zone Layer (Topsoil / Heave Zone) */}
                  <rect x="0" y="70" width="320" height="130" fill={
                    selectedSoilId === 'heavy-clay' ? '#292524' :
                    selectedSoilId === 'rocky-bedrock' ? '#3f3f46' :
                    selectedSoilId === 'sandy-gravel' ? '#451a03' :
                    selectedSoilId === 'wet-peat' ? '#1c1917' :
                    '#3b2314'
                  } />

                  {/* Frost Penetration Line Marker */}
                  <line x1="0" y1="200" x2="320" y2="200" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5,3" />
                  <rect x="190" y="188" width="120" height="18" fill="#0c4a6e" rx="3" />
                  <text x="250" y="200" fill="#e0f2fe" fontSize="9.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                    Frost Line ({selectedProvince.frostDepthInches}&quot;)
                  </text>

                  {/* Stable Load-Bearing Sub-Strata Layer (Below Frost Line) */}
                  <rect x="0" y="200" width="320" height="140" fill="#18181b" />
                  <text x="15" y="315" fill="#10b981" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    ✓ Non-Heaving Stable Sub-Strata
                  </text>

                  {/* In-Ground Post Anchor Rendering based on currentMount */}
                  {currentMount === 'helical-pile' ? (
                    <g>
                      {/* Helical Steel Shaft */}
                      <rect x="155" y="70" width="10" height="230" fill="#71717a" stroke="#ffffff" strokeWidth="0.5" />
                      {/* Helical Steel Torque Flights (Below Frost Line) */}
                      <path d="M 130 240 Q 160 230 190 240 Q 160 250 130 240 Z" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.5" />
                      <path d="M 135 270 Q 160 260 185 270 Q 160 280 135 270 Z" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.5" />
                      <circle cx="160" cy="300" r="4" fill="#38bdf8" />
                      <text x="80" y="255" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="end">
                        Torque Helix Flight
                      </text>
                    </g>
                  ) : currentMount === 'surface-baseplate' ? (
                    <g>
                      {/* Surface Baseplate Flange */}
                      <rect x="130" y="65" width="60" height="8" fill="#f59e0b" stroke="#ffffff" strokeWidth="0.8" rx="1" />
                      {/* Solid Bedrock Core Pin Anchors */}
                      <rect x="138" y="73" width="6" height="80" fill="#71717a" stroke="#f59e0b" strokeWidth="0.5" />
                      <rect x="176" y="73" width="6" height="80" fill="#71717a" stroke="#f59e0b" strokeWidth="0.5" />
                      <text x="80" y="115" fill="#f59e0b" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="end">
                        Hilti Rock Anchors
                      </text>
                    </g>
                  ) : (
                    <g>
                      {/* Deep Frost Concrete Pier with Anti-Friction Sleeve */}
                      <rect x="140" y="70" width="40" height="170" fill="#52525b" stroke="#38bdf8" strokeWidth="1" rx="2" />
                      {/* Inner Steel Post */}
                      <rect x="153" y="70" width="14" height="150" fill="#18181b" />
                      {/* Belled Footing at Base */}
                      <path d="M 130 240 Q 160 235 190 240 L 180 220 L 140 220 Z" fill="#52525b" stroke="#38bdf8" strokeWidth="0.5" />
                      <text x="80" y="150" fill="#a1a1aa" fontSize="9" fontFamily="monospace" textAnchor="end">
                        Anti-Friction Sleeve
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              {/* Interactive Mount Type Radio Selector */}
              <div className="mt-4 pt-3 border-t border-neutral-800 space-y-2">
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                  Active Foundation Specification:
                </span>
                <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={() => handleSelectPostMount('deep-frost-ground')}
                    className={`p-1.5 rounded-lg border text-center transition-colors cursor-pointer ${
                      currentMount === 'deep-frost-ground'
                        ? 'bg-sky-500/20 border-sky-500 text-sky-300 font-bold'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    Frost Sleeve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectPostMount('helical-pile')}
                    className={`p-1.5 rounded-lg border text-center transition-colors cursor-pointer ${
                      currentMount === 'helical-pile'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    Helical Pile
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectPostMount('surface-baseplate')}
                    className={`p-1.5 rounded-lg border text-center transition-colors cursor-pointer ${
                      currentMount === 'surface-baseplate'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    Baseplate Flange
                  </button>
                </div>
              </div>
            </div>

            {/* Technical Specifications & Canadian Engineering Rationale (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Engineering Rationale Box */}
              <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-2.5">
                <div className="flex items-center space-x-2 text-xs font-bold text-white">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Geotechnical Soil Behavior &amp; Heave Prevention:</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {selectedSoil.engineeringRationale}
                </p>
              </div>

              {/* Technical Specifications Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block text-[10px] uppercase font-mono">Anchorage Method</span>
                  <span className="text-xs font-bold text-white block mt-1 leading-snug">
                    {selectedSoil.technicalSpecs.anchorageMethod}
                  </span>
                </div>

                <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block text-[10px] uppercase font-mono">Frost Heave Protection</span>
                  <span className="text-xs font-bold text-sky-400 block mt-1 leading-snug">
                    {selectedSoil.technicalSpecs.heaveProtection}
                  </span>
                </div>

                <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block text-[10px] uppercase font-mono">Drainage &amp; Permeability</span>
                  <span className="text-xs font-bold text-neutral-200 block mt-1 leading-snug">
                    {selectedSoil.technicalSpecs.drainageCharacteristic}
                  </span>
                </div>

                <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block text-[10px] uppercase font-mono">Sub-Zero Thermal Stability</span>
                  <span className="text-xs font-bold text-emerald-400 block mt-1 leading-snug">
                    {selectedSoil.technicalSpecs.subZeroStability}
                  </span>
                </div>
              </div>

              {/* Regional Municipal Guidance */}
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start space-x-3 text-xs text-amber-200">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 font-bold block mb-0.5">
                    {selectedProvince.name} Building Code Note:
                  </strong>
                  <span>{selectedProvince.permitRequirementNote}</span>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (onScrollToCalculator) onScrollToCalculator();
                  }}
                  className="w-full sm:w-1/2 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black rounded-xl text-xs shadow-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Apply to Cost Calculator →</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onScrollToSitePlanner) onScrollToSitePlanner();
                  }}
                  className="w-full sm:w-1/2 py-3 bg-neutral-950 hover:bg-neutral-800 text-white border border-neutral-700 font-bold rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Mountain className="w-3.5 h-3.5 text-sky-400" />
                  <span>Configure on Site Map Planner</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
