import { Router, Request, Response } from 'express';
import { generateInteriorAdvice } from '../ai';

const router = Router();

// POST /api/ai/consult - Get AI Interior & Architecture Advisory
router.post('/consult', async (req: Request, res: Response) => {
  try {
    const { prompt, propertyType, areaSqFt, budgetRange, city, preferredStyle } = req.body;

    const advice = await generateInteriorAdvice({
      prompt,
      propertyType,
      areaSqFt: Number(areaSqFt) || 1800,
      budgetRange,
      city,
      preferredStyle,
    });

    res.json({
      success: true,
      data: advice,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'AI Consultation service encountered an error', error });
  }
});

export default router;
