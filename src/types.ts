export type FenceStyleId =
  | 'nordic-slat'
  | 'corrugated-privacy'
  | 'steel-vertical-tg'
  | 'acoustic-sound'
  | 'highland-ornamental'
  | 'baroque-ornamental-iron'
  | 'wrought-iron-heritage'
  | 'aero-aluminum-marine'
  | 'aluminum-louver-privacy'
  | 'fortis-industrial'
  | 'steel-358-security'
  | 'laser-art';

export type FenceMaterialFamily = 'steel' | 'wrought-iron' | 'aluminum' | 'ornamental';

export type FenceColorId =
  | 'obsidian-black'
  | 'architectural-charcoal'
  | 'corten-rust'
  | 'walnut-woodgrain'
  | 'frost-white'
  | 'industrial-galvanized';

export type GateType =
  | 'none'
  | 'pedestrian-single'
  | 'double-driveway'
  | 'cantilever-sliding'
  | 'barrier-arm-automatic'
  | 'telescopic-sliding'
  | 'bi-fold-speed-gate'
  | 'wrought-iron-estate-gate';

export type SecurityPackageType =
  | 'none'
  | 'smart-intercom-camera'
  | 'rfid-keypad-loop'
  | 'commercial-high-security';

export type PostMountType = 'deep-frost-ground' | 'surface-baseplate' | 'helical-pile';

export type SoilTypeId =
  | 'standard-loam'
  | 'heavy-clay'
  | 'rocky-bedrock'
  | 'sandy-gravel'
  | 'wet-peat'
  | 'concrete-hardscape';

export interface SoilTypeOption {
  id: SoilTypeId;
  name: string;
  shortName: string;
  tagline: string;
  frostHeaveRisk: 'Low' | 'Moderate' | 'High' | 'Severe';
  recommendedPostMount: PostMountType;
  recommendedMountName: string;
  postDepthMultiplier: number;
  augerDifficulty: 'Easy' | 'Moderate' | 'Heavy Mechanical' | 'Core Drill / Anchor';
  costImpactPerPost: number;
  engineeringRationale: string;
  technicalSpecs: {
    anchorageMethod: string;
    heaveProtection: string;
    drainageCharacteristic: string;
    subZeroStability: string;
  };
  recommendedProvinces: string[];
}

export type MaterialGradeId = 'standard' | 'heavy-duty' | 'marine-arctic';

export interface MaterialGradeOption {
  id: MaterialGradeId;
  name: string;
  shortName: string;
  badge: string;
  tagline: string;
  gaugeSteel: string;
  coating: string;
  saltSprayHours: number;
  windRatingKmH: number;
  subZeroRating: string;
  perFootAddon: number;
  warrantyYears: number;
  description: string;
  highlights: string[];
  climateLongevity: Record<
    string,
    {
      years: string;
      avgYears: number;
      rating: string;
      note: string;
    }
  >;
}

export interface FenceConfig {
  style: FenceStyleId;
  heightFeet: number; // 4, 5, 6, 7, 8, 10
  linearFeet: number; // 20 - 500
  color: FenceColorId;
  materialGrade?: MaterialGradeId;
  soilType?: SoilTypeId;
  postMount: PostMountType;
  slatSpacing: 'zero-gap' | 'quarter-inch' | 'half-inch' | 'one-inch';
  includeGate: GateType;
  gateWidthFeet: number;
  gateAutomation: boolean;
  securityPackage: SecurityPackageType;
  solarBackupPower: boolean;
  integratedLedLighting: boolean;
  province: string;
  installationType: 'turnkey-pro' | 'supply-diy';
}

export type ProductCategory =
  | 'Modern Steel Privacy'
  | 'Wrought Iron'
  | 'Ornamental'
  | 'Architectural Aluminum'
  | 'Commercial & Industrial'
  | 'Acoustic Barrier'
  | 'Architectural Art';

export interface FenceProduct {
  id: FenceStyleId;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  materialFamily: FenceMaterialFamily;
  basePricePerFoot: number;
  heightsAvailable: number[];
  image: string;
  features: string[];
  specs: {
    steelGauge: string; // or alloy spec
    coatingType: string;
    warrantyYears: number;
    windLoadKmH: number;
    soundReductionDb?: string;
    privacyLevel: string;
  };
  recommendedFor: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  location: string;
  province: string;
  style: FenceStyleId;
  styleName: string;
  height: string;
  linearFeet: number;
  image: string;
  description: string;
}

export interface CanadianProvinceData {
  name: string;
  code: string;
  frostDepthInches: number;
  avgWinterLowC: number;
  snowLoadRating: 'Moderate' | 'Heavy' | 'Extreme';
  maxTypicalBackyardHeightFt: number;
  permitRequirementNote: string;
  recommendedPostDepth: string;
}

export interface BulkTierOption {
  tierId: string;
  name: string;
  shortName: string;
  minFeet: number;
  maxFeet: number | null;
  discountPercent: number;
  badge: string;
  wholesaleClassification: string;
  description: string;
  savingsHighlights: string;
  perks: string[];
}

export interface CostEstimate {
  rawMaterialsCost?: number;
  bulkDiscountPercent?: number;
  bulkDiscountAmount?: number;
  bulkTier?: BulkTierOption;
  nextTierFeet?: number | null;
  nextTierDiscountPercent?: number | null;
  nextTierSavingsDelta?: number | null;
  materialsCost: number;
  installationCost: number;
  gateCost: number;
  securityCost: number;
  lightingCost: number;
  materialGradeAddonCost?: number;
  totalBeforeTax: number;
  panelsCount: number;
  postsCount: number;
  frostDepthRecommendedInches: number;
  warrantyYears: number;
  materialGrade: MaterialGradeId;
  materialGradeName: string;
  expectedLongevityYears: string;
  climateLongevityRating: string;
  climateLongevityNote: string;
  soilType?: SoilTypeId;
  soilTypeName?: string;
  soilHeaveRisk?: string;
  postMountName?: string;
  annualizedCost?: number;
  effectivePerFoot?: number;
  provincialTaxRate?: number;
  provincialTaxAmount?: number;
  grandTotalWithTax?: number;
  monthlyFinancing24?: number;
  monthlyFinancing36?: number;
  twentyYearWoodCost?: number;
  lifetimeSavingsVsWood?: number;
}

