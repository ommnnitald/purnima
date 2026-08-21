interface Env {
  GEMINI_API_KEY?: string;
  VITE_GEMINI_API_KEY?: string;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  try {
    const body = (await context.request.json()) as any;
    const { prompt, propertyType, areaSqFt, budgetRange, city, preferredStyle } = body || {};

    const apiKey = context.env.GEMINI_API_KEY || context.env.VITE_GEMINI_API_KEY || '';

    const pType = propertyType || '3/4 BHK Luxury Residence';
    const area = Number(areaSqFt) || 1800;
    const budget = budgetRange || '₹25L – ₹40L';
    const location = city || 'Raebareli';
    const style = preferredStyle || 'Quiet Luxury & Japandi Minimal';
    const userPrompt = prompt || '';

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const promptText = `You are the lead architectural & interior consultant for Purnima S Interiors & Exteriors Private Limited, a premier architectural firm serving UP (Raebareli, Lucknow, Kanpur, Noida).
Analyze the client request and respond strictly in JSON format with no markdown wrappers or backticks.

Client Details:
- Property Type: ${pType}
- Area: ${area} sq ft
- Budget Bracket: ${budget}
- Location: ${location}
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

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }] }],
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = (await geminiRes.json()) as any;
          const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);

          return new Response(
            JSON.stringify({
              success: true,
              data: {
                themeTitle: parsed.themeTitle || `${style} for ${pType}`,
                summary: parsed.summary || `Personalized design framework for your ${area} sq.ft residence in ${location}.`,
                materialPalette: parsed.materialPalette || [],
                lightingPlan: parsed.lightingPlan || 'Warm 3000K indirect LED cove luminescence with magnetic track accents.',
                estimatedTimelineDays: parsed.estimatedTimelineDays || 45,
                directorTip: parsed.directorTip || 'Our 45-day guaranteed handover includes daily site reports managed directly by directors Sudhanshu & Purnima Sonkar.',
                isAiGenerated: true,
              },
            }),
            { headers: corsHeaders }
          );
        }
      } catch (err) {
        console.warn('Cloudflare function Gemini call failed, falling back to rule engine:', err);
      }
    }

    // Intelligent fallback engine
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          themeTitle: `Tailored ${style} Concept`,
          summary: `Comprehensive architectural blueprint engineered for your ${area} sq.ft ${pType} in ${location}. Designed to withstand regional weather variations while delivering quiet luxury aesthetics.`,
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
        },
      }),
      { headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: 'AI processing error', error: String(error) }),
      { status: 500, headers: corsHeaders }
    );
  }
};

export const onRequestOptions = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    },
  });
};
