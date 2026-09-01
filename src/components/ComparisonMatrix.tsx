import React, { useState } from 'react';
import { TECHNICAL_COMPARISONS } from '../data/climateData';
import {
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Calculator,
  ShieldCheck,
  Flame,
  Wind,
  Snowflake,
} from 'lucide-react';
import { formatCAD } from '../utils/calculator';

interface ComparisonMatrixProps {
  onOpenVisualizer: () => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ onOpenVisualizer }) => {
  const [footage, setFootage] = useState<number>(150);

  // 20-Year Total Cost of Ownership Calculation
  // Steel: Initial installation ($135/ft) + $0 annual maintenance + 0 replacement in 20 yrs
  const steelInitial = footage * 135;
  const steelMaintenance20Yr = 0;
  const steelTotal20Yr = steelInitial + steelMaintenance20Yr;

  // Wood: Initial installation ($85/ft) + Staining/repair ($8/ft every 2 years = $80/ft over 20 yrs) + 1 Full Tear-out & Rebuild at Year 11 ($110/ft)
  const woodInitial = footage * 85;
  const woodMaintenance20Yr = footage * 80;
  const woodRebuild20Yr = footage * 110;
  const woodTotal20Yr = woodInitial + woodMaintenance20Yr + woodRebuild20Yr;

  // Vinyl: Initial ($110/ft) + Cold repair / cracked panel replacements ($35/ft) + Total replacement after wind/shatter at year 14 ($130/ft)
  const vinylInitial = footage * 110;
  const vinylMaintenance20Yr = footage * 35;
  const vinylRebuild20Yr = footage * 130;
  const vinylTotal20Yr = vinylInitial + vinylMaintenance20Yr + vinylRebuild20Yr;

  const totalSavedWithSteel = woodTotal20Yr - steelTotal20Yr;

  return (
    <section id="comparison" className="py-16 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400 mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>The Canadian Climate Truth</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Why Steel Outlasts Wood &amp; Vinyl
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3">
            Canadian freeze-thaw cycles, sub-zero snow loads, and summer UV destroy traditional materials in under a decade. Here is the data.
          </p>
        </div>

        {/* 20-Year Total Cost of Ownership Interactive Widget */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Interactive Controls & ROI Callout */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                20-Year Lifecycle Cost Calculator
              </span>
              <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                How Much Does Cheap Fencing Really Cost?
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Wood and vinyl look cheaper on day one, but between annual chemical staining, warped boards, snowbank blowouts, and a full replacement every 10–12 years, steel saves homeowners thousands.
              </p>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-neutral-400">Your Property Linear Footage:</span>
                  <span className="text-white font-bold">{footage} Linear Feet</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="350"
                  step="10"
                  value={footage}
                  onChange={(e) => setFootage(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Big Savings Highlight */}
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block">
                  Estimated 20-Year Savings with Steel
                </span>
                <span className="text-3xl font-black text-white font-['Space_Grotesk'] block mt-1">
                  +{formatCAD(totalSavedWithSteel)} CAD
                </span>
                <span className="text-[11px] text-neutral-400 block mt-1">
                  Includes 0 staining weekends, 0 rot repairs, and 0 premature rebuilds.
                </span>
              </div>
            </div>

            {/* Right: Bar Chart Breakdown */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Steel Option */}
                <div className="p-5 bg-neutral-900 rounded-2xl border-2 border-amber-500/80 relative shadow-xl">
                  <div className="absolute -top-3 left-4 bg-amber-500 text-neutral-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                    Best Investment
                  </div>
                  <h4 className="text-base font-extrabold text-white mt-1">SteelFencing.ca</h4>
                  <p className="text-[11px] text-neutral-400">Galvalume® + TGIC Coat</p>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between text-neutral-300">
                      <span>Initial Install:</span>
                      <span className="font-mono text-white font-bold">{formatCAD(steelInitial)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-300">
                      <span>20-Yr Staining:</span>
                      <span className="font-mono text-emerald-400 font-bold">$0</span>
                    </div>
                    <div className="flex justify-between text-neutral-300">
                      <span>Rebuild Cost:</span>
                      <span className="font-mono text-emerald-400 font-bold">$0 (30-Yr Warranty)</span>
                    </div>
                    <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline">
                      <span className="font-bold text-white">20-Yr Total:</span>
                      <span className="text-lg font-black text-amber-400 font-mono">
                        {formatCAD(steelTotal20Yr)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pressure Treated Wood */}
                <div className="p-5 bg-neutral-900/60 rounded-2xl border border-neutral-800">
                  <h4 className="text-base font-bold text-neutral-300">Wood Fencing</h4>
                  <p className="text-[11px] text-neutral-500">Cedar / Pressure-Treated</p>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between text-neutral-400">
                      <span>Initial Install:</span>
                      <span className="font-mono text-neutral-300">{formatCAD(woodInitial)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>20-Yr Staining:</span>
                      <span className="font-mono text-red-400">+{formatCAD(woodMaintenance20Yr)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Year 11 Rebuild:</span>
                      <span className="font-mono text-red-400">+{formatCAD(woodRebuild20Yr)}</span>
                    </div>
                    <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline">
                      <span className="font-bold text-neutral-300">20-Yr Total:</span>
                      <span className="text-lg font-black text-red-400 font-mono">
                        {formatCAD(woodTotal20Yr)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Vinyl / PVC */}
                <div className="p-5 bg-neutral-900/60 rounded-2xl border border-neutral-800">
                  <h4 className="text-base font-bold text-neutral-300">Vinyl / PVC</h4>
                  <p className="text-[11px] text-neutral-500">Extruded Plastic</p>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between text-neutral-400">
                      <span>Initial Install:</span>
                      <span className="font-mono text-neutral-300">{formatCAD(vinylInitial)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Cold Shatter Fix:</span>
                      <span className="font-mono text-amber-400">+{formatCAD(vinylMaintenance20Yr)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Year 14 Rebuild:</span>
                      <span className="font-mono text-amber-400">+{formatCAD(vinylRebuild20Yr)}</span>
                    </div>
                    <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline">
                      <span className="font-bold text-neutral-300">20-Yr Total:</span>
                      <span className="text-lg font-black text-amber-300 font-mono">
                        {formatCAD(vinylTotal20Yr)}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="text-center pt-2">
                <button
                  onClick={onOpenVisualizer}
                  className="inline-flex items-center space-x-2 text-xs font-bold text-amber-400 hover:text-amber-300"
                >
                  <span>Build your permanent steel fence configuration →</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Technical Comparison Table */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 sm:p-6 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                Comprehensive Engineering Performance Matrix
              </h3>
              <p className="text-xs text-neutral-400">Laboratory and Canadian winter field test results</p>
            </div>
            <span className="text-xs text-neutral-400 hidden sm:inline">Certified to ASTM Standards</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-900/90 text-neutral-400 border-b border-neutral-800">
                  <th className="p-3.5 font-bold uppercase tracking-wider">Performance Factor</th>
                  <th className="p-3.5 font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10">
                    SteelFencing.ca
                  </th>
                  <th className="p-3.5 font-bold uppercase tracking-wider">Cedar / PT Wood</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider">Vinyl / PVC</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider">Chain Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-neutral-300">
                {TECHNICAL_COMPARISONS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="p-3.5 font-semibold text-white">{row.feature}</td>
                    <td className="p-3.5 font-bold text-emerald-400 bg-amber-500/5">
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{row.steel}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-neutral-400">{row.wood}</td>
                    <td className="p-3.5 text-neutral-400">{row.vinyl}</td>
                    <td className="p-3.5 text-neutral-400">{row.chainLink}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
