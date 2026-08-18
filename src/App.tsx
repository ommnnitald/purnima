import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ServicesView } from './components/ServicesView';
import { PortfolioView } from './components/PortfolioView';
import { ConsultationView } from './components/ConsultationView';
import { AIAdvisorModal } from './components/AIAdvisorModal';
import { DirectorDashboardModal } from './components/DirectorDashboardModal';
import { motion, AnimatePresence } from 'motion/react';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isDirectorModalOpen, setIsDirectorModalOpen] = useState(false);

  // Scroll to top whenever tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f7] text-[#1b1c1b]">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiAdvisor={() => setIsAiModalOpen(true)}
        onOpenDirectorPortal={() => setIsDirectorModalOpen(true)}
      />

      {/* Main View Router with Framer Motion Page Transition */}
      <main className="flex-1 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} />}
            {activeTab === 'interiors' && (
              <ServicesView setActiveTab={setActiveTab} defaultFilter="Interiors" />
            )}
            {activeTab === 'exteriors' && (
              <ServicesView setActiveTab={setActiveTab} defaultFilter="Exteriors" />
            )}
            {activeTab === 'modular' && (
              <ServicesView setActiveTab={setActiveTab} defaultFilter="Modular" />
            )}
            {activeTab === 'portfolio' && <PortfolioView setActiveTab={setActiveTab} />}
            {activeTab === 'consultation' && <ConsultationView setActiveTab={setActiveTab} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modals */}
      <AIAdvisorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        setActiveTab={setActiveTab}
      />

      <DirectorDashboardModal
        isOpen={isDirectorModalOpen}
        onClose={() => setIsDirectorModalOpen(false)}
      />

      {/* Persistent Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
