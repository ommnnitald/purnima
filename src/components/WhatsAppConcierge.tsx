import React, { useState } from 'react';
import { MessageCircle, Phone, Sparkles, X, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_DETAILS } from '../data/content';

export const WhatsAppConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userCity, setUserCity] = useState('Raebareli / Lucknow');
  const [propertyType, setPropertyType] = useState('3/4 BHK Villa / Flat');

  const handleLaunchWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Director Sudhanshu & Purnima Sonkar,\n\nI am interested in getting a 45-day turnkey interior/exterior design consultation for my property in ${userCity} (${propertyType}). Please connect with me.`
    );
    const whatsappUrl = `https://wa.me/919415000000?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Floating Trigger Button on Mobile/Desktop */}
      <motion.button
        id="whatsapp-concierge-fab"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-40 bg-[#25D366] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 cursor-pointer border-2 border-white"
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        <span className="hidden sm:inline font-grotesk text-xs font-semibold uppercase tracking-wider">
          WhatsApp Director
        </span>
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
        </span>
      </motion.button>

      {/* Concierge Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-[#1d1625] rounded-3xl max-w-md w-full p-6 sm:p-7 border border-[#D4AF37]/40 shadow-2xl relative font-grotesk space-y-5"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#F2EFE9] text-[#1d1625] flex items-center justify-center cursor-pointer hover:bg-[#e7e3dc]"
              >
                <X className="w-4 h-4 text-[#1d1625]" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
                  <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
                </div>
                <div>
                  <div className="text-[11px] text-[#D4AF37] font-semibold uppercase tracking-wider">
                    Direct Director Connect
                  </div>
                  <h3 className="font-garamond text-2xl font-medium text-[#1d1625]">
                    WhatsApp Concierge
                  </h3>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F2EFE9] border border-[#cbc4cc]/40 text-xs text-[#49454b] leading-relaxed flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  Speak directly with Director Sudhanshu & Purnima Sonkar for your project estimation in Tier-2 UP.
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-[#1d1625] uppercase tracking-wider mb-1">
                    Your City / Region:
                  </label>
                  <select
                    value={userCity}
                    onChange={(e) => setUserCity(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#F2EFE9] border border-[#cbc4cc] text-[#1d1625] font-medium focus:outline-none"
                  >
                    <option value="Raebareli">Raebareli</option>
                    <option value="Lucknow">Lucknow</option>
                    <option value="Kanpur">Kanpur</option>
                    <option value="Ayodhya">Ayodhya</option>
                    <option value="Prayagraj">Prayagraj</option>
                    <option value="Sultanpur / Unnao">Sultanpur / Unnao</option>
                    <option value="Noida / NCR">Noida / NCR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1d1625] uppercase tracking-wider mb-1">
                    Property Typology:
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#F2EFE9] border border-[#cbc4cc] text-[#1d1625] font-medium focus:outline-none"
                  >
                    <option value="Independent Villa / Kothi">Independent Villa / Kothi</option>
                    <option value="3/4 BHK Apartment">3/4 BHK Apartment</option>
                    <option value="Modular Kitchen Facelift">Modular Kitchen Facelift</option>
                    <option value="Exterior Facade Renovation">Exterior Facade Renovation</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleLaunchWhatsApp}
                className="w-full py-3.5 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#20bd5a] transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Launch WhatsApp Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
