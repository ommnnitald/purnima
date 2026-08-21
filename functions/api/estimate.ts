function formatIndianCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    const val = amount / 100000;
    return `₹${val % 1 === 0 ? val.toFixed(0) : val.toFixed(2)} Lakhs`;
  } else {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
}

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

    const area = Math.max(200, Number(areaSqFt) || 1500);
    const tier = (qualityTier || 'Premium') as 'Standard' | 'Premium' | 'Bespoke Heritage';
    const propType = String(propertyType || '3/4 BHK Luxury Apartment');
    const location = String(city || 'Raebareli');

    let baseRateMin = 1300;
    let baseRateMax = 1700;

    if (tier === 'Premium') {
      baseRateMin = 1850;
      baseRateMax = 2400;
    } else if (tier === 'Bespoke Heritage') {
      baseRateMin = 2900;
      baseRateMax = 3800;
    }

    let propMultiplier = 1.0;
    if (propType.includes('Villa') || propType.includes('Kothi')) {
      propMultiplier = 1.20;
    } else if (propType.includes('Ancestral') || propType.includes('Facelift')) {
      propMultiplier = 0.90;
    } else if (propType.includes('Modular Kitchen')) {
      propMultiplier = 0.50;
    } else if (propType.includes('Commercial') || propType.includes('Studio')) {
      propMultiplier = 0.85;
    }

    const effectiveRateMin = Math.round(baseRateMin * propMultiplier);
    const effectiveRateMax = Math.round(baseRateMax * propMultiplier);

    const baseMin = area * effectiveRateMin;

    const civilCost = Math.round(baseMin * 0.22);
    const woodworkCost = Math.round(baseMin * 0.38);
    const modularKitchenCost = includeModularKitchen !== false ? Math.round(baseMin * 0.20) : 0;
    const lightingCost = Math.round(baseMin * 0.12);
    const hardwareCost = Math.round(baseMin * 0.08);
    const facadeCost = includeFacade ? Math.round(baseMin * 0.18) : 0;

    const totalMin = civilCost + woodworkCost + modularKitchenCost + lightingCost + hardwareCost + facadeCost;
    const totalMax = Math.round(totalMin * (effectiveRateMax / effectiveRateMin));

    const formattedMin = formatIndianCurrency(totalMin);
    const formattedMax = formatIndianCurrency(totalMax);
    const formattedRange = `${formattedMin} – ${formattedMax}`;

    let coreMaterial = 'BWP Grade Marine Ply & anti-fingerprint laminates';
    let fittings = 'Blum / Hettich German Gola channels & soft-close hinges';

    if (tier === 'Standard') {
      coreMaterial = 'Commercial HDHMR Board & 1mm Gloss Laminates';
      fittings = 'Ebco / Godrej Soft-Close Telescopic Hardware';
    } else if (tier === 'Bespoke Heritage') {
      coreMaterial = 'Teak Wood Joinery, HDHMR Cores & Anti-scratch Acrylics';
      fittings = 'Blum Legrabox, Servo-Drive & Aventos Lift-Up Systems';
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          id: `EST-${Date.now()}`,
          propertyType: propType,
          areaSqFt: area,
          qualityTier: tier,
          city: location,
          ratePerSqFt: effectiveRateMin,
          totalEstimatedMin: totalMin,
          totalEstimatedMax: totalMax,
          formattedRange,
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
            coreMaterial,
            fittings,
            guarantee: '45-Day Handover Protocol with Direct Director Inspection',
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
