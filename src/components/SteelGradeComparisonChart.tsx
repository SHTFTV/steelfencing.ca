import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Wrench,
  Droplets,
  Sun,
  Wind,
  ThermometerSnowflake,
  Award,
  Clock,
  BarChart2,
  Layers,
  ArrowRight,
  Eye,
  Check,
  Minus,
  Info,
  Zap,
} from 'lucide-react';
import { MATERIAL_GRADES } from '../data/materialGrades';
import { MaterialGradeId } from '../types';

interface SteelGradeComparisonChartProps {
  onSelectGradeForEstimate?: (gradeId: MaterialGradeId) => void;
  onOpenQuote?: () => void;
}

export const SteelGradeComparisonChart: React.FC<SteelGradeComparisonChartProps> = ({
  onSelectGradeForEstimate,
  onOpenQuote,
}) => {
  const [activeViewMode, setActiveViewMode] = useState<'matrix' | 'visual-bars' | 'scenarios'>('matrix');
  const [highlightedGrade, setHighlightedGrade] = useState<'standard' | 'heavy-duty' | 'marine-arctic'>('heavy-duty');

  const standardGrade = MATERIAL_GRADES.find((g) => g.id === 'standard') || MATERIAL_GRADES[0];
  const heavyDutyGrade = MATERIAL_GRADES.find((g) => g.id === 'heavy-duty') || MATERIAL_GRADES[1];
  const marineArcticGrade = MATERIAL_GRADES.find((g) => g.id === 'marine-arctic') || MATERIAL_GRADES[2];

  // Visual metric score comparisons (0-100 scale)
  const comparisonMetrics = [
    {
      label: 'Core Steel Impact & Dent Resistance',
      description: 'Physical resistance against lawnmower stones, snowplow discharge, and heavy collisions',
      icon: Shield,
      standard: { score: 68, label: '20-Ga (0.91mm)', detail: 'Standard Suburban Proof' },
      highDurability: { score: 92, label: '16-Ga (1.52mm)', detail: '65% Thicker High-Tensile' },
      marineGrade: { score: 98, label: '14-Ga (1.98mm)', detail: 'Max Armor ZAM® Alloy' },
    },
    {
      label: 'De-Icing Road Salt & Chemical Resistance',
      description: 'Protection against calcium chloride winter road slush and airborne coastal brine spray',
      icon: Droplets,
      standard: { score: 65, label: 'Standard Salt Resistance', detail: 'Suburban Sheltered' },
      highDurability: { score: 90, label: 'Enhanced Salt Resistance', detail: 'Elevated Salt Fog Protection' },
      marineGrade: { score: 99, label: 'Premium Salt Resistance', detail: 'Marine/Ocean Grade' },
    },
    {
      label: 'Sub-Zero Shatter & Thermal Contraction',
      description: 'Resilience against Canadian polar vortex freeze-thaw cycles without micro-fissures',
      icon: ThermometerSnowflake,
      standard: { score: 72, label: '-25°C Rated', detail: 'Standard Freeze Proof' },
      highDurability: { score: 94, label: '-40°C Tested', detail: 'Deep Polar Vortex Grade' },
      marineGrade: { score: 100, label: '-55°C Tested', detail: 'Extreme Polar Grade' },
    },
    {
      label: 'Blizzard & Severe Chinook Wind Load',
      description: 'Engineered structural integrity during prairie windstorms and coastal nor\'easters',
      icon: Wind,
      standard: { score: 70, label: '120 km/h Rating', detail: 'Standard Wind Rated' },
      highDurability: { score: 88, label: '150 km/h Rating', detail: 'Hurricane-Force Resistant' },
      marineGrade: { score: 98, label: '180 km/h Rating', detail: 'Category 2 Hurricane Proof' },
    },
    {
      label: 'Aesthetic UV Retention & Anti-Chalking',
      description: 'Resistance to ultraviolet solar fading, yellowing, and powder coat gloss degradation',
      icon: Sun,
      standard: { score: 70, label: 'AAMA 2603 Super Poly', detail: '10-Yr Gloss Stability' },
      highDurability: { score: 91, label: 'AAMA 2604 TGIC', detail: '25-Yr High-UV Resin' },
      marineGrade: { score: 99, label: 'AAMA 2605 PVDF Kynar®', detail: '35+ Yr Fluoropolymer Lustre' },
    },
    {
      label: 'Zero-Maintenance Freedom',
      description: 'Ease of cleaning and resistance to surface stain absorption or micro-corrosion bleeding',
      icon: Wrench,
      standard: { score: 80, label: 'Spring Hose Rinse', detail: 'Annual freshwater wash' },
      highDurability: { score: 95, label: 'Near-Zero Upkeep', detail: 'Self-clearing satin TGIC' },
      marineGrade: { score: 99, label: 'Hydrophobic Surface', detail: 'Self-shedding Kynar® PVDF' },
    },
  ];

  const comparisonCategories = [
    {
      title: '1. Durability & Structural Armor',
      icon: ShieldCheck,
      badge: 'Core Metallurgy',
      items: [
        {
          feature: 'Steel Core Thickness',
          standard: '20-Gauge (0.91 mm)',
          highDurability: '16-Gauge (1.52 mm) — 65% Thicker',
          advantage: 'High-Durability offers 2.1x structural rigidity against accidental impact',
        },
        {
          feature: 'Base Metallurgical Alloy',
          standard: 'Cold-Rolled Galvalume® (Zinc-Alu)',
          highDurability: 'High-Tensile Structural 50ksi Steel',
          advantage: 'Reinforced grain boundary prevents cold-weather brittle fracture',
        },
        {
          feature: 'Salt & Chemical Resistance',
          standard: 'Standard corrosion protection',
          highDurability: 'Enhanced corrosion protection',
          advantage: 'Greater salt resistance for heavy winter calcium chloride road spray',
        },
        {
          feature: 'Sub-Zero Temperature Rating',
          standard: 'Down to -25°C',
          highDurability: 'Down to -40°C Polar Vortex Proof',
          advantage: 'Survives severe Western Prairie and Northern freeze-thaw upheaval',
        },
        {
          feature: 'Wind Load Engineering',
          standard: '120 km/h (Class 2 Gale)',
          highDurability: '150 km/h (Blizzard / Hurricane Gusts)',
          advantage: 'High-Durability resists lateral wind-packed snowdrift warping',
        },
        {
          feature: 'Structural Warranty Protection',
          standard: '25-Year Non-Prorated Warranty',
          highDurability: '35-Year Commercial Warranty (+40%)',
          advantage: 'Full transferable coverage against rust-through & weld failure',
        },
      ],
    },
    {
      title: '2. Maintenance Needs & Care Lifecycle',
      icon: Wrench,
      badge: 'Zero-Maintenance',
      items: [
        {
          feature: 'Routine Cleaning Cadence',
          standard: 'Annual spring freshwater hose rinse',
          highDurability: 'Virtually zero maintenance (bi-annual rinse optional)',
          advantage: 'Non-porous TGIC resin naturally repels organic grime and dust adhesion',
        },
        {
          feature: 'Road Salt Slush Tolerance',
          standard: 'Standard tolerance (rinse after salting)',
          highDurability: 'Heavy industrial & highway salt tolerance',
          advantage: 'Zinc-aluminum sacrificial layer prevents electrolytic rust migration',
        },
        {
          feature: 'Scratch & Abrasion Healing',
          standard: 'Galvanic sacrificial zinc barrier',
          highDurability: 'High-density zinc migration + factory touch-up kit',
          advantage: 'Surface micro-scratches do not produce creeping rust blisters',
        },
        {
          feature: 'Repainting / Staining Needs',
          standard: 'Never required ($0 20-yr maintenance)',
          highDurability: 'Never required ($0 20-yr maintenance)',
          advantage: 'Both grades eliminate wood scraping, chemical sealers, and re-staining',
        },
        {
          feature: 'Expected Lifetime in Canada',
          standard: '25 to 30 Years (Suburban lot)',
          highDurability: '35 to 45 Years (+50% Lifespan)',
          advantage: 'Lowers real annualized cost of ownership to just $52/year',
        },
      ],
    },
    {
      title: '3. Aesthetic Finish, Texture & UV Longevity',
      icon: Sparkles,
      badge: 'Architectural Sheen',
      items: [
        {
          feature: 'Architectural Coating Chemistry',
          standard: 'AAMA 2603 Super Polyester Resin',
          highDurability: 'AAMA 2604 Super-Durable TGIC Polyester',
          advantage: 'Superior cross-linked polymer bond resists micro-chalking',
        },
        {
          feature: 'UV Solar Resistance (Delta E)',
          standard: 'Standard UV-resistant resin',
          highDurability: 'High-UV-resistant resin formulation',
          advantage: 'Greater resistance to color fading in intense direct sunlight',
        },
        {
          feature: 'Surface Texture & Lustre',
          standard: 'Satin architectural smooth matte (30% gloss)',
          highDurability: 'Refined velvet micro-texture (reduces fingerprint marks)',
          advantage: 'Hides dust particles, water spots, and micro-scratches seamlessly',
        },
        {
          feature: 'Edge Coating Wrap & Uniformity',
          standard: 'Precision electrostatic powder coat (2.5 mil)',
          highDurability: 'High-build edge wrap coating (3.5–4.0 mil)',
          advantage: 'Prevents edge thinning on laser-cut slats and weld joints',
        },
        {
          feature: 'Available Color Range',
          standard: 'All 6 Architectural Colors',
          highDurability: 'All 6 Colors + Custom RAL Color Matching',
          advantage: 'Allows exact color matching to modern window mullions & cladding',
        },
      ],
    },
  ];

  const useCases = [
    {
      title: 'When Standard Architectural Grade is Ideal:',
      grade: 'Standard Architectural (20-Gauge / 25-Yr)',
      icon: Shield,
      accent: 'border-neutral-700 bg-neutral-900/80',
      tag: 'Best for Residential Subdivisions',
      points: [
        'Protected suburban residential properties with perimeter landscaping or windbreaks',
        'Standard backyard privacy fencing situated away from high-speed salted municipal thoroughfares',
        'Homeowners prioritizing modern architectural aesthetics with the lowest upfront cost per linear foot',
        'Mild to moderate Canadian climate zones (e.g. standard Ontario, Vancouver lower mainland, Calgary suburbs)',
      ],
    },
    {
      title: 'When High-Durability Grade is Strongly Recommended:',
      grade: 'Heavy-Duty Commercial (16-Gauge / 35-Yr)',
      icon: Zap,
      accent: 'border-amber-500/60 bg-gradient-to-b from-amber-500/10 to-neutral-900 shadow-xl ring-1 ring-amber-500/40',
      tag: 'Best Overall Value & Climate Resilience',
      points: [
        'Roadside, corner-lot, or driveway perimeters exposed to winter snowplow discharge and calcium chloride de-icing spray',
        'High-wind exposure zones (open prairie subdivisions in AB/SK/MB, lakefronts, or elevated hilltops)',
        'Active family yards with energetic large dogs, children playing sports, or riding lawnmowers',
        'Commercial properties, multi-family developments, or properties seeking maximum resale equity protection',
      ],
    },
  ];

  return (
    <div className="mt-12 bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8">
      
      {/* Header & Badges */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400 mb-2.5">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Canadian Metallurgical Specification Guide</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk'] tracking-tight">
            Steel Grade Comparison: <span className="text-amber-400">Standard</span> vs. <span className="text-amber-400">High-Durability</span>
          </h3>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
            Side-by-side technical evaluation of Canadian climate durability, maintenance requirements, and architectural powder-coat finishes to help you select the optimal grade for your perimeter.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="inline-flex p-1 bg-neutral-900 rounded-2xl border border-neutral-800 shrink-0">
          <button
            type="button"
            onClick={() => setActiveViewMode('matrix')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeViewMode === 'matrix'
                ? 'bg-amber-500 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Detailed Matrix</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveViewMode('visual-bars')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeViewMode === 'visual-bars'
                ? 'bg-amber-500 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Visual Ratings (0-100)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveViewMode('scenarios')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeViewMode === 'scenarios'
                ? 'bg-amber-500 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Which Grade Do I Need?</span>
          </button>
        </div>
      </div>

      {/* Grade Quick Cards Header (Side-by-Side Highlights) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Card 1: Standard Architectural */}
        <div
          onClick={() => setHighlightedGrade('standard')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
            highlightedGrade === 'standard'
              ? 'bg-neutral-900 border-neutral-600 ring-1 ring-neutral-500/50 shadow-lg'
              : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                Baseline Grade
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">Included ($0/LF)</span>
            </div>
            <h4 className="text-lg font-black text-white font-['Space_Grotesk']">
              Standard Architectural
            </h4>
            <p className="text-xs text-neutral-400 mt-1 leading-snug">
              20-Gauge cold-rolled Galvalume® steel with AAMA 2603 thermoset powder coat.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-800 space-y-1.5 text-[11px] font-mono">
            <div className="flex justify-between text-neutral-300">
              <span className="text-neutral-400">Warranty:</span>
              <span className="font-bold text-white">25-Year Non-Prorated</span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span className="text-neutral-400">Canadian Lifespan:</span>
              <span className="font-bold text-amber-400">25–30 Years</span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span className="text-neutral-400">Salt Resistance:</span>
              <span>Standard</span>
            </div>
          </div>
        </div>

        {/* Card 2: High-Durability Commercial (Highlighted Recommended) */}
        <div
          onClick={() => setHighlightedGrade('heavy-duty')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
            highlightedGrade === 'heavy-duty'
              ? 'bg-gradient-to-b from-amber-500/15 via-neutral-900 to-neutral-950 border-amber-500 ring-2 ring-amber-500/50 shadow-2xl'
              : 'bg-neutral-900/90 border-amber-500/30 hover:border-amber-500/60'
          }`}
        >
          <div className="absolute -top-3 right-4 bg-amber-500 text-neutral-950 text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
            Most Recommended in Canada
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                High-Durability Spec
              </span>
              <span className="text-xs font-mono font-bold text-amber-400">+18% (+$14/LF)</span>
            </div>
            <h4 className="text-lg font-black text-white font-['Space_Grotesk']">
              Heavy-Duty Commercial
            </h4>
            <p className="text-xs text-neutral-300 mt-1 leading-snug">
              16-Gauge 65% thicker high-tensile structural core with AAMA 2604 Super-Durable TGIC resin.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-800 space-y-1.5 text-[11px] font-mono">
            <div className="flex justify-between text-neutral-300">
              <span className="text-neutral-400">Warranty:</span>
              <span className="font-bold text-amber-400">35-Year Commercial</span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span className="text-neutral-400">Canadian Lifespan:</span>
              <span className="font-bold text-amber-400">35–45 Years (+50%)</span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span className="text-neutral-400">Salt Resistance:</span>
              <span className="text-emerald-400 font-bold">Enhanced</span>
            </div>
          </div>
        </div>

        {/* Card 3: Marine & Arctic Polar Grade */}
        <div
          onClick={() => setHighlightedGrade('marine-arctic')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between md:col-span-2 lg:col-span-1 ${
            highlightedGrade === 'marine-arctic'
              ? 'bg-neutral-900 border-sky-500 ring-1 ring-sky-500/50 shadow-lg'
              : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                Ocean &amp; Polar Spec
              </span>
              <span className="text-xs font-mono font-bold text-sky-400">+35% (+$28/LF)</span>
            </div>
            <h4 className="text-lg font-black text-white font-['Space_Grotesk']">
              Ultra Marine &amp; Arctic
            </h4>
            <p className="text-xs text-neutral-400 mt-1 leading-snug">
              14-Gauge ZAM® zinc-magnesium core with dual-layer AAMA 2605 PVDF Kynar 500® coating.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-800 space-y-1.5 text-[11px] font-mono">
            <div className="flex justify-between text-neutral-300">
              <span className="text-neutral-400">Warranty:</span>
              <span className="font-bold text-sky-400">50-Year / Lifetime</span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span className="text-neutral-400">Canadian Lifespan:</span>
              <span className="font-bold text-sky-400">50+ Years (Lifetime)</span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span className="text-neutral-400">Salt Resistance:</span>
              <span className="text-sky-400 font-bold">Premium</span>
            </div>
          </div>
        </div>

      </div>

      {/* VIEW MODE 1: DETAILED SIDE-BY-SIDE MATRIX */}
      {activeViewMode === 'matrix' && (
        <div className="space-y-6">
          {comparisonCategories.map((category, catIdx) => {
            const Icon = category.icon;
            return (
              <div key={catIdx} className="bg-neutral-900/80 rounded-2xl border border-neutral-800 overflow-hidden shadow-md">
                
                {/* Category Header */}
                <div className="p-4 sm:p-5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-sm sm:text-base font-['Space_Grotesk']">
                        {category.title}
                      </h4>
                      <span className="text-[11px] text-neutral-400">
                        Rigorous ASTM &amp; CGSB Canadian Standards Evaluation
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-neutral-800 text-amber-400 border border-neutral-700 hidden sm:inline-block">
                    {category.badge}
                  </span>
                </div>

                {/* Side-by-Side Comparison Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-neutral-950/80 border-b border-neutral-800 text-neutral-400 font-semibold">
                        <th className="py-3 px-4 w-1/3">Evaluation Metric</th>
                        <th className="py-3 px-4 w-1/3 bg-neutral-900/40 text-neutral-300">
                          <div className="flex items-center space-x-1.5">
                            <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
                            <span>Standard Architectural</span>
                          </div>
                        </th>
                        <th className="py-3 px-4 w-1/3 bg-amber-500/10 text-amber-400 font-bold border-l border-amber-500/20">
                          <div className="flex items-center space-x-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                            <span>High-Durability Commercial</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/80 text-neutral-300">
                      {category.items.map((row, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-neutral-850/40 transition-colors">
                          {/* Feature Name & Advantage */}
                          <td className="py-3 px-4 font-medium text-white align-top">
                            <div className="font-semibold text-xs text-white">{row.feature}</div>
                            <div className="text-[10px] text-neutral-400 mt-0.5 leading-tight">{row.advantage}</div>
                          </td>

                          {/* Standard Spec */}
                          <td className="py-3 px-4 bg-neutral-900/30 text-neutral-300 align-top font-mono text-[11px]">
                            {row.standard}
                          </td>

                          {/* High-Durability Spec */}
                          <td className="py-3 px-4 bg-amber-500/5 text-amber-300 font-medium align-top font-mono text-[11px] border-l border-amber-500/20">
                            <div className="font-bold text-amber-400 flex items-center space-x-1">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{row.highDurability}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* VIEW MODE 2: VISUAL PROGRESS METRIC BARS */}
      {activeViewMode === 'visual-bars' && (
        <div className="bg-neutral-900/80 rounded-2xl border border-neutral-800 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div>
              <h4 className="font-extrabold text-white text-base font-['Space_Grotesk']">
                Visual Resilience Scorecard (0–100 Index)
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Quantified performance across high-stress environmental variables.
              </p>
            </div>
            <div className="flex items-center space-x-4 text-xs font-mono">
              <div className="flex items-center space-x-1.5 text-neutral-400">
                <span className="w-3 h-3 rounded bg-neutral-600"></span>
                <span>Standard</span>
              </div>
              <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
                <span className="w-3 h-3 rounded bg-amber-500"></span>
                <span>High-Durability</span>
              </div>
              <div className="flex items-center space-x-1.5 text-sky-400 font-bold hidden sm:flex">
                <span className="w-3 h-3 rounded bg-sky-500"></span>
                <span>Marine/Arctic</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparisonMetrics.map((metric, idx) => {
              const MetricIcon = metric.icon;
              return (
                <div key={idx} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800/90 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                        <MetricIcon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">{metric.label}</span>
                        <span className="text-[10px] text-neutral-400 leading-tight block">{metric.description}</span>
                      </div>
                    </div>
                  </div>

                  {/* Standard Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-neutral-400">Standard Architectural ({metric.standard.label}):</span>
                      <span className="font-mono font-bold text-neutral-300">{metric.standard.score}/100</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-neutral-600 rounded-full transition-all duration-500"
                        style={{ width: `${metric.standard.score}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* High Durability Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-amber-400 font-bold">High-Durability Commercial ({metric.highDurability.label}):</span>
                      <span className="font-mono font-bold text-amber-400">{metric.highDurability.score}/100 (+{metric.highDurability.score - metric.standard.score}%)</span>
                    </div>
                    <div className="h-2.5 w-full bg-neutral-900 rounded-full overflow-hidden p-0.5 border border-amber-500/30">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${metric.highDurability.score}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Marine Grade Bar */}
                  <div className="space-y-1 pt-0.5">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-sky-400 font-medium">Marine / Arctic Polar ({metric.marineGrade.label}):</span>
                      <span className="font-mono font-bold text-sky-400">{metric.marineGrade.score}/100</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-500 rounded-full transition-all duration-500"
                        style={{ width: `${metric.marineGrade.score}%` }}
                      ></div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW MODE 3: SCENARIO MATCHER */}
      {activeViewMode === 'scenarios' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((scenario, idx) => {
            const SIcon = scenario.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${scenario.accent}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <SIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-neutral-950 text-amber-400 border border-neutral-800">
                      {scenario.tag}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-black text-white font-['Space_Grotesk']">
                      {scenario.title}
                    </h4>
                    <p className="text-xs font-mono font-bold text-amber-400 mt-1">
                      {scenario.grade}
                    </p>
                  </div>

                  <ul className="space-y-2.5 pt-2">
                    {scenario.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start space-x-2.5 text-xs text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/80">
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectGradeForEstimate) {
                        onSelectGradeForEstimate(idx === 0 ? 'standard' : 'heavy-duty');
                      }
                    }}
                    className="w-full py-2.5 bg-neutral-950 hover:bg-neutral-900 text-amber-400 hover:text-amber-300 border border-neutral-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>Select {idx === 0 ? 'Standard' : 'High-Durability'} in Pricing Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Summary Callout */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-neutral-900 to-neutral-950 border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-3 text-neutral-300">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <strong className="text-white block font-bold">100% Non-Prorated Anti-Perforation Warranty</strong>
            <span className="text-neutral-400">
              Both Standard (25-Yr) and High-Durability (35-Yr) grades are offered with warranty terms that may include non-prorated replacement — ask your installer for the specific terms available in your province.
            </span>
          </div>
        </div>

        {onOpenQuote && (
          <button
            type="button"
            onClick={onOpenQuote}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs rounded-xl whitespace-nowrap shadow-lg transition-colors cursor-pointer shrink-0"
          >
            Request Steel Samples
          </button>
        )}
      </div>

    </div>
  );
};
