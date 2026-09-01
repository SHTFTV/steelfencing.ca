import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  Ruler,
  Grid,
  Home,
  Waves,
  Car,
  TreePine,
  Shield,
  Plus,
  Trash2,
  RotateCw,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Compass,
  CheckCircle2,
  ArrowRight,
  Eye,
  Calculator,
  Layers,
  Sparkles,
  Info,
  Undo2,
  Redo2,
  Sliders,
  Check,
  Printer,
  MousePointer,
  PenTool,
  Move,
  CornerDownRight,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { FenceConfig, FenceStyleId, GateType, MaterialGradeId, SoilTypeId, PostMountType } from '../types';
import { FENCE_PRODUCTS, GATE_OPTIONS } from '../data/products';
import { MATERIAL_GRADES } from '../data/materialGrades';
import { SOIL_TYPES, getSoilType } from '../data/soilData';
import { getBulkTier } from '../data/bulkSavingsData';

export interface SiteFenceSegment {
  id: string;
  name: string;
  x1: number; // in feet relative to lot top-left (0,0)
  y1: number;
  x2: number;
  y2: number;
  heightFeet: number;
  styleId: FenceStyleId;
}

export interface SiteGate {
  id: string;
  name: string;
  type: GateType;
  widthFt: number;
  x: number; // center position in feet
  y: number;
  rotation: number; // 0, 90, 180, 270
  isMotorized: boolean;
}

export interface SiteObstacle {
  id: string;
  type: 'house' | 'garage' | 'driveway' | 'pool' | 'patio' | 'tree';
  label: string;
  x: number; // top-left x in feet
  y: number; // top-left y in feet
  widthFt: number;
  depthFt: number;
  rotation?: number;
}

interface SiteMapPlannerProps {
  config: FenceConfig;
  onChangeConfig: (newConfig: FenceConfig) => void;
  onOpenQuote: (customConfig?: FenceConfig) => void;
  onScrollToCalculator: () => void;
  onScrollToVisualizer: () => void;
}

// Preset Lot Templates
const PRESET_TEMPLATES = [
  {
    id: 'suburban-standard',
    name: 'Standard Suburban Lot (50\' × 110\')',
    badge: 'Most Common',
    description: 'Typical Canadian suburban residential lot with rear & side perimeter and front driveway setback.',
    lotWidthFt: 50,
    lotDepthFt: 110,
    obstacles: [
      { id: 'house-1', type: 'house' as const, label: 'Main Residence', x: 8, y: 25, widthFt: 34, depthFt: 42 },
      { id: 'driveway-1', type: 'driveway' as const, label: 'Paved Driveway', x: 28, y: 67, widthFt: 16, depthFt: 38 },
      { id: 'patio-1', type: 'patio' as const, label: 'Cedar/Stone Patio', x: 12, y: 12, widthFt: 26, depthFt: 13 },
      { id: 'tree-1', type: 'tree' as const, label: 'Mature Oak', x: 40, y: 8, widthFt: 6, depthFt: 6 },
    ],
    segments: [
      { id: 'seg-rear', name: 'Rear Property Line', x1: 2, y1: 2, x2: 48, y2: 2, heightFeet: 6, styleId: 'nordic-slat' as FenceStyleId },
      { id: 'seg-left', name: 'West Side Perimeter', x1: 2, y1: 2, x2: 2, y2: 45, heightFeet: 6, styleId: 'nordic-slat' as FenceStyleId },
      { id: 'seg-right', name: 'East Side Perimeter', x1: 48, y1: 2, x2: 48, y2: 45, heightFeet: 6, styleId: 'nordic-slat' as FenceStyleId },
      { id: 'seg-left-return', name: 'West House Return', x1: 2, y1: 45, x2: 8, y2: 45, heightFeet: 6, styleId: 'nordic-slat' as FenceStyleId },
      { id: 'seg-right-return', name: 'East House Return', x1: 42, y1: 45, x2: 48, y2: 45, heightFeet: 6, styleId: 'nordic-slat' as FenceStyleId },
    ],
    gates: [
      { id: 'gate-side', name: 'Side Walkway Gate', type: 'pedestrian-single' as GateType, widthFt: 4, x: 5, y: 45, rotation: 0, isMotorized: false },
    ],
  },
  {
    id: 'corner-lot',
    name: 'Corner Lot (70\' × 120\')',
    badge: 'Corner Flankage',
    description: 'Corner property with street flankage, extended visibility setbacks, and double vehicle access.',
    lotWidthFt: 70,
    lotDepthFt: 120,
    obstacles: [
      { id: 'house-c', type: 'house' as const, label: 'Main Residence', x: 14, y: 30, widthFt: 40, depthFt: 48 },
      { id: 'driveway-c', type: 'driveway' as const, label: 'Double Driveway', x: 16, y: 78, widthFt: 22, depthFt: 36 },
      { id: 'patio-c', type: 'patio' as const, label: 'Outdoor Living Area', x: 20, y: 14, widthFt: 28, depthFt: 16 },
    ],
    segments: [
      { id: 'seg-c-rear', name: 'Rear Lot Line', x1: 3, y1: 3, x2: 67, y2: 3, heightFeet: 6, styleId: 'corrugated-privacy' as FenceStyleId },
      { id: 'seg-c-left', name: 'Interior Boundary', x1: 3, y1: 3, x2: 3, y2: 55, heightFeet: 6, styleId: 'corrugated-privacy' as FenceStyleId },
      { id: 'seg-c-flankage', name: 'Street Flankage', x1: 67, y1: 3, x2: 67, y2: 60, heightFeet: 6, styleId: 'corrugated-privacy' as FenceStyleId },
      { id: 'seg-c-ret1', name: 'West Return', x1: 3, y1: 55, x2: 14, y2: 55, heightFeet: 6, styleId: 'corrugated-privacy' as FenceStyleId },
      { id: 'seg-c-ret2', name: 'Flankage Return', x1: 54, y1: 60, x2: 67, y2: 60, heightFeet: 6, styleId: 'corrugated-privacy' as FenceStyleId },
    ],
    gates: [
      { id: 'gate-c-ped', name: 'Pedestrian Side Access', type: 'pedestrian-single' as GateType, widthFt: 4, x: 8.5, y: 55, rotation: 0, isMotorized: false },
      { id: 'gate-c-dbl', name: 'Boat / Trailer Gate', type: 'double-driveway' as GateType, widthFt: 10, x: 60.5, y: 60, rotation: 0, isMotorized: false },
    ],
  },
  {
    id: 'pool-enclosure',
    name: 'Canadian Pool Enclosure (45\' × 80\')',
    badge: 'Bylaw Compliant',
    description: 'Dedicated 4-sided safety perimeter enclosure conforming to provincial pool safety bylaws.',
    lotWidthFt: 45,
    lotDepthFt: 80,
    obstacles: [
      { id: 'pool-p', type: 'pool' as const, label: 'Inground Swimming Pool (16x32\')', x: 14.5, y: 24, widthFt: 16, depthFt: 32 },
      { id: 'patio-p', type: 'patio' as const, label: 'Concrete Pool Deck', x: 6.5, y: 16, widthFt: 32, depthFt: 48 },
    ],
    segments: [
      { id: 'seg-p-top', name: 'North Pool Barrier', x1: 4, y1: 12, x2: 41, y2: 12, heightFeet: 5, styleId: 'highland-ornamental' as FenceStyleId },
      { id: 'seg-p-bottom', name: 'South Pool Barrier', x1: 4, y1: 68, x2: 41, y2: 68, heightFeet: 5, styleId: 'highland-ornamental' as FenceStyleId },
      { id: 'seg-p-left', name: 'West Pool Barrier', x1: 4, y1: 12, x2: 4, y2: 68, heightFeet: 5, styleId: 'highland-ornamental' as FenceStyleId },
      { id: 'seg-p-right', name: 'East Pool Barrier', x1: 41, y1: 12, x2: 41, y2: 68, heightFeet: 5, styleId: 'highland-ornamental' as FenceStyleId },
    ],
    gates: [
      { id: 'gate-p-mag', name: 'Self-Closing Latch Gate', type: 'pedestrian-single' as GateType, widthFt: 4, x: 22.5, y: 68, rotation: 0, isMotorized: false },
    ],
  },
  {
    id: 'commercial-compound',
    name: 'Commercial Facility / Yard (120\' × 160\')',
    badge: 'Industrial High-Sec',
    description: 'High-security heavy commercial perimeter with motorized cantilever gate and setbacks.',
    lotWidthFt: 120,
    lotDepthFt: 160,
    obstacles: [
      { id: 'bldg-com', type: 'house' as const, label: 'Distribution Warehouse', x: 20, y: 20, widthFt: 80, depthFt: 70 },
      { id: 'drive-com', type: 'driveway' as const, label: 'Transport Truck Staging Apron', x: 30, y: 95, widthFt: 60, depthFt: 60 },
    ],
    segments: [
      { id: 'seg-c-top', name: 'North Boundary', x1: 5, y1: 5, x2: 115, y2: 5, heightFeet: 8, styleId: 'fortis-industrial' as FenceStyleId },
      { id: 'seg-c-left', name: 'West Secure Line', x1: 5, y1: 5, x2: 5, y2: 155, heightFeet: 8, styleId: 'fortis-industrial' as FenceStyleId },
      { id: 'seg-c-right', name: 'East Secure Line', x1: 115, y1: 5, x2: 115, y2: 155, heightFeet: 8, styleId: 'fortis-industrial' as FenceStyleId },
      { id: 'seg-c-front-l', name: 'South Front Left', x1: 5, y1: 155, x2: 50, y2: 155, heightFeet: 8, styleId: 'fortis-industrial' as FenceStyleId },
      { id: 'seg-c-front-r', name: 'South Front Right', x1: 74, y1: 155, x2: 115, y2: 155, heightFeet: 8, styleId: 'fortis-industrial' as FenceStyleId },
    ],
    gates: [
      { id: 'gate-cantilever', name: 'Motorized Cantilever Slide Gate', type: 'cantilever-sliding' as GateType, widthFt: 24, x: 62, y: 155, rotation: 0, isMotorized: true },
    ],
  },
  {
    id: 'blank-canvas',
    name: 'Blank Slate Property (50\' × 100\')',
    badge: 'Custom Layout',
    description: 'Clear grid canvas ready for custom drawing from scratch with customizable lot width and depth.',
    lotWidthFt: 50,
    lotDepthFt: 100,
    obstacles: [
      { id: 'house-blank', type: 'house' as const, label: 'Main House Footprint', x: 10, y: 30, widthFt: 30, depthFt: 40 },
    ],
    segments: [],
    gates: [],
  },
];

