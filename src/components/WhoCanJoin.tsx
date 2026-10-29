"use client";

import React from "react";
import { Users, ArrowRight } from "lucide-react";

interface WhoCanJoinProps {
  onSelectPartnerType?: (type?: "individual" | "business") => void;
  onOpenApply?: () => void;
}

export default function WhoCanJoin({
  onSelectPartnerType,
  onOpenApply,
}: WhoCanJoinProps) {
  const handleApply = () => {
    if (onOpenApply) {
      onOpenApply();
    } else if (onSelectPartnerType) {
      onSelectPartnerType();
    }
  };

  const suitableProfiles = [
    "Freelancers & Contractors",
    "Digital & Marketing Agencies",
    "Independent Sales Agents",
    "Telecalling & SDR Teams",
    "Business Development Pros",
    "B2B Lead Gen Agencies",
    "Management Consultants",
    "Outsourced Sales Firms",
  ];

  const keyBenefits = [
    "Refer businesses using your unique partner link & code.",
    "Earn up to 25% upfront commission plus 10% recurring on renewals.",
    "Track referrals, conversions, and points in real time.",
    "Monitor rewards through your personal partner dashboard.",
    "Instant auto-activation with fast cash redemptions to Bank or UPI.",
  ];

  return (
    <section id="who-can-join" className="py-12 sm:py-16 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-2.5">
            <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
            <span className="text-xs sm:text-[13px] font-bold text-[#6560F0] uppercase tracking-[0.16em]">
              Who Can Join
            </span>
            <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2.5">
            Find Your Place in the LiviLeads Partner Network.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            The Partner Program is open to eligible individuals and organizations that want to help businesses discover LiviLeads.
          </p>
        </div>

        {/* Wide Landscape Card: Width increased to match other sections, height significantly reduced */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              {/* Left Column (5 cols): Identity, Pitch & CTA */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#6560F0]/10 text-[#6560F0] flex items-center justify-center font-bold shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold text-[#6560F0] bg-slate-50 border border-slate-200/80">
                      Universal Track
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                    Build Your Growth & Earning Opportunity.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    Turn your professional network into recurring revenue. Open to independent professionals, agencies, and sales teams alike with the same full dashboard.
                  </p>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleApply}
                    className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-[#6560F0] hover:bg-[#524ad9] active:bg-[#443fa7] text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Join the Partner Program</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                  <p className="text-[11px] text-slate-400 mt-2 font-medium">
                    Instant setup • Free to join • Same full dashboard for all
                  </p>
                </div>
              </div>

              {/* Right Column (7 cols): Suitable For & Key Benefits in compact layout */}
              <div className="lg:col-span-7 lg:border-l lg:border-slate-100 lg:pl-8 space-y-4">
                {/* Suitable For */}
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    SUITABLE FOR:
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {suitableProfiles.map((item) => (
                      <span
                        key={item}
                        className="text-xs text-slate-700 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200/80 font-medium cursor-default hover:bg-[#6560F0]/5 hover:text-[#6560F0] hover:border-[#6560F0]/30 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Benefits (2-column grid for minimal vertical height) */}
                <div className="border-t border-slate-100 pt-3.5">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    KEY BENEFITS:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                    {keyBenefits.map((b) => (
                      <div key={b} className="flex items-start gap-2 text-xs text-slate-600">
                        <span className="text-violet-600 font-bold shrink-0 mt-0.5">•</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
