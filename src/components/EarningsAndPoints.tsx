"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Coins,
  RefreshCw,
  Zap,
  ArrowRight,
  Wallet,
  Check,
} from "lucide-react";

interface EarningsAndPointsProps {
  onOpenApply?: () => void;
}

export default function EarningsAndPoints({ onOpenApply }: EarningsAndPointsProps) {
  const router = useRouter();

  const handleApply = () => {
    if (onOpenApply) {
      onOpenApply();
    } else {
      router.push("/apply");
    }
  };

  // Calculator State
  const [referrals, setReferrals] = useState<number>(30);
  const roughSubscription = 100; // Rough subscription amount ($100)

  // Milestone Tiers:
  // 1 - 25 referrals: Starter Partner (10% commission)
  // 26 - 75 referrals: Growth Partner (20% commission)
  // 75+ referrals: Elite Partner (25% commission)
  let activeTierNum = 1;
  let tierName = "Starter Partner (1–25)";
  let commissionRate = 0.10; // 10%

  if (referrals > 75) {
    activeTierNum = 3;
    tierName = "Elite Partner (75+)";
    commissionRate = 0.25; // 25%
  } else if (referrals >= 26) {
    activeTierNum = 2;
    tierName = "Growth Partner (26–75)";
    commissionRate = 0.20; // 20%
  } else {
    activeTierNum = 1;
    tierName = "Starter Partner (1–25)";
    commissionRate = 0.10; // 10%
  }

  // Per client initial referral commission at the active tier rate
  // Note: 10 Points = $1.00 USD (1 Point = $0.10 USD)
  const dollarsPerClient = Math.round(roughSubscription * commissionRate); // $10, $20, or $25
  const pointsPerClient = dollarsPerClient * 10; // 100, 200, or 250 Points

  // Financial Estimates for total referrals
  const totalDollars = referrals * dollarsPerClient;
  const totalPoints = totalDollars * 10;

  return (
    <section
      id="earnings"
      className="py-8 sm:py-12 bg-gradient-to-b from-white via-indigo-50/20 to-white relative scroll-mt-20 overflow-hidden"
    >
      {/* Subtle Background Accents */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= SECTION HEADER (Matching All Site Headers) ================= */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-2.5">
            <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
            <span className="text-xs sm:text-[13px] font-bold text-[#6560F0] uppercase tracking-[0.16em]">
              Rewards & Commission
            </span>
            <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2.5 sm:mb-3">
            Turn Warm Introductions Into <span className="text-[#6560F0]">Reliable Partner Income.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Everyone starts at 10% and advances to 20% and 25% as referral milestones are achieved, plus separate 10% recurring on renewals.
          </p>
        </div>

        {/* ================= SINGLE SCREEN VIEW: 2 COMPACT CARDS ================= */}
        <div className="grid lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* ========== LEFT CARD: Milestone Progression Tiers ========== */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#6560F0]" />
                    Referral Milestone Progression
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Start at 10% and level up as your successful referrals grow:
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#6560F0] bg-[#6560F0]/10 px-2.5 py-0.5 rounded-full">
                  Up to 25%
                </span>
              </div>

              {/* 3 Clickable Milestone Rows */}
              <div className="space-y-2.5">
                
                {/* Milestone 1: Starter */}
                <button
                  type="button"
                  onClick={() => setReferrals(15)}
                  className={`w-full p-2.5 sm:p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    activeTierNum === 1
                      ? "bg-[#6560F0]/5 border-[#6560F0] ring-1 ring-[#6560F0]/20 shadow-2xs"
                      : "bg-slate-50/70 hover:bg-slate-50 border-slate-200/70"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🌱</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">Starter Partner</span>
                        <span className="text-[10px] text-slate-500 font-semibold bg-slate-200/70 px-1.5 py-0.5 rounded">1 – 25 Referrals</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Starting milestone — all partners begin here</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 block">10% Initial</span>
                    <span className="text-[10px] text-slate-500 block font-medium">100 Pts ($10.00)</span>
                  </div>
                </button>

                {/* Milestone 2: Growth */}
                <button
                  type="button"
                  onClick={() => setReferrals(40)}
                  className={`w-full p-2.5 sm:p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    activeTierNum === 2
                      ? "bg-[#6560F0]/5 border-[#6560F0] ring-1 ring-[#6560F0]/20 shadow-2xs"
                      : "bg-slate-50/70 hover:bg-slate-50 border-slate-200/70"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🚀</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">Growth Partner</span>
                        <span className="text-[10px] text-slate-600 font-semibold bg-slate-200/70 px-1.5 py-0.5 rounded">26 – 75 Referrals</span>
                        <span className="text-[9px] font-bold text-[#6560F0] bg-[#6560F0]/10 px-1.5 py-0.2 rounded">2× Boost</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Unlocked automatically after 25 referrals</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm sm:text-base font-extrabold text-[#6560F0] block">20% Initial</span>
                    <span className="text-[10px] text-[#6560F0] block font-medium">200 Pts ($20.00)</span>
                  </div>
                </button>

                {/* Milestone 3: Elite */}
                <button
                  type="button"
                  onClick={() => setReferrals(80)}
                  className={`w-full p-2.5 sm:p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    activeTierNum === 3
                      ? "bg-amber-50/70 border-amber-400 ring-1 ring-amber-400/30 shadow-2xs"
                      : "bg-slate-50/70 hover:bg-slate-50 border-slate-200/70"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">👑</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">Elite Partner</span>
                        <span className="text-[10px] text-amber-800 font-semibold bg-amber-100/80 px-1.5 py-0.5 rounded">75+ Referrals</span>
                        <span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">Max Rate</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Top milestone reached with 75+ referrals</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm sm:text-base font-extrabold text-amber-600 block">25% Initial</span>
                    <span className="text-[10px] text-amber-600 block font-medium">250 Pts ($25.00)</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Compact 2-badge info footer inside the card */}
            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100">
              <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-emerald-800 uppercase block tracking-wider">Separate Recurring</span>
                  <span className="text-xs font-extrabold text-emerald-700 block truncate">+10% on all renewals</span>
                </div>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-violet-50/70 border border-violet-200/60 flex items-center gap-2">
                <Wallet className="w-3.5 h-3.5 text-[#6560F0] shrink-0" />
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-[#6560F0] uppercase block tracking-wider">Direct Cash Payout</span>
                  <span className="text-xs font-extrabold text-slate-900 block truncate">10 Pts = $1.00 USD</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========== RIGHT CARD: Compact Earnings Calculator ========== */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Earnings Calculator
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Initial referral commission on rough $100 subscription
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#6560F0] bg-[#6560F0]/10 px-2.5 py-0.5 rounded-full shrink-0">
                  {tierName}
                </span>
              </div>

              {/* Slider Row */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">Businesses introduced:</label>
                  <span className="text-sm font-extrabold text-[#6560F0]">
                    {referrals} <span className="text-xs font-medium text-slate-500">Clients</span>
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="120"
                  step="1"
                  value={referrals}
                  onChange={(e) => setReferrals(parseInt(e.target.value) || 1)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#6560F0]"
                />

                {/* Preset Chips aligned with milestones (10, 25, 50, 75+) */}
                <div className="flex items-center justify-between gap-1.5 mt-2">
                  {[
                    { label: "10 (Starter)", val: 10 },
                    { label: "25 (Starter)", val: 25 },
                    { label: "50 (Growth)", val: 50 },
                    { label: "75+ (Elite)", val: 75 },
                  ].map((chip) => (
                    <button
                      key={chip.val}
                      type="button"
                      onClick={() => setReferrals(chip.val)}
                      className={`flex-1 py-1 text-[11px] rounded-lg border font-semibold transition-all cursor-pointer text-center ${
                        referrals === chip.val
                          ? "bg-[#6560F0] text-white border-[#6560F0] shadow-2xs"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compact Light Results Box */}
              <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-white rounded-xl p-3.5 border border-indigo-100/90 mb-3">
                
                {/* Active Tier Commission Benchmark */}
                <div className="flex items-center justify-between text-xs text-slate-600 pb-2 mb-2 border-b border-indigo-100/60">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#6560F0]" />
                    <span>Per Client ({Math.round(commissionRate * 100)}% Initial):</span>
                  </span>
                  <span className="font-bold text-slate-900">
                    {pointsPerClient} Points = ${dollarsPerClient}.00 USD
                  </span>
                </div>

                {/* Total Points & Cash */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 block font-medium">Total Joining Points:</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        {totalPoints.toLocaleString()}
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-[#6560F0]">Points</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block font-medium">Total Cash Payout:</span>
                    <div className="text-xl sm:text-2xl font-black text-emerald-700 mt-0.5">
                      ${totalDollars.toLocaleString()}.00
                    </div>
                  </div>
                </div>

                {/* Footnote */}
                <div className="mt-2 pt-2 border-t border-indigo-100/60 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 text-emerald-600" />
                    Renewals pay separate 10% recurring
                  </span>
                  <span className="font-semibold text-emerald-700">10 Pts = $1.00 USD</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <button
                type="button"
                onClick={handleApply}
                className="w-full py-2.5 px-4 rounded-xl bg-[#6560F0] hover:bg-[#524ad9] active:bg-[#433ea3] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 group cursor-pointer"
              >
                <span>Start Earning as a Partner</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-[10px] text-center text-slate-400 mt-1.5">
                Free to apply • Fast partner onboarding
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
