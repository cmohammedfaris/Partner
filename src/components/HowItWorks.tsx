"use client";

import React from "react";
import {
  FileText,
  UserCheck2,
  Share2,
  Coins,
  Gift,
  ChevronRight,
} from "lucide-react";

interface HowItWorksProps {
  onStartJourney: () => void;
}

export default function HowItWorks({ onStartJourney }: HowItWorksProps) {
  const steps = [
    {
      step: 1,
      title: "Apply to Become a Partner",
      description:
        "Submit your application with your contact details, partner type, and relevant experience or business information.",
      icon: FileText,
      tag: "Step 01",
      badge: "Quick Onboarding",
      floatClass: "animate-float-step-1",
      highlight: false,
    },
    {
      step: 2,
      title: "Get Approved",
      description:
        "The LiviLeads team reviews your application. Once approved, you can access your partner portal and referral tools.",
      icon: UserCheck2,
      tag: "Step 02",
      badge: "Partner Review",
      floatClass: "animate-float-step-2",
      highlight: false,
    },
    {
      step: 3,
      title: "Refer Businesses",
      description:
        "Introduce eligible businesses to LiviLeads using your unique referral link or other approved referral-tracking method.",
      icon: Share2,
      tag: "Step 03",
      badge: "Unique Attribution",
      floatClass: "animate-float-step-3",
      highlight: false,
    },
    {
      step: 4,
      title: "Earn Livi Points",
      description:
        "When a referred business completes an eligible subscription payment, your applicable partner commission is credited as Livi Points. Eligible renewals earn recurring points.",
      icon: Coins,
      tag: "Step 04",
      badge: "20% Lifetime",
      floatClass: "animate-float-step-4",
      highlight: true,
    },
    {
      step: 5,
      title: "Redeem Your Rewards",
      description:
        "Accumulate Livi Points and redeem them for available gift cards, vouchers, or other supported rewards once you meet the applicable redemption requirements.",
      icon: Gift,
      tag: "Step 05",
      badge: "Flexible Perks",
      floatClass: "animate-float-step-5",
      highlight: false,
    },
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-20 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-2.5">
            <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
            <span className="text-xs sm:text-[13px] font-bold text-[#6560F0] uppercase tracking-[0.16em]">
              How It Works
            </span>
            <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3 sm:mb-4">
            From Your First Referral to Recurring Rewards.
          </h2>
          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed">
            Getting started is simple. Join the program, introduce businesses to LiviLeads, and earn Livi Points as eligible subscriptions are completed and renewed.
          </p>
        </div>

        {/* 5-Step Process in Single Line with Staggered Floating Animation */}
        <div className="relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 relative z-10">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className={`relative flex flex-col ${s.floatClass} hover:![animation-play-state:paused]`}
                >
                  {/* Floating Forward Chevron between cards on Desktop */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white border border-slate-200/90 text-slate-400 items-center justify-center shadow-xs transition-transform duration-300 pointer-events-none">
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  )}

                  {/* Dynamic Floating Card */}
                  <div
                    className={`rounded-2xl sm:rounded-3xl p-5 sm:p-5.5 border transition-all duration-300 ease-out group relative overflow-hidden flex flex-col justify-between h-full cursor-default ${
                      s.highlight
                        ? "bg-gradient-to-b from-[#6560F0]/[0.05] via-white to-white border-[#6560F0]/40 shadow-md shadow-[#6560F0]/10 hover:border-[#6560F0] hover:shadow-2xl hover:shadow-[#6560F0]/25 hover:-translate-y-2 ring-1 ring-[#6560F0]/20"
                        : "bg-white border-slate-200/90 shadow-sm hover:border-[#6560F0]/50 hover:shadow-xl hover:shadow-[#6560F0]/15 hover:-translate-y-2"
                    }`}
                  >
                    {/* Watermark Step Number in Background */}
                    <span className="absolute top-2 right-3 font-mono font-black text-4xl text-slate-100 group-hover:text-[#6560F0]/10 select-none pointer-events-none transition-colors duration-300">
                      0{s.step}
                    </span>

                    <div>
                      {/* Top Step Tag & Badge */}
                      <div className="flex items-center justify-between mb-3.5 relative z-10">
                        <span
                          className={`text-[10px] sm:text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border transition-colors duration-300 ${
                            s.highlight
                              ? "bg-[#6560F0] text-white border-[#6560F0]"
                              : "bg-[#6560F0]/10 text-[#6560F0] border-[#6560F0]/20 group-hover:bg-[#6560F0] group-hover:text-white group-hover:border-[#6560F0]"
                          }`}
                        >
                          {s.tag}
                        </span>

                        <span
                          className={`text-[10px] sm:text-[11px] font-semibold transition-colors duration-300 ${
                            s.highlight ? "text-[#6560F0] font-bold" : "text-slate-400 group-hover:text-slate-600"
                          }`}
                        >
                          {s.badge}
                        </span>
                      </div>

                      {/* Icon Container with smooth hover pulse & scale */}
                      <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3.5 sm:mb-4 overflow-hidden shadow-2xs group-hover:shadow-md group-hover:shadow-[#6560F0]/30 transition-all duration-300 ease-out group-hover:scale-105">
                        <div
                          className={`absolute inset-0 transition-opacity duration-300 ${
                            s.highlight
                              ? "bg-[#6560F0]"
                              : "bg-[#6560F0]/10 group-hover:opacity-0"
                          }`}
                        />
                        <div
                          className={`absolute inset-0 bg-[#6560F0] transition-opacity duration-300 ${
                            s.highlight ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          }`}
                        />
                        <Icon
                          className={`relative z-10 w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ease-out ${
                            s.highlight
                              ? "text-white"
                              : "text-[#6560F0] group-hover:text-white"
                          }`}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 leading-snug group-hover:text-[#6560F0] transition-colors duration-300 ease-out">
                        {s.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {s.description}
                      </p>
                    </div>

                    {/* Bottom Progress Footnote */}
                    <div className="mt-4 pt-3 border-t border-slate-100/90 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-mono font-medium">Stage 0{s.step}/05</span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          s.highlight
                            ? "bg-[#6560F0] scale-125"
                            : "bg-slate-300 group-hover:bg-[#6560F0] group-hover:scale-125"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
