import { ConsultationFormData, PortfolioProject, DesignService } from '../types';

export interface ConsultationResponseData extends ConsultationFormData {
  id: string;
  referenceCode: string;
  consultationMode: 'studio' | 'site' | 'virtual';
  status: 'Pending' | 'Contacted' | 'Site Visit Scheduled' | 'BOQ Finalized' | 'Completed' | 'Cancelled';
  createdAt: string;
  updatedAt: string;
  directorNotes?: string;
}

export interface BOQEstimateResult {
  id: string;
  areaSqFt: number;
  qualityTier: 'Standard' | 'Premium' | 'Bespoke Heritage';
  city: string;
  totalEstimatedMin: number;
  totalEstimatedMax: number;
  formattedRange: string;
  guaranteedTimelineDays: number;
  breakdown: {
    civilAndFlooring: number;
    customWoodwork: number;
    modularKitchen: number;
    architecturalLighting: number;
    hardwareAndAccessories: number;
    exteriorFacade: number;
  };
  specifications: {
    coreMaterial: string;
    fittings: string;
    guarantee: string;
  };
}

export interface AIAdviceResult {
  themeTitle: string;
  summary: string;
  materialPalette: { item: string; recommendation: string; rationale: string }[];
  lightingPlan: string;
  estimatedTimelineDays: number;
  directorTip: string;
  isAiGenerated: boolean;
}

const API_BASE = '/api';

export const api = {
  // --- HEALTH & COMPANY ---
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },

  // --- CONSULTATIONS ---
  async submitConsultation(data: ConsultationFormData & { consultationMode?: string }): Promise<ConsultationResponseData> {
    const res = await fetch(`${API_BASE}/consultations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || 'Failed to submit consultation request');
    }
    return result.data;
  },

  async getConsultations(filter?: { status?: string; city?: string; search?: string }) {
    const query = new URLSearchParams();
    if (filter?.status) query.append('status', filter.status);
    if (filter?.city) query.append('city', filter.city);
    if (filter?.search) query.append('search', filter.search);

    const res = await fetch(`${API_BASE}/consultations?${query.toString()}`);
    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch consultations');
    }
    return result;
  },

  async updateConsultationStatus(id: string, updates: { status?: string; directorNotes?: string }) {
    const res = await fetch(`${API_BASE}/consultations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || 'Failed to update consultation');
    }
    return result.data;
  },

  async deleteConsultation(id: string) {
    const res = await fetch(`${API_BASE}/consultations/${id}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || 'Failed to delete consultation');
    }
    return result;
  },

  // --- PROJECTS ---
  async getProjects(category?: string): Promise<PortfolioProject[]> {
    try {
      const url = category && category !== 'all' ? `${API_BASE}/projects?category=${category}` : `${API_BASE}/projects`;
      const res = await fetch(url);
      const result = await res.json();
      if (res.ok && result.success) {
        return result.data;
      }
    } catch (err) {
      console.warn('API fetch failed for projects, falling back to static content:', err);
    }
    return [];
  },

  async createProject(project: Partial<PortfolioProject>): Promise<PortfolioProject> {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || 'Failed to create portfolio project');
    }
    return result.data;
  },

  // --- BOQ ESTIMATOR ---
  async calculateEstimate(payload: {
    propertyType?: string;
    areaSqFt: number;
    qualityTier: 'Standard' | 'Premium' | 'Bespoke Heritage';
    city?: string;
    includeFacade?: boolean;
    includeModularKitchen?: boolean;
  }): Promise<BOQEstimateResult> {
    const res = await fetch(`${API_BASE}/estimate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || 'Failed to calculate BOQ estimate');
    }
    return result.data;
  },

  // --- GEMINI AI ADVISOR ---
  async getAIAdvice(payload: {
    prompt?: string;
    propertyType?: string;
    areaSqFt?: number;
    budgetRange?: string;
    city?: string;
    preferredStyle?: string;
  }): Promise<AIAdviceResult> {
    const res = await fetch(`${API_BASE}/ai/consult`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || 'AI Advice request failed');
    }
    return result.data;
  },
};
