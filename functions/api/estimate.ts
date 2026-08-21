export const onRequestPost = async (context: { request: Request }) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  try {
    const body = (await context.request.json()) as any;
    const { propertyType, areaSqFt, qualityTier, city, includeFacade, includeModularKitchen } = body || {};

    const area = Number(areaSqFt) || 1500;
    const tier = (qualityTier || 'Premium') as 'Standard' | 'Premium' | 'Bespoke Heritage';
    const location = city || 'Raebareli';

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
    const modularKitchenCost = includeModularKitchen !== false ? Math.round(baseMin * 0.20) : 0;
    const lightingCost = Math.round(baseMin * 0.12);
    const hardwareCost = Math.round(baseMin * 0.08);
    const facadeCost = includeFacade ? Math.round(baseMin * 0.18) : 0;

    const totalMin = civilCost + woodworkCost + modularKitchenCost + lightingCost + hardwareCost + facadeCost;
    const totalMax = Math.round(totalMin * 1.25);

    return new Response(
      JSON.stringify({
        success: true,
        data: {
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
        },
      }),
      { headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to calculate estimate', error: String(error) }),
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
