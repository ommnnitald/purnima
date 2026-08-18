import React, { useState } from 'react';
import { api, AIAdviceResult, BOQEstimateResult } from '../services/api';
import { ActiveTab } from '../types';
import { Sparkles, X, Calculator, Bot, ArrowRight, CheckCircle2, ShieldCheck, RefreshCw, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const AIAdvisorModal: React.FC<AIAdvisorModalProps> = ({ isOpen, onClose, setActiveTab }) => {
  const [tab, setTab] = useState<'ai' | 'calculator'>('ai');

  // AI Advisory State
  const [propertyType, setPropertyType] = useState('3/4 BHK Luxury Apartment');
  const [areaSqFt, setAreaSqFt] = useState<number>(1800);
  const [city, setCity] = useState('Raebareli');
  const [preferredStyle, setPreferredStyle] = useState('Quiet Luxury & Japandi Minimal');
  const [userPrompt, setUserPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIAdviceResult | null>(null);

  // BOQ Calculator State
  const [calcTier, setCalcTier] = useState<'Standard' | 'Premium' | 'Bespoke Heritage'>('Premium');
  const [includeFacade, setIncludeFacade] = useState(true);
  const [includeKitchen, setIncludeKitchen] = useState(true);
  const [isCalcLoading, setIsCalcLoading] = useState(false);
  const [calcResult, setCalcResult] = useState<BOQEstimateResult | null>(null);

  if (!isOpen) return null;

  const handleFetchAiAdvice = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAiLoading(true);
    try {
      const res = await api.getAIAdvice({
        propertyType,
        areaSqFt,
        city,
        preferredStyle,
        prompt: userPrompt,
      });
      setAiResult(res);
    } catch (err) {
      console.error('Failed to get AI advice:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCalculateEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalcLoading(true);
    try {
      const res = await api.calculateEstimate({
        propertyType,
        areaSqFt,
        qualityTier: calcTier,
        city,
        includeFacade,
        includeModularKitchen: includeKitchen,
      });
      setCalcResult(res);
    } catch (err) {
      console.error('Failed to calculate estimate:', err);
    } finally {
      setIsCalcLoading(false);
    }
  };

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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#fbf9f7] rounded-3xl overflow-hidden border border-[#cbc4cc]/60 shadow-2xl text-[#1d1625]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#1d1625] text-white p-6 sm:p-8 flex items-center justify-between border-b border-[#322a3a]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-xs font-grotesk tracking-wider uppercase text-[#D4AF37] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Purnima S AI Engine</span>
              </div>
              <h2 className="font-garamond text-2xl sm:text-3xl font-normal text-white">
                Architectural Advisor & BOQ Estimator
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#322a3a] hover:bg-[#49454b] flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-[#cbc4cc]/50 bg-[#F2EFE9] px-6 pt-3">
            <button
              onClick={() => setTab('ai')}
              className={`flex items-center gap-2 py-3 px-6 text-xs sm:text-sm font-grotesk font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                tab === 'ai'
                  ? 'border-[#D4AF37] text-[#1d1625] bg-white rounded-t-xl'
                  : 'border-transparent text-[#49454b] hover:text-[#1d1625]'
              }`}
            >
              <Bot className="w-4 h-4 text-[#D4AF37]" />
              <span>Gemini AI Design Advisor</span>
            </button>
            <button
              onClick={() => setTab('calculator')}
              className={`flex items-center gap-2 py-3 px-6 text-xs sm:text-sm font-grotesk font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                tab === 'calculator'
                  ? 'border-[#D4AF37] text-[#1d1625] bg-white rounded-t-xl'
                  : 'border-transparent text-[#49454b] hover:text-[#1d1625]'
              }`}
            >
              <Calculator className="w-4 h-4 text-[#D4AF37]" />
              <span>Instant BOQ Cost Estimator</span>
            </button>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
            {tab === 'ai' ? (
              <div className="space-y-6">
                <form onSubmit={handleFetchAiAdvice} className="bg-[#F2EFE9] rounded-2xl p-6 border border-[#cbc4cc]/50 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-grotesk uppercase font-semibold text-[#1d1625] mb-1">
                        Property Typology
                      </label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#cbc4cc]/50 text-xs font-grotesk text-[#1d1625]"
                      >
                        <option value="3/4 BHK Luxury Apartment">3/4 BHK Luxury Apartment</option>
                        <option value="Independent Villa / Kothi">Independent Villa / Kothi</option>
                        <option value="Ancestral Bungalow Facelift">Ancestral Bungalow Facelift</option>
                        <option value="Modular Kitchen & Dining">Modular Kitchen & Dining</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-grotesk uppercase font-semibold text-[#1d1625] mb-1">
                        Carpet Area (Sq.Ft)
                      </label>
                      <input
                        type="number"
                        value={areaSqFt}
                        onChange={(e) => setAreaSqFt(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#cbc4cc]/50 text-xs font-grotesk text-[#1d1625]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-grotesk uppercase font-semibold text-[#1d1625] mb-1">
                        City Location
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#cbc4cc]/50 text-xs font-grotesk text-[#1d1625]"
                      >
                        <option value="Raebareli">Raebareli</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Kanpur">Kanpur</option>
                        <option value="Noida / NCR">Noida / NCR</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-grotesk uppercase font-semibold text-[#1d1625] mb-1">
                      Aesthetic Style Preference & Specific Questions
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Modern Japandi with dark walnut woodwork, Gola handles, and anti-fingerprint laminates"
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#cbc4cc]/50 text-xs font-grotesk text-[#1d1625]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isAiLoading}
                    className="w-full flex items-center justify-center gap-2 bg-[#1d1625] text-white py-3.5 rounded-xl text-xs font-grotesk uppercase font-semibold tracking-wider hover:bg-[#322a3a] transition-all cursor-pointer disabled:opacity-70"
                  >
                    {isAiLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 text-[#D4AF37] animate-spin" />
                        <span>Generating Architectural Blueprint...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        <span>Consult Gemini AI Interior Advisor</span>
                      </>
                    )}
                  </button>
                </form>

                {/* AI Advice Output Display */}
                {aiResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/50 shadow-md space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-[#cbc4cc]/30 pb-4">
                      <div>
                        <span className="text-xs font-grotesk uppercase text-[#D4AF37] font-semibold">
                          {aiResult.isAiGenerated ? 'Gemini 2.5 Flash Generated' : 'Architectural Rule Engine'}
                        </span>
                        <h3 className="font-garamond text-2xl font-medium text-[#1d1625]">{aiResult.themeTitle}</h3>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#F2EFE9] text-xs font-grotesk font-semibold text-[#1d1625]">
                        Handover: {aiResult.estimatedTimelineDays} Days
                      </span>
                    </div>

                    <p className="font-grotesk text-sm text-[#49454b] font-light leading-relaxed">{aiResult.summary}</p>

                    <div>
                      <h4 className="font-garamond text-lg font-medium text-[#1d1625] mb-3">Recommended Material Palette</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {aiResult.materialPalette.map((mat, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-[#F2EFE9] border border-[#cbc4cc]/40 text-xs font-grotesk space-y-1">
                            <div className="font-semibold text-[#1d1625] flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>{mat.item}</span>
                            </div>
                            <div className="text-[#1d1625] font-medium">{mat.recommendation}</div>
                            <div className="text-[#49454b] font-light">{mat.rationale}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#1d1625] text-white text-xs font-grotesk space-y-1">
                      <div className="text-[#D4AF37] font-semibold uppercase tracking-wider">Lighting Scheme & Director Tip</div>
                      <p className="text-[#cbc4cc]">{aiResult.lightingPlan}</p>
                      <p className="pt-2 text-white italic">"{aiResult.directorTip}"</p>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => {
                          onClose();
                          setActiveTab('consultation');
                        }}
                        className="inline-flex items-center gap-2 bg-[#1d1625] text-white px-6 py-3 rounded-full text-xs font-grotesk uppercase font-semibold hover:bg-[#322a3a] transition-all cursor-pointer"
                      >
                        <span>Book Site Consultation with Directors</span>
                        <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              /* BOQ Calculator Tab */
              <div className="space-y-6">
                <form onSubmit={handleCalculateEstimate} className="bg-[#F2EFE9] rounded-2xl p-6 border border-[#cbc4cc]/50 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-grotesk uppercase font-semibold text-[#1d1625] mb-1">
                        Select Quality & Material Tier
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Standard', 'Premium', 'Bespoke Heritage'] as const).map((tierItem) => (
                          <button
                            key={tierItem}
                            type="button"
                            onClick={() => setCalcTier(tierItem)}
                            className={`py-2 px-2 rounded-xl text-xs font-grotesk transition-all cursor-pointer border ${
                              calcTier === tierItem
                                ? 'bg-[#1d1625] text-[#D4AF37] border-[#1d1625] font-semibold shadow-xs'
                                : 'bg-white text-[#49454b] border-[#cbc4cc]/40 hover:bg-[#e7e3dc]'
                            }`}
                          >
                            {tierItem}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-grotesk uppercase font-semibold text-[#1d1625] mb-1">
                        Carpet Area (Sq.Ft)
                      </label>
                      <input
                        type="number"
                        value={areaSqFt}
                        onChange={(e) => setAreaSqFt(Number(e.target.value))}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#cbc4cc]/50 text-xs font-grotesk text-[#1d1625]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 pt-2">
                    <label className="inline-flex items-center gap-2 text-xs font-grotesk cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeKitchen}
                        onChange={(e) => setIncludeKitchen(e.target.checked)}
                        className="rounded border-gray-300 text-[#1d1625] focus:ring-0"
                      />
                      <span>Include Gola Profile Modular Kitchen</span>
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs font-grotesk cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeFacade}
                        onChange={(e) => setIncludeFacade(e.target.checked)}
                        className="rounded border-gray-300 text-[#1d1625] focus:ring-0"
                      />
                      <span>Include Exterior Facelift / ACP Cladding</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isCalcLoading}
                    className="w-full flex items-center justify-center gap-2 bg-[#1d1625] text-white py-3.5 rounded-xl text-xs font-grotesk uppercase font-semibold tracking-wider hover:bg-[#322a3a] transition-all cursor-pointer disabled:opacity-70"
                  >
                    {isCalcLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 text-[#D4AF37] animate-spin" />
                        <span>Computing BOQ Estimation...</span>
                      </>
                    ) : (
                      <>
                        <Calculator className="w-4 h-4 text-[#D4AF37]" />
                        <span>Calculate Instant Turnkey BOQ</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Estimate Result Display */}
                {calcResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 sm:p-8 border border-[#cbc4cc]/60 shadow-md space-y-6"
                  >
                    <div className="text-center bg-[#F2EFE9] rounded-2xl p-6 border border-[#D4AF37]/40 space-y-2">
                      <span className="text-xs font-grotesk uppercase font-semibold text-[#D4AF37]">
                        Estimated Turnkey Budget ({calcResult.qualityTier} Tier)
                      </span>
                      <h3 className="font-garamond text-4xl sm:text-5xl font-medium text-[#1d1625]">
                        {calcResult.formattedRange}
                      </h3>
                      <p className="font-grotesk text-xs text-[#49454b]">
                        Includes material supply, installation, supervision, and guaranteed 45-day handover agreement.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-garamond text-xl font-medium text-[#1d1625]">Turnkey Cost Breakdown</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-grotesk">
                        <div className="p-3 bg-[#F2EFE9] rounded-xl border border-[#cbc4cc]/40">
                          <div className="text-[#49454b]">Civil & Flooring</div>
                          <div className="font-semibold text-[#1d1625] text-sm mt-0.5">₹{(calcResult.breakdown.civilAndFlooring / 100000).toFixed(2)} Lakhs</div>
                        </div>
                        <div className="p-3 bg-[#F2EFE9] rounded-xl border border-[#cbc4cc]/40">
                          <div className="text-[#49454b]">Custom Woodwork</div>
                          <div className="font-semibold text-[#1d1625] text-sm mt-0.5">₹{(calcResult.breakdown.customWoodwork / 100000).toFixed(2)} Lakhs</div>
                        </div>
                        <div className="p-3 bg-[#F2EFE9] rounded-xl border border-[#cbc4cc]/40">
                          <div className="text-[#49454b]">Modular Kitchen</div>
                          <div className="font-semibold text-[#1d1625] text-sm mt-0.5">₹{(calcResult.breakdown.modularKitchen / 100000).toFixed(2)} Lakhs</div>
                        </div>
                        <div className="p-3 bg-[#F2EFE9] rounded-xl border border-[#cbc4cc]/40">
                          <div className="text-[#49454b]">Architectural Lighting</div>
                          <div className="font-semibold text-[#1d1625] text-sm mt-0.5">₹{(calcResult.breakdown.architecturalLighting / 100000).toFixed(2)} Lakhs</div>
                        </div>
                        <div className="p-3 bg-[#F2EFE9] rounded-xl border border-[#cbc4cc]/40">
                          <div className="text-[#49454b]">Hardware Fittings</div>
                          <div className="font-semibold text-[#1d1625] text-sm mt-0.5">₹{(calcResult.breakdown.hardwareAndAccessories / 100000).toFixed(2)} Lakhs</div>
                        </div>
                        <div className="p-3 bg-[#F2EFE9] rounded-xl border border-[#cbc4cc]/40">
                          <div className="text-[#49454b]">Exterior Facade</div>
                          <div className="font-semibold text-[#1d1625] text-sm mt-0.5">₹{(calcResult.breakdown.exteriorFacade / 100000).toFixed(2)} Lakhs</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#cbc4cc]/40">
                      <div className="flex items-center gap-2 text-xs font-grotesk text-[#49454b]">
                        <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                        <span>GST Included • 45-Day Handover Guaranteed</span>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          setActiveTab('consultation');
                        }}
                        className="inline-flex items-center gap-2 bg-[#1d1625] text-white px-6 py-3 rounded-full text-xs font-grotesk uppercase font-semibold hover:bg-[#322a3a] transition-all cursor-pointer"
                      >
                        <span>Lock In BOQ Consultation</span>
                        <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
