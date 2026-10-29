"use client";

import React from "react";
import { X, FileText, CheckCircle } from "lucide-react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tab?: "terms" | "rewards" | "privacy";
}

export default function TermsModal({
  isOpen,
  onClose,
  tab = "terms",
}: TermsModalProps) {
  const [activeTab, setActiveTab] = React.useState<"terms" | "rewards" | "privacy">(tab);

  React.useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-violet-600" />
            <h3 className="text-base font-bold text-slate-900">
              LiviLeads Partner Program Governance & Policies
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-full transition"
            aria-label="Close terms modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 px-6 bg-white gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("terms")}
            className={`py-3 border-b-2 transition ${
              activeTab === "terms"
                ? "border-violet-600 text-violet-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Partner Agreement Terms
          </button>
          <button
            onClick={() => setActiveTab("rewards")}
            className={`py-3 border-b-2 transition ${
              activeTab === "rewards"
                ? "border-violet-600 text-violet-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Livi Points & Redemption Policy
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`py-3 border-b-2 transition ${
              activeTab === "privacy"
                ? "border-violet-600 text-violet-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Partner Privacy & Compliance
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto text-xs text-slate-600 space-y-4 leading-relaxed">
          {activeTab === "terms" && (
            <div className="space-y-4">
              <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-amber-900">
                <p>
                  <strong>Commercial Terms Notice:</strong> Partner commission rates, eligible subscription plans, renewal eligibility windows, and commercial arrangements are defined strictly in each approved partner agreement. No earnings are guaranteed.
                </p>
              </div>

              <h4 className="font-bold text-slate-900 text-sm">1. Program Scope & Eligibility</h4>
              <p>
                The LiviLeads Partner Program allows approved individual professionals and registered business entities to introduce potential business subscribers to the LiviLeads platform. Acceptance into the program is subject to application review, verification checks, and final approval by LiviLeads.
              </p>

              <h4 className="font-bold text-slate-900 text-sm">2. Referral Tracking & Attribution</h4>
              <p>
                Referrals are attributed exclusively through approved unique referral links, partner tracking IDs, or manual account assignments verified by the LiviLeads partner operations team. A business is deemed eligible only after successfully executing a qualified subscription payment.
              </p>

              <h4 className="font-bold text-slate-900 text-sm">3. Recurring Renewal Commissions</h4>
              <p>
                Qualifying partners may earn recurring rewards from subsequent subscription renewals executed by referred businesses. Renewal commission eligibility, duration, and thresholds are governed by the specific terms of the partner&apos;s approved agreement.
              </p>
            </div>
          )}

          {activeTab === "rewards" && (
            <div className="space-y-4">
              <div className="bg-violet-50 p-3.5 rounded-xl border border-violet-200 text-violet-900">
                <p className="font-bold">Unified Reward Points Architecture:</p>
                <p className="mt-1">
                  Points accumulate into a unified partner balance and are exchangeable for supported digital gift cards, vouchers, and rewards according to the platform rewards catalog.
                </p>
              </div>

              <h4 className="font-bold text-slate-900 text-sm">1. Unified Points Architecture</h4>
              <p>
                All partner rewards and referral compensations are credited in Livi Points. LiviLeads does not operate a separate fiat monetary earnings wallet under this program.
              </p>

              <h4 className="font-bold text-slate-900 text-sm">2. Non-Cash Nature</h4>
              <p>
                Point balances describe platform reward values and must not be construed as a promise of direct cash withdrawals or banking wire transfers unless officially supported by LiviLeads.
              </p>

              <h4 className="font-bold text-slate-900 text-sm">3. Redemption Fulfillment</h4>
              <p>
                Points can be redeemed through the Partner Dashboard for approved third-party gift cards (e.g., Amazon, Apple, Google Cloud, service credits) subject to minimum redemption thresholds and vendor availability.
              </p>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">1. Data Handling & Security</h4>
              <p>
                LiviLeads processes partner contact information, business profile details, and referral records strictly for operating the Partner Program, calculating eligible points, and complying with regulatory standards.
              </p>

              <h4 className="font-bold text-slate-900 text-sm">2. Anti-Spam & Ethical Outreach</h4>
              <p>
                Partners agree to conduct outreach in a respectful, transparent, and legally compliant manner. Unsolicited bulk messaging (spam) or misleading claims about LiviLeads services will result in immediate disqualification and revocation of points.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
            <CheckCircle className="w-4 h-4" />
            <span>Official Policy Framework</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
}
