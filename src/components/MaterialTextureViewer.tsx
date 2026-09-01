import React, { useState, useRef } from 'react';
import { FenceColorId } from '../types';
import { FENCE_COLORS } from '../data/products';
import { TEXTURE_DETAIL_DATA, TextureDetailInfo } from '../data/textureDetailData';
import {
  ZoomIn,
  ZoomOut,
  Sun,
  Shield,
  Layers,
  Sparkles,
  Info,
  Check,
  X,
  Maximize2,
  Sliders,
  Award,
  Clock,
  Eye,
  Columns,
  RefreshCw,
  Gauge,
  Droplets,
  Zap,
} from 'lucide-react';

interface MaterialTextureViewerProps {
  currentColorId: FenceColorId;
  onSelectColor: (colorId: FenceColorId) => void;
  isOpen: boolean;
  onClose: () => void;
  isMiniOverlay?: boolean;
}

export const MaterialTextureViewer: React.FC<MaterialTextureViewerProps> = ({
  currentColorId,
  onSelectColor,
  isOpen,
  onClose,
  isMiniOverlay = false,
}) => {
  const [zoomLevel, setZoomLevel] = useState<'1x' | '5x' | '20x' | '50x'>('5x');
  const [lightAngle, setLightAngle] = useState<number>(45); // degrees 0-360
  const [lightElevation, setLightElevation] = useState<number>(45); // degrees 15-75
  const [activeTab, setActiveTab] = useState<'texture' | 'cross-section' | 'compare' | 'specs'>('texture');
  const [compareColorId, setCompareColorId] = useState<FenceColorId>(
    currentColorId === 'obsidian-black' ? 'architectural-charcoal' : 'obsidian-black'
  );
  const [compareSplitPercent, setCompareSplitPercent] = useState<number>(50);

  if (!isOpen) return null;

  const currentTexture = TEXTURE_DETAIL_DATA[currentColorId] || TEXTURE_DETAIL_DATA['obsidian-black'];
  const compareTexture = TEXTURE_DETAIL_DATA[compareColorId] || TEXTURE_DETAIL_DATA['architectural-charcoal'];

  // Calculate light vector for dynamic specular highlight
  const lightRad = (lightAngle * Math.PI) / 180;
  const lightX = 50 + 40 * Math.cos(lightRad);
  const lightY = 50 + 40 * Math.sin(lightRad);

  /**
   * Generates procedural SVG texture patterns based on finish ID and zoom level
   */
  const renderTexturePattern = (texture: TextureDetailInfo, zoom: '1x' | '5x' | '20x' | '50x', uniquePrefix = 'curr') => {
    const isMatte = texture.id === 'obsidian-black';
    const isCharcoal = texture.id === 'architectural-charcoal';
    const isWalnut = texture.id === 'walnut-woodgrain';
    const isCorten = texture.id === 'corten-rust';
    const isWhite = texture.id === 'frost-white';
    const isGalv = texture.id === 'industrial-galvanized';

    const zoomScale = zoom === '1x' ? 1 : zoom === '5x' ? 2.5 : zoom === '20x' ? 6 : 12;

    return (
      <svg
        className="w-full h-full object-cover select-none"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial Dynamic Sun/Light Highlight */}
          <radialGradient
            id={`${uniquePrefix}-specularLight`}
            cx={`${lightX}%`}
            cy={`${lightY}%`}
            r={`${Math.max(25, 80 - (lightElevation / 90) * 40)}%`}
          >
            <stop
              offset="0%"
              stopColor="#ffffff"
              stopOpacity={
                isMatte
                  ? '0.08'
                  : isCharcoal
                  ? '0.35'
                  : isWalnut
                  ? '0.18'
                  : isCorten
                  ? '0.04'
                  : isWhite
                  ? '0.45'
                  : '0.5'
              }
            />
            <stop
              offset="50%"
              stopColor="#ffffff"
              stopOpacity={
                isMatte
                  ? '0.02'
                  : isCharcoal
                  ? '0.12'
                  : isWalnut
                  ? '0.06'
                  : isCorten
                  ? '0.01'
                  : isWhite
                  ? '0.18'
                  : '0.2'
              }
            />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
          </radialGradient>

          {/* 1. Obsidian Matte Black Stipple Pattern */}
          <pattern
            id={`${uniquePrefix}-matteStipple`}
            width={8 * zoomScale}
            height={8 * zoomScale}
            patternUnits="userSpaceOnUse"
          >
            <rect width={8 * zoomScale} height={8 * zoomScale} fill="#141414" />
            <circle cx={2 * zoomScale} cy={2 * zoomScale} r={0.7 * zoomScale} fill="#242424" opacity="0.8" />
            <circle cx={6 * zoomScale} cy={3 * zoomScale} r={0.9 * zoomScale} fill="#0d0d0d" opacity="0.9" />
            <circle cx={3 * zoomScale} cy={6 * zoomScale} r={0.6 * zoomScale} fill="#262626" opacity="0.7" />
            <circle cx={7 * zoomScale} cy={7 * zoomScale} r={0.8 * zoomScale} fill="#1f1f1f" opacity="0.6" />
            <circle cx={4.5 * zoomScale} cy={4.5 * zoomScale} r={0.5 * zoomScale} fill="#2e2e2e" opacity="0.75" />
          </pattern>

          {/* 2. Architectural Charcoal Metallic Flake Pattern */}
          <pattern
            id={`${uniquePrefix}-metallicFlake`}
            width={12 * zoomScale}
            height={12 * zoomScale}
            patternUnits="userSpaceOnUse"
          >
            <rect width={12 * zoomScale} height={12 * zoomScale} fill="#222731" />
            {/* Embedded aluminum mica sparkles */}
            <circle cx={3 * zoomScale} cy={3 * zoomScale} r={0.8 * zoomScale} fill="#8892b0" opacity="0.85" />
            <circle cx={9 * zoomScale} cy={4 * zoomScale} r={1.2 * zoomScale} fill="#ccd6f6" opacity="0.95" />
            <circle cx={4 * zoomScale} cy={9 * zoomScale} r={0.9 * zoomScale} fill="#4c566a" opacity="0.7" />
            <circle cx={10 * zoomScale} cy={10 * zoomScale} r={1.1 * zoomScale} fill="#94a3b8" opacity="0.9" />
            <polygon
              points={`${6 * zoomScale},${5 * zoomScale} ${6.8 * zoomScale},${6.5 * zoomScale} ${5.2 * zoomScale},${6.5 * zoomScale}`}
              fill="#e2e8f0"
              opacity="0.9"
            />
            <polygon
              points={`${1.5 * zoomScale},${8 * zoomScale} ${2.3 * zoomScale},${9.2 * zoomScale} ${0.7 * zoomScale},${9.2 * zoomScale}`}
              fill="#cbd5e1"
              opacity="0.8"
            />
          </pattern>

          {/* 3. Thermal Walnut Woodgrain Botanical Pattern */}
          <pattern
            id={`${uniquePrefix}-woodgrainPores`}
            width={24 * zoomScale}
            height={200 * zoomScale}
            patternUnits="userSpaceOnUse"
          >
            <rect width={24 * zoomScale} height={200 * zoomScale} fill="#4a2c16" />
            {/* Grain Flow Lines */}
            <path
              d={`M0,0 Q${12 * zoomScale},${50 * zoomScale} 0,${100 * zoomScale} T0,${200 * zoomScale}`}
              fill="none"
              stroke="#3a1e0b"
              strokeWidth={2 * zoomScale}
              opacity="0.8"
            />
            <path
              d={`M${8 * zoomScale},0 Q${20 * zoomScale},${60 * zoomScale} ${8 * zoomScale},${120 * zoomScale} T${8 * zoomScale},${200 * zoomScale}`}
              fill="none"
              stroke="#6b3f20"
              strokeWidth={2.5 * zoomScale}
              opacity="0.9"
            />
            <path
              d={`M${16 * zoomScale},0 Q${4 * zoomScale},${40 * zoomScale} ${16 * zoomScale},${110 * zoomScale} T${16 * zoomScale},${200 * zoomScale}`}
              fill="none"
              stroke="#2e1507"
              strokeWidth={1.8 * zoomScale}
              opacity="0.75"
            />
            {/* Timber Fiber Micro Pores */}
            {Array.from({ length: 8 }).map((_, i) => (
              <ellipse
                key={i}
                cx={(4 + (i * 3) % 20) * zoomScale}
                cy={(15 + i * 23) * zoomScale}
                rx={0.8 * zoomScale}
                ry={3 * zoomScale}
                fill="#200d04"
                opacity="0.7"
              />
            ))}
          </pattern>

          {/* 4. Weathering Corten Patina Pattern */}
          <pattern
            id={`${uniquePrefix}-cortenRust`}
            width={16 * zoomScale}
            height={16 * zoomScale}
            patternUnits="userSpaceOnUse"
          >
            <rect width={16 * zoomScale} height={16 * zoomScale} fill="#753517" />
            <circle cx={4 * zoomScale} cy={4 * zoomScale} r={2.5 * zoomScale} fill="#8d4421" opacity="0.9" />
            <circle cx={12 * zoomScale} cy={6 * zoomScale} r={3 * zoomScale} fill="#5e260c" opacity="0.85" />
            <circle cx={6 * zoomScale} cy={12 * zoomScale} r={3.2 * zoomScale} fill="#a64f24" opacity="0.8" />
            <circle cx={13 * zoomScale} cy={13 * zoomScale} r={2 * zoomScale} fill="#421805" opacity="0.95" />
            {/* Iron Oxide Micro-Granules */}
            <circle cx={9 * zoomScale} cy={3 * zoomScale} r={0.7 * zoomScale} fill="#b55428" />
            <circle cx={2 * zoomScale} cy={9 * zoomScale} r={0.8 * zoomScale} fill="#c26332" />
            <circle cx={10 * zoomScale} cy={10 * zoomScale} r={0.6 * zoomScale} fill="#df7842" />
          </pattern>

          {/* 5. Glacier White Satin Clean-Flow Pattern */}
          <pattern
            id={`${uniquePrefix}-whiteSatin`}
            width={10 * zoomScale}
            height={10 * zoomScale}
            patternUnits="userSpaceOnUse"
          >
            <rect width={10 * zoomScale} height={10 * zoomScale} fill="#f1f5f9" />
            <circle cx={3 * zoomScale} cy={3 * zoomScale} r={0.6 * zoomScale} fill="#ffffff" opacity="0.9" />
            <circle cx={8 * zoomScale} cy={4 * zoomScale} r={0.5 * zoomScale} fill="#e2e8f0" opacity="0.8" />
            <circle cx={4 * zoomScale} cy={8 * zoomScale} r={0.7 * zoomScale} fill="#ffffff" opacity="0.95" />
            <circle cx={8 * zoomScale} cy={8 * zoomScale} r={0.4 * zoomScale} fill="#cbd5e1" opacity="0.6" />
          </pattern>

          {/* 6. Galvanized Dendritic Zinc Spangle Pattern */}
          <pattern
            id={`${uniquePrefix}-zincSpangle`}
            width={28 * zoomScale}
            height={28 * zoomScale}
            patternUnits="userSpaceOnUse"
          >
            <rect width={28 * zoomScale} height={28 * zoomScale} fill="#64748b" />
            {/* Zinc Spangle Crystal Facets */}
            <polygon
              points={`${0 * zoomScale},${0 * zoomScale} ${14 * zoomScale},${6 * zoomScale} ${8 * zoomScale},${18 * zoomScale} ${0 * zoomScale},${12 * zoomScale}`}
              fill="#94a3b8"
              stroke="#475569"
              strokeWidth={0.6 * zoomScale}
            />
            <polygon
              points={`${14 * zoomScale},${6 * zoomScale} ${28 * zoomScale},${0 * zoomScale} ${24 * zoomScale},${16 * zoomScale} ${8 * zoomScale},${18 * zoomScale}`}
              fill="#71717a"
              stroke="#3f3f46"
              strokeWidth={0.6 * zoomScale}
            />
            <polygon
              points={`${0 * zoomScale},${12 * zoomScale} ${8 * zoomScale},${18 * zoomScale} ${12 * zoomScale},${28 * zoomScale} ${0 * zoomScale},${28 * zoomScale}`}
              fill="#a1a1aa"
              stroke="#52525b"
              strokeWidth={0.6 * zoomScale}
            />
            <polygon
              points={`${8 * zoomScale},${18 * zoomScale} ${24 * zoomScale},${16 * zoomScale} ${28 * zoomScale},${28 * zoomScale} ${12 * zoomScale},${28 * zoomScale}`}
              fill="#cbd5e1"
              stroke="#64748b"
              strokeWidth={0.6 * zoomScale}
            />
            {/* Center Crystal Flower Node */}
            <circle cx={14 * zoomScale} cy={14 * zoomScale} r={1.5 * zoomScale} fill="#f1f5f9" opacity="0.8" />
          </pattern>
        </defs>

        {/* Base Layer */}
        <rect width="400" height="400" fill={texture.baseHex} />

        {/* Procedural Pattern Overlay */}
        <rect
          width="400"
          height="400"
          fill={
            isMatte
              ? `url(#${uniquePrefix}-matteStipple)`
              : isCharcoal
              ? `url(#${uniquePrefix}-metallicFlake)`
              : isWalnut
              ? `url(#${uniquePrefix}-woodgrainPores)`
              : isCorten
              ? `url(#${uniquePrefix}-cortenRust)`
              : isWhite
              ? `url(#${uniquePrefix}-whiteSatin)`
              : `url(#${uniquePrefix}-zincSpangle)`
          }
        />

        {/* Dynamic Sunlight / Specular Glint Field */}
        <rect width="400" height="400" fill={`url(#${uniquePrefix}-specularLight)`} />

        {/* Profile Slat Seam (Visible in 1x & 5x mode) */}
        {(zoom === '1x' || zoom === '5x') && (
          <g>
            <line x1="0" y1="130" x2="400" y2="130" stroke="#000000" strokeWidth="3" opacity="0.6" />
            <line x1="0" y1="132" x2="400" y2="132" stroke="#ffffff" strokeWidth="1" opacity="0.2" />
            <line x1="0" y1="270" x2="400" y2="270" stroke="#000000" strokeWidth="3" opacity="0.6" />
            <line x1="0" y1="272" x2="400" y2="272" stroke="#ffffff" strokeWidth="1" opacity="0.2" />
          </g>
        )}

        {/* Micro-measurement grid reticle for 20x & 50x zoom */}
        {(zoom === '20x' || zoom === '50x') && (
          <g opacity="0.25" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="4 4">
            <line x1="200" y1="0" x2="200" y2="400" />
            <line x1="0" y1="200" x2="400" y2="200" />
            <circle cx="200" cy="200" r="80" fill="none" />
            <circle cx="200" cy="200" r="140" fill="none" />
            <text x="210" y="30" fill="#38bdf8" fontSize="10" fontFamily="monospace">
              {zoom === '20x' ? '100 µm Optical Field' : '25 µm Micro Strata'}
            </text>
          </g>
        )}
      </svg>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 w-full max-w-5xl max-h-[92vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <ZoomIn className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base sm:text-lg font-black text-white font-['Space_Grotesk']">
                  Material Texture Detail &amp; Micro-Surface Zoom
                </h3>
                <span className="text-[10px] font-mono bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  {currentTexture.sheenLevel}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Architectural optical rendering with interactive solar angle simulation &amp; ASTM coating breakdown
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Close Texture Zoom"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Finish Swatch Quick-Selector Bar */}
        <div className="px-4 py-2.5 bg-neutral-900/90 border-b border-neutral-800 flex items-center space-x-2 overflow-x-auto">
          <span className="text-[10px] uppercase font-mono font-bold text-neutral-400 shrink-0 mr-1">
            Finish Swatches:
          </span>
          {FENCE_COLORS.map((color) => {
            const isSelected = currentColorId === color.id;
            return (
              <button
                key={color.id}
                onClick={() => onSelectColor(color.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 text-white shadow-sm ring-1 ring-amber-500/50'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-neutral-600 shadow-sm shrink-0"
                  style={{ backgroundColor: color.hex }}
                ></span>
                <span className="truncate">{color.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </button>
            );
          })}
        </div>

        {/* Main Body Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Texture Canvas & Optical Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Visualizer Canvas Frame */}
            <div className="relative bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-inner aspect-[4/3] flex items-center justify-center group">
              
              {/* Tab: Standard Texture or Compare Split */}
              {activeTab !== 'compare' ? (
                <div className="w-full h-full relative">
                  {renderTexturePattern(currentTexture, zoomLevel, 'main')}

                  {/* Micro Loupe Overlay Badge */}
                  <div className="absolute top-3 left-3 bg-neutral-950/85 backdrop-blur-md border border-neutral-700 px-2.5 py-1 rounded-lg text-[11px] font-mono text-neutral-200 flex items-center space-x-1.5 shadow-md">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{currentTexture.microTextureName}</span>
                    <span className="text-amber-400 font-bold">({zoomLevel} Magnification)</span>
                  </div>

                  {/* Gloss & Light Reflection Meter */}
                  <div className="absolute bottom-3 right-3 bg-neutral-950/85 backdrop-blur-md border border-neutral-700 px-3 py-1.5 rounded-xl text-[11px] font-mono text-neutral-300 flex items-center space-x-2 shadow-md">
                    <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Gloss: <strong className="text-white">{currentTexture.glossUnits60} GU @ 60°</strong></span>
                    <span className="text-neutral-500">•</span>
                    <span>Sun Angle: <strong className="text-amber-400">{lightAngle}°</strong></span>
                  </div>
                </div>
              ) : (
                /* Split Comparison Mode */
                <div className="w-full h-full relative select-none">
                  {/* Left Finish */}
                  <div className="absolute inset-0">
                    {renderTexturePattern(currentTexture, zoomLevel, 'splitLeft')}
                  </div>

                  {/* Right Finish (Clipped) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 0 0 ${compareSplitPercent}%)` }}
                  >
                    {renderTexturePattern(compareTexture, zoomLevel, 'splitRight')}
                  </div>

                  {/* Split Divider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-xl cursor-ew-resize flex items-center justify-center"
                    style={{ left: `${compareSplitPercent}%` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center text-[10px] font-black shadow-lg">
                      ↔
                    </div>
                  </div>

                  {/* Interactive Slider Input */}
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={compareSplitPercent}
                    onChange={(e) => setCompareSplitPercent(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize z-20"
                  />

                  {/* Finish Labels */}
                  <div className="absolute top-3 left-3 bg-neutral-950/85 backdrop-blur-md border border-neutral-700 px-2.5 py-1 rounded-lg text-[10px] font-mono text-white">
                    {currentTexture.name} ({currentTexture.glossUnits60} GU)
                  </div>
                  <div className="absolute top-3 right-3 bg-neutral-950/85 backdrop-blur-md border border-neutral-700 px-2.5 py-1 rounded-lg text-[10px] font-mono text-amber-300">
                    {compareTexture.name} ({compareTexture.glossUnits60} GU)
                  </div>
                </div>
              )}
            </div>

            {/* Viewport Control Bar: Zoom Magnification + Sunlight Sliders */}
            <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-3">
              
              {/* Magnification Steppers */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider font-mono flex items-center space-x-1.5">
                  <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                  <span>Magnification:</span>
                </span>
                <div className="flex space-x-1.5">
                  {(['1x', '5x', '20x', '50x'] as const).map((z) => (
                    <button
                      key={z}
                      onClick={() => setZoomLevel(z)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        zoomLevel === z
                          ? 'bg-amber-500 text-neutral-950 shadow'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                      }`}
                    >
                      {z}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Sunlight / Specular Angle Slider */}
              <div className="space-y-1.5 pt-2 border-t border-neutral-900">
                <div className="flex justify-between text-xs text-neutral-300">
                  <span className="flex items-center space-x-1 font-semibold">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Grazing Sunlight Angle:</span>
                  </span>
                  <span className="font-mono text-amber-400 font-bold">{lightAngle}° Azimuth</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={lightAngle}
                  onChange={(e) => setLightAngle(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                  <span>0° Morning Low</span>
                  <span>90° Direct Overhead</span>
                  <span>180° Afternoon</span>
                  <span>270° Evening Grazing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Specification, Cross-Section & Comparison Tabs (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* View Switcher Tabs */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-neutral-950 rounded-xl border border-neutral-800 text-xs">
              <button
                onClick={() => setActiveTab('texture')}
                className={`py-1.5 px-2 rounded-lg font-bold transition-colors cursor-pointer ${
                  activeTab === 'texture' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Surface Spec
              </button>
              <button
                onClick={() => setActiveTab('cross-section')}
                className={`py-1.5 px-2 rounded-lg font-bold transition-colors cursor-pointer ${
                  activeTab === 'cross-section' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Layer Strata
              </button>
              <button
                onClick={() => setActiveTab('compare')}
                className={`py-1.5 px-2 rounded-lg font-bold transition-colors cursor-pointer ${
                  activeTab === 'compare' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Compare
              </button>
            </div>

            {/* Tab 1: Surface Profile & Tactile Characteristics */}
            {activeTab === 'texture' && (
              <div className="space-y-4">
                <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      Chemistry &amp; Coating Matrix
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      {currentTexture.aamaStandard}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {currentTexture.microTextureDescription}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                      <span className="text-[10px] text-neutral-400 uppercase font-mono block">Tactile Feel</span>
                      <span className="text-xs font-semibold text-white mt-0.5 block">{currentTexture.tactileFeel}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                      <span className="text-[10px] text-neutral-400 uppercase font-mono block">Film Thickness</span>
                      <span className="text-xs font-semibold text-emerald-400 font-mono mt-0.5 block">
                        {currentTexture.layerThicknessMils} mils ({currentTexture.layerThicknessMicrons} µm)
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Optical Profile</span>
                    <span className="text-xs text-neutral-300 mt-0.5 block">{currentTexture.opticalProperties}</span>
                  </div>
                </div>

                {/* Key Engineered Advantages */}
                <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-2">
                  <span className="text-xs font-bold text-neutral-200 uppercase tracking-wider font-mono block">
                    Field Durability Benchmarks:
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {currentTexture.keyAdvantages.map((adv, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: 4-Stage Multi-Layer Cross Section */}
            {activeTab === 'cross-section' && (
              <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Microscopic Layer Strata Cutaway
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">Total: {currentTexture.layerThicknessMicrons} µm</span>
                </div>

                <div className="space-y-2">
                  {currentTexture.layers.map((layer, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 space-y-1 relative overflow-hidden"
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1.5"
                        style={{ backgroundColor: layer.color }}
                      ></div>
                      <div className="flex items-center justify-between pl-1">
                        <span className="text-xs font-bold text-white truncate">{layer.name}</span>
                        <span className="text-[10px] font-mono font-bold text-amber-400 bg-neutral-950 px-1.5 py-0.5 rounded">
                          {layer.thickness}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 pl-1 leading-tight">
                        {layer.description}
                      </p>
                      <div className="text-[9px] font-mono text-neutral-500 pl-1">
                        Standard: {layer.standard}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 bg-neutral-900 rounded-xl border border-neutral-800 text-[11px] text-neutral-300">
                  <span className="font-bold text-amber-400 block mb-0.5">Sub-Zero Thermal Elasticity:</span>
                  Coating formulation utilizes high-molecular-weight polymers engineered not to micro-crack or delaminate under -50°C Canadian deep frost thermal contractions.
                </div>
              </div>
            )}

            {/* Tab 3: Split Finish Comparison Controls */}
            {activeTab === 'compare' && (
              <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono block">
                  Select Comparison Finish:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {FENCE_COLORS.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => setCompareColorId(col.id)}
                      className={`p-2 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center space-x-2 ${
                        compareColorId === col.id
                          ? 'border-amber-400 bg-amber-500/10 text-white ring-1 ring-amber-400'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full shrink-0 border border-neutral-600"
                        style={{ backgroundColor: col.hex }}
                      ></span>
                      <span className="truncate">{col.name}</span>
                    </button>
                  ))}
                </div>

                <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 space-y-1.5 text-xs text-neutral-300">
                  <div className="flex justify-between font-bold text-white">
                    <span>{currentTexture.name}</span>
                    <span>vs</span>
                    <span>{compareTexture.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] border-t border-neutral-800">
                    <div>
                      <span className="text-neutral-500 block">Gloss: {currentTexture.glossUnits60} GU</span>
                      <span className="text-neutral-400">{currentTexture.sheenLevel.split('(')[0]}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-neutral-500 block">Gloss: {compareTexture.glossUnits60} GU</span>
                      <span className="text-neutral-400">{compareTexture.sheenLevel.split('(')[0]}</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 italic">
                  Drag the slider handle directly across the image canvas to inspect the optical difference in real-time.
                </p>
              </div>
            )}

            {/* Technical ASTM Quality Badges */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-[9px] text-neutral-400 font-mono uppercase block">Salt Spray</span>
                <span className="font-extrabold text-emerald-400 font-mono text-sm block mt-0.5">
                  {currentTexture.saltSprayHoursASTM_B117}+ Hrs
                </span>
                <span className="text-[9px] text-neutral-500">ASTM B117</span>
              </div>
              <div className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-[9px] text-neutral-400 font-mono uppercase block">Hardness</span>
                <span className="font-extrabold text-amber-400 font-mono text-sm block mt-0.5">
                  {currentTexture.pencilHardness.split(' ')[0]}
                </span>
                <span className="text-[9px] text-neutral-500">ASTM D3363</span>
              </div>
              <div className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-[9px] text-neutral-400 font-mono uppercase block">Temperature</span>
                <span className="font-extrabold text-sky-400 font-mono text-sm block mt-0.5">
                  -50°C
                </span>
                <span className="text-[9px] text-neutral-500">Sub-Zero Rated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-neutral-400">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Look for powder-coatings that meet AAMA 2604 architectural standards -- ask your installer what backing they offer.
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors cursor-pointer shrink-0"
          >
            Apply &amp; Return to Visualizer
          </button>
        </div>
      </div>
    </div>
  );
};
