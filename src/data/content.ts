import { PortfolioProject, DesignService } from '../types';

export const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600';

export const EXPERTISE_INTERIORS_IMG =
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200';

export const EXPERTISE_EXTERIORS_IMG =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200';

export const LEGACY_BEDROOM_IMG =
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200';

export const CONSULTATION_BG_IMG =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600';

export const SERVICES_DATA: DesignService[] = [
  {
    id: 'modular-kitchens',
    title: 'Modular Kitchens',
    category: 'Modular',
    tags: ['Modular', 'Custom'],
    description:
      'State-of-the-art culinary spaces featuring Anti-fingerprint Super-Matte Finishes and sleek Gola Profiles, specifically tailored for the maintenance-free needs of Tier 2 city homeowners.',
    features: ['Anti-fingerprint Finishes', 'Gola Profiles', 'Maintenance-Free Design'],
    imageUrl:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000',
    ctaText: 'Explore Modular',
    targetTab: 'modular',
    offsetMargin: false,
  },
  {
    id: 'living-spaces',
    title: 'Living Space Interiors',
    category: 'Interiors',
    tags: ['Interiors', 'Living Spaces'],
    description:
      'Transform your living areas with a focus on "Quiet Luxury" and "Japandi Minimalism", fusing local comfort with global style for a truly serene environment.',
    features: ['Quiet Luxury Aesthetic', 'Japandi Minimalism', 'Global Style, Local Comfort'],
    imageUrl:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000',
    ctaText: 'Explore Interiors',
    targetTab: 'interiors',
    offsetMargin: true,
  },
  {
    id: 'bedroom-sanctuaries',
    title: 'Bedroom Sanctuaries',
    category: 'Interiors',
    tags: ['Interiors', 'Bedrooms'],
    description:
      'Create personal havens embracing "Quiet Luxury" and "Japandi Minimalism", ensuring restful nights in beautifully curated spaces that reflect elevated comfort.',
    features: ['Serene Ambiance', 'Custom Furnishings', 'Tailored Lighting'],
    imageUrl:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1000',
    ctaText: 'Explore Bedrooms',
    targetTab: 'interiors',
    offsetMargin: false,
  },
  {
    id: 'facade-renovation',
    title: 'Modern Facade & Renovation',
    category: 'Exteriors',
    tags: ['Exteriors', 'Renovation'],
    description:
      'Transformative renovation and Modern Facade Engineering using premium ACP/HPL cladding. We blend structural improvements with the latest local exterior trends.',
    features: ['Modern Facade Engineering', 'ACP/HPL Cladding', 'Complete Transformation'],
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
    ctaText: 'Explore Exteriors',
    targetTab: 'exteriors',
    offsetMargin: true,
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'lucknow-penthouse',
    title: 'Lucknow Penthouse Transformation',
    category: 'living',
    tags: ['Living', 'Modern Minimalist'],
    description:
      'Modern 4 BHK Penthouse interior showing expansive windows, minimalist luxury furniture, and a sophisticated neutral color palette with subtle texture.',
    promise: 'Crafting your legacy with our promised 45-Day Delivery.',
    imageUrl:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000',
    aspectRatioClass: 'aspect-[4/5]',
    location: 'Gomti Nagar, Lucknow',
    timeline: '42 Days',
    budgetRange: '₹35L – ₹45L',
    materials: ['Italian Botticino Marble', 'Acoustic Wood Paneling', 'Custom Velvet Upholstery', 'Brushed Brass Trims'],
    highlights: ['360° Panoramic View Living Hall', 'Hidden Climate & Audio Integration', 'Custom Linear Lighting'],
  },
  {
    id: 'noida-penthouse',
    title: 'Noida Penthouse Transformation',
    category: 'kitchen',
    tags: ['Kitchen', 'Modular'],
    description:
      'Contemporary flat interior in Noida featuring bespoke modular cabinetry, warm lighting, and seamless integration of functional spaces.',
    promise: 'Crafting your legacy with our promised 45-Day Delivery.',
    imageUrl:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000',
    aspectRatioClass: 'aspect-square',
    location: 'Sector 128, Noida',
    timeline: '38 Days',
    budgetRange: '₹22L – ₹28L',
    materials: ['Super-Matte Anti-fingerprint Acrylic', 'Quartz Countertop 20mm', 'Blum Soft-Close Hardware', 'Gola Handleless Channels'],
    highlights: ['Corner Carousel Organizers', 'Appliance Garage with Retractable Doors', 'Under-cabinet Mood Luminescence'],
  },
  {
    id: 'raebareli-legacy-villa',
    title: 'The Raebareli Legacy Villa',
    category: 'bedroom',
    tags: ['Bedroom', 'Rustic'],
    description:
      'A sanctuary defined by natural stone textures, rich terracotta headboard, warm earthy linens, and sophisticated ambient lighting.',
    promise: 'Crafting your legacy with our promised 45-Day Delivery.',
    imageUrl:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1000',
    aspectRatioClass: 'aspect-[3/4]',
    location: 'Vikas Nagar, Raebareli',
    timeline: '45 Days',
    budgetRange: '₹18L – ₹24L',
    materials: ['Reclaimed Teak Wood', 'Natural Slate Feature Wall', 'Belgian Linen Headboard', 'Terracotta Sconces'],
    highlights: ['Integrated Walk-in Wardrobe', 'Dimmable Circadian Lighting', 'Custom Bedside Floating Consoles'],
  },
  {
    id: 'lucknow-heritage-renovation',
    title: 'Lucknow Heritage Renovation',
    category: 'living',
    tags: ['Living', 'Classic Elegance'],
    description:
      'Classic elegance elevated through neoclassical moldings, subtle arches, soft ambient glow, and timeless brass detailing.',
    promise: 'Crafting your legacy with our promised 45-Day Delivery.',
    imageUrl:
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1000',
    aspectRatioClass: 'aspect-video',
    location: 'Hazratganj, Lucknow',
    timeline: '40 Days',
    budgetRange: '₹30L – ₹40L',
    materials: ['Gypsum Neoclassical Cornices', 'Herringbone Engineered Oak', 'Satin Brass Hardware', 'Limewash Plaster'],
    highlights: ['Restored Architectural Arches', 'Custom Library Wall with Rolling Ladder', 'Art Deco Lighting Accents'],
  },
  {
    id: 'kanpur-residence-exterior',
    title: 'Modern Facade Transformation',
    category: 'exterior',
    tags: ['Exteriors', 'Modern Architecture'],
    description:
      'High-performance exterior facelift utilizing weatherproof HPL wooden slats, CNC laser-cut aluminum louvers, and warm dusk architectural uplighting.',
    promise: 'Crafting your legacy with our promised 45-Day Delivery.',
    imageUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000',
    aspectRatioClass: 'aspect-[16/10]',
    location: 'Civil Lines, Kanpur',
    timeline: '35 Days',
    budgetRange: '₹25L – ₹35L',
    materials: ['Fundermax Exterior HPL Panels', 'Powder Coated Aluminum Louvers', 'IP67 Architectural Uplighters'],
    highlights: ['Thermal Insulation Cladding', 'Monsoon-proof Drainage Channels', 'Smart Automatic Gate Lighting'],
  },
  {
    id: 'culinary-mastery-kitchen',
    title: 'Gola Profile Urban Kitchen',
    category: 'kitchen',
    tags: ['Kitchen', 'Japandi Minimal'],
    description:
      'Seamless Scandinavian-Japanese inspired open kitchen with stone composite island counter and discreet ambient LED channels.',
    promise: 'Crafting your legacy with our promised 45-Day Delivery.',
    imageUrl:
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=1000',
    aspectRatioClass: 'aspect-square',
    location: 'Indira Nagar, Raebareli',
    timeline: '30 Days',
    budgetRange: '₹15L – ₹20L',
    materials: ['Marine Grade HDHMR Ply', 'Matte Sage Green Laminate', 'Kaff Built-in Induction & Chimney'],
    highlights: ['Pantry Tall Unit with Inner Drawers', 'Dual Bin Waste Management', 'Touch-to-open Overhead Flap Units'],
  },
];

