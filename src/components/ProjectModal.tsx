import React from 'react';
import { PortfolioProject, ActiveTab } from '../types';
import { X, MapPin, Clock, IndianRupee, Layers, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, setActiveTab }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#1d1625]/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#fbf9f7] rounded-3xl overflow-hidden border border-[#cbc4cc]/60 shadow-2xl my-8 text-[#1d1625]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            id="close-project-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#1d1625]/80 hover:bg-[#1d1625] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Media Top */}
          <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-[#1d1625]">
            <img
              src={project.imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d1625]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex gap-2 mb-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#D4AF37] text-[#1d1625] px-3 py-0.5 rounded-full text-xs font-grotesk font-semibold uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="font-garamond text-2xl sm:text-4xl text-white font-medium">
                  {project.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Key Metric Tags */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#F2EFE9] border border-[#cbc4cc]/40">
              {project.location && (
                <div className="flex items-center gap-2 text-xs font-grotesk">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <div>
                    <div className="text-[#49454b]/70 uppercase text-[10px] tracking-wider">Location</div>
                    <div className="font-semibold text-[#1d1625]">{project.location}</div>
                  </div>
                </div>
              )}
              {project.timeline && (
                <div className="flex items-center gap-2 text-xs font-grotesk">
                  <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <div>
                    <div className="text-[#49454b]/70 uppercase text-[10px] tracking-wider">Turnaround</div>
                    <div className="font-semibold text-[#1d1625]">{project.timeline} (Handed Over)</div>
                  </div>
                </div>
              )}
              {project.budgetRange && (
                <div className="flex items-center gap-2 text-xs font-grotesk col-span-2 sm:col-span-1">
                  <IndianRupee className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <div>
                    <div className="text-[#49454b]/70 uppercase text-[10px] tracking-wider">Budget Range</div>
                    <div className="font-semibold text-[#1d1625]">{project.budgetRange}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h4 className="font-garamond text-xl text-[#1d1625] font-medium mb-2">Design Concept & Execution</h4>
              <p className="font-grotesk text-sm sm:text-base text-[#49454b] font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Materials Specification */}
            {project.materials && project.materials.length > 0 && (
              <div>
                <h4 className="font-garamond text-xl text-[#1d1625] font-medium mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#D4AF37]" />
                  <span>Materials & Hardware Specifications</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.materials.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-[#F2EFE9] text-xs font-grotesk text-[#1d1625] border border-[#cbc4cc]/40"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h4 className="font-garamond text-xl text-[#1d1625] font-medium mb-3">
                  Architectural Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-grotesk text-[#1d1625]">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Footer CTA */}
            <div className="pt-6 border-t border-[#cbc4cc]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#49454b] font-grotesk text-center sm:text-left">
                Guaranteed 45-day turnaround & GST registered contract.
              </div>
              <button
                id="modal-book-similar-btn"
                onClick={() => {
                  onClose();
                  setActiveTab('consultation');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1d1625] text-white px-6 py-3 rounded-full text-xs font-grotesk font-semibold uppercase tracking-wider hover:bg-[#322a3a] transition-all cursor-pointer shadow-sm"
              >
                <span>Consult on Similar Property</span>
                <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