export const SiteMapPlanner: React.FC<SiteMapPlannerProps> = ({
  config,
  onChangeConfig,
  onOpenQuote,
  onScrollToCalculator,
  onScrollToVisualizer,
}) => {
  // Lot Configuration State
  const [lotWidthFt, setLotWidthFt] = useState<number>(50);
  const [lotDepthFt, setLotDepthFt] = useState<number>(110);
  const [gridSnapFt, setGridSnapFt] = useState<number>(2.5); // Snap to 2.5 ft or 5 ft
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showDimensions, setShowDimensions] = useState<boolean>(true);
  const [showPosts, setShowPosts] = useState<boolean>(true);

  // Active Tool: 'select' | 'draw-fence' | 'add-gate' | 'add-house' | 'add-pool' | 'add-driveway' | 'add-patio' | 'add-tree'
  const [activeTool, setActiveTool] = useState<string>('select');

  // Interactive Elements
  const [segments, setSegments] = useState<SiteFenceSegment[]>(PRESET_TEMPLATES[0].segments);
  const [gates, setGates] = useState<SiteGate[]>(PRESET_TEMPLATES[0].gates);
  const [obstacles, setObstacles] = useState<SiteObstacle[]>(PRESET_TEMPLATES[0].obstacles);

  // Selection & Active Item
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [selectedElementType, setSelectedElementType] = useState<'segment' | 'gate' | 'obstacle' | null>(null);

  // Temporary Drawing State
  const [drawingStart, setDrawingStart] = useState<{ x: number; y: number } | null>(null);
  const [currentMousePos, setCurrentMousePos] = useState<{ x: number; y: number } | null>(null);

  // Canvas View Zoom & Pan
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('suburban-standard');
  const [historyStack, setHistoryStack] = useState<Array<{ segments: SiteFenceSegment[]; gates: SiteGate[]; obstacles: SiteObstacle[] }>>([]);
  const [showApplySuccess, setShowApplySuccess] = useState<boolean>(false);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // Drawing style defaults
  const [defaultFenceStyle, setDefaultFenceStyle] = useState<FenceStyleId>(config.style);
  const [defaultFenceHeight, setDefaultFenceHeight] = useState<number>(config.heightFeet);
  const [selectedSoilId, setSelectedSoilId] = useState<SoilTypeId>(config.soilType || 'standard-loam');
  const [selectedPostMount, setSelectedPostMount] = useState<PostMountType>(config.postMount || 'deep-frost-ground');

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Synchronize with external config changes
  useEffect(() => {
    setDefaultFenceStyle(config.style);
    setDefaultFenceHeight(config.heightFeet);
    if (config.soilType) setSelectedSoilId(config.soilType);
    if (config.postMount) setSelectedPostMount(config.postMount);
  }, [config.style, config.heightFeet, config.soilType, config.postMount]);

  // Snap coordinate to grid
  const snap = useCallback((val: number, step: number = gridSnapFt) => {
    return Math.round(val / step) * step;
  }, [gridSnapFt]);

  // Save history state for undo
  const pushHistory = useCallback(() => {
    setHistoryStack((prev) => [
      ...prev.slice(-15),
      {
        segments: JSON.parse(JSON.stringify(segments)),
        gates: JSON.parse(JSON.stringify(gates)),
        obstacles: JSON.parse(JSON.stringify(obstacles)),
      },
    ]);
  }, [segments, gates, obstacles]);

  // Undo action
  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const lastState = historyStack[historyStack.length - 1];
    setSegments(lastState.segments);
    setGates(lastState.gates);
    setObstacles(lastState.obstacles);
    setHistoryStack((prev) => prev.slice(0, -1));
    setSelectedElementId(null);
  };

  // Switch preset template
  const handleSelectTemplate = (templateId: string) => {
    const tmpl = PRESET_TEMPLATES.find((t) => t.id === templateId);
    if (!tmpl) return;
    pushHistory();
    setSelectedTemplateId(templateId);
    setLotWidthFt(tmpl.lotWidthFt);
    setLotDepthFt(tmpl.lotDepthFt);
    setSegments(JSON.parse(JSON.stringify(tmpl.segments)));
    setGates(JSON.parse(JSON.stringify(tmpl.gates)));
    setObstacles(JSON.parse(JSON.stringify(tmpl.obstacles)));
    setSelectedElementId(null);
  };

  // Convert screen mouse coordinates into feet within lot
  const getCanvasCoords = (e: React.MouseEvent<SVGSVGElement>): { x: number; y: number } => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const rawX = (clientX / rect.width) * lotWidthFt;
    const rawY = (clientY / rect.height) * lotDepthFt;
    return {
      x: Math.max(0, Math.min(lotWidthFt, snap(rawX))),
      y: Math.max(0, Math.min(lotDepthFt, snap(rawY))),
    };
  };

  // Mouse down / start interaction
  const handleSvgMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    const coords = getCanvasCoords(e);

    if (activeTool === 'draw-fence') {
      if (!drawingStart) {
        setDrawingStart(coords);
      } else {
        // Complete segment
        const dist = Math.hypot(coords.x - drawingStart.x, coords.y - drawingStart.y);
        if (dist >= 2) {
          pushHistory();
          const newSeg: SiteFenceSegment = {
            id: `seg-${Date.now()}`,
            name: `Fence Run ${segments.length + 1}`,
            x1: drawingStart.x,
            y1: drawingStart.y,
            x2: coords.x,
            y2: coords.y,
            heightFeet: defaultFenceHeight,
            styleId: defaultFenceStyle,
          };
          setSegments((prev) => [...prev, newSeg]);
          setSelectedElementId(newSeg.id);
          setSelectedElementType('segment');
        }
        setDrawingStart(null);
      }
    } else if (activeTool.startsWith('add-')) {
      pushHistory();
      if (activeTool === 'add-gate') {
        const newGate: SiteGate = {
          id: `gate-${Date.now()}`,
          name: `Gate ${gates.length + 1}`,
          type: 'pedestrian-single',
          widthFt: 4,
          x: coords.x,
          y: coords.y,
          rotation: 0,
          isMotorized: false,
        };
        setGates((prev) => [...prev, newGate]);
        setSelectedElementId(newGate.id);
        setSelectedElementType('gate');
        setActiveTool('select');
      } else {
        const obstacleType = activeTool.replace('add-', '') as SiteObstacle['type'];
        let width = 20;
        let depth = 20;
        let label = 'Structure';
        if (obstacleType === 'house') {
          width = 30;
          depth = 36;
          label = 'House / Building';
        } else if (obstacleType === 'garage') {
          width = 20;
          depth = 24;
          label = 'Detached Garage';
        } else if (obstacleType === 'driveway') {
          width = 16;
          depth = 30;
          label = 'Paved Driveway';
        } else if (obstacleType === 'pool') {
          width = 16;
          depth = 32;
          label = 'Swimming Pool';
        } else if (obstacleType === 'patio') {
          width = 20;
          depth = 14;
          label = 'Patio / Deck';
        } else if (obstacleType === 'tree') {
          width = 6;
          depth = 6;
          label = 'Tree / Landscaping';
        }

        const newObstacle: SiteObstacle = {
          id: `obs-${Date.now()}`,
          type: obstacleType,
          label,
          x: Math.max(0, Math.min(lotWidthFt - width, coords.x)),
          y: Math.max(0, Math.min(lotDepthFt - depth, coords.y)),
          widthFt: width,
          depthFt: depth,
        };
        setObstacles((prev) => [...prev, newObstacle]);
        setSelectedElementId(newObstacle.id);
        setSelectedElementType('obstacle');
        setActiveTool('select');
      }
    } else if (activeTool === 'select') {
      // Clicked on empty canvas background
      if ((e.target as HTMLElement).tagName === 'svg' || (e.target as HTMLElement).id === 'lot-background') {
        setSelectedElementId(null);
        setSelectedElementType(null);
      }
    }
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const coords = getCanvasCoords(e);
    setCurrentMousePos(coords);
  };

  // Calculations: Total linear footage, gate footage, posts, panels, costs
  const {
    grossLinearFeet,
    gateTotalFeet,
    netFenceFeet,
    panelsCount,
    bulkTier,
    bulkDiscountAmount,
    postSchedule,
    estimatedCostRange,
  } = useMemo(() => {
    // 1. Gross fence footage
    let grossFt = 0;
    segments.forEach((seg) => {
      const len = Math.hypot(seg.x2 - seg.x1, seg.y2 - seg.y1);
      grossFt += len;
    });

    // 2. Gate footage
    let gateFt = 0;
    gates.forEach((g) => {
      gateFt += g.widthFt;
    });

    // 3. Net fence footage (panels only)
    const netFt = Math.max(0, Math.round(grossFt - gateFt));
    const grossRounded = Math.round(grossFt);

    // 4. Panel count (standard 6ft or 8ft steel panel units)
    const panelWidthFt = 6; // Standard 6ft architectural width
    const calculatedPanels = Math.ceil(netFt / panelWidthFt);

    // 5. Post Calculation
    // Detect vertices to determine Corner Posts vs End Posts vs Line Posts
    const vertices: Array<{ x: number; y: number; count: number }> = [];
    const addVertex = (x: number, y: number) => {
      const existing = vertices.find((v) => Math.hypot(v.x - x, v.y - y) < 1.0);
      if (existing) {
        existing.count += 1;
      } else {
        vertices.push({ x, y, count: 1 });
      }
    };

    segments.forEach((seg) => {
      addVertex(seg.x1, seg.y1);
      addVertex(seg.x2, seg.y2);
    });

    let cornerPosts = 0;
    let endPosts = 0;
    vertices.forEach((v) => {
      if (v.count >= 2) {
        cornerPosts += 1;
      } else if (v.count === 1) {
        endPosts += 1;
      }
    });

    // Gate posts (2 heavy-gauge posts per gate)
    const gatePosts = gates.length * 2;

    // Line posts: intermediate posts along each run every 6-8 feet
    let linePosts = 0;
    segments.forEach((seg) => {
      const len = Math.hypot(seg.x2 - seg.x1, seg.y2 - seg.y1);
      if (len > panelWidthFt) {
        const intermediate = Math.floor(len / panelWidthFt) - 1;
        linePosts += Math.max(0, intermediate);
      }
    });

    const totalPosts = cornerPosts + endPosts + gatePosts + linePosts;

    // 6. Cost Estimation based on current product & options
    const currentProduct = FENCE_PRODUCTS.find((p) => p.id === (segments[0]?.styleId || config.style)) || FENCE_PRODUCTS[0];
    const gradeOption = MATERIAL_GRADES.find((g) => g.id === (config.materialGrade || 'standard')) || MATERIAL_GRADES[0];
    const basePerFoot = currentProduct.basePricePerFoot + (gradeOption?.perFootAddon || 0);

    // Materials subtotal
    const fenceMaterials = grossRounded * basePerFoot;

    // Foundation hardware addon per post based on postMount
    let postHardwareAddon = 0;
    if (selectedPostMount === 'helical-pile') {
      postHardwareAddon = 145; // Helical screw pile
    } else if (selectedPostMount === 'surface-baseplate') {
      postHardwareAddon = 45; // Concrete slab / bedrock flange
    }
    const foundationHardwareTotal = totalPosts * postHardwareAddon;

    // Gates subtotal
    let gatesTotalCost = 0;
    gates.forEach((g) => {
      const gateDef = GATE_OPTIONS.find((opt) => opt.id === g.type);
      const baseGatePrice = gateDef?.basePrice || 650;
      const automationCost = g.isMotorized ? 1850 : 0;
      gatesTotalCost += baseGatePrice + automationCost;
    });

    // Wholesale Bulk Volume Discount
    const bulkTier = getBulkTier(grossRounded);
    const rawMaterials = fenceMaterials;
    const bulkDiscountAmount = Math.round(rawMaterials * (bulkTier.discountPercent / 100));
    const netMaterials = Math.max(0, rawMaterials - bulkDiscountAmount);

    // Installation subtotal (if turnkey-pro)
    const installRatePerFoot = config.installationType === 'turnkey-pro' ? 38 : 0;
    const postExcavationRate = config.installationType === 'turnkey-pro' ? 45 : 0;
    const installTotal = grossRounded * installRatePerFoot + totalPosts * postExcavationRate + foundationHardwareTotal;

    const grandTotal = netMaterials + gatesTotalCost + installTotal;

    const activeSoil = getSoilType(selectedSoilId);

    return {
      grossLinearFeet: grossRounded,
      gateTotalFeet: gateFt,
      netFenceFeet: netFt,
      panelsCount: calculatedPanels,
      bulkTier,
      bulkDiscountAmount,
      postSchedule: {
        cornerPosts,
        endPosts,
        gatePosts,
        linePosts,
        totalPosts,
        soilName: activeSoil.name,
        postMountName: activeSoil.recommendedMountName,
        frostHeaveRisk: activeSoil.frostHeaveRisk,
      },
      estimatedCostRange: {
        rawMaterials: Math.round(rawMaterials),
        discount: Math.round(bulkDiscountAmount),
        materials: Math.round(netMaterials),
        gates: Math.round(gatesTotalCost),
        installation: Math.round(installTotal),
        foundationHardware: Math.round(foundationHardwareTotal),
        total: Math.round(grandTotal),
      },
    };
  }, [segments, gates, config.style, config.materialGrade, config.installationType, selectedSoilId, selectedPostMount]);

  // Apply Calculated Values to App State & Synchronize
  const handleApplyToApp = () => {
    if (grossLinearFeet <= 0) return;

    // Determine primary gate type
    const primaryGate = gates[0]?.type || 'none';
    const primaryGateWidth = gates[0]?.widthFt || 4;
    const hasAutomation = gates.some((g) => g.isMotorized);
    const primaryStyle = segments[0]?.styleId || config.style;
    const primaryHeight = segments[0]?.heightFeet || config.heightFeet;

    onChangeConfig({
      ...config,
      linearFeet: Math.max(20, Math.min(500, grossLinearFeet)),
      includeGate: primaryGate,
      gateWidthFeet: primaryGateWidth,
      gateAutomation: hasAutomation,
      style: primaryStyle,
      heightFeet: primaryHeight,
      soilType: selectedSoilId,
      postMount: selectedPostMount,
    });

    setShowApplySuccess(true);
    setTimeout(() => {
      setShowApplySuccess(false);
    }, 4000);
  };

  // Delete currently selected element
  const handleDeleteSelected = () => {
    if (!selectedElementId) return;
    pushHistory();
    if (selectedElementType === 'segment') {
      setSegments((prev) => prev.filter((s) => s.id !== selectedElementId));
    } else if (selectedElementType === 'gate') {
      setGates((prev) => prev.filter((g) => g.id !== selectedElementId));
    } else if (selectedElementType === 'obstacle') {
      setObstacles((prev) => prev.filter((o) => o.id !== selectedElementId));
    }
    setSelectedElementId(null);
    setSelectedElementType(null);
  };

  // Clear all segments & gates
  const handleClearAll = () => {
    pushHistory();
    setSegments([]);
    setGates([]);
    setSelectedElementId(null);
  };

  return (
    <section id="site-planner" className="py-20 bg-neutral-950 border-t border-neutral-800 text-neutral-100 relative overflow-hidden">
      
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400 mb-3">
              <Ruler className="w-3.5 h-3.5" />
              <span>Interactive Property CAD Site Planner</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-['Space_Grotesk']">
              Top-Down Property <span className="text-amber-400">Site Map</span> &amp; Layout
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Drag-and-drop your Canadian property footprint, draw perimeter runs, place gates, and calculate exact linear footage, post counts, and installation costs in real time.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex flex-wrap items-center gap-3 bg-neutral-900/90 border border-neutral-800 p-3 rounded-2xl shadow-xl shrink-0">
            <div className="px-3.5 py-1.5 bg-neutral-950 rounded-xl border border-neutral-800">
              <span className="text-[10px] text-neutral-400 block uppercase font-mono font-semibold">Total Perimeter</span>
              <span className="text-lg font-black text-amber-400 font-mono">{grossLinearFeet} LF</span>
            </div>
            <div className="px-3.5 py-1.5 bg-neutral-950 rounded-xl border border-neutral-800">
              <span className="text-[10px] text-neutral-400 block uppercase font-mono font-semibold">Total Posts</span>
              <span className="text-lg font-black text-white font-mono">{postSchedule.totalPosts} Posts</span>
            </div>
            {bulkDiscountAmount > 0 ? (
              <div className="px-3.5 py-1.5 bg-emerald-950/40 rounded-xl border border-emerald-500/40">
                <span className="text-[10px] text-emerald-400 block uppercase font-mono font-semibold">Bulk Rebate ({bulkTier.discountPercent}%)</span>
                <span className="text-lg font-black text-emerald-400 font-mono">-${bulkDiscountAmount.toLocaleString()}</span>
              </div>
            ) : null}
            <div className="px-3.5 py-1.5 bg-neutral-950 rounded-xl border border-neutral-800">
              <span className="text-[10px] text-neutral-400 block uppercase font-mono font-semibold">Estimated Total</span>
              <span className="text-lg font-black text-emerald-400 font-mono">${estimatedCostRange.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Preset Lot Templates Carousel */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Select Property Template or Start Blank:</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {PRESET_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => handleSelectTemplate(tmpl.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedTemplateId === tmpl.id
                    ? 'bg-neutral-900 border-amber-500 ring-1 ring-amber-500/50 shadow-lg'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-neutral-800 text-amber-400 border border-neutral-700">
                      {tmpl.badge}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {tmpl.lotWidthFt}&apos;×{tmpl.lotDepthFt}&apos;
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-xs font-['Space_Grotesk'] leading-tight">
                    {tmpl.name.split(' (')[0]}
                  </h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug line-clamp-2">
                    {tmpl.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[10px]">
                  <span className="text-neutral-400 font-mono">Load Template</span>
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main CAD Workspace Layout (Toolbars + Canvas + Inspector Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: Interactive Tool Palette (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Tool Selection */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-xl space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block border-b border-neutral-800 pb-2">
                1. Drawing Tools
              </span>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTool('select')}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                    activeTool === 'select'
                      ? 'bg-amber-500 text-neutral-950 shadow-md font-black'
                      : 'bg-neutral-950 text-neutral-300 border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <MousePointer className="w-4 h-4" />
                  <span>Select / Move</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTool('draw-fence')}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                    activeTool === 'draw-fence'
                      ? 'bg-amber-500 text-neutral-950 shadow-md font-black animate-pulse'
                      : 'bg-neutral-950 text-amber-400 border border-amber-500/40 hover:border-amber-500'
                  }`}
                >
                  <PenTool className="w-4 h-4" />
                  <span>Draw Fence</span>
                </button>
              </div>

              {activeTool === 'draw-fence' && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[11px] text-amber-300 leading-snug">
                  <strong>How to draw:</strong> Click on the canvas to set the start post, then click again to finish the fence run. Points automatically snap to the grid.
                </div>
              )}
            </div>

            {/* Drag-and-Drop / Placeable Elements */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-xl space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block border-b border-neutral-800 pb-2">
                2. Add Gates &amp; Property Structures
              </span>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveTool('add-gate')}
                  className={`w-full p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                    activeTool === 'add-gate'
                      ? 'bg-amber-500 text-neutral-950 font-black'
                      : 'bg-neutral-950 text-neutral-200 border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span>Place Gate Opening</span>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTool('add-house')}
                  className={`w-full p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                    activeTool === 'add-house'
                      ? 'bg-amber-500 text-neutral-950 font-black'
                      : 'bg-neutral-950 text-neutral-200 border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Home className="w-4 h-4 text-sky-400" />
                    <span>House / Main Residence</span>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTool('add-pool')}
                  className={`w-full p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                    activeTool === 'add-pool'
                      ? 'bg-amber-500 text-neutral-950 font-black'
                      : 'bg-neutral-950 text-neutral-200 border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Waves className="w-4 h-4 text-cyan-400" />
                    <span>Swimming Pool</span>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTool('add-driveway')}
                  className={`w-full p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                    activeTool === 'add-driveway'
                      ? 'bg-amber-500 text-neutral-950 font-black'
                      : 'bg-neutral-950 text-neutral-200 border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Car className="w-4 h-4 text-neutral-400" />
                    <span>Driveway / Concrete Apron</span>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTool('add-tree')}
                  className={`w-full p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                    activeTool === 'add-tree'
                      ? 'bg-amber-500 text-neutral-950 font-black'
                      : 'bg-neutral-950 text-neutral-200 border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <TreePine className="w-4 h-4 text-emerald-400" />
                    <span>Tree / Obstacle</span>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-neutral-400" />
                </button>
              </div>
            </div>

            {/* Lot Dimensions Configuration */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-xl space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block border-b border-neutral-800 pb-2">
                3. Lot Dimensions (Feet)
              </span>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[11px] text-neutral-400 font-medium block mb-1">Lot Width</label>
                  <div className="flex items-center space-x-1 bg-neutral-950 border border-neutral-800 rounded-xl px-2.5 py-1.5">
                    <input
                      type="number"
                      min={20}
                      max={300}
                      step={5}
                      value={lotWidthFt}
                      onChange={(e) => setLotWidthFt(Number(e.target.value) || 50)}
                      className="w-full bg-transparent text-white font-mono font-bold text-xs focus:outline-none"
                    />
                    <span className="text-neutral-500 font-mono text-[10px]">FT</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 font-medium block mb-1">Lot Depth</label>
                  <div className="flex items-center space-x-1 bg-neutral-950 border border-neutral-800 rounded-xl px-2.5 py-1.5">
                    <input
                      type="number"
                      min={30}
                      max={400}
                      step={5}
                      value={lotDepthFt}
                      onChange={(e) => setLotDepthFt(Number(e.target.value) || 100)}
                      className="w-full bg-transparent text-white font-mono font-bold text-xs focus:outline-none"
                    />
                    <span className="text-neutral-500 font-mono text-[10px]">FT</span>
                  </div>
                </div>
              </div>

              {/* Grid Snap Selector */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1.5">
                  <span>Grid Snap Increment:</span>
                  <span className="font-mono font-bold text-amber-400">{gridSnapFt} FT</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[1, 2.5, 5].map((snapVal) => (
                    <button
                      key={snapVal}
                      type="button"
                      onClick={() => setGridSnapFt(snapVal)}
                      className={`py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                        gridSnapFt === snapVal
                          ? 'bg-amber-500 text-neutral-950'
                          : 'bg-neutral-950 text-neutral-400 border border-neutral-800 hover:text-white'
                      }`}
                    >
                      {snapVal} ft
                    </button>
                  ))}
                </div>
              </div>

              {/* Canvas Display Toggles */}
              <div className="pt-2 border-t border-neutral-800/80 space-y-1.5 text-[11px]">
                <label className="flex items-center justify-between cursor-pointer text-neutral-300">
                  <span>Show Dimension Labels</span>
                  <input
                    type="checkbox"
                    checked={showDimensions}
                    onChange={(e) => setShowDimensions(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer text-neutral-300">
                  <span>Show Post Markers</span>
                  <input
                    type="checkbox"
                    checked={showPosts}
                    onChange={(e) => setShowPosts(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                </label>
              </div>

            </div>

            {/* 4. Soil Type & Foundation Requirement Selector */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block">
                  4. Soil Type &amp; Post Mount
                </span>
                <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                  Dynamic Spec
                </span>
              </div>

              <div>
                <label className="text-[11px] text-neutral-400 font-medium block mb-1">
                  Property Soil Condition:
                </label>
                <select
                  value={selectedSoilId}
                  onChange={(e) => {
                    const soilId = e.target.value as SoilTypeId;
                    setSelectedSoilId(soilId);
                    const targetSoil = getSoilType(soilId);
                    setSelectedPostMount(targetSoil.recommendedPostMount);
                    if (onChangeConfig) {
                      onChangeConfig({
                        ...config,
                        soilType: soilId,
                        postMount: targetSoil.recommendedPostMount,
                      });
                    }
                  }}
                  className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-2.5 py-2 text-xs font-semibold focus:outline-none focus:border-amber-500"
                >
                  {SOIL_TYPES.map((soil) => (
                    <option key={soil.id} value={soil.id}>
                      {soil.shortName} ({soil.frostHeaveRisk} Heave)
                    </option>
                  ))}
                </select>
              </div>

              {/* Dynamic Post Mount Badge Callout */}
              {(() => {
                const currentSoil = getSoilType(selectedSoilId);
                return (
                  <div className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Recommended Mount:</span>
                      <span className="font-bold text-amber-400 font-mono">
                        {currentSoil.recommendedMountName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-neutral-500">Heave Risk:</span>
                      <span className={`font-bold ${
                        currentSoil.frostHeaveRisk === 'Severe' ? 'text-red-400' :
                        currentSoil.frostHeaveRisk === 'High' ? 'text-amber-400' :
                        currentSoil.frostHeaveRisk === 'Moderate' ? 'text-yellow-400' :
                        'text-emerald-400'
                      }`}>
                        {currentSoil.frostHeaveRisk}
                      </span>
                    </div>
                    <div className="text-[10px] text-neutral-400 border-t border-neutral-800 pt-1 leading-tight">
                      {currentSoil.tagline}
                    </div>
                  </div>
                );
              })()}
            </div>

          </div>

          {/* CENTER: Top-Down Interactive SVG Canvas (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Top Toolbar (Undo, Clear, Zoom) */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-3 flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={historyStack.length === 0}
                  className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title="Undo last change"
                >
                  <Undo2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleClearAll}
                  className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-red-400 hover:text-red-300 hover:border-red-500/40 transition-colors cursor-pointer"
                  title="Clear all fence segments and gates"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Center status prompt */}
              <div className="text-xs font-mono text-neutral-400 hidden sm:block">
                {activeTool === 'draw-fence' ? (
                  <span className="text-amber-400 font-bold flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                    <span>Drawing Mode: Click start &amp; end points</span>
                  </span>
                ) : (
                  <span>Scale: 1 square = {gridSnapFt} × {gridSnapFt} ft</span>
                )}
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center space-x-1.5 bg-neutral-950 border border-neutral-800 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setZoomScale((z) => Math.max(0.7, z - 0.15))}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono font-bold text-neutral-300 px-1">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomScale((z) => Math.min(1.6, z + 0.15))}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomScale(1)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
                  title="Reset Zoom"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* SVG Canvas Container */}
            <div className="bg-neutral-950 border-2 border-neutral-800 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden select-none">
              
              {/* North Arrow Compass Badge */}
              <div className="absolute top-6 right-6 z-20 bg-neutral-900/90 border border-neutral-800/80 rounded-2xl p-2.5 shadow-lg flex flex-col items-center pointer-events-none">
                <Compass className="w-5 h-5 text-amber-400 animate-spin-slow" />
                <span className="text-[9px] font-mono font-black text-amber-400 mt-0.5">N</span>
              </div>

              {/* Blueprint Grid Canvas */}
              <div
                className="w-full flex items-center justify-center overflow-auto"
                style={{ minHeight: '440px' }}
              >
                <svg
                  ref={svgRef}
                  viewBox={`0 0 ${lotWidthFt} ${lotDepthFt}`}
                  className="w-full max-w-full h-auto cursor-crosshair drop-shadow-2xl transition-transform duration-150"
                  style={{
                    maxHeight: '620px',
                    transform: `scale(${zoomScale})`,
                    transformOrigin: 'center center',
                  }}
                  onMouseDown={handleSvgMouseDown}
                  onMouseMove={handleSvgMouseMove}
                >
                  {/* Defs for Patterns & Grids */}
                  <defs>
                    <pattern
                      id="cad-grid"
                      width={gridSnapFt}
                      height={gridSnapFt}
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d={`M ${gridSnapFt} 0 L 0 0 0 ${gridSnapFt}`}
                        fill="none"
                        stroke="#262626"
                        strokeWidth="0.1"
                      />
                    </pattern>

                    <pattern
                      id="grass-texture"
                      width="10"
                      height="10"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect width="10" height="10" fill="#0d140e" />
                      <circle cx="2" cy="2" r="0.4" fill="#142617" />
                      <circle cx="7" cy="7" r="0.4" fill="#142617" />
                    </pattern>

                    <pattern
                      id="deck-planks"
                      width="2"
                      height="10"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect width="2" height="10" fill="#2a1f18" />
                      <line x1="0" y1="0" x2="2" y2="0" stroke="#3b2b22" strokeWidth="0.2" />
                    </pattern>

                    {/* Laser Art Custom Pattern */}
                    <pattern id="pool-water" width="4" height="4" patternUnits="userSpaceOnUse">
                      <rect width="4" height="4" fill="#0c4a6e" />
                      <path d="M 0 2 Q 2 0 4 2" fill="none" stroke="#38bdf8" strokeWidth="0.2" opacity="0.6" />
                    </pattern>
                  </defs>

                  {/* 1. Property Boundary & Lawn Canvas */}
                  <rect
                    id="lot-background"
                    x="0"
                    y="0"
                    width={lotWidthFt}
                    height={lotDepthFt}
                    fill="url(#grass-texture)"
                    stroke="#525252"
                    strokeWidth="0.5"
                    strokeDasharray="2,2"
                  />

                  {/* 2. Grid Overlay */}
                  {showGrid && (
                    <rect
                      x="0"
                      y="0"
                      width={lotWidthFt}
                      height={lotDepthFt}
                      fill="url(#cad-grid)"
                      pointerEvents="none"
                    />
                  )}

                  {/* 3. Render Obstacles & Footprints */}
                  {obstacles.map((obs) => {
                    const isSelected = selectedElementId === obs.id;
                    let fill = '#1e293b';
                    let stroke = '#475569';

                    if (obs.type === 'house') {
                      fill = '#18181b';
                      stroke = '#71717a';
                    } else if (obs.type === 'garage') {
                      fill = '#27272a';
                      stroke = '#52525b';
                    } else if (obs.type === 'driveway') {
                      fill = '#3f3f46';
                      stroke = '#71717a';
                    } else if (obs.type === 'pool') {
                      fill = 'url(#pool-water)';
                      stroke = '#0ea5e9';
                    } else if (obs.type === 'patio') {
                      fill = 'url(#deck-planks)';
                      stroke = '#78350f';
                    } else if (obs.type === 'tree') {
                      fill = '#064e3b';
                      stroke = '#10b981';
                    }

                    return (
                      <g
                        key={obs.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedElementId(obs.id);
                          setSelectedElementType('obstacle');
                        }}
                        className="cursor-pointer group"
                      >
                        {obs.type === 'tree' ? (
                          <circle
                            cx={obs.x + obs.widthFt / 2}
                            cy={obs.y + obs.depthFt / 2}
                            r={obs.widthFt / 2}
                            fill={fill}
                            stroke={isSelected ? '#f59e0b' : stroke}
                            strokeWidth={isSelected ? '0.6' : '0.3'}
                          />
                        ) : (
                          <rect
                            x={obs.x}
                            y={obs.y}
                            width={obs.widthFt}
                            height={obs.depthFt}
                            fill={fill}
                            stroke={isSelected ? '#f59e0b' : stroke}
                            strokeWidth={isSelected ? '0.6' : '0.3'}
                            rx="0.5"
                          />
                        )}

                        {/* Label */}
                        <text
                          x={obs.x + obs.widthFt / 2}
                          y={obs.y + obs.depthFt / 2}
                          fill="#ffffff"
                          fontSize={Math.max(1.6, Math.min(3, obs.widthFt / 10))}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontWeight="bold"
                          pointerEvents="none"
                        >
                          {obs.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* 4. Render Fence Segments */}
                  {segments.map((seg) => {
                    const isSelected = selectedElementId === seg.id;
                    const len = Math.hypot(seg.x2 - seg.x1, seg.y2 - seg.y1);
                    const midX = (seg.x1 + seg.x2) / 2;
                    const midY = (seg.y1 + seg.y2) / 2;

                    return (
                      <g
                        key={seg.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedElementId(seg.id);
                          setSelectedElementType('segment');
                        }}
                        className="cursor-pointer group"
                      >
                        {/* Hover Hit Target (invisible thick stroke) */}
                        <line
                          x1={seg.x1}
                          y1={seg.y1}
                          x2={seg.x2}
                          y2={seg.y2}
                          stroke="transparent"
                          strokeWidth="3"
                        />

                        {/* Actual Steel Fence Line */}
                        <line
                          x1={seg.x1}
                          y1={seg.y1}
                          x2={seg.x2}
                          y2={seg.y2}
                          stroke={isSelected ? '#f59e0b' : '#eab308'}
                          strokeWidth={isSelected ? '1.2' : '0.8'}
                          strokeLinecap="round"
                        />

                        {/* Dimension Badge Label */}
                        {showDimensions && (
                          <g pointerEvents="none">
                            <rect
                              x={midX - 3.2}
                              y={midY - 1.2}
                              width="6.4"
                              height="2.4"
                              fill="#09090b"
                              stroke={isSelected ? '#f59e0b' : '#3f3f46'}
                              strokeWidth="0.2"
                              rx="0.4"
                            />
                            <text
                              x={midX}
                              y={midY}
                              fill="#ffffff"
                              fontSize="1.3"
                              fontWeight="bold"
                              fontFamily="monospace"
                              textAnchor="middle"
                              dominantBaseline="central"
                            >
                              {Math.round(len)} LF
                            </text>
                          </g>
                        )}

                        {/* Structural Post Markers */}
                        {showPosts && (
                          <>
                            {/* Start Post */}
                            <rect
                              x={seg.x1 - 0.5}
                              y={seg.y1 - 0.5}
                              width="1"
                              height="1"
                              fill="#f59e0b"
                              stroke="#000000"
                              strokeWidth="0.2"
                              rx="0.2"
                            />
                            {/* End Post */}
                            <rect
                              x={seg.x2 - 0.5}
                              y={seg.y2 - 0.5}
                              width="1"
                              height="1"
                              fill="#f59e0b"
                              stroke="#000000"
                              strokeWidth="0.2"
                              rx="0.2"
                            />
                          </>
                        )}
                      </g>
                    );
                  })}

                  {/* 5. Render Gates */}
                  {gates.map((gate) => {
                    const isSelected = selectedElementId === gate.id;
                    const halfW = gate.widthFt / 2;

                    return (
                      <g
                        key={gate.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedElementId(gate.id);
                          setSelectedElementType('gate');
                        }}
                        className="cursor-pointer"
                      >
                        {/* Gate Opening Gap Cutout */}
                        <circle
                          cx={gate.x}
                          cy={gate.y}
                          r={halfW + 0.5}
                          fill="#09090b"
                          opacity="0.8"
                        />

                        {/* Heavy Gate Posts (Flanking) */}
                        <rect
                          x={gate.x - halfW - 0.6}
                          y={gate.y - 0.6}
                          width="1.2"
                          height="1.2"
                          fill="#38bdf8"
                          stroke="#ffffff"
                          strokeWidth="0.2"
                          rx="0.2"
                        />
                        <rect
                          x={gate.x + halfW - 0.6}
                          y={gate.y - 0.6}
                          width="1.2"
                          height="1.2"
                          fill="#38bdf8"
                          stroke="#ffffff"
                          strokeWidth="0.2"
                          rx="0.2"
                        />

                        {/* Gate Leaf Bar */}
                        <line
                          x1={gate.x - halfW}
                          y1={gate.y}
                          x2={gate.x + halfW}
                          y2={gate.y}
                          stroke={isSelected ? '#38bdf8' : '#0284c7'}
                          strokeWidth="1.2"
                          strokeDasharray={gate.isMotorized ? '0.6,0.6' : 'none'}
                        />

                        {/* Gate Swing Arc Indicator */}
                        <path
                          d={`M ${gate.x - halfW} ${gate.y} A ${halfW} ${halfW} 0 0 1 ${gate.x} ${gate.y - halfW}`}
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="0.3"
                          strokeDasharray="0.5,0.5"
                          opacity="0.7"
                        />

                        {/* Gate Label */}
                        <text
                          x={gate.x}
                          y={gate.y + 2.2}
                          fill="#38bdf8"
                          fontSize="1.2"
                          fontFamily="monospace"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {gate.widthFt}&apos; Gate {gate.isMotorized ? '⚡' : ''}
                        </text>
                      </g>
                    );
                  })}

                  {/* 6. Active Drawing Rubber-band Preview Line */}
                  {drawingStart && currentMousePos && (
                    <g pointerEvents="none">
                      <line
                        x1={drawingStart.x}
                        y1={drawingStart.y}
                        x2={currentMousePos.x}
                        y2={currentMousePos.y}
                        stroke="#f59e0b"
                        strokeWidth="0.8"
                        strokeDasharray="1,1"
                      />
                      <circle cx={drawingStart.x} cy={drawingStart.y} r="0.6" fill="#f59e0b" />
                      <circle cx={currentMousePos.x} cy={currentMousePos.y} r="0.6" fill="#f59e0b" />
                      <text
                        x={(drawingStart.x + currentMousePos.x) / 2}
                        y={(drawingStart.y + currentMousePos.y) / 2 - 1}
                        fill="#f59e0b"
                        fontSize="1.4"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {Math.round(Math.hypot(currentMousePos.x - drawingStart.x, currentMousePos.y - drawingStart.y))} FT
                      </text>
                    </g>
                  )}

                  {/* Scale Bar Legend (Bottom Left) */}
                  <g transform={`translate(2, ${lotDepthFt - 4})`} pointerEvents="none">
                    <rect x="0" y="0" width="10" height="0.6" fill="#ffffff" />
                    <text x="5" y="-1" fill="#ffffff" fontSize="1.2" fontFamily="monospace" textAnchor="middle">
                      10 FT Scale
                    </text>
                  </g>
                </svg>
              </div>

              {/* Drawing hints */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-400 font-mono border-t border-neutral-900 pt-3">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>Steel Fence Line</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                    <span>Gate Opening</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-neutral-600"></span>
                    <span>Building Footprint</span>
                  </span>
                </div>
                <span>Click any element on the map to modify or delete</span>
              </div>

            </div>

          </div>

          {/* RIGHT: Live Bill of Materials, Post Schedule & Sync Actions (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Inspector / Selected Element Modifier */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-xl space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block border-b border-neutral-800 pb-2">
                4. Selected Element Inspector
              </span>

              {selectedElementId ? (
                <div className="space-y-3 text-xs">
                  {selectedElementType === 'segment' && (() => {
                    const seg = segments.find((s) => s.id === selectedElementId);
                    if (!seg) return null;
                    const len = Math.round(Math.hypot(seg.x2 - seg.x1, seg.y2 - seg.y1));
                    return (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{seg.name}</span>
                          <span className="font-mono font-bold text-amber-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                            {len} Linear Feet
                          </span>
                        </div>

                        <div>
                          <label className="text-[10px] text-neutral-400 block mb-1">Height (Feet)</label>
                          <div className="grid grid-cols-4 gap-1">
                            {[4, 5, 6, 8].map((h) => (
                              <button
                                key={h}
                                type="button"
                                onClick={() => {
                                  pushHistory();
                                  setSegments((prev) =>
                                    prev.map((s) => (s.id === selectedElementId ? { ...s, heightFeet: h } : s))
                                  );
                                }}
                                className={`py-1 rounded text-xs font-mono font-bold ${
                                  seg.heightFeet === h
                                    ? 'bg-amber-500 text-neutral-950'
                                    : 'bg-neutral-950 text-neutral-400 border border-neutral-800 hover:text-white'
                                }`}
                              >
                                {h}&apos;
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] text-neutral-400 block mb-1">Fence Profile Style</label>
                          <select
                            value={seg.styleId}
                            onChange={(e) => {
                              pushHistory();
                              const newStyle = e.target.value as FenceStyleId;
                              setSegments((prev) =>
                                prev.map((s) => (s.id === selectedElementId ? { ...s, styleId: newStyle } : s))
                              );
                            }}
                            className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 rounded-xl px-2.5 py-1.5 text-xs font-medium focus:outline-none"
                          >
                            {FENCE_PRODUCTS.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={handleDeleteSelected}
                          className="w-full py-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/40 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1 cursor-pointer mt-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Fence Run</span>
                        </button>
                      </div>
                    );
                  })()}

                  {selectedElementType === 'gate' && (() => {
                    const gate = gates.find((g) => g.id === selectedElementId);
                    if (!gate) return null;
                    return (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{gate.name}</span>
                          <span className="font-mono font-bold text-sky-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                            {gate.widthFt}&apos; Width
                          </span>
                        </div>

                        <div>
                          <label className="text-[10px] text-neutral-400 block mb-1">Gate Style</label>
                          <select
                            value={gate.type}
                            onChange={(e) => {
                              pushHistory();
                              const newType = e.target.value as GateType;
                              setGates((prev) =>
                                prev.map((g) => (g.id === selectedElementId ? { ...g, type: newType } : g))
                              );
                            }}
                            className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 rounded-xl px-2.5 py-1.5 text-xs font-medium focus:outline-none"
                          >
                            {GATE_OPTIONS.map((opt) => (
                              <option key={opt.id} value={opt.id}>
                                {opt.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] text-neutral-400 block mb-1">Gate Width (Feet)</label>
                          <div className="grid grid-cols-4 gap-1">
                            {[3, 4, 10, 16].map((w) => (
                              <button
                                key={w}
                                type="button"
                                onClick={() => {
                                  pushHistory();
                                  setGates((prev) =>
                                    prev.map((g) => (g.id === selectedElementId ? { ...g, widthFt: w } : g))
                                  );
                                }}
                                className={`py-1 rounded text-xs font-mono font-bold ${
                                  gate.widthFt === w
                                    ? 'bg-sky-500 text-neutral-950'
                                    : 'bg-neutral-950 text-neutral-400 border border-neutral-800 hover:text-white'
                                }`}
                              >
                                {w}&apos;
                              </button>
                            ))}
                          </div>
                        </div>

                        <label className="flex items-center justify-between text-[11px] text-neutral-300 pt-1 cursor-pointer">
                          <span>Electric Motorization</span>
                          <input
                            type="checkbox"
                            checked={gate.isMotorized}
                            onChange={(e) => {
                              pushHistory();
                              setGates((prev) =>
                                prev.map((g) =>
                                  g.id === selectedElementId ? { ...g, isMotorized: e.target.checked } : g
                                )
                              );
                            }}
                            className="accent-amber-500 rounded"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={handleDeleteSelected}
                          className="w-full py-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/40 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1 cursor-pointer mt-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Gate</span>
                        </button>
                      </div>
                    );
                  })()}

                  {selectedElementType === 'obstacle' && (() => {
                    const obs = obstacles.find((o) => o.id === selectedElementId);
                    if (!obs) return null;
                    return (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{obs.label}</span>
                          <span className="font-mono text-neutral-400 text-[10px]">
                            {obs.widthFt}&apos; × {obs.depthFt}&apos;
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={handleDeleteSelected}
                          className="w-full py-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/40 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove Structure</span>
                        </button>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="text-xs text-neutral-400 py-3 text-center leading-snug">
                  Click any fence line, gate, or structure on the map to view specifications and adjust height or style.
                </div>
              )}
            </div>

            {/* Itemized Material & Post Schedule */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-xl space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block border-b border-neutral-800 pb-2">
                5. Auto-Calculated Site Schedule
              </span>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-400">Total Perimeter:</span>
                  <span className="font-bold text-amber-400">{grossLinearFeet} Linear Feet</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-400">Gate Openings:</span>
                  <span className="font-bold text-sky-400">{gateTotalFeet} FT ({gates.length} Gate{gates.length !== 1 ? 's' : ''})</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-400">Net Steel Panels (6&apos;):</span>
                  <span className="font-bold text-white">{panelsCount} Panel Units</span>
                </div>

                <div className="pt-2 border-t border-neutral-800 space-y-1 text-[11px]">
                  <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider flex items-center justify-between">
                    <span>Post &amp; Foundation Engineering:</span>
                    <span className="text-amber-400 font-bold">{postSchedule.frostHeaveRisk} Heave</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>• Soil Profile:</span>
                    <span className="text-neutral-200 font-bold">{postSchedule.soilName}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>• Foundation Mount:</span>
                    <span className="text-amber-400 font-bold">{postSchedule.postMountName}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>• Total Posts Count:</span>
                    <span className="text-white font-bold">{postSchedule.totalPosts} ({postSchedule.cornerPosts}C / {postSchedule.gatePosts}G / {postSchedule.linePosts}L)</span>
                  </div>
                  {estimatedCostRange.foundationHardware > 0 && (
                    <div className="flex justify-between text-neutral-400">
                      <span>• Foundation Hardware:</span>
                      <span className="text-sky-400 font-bold">+${estimatedCostRange.foundationHardware} CAD</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-neutral-800 flex justify-between text-sm">
                  <span className="font-sans font-bold text-white">Estimated Turnkey:</span>
                  <span className="font-bold text-emerald-400">${estimatedCostRange.total.toLocaleString()} CAD</span>
                </div>
              </div>
            </div>

            {/* Sync / Apply Buttons */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleApplyToApp}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black rounded-2xl text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer group"
              >
                <Calculator className="w-4 h-4" />
                <span>Apply Layout to Cost Calculator</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {showApplySuccess && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center space-x-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Applied {grossLinearFeet} LF &amp; {gates.length} gate(s) to pricing calculator!</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleApplyToApp();
                    onScrollToVisualizer();
                  }}
                  className="py-2.5 bg-neutral-900 hover:bg-neutral-850 text-white border border-neutral-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>View in 3D</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleApplyToApp();
                    onOpenQuote({
                      ...config,
                      linearFeet: Math.max(20, grossLinearFeet),
                      includeGate: gates[0]?.type || 'none',
                      gateWidthFeet: gates[0]?.widthFt || 4,
                    });
                  }}
                  className="py-2.5 bg-neutral-900 hover:bg-neutral-850 text-amber-400 border border-amber-500/40 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Get Quote</span>
                </button>
              </div>

              {/* Print / Blueprint Export */}
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full py-2 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 rounded-xl text-[11px] font-mono transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print CAD Property Blueprint Plan</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
