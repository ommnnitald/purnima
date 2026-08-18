import React, { useState, useEffect } from 'react';
import { ActiveTab, PortfolioCategory, PortfolioProject } from '../types';
import { PORTFOLIO_PROJECTS } from '../data/content';
import { ProjectModal } from './ProjectModal';
import { api } from '../services/api';
import { Sparkles, ArrowUpRight, Plus, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PortfolioViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ setActiveTab }) => {
  const [projectsList, setProjectsList] = useState<PortfolioProject[]>(PORTFOLIO_PROJECTS);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>('all');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    let isMounted = true;
    async function loadProjects() {
      setIsLoading(true);
      try {
        const fetched = await api.getProjects();
        if (isMounted && fetched && fetched.length > 0) {
          setProjectsList(fetched);
        }
      } catch (err) {
        console.warn('Using static projects list fallback:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories: { id: PortfolioCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'living', label: 'Living Spaces' },
    { id: 'bedroom', label: 'Bedrooms' },
    { id: 'kitchen', label: 'Kitchens' },
    { id: 'exterior', label: 'Exteriors' },
  ];

  const filteredProjects = projectsList.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const displayedProjects = filteredProjects.slice(0, visibleCount);

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
            <span>Delivered Portfolio</span>
          </div>
          <h1 className="font-garamond text-4xl sm:text-5xl lg:text-6xl text-[#1d1625] font-normal tracking-tight">
            Your Signature of Success.
          </h1>
          <p className="font-grotesk text-base sm:text-lg text-[#49454b] mt-3 font-light max-w-2xl mx-auto leading-relaxed">
            Real residences delivered across Raebareli, Lucknow, and NCR with our promised 45-day turnkey handover.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`portfolio-cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-xs font-grotesk uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1d1625] text-white shadow-sm'
                    : 'bg-[#F2EFE9] text-[#49454b] hover:bg-[#e7e3dc]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid with layout animation */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                onClick={() => setActiveProject(project)}
                className="group bg-[#F2EFE9] rounded-2xl overflow-hidden border border-[#cbc4cc]/60 cursor-pointer transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
              >
                {/* Image Box */}
                <div className="relative h-72 sm:h-80 overflow-hidden bg-[#1d1625]">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d1625]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white text-xs font-grotesk font-semibold tracking-wider uppercase inline-flex items-center gap-1.5 bg-[#1d1625]/80 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
                      <span>View Specifications</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </span>
                  </div>
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#1d1625]/85 backdrop-blur-md text-[#D4AF37] px-3 py-1 rounded-full text-xs font-grotesk font-medium uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Meta */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-garamond text-2xl text-[#1d1625] font-medium mb-2 group-hover:text-[#322a3a] transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-grotesk text-xs sm:text-sm text-[#49454b] font-light leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#cbc4cc]/40 flex items-center justify-between text-xs font-grotesk">
                    <span className="text-[#D4AF37] font-medium tracking-wide">
                      {project.promise || 'Crafting your legacy with our promised 45-Day Delivery.'}
                    </span>
                    <span className="text-[#1d1625] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button if applicable */}
        {filteredProjects.length > displayedProjects.length && (
          <div className="mt-12 text-center">
            <button
              id="portfolio-load-more-btn"
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="inline-flex items-center gap-2 bg-[#F2EFE9] border border-[#cbc4cc]/60 hover:bg-[#e7e3dc] text-[#1d1625] px-6 py-3 rounded-full text-xs font-grotesk font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Load More Projects</span>
            </button>
          </div>
        )}

        {/* Bottom Booking CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-[#F2EFE9] border border-[#cbc4cc]/60 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-garamond text-2xl sm:text-3xl text-[#1d1625] font-medium mb-2">
              Have a plot or existing residence in UP?
            </h3>
            <p className="font-grotesk text-sm text-[#49454b] font-light">
              Get an accurate 3D concept blueprint and material bill of quantities tailored to your exact budget.
            </p>
          </div>
          <button
            id="portfolio-consult-cta-btn"
            onClick={() => {
              setActiveTab('consultation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="shrink-0 inline-flex items-center gap-2 bg-[#1d1625] text-white px-6 py-3 rounded-full text-xs font-grotesk font-semibold uppercase tracking-wider hover:bg-[#322a3a] transition-all cursor-pointer shadow-sm"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </motion.div>
      </div>

      {/* Project Specs Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

