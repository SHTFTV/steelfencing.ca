import React, { useState } from 'react';
import {
  FenceConfig,
  FenceStyleId,
  FenceColorId,
  GateType,
  PostMountType,
  SecurityPackageType,
} from '../types';
import { FENCE_PRODUCTS, FENCE_COLORS, GATE_OPTIONS, SECURITY_PACKAGES } from '../data/products';
import { TEXTURE_DETAIL_DATA } from '../data/textureDetailData';
import { MaterialTextureViewer } from './MaterialTextureViewer';
import { ARBackyardModal } from './ARBackyardModal';
import { CANADIAN_PROVINCES } from '../data/climateData';
import { calculateEstimate, formatCAD } from '../utils/calculator';
import { generateFenceEstimatePDF } from '../utils/pdfGenerator';
import {
  Sparkles,
  Sliders,
  Maximize2,
  Download,
  Check,
  ShieldAlert,
  Snowflake,
  Sun,
  Moon,
  Home,
  CheckCircle,
  HelpCircle,
  FileSpreadsheet,
  ArrowRight,
  Info,
  Calculator,
  Zap,
  Radio,
  Lock,
  Camera,
  Layers,
  ZoomIn,
  Eye,
  Droplets,
  Gauge,
} from 'lucide-react';

interface InteractiveVisualizerProps {
  onOpenQuote: (config: FenceConfig) => void;
  config?: FenceConfig;
  onChangeConfig?: (config: FenceConfig) => void;
  onScrollToCalculator?: () => void;
}

