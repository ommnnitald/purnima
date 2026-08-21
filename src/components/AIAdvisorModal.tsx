import React, { useState, useEffect, useCallback } from 'react';
import { api, AIAdviceResult, BOQEstimateResult } from '../services/api';
import { ActiveTab } from '../types';
import { Sparkles, X, Calculator, Bot, ArrowRight, CheckCircle2, ShieldCheck, RefreshCw, ChevronRight, Copy, Check, Sliders, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

const PRESET_STYLES = [
  'Quiet Luxury & Japandi Minimal',
  'Modern Tropical Villa with ACP Facade',
  'Bespoke Royal Heritage Woodwork',
  'Contemporary Minimal with Black Gola Kitchen',
];

export const AIAdvisorModal: React.FC<AIAdvisorModalProps> = ({ isOpen, onClose, setActiveTab }) => {
  const [tab, setTab] = useState<'ai' | 'calculator'>('ai');

  // Shared Parameters
  const [propertyType, setPropertyType] = useState('3/4 BHK Luxury Apartment');
  const [areaSqFt, setAreaSqFt] = useState<number>(1800);
  const [city, setCity] = useState('Raebareli');

  // AI Advisory State
  const [preferredStyle, setPreferredStyle] = useState('Quiet Luxury & Japandi Minimal');
  const [userPrompt, setUserPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIAdviceResult | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [copiedAi, setCopiedAi] = useState(false);

  // BOQ Calculator State
  const [calcTier, setCalcTier] = useState<'Standard' | 'Premium' | 'Bespoke Heritage'>('Premium');
  const [includeFacade, setIncludeFacade] = useState(true);
  const [includeKitchen, setIncludeKitchen] = useState(true);
  const [isCalcLoading, setIsCalcLoading] = useState(false);
  const [calcResult, setCalcResult] = useState<BOQEstimateResult | null>(null);
  const [calcError, setCalcError] = useState<string | null>(null);

  // Live BOQ Calculation Trigger
  const runBoqCalculation = useCallback(async () => {
    setIsCalcLoading(true);
    setCalcError(null);
    try {
      const res = await api.calculateEstimate({
        propertyType,
        areaSqFt: areaSqFt || 1000,
        qualityTier: calcTier,
        city,
        includeFacade,
        includeModularKitchen: includeKitchen,
      });
      setCalcResult(res);
    } catch (err: any) {
      console.error('Failed to calculate estimate:', err);
      setCalcError(err.message || 'Unable to calculate BOQ estimate right now.');
    } finally {
      setIsCalcLoading(false);
    }
  }, [propertyType, areaSqFt, calcTier, city, includeFacade, includeKitchen]);

  // Run initial calculation when modal opens or when tab switches to calculator
  useEffect(() => {
    if (isOpen && (tab === 'calculator' || !calcResult)) {
      runBoqCalculation();
    }
  }, [isOpen, tab, runBoqCalculation, calcResult]);

  if (!isOpen) return null;

  const handleFetchAiAdvice = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAiLoading(true);
    setAiError(null);
    try {
      const res = await api.getAIAdvice({
        propertyType,
        areaSqFt,
        city,
        preferredStyle,
        prompt: userPrompt,
      });
      setAiResult(res);
    } catch (err: any) {
      console.error('Failed to get AI advice:', err);
      setAiError(err.message || 'Unable to generate AI consultation right now. Please try again.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const copyBlueprintText = () => {
    if (!aiResult) return;
    const text = `PURNIMA S ARCHITECTURAL BLUEPRINT
Theme: ${aiResult.themeTitle}
Location: ${city} (${areaSqFt} sq.ft)
Summary: ${aiResult.summary}
Lighting: ${aiResult.lightingPlan}
Handover: ${aiResult.estimatedTimelineDays} Days`;
    navigator.clipboard.writeText(text);
    setCopiedAi(true);
    setTimeout(() => setCopiedAi(false), 2500);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#1d1625]/85 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#fbf9f7] rounded-3xl overflow-hidden border border-[#cbc4cc]/60 shadow-2xl text-[#1d1625]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#1d1625] text-white p-5 sm:p-7 flex items-center justify-between border-b border-[#322a3a]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-xs font-grotesk tracking-wider uppercase text-[#D4AF37] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Purnima S AI Engine v2.0</span>
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

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#cbc4cc]/50 bg-[#F2EFE9] px-4 sm:px-6 pt-3">
            <button
              onClick={() => setTab('ai')}
              className={`flex items-center gap-2 py-3 px-5 text-xs sm:text-sm font-grotesk font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                tab === 'ai'
                  ? 'border-[#D4AF37] text-[#1d1625] bg-white rounded-t-xl shadow-xs'
                  : 'border-transparent text-[#49454b] hover:text-[#1d1625]'
              }`}
            >
              <Bot className="w-4 h-4 text-[#D4AF37]" />
              <span>Gemini AI Design Advisor</span>
            </button>
            <button
              onClick={() => setTab('calculator')}
              className={`flex items-center gap-2 py-3 px-5 text-xs sm:text-sm font-grotesk font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                tab === 'calculator'
                  ? 'border-[#D4AF37] text-[#1d1625] bg-white rounded-t-xl shadow-xs'
                  : 'border-transparent text-[#49454b] hover:text-[#1d1625]'
              }`}
            >
              <Calculator className="w-4 h-4 text-[#D4AF37]" />
              <span>Instant BOQ Cost Estimator</span>
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1">
            {tab === 'ai' ? (
              /* TAB 1: GEMINI AI ADVISOR */
              <div className="space-y-6">
                <form id="ai-advisor-form" onSubmit={handleFetchAiAdvice} className="bg-[#F2EFE9] rounded-2xl p-5 sm:p-6 border border-[#cbc4cc]/50 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-grotesk uppercase font-semibold text-[#1d1625] mb-1.5">
                        Property Typology
                      </label>
                      <select
                        id="ai-advisor-property-select"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#cbc4cc]/50 text-xs font-grotesk text-[#1d1625] focus:outline-none focus:border-[#1d1625]"
                      >
                        <option value="3/4 BHK Luxury Apartment">3/4 BHK Luxury Apartment</option>
                        <option value="Independent Villa / Kothi">Independent Villa / Kothi</option>
                        <option value="Ancestral Bungalow Facelift">Ancestral Bungalow Facelift</option>
                        <option value="Modular Kitchen & Dining">Modular Kitchen & Dining</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-grotesk uppercase font-semibold text-[#1d1625]">
                          Carpet Area
                        </label>
                        <span className="text-xs font-grotesk font-bold text-[#D4AF37]">{areaSqFt} Sq.Ft</span>
                      </div>
                      <input
                        type="range"
                        min={500}
                        max={8000}
                        step={100}
                        value={areaSqFt}
                        onChange={(e) => setAreaSqFt(Number(e.target.value))}
                        className="w-full accent-[#1d1625] cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-grotesk uppercase font-semibold text-[#1d1625] mb-1.5">
                        City Location
                      </label>
                      <select
                        id="ai-advisor-city-select"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#cbc4cc]/50 text-xs font-grotesk text-[#1d1625] focus:outline-none focus:border-[#1d1625]"
                      >
                        <option value="Raebareli">Raebareli</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Kanpur">Kanpur</option>
                        <option value="Noida / NCR">Noida / NCR</option>
                      </select>
                    </div>
                  </div>

                  {/* Preset Style Chips */}
                  <div>
                    <label className="block text-xs font-grotesk uppercase font-semibold text-[#1d1625] mb-2">
                      Quick Aesthetic Presets
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_STYLES.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setPreferredStyle(preset)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-grotesk transition-all cursor-pointer border ${
                            preferredStyle === preset
                              ? 'bg-[#1d1625] text-[#D4AF37] border-[#1d1625] font-semibold'
                              : 'bg-white text-[#49454b] border-[#cbc4cc]/40 hover:bg-[#e7e3dc]'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-grotesk uppercase font-semibold text-[#1d1625] mb-1.5">
                      Specific Design Vision / Custom Requirements
                    </label>
                    <input
                      id="ai-advisor-prompt-input"
                      type="text"
                      placeholder="e.g. Double-height living, CNC facade louvers, Italian marble flooring, zero smudge laminates"
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#cbc4cc]/50 text-xs font-grotesk text-[#1d1625] focus:outline-none focus:border-[#1d1625]"
                    />
                  </div>

                  <button
                    id="ai-advisor-submit-btn"
                    type="submit"
                    disabled={isAiLoading}
                    className="w-full flex items-center justify-center gap-2 bg-[#1d1625] text-white py-3.5 rounded-xl text-xs font-grotesk uppercase font-semibold tracking-wider hover:bg-[#322a3a] transition-all cursor-pointer disabled:opacity-70 shadow-md"
                  >
                    {isAiLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 text-[#D4AF37] animate-spin" />
                        <span>Generating Architectural Concept...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        <span>Generate Custom Architectural Blueprint</span>
                      </>
                    )}
                  </button>
                  {aiError && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-grotesk text-center">
                      {aiError}
                    </div>
                  )}
                </form>

                {/* AI Output Display */}
                {aiResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/50 shadow-lg space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-[#cbc4cc]/30 pb-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1d1625] text-white text-[10px] font-grotesk uppercase font-semibold tracking-wider mb-1">
                          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                          <span>{aiResult.isAiGenerated ? 'Gemini AI Response' : 'Architectural Rule Engine'}</span>
                        </div>
                        <h3 className="font-garamond text-2xl font-medium text-[#1d1625]">{aiResult.themeTitle}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={copyBlueprintText}
                          className="px-3 py-1.5 rounded-lg border border-[#cbc4cc]/60 text-xs font-grotesk flex items-center gap-1.5 text-[#1d1625] hover:bg-[#F2EFE9] transition-colors cursor-pointer"
                        >
                          {copiedAi ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-[#49454b]" />
                              <span>Copy Blueprint</span>
                            </>
                          )}
                        </button>
                        <span className="px-3 py-1.5 rounded-full bg-[#F2EFE9] text-xs font-grotesk font-semibold text-[#1d1625]">
                          Handover: {aiResult.estimatedTimelineDays} Days
                        </span>
                      </div>
                    </div>

                    <p className="font-grotesk text-sm text-[#49454b] leading-relaxed">{aiResult.summary}</p>

                    <div>
                      <h4 className="font-garamond text-lg font-medium text-[#1d1625] mb-3">Recommended Material Palette</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {aiResult.materialPalette.map((mat, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-[#F2EFE9] border border-[#cbc4cc]/40 text-xs font-grotesk space-y-1">
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

                    <div className="p-4 rounded-xl bg-[#1d1625] text-white text-xs font-grotesk space-y-1.5">
                      <div className="text-[#D4AF37] font-semibold uppercase tracking-wider flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Lighting Plan & Director Advisory Note</span>
                      </div>
                      <p className="text-[#cbc4cc]">{aiResult.lightingPlan}</p>
                      <p className="pt-2 text-white italic">"{aiResult.directorTip}"</p>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => {
                          onClose();
                          setActiveTab('consultation');
                        }}
                        className="inline-flex items-center gap-2 bg-[#1d1625] text-white px-6 py-3.5 rounded-full text-xs font-grotesk uppercase font-semibold hover:bg-[#322a3a] transition-all cursor-pointer shadow-md"
                      >
                        <span>Book Consultation with Director Inspection</span>
                        <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              /* TAB 2: INSTANT BOQ COST ESTIMATOR */
              <div className="space-y-6">
                <div className="bg-[#F2EFE9] rounded-2xl p-5 sm:p-6 border border-[#cbc4cc]/50 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-grotesk uppercase font-semibold text-[#1d1625] mb-1.5">
                        Select Material & Quality Tier
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Standard', 'Premium', 'Bespoke Heritage'] as const).map((tierItem) => (
                          <button
                            key={tierItem}
                            type="button"
                            onClick={() => {
                              setCalcTier(tierItem);
                              setTimeout(runBoqCalculation, 50);
                            }}
                            className={`py-2.5 px-3 rounded-xl text-xs font-grotesk transition-all cursor-pointer border text-center ${
                              calcTier === tierItem
                                ? 'bg-[#1d1625] text-[#D4AF37] border-[#1d1625] font-semibold shadow-md'
                                : 'bg-white text-[#49454b] border-[#cbc4cc]/40 hover:bg-[#e7e3dc]'
                            }`}
                          >
                            {tierItem}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-grotesk uppercase font-semibold text-[#1d1625]">
                          Carpet Area
                        </label>
                        <span className="text-xs font-grotesk font-bold text-[#D4AF37]">{areaSqFt} Sq.Ft</span>
                      </div>
                      <input
                        type="range"
                        min={500}
                        max={8000}
                        step={100}
                        value={areaSqFt}
                        onChange={(e) => {
                          setAreaSqFt(Number(e.target.value));
                          setTimeout(runBoqCalculation, 50);
                        }}
                        className="w-full accent-[#1d1625] cursor-pointer mt-2"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#cbc4cc]/40">
                    <div className="flex flex-wrap gap-5">
                      <label className="inline-flex items-center gap-2 text-xs font-grotesk cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeKitchen}
                          onChange={(e) => {
                            setIncludeKitchen(e.target.checked);
                            setTimeout(runBoqCalculation, 50);
                          }}
                          className="rounded border-gray-300 text-[#1d1625] focus:ring-0 w-4 h-4 cursor-pointer"
                        />
                        <span className="font-medium text-[#1d1625]">Modular Gola Kitchen</span>
                      </label>
                      <label className="inline-flex items-center gap-2 text-xs font-grotesk cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeFacade}
                          onChange={(e) => {
                            setIncludeFacade(e.target.checked);
                            setTimeout(runBoqCalculation, 50);
                          }}
                          className="rounded border-gray-300 text-[#1d1625] focus:ring-0 w-4 h-4 cursor-pointer"
                        />
                        <span className="font-medium text-[#1d1625]">Exterior Facade / ACP Cladding</span>
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={runBoqCalculation}
                      disabled={isCalcLoading}
                      className="px-5 py-2.5 bg-[#1d1625] text-white rounded-xl text-xs font-grotesk uppercase font-semibold tracking-wider hover:bg-[#322a3a] transition-all cursor-pointer flex items-center gap-2"
                    >
                      {isCalcLoading ? <RefreshCw className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" /> : <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />}
                      <span>Recalculate BOQ</span>
                    </button>
                  </div>

                  {calcError && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-grotesk text-center">
                      {calcError}
                    </div>
                  )}
                </div>

                {/* Instant BOQ Calculation Results */}
                {calcResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 sm:p-8 border border-[#cbc4cc]/60 shadow-lg space-y-6"
                  >
                    <div className="text-center bg-[#1d1625] text-white rounded-2xl p-6 border border-[#D4AF37]/40 space-y-2 relative overflow-hidden">
                      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl" />
                      <span className="text-xs font-grotesk uppercase font-semibold text-[#D4AF37] tracking-wider">
                        Turnkey Cost Estimate ({calcResult.qualityTier} Tier • {calcResult.areaSqFt} Sq.Ft)
                      </span>
                      <h3 className="font-garamond text-4xl sm:text-5xl font-normal text-white">
                        {calcResult.formattedRange}
                      </h3>
                      <p className="font-grotesk text-xs text-[#cbc4cc] max-w-lg mx-auto">
                        Includes material supply, site installation, direct director supervision, and 45-day handover warranty.
                      </p>
                    </div>

                    {/* Cost Breakdown Cards */}
                    <div className="space-y-3">
                      <h4 className="font-garamond text-xl font-medium text-[#1d1625] flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#D4AF37]" />
                        <span>Itemized BOQ Cost Breakdown</span>
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-grotesk">
                        <div className="p-3.5 bg-[#F2EFE9] rounded-xl border border-[#cbc4cc]/40">
                          <div className="text-[#49454b]">Civil & Flooring</div>
                          <div className="font-semibold text-[#1d1625] text-sm mt-0.5">
                            ₹{(calcResult.breakdown.civilAndFlooring / 100000).toFixed(2)} Lakhs
                          </div>
                        </div>
                        <div className="p-3.5 bg-[#F2EFE9] rounded-xl border border-[#cbc4cc]/40">
                          <div className="text-[#49454b]">Custom Woodwork</div>
                          <div className="font-semibold text-[#1d1625] text-sm mt-0.5">
                            ₹{(calcResult.breakdown.customWoodwork / 100000).toFixed(2)} Lakhs
                          </div>
                        </div>
                        <div className="p-3.5 bg-[#F2EFE9] rounded-xl border border-[#cbc4cc]/40">
                          <div className="text-[#49454b]">Modular Kitchen</div>
                          <div className="font-semibold text-[#1d1625] text-sm mt-0.5">
                            ₹{(calcResult.breakdown.modularKitchen / 100000).toFixed(2)} Lakhs
                          </div>
                        </div>
                        <div className="p-3.5 bg-[#F2EFE9] rounded-xl border border-[#cbc4cc]/40">
                          <div className="text-[#49454b]">Architectural Lighting</div>
                          <div className="font-semibold text-[#1d1625] text-sm mt-0.5">
                            ₹{(calcResult.breakdown.architecturalLighting / 100000).toFixed(2)} Lakhs
                          </div>
                        </div>
                        <div className="p-3.5 bg-[#F2EFE9] rounded-xl border border-[#cbc4cc]/40">
                          <div className="text-[#49454b]">Hardware Fittings</div>
                          <div className="font-semibold text-[#1d1625] text-sm mt-0.5">
                            ₹{(calcResult.breakdown.hardwareAndAccessories / 100000).toFixed(2)} Lakhs
                          </div>
                        </div>
                        <div className="p-3.5 bg-[#F2EFE9] rounded-xl border border-[#cbc4cc]/40">
                          <div className="text-[#49454b]">Exterior Facade</div>
                          <div className="font-semibold text-[#1d1625] text-sm mt-0.5">
                            ₹{(calcResult.breakdown.exteriorFacade / 100000).toFixed(2)} Lakhs
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="p-4 rounded-xl bg-[#F2EFE9] border border-[#cbc4cc]/40 text-xs font-grotesk space-y-2">
                      <div className="font-semibold text-[#1d1625] uppercase tracking-wider text-[11px] text-[#D4AF37]">
                        Material Specifications Included:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#49454b]">
                        <div><strong className="text-[#1d1625]">Core Material:</strong> {calcResult.specifications.coreMaterial}</div>
                        <div><strong className="text-[#1d1625]">Fittings:</strong> {calcResult.specifications.fittings}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#cbc4cc]/40">
                      <div className="flex items-center gap-2 text-xs font-grotesk text-[#49454b]">
                        <ShieldCheck className="w-4.5 h-4.5 text-[#D4AF37]" />
                        <span>GST Included • 45-Day Handover Warranty</span>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          setActiveTab('consultation');
                        }}
                        className="inline-flex items-center gap-2 bg-[#1d1625] text-white px-6 py-3.5 rounded-full text-xs font-grotesk uppercase font-semibold hover:bg-[#322a3a] transition-all cursor-pointer shadow-md"
                      >
                        <span>Lock In BOQ Estimate & Book Consultation</span>
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
