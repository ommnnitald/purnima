import fs from 'fs';
import path from 'path';
import { PORTFOLIO_PROJECTS, SERVICES_DATA } from '../src/data/content';
import { PortfolioProject, DesignService, ConsultationFormData } from '../src/types';

export interface ConsultationRecord extends ConsultationFormData {
  id: string;
  referenceCode: string;
  consultationMode: 'studio' | 'site' | 'virtual';
  status: 'Pending' | 'Contacted' | 'Site Visit Scheduled' | 'BOQ Finalized' | 'Completed' | 'Cancelled';
  createdAt: string;
  updatedAt: string;
  directorNotes?: string;
  emailDeliveryStatus?: 'sent' | 'failed' | 'pending';
  emailError?: string;
}

export interface EstimateRecord {
  id: string;
  propertyType: string;
  areaSqFt: number;
  qualityTier: 'Standard' | 'Premium' | 'Bespoke Heritage';
  city: string;
  civilCost: number;
  woodworkCost: number;
  modularKitchenCost: number;
  lightingCost: number;
  hardwareCost: number;
  facadeCost: number;
  totalEstimatedMin: number;
  totalEstimatedMax: number;
  createdAt: string;
}

const DB_DIR = path.resolve(process.cwd(), 'data');
const CONSULTATIONS_FILE = path.join(DB_DIR, 'consultations.json');
const PROJECTS_FILE = path.join(DB_DIR, 'projects.json');
const SERVICES_FILE = path.join(DB_DIR, 'services.json');
const ESTIMATES_FILE = path.join(DB_DIR, 'estimates.json');

// Ensure database directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Helper to read JSON file
function readJsonFile<T>(filePath: string, defaultData: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as T;
    }
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
  }
  // Initialize file with default data if missing or corrupted
  fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
  return defaultData;
}

// Helper to write JSON file
function writeJsonFile<T>(filePath: string, data: T): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Initial Data Seeding
const initialConsultations: ConsultationRecord[] = [
  {
    id: 'consult-1',
    referenceCode: 'PS-849201',
    fullName: 'Dr. R. K. Verma',
    email: 'rkverma@example.com',
    contact: '+91 94150 12345',
    city: 'Raebareli',
    propertyType: 'Independent Villa / Kothi',
    budget: '₹40L – ₹75L (Luxury Turnkey Villa)',
    consultationMode: 'site',
    status: 'Completed',
    scopeNotes: 'Full interior remodeling + ACP exterior facade cladding with Fundermax panels.',
    preferredDate: '2026-07-10',
    preferredTimeSlot: '11:00 AM – 01:00 PM',
    createdAt: '2026-07-01T10:30:00.000Z',
    updatedAt: '2026-07-15T16:00:00.000Z',
    directorNotes: 'Project completed in 42 days. Client praised direct stakeholder communication.',
    emailDeliveryStatus: 'sent',
  },
  {
    id: 'consult-2',
    referenceCode: 'PS-391024',
    fullName: 'Ananya Srivastava',
    email: 'ananya@example.com',
    contact: '+91 98390 67890',
    city: 'Lucknow',
    propertyType: '3/4 BHK Luxury Apartment',
    budget: '₹25L – ₹40L (Premium Full Interior)',
    consultationMode: 'studio',
    status: 'Site Visit Scheduled',
    scopeNotes: 'Gola profile modular kitchen with super-matte finish & master suite panelling.',
    preferredDate: '2026-08-20',
    preferredTimeSlot: '02:00 PM – 04:00 PM',
    createdAt: '2026-08-15T14:15:00.000Z',
    updatedAt: '2026-08-16T09:00:00.000Z',
    directorNotes: 'Site visit scheduled for Gomti Nagar penthouse.',
    emailDeliveryStatus: 'sent',
  },
];

class Database {
  private consultations: ConsultationRecord[];
  private projects: PortfolioProject[];
  private services: DesignService[];
  private estimates: EstimateRecord[];

