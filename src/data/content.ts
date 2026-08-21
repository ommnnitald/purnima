import { PortfolioProject, DesignService } from '../types';

export const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida/AP1WRLsy3pQFRDTIUvkAgEmAI9gxAcannEAZCyyavrNHCCHYPNLMAJbhldiZEPoyZrypMovKf7hlXVqg14hodstGItjy1BVddZenZdk65pcBwjTByoWgiE7Xw_SfxHPK3XNsIrBa8lQeekuGpKs2l4nBsJEysiRRV4GspMjU372ikiRq_WCIuqOHbi_Vgdt6P5-_D5UMdVxqA8NdS1X3fNdt8WozIib9jH48ccLnT_o6JMzo46wQ8RB-uHL-hvmK';

export const EXPERTISE_INTERIORS_IMG =
  'https://lh3.googleusercontent.com/aida/AP1WRLvIDO4Zp_vjYncDBBjIlgNUBY9bCDNznBUZ6Ypi6PZ3KTQI9wtqVCrCwsj3OVEv5Keoa3UBKoIrMm6EsMuwLubngHHVVSmAZrnAtcy-TxsuwpRvrDPP_00zeB_mYsH59hyY85Pb_tX4c_eni22KM4oIV7TIY3WN8ZyXHYYwmtkxTnOr0g3DSkN8_rAFbSzMO-MP-yO9DBoDl8JEkB1L05zzgy6G1Na5SItAqynjw0JAevGmOrkagfeRG74';

export const EXPERTISE_EXTERIORS_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCb1greLS2efzrKQ79JU-lhRX5_PbLUSOW8Z-q_ze2VhVBJ7q_0Qw4UbURMEoCDPyzcdBCoYIyJJxKA44PZNHoaNJvKeFjR_dk_S16jW7DpmDHsLERs_xFojLcEb7EieQN2BN-yEaIC4gmsk9znNBJTUedGfJ3rcNRMXXqi15n6Fk4wDLZJgUThfdVBzhWtbb45kPDzduVq0ODW5nYfTWxfPamOxCh5pMKhrDI-68pvgGUDTMA-e0_i5g';

export const LEGACY_BEDROOM_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCRVuVmEs_bB4f-dBnUtuiQ-yhYTgOo31id_WMA9q-jez8uRZ_5RjKpF4a9z6NhqdGv_dSYsvlCWuNU_at5O8ezc0vFekSPWR5eWHv9q-wFMZm_xbimKa6B5vEVAj87ZkJ_Zdz8F4w8Per8ikGnq2L1MRlGV6cXca-Y1k5wL4Bhe9H5uYH94J1SWk19uNFtifcKTZpDbR_zPzqJhqlHsJg11mg4HekSVNrA7d9Rv7oJ3WRQxP80lfu3qg';

