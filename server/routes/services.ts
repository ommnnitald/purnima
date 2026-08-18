import { Router, Request, Response } from 'express';
import { db } from '../db';

const router = Router();

// GET /api/services - Retrieve services list
router.get('/', (req: Request, res: Response) => {
  try {
    const services = db.getServices();
    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch design services', error });
  }
});

export default router;
