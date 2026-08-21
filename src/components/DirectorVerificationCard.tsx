import React from 'react';
import { DIRECTOR_GUARANTEE_TERMS } from '../data/trustContentData';
import { ShieldCheck, Award, FileCheck, MapPin, UserCheck, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const DirectorVerificationCard: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#1d1625] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#322a3a] border border-[#D4AF37]/30 text-xs font-grotesk tracking-wider uppercase text-[#D4AF37] mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Corporate Accountability</span>
          </div>
          <h2 className="font-garamond text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
            Director Assurance & Legal Credentials
          </h2>
          <p className="font-grotesk text-xs sm:text-base text-[#cbc4cc] font-light mt-3">
            Unlike local unregistered contractors, Purnima S is a registered corporate entity under Indian Company Law with strict director site supervision.
          </p>
        </div>

        {/* Corporate Credentials Grid */}
        <div className="max-w-4xl mx-auto bg-[#322a3a]/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/40 shadow-2xl space-y-8 font-grotesk">
          {/* Top Company Info Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="text-xs text-[#D4AF37] font-semibold uppercase tracking-widest">
                Government Registered Entity
              </div>
              <h3 className="font-garamond text-2xl sm:text-3xl text-white font-medium mt-0.5">
                {DIRECTOR_GUARANTEE_TERMS.companyName}
              </h3>
            </div>

            <div className="bg-[#1d1625] px-4 py-2 rounded-2xl border border-[#D4AF37]/40 text-center">
              <div className="text-[10px] text-[#cbc4cc] uppercase tracking-wider">GSTIN Validation</div>
              <div className="text-xs sm:text-sm font-semibold text-[#D4AF37] tracking-wider">
                {DIRECTOR_GUARANTEE_TERMS.gstin}
              </div>
            </div>
          </div>

          {/* Core Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#1d1625]/80 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>45-Day Handover Guarantee</span>
              </div>
              <p className="text-xs text-[#cbc4cc] font-light leading-relaxed">
                {DIRECTOR_GUARANTEE_TERMS.penaltyClause}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1d1625]/80 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">
                <UserCheck className="w-4 h-4" />
                <span>Director Supervision</span>
              </div>
              <p className="text-xs text-[#cbc4cc] font-light leading-relaxed">
                Direct weekly site audits conducted by Purnima Sonkar & Sudhanshu Sonkar.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1d1625]/80 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>25-Year Marine Warranty</span>
              </div>
              <p className="text-xs text-[#cbc4cc] font-light leading-relaxed">
                Written corporate warranty certificate provided upon project key handover.
              </p>
            </div>
          </div>

          {/* Registered Office & Director Names */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-start gap-2 max-w-md text-[#cbc4cc]">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-semibold block">Registered Head Office:</span>
                <span className="font-light">{DIRECTOR_GUARANTEE_TERMS.registeredAddress}</span>
              </div>
            </div>

            <div className="text-right text-[#cbc4cc]">
              <span className="text-[#D4AF37] font-semibold block">Board of Directors:</span>
              <span>Purnima Sonkar • Sudhanshu Sonkar</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
