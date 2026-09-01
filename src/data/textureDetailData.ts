import { FenceColorId } from '../types';

export interface CoatingLayer {
  name: string;
  thickness: string;
  color: string;
  description: string;
  standard: string;
}

export interface TextureDetailInfo {
  id: FenceColorId;
  name: string;
  finishType: string;
  textureCategory: 'Matte Powder' | 'Metallic Flake' | 'Thermal Sublimation' | 'Natural Weathering' | 'Satin Enamel' | 'Metallurgical Galvanized';
  baseHex: string;
  borderHex: string;
  sheenLevel: string;
  glossUnits60: number; // GU at 60° angle
  microTextureName: string;
  microTextureDescription: string;
  tactileFeel: string;
  opticalProperties: string;
  layerThicknessMils: number;
  layerThicknessMicrons: number;
  pencilHardness: string;
  saltSprayHoursASTM_B117: number;
  aamaStandard: string;
  uvResistanceRating: string;
  operatingTempRange: string;
  environmentalSuitability: string[];
  keyAdvantages: string[];
  layers: CoatingLayer[];
  cleaningGuideline: string;
}

export const TEXTURE_DETAIL_DATA: Record<FenceColorId, TextureDetailInfo> = {
  'obsidian-black': {
    id: 'obsidian-black',
    name: 'Obsidian Matte Black',
    finishType: 'TGIC Super-Durable Architectural Powder Coat',
    textureCategory: 'Matte Powder',
    baseHex: '#171717',
    borderHex: '#404040',
    sheenLevel: 'Ultra-Matte Satin (Non-Reflective)',
    glossUnits60: 6,
    microTextureName: 'Micro-Fine Sand Stipple (ISO 8503-1)',
    microTextureDescription: 'Uniform microscopic stipple matrix that diffuses direct solar rays, eliminates optical glare, and conceals fingerprint oils and dust.',
    tactileFeel: 'Velvet cast-iron texture with high tactile friction and zero chalking.',
    opticalProperties: '98.5% optical light absorption with isotropic micro-scattering. No harsh hot-spot specular reflections.',
    layerThicknessMils: 3.6,
    layerThicknessMicrons: 92,
    pencilHardness: '3H (High Scratch Resistance)',
    saltSprayHoursASTM_B117: 3500,
    aamaStandard: 'AAMA 2604',
    uvResistanceRating: 'Florida 3-Year 100% Color Retention (>90% gloss hold)',
    operatingTempRange: '-50°C to +110°C (-58°F to +230°F)',
    environmentalSuitability: [
      'Canadian Sub-Zero Snow & Ice',
      'High UV Sunny Patios & Pools',
      'Urban Road Salt Mist Zones',
      'Modern High-Contrast Architecture',
    ],
    keyAdvantages: [
      'Eliminates glare from strong summer sun into backyard seating areas',
      'Hydrophobic surface repels water beads and road splash grime',
      'Thermoset polymer bonds cross-link under 200°C factory cure',
      'Conceals thermal expansion micro-deflections perfectly',
    ],
    layers: [
      {
        name: 'Topcoat: Super-Durable TGIC Polyester',
        thickness: '65–75 µm',
        color: '#1a1a1a',
        description: 'Cross-linked architectural thermoset polyester with anti-microbial UV-blockers.',
        standard: 'AAMA 2604',
      },
      {
        name: 'Barrier: Zinc-Phosphate Conversion Layer',
        thickness: '2–4 µm',
        color: '#3b3b3b',
        description: 'Chemical crystalline bonding matrix locking topcoat to zinc-aluminum core.',
        standard: 'ASTM TT-C-490',
      },
      {
        name: 'Galvanic: Galvalume® AZ50 (55% Al-Zn Alloy)',
        thickness: '20–25 µm',
        color: '#737373',
        description: 'Hot-dipped metallic alloy providing 4x the corrosion barrier of standard zinc.',
        standard: 'ASTM A792',
      },
      {
        name: 'Core: Cold-Rolled Structural Steel Core',
        thickness: '1.9–2.8 mm (12–14 Ga)',
        color: '#262626',
        description: 'High-tensile Grade 50 structural steel (50,000 PSI yield strength).',
        standard: 'ASTM A653 / A1008',
      },
    ],
    cleaningGuideline: 'Mild soap and warm water with soft microfiber sponge. Safe for low-pressure wash (<1,200 PSI).',
  },

  'architectural-charcoal': {
    id: 'architectural-charcoal',
    name: 'Architectural Charcoal',
    finishType: 'Super-Durable Fluoropolymer Metallic Powder',
    textureCategory: 'Metallic Flake',
    baseHex: '#2e3440',
    borderHex: '#4c566a',
    sheenLevel: 'Semi-Gloss Metallic Flake',
    glossUnits60: 28,
    microTextureName: 'Directional Aluminum-Mica Sparkle Flakes',
    microTextureDescription: 'Encapsulated suspended micro-aluminum and mica platelets that glint dynamically under changing daylight angles while masking precipitation spots.',
    tactileFeel: 'Silky smooth automotive-grade clearcoat with subtle embedded flake texture.',
    opticalProperties: 'Specular metallic chromatic shift; shifts from deep graphite in cloudy weather to luminous slate bronze under direct sunlight.',
    layerThicknessMils: 3.9,
    layerThicknessMicrons: 98,
    pencilHardness: '3H–4H (Automotive Standard)',
    saltSprayHoursASTM_B117: 3200,
    aamaStandard: 'AAMA 2604 Compliant',
    uvResistanceRating: 'High-Altitude UV-A / UV-B Certified (10-Year Delta E < 5)',
    operatingTempRange: '-50°C to +105°C',
    environmentalSuitability: [
      'High Wind & Dust Corridors',
      'Contemporary Stone & Stucco Siding',
      'Lakeside & Coastal Spray Environments',
      'Commercial Perimeter Entrances',
    ],
    keyAdvantages: [
      'Metallic flake dispersion diffuses water spots, pollen, and light splash marks',
      'Architectural color depth coordinates with charcoal roofs and modern window trims',
      'Clearcoat seal prevents metallic flake oxidation over decades',
      'Superior impact resistance against flying gravel and lawn maintenance tools',
    ],
    layers: [
      {
        name: 'Topcoat: Clear-Sealed Metallic Polyester',
        thickness: '70–80 µm',
        color: '#3b4252',
        description: 'Bonded metallic mica suspended inside thermoset matrix with clear surface glaze.',
        standard: 'AAMA 2604',
      },
      {
        name: 'Primer: Epoxy-Zinc Corrosion Inhibiting Primer',
        thickness: '15–20 µm',
        color: '#4c566a',
        description: 'Cathodic sacrificial primer preventing rust creep at drilled screw holes.',
        standard: 'ASTM D522',
      },
      {
        name: 'Galvanic: Zinc-Aluminum Anti-Corrosion Bath',
        thickness: '22 µm',
        color: '#94a3b8',
        description: 'Hot-dip continuous metallizing layer.',
        standard: 'ASTM A653 AZ50',
      },
      {
        name: 'Core: Grade 50 High-Tensile Structural Steel',
        thickness: '1.9–2.8 mm',
        color: '#1e293b',
        description: 'Cold-rolled structural box tubing and profiled fence slats.',
        standard: 'ASTM A500',
      },
    ],
    cleaningGuideline: 'Rinse with garden hose; mild automotive car wash soap if necessary. Avoid abrasive scouring pads.',
  },

  'walnut-woodgrain': {
    id: 'walnut-woodgrain',
    name: 'Thermal Walnut Woodgrain',
    finishType: 'Vacuum-Sublimated Thermal Polymer on Galvalume®',
    textureCategory: 'Thermal Sublimation',
    baseHex: '#5c3a21',
    borderHex: '#8b5a2b',
    sheenLevel: 'Natural Low-Lustre Timber Sheen',
    glossUnits60: 14,
    microTextureName: 'Deep-Pore Botanical Wood Fiber Micro-Grain',
    microTextureDescription: 'Sublimated high-definition botanical dye matrix penetrating 40 microns deep into polyurethane powder base. Will never peel, split, splinter, or rot.',
    tactileFeel: 'Organic timber feel with embossed grain ridges, simulated growth rings, and warm tactile thermal warmth.',
    opticalProperties: 'Multi-tone cathedral grain variation mimicking natural old-growth North American Black Walnut with low-reflection sheen.',
    layerThicknessMils: 4.3,
    layerThicknessMicrons: 110,
    pencilHardness: '2H–3H',
    saltSprayHoursASTM_B117: 2800,
    aamaStandard: 'AAMA 2603 / 2604 Sublimation Spec',
    uvResistanceRating: '20-Year Anti-Fade & Anti-Delamination Warranty',
    operatingTempRange: '-45°C to +95°C',
    environmentalSuitability: [
      'Wood Replacement Without Annual Staining',
      'Forest & Cottage Country Landscapes',
      'High Moisture Ground Contact & Snow Banks',
      'HOA Developments Requiring Natural Wood Aesthetic',
    ],
    keyAdvantages: [
      '100% Immunity to carpenter ants, termites, woodpeckers, and fungal dry rot',
      'Zero annual sanding, scraping, staining, or toxic chemical sealant costs',
      'Thermal dye is vacuum-fused at 195°C—cannot bubble or peel off like vinyl wraps',
      'Maintains pristine deep walnut tone throughout 25+ harsh Canadian winters',
    ],
    layers: [
      {
        name: 'Top Layer: Sublimated Walnut Dye & UV Clear Coat',
        thickness: '35–45 µm',
        color: '#6b4226',
        description: 'High-resolution organic dyes infused into polymer under 200°C vacuum pressure.',
        standard: 'Decoral System / Qualideco',
      },
      {
        name: 'Base Coat: Special Polyurethane Powder Base',
        thickness: '60–70 µm',
        color: '#8c5930',
        description: 'Specially formulated receptive polyurethane powder base coat.',
        standard: 'Qualicoat Class 1.5',
      },
      {
        name: 'Barrier: Galvalume® Anti-Rust Barrier',
        thickness: '20 µm',
        color: '#a8a29e',
        description: 'Continuous aluminum-zinc alloy core shield.',
        standard: 'ASTM A792',
      },
      {
        name: 'Core: 14-Gauge Galvalume® Structural Core',
        thickness: '1.9 mm',
        color: '#44403c',
        description: 'Solid high-tensile steel core for 100% wind-load stability.',
        standard: 'ASTM A653',
      },
    ],
    cleaningGuideline: 'Gentle wash with water and soft bristle brush once per season to remove exterior environmental dust.',
  },

  'corten-rust': {
    id: 'corten-rust',
    name: 'Weathering Corten Steel',
    finishType: 'ASTM A588 Self-Sealing Weathering Oxide Patina',
    textureCategory: 'Natural Weathering',
    baseHex: '#8d4421',
    borderHex: '#b55428',
    sheenLevel: 'Dead-Flat Earthy Patina (0 GU)',
    glossUnits60: 1,
    microTextureName: 'Crystalline Ferric-Oxyhydroxide Patina Crust',
    microTextureDescription: 'Dense, interlocking α-FeOOH crystalline oxide crust that naturally passivates and seals the inner structural steel against continuous degradation.',
    tactileFeel: 'Earthy, coarse velvet stone texture that deepens and smooths as the patina matures.',
    opticalProperties: 'Organic multi-chromatic copper, terracotta, and burnt amber tones that evolve with ambient humidity and precipitation.',
    layerThicknessMils: 1.2,
    layerThicknessMicrons: 30,
    pencilHardness: 'Natural Mineral Hardness (Mohs 5.5)',
    saltSprayHoursASTM_B117: 2000,
    aamaStandard: 'ASTM A588 / CSA G40.21 350W',
    uvResistanceRating: '100% Immune to UV Degradation (Pure mineral oxide)',
    operatingTempRange: '-60°C to +150°C',
    environmentalSuitability: [
      'Architectural Modern Landscape Design',
      'Desert, Prairie & Mountain Landscapes',
      'Rustic Estate Perimeters & Corten Planters',
      'Zero-Coating Natural Ecological Builds',
    ],
    keyAdvantages: [
      'Self-healing: any surface scratches naturally re-oxidize and seal within weeks',
      'Contains copper, chromium, and nickel alloys that prevent deep structural pitting',
      'Never needs paint, primer, or powder coat reapplication over its 50+ year lifetime',
      'Signature modern luxury aesthetic celebrated by Canadian landscape architects',
    ],
    layers: [
      {
        name: 'Protective Patina: Compact α-FeOOH Iron Oxide Layer',
        thickness: '15–25 µm',
        color: '#a04d26',
        description: 'Dense, water-impermeable patina formed by atmospheric wet/dry cycling.',
        standard: 'ASTM A588',
      },
      {
        name: 'Transition: Copper-Chromium Enriched Passivation Zone',
        thickness: '5–10 µm',
        color: '#7c3619',
        description: 'Alloy enrichment boundary retarding electron transfer and moisture penetration.',
        standard: 'CSA G40.21',
      },
      {
        name: 'Structural Base: Corten High-Strength Low-Alloy Steel',
        thickness: '3.0–3.5 mm (11 Ga)',
        color: '#451a03',
        description: 'High-yield weathering structural plate with 50,000 PSI yield strength.',
        standard: 'ASTM A588 Grade A',
      },
    ],
    cleaningGuideline: 'Natural weathering only. Do not apply chemical cleaners, waxes, or sealants.',
  },

  'frost-white': {
    id: 'frost-white',
    name: 'Glacier Satin White',
    finishType: 'High-Reflectance UV-Stabilized TGIC Fluoropolymer',
    textureCategory: 'Satin Enamel',
    baseHex: '#f1f5f9',
    borderHex: '#cbd5e1',
    sheenLevel: 'Architectural Satin Enamel',
    glossUnits60: 38,
    microTextureName: 'Ultra-Smooth Flow Anti-Chalking Matrix',
    microTextureDescription: 'Densely packed Titanium Dioxide (TiO₂) crystal particles in a fluoropolymer binder that deflects 84% of solar thermal infrared radiation.',
    tactileFeel: 'Mirror-smooth, cool-touch porcelain enamel with low surface tension.',
    opticalProperties: 'High-Albedo diffuse white (SRI 92) preventing summer thermal heat buildup and resisting yellowing.',
    layerThicknessMils: 3.4,
    layerThicknessMicrons: 86,
    pencilHardness: '3H',
    saltSprayHoursASTM_B117: 4000,
    aamaStandard: 'AAMA 2605 / Super-Durable',
    uvResistanceRating: 'Typical 8-12 Year Non-Yellowing & Non-Chalking Performance (varies by installer/coating)',
    operatingTempRange: '-50°C to +100°C',
    environmentalSuitability: [
      'Modern Coastal & Coastal Lakefront Homes',
      'Pool Enclosures & Sun-Soaked Backyard Patios',
      'Urban Architectural Perimeter Accents',
      'Commercial Cleanroom & Biotech Facility Perimeters',
    ],
    keyAdvantages: [
      'High solar reflectance index (SRI 92) keeps fence posts cool to the touch in summer',
      'Fluoropolymer matrix resists staining from algae, bird droppings, and pollen',
      'Formulated with non-chalking pigments that stay bright white for decades',
      'Lotus effect: rainwater naturally sheets off, carrying surface dust away',
    ],
    layers: [
      {
        name: 'Topcoat: Ultra-White Fluoropolymer Enamel',
        thickness: '65–75 µm',
        color: '#f8fafc',
        description: 'High-purity TiO2 pigment dispersed in high-durability fluoropolymer.',
        standard: 'AAMA 2605',
      },
      {
        name: 'Pretreatment: Zirconium Nanotech Primer Pretreatment',
        thickness: '3–5 µm',
        color: '#e2e8f0',
        description: 'Hexavalent-chromium-free nanotech ceramic adhesion layer.',
        standard: 'Qualicoat Certified',
      },
      {
        name: 'Galvanic: Hot-Dip Zinc-Aluminum AZ50',
        thickness: '22 µm',
        color: '#94a3b8',
        description: 'Continuous corrosion barrier.',
        standard: 'ASTM A653',
      },
      {
        name: 'Core: Grade 50 Cold-Rolled Structural Steel',
        thickness: '1.9–2.8 mm',
        color: '#334155',
        description: 'Heavy structural steel core.',
        standard: 'ASTM A1008',
      },
    ],
    cleaningGuideline: 'Gentle wash with water and neutral dish soap. Rinse thoroughly with hose.',
  },

  'industrial-galvanized': {
    id: 'industrial-galvanized',
    name: 'Hot-Dip Galvanized',
    finishType: 'ASTM A123 / ISO 1461 Metallurgical Zinc Immersion',
    textureCategory: 'Metallurgical Galvanized',
    baseHex: '#71717a',
    borderHex: '#a1a1aa',
    sheenLevel: 'Metallic Spangle Crystal Facets',
    glossUnits60: 18,
    microTextureName: 'Dendritic Zinc Spangle Flower Boundaries',
    microTextureDescription: 'Authentic crystallographic zinc spangles formed during 450°C molten zinc bath cooling, creating 3 intermetallic iron-zinc alloy metallurgical bonds.',
    tactileFeel: 'Rugged, textured crystalline metal surface with slight zinc facet relief.',
    opticalProperties: 'Reflective multi-faceted zinc crystals that reflect ambient lighting at diverse angles and weather gracefully to a matte zinc patina.',
    layerThicknessMils: 4.1,
    layerThicknessMicrons: 105,
    pencilHardness: 'Exceeds Base Steel (Alloy layers reach 250 DPN)',
    saltSprayHoursASTM_B117: 5000,
    aamaStandard: 'ASTM A123 / CSA G164 / ISO 1461',
    uvResistanceRating: '100% UV Immune (Pure Metallurgical Shield)',
    operatingTempRange: '-60°C to +200°C',
    environmentalSuitability: [
      'Marine Coastal Salt-Water Environments',
      'Industrial Facilities & Heavy Transport Yards',
      'Municipal Infrastructure & Security Facilities',
      'High-Impact Snow Plow & Road Salt Impact Runs',
    ],
    keyAdvantages: [
      'Metallurgical bond: zinc layers alloy directly with the steel (3,600 PSI bond strength)',
      'Sacrificial cathodic protection: zinc heals minor drill holes, scratches, and cut edges',
      'Outlasts paint coatings by 3x–5x in heavy road salt and marine splash zones',
      'Pure industrial aesthetic favored in high-end brutalist and commercial architecture',
    ],
    layers: [
      {
        name: 'Eta Layer (Top): Pure Zinc (100% Zn)',
        thickness: '20–25 µm',
        color: '#a1a1aa',
        description: 'Ductile pure zinc outer layer with visible dendritic spangle flowers (70 DPN).',
        standard: 'ASTM A123',
      },
      {
        name: 'Zeta Layer: Iron-Zinc Alloy (94% Zn, 6% Fe)',
        thickness: '40–50 µm',
        color: '#71717a',
        description: 'Columnar crystal alloy layer harder than the base structural steel (179 DPN).',
        standard: 'CSA G164',
      },
      {
        name: 'Delta Layer: Iron-Zinc Alloy (90% Zn, 10% Fe)',
        thickness: '25–30 µm',
        color: '#52525b',
        description: 'Dense hexagonal crystal alloy with 244 DPN hardness.',
        standard: 'ISO 1461',
      },
      {
        name: 'Gamma Layer: Boundary Alloy (75% Zn, 25% Fe)',
        thickness: '2 µm',
        color: '#3f3f46',
        description: 'Ultra-thin cubic metallurgical interface bonded at the atomic level.',
        standard: 'ASTM A123',
      },
      {
        name: 'Core: Structural Steel Core Base',
        thickness: '2.5–3.5 mm',
        color: '#27272a',
        description: 'Heavy structural steel post and panel substrate.',
        standard: 'ASTM A500',
      },
    ],
    cleaningGuideline: 'Zero maintenance required. Can be pressure washed at up to 3,000 PSI.',
  },
};
