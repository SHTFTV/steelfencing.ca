import { FenceProduct, FenceColorId, GateType, SecurityPackageType, FenceMaterialFamily, ProductCategory } from '../types';

export const FENCE_COLORS: {
  id: FenceColorId;
  name: string;
  hex: string;
  borderHex: string;
  description: string;
  finishType: string;
}[] = [
  {
    id: 'obsidian-black',
    name: 'Obsidian Matte Black',
    hex: '#171717',
    borderHex: '#404040',
    description: 'Ultra-durable architectural satin matte powder coat. Best-selling Canadian modern look.',
    finishType: 'TGIC Super-Durable Polyester',
  },
  {
    id: 'architectural-charcoal',
    name: 'Architectural Charcoal',
    hex: '#2e3440',
    borderHex: '#4c566a',
    description: 'Contemporary deep slate gray with subtle metallic flakes that resist water spotting.',
    finishType: 'Super-Durable Metallic Powder',
  },
  {
    id: 'walnut-woodgrain',
    name: 'Thermal Walnut Woodgrain',
    hex: '#5c3a21',
    borderHex: '#8b5a2b',
    description: 'Photorealistic sublimated woodgrain baked onto 14-gauge structural steel. Zero rotting.',
    finishType: 'Sublimated Thermal Polymer on Galvalume',
  },
  {
    id: 'corten-rust',
    name: 'Weathering Corten Steel',
    hex: '#8d4421',
    borderHex: '#b55428',
    description: 'Raw architectural weathering steel developing a stable, protective patina layer over time.',
    finishType: 'ASTM A588 Self-Sealing Oxide',
  },
  {
    id: 'frost-white',
    name: 'Glacier Satin White',
    hex: '#e2e8f0',
    borderHex: '#94a3b8',
    description: 'High-reflectance, UV-stabilized pure white engineered to resist yellowing in intense sunlight.',
    finishType: 'High-Reflectance TGIC Powder',
  },
  {
    id: 'industrial-galvanized',
    name: 'Hot-Dip Galvanized',
    hex: '#71717a',
    borderHex: '#a1a1aa',
    description: 'Heavy zinc bath immersion delivering raw industrial aesthetics and 50+ year marine protection.',
    finishType: 'ASTM A123 Hot-Dip Zinc Coating',
  },
];

