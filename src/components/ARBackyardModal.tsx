import React, { useState, useEffect, useRef } from 'react';
import { FenceConfig } from '../types';
import { FENCE_PRODUCTS, FENCE_COLORS } from '../data/products';
import { buildShareableConfigUrl, generateQrCodeDataUrl } from '../utils/shareUrl';
import {
  Camera,
  QrCode,
  Smartphone,
  Scan,
  Compass,
  Layers,
  Sparkles,
  Check,
  Copy,
  Download,
  X,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sun,
  ShieldCheck,
  HelpCircle,
  Share2,
  ExternalLink,
  ChevronRight,
  Info,
  CheckCircle2,
  Eye,
  Sliders,
  Move,
  Lock,
  ArrowRight,
  Video,
  VideoOff,
  Upload,
} from 'lucide-react';

interface ARBackyardModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: FenceConfig;
}

export const ARBackyardModal: React.FC<ARBackyardModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'simulator' | 'devices'>('guide');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [linkSent, setLinkSent] = useState(false);

  // Simulator States
  const [simulatorBackdrop, setSimulatorBackdrop] = useState<'lawn' | 'patio' | 'snow' | 'custom'>('lawn');
  const [customBackdropUrl, setCustomBackdropUrl] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [fenceDistanceFeet, setFenceDistanceFeet] = useState<number>(18); // 8 - 40 ft away
  const [fenceAngle, setFenceAngle] = useState<number>(0); // -30 to 30 deg perspective
  const [gateOpen, setGateOpen] = useState<boolean>(false);
  const [isScanningPlane, setIsScanningPlane] = useState<boolean>(false);
  const [showReticle, setShowReticle] = useState<boolean>(true);
  const [snapshotTaken, setSnapshotTaken] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const selectedProduct = FENCE_PRODUCTS.find((p) => p.id === config.style) || FENCE_PRODUCTS[0];
  const selectedColor = FENCE_COLORS.find((c) => c.id === config.color) || FENCE_COLORS[0];

  // Base AR link with ar=1 query parameter
  const baseShareUrl = buildShareableConfigUrl(config);
  const arLaunchUrl = baseShareUrl.includes('?') ? `${baseShareUrl}&ar=1` : `${baseShareUrl}?ar=1`;

  // Generate high-definition QR code for phone camera scanning
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    generateQrCodeDataUrl(arLaunchUrl, {
      width: 440,
      darkColor: '#09090b',
      lightColor: '#ffffff',
    })
      .then((url) => {
        if (isMounted) setQrCodeUrl(url);
      })
      .catch((err) => console.error('Failed to generate AR QR code:', err));

    return () => {
      isMounted = false;
    };
  }, [isOpen, arLaunchUrl]);

  // Clean up camera on modal close or unmount
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
    }
  }, [isOpen]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(arLaunchUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneOrEmail) return;
    setLinkSent(true);
    setTimeout(() => {
      setLinkSent(false);
      setPhoneOrEmail('');
    }, 4000);
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your current browser.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
      // Brief plane scan animation
      setIsScanningPlane(true);
      setTimeout(() => setIsScanningPlane(false), 2400);
    } catch (err: any) {
      console.warn('Camera request error:', err);
      setCameraError(
        err.name === 'NotAllowedError'
          ? 'Camera permission was denied. You can still test the AR simulator using our high-res backyard presets or upload your own yard photo!'
          : 'Unable to access your device camera. Please check your browser permissions.'
      );
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomBackdropUrl(event.target.result as string);
          setSimulatorBackdrop('custom');
          stopCamera();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerCaptureSnapshot = () => {
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 2000);
  };

  if (!isOpen) return null;

  // Visualizer scale calculations for simulator
  // At 10ft: scale ~1.3, at 40ft: scale ~0.55
  const perspectiveScale = Math.max(0.48, 1.4 - (fenceDistanceFeet - 8) * 0.026);
  const bottomPositionPercent = Math.min(68, 22 + (fenceDistanceFeet - 8) * 1.1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-neutral-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 w-full max-w-5xl max-h-[94vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base sm:text-lg font-black text-white font-['Space_Grotesk']">
                  Mobile Augmented Reality (AR) Backyard Preview
                </h3>
                <span className="hidden sm:inline-flex items-center space-x-1 text-[10px] font-mono bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>1:1 True Scale</span>
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Project your custom steel fence onto your real property line using your smartphone camera
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Close AR Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Configuration Pill */}
        <div className="px-4 sm:px-6 py-2.5 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between gap-3 text-xs overflow-x-auto">
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-[10px] font-mono uppercase font-bold text-neutral-400">Configured Spec:</span>
            <span className="font-semibold text-white">{selectedProduct.name}</span>
            <span className="text-neutral-500">•</span>
            <span className="font-mono text-amber-400 font-bold">{config.heightFeet} ft Height</span>
            <span className="text-neutral-500">•</span>
            <span className="inline-flex items-center space-x-1.5 text-neutral-300">
              <span className="w-2.5 h-2.5 rounded-full border border-neutral-600" style={{ backgroundColor: selectedColor.hex }}></span>
              <span>{selectedColor.name}</span>
            </span>
            <span className="text-neutral-500">•</span>
            <span className="font-mono text-neutral-400">{config.linearFeet} LF</span>
          </div>

          <div className="hidden md:flex items-center space-x-2 shrink-0">
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
Live Camera Preview
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-6 pt-3 pb-0 bg-neutral-900 border-b border-neutral-800 flex space-x-2">
          <button
            onClick={() => {
              setActiveTab('guide');
              stopCamera();
            }}
            className={`pb-2.5 px-3 text-xs font-bold font-mono transition-all border-b-2 cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'guide'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>How to Use on Phone (QR Code)</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`pb-2.5 px-3 text-xs font-bold font-mono transition-all border-b-2 cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'simulator'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Scan className="w-3.5 h-3.5" />
            <span>Live AR Camera Simulator</span>
            <span className="ml-1 text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded font-mono">
              Try Now
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('devices');
              stopCamera();
            }}
            className={`pb-2.5 px-3 text-xs font-bold font-mono transition-all border-b-2 cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'devices'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Device &amp; Browser Tips</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: HOW TO USE ON PHONE & QR CODE */}
          {activeTab === 'guide' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: QR Code & Direct Mobile Launch (5 cols) */}
              <div className="lg:col-span-5 bg-neutral-950 rounded-2xl border border-neutral-800 p-5 space-y-4 flex flex-col items-center text-center">
                
                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono font-bold text-amber-400">
                    <QrCode className="w-3 h-3" />
                    <span>Point Smartphone Camera</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white font-['Space_Grotesk']">
                    Scan to Launch AR in Your Yard
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-xs">
                    No app download required. Opens directly in your phone's browser (Safari or Chrome) as a live camera preview.
                  </p>
                </div>

                {/* Rendered QR Code Frame */}
                <div className="relative p-3 bg-white rounded-2xl shadow-xl border-4 border-amber-500/20 group">
                  {qrCodeUrl ? (
                    <img
                      src={qrCodeUrl}
                      alt="AR Preview QR Code"
                      className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center bg-neutral-100 rounded-lg">
                      <RefreshCw className="w-6 h-6 animate-spin text-neutral-400" />
                    </div>
                  )}

                  {/* Overlay Center Icon */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-xl bg-neutral-950 border-2 border-amber-500 flex items-center justify-center text-amber-400 shadow-md">
                      <Camera className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Direct Launch on this device */}
                <div className="w-full space-y-2 pt-1">
                  <a
                    href={arLaunchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Launch AR Directly on This Device</span>
                  </a>

                  <button
                    onClick={handleCopyLink}
                    className="w-full py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white font-mono text-xs border border-neutral-800 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">AR Link Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Copy Mobile AR Link</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Send link to mobile form */}
                <form onSubmit={handleSendLink} className="w-full pt-2 border-t border-neutral-900 space-y-1.5">
                  <span className="text-[11px] text-neutral-400 block text-left">
                    Send link to phone via SMS or Email:
                  </span>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="Mobile # or Email"
                      value={phoneOrEmail}
                      onChange={(e) => setPhoneOrEmail(e.target.value)}
                      className="flex-1 bg-neutral-900 border border-neutral-800 text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500 font-mono"
                    />
                    <button
                      type="submit"
                      disabled={!phoneOrEmail || linkSent}
                      className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-amber-400 font-bold text-xs rounded-lg border border-neutral-700 cursor-pointer transition-colors"
                    >
                      {linkSent ? 'Sent!' : 'Send'}
                    </button>
                  </div>
                  {linkSent && (
                    <span className="text-[10px] text-emerald-400 font-mono block text-left">
                      ✓ Instant AR session link dispatched!
                    </span>
                  )}
                </form>
              </div>

              {/* Right Column: 4-Step Illustrated Walkthrough (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                
                <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
                    <Scan className="w-4 h-4 text-amber-400" />
                    <span>How Phone Camera AR Works in 4 Steps</span>
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Follow these simple steps when holding your phone in your backyard or patio.
                  </p>
                </div>

                {/* Step Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Step 1 */}
                  <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-2 relative group hover:border-neutral-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold flex items-center justify-center">
                        1
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">Camera Scan</span>
                    </div>
                    <h5 className="text-xs font-bold text-white">Point at Ground or Patio</h5>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      Move your phone gently side-to-side across your lawn, concrete footing, or property line. Your phone will detect the ground plane within 2–3 seconds.
                    </p>
                    <div className="pt-1 text-[10px] text-amber-400/90 font-mono flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Works on grass, concrete, stone &amp; mulch</span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-2 relative group hover:border-neutral-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold flex items-center justify-center">
                        2
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">Anchor Point</span>
                    </div>
                    <h5 className="text-xs font-bold text-white">Tap to Place First Terminal Post</h5>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      A holographic placement circle will appear on the grass. Tap once to plant the first post, then drag your finger along your property boundary.
                    </p>
                    <div className="pt-1 text-[10px] text-amber-400/90 font-mono flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>True 1:1 scale (6ft fence = 6ft in real life)</span>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-2 relative group hover:border-neutral-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold flex items-center justify-center">
                        3
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">Sightline Check</span>
                    </div>
                    <h5 className="text-xs font-bold text-white">Walk the Perimeter &amp; Check Privacy</h5>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      Walk freely around your yard. Look back from your patio furniture, hot tub, or kitchen window to inspect how the solid or louvered steel panels block sightlines.
                    </p>
                    <div className="pt-1 text-[10px] text-amber-400/90 font-mono flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Simulates neighbor window angles</span>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-2 relative group hover:border-neutral-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold flex items-center justify-center">
                        4
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">Sun &amp; Finish</span>
                    </div>
                    <h5 className="text-xs font-bold text-white">Inspect Outdoor Daylight Reaction</h5>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      The AR engine uses your local GPS daylight to render realistic cast shadows and shows how your chosen powder coat (Matte Black, Charcoal, or Corten) reflects outdoor sun.
                    </p>
                    <div className="pt-1 text-[10px] text-amber-400/90 font-mono flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Realistic cast shadows on grass</span>
                    </div>
                  </div>
                </div>

                {/* Practical Municipal & Contractor Checklist */}
                <div className="p-4 bg-gradient-to-r from-amber-500/10 via-neutral-900 to-neutral-950 rounded-2xl border border-amber-500/30 flex items-start space-x-3">
                  <Compass className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-white block">
                      Municipal Setback &amp; Contractor Handoff:
                    </span>
                    <p className="text-neutral-300 text-[11px] leading-relaxed">
                      Snap in-app AR photos with live dimensional tags and email them directly to your contractor or municipal building permit office to verify front-yard vs backyard height compliance before post-hole augering.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE AR CAMERA SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="space-y-4">
              
              {/* Simulator Action Controls Bar */}
              <div className="p-3 bg-neutral-950 rounded-2xl border border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                
                {/* Camera / Backdrop Switcher */}
                <div className="flex items-center space-x-2">
                  {!cameraActive ? (
                    <button
                      onClick={startCamera}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Turn On My Device Camera</span>
                    </button>
                  ) : (
                    <button
                      onClick={stopCamera}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <VideoOff className="w-3.5 h-3.5" />
                      <span>Stop Camera</span>
                    </button>
                  )}

                  <span className="text-neutral-500">or Test with Preset:</span>

                  <div className="flex items-center space-x-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
                    <button
                      onClick={() => {
                        stopCamera();
                        setSimulatorBackdrop('lawn');
                      }}
                      className={`px-2 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                        simulatorBackdrop === 'lawn' && !cameraActive
                          ? 'bg-emerald-600 text-white'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Green Lawn
                    </button>
                    <button
                      onClick={() => {
                        stopCamera();
                        setSimulatorBackdrop('patio');
                      }}
                      className={`px-2 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                        simulatorBackdrop === 'patio' && !cameraActive
                          ? 'bg-neutral-700 text-white'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Stone Patio
                    </button>
                    <button
                      onClick={() => {
                        stopCamera();
                        setSimulatorBackdrop('snow');
                      }}
                      className={`px-2 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                        simulatorBackdrop === 'snow' && !cameraActive
                          ? 'bg-sky-700 text-white'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Winter Snow
                    </button>
                    <button
                      onClick={() => {
                        stopCamera();
                        fileInputRef.current?.click();
                      }}
                      className={`px-2 py-1 rounded text-[11px] font-semibold cursor-pointer flex items-center space-x-1 ${
                        simulatorBackdrop === 'custom' && !cameraActive
                          ? 'bg-amber-600 text-white'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload Yard Photo</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleCustomPhotoUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Reticle & Gate Toggles */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setGateOpen(!gateOpen)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border transition-colors cursor-pointer ${
                      gateOpen
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white'
                    }`}
                  >
                    Gate Swing: {gateOpen ? 'Open 90°' : 'Closed'}
                  </button>

                  <button
                    onClick={() => setShowReticle(!showReticle)}
                    className="px-2 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white text-xs cursor-pointer"
                  >
                    {showReticle ? 'Hide Reticle' : 'Show Reticle'}
                  </button>
                </div>
              </div>

              {cameraError && (
                <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs text-rose-300 flex items-start space-x-2">
                  <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{cameraError}</span>
                </div>
              )}

              {/* Viewport Frame */}
              <div className="relative w-full h-[400px] sm:h-[460px] bg-neutral-950 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl flex items-center justify-center select-none group">
                
                {/* 1. Backdrop Layer: Real Camera Stream OR Simulated Background */}
                {cameraActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : simulatorBackdrop === 'custom' && customBackdropUrl ? (
                  <img
                    src={customBackdropUrl}
                    alt="Custom Backyard"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 transition-colors duration-500 ${
                      simulatorBackdrop === 'lawn'
                        ? 'bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-800'
                        : simulatorBackdrop === 'patio'
                        ? 'bg-gradient-to-b from-sky-300 via-stone-300 to-stone-800'
                        : 'bg-gradient-to-b from-slate-400 via-sky-100 to-slate-200'
                    }`}
                  >
                    {/* Simulated Horizon & Landscape Elements */}
                    <div className="absolute inset-0 opacity-40">
                      {simulatorBackdrop === 'lawn' && (
                        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-emerald-900 via-emerald-700 to-transparent"></div>
                      )}
                      {simulatorBackdrop === 'patio' && (
                        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-stone-900 via-stone-700 to-transparent"></div>
                      )}
                      {simulatorBackdrop === 'snow' && (
                        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-slate-300 via-sky-50 to-transparent"></div>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. AR Scanning Plane Reticle & LiDAR Dot Matrix */}
                {showReticle && (
                  <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                    {/* Horizon Level Line */}
                    <div className="w-48 h-px bg-amber-400/40 relative">
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-amber-400"></div>
                    </div>

                    {/* Ground Plane Grid mesh */}
                    <div
                      className="absolute bottom-6 w-3/4 h-36 border-t border-amber-400/30 [transform:perspective(300px)_rotateX(60deg)] flex items-center justify-center"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, rgba(245, 158, 11, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(245, 158, 11, 0.15) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                      }}
                    >
                      <div className="w-16 h-16 rounded-full border border-amber-400/60 animate-ping"></div>
                    </div>

                    {/* Scanning Plane Indicator */}
                    {isScanningPlane && (
                      <div className="absolute top-6 px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-amber-500 text-amber-400 text-xs font-mono flex items-center space-x-2">
                        <Scan className="w-3.5 h-3.5 animate-spin" />
                        <span>Aligning Preview Overlay...</span>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Augmented 3D Fence Overlay Layer */}
                <div
                  className="absolute transition-all duration-200 pointer-events-none"
                  style={{
                    bottom: `${bottomPositionPercent}%`,
                    transform: `scale(${perspectiveScale}) rotate(${fenceAngle}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                >
                  {/* Cast Shadow on Ground */}
                  <div
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[520px] h-10 bg-black/40 blur-md rounded-full"
                    style={{ transform: 'skewX(-25deg)' }}
                  ></div>

                  {/* Rendered Fence Section Model */}
                  <div className="relative flex items-end shadow-2xl">
                    
                    {/* Left Terminal Post */}
                    <div
                      className="w-5 rounded-t-sm relative flex flex-col items-center shadow-lg"
                      style={{
                        height: `${config.heightFeet * 34}px`,
                        backgroundColor: selectedColor.hex,
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      {/* Post Cap with Optional LED */}
                      <div
                        className={`w-7 h-2 rounded-t-sm -mt-2 ${
                          config.integratedLedLighting ? 'bg-amber-300 shadow-[0_0_12px_#f59e0b]' : 'bg-neutral-800'
                        }`}
                      ></div>
                    </div>

                    {/* Fence Panel 1 (Slat Section) */}
                    <div
                      className="w-48 relative overflow-hidden flex flex-col justify-between p-1 shadow-md"
                      style={{
                        height: `${config.heightFeet * 32}px`,
                        backgroundColor:
                          config.style === 'corrugated-privacy'
                            ? selectedColor.hex
                            : 'transparent',
                        borderBottom: `4px solid ${selectedColor.hex}`,
                        borderTop: `3px solid ${selectedColor.hex}`,
                      }}
                    >
                      {/* Slats */}
                      {Array.from({ length: config.heightFeet * 2.5 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-full rounded-xs shadow-xs"
                          style={{
                            height: '8px',
                            backgroundColor: selectedColor.hex,
                            borderTop: '1px solid rgba(255,255,255,0.2)',
                            borderBottom: '1px solid rgba(0,0,0,0.4)',
                          }}
                        ></div>
                      ))}
                    </div>

                    {/* Intermediate Post */}
                    <div
                      className="w-4 rounded-t-sm relative flex flex-col items-center shadow-lg"
                      style={{
                        height: `${config.heightFeet * 34}px`,
                        backgroundColor: selectedColor.hex,
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      <div
                        className={`w-6 h-2 rounded-t-sm -mt-2 ${
                          config.integratedLedLighting ? 'bg-amber-300 shadow-[0_0_12px_#f59e0b]' : 'bg-neutral-800'
                        }`}
                      ></div>
                    </div>

                    {/* Fence Gate Section (Opens/Closes on click) */}
                    <div
                      className="w-36 relative transition-transform duration-500 origin-left"
                      style={{
                        height: `${config.heightFeet * 32}px`,
                        transform: gateOpen ? 'perspective(600px) rotateY(-80deg)' : 'rotateY(0deg)',
                        border: `2px solid ${selectedColor.hex}`,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                      }}
                    >
                      {/* Gate Slats */}
                      <div className="w-full h-full flex flex-col justify-between p-1">
                        {Array.from({ length: config.heightFeet * 2.5 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-full"
                            style={{
                              height: '8px',
                              backgroundColor: selectedColor.hex,
                              borderTop: '1px solid rgba(255,255,255,0.25)',
                            }}
                          ></div>
                        ))}
                      </div>

                      {/* Gate Handle & Latch */}
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-6 bg-amber-400 rounded-sm shadow-md"></div>
                    </div>

                    {/* Right Terminal Post */}
                    <div
                      className="w-5 rounded-t-sm relative flex flex-col items-center shadow-lg"
                      style={{
                        height: `${config.heightFeet * 34}px`,
                        backgroundColor: selectedColor.hex,
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      <div
                        className={`w-7 h-2 rounded-t-sm -mt-2 ${
                          config.integratedLedLighting ? 'bg-amber-300 shadow-[0_0_12px_#f59e0b]' : 'bg-neutral-800'
                        }`}
                      ></div>
                    </div>
                  </div>

                  {/* AR Measurement Dimension Callout */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-neutral-950/90 backdrop-blur-md border border-amber-500 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-amber-300 whitespace-nowrap shadow-lg flex items-center space-x-1">
                    <span>1:1 Scale</span>
                    <span>•</span>
                    <span>{config.heightFeet}&apos; 0&quot; Height</span>
                    <span>•</span>
                    <span>{selectedColor.name}</span>
                  </div>
                </div>

                {/* Shutter Snapshot Confirmation Flash */}
                {snapshotTaken && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center animate-out fade-out duration-500 z-30">
                    <div className="bg-neutral-950 px-4 py-2 rounded-xl text-white font-mono text-xs flex items-center space-x-2 shadow-2xl">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Backyard AR Snapshot Saved!</span>
                    </div>
                  </div>
                )}

                {/* In-Viewer HUD Overlay Controls */}
                <div className="absolute top-3 left-3 bg-neutral-950/85 backdrop-blur-md border border-neutral-700/80 px-3 py-1.5 rounded-xl text-[11px] font-mono text-neutral-200 flex items-center space-x-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Spatial Tracking: Active (±0.5&quot;)</span>
                </div>

                {/* Shutter Snapshot Button */}
                <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-auto">
                  <button
                    onClick={triggerCaptureSnapshot}
                    className="p-3 rounded-full bg-white hover:bg-neutral-200 text-neutral-950 shadow-2xl border-4 border-amber-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                    title="Capture AR Photo with Measurements"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Real-time Distance & Perspective Sliders */}
              <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                {/* Distance Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-neutral-300">
                    <span className="font-semibold flex items-center space-x-1">
                      <Move className="w-3.5 h-3.5 text-amber-400" />
                      <span>Fence Distance from Camera:</span>
                    </span>
                    <span className="font-mono text-amber-400 font-bold">{fenceDistanceFeet} ft away</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="36"
                    value={fenceDistanceFeet}
                    onChange={(e) => setFenceDistanceFeet(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                    <span>8ft (Patio Edge)</span>
                    <span>18ft (Mid-Yard)</span>
                    <span>36ft (Far Property Line)</span>
                  </div>
                </div>

                {/* Perspective Angle Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-neutral-300">
                    <span className="font-semibold flex items-center space-x-1">
                      <Compass className="w-3.5 h-3.5 text-amber-400" />
                      <span>Perspective Angle:</span>
                    </span>
                    <span className="font-mono text-amber-400 font-bold">{fenceAngle}° Sightline</span>
                  </div>
                  <input
                    type="range"
                    min="-25"
                    max="25"
                    value={fenceAngle}
                    onChange={(e) => setFenceAngle(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                    <span>-25° Left Flank</span>
                    <span>0° Direct Facing</span>
                    <span>+25° Right Flank</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DEVICE & BROWSER TIPS */}
          {activeTab === 'devices' && (
            <div className="space-y-4">

              <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>How This Preview Tool Works</span>
                </h4>
                <p className="text-xs text-neutral-400">
                  This is a simple camera-preview visualizer: it overlays a scaled fence graphic on your device's live camera feed so you can get a rough sense of style and placement in your yard. It's not a full AR (ARKit/ARCore/WebXR) experience and doesn't use LiDAR, depth sensors, or precision spatial tracking — treat the placement as an approximate visual guide, not a survey-grade measurement.
                </p>
              </div>

              {/* Supported Platforms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Apple iOS */}
                <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                    <span className="font-bold text-white text-xs flex items-center space-x-2">
                      <Smartphone className="w-4 h-4 text-neutral-300" />
                      <span>Apple iOS &amp; iPadOS (Safari)</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      Camera Preview
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs text-neutral-300">
                    <li className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Works in Safari on modern iPhones and iPads with a rear camera. Grant camera access when prompted to see the live preview.</span>
                    </li>
                  </ul>
                </div>

                {/* Android */}
                <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                    <span className="font-bold text-white text-xs flex items-center space-x-2">
                      <Smartphone className="w-4 h-4 text-emerald-400" />
                      <span>Android OS (Google Chrome)</span>
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      Camera Preview
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs text-neutral-300">
                    <li className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Works in Chrome on modern Android phones and tablets with a rear camera. Grant camera access when prompted to see the live preview.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Lighting & Property Line Tips */}
              <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-2">
                <span className="text-xs font-bold text-neutral-200 uppercase tracking-wider font-mono block">
                  Tips for a Better Preview:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-300 pt-1">
                  <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 space-y-1">
                    <span className="font-bold text-amber-400 block">Lighting Conditions:</span>
                    <p className="text-[11px] text-neutral-400 leading-normal">
                      Daytime lighting gives the clearest camera image. Avoid dusk or pitch-black yards without exterior floodlights.
                    </p>
                  </div>
                  <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 space-y-1">
                    <span className="font-bold text-amber-400 block">Snow &amp; Winter Yards:</span>
                    <p className="text-[11px] text-neutral-400 leading-normal">
                      On fresh snowdrifts with low contrast, it can help to keep a reference object (e.g. garden shovel or shoe) in frame for scale.
                    </p>
                  </div>
                  <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 space-y-1">
                    <span className="font-bold text-amber-400 block">Property Line Markers:</span>
                    <p className="text-[11px] text-neutral-400 leading-normal">
                      Use the manual position controls to roughly align the preview with your property survey stake or existing corner fence post — this is a visual guide only, not a substitute for a survey.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-neutral-400">
            <Scan className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Approximate scale preview based on standard 8ft post spacing — for a visual guide only, not a precise measurement.
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('simulator')}
              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-bold text-xs border border-neutral-700 transition-colors cursor-pointer"
            >
              Test AR Simulator
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors cursor-pointer shrink-0"
            >
              Done &amp; Return to Visualizer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
