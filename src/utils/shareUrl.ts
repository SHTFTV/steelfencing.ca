import QRCode from 'qrcode';
import { FenceConfig, FenceStyleId, FenceColorId, PostMountType, GateType, SecurityPackageType, MaterialGradeId, SoilTypeId } from '../types';

/**
 * Encodes a FenceConfig object into a clean query string
 */
export function encodeConfigToQuery(config: FenceConfig): string {
  const params = new URLSearchParams();
  params.set('style', config.style);
  params.set('h', config.heightFeet.toString());
  params.set('lf', config.linearFeet.toString());
  params.set('c', config.color);
  params.set('mg', config.materialGrade || 'standard');
  if (config.soilType) params.set('soil', config.soilType);
  params.set('pm', config.postMount);
  params.set('sp', config.slatSpacing);
  params.set('g', config.includeGate);
  params.set('gw', (config.gateWidthFeet || 4).toString());
  params.set('ga', config.gateAutomation ? '1' : '0');
  params.set('sec', config.securityPackage || 'none');
  params.set('sol', config.solarBackupPower ? '1' : '0');
  params.set('led', config.integratedLedLighting ? '1' : '0');
  params.set('prov', config.province);
  params.set('inst', config.installationType);
  return params.toString();
}

/**
 * Builds the full shareable URL pointing directly to this configuration
 */
export function buildShareableConfigUrl(config: FenceConfig): string {
  const queryString = encodeConfigToQuery(config);
  const base = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : 'https://steelfencing.ca';
  return `${base}?${queryString}#calculator`;
}

/**
 * Decodes URL search parameters into a partial or full FenceConfig
 */
export function decodeConfigFromUrl(): Partial<FenceConfig> | null {
  if (typeof window === 'undefined') return null;

  try {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('style') && !params.has('lf') && !params.has('h')) {
      return null;
    }

    const config: Partial<FenceConfig> = {};

    if (params.has('style')) config.style = params.get('style') as FenceStyleId;
    if (params.has('h')) config.heightFeet = Number(params.get('h')) || 6;
    if (params.has('lf')) config.linearFeet = Number(params.get('lf')) || 120;
    if (params.has('c')) config.color = params.get('c') as FenceColorId;
    if (params.has('mg')) config.materialGrade = params.get('mg') as MaterialGradeId;
    if (params.has('soil')) config.soilType = params.get('soil') as SoilTypeId;
    if (params.has('pm')) config.postMount = params.get('pm') as PostMountType;
    if (params.has('sp')) config.slatSpacing = params.get('sp') as any;
    if (params.has('g')) config.includeGate = params.get('g') as GateType;
    if (params.has('gw')) config.gateWidthFeet = Number(params.get('gw')) || 4;
    if (params.has('ga')) config.gateAutomation = params.get('ga') === '1';
    if (params.has('sec')) config.securityPackage = params.get('sec') as SecurityPackageType;
    if (params.has('sol')) config.solarBackupPower = params.get('sol') === '1';
    if (params.has('led')) config.integratedLedLighting = params.get('led') === '1';
    if (params.has('prov')) config.province = params.get('prov') || 'ON';
    if (params.has('inst')) config.installationType = params.get('inst') as any;

    return config;
  } catch (e) {
    console.error('Error parsing config from URL:', e);
    return null;
  }
}

/**
 * Generates a high-quality QR code data URL (PNG)
 */
export async function generateQrCodeDataUrl(url: string, options?: { darkColor?: string; lightColor?: string; width?: number }): Promise<string> {
  const width = options?.width || 360;
  const darkColor = options?.darkColor || '#0a0a0a';
  const lightColor = options?.lightColor || '#ffffff';

  return QRCode.toDataURL(url, {
    width,
    margin: 1.5,
    color: {
      dark: darkColor,
      light: lightColor,
    },
    errorCorrectionLevel: 'M',
  });
}
