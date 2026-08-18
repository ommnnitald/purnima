import React from 'react';
import { ActiveTab, ConsultationFormData } from '../types';
import { COMPANY_DETAILS } from '../data/content';
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConsultationSuccessModalProps {
  formData: ConsultationFormData | null;
  onClose: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const ConsultationSuccessModal: React.FC<ConsultationSuccessModalProps> = ({
  formData,
  onClose,
  setActiveTab,
}) => {
  if (!formData) return null;

  const consultationId = (formData as any).referenceCode || `PS-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#1d1625]/85 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#fbf9f7] rounded-3xl overflow-hidden border border-[#cbc4cc]/60 shadow-2xl p-6 sm:p-10 text-[#1d1625]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1, stiffness: 300, damping: 20 }}
            className="w-16 h-16 rounded-full bg-[#1d1625] text-[#D4AF37] flex items-center justify-center mx-auto mb-6 shadow-md"
          >
            <CheckCircle2 className="w-9 h-9" />
          </motion.div>

          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-grotesk font-semibold uppercase tracking-widest text-[#D4AF37]">
              Consultation Confirmed • Ref: {consultationId}
            </span>
            <h2 className="font-garamond text-3xl sm:text-4xl font-medium text-[#1d1625]">
              Thank You, {formData.fullName}
            </h2>
            <p className="font-grotesk text-sm sm:text-base text-[#49454b] font-light max-w-lg mx-auto">
              Your request has been routed directly to director <strong>Sudhanshu Sonkar / Purnima Sonkar</strong>. We will reach out to <strong>{formData.contact}</strong> within 24 hours.
            </p>
          </div>

          {/* Appointment Summary Box */}
          <div className="bg-[#F2EFE9] rounded-2xl p-6 border border-[#cbc4cc]/50 space-y-3 mb-8 text-xs sm:text-sm font-grotesk">
            <div className="flex justify-between items-center pb-2 border-b border-[#cbc4cc]/40">
              <span className="text-[#49454b]">Property Type:</span>
              <span className="font-semibold text-[#1d1625]">{formData.propertyType}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[#cbc4cc]/40">
              <span className="text-[#49454b]">City / Location:</span>
              <span className="font-semibold text-[#1d1625]">{formData.city}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[#cbc4cc]/40">
              <span className="text-[#49454b]">Budget Bracket:</span>
              <span className="font-semibold text-[#1d1625]">{formData.budget}</span>
            </div>
            {formData.preferredDate && (
              <div className="flex justify-between items-center">
                <span className="text-[#49454b]">Preferred Date / Slot:</span>
                <span className="font-semibold text-[#1d1625]">
                  {formData.preferredDate} ({formData.preferredTimeSlot || 'Morning'})
                </span>
              </div>
            )}
          </div>

          {/* Director Note */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#D4AF37]/40 mb-8">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div className="text-xs font-grotesk text-[#49454b] leading-relaxed">
              <strong className="text-[#1d1625]">Direct Stakeholder Guarantee:</strong> Your initial feasibility consultation includes preliminary space planning, material durability advisory for UP humidity/dust, and fixed timeline estimation with zero obligation.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              id="success-view-portfolio-btn"
              onClick={() => {
                onClose();
                setActiveTab('portfolio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F2EFE9] hover:bg-[#e7e3dc] text-[#1d1625] px-6 py-3 rounded-full text-xs font-grotesk font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>Explore Portfolio in the meantime</span>
            </button>
            <button
              id="success-done-btn"
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1d1625] text-white px-8 py-3 rounded-full text-xs font-grotesk font-semibold uppercase tracking-wider hover:bg-[#322a3a] transition-all cursor-pointer shadow-sm"
            >
              <span>Done</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

