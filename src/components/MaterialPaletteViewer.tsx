import React, { useState } from 'react';
import { MATERIAL_SWATCHES } from '../data/content';
import { MaterialSwatch } from '../types';
import { ShieldCheck, Award, Sparkles, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MaterialPaletteViewer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialSwatch | null>(null);

  const categories = ['All', 'Woodwork', 'Fittings', 'Countertop', 'Facade'];

  const filteredSwatches = activeCategory === 'All'
    ? MATERIAL_SWATCHES
    : MATERIAL_SWATCHES.filter(m => m.category === activeCategory);

  return (
    <section className="py-16 sm:py-24 bg-[#fbf9f7] text-[#1d1625]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-grotesk font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 block">
            Crafted for UP Monsoons & Heat
          </span>
          <h2 className="font-garamond text-3xl sm:text-4xl lg:text-5xl text-[#1d1625] font-normal tracking-tight">
            Interactive Material & Finish Palette
          </h2>
          <p className="font-grotesk text-xs sm:text-base text-[#49454b] mt-3 font-light">
            We don't use commercial-grade cheap ply or warping particle boards. Tap any material below to inspect durability ratings and warranties.
          </p>
        </div>

        {/* Category Filters (Mobile swipeable) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-grotesk uppercase tracking-wider transition-all whitespace-nowrap shrink-0 border cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1d1625] text-[#D4AF37] font-semibold border-[#1d1625] shadow-md'
                  : 'bg-[#F2EFE9] text-[#49454b] border-[#cbc4cc]/40 hover:bg-[#e7e3dc]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Swatches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSwatches.map((material) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedMaterial(material)}
              className="bg-white rounded-2xl overflow-hidden border border-[#cbc4cc]/50 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-48 sm:h-52 overflow-hidden bg-[#F2EFE9]">
                <img
                  src={material.imageUrl}
                  alt={material.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-[#1d1625]/90 backdrop-blur-md text-[#D4AF37] text-[11px] font-grotesk font-semibold px-3 py-1 rounded-full border border-[#D4AF37]/30 shadow-md">
                  {material.warranty}
                </div>
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-[#1d1625] text-[11px] font-grotesk font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{material.durabilityTag}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[11px] font-grotesk text-[#D4AF37] uppercase font-semibold tracking-wider">
                    {material.category}
                  </span>
                  <h3 className="font-garamond text-xl font-medium text-[#1d1625] mt-0.5">
                    {material.name}
                  </h3>
                  <p className="font-grotesk text-xs text-[#49454b] font-light mt-2 line-clamp-2">
                    {material.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#cbc4cc]/40 flex items-center justify-between text-xs font-grotesk font-semibold text-[#1d1625]">
                  <span className="text-[#D4AF37]">Tap to view spec sheet</span>
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Material Modal Detail */}
      <AnimatePresence>
        {selectedMaterial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMaterial(null)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden border border-[#D4AF37]/40 shadow-2xl space-y-0 relative"
            >
              <button
                onClick={() => setSelectedMaterial(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#1d1625]/80 text-white flex items-center justify-center cursor-pointer hover:bg-[#1d1625]"
              >
                <X className="w-5 h-5 text-[#D4AF37]" />
              </button>

              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={selectedMaterial.imageUrl}
                  alt={selectedMaterial.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d1625] via-[#1d1625]/40 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-xs font-grotesk text-[#D4AF37] font-semibold uppercase tracking-wider">
                    {selectedMaterial.category} Specification
                  </span>
                  <h3 className="font-garamond text-3xl font-medium leading-tight">
                    {selectedMaterial.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-5 font-grotesk">
                <div className="flex flex-wrap gap-2 text-xs">
                  <div className="px-3 py-1.5 rounded-full bg-[#F2EFE9] text-[#1d1625] font-semibold border border-[#cbc4cc]/40 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>{selectedMaterial.durabilityTag}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-[#1d1625] text-[#D4AF37] font-semibold">
                    {selectedMaterial.warranty}
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#49454b]">
                  <div className="font-semibold text-[#1d1625] uppercase tracking-wider text-[11px]">
                    Why Common Homeowners in UP Choose This:
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F2EFE9] border border-[#cbc4cc]/40 text-[#1d1625] leading-relaxed flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{selectedMaterial.tier2Benefit}</span>
                  </div>
                </div>

                <p className="text-xs text-[#49454b] leading-relaxed">
                  {selectedMaterial.description}
                </p>

                <button
                  onClick={() => setSelectedMaterial(null)}
                  className="w-full py-3 rounded-full bg-[#1d1625] text-white text-xs font-grotesk font-semibold uppercase tracking-wider hover:bg-[#322a3a] transition-all cursor-pointer shadow-md"
                >
                  Close Material Spec Sheet
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
