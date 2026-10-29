"use client";

import React from "react";
import {
  Repeat,
  WalletCards,
  Network,
  Users2,
  LineChart,
  Gift,
} from "lucide-react";

export default function PartnerBenefits() {
  const benefits = [
    {
      id: 1,
      title: "Recurring Rewards",
      description:
        "Earn Livi Points when eligible businesses subscribe and renew their subscriptions, subject to the applicable partner commission policy.",
      icon: Repeat,
      iconStyle: "text-[#6560F0] bg-[#6560F0]/10 border-[#6560F0]/20",
      tag: "Long-Term Value",
    },
    {
      id: 2,
      title: "One Unified Reward System",
      description:
        "All eligible partner commissions are credited as Livi Points. There is no need for a separate monetary earnings wallet.",
      icon: WalletCards,
      iconStyle: "text-blue-600 bg-blue-50 border-blue-100",
      tag: "Simplified Points",
    },
    {
      id: 3,
      title: "Work With Your Existing Network",
      description:
        "Introduce LiviLeads to businesses you already know, including local shops, service providers, and other eligible businesses.",
      icon: Network,
      iconStyle: "text-emerald-600 bg-emerald-50 border-emerald-100",
      tag: "Warm Introductions",
    },
    {
      id: 4,
      title: "Individual or Business Participation",
      description:
        "Join as an individual professional or represent an organization with a sales, marketing, or business development team.",
      icon: Users2,
      iconStyle: "text-[#6560F0] bg-[#6560F0]/10 border-[#6560F0]/20",
      tag: "Flexible Categories",
    },
    {
      id: 5,
      title: "Track Your Performance",
      description:
        "Monitor referrals, business subscription status, eligible commissions, and your points history through the partner portal.",
      icon: LineChart,
      iconStyle: "text-amber-600 bg-amber-50 border-amber-100",
      tag: "Real-Time Portal",
    },
    {
      id: 6,
      title: "Redeem Eligible Rewards",
      description:
        "Accumulate Livi Points and redeem them for supported gift cards, vouchers, and other rewards under the platform's redemption policy.",
      icon: Gift,
      iconStyle: "text-rose-600 bg-rose-50 border-rose-100",
      tag: "Flexible Vouchers",
    },
  ];

  return (
    <section id="benefits" className="py-12 sm:py-20 bg-slate-50/50 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-2.5">
            <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
            <span className="text-xs sm:text-[13px] font-bold text-[#6560F0] uppercase tracking-[0.16em]">
              Partner Benefits
            </span>
            <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3 sm:mb-4">
            More Than a Referral. A Partnership That Grows.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Build valuable business relationships while creating an additional earning opportunity through your existing network.
          </p>
        </div>

        {/* 6 Benefit Cards Grid - Spacious & Clean */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.id}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-slate-200/80 shadow-xs hover:border-[#6560F0]/40 hover:shadow-xl hover:shadow-[#6560F0]/15 hover:-translate-y-1.5 transition-all duration-300 ease-out card-hover-unified group flex flex-col justify-between cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center border ${benefit.iconStyle} shadow-2xs transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-1`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400">
                      {benefit.tag}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-2.5 group-hover:text-[#6560F0] transition-colors duration-250 ease-out">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
