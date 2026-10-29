"use client";

import React, { useState } from "react";
import { X, Lock, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import LiviLogo from "../LiviLogo";

interface PartnerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApply?: () => void;
}

export default function PartnerLoginModal({
  isOpen,
  onClose,
  onOpenApply,
}: PartnerLoginModalProps) {
  const [identifier, setIdentifier] = useState("partner@apexventures.com");
  const [password, setPassword] = useState("••••••••••••");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      setTimeout(() => {
        setIsLoggedIn(false);
        onClose();
        // Scroll to dashboard preview
        const section = document.getElementById("benefits");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-[#6560F0]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close login modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-5 sm:p-8">
          <div className="mb-5 sm:mb-6">
            <LiviLogo size="sm" showBadge={true} badgeText="Partner Portal" />
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-3 sm:mt-4">Welcome Back</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Log in to manage your referrals, monitor subscriptions, and view Livi Points.
            </p>
          </div>

          {isLoggedIn ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl mx-auto flex items-center justify-center border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Authenticated Successfully</h4>
              <p className="text-sm text-slate-500">
                Opening your Partner Portal Dashboard preview...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Partner ID or Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. LL-PRT-8821 or email@domain.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Password reset instructions have been sent to your registered partner email.");
                    }}
                    className="text-xs text-violet-600 hover:text-violet-700 font-medium"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your partner password"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-slate-300 text-violet-600 focus:ring-violet-500 w-4 h-4"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 bg-[#6560F0] hover:bg-[#524ad9] text-white font-semibold rounded-xl text-sm shadow-md shadow-[#6560F0]/20 flex items-center justify-center gap-2 transition duration-200 disabled:opacity-70 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating Partner...
                  </span>
                ) : (
                  <>
                    <span>Enter Partner Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="p-3 bg-violet-50/70 border border-violet-100 rounded-xl text-xs text-violet-800 flex items-start gap-2">
                <span className="font-bold shrink-0">Demo Tip:</span>
                <span>Click &quot;Enter Partner Portal&quot; to test with this prefilled demo account and inspect the dashboard modules.</span>
              </div>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
            Not an approved partner yet?{" "}
            <button
              onClick={() => {
                onClose();
                if (onOpenApply) onOpenApply();
              }}
              className="font-semibold text-violet-600 hover:text-violet-700 underline underline-offset-2 ml-1"
            >
              Apply to Become a Partner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
