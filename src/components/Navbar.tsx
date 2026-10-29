"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import LiviLogo from "./LiviLogo";
import { Menu, X, ArrowRight, UserCheck } from "lucide-react";

interface NavbarProps {
  onOpenLogin?: () => void;
  onOpenApply: () => void;
}

export default function Navbar({ onOpenLogin, onOpenApply }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Benefits", href: "#benefits" },
    { name: "Who Can Join?", href: "#who-can-join" },
    { name: "Earnings", href: "#earnings" },
    { name: "FAQs", href: "#faqs" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/60 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Partner Badge */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="LiviLeads Partner Program Home"
          >
            <LiviLogo size="md" showBadge={true} badgeText="Partner Program" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-50/80 px-4 py-1.5 rounded-full border border-slate-200/60 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs font-semibold text-slate-600 hover:text-[#6560F0] px-3 py-1.5 rounded-full hover:bg-white hover:shadow-xs transition-all duration-250 ease-out active:scale-95"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-bold text-slate-700 hover:text-[#6560F0] px-3.5 py-2 rounded-xl transition-all duration-250 ease-out flex items-center gap-1.5 hover:bg-slate-100/80 active:scale-95 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Partner Login</span>
            </Link>

            {isScrolled && (
              <button
                onClick={onOpenApply}
                className="px-5 py-2.5 rounded-full bg-[#6560F0] hover:bg-[#524ad9] active:bg-[#443fa7] text-white text-xs font-bold shadow-md shadow-[#6560F0]/25 hover:shadow-lg hover:shadow-[#6560F0]/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-250 ease-out flex items-center gap-2 cursor-pointer animate-in fade-in"
              >
                <span>Become a Partner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {isScrolled && (
              <button
                onClick={onOpenApply}
                className="sm:hidden px-3.5 py-1.5 rounded-full bg-[#6560F0] text-white text-xs font-bold shadow-xs transition-all duration-200 animate-in fade-in"
              >
                Apply
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl px-5 pt-3 pb-6 animate-in slide-in-from-top-3 duration-200">
          <div className="space-y-1 py-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#6560F0] hover:bg-[#6560F0]/5 transition"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition"
            >
              <UserCheck className="w-4 h-4 text-slate-500" />
              <span>Partner Login</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApply();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#6560F0] hover:bg-[#524ad9] text-white font-bold text-xs shadow-md shadow-[#6560F0]/25 flex items-center justify-center gap-2"
            >
              <span>Become a Partner</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
