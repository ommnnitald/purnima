export type ActiveTab = 'home' | 'interiors' | 'exteriors' | 'modular' | 'portfolio' | 'consultation';

export type PortfolioCategory = 'all' | 'living' | 'bedroom' | 'kitchen' | 'exterior';

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'living' | 'bedroom' | 'kitchen' | 'exterior';
  tags: string[];
  description: string;
  promise: string;
  imageUrl: string;
  aspectRatioClass?: string;
  location?: string;
  timeline?: string;
  budgetRange?: string;
  materials?: string[];
  highlights?: string[];
}

export interface DesignService {
  id: string;
  title: string;
  category: 'Modular' | 'Interiors' | 'Exteriors';
  tags: string[];
  description: string;
  features: string[];
  imageUrl: string;
  ctaText: string;
  targetTab?: ActiveTab;
  offsetMargin?: boolean;
}

export interface ConsultationFormData {
  fullName: string;
  contact: string;
  city: string;
  propertyType: string;
  budget: string;
  scopeNotes?: string;
  preferredDate?: string;
  preferredTimeSlot?: string;
}
