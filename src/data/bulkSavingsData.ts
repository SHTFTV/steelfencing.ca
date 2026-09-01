import { BulkTierOption } from '../types';

export const BULK_SAVINGS_TIERS: BulkTierOption[] = [
  {
    tierId: 'tier-1-standard',
    name: 'Standard Retail Rate (Single-Pack)',
    shortName: 'Retail (<100 LF)',
    minFeet: 0,
    maxFeet: 99,
    discountPercent: 0,
    badge: 'Standard Retail',
    wholesaleClassification: 'Residential Single-Pack',
    description: 'Standard per-unit pricing typical for patio enclosures, small urban backyards, and localized replacement runs.',
    savingsHighlights: 'Standard retail pricing with no volume discount applied.',
    perks: [
      'Standard installer pricing',
      'Standard scheduling for material delivery and installation',
      'Free initial consultation with a local installer',
    ],
  },
  {
    tierId: 'tier-2-suburban',
    name: 'Suburban Estate Tier (Pallet Bundle)',
    shortName: '5% Tier (100–199 LF)',
    minFeet: 100,
    maxFeet: 199,
    discountPercent: 5,
    badge: '5% Wholesale Rebate',
    wholesaleClassification: 'Contractor Pallet Bundle',
    description: 'Typical volume-pricing tier you can expect to negotiate with installers on full residential perimeter orders (100+ LF).',
    savingsHighlights: 'Around 5% typical discount on structural steel panels, posts, and brackets at this footage range.',
    perks: [
      '~5% typical material cost reduction',
      'Bundled material discounts often available at this volume',
      'Touch-up paint commonly included by installers',
      'Priority scheduling frequently offered at this volume',
    ],
  },
  {
    tierId: 'tier-3-commercial',
    name: 'Commercial & Large Parcel Tier',
    shortName: '8% Tier (200–299 LF)',
    minFeet: 200,
    maxFeet: 299,
    discountPercent: 8,
    badge: '8% Commercial Batch',
    wholesaleClassification: 'Commercial Multi-Pallet',
    description: 'Typical high-volume pricing tier for corner properties, semi-commercial compounds, and acreage frontages (200+ LF).',
    savingsHighlights: 'Around 8% typical savings on structural steel, plus freight discounts commonly available at this volume.',
    perks: [
      '~8% typical material cost reduction',
      'Priority scheduling commonly offered at this volume',
      'Freight/delivery discounts often available at this volume',
      'Spare hardware sometimes included by installers',
    ],
  },
  {
    tierId: 'tier-4-industrial',
    name: 'Industrial & Subdivision Tier',
    shortName: '12% Tier (300–399 LF)',
    minFeet: 300,
    maxFeet: 399,
    discountPercent: 12,
    badge: '12% Industrial Tier',
    wholesaleClassification: 'Subdivision / HOA Fleet',
    description: 'Typical volume-pricing tier for commercial developments, multi-lot subdivisions, and industrial perimeter security projects (300+ LF).',
    savingsHighlights: 'Around 12% typical volume discount at this footage range, negotiated with your installer.',
    perks: [
      '~12% typical material cost reduction',
      'Coordinated delivery scheduling commonly available at this volume',
      'Dedicated point of contact frequently offered by installers at this volume',
      'Hardware and fastener bundles sometimes included',
    ],
  },
  {
    tierId: 'tier-5-enterprise',
    name: 'Master Planned / Enterprise Fleet Tier',
    shortName: '15% Max Tier (400+ LF)',
    minFeet: 400,
    maxFeet: null,
    discountPercent: 15,
    badge: '15% Maximum Wholesale',
    wholesaleClassification: 'Enterprise Master Wholesale',
    description: 'The highest typical volume-pricing tier, generally reserved for large acreage estates, municipal facilities, and commercial enterprise projects (400+ LF).',
    savingsHighlights: 'Up to 15% typical volume discount at this footage range, along with priority scheduling and project coordination commonly offered by installers.',
    perks: [
      'Up to ~15% typical material cost reduction',
      'Priority scheduling commonly offered at this volume',
      'Dedicated project coordination frequently available from your installer',
      'Ask your installer about engineering documentation for permitting',
      'Complimentary hardware upgrades sometimes available',
    ],
  },
];

/**
 * Returns the matching Bulk Savings Tier for a given linear footage.
 */
export function getBulkTier(linearFeet: number): BulkTierOption {
  const feet = Math.max(0, linearFeet);
  for (let i = BULK_SAVINGS_TIERS.length - 1; i >= 0; i--) {
    const tier = BULK_SAVINGS_TIERS[i];
    if (feet >= tier.minFeet) {
      return tier;
    }
  }
  return BULK_SAVINGS_TIERS[0];
}

/**
 * Returns the next available bulk tier and how many linear feet are needed to unlock it.
 */
export function getNextBulkTier(linearFeet: number): { nextTier: BulkTierOption; feetNeeded: number } | null {
  const currentTier = getBulkTier(linearFeet);
  const currentIndex = BULK_SAVINGS_TIERS.findIndex((t) => t.tierId === currentTier.tierId);

  if (currentIndex < BULK_SAVINGS_TIERS.length - 1) {
    const nextTier = BULK_SAVINGS_TIERS[currentIndex + 1];
    const feetNeeded = Math.max(0, nextTier.minFeet - linearFeet);
    return {
      nextTier,
      feetNeeded,
    };
  }

  return null;
}
