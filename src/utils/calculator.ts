import { FenceConfig, CostEstimate, MaterialGradeId } from '../types';
import { FENCE_PRODUCTS } from '../data/products';
import { CANADIAN_PROVINCES } from '../data/climateData';
import { MATERIAL_GRADES } from '../data/materialGrades';
import { SOIL_TYPES, getSoilType } from '../data/soilData';
import { getBulkTier, getNextBulkTier } from '../data/bulkSavingsData';

export function calculateEstimate(config: FenceConfig): CostEstimate {
  const product = FENCE_PRODUCTS.find((p) => p.id === config.style) || FENCE_PRODUCTS[0];
  const materialGradeId: MaterialGradeId = config.materialGrade || 'standard';
  const grade = MATERIAL_GRADES.find((g) => g.id === materialGradeId) || MATERIAL_GRADES[0];
  const soil = getSoilType(config.soilType);
  
  // Height multiplier (e.g. 6ft base is 1.0, 4ft is 0.85, 8ft is 1.35, 10ft is 1.75)
  const heightFactors: Record<number, number> = {
    4: 0.85,
    5: 0.92,
    6: 1.0,
    7: 1.18,
    8: 1.35,
    10: 1.75,
  };
  const heightMultiplier = heightFactors[config.heightFeet] || 1.0;

  // Base materials cost per foot
  let effectiveFootPrice = product.basePricePerFoot * heightMultiplier;

  // Material Grade adjustment per linear foot (e.g. standard $0, heavy-duty +$14/LF, marine-arctic +$28/LF)
  effectiveFootPrice += grade.perFootAddon;

  // Color finish adjustments (e.g. woodgrain sublimation, corten, or heavy marine coat)
  if (config.color === 'walnut-woodgrain') {
    effectiveFootPrice += 18;
  } else if (config.color === 'corten-rust') {
    effectiveFootPrice += 12;
  }

  // Standard panel spans are 6 or 8 feet
  const panelSpanFeet =
    config.style === 'fortis-industrial' ||
    config.style === 'acoustic-sound' ||
    config.style === 'steel-358-security'
      ? 6
      : 8;
  const panelsCount = Math.ceil(config.linearFeet / panelSpanFeet);
  const postsCount = panelsCount + 1;

  // Post mount type add-on (helical piles cost more than standard frost concrete)
  let postMountAddonPerPost = 0;
  if (config.postMount === 'helical-pile') {
    postMountAddonPerPost = 145; // torque screw pile hardware
  } else if (config.postMount === 'surface-baseplate') {
    postMountAddonPerPost = 45; // heavy welded flange & wedge anchors
  }

  const baseMaterials = effectiveFootPrice * config.linearFeet + (postsCount * postMountAddonPerPost);
  const materialGradeAddonCost = grade.perFootAddon * config.linearFeet;

  // Bulk Order Volume Discount Calculation
  const rawMaterialsCost = Math.round(baseMaterials);
  const bulkTier = getBulkTier(config.linearFeet);
  const bulkDiscountPercent = bulkTier.discountPercent;
  const bulkDiscountAmount = Math.round(rawMaterialsCost * (bulkDiscountPercent / 100));
  const materialsCost = Math.max(0, rawMaterialsCost - bulkDiscountAmount);

  const nextTierInfo = getNextBulkTier(config.linearFeet);
  let nextTierSavingsDelta: number | null = null;
  if (nextTierInfo) {
    const estimatedRawAtNext = ((rawMaterialsCost || 1) / Math.max(1, config.linearFeet)) * nextTierInfo.nextTier.minFeet;
    nextTierSavingsDelta = Math.round(estimatedRawAtNext * (nextTierInfo.nextTier.discountPercent / 100));
  }

  // Gate Cost calculation based on Gate Type
  let gateCost = 0;
  const gateWidth = config.gateWidthFeet || 12;

  switch (config.includeGate) {
    case 'pedestrian-single':
      gateCost = 650 + (config.heightFeet * 45);
      break;
    case 'double-driveway':
      gateCost = 1600 + (gateWidth * 85);
      break;
    case 'cantilever-sliding':
      gateCost = 2800 + (gateWidth * 110);
      break;
    case 'barrier-arm-automatic':
      // Commercial automated boom arm barrier includes built-in high-speed motor & LED arm
      gateCost = 3200;
      break;
    case 'telescopic-sliding':
      gateCost = 3600 + (gateWidth * 125);
      break;
    case 'bi-fold-speed-gate':
      gateCost = 4200 + (gateWidth * 140);
      break;
    case 'wrought-iron-estate-gate':
      gateCost = 3400 + (gateWidth * 130);
      break;
    case 'none':
    default:
      gateCost = 0;
      break;
  }

  // Gate Automation Motor Add-on (for non-barrier gates which have motor built-in)
  if (
    config.gateAutomation &&
    config.includeGate !== 'none' &&
    config.includeGate !== 'barrier-arm-automatic'
  ) {
    // Heavy duty cold-weather brushless automated motor (-40C rated) + smartphone controller & 2 remotes + safety photocells
    gateCost += 1850;
  }

  // Security Systems & Access Packages
  let securityCost = 0;
  if (config.securityPackage === 'smart-intercom-camera') {
    securityCost += 850;
  } else if (config.securityPackage === 'rfid-keypad-loop') {
    securityCost += 1150;
  } else if (config.securityPackage === 'commercial-high-security') {
    securityCost += 2950;
  }

  // Solar Off-Grid Power Kit with Twin AGM Batteries
  if (config.solarBackupPower && config.includeGate !== 'none') {
    securityCost += 680;
  }

  // LED Lighting Channel Add-on
  let lightingCost = 0;
  if (config.integratedLedLighting) {
    lightingCost = postsCount * 48 + 250; // post cap fixtures + IP67 outdoor waterproof transformer
  }

  // Installation Labor cost calculation
  let installationCost = 0;
  if (config.installationType === 'turnkey-pro') {
    // Turnkey includes professional excavation / auger post holes, deep frost concrete or helical torque installation, laser-level alignment, panel assembly & cleanup
    const laborPerFoot = config.heightFeet >= 8 ? 48 : 36;
    installationCost = laborPerFoot * config.linearFeet;
    
    if (config.includeGate !== 'none') {
      if (
        config.includeGate === 'cantilever-sliding' ||
        config.includeGate === 'telescopic-sliding' ||
        config.includeGate === 'bi-fold-speed-gate'
      ) {
        installationCost += 650;
      } else if (config.includeGate === 'barrier-arm-automatic') {
        installationCost += 450;
      } else if (config.includeGate === 'wrought-iron-estate-gate') {
        installationCost += 550;
      } else {
        installationCost += 250;
      }
    }

    if (config.securityPackage !== 'none') {
      installationCost += 350; // conduit wiring, mounting & sensor calibration
    }
  }

  const totalBeforeTax = Math.round(materialsCost + installationCost + gateCost + securityCost + lightingCost);

  // Province frost depth and tax lookup
  const prov = CANADIAN_PROVINCES.find((p) => p.code === config.province) || CANADIAN_PROVINCES[0];

  // Canadian Provincial Tax Rates
  const provinceTaxes: Record<string, number> = {
    ON: 0.13, // 13% HST
    BC: 0.12, // 5% GST + 7% PST
    AB: 0.05, // 5% GST
    QC: 0.14975, // 5% GST + 9.975% QST
    'MB-SK': 0.11, // 5% GST + 6% PST average
    ATL: 0.15, // 15% HST
  };
  const provincialTaxRate = provinceTaxes[config.province] || 0.13;
  const provincialTaxAmount = Math.round(totalBeforeTax * provincialTaxRate);
  const grandTotalWithTax = totalBeforeTax + provincialTaxAmount;

  const effectivePerFoot = config.linearFeet > 0 ? Math.round(totalBeforeTax / config.linearFeet) : 0;
  const monthlyFinancing24 = Math.round(totalBeforeTax / 24);
  const monthlyFinancing36 = Math.round((totalBeforeTax * 1.04) / 36);

  // 20-Year Wood Fence Comparative Cost: Initial install + staining every 2 yrs ($800) + full replacement at yr 10
  const initialWoodCost = config.linearFeet * 65 + (config.includeGate !== 'none' ? 450 : 0);
  const woodStaining20Yrs = 10 * 750;
  const woodReplacementYear10 = initialWoodCost * 1.25;
  const twentyYearWoodCost = Math.round(initialWoodCost + woodStaining20Yrs + woodReplacementYear10);
  const lifetimeSavingsVsWood = Math.max(0, twentyYearWoodCost - totalBeforeTax);

  const longevityData = grade.climateLongevity[config.province] || grade.climateLongevity['ON'];
  const effectiveWarrantyYears = grade.warrantyYears;
  const annualizedCost = Math.round(totalBeforeTax / (longevityData.avgYears || 30));

  return {
    rawMaterialsCost,
    bulkDiscountPercent,
    bulkDiscountAmount,
    bulkTier,
    nextTierFeet: nextTierInfo ? nextTierInfo.nextTier.minFeet : null,
    nextTierDiscountPercent: nextTierInfo ? nextTierInfo.nextTier.discountPercent : null,
    nextTierSavingsDelta,
    materialsCost,
    installationCost: Math.round(installationCost),
    gateCost: Math.round(gateCost),
    securityCost: Math.round(securityCost),
    lightingCost: Math.round(lightingCost),
    materialGradeAddonCost: Math.round(materialGradeAddonCost),
    totalBeforeTax,
    panelsCount,
    postsCount,
    frostDepthRecommendedInches: prov.frostDepthInches,
    warrantyYears: effectiveWarrantyYears,
    materialGrade: materialGradeId,
    materialGradeName: grade.name,
    expectedLongevityYears: longevityData.years,
    climateLongevityRating: longevityData.rating,
    climateLongevityNote: longevityData.note,
    soilType: config.soilType || 'standard-loam',
    soilTypeName: soil.shortName,
    soilHeaveRisk: soil.frostHeaveRisk,
    postMountName:
      config.postMount === 'helical-pile'
        ? 'Helical Screw Piles'
        : config.postMount === 'surface-baseplate'
        ? 'Surface Baseplate'
        : 'Deep Frost Sleeve',
    annualizedCost,
    effectivePerFoot,
    provincialTaxRate,
    provincialTaxAmount,
    grandTotalWithTax,
    monthlyFinancing24,
    monthlyFinancing36,
    twentyYearWoodCost,
    lifetimeSavingsVsWood,
  };
}

export function formatCAD(val: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(val);
}
