import React, { useState } from 'react';
import { FLOOR_PLANS_DATA, FloorPlanHotspot } from '../data/architecturalToolsData';
import { MapPin, Sparkles, X, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FloorPlanExplorer: React.FC = () => {
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<FloorPlanHotspot | null>(null);

  const currentPlan = FLOOR_PLANS_DATA[selectedPlanIdx];

  return (
    <section className="py-16 sm:py-24 bg-[#1d1625] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#322a3a] border border-[#D4AF37]/30 text-xs font-grotesk tracking-wider uppercase text-[#D4AF37] mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Floor Plan Hotspots</span>
          </div>
          <h2 className="font-garamond text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
            Explore Room Blueprints
          </h2>
          <p className="font-grotesk text-xs sm:text-base text-[#cbc4cc] font-light mt-3">
            Tap the glowing gold pins on the blueprint below to view 3D renders, spatial dimensions, and material specifications.
          </p>
        </div>

        {/* Plan Selector Buttons */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {FLOOR_PLANS_DATA.map((plan, idx) => (
            <button
              key={plan.id}
              onClick={() => {
                setSelectedPlanIdx(idx);
                setActiveHotspot(null);
              }}
              className={`px-4 py-2.5 rounded-full text-xs font-grotesk transition-all whitespace-nowrap shrink-0 border cursor-pointer ${
                selectedPlanIdx === idx
                  ? 'bg-[#D4AF37] text-[#1d1625] font-semibold border-[#D4AF37] shadow-md'
                  : 'bg-[#322a3a]/80 text-[#cbc4cc] border-white/10 hover:bg-[#322a3a]'
              }`}
            >
              <span>{plan.title} ({plan.totalArea})</span>
            </button>
          ))}
        </div>

        {/* Interactive Blueprint Box */}
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full h-[360px] sm:h-[480px] rounded-2xl overflow-hidden border border-[#D4AF37]/40 bg-[#2b2432] shadow-2xl">
            {/* Blueprint Diagram Image */}
            <img
              src={currentPlan.planDiagramUrl}
              alt={currentPlan.title}
              className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d1625] via-[#1d1625]/60 to-[#1d1625]/40" />

            {/* Plan Header Info Overlay */}
            <div className="absolute top-4 left-4 z-10 bg-[#1d1625]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs font-grotesk">
              <div className="text-[#D4AF37] font-semibold uppercase">{currentPlan.title}</div>
              <div className="text-[#cbc4cc] text-[11px] font-light">{currentPlan.subtitle} • {currentPlan.totalArea}</div>
            </div>

            {/* Glowing Pin Hotspots */}
            {currentPlan.hotspots.map((pin) => (
              <div
                key={pin.id}
                style={{ left: `${pin.xPercent}%`, top: `${pin.yPercent}%` }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              >
                <button
                  onClick={() => setActiveHotspot(pin)}
                  className="group relative flex items-center justify-center cursor-pointer"
                >
                  <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-[#D4AF37] opacity-60" />
                  <div className="relative w-9 h-9 rounded-full bg-[#D4AF37] text-[#1d1625] flex items-center justify-center shadow-xl border-2 border-white group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="absolute top-10 whitespace-nowrap bg-[#1d1625]/95 text-white text-[11px] font-grotesk font-semibold px-2.5 py-1 rounded-md border border-[#D4AF37]/40 shadow-lg">
                    {pin.title}
                  </span>
                </button>
              </div>
            ))}

            {/* Prompt Banner */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-[#1d1625]/90 text-[#D4AF37] px-4 py-1.5 rounded-full text-[11px] font-grotesk tracking-wide border border-[#D4AF37]/30 backdrop-blur-md shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tap pins on the floor plan above</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hotspot Render Modal */}
      <AnimatePresence>
        {activeHotspot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveHotspot(null)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1d1625] text-white rounded-3xl max-w-lg w-full overflow-hidden border border-[#D4AF37]/40 shadow-2xl relative"
            >
              <button
                onClick={() => setActiveHotspot(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer hover:bg-black"
              >
                <X className="w-5 h-5 text-[#D4AF37]" />
              </button>

              <div className="relative h-60 sm:h-64 overflow-hidden">
                <img
                  src={activeHotspot.renderUrl}
                  alt={activeHotspot.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d1625] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-xs font-grotesk text-[#D4AF37] font-semibold uppercase tracking-wider">
                    Room Area: {activeHotspot.roomArea}
                  </span>
                  <h3 className="font-garamond text-3xl font-medium text-white leading-tight">
                    {activeHotspot.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-5 font-grotesk">
                <p className="text-xs sm:text-sm text-[#cbc4cc] font-light leading-relaxed">
                  {activeHotspot.description}
                </p>

                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider">
                    Material Specifications Included:
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {activeHotspot.keySpecs.map((spec, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-[#322a3a]/70 border border-white/10 text-xs text-[#cbc4cc] flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setActiveHotspot(null)}
                  className="w-full py-3 rounded-full bg-[#D4AF37] text-[#1d1625] text-xs font-grotesk font-semibold uppercase tracking-wider hover:bg-[#e4bf47] transition-all cursor-pointer shadow-md"
                >
                  Close Room Blueprint
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
