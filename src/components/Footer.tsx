"use client";

import React from "react";
import Link from "next/link";
import LiviLogo from "./LiviLogo";
import { ExternalLink } from "lucide-react";

interface FooterProps {
  onOpenLogin?: () => void;
  onOpenApply: () => void;
  onOpenTerms: () => void;
  onOpenRewardsPolicy: () => void;
  onOpenReferEarn: () => void;
}

export default function Footer({
  onOpenLogin,
  onOpenApply,
  onOpenTerms,
  onOpenRewardsPolicy,
  onOpenReferEarn,
}: FooterProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 sm:pt-16 pb-10 sm:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 pb-10 sm:pb-14 border-b border-slate-800">
          {/* Brand Info (4 cols) */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <LiviLogo size="md" variant="dark" showBadge={true} badgeText="Partner Program" />

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The modern business management platform connecting services, clients, and growth networks. Partner with LiviLeads to introduce businesses and earn recurring Livi Points.
            </p>

            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-violet-600 hover:text-white flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-out"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-violet-600 hover:text-white flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-out"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-violet-600 hover:text-white flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-out"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-violet-600 hover:text-white flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-out"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Company (2 cols) */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://livileads.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <span>About LiviLeads</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@livileads.com"
                  className="hover:text-white transition"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("faqs")}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Help Center
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Partner Program (2 cols) */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Partner Program
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollTo("benefits")}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("how-it-works")}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("benefits")}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Partner Benefits
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenApply}
                  className="hover:text-violet-400 font-semibold transition text-left cursor-pointer"
                >
                  Become a Partner
                </button>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-white transition text-left cursor-pointer inline-block"
                >
                  Partner Login
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-violet-400 hover:text-violet-300 font-semibold transition text-left cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Admin Portal</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-md font-mono bg-white/10 text-slate-300 font-semibold tracking-wider">
                    CONSOLE
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Rewards (2 cols) */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Rewards
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenReferEarn}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Refer & Earn
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("earnings")}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Livi Points
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRewardsPolicy}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Rewards & Redemption Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal (2 cols) */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Partner Program Terms
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-slate-400 gap-3 text-center sm:text-left">
          <p>© 2026 LiviLeads. All rights reserved.</p>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs text-slate-400">
            <span>Unified Livi Points Rewards System</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
