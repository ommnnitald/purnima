import { Router, Request, Response } from 'express';
import { db } from '../db';
import { PortfolioProject } from '../../src/types';

const router = Router();

// GET /api/projects - Retrieve portfolio projects
router.get('/', (req: Request, res: Response) => {
  try {
    const category = req.query.category as string | undefined;
    const projects = db.getProjects(category);
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch projects', error });
  }
});

// GET /api/projects/:id - Retrieve single project details
router.get('/:id', (req: Request, res: Response) => {
  try {
    const project = db.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch project', error });
  }
});

// POST /api/projects - Create a new project (Director/Admin endpoint)
router.post('/', (req: Request, res: Response) => {
  try {
    const { title, category, tags, description, promise, imageUrl, location, timeline, budgetRange, materials, highlights } = req.body;

    if (!title || !category || !imageUrl) {
      return res.status(400).json({ success: false, message: 'Title, category, and imageUrl are required.' });
    }

    const newProject: PortfolioProject = {
      id: `proj-${Date.now()}`,
      title,
      category,
      tags: tags || [category],
      description: description || '',
      promise: promise || 'Crafting your legacy with our promised 45-Day Delivery.',
      imageUrl,
      location: location || 'Raebareli / UP',
      timeline: timeline || '45 Days',
      budgetRange: budgetRange || '₹25L – ₹35L',
      materials: materials || [],
      highlights: highlights || [],
    };

    const created = db.createProject(newProject);
    res.status(201).json({ success: true, message: 'Portfolio project created', data: created });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create project', error });
  }
});

// PUT /api/projects/:id - Update portfolio project
router.put('/:id', (req: Request, res: Response) => {
  try {
    const updated = db.updateProject(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, message: 'Project updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update project', error });
  }
});

// DELETE /api/projects/:id - Delete project
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const deleted = db.deleteProject(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete project', error });
  }
});

export default router;
