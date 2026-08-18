import { Router, Request, Response } from 'express';
import { db } from '../db';

const router = Router();

// GET /api/consultations - Retrieve consultations list with filter & stats
router.get('/', (req: Request, res: Response) => {
  try {
    const status = req.query.status as string | undefined;
    const city = req.query.city as string | undefined;
    const search = req.query.search as string | undefined;

    const list = db.getConsultations({ status, city, search });
    const allList = db.getConsultations();

    // Summary stats
    const stats = {
      total: allList.length,
      pending: allList.filter((c) => c.status === 'Pending').length,
      contacted: allList.filter((c) => c.status === 'Contacted').length,
      scheduled: allList.filter((c) => c.status === 'Site Visit Scheduled').length,
      completed: allList.filter((c) => c.status === 'Completed').length,
    };

    res.json({
      success: true,
      stats,
      data: list,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch consultations', error });
  }
});

// GET /api/consultations/:id - Retrieve single consultation by id or reference code
router.get('/:id', (req: Request, res: Response) => {
  try {
    const consultation = db.getConsultationById(req.params.id);
    if (!consultation) {
      return res.status(404).json({ success: false, message: 'Consultation record not found' });
    }
    res.json({ success: true, data: consultation });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving consultation record', error });
  }
});

// POST /api/consultations - Submit consultation request
router.post('/', (req: Request, res: Response) => {
  try {
    const { fullName, contact, city, propertyType, budget, scopeNotes, preferredDate, preferredTimeSlot, consultationMode } = req.body;

    if (!fullName || !contact) {
      return res.status(400).json({ success: false, message: 'Full name and contact/phone number are required.' });
    }

    const created = db.createConsultation({
      fullName,
      contact,
      city: city || 'Raebareli',
      propertyType: propertyType || '3/4 BHK Luxury Apartment',
      budget: budget || '₹25L – ₹40L (Premium Full Interior)',
      scopeNotes: scopeNotes || '',
      preferredDate: preferredDate || '',
      preferredTimeSlot: preferredTimeSlot || '11:00 AM – 01:00 PM',
      consultationMode: consultationMode || 'studio',
    });

    res.status(201).json({
      success: true,
      message: 'Consultation request submitted successfully.',
      data: created,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to process consultation request', error });
  }
});

// PATCH /api/consultations/:id - Update status or director notes
router.patch('/:id', (req: Request, res: Response) => {
  try {
    const { status, directorNotes, preferredDate, preferredTimeSlot } = req.body;

    const updated = db.updateConsultation(req.params.id, {
      ...(status && { status }),
      ...(directorNotes !== undefined && { directorNotes }),
      ...(preferredDate && { preferredDate }),
      ...(preferredTimeSlot && { preferredTimeSlot }),
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Consultation not found' });
    }

    res.json({
      success: true,
      message: 'Consultation record updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update consultation record', error });
  }
});

// DELETE /api/consultations/:id - Delete consultation record
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const deleted = db.deleteConsultation(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Consultation not found' });
    }
    res.json({ success: true, message: 'Consultation record deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete consultation', error });
  }
});

export default router;
