import React, { useState } from 'react';
import {
  FenceConfig,
  FenceStyleId,
  FenceColorId,
  PostMountType,
  GateType,
  SecurityPackageType,
  MaterialGradeId,
  SoilTypeId,
} from '../types';
import { FENCE_PRODUCTS, FENCE_COLORS, GATE_OPTIONS, SECURITY_PACKAGES } from '../data/products';
import { CANADIAN_PROVINCES } from '../data/climateData';
import { MATERIAL_GRADES } from '../data/materialGrades';
import { SOIL_TYPES, getSoilType } from '../data/soilData';
import { BULK_SAVINGS_TIERS, getBulkTier, getNextBulkTier } from '../data/bulkSavingsData';
import { calculateEstimate, formatCAD } from '../utils/calculator';
import { generateFenceEstimatePDF } from '../utils/pdfGenerator';
import { QrShareModal } from './QrShareModal';
import {
  Calculator,
  Sparkles,
  Sliders,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Download,
  Copy,
  Check,
  ArrowRight,
  TrendingDown,
  Layers,
  Wrench,
  Zap,
  MapPin,
  FileSpreadsheet,
  Maximize2,
  Calendar,
  Building,
  RotateCcw,
  FileText,
  Printer,
  X,
  User,
  Phone,
  Mail,
  Home,
  FileCheck,
  Loader2,
  QrCode,
  Smartphone,
  ShieldAlert,
  Radio,
  Camera,
  Sun,
  Shield,
  Award,
  Wind,
  Droplets,
  ThermometerSnowflake,
  Info,
  ChevronDown,
  ChevronUp,
  Clock,
  BarChart2,
  Percent,
  Tag,
  PackageCheck,
  Boxes,
} from 'lucide-react';

interface DynamicCostCalculatorProps {
  config: FenceConfig;
  onChangeConfig: (newConfig: FenceConfig) => void;
  onOpenQuote: (config: FenceConfig) => void;
  onScrollToVisualizer?: () => void;
  onScrollToSitePlanner?: () => void;
}

