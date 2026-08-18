import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { Menu, X, ArrowUpRight, ShieldCheck, Sparkles, Shield } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAiAdvisor?: () => void;
  onOpenDirectorPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiAdvisor,
  onOpenDirectorPortal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { label: string; tab: ActiveTab }[] = [
    { label: 'Interiors', tab: 'interiors' },
    { label: 'Exteriors', tab: 'exteriors' },
    { label: 'Modular', tab: 'modular' },
    { label: 'Portfolio', tab: 'portfolio' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fbf9f7]/90 backdrop-blur-md border-b border-[#cbc4cc]/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            id="nav-brand-logo-btn"
            onClick={() => handleNav('home')}
            className="flex items-baseline gap-1.5 text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-garamond text-2xl sm:text-3xl font-semibold tracking-tight text-[#1d1625] group-hover:text-[#322a3a] transition-colors">
              Purnima S
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mb-1 inline-block"></span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, tab }) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  id={`nav-link-${tab}`}
                  onClick={() => handleNav(tab)}
                  className={`font-grotesk text-sm tracking-wide font-medium relative py-1 transition-colors cursor-pointer ${
                    isActive ? 'text-[#1d1625] font-semibold' : 'text-[#49454b] hover:text-[#1d1625]'
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37] rounded-full transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {onOpenAiAdvisor && (
              <button
                id="nav-ai-advisor-btn"
                onClick={onOpenAiAdvisor}
                className="inline-flex items-center gap-1.5 bg-[#F2EFE9] border border-[#cbc4cc]/60 text-[#1d1625] px-3.5 py-2 rounded-full text-xs font-grotesk font-semibold hover:bg-[#e7e3dc] transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>AI Advisor</span>
              </button>
            )}

            {onOpenDirectorPortal && (
              <button
                id="nav-director-portal-btn"
                onClick={onOpenDirectorPortal}
                className="inline-flex items-center gap-1.5 bg-[#F2EFE9] border border-[#cbc4cc]/60 text-[#1d1625] px-3.5 py-2 rounded-full text-xs font-grotesk font-semibold hover:bg-[#e7e3dc] transition-all cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Director Portal</span>
              </button>
            )}

            <button
              id="nav-book-consultation-btn"
              onClick={() => handleNav('consultation')}
              className="group inline-flex items-center gap-2 bg-[#1d1625] text-white px-5 py-2.5 rounded-full text-xs font-grotesk font-medium tracking-wider uppercase hover:bg-[#322a3a] active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#1d1625] hover:bg-[#f5f3f1] transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#cbc4cc]/40 bg-[#fbf9f7] px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 pt-2">
            {navLinks.map(({ label, tab }) => (
              <button
                key={tab}
                id={`mobile-nav-link-${tab}`}
                onClick={() => handleNav(tab)}
                className={`text-left px-3 py-2.5 rounded-lg text-base font-grotesk font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-[#F2EFE9] text-[#1d1625] font-semibold'
                    : 'text-[#49454b] hover:bg-[#f5f3f1]'
                }`}
              >
                {label}
              </button>
            ))}

            <div className="pt-2 flex flex-col gap-2">
              {onOpenAiAdvisor && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAiAdvisor();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#F2EFE9] text-[#1d1625] px-4 py-2.5 rounded-full text-xs font-grotesk font-semibold uppercase tracking-wider"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>AI Design & BOQ Advisor</span>
                </button>
              )}

              {onOpenDirectorPortal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDirectorPortal();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#F2EFE9] text-[#1d1625] px-4 py-2.5 rounded-full text-xs font-grotesk font-semibold uppercase tracking-wider"
                >
                  <Shield className="w-4 h-4 text-[#D4AF37]" />
                  <span>Director Portal</span>
                </button>
              )}

              <button
                id="mobile-nav-book-btn"
                onClick={() => handleNav('consultation')}
                className="w-full flex items-center justify-center gap-2 bg-[#1d1625] text-white px-5 py-3 rounded-full text-sm font-grotesk font-medium tracking-wider uppercase hover:bg-[#322a3a] transition-all"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>

            <div className="pt-2 text-center text-xs text-[#49454b]/70 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>GST Registered • Raebareli & Tier-2 UP</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
