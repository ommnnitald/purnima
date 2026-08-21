import { HERO_IMAGE, EXPERTISE_INTERIORS_IMG, EXPERTISE_EXTERIORS_IMG, LEGACY_BEDROOM_IMG } from './content';

export interface FloorPlanHotspot {
  id: string;
  title: string;
  xPercent: number; // 0-100% position on plan image
  yPercent: number; // 0-100% position on plan image
  roomArea: string;
  renderUrl: string;
  description: string;
  keySpecs: string[];
}

export interface FloorPlanOption {
  id: string;
  title: string;
  subtitle: string;
  totalArea: string;
  planDiagramUrl: string;
  hotspots: FloorPlanHotspot[];
}

export interface LightingScene {
  id: string;
  title: string;
  roomType: string;
  dayImg: string;
  nightImg: string;
  dayDescription: string;
  nightDescription: string;
  fixturesUsed: string[];
}

export interface MilestoneStep {
  title: string;
  description: string;
  targetDay: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

export interface TrackableProject {
  code: string;
  clientName: string;
  city: string;
  propertyType: string;
  startDate: string;
  estimatedHandover: string;
  currentProgressPercent: number;
  currentPhaseName: string;
  milestones: MilestoneStep[];
}

export const FLOOR_PLANS_DATA: FloorPlanOption[] = [
  {
    id: '3bhk-apartment',
    title: '3/4 BHK Luxury Apartment',
    subtitle: 'Gomti Nagar, Lucknow & NCR Layout',
    totalArea: '1,850 Sq.Ft',
    planDiagramUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1000',
    hotspots: [
      {
        id: 'living-hall',
        title: 'Grand Living & Lounge Hall',
        xPercent: 35,
        yPercent: 40,
        roomArea: '450 Sq.Ft',
        renderUrl: HERO_IMAGE,
        description: 'Expansive open-plan living room with Italian Botticino marble flooring, concealed LED mood coves, and acoustic wall paneling.',
        keySpecs: ['Italian Botticino Marble', 'Concealed Magnetic Track Lights', 'Japandi Floating Media Console'],
      },
      {
        id: 'master-suite',
        title: 'Master Bedroom Sanctuary',
        xPercent: 70,
        yPercent: 30,
        roomArea: '280 Sq.Ft',
        renderUrl: LEGACY_BEDROOM_IMG,
        description: 'Serene retreat featuring terracolor acoustic headboard, integrated walk-in wardrobe, and dimmable warm ambient lighting.',
        keySpecs: ['BWP Marine Ply Wardrobes', 'Circadian Night Lighting', 'Belgian Linen Headboard'],
      },
      {
        id: 'gola-kitchen',
        title: 'Modular Gola Kitchen',
        xPercent: 25,
        yPercent: 75,
        roomArea: '180 Sq.Ft',
        renderUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000',
        description: 'Handleless Gola profile culinary zone with anti-fingerprint super-matte shutters and 20mm quartz countertop.',
        keySpecs: ['German Soft-Close Drawers', 'Turmeric-Proof Quartz Surface', 'Retractable Appliance Pantry'],
      },
    ],
  },
  {
    id: 'independent-villa',
    title: 'Independent Villa / Kothi',
    subtitle: 'Vikas Nagar Raebareli & Civil Lines Kanpur',
    totalArea: '3,200 Sq.Ft',
    planDiagramUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000',
    hotspots: [
      {
        id: 'exterior-facade',
        title: 'Weatherproof ACP Facade',
        xPercent: 50,
        yPercent: 20,
        roomArea: '800 Sq.Ft Elevation',
        renderUrl: EXPERTISE_EXTERIORS_IMG,
        description: 'Modern elevation engineering with Fundermax exterior HPL slats, powder-coated aluminum louvers, and dusk uplighting.',
        keySpecs: ['Fundermax HPL Paneling', 'IP67 Waterproof Spotlights', '15-Year Weather Guarantee'],
      },
      {
        id: 'royal-living',
        title: 'Double-Height Living Pavilion',
        xPercent: 45,
        yPercent: 60,
        roomArea: '650 Sq.Ft',
        renderUrl: EXPERTISE_INTERIORS_IMG,
        description: 'High-ceiling formal reception area with custom brass trims, fluted wall louvers, and indirect chandelier illumination.',
        keySpecs: ['Custom Fluted Wood Paneling', 'Double-Height Glass Elevation', 'Satin Brass Inlays'],
      },
    ],
  },
];

export const LIGHTING_SCENES: LightingScene[] = [
  {
    id: 'living-lounge',
    title: 'Living Room Lounge Ambiance',
    roomType: 'Living Hall',
    dayImg: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
    nightImg: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200',
    dayDescription: 'Abundant natural daylight highlighting wood grain textures, marble reflections, and airy spatial flow.',
    nightDescription: 'Warm 3000K indirect cove LED channels, magnetic track spotlights, and subtle under-cabinet ambient glow.',
    fixturesUsed: ['COB Concealed LED Strips (3000K)', 'Magnetic Low-Voltage Track Spotlights', 'Dimmable Cove Drivers'],
  },
  {
    id: 'master-bedroom-lumi',
    title: 'Master Sanctuary Ambiance',
    roomType: 'Bedroom',
    dayImg: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200',
    nightImg: LEGACY_BEDROOM_IMG,
    dayDescription: 'Soft morning light filtering through sheer Belgian curtains onto natural slate and terracotta accents.',
    nightDescription: 'Low-glare bedside pendant drop lights, warm headboard backlighting, and night-safe footwall lights.',
    fixturesUsed: ['Warm Terracotta Pendant Droppers', 'Anti-Glare Honeycomb Downlights', 'Footwall Motion Accent LEDs'],
  },
];

export const SAMPLE_PROJECT_CODES: Record<string, TrackableProject> = {
  'PS-849201': {
    code: 'PS-849201',
    clientName: 'Anand Srivastava',
    city: 'Gomti Nagar, Lucknow',
    propertyType: '4 BHK Penthouse Luxury Turnkey',
    startDate: '12 July 2026',
    estimatedHandover: '26 August 2026',
    currentProgressPercent: 75,
    currentPhaseName: 'Phase 3: Woodwork & Gola Profile Assembly',
    milestones: [
      {
        title: 'Phase 1: 2D Blueprint, Electrical & Civil Approval',
        description: 'Architectural layout signed off, site wall breaking & concealed conduit electrical lines completed.',
        targetDay: 'Day 8',
        status: 'completed',
      },
      {
        title: 'Phase 2: BWP 710 Marine Ply Carcass Fabrication',
        description: '100% boiling-water-proof ply carcasses factory-cut with precision CNC edge banding.',
        targetDay: 'Day 20',
        status: 'completed',
      },
      {
        title: 'Phase 3: Anti-Fingerprint Laminate & Gola Profile Assembly',
        description: 'Super-matte shutters, Gola channels, and Blum soft-close drawer hardware currently under installation.',
        targetDay: 'Day 34',
        status: 'in-progress',
      },
      {
        title: 'Phase 4: Director Quality Audit, Deep Clean & Handover',
        description: 'Director Sudhanshu Sonkar final site audit, 45-day warranty certification, and client key handover.',
        targetDay: 'Day 45',
        status: 'upcoming',
      },
    ],
  },
  'PS-392014': {
    code: 'PS-392014',
    clientName: 'Dr. Rajesh Verma',
    city: 'Vikas Nagar, Raebareli',
    propertyType: 'Independent Villa Facade & Interior',
    startDate: '01 July 2026',
    estimatedHandover: '15 August 2026',
    currentProgressPercent: 95,
    currentPhaseName: 'Phase 4: Deep Cleaning & Final Key Handover',
    milestones: [
      {
        title: 'Phase 1: Blueprint & Structural Civil Work',
        description: 'Civil wall modifications and exterior HPL metal framing installed.',
        targetDay: 'Day 10',
        status: 'completed',
      },
      {
        title: 'Phase 2: Interior Carcass & ACP Elevation',
        description: 'Weatherproof ACP cladding and interior wardrobe frames fitted.',
        targetDay: 'Day 25',
        status: 'completed',
      },
      {
        title: 'Phase 3: Quartzite Countertop & Lighting',
        description: 'Countertop cutouts and magnetic track lighting tested.',
        targetDay: 'Day 38',
        status: 'completed',
      },
      {
        title: 'Phase 4: Director Inspection & Final Key Handover',
        description: 'Final walkthrough with Purnima Sonkar and official handover certificate signed.',
        targetDay: 'Day 45',
        status: 'in-progress',
      },
    ],
  },
};
