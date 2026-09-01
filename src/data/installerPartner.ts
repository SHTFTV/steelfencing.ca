// Real installer partner data for L.S Fencing & Metal Work (lsfencingandmetalwork.com).
// Every fact here is sourced directly from the installer's own live site — nothing invented.
// Do not add stats, review counts, certifications, or claims that aren't verified on their site.

export interface InstallerPartner {
  name: string;
  shortName: string;
  website: string;
  phone: string;
  phoneHref: string;
  text: string;
  textHref: string;
  email: string;
  emailHref: string;
  googleRating: number;
  googleReviewCount: number;
  googleReviewsUrl: string;
  hq: string;
  serviceRegionLabel: string;
  since: number;
  yearsInTrade: string;
  projectsInstalled: string;
  insured: string;
  emergencyWelding: string;
  tagline: string;
  services: { name: string; description: string }[];
}

export const LS_FENCING: InstallerPartner = {
  name: 'L.S Fencing & Metal Work',
  shortName: 'LS Fencing',
  website: 'https://lsfencingandmetalwork.com/',
  phone: '604-758-0014',
  phoneHref: 'tel:+16047580014',
  text: '604-808-7496',
  textHref: 'sms:+16048087496',
  email: 'Lsfencingandmetalwork@gmail.com',
  emailHref: 'mailto:Lsfencingandmetalwork@gmail.com',
  googleRating: 4.9,
  googleReviewCount: 55,
  googleReviewsUrl: 'https://www.google.com/search?q=L.S+Fencing+%26+Metal+Work+Abbotsford',
  hq: 'Abbotsford, BC',
  serviceRegionLabel: 'Fraser Valley & Lower Mainland, BC',
  since: 2011,
  yearsInTrade: '15+ Years in Trade',
  projectsInstalled: '1000+ Projects Installed',
  insured: '100% Fully Insured',
  emergencyWelding: '24/7 Emergency Welding',
  tagline: 'Commercial and residential chain link, cedar, ornamental steel, custom gates, welding and site work — installed by a crew that shows up.',
  services: [
    { name: 'Chain Link Fencing', description: 'Galvanized and black vinyl-coated chain link for residential yards and commercial security enclosures.' },
    { name: 'Cedar Fencing', description: 'Custom cedar privacy fencing, including horizontal-slat styles.' },
    { name: 'Ornamental Fencing', description: 'Powder-coated ornamental steel fence panels for a finished, upscale look.' },
    { name: 'Barrier Gates & Handrails', description: 'Galvanized pipe handrails and guardrails built to MMCD spec, plus barrier gates for driveways and commercial sites.' },
    { name: 'Metal Gates', description: 'Custom steel and ornamental metal gates, fabricated and installed on-site.' },
    { name: 'Welding Services', description: 'On-site and shop MIG welding for steel railings, custom gates, and structural steel fabrication, with 24/7 emergency welding available.' },
    { name: 'Excavation Services', description: 'Post-hole and fence-line excavation using their own mini excavator and skid steer equipment.' },
    { name: 'Snow Removal', description: 'Commercial snow removal across the Fraser Valley.' },
  ],
};

export interface LowerMainlandCity {
  slug: string;
  name: string;
  region: 'Fraser Valley' | 'Lower Mainland';
  blurb: string;
}

// Cities within L.S Fencing & Metal Work's stated service area (Fraser Valley & Lower Mainland, BC).
export const LOWER_MAINLAND_CITIES: LowerMainlandCity[] = [
  { slug: 'abbotsford-bc', name: 'Abbotsford', region: 'Fraser Valley', blurb: "L.S Fencing & Metal Work's home base, serving Abbotsford properties directly." },
  { slug: 'chilliwack-bc', name: 'Chilliwack', region: 'Fraser Valley', blurb: 'Chain link, cedar, and ornamental steel fencing across Chilliwack.' },
  { slug: 'langley-bc', name: 'Langley', region: 'Fraser Valley', blurb: 'Steel gates, handrails, and fencing for Langley homes and businesses.' },
  { slug: 'mission-bc', name: 'Mission', region: 'Fraser Valley', blurb: 'Fencing, welding, and site work for Mission-area properties.' },
  { slug: 'maple-ridge-bc', name: 'Maple Ridge', region: 'Lower Mainland', blurb: 'Custom steel fabrication and fencing for Maple Ridge properties.' },
  { slug: 'pitt-meadows-bc', name: 'Pitt Meadows', region: 'Lower Mainland', blurb: 'Fencing and gate installation for Pitt Meadows homes and farms.' },
  { slug: 'surrey-bc', name: 'Surrey', region: 'Lower Mainland', blurb: 'Commercial and residential fencing, gates, and barrier rail for Surrey.' },
  { slug: 'delta-bc', name: 'Delta', region: 'Lower Mainland', blurb: 'Ornamental and security fencing for Delta properties.' },
  { slug: 'white-rock-bc', name: 'White Rock', region: 'Lower Mainland', blurb: 'Cedar and ornamental steel fencing for White Rock homes.' },
  { slug: 'new-westminster-bc', name: 'New Westminster', region: 'Lower Mainland', blurb: 'Steel railings, gates, and fencing for New Westminster properties.' },
  { slug: 'coquitlam-bc', name: 'Coquitlam', region: 'Lower Mainland', blurb: 'Fencing and welding services across Coquitlam.' },
  { slug: 'burnaby-bc', name: 'Burnaby', region: 'Lower Mainland', blurb: 'Commercial security fencing and steel gates for Burnaby.' },
];
