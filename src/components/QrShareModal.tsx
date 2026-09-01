import React, { useState, useEffect } from 'react';
import { FenceConfig } from '../types';
import { FENCE_PRODUCTS, FENCE_COLORS } from '../data/products';
import { CANADIAN_PROVINCES } from '../data/climateData';
import { calculateEstimate, formatCAD } from '../utils/calculator';
import {
  buildShareableConfigUrl,
  generateQrCodeDataUrl,
} from '../utils/shareUrl';
import {
  QrCode,
  Smartphone,
  Copy,
  Check,
  Download,
  Share2,
  ExternalLink,
  X,
  Sparkles,
  ShieldCheck,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
} from 'lucide-react';

interface QrShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: FenceConfig;
}

export const QrShareModal: React.FC<QrShareModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const product = FENCE_PRODUCTS.find((p) => p.id === config.style) || FENCE_PRODUCTS[0];
  const color = FENCE_COLORS.find((c) => c.id === config.color) || FENCE_COLORS[0];
  const province = CANADIAN_PROVINCES.find((p) => p.code === config.province) || CANADIAN_PROVINCES[0];
  const estimate = calculateEstimate(config);

  const shareUrl = buildShareableConfigUrl(config);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    generateQrCodeDataUrl(shareUrl, {
      width: 400,
      darkColor: '#0a0a0a',
      lightColor: '#ffffff',
    })
      .then((url) => {
        if (isMounted) {
          setQrDataUrl(url);
        }
      })
      .catch((err) => console.error('Error generating QR code:', err));

    return () => {
      isMounted = false;
    };
  }, [isOpen, config, shareUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleDownloadQrImage = () => {
    if (!qrDataUrl) return;
    setIsDownloading(true);

    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `SteelFencing_QR_${config.style}_${config.linearFeet}LF.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setIsDownloading(false), 1000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `SteelFencing.ca Quote - ${product.name}`,
          text: `Review my ${config.heightFeet}ft x ${config.linearFeet} LF steel fence project estimate (${formatCAD(estimate.grandTotalWithTax || estimate.totalBeforeTax)} CAD)`,
          url: shareUrl,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      } catch (e) {
        console.log('Share dismissed or not supported', e);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-neutral-900 border border-neutral-700/80 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl text-neutral-100 relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close QR Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg sm:text-xl font-black text-white font-['Space_Grotesk'] tracking-tight">
                Scan &amp; Open on Mobile Device
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                Live Sync
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Point your smartphone camera to instantly sync this customized 3D design &amp; estimate.
            </p>
          </div>
        </div>

        {/* Center Content: QR Code Card + Spec Pill */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center mb-6">
          
          {/* QR Code Container (5 cols) */}
          <div className="sm:col-span-5 flex flex-col items-center justify-center">
            <div className="p-3.5 bg-white rounded-2xl shadow-xl border-4 border-neutral-800 flex items-center justify-center relative group">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`QR Code for ${product.name} Estimate`}
                  className="w-44 h-44 sm:w-40 sm:h-40 rounded-lg object-contain"
                />
              ) : (
                <div className="w-40 h-40 flex items-center justify-center text-neutral-400 text-xs">
                  Generating QR Code...
                </div>
              )}
            </div>
            
            <span className="text-[11px] text-neutral-400 font-medium mt-2 flex items-center space-x-1">
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>iOS &amp; Android Native Camera</span>
            </span>
          </div>

          {/* Configuration Summary Card (7 cols) */}
          <div className="sm:col-span-7 space-y-3 bg-neutral-950/80 rounded-2xl p-4 border border-neutral-800 text-xs">
            <div className="flex justify-between items-center border-b border-neutral-800/80 pb-2">
              <span className="font-bold text-white text-sm">
                {product.name}
              </span>
              <span className="font-mono text-amber-400 font-bold text-sm">
                {formatCAD(estimate.grandTotalWithTax || estimate.totalBeforeTax)} CAD
              </span>
            </div>

            <div className="space-y-1.5 text-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-400">Dimensions:</span>
                <span className="font-semibold text-white">
                  {config.heightFeet} ft Height • {config.linearFeet} LF ({estimate.panelsCount} Panels)
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-400">Finish:</span>
                <span className="font-semibold text-white flex items-center space-x-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-neutral-600 inline-block"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.name}</span>
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-400">Frost Foundation:</span>
                <span className="font-semibold text-white">
                  {province.frostDepthInches}&quot; Depth ({province.code})
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-400">Gate &amp; Lighting:</span>
                <span className="font-semibold text-white">
                  {config.includeGate !== 'none' ? config.includeGate : 'No Gate'}
                  {config.integratedLedLighting ? ' • LED Post Caps' : ''}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-400">Service:</span>
                <span className="font-semibold text-amber-300">
                  {config.installationType === 'turnkey-pro' ? 'Certified Turnkey Pro' : 'Direct Supply'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Unit Rate: <strong className="text-amber-400 font-mono">${estimate.effectivePerFoot}/LF</strong></span>
              <span>{estimate.warrantyYears}-Yr Warranty</span>
            </div>
          </div>

        </div>

        {/* Shareable Link Input with Copy Button */}
        <div className="space-y-2 mb-5">
          <label className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider block">
            Direct Shareable Project URL:
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-neutral-300 font-mono select-all focus:outline-none focus:border-amber-500 truncate"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold rounded-xl transition-colors flex items-center space-x-1.5 shrink-0 cursor-pointer shadow-md"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-neutral-950 stroke-[3]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action Buttons: Download QR PNG & Share */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <button
            onClick={handleDownloadQrImage}
            disabled={isDownloading || !qrDataUrl}
            className="py-2.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold rounded-xl border border-neutral-700 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>{isDownloading ? 'Saving PNG...' : 'Save QR Image'}</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="py-2.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold rounded-xl border border-neutral-700 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-sky-400" />
            <span>{shareSuccess ? 'Shared!' : 'Share Project'}</span>
          </button>

          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 sm:col-span-1 py-2.5 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-bold rounded-xl border border-amber-500/30 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer text-center"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Test URL</span>
          </a>
        </div>

      </div>
    </div>
  );
};
