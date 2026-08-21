import { ConsultationFormData, PortfolioProject } from '../types';

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

async function safeFetchJson(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (data && data.success !== false) {
        return data;
      }
    }
  } catch (err) {
    console.warn(`Fetch to ${url} failed or returned non-JSON response:`, err);
  }
  return null;
}

async function getDirectGeminiAIAdvice(payload: {
  prompt?: string;
  propertyType?: string;
  areaSqFt?: number;
  budgetRange?: string;
  city?: string;
  preferredStyle?: string;
}): Promise<AIAdviceResult | null> {
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY || '';
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') return null;

  try {
    const propertyType = payload.propertyType || '3/4 BHK Luxury Residence';
    const areaSqFt = payload.areaSqFt || 1800;
    const budgetRange = payload.budgetRange || '₹25L – ₹40L';
    const city = payload.city || 'Raebareli';
    const style = payload.preferredStyle || 'Quiet Luxury & Japandi Minimal';
    const userPrompt = payload.prompt || '';

    const promptText = `You are the lead architectural & interior consultant for Purnima S Interiors & Exteriors Private Limited, a premier architectural firm serving UP (Raebareli, Lucknow, Kanpur, Noida).
Analyze the client request and respond strictly in JSON format with no markdown wrappers or backticks.

Client Details:
- Property Type: ${propertyType}
- Area: ${areaSqFt} sq ft
- Budget Bracket: ${budgetRange}
- Location: ${city}
- Preferred Style: ${style}
- Specific Notes / Query: ${userPrompt}

Provide expert local advice tailored for Tier-2 UP climatic conditions (dust/humidity resistant, HDHMR ply, Blum hardware, Gola handleless profiles, anti-fingerprint laminates, ACP facade cladding).

Required JSON structure:
{
  "themeTitle": "string",
  "summary": "string",
  "materialPalette": [
    { "item": "string", "recommendation": "string", "rationale": "string" }
  ],
  "lightingPlan": "string",
  "estimatedTimelineDays": number,
  "directorTip": "string"
}`;

    const modelsToTry = ['gemini-2.0-flash', 'gemini-1.5-flash'];
    for (const model of modelsToTry) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);
          return {
            themeTitle: parsed.themeTitle || `${style} for ${propertyType}`,
            summary: parsed.summary || `Personalized design framework for your ${areaSqFt} sq.ft residence in ${city}.`,
            materialPalette: parsed.materialPalette || [],
            lightingPlan: parsed.lightingPlan || 'Warm 3000K indirect LED cove luminescence with magnetic track accents.',
            estimatedTimelineDays: parsed.estimatedTimelineDays || 45,
            directorTip: parsed.directorTip || 'Our 45-day guaranteed handover includes daily site reports managed directly by directors Sudhanshu & Purnima Sonkar.',
            isAiGenerated: true,
          };
        }
      } catch (e) {
        console.warn(`Direct client-side Gemini API call for ${model} failed:`, e);
      }
    }
  } catch (err) {
    console.warn('Direct client-side Gemini API call failed:', err);
  }
  return null;
}

function getFallbackAIAdvice(payload: {
  prompt?: string;
  propertyType?: string;
  areaSqFt?: number;
  budgetRange?: string;
  city?: string;
  preferredStyle?: string;
}): AIAdviceResult {
  const propertyType = payload.propertyType || '3/4 BHK Luxury Residence';
  const areaSqFt = payload.areaSqFt || 1800;
  const budgetRange = payload.budgetRange || '₹25L – ₹40L';
  const city = payload.city || 'Raebareli';
  const style = payload.preferredStyle || 'Quiet Luxury & Japandi Minimal';

  return {
    themeTitle: `Tailored ${style} Concept`,
    summary: `Comprehensive architectural blueprint engineered for your ${areaSqFt} sq.ft ${propertyType} in ${city}. Designed to withstand regional weather variations while delivering quiet luxury aesthetics tailored for ${budgetRange}.`,
    materialPalette: [
      {
        item: 'Modular Cabinetry',
        recommendation: 'Super-Matte Anti-Fingerprint Laminate on Marine HDHMR Ply',
        rationale: 'High moisture resistance and zero smudge maintenance during humid months.',
      },
      {
        item: 'Hardware & Fittings',
        recommendation: 'Blum Soft-Close Concealed Hinges with Black Gola Profiles',
        rationale: 'Seamless handleless execution with lifetime mechanical warranty.',
      },
      {
        item: 'Living & Dining Flooring',
        recommendation: 'Large Format 800x1600mm Vitrified Italian Marble-finish Tiles',
        rationale: 'Creates an expansive visual flow with zero stain absorption.',
      },
      {
        item: 'Facade / Elevation (If Applicable)',
        recommendation: 'Fundermax Exterior HPL Panels & CNC Louvers',
        rationale: 'Weatherproof UV-coated cladding designed for UP sunlight and dust protection.',
      },
    ],
    lightingPlan: 'Layered ambient illumination: 3000K warm architectural magnetic tracks, architectural cove lighting, and focal accent sconces.',
    estimatedTimelineDays: 45,
    directorTip: 'Direct Director Supervision: Purnima Sonkar and Sudhanshu Sonkar conduct mandatory 7-point quality audits before final handover.',
    isAiGenerated: false,
  };
}