export const COMPANY_DETAILS = {
  name: 'Purnima S',
  legalName: 'PURNIMA S INTERIORS & EXTERIORS PRIVATE LIMITED',
  gstNumber: '09AARCP3551H1Z0',
  registeredOffice: '291/A, Police Line Road, Vikas Nagar, Raebareli, Uttar Pradesh - 229001',
  mumbaiOffice: '42, Heritage Boulevard, Mumbai, MH 400001',
  directors: ['Purnima Sonkar', 'Sudhanshu Sonkar'],
  phone: '+91 94150 XXXXX',
  email: 'consult@purnimas.in',
  established: '2014',
  experience: '10+ Years',
};

export const BEFORE_AFTER_PROJECTS = [
  {
    id: 'ba-lucknow-penthouse',
    title: 'Gomti Nagar Living Room Transformation',
    city: 'Lucknow',
    category: 'Living Room',
    handoverDays: 42,
    beforeImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000', // Unfinished raw concrete site
    afterImg: HERO_IMAGE, // Luxury living room
    description: 'Converted an unfinished bare shell concrete apartment into a Japandi-inspired quiet luxury sanctuary with hidden mood channels and acoustic wall panels.',
    keySpecs: ['Italian Botticino Marble', 'Hidden Mood Channels', 'Custom Velvet Lounge'],
  },
  {
    id: 'ba-raebareli-kitchen',
    title: 'Vikas Nagar Gola Profile Kitchen Facelift',
    city: 'Raebareli',
    category: 'Modular Kitchen',
    handoverDays: 30,
    beforeImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000', // Traditional messy old kitchen
    afterImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000', // Sleek modern Gola kitchen
    description: 'Replaced outdated tiled counter and wooden doors with 100% boiling-water-proof HDHMR carcass, anti-fingerprint super-matte shutters, and seamless Gola channels.',
    keySpecs: ['Boiling-Water-Proof HDHMR', 'Anti-Fingerprint Matte Shutters', 'German Soft-Close Drawers'],
  },
  {
    id: 'ba-kanpur-facade',
    title: 'Civil Lines Villa Exterior Renovation',
    city: 'Kanpur',
    category: 'Exterior Facade',
    handoverDays: 35,
    beforeImg: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1000', // Plain old painted house
    afterImg: EXPERTISE_EXTERIORS_IMG, // Modern architectural facade
    description: 'Transformed an aging 2-story brick elevation with exterior HPL wooden slats, weatherproof ACP paneling, and warm dusk architectural uplighting.',
    keySpecs: ['Fundermax HPL Paneling', 'Weatherproof ACP Cladding', 'IP67 Dusk Uplighters'],
  },
];