export const FENCE_PRODUCTS: FenceProduct[] = [
  // 1. Steel - Modern Horizontal Slat
  {
    id: 'nordic-slat',
    name: 'Nordic Series™ Horizontal Steel Slat',
    tagline: 'The pinnacle of modern Canadian architectural privacy.',
    description:
      'Engineered with interlocking extruded steel horizontal slats and concealed fasteners. Delivers ultra-clean minimalist sightlines with adjustable privacy spacing (0" full block to 1/2" architectural air gap).',
    category: 'Modern Steel Privacy',
    materialFamily: 'steel',
    basePricePerFoot: 115,
    heightsAvailable: [4, 5, 6, 7, 8],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Concealed internal locking channels (no exposed exterior screws)',
      '14-gauge heavy structural posts with welded baseplates or in-ground frost stems',
      'Dual-side aesthetic finish — looks identically pristine from both sides',
      'Wind-load engineered up to 155 km/h gusts without rattling or flexing',
    ],
    specs: {
      steelGauge: '14-Gauge Galvalume® Core',
      coatingType: 'Multi-stage zinc pretreatment + Thermoset architectural powder coat',
      warrantyYears: 30,
      windLoadKmH: 155,
      soundReductionDb: '18 dB acoustic deflection',
      privacyLevel: '100% (or 90% with 1/4" spacer)',
    },
    recommendedFor: ['Luxury Residential', 'Pool Perimeters', 'Suburban Property Lines', 'Modern Architectural Builds'],
  },

  // 2. Steel - Corrugated Privacy
  {
    id: 'corrugated-privacy',
    name: 'Apex™ Corrugated High-Tensile Steel',
    tagline: 'Bold industrial texture combined with maximum snow-load resistance.',
    description:
      'Featuring heavy 26-gauge high-tensile corrugated steel infill panels framed inside robust 12-gauge rectangular steel posts and heavy perimeter channels. Unyielding against heavy winter snow banks plowed from driveways.',
    category: 'Modern Steel Privacy',
    materialFamily: 'steel',
    basePricePerFoot: 95,
    heightsAvailable: [5, 6, 7, 8],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Heavy channel frame eliminates edge vibration and sharp contact points',
      'Zero maintenance: resists pressure washer blasting, weed whacker impacts, and dog scratches',
      'Engineered for extreme snow drift and plow bank deflection',
      'Available with contrasting dual-tone post and panel combinations',
    ],
    specs: {
      steelGauge: '26-Gauge Infill / 12-Gauge Structural Frame',
      coatingType: 'High-Performance SMP (Silicone Modified Polyester) + Galvalume AZ50',
      warrantyYears: 35,
      windLoadKmH: 165,
      privacyLevel: '100% Total Visual Blockout',
    },
    recommendedFor: ['Snow-heavy Driveway Borders', 'Rural & Acreage Estates', 'Backyard Pet Enclosures', 'Urban Infill'],
  },

  // 3. Steel - Vertical Tongue-and-Groove Board
  {
    id: 'steel-vertical-tg',
    name: 'Titan™ Vertical Steel Tongue-and-Groove',
    tagline: 'Clean vertical architectural lines with lifetime steel resilience.',
    description:
      'Interlocking vertical Galvalume® steel board-on-board profile mimicking premium vertical cedar without warping, splitting, or rotting. Delivers 100% total visual seclusion with aerodynamic wind channels.',
    category: 'Modern Steel Privacy',
    materialFamily: 'steel',
    basePricePerFoot: 108,
    heightsAvailable: [5, 6, 7, 8],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Interlocking self-aligning tongue-and-groove steel planks with hidden fastener tracks',
      'Dual-side symmetry — neighbours see the same flawless architectural finish',
      'Engineered top rail water shed cap prevents ice damming and interior post condensation',
      'Thermal expansion relief joints withstand +35°C summer heat to -45°C winter cold',
    ],
    specs: {
      steelGauge: '16-Gauge Vertical Infill / 12-Gauge Steel Posts',
      coatingType: 'Thermally fused Kynar 500® / PVDF architectural coating',
      warrantyYears: 30,
      windLoadKmH: 160,
      privacyLevel: '100% Zero-Gap Solid Visual Seclusion',
    },
    recommendedFor: ['Neighbour Boundary Lines', 'Modern Urban Homes', 'High-Wind Corridors', 'Low-Maintenance Upgrades'],
  },

  // 4. Acoustic Barrier - Steel Sound Wall
  {
    id: 'acoustic-sound',
    name: 'SonusShield™ Acoustic Steel Barrier',
    tagline: 'Engineered highway & rail noise reduction for peaceful living.',
    description:
      'High-density insulated steel acoustic barrier panel with perforated sound-absorbent micro-core. Specifically designed to absorb and deflect high-traffic roadway noise, rail vibration, and commercial HVAC equipment hum.',
    category: 'Acoustic Barrier',
    materialFamily: 'steel',
    basePricePerFoot: 185,
    heightsAvailable: [6, 8, 10],
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f3?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Tested STC rating of 32 (Sound Transmission Class) — cuts perceived noise by up to 70%',
      'Interior non-hydroscopic mineral acoustic core will not absorb water or rot in humidity',
      'Heavy structural H-beam steel posts (W4x13 / W6x15) engineered for deep frost footings',
      'Approved for Canadian municipal noise mitigation bylaws',
    ],
    specs: {
      steelGauge: '16-Gauge Structural Steel Cladding',
      coatingType: 'Hot-Dip Galvanized + Double Polyurethane Marine Coat',
      warrantyYears: 30,
      windLoadKmH: 180,
      soundReductionDb: 'STC 32 / NRC 0.85 (up to 32 dB attenuation)',
      privacyLevel: '100% Solid Acoustic Shell',
    },
    recommendedFor: ['Homes near busy avenues & highways', 'Commercial HVAC enclosures', 'Strata communities', 'Industrial borders'],
  },

  // 5. Ornamental - Highland Steel Security
  {
    id: 'highland-ornamental',
    name: 'Highland™ Ornamental Steel Security',
    tagline: 'Timeless estate elegance with unyielding galvanized strength.',
    description:
      'High-tensile square tube steel pickets with welded internal ribs and forged spear or clean flat-top finials. Meets pool enclosure safety standards across all Canadian provinces while providing high security without obstructing panoramic views.',
    category: 'Ornamental',
    materialFamily: 'ornamental',
    basePricePerFoot: 85,
    heightsAvailable: [4, 5, 6, 7, 8],
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Automated robotic laser welding ensures seamless, burr-free joint integrity',
      'Anti-climb picket spacing complies with Canadian National Building Code & local pool bylaws',
      'E-Coat immersion primer covers 100% of internal and external steel tube surfaces',
      'Rakeable panels adjust up to 30 degrees for sloped properties without step cutting',
    ],
    specs: {
      steelGauge: '16-Gauge Pickets / 14-Gauge Rails / 11-Gauge Posts',
      coatingType: 'Cathodic electrodeposition e-coat + High-Gloss UV powder coat',
      warrantyYears: 25,
      windLoadKmH: 190,
      privacyLevel: 'Open Architectural Vista (Security + Sightlines)',
    },
    recommendedFor: ['Swimming Pool Enclosures', 'Heritage Estates', 'Front Yard Architectural Boundaries', 'Golf Course Properties'],
  },

  // 6. Ornamental - Baroque Estate Ornamental Iron
  {
    id: 'baroque-ornamental-iron',
    name: 'Baroque™ Estate Ornamental Iron',
    tagline: 'Grand classical estate styling with cast iron rings and triad spears.',
    description:
      'Classical architectural ornamental fencing featuring double top rails inset with forged cast iron circles, twisted center spindles, and quad-beveled spear tips. Engineered with lower dog-picket spacing for pet security.',
    category: 'Ornamental',
    materialFamily: 'ornamental',
    basePricePerFoot: 105,
    heightsAvailable: [4, 5, 6, 7],
    image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Decorative forged rings and embossed twisted steel pickets',
      'Double horizontal top security rail with welded spear finials',
      'Puppy picket lower safety bar spacing (sub-3" gap) protects small pets',
      'Heavy 2.5" x 2.5" estate posts with architectural ball-cap finials',
    ],
    specs: {
      steelGauge: '14-Gauge Heavy Tube Pickets / 11-Gauge Master Posts',
      coatingType: 'Hot Galvalume dip + Duplex architectural matte powder coat',
      warrantyYears: 30,
      windLoadKmH: 195,
      privacyLevel: 'Open Classical Estate Vista',
    },
    recommendedFor: ['Grand Front Entrances', 'Heritage Manor Homes', 'Equestrian Properties', 'Luxury Driveway Frontages'],
  },

  // 7. Wrought Iron - Heritage Hand-Forged
  {
    id: 'wrought-iron-heritage',
    name: 'Heritage Ironworks™ Hand-Forged Wrought Iron',
    tagline: 'Authentic solid-bar forged craftsmanship that stands for generations.',
    description:
      'Solid bar hot-forged wrought iron fencing crafted using traditional blacksmithing techniques fused with modern multi-stage cathodic e-coat rust protection. Heavy solid square stock pickets with hand-hammered scrolls and forged leaf finials.',
    category: 'Wrought Iron',
    materialFamily: 'wrought-iron',
    basePricePerFoot: 175,
    heightsAvailable: [4, 5, 6, 7, 8],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    features: [
      '100% Solid hot-rolled bar iron construction (not hollow tube) for impenetrable mass',
      'Hand-forged scrolls, decorative collar welds, and authentic hammer-textured surface',
      'Immersion cathodic epoxy e-coating engineered for long-term rust resistance in extreme winter salt exposure',
      'Custom historic crests and monogram medallion inserts available upon request',
    ],
    specs: {
      steelGauge: 'Solid 5/8" & 3/4" Hot-Rolled Bar Stock / 3" Heavy Solid Posts',
      coatingType: 'Cathodic Acrylic E-Coat + Multi-Stage Zinc Phosphate + TGIC Satin Gloss',
      warrantyYears: 50,
      windLoadKmH: 220,
      privacyLevel: 'Open Historic Craft Vista with Maximum Security',
    },
    recommendedFor: ['Heritage Properties', 'Diplomatic & Institutional Residences', 'Luxury Mountain & Country Estates', 'Historic Restoration'],
  },

  // 8. Aluminum - Marine Grade AeroShield
  {
    id: 'aero-aluminum-marine',
    name: 'AeroShield™ Marine-Grade 6005-T5 Aluminum',
    tagline: 'Featherweight structural strength with zero rust in saltwater or pool splash zones.',
    description:
      'Extruded from architectural 6005-T5 tempered structural aluminum alloy with 35,000 PSI tensile strength. 100% impervious to corrosion, chlorine mist, saltwater air, and winter road de-icing salts while weighing 60% less than steel.',
    category: 'Architectural Aluminum',
    materialFamily: 'aluminum',
    basePricePerFoot: 98,
    heightsAvailable: [4, 5, 6, 7],
    image: 'https://images.unsplash.com/photo-1584467746872-9599d24f339f?auto=format&fit=crop&w=1200&q=80',
    features: [
      'High-tensile 6005-T5 tempered aluminum alloy — galvanized coating designed to resist oxidation and red rust for decades',
      'AAMA 2604/2605 certified architectural fluoropolymer powder coating (resists salt spray)',
      'Hidden screw-less click-lock picket assembly for ultra-sleek seamless profiles',
      'Ideal for oceanfront coastal homes, lakeside docks, and high-chlorine pool enclosures',
    ],
    specs: {
      steelGauge: '6005-T5 Architectural Tempered Aluminum (35,000 PSI Yield)',
      coatingType: 'AAMA 2605 Architectural Super-Durable Fluoropolymer',
      warrantyYears: 35,
      windLoadKmH: 165,
      privacyLevel: 'Open Vista with High Corrosion Resistance',
    },
    recommendedFor: ['Coastal & Saltwater Fronts', 'Lakeside Docks & Boat Houses', 'Chlorine Swimming Pools', 'Lightweight Balconies'],
  },

  // 9. Aluminum - Louver Architectural Privacy
  {
    id: 'aluminum-louver-privacy',
    name: 'Solis™ Aerodynamic Architectural Aluminum Louver',
    tagline: 'Angled precision louvers delivering 100% downward privacy with continuous airflow.',
    description:
      'Continuous angled aluminum louver blades precision-machined from extruded structural aluminum. Engineered to baffle heavy wind gusts by allowing controlled laminar airflow while maintaining total 100% visual privacy from street view.',
    category: 'Architectural Aluminum',
    materialFamily: 'aluminum',
    basePricePerFoot: 138,
    heightsAvailable: [5, 6, 7, 8],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Aerodynamic 45-degree angled louvers cut wind pressure on posts by up to 45%',
      '100% downward sightline block ensures absolute privacy for hot tubs and patios',
      'Heavy structural aluminum posts with internal reinforced anchor channels',
      'Never requires painting, staining, or sealing — wash with a garden hose',
    ],
    specs: {
      steelGauge: 'Heavy Extruded 6063-T6 Aluminum Blades & Perimeter Frame',
      coatingType: 'Architectural TGIC Marine Polyester Powder Coat',
      warrantyYears: 30,
      windLoadKmH: 180,
      privacyLevel: '100% Downward Visual Seclusion with 30% Air Flow',
    },
    recommendedFor: ['Hot Tub & Spa Privacy', 'High-Wind Coastal Hills', 'Modern Rooftop Terraces', 'Contemporary Courtyards'],
  },

  // 10. Commercial / Industrial - FortisMax
  {
    id: 'fortis-industrial',
    name: 'FortisMax™ High-Security Perimeter Steel',
    tagline: 'Commercial & industrial anti-cut, anti-climb steel barrier.',
    description:
      'Industrial-grade heavy wall tubular steel security fencing with welded anti-ram horizontal rails and curved anti-climb pickets. Certified for critical infrastructure, logistics centers, and commercial yards.',
    category: 'Commercial & Industrial',
    materialFamily: 'steel',
    basePricePerFoot: 145,
    heightsAvailable: [6, 8, 10],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Heavy 2.5" & 3" square structural steel posts with tamper-resistant security breakaway nuts',
      'Rigid pickets passing through punched rails and welded at every internal junction',
      'Integrates seamlessly with automated cantilever slide gates and perimeter intrusion detection',
    ],
    specs: {
      steelGauge: '12-Gauge Structural Posts / 14-Gauge Rails / 14-Gauge Solid Pickets',
      coatingType: 'ASTM A653 G90 Hot-Dip Galvanization + Industrial Polyaspartic Finish',
      warrantyYears: 30,
      windLoadKmH: 200,
      privacyLevel: 'High Security Visual deterrent',
    },
    recommendedFor: ['Logistics Hubs & Warehouses', 'Data Centers', 'Municipal Facilities', 'Auto Dealerships & Storage Yards'],
  },

  // 11. Commercial / Industrial - Aegis 358 Prison Wire Mesh
  {
    id: 'steel-358-security',
    name: 'Aegis-358™ Anti-Cut High-Security Prison Mesh',
    tagline: 'Dense 76.2mm x 12.7mm steel wire matrix impossible to climb or cut with hand tools.',
    description:
      'Heavy galvanized steel high-security welded wire mesh (3" x 0.5" aperture / 8-gauge wire). The ultra-dense wire spacing prevents toe or finger holds for zero climbing capability and resists standard bolt-cutters.',
    category: 'Commercial & Industrial',
    materialFamily: 'steel',
    basePricePerFoot: 130,
    heightsAvailable: [6, 8, 10],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Anti-finger & anti-toe climb mesh aperture (76.2mm horizontal x 12.7mm vertical)',
      'Resistance welded at every intersection with 4mm (8-gauge) high-tensile wire',
      'Exceptional camera surveillance see-through clarity with maximum physical security',
      'Anti-burrow bottom ground embedment flange option for perimeter containment',
    ],
    specs: {
      steelGauge: '8-Gauge High-Tensile Welded Core / Heavy I-Beam Posts',
      coatingType: 'Super-Galv 275g/m² Hot-Dip Zinc + Thermoplastic Polymer Fusion',
      warrantyYears: 25,
      windLoadKmH: 210,
      privacyLevel: 'High Security Transparent Vista (CCTV Camera Optimized)',
    },
    recommendedFor: ['Critical Utilities & Sub-stations', 'Airport & Rail Perimeters', 'Commercial Equipment Compounds', 'High-Value Storage'],
  },

  // 12. Architectural Art - Laser Art
  {
    id: 'laser-art',
    name: 'Caelum™ Laser-Cut Architectural Art Panels',
    tagline: 'Bespoke precision-machined decorative steel privacy screens.',
    description:
      'Custom CNC fiber-laser cut steel panels featuring Canadian botanical, geometric, or customized geometric patterns. Perfect as statement privacy walls, courtyard highlights, or illuminated evening accents with integrated LED channels.',
    category: 'Architectural Art',
    materialFamily: 'steel',
    basePricePerFoot: 160,
    heightsAvailable: [4, 6, 7],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Precision 1/8" (11-gauge) solid structural plate steel CNC laser machined',
      'Integrated LED channels for dramatic nocturnal backlighting',
      'Over 24 standard architectural pattern designs or upload your own vector CAD file',
      'Structural box-flanged perimeter prevents warping in thermal expansion cycles',
    ],
    specs: {
      steelGauge: '11-Gauge (1/8") Solid Plate Steel',
      coatingType: 'Dual-coat zinc rich primer + Architectural textured polyester',
      warrantyYears: 25,
      windLoadKmH: 150,
      privacyLevel: 'Semi-Private 60%–85% Visual Block (Varies by pattern)',
    },
    recommendedFor: ['Rooftop Patios', 'Feature Garden Dividers', 'Outdoor Dining Enclosures', 'Designer Entrances'],
  },
];

