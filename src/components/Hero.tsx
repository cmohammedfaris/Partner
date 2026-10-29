"use client";

import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Coins,
} from "lucide-react";

interface HeroProps {
  onOpenApply: () => void;
  onExploreHowItWorks: () => void;
}

export default function Hero({ onOpenApply, onExploreHowItWorks }: HeroProps) {
  return (
    <section className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#6560F0]/5 via-white to-white">
      {/* Background Soft Glow (Clean, airy, spacious) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[720px] h-[420px] bg-[#6560F0]/10 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-14 items-center">
          {/* Left Column: Headline & Messaging */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7 text-center lg:text-left">
            {/* Handcrafted Editorial Eyebrow Header */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              <span className="w-6 h-[2px] bg-[#6560F0] rounded-full" />
              <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#6560F0]">
                Official Partner Program
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">20% Lifetime Recurring</span>
            </div>

            {/* Main Headline - Responsive Scaling for iPhone SE & Up */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[2.05rem] xl:text-[2.35rem] font-extrabold text-slate-900 tracking-tight leading-[1.25]">
              <span className="block">Grow Your Network.</span>
              <span className="block mt-1 sm:mt-2 text-[#6560F0]">
                Earn With Every Business You Bring.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Turn your professional connections into earning opportunities. Partner with LiviLeads, introduce businesses to smarter business management solutions, and earn Livi Points from eligible subscriptions and renewals.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 w-full">
              <button
                onClick={onOpenApply}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#6560F0] hover:bg-[#524ad9] active:bg-[#443fa7] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#6560F0]/25 hover:shadow-xl hover:shadow-[#6560F0]/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-out flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Become a Partner</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
              </button>

              <button
                onClick={onExploreHowItWorks}
                className="w-full sm:w-auto px-5 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white hover:bg-[#6560F0]/5 text-slate-700 hover:text-[#6560F0] font-bold text-xs sm:text-sm border border-slate-200 shadow-xs hover:border-[#6560F0]/30 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-out flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Discover How It Works</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#6560F0] transition-all duration-300 ease-out group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Clean, Humanized, Spacious Visual */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo Frame of Real Business Partners */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-slate-200/80 hover:border-[#6560F0]/40 bg-white group transition-all duration-300 ease-out card-hover-unified">
                <div className="aspect-[4/3] relative w-full overflow-hidden bg-slate-100">
                  <Image
                    src="/images/hero_partners.jpg"
                    alt="LiviLeads Business Partners Collaborating"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Bottom Overlay Information Bar */}
                <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 bg-white/95 backdrop-blur-md p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/80 shadow-lg flex items-center justify-between gap-2 transition-all duration-300 ease-out group-hover:border-[#6560F0]/30">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#6560F0] flex items-center justify-center text-white font-bold text-[11px] sm:text-sm shadow-xs shrink-0 transition-transform duration-300 ease-out group-hover:scale-105">
                      SJ
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] sm:text-xs font-bold text-slate-900 truncate block">
                        Sarah Jenkins
                      </span>
                      <span className="text-[9px] sm:text-[11px] text-slate-500 block truncate">
                        Agency Partner • 18 Referred
                      </span>
                    </div>
                  </div>

                  <span className="text-[9px] sm:text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0 whitespace-nowrap shadow-2xs">
                    Active Partner
                  </span>
                </div>
              </div>

              {/* Minimal Clean Top Badge */}
              <div className="absolute -top-3 right-1 sm:-right-4 max-w-[calc(100%-1rem)] bg-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-slate-200/80 flex items-center gap-1.5 sm:gap-2 z-10 hover:shadow-xl hover:shadow-[#6560F0]/15 hover:border-[#6560F0]/40 hover:-translate-y-1.5 transition-all duration-300 ease-out card-hover-unified">
                <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
                <span className="text-[11px] sm:text-xs font-extrabold text-slate-800 whitespace-nowrap truncate">
                  Earn Livi Points <span className="hidden min-[360px]:inline font-normal text-slate-500 text-[10px] sm:text-[11px]">on Every Lead</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