export const InteractiveVisualizer: React.FC<InteractiveVisualizerProps> = ({
  onOpenQuote,
  config: externalConfig,
  onChangeConfig: externalOnChangeConfig,
  onScrollToCalculator,
}) => {
  const [internalConfig, setInternalConfig] = useState<FenceConfig>({
    style: 'nordic-slat',
    heightFeet: 6,
    linearFeet: 120,
    color: 'obsidian-black',
    materialGrade: 'standard',
    postMount: 'deep-frost-ground',
    slatSpacing: 'zero-gap',
    includeGate: 'pedestrian-single',
    gateWidthFeet: 4,
    gateAutomation: false,
    securityPackage: 'none',
    solarBackupPower: false,
    integratedLedLighting: true,
    province: 'ON',
    installationType: 'turnkey-pro',
  });

  const config = externalConfig || internalConfig;
  const setConfig = (newCfg: FenceConfig) => {
    if (externalOnChangeConfig) {
      externalOnChangeConfig(newCfg);
    } else {
      setInternalConfig(newCfg);
    }
  };

  // Visualizer Environmental Backdrop state
  const [activeBackdrop, setActiveBackdrop] = useState<'day-lawn' | 'snow-winter' | 'night-led' | 'architectural-concrete'>('day-lawn');
  const [isTextureModalOpen, setIsTextureModalOpen] = useState(false);
  const [isARModalOpen, setIsARModalOpen] = useState(false);
  const [showCanvasTextureLoupe, setShowCanvasTextureLoupe] = useState(true);

  // Selected Province data lookup
  const selectedProvince = CANADIAN_PROVINCES.find((p) => p.code === config.province) || CANADIAN_PROVINCES[0];

  // Selected Product lookup
  const selectedProduct = FENCE_PRODUCTS.find((p) => p.id === config.style) || FENCE_PRODUCTS[0];

  // Real-time calculation
  const estimate = calculateEstimate(config);

  const handleStyleChange = (styleId: FenceStyleId) => {
    const prod = FENCE_PRODUCTS.find((p) => p.id === styleId);
    let newH = config.heightFeet;
    if (prod && !prod.heightsAvailable.includes(newH)) {
      newH = prod.heightsAvailable[0];
    }
    setConfig({ ...config, style: styleId, heightFeet: newH });
  };

  const getColorHex = (colorId: FenceColorId) => {
    const found = FENCE_COLORS.find((c) => c.id === colorId);
    return found ? found.hex : '#171717';
  };

  return (
    <section id="visualizer" className="py-16 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive 3D Architectural Visualizer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
              Custom Engineered Fence Visualizer
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Configure Canadian steel profiles, wrought iron, marine aluminum, automatic barrier boom gates, and access security systems in real-time with sub-zero engineering calculations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsARModalOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-extrabold rounded-xl border border-amber-400/80 flex items-center space-x-2 transition-all cursor-pointer shadow-lg shadow-amber-500/10 group"
              title="Preview this fence at 1:1 scale in your backyard using your mobile phone camera"
            >
              <Camera className="w-4 h-4 text-neutral-950 group-hover:scale-110 transition-transform" />
              <span>AR Backyard Preview</span>
              <span className="bg-neutral-950 text-amber-400 text-[9px] font-mono px-1.5 py-0.5 rounded-md uppercase font-bold tracking-tight">
                Mobile Camera
              </span>
            </button>
            <button
              onClick={() => setIsTextureModalOpen(true)}
              className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl border border-amber-500/40 hover:border-amber-500 flex items-center space-x-2 transition-all cursor-pointer shadow-sm group"
            >
              <ZoomIn className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Material Texture Detail (Zoom)</span>
            </button>
            <button
              onClick={() => generateFenceEstimatePDF(config)}
              className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl border border-neutral-700 flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Export PDF Quote</span>
            </button>
          </div>
        </div>

        {/* Master Visualizer Grid: Left Preview Canvas (7 cols) + Right Controls (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Canvas & Specification Card */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Visualizer Stage Container */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative">
              
              {/* Top Visualizer Toolbar (Environment Switches) */}
              <div className="p-3 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-mono text-neutral-300 font-bold">
                    {selectedProduct.name} • {config.heightFeet}ft • {config.linearFeet} LF
                  </span>
                  <button
                    onClick={() => setIsTextureModalOpen(true)}
                    className="hidden sm:inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[11px] font-mono font-bold transition-colors cursor-pointer"
                    title="Inspect high-resolution finish texture"
                  >
                    <ZoomIn className="w-3 h-3" />
                    <span>Texture Zoom: {TEXTURE_DETAIL_DATA[config.color]?.sheenLevel.split(' ')[0]}</span>
                  </button>
                  <button
                    onClick={() => setIsARModalOpen(true)}
                    className="hidden md:inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/40 text-[11px] font-mono font-bold transition-colors cursor-pointer"
                    title="Open Mobile Camera Augmented Reality (AR) Backyard Preview"
                  >
                    <Camera className="w-3 h-3" />
                    <span>AR Yard View (1:1)</span>
                  </button>
                </div>

                <div className="flex items-center space-x-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
                  <button
                    onClick={() => setActiveBackdrop('day-lawn')}
                    title="Summer Day Lawn"
                    className={`p-1.5 rounded flex items-center space-x-1 cursor-pointer transition-all ${
                      activeBackdrop === 'day-lawn' ? 'bg-emerald-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Summer</span>
                  </button>
                  <button
                    onClick={() => setActiveBackdrop('snow-winter')}
                    title="Canadian Sub-Zero Winter (-30°C)"
                    className={`p-1.5 rounded flex items-center space-x-1 cursor-pointer transition-all ${
                      activeBackdrop === 'snow-winter' ? 'bg-sky-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Snowflake className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Snow -30°C</span>
                  </button>
                  <button
                    onClick={() => setActiveBackdrop('night-led')}
                    title="Nocturnal LED Backlighting"
                    className={`p-1.5 rounded flex items-center space-x-1 cursor-pointer transition-all ${
                      activeBackdrop === 'night-led' ? 'bg-indigo-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Night LED</span>
                  </button>
                  <button
                    onClick={() => setActiveBackdrop('architectural-concrete')}
                    title="Modern Concrete Patio"
                    className={`p-1.5 rounded flex items-center space-x-1 cursor-pointer transition-all ${
                      activeBackdrop === 'architectural-concrete' ? 'bg-neutral-700 text-white font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Patio</span>
                  </button>
                </div>
              </div>

              {/* Interactive Visualizer Canvas Area */}
              <div
                className={`relative h-80 sm:h-96 w-full flex flex-col justify-end p-4 transition-colors duration-500 overflow-hidden ${
                  activeBackdrop === 'day-lawn'
                    ? 'bg-gradient-to-b from-sky-900 via-sky-800/60 to-emerald-950'
                    : activeBackdrop === 'snow-winter'
                    ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-sky-950'
                    : activeBackdrop === 'night-led'
                    ? 'bg-gradient-to-b from-neutral-950 via-slate-950 to-neutral-950'
                    : 'bg-gradient-to-b from-stone-900 via-stone-800 to-neutral-950'
                }`}
              >
                {/* On-Canvas Micro-Texture Detail Loupe Overlay */}
                {showCanvasTextureLoupe && (
                  <div className="absolute top-3 right-3 z-30 bg-neutral-950/90 backdrop-blur-md border border-neutral-700/80 rounded-2xl p-2.5 shadow-2xl w-48 sm:w-56 transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-1.5 text-[10px] font-mono font-bold text-amber-400">
                        <ZoomIn className="w-3 h-3" />
                        <span>Texture Loupe (5x Macro)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => setIsTextureModalOpen(true)}
                          className="p-1 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded text-[9px] font-bold cursor-pointer"
                          title="Open Fullscreen Macro Zoom"
                        >
                          <Maximize2 className="w-3 h-3 text-amber-400" />
                        </button>
                        <button
                          onClick={() => setShowCanvasTextureLoupe(false)}
                          className="px-1 py-0.5 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded text-[10px] font-mono cursor-pointer"
                          title="Hide Mini Loupe"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Mini Macro Texture Preview Box */}
                    <div
                      onClick={() => setIsTextureModalOpen(true)}
                      className="relative h-16 sm:h-20 rounded-xl overflow-hidden border border-neutral-800 cursor-pointer group shadow-inner"
                      title="Click to open interactive 50x texture zoom"
                    >
                      <div
                        className="w-full h-full transition-transform group-hover:scale-105"
                        style={{
                          backgroundColor: getColorHex(config.color),
                          backgroundImage:
                            config.color === 'obsidian-black'
                              ? 'radial-gradient(#333333 1px, transparent 1px)'
                              : config.color === 'architectural-charcoal'
                              ? 'radial-gradient(#8892b0 1.5px, transparent 1.5px), radial-gradient(#ccd6f6 1px, transparent 1px)'
                              : config.color === 'walnut-woodgrain'
                              ? 'repeating-linear-gradient(45deg, #4a2c16, #4a2c16 6px, #3a1e0b 6px, #3a1e0b 12px)'
                              : config.color === 'corten-rust'
                              ? 'radial-gradient(#b55428 2px, transparent 2px), radial-gradient(#5e260c 3px, transparent 3px)'
                              : config.color === 'frost-white'
                              ? 'radial-gradient(#cbd5e1 1px, transparent 1px)'
                              : 'repeating-linear-gradient(60deg, #71717a, #71717a 8px, #a1a1aa 8px, #a1a1aa 16px)',
                          backgroundSize: '10px 10px',
                        }}
                      ></div>

                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent flex items-end p-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                        <span className="text-[9px] font-mono text-neutral-200 truncate font-semibold">
                          {TEXTURE_DETAIL_DATA[config.color]?.name}
                        </span>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-neutral-950/60 transition-opacity">
                        <span className="text-[9px] font-bold text-amber-400 font-mono bg-neutral-900/90 px-2 py-0.5 rounded-md border border-amber-500/40">
                          Inspect 50x Zoom ↗
                        </span>
                      </div>
                    </div>

                    <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-neutral-400">
                      <span>{TEXTURE_DETAIL_DATA[config.color]?.sheenLevel.split(' ')[0]}</span>
                      <span className="text-amber-400 font-bold">{TEXTURE_DETAIL_DATA[config.color]?.glossUnits60} GU @ 60°</span>
                    </div>
                  </div>
                )}

                {/* Show Loupe Toggle Button if closed */}
                {!showCanvasTextureLoupe && (
                  <button
                    onClick={() => setShowCanvasTextureLoupe(true)}
                    className="absolute top-3 right-3 z-30 bg-neutral-950/85 hover:bg-neutral-900 border border-neutral-700 px-2.5 py-1.5 rounded-xl text-[10px] font-mono font-bold text-amber-400 flex items-center space-x-1.5 shadow-xl transition-all cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Texture Loupe</span>
                  </button>
                )}

                {/* Background Details */}
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                  {activeBackdrop === 'snow-winter' && (
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-30 animate-pulse"></div>
                  )}
                  {activeBackdrop === 'night-led' && (
                    <div className="absolute top-10 left-1/4 w-48 h-48 bg-amber-400/10 blur-3xl rounded-full"></div>
                  )}
                </div>

                {/* Floating AR Mobile Camera Trigger on Canvas */}
                <button
                  onClick={() => setIsARModalOpen(true)}
                  className="absolute bottom-20 left-3 z-20 bg-neutral-950/85 hover:bg-neutral-900 border border-amber-500/50 hover:border-amber-400 px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-bold text-amber-400 flex items-center space-x-1.5 shadow-xl transition-all cursor-pointer backdrop-blur-md group"
                  title="Preview this fence at 1:1 scale in your backyard using your smartphone camera"
                >
                  <Camera className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>AR Backyard Camera</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </button>

                {/* Ground Plane */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-16 border-t ${
                    activeBackdrop === 'snow-winter'
                      ? 'bg-gradient-to-t from-slate-200 to-slate-100 border-slate-300'
                      : activeBackdrop === 'day-lawn'
                      ? 'bg-gradient-to-t from-emerald-900 to-emerald-800 border-emerald-700'
                      : activeBackdrop === 'night-led'
                      ? 'bg-neutral-900 border-neutral-800'
                      : 'bg-stone-800 border-stone-700'
                  }`}
                >
                  <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-full text-[10px] text-neutral-400">
                    <span className="font-mono">Frost Line Spec: {selectedProvince.frostDepthInches}&quot; Deep ({selectedProvince.name})</span>
                    <span className="font-mono">{selectedProduct.specs.steelGauge.split('/')[0]}</span>
                  </div>
                </div>

                {/* SVG Rendered Interactive Steel/Iron/Aluminum Structure */}
                <div className="relative z-10 w-full mb-6">
                  <svg
                    viewBox="0 0 800 240"
                    className="w-full h-48 sm:h-60 drop-shadow-2xl"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="steelPostGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={getColorHex(config.color)} stopOpacity="1" />
                        <stop offset="50%" stopColor="#4a4a4a" stopOpacity="0.8" />
                        <stop offset="100%" stopColor={getColorHex(config.color)} stopOpacity="1" />
                      </linearGradient>

                      <linearGradient id="ledGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                      </linearGradient>

                      <linearGradient id="barrierArmStripes" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="25%" stopColor="#ffffff" />
                        <stop offset="50%" stopColor="#ef4444" />
                        <stop offset="75%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>

                    {(() => {
                      const fenceHeightPx = 130 + (config.heightFeet - 4) * 15;
                      const groundY = 210;
                      const fenceTopY = groundY - fenceHeightPx;
                      const posts = [60, 220, 380, 540, 700];

                      return (
                        <g>
                          {/* Fence Panels Between Posts */}
                          {posts.slice(0, -1).map((xPos, idx) => {
                            const nextX = posts[idx + 1];
                            const panelWidth = nextX - xPos - 12;
                            const isGateSection = idx === 3 && config.includeGate !== 'none';

                            return (
                              <g key={`panel-${idx}`}>
                                {/* If Gate Panel */}
                                {isGateSection ? (
                                  <g>
                                    {/* 1. Single Pedestrian Walk Gate */}
                                    {config.includeGate === 'pedestrian-single' && (
                                      <g>
                                        <rect
                                          x={xPos + 10}
                                          y={fenceTopY + 5}
                                          width={panelWidth - 4}
                                          height={fenceHeightPx - 8}
                                          fill="none"
                                          stroke={getColorHex(config.color)}
                                          strokeWidth="3.5"
                                          rx="2"
                                        />
                                        <circle cx={xPos + 22} cy={fenceTopY + fenceHeightPx / 2} r="3.5" fill="#fbbf24" />
                                        <rect
                                          x={xPos + 14}
                                          y={fenceTopY + 10}
                                          width={panelWidth - 12}
                                          height={fenceHeightPx - 18}
                                          fill={getColorHex(config.color)}
                                          opacity="0.85"
                                        />
                                        <text x={xPos + panelWidth / 2} y={groundY - 10} fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle">
                                          PEDESTRIAN GATE
                                        </text>
                                      </g>
                                    )}

                                    {/* 2. Double Driveway Swing Gate */}
                                    {config.includeGate === 'double-driveway' && (
                                      <g>
                                        <rect x={xPos + 8} y={fenceTopY + 6} width={panelWidth / 2 - 4} height={fenceHeightPx - 10} fill="none" stroke={getColorHex(config.color)} strokeWidth="3" rx="2" />
                                        <rect x={xPos + panelWidth / 2 + 2} y={fenceTopY + 6} width={panelWidth / 2 - 4} height={fenceHeightPx - 10} fill="none" stroke={getColorHex(config.color)} strokeWidth="3" rx="2" />
                                        <line x1={xPos + panelWidth / 2} y1={fenceTopY + 6} x2={xPos + panelWidth / 2} y2={groundY - 4} stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 2" />
                                        <text x={xPos + panelWidth / 2} y={groundY - 10} fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle">
                                          DOUBLE DRIVEWAY SWING
                                        </text>
                                      </g>
                                    )}

                                    {/* 3. Cantilever Sliding Gate */}
                                    {config.includeGate === 'cantilever-sliding' && (
                                      <g>
                                        <rect x={xPos + 6} y={fenceTopY + 4} width={panelWidth} height={fenceHeightPx - 12} fill="none" stroke={getColorHex(config.color)} strokeWidth="3.5" rx="2" />
                                        <line x1={xPos + 6} y1={fenceTopY + 4} x2={xPos + 6 + panelWidth} y2={groundY - 8} stroke={getColorHex(config.color)} strokeWidth="2" opacity="0.4" />
                                        {/* Motor Unit */}
                                        <rect x={nextX - 22} y={groundY - 30} width="16" height="24" fill="#f59e0b" rx="2" />
                                        <text x={xPos + panelWidth / 2} y={groundY - 12} fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle">
                                          TRACKLESS CANTILEVER
                                        </text>
                                      </g>
                                    )}

                                    {/* 4. Automatic Boom Barrier Arm */}
                                    {config.includeGate === 'barrier-arm-automatic' && (
                                      <g>
                                        {/* Motorized Barrier Cabinet */}
                                        <rect x={xPos + 8} y={groundY - 65} width="24" height="60" fill="#f59e0b" rx="3" stroke="#d97706" strokeWidth="1.5" />
                                        <circle cx={xPos + 20} cy={groundY - 50} r="6" fill="#171717" />
                                        <circle cx={xPos + 20} cy={groundY - 50} r="3" fill="#ef4444" />
                                        {/* Striped Boom Arm */}
                                        <rect x={xPos + 20} y={groundY - 52} width={panelWidth - 10} height="7" fill="url(#barrierArmStripes)" rx="2" stroke="#333" strokeWidth="0.5" />
                                        {/* Receiving Catch Post */}
                                        <rect x={nextX - 16} y={groundY - 58} width="8" height="54" fill="#71717a" rx="1" />
                                        <text x={xPos + panelWidth / 2 + 10} y={groundY - 14} fill="#ef4444" fontSize="8" fontWeight="bold" textAnchor="middle">
                                          AUTO BOOM BARRIER (1.5s)
                                        </text>
                                      </g>
                                    )}

                                    {/* 5. Telescopic Space-Saving Sliding Gate */}
                                    {config.includeGate === 'telescopic-sliding' && (
                                      <g>
                                        <rect x={xPos + 8} y={fenceTopY + 4} width={panelWidth * 0.55} height={fenceHeightPx - 10} fill="none" stroke={getColorHex(config.color)} strokeWidth="3" rx="1" />
                                        <rect x={xPos + 8 + panelWidth * 0.45} y={fenceTopY + 8} width={panelWidth * 0.52} height={fenceHeightPx - 14} fill="none" stroke="#f59e0b" strokeWidth="2.5" rx="1" />
                                        <text x={xPos + panelWidth / 2} y={groundY - 10} fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle">
                                          TELESCOPIC SLIDING (2X SPEED)
                                        </text>
                                      </g>
                                    )}

                                    {/* 6. High-Speed Bi-Fold Speed Gate */}
                                    {config.includeGate === 'bi-fold-speed-gate' && (
                                      <g>
                                        <rect x={xPos + 8} y={fenceTopY + 6} width={panelWidth * 0.46} height={fenceHeightPx - 12} fill="none" stroke={getColorHex(config.color)} strokeWidth="3" />
                                        <rect x={xPos + panelWidth * 0.52} y={fenceTopY + 6} width={panelWidth * 0.46} height={fenceHeightPx - 12} fill="none" stroke={getColorHex(config.color)} strokeWidth="3" />
                                        <circle cx={xPos + panelWidth * 0.5} cy={fenceTopY + 6} r="3" fill="#f59e0b" />
                                        <circle cx={xPos + panelWidth * 0.5} cy={groundY - 6} r="3" fill="#f59e0b" />
                                        <text x={xPos + panelWidth / 2} y={groundY - 10} fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle">
                                          BI-FOLD SPEED GATE (3.5s)
                                        </text>
                                      </g>
                                    )}

                                    {/* 7. Arched Wrought Iron Estate Gate */}
                                    {config.includeGate === 'wrought-iron-estate-gate' && (
                                      <g>
                                        <path
                                          d={`M ${xPos + 8} ${groundY - 6} L ${xPos + 8} ${fenceTopY + 15} Q ${xPos + panelWidth / 2} ${fenceTopY - 12} ${xPos + panelWidth - 4} ${fenceTopY + 15} L ${xPos + panelWidth - 4} ${groundY - 6} Z`}
                                          fill="none"
                                          stroke={getColorHex(config.color)}
                                          strokeWidth="3.5"
                                        />
                                        {Array.from({ length: 9 }).map((_, i) => (
                                          <line
                                            key={`estate-bar-${i}`}
                                            x1={xPos + 14 + i * ((panelWidth - 20) / 8)}
                                            y1={fenceTopY + 10}
                                            x2={xPos + 14 + i * ((panelWidth - 20) / 8)}
                                            y2={groundY - 8}
                                            stroke={getColorHex(config.color)}
                                            strokeWidth="2"
                                          />
                                        ))}
                                        <text x={xPos + panelWidth / 2} y={groundY - 10} fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle">
                                          ARCHED ESTATE GATE
                                        </text>
                                      </g>
                                    )}
                                  </g>
                                ) : (
                                  /* Standard Fence Panels */
                                  <g>
                                    {/* 1. Nordic Horizontal Slat */}
                                    {config.style === 'nordic-slat' && (
                                      Array.from({ length: Math.round(config.heightFeet * 2.2) }).map((_, sIdx) => {
                                        const slatH = 8;
                                        const spacing = config.slatSpacing === 'zero-gap' ? 1.5 : config.slatSpacing === 'quarter-inch' ? 4 : 7;
                                        const yOffset = fenceTopY + 8 + sIdx * (slatH + spacing);
                                        if (yOffset + slatH > groundY - 4) return null;
                                        return (
                                          <rect
                                            key={`slat-${idx}-${sIdx}`}
                                            x={xPos + 10}
                                            y={yOffset}
                                            width={panelWidth}
                                            height={slatH}
                                            fill={getColorHex(config.color)}
                                            stroke={config.color === 'obsidian-black' ? '#2d2d2d' : '#444'}
                                            strokeWidth="0.5"
                                            rx="1"
                                          />
                                        );
                                      })
                                    )}

                                    {/* 2. Corrugated Heavy Privacy */}
                                    {config.style === 'corrugated-privacy' && (
                                      <g>
                                        <rect x={xPos + 10} y={fenceTopY + 4} width={panelWidth} height={fenceHeightPx - 8} fill={getColorHex(config.color)} stroke="#444" strokeWidth="1" />
                                        {Array.from({ length: 10 }).map((_, cIdx) => (
                                          <line key={`corr-${cIdx}`} x1={xPos + 10 + cIdx * (panelWidth / 9)} y1={fenceTopY + 4} x2={xPos + 10 + cIdx * (panelWidth / 9)} y2={groundY - 4} stroke="#000000" strokeWidth="2" opacity="0.35" />
                                        ))}
                                      </g>
                                    )}

                                    {/* 3. Titan Vertical Tongue-and-Groove */}
                                    {config.style === 'steel-vertical-tg' && (
                                      <g>
                                        <rect x={xPos + 10} y={fenceTopY + 2} width={panelWidth} height={fenceHeightPx - 4} fill={getColorHex(config.color)} stroke="#555" strokeWidth="1" />
                                        <rect x={xPos + 8} y={fenceTopY - 2} width={panelWidth + 4} height="5" fill={getColorHex(config.color)} stroke="#333" strokeWidth="0.5" />
                                        {Array.from({ length: 14 }).map((_, vIdx) => (
                                          <line key={`vtg-${vIdx}`} x1={xPos + 10 + vIdx * (panelWidth / 13)} y1={fenceTopY + 3} x2={xPos + 10 + vIdx * (panelWidth / 13)} y2={groundY - 2} stroke="#111" strokeWidth="1.5" opacity="0.45" />
                                        ))}
                                      </g>
                                    )}

                                    {/* 4. SonusShield Acoustic Sound Barrier */}
                                    {config.style === 'acoustic-sound' && (
                                      <g>
                                        <rect x={xPos + 10} y={fenceTopY + 2} width={panelWidth} height={fenceHeightPx - 4} fill={getColorHex(config.color)} stroke="#555" strokeWidth="2" />
                                        <line x1={xPos + 10} y1={fenceTopY + fenceHeightPx / 2} x2={xPos + 10 + panelWidth} y2={fenceTopY + fenceHeightPx / 2} stroke="#222" strokeWidth="2" />
                                        <text x={xPos + panelWidth / 2} y={fenceTopY + fenceHeightPx / 2 + 3} fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">
                                          STC 32 ACOUSTIC SOUND ABSORPTION
                                        </text>
                                      </g>
                                    )}

                                    {/* 5. Highland Ornamental Steel Security */}
                                    {config.style === 'highland-ornamental' && (
                                      <g>
                                        <rect x={xPos + 10} y={fenceTopY + 14} width={panelWidth} height="5" fill={getColorHex(config.color)} />
                                        <rect x={xPos + 10} y={groundY - 16} width={panelWidth} height="5" fill={getColorHex(config.color)} />
                                        {Array.from({ length: 11 }).map((_, pIdx) => {
                                          const picketX = xPos + 14 + pIdx * (panelWidth / 11);
                                          return (
                                            <g key={`picket-${pIdx}`}>
                                              <rect x={picketX} y={fenceTopY + 6} width="4" height={fenceHeightPx - 16} fill={getColorHex(config.color)} />
                                              <polygon points={`${picketX - 1},${fenceTopY + 6} ${picketX + 2},${fenceTopY - 2} ${picketX + 5},${fenceTopY + 6}`} fill={getColorHex(config.color)} />
                                            </g>
                                          );
                                        })}
                                      </g>
                                    )}

                                    {/* 6. Baroque Estate Ornamental Iron */}
                                    {config.style === 'baroque-ornamental-iron' && (
                                      <g>
                                        <rect x={xPos + 10} y={fenceTopY + 8} width={panelWidth} height="4" fill={getColorHex(config.color)} />
                                        <rect x={xPos + 10} y={fenceTopY + 28} width={panelWidth} height="4" fill={getColorHex(config.color)} />
                                        <rect x={xPos + 10} y={groundY - 16} width={panelWidth} height="4" fill={getColorHex(config.color)} />
                                        {Array.from({ length: 9 }).map((_, rIdx) => {
                                          const ringX = xPos + 18 + rIdx * (panelWidth / 9);
                                          return (
                                            <circle key={`ring-${rIdx}`} cx={ringX} cy={fenceTopY + 18} r="6" fill="none" stroke={getColorHex(config.color)} strokeWidth="1.8" />
                                          );
                                        })}
                                        {Array.from({ length: 11 }).map((_, pIdx) => {
                                          const picketX = xPos + 14 + pIdx * (panelWidth / 11);
                                          return (
                                            <g key={`baroque-p-${pIdx}`}>
                                              <rect x={picketX} y={fenceTopY + 4} width="4" height={fenceHeightPx - 14} fill={getColorHex(config.color)} />
                                              <polygon points={`${picketX - 1},${fenceTopY + 4} ${picketX + 2},${fenceTopY - 3} ${picketX + 5},${fenceTopY + 4}`} fill="#fbbf24" />
                                            </g>
                                          );
                                        })}
                                      </g>
                                    )}

                                    {/* 7. Heritage Hand-Forged Wrought Iron */}
                                    {config.style === 'wrought-iron-heritage' && (
                                      <g>
                                        <rect x={xPos + 10} y={fenceTopY + 10} width={panelWidth} height="5" fill={getColorHex(config.color)} />
                                        <rect x={xPos + 10} y={groundY - 16} width={panelWidth} height="5" fill={getColorHex(config.color)} />
                                        {Array.from({ length: 10 }).map((_, pIdx) => {
                                          const picketX = xPos + 14 + pIdx * (panelWidth / 10);
                                          return (
                                            <g key={`wrought-${pIdx}`}>
                                              <rect x={picketX} y={fenceTopY + 4} width="5" height={fenceHeightPx - 14} fill={getColorHex(config.color)} />
                                              {/* Forged Scroll / Spear Finial */}
                                              <polygon points={`${picketX - 2},${fenceTopY + 4} ${picketX + 2.5},${fenceTopY - 5} ${picketX + 7},${fenceTopY + 4}`} fill={getColorHex(config.color)} />
                                              {pIdx % 2 === 0 && (
                                                <circle cx={picketX + 2.5} cy={fenceTopY + fenceHeightPx / 2} r="4" fill="none" stroke={getColorHex(config.color)} strokeWidth="2" />
                                              )}
                                            </g>
                                          );
                                        })}
                                      </g>
                                    )}

                                    {/* 8. AeroShield Marine 6005-T5 Aluminum */}
                                    {config.style === 'aero-aluminum-marine' && (
                                      <g>
                                        <rect x={xPos + 10} y={fenceTopY + 6} width={panelWidth} height="6" fill={getColorHex(config.color)} rx="1" />
                                        <rect x={xPos + 10} y={groundY - 14} width={panelWidth} height="6" fill={getColorHex(config.color)} rx="1" />
                                        {Array.from({ length: 12 }).map((_, pIdx) => {
                                          const picketX = xPos + 13 + pIdx * (panelWidth / 12);
                                          return (
                                            <rect key={`alum-${pIdx}`} x={picketX} y={fenceTopY + 8} width="3.5" height={fenceHeightPx - 20} fill={getColorHex(config.color)} rx="0.5" />
                                          );
                                        })}
                                      </g>
                                    )}

                                    {/* 9. Solis Aluminum Louvers (45-degree angle) */}
                                    {config.style === 'aluminum-louver-privacy' && (
                                      Array.from({ length: Math.round(config.heightFeet * 2.8) }).map((_, lIdx) => {
                                        const yOffset = fenceTopY + 6 + lIdx * 9;
                                        if (yOffset > groundY - 8) return null;
                                        return (
                                          <g key={`louver-${idx}-${lIdx}`}>
                                            <line x1={xPos + 10} y1={yOffset} x2={xPos + 10 + panelWidth} y2={yOffset + 4} stroke={getColorHex(config.color)} strokeWidth="3.5" strokeLinecap="round" />
                                          </g>
                                        );
                                      })
                                    )}

                                    {/* 10. FortisMax Industrial Security */}
                                    {config.style === 'fortis-industrial' && (
                                      <g>
                                        <rect x={xPos + 10} y={fenceTopY + 12} width={panelWidth} height="6" fill={getColorHex(config.color)} />
                                        <rect x={xPos + 10} y={groundY - 14} width={panelWidth} height="6" fill={getColorHex(config.color)} />
                                        {Array.from({ length: 12 }).map((_, fIdx) => {
                                          const picketX = xPos + 12 + fIdx * (panelWidth / 12);
                                          return (
                                            <g key={`fortis-${fIdx}`}>
                                              <rect x={picketX} y={fenceTopY - 4} width="5" height={fenceHeightPx} fill={getColorHex(config.color)} />
                                              <polygon points={`${picketX - 1},${fenceTopY - 4} ${picketX + 2.5},${fenceTopY - 12} ${picketX + 6},${fenceTopY - 4}`} fill="#ef4444" />
                                            </g>
                                          );
                                        })}
                                      </g>
                                    )}

                                    {/* 11. Aegis-358 High Security Prison Wire Mesh */}
                                    {config.style === 'steel-358-security' && (
                                      <g>
                                        <rect x={xPos + 10} y={fenceTopY + 2} width={panelWidth} height={fenceHeightPx - 4} fill="#0f172a" opacity="0.4" stroke={getColorHex(config.color)} strokeWidth="2" />
                                        {/* Vertical dense wires */}
                                        {Array.from({ length: 24 }).map((_, wIdx) => (
                                          <line key={`w-v-${wIdx}`} x1={xPos + 10 + wIdx * (panelWidth / 23)} y1={fenceTopY + 2} x2={xPos + 10 + wIdx * (panelWidth / 23)} y2={groundY - 2} stroke={getColorHex(config.color)} strokeWidth="1" opacity="0.8" />
                                        ))}
                                        {/* Horizontal cross wires */}
                                        {Array.from({ length: 14 }).map((_, hIdx) => (
                                          <line key={`w-h-${hIdx}`} x1={xPos + 10} y1={fenceTopY + 4 + hIdx * (fenceHeightPx / 14)} x2={xPos + 10 + panelWidth} y2={fenceTopY + 4 + hIdx * (fenceHeightPx / 14)} stroke={getColorHex(config.color)} strokeWidth="1" opacity="0.8" />
                                        ))}
                                      </g>
                                    )}

                                    {/* 12. Laser-Cut CNC Architectural Art */}
                                    {config.style === 'laser-art' && (
                                      <g>
                                        <rect x={xPos + 10} y={fenceTopY + 4} width={panelWidth} height={fenceHeightPx - 8} fill={getColorHex(config.color)} stroke="#666" strokeWidth="1.5" />
                                        {Array.from({ length: 8 }).map((_, aIdx) => (
                                          <circle
                                            key={`art-circle-${aIdx}`}
                                            cx={xPos + 22 + aIdx * 18}
                                            cy={fenceTopY + 25 + (aIdx % 3) * 28}
                                            r="7"
                                            fill={activeBackdrop === 'night-led' ? '#fbbf24' : '#1e293b'}
                                            opacity="0.75"
                                          />
                                        ))}
                                      </g>
                                    )}
                                  </g>
                                )}
                              </g>
                            );
                          })}

                          {/* Posts & Caps */}
                          {posts.map((xPos, pIdx) => (
                            <g key={`post-${pIdx}`}>
                              <rect x={xPos} y={groundY} width="10" height="28" fill="#404040" stroke="#171717" strokeWidth="0.5" opacity="0.6" />
                              <rect x={xPos} y={fenceTopY - 4} width="10" height={fenceHeightPx + 4} fill={getColorHex(config.color)} stroke="#555" strokeWidth="0.5" />
                              <rect x={xPos - 2} y={fenceTopY - 7} width="14" height="4" fill={getColorHex(config.color)} rx="1" />

                              {/* LED Integrated Cap Lighting */}
                              {config.integratedLedLighting && (
                                <g>
                                  <circle cx={xPos + 5} cy={fenceTopY - 5} r="2" fill="#fde047" />
                                  {(activeBackdrop === 'night-led' || activeBackdrop === 'snow-winter') && (
                                    <polygon
                                      points={`${xPos - 12},${fenceTopY + 30} ${xPos + 5},${fenceTopY - 4} ${xPos + 22},${fenceTopY + 30}`}
                                      fill="url(#ledGlow)"
                                      opacity="0.45"
                                    />
                                  )}
                                </g>
                              )}

                              {/* Security Hardware Indicators on Main Gate Post (pIdx === 3) */}
                              {pIdx === 3 && config.includeGate !== 'none' && (
                                <g>
                                  {/* Video Intercom Camera */}
                                  {config.securityPackage === 'smart-intercom-camera' && (
                                    <g>
                                      <rect x={xPos - 12} y={fenceTopY + 30} width="8" height="18" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" rx="1.5" />
                                      <circle cx={xPos - 8} cy={fenceTopY + 35} r="2" fill="#38bdf8" />
                                      <rect x={xPos - 10} y={fenceTopY + 40} width="4" height="5" fill="#f59e0b" />
                                    </g>
                                  )}

                                  {/* RFID Keypad / Loop Detector Mast */}
                                  {config.securityPackage === 'rfid-keypad-loop' && (
                                    <g>
                                      <rect x={xPos - 14} y={fenceTopY + 25} width="10" height="14" fill="#0f172a" stroke="#10b981" strokeWidth="1" rx="1" />
                                      <line x1={xPos - 10} y1={fenceTopY + 25} x2={xPos - 10} y2={fenceTopY + 12} stroke="#10b981" strokeWidth="1.5" />
                                      <circle cx={xPos - 10} cy={fenceTopY + 11} r="2" fill="#10b981" />
                                    </g>
                                  )}

                                  {/* Commercial High Security Suite (Warning Strobe + Laser Photo Eyes) */}
                                  {config.securityPackage === 'commercial-high-security' && (
                                    <g>
                                      {/* Strobe Light on top */}
                                      <polygon points={`${xPos + 2},${fenceTopY - 14} ${xPos + 8},${fenceTopY - 14} ${xPos + 10},${fenceTopY - 7} ${xPos},${fenceTopY - 7}`} fill="#ef4444" className="animate-pulse" />
                                      {/* Maglock on Gate Post */}
                                      <rect x={xPos + 10} y={fenceTopY + 15} width="12" height="6" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
                                    </g>
                                  )}

                                  {/* Solar Off-Grid Power Panel */}
                                  {config.solarBackupPower && (
                                    <g>
                                      <line x1={xPos + 5} y1={fenceTopY - 7} x2={xPos + 5} y2={fenceTopY - 24} stroke="#94a3b8" strokeWidth="1.5" />
                                      <polygon points={`${xPos - 10},${fenceTopY - 32} ${xPos + 20},${fenceTopY - 26} ${xPos + 18},${fenceTopY - 20} ${xPos - 12},${fenceTopY - 26}`} fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
                                    </g>
                                  )}
                                </g>
                              )}
                            </g>
                          ))}

                          {/* Linear Dimension Annotations */}
                          <line x1="60" y1={fenceTopY - 14} x2="700" y2={fenceTopY - 14} stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 2" />
                          <text x="380" y={fenceTopY - 18} fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">
                            {config.linearFeet} Linear Feet Section (~{(config.linearFeet * 0.3048).toFixed(1)}m)
                          </text>

                          {/* Height Indicator */}
                          <line x1="45" y1={fenceTopY} x2="45" y2={groundY} stroke="#38bdf8" strokeWidth="1" />
                          <text x="40" y={fenceTopY + fenceHeightPx / 2} fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="end">
                            {config.heightFeet}' High
                          </text>
                        </g>
                      );
                    })()}
                  </svg>
                </div>
              </div>

              {/* Bottom Quick Feature Highlights */}
              <div className="p-4 bg-neutral-950 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-t border-neutral-800">
                <div>
                  <span className="text-neutral-400 block text-[11px]">Wind Load Rating</span>
                  <span className="font-bold text-white">{selectedProduct.specs.windLoadKmH} km/h Gusts</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Anti-Rust Warranty</span>
                  <span className="font-bold text-amber-400">{selectedProduct.specs.warrantyYears}-Yr Direct Coverage</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Frost Depth Req</span>
                  <span className="font-bold text-sky-400">{selectedProvince.frostDepthInches}&quot; ({selectedProvince.name})</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Material Family</span>
                  <span className="font-bold text-emerald-400 uppercase">{selectedProduct.materialFamily}</span>
                </div>
              </div>
            </div>

            {/* Bill of Materials (BOM) Quick Breakdown */}
            <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white">Itemized Bill of Materials (BOM)</h3>
                </div>
                <button
                  onClick={() => generateFenceEstimatePDF(config)}
                  className="px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-bold rounded-lg border border-amber-500/30 flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Spec</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800">
                  <span className="text-neutral-400 block">Pre-Fab Panels:</span>
                  <span className="text-sm font-bold text-white">{estimate.panelsCount} Modules</span>
                  <span className="text-[10px] text-neutral-500 block truncate">({config.style})</span>
                </div>
                <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800">
                  <span className="text-neutral-400 block">Structural Posts:</span>
                  <span className="text-sm font-bold text-white">{estimate.postsCount} Heavy Posts</span>
                  <span className="text-[10px] text-neutral-500 block">Galvalume Steel Core</span>
                </div>
                <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800">
                  <span className="text-neutral-400 block">Footing Depth:</span>
                  <span className="text-sm font-bold text-sky-400">{estimate.frostDepthRecommendedInches}&quot; Deep</span>
                  <span className="text-[10px] text-neutral-500 block">Anti-Frost Heave</span>
                </div>
                <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800">
                  <span className="text-neutral-400 block">Gate / Security:</span>
                  <span className="text-sm font-bold text-amber-400 truncate block">
                    {config.includeGate === 'none' ? 'None' : config.includeGate.replace(/-/g, ' ')}
                  </span>
                  <span className="text-[10px] text-neutral-500 block truncate">
                    {config.securityPackage !== 'none' ? config.securityPackage.replace(/-/g, ' ') : config.gateAutomation ? '+ Auto Motor' : 'Manual'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls & Live Quote Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl space-y-6">
              
              <div className="border-b border-neutral-800 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-white font-['Space_Grotesk']">
                    Configuration Engine
                  </h3>
                  <p className="text-xs text-neutral-400">All 12 Steel, Iron &amp; Aluminum Systems</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/30">
                  CAD $
                </span>
              </div>

              {/* 1. Fence Profile / Style */}
              <div>
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2">
                  1. Select Profile / Material Style
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                  {FENCE_PRODUCTS.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => handleStyleChange(prod.id)}
                      className={`p-2 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                        config.style === prod.id
                          ? 'bg-amber-500/10 border-amber-500 text-white shadow-md ring-1 ring-amber-500'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                      }`}
                    >
                      <div className="font-bold flex items-center justify-between">
                        <span className="truncate">{prod.name.split('™')[0]}</span>
                        {config.style === prod.id && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                      </div>
                      <span className="text-[10px] text-neutral-500 block mt-0.5 truncate">{prod.category}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Height Selection */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    2. Fence Height
                  </label>
                  <span className="text-xs text-amber-400 font-bold">
                    {config.heightFeet} Feet (~{(config.heightFeet * 0.3048).toFixed(1)}m)
                  </span>
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {selectedProduct.heightsAvailable.map((h) => (
                    <button
                      key={h}
                      onClick={() => setConfig({ ...config, heightFeet: h })}
                      className={`flex-1 py-2 rounded-lg font-bold text-xs border transition-all cursor-pointer ${
                        config.heightFeet === h
                          ? 'bg-amber-500 text-neutral-950 border-amber-500'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      {h} ft
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Perimeter Linear Footage */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    3. Linear Footage
                  </label>
                  <span className="text-xs text-white font-extrabold bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700">
                    {config.linearFeet} Linear Feet
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="450"
                  step="5"
                  value={config.linearFeet}
                  onChange={(e) => setConfig({ ...config, linearFeet: Number(e.target.value) })}
                  className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <button onClick={() => setConfig({ ...config, linearFeet: 60 })} className="hover:text-amber-400 cursor-pointer">
                    60 LF (Patio)
                  </button>
                  <button onClick={() => setConfig({ ...config, linearFeet: 140 })} className="hover:text-amber-400 cursor-pointer">
                    140 LF (Suburban)
                  </button>
                  <button onClick={() => setConfig({ ...config, linearFeet: 280 })} className="hover:text-amber-400 cursor-pointer">
                    280 LF (Acreage)
                  </button>
                </div>
              </div>

              {/* 4. Finish Color & Coating */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                    4. Architectural Coating & Color
                  </label>
                  <button
                    onClick={() => setIsTextureModalOpen(true)}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-bold flex items-center space-x-1 cursor-pointer transition-colors"
                  >
                    <ZoomIn className="w-3 h-3" />
                    <span>50x Texture Zoom</span>
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {FENCE_COLORS.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setConfig({ ...config, color: color.id })}
                      className={`p-2 rounded-xl border text-left transition-all flex items-center space-x-2 cursor-pointer ${
                        config.color === color.id
                          ? 'border-amber-500 bg-amber-500/10 text-white shadow-sm'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 border border-neutral-600 shadow-sm"
                        style={{ backgroundColor: color.hex }}
                      ></span>
                      <span className="text-[11px] font-semibold truncate">{color.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>

                {/* Coating Specification Quick Detail Bar */}
                <div className="mt-2.5 p-2 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 truncate">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span className="text-[11px] text-neutral-300 truncate font-mono">
                      {TEXTURE_DETAIL_DATA[config.color]?.name} • {TEXTURE_DETAIL_DATA[config.color]?.coatingType}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsTextureModalOpen(true)}
                    className="shrink-0 px-2 py-0.5 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold cursor-pointer transition-colors"
                  >
                    Inspect Detail ↗
                  </button>
                </div>
              </div>

              {/* 5. Gate & Barrier System */}
              <div className="space-y-3 pt-2 border-t border-neutral-800">
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                  5. Gate &amp; Barrier System
                </label>
                <select
                  value={config.includeGate}
                  onChange={(e) => setConfig({ ...config, includeGate: e.target.value as GateType })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {GATE_OPTIONS.map((gate) => (
                    <option key={gate.id} value={gate.id}>
                      {gate.name} ({gate.priceFormula})
                    </option>
                  ))}
                </select>

                {config.includeGate !== 'none' && config.includeGate !== 'barrier-arm-automatic' && (
                  <div className="flex items-center justify-between p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 text-xs">
                    <div>
                      <span className="font-bold text-white block">Sub-Zero Brushless Automation Motor</span>
                      <span className="text-[10px] text-neutral-400">-40°C Cold motor + 2 remotes &amp; safety photo-eyes (+$1,850)</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.gateAutomation}
                      onChange={(e) => setConfig({ ...config, gateAutomation: e.target.checked })}
                      className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* 6. Security Systems & Access Control */}
              <div className="space-y-3 pt-2 border-t border-neutral-800">
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                  6. Security Systems &amp; Smart Access
                </label>
                <select
                  value={config.securityPackage || 'none'}
                  onChange={(e) => setConfig({ ...config, securityPackage: e.target.value as SecurityPackageType })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {SECURITY_PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} {pkg.price > 0 ? `(+${pkg.price} CAD)` : '(Included)'}
                    </option>
                  ))}
                </select>

                {/* Solar Backup Power Kit */}
                {config.includeGate !== 'none' && (
                  <div className="flex items-center justify-between p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 text-xs">
                    <div>
                      <span className="font-bold text-white block">Off-Grid Solar Power Kit</span>
                      <span className="text-[10px] text-neutral-400">Twin AGM batteries + MPPT solar charge controller (+$680)</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.solarBackupPower}
                      onChange={(e) => setConfig({ ...config, solarBackupPower: e.target.checked })}
                      className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                    />
                  </div>
                )}

                {/* LED Lighting Toggle */}
                <div className="flex items-center justify-between p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 text-xs">
                  <div>
                    <span className="font-bold text-white block">Low-Voltage Post-Cap LEDs</span>
                    <span className="text-[10px] text-neutral-400">Warm white 2700K IP67 waterproof caps</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.integratedLedLighting}
                    onChange={(e) => setConfig({ ...config, integratedLedLighting: e.target.checked })}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Total Summary & CTA Button */}
              <div className="pt-4 border-t border-neutral-800 space-y-3">
                <div className="p-4 bg-gradient-to-br from-neutral-950 to-neutral-900 rounded-2xl border border-amber-500/30">
                  <div className="flex justify-between text-xs text-neutral-400 mb-1">
                    <span>Materials ({config.linearFeet} LF + Posts):</span>
                    <span className="text-white font-mono">{formatCAD(estimate.materialsCost)}</span>
                  </div>
                  {config.installationType === 'turnkey-pro' && (
                    <div className="flex justify-between text-xs text-neutral-400 mb-1">
                      <span>Certified Turnkey Labor:</span>
                      <span className="text-white font-mono">{formatCAD(estimate.installationCost)}</span>
                    </div>
                  )}
                  {estimate.gateCost > 0 && (
                    <div className="flex justify-between text-xs text-neutral-400 mb-1">
                      <span>Gate &amp; Barrier System:</span>
                      <span className="text-white font-mono">{formatCAD(estimate.gateCost)}</span>
                    </div>
                  )}
                  {estimate.securityCost > 0 && (
                    <div className="flex justify-between text-xs text-neutral-400 mb-1">
                      <span>Security &amp; Smart Access:</span>
                      <span className="text-white font-mono">{formatCAD(estimate.securityCost)}</span>
                    </div>
                  )}
                  {estimate.lightingCost > 0 && (
                    <div className="flex justify-between text-xs text-neutral-400 mb-1">
                      <span>LED Lighting System:</span>
                      <span className="text-white font-mono">{formatCAD(estimate.lightingCost)}</span>
                    </div>
                  )}

                  <div className="border-t border-neutral-800 pt-2 mt-2 flex justify-between items-baseline">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Estimated Project Total:
                    </span>
                    <div className="text-right">
                      <span className="text-2xl font-black text-white font-['Space_Grotesk']">
                        {formatCAD(estimate.totalBeforeTax)}
                      </span>
                      <span className="text-[10px] text-neutral-400 block">CAD Before Provincial Tax</span>
                    </div>
                  </div>
                </div>

                <button
                  id="visualizer-lock-in-quote-btn"
                  onClick={() => onOpenQuote(config)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Lock In This Quote &amp; Book Site Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsARModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-bold text-xs border border-neutral-700 hover:border-amber-500/50 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm group"
                >
                  <Camera className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Preview in Your Backyard (Mobile Camera AR)</span>
                  <span className="text-[9px] font-mono bg-amber-500/15 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30">
                    1:1 Scale
                  </span>
                </button>

                {onScrollToCalculator && (
                  <button
                    onClick={onScrollToCalculator}
                    className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold text-xs border border-amber-500/30 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Open Dynamic Cost &amp; Provincial Tax Engine ↓</span>
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Material Texture Detail Fullscreen Macro Zoom Modal */}
      <MaterialTextureViewer
        currentColorId={config.color}
        onSelectColor={(cId) => setConfig({ ...config, color: cId })}
        isOpen={isTextureModalOpen}
        onClose={() => setIsTextureModalOpen(false)}
      />

      {/* Mobile Augmented Reality (AR) Backyard Preview Modal */}
      <ARBackyardModal
        isOpen={isARModalOpen}
        onClose={() => setIsARModalOpen(false)}
        config={config}
      />
    </section>
  );
};
