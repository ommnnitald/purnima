export interface WrittenReview {
  id: string;
  author: string;
  location: string;
  city: 'Lucknow' | 'Raebareli' | 'Kanpur' | 'Ayodhya' | 'Prayagraj';
  propertyType: string;
  budgetBracket: string;
  rating: number;
  date: string;
  avatarUrl: string;
  comment: string;
  verifiedBadge: string;
  highlights: string[];
}

export interface ComparisonPoint {
  feature: string;
  purnimaStandard: string;
  localContractor: string;
  isPurnimaBetter: boolean;
}

export const WRITTEN_REVIEWS: WrittenReview[] = [
  {
    id: 'rev-lucknow-1',
    author: 'Alok & Ritu Srivastava',
    location: 'Gomti Nagar Extension, Lucknow',
    city: 'Lucknow',
    propertyType: '4 BHK Penthouse Turnkey Interior',
    budgetBracket: '₹35L – ₹45L',
    rating: 5,
    date: 'July 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    comment:
      'Purnima S delivered our 4 BHK penthouse in 42 days flat without a single extra rupee added to the initial estimate. The anti-fingerprint super-matte kitchen and concealed LED lighting transformed our home completely.',
    verifiedBadge: 'GST Verified Handover #PS-2026-489',
    highlights: ['42-Day Handover', 'Zero Cost Escalation', 'Director Audited'],
  },
  {
    id: 'rev-raebareli-1',
    author: 'Er. Vivek Kumar',
    location: 'Vikas Nagar, Raebareli',
    city: 'Raebareli',
    propertyType: 'Independent Villa Exterior & Interior',
    budgetBracket: '₹25L – ₹35L',
    rating: 5,
    date: 'June 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    comment:
      'Director Sudhanshu Sonkar personally visited our site every week. The 100% BWP 710 Marine Ply used in our kitchen withstands heavy moisture and monsoon humidity effortlessly. True peace of mind!',
    verifiedBadge: 'GST Verified Handover #PS-2026-312',
    highlights: ['BWP 710 Marine Ply', 'Director Site Inspections', '25-Yr Guarantee'],
  },
  {
    id: 'rev-kanpur-1',
    author: 'Dr. Archana & Mohit Gupta',
    location: 'Civil Lines, Kanpur',
    city: 'Kanpur',
    propertyType: 'Modular Gola Kitchen & Dining',
    budgetBracket: '₹15L – ₹20L',
    rating: 5,
    date: 'May 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    comment:
      'Our local contractor in Kanpur previously delayed our old house work by 6 months. Purnima S signed a locked 45-day contract with a delay penalty clause and delivered in just 38 days!',
    verifiedBadge: 'GST Verified Handover #PS-2026-204',
    highlights: ['Delivered in 38 Days', 'Penalty Clause Protected', 'Blum Soft-Close'],
  },
  {
    id: 'rev-ayodhya-1',
    author: 'Sanjay Pandey',
    location: 'Civil Lines, Ayodhya',
    city: 'Ayodhya',
    propertyType: 'Ancestral Home Facade Renovation',
    budgetBracket: '₹20L – ₹28L',
    rating: 5,
    date: 'April 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    comment:
      'The weatherproof ACP cladding and Fundermax wood slats gave our elevation an international luxury resort look. Neighbors stop by daily to ask who designed it.',
    verifiedBadge: 'GST Verified Handover #PS-2026-178',
    highlights: ['Weatherproof ACP Facade', 'Monsoon Shield', 'Zero Paint Maintenance'],
  },
];

export const CONTRACTOR_COMPARISON: ComparisonPoint[] = [
  {
    feature: 'Material Grade & Plywood',
    purnimaStandard: '100% Boiling-Water-Proof (BWP 710) Marine Ply with 25-Year Warranty',
    localContractor: 'Cheap Commercial Ply or Moisture-sensitive Particle Board that swells in humidity',
    isPurnimaBetter: true,
  },
  {
    feature: 'Price & BOQ Transparency',
    purnimaStandard: 'Locked Itemized BOQ Estimate with 0% Hidden Cost Escalation',
    localContractor: 'Vague verbal estimates leading to frequent 30%–50% cost overruns mid-project',
    isPurnimaBetter: true,
  },
  {
    feature: 'Handover Timeline',
    purnimaStandard: 'Guaranteed 45-Day Turnkey Handover with ₹1,000/day Delay Credit Clause',
    localContractor: 'Unpredictable delays stretching 6 to 9 months with zero penalty accountability',
    isPurnimaBetter: true,
  },
  {
    feature: 'Hardware & Fittings',
    purnimaStandard: 'Imported Blum & Hettich German Soft-Close Channels (200,000 cycle tested)',
    localContractor: 'Unbranded local hinges that rust, squeak, and drop out of alignment in 1 year',
    isPurnimaBetter: true,
  },
  {
    feature: 'Corporate Accountability',
    purnimaStandard: 'GST Registered Private Limited Firm (09AARCP3551H1Z0) with Director Supervision',
    localContractor: 'Unregistered cash-only contractors with zero legal contract or warranty backup',
    isPurnimaBetter: true,
  },
];

export const DIRECTOR_GUARANTEE_TERMS = {
  gstin: '09AARCP3551H1Z0',
  companyName: 'PURNIMA S INTERIORS & EXTERIORS PRIVATE LIMITED',
  registeredAddress: '291/A, Police Line Road, Vikas Nagar, Raebareli, UP - 229001',
  directors: ['Purnima Sonkar (Founder & Managing Director)', 'Sudhanshu Sonkar (Director of Operations)'],
  penaltyClause: '₹1,000 per day cash credit to client if turnkey handover exceeds 45 days.',
  warrantyYears: 25,
};
