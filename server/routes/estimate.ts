import { Router, Request, Response } from 'express';
import { db } from '../db';

const router = Router();

// POST /api/estimate & POST /api/estimate/calculate - Calculate BOQ breakdown & dynamic budget estimate
const calculateHandler = (req: Request, res: Response) => {
  try {
    const { propertyType, areaSqFt, qualityTier, city, includeFacade, includeModularKitchen } = req.body;

    const area = Number(areaSqFt) || 1500;
    const tier = (qualityTier || 'Premium') as 'Standard' | 'Premium' | 'Bespoke Heritage';
    const location = city || 'Raebareli';

    // Base rates per sq ft according to tier
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
    const baseMax = area * baseRateMax;

    // Component Breakdown Percentages
    const civilCost = Math.round(baseMin * 0.22);
    const woodworkCost = Math.round(baseMin * 0.38);
    const modularKitchenCost = includeModularKitchen !== false ? Math.round(baseMin * 0.20) : 0;
    const lightingCost = Math.round(baseMin * 0.12);
    const hardwareCost = Math.round(baseMin * 0.08);
    const facadeCost = includeFacade ? Math.round(baseMin * 0.18) : 0;

    const totalMin = civilCost + woodworkCost + modularKitchenCost + lightingCost + hardwareCost + facadeCost;
    const totalMax = Math.round(totalMin * 1.25);

    const savedRecord = db.saveEstimate({
      propertyType: propertyType || '3/4 BHK Luxury Apartment',
      areaSqFt: area,
      qualityTier: tier,
      city: location,
      civilCost,
      woodworkCost,
      modularKitchenCost,
      lightingCost,
      hardwareCost,
      facadeCost,
      totalEstimatedMin: totalMin,
      totalEstimatedMax: totalMax,
    });

    res.json({
      success: true,
      data: {
        id: savedRecord.id,
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
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to calculate estimate', error });
  }
};

router.post('/', calculateHandler);
router.post('/calculate', calculateHandler);

// GET /api/estimate - Get recent calculations (Admin/Analytics)
router.get('/', (req: Request, res: Response) => {
  try {
    const estimates = db.getEstimates();
    res.json({ success: true, count: estimates.length, data: estimates });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch estimates', error });
  }
});

export default router;
