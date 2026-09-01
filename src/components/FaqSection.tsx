import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Clock,
  ShieldCheck,
  Wrench,
  Snowflake,
  Cpu,
  FileCheck,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  Layers,
  ThermometerSnowflake,
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'timelines' | 'warranty' | 'maintenance' | 'automation' | 'permits';
  question: string;
  answer: string;
  keyTakeaways?: string[];
  climateNote?: string;
}

const FAQ_DATA: FaqItem[] = [
  // --- INSTALLATION & TIMELINES ---
  {
    id: 'timeline-standard-vs-turnkey',
    category: 'timelines',
    question: 'How long does the entire process take from order to completed installation in Canada?',
    answer: 'Standard architectural fence profiles and direct-supply modular packages typically ship within 7 to 12 business days. For full turnkey installation (where a local installer manages utility locates, post excavation, concrete/helical piles, and final alignment), typical project turnaround is 2 to 3 weeks. Custom motorized gates or automated barrier systems with license-plate readers usually require 3 to 4 weeks for factory electrical pre-commissioning.',
    keyTakeaways: [
      'Direct Supply modular kits: 7–12 business days delivered to site',
      'Full turnkey installation: 2–3 weeks total timeline',
      'Automated gate pre-wiring & assembly: 3–4 weeks lead time',
    ],
  },
  {
    id: 'winter-installation-canada',
    category: 'timelines',
    question: 'Can steel fencing and posts be installed during the Canadian winter (frozen ground)?',
    answer: 'Yes. Unlike traditional wood post holes that rely solely on wet-poured concrete which cannot cure below 0°C without thermal blankets, we utilize hydraulic helical screw piles and pneumatic core-drilling technology. Helical piles anchor beneath the active freeze/thaw layer (down to 60" in Alberta, Saskatchewan, and Manitoba) and can be torqued directly through frost at -30°C with zero wait time for concrete curing. Winter installation ensures your property is secure before spring thaw landscaping begins.',
    keyTakeaways: [
      'Helical torque piles allow certified installation down to -30°C',
      'No curing delays or temperature dependency on ground concrete',
      'Avoids spring thaw ground mudding and landscaping disruption',
    ],
    climateNote: 'Engineered for frost penetration up to 60" across MB, SK, AB, and Northern ON.',
  },
  {
    id: 'utility-locates-property-lines',
    category: 'permits',
    question: 'Who handles underground utility locates and property line staking?',
    answer: 'Always have underground utility locates done before digging — contact your provincial one-call service (Ontario One Call, BC 1 Call, Alberta One-Call, Info-Excavation in QC) to have gas, hydro, telecom, and water lines marked. A local installer handling a turnkey project can typically arrange this as part of the job. For property boundaries, we recommend reviewing your existing legal property survey plan; if boundary pins are buried, a licensed surveyor can arrange GPS boundary verification prior to post drilling.',
    keyTakeaways: [
      'Provincial utility locates (gas, hydro, telecom, water) are free through your province\'s one-call service',
      'Submit locate requests 5–10 business days before ground-break',
      'Verify legal survey alignment to prevent municipal setback disputes',
    ],
  },
  {
    id: 'permits-and-pool-codes',
    category: 'permits',
    question: 'Do your fences comply with municipal pool enclosure bylaws and Canadian building codes?',
    answer: 'Pool enclosure requirements vary by municipality, so always check your local bylaws before installing a fence around a pool. Many Canadian municipalities (Toronto, Montreal, and Vancouver each have their own pool enclosure bylaws, for example) require non-climbable vertical spacing, self-closing gate hinges, and code-compliant self-latching hardware positioned at a minimum height above grade. We recommend confirming the exact requirements with your municipality and working with a licensed local installer who can help ensure your fence meets them.',
    keyTakeaways: [
      "Check your municipality's non-climbable spacing requirements for pool enclosures",
      'Self-closing hinges and code-compliant self-latching gate hardware are commonly required',
      'A local installer can help prepare documentation for your permit submission',
    ],
  },

  // --- WARRANTY & CANADIAN CLIMATE SPECIFICS ---
  {
    id: 'warranty-coverage-breakdown',
    category: 'warranty',
    question: 'What exactly is covered under the 25-Year, 35-Year, and 50-Year Canadian Warranties?',
    answer: 'Our multi-tier warranties provide comprehensive, non-prorated protection backed by Canadian manufacturing partners. Coverage includes structural steel integrity against rust-through, structural weld fractures, thermal contraction cracking down to -55°C, and architectural powder-coat degradation (specifically blistering, peeling, chalking, or flaking exceeding ASTM D4214 standards). If any component fails under normal environmental exposure, replacement panels or hardware are supplied free of charge.',
    keyTakeaways: [
      'Standard Architectural: 25-Year Non-Prorated Warranty (Galvalume® + AAMA 2603)',
      'Heavy-Duty Commercial: 35-Year Warranty (High-Tensile + AAMA 2604)',
      'Marine / Arctic Polar: 50-Year / Lifetime Warranty (ZAM® Alloy + Kynar® PVDF)',
      '100% Transferable to subsequent property owners to boost resale equity',
    ],
  },
  {
    id: 'deicing-salt-and-coastal-marine',
    category: 'warranty',
    question: 'How do your steel fences resist road de-icing salt and coastal ocean air?',
    answer: 'Canadian winters expose roadside fences to severe brine spray (calcium chloride and sodium chloride). While traditional painted wrought iron rusts within 2–3 seasons, our systems utilize multi-stage chemical passivation with Galvalume® and ZAM® (Zinc-Aluminum-Magnesium) protective sacrificial layers, followed by thermoset electrostatically applied powders tested to 3,000–5,000 hours in ASTM B117 salt-fog chambers. The cut edges are self-healing via zinc migration, preventing electrolytic rust bleed.',
    keyTakeaways: [
      'ASTM B117 Salt Fog Spray tested up to 5,000+ hours without blister formation',
      'Zinc-Aluminum-Magnesium sacrificial layer self-heals minor micro-abrasions',
      'Marine/Arctic grade recommended within 3 km of coastlines or major salted highways',
    ],
    climateNote: 'Atlantic & Pacific coastal zones benefit from 316 Marine Stainless fasteners and PVDF coatings.',
  },
  {
    id: 'blizzard-wind-and-snow-loads',
    category: 'warranty',
    question: 'How do the fences perform against heavy blizzard drifts and 150 km/h wind gusts?',
    answer: 'Our structural posts are heavy-wall extruded steel (up to 14-gauge in Heavy-Duty and Arctic configurations) paired with aerodynamic slat channel geometries that relieve excessive wind shear. In prairie blizzard zones (Alberta, Saskatchewan, Manitoba) where dense wind-packed snow piles against fences, our interlocking steel panels withstand lateral snow drift loads exceeding 35 lbs/sq.ft and sustained wind loads up to 150–180 km/h without bowing.',
    keyTakeaways: [
      'Wind engineered for up to 150–180 km/h hurricane/prairie blizzard gusts',
      'Lateral snow bank resilience: Withstands snowplow discharge and heavy snow loads',
      'Engineered post embedment depths prevent wind fatigue tilting',
    ],
  },

  // --- CARE & MAINTENANCE REQUIREMENTS ---
  {
    id: 'maintenance-routine-overview',
    category: 'maintenance',
    question: 'What ongoing maintenance is required for architectural steel fencing in Canada?',
    answer: 'Virtually zero maintenance. Unlike cedar or pressure-treated wood fences that require power-washing, scraping, chemical toxic sealers, and re-staining every 2–3 years (costing $800–$1,500 per cycle), our powder-coated steel requires only an occasional fresh water rinse with a garden hose in spring to wash off winter road dust and pollen. There are no organic fibers to rot, warp, split, shrink, or attract wood-boring insects.',
    keyTakeaways: [
      'Zero scraping, chemical staining, waterproofing, or repainting required',
      'Simple bi-annual garden hose water rinse keeps powder coating pristine',
      'Saves an estimated $6,000–$12,000 in lifecycle labor & chemical costs over 20 years',
    ],
  },
  {
    id: 'scratches-and-touch-up-care',
    category: 'maintenance',
    question: 'What happens if a snowblower or lawn mower scratches the fence coating?',
    answer: 'Because the underlying steel has a metallurgically bonded zinc-aluminum alloy protective barrier, even deep scratches will not cause creeping rust or paint delamination. For cosmetic repairs, we provide color-matched industrial acrylic enamel touch-up applicator pens and aerosol cans. Simply clean the scratch and apply a light single-pass touch-up to restore the original satin finish.',
    keyTakeaways: [
      'Sacrificial zinc prevents rust from spreading under adjacent coating',
      'Factory-matched touch-up pens available in Obsidian Black, Charcoal, Bronze, and White',
      'Touch-up dries to touch within 15 minutes at ambient temperatures above 5°C',
    ],
  },
  {
    id: 'gate-hinges-automation-maintenance',
    category: 'automation',
    question: 'How do I maintain automated gates, barrier arms, and access controls in sub-zero weather?',
    answer: 'Our gate systems feature sealed sub-zero grease ball-bearing hinges and synthetic low-temperature lubricants rated for -40°C operation. We recommend spraying hinges with a dry PTFE or marine-grade lithium lubricant once every 12 to 24 months. For automated swing/slide operators, our built-in internal thermal heating bands activate automatically when ambient temperatures drop below -5°C, ensuring optical photo-eyes and hydraulic gearboxes operate reliably during extreme cold snaps.',
    keyTakeaways: [
      'Sealed low-temp ball bearing hinges rated down to -40°C',
      'Internal thermal heater kits prevent gearbox thickening during polar vortexes',
      'Solar battery backup maintainers keep optical safety loops operational through power outages',
    ],
  },
  {
    id: 'wood-vs-steel-tco-comparison',
    category: 'maintenance',
    question: 'How does the long-term total cost of ownership (TCO) compare to wood or vinyl in Canada?',
    answer: 'While cedar or vinyl may have a slightly lower initial materials-only shelf price, pressure-treated wood in Canadian freeze-thaw climates typically experiences post-rot, warping, and frost heave within 7 to 10 years, requiring complete tear-down and replacement. Vinyl frequently turns brittle and shatters upon sub-zero impact below -20°C. Over a 20-year timeline, our Canadian architectural steel fence delivers an annualized cost of only $45–$75/year with zero replacement cycles, proving to be 40% to 55% more cost-effective.',
    keyTakeaways: [
      'No warping, bowing, splintering, or post-rot from soggy spring ground',
      'Will not become brittle or shatter from hockey puck or snow shovel impacts at -35°C',
      'Annualized cost is 40–55% lower than wood when factoring in 20-year maintenance & replacement',
    ],
  },
];

