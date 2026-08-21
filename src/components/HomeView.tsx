import React, { useState } from 'react';
import { ActiveTab, PortfolioProject } from '../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { MaterialPaletteViewer } from './MaterialPaletteViewer';
import { FloorPlanExplorer } from './FloorPlanExplorer';
import { LightingVisualizer } from './LightingVisualizer';
import { ProjectTrackerModal } from './ProjectTrackerModal';
import {
  HERO_IMAGE,
  EXPERTISE_INTERIORS_IMG,
  EXPERTISE_EXTERIORS_IMG,
  LEGACY_BEDROOM_IMG,
  COMPANY_DETAILS,
} from '../data/content';
import {
  ArrowUpRight,
  ShieldCheck,
  Award,
  Clock,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  MapPin,
  ChevronRight,
  Building2,
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectProject?: (project: PortfolioProject) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab }) => {
  const [quickForm, setQuickForm] = useState({
    name: '',
    contact: '',
    projectType: 'Interior Living Space',
  });
  const [quickFormSubmitted, setQuickFormSubmitted] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickForm.name || !quickForm.contact) return;
    setQuickFormSubmitted(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="w-full bg-[#fbf9f7] overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[640px] lg:min-h-[720px] flex items-center justify-center bg-[#1d1625] overflow-hidden py-16 lg:py-24">
        {/* Background Image with Ambient Dark Overlay */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1.02, opacity: 0.65 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={HERO_IMAGE}
            alt="Purnima S Luxury Interior"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1d1625]/95 via-[#1d1625]/80 to-transparent" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#1d1625]/50 to-[#1d1625]/90" />
        </motion.div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            {/* Subtle Eyebrow Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#322a3a]/80 backdrop-blur-md border border-[#D4AF37]/30 text-xs font-grotesk tracking-wider uppercase text-[#D4AF37] mb-6 shadow-sm">
              <Building2 className="w-3.5 h-3.5" />
              <span>Raebareli • Lucknow • Kanpur • Ayodhya • Prayagraj</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-garamond text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15] mb-4"
            >
              International Design. <br />
              <span className="italic font-normal text-[#D4AF37]">Built for Tier-2 UP.</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p variants={itemVariants} className="font-grotesk text-lg sm:text-xl font-light text-[#cbc4cc] mb-6">
              Global Architectural Standards, Local Soul.
            </motion.p>

            {/* Description */}
            <motion.p variants={itemVariants} className="font-grotesk text-sm sm:text-base text-[#cbc4cc]/90 font-light leading-relaxed mb-8 max-w-xl">
              We bring quiet luxury, 100% waterproof materials, and transparent 45-day milestone handovers to homeowners across Raebareli, Lucknow, Kanpur, Ayodhya, Prayagraj & NCR.
            </motion.p>

            {/* CTA Group */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <button
                id="hero-book-consultation-cta"
                onClick={() => {
                  setActiveTab('consultation');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2.5 bg-[#D4AF37] text-[#1d1625] px-7 py-3.5 rounded-full text-xs sm:text-sm font-grotesk font-semibold tracking-wider uppercase hover:bg-[#e4bf47] active:scale-95 transition-all shadow-md cursor-pointer"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                id="hero-view-portfolio-cta"
                onClick={() => {
                  setActiveTab('portfolio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/25 px-6 py-3.5 rounded-full text-xs sm:text-sm font-grotesk font-medium tracking-wider uppercase transition-all cursor-pointer"
              >
                <span>View Portfolio</span>
              </button>
            </motion.div>

            {/* Mini Trust Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-10 pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-white"
            >
              <div>
                <div className="font-garamond text-2xl sm:text-3xl font-semibold text-[#D4AF37]">45 Days</div>
                <div className="text-xs text-[#cbc4cc] font-grotesk font-light">Guaranteed Delivery</div>
              </div>
              <div>
                <div className="font-garamond text-2xl sm:text-3xl font-semibold text-[#D4AF37]">10+ Yrs</div>
                <div className="text-xs text-[#cbc4cc] font-grotesk font-light">Architectural Legacy</div>
              </div>
              <div>
                <div className="font-garamond text-2xl sm:text-3xl font-semibold text-[#D4AF37]">100%</div>
                <div className="text-xs text-[#cbc4cc] font-grotesk font-light">GST Registered</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST SIGNALS STRIP */}
      <section className="w-full bg-[#F2EFE9] border-y border-[#cbc4cc]/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-[#1d1625]"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1d1625] text-[#D4AF37] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold font-grotesk tracking-wide uppercase">Certified Firm</div>
                <div className="text-xs text-[#49454b] font-light">GST: {COMPANY_DETAILS.gstNumber}</div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1d1625] text-[#D4AF37] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold font-grotesk tracking-wide uppercase">Quiet Luxury</div>
                <div className="text-xs text-[#49454b] font-light">Japandi & Modern Italian</div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1d1625] text-[#D4AF37] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold font-grotesk tracking-wide uppercase">45-Day Delivery</div>
                <div className="text-xs text-[#49454b] font-light">Strict Milestone Handover</div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1d1625] text-[#D4AF37] flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold font-grotesk tracking-wide uppercase">Director Direct</div>
                <div className="text-xs text-[#49454b] font-light">Raebareli Headquarters</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. OUR EXPERTISE - BENTO GRID */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-xs font-grotesk font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 block">
            Craftsmanship & Philosophy
          </span>
          <h2 className="font-garamond text-3xl sm:text-4xl lg:text-5xl text-[#1d1625] font-normal tracking-tight">
            Our Expertise
          </h2>
          <p className="font-grotesk text-sm sm:text-base text-[#49454b] mt-3 font-light">
            Curated architectural disciplines designed to elevate every square foot of your property.
          </p>
        </motion.div>

        {/* Bento Grid 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: Interiors */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative bg-[#F2EFE9] rounded-2xl overflow-hidden border border-[#cbc4cc]/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
          >
            <div className="relative h-72 sm:h-80 overflow-hidden">
              <img
                src={EXPERTISE_INTERIORS_IMG}
                alt="Luxury Interiors and Modular Kitchen"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 left-4 bg-[#1d1625]/80 backdrop-blur-md text-[#D4AF37] px-3.5 py-1 rounded-full text-xs font-grotesk font-medium uppercase tracking-wider">
                Interiors & Modular
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 bg-[#F2EFE9]">
              <div>
                <h3 className="font-garamond text-2xl sm:text-3xl text-[#1d1625] font-medium mb-3">
                  Interiors & Living Sanctuaries
                </h3>
                <p className="font-grotesk text-sm text-[#49454b] font-light leading-relaxed mb-6">
                  Quiet Luxury & Japandi Minimalism tailored to modern living. Featuring anti-fingerprint super-matte finishes, concealed LED channels, and bespoke modular ergonomics.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#cbc4cc]/40">
                <span className="text-xs font-grotesk text-[#49454b]">Kitchens • Bedrooms • Living</span>
                <button
                  id="bento-explore-interiors-btn"
                  onClick={() => {
                    setActiveTab('interiors');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-grotesk font-semibold uppercase tracking-wider text-[#1d1625] group-hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  <span>Explore Interiors</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Exteriors */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="group relative bg-[#F2EFE9] rounded-2xl overflow-hidden border border-[#cbc4cc]/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
          >
            <div className="relative h-72 sm:h-80 overflow-hidden">
              <img
                src={EXPERTISE_EXTERIORS_IMG}
                alt="Modern Facades and Exteriors"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 left-4 bg-[#1d1625]/80 backdrop-blur-md text-[#D4AF37] px-3.5 py-1 rounded-full text-xs font-grotesk font-medium uppercase tracking-wider">
                Exteriors & Facades
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 bg-[#F2EFE9]">
              <div>
                <h3 className="font-garamond text-2xl sm:text-3xl text-[#1d1625] font-medium mb-3">
                  Modern Facades & Renovation
                </h3>
                <p className="font-grotesk text-sm text-[#49454b] font-light leading-relaxed mb-6">
                  Transformative exterior engineering using high-grade ACP/HPL cladding, architectural louvers, and weatherproof finishes built to endure the UP climate with timeless curb appeal.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#cbc4cc]/40">
                <span className="text-xs font-grotesk text-[#49454b]">Elevation • Cladding • Landscaping</span>
                <button
                  id="bento-explore-exteriors-btn"
                  onClick={() => {
                    setActiveTab('exteriors');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-grotesk font-semibold uppercase tracking-wider text-[#1d1625] group-hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  <span>Explore Exteriors</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BEFORE vs AFTER SITE TRANSFORMATION SLIDER */}
      <BeforeAfterSlider />

      {/* INTERACTIVE MATERIAL & FINISH PALETTE VIEWER */}
      <MaterialPaletteViewer />

      {/* INTERACTIVE 2D FLOOR PLAN & HOTSPOT EXPLORER */}
      <FloorPlanExplorer />

      {/* DAY vs NIGHT LIGHTING VISUALIZER */}
      <LightingVisualizer />

      {/* LIVE 45-DAY PROJECT MILESTONE TRACKER */}
      <ProjectTrackerModal isInlineSection={true} />

      {/* 4. THE LEGACY APPROACH */}
      <section className="py-20 bg-[#1d1625] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Image with 10+ Years Floating Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-[#322a3a] ambient-shadow-lg">
                <img
                  src={LEGACY_BEDROOM_IMG}
                  alt="Legacy Bedroom Sanctuaries"
                  referrerPolicy="no-referrer"
                  className="w-full h-[420px] sm:h-[480px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d1625]/70 via-transparent to-transparent" />
              </div>

              {/* Floating Badge with spring animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 120 }}
                className="absolute -bottom-6 -right-2 sm:right-6 bg-[#D4AF37] text-[#1d1625] p-5 sm:p-6 rounded-2xl shadow-2xl border-2 border-white/20"
              >
                <div className="font-garamond text-3xl sm:text-4xl font-bold leading-none mb-1">
                  10+ Years
                </div>
                <div className="text-xs font-grotesk uppercase tracking-wider font-semibold">
                  Architectural Precision
                </div>
                <div className="text-[11px] opacity-80 mt-0.5">Serving Raebareli & Tier-2 UP</div>
              </motion.div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 space-y-6"
            >
              <span className="text-xs font-grotesk font-semibold tracking-widest uppercase text-[#D4AF37] block">
                The Legacy Approach
              </span>
              <h2 className="font-garamond text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
                Designed for Longevity. <br />
                <span className="italic text-[#D4AF37]">Executed with Precision.</span>
              </h2>
              <p className="font-grotesk text-sm sm:text-base text-[#cbc4cc] font-light leading-relaxed">
                Unlike mass-market aggregators who outsource work to unvetted contractors, Purnima S is managed locally in Raebareli by dedicated registered directors. Every blueprint is engineered for dust-resistant ease, moisture control, and heirloom quality.
              </p>

              {/* Feature Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  {
                    title: 'Direct Director Oversight',
                    desc: 'Direct access to Purnima & Sudhanshu Sonkar from initial sketch to final handover.',
                  },
                  {
                    title: 'Anti-Fingerprint Finishes',
                    desc: 'German super-matte laminates and Gola profiles built for minimal dusting.',
                  },
                  {
                    title: 'Fixed 45-Day Handover',
                    desc: 'Transparent milestone-based timeline with verified quality checkpoints.',
                  },
                  {
                    title: '100% Tax Compliant',
                    desc: 'GST invoiced contracts with comprehensive multi-year material warranties.',
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                    className="p-4 rounded-xl bg-[#322a3a]/60 border border-white/10"
                  >
                    <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-sm font-grotesk mb-1">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-[#cbc4cc] font-light">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  id="legacy-book-btn"
                  onClick={() => {
                    setActiveTab('consultation');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-xs font-grotesk font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors cursor-pointer"
                >
                  <span>Schedule an In-Person Studio Visit</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. QUICK INLINE CONSULTATION TEASER */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65 }}
          className="bg-[#F2EFE9] border border-[#cbc4cc]/60 rounded-3xl p-8 sm:p-12 lg:p-14 ambient-shadow"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-grotesk font-semibold tracking-widest uppercase text-[#D4AF37] block">
                Complimentary Design Audit
              </span>
              <h3 className="font-garamond text-3xl sm:text-4xl text-[#1d1625] font-normal tracking-tight">
                Talk to a Local Stakeholder, <br />
                <span className="italic font-normal">Not just a Designer.</span>
              </h3>
              <p className="font-grotesk text-sm text-[#49454b] font-light leading-relaxed">
                Whether you are building a new bungalow in Raebareli, renovating an ancestral villa in Lucknow, or planning a modern modular kitchen, get a tailored feasibility blueprint.
              </p>
              <div className="flex items-center gap-3 text-xs text-[#49454b] pt-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Studio: Vikas Nagar, Police Line Road, Raebareli</span>
              </div>
            </div>

            <div className="lg:col-span-6">
              {quickFormSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-8 rounded-2xl border border-[#D4AF37]/40 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-[#1d1625] text-[#D4AF37] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-garamond text-2xl text-[#1d1625]">Thank You, {quickForm.name}!</h4>
                  <p className="text-xs text-[#49454b] font-grotesk">
                    Director Sudhanshu / Purnima Sonkar's office will reach you at <strong>{quickForm.contact}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab('consultation');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#1d1625] hover:text-[#D4AF37] uppercase tracking-wider cursor-pointer"
                  >
                    <span>Proceed to Full Scope Questionnaire</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleQuickSubmit}
                  className="bg-white p-6 sm:p-8 rounded-2xl border border-[#cbc4cc]/40 space-y-4 shadow-sm"
                >
                  <div>
                    <label className="block text-xs font-grotesk uppercase tracking-wider font-semibold text-[#1d1625] mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="quick-form-name"
                      type="text"
                      required
                      placeholder="e.g. Anand Srivastava"
                      value={quickForm.name}
                      onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#F2EFE9] border border-[#cbc4cc]/50 text-sm font-grotesk text-[#1d1625] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-grotesk uppercase tracking-wider font-semibold text-[#1d1625] mb-1.5">
                      Phone Number / WhatsApp
                    </label>
                    <input
                      id="quick-form-contact"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={quickForm.contact}
                      onChange={(e) => setQuickForm({ ...quickForm, contact: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#F2EFE9] border border-[#cbc4cc]/50 text-sm font-grotesk text-[#1d1625] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-grotesk uppercase tracking-wider font-semibold text-[#1d1625] mb-1.5">
                      Design Focus
                    </label>
                    <select
                      id="quick-form-type"
                      value={quickForm.projectType}
                      onChange={(e) => setQuickForm({ ...quickForm, projectType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#F2EFE9] border border-[#cbc4cc]/50 text-sm font-grotesk text-[#1d1625] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Interior Living Space">Interior Living Space & Hall</option>
                      <option value="Modular Kitchen & Dining">Modular Gola Kitchen & Dining</option>
                      <option value="Master Bedroom Sanctuary">Master Bedroom Sanctuary</option>
                      <option value="Exterior Facade & Renovation">Exterior Facade & Renovation</option>
                      <option value="Full Villa / Bungalow Turnkey">Full Villa / Bungalow Turnkey</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      id="quick-form-submit-btn"
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-[#1d1625] text-white py-3 rounded-full text-xs font-grotesk font-semibold uppercase tracking-wider hover:bg-[#322a3a] transition-all cursor-pointer"
                    >
                      <span>Request Free Consultation</span>
                      <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
                    </button>
                  </div>
                  <p className="text-[11px] text-[#49454b]/70 text-center font-grotesk">
                    Strict privacy. Zero sales spam. Directly reviewed by senior architects.
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

