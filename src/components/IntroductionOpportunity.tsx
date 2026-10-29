"use client";

import React from "react";
import { Users, Briefcase, TrendingUp, LayoutDashboard } from "lucide-react";

export default function IntroductionOpportunity() {
  const cards = [
    {
      title: "For Your Network",
      tagline: "Empower Connections",
      description:
        "Help businesses discover solutions that can support their operations, customer relationships, and growth.",
      icon: Users,
      iconColor: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "For Your Business",
      tagline: "Referral-Based Earning",
      description:
        "Build a referral-based earning opportunity by connecting businesses with LiviLeads.",
      icon: Briefcase,
      iconColor: "text-violet-600 bg-violet-50 border-violet-100",
    },
    {
      title: "For Long-Term Growth",
      tagline: "Recurring Point Streams",
      description:
        "Earn recurring Livi Points from eligible subscription renewals according to the Partner Program terms.",
      icon: TrendingUp,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "For Your Efforts",
      tagline: "Transparent Performance",
      description:
        "Track referred businesses, subscription progress, and earned points through your partner dashboard.",
      icon: LayoutDashboard,
      iconColor: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  return (
    <section className="py-24 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#6560F0]">
              The Partnership Opportunity
            </span>
            <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Network Can Do More.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto pt-1">
            Every business connection is an opportunity to create value. LiviLeads helps businesses discover digital tools and services that support their daily operations and growth.
          </p>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            As a LiviLeads partner, you can introduce businesses to the platform and earn rewards when they become paying subscribers. Whether you are an independent professional or an established organization, the Partner Program gives you a structured way to turn your network into a business opportunity.
          </p>
        </div>

        {/* 4 Cards Grid - Spacious & Clean */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group relative bg-slate-50/60 hover:bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/70 hover:border-violet-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${card.iconColor} shadow-xs transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {card.tagline}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Humanized Partner Community Trust Bar */}
        <div className="mt-14 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <div className="flex items-center -space-x-2">
            <div className="w-8 h-8 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center ring-2 ring-white">
              AK
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center ring-2 ring-white">
              SJ
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center ring-2 ring-white">
              MR
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
              +450
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            <strong>450+ partners</strong> have joined the LiviLeads network to connect local businesses with growth solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
