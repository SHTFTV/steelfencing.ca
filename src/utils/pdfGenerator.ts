import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FenceConfig } from '../types';
import { calculateEstimate, formatCAD } from './calculator';
import { FENCE_PRODUCTS, FENCE_COLORS } from '../data/products';
import { CANADIAN_PROVINCES } from '../data/climateData';
import { buildShareableConfigUrl, generateQrCodeDataUrl } from './shareUrl';

export interface GeneratePdfOptions {
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAddress?: string;
  notes?: string;
}

export async function generateFenceEstimatePDF(
  config: FenceConfig,
  options: GeneratePdfOptions = {}
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const estimate = calculateEstimate(config);
  const product = FENCE_PRODUCTS.find((p) => p.id === config.style) || FENCE_PRODUCTS[0];
  const color = FENCE_COLORS.find((c) => c.id === config.color) || FENCE_COLORS[0];
  const province = CANADIAN_PROVINCES.find((p) => p.code === config.province) || CANADIAN_PROVINCES[0];

  const reportId = `SF-EST-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const validUntilDate = new Date();
  validUntilDate.setDate(validUntilDate.getDate() + 60);
  const validUntilStr = validUntilDate.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // --- BRAND HEADER (Dark Architectural Banner) ---
  doc.setFillColor(15, 17, 23); // #0f1117 (Dark Obsidian)
  doc.rect(0, 0, 210, 36, 'F');

  // Gold Accent Line
  doc.setFillColor(245, 158, 11); // #f59e0b (Amber/Gold)
  doc.rect(0, 36, 210, 1.5, 'F');

  // Logo text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('STEELFENCING', 14, 18);
  
  doc.setTextColor(245, 158, 11);
  doc.text('.CA', 66, 18);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 185, 195);
  doc.text('ARCHITECTURAL STEEL SYSTEMS • AUTOMATED GATES • CANADIAN COLD-CLIMATE SPEC', 14, 25);

  // Document Type & Reference (Right side of header)
  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('OFFICIAL SPECIFICATION & COST ESTIMATE', 210 - 14, 14, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8.5);
  doc.text(`Doc Ref: ${reportId}`, 210 - 14, 20, { align: 'right' });
  doc.setTextColor(160, 165, 175);
  doc.text(`Issued: ${dateStr}`, 210 - 14, 25, { align: 'right' });
  doc.text(`Price Lock Guaranteed Until: ${validUntilStr}`, 210 - 14, 30, { align: 'right' });

  let cursorY = 44;

  // --- CLIENT & PROJECT METADATA STRIP ---
  doc.setFillColor(248, 249, 250);
  doc.setDrawColor(220, 225, 230);
  doc.roundedRect(14, cursorY, 182, 22, 2, 2, 'FD');

  doc.setFontSize(8.5);
  doc.setTextColor(60, 65, 75);

  // Col 1: Customer Info
  doc.setFont('helvetica', 'bold');
  doc.text('Client / Site Information:', 18, cursorY + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${options.clientName || 'Project Evaluation Client'}`, 18, cursorY + 11);
  doc.text(`Location: ${options.clientAddress || province.name + ', Canada'}`, 18, cursorY + 16);

  // Col 2: Project Parameters
  doc.setFont('helvetica', 'bold');
  doc.text('Key Engineering Parameters:', 105, cursorY + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(`Province / Code: ${province.name} (${province.code}) • Frost Line: ${estimate.frostDepthRecommendedInches}"`, 105, cursorY + 11);
  doc.text(`Total Perimeter: ${config.linearFeet} LF (~${(config.linearFeet * 0.3048).toFixed(1)}m) | Height: ${config.heightFeet} Feet`, 105, cursorY + 16);

  cursorY += 28;

  // --- SECTION 1: SPECIFICATION & ARCHITECTURAL SUMMARY TABLE ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(20, 24, 33);
  doc.text('1. Architectural Specification & Bill of Materials', 14, cursorY);
  cursorY += 3;

  const specRows = [
    ['Steel System Profile', product.name, product.tagline],
    ['Material & Climate Grade', estimate.materialGradeName, `Expected Longevity: ${estimate.expectedLongevityYears} in ${province.name} (${estimate.climateLongevityRating})`],
    ['Panel Dimensions', `${config.heightFeet} ft Height x 6 ft Nominal Width`, `${estimate.panelsCount} Pre-Engineered Modules`],
    ['Total Perimeter Footage', `${config.linearFeet} Linear Feet (${(config.linearFeet * 0.3048).toFixed(1)} meters)`, 'Continuous perimeter measurement'],
    ['Powder Coat / Finish', color.name, `${color.description} (5-Stage Architectural TGIC)`],
    ['Steel Core & Gauge', `${product.specs.steelGauge} Galvalume®`, 'ASTM A653 Zinc-Aluminum Anti-Corrosion'],
    ['Structural Posts', `${estimate.postsCount} Heavy-Duty Square Steel Posts`, `2.5"x2.5" / 3.0"x3.0" cold-rolled structural steel`],
    ['Wholesale Volume Tier', estimate.bulkTier?.name || 'Standard Retail', estimate.bulkDiscountPercent && estimate.bulkDiscountPercent > 0 ? `${estimate.bulkDiscountPercent}% Manufacturer Bulk Discount (-${formatCAD(estimate.bulkDiscountAmount || 0)})` : 'Standard Single-Pack (<100 LF)'],
    ['Foundation Method', config.postMount === 'deep-frost-ground' ? 'Deep Frost Sleeve Footing' : config.postMount === 'helical-pile' ? 'Helical Screw Piles (Torque Driven)' : 'Surface Baseplate Flange', `${province.frostDepthInches}" Frost Depth Compliance (${province.code})`],
    ['Warranty Protection', `${estimate.warrantyYears}-Year Structural Warranty`, 'Non-prorated anti-perforation warranty coverage'],
    ['Gate & Access System', config.includeGate === 'none' ? 'None Specified' : config.includeGate.replace(/-/g, ' ').toUpperCase(), config.gateAutomation ? 'Sub-Zero Brushless Motor Operator (-40°C)' : 'Manual heavy-duty commercial latch'],
    ['Security & Access Control', config.securityPackage === 'none' ? 'Standard Mechanical Lock' : config.securityPackage.replace(/-/g, ' ').toUpperCase(), config.solarBackupPower ? 'Includes Solar Off-Grid Dual AGM Battery Kit' : 'Standard 120V AC hardwired connection'],
    ['Integrated LED Lighting', config.integratedLedLighting ? 'Active Low-Voltage Channel' : 'None', config.integratedLedLighting ? `${estimate.postsCount} IP67 Post-Cap 2700K Fixtures + Transformer Hub` : 'Standard architectural post caps'],
    ['Service Mode', config.installationType === 'turnkey-pro' ? 'Certified Turnkey Installation' : 'Direct Freight Supply Only', config.installationType === 'turnkey-pro' ? 'Laser site grading, deep post drilling, installation & warranty' : 'Crated modules & assembly hardware shipped to site'],
  ];

  autoTable(doc, {
    startY: cursorY,
    head: [['Specification Item', 'Configuration Selected', 'Technical Standard / Detail']],
    body: specRows,
    theme: 'grid',
    headStyles: {
      fillColor: [30, 35, 45],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
      cellPadding: 2,
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [40, 45, 55],
      cellPadding: 1.8,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 45 },
      1: { fontStyle: 'bold', textColor: [20, 24, 33], cellWidth: 55 },
      2: { cellWidth: 82 },
    },
    margin: { left: 14, right: 14 },
  });

  cursorY = (doc as any).lastAutoTable.finalY + 7;

  // --- SECTION 2: ITEMIZED COST BREAKDOWN ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(20, 24, 33);
  doc.text('2. Itemized Cost Estimation & Regional Taxes (CAD)', 14, cursorY);
  cursorY += 3;

  const costBreakdownData = [
    [
      'Structural Infill Panels',
      `${estimate.panelsCount} units (${product.name}, ${config.heightFeet}ft)`,
      formatCAD(Math.round((estimate.rawMaterialsCost || estimate.materialsCost) * 0.7)),
    ],
    [
      'Structural Posts & Mounting Fasteners',
      `${estimate.postsCount} posts + powder-coated bracket kit`,
      formatCAD(Math.round((estimate.rawMaterialsCost || estimate.materialsCost) * 0.3)),
    ],
  ];

  if (estimate.bulkDiscountAmount && estimate.bulkDiscountAmount > 0) {
    costBreakdownData.push([
      `Wholesale Bulk Volume Discount (-${estimate.bulkDiscountPercent}%)`,
      `${estimate.bulkTier?.name || 'Volume Tier'} (${config.linearFeet} Linear Feet)`,
      `-${formatCAD(estimate.bulkDiscountAmount)}`,
    ]);
  }

  if (config.installationType === 'turnkey-pro') {
    costBreakdownData.push([
      'Certified Turnkey Installation Labor',
      `Excavation, ${estimate.frostDepthRecommendedInches}" frost footing drilling, laser alignment & site cleanup`,
      formatCAD(estimate.installationCost),
    ]);
  }

  if (estimate.gateCost > 0) {
    costBreakdownData.push([
      'Gate & Barrier System',
      `${config.includeGate.replace(/-/g, ' ')} ${config.gateAutomation ? '(Brushless Automated Motor)' : ''}`,
      formatCAD(estimate.gateCost),
    ]);
  }

  if (estimate.securityCost > 0) {
    costBreakdownData.push([
      'Security & Access Control Package',
      `${config.securityPackage.replace(/-/g, ' ')} ${config.solarBackupPower ? '+ Off-grid Solar Kit' : ''}`,
      formatCAD(estimate.securityCost),
    ]);
  }

  if (estimate.lightingCost > 0) {
    costBreakdownData.push([
      'Low-Voltage LED Channel',
      `${estimate.postsCount} integrated waterproof post-caps, wire harnesses & outdoor driver`,
      formatCAD(estimate.lightingCost),
    ]);
  }

  costBreakdownData.push([
    'SUBTOTAL (Pre-Tax)',
    `Unit Rate: $${estimate.effectivePerFoot} / Linear Foot`,
    `${formatCAD(estimate.totalBeforeTax)} CAD`,
  ]);

  costBreakdownData.push([
    `Provincial Sales Tax (${province.name})`,
    `${((estimate.provincialTaxRate || 0.13) * 100).toFixed(1)}% Provincial Tax Rate`,
    `${formatCAD(estimate.provincialTaxAmount || 0)} CAD`,
  ]);

  costBreakdownData.push([
    'ESTIMATED GRAND TOTAL',
    'Includes all materials, hardware, regional tax & warranty',
    `${formatCAD(estimate.grandTotalWithTax || estimate.totalBeforeTax)} CAD`,
  ]);

  autoTable(doc, {
    startY: cursorY,
    head: [['Cost Component', 'Description & Units', 'Amount (CAD)']],
    body: costBreakdownData,
    theme: 'grid',
    headStyles: {
      fillColor: [30, 35, 45],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
      cellPadding: 2,
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [40, 45, 55],
      cellPadding: 2,
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 70 },
      1: { cellWidth: 72 },
      2: { fontStyle: 'bold', halign: 'right', cellWidth: 40, textColor: [20, 24, 33] },
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    didParseCell: (data) => {
      // Highlight Grand Total row
      if (data.row.index === costBreakdownData.length - 1) {
        data.cell.styles.fillColor = [254, 243, 199]; // light amber
        data.cell.styles.textColor = [120, 53, 15]; // dark amber
        data.cell.styles.fontStyle = 'bold';
      }
      if (data.row.index === costBreakdownData.length - 3) {
        data.cell.styles.fontStyle = 'bold';
      }
    },
    margin: { left: 14, right: 14 },
  });

  cursorY = (doc as any).lastAutoTable.finalY + 6;

  // --- SECTION 3: 20-YEAR LIFETIME ROI & FINANCING CALLOUT BOXES ---
  const boxWidth = 88;
  const boxHeight = 24;

  // Box 1: Low-Payment Financing
  doc.setFillColor(240, 249, 255); // Sky light
  doc.setDrawColor(186, 230, 253);
  doc.roundedRect(14, cursorY, boxWidth, boxHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(3, 105, 161);
  doc.text('Flexible Monthly Financing (0% OAC):', 18, cursorY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 65, 80);
  doc.text(`• 24 Months: ~$${estimate.monthlyFinancing24}/mo (0% Interest)`, 18, cursorY + 11);
  doc.text(`• 36 Months: ~$${estimate.monthlyFinancing36}/mo`, 18, cursorY + 15.5);
  doc.text('Pre-approval available with zero penalty early payout.', 18, cursorY + 20);

  // Box 2: 20-Year Lifetime Savings vs Wood
  doc.setFillColor(236, 253, 245); // Emerald light
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(108, cursorY, boxWidth, boxHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(4, 120, 87);
  doc.text(`20-Year Lifetime ROI (Save ${formatCAD(estimate.lifetimeSavingsVsWood || 8500)}):`, 112, cursorY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 65, 80);
  doc.text(`• Wood 20-Yr Cost: ${formatCAD(estimate.twentyYearWoodCost || 18000)} (10 stains + yr-10 rebuild)`, 112, cursorY + 11);
  doc.text(`• SteelFencing.ca: ${formatCAD(estimate.totalBeforeTax)} ($0 Lifetime Staining)`, 112, cursorY + 15.5);
  doc.text('100% Recyclable • Zero rot, warping, or termite decay.', 112, cursorY + 20);

  cursorY += boxHeight + 6;

  // --- SECTION 4: CODE & WARRANTY ASSURANCE BADGES & LIVE QR CODE ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(70, 75, 85);
  doc.text('ENGINEERING COMPLIANCE & WARRANTY STANDARDS:', 14, cursorY);
  cursorY += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(90, 95, 105);
  const complianceText = [
    '✓ ASTM A653 Anti-Corrosion Coating',
    '✓ Wind Load Rated up to 160+ km/h (100 mph) & Sub-Zero Cold Resilient to -45°C',
    '✓ Always confirm local pool-enclosure bylaws with your municipality before installation',
  ];

  complianceText.forEach((line) => {
    doc.text(line, 14, cursorY);
    cursorY += 3.5;
  });

  // Generate & add dynamic QR Code stamp to bottom right corner
  try {
    const shareUrl = buildShareableConfigUrl(config);
    const qrData = await generateQrCodeDataUrl(shareUrl, {
      width: 150,
      darkColor: '#0f1117',
      lightColor: '#ffffff',
    });
    if (qrData) {
      // Draw QR Box
      doc.setDrawColor(220, 225, 235);
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(172, 252, 24, 26, 1.5, 1.5, 'FD');
      doc.addImage(qrData, 'PNG', 173, 253, 22, 22);
      doc.setFontSize(5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(245, 158, 11);
      doc.text('SCAN FOR 3D MODEL', 184, 277, { align: 'center' });
    }
  } catch (qrErr) {
    console.warn('Could not render QR code on PDF:', qrErr);
  }

  // --- FOOTER STRIP ---
  doc.setFillColor(15, 17, 23);
  doc.rect(0, 282, 210, 15, 'F');

  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('STEELFENCING.CA', 14, 289);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 205, 215);
  doc.text('• Web: www.steelfencing.ca', 48, 289);

  doc.setFontSize(6.5);
  doc.setTextColor(140, 145, 155);
  doc.text('Specifications formatted in accordance with CSI MasterFormat 32 31 19.', 14, 294);
  doc.text(`Page 1 of 1 • Generated ${dateStr}`, 210 - 14, 294, { align: 'right' });

  // Trigger browser download
  const safeFilename = `SteelFencing_CA_Estimate_${config.style}_${config.linearFeet}LF_${reportId}.pdf`;
  doc.save(safeFilename);
}
