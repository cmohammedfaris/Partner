"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, User, Building2, Mail, Phone } from "lucide-react";
import LiviLogo from "../LiviLogo";

interface PartnerInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTrack?: "individual" | "business";
}

export default function PartnerInquiryModal({
  isOpen,
  onClose,
  defaultTrack = "individual",
}: PartnerInquiryModalProps) {
  const [track, setTrack] = useState<"individual" | "business">(defaultTrack);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTrack(defaultTrack);
  }, [defaultTrack]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-[#6560F0]" />

        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close inquiry modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-7 sm:p-8">
          <div className="mb-6">
            <LiviLogo size="sm" showBadge={true} badgeText="Partner Program" />
            <h3 className="text-2xl font-bold text-slate-900 mt-4">
              Join the Partner Network
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Connect your network and start earning Livi Points with every business you bring.
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl mx-auto flex items-center justify-center border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Inquiry Received</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto leading-relaxed">
                Thank you, <strong>{name || "Partner"}</strong>. Our partnerships team will review your information and reach out within 1 business day.
              </p>
              <button
                onClick={handleResetAndClose}
                className="mt-4 px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition shadow-xs"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Track Selector with clean hover cards */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Partner Category
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTrack("individual")}
                    className={`p-3 rounded-2xl border text-left transition-all duration-200 flex items-center gap-2.5 ${
                      track === "individual"
                        ? "border-violet-500 bg-violet-50/50 text-violet-900"
                        : "border-slate-200 bg-white hover:border-slate-300 text-slate-600"
                    }`}
                  >
                    <User className="w-4 h-4 text-violet-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">Individual</div>
                      <div className="text-[10px] text-slate-500">Consultant / Freelancer</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTrack("business")}
                    className={`p-3 rounded-2xl border text-left transition-all duration-200 flex items-center gap-2.5 ${
                      track === "business"
                        ? "border-violet-500 bg-violet-50/50 text-violet-900"
                        : "border-slate-200 bg-white hover:border-slate-300 text-slate-600"
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">Business</div>
                      <div className="text-[10px] text-slate-500">Agency / Company</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  {track === "individual" ? "Full Name" : "Company / Representative Name"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={track === "individual" ? "e.g. Alex Morgan" : "e.g. Apex Marketing Group"}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Work Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition"
                  />
                </div>
              </div>



              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-3 py-3 px-5 bg-[#6560F0] hover:bg-[#524ad9] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-[#6560F0]/25 flex items-center justify-center gap-2 transition duration-200 disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting Inquiry...
                  </span>
                ) : (
                  <>
                    <span>Submit Partner Application</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <p className="text-[11px] text-slate-500">
                  Prefer direct communication? Email us directly at{" "}
                  <a
                    href="mailto:partners@livileads.com"
                    className="font-bold text-violet-600 hover:underline"
                  >
                    partners@livileads.com
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
