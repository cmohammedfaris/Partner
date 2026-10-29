"use client";

import React from "react";
import { Users, CheckCircle2, XCircle, ArrowRight, Gift, HelpCircle } from "lucide-react";

interface ReferClientsTooProps {
  onLearnMore: () => void;
}

export default function ReferClientsToo({ onLearnMore }: ReferClientsTooProps) {
  return (
    <section className="py-20 bg-slate-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-md relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left 7 cols: Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
                <Users className="w-3.5 h-3.5" />
                <span>EXPANDED EARNING OPPORTUNITY</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Help More People Discover LiviLeads.
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Although the Partner Program focuses on acquiring business subscribers, partners can also introduce client users to LiviLeads.
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                Client users can join and use the platform for free. When a referred client successfully completes the required registration and referral verification, the referrer receives the predefined Livi Points reward.
              </p>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/70 text-xs text-blue-900 flex items-start gap-2.5">
                <Gift className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">No Service Booking Required:</span> A service booking or payment is not required to qualify for client referral rewards under the proposed referral rules.
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onLearnMore}
                  className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm flex items-center gap-2 transition duration-200 cursor-pointer"
                >
                  <span>Learn About Refer & Earn</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right 5 cols: Clear Comparison Grid */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                <span>Client Referral vs Partner Subscriptions</span>
                <HelpCircle className="w-4 h-4 text-slate-400" />
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">
                      Refer client users via your referral link
                    </span>
                    <span className="text-slate-500">
                      Standard invitation links work for both consumers and business clients.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Gift className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">
                      Predefined one-time Livi Points reward
                    </span>
                    <span className="text-slate-500">
                      Awarded directly upon successful identity and registration verification.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 mt-0.5">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">
                      Unified with your Partner balance
                    </span>
                    <span className="text-slate-500">
                      Points pool together and can be redeemed for gift cards and vouchers.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-100/70 rounded-xl border border-slate-200/60 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-200/70 text-slate-500 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    i
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-700 block">
                      Client referrals do not earn recurring renewals
                    </span>
                    <span className="text-slate-500">
                      Only qualifying business subscriptions generate recurring partner commissions.
                    </span>
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
