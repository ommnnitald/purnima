import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import consultationsRouter from './routes/consultations';
import projectsRouter from './routes/projects';
import servicesRouter from './routes/services';
import estimateRouter from './routes/estimate';
import aiRouter from './routes/ai';
import { COMPANY_DETAILS } from '../src/data/content';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS headers for Vite dev server & production origin
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    system: 'Purnima S Exteriors & Interiors Backend API Engine',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Company details endpoint
app.get('/api/company', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: COMPANY_DETAILS,
  });
});

// API Routes
app.use('/api/consultations', consultationsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/estimate', estimateRouter);
app.use('/api/ai', aiRouter);

// 404 Handler for API routes
app.use('/api/*', (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: `API endpoint ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Purnima S Backend API Server running on port ${PORT}`);
  console.log(`👉 Health check: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});

export default app;
