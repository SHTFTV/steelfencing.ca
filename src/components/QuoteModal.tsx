import React, { useState } from 'react';
import { FenceConfig } from '../types';
import { calculateEstimate, formatCAD } from '../utils/calculator';
import { generateFenceEstimatePDF } from '../utils/pdfGenerator';
import { FENCE_PRODUCTS, FENCE_COLORS } from '../data/products';
import { CANADIAN_PROVINCES } from '../data/climateData';
import confetti from 'canvas-confetti';
import {
  X,
  ShieldCheck,
  CheckCircle,
  FileSpreadsheet,
  Download,
  Calendar,
  MapPin,
  Sparkles,
  Phone,
  Mail,
  User,
  Upload,
  ArrowRight,
} from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialConfig?: FenceConfig;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialConfig,
}) => {
  const [config, setConfig] = useState<FenceConfig>(
    initialConfig || {
      style: 'nordic-slat',
      heightFeet: 6,
      linearFeet: 120,
      color: 'obsidian-black',
      postMount: 'deep-frost-ground',
      slatSpacing: 'zero-gap',
      includeGate: 'pedestrian-single',
      gateWidthFeet: 4,
      gateAutomation: false,
      integratedLedLighting: true,
      province: 'ON',
      installationType: 'turnkey-pro',
    }
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    addressOrPostalCode: '',
    timeline: 'Within 30 Days',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  if (!isOpen) return null;

  const estimate = calculateEstimate(config);
  const product = FENCE_PRODUCTS.find((p) => p.id === config.style) || FENCE_PRODUCTS[0];
  const color = FENCE_COLORS.find((c) => c.id === config.color) || FENCE_COLORS[0];
  const prov = CANADIAN_PROVINCES.find((p) => p.code === config.province) || CANADIAN_PROVINCES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleDownloadCADSpec = () => {
    setDownloadTriggered(true);
    try {
      generateFenceEstimatePDF(config, {
        clientName: formData.name || undefined,
        clientAddress: formData.postalCode ? `${formData.postalCode}, ${prov.name}` : prov.name,
        clientEmail: formData.email || undefined,
        clientPhone: formData.phone || undefined,
        notes: formData.notes || undefined,
      });
    } catch (err) {
      console.error('PDF export error:', err);
    }
    setTimeout(() => setDownloadTriggered(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-700 rounded-3xl max-w-4xl w-full my-8 overflow-hidden shadow-2xl relative text-neutral-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-neutral-950/80 rounded-full text-neutral-400 hover:text-white z-10 border border-neutral-700"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Confirmation Screen */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                Quote Request #SF-{Math.floor(100000 + Math.random() * 900000)} Confirmed
              </span>
              <h3 className="text-3xl font-black text-white mt-1 font-['Space_Grotesk']">
                Thank You, {formData.name || 'Valued Customer'}!
              </h3>
              <p className="text-sm text-neutral-300 max-w-lg mx-auto mt-2 leading-relaxed">
                Your custom steel fencing estimate for <strong>{config.linearFeet} LF of {product.name}</strong> has been logged. We'll pass your request to a local installer who will be in touch soon.
              </p>
            </div>

            {/* Itemized Locked-in Summary Box */}
            <div className="p-6 bg-neutral-950 rounded-2xl border border-neutral-800 max-w-xl mx-auto text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-neutral-800 pb-2 font-bold text-white">
                <span>Configuration Specs</span>
                <span className="text-amber-400">Locked for 60 Days</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-neutral-300">
                <div>Profile: <strong>{product.name}</strong></div>
                <div>Grade: <strong>{estimate.materialGradeName}</strong></div>
                <div>Finish: <strong>{color.name}</strong></div>
                <div>Height: <strong>{config.heightFeet} Feet</strong></div>
                <div>Footage: <strong>{config.linearFeet} Linear Feet</strong></div>
                <div>Warranty: <strong>{estimate.warrantyYears}-Year Protected</strong></div>
                <div>Lifespan: <strong>{estimate.expectedLongevityYears} ({prov.code})</strong></div>
                <div>Service: <strong>{config.installationType === 'turnkey-pro' ? 'Certified Turnkey' : 'Direct Supply'}</strong></div>
              </div>
              <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline">
                <span className="font-bold text-white text-sm">Estimated Total:</span>
                <span className="text-xl font-black text-amber-400 font-mono">
                  {formatCAD(estimate.totalBeforeTax)} CAD
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadCADSpec}
                className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-xl border border-neutral-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>{downloadTriggered ? 'Spec Sheet Generated ✓' : 'Download Itemized Spec Sheet (PDF)'}</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs rounded-xl shadow-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Main Quote Form */
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Live Config Summary (5 cols) */}
            <div className="lg:col-span-5 bg-neutral-950 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-neutral-800 space-y-6">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 text-[11px] font-bold border border-amber-500/30 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{estimate.warrantyYears}-Year Warranty Protected</span>
                </div>
                <h3 className="text-xl font-extrabold text-white font-['Space_Grotesk']">
                  Your Configuration
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">Real-time Canadian factory pricing</p>
              </div>

              {/* Specs List */}
              <div className="space-y-2.5 text-xs text-neutral-300">
                <div className="flex justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-400">Steel Profile:</span>
                  <span className="font-bold text-white">{product.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-400">Material Grade:</span>
                  <span className="font-bold text-amber-400">{estimate.materialGradeName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-400">Finish Color:</span>
                  <span className="font-bold text-white">{color.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-400">Height:</span>
                  <span className="font-bold text-white">{config.heightFeet} Feet</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-400">Perimeter Footage:</span>
                  <span className="font-bold text-white">{config.linearFeet} Linear Feet</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-400">Expected Lifespan:</span>
                  <span className="font-bold text-white">{estimate.expectedLongevityYears} ({prov.code})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-400">Province Frost Line:</span>
                  <span className="font-bold text-sky-400">{prov.name} ({prov.frostDepthInches}&quot;)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-400">Gate System:</span>
                  <span className="font-bold text-white">
                    {config.includeGate === 'none' ? 'None' : config.includeGate.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-400">Installation:</span>
                  <span className="font-bold text-amber-400">
                    {config.installationType === 'turnkey-pro' ? 'Certified Turnkey' : 'Supply Only'}
                  </span>
                </div>
              </div>

              {/* Price Callout */}
              <div className="p-4 bg-neutral-900 rounded-2xl border border-amber-500/40">
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">
                  Turnkey Factory Estimate
                </span>
                <span className="text-2xl font-black text-white font-['Space_Grotesk'] block mt-0.5">
                  {formatCAD(estimate.totalBeforeTax)} <span className="text-xs font-normal text-neutral-400">CAD</span>
                </span>
                <span className="text-[10px] text-emerald-400 block mt-1">
                  ✓ Price lock guaranteed for 60 calendar days
                </span>
              </div>
            </div>

            {/* Right Column: Contact & Booking Form (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                  Request Official Assessment &amp; Samples
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Our certified installation team will review your property, laser-verify grade slopes, and provide free material swatches.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. David Morrison"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. (416) 555-0192"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. david@example.ca"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">
                      City / Postal Code *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Oakville, ON / L6M 2V5"
                        value={formData.addressOrPostalCode}
                        onChange={(e) => setFormData({ ...formData, addressOrPostalCode: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    Project Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option>Immediately (Within 2 Weeks)</option>
                    <option>Within 30 Days</option>
                    <option>Next 1–3 Months (Spring / Summer)</option>
                    <option>Planning &amp; Budgeting Stage</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    Project Notes / Special Conditions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Sloped yard, swimming pool safety requirement, existing wood fence removal needed..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Submit for Direct Factory Pricing &amp; Free Swatches</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-neutral-400 text-center">
                  🔒 We respect your privacy. No spam. Direct dispatch to certified Canadian installers only.
                </p>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
