import React, { useState, useEffect } from 'react';
import { api, ConsultationResponseData } from '../services/api';
import { PortfolioProject } from '../types';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Calendar,
  MapPin,
  Phone,
  FileText,
  X,
  Plus,
  RefreshCw,
  Shield,
  Save,
  Trash2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DirectorDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DirectorDashboardModal: React.FC<DirectorDashboardModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'addProject'>('leads');
  const [consultations, setConsultations] = useState<ConsultationResponseData[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, contacted: 0, scheduled: 0, completed: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<ConsultationResponseData | null>(null);
  const [leadNotes, setLeadNotes] = useState('');
  const [leadStatus, setLeadStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // New Project Form State
  const [newProject, setNewProject] = useState<Partial<PortfolioProject>>({
    title: '',
    category: 'living',
    tags: ['Living'],
    description: '',
    imageUrl: '',
    location: 'Raebareli',
    timeline: '45 Days',
    budgetRange: '₹25L – ₹35L',
  });
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projectMessage, setProjectMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchConsultations();
    }
  }, [isOpen, filterStatus]);

  const fetchConsultations = async () => {
    setIsLoading(true);
    try {
      const res = await api.getConsultations({
        status: filterStatus !== 'all' ? filterStatus : undefined,
        search: searchQuery || undefined,
      });
      setConsultations(res.data);
      setStats(res.stats);
    } catch (err) {
      console.error('Failed to fetch consultations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLead = (lead: ConsultationResponseData) => {
    setSelectedLead(lead);
    setLeadNotes(lead.directorNotes || '');
    setLeadStatus(lead.status);
  };

  const handleUpdateLead = async () => {
    if (!selectedLead) return;
    setIsUpdating(true);
    try {
      const updated = await api.updateConsultationStatus(selectedLead.id, {
        status: leadStatus,
        directorNotes: leadNotes,
      });
      setSelectedLead(updated);
      fetchConsultations();
    } catch (err) {
      console.error('Failed to update lead:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this consultation lead?')) return;
    try {
      await api.deleteConsultation(id);
      setSelectedLead(null);
      fetchConsultations();
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.imageUrl) return;
    setIsCreatingProject(true);
    setProjectMessage(null);
    try {
      await api.createProject(newProject);
      setProjectMessage('New portfolio project added successfully!');
      setNewProject({
        title: '',
        category: 'living',
        tags: ['Living'],
        description: '',
        imageUrl: '',
        location: 'Raebareli',
        timeline: '45 Days',
        budgetRange: '₹25L – ₹35L',
      });
    } catch (err: any) {
      setProjectMessage(err.message || 'Failed to create project.');
    } finally {
      setIsCreatingProject(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#1d1625]/90 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-[#fbf9f7] rounded-3xl overflow-hidden border border-[#cbc4cc]/60 shadow-2xl text-[#1d1625]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="bg-[#1d1625] text-white p-6 sm:p-8 flex items-center justify-between border-b border-[#322a3a]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#1d1625] flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-grotesk tracking-widest uppercase text-[#D4AF37]">
                  Director Access • Purnima & Sudhanshu Sonkar
                </span>
                <h2 className="font-garamond text-2xl sm:text-3xl font-medium">Director Lead & Portfolio Management</h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#322a3a] hover:bg-[#49454b] flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stats Bar */}
          <div className="bg-[#F2EFE9] border-b border-[#cbc4cc]/50 px-6 py-4 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-grotesk">
            <div className="p-2.5 rounded-xl bg-white border border-[#cbc4cc]/40">
              <span className="text-[#49454b]">Total Leads</span>
              <div className="text-lg font-semibold text-[#1d1625]">{stats.total}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-amber-800">Pending Review</span>
              <div className="text-lg font-semibold text-amber-900">{stats.pending}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
              <span className="text-blue-800">Contacted</span>
              <div className="text-lg font-semibold text-blue-900">{stats.contacted}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200">
              <span className="text-purple-800">Site Visit Scheduled</span>
              <div className="text-lg font-semibold text-purple-900">{stats.scheduled}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-emerald-800">Handover Completed</span>
              <div className="text-lg font-semibold text-emerald-900">{stats.completed}</div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex border-b border-[#cbc4cc]/50 px-6 bg-[#F2EFE9] pt-2">
            <button
              onClick={() => setActiveTab('leads')}
              className={`py-3 px-6 text-xs sm:text-sm font-grotesk font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'border-[#D4AF37] text-[#1d1625] bg-white rounded-t-xl'
                  : 'border-transparent text-[#49454b] hover:text-[#1d1625]'
              }`}
            >
              Consultation Leads ({stats.total})
            </button>
            <button
              onClick={() => setActiveTab('addProject')}
              className={`py-3 px-6 text-xs sm:text-sm font-grotesk font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeTab === 'addProject'
                  ? 'border-[#D4AF37] text-[#1d1625] bg-white rounded-t-xl'
                  : 'border-transparent text-[#49454b] hover:text-[#1d1625]'
              }`}
            >
              Add Portfolio Showcase Project
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'leads' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left (5 cols): Leads List & Search */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-[#49454b] absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Search name, phone, ref..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && fetchConsultations()}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#cbc4cc]/50 text-xs font-grotesk"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-white border border-[#cbc4cc]/50 text-xs font-grotesk"
                    >
                      <option value="all">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                    {isLoading ? (
                      <div className="p-8 text-center text-xs font-grotesk text-[#49454b]">
                        <RefreshCw className="w-5 h-5 text-[#D4AF37] animate-spin mx-auto mb-2" />
                        Loading lead records...
                      </div>
                    ) : consultations.length === 0 ? (
                      <div className="p-8 text-center text-xs font-grotesk text-[#49454b] bg-white rounded-xl border border-[#cbc4cc]/40">
                        No consultation leads match your query.
                      </div>
                    ) : (
                      consultations.map((lead) => (
                        <div
                          key={lead.id}
                          onClick={() => handleSelectLead(lead)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer ${
                            selectedLead?.id === lead.id
                              ? 'bg-[#1d1625] text-white border-[#1d1625] shadow-md'
                              : 'bg-white text-[#1d1625] border-[#cbc4cc]/40 hover:bg-[#F2EFE9]'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-grotesk font-semibold text-[#D4AF37]">
                              {lead.referenceCode}
                            </span>
                            <span
                              className={`text-[10px] font-grotesk uppercase px-2 py-0.5 rounded-full font-semibold ${
                                lead.status === 'Pending'
                                  ? 'bg-amber-100 text-amber-800'
                                  : lead.status === 'Completed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {lead.status}
                            </span>
                          </div>
                          <div className="font-garamond text-lg font-medium">{lead.fullName}</div>
                          <div className="text-xs font-grotesk opacity-80">{lead.contact} • {lead.city}</div>
                          <div className="text-[11px] font-grotesk opacity-70 mt-1">{lead.propertyType}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Right (7 cols): Selected Lead Details & Actions */}
                <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#cbc4cc]/60 space-y-6">
                  {selectedLead ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-[#cbc4cc]/40 pb-4">
                        <div>
                          <span className="text-xs font-grotesk uppercase font-semibold text-[#D4AF37]">
                            Ref: {selectedLead.referenceCode} • Received {new Date(selectedLead.createdAt).toLocaleDateString()}
                          </span>
                          <h3 className="font-garamond text-2xl font-medium text-[#1d1625]">
                            {selectedLead.fullName}
                          </h3>
                        </div>
                        <button
                          onClick={() => handleDeleteLead(selectedLead.id)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-grotesk flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs font-grotesk bg-[#F2EFE9] p-4 rounded-xl border border-[#cbc4cc]/40">
                        <div>
                          <span className="text-[#49454b]">Phone / WhatsApp:</span>
                          <div className="font-semibold text-[#1d1625]">{selectedLead.contact}</div>
                        </div>
                        <div>
                          <span className="text-[#49454b]">City / Location:</span>
                          <div className="font-semibold text-[#1d1625]">{selectedLead.city}</div>
                        </div>
                        <div>
                          <span className="text-[#49454b]">Property Typology:</span>
                          <div className="font-semibold text-[#1d1625]">{selectedLead.propertyType}</div>
                        </div>
                        <div>
                          <span className="text-[#49454b]">Estimated Budget:</span>
                          <div className="font-semibold text-[#1d1625]">{selectedLead.budget}</div>
                        </div>
                        <div>
                          <span className="text-[#49454b]">Meeting Preference:</span>
                          <div className="font-semibold text-[#1d1625] capitalize">{selectedLead.consultationMode} Session</div>
                        </div>
                        <div>
                          <span className="text-[#49454b]">Target Slot:</span>
                          <div className="font-semibold text-[#1d1625]">{selectedLead.preferredDate || 'N/A'} ({selectedLead.preferredTimeSlot})</div>
                        </div>
                      </div>

                      {selectedLead.scopeNotes && (
                        <div>
                          <span className="block text-xs font-grotesk uppercase font-semibold text-[#1d1625] mb-1">Client Notes / Scope</span>
                          <div className="p-3 bg-[#F2EFE9] rounded-xl text-xs font-grotesk text-[#49454b] italic">
                            "{selectedLead.scopeNotes}"
                          </div>
                        </div>
                      )}

                      {/* Director Actions & Status update */}
                      <div className="pt-4 border-t border-[#cbc4cc]/40 space-y-4">
                        <h4 className="font-garamond text-lg font-medium text-[#1d1625]">Director Status & Internal Notes</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-grotesk uppercase font-semibold text-[#1d1625] mb-1">
                              Update Lead Status
                            </label>
                            <select
                              value={leadStatus}
                              onChange={(e) => setLeadStatus(e.target.value)}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#cbc4cc]/50 text-xs font-grotesk text-[#1d1625]"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                              <option value="BOQ Finalized">BOQ Finalized</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-grotesk uppercase font-semibold text-[#1d1625] mb-1">
                              Internal Director Notes
                            </label>
                            <textarea
                              rows={2}
                              placeholder="e.g. Discussed site dimensions with Sudhanshu. Site visit fixed for Thursday..."
                              value={leadNotes}
                              onChange={(e) => setLeadNotes(e.target.value)}
                              className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#cbc4cc]/50 text-xs font-grotesk text-[#1d1625]"
                            />
                          </div>
                        </div>

                        <button
                          onClick={handleUpdateLead}
                          disabled={isUpdating}
                          className="w-full flex items-center justify-center gap-2 bg-[#1d1625] text-white py-3 rounded-xl text-xs font-grotesk uppercase font-semibold hover:bg-[#322a3a] transition-all cursor-pointer"
                        >
                          <Save className="w-4 h-4 text-[#D4AF37]" />
                          <span>Save Status & Notes</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center text-xs font-grotesk text-[#49454b]">
                      Select a consultation lead from the left list to review details and update status.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Add New Project Tab */
              <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-[#cbc4cc]/60 space-y-6">
                <h3 className="font-garamond text-2xl text-[#1d1625]">Add New Showcase Project to Portfolio</h3>

                <form onSubmit={handleCreateProject} className="space-y-4 text-xs font-grotesk">
                  <div>
                    <label className="block uppercase font-semibold text-[#1d1625] mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Civil Lines Heritage Villa Transformation"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#cbc4cc]/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase font-semibold text-[#1d1625] mb-1">Category *</label>
                      <select
                        value={newProject.category}
                        onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#cbc4cc]/50"
                      >
                        <option value="living">Living Spaces</option>
                        <option value="bedroom">Bedrooms</option>
                        <option value="kitchen">Kitchens</option>
                        <option value="exterior">Exteriors</option>
                      </select>
                    </div>

                    <div>
                      <label className="block uppercase font-semibold text-[#1d1625] mb-1">Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Raebareli / Lucknow"
                        value={newProject.location}
                        onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#cbc4cc]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-[#1d1625] mb-1">Image URL *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://..."
                      value={newProject.imageUrl}
                      onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#cbc4cc]/50"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-[#1d1625] mb-1">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Describe the architectural highlights, material specs, and transformation details..."
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#cbc4cc]/50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isCreatingProject}
                    className="w-full flex items-center justify-center gap-2 bg-[#1d1625] text-white py-3.5 rounded-xl text-xs font-grotesk uppercase font-semibold hover:bg-[#322a3a] transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#D4AF37]" />
                    <span>Publish Project to Portfolio</span>
                  </button>

                  {projectMessage && (
                    <div className="p-3 bg-[#F2EFE9] text-center text-xs font-grotesk font-semibold text-[#1d1625] rounded-xl">
                      {projectMessage}
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