export const FaqSection: React.FC<{ onOpenQuote?: () => void; onScrollToCalculator?: () => void }> = ({
  onOpenQuote,
  onScrollToCalculator,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'timeline-standard-vs-turnkey': true,
    'warranty-coverage-breakdown': true,
  });

  const categories = [
    { id: 'all', label: 'All Questions', count: FAQ_DATA.length },
    { id: 'timelines', label: 'Installation & Timelines', icon: Clock },
    { id: 'warranty', label: 'Canadian Warranties & Climate', icon: ShieldCheck },
    { id: 'maintenance', label: 'Care & Maintenance', icon: Wrench },
    { id: 'automation', label: 'Gates & Smart Security', icon: Cpu },
    { id: 'permits', label: 'Permits & Pool Bylaws', icon: FileCheck },
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.keyTakeaways && item.keyTakeaways.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    FAQ_DATA.forEach((item) => {
      allOpen[item.id] = true;
    });
    setOpenItems(allOpen);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  return (
    <section id="faq" className="py-20 bg-neutral-900 border-t border-neutral-800 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Canadian Homeowner &amp; Contractor Guide</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Space_Grotesk'] tracking-tight">
            Frequently Asked <span className="text-amber-400">Questions</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Everything you need to know about Canadian frost-depth engineering, installation lead times, non-prorated warranty protection, and zero-maintenance lifecycle ownership.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-10 max-w-4xl mx-auto space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search installation timelines, -40°C warranty coverage, pool codes, helical piles..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl pl-11 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-neutral-400 hover:text-white cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer border ${
                      isActive
                        ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md font-bold'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-neutral-200'
                    }`}
                  >
                    {cat.icon && <cat.icon className="w-3.5 h-3.5" />}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Expand / Collapse Actions */}
            <div className="hidden sm:flex items-center space-x-2 text-xs text-neutral-400">
              <button
                onClick={expandAll}
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <span>•</span>
              <button
                onClick={collapseAll}
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-8 max-w-4xl mx-auto space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-neutral-950 rounded-2xl border border-neutral-800 text-neutral-400 space-y-2">
              <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="font-bold text-white text-sm">No matching questions found</p>
              <p className="text-xs text-neutral-400">
                Try searching for &quot;warranty&quot;, &quot;winter&quot;, &quot;helical piles&quot;, or &quot;maintenance&quot;.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'bg-neutral-950 border-amber-500/40 shadow-lg'
                      : 'bg-neutral-950/70 border-neutral-800/80 hover:border-neutral-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 cursor-pointer"
                  >
                    <span className="font-bold text-sm sm:text-base text-white leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? 'bg-amber-500 text-neutral-950 rotate-180'
                          : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 text-xs sm:text-sm text-neutral-300 space-y-3.5 border-t border-neutral-900">
                      <p className="leading-relaxed text-neutral-300 font-normal">
                        {faq.answer}
                      </p>

                      {faq.climateNote && (
                        <div className="p-3 bg-sky-950/40 border border-sky-500/30 rounded-xl flex items-start space-x-2.5 text-xs text-sky-200">
                          <Snowflake className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-sky-300 font-semibold block">Canadian Climate Note:</strong>
                            <span>{faq.climateNote}</span>
                          </div>
                        </div>
                      )}

                      {faq.keyTakeaways && faq.keyTakeaways.length > 0 && (
                        <div className="bg-neutral-900/90 rounded-xl p-3.5 border border-neutral-800 space-y-2">
                          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                            Key Specifications &amp; Takeaways:
                          </span>
                          <ul className="space-y-1.5">
                            {faq.keyTakeaways.map((takeaway, idx) => (
                              <li key={idx} className="flex items-start space-x-2 text-xs text-neutral-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                                <span>{takeaway}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Support & Direct Quote Banner */}
        <div className="mt-14 max-w-4xl mx-auto bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 text-amber-400 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Have a unique property or commercial specification?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk']">
              Talk with a Canadian Structural Specialist
            </h3>
            <p className="text-xs text-neutral-400 max-w-xl">
              Get immediate answers regarding municipal setback bylaws, zero-degree winter installations, or custom architectural laser gating.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            {onScrollToCalculator && (
              <button
                onClick={onScrollToCalculator}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-bold text-xs border border-neutral-700 transition-colors cursor-pointer text-center"
              >
                Launch Price Calculator
              </button>
            )}

            {onOpenQuote && (
              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs shadow-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Request Custom Quote</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
