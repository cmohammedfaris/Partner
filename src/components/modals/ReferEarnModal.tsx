"use client";

import React from "react";
import { X, Users, Gift, CheckCircle, ArrowRight, Coins, Building2 } from "lucide-react";

interface ReferEarnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPartner?: () => void;
}

export default function ReferEarnModal({
  isOpen,
  onClose,
  onApplyPartner,
}: ReferEarnModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Understanding Refer & Earn vs. Partner Program
              </h3>
              <p className="text-xs text-slate-500">
                How Livi Points operate across client referrals and business partner acquisitions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-full transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600">
          <div className="bg-[#6560F0]/10 p-4 rounded-2xl border border-[#6560F0]/20">
            <div className="flex items-start gap-3">
              <Coins className="w-5 h-5 text-[#6560F0] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900">One Unified Livi Points Balance</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Both client referrals and partner business referrals credit points directly to your single Livi Points balance. You never have to juggle multiple wallets or fragmented rewards.
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Client Refer & Earn */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-200/80">
                    Client Users
                  </span>
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <h5 className="font-bold text-slate-900 text-base mb-1">Refer & Earn</h5>
                <p className="text-xs text-slate-500 mb-4">
                  For introducing everyday customers seeking verified local services.
                </p>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Free platform access for client users</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Fixed, one-time Livi Points reward per verified client</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>No service booking or payment required</strong> to qualify</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-400">
                    <span className="w-4 h-4 flex items-center justify-center font-bold">✕</span>
                    <span>Does not earn recurring renewal commissions</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Partner Program */}
            <div className="p-5 rounded-2xl border-2 border-[#6560F0]/30 bg-[#6560F0]/5 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#6560F0]/10 rounded-bl-full pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-[#6560F0]/10 text-[#6560F0] rounded-lg border border-[#6560F0]/20">
                    Business Subscribers
                  </span>
                  <Building2 className="w-4 h-4 text-[#6560F0]" />
                </div>
                <h5 className="font-bold text-slate-900 text-base mb-1">Partner Program</h5>
                <p className="text-xs text-slate-500 mb-4">
                  For introducing business owners, agencies, and service providers.
                </p>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#6560F0] shrink-0 mt-0.5" />
                    <span>Commission credited as Livi Points on eligible subscriptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                    <span><strong>Recurring Livi Points on qualifying subscription renewals</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                    <span>Dedicated Partner Portal with analytics, referral links & tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                    <span>Higher earning potential for active network builders</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 space-y-1.5 border border-slate-200">
            <p className="font-semibold text-slate-800">Key Redemption Rule:</p>
            <p>
              Points from all eligible referrals pool directly into your unified balance, redeemable for supported vouchers and gift cards under the official reward policy.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              if (onApplyPartner) onApplyPartner();
            }}
            className="px-5 py-2.5 bg-[#6560F0] hover:bg-[#524ad9] text-white font-semibold text-xs rounded-xl shadow-md shadow-[#6560F0]/20 flex items-center gap-1.5 transition"
          >
            <span>Apply as a Business Partner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