// Rich Gate Metadata
export interface GateOptionInfo {
  id: GateType;
  name: string;
  category: 'Pedestrian' | 'Driveway' | 'High-Speed Commercial' | 'Estate';
  tagline: string;
  basePrice: number;
  priceFormula: string;
  description: string;
  typicalWidths: string;
  features: string[];
}

export const GATE_OPTIONS: GateOptionInfo[] = [
  {
    id: 'none',
    name: 'No Gate Included',
    category: 'Pedestrian',
    tagline: 'Continuous perimeter fencing without entry openings.',
    basePrice: 0,
    priceFormula: '$0',
    description: 'Continuous uninterrupted fence panels along the entire linear run.',
    typicalWidths: 'N/A',
    features: ['Continuous panel run', 'Clean perimeter finish'],
  },
  {
    id: 'pedestrian-single',
    name: 'Single Walk Gate',
    category: 'Pedestrian',
    tagline: 'Heavy-duty steel garden & side-yard pedestrian walk gate.',
    basePrice: 650,
    priceFormula: '$650 + $45/ft height',
    description: 'Precision welded gate frame with heavy stainless steel ball-bearing hinges, lockable keyed stainless latch, and magnetic drop rod.',
    typicalWidths: '3 ft – 5 ft opening',
    features: ['Heavy steel boxed frame', 'Keyed dual-sided deadlock', 'Self-closing adjustable tension hinges', 'Stainless steel hardware'],
  },
  {
    id: 'double-driveway',
    name: 'Double Driveway Swing Gate',
    category: 'Driveway',
    tagline: 'Dual-leaf driveway swing gate for residential and acreage access.',
    basePrice: 1600,
    priceFormula: '$1,600 + $85/ft width',
    description: 'Dual swinging gate leaves supported by heavy 4" x 4" structural steel hinge posts with industrial greasable roller bearing hinges and ground lock drop pins.',
    typicalWidths: '10 ft – 18 ft opening',
    features: ['Heavy 4x4 structural hinge posts', 'Dual leaf symmetric swing', 'Center ground drop pin & receiver', 'Automation motor compatible'],
  },
  {
    id: 'cantilever-sliding',
    name: 'Cantilever Trackless Sliding Gate',
    category: 'Driveway',
    tagline: 'Trackless sliding gate engineered to glide above winter snow and ice.',
    basePrice: 2800,
    priceFormula: '$2,800 + $110/ft width',
    description: 'Internal enclosed roller carriage system requiring zero ground track. Floats effortlessly above deep snow banks, ice buildup, and uneven gravel driveways.',
    typicalWidths: '12 ft – 28 ft opening',
    features: ['100% Trackless cantilever suspension', 'Zero winter snow/ice jamming', 'Internal sealed multi-roller carriages', 'Integrated safety stop bumpers'],
  },
  {
    id: 'barrier-arm-automatic',
    name: 'Automatic High-Speed Barrier Arm (Boom Gate)',
    category: 'High-Speed Commercial',
    tagline: 'Commercial high-traffic parking & community security barrier arm.',
    basePrice: 3200,
    priceFormula: '$3,200 (Motorized Unit + Arm)',
    description: 'High-speed automated traffic barrier boom gate with integrated flashing LED arm strips, heavy-duty 24V brushless continuous duty motor, and 1.5–3.0s rapid cycle time.',
    typicalWidths: '10 ft – 20 ft aluminum boom arm',
    features: ['Rapid 1.5-second open cycle', 'Illuminated red/green LED boom arm', 'Continuous 100% duty cycle rating', 'Emergency manual release lever'],
  },
  {
    id: 'telescopic-sliding',
    name: 'Telescopic Space-Saving Sliding Gate',
    category: 'Driveway',
    tagline: 'Dual overlapping sliding panels requiring 50% less side pullback space.',
    basePrice: 3600,
    priceFormula: '$3,600 + $125/ft width',
    description: 'Synchronized dual-panel telescopic sliding system that collapses into half the pullback space of standard slide gates. Doubles opening speed for tight driveways.',
    typicalWidths: '14 ft – 24 ft opening',
    features: ['Requires 50% less side storage space', '2x faster opening speed via gear linkage', 'Heavy structural guide rollers', 'Ideal for tight urban & commercial lots'],
  },
  {
    id: 'bi-fold-speed-gate',
    name: 'High-Speed Bi-Folding Security Speed Gate',
    category: 'High-Speed Commercial',
    tagline: 'Rapid 3.5-second folding security gate for tight spaces and high security.',
    basePrice: 4200,
    priceFormula: '$4,200 + $140/ft width',
    description: 'Commercial bi-folding speed gate that folds panels accordion-style in under 4 seconds. Eliminates the wide swing radius of standard swing gates.',
    typicalWidths: '12 ft – 20 ft opening',
    features: ['Ultra-fast 3.5 second deployment', 'Requires minimal swing depth', 'Integrated anti-pinch hinges', 'High-security crash-resistant lock mechanism'],
  },
  {
    id: 'wrought-iron-estate-gate',
    name: 'Arched Wrought Iron Estate Driveway Gate',
    category: 'Estate',
    tagline: 'Grand arched hand-forged wrought iron double estate entrance gate.',
    basePrice: 3400,
    priceFormula: '$3,400 + $130/ft width',
    description: 'Monumental arched double swing gate featuring hand-forged wrought iron scrolls, spear finials, center crest medallion, and heavy 6" steel brick-wrap posts.',
    typicalWidths: '12 ft – 20 ft grand span',
    features: ['Majestic sweeping arched top profile', 'Hand-forged scrolls and cast spear finials', 'Heavy 5" or 6" structural gate posts', 'Automated swing arm operator ready'],
  },
];

