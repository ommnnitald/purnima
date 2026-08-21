import React, { useState } from 'react';
import { WRITTEN_REVIEWS, WrittenReview } from '../data/trustContentData';
import { Star, ShieldCheck, CheckCircle2, Quote, MapPin, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export const WrittenTestimonials: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('All');

  const cities = ['All', 'Lucknow', 'Raebareli', 'Kanpur', 'Ayodhya'];

  const filteredReviews = selectedCity === 'All'
    ? WRITTEN_REVIEWS
    : WRITTEN_REVIEWS.filter(r => r.city === selectedCity);

  return (
    <section className="py-16 sm:py-24 bg-[#1d1625] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#322a3a] border border-[#D4AF37]/30 text-xs font-grotesk tracking-wider uppercase text-[#D4AF37] mb-3">
            <Quote className="w-3.5 h-3.5" />
            <span>Verified Homeowner Reviews</span>
          </div>
          <h2 className="font-garamond text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
            Client Stories across Tier-2 UP
          </h2>
          <p className="font-grotesk text-xs sm:text-base text-[#cbc4cc] font-light mt-3">
            Read real feedback from homeowners in Lucknow, Raebareli, Kanpur & Ayodhya who experienced our transparent 45-day turnkey execution.
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2.5 rounded-full text-xs font-grotesk transition-all whitespace-nowrap shrink-0 border cursor-pointer ${
                selectedCity === city
                  ? 'bg-[#D4AF37] text-[#1d1625] font-semibold border-[#D4AF37] shadow-md'
                  : 'bg-[#322a3a]/80 text-[#cbc4cc] border-white/10 hover:bg-[#322a3a]'
              }`}
            >
              {city === 'All' ? 'All UP Reviews' : `${city} Clients`}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto font-grotesk">
          {filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              className="bg-[#322a3a]/70 rounded-3xl p-6 sm:p-7 border border-white/10 shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating & Verified Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{review.verifiedBadge}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#cbc4cc] font-light leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Highlights & Author Info */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {review.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded bg-white/10 text-[#D4AF37] text-[10px] font-semibold uppercase tracking-wider"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <img
                    src={review.avatarUrl}
                    alt={review.author}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#D4AF37]/50"
                  />
                  <div>
                    <h4 className="font-garamond text-lg font-medium text-white leading-tight">
                      {review.author}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-[#cbc4cc]">
                      <span className="flex items-center gap-1 text-[#D4AF37]">
                        <MapPin className="w-3 h-3" />
                        {review.location}
                      </span>
                      <span>• {review.propertyType}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
