"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface FinalCtaProps {
  onOpenApply: () => void;
  onExploreBenefits: () => void;
}

export default function FinalCta({ onOpenApply, onExploreBenefits }: FinalCtaProps) {
  return (
    <section className="py-12 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#6560F0] p-5 sm:p-10 lg:p-12 text-white shadow-xl shadow-[#6560F0]/20 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          {/* 2-Column Layout: Text on Left, Buttons on Right */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 relative z-10">
            {/* Left Column: Short text */}
            <div className="max-w-2xl text-left">
              <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                <span className="w-5 h-[2px] bg-white/60 rounded-full" />
                <span className="text-xs font-bold text-white/90 uppercase tracking-[0.16em]">
                  Start Earning Today
                </span>
              </div>

              <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight mb-2 sm:mb-2.5">
                Your Next Opportunity Starts With One Introduction.
              </h2>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-xl">
                Turn your business connections into recurring Livi Points. Join the LiviLeads partner network today.
              </p>
            </div>

            {/* Right Column: Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full lg:w-auto">
              <button
                onClick={onOpenApply}
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#6560F0] hover:text-[#524ad9] font-bold text-xs sm:text-sm shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-out flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Become a Partner</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
              </button>

              <button
                onClick={onExploreBenefits}
                className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5 text-white font-bold text-xs sm:text-sm border border-white/30 backdrop-blur-md transition-all duration-300 ease-out cursor-pointer text-center active:scale-[0.98]"
              >
                Explore Benefits
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