export const DynamicCostCalculator: React.FC<DynamicCostCalculatorProps> = ({
  config,
  onChangeConfig,
  onOpenQuote,
  onScrollToVisualizer,
  onScrollToSitePlanner,
}) => {
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedFinanceMonths, setSelectedFinanceMonths] = useState<24 | 36 | 48>(24);
  const [previewProvinceCode, setPreviewProvinceCode] = useState<string>(config.province || 'ON');
  const [showDurabilityDeepDive, setShowDurabilityDeepDive] = useState<boolean>(false);
  const [showBulkTierDetails, setShowBulkTierDetails] = useState<boolean>(false);

  // Custom PDF info state
  const [pdfClientData, setPdfClientData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });

  const selectedProduct = FENCE_PRODUCTS.find((p) => p.id === config.style) || FENCE_PRODUCTS[0];
  const selectedColor = FENCE_COLORS.find((c) => c.id === config.color) || FENCE_COLORS[0];
  const selectedProvince = CANADIAN_PROVINCES.find((p) => p.code === config.province) || CANADIAN_PROVINCES[0];
  const selectedGrade = MATERIAL_GRADES.find((g) => g.id === (config.materialGrade || 'standard')) || MATERIAL_GRADES[0];

  const estimate = calculateEstimate(config);

  const handleStyleSelect = (styleId: FenceStyleId) => {
    const prod = FENCE_PRODUCTS.find((p) => p.id === styleId);
    let height = config.heightFeet;
    if (prod && !prod.heightsAvailable.includes(height)) {
      height = prod.heightsAvailable[0];
    }
    onChangeConfig({
      ...config,
      style: styleId,
      heightFeet: height,
    });
  };

  const handleHeightSelect = (h: number) => {
    onChangeConfig({
      ...config,
      heightFeet: h,
    });
  };

  const handleLinearFeetChange = (lf: number) => {
    onChangeConfig({
      ...config,
      linearFeet: Math.max(20, Math.min(500, lf)),
    });
  };

  const handleMaterialGradeSelect = (gradeId: MaterialGradeId) => {
    onChangeConfig({
      ...config,
      materialGrade: gradeId,
    });
  };

  const handleCopySummary = () => {
    const summaryText = `SteelFencing.ca Estimate Summary
----------------------------------------
System: ${selectedProduct.name} (${selectedProduct.category})
Material Grade: ${selectedGrade.name} (${estimate.warrantyYears}-Yr Typical Warranty)
Expected Longevity: ${estimate.expectedLongevityYears} in ${selectedProvince.name}
Height: ${config.heightFeet} ft
Perimeter Length: ${config.linearFeet} Linear Feet (${estimate.panelsCount} Panels, ${estimate.postsCount} Posts)
Wholesale Volume Tier: ${estimate.bulkTier?.name || 'Standard'} (${estimate.bulkDiscountPercent || 0}% Discount: -${formatCAD(estimate.bulkDiscountAmount || 0)})
Color/Finish: ${selectedColor.name}
Foundation: ${config.postMount} (${selectedProvince.name} - ${estimate.frostDepthRecommendedInches}" Frost Depth)
Gate System: ${config.includeGate} ${config.gateAutomation ? '(Automated Motor Included)' : ''}
Security Package: ${config.securityPackage || 'None'} ${config.solarBackupPower ? '(Solar Kit Included)' : ''}
LED Lighting: ${config.integratedLedLighting ? 'Integrated Post Caps' : 'None'}
Installation: ${config.installationType === 'turnkey-pro' ? 'Certified Turnkey Pro' : 'Direct Freight Supply'}
----------------------------------------
Materials Base (Gross): ${formatCAD(estimate.rawMaterialsCost || estimate.materialsCost)}
Wholesale Volume Rebate (${estimate.bulkDiscountPercent || 0}%): ${estimate.bulkDiscountAmount && estimate.bulkDiscountAmount > 0 ? `-${formatCAD(estimate.bulkDiscountAmount)}` : '$0 (Retail Tier)'}
Net Materials Subtotal: ${formatCAD(estimate.materialsCost)}
Material Grade Spec (${selectedGrade.shortName}): ${estimate.materialGradeAddonCost && estimate.materialGradeAddonCost > 0 ? `+${formatCAD(estimate.materialGradeAddonCost)}` : 'Included'}
Turnkey Labor: ${formatCAD(estimate.installationCost)}
Gate & Barrier: ${formatCAD(estimate.gateCost)}
Security System: ${formatCAD(estimate.securityCost || 0)}
LED Lighting: ${formatCAD(estimate.lightingCost)}
Total (Pre-Tax): ${formatCAD(estimate.totalBeforeTax)} CAD
Provincial Tax (${((estimate.provincialTaxRate || 0.13) * 100).toFixed(1)}%): ${formatCAD(estimate.provincialTaxAmount || 0)} CAD
Grand Total: ${formatCAD(estimate.grandTotalWithTax || estimate.totalBeforeTax)} CAD
Unit Rate: $${estimate.effectivePerFoot}/Linear Foot
Annualized Investment: ${formatCAD(estimate.annualizedCost || 0)} / year`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  const handleInstantPdfExport = () => {
    setIsGeneratingPdf(true);
    try {
      generateFenceEstimatePDF(config, {
        clientName: pdfClientData.name || undefined,
        clientAddress: pdfClientData.address || undefined,
        clientEmail: pdfClientData.email || undefined,
        clientPhone: pdfClientData.phone || undefined,
        notes: pdfClientData.notes || undefined,
      });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error('PDF Generation Error:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleCustomPdfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleInstantPdfExport();
    setShowPdfModal(false);
  };

  // Financing calculation
  const totalAmount = estimate.grandTotalWithTax || estimate.totalBeforeTax;
  const financeRates: Record<number, number> = {
    24: totalAmount / 24,
    36: (totalAmount * 1.045) / 36,
    48: (totalAmount * 1.085) / 48,
  };
  const monthlyPayment = Math.round(financeRates[selectedFinanceMonths] || totalAmount / 24);

  return (
    <section id="calculator" className="py-16 bg-neutral-900 border-b border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400 mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>Real-Time Canadian Cost Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
              Dynamic Cost &amp; Regional Tax Estimator
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Calculate exact Canadian materials, certified turnkey installation, barrier gates, smart security packages, and provincial sales taxes instantly.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowQrModal(true)}
              className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold border border-neutral-700 flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>Mobile QR</span>
            </button>

            <button
              onClick={() => setShowPdfModal(true)}
              disabled={isGeneratingPdf}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-extrabold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-lg shadow-amber-500/20"
            >
              {isGeneratingPdf ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>Export PDF Quote</span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Calculator Layout: Left Inputs (7 cols) + Right Dynamic Financial Summary (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Parametric Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
              
              {/* 1. Perimeter Length Slider */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    1. Perimeter Footage Length
                  </label>
                  <div className="flex items-center space-x-2">
                    {onScrollToSitePlanner && (
                      <button
                        type="button"
                        onClick={onScrollToSitePlanner}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-[11px] font-bold text-amber-400 flex items-center space-x-1 transition-colors cursor-pointer"
                      >
                        <MapPin className="w-3 h-3" />
                        <span>Draw on Property Site Map</span>
                      </button>
                    )}
                    <span className="text-sm font-black text-amber-400 font-mono bg-neutral-900 px-3 py-1 rounded-lg border border-neutral-800">
                      {config.linearFeet} Linear Feet
                    </span>
                    <span className="text-xs text-neutral-400 hidden sm:inline">
                      (~{(config.linearFeet * 0.3048).toFixed(1)} m)
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min="20"
                  max="450"
                  step="5"
                  value={config.linearFeet}
                  onChange={(e) => handleLinearFeetChange(Number(e.target.value))}
                  className="w-full h-3 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />

                <div className="flex justify-between items-center text-xs text-neutral-400">
                  <button onClick={() => handleLinearFeetChange(60)} className="hover:text-amber-400 cursor-pointer">
                    60 LF (Patio)
                  </button>
                  <button onClick={() => handleLinearFeetChange(120)} className="hover:text-amber-400 cursor-pointer">
                    120 LF (5% Rebate)
                  </button>
                  <button onClick={() => handleLinearFeetChange(200)} className="hover:text-amber-400 cursor-pointer">
                    200 LF (8% Rebate)
                  </button>
                  <button onClick={() => handleLinearFeetChange(350)} className="hover:text-amber-400 cursor-pointer">
                    350 LF (12% Rebate)
                  </button>
                  <button onClick={() => handleLinearFeetChange(420)} className="hover:text-amber-400 cursor-pointer font-semibold text-emerald-400">
                    420 LF (15% Max)
                  </button>
                </div>
              </div>

              {/* Bulk Order Volume Savings Calculator Module */}
              <div className="p-4 sm:p-5 bg-gradient-to-br from-neutral-900/90 via-neutral-900 to-emerald-950/25 border border-emerald-500/30 rounded-2xl space-y-3.5">
                {/* Header with Active Tier Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                      <Boxes className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-white uppercase tracking-wider block">
                          Canadian Bulk Order Savings Calculator
                        </span>
                        <span className="text-[10px] bg-neutral-800 text-neutral-300 font-mono px-2 py-0.5 rounded border border-neutral-700">
                          Wholesale Direct
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-400">
                        Automatic manufacturer tiered rebates based on standard Canadian volume thresholds
                      </span>
                    </div>
                  </div>

                  {/* Current Active Savings Pill */}
                  <div className="flex items-center space-x-2 shrink-0">
                    {estimate.bulkDiscountAmount && estimate.bulkDiscountAmount > 0 ? (
                      <div className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-mono">
                        <Percent className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Saved {formatCAD(estimate.bulkDiscountAmount)} CAD</span>
                        <span className="bg-emerald-500 text-neutral-950 text-[10px] font-black px-1.5 py-0.2 rounded ml-1">
                          -{estimate.bulkDiscountPercent}%
                        </span>
                      </div>
                    ) : (
                      <div className="px-2.5 py-1 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-400 text-xs font-mono">
                        Standard Single-Pack Rate (0%)
                      </div>
                    )}
                  </div>
                </div>

                {/* 5-Tier Volume Threshold Track */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-neutral-400 font-mono uppercase tracking-wider">
                    <span className="flex items-center space-x-1">
                      <Tag className="w-3 h-3 text-amber-400" />
                      <span>Volume Tiers (Select or Adjust Length):</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowBulkTierDetails(!showBulkTierDetails)}
                      className="text-amber-400 hover:text-amber-300 flex items-center space-x-1 cursor-pointer font-bold lowercase transition-colors"
                    >
                      <span>{showBulkTierDetails ? 'collapse benefits' : 'view freight & wholesale perks'}</span>
                      {showBulkTierDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* 5 Tier Buttons / Steppers */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                    {BULK_SAVINGS_TIERS.map((tier) => {
                      const isCurrent = estimate.bulkTier?.tierId === tier.tierId;
                      const isUnlocked = config.linearFeet >= tier.minFeet;
                      return (
                        <button
                          key={tier.tierId}
                          type="button"
                          onClick={() => handleLinearFeetChange(tier.minFeet === 0 ? 60 : tier.minFeet)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                            isCurrent
                              ? 'border-emerald-500 bg-emerald-500/15 text-white shadow-md ring-1 ring-emerald-500/50'
                              : isUnlocked
                              ? 'border-emerald-900/50 bg-neutral-950/90 text-neutral-300 hover:border-neutral-700'
                              : 'border-neutral-800 bg-neutral-950/50 text-neutral-500 hover:border-neutral-700'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className={`text-[10px] font-mono font-bold ${
                              isCurrent ? 'text-emerald-400' : isUnlocked ? 'text-neutral-300' : 'text-neutral-500'
                            }`}>
                              {tier.minFeet}{tier.maxFeet ? `–${tier.maxFeet}` : '+'} LF
                            </span>
                            {isCurrent && (
                              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center text-[9px] font-black shrink-0">
                                ✓
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-extrabold text-white leading-tight">
                            {tier.discountPercent === 0 ? 'Retail (0%)' : `${tier.discountPercent}% OFF`}
                          </div>
                          <div className="text-[9px] text-neutral-400 truncate mt-0.5">
                            {tier.badge}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Tier Upgrade Catalyst / Incentive */}
                  {estimate.nextTierFeet && (
                    <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="text-xs space-y-0.5">
                        <div className="flex items-center space-x-1.5 text-neutral-200 font-semibold">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>
                            Add only <strong className="text-amber-400 font-mono">{estimate.nextTierFeet - config.linearFeet} LF</strong> to reach the <strong className="text-emerald-400">{estimate.nextTierDiscountPercent}% Wholesale Tier</strong>!
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400">
                          {estimate.nextTierSavingsDelta && estimate.nextTierSavingsDelta > 0
                            ? `Estimated material savings at ${estimate.nextTierFeet} LF: ~${formatCAD(estimate.nextTierSavingsDelta)} CAD.`
                            : `Qualifies for continuous factory batch scheduling and packaging perks.`}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleLinearFeetChange(estimate.nextTierFeet!)}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center justify-center space-x-1.5 shadow-sm"
                      >
                        <span>Jump to {estimate.nextTierFeet} LF</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* If Max 15% Tier Reached */}
                  {!estimate.nextTierFeet && (
                    <div className="p-3 bg-emerald-950/50 rounded-xl border border-emerald-500/40 flex items-center justify-between text-xs text-emerald-300">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span><strong>Top-Tier Enterprise Wholesale Active (15% Max):</strong> Unlocks VIP mill dispatch priority, flatbed offloading credit, and master hardware bundle.</span>
                      </div>
                      <span className="font-mono font-bold text-emerald-200 shrink-0 ml-2">Maximum Rebate</span>
                    </div>
                  )}

                  {/* Expandable Tier Specification Drawer */}
                  {showBulkTierDetails && (
                    <div className="pt-3 border-t border-neutral-800 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-neutral-200 uppercase tracking-wider">
                          Canadian Wholesale Tier Specification &amp; Freight Allowances:
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">FOB Factory Depot</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {BULK_SAVINGS_TIERS.map((tier) => (
                          <div
                            key={tier.tierId}
                            className={`p-3 rounded-xl border transition-all ${
                              estimate.bulkTier?.tierId === tier.tierId
                                ? 'border-emerald-500 bg-emerald-950/25 ring-1 ring-emerald-500/30'
                                : 'border-neutral-800 bg-neutral-950'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-white text-xs">{tier.name}</span>
                              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                                tier.discountPercent > 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-neutral-800 text-neutral-400'
                              }`}>
                                {tier.discountPercent}% Discount
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-400 mb-2 leading-snug">
                              {tier.description}
                            </p>
                            <ul className="space-y-1 text-[10px] text-neutral-300">
                              {tier.perks.map((perk, i) => (
                                <li key={i} className="flex items-start space-x-1.5">
                                  <span className="text-emerald-400 font-bold">•</span>
                                  <span>{perk}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 2. Steel / Iron / Aluminum Style Selection */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    2. Structural Material &amp; Profile ({FENCE_PRODUCTS.length} Available)
                  </label>
                  {onScrollToVisualizer && (
                    <button
                      onClick={onScrollToVisualizer}
                      className="text-xs text-amber-400 hover:text-amber-300 flex items-center space-x-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>View in 3D Visualizer</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                  {FENCE_PRODUCTS.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => handleStyleSelect(prod.id)}
                      className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                        config.style === prod.id
                          ? 'border-amber-500 bg-amber-500/10 text-white shadow-lg ring-1 ring-amber-500'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-white truncate">
                            {prod.name}
                          </span>
                          {config.style === prod.id && (
                            <span className="w-4 h-4 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-400 line-clamp-1">
                          {prod.tagline}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 mt-2 border-t border-neutral-800/80">
                        <span className="uppercase text-[9px] font-bold text-emerald-400">{prod.materialFamily}</span>
                        <span className="font-mono text-amber-400 font-bold">
                          ${prod.basePricePerFoot}/LF
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Height Selector with Visual Multiplier */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    3. Installed Fence Height
                  </label>
                  <span className="text-xs text-amber-400 font-bold">
                    {config.heightFeet} Feet ({selectedProvince.maxTypicalBackyardHeightFt >= config.heightFeet ? 'Permit-Free in Most Municipalities' : 'Engineering Stamp Included'})
                  </span>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1">
                  {selectedProduct.heightsAvailable.map((h) => {
                    const heightMultipliers: Record<number, string> = {
                      4: '0.85x',
                      5: '0.92x',
                      6: '1.0x',
                      7: '1.18x',
                      8: '1.35x',
                      10: '1.75x',
                    };
                    return (
                      <button
                        key={h}
                        onClick={() => handleHeightSelect(h)}
                        className={`flex-1 p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          config.heightFeet === h
                            ? 'bg-amber-500 text-neutral-950 border-amber-500 font-extrabold shadow-md'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        <span className="block text-sm font-bold">{h} ft</span>
                        <span className={`text-[10px] block ${config.heightFeet === h ? 'text-neutral-900 font-semibold' : 'text-neutral-400'}`}>
                          {heightMultipliers[h] || '1.0x'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Material Grade & Climate Durability Specification */}
              <div className="space-y-3 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <span>4. Material Grade &amp; Canadian Climate Longevity</span>
                    <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 lowercase">
                      dynamic impact
                    </span>
                  </label>
                  <span className="text-xs text-amber-400 font-bold flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{estimate.expectedLongevityYears} Expected in {selectedProvince.name}</span>
                  </span>
                </div>

                {/* 3 Interactive Material Grade Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {MATERIAL_GRADES.map((grade) => {
                    const isSelected = (config.materialGrade || 'standard') === grade.id;
                    const gradeProvLongevity = grade.climateLongevity[config.province] || grade.climateLongevity['ON'];
                    const addonCost = grade.perFootAddon * config.linearFeet;

                    return (
                      <button
                        key={grade.id}
                        type="button"
                        onClick={() => handleMaterialGradeSelect(grade.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'border-amber-500 bg-gradient-to-b from-amber-500/15 to-neutral-900 shadow-md ring-1 ring-amber-500/50'
                            : 'border-neutral-800 bg-neutral-900/90 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900'
                        }`}
                      >
                        {/* Header & Badges */}
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                isSelected
                                  ? 'bg-amber-500 text-neutral-950'
                                  : 'bg-neutral-800 text-neutral-400'
                              }`}
                            >
                              {grade.warrantyYears}-Yr Typical Warranty
                            </span>
                            {grade.id === 'heavy-duty' && (
                              <span className="text-[9px] bg-emerald-500/15 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
                                Most Popular
                              </span>
                            )}
                            {grade.id === 'marine-arctic' && (
                              <span className="text-[9px] bg-sky-500/15 text-sky-400 font-bold px-1.5 py-0.5 rounded border border-sky-500/30">
                                Polar / Marine
                              </span>
                            )}
                          </div>

                          <div className="font-bold text-white text-xs leading-tight mb-1">
                            {grade.name}
                          </div>

                          <div className="text-[10px] text-neutral-400 leading-snug mb-2">
                            {grade.gaugeSteel.split(' ')[0]} • {grade.coating.split(' ')[0]}
                          </div>
                        </div>

                        {/* Price & Climate Lifespan Footer */}
                        <div className="pt-2 border-t border-neutral-800/80 mt-1 space-y-1">
                          <div className="flex justify-between items-baseline">
                            <span className="text-[10px] text-neutral-400">Price Impact:</span>
                            <span
                              className={`text-xs font-mono font-bold ${
                                addonCost > 0 ? 'text-amber-400' : 'text-emerald-400'
                              }`}
                            >
                              {addonCost > 0 ? `+$${grade.perFootAddon}/LF (+${formatCAD(addonCost)})` : 'Included ($0)'}
                            </span>
                          </div>

                          <div className="flex justify-between items-center bg-neutral-950/70 px-2 py-1 rounded-lg border border-neutral-800/60">
                            <span className="text-[9px] text-neutral-400">Lifespan ({selectedProvince.code}):</span>
                            <span className="text-[10px] font-bold text-white">
                              {gradeProvLongevity.years}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Interactive Canadian Climate Longevity & Stress Resilience Engine */}
                <div className="bg-neutral-900/90 rounded-2xl p-3.5 border border-neutral-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-2.5">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <ThermometerSnowflake className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">
                          Canadian Climate Longevity &amp; Stress Analysis
                        </span>
                        <span className="text-[10px] text-neutral-400 block">
                          {selectedGrade.name} tested for Canadian frost, salt, and wind microclimates
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowDurabilityDeepDive(!showDurabilityDeepDive)}
                      className="inline-flex items-center space-x-1 text-[11px] text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                    >
                      <span>{showDurabilityDeepDive ? 'Hide Tech Specs' : 'View ASTM & Lab Testing'}</span>
                      {showDurabilityDeepDive ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* Province Quick Comparison Pills */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-400">Compare Lifespan Across Canadian Climates:</span>
                      <span className="text-neutral-500 text-[10px]">Click any province</span>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                      {CANADIAN_PROVINCES.map((prov) => {
                        const provLongevity = selectedGrade.climateLongevity[prov.code] || selectedGrade.climateLongevity['ON'];
                        const isCurrentActive = previewProvinceCode === prov.code;
                        const isProjectProvince = config.province === prov.code;

                        return (
                          <button
                            key={prov.code}
                            type="button"
                            onClick={() => setPreviewProvinceCode(prov.code)}
                            className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                              isCurrentActive
                                ? 'bg-amber-500/15 border-amber-500 text-white shadow-sm'
                                : 'bg-neutral-950 border-neutral-800/80 text-neutral-400 hover:border-neutral-700 hover:text-neutral-300'
                            }`}
                          >
                            <div className="flex items-center justify-center space-x-1">
                              <span className="text-[10px] font-extrabold">{prov.code}</span>
                              {isProjectProvince && (
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                              )}
                            </div>
                            <div className="text-[9px] font-bold text-amber-400 font-mono mt-0.5">
                              {provLongevity.years.split(' ')[0]} yrs
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected Preview Province Insight Box */}
                  {(() => {
                    const previewProv = CANADIAN_PROVINCES.find((p) => p.code === previewProvinceCode) || selectedProvince;
                    const previewLongevity = selectedGrade.climateLongevity[previewProvinceCode] || selectedGrade.climateLongevity['ON'];
                    const annualizedVal = Math.round(estimate.totalBeforeTax / (previewLongevity.avgYears || 30));

                    return (
                      <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
                          <div className="flex items-center space-x-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-400" />
                            <span className="font-bold text-white">
                              {previewProv.name} ({previewProv.code}):
                            </span>
                            <span className="text-amber-400 font-mono font-bold">
                              {previewLongevity.years} Expected Service
                            </span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/20">
                            {previewLongevity.rating}
                          </span>
                        </div>

                        <p className="text-[11px] text-neutral-400 leading-relaxed">
                          {previewLongevity.note}
                        </p>

                        <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-[11px]">
                          <span className="text-neutral-400">
                            Annualized Cost ({selectedGrade.shortName} in {previewProv.code}):
                          </span>
                          <span className="text-white font-mono font-bold">
                            {formatCAD(annualizedVal)} / year <span className="text-neutral-500 font-normal">({previewLongevity.avgYears} yr avg)</span>
                          </span>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Expandable Technical Metallurgical & Lab Comparison Matrix */}
                  {showDurabilityDeepDive && (
                    <div className="pt-2 border-t border-neutral-800 space-y-2">
                      <div className="text-[11px] font-bold text-neutral-300 flex items-center space-x-1.5">
                        <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Metallurgical Engineering &amp; ASTM Lab Comparison</span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-[10px] text-left border-collapse">
                          <thead>
                            <tr className="border-b border-neutral-800 text-neutral-400">
                              <th className="py-1.5 pr-2 font-semibold">Specification Metric</th>
                              <th className="py-1.5 px-2 font-semibold">Standard Arch.</th>
                              <th className="py-1.5 px-2 font-semibold text-amber-400">Heavy-Duty Comm.</th>
                              <th className="py-1.5 pl-2 font-semibold text-sky-400">Marine / Arctic</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-850 text-neutral-300">
                            <tr>
                              <td className="py-1.5 pr-2 text-neutral-400 font-medium">Steel Core Gauge &amp; Alloy</td>
                              <td className="py-1.5 px-2 font-mono">20-Ga (0.91mm) Galvalume®</td>
                              <td className="py-1.5 px-2 font-mono text-amber-300">16-Ga (1.52mm) High-Tensile</td>
                              <td className="py-1.5 pl-2 font-mono text-sky-300">14-Ga (1.98mm) ZAM® Alloy</td>
                            </tr>
                            <tr>
                              <td className="py-1.5 pr-2 text-neutral-400 font-medium">Salt / Corrosion Resistance</td>
                              <td className="py-1.5 px-2 font-mono">Standard</td>
                              <td className="py-1.5 px-2 font-mono text-amber-300">Enhanced</td>
                              <td className="py-1.5 pl-2 font-mono text-sky-300">Premium</td>
                            </tr>
                            <tr>
                              <td className="py-1.5 pr-2 text-neutral-400 font-medium">Sub-Zero Shatter Rating</td>
                              <td className="py-1.5 px-2 font-mono">-25°C</td>
                              <td className="py-1.5 px-2 font-mono text-amber-300">-40°C Deep Polar</td>
                              <td className="py-1.5 pl-2 font-mono text-sky-300">-55°C Arctic Vortex</td>
                            </tr>
                            <tr>
                              <td className="py-1.5 pr-2 text-neutral-400 font-medium">Blizzard Wind Resistance</td>
                              <td className="py-1.5 px-2 font-mono">120 km/h</td>
                              <td className="py-1.5 px-2 font-mono text-amber-300">150 km/h (+25%)</td>
                              <td className="py-1.5 pl-2 font-mono text-sky-300">180 km/h (+50%)</td>
                            </tr>
                            <tr>
                              <td className="py-1.5 pr-2 text-neutral-400 font-medium">Powder Coating Resin</td>
                              <td className="py-1.5 px-2">AAMA 2603 Super Polyester</td>
                              <td className="py-1.5 px-2 text-amber-300">AAMA 2604 Super-Durable TGIC</td>
                              <td className="py-1.5 pl-2 text-sky-300">AAMA 2605 100% PVDF Kynar®</td>
                            </tr>
                            <tr>
                              <td className="py-1.5 pr-2 text-neutral-400 font-medium">Fastener Metallurgy</td>
                              <td className="py-1.5 px-2">Ruspert Multi-Coated Zinc</td>
                              <td className="py-1.5 px-2 text-amber-300">Grade 304 Stainless Steel</td>
                              <td className="py-1.5 pl-2 text-sky-300">Grade 316 Marine Stainless</td>
                            </tr>
                            <tr>
                              <td className="py-1.5 pr-2 text-neutral-400 font-medium">Non-Prorated Warranty</td>
                              <td className="py-1.5 px-2 font-bold text-white">25 Years</td>
                              <td className="py-1.5 px-2 font-bold text-amber-400">35 Years</td>
                              <td className="py-1.5 pl-2 font-bold text-sky-400">50 Years / Lifetime</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 5. Color / Coating Finishes */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    5. Architectural Powder Coat &amp; Material Finish
                  </label>
                  <span className="text-xs text-neutral-400">
                    {selectedColor.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FENCE_COLORS.map((color) => {
                    const isWoodgrain = color.id === 'walnut-woodgrain';
                    const isCorten = color.id === 'corten-rust';
                    return (
                      <button
                        key={color.id}
                        onClick={() => onChangeConfig({ ...config, color: color.id })}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-center space-x-2.5 cursor-pointer ${
                          config.color === color.id
                            ? 'border-amber-500 bg-amber-500/10 text-white shadow-sm'
                            : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full shrink-0 border border-neutral-600 shadow-sm"
                          style={{ backgroundColor: color.hex }}
                        ></span>
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] font-bold text-white block truncate">
                            {color.name.split(' ')[0]}
                          </span>
                          <span className="text-[9px] text-neutral-400 block truncate">
                            {isWoodgrain ? '+$18/LF' : isCorten ? '+$12/LF' : 'Standard'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 6. Canadian Province (Frost Line & Provincial Tax) */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    6. Canadian Installation Region &amp; Provincial Taxes
                  </label>
                  <span className="text-xs text-sky-400 font-bold">
                    {selectedProvince.frostDepthInches}&quot; Frost Depth ({selectedProvince.code})
                  </span>
                </div>

                <select
                  value={config.province}
                  onChange={(e) => {
                    onChangeConfig({ ...config, province: e.target.value });
                    setPreviewProvinceCode(e.target.value);
                  }}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer font-medium"
                >
                  {CANADIAN_PROVINCES.map((prov) => {
                    const taxes: Record<string, string> = {
                      ON: '13% HST',
                      BC: '12% GST/PST',
                      AB: '5% GST (0% PST)',
                      QC: '14.975% QST/GST',
                      'MB-SK': '11% GST/PST',
                      ATL: '15% HST',
                    };
                    return (
                      <option key={prov.code} value={prov.code}>
                        {prov.name} — {taxes[prov.code] || '13% HST'} | {prov.frostDepthInches}&quot; Frost Line | {prov.avgWinterLowC}°C
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* 7. Soil Type & Post Foundation Engineering */}
              <div className="space-y-3 pt-3 border-t border-neutral-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                    7. Soil Type &amp; Post Foundation Engineering
                  </label>
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Frost Heave Resistant
                  </span>
                </div>

                {/* Soil Type Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-neutral-400 block font-medium">
                    Property Soil Condition (Auto-Adjusts Foundation Requirement):
                  </label>
                  <select
                    value={config.soilType || 'standard-loam'}
                    onChange={(e) => {
                      const newSoilId = e.target.value as SoilTypeId;
                      const targetSoil = getSoilType(newSoilId);
                      onChangeConfig({
                        ...config,
                        soilType: newSoilId,
                        postMount: targetSoil.recommendedPostMount,
                      });
                    }}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer font-medium"
                  >
                    {SOIL_TYPES.map((soil) => (
                      <option key={soil.id} value={soil.id}>
                        {soil.name} — {soil.frostHeaveRisk} Heave Risk | Recommends: {soil.recommendedMountName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Post Mount Selector Buttons with Recommended Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
                  {(() => {
                    const currentSoil = getSoilType(config.soilType || 'standard-loam');
                    return (
                      <>
                        <button
                          type="button"
                          onClick={() => onChangeConfig({ ...config, postMount: 'deep-frost-ground' })}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            config.postMount === 'deep-frost-ground'
                              ? 'border-amber-500 bg-amber-500/10 text-white font-bold shadow-sm'
                              : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="block font-bold">Deep Frost Sleeve</span>
                            {currentSoil.recommendedPostMount === 'deep-frost-ground' && (
                              <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                                Recommended
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-neutral-400 block mt-0.5">
                            Included in Turnkey ({selectedProvince.frostDepthInches}&quot; depth)
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onChangeConfig({ ...config, postMount: 'helical-pile' })}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            config.postMount === 'helical-pile'
                              ? 'border-amber-500 bg-amber-500/10 text-white font-bold shadow-sm'
                              : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="block font-bold">Helical Screw Piles</span>
                            {currentSoil.recommendedPostMount === 'helical-pile' && (
                              <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                                Recommended
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-amber-400 block mt-0.5">
                            +$145/post (Torque Driven)
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onChangeConfig({ ...config, postMount: 'surface-baseplate' })}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            config.postMount === 'surface-baseplate'
                              ? 'border-amber-500 bg-amber-500/10 text-white font-bold shadow-sm'
                              : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="block font-bold">Concrete Slab Flange</span>
                            {currentSoil.recommendedPostMount === 'surface-baseplate' && (
                              <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                                Recommended
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-neutral-400 block mt-0.5">
                            +$45/post (Wedge Anchors)
                          </span>
                        </button>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* 8. Gate, Barrier Arms & Security Systems */}
              <div className="space-y-3 pt-3 border-t border-neutral-800">
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                  8. Gate Systems &amp; Automated Barrier
                </label>

                <select
                  value={config.includeGate}
                  onChange={(e) => onChangeConfig({ ...config, includeGate: e.target.value as GateType })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer font-medium"
                >
                  {GATE_OPTIONS.map((gate) => (
                    <option key={gate.id} value={gate.id}>
                      {gate.name} ({gate.priceFormula}) — {gate.category}
                    </option>
                  ))}
                </select>

                {/* Sub-Zero Automation Option */}
                {config.includeGate !== 'none' && config.includeGate !== 'barrier-arm-automatic' && (
                  <div className="flex items-center justify-between p-3 bg-neutral-900 rounded-xl border border-neutral-800 text-xs">
                    <div>
                      <span className="font-bold text-white block">Automated Motor Operator (-40°C Brushless)</span>
                      <span className="text-[10px] text-neutral-400">Includes 2 wireless remotes, smartphone Wi-Fi &amp; safety photocells (+$1,850)</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.gateAutomation}
                      onChange={(e) => onChangeConfig({ ...config, gateAutomation: e.target.checked })}
                      className="w-5 h-5 accent-amber-500 rounded cursor-pointer shrink-0 ml-3"
                    />
                  </div>
                )}

                {/* Security Systems & Access Control */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                    Security &amp; Smart Access Control
                  </label>
                  <select
                    value={config.securityPackage || 'none'}
                    onChange={(e) => onChangeConfig({ ...config, securityPackage: e.target.value as SecurityPackageType })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer font-medium"
                  >
                    {SECURITY_PACKAGES.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} {pkg.price > 0 ? `(+${pkg.price} CAD)` : '(Standard Mechanical)'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Solar Off-Grid Power Kit */}
                {config.includeGate !== 'none' && (
                  <div className="flex items-center justify-between p-3 bg-neutral-900 rounded-xl border border-neutral-800 text-xs">
                    <div>
                      <span className="font-bold text-white block">Off-Grid Solar Power Resilience Kit</span>
                      <span className="text-[10px] text-neutral-400">Twin AGM batteries + MPPT solar charge controller (+$680)</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.solarBackupPower}
                      onChange={(e) => onChangeConfig({ ...config, solarBackupPower: e.target.checked })}
                      className="w-5 h-5 accent-amber-500 rounded cursor-pointer shrink-0 ml-3"
                    />
                  </div>
                )}

                {/* Integrated Low Voltage LED Channel */}
                <div className="flex items-center justify-between p-3 bg-neutral-900 rounded-xl border border-neutral-800 text-xs">
                  <div>
                    <span className="font-bold text-white block">Architectural Post-Cap Low-Voltage LEDs</span>
                    <span className="text-[10px] text-neutral-400">IP67 waterproof 2700K warm white fixture on every post + outdoor transformer ($48/post + $250)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.integratedLedLighting}
                    onChange={(e) => onChangeConfig({ ...config, integratedLedLighting: e.target.checked })}
                    className="w-5 h-5 accent-amber-500 rounded cursor-pointer shrink-0 ml-3"
                  />
                </div>

                {/* Installation Method Toggle */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2">
                    Installation Service Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => onChangeConfig({ ...config, installationType: 'turnkey-pro' })}
                      className={`p-3 rounded-xl border text-left cursor-pointer ${
                        config.installationType === 'turnkey-pro'
                          ? 'border-amber-500 bg-amber-500/10 text-white font-bold'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                      }`}
                    >
                      <span className="font-bold block text-amber-400">Certified Turnkey Pro</span>
                      <span className="text-[10px] text-neutral-400 block mt-0.5">
                        Includes excavation, deep frost footings, laser alignment, full cleanup &amp; warranty
                      </span>
                    </button>

                    <button
                      onClick={() => onChangeConfig({ ...config, installationType: 'supply-diy' })}
                      className={`p-3 rounded-xl border text-left cursor-pointer ${
                        config.installationType === 'supply-diy'
                          ? 'border-amber-500 bg-amber-500/10 text-white font-bold'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                      }`}
                    >
                      <span className="font-bold block">Direct Freight Supply Only</span>
                      <span className="text-[10px] text-neutral-400 block mt-0.5">
                        Pre-fabricated modules, posts, and hardware crates delivered directly to your site
                      </span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Right Column: Live Dynamic Output, Itemized BOM & Financial Dashboard (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Dynamic Total Price Card */}
            <div className="bg-neutral-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Typical {estimate.warrantyYears}-Year Warranty Range ({selectedGrade.shortName})</span>
                  </div>
                  <button
                    onClick={() => setShowQrModal(true)}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-amber-400 text-[11px] font-medium border border-neutral-800 transition-colors cursor-pointer"
                    title="Scan QR to open on mobile"
                  >
                    <QrCode className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mobile QR Sync</span>
                  </button>
                </div>
                
                <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  Estimated Total Project Cost
                </h3>
                
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-black text-white font-['Space_Grotesk'] tracking-tight">
                    {formatCAD(estimate.totalBeforeTax)}
                  </span>
                  <span className="text-xs font-bold text-neutral-400">
                    CAD (Pre-Tax)
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-400 mt-2 pt-2 border-t border-neutral-900">
                  <span>Unit Rate: <strong className="text-amber-400 font-mono">${estimate.effectivePerFoot} / Linear Foot</strong></span>
                  {estimate.bulkDiscountPercent && estimate.bulkDiscountPercent > 0 ? (
                    <span className="text-emerald-400 font-bold flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{estimate.bulkDiscountPercent}% Bulk Rebate ({formatCAD(estimate.bulkDiscountAmount || 0)})</span>
                    </span>
                  ) : (
                    <span>{config.linearFeet} LF • {config.heightFeet}ft Height</span>
                  )}
                </div>

                {/* Longevity & Annualized Cost Callout */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 block">Expected Lifespan ({selectedProvince.code}):</span>
                    <span className="font-bold text-amber-400 font-mono text-sm block mt-0.5">
                      {estimate.expectedLongevityYears}
                    </span>
                  </div>
                  <div className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 block">Annualized Cost:</span>
                    <span className="font-bold text-white font-mono text-sm block mt-0.5">
                      {formatCAD(estimate.annualizedCost || 0)} <span className="text-[10px] text-neutral-400 font-normal">/ yr</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Itemized Cost Breakdown Table */}
              <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 space-y-2.5 text-xs">
                <div className="flex justify-between items-center font-bold text-neutral-200 border-b border-neutral-800 pb-2">
                  <div className="flex items-center space-x-1.5">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
                    <span>Itemized Breakdown</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 uppercase font-mono">Cost (CAD)</span>
                </div>

                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-400">
                    Infill Panels ({estimate.panelsCount} modules):
                  </span>
                  <span className="font-mono text-white">
                    {formatCAD(Math.round((estimate.rawMaterialsCost || estimate.materialsCost) * 0.7))}
                  </span>
                </div>

                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-400">
                    Structural Posts &amp; Fasteners ({estimate.postsCount} posts):
                  </span>
                  <span className="font-mono text-white">
                    {formatCAD(Math.round((estimate.rawMaterialsCost || estimate.materialsCost) * 0.3))}
                  </span>
                </div>

                {/* Bulk Wholesale Volume Discount Line Item */}
                {estimate.bulkDiscountAmount && estimate.bulkDiscountAmount > 0 ? (
                  <div className="flex justify-between items-center bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1.5 rounded-xl text-emerald-300">
                    <div className="flex items-center space-x-1.5">
                      <Percent className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>
                        Wholesale Volume Discount ({estimate.bulkDiscountPercent}% {estimate.bulkTier?.shortName}):
                      </span>
                    </div>
                    <span className="font-mono font-black text-emerald-300">
                      -{formatCAD(estimate.bulkDiscountAmount)}
                    </span>
                  </div>
                ) : null}

                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-400">
                    Material Grade ({selectedGrade.shortName}):
                  </span>
                  <span className={`font-mono ${estimate.materialGradeAddonCost && estimate.materialGradeAddonCost > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {estimate.materialGradeAddonCost && estimate.materialGradeAddonCost > 0
                      ? `+${formatCAD(estimate.materialGradeAddonCost)}`
                      : 'Included ($0)'}
                  </span>
                </div>

                {config.installationType === 'turnkey-pro' && (
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-400">
                      Certified Turnkey Labor (Excavation + Install):
                    </span>
                    <span className="font-mono text-white">
                      {formatCAD(estimate.installationCost)}
                    </span>
                  </div>
                )}

                {estimate.gateCost > 0 && (
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-400">
                      Gate &amp; Barrier System {config.gateAutomation ? '(+ Motor)' : ''}:
                    </span>
                    <span className="font-mono text-white">
                      {formatCAD(estimate.gateCost)}
                    </span>
                  </div>
                )}

                {estimate.securityCost > 0 && (
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-400">
                      Security &amp; Smart Access Control:
                    </span>
                    <span className="font-mono text-white">
                      {formatCAD(estimate.securityCost)}
                    </span>
                  </div>
                )}

                {estimate.lightingCost > 0 && (
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-400">
                      Low-Voltage LED Channel ({estimate.postsCount} Caps + Hub):
                    </span>
                    <span className="font-mono text-white">
                      {formatCAD(estimate.lightingCost)}
                    </span>
                  </div>
                )}

                <div className="border-t border-neutral-800 pt-2 flex justify-between text-neutral-400">
                  <span>
                    Provincial Tax ({selectedProvince.name} {((estimate.provincialTaxRate || 0.13) * 100).toFixed(1)}%):
                  </span>
                  <span className="font-mono text-neutral-300">
                    {formatCAD(estimate.provincialTaxAmount || 0)}
                  </span>
                </div>

                <div className="border-t border-neutral-700/80 pt-2 flex justify-between items-baseline font-bold text-sm">
                  <span className="text-amber-400">Grand Total with Tax:</span>
                  <span className="font-mono text-white text-base">
                    {formatCAD(estimate.grandTotalWithTax || estimate.totalBeforeTax)} CAD
                  </span>
                </div>
              </div>

              {/* Canadian Low-Payment Financing Calculator */}
              <div className="bg-neutral-900/90 rounded-2xl p-4 border border-neutral-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>Flexible Financing Plan</span>
                  </span>
                  <span className="text-[10px] bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded font-semibold border border-sky-500/30">
                    0% OAC Available
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Estimated Monthly Payment:</span>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-sky-400 font-mono">
                      ${monthlyPayment}
                    </span>
                    <span className="text-[10px] text-neutral-400"> / month</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {[24, 36, 48].map((months) => (
                    <button
                      key={months}
                      onClick={() => setSelectedFinanceMonths(months as 24 | 36 | 48)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                        selectedFinanceMonths === months
                          ? 'bg-sky-500 text-neutral-950 border-sky-400'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {months} Months
                    </button>
                  ))}
                </div>
              </div>

              {/* 20-Year Lifetime Savings vs Pressure-Treated Wood */}
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400 flex items-center space-x-1.5">
                    <TrendingDown className="w-4 h-4" />
                    <span>20-Year TCO Comparison</span>
                  </span>
                  <span className="text-[10px] text-emerald-300 font-mono bg-emerald-900/60 px-2 py-0.5 rounded">
                    Save ~${formatCAD(estimate.lifetimeSavingsVsWood).replace('$', '')}
                  </span>
                </div>
                <p className="text-neutral-300 text-[11px] leading-relaxed">
                  Pressure-treated wood rots in Canadian frost, requiring staining every 2 years ($800) and replacement by Year 10 (Total: {formatCAD(estimate.twentyYearWoodCost)}).
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  id="calc-lock-in-quote-btn"
                  onClick={() => onOpenQuote(config)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Lock In Quote &amp; Request Certified Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleCopySummary}
                    className="py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold border border-neutral-800 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    {copiedSummary ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowPdfModal(true)}
                    className="py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold border border-neutral-800 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* PDF Generation Custom Information Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  Generate PDF Engineering Quote
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Includes full specifications, provincial tax &amp; mobile QR code
                </p>
              </div>
              <button
                onClick={() => setShowPdfModal(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCustomPdfSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-300 font-bold block mb-1">
                  Client / Company Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Alexander Vance"
                    value={pdfClientData.name}
                    onChange={(e) => setPdfClientData({ ...pdfClientData, name: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-300 font-bold block mb-1">
                  Site Installation Address
                </label>
                <div className="relative">
                  <Home className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. 1420 Lakeshore Blvd, Toronto, ON"
                    value={pdfClientData.address}
                    onChange={(e) => setPdfClientData({ ...pdfClientData, address: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 font-bold block mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="alex@example.ca"
                    value={pdfClientData.email}
                    onChange={(e) => setPdfClientData({ ...pdfClientData, email: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 font-bold block mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="(416) 555-0199"
                    value={pdfClientData.phone}
                    onChange={(e) => setPdfClientData({ ...pdfClientData, phone: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <button
                  type="submit"
                  disabled={isGeneratingPdf}
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  {isGeneratingPdf ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span>Generate Official PDF Quote</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Share Modal for Instant Mobile Sync */}
      <QrShareModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        config={config}
      />

    </section>
  );
};
