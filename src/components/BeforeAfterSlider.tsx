import React, { useState, useRef, useCallback } from 'react';
import { BEFORE_AFTER_PROJECTS } from '../data/content';
import { Sparkles, Clock, MapPin, ChevronRight, Sliders } from 'lucide-react';
import { motion } from 'motion/react';

export const BeforeAfterSlider: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentProject = BEFORE_AFTER_PROJECTS[selectedIdx];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  }, []);

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#1d1625] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#322a3a] border border-[#D4AF37]/30 text-xs font-grotesk tracking-wider uppercase text-[#D4AF37] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Site Transformations in Tier-2 UP</span>
          </div>
          <h2 className="font-garamond text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
            See the Real Transformation
          </h2>
          <p className="font-grotesk text-xs sm:text-base text-[#cbc4cc] font-light mt-3">
            Drag or swipe the slider below to see how raw, unfinished brick & plaster sites turn into luxury handovers in under 45 days.
          </p>
        </div>

        {/* Project Selector Buttons (Scrollable on mobile) */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {BEFORE_AFTER_PROJECTS.map((proj, index) => (
            <button
              key={proj.id}
              onClick={() => {
                setSelectedIdx(index);
                setSliderPos(50);
              }}
              className={`px-4 py-2.5 rounded-full text-xs font-grotesk transition-all whitespace-nowrap shrink-0 border cursor-pointer ${
                selectedIdx === index
                  ? 'bg-[#D4AF37] text-[#1d1625] font-semibold border-[#D4AF37] shadow-md'
                  : 'bg-[#322a3a]/80 text-[#cbc4cc] border-white/10 hover:bg-[#322a3a]'
              }`}
            >
              <span>{proj.city}: {proj.category}</span>
            </button>
          ))}
        </div>

        {/* Before / After Touch Slider Box */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={onMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={onTouchMove}
            className="relative w-full h-[340px] sm:h-[480px] rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl select-none touch-none cursor-ew-resize bg-[#2b2432]"
          >
            {/* AFTER Image (Full background) */}
            <img
              src={currentProject.afterImg}
              alt={`${currentProject.title} After`}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />
            {/* AFTER Badge */}
            <div className="absolute top-4 right-4 z-20 bg-[#1d1625]/90 backdrop-blur-md text-[#D4AF37] px-3.5 py-1.5 rounded-full text-xs font-grotesk font-semibold uppercase tracking-wider border border-[#D4AF37]/40 shadow-lg">
              After: Purnima S Handover
            </div>

            {/* BEFORE Image (Clipped overlay) */}
            <div
              className="absolute inset-0 h-full overflow-hidden pointer-events-none"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={currentProject.beforeImg}
                alt={`${currentProject.title} Before`}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
              />
              {/* BEFORE Badge */}
              <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md text-white/90 px-3.5 py-1.5 rounded-full text-xs font-grotesk font-semibold uppercase tracking-wider border border-white/20 shadow-lg">
                Before: Original Site
              </div>
            </div>

            {/* Slider Drag Line & Touch Handle */}
            <div
              className="absolute top-0 bottom-0 z-30 w-1 bg-[#D4AF37] pointer-events-none shadow-2xl"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#D4AF37] text-[#1d1625] flex items-center justify-center shadow-2xl border-2 border-white cursor-ew-resize">
                <Sliders className="w-5 h-5" />
              </div>
            </div>

            {/* Helper drag prompt on bottom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-[#1d1625]/90 text-white/80 px-4 py-1.5 rounded-full text-[11px] font-grotesk tracking-wide border border-white/10 backdrop-blur-md shadow-md flex items-center gap-1.5">
              <span>← Touch or Drag to Compare →</span>
            </div>
          </div>

          {/* Project Details Footer */}
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-5 sm:p-6 bg-[#322a3a]/70 rounded-2xl border border-white/10 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-grotesk text-[#D4AF37] uppercase font-semibold tracking-wider">
                  {currentProject.category}
                </span>
                <h3 className="font-garamond text-2xl font-normal text-white">
                  {currentProject.title}
                </h3>
              </div>
              <div className="flex items-center gap-4 text-xs font-grotesk text-[#cbc4cc]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>{currentProject.city}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>{currentProject.handoverDays} Days Delivery</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-grotesk text-[#cbc4cc] font-light leading-relaxed">
              {currentProject.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/10">
              <span className="text-[11px] font-grotesk text-[#D4AF37] uppercase font-semibold tracking-wider">
                Materials Used:
              </span>
              {currentProject.keySpecs.map((spec, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white/10 text-white text-[11px] font-grotesk"
                >
                  {spec}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