export const CONSULTATION_BG_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAcB4E5Q1iLHfUo8rgDVhCwN4zApqavzvw-9VrVQKNiFAtapmr1SOZoMbHOsd_JZQEOT20DOdYBrTd4HXbyd6WIl-0d03aonEPVbCfjPhMLX_AnVKL-gsq3c6eJG5H8eqgo9fXbInLyCo67c7Ox52MgKmhKfq2QCqf-l5RDnUC7QUFxwtQ6KVP_pLjC_JqfKWtgtu689cCvSCeur06N7Wjv8bjAxB7CbIwc2Pwof-CxMN93L1w3-a3sCQ';

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
      'https://lh3.googleusercontent.com/aida/AP1WRLvslr2DgQQCY8t3d2yuPLqU0YcCNWIBC72qRN_DOcW_xl1hCDC4Qsls2HwsAaLYiqvzxJUZw1d2Gd68yhEi7F4_4guqSvgpQMhjxZ_Z_9wrf1z_vulgbcrj0sj69UAiHzu8fG2rBeAOaayiWdPwO770GqM4hhJuCqI3Pkw0vnups3vBXZ6pfQdDgc2GZxDcM2DaI_u-gKo95hCFnuANvohzouRQZ7wTZV_xgLHjFWoG1egGE72spJ3PO47J',
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
      'https://lh3.googleusercontent.com/aida/AP1WRLvvlmH5vXhwP1wKtOpHuR_AExvTM-GzhDcFBCgby4WAuTNql_pLBp4ex3JOZJUqzi_XkdPJkD-F82S_ol4g6HvVh4jhf5h73u_j2Kr0z1T9wFSabPSK95zbRZtbOzGRylElj4uLq09QzGPNIEVds4oGFshEaVQscRzlbJIUX-e6TiHPwmpJCOuqbY2d_QEv6WBmoDPXokHjyMzp4s_QbkK-8DSrsOtcfQgOytUocjtYZXwjCJirmLz1a6KO',
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
      'https://lh3.googleusercontent.com/aida/AP1WRLvPXX2eirAaT71EnZUD-AfSZT6N9fPy6WoDH4wAbNzM7IXRMXJX-X2LeTOJebdb9msitvNRxhZ9zPDcz4vJm9mELNuLi-iUuvVG2oFl0outk-w9naG8_hyFt7HHm0-4lh9YR0l5SHJ-c9RSp_JGeX4LbEE_iUqlXAF0lIQvMh__7PaykneADEiogOVTXhHHqwW6fBFWKFY9hTT-u8n5t0B8oguDjajdzaXTHhsGjABgwlISTN_hTWEO55D0',
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
      'https://lh3.googleusercontent.com/aida/AP1WRLspZNgMckfFW3nJbsDbA9jWdMYV5sgOYvDWy0utaQjOzQsclRpgpZeimod7muKdV1YeY-LpmTU_uhM3hhDOcxzn75iQeMByOTnWNH8eCQiU1LRM90vCSvedCIvldHz1xuTouEuU3cRluWyTKB07dONvD0kd350Hi4r05Z2pYqqQIJ_u-Jhu9_r2faomDAL-JCjFhCjqlYbpNbEdwUq5jJe_x3KRZ0aV99ByJlMHy-9zZvJX2-pIMhGY3NM',
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
      'https://lh3.googleusercontent.com/aida/AP1WRLtXo6_goFctvb8Rq73BWr3R_O2WPWiT1zhVAJ545jrrdgBra1swewRCsKMYo0B_oiZc370jdS0g-0G5yBXk3qcGiKyvZazBWWPRTokLandw9feLc_DyPHLiscJKLcBYSb-gB_ARfNhx1yGThwijSaM-eq4FX565EtUV5D7G_oZxdfuucnCRnT-hBaCASGhWbJBd_nIbGzVhblWMKUsgGE2VExgaDeo8Q5ePN7jzT8J41Pm5yp6UyApPhUJY',
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
      'https://lh3.googleusercontent.com/aida/AP1WRLsy-fk7-NsUZXWwPYVa6bJSrG58mAdW2L8sIXr2ajjqN7asBJi7TxRwWJSeSaQE3SpgvFQLk4Y1vtLY1D59SnQPNhP1PQ1on-UmGejHB1e0zrD6xusIcQxqjnB_ZkSgCOR1oejz5csnpozbP_3Lma_zav50h7OkqVahokSCwfb8jdeHDB4BizWqg2EmO_6au0iVhnrDInCDBNKFwZvkpCdSO6KM0Lczguku5iD74_Fvz1fklHG3buk8L_A3',
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
      'https://lh3.googleusercontent.com/aida/AP1WRLutlP-QdJZW1CQS6BqJSlpZk1GYi3snfgXiXyT6_xTE7t6Kvlg6yWYD9O7KUpWRf9uPU6JB-Uin-RHiG1MrqMhmX6vR2QYlyGu44MkQgZd87inuCEJSJA4ZBzQd08Rd0FQLvJOCwNhehLdqZSFUPlFrRN12upvTmJMw9PayXPODR-rcqGQoG3BSYuhkUPqclaRehpK9EZ_ZZUsPNNpnhqLg4-pwsdg182VFnEnXTUuT4GqzCPKY56DRp7K-',
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
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNM0Rt1ddcJgD5YVDlI5KBJ13kSTcVzupea-HmcfPpkKQP5GzL9yV0v-L324wxXkz6a3K5YslqMllE2BxTijI_c5loneR-FsYhfaM55SPCBbl-bkzh0ivImKUVorlE7Y0wS1_9X5HJ2kEIlySokYlm051yFXkktcHFguFz2ORxHB6XoUjUpaZNMq8s26m_9om3kd-II-w6McIW_whKQibPQq4daYjFkw2GAHr6cgFNLTkPVYIBAuVUHw',
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
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCb1greLS2efzrKQ79JU-lhRX5_PbLUSOW8Z-q_ze2VhVBJ7q_0Qw4UbURMEoCDPyzcdBCoYIyJJxKA44PZNHoaNJvKeFjR_dk_S16jW7DpmDHsLERs_xFojLcEb7EieQN2BN-yEaIC4gmsk9znNBJTUedGfJ3rcNRMXXqi15n6Fk4wDLZJgUThfdVBzhWtbb45kPDzduVq0ODW5nYfTWxfPamOxCh5pMKhrDI-68pvgGUDTMA-e0_i5g',
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
      'https://lh3.googleusercontent.com/aida/AP1WRLvIDO4Zp_vjYncDBBjIlgNUBY9bCDNznBUZ6Ypi6PZ3KTQI9wtqVCrCwsj3OVEv5Keoa3UBKoIrMm6EsMuwLubngHHVVSmAZrnAtcy-TxsuwpRvrDPP_00zeB_mYsH59hyY85Pb_tX4c_eni22KM4oIV7TIY3WN8ZyXHYYwmtkxTnOr0g3DSkN8_rAFbSzMO-MP-yO9DBoDl8JEkB1L05zzgy6G1Na5SItAqynjw0JAevGmOrkagfeRG74',
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
    beforeImg: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=1000', // Unfinished raw concrete site
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
    afterImg: 'https://lh3.googleusercontent.com/aida/AP1WRLvslr2DgQQCY8t3d2yuPLqU0YcCNWIBC72qRN_DOcW_xl1hCDC4Qsls2HwsAaLYiqvzxJUZw1d2Gd68yhEi7F4_4guqSvgpQMhjxZ_Z_9wrf1z_vulgbcrj0sj69UAiHzu8fG2rBeAOaayiWdPwO770GqM4hhJuCqI3Pkw0vnups3vBXZ6pfQdDgc2GZxDcM2DaI_u-gKo95hCFnuANvohzouRQZ7wTZV_xgLHjFWoG1egGE72spJ3PO47J', // Sleek modern Gola kitchen
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
