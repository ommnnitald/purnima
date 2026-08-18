import React from 'react';
import { ActiveTab } from '../types';
import { COMPANY_DETAILS } from '../data/content';
import { ShieldCheck, MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1d1625] text-[#fbf9f7] pt-16 pb-12 border-t border-[#322a3a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-garamond text-3xl font-semibold tracking-tight text-white">
                Purnima S
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            </div>
            <p className="text-[#cbc4cc] text-sm leading-relaxed max-w-md font-grotesk font-light">
              International design sensibilities tailored for the heritage and architectural aspirations of Raebareli and Uttar Pradesh. Quiet luxury, bespoke modular ergonomics, and enduring craftsmanship.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#322a3a] border border-[#49454b]/40 text-xs text-[#D4AF37]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>GST: {COMPANY_DETAILS.gstNumber}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#322a3a] border border-[#49454b]/40 text-xs text-[#cbc4cc]">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Est. {COMPANY_DETAILS.established}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-garamond text-lg font-medium text-white tracking-wide border-b border-[#322a3a] pb-2 inline-block">
              Expertise & Services
            </h4>
            <ul className="space-y-2.5 text-sm font-grotesk text-[#cbc4cc]">
              <li>
                <button
                  id="footer-link-interiors"
                  onClick={() => handleNav('interiors')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Quiet Luxury Interiors</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-modular"
                  onClick={() => handleNav('modular')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Modular Gola Kitchens</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-exteriors"
                  onClick={() => handleNav('exteriors')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Modern Facades & Renovation</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-portfolio"
                  onClick={() => handleNav('portfolio')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Project Portfolio (Lucknow & NCR)</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-consultation"
                  onClick={() => handleNav('consultation')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Schedule Consultation</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Registered Office & Contact */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-garamond text-lg font-medium text-white tracking-wide border-b border-[#322a3a] pb-2 inline-block">
              Corporate Office & Studio
            </h4>
            <div className="space-y-3 text-xs sm:text-sm font-grotesk text-[#cbc4cc] leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong>Registered Office:</strong> {COMPANY_DETAILS.registeredOffice}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{COMPANY_DETAILS.email}</span>
              </div>
              <div className="pt-2 text-xs text-[#cbc4cc]/70">
                <p>
                  <strong>Directors:</strong> {COMPANY_DETAILS.directors.join(' & ')}
                </p>
                <p className="mt-0.5 text-[#cbc4cc]/50">
                  CIN: Registered Private Limited Entity under MCA India
                </p>
              </div>
              <div className="pt-1">
                <button
                  id="footer-consultation-btn"
                  onClick={() => handleNav('consultation')}
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D4AF37] hover:text-white transition-colors cursor-pointer"
                >
                  <span>Talk directly to Directors</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#322a3a]/80 flex flex-col sm:flex-row items-center justify-between text-xs text-[#cbc4cc]/60 font-grotesk gap-4">
          <div>
            © {new Date().getFullYear()} {COMPANY_DETAILS.legalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Engagement</span>
            <span>•</span>
            <span>45-Day Delivery Promise</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