export const MATERIAL_SWATCHES = [
  {
    id: 'bwp-marine-ply',
    name: 'BWP 710 Marine Grade Plywood',
    category: 'Woodwork' as const,
    durabilityTag: '100% Water & Termite Proof',
    tier2Benefit: 'Zero swelling or warping during harsh UP monsoons & high humidity.',
    warranty: '25-Year Guarantee',
    imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800',
    description: 'Phenolic resin bonded boiling-water-proof ply tested for 72 continuous hours in boiling water. Ideal for kitchens, wardrobes, and damp wall zones.',
  },
  {
    id: 'super-matte-acrylic',
    name: 'Anti-Fingerprint Super-Matte Acrylic',
    category: 'Woodwork' as const,
    durabilityTag: 'Dust & Stain Resistance',
    tier2Benefit: 'Smooth nano-surface cleans easily with a wet cloth—no oily smudge marks.',
    warranty: '10-Year Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-low reflectivity Japanese matte finish that resists dust accumulation and finger smudges, giving modern living rooms a quiet luxury feel.',
  },
  {
    id: 'german-soft-close',
    name: 'Blum & Hettich German Hardware',
    category: 'Fittings' as const,
    durabilityTag: 'Tested for 200,000 Pulls',
    tier2Benefit: 'Silent, smooth door closing without squeaking or loose hinge drops over time.',
    warranty: 'Lifetime Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    description: 'Precision-engineered soft-close hinges, tandem drawer channels, and Gola profiles imported directly from Germany.',
  },
  {
    id: 'quartzite-countertop',
    name: 'Engineered Quartzite Countertops',
    category: 'Countertop' as const,
    durabilityTag: 'Non-Porous & Heat Resistant',
    tier2Benefit: 'Stain-resistant against turmeric, oil, and curry spills common in Indian cooking.',
    warranty: '15-Year Stain Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    description: '20mm solid engineered quartz surface with zero porosity. Scratch-resistant, hygienic, and effortless to wipe clean.',
  },
  {
    id: 'exterior-acp-hpl',
    name: 'Fundermax HPL & Weatherproof ACP',
    category: 'Facade' as const,
    durabilityTag: 'UV & Rain Shield',
    tier2Benefit: 'Zero repainting required for 15+ years; maintains rich wood texture in peak UP heat.',
    warranty: '15-Year Weather Guarantee',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    description: 'Exterior architectural cladding panels that withstand extreme heat, rain, and dust storms without color fading.',
  },
];