  constructor() {
    this.consultations = readJsonFile<ConsultationRecord[]>(CONSULTATIONS_FILE, initialConsultations);
    this.projects = readJsonFile<PortfolioProject[]>(PROJECTS_FILE, PORTFOLIO_PROJECTS);
    this.services = readJsonFile<DesignService[]>(SERVICES_FILE, SERVICES_DATA);
    this.estimates = readJsonFile<EstimateRecord[]>(ESTIMATES_FILE, []);
  }

  // --- CONSULTATIONS API ---
  getConsultations(filter?: { status?: string; city?: string; search?: string }): ConsultationRecord[] {
    let list = [...this.consultations];

    if (filter?.status && filter.status !== 'all') {
      list = list.filter((c) => c.status.toLowerCase() === filter.status!.toLowerCase());
    }

    if (filter?.city && filter.city !== 'all') {
      list = list.filter((c) => c.city.toLowerCase().includes(filter.city!.toLowerCase()));
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(
        (c) =>
          c.fullName.toLowerCase().includes(q) ||
          c.contact.toLowerCase().includes(q) ||
          c.referenceCode.toLowerCase().includes(q) ||
          c.propertyType.toLowerCase().includes(q)
      );
    }

    // Sort newest first
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getConsultationById(id: string): ConsultationRecord | undefined {
    return this.consultations.find((c) => c.id === id || c.referenceCode === id);
  }

  createConsultation(data: Omit<ConsultationRecord, 'id' | 'referenceCode' | 'status' | 'createdAt' | 'updatedAt'>): ConsultationRecord {
    const referenceCode = `PS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRecord: ConsultationRecord = {
      ...data,
      id: `consult-${Date.now()}`,
      referenceCode,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.consultations.unshift(newRecord);
    writeJsonFile(CONSULTATIONS_FILE, this.consultations);
    return newRecord;
  }

  updateConsultation(id: string, updates: Partial<ConsultationRecord>): ConsultationRecord | undefined {
    const index = this.consultations.findIndex((c) => c.id === id || c.referenceCode === id);
    if (index === -1) return undefined;

    this.consultations[index] = {
      ...this.consultations[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    writeJsonFile(CONSULTATIONS_FILE, this.consultations);
    return this.consultations[index];
  }

  deleteConsultation(id: string): boolean {
    const initialLen = this.consultations.length;
    this.consultations = this.consultations.filter((c) => c.id !== id && c.referenceCode !== id);
    if (this.consultations.length !== initialLen) {
      writeJsonFile(CONSULTATIONS_FILE, this.consultations);
      return true;
    }
    return false;
  }

  // --- PROJECTS API ---
  getProjects(category?: string): PortfolioProject[] {
    if (!category || category === 'all') {
      return this.projects;
    }
    return this.projects.filter((p) => p.category === category);
  }

  getProjectById(id: string): PortfolioProject | undefined {
    return this.projects.find((p) => p.id === id);
  }

  createProject(project: PortfolioProject): PortfolioProject {
    this.projects.unshift(project);
    writeJsonFile(PROJECTS_FILE, this.projects);
    return project;
  }

  updateProject(id: string, updates: Partial<PortfolioProject>): PortfolioProject | undefined {
    const index = this.projects.findIndex((p) => p.id === id);
    if (index === -1) return undefined;

    this.projects[index] = {
      ...this.projects[index],
      ...updates,
    };

    writeJsonFile(PROJECTS_FILE, this.projects);
    return this.projects[index];
  }

  deleteProject(id: string): boolean {
    const initialLen = this.projects.length;
    this.projects = this.projects.filter((p) => p.id !== id);
    if (this.projects.length !== initialLen) {
      writeJsonFile(PROJECTS_FILE, this.projects);
      return true;
    }
    return false;
  }

  // --- SERVICES API ---
  getServices(): DesignService[] {
    return this.services;
  }

  // --- ESTIMATES API ---
  saveEstimate(estimate: Omit<EstimateRecord, 'id' | 'createdAt'>): EstimateRecord {
    const record: EstimateRecord = {
      ...estimate,
      id: `est-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.estimates.unshift(record);
    writeJsonFile(ESTIMATES_FILE, this.estimates);
    return record;
  }

  getEstimates(): EstimateRecord[] {
    return this.estimates;
  }
}

export const db = new Database();
