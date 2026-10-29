"use client";

import React from "react";
import { Send, FileSearch, MailCheck, LayoutDashboard, ShieldCheck } from "lucide-react";

interface OnboardingProcessProps {
  onApplyNow?: () => void;
}

export default function OnboardingProcess({ onApplyNow }: OnboardingProcessProps) {
  const stages = [
    {
      stage: 1,
      title: "1. Submit Application",
      description:
        "Select your track. Individuals submit Basic Details and upload CV. Companies provide Owner Details and Proof of Genuineness.",
      icon: Send,
      color: "from-[#6560F0] to-[#524ad9]",
      stepBadge: "Stage 01",
    },
    {
      stage: 2,
      title: "2. Screening & Evaluation",
      description:
        "Our team evaluates suitability. Individuals complete a scheduled evaluation interview; companies undergo corporate document registry verification.",
      icon: FileSearch,
      color: "from-[#6560F0] to-[#524ad9]",
      stepBadge: "Stage 02",
    },
    {
      stage: 3,
      title: "3. Approval & Automated Email",
      description:
        "Approved partners receive an automated welcome email with official partner ID, agreement terms, and secure temporary credentials.",
      icon: MailCheck,
      color: "from-amber-500 to-orange-600",
      stepBadge: "Stage 03",
    },
    {
      stage: 4,
      title: "4. Partner Portal Access",
      description:
        "Log in to your partner portal to access unique referral tracking mechanisms, monitor active business subscriptions, and redeem Livi Points.",
      icon: LayoutDashboard,
      color: "from-emerald-500 to-teal-600",
      stepBadge: "Stage 04",
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#6560F0]">
              Partner Onboarding Lifecycle
            </span>
            <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-4">
            Getting Started Is Clear and Structured.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Follow the 4-stage lifecycle from initial application and screening to active portal onboarding and live referral rewards.
          </p>
        </div>

        {/* 4 Stages Responsive Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {stages.map((stg) => {
            const Icon = stg.icon;
            return (
              <div
                key={stg.stage}
                className="bg-slate-50/70 rounded-3xl p-7 border border-slate-200/80 hover:border-violet-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stg.color} flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-extrabold text-violet-700 bg-violet-100/70 px-2.5 py-0.5 rounded-full border border-violet-200">
                      {stg.stepBadge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {stg.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {stg.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance note leading smoothly into the form below */}
        <div className="mt-12 text-center max-w-xl mx-auto">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Application approval is subject to eligibility verification and LiviLeads Partner Program governance.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
