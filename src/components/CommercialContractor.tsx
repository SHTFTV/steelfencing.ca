import React, { useState } from 'react';
import {
  Building2,
  FileText,
  Download,
  Award,
  ArrowRight,
} from 'lucide-react';

interface CommercialContractorProps {
  onOpenQuote: () => void;
}

export const CommercialContractor: React.FC<CommercialContractorProps> = ({ onOpenQuote }) => {
  const [downloadedSpec, setDownloadedSpec] = useState<string | null>(null);

  const handleDownloadSpec = (specName: string) => {
    setDownloadedSpec(specName);
    setTimeout(() => setDownloadedSpec(null), 4000);
  };

  return (
    <section id="commercial" className="py-16 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400 mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Architect &amp; Contractor Resource Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Commercial, Municipal &amp; Multi-Unit Specs
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3">
            CSI MasterFormat 32 31 19 specification guidance and tiered wholesale pricing to help Canadian developers and contractors plan their steel fencing projects.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

          <div className="p-6 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
              CSI 32 31 19 Spec Sheets
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Standard 3-part architectural specifications formatted for Canadian municipal tenders, private commercial developments, and Strata guidelines.
            </p>
            <button
              onClick={() => handleDownloadSpec('CSI_32_31_19_SteelFencing.pdf')}
              className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 text-xs font-bold rounded-lg border border-neutral-700 transition-colors flex items-center justify-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadedSpec === 'CSI_32_31_19_SteelFencing.pdf' ? 'Spec Sheet Downloaded ✓' : 'Download Spec Guide (PDF)'}</span>
            </button>
          </div>

          <div className="p-6 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
              Engineering Documentation
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Need wind load, cantilever deflection, or foundation soil reaction documentation for a municipal building permit submission? Tell us about your project and we'll connect you with a local installer who can arrange it.
            </p>
            <button
              onClick={onOpenQuote}
              className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-sky-400 text-xs font-bold rounded-lg border border-neutral-700 transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>Request Engineering Documentation</span>
            </button>
          </div>

        </div>

        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
              Contractor Wholesale Portal
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mt-1">
              Dedicated volume supply pricing for landscape contractors, general contractors, pool builders, and property management boards.
            </p>
          </div>
          <button
            onClick={onOpenQuote}
            className="shrink-0 py-2.5 px-5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-extrabold rounded-lg shadow-md transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>Apply for Wholesale Tier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