// Security & Smart Access Packages
export interface SecurityPackageInfo {
  id: SecurityPackageType;
  name: string;
  tagline: string;
  price: number;
  description: string;
  includes: string[];
}

export const SECURITY_PACKAGES: SecurityPackageInfo[] = [
  {
    id: 'none',
    name: 'Standard Manual Latch & Lock',
    tagline: 'Heavy mechanical deadbolt and stainless steel padlock receivers.',
    price: 0,
    description: 'Standard heavy-duty mechanical locking system included at zero extra cost.',
    includes: ['Heavy steel mechanical latch', 'Padlock receiver tabs', 'Ground drop rod holder'],
  },
  {
    id: 'smart-intercom-camera',
    name: 'Smart Cellular HD Video Intercom & App Keypad',
    tagline: 'Full HD video calls, PIN access keypad, and mobile phone gate unlock.',
    price: 850,
    description: 'Outdoor weatherproof 4G LTE/Wi-Fi smart intercom with 1080p night-vision camera, illuminated PIN code keypad, and two-way crystal clear audio to your smartphone.',
    includes: [
      '1080p HD Wide-Angle Night-Vision Camera',
      'Illuminated Backlit Weatherproof Keypad',
      'iOS / Android App Remote Gate Unlock from Anywhere',
      'Visitor Video Call Notification to Smartphone',
    ],
  },
  {
    id: 'rfid-keypad-loop',
    name: 'RFID Vehicle Tag + In-Ground Vehicle Loop Detector',
    tagline: 'Hands-free automatic vehicle approach entry and exiting.',
    price: 1150,
    description: 'Hands-free windshield RFID tag reader system plus subterranean induction loop detector that automatically opens the gate when your vehicle approaches from the inside driveway.',
    includes: [
      'Long-Range Windshield RFID Tag Reader',
      '4x RFID Vehicle Windshield Tags',
      'Sub-surface Induction Exit Loop Detector',
      'Auto-close Safety Timer Module',
    ],
  },
  {
    id: 'commercial-high-security',
    name: 'Fortress™ Complete Commercial Security & Access Suite',
    tagline: 'High-speed brushless operator, 1200lb mag-lock, safety loops, siren & LTE intercom.',
    price: 2950,
    description: 'Industrial-grade comprehensive access control and physical barrier security suite engineered for commercial facilities, strata communities, and maximum-security properties.',
    includes: [
      '4G LTE Cellular Video Intercom with Cloud Logging',
      '1200 lb Electromagnetic Solenoid Shear Gate Lock',
      'Dual Thru-Beam Infrared Safety Photocells',
      'Safety Reversing Edge Sensors',
      'Audible Alarm Siren & Flashing Warning Strobe Light',
      'Ground Vehicle In & Out Induction Loops',
    ],
  },
];
