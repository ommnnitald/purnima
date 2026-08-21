import React, { useState } from 'react';
import { LIGHTING_SCENES } from '../data/architecturalToolsData';
import { Sun, Moon, Sparkles, CheckCircle2, Sliders } from 'lucide-react';
import { motion } from 'motion/react';

export const LightingVisualizer: React.FC = () => {
  const [selectedSceneIdx, setSelectedSceneIdx] = useState(0);
  const [isNightMode, setIsNightMode] = useState(true);

  const scene = LIGHTING_SCENES[selectedSceneIdx];

  return (
    <section className="py-16 sm:py-24 bg-[#fbf9f7] text-[#1d1625]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-grotesk font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 block">
            Architectural Lighting & Ambiance
          </span>
          <h2 className="font-garamond text-3xl sm:text-4xl lg:text-5xl text-[#1d1625] font-normal tracking-tight">
            Day vs. Evening Lighting Visualizer
          </h2>
          <p className="font-grotesk text-xs sm:text-base text-[#49454b] mt-3 font-light">
            Toggle between natural morning sun and warm 3000K indirect evening cove lighting to experience how architectural lighting transforms your home.
          </p>
        </div>

        {/* Scene Selector & Day/Night Toggle Switch */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar w-full sm:w-auto">
            {LIGHTING_SCENES.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => setSelectedSceneIdx(idx)}
                className={`px-4 py-2 rounded-full text-xs font-grotesk uppercase tracking-wider transition-all whitespace-nowrap border cursor-pointer ${
                  selectedSceneIdx === idx
                    ? 'bg-[#1d1625] text-[#D4AF37] font-semibold border-[#1d1625]'
                    : 'bg-[#F2EFE9] text-[#49454b] border-[#cbc4cc]/40 hover:bg-[#e7e3dc]'
                }`}
              >
                {sc.title}
              </button>
            ))}
          </div>

          {/* Day / Night Toggle Pills */}
          <div className="inline-flex items-center p-1 bg-[#F2EFE9] rounded-full border border-[#cbc4cc]/50 shadow-inner">
            <button
              onClick={() => setIsNightMode(false)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-grotesk font-semibold transition-all cursor-pointer ${
                !isNightMode
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-[#49454b] hover:text-[#1d1625]'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>Daylight (12 PM)</span>
            </button>
            <button
              onClick={() => setIsNightMode(true)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-grotesk font-semibold transition-all cursor-pointer ${
                isNightMode
                  ? 'bg-[#1d1625] text-[#D4AF37] shadow-md'
                  : 'text-[#49454b] hover:text-[#1d1625]'
              }`}
            >
              <Moon className="w-4 h-4 text-[#D4AF37]" />
              <span>Evening Cove (8 PM)</span>
            </button>
          </div>
        </div>

        {/* Visualizer Display Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#cbc4cc]/60 shadow-xl space-y-6">
          <div className="relative w-full h-[320px] sm:h-[460px] rounded-2xl overflow-hidden bg-[#1d1625]">
            {/* Day Image */}
            <motion.img
              src={scene.dayImg}
              alt={`${scene.title} Daylight`}
              initial={false}
              animate={{ opacity: isNightMode ? 0 : 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Night Image */}
            <motion.img
              src={scene.nightImg}
              alt={`${scene.title} Evening Lighting`}
              initial={false}
              animate={{ opacity: isNightMode ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Current Mode Badge */}
            <div className="absolute top-4 left-4 bg-[#1d1625]/90 backdrop-blur-md text-[#D4AF37] text-xs font-grotesk font-semibold px-4 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-lg flex items-center gap-2">
              {isNightMode ? <Moon className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
              <span>{isNightMode ? 'Evening Cove & Track Lighting' : 'Natural Daylight'}</span>
            </div>
          </div>

          {/* Description & Fixtures */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
            <div className="md:col-span-7 space-y-2">
              <h3 className="font-garamond text-2xl font-medium text-[#1d1625]">
                {scene.title}
              </h3>
              <p className="font-grotesk text-xs sm:text-sm text-[#49454b] font-light leading-relaxed">
                {isNightMode ? scene.nightDescription : scene.dayDescription}
              </p>
            </div>

            <div className="md:col-span-5 p-4 rounded-2xl bg-[#F2EFE9] border border-[#cbc4cc]/40 text-xs font-grotesk space-y-2">
              <div className="font-semibold text-[#1d1625] uppercase tracking-wider text-[11px] text-[#D4AF37]">
                Architectural Fixtures Specified:
              </div>
              <div className="space-y-1.5 text-[#49454b]">
                {scene.fixturesUsed.map((fix, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{fix}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
