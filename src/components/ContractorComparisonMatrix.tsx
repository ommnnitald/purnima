import React from 'react';
import { CONTRACTOR_COMPARISON } from '../data/trustContentData';
import { CheckCircle2, XCircle, ShieldCheck, Scale } from 'lucide-react';

export const ContractorComparisonMatrix: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#fbf9f7] text-[#1d1625]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-grotesk font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 block">
            Why UP Homeowners Upgrade to Purnima S
          </span>
          <h2 className="font-garamond text-3xl sm:text-4xl lg:text-5xl text-[#1d1625] font-normal tracking-tight">
            Purnima S vs. Local Contractor
          </h2>
          <p className="font-grotesk text-xs sm:text-base text-[#49454b] mt-3 font-light">
            Don't risk your hard-earned savings on unverified local contractors who swell budgets and delay handovers by months.
          </p>
        </div>

        {/* Comparison Matrix Table / Cards */}
        <div className="max-w-4xl mx-auto space-y-4 font-grotesk">
          {CONTRACTOR_COMPARISON.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-[#cbc4cc]/60 shadow-sm hover:shadow-md transition-all grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            >
              {/* Feature Title */}
              <div className="md:col-span-3 font-semibold text-[#1d1625] text-xs sm:text-sm uppercase tracking-wider">
                {item.feature}
              </div>

              {/* Purnima S Column */}
              <div className="md:col-span-5 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-emerald-900 block text-[11px] uppercase tracking-wider mb-0.5">
                    Purnima S Standard
                  </span>
                  <span>{item.purnimaStandard}</span>
                </div>
              </div>

              {/* Local Contractor Column */}
              <div className="md:col-span-4 p-3.5 rounded-xl bg-rose-50/60 border border-rose-200 text-xs text-rose-950 flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-rose-900 block text-[11px] uppercase tracking-wider mb-0.5">
                    Local Contractor Risk
                  </span>
                  <span>{item.localContractor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