export const api = {
  // --- HEALTH & COMPANY ---
  async getHealth() {
    const res = await safeFetchJson(`${API_BASE}/health`);
    return res || { status: 'online', system: 'Purnima S Client Engine' };
  },

  // --- CONSULTATIONS ---
  async submitConsultation(data: ConsultationFormData & { consultationMode?: string }): Promise<ConsultationResponseData> {
    try {
      const res = await fetch(`${API_BASE}/consultations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const json = await res.json();
        if (!res.ok || json.success === false) {
          throw new Error(json.message || 'Failed to submit consultation request');
        }
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch (err: any) {
      if (err.message && !err.message.includes('fetch')) {
        throw err;
      }
      console.warn('Backend API unavailable, using local client fallback:', err);
    }

    return {
      id: `CONS-${Date.now()}`,
      referenceCode: `PS-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName: data.fullName,
      email: data.email,
      contact: data.contact,
      city: data.city || 'Raebareli',
      propertyType: data.propertyType || '3/4 BHK Luxury Apartment',
      budget: data.budget || '₹25L – ₹40L (Premium Full Interior)',
      scopeNotes: data.scopeNotes || '',
      preferredDate: data.preferredDate || '',
      preferredTimeSlot: data.preferredTimeSlot || '11:00 AM – 01:00 PM',
      consultationMode: (data.consultationMode as any) || 'studio',
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  async getConsultations(filter?: { status?: string; city?: string; search?: string }) {
    const query = new URLSearchParams();
    if (filter?.status) query.append('status', filter.status);
    if (filter?.city) query.append('city', filter.city);
    if (filter?.search) query.append('search', filter.search);

    const result = await safeFetchJson(`${API_BASE}/consultations?${query.toString()}`);
    if (result && result.success) {
      return result;
    }

    return {
      success: true,
      stats: { total: 0, pending: 0, contacted: 0, scheduled: 0, completed: 0 },
      data: [],
    };
  },

  async updateConsultationStatus(id: string, updates: { status?: string; directorNotes?: string }) {
    const result = await safeFetchJson(`${API_BASE}/consultations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (result && result.success && result.data) {
      return result.data;
    }

    throw new Error('Failed to update consultation record');
  },

  async deleteConsultation(id: string) {
    const result = await safeFetchJson(`${API_BASE}/consultations/${id}`, {
      method: 'DELETE',
    });

    if (result && result.success) {
      return result;
    }

    throw new Error('Failed to delete consultation');
  },

  // --- PROJECTS ---
  async getProjects(category?: string): Promise<PortfolioProject[]> {
    const url = category && category !== 'all' ? `${API_BASE}/projects?category=${category}` : `${API_BASE}/projects`;
    const result = await safeFetchJson(url);
    if (result && result.success && Array.isArray(result.data)) {
      return result.data;
    }
    return [];
  },

  async createProject(project: Partial<PortfolioProject>): Promise<PortfolioProject> {
    const result = await safeFetchJson(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });

    if (result && result.success && result.data) {
      return result.data;
    }

    throw new Error('Failed to create portfolio project');
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
    const result = await safeFetchJson(`${API_BASE}/estimate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (result && result.success && result.data) {
      return result.data;
    }

    const area = Number(payload.areaSqFt) || 1500;
    const tier = payload.qualityTier || 'Premium';
    const location = payload.city || 'Raebareli';

    let baseRateMin = 1300;
    let baseRateMax = 1700;
    if (tier === 'Premium') {
      baseRateMin = 1850;
      baseRateMax = 2400;
    } else if (tier === 'Bespoke Heritage') {
      baseRateMin = 2900;
      baseRateMax = 3800;
    }

    const baseMin = area * baseRateMin;
    const civilCost = Math.round(baseMin * 0.22);
    const woodworkCost = Math.round(baseMin * 0.38);
    const modularKitchenCost = payload.includeModularKitchen !== false ? Math.round(baseMin * 0.20) : 0;
    const lightingCost = Math.round(baseMin * 0.12);
    const hardwareCost = Math.round(baseMin * 0.08);
    const facadeCost = payload.includeFacade ? Math.round(baseMin * 0.18) : 0;

    const totalMin = civilCost + woodworkCost + modularKitchenCost + lightingCost + hardwareCost + facadeCost;
    const totalMax = Math.round(totalMin * 1.25);

    return {
      id: `EST-${Date.now()}`,
      areaSqFt: area,
      qualityTier: tier,
      city: location,
      totalEstimatedMin: totalMin,
      totalEstimatedMax: totalMax,
      formattedRange: `₹${(totalMin / 100000).toFixed(1)}L – ₹${(totalMax / 100000).toFixed(1)}L`,
      guaranteedTimelineDays: 45,
      breakdown: {
        civilAndFlooring: civilCost,
        customWoodwork: woodworkCost,
        modularKitchen: modularKitchenCost,
        architecturalLighting: lightingCost,
        hardwareAndAccessories: hardwareCost,
        exteriorFacade: facadeCost,
      },
      specifications: {
        coreMaterial: tier === 'Standard' ? 'Commercial HDHMR Ply' : 'BWP Grade Marine Ply & anti-fingerprint laminates',
        fittings: tier === 'Standard' ? 'Standard soft-close hardware' : 'Blum / Hettich German Gola channels',
        guarantee: '45-Day Handover with direct director inspection',
      },
    };
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
    // 1. Try server API / Cloudflare Function endpoint
    const result = await safeFetchJson(`${API_BASE}/ai/consult`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (result && result.success && result.data) {
      return result.data;
    }

    // 2. Direct client Gemini API call if key is present
    const directGemini = await getDirectGeminiAIAdvice(payload);
    if (directGemini) {
      return directGemini;
    }

    // 3. Fallback rule engine
    return getFallbackAIAdvice(payload);
  },
};
