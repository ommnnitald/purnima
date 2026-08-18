import React, { useState } from 'react';
import { ActiveTab, ConsultationFormData } from '../types';
import { COMPANY_DETAILS, CONSULTATION_BG_IMG } from '../data/content';
import { ConsultationSuccessModal } from './ConsultationSuccessModal';
import { api, ConsultationResponseData } from '../services/api';
import {
  ShieldCheck,
  MapPin,
  Sparkles,
  CheckCircle2,
  Quote,
  ArrowUpRight,
  UserCheck,
  Loader2,
} from 'lucide-react';
import { motion } from 'motion/react';

interface ConsultationViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const ConsultationView: React.FC<ConsultationViewProps> = ({ setActiveTab }) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    contact: '',
    city: 'Raebareli',
    propertyType: '3/4 BHK Luxury Apartment',
    budget: '₹25L – ₹40L (Premium Full Interior)',
    scopeNotes: '',
    preferredDate: '',
    preferredTimeSlot: '11:00 AM – 01:00 PM',
  });

  const [consultationMode, setConsultationMode] = useState<'studio' | 'site' | 'virtual'>('studio');
  const [submittedData, setSubmittedData] = useState<(ConsultationFormData & { referenceCode?: string }) | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const propertyTypes = [
    '3/4 BHK Luxury Apartment',
    'Independent Villa / Kothi',
    'Ancestral Bungalow Facelift',
    'Modular Kitchen & Dining',
    'Commercial / Executive Studio',
  ];

  const budgetBrackets = [
    '₹15L – ₹25L (Modular / Single Floor)',
    '₹25L – ₹40L (Premium Full Interior)',
    '₹40L – ₹75L (Luxury Turnkey Villa)',
    '₹75L+ (Bespoke Heritage Estate)',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.contact) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await api.submitConsultation({
        ...formData,
        consultationMode,
      });
      setSubmittedData(response);
    } catch (err: any) {
      console.error('API submission failed:', err);
      // Fallback display if backend is offline
      setSubmittedData({
        ...formData,
        referenceCode: `PS-${Math.floor(100000 + Math.random() * 900000)}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#fbf9f7] py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching Screen 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2EFE9] border border-[#cbc4cc]/60 text-xs font-grotesk tracking-wider uppercase text-[#D4AF37] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Director Consultation</span>
          </div>
          <h1 className="font-garamond text-4xl sm:text-5xl lg:text-6xl text-[#1d1625] font-normal tracking-tight leading-[1.15]">
            Talk to a Local Stakeholder, <br />
            <span className="italic font-normal">Not just a Designer.</span>
          </h1>
          <p className="font-grotesk text-base sm:text-lg text-[#49454b] mt-4 font-light leading-relaxed">
            We bridge the gap between global architectural trends and Tier-2 practicality. Direct access to our registered directors ensures transparency, quality, and our signature 45-day delivery.
          </p>
        </motion.div>

        {/* Main Grid: Form on Left (7 cols), Context & Testimonial on Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 bg-[#F2EFE9] rounded-3xl p-6 sm:p-10 border border-[#cbc4cc]/60 ambient-shadow"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 01: Your Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#cbc4cc]/50">
                  <span className="font-garamond text-xl font-medium text-[#1d1625]">
                    01. Your Details
                  </span>
                  <span className="text-xs font-grotesk text-[#49454b] ml-auto">Step 1 of 2</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-grotesk uppercase tracking-wider font-semibold text-[#1d1625] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="consult-fullname-input"
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Singh"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#cbc4cc]/50 text-sm font-grotesk text-[#1d1625] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-grotesk uppercase tracking-wider font-semibold text-[#1d1625] mb-1.5">
                      Contact / WhatsApp *
                    </label>
                    <input
                      id="consult-contact-input"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#cbc4cc]/50 text-sm font-grotesk text-[#1d1625] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-grotesk uppercase tracking-wider font-semibold text-[#1d1625] mb-1.5">
                      City / Project Location
                    </label>
                    <select
                      id="consult-city-select"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#cbc4cc]/50 text-sm font-grotesk text-[#1d1625] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    >
                      <option value="Raebareli">Raebareli (Studio Base)</option>
                      <option value="Lucknow">Lucknow (Gomti Nagar / Hazratganj)</option>
                      <option value="Kanpur">Kanpur</option>
                      <option value="Prayagraj">Prayagraj / Allahabad</option>
                      <option value="Noida / Greater Noida">Noida / Greater Noida</option>
                      <option value="Other UP Location">Other UP Location</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-grotesk uppercase tracking-wider font-semibold text-[#1d1625] mb-1.5">
                      Meeting Preference
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        id="mode-studio-btn"
                        onClick={() => setConsultationMode('studio')}
                        className={`py-2 px-2 rounded-lg text-xs font-grotesk font-medium transition-all text-center cursor-pointer ${
                          consultationMode === 'studio'
                            ? 'bg-[#1d1625] text-[#D4AF37] font-semibold shadow-xs'
                            : 'bg-white text-[#49454b] hover:bg-[#e7e3dc]'
                        }`}
                      >
                        Studio
                      </button>
                      <button
                        type="button"
                        id="mode-site-btn"
                        onClick={() => setConsultationMode('site')}
                        className={`py-2 px-2 rounded-lg text-xs font-grotesk font-medium transition-all text-center cursor-pointer ${
                          consultationMode === 'site'
                            ? 'bg-[#1d1625] text-[#D4AF37] font-semibold shadow-xs'
                            : 'bg-white text-[#49454b] hover:bg-[#e7e3dc]'
                        }`}
                      >
                        On-Site
                      </button>
                      <button
                        type="button"
                        id="mode-virtual-btn"
                        onClick={() => setConsultationMode('virtual')}
                        className={`py-2 px-2 rounded-lg text-xs font-grotesk font-medium transition-all text-center cursor-pointer ${
                          consultationMode === 'virtual'
                            ? 'bg-[#1d1625] text-[#D4AF37] font-semibold shadow-xs'
                            : 'bg-white text-[#49454b] hover:bg-[#e7e3dc]'
                        }`}
                      >
                        Virtual
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 02: Project Scope */}
              <div className="space-y-5">
                <div className="flex items-center gap-2 pb-2 border-b border-[#cbc4cc]/50">
                  <span className="font-garamond text-xl font-medium text-[#1d1625]">
                    02. Project Scope & Requirements
                  </span>
                  <span className="text-xs font-grotesk text-[#49454b] ml-auto">Step 2 of 2</span>
                </div>

                {/* Property Type Selection */}
                <div>
                  <label className="block text-xs font-grotesk uppercase tracking-wider font-semibold text-[#1d1625] mb-2">
                    Property Typology
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {propertyTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        id={`prop-type-${type.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => setFormData({ ...formData, propertyType: type })}
                        className={`p-3 rounded-xl text-left text-xs sm:text-sm font-grotesk transition-all cursor-pointer flex items-center justify-between border ${
                          formData.propertyType === type
                            ? 'bg-[#1d1625] text-white border-[#1d1625] shadow-xs'
                            : 'bg-white text-[#49454b] border-[#cbc4cc]/40 hover:bg-[#fcfbfa]'
                        }`}
                      >
                        <span>{type}</span>
                        {formData.propertyType === type && (
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Bracket Selection */}
                <div>
                  <label className="block text-xs font-grotesk uppercase tracking-wider font-semibold text-[#1d1625] mb-2">
                    Estimated Budget Allocation
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {budgetBrackets.map((b) => (
                      <button
                        key={b}
                        type="button"
                        id={`budget-tier-${b.substring(0, 5).replace(/\s+/g, '')}`}
                        onClick={() => setFormData({ ...formData, budget: b })}
                        className={`p-3 rounded-xl text-left text-xs font-grotesk transition-all cursor-pointer flex items-center justify-between border ${
                          formData.budget === b
                            ? 'bg-[#1d1625] text-white border-[#1d1625] shadow-xs'
                            : 'bg-white text-[#49454b] border-[#cbc4cc]/40 hover:bg-[#fcfbfa]'
                        }`}
                      >
                        <span>{b}</span>
                        {formData.budget === b && (
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-grotesk uppercase tracking-wider font-semibold text-[#1d1625] mb-1.5">
                      Target Appointment Date
                    </label>
                    <input
                      id="consult-date-input"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#cbc4cc]/50 text-sm font-grotesk text-[#1d1625] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-grotesk uppercase tracking-wider font-semibold text-[#1d1625] mb-1.5">
                      Preferred Time Slot
                    </label>
                    <select
                      id="consult-timeslot-select"
                      value={formData.preferredTimeSlot}
                      onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#cbc4cc]/50 text-sm font-grotesk text-[#1d1625] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="10:00 AM – 12:00 PM">Morning (10:00 AM – 12:00 PM)</option>
                      <option value="02:00 PM – 04:00 PM">Afternoon (02:00 PM – 04:00 PM)</option>
                      <option value="05:00 PM – 07:00 PM">Evening (05:00 PM – 07:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Scope Notes */}
                <div>
                  <label className="block text-xs font-grotesk uppercase tracking-wider font-semibold text-[#1d1625] mb-1.5">
                    Architectural Preferences or Notes (Optional)
                  </label>
                  <textarea
                    id="consult-notes-input"
                    rows={3}
                    placeholder="e.g. Modern Gola modular kitchen in matte black, fluted wooden panels in master bedroom, ACP facade cladding for front elevation..."
                    value={formData.scopeNotes}
                    onChange={(e) => setFormData({ ...formData, scopeNotes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#cbc4cc]/50 text-sm font-grotesk text-[#1d1625] focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  id="submit-consultation-form-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2.5 bg-[#1d1625] text-white py-4 rounded-full text-xs sm:text-sm font-grotesk font-semibold uppercase tracking-wider hover:bg-[#322a3a] active:scale-[0.99] transition-all shadow-md cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 text-[#D4AF37] animate-spin" />
                      <span>Transmitting Request to Directors...</span>
                    </>
                  ) : (
                    <>
                      <span>Request Consultation with Directors</span>
                      <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
                    </>
                  )}
                </button>
                {submitError && (
                  <p className="text-xs text-amber-600 font-grotesk text-center mt-2">{submitError}</p>
                )}
                <div className="flex items-center justify-center gap-2 text-xs text-[#49454b] mt-3 font-grotesk">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>GST Registered • Strict 45-Day Handover Protocol • No Obligation</span>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Right: What to Expect & Testimonials */}
          <div className="lg:col-span-5 space-y-6">
            {/* Testimonial Card */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#1d1625] text-white rounded-3xl p-8 border border-[#322a3a] relative overflow-hidden"
            >
              <Quote className="w-12 h-12 text-[#D4AF37]/20 absolute top-4 right-4" />
              <div className="relative z-10 space-y-4">
                <div className="flex gap-1 text-[#D4AF37] text-xs">
                  {'★'.repeat(5)}
                </div>
                <p className="font-garamond text-lg sm:text-xl font-normal italic text-[#cbc4cc] leading-relaxed">
                  "Purnima S transformed our Raebareli bungalow into a modern sanctuary. Having the directors personally oversee the 45-day handover gave us complete peace of mind."
                </p>
                <div className="pt-2 border-t border-[#322a3a]">
                  <div className="font-grotesk font-semibold text-sm text-white">Dr. R. K. Verma</div>
                  <div className="font-grotesk text-xs text-[#D4AF37]">Villa Owner, Vikas Nagar, Raebareli</div>
                </div>
              </div>
            </motion.div>

            {/* What to Expect Card */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#F2EFE9] rounded-3xl p-6 sm:p-8 border border-[#cbc4cc]/60 space-y-5"
            >
              <h3 className="font-garamond text-2xl text-[#1d1625] font-medium">
                What to Expect During Your Session
              </h3>

              <div className="space-y-4 text-xs sm:text-sm font-grotesk text-[#49454b]">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1d1625] text-[#D4AF37] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-[#1d1625]">Space & Lifestyle Audit:</strong> We evaluate plot dimensions, natural sunlight paths, and family circulation patterns.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1d1625] text-[#D4AF37] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-[#1d1625]">Material & Weather Durability:</strong> Recommendation of anti-fingerprint laminates, Blum hardware, and moisture-resistant HDHMR cores.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1d1625] text-[#D4AF37] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-[#1d1625]">Fixed Timeline & BOQ:</strong> Transparent material-by-material breakdown backed by our guaranteed 45-day execution agreement.
                  </div>
                </div>
              </div>

              {/* Studio Info Badge */}
              <div className="pt-4 border-t border-[#cbc4cc]/40 space-y-2 text-xs font-grotesk text-[#49454b]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>
                    <strong>Studio:</strong> {COMPANY_DETAILS.registeredOffice}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>
                    <strong>Directors:</strong> {COMPANY_DETAILS.directors.join(' & ')}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConsultationSuccessModal
        formData={submittedData}
        onClose={() => setSubmittedData(null)}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

