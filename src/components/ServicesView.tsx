import React, { useState } from 'react';
import { ActiveTab, DesignService } from '../types';
import { SERVICES_DATA } from '../data/content';
import { CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectService?: (service: DesignService) => void;
  defaultFilter?: 'all' | 'Modular' | 'Interiors' | 'Exteriors';
}

export const ServicesView: React.FC<ServicesViewProps> = ({ setActiveTab, defaultFilter = 'all' }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'Modular' | 'Interiors' | 'Exteriors'>(defaultFilter);

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (selectedFilter === 'all') return true;
    return s.category === selectedFilter;
  });

  return (
    <div className="w-full bg-[#fbf9f7] py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2EFE9] border border-[#cbc4cc]/60 text-xs font-grotesk tracking-wider uppercase text-[#D4AF37] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailored Architecture & Design</span>
          </div>
          <h1 className="font-garamond text-4xl sm:text-5xl lg:text-6xl text-[#1d1625] font-normal tracking-tight">
            Our Design Services
          </h1>
          <p className="font-grotesk text-base sm:text-lg text-[#49454b] mt-4 font-light max-w-2xl mx-auto leading-relaxed">
            Bespoke architectural solutions engineered for modern luxury and effortless living in Raebareli, Lucknow, and across UP.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {(
              [
                { id: 'all', label: 'All Services' },
                { id: 'Modular', label: 'Modular Kitchens' },
                { id: 'Interiors', label: 'Interiors & Living' },
                { id: 'Exteriors', label: 'Modern Facades' },
              ] as const
            ).map((filter) => (
              <button
                key={filter.id}
                id={`filter-${filter.id.toLowerCase()}-services-btn`}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-5 py-2 rounded-full text-xs font-grotesk uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  selectedFilter === filter.id
                    ? 'bg-[#1d1625] text-white shadow-sm'
                    : 'bg-[#F2EFE9] text-[#49454b] hover:bg-[#e7e3dc]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Services List / Grid matching Screen 2 with Framer Motion layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence>
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className={`group bg-[#F2EFE9] rounded-2xl overflow-hidden border border-[#cbc4cc]/60 transition-all duration-300 hover:shadow-xl flex flex-col justify-between ${
                  service.offsetMargin && filteredServices.length > 2 ? 'md:translate-y-4' : ''
                }`}
              >
                {/* Image Container */}
                <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden bg-[#1d1625]">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#1d1625]/80 backdrop-blur-md text-[#D4AF37] px-3 py-1 rounded-full text-xs font-grotesk font-medium uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-garamond text-2xl sm:text-3xl text-[#1d1625] font-medium mb-3">
                      {service.title}
                    </h3>
                    <p className="font-grotesk text-sm sm:text-base text-[#49454b] font-light leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Highlights with checkmarks */}
                    <div className="space-y-2.5 mb-6 pt-2 border-t border-[#cbc4cc]/40">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-grotesk text-[#1d1625]">
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-4 border-t border-[#cbc4cc]/40 flex items-center justify-between">
                    <span className="text-xs font-grotesk text-[#49454b]/70">45-Day Handover Guaranteed</span>
                    <button
                      id={`service-cta-btn-${service.id}`}
                      onClick={() => {
                        setActiveTab('consultation');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 bg-[#1d1625] text-white px-5 py-2.5 rounded-full text-xs font-grotesk font-semibold uppercase tracking-wider hover:bg-[#322a3a] transition-all cursor-pointer"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Banner / Teaser to Portfolio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-[#1d1625] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-grotesk uppercase tracking-widest text-[#D4AF37] font-semibold">
              Live Showcase
            </span>
            <h3 className="font-garamond text-3xl sm:text-4xl font-normal">
              Want to experience our work in real UP residences?
            </h3>
            <p className="font-grotesk text-sm text-[#cbc4cc] font-light leading-relaxed">
              Explore our delivered residences across Lucknow, Noida, and Raebareli with comprehensive floor plans, material palettes, and turnaround histories.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                id="services-to-portfolio-btn"
                onClick={() => {
                  setActiveTab('portfolio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1d1625] px-6 py-3 rounded-full text-xs font-grotesk font-semibold uppercase tracking-wider hover:bg-[#e4bf47] transition-all cursor-pointer"
              >
                <span>View Portfolio Gallery</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                id="services-to-consult-btn"
                onClick={() => {
                  setActiveTab('consultation');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full text-xs font-grotesk font-medium uppercase tracking-wider transition-all cursor-pointer"
              >
                <span>Schedule Consultation</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

