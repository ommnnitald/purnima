import React, { useState } from 'react';
import { SAMPLE_PROJECT_CODES, TrackableProject } from '../data/architecturalToolsData';
import { Clock, Search, CheckCircle2, AlertCircle, Calendar, MapPin, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectTrackerProps {
  isOpen?: boolean;
  onClose?: () => void;
  isInlineSection?: boolean;
}

export const ProjectTrackerModal: React.FC<ProjectTrackerProps> = ({
  isOpen = false,
  onClose,
  isInlineSection = false,
}) => {
  const [searchCode, setSearchCode] = useState('PS-849201');
  const [activeProject, setActiveProject] = useState<TrackableProject | null>(SAMPLE_PROJECT_CODES['PS-849201']);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = searchCode.trim().toUpperCase();
    if (SAMPLE_PROJECT_CODES[cleanCode]) {
      setActiveProject(SAMPLE_PROJECT_CODES[cleanCode]);
      setErrorMsg('');
    } else {
      // Fallback demo project for any entered code
      setActiveProject({
        code: cleanCode || 'PS-DEMO99',
        clientName: 'Valued UP Homeowner',
        city: 'Raebareli / Lucknow Region',
        propertyType: 'Turnkey Architectural Interior',
        startDate: '01 August 2026',
        estimatedHandover: '15 September 2026',
        currentProgressPercent: 60,
        currentPhaseName: 'Phase 2: BWP Marine Ply Carcass Fabrication',
        milestones: [
          {
            title: 'Phase 1: 2D Blueprint & Civil Electrical Approval',
            description: 'Site wall layout and electrical conduit mapping completed.',
            targetDay: 'Day 10',
            status: 'completed',
          },
          {
            title: 'Phase 2: BWP 710 Marine Ply Carcass Fabrication',
            description: 'Waterproof ply cutting & edge banding currently in factory production.',
            targetDay: 'Day 25',
            status: 'in-progress',
          },
          {
            title: 'Phase 3: Anti-Fingerprint Laminate & Gola Profile',
            description: 'Super-matte shutters and German soft-close fittings assembly.',
            targetDay: 'Day 38',
            status: 'upcoming',
          },
          {
            title: 'Phase 4: Director Inspection & 45-Day Key Handover',
            description: 'Final audit by Director Sudhanshu Sonkar & handover ceremony.',
            targetDay: 'Day 45',
            status: 'upcoming',
          },
        ],
      });
      setErrorMsg('');
    }
  };

  const content = (
    <div className="space-y-6 font-grotesk">
      {/* Header & Search Bar */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5" />
          <span>45-Day Milestone Tracker</span>
        </div>
        <h3 className="font-garamond text-3xl font-medium text-[#1d1625]">
          Track Your Live Handover Status
        </h3>
        <p className="text-xs text-[#49454b] font-light">
          Enter your 6-digit project booking reference code (or try sample code <strong className="text-[#1d1625]">PS-849201</strong> or <strong className="text-[#1d1625]">PS-392014</strong>):
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#49454b] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            placeholder="e.g. PS-849201"
            className="w-full pl-10 pr-4 py-3 rounded-full bg-[#F2EFE9] border border-[#cbc4cc] text-xs text-[#1d1625] font-semibold tracking-wider uppercase focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-full bg-[#1d1625] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#322a3a] transition-all cursor-pointer shrink-0 shadow-md"
        >
          Track
        </button>
      </form>

      {/* Project Status Card */}
      {activeProject && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-[#F2EFE9] border border-[#cbc4cc]/60 space-y-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#cbc4cc]/40 pb-4">
            <div>
              <div className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">
                Ref Code: {activeProject.code}
              </div>
              <h4 className="font-garamond text-2xl font-medium text-[#1d1625]">
                {activeProject.clientName}
              </h4>
              <div className="flex items-center gap-3 text-xs text-[#49454b] mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {activeProject.city}
                </span>
                <span>• {activeProject.propertyType}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-[#49454b]">Handover Guarantee</div>
              <div className="text-sm font-semibold text-[#1d1625]">
                {activeProject.estimatedHandover}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#1d1625]">{activeProject.currentPhaseName}</span>
              <span className="text-[#D4AF37]">{activeProject.currentProgressPercent}% Complete</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white border border-[#cbc4cc] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${activeProject.currentProgressPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#1d1625] to-[#D4AF37]"
              />
            </div>
          </div>

          {/* Milestone Steps */}
          <div className="space-y-3 pt-2">
            <div className="text-[11px] font-semibold text-[#1d1625] uppercase tracking-wider">
              45-Day Execution Milestones:
            </div>
            <div className="space-y-2">
              {activeProject.milestones.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs flex items-start justify-between gap-3 ${
                    step.status === 'completed'
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                      : step.status === 'in-progress'
                      ? 'bg-amber-50/90 border-[#D4AF37] text-[#1d1625] font-medium shadow-sm'
                      : 'bg-white/60 border-gray-200 text-gray-500'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : step.status === 'in-progress' ? (
                      <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5 animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-semibold">{step.title}</div>
                      <div className="text-[11px] font-light mt-0.5 opacity-90">{step.description}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-white/80 border shrink-0">
                    {step.targetDay}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );

  if (isInlineSection) {
    return (
      <section className="py-16 sm:py-24 bg-[#fbf9f7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#cbc4cc]/60 shadow-xl">
            {content}
          </div>
        </div>
      </section>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-[#1d1625] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#D4AF37]/40 shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#1d1625] text-white flex items-center justify-center cursor-pointer hover:bg-[#322a3a]"
            >
              <X className="w-5 h-5 text-[#D4AF37]" />
            </button>
            {content}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
