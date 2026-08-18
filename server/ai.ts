import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || '';
let aiInstance: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiInstance = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI SDK, fallback engine will be used:', err);
  }
}

export interface AIDesignConsultationRequest {
  prompt?: string;
  propertyType?: string;
  areaSqFt?: number;
  budgetRange?: string;
  city?: string;
  preferredStyle?: string;
}

export interface AIDesignConsultationResponse {
  themeTitle: string;
  summary: string;
  materialPalette: { item: string; recommendation: string; rationale: string }[];
  lightingPlan: string;
  estimatedTimelineDays: number;
  directorTip: string;
  isAiGenerated: boolean;
}

export async function generateInteriorAdvice(
  req: AIDesignConsultationRequest
): Promise<AIDesignConsultationResponse> {
  const propertyType = req.propertyType || '3/4 BHK Luxury Residence';
  const areaSqFt = req.areaSqFt || 1800;
  const budgetRange = req.budgetRange || '₹25L – ₹40L';
  const city = req.city || 'Raebareli';
  const style = req.preferredStyle || 'Quiet Luxury & Japandi Minimal';
  const userPrompt = req.prompt || '';

  // If Gemini API is configured, use Gemini 2.5 Flash
  if (aiInstance) {
    try {
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

      const response = await aiInstance.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptText,
      });

      const responseText = response.text || '';
      // Clean possible JSON backticks
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
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
    } catch (err) {
      console.warn('Gemini API call failed, reverting to intelligent rule-based engine:', err);
    }
  }

  // Intelligent fallback engine when API key is unconfigured or call fails
  return {
    themeTitle: `Tailored ${style} Concept`,
    summary: `Comprehensive architectural blueprint engineered for your ${areaSqFt} sq.ft ${propertyType} in ${city}. Designed to withstand regional weather variations while delivering quiet luxury aesthetics.`,
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
