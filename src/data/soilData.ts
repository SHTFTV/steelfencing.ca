import { SoilTypeOption, SoilTypeId, PostMountType } from '../types';

export const SOIL_TYPES: SoilTypeOption[] = [
  {
    id: 'standard-loam',
    name: 'Standard Loam & Topsoil (Residential Subdivisions)',
    shortName: 'Standard Loam / Silt',
    tagline: 'Balanced organic topsoil over stable sub-clay with standard drainage',
    frostHeaveRisk: 'Moderate',
    recommendedPostMount: 'deep-frost-ground',
    recommendedMountName: 'Deep Frost In-Ground Pier',
    postDepthMultiplier: 1.0,
    augerDifficulty: 'Easy',
    costImpactPerPost: 0,
    engineeringRationale:
      'Standard residential loam allows conventional hydraulic auger drilling to municipal frost depth (48"-54"). Poured high-early concrete piers with polymer frost sleeves provide long-term alignment.',
    technicalSpecs: {
      anchorageMethod: '48"-54" Augered Sonotube Concrete Pier with High-Density Frost Sleeve',
      heaveProtection: 'Smooth anti-friction polyethylene sleeve prevents active topsoil grip',
      drainageCharacteristic: 'Medium permeability (15-30 mm/hr percolation rate)',
      subZeroStability: 'Certified stable to -35°C when set 6" below regional frost line',
    },
    recommendedProvinces: ['ON', 'BC', 'QC', 'ATL'],
  },
  {
    id: 'heavy-clay',
    name: 'Expansive Heavy Clay / Blue Marine Clay',
    shortName: 'Expansive Heavy Clay',
    tagline: 'High moisture retention, severe volumetric freeze-thaw expansion (>8%)',
    frostHeaveRisk: 'Severe',
    recommendedPostMount: 'helical-pile',
    recommendedMountName: 'Engineered Helical Screw Pile',
    postDepthMultiplier: 1.25,
    augerDifficulty: 'Heavy Mechanical',
    costImpactPerPost: 145,
    engineeringRationale:
      'Heavy clay soils (such as Ottawa Leda Clay or Prairie Gumbo) retain extreme water content and exert up to 2,200 lbs of adfreezing uplift force. Torque-driven helical steel screw piles anchor deep beneath the active shear plane into undisturbed sub-strata, completely eliminating frost heaving.',
    technicalSpecs: {
      anchorageMethod: 'Engineered Hot-Dip Galvanized Helical Screw Pile (60"-72" depth, 3,500 ft-lb torque)',
      heaveProtection: 'Load-bearing flighted helix below frost plane resists uplift and lateral soil expansion',
      drainageCharacteristic: 'Low permeability (<2 mm/hr), prone to surface water pooling and ice lensing',
      subZeroStability: 'Engineered to minimize frost heave across deep polar freeze cycles down to -45°C',
    },
    recommendedProvinces: ['AB', 'MB-SK', 'ON', 'QC'],
  },
  {
    id: 'rocky-bedrock',
    name: 'Rocky Terrain / Canadian Shield Bedrock',
    shortName: 'Rocky Shield Bedrock',
    tagline: 'Shallow soil mantle (<24") over solid granite or limestone bedrock',
    frostHeaveRisk: 'Low',
    recommendedPostMount: 'surface-baseplate',
    recommendedMountName: 'Heavy-Duty Surface Flange / Rock Pin Anchor',
    postDepthMultiplier: 0.5,
    augerDifficulty: 'Core Drill / Anchor',
    costImpactPerPost: 45,
    engineeringRationale:
      'In the Canadian Shield and rocky corridors (Muskoka, Sudbury, Okanagan, Gaspesie), solid granite bedrock prevents auger penetration. Post bases are engineered with 3/8" structural baseplates or 1-1/4" core-drilled rock anchors chemically bonded with structural non-shrink grout.',
    technicalSpecs: {
      anchorageMethod: '3/8" Laser-Cut Baseplate with 4x Hilti HUS-3 Stainless Concrete/Rock Anchors or 18" Grout Pins',
      heaveProtection: 'Bedrock does not heave; structural anchors provide 12,000 lbs tensile pullout resistance',
      drainageCharacteristic: 'Surface runoff driven, zero sub-grade water retention',
      subZeroStability: 'Immune to freeze-thaw soil movement; zero settlement',
    },
    recommendedProvinces: ['ON', 'BC', 'QC', 'ATL'],
  },
  {
    id: 'sandy-gravel',
    name: 'Sandy Soil / Coarse Well-Drained Gravel',
    shortName: 'Sandy Gravel / Coarse Sand',
    tagline: 'Rapid percolation, high drainage, uncohesive hole walls',
    frostHeaveRisk: 'Low',
    recommendedPostMount: 'deep-frost-ground',
    recommendedMountName: 'Deep Frost Pier with Belled Footing',
    postDepthMultiplier: 1.0,
    augerDifficulty: 'Easy',
    costImpactPerPost: 0,
    engineeringRationale:
      'Coarse sand and gravel drain meltwater rapidly, preventing the formation of subsurface ice lenses. Posts utilize deep augered concrete piers with belled footings to ensure high lateral resistance in non-cohesive soils.',
    technicalSpecs: {
      anchorageMethod: '48" In-Ground Pier with Wide-Footing Base or Continuous Auger Pour',
      heaveProtection: 'Rapid drainage prevents capillary water draw and ice lens crystallization',
      drainageCharacteristic: 'High permeability (>60 mm/hr), zero hydrostatic frost pressure',
      subZeroStability: 'Excellent freeze-thaw stability, requires wide footings for lateral wind load',
    },
    recommendedProvinces: ['BC', 'ON', 'ATL'],
  },
  {
    id: 'wet-peat',
    name: 'Saturated Peat / High Water Table / Wetland Edge',
    shortName: 'Peat / Saturated Bog',
    tagline: 'High water saturation, soft organic peat, maximum frost lens generation',
    frostHeaveRisk: 'Severe',
    recommendedPostMount: 'helical-pile',
    recommendedMountName: 'Deep-Driven Helical Screw Pile (Extended Depth)',
    postDepthMultiplier: 1.4,
    augerDifficulty: 'Heavy Mechanical',
    costImpactPerPost: 145,
    engineeringRationale:
      'Saturated peat and low-lying wetland edges form severe ice lenses that lift shallow footings within a single Canadian winter. Long-stem helical screw piles bypass the spongy saturated organic layer to anchor directly into dense load-bearing strata.',
    technicalSpecs: {
      anchorageMethod: 'Certified 72"-84" Industrial Galvanized Helical Pile with Double-Helix Flighting',
      heaveProtection: 'Anchors into non-saturated bearing soil below marsh water table',
      drainageCharacteristic: 'Permanently saturated (>90% soil pore water)',
      subZeroStability: 'Locks vertical alignment even during spring melt saturation',
    },
    recommendedProvinces: ['MB-SK', 'AB', 'ON', 'QC', 'ATL'],
  },
  {
    id: 'concrete-hardscape',
    name: 'Existing Concrete Slab / Retaining Wall / Commercial Deck',
    shortName: 'Concrete Slab / Retaining Wall',
    tagline: 'Engineered poured concrete slab, asphalt pad, or structural retaining wall',
    frostHeaveRisk: 'Low',
    recommendedPostMount: 'surface-baseplate',
    recommendedMountName: 'Surface Baseplate with Hilti Wedge Anchors',
    postDepthMultiplier: 0.25,
    augerDifficulty: 'Core Drill / Anchor',
    costImpactPerPost: 45,
    engineeringRationale:
      'For fences installed on concrete patios, commercial loading docks, parking aprons, or engineered retaining walls, posts are mounted via 8"x8" structural baseplates anchored with Hilti 316 stainless steel expansion anchors.',
    technicalSpecs: {
      anchorageMethod: '8" × 8" × 3/8" Hot-Dip Galvanized Baseplate with 4x 1/2" × 4-1/2" Stainless Wedge Anchors',
      heaveProtection: 'Sub-slab stability governed by structural concrete foundation',
      drainageCharacteristic: 'Impervious hardscape surface drainage',
      subZeroStability: 'Class 1 Commercial Grade anchorage tested to 180 km/h blizzard wind loads',
    },
    recommendedProvinces: ['ON', 'BC', 'AB', 'QC', 'MB-SK', 'ATL'],
  },
];

/**
 * Helper to look up a soil type definition
 */
export function getSoilType(id: SoilTypeId | undefined): SoilTypeOption {
  return SOIL_TYPES.find((s) => s.id === id) || SOIL_TYPES[0];
}

/**
 * Maps a soil type to its recommended post mount
 */
export function getRecommendedPostMountForSoil(soilId: SoilTypeId): PostMountType {
  const soil = getSoilType(soilId);
  return soil.recommendedPostMount;
}
