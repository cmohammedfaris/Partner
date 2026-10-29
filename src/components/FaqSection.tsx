"use client";

import React, { useState } from "react";
import { Plus, Minus, MessageSquare, ArrowRight, Search } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      q: "What is the LiviLeads Partner Program?",
      a: "The LiviLeads Partner Program allows eligible individuals and organizations to introduce businesses to LiviLeads and earn Livi Points from qualifying subscriptions and renewals under the applicable partner agreement.",
      category: "General",
    },
    {
      q: "Who can become a partner?",
      a: "Freelancers, sales agents, independent professionals, marketing agencies, telecalling companies, sales agencies, and other eligible individuals or organizations can apply.",
      category: "Eligibility",
    },
    {
      q: "How do I earn rewards?",
      a: "Partners earn tiered upfront commissions on every initial business subscription: 10% for Tier 1 (up to 25 referrals), 20% for Tier 2 (26 to 99 referrals), and 25% for Tier 3 (100+ referrals). You also earn an ongoing 10% recurring commission every time your referred businesses renew their subscription.",
      category: "Earnings",
    },
    {
      q: "What are Livi Points?",
      a: "Livi Points are the unified reward points used by LiviLeads for referral and partner rewards. Points accumulate in your account and can be redeemed for eligible rewards under the redemption policy.",
      category: "Points",
    },
    {
      q: "How do Livi Points work?",
      a: "Livi Points are the unified reward points earned from qualified business referrals and subscription renewals. Accumulated points can be redeemed for supported gift cards, vouchers, and rewards according to the platform catalog and partner policy.",
      category: "Points",
    },
    {
      q: "Can I earn from subscription renewals?",
      a: "Yes! Every partner earns a guaranteed 10% recurring commission on every subscription renewal (monthly or annual) made by businesses they referred, building predictable recurring income.",
      category: "Earnings",
    },
    {
      q: "Can I refer client users as well?",
      a: "Yes. Partners can refer client users and earn the standard fixed Livi Points reward when the referral satisfies the applicable registration and verification requirements. A service booking or payment is not required for this proposed client referral reward.",
      category: "Referrals",
    },
    {
      q: "Do I need to pay to become a partner?",
      a: "The partner application process and any associated fees must follow the official LiviLeads policy. Do not advertise the program as free until this has been confirmed by the business team.",
      category: "Eligibility",
    },
    {
      q: "How do I redeem my points?",
      a: "Once you meet the applicable redemption requirements, you can exchange your accumulated points for supported gift cards, vouchers, or other eligible rewards available through LiviLeads.",
      category: "Redemption",
    },
    {
      q: "Is earning guaranteed?",
      a: "No. Rewards depend on eligible referrals, completed subscription payments, applicable commission terms, and compliance with the Partner Program rules. Earnings are not guaranteed.",
      category: "Earnings",
    },
    {
      q: "How can I track my referrals?",
      a: "Approved partners can use the partner portal to track referral status, subscription progress, eligible rewards, points history, and redemption activity.",
      category: "Portal",
    },
    {
      q: "What happens after I submit my application?",
      a: "Your application is reviewed by the LiviLeads team. If approved, you receive access to the partner onboarding process and relevant partner tools.",
      category: "Onboarding",
    },
  ];

  const filteredFaqs = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-12 sm:py-20 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Full-height track with sticky inner content */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 sm:top-28 space-y-4 sm:space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
                  <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
                  <span className="text-xs sm:text-[13px] font-bold text-[#6560F0] uppercase tracking-[0.16em]">
                    Frequently Asked Questions
                  </span>
                </div>

                <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Got questions? <br />
                  <span className="text-[#6560F0]">We&apos;ve got answers.</span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5 sm:mt-3">
                  Here&apos;s everything you need to know about the LiviLeads Partner Program, commission structures, and points redemption before getting started.
                </p>
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search common questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#6560F0]/20 focus:border-[#6560F0] transition"
                />
              </div>

              {/* Still have questions? Chat Card */}
              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#6560F0]/40 hover:shadow-xl hover:shadow-[#6560F0]/15 hover:-translate-y-1.5 transition-all duration-300 ease-out card-hover-unified space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#6560F0]/10 text-[#6560F0] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">Still have questions?</h3>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  Contact our partnerships team directly and we&apos;ll be happy to assist you with onboarding and terms.
                </p>
                <a
                  href="mailto:partners@livileads.com"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#6560F0] hover:bg-[#524ad9] text-white font-bold text-xs shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-out"
                >
                  <span>Chat with Partnerships</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 12 Accordion Items */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-3.5">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-10 sm:py-12 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs sm:text-sm">
                No matching questions found for &ldquo;{searchQuery}&rdquo;.
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={faq.q}
                    className={`rounded-2xl border transition-all duration-300 ease-out overflow-hidden ${
                      isOpen
                        ? "bg-[#6560F0]/5 border-[#6560F0]/50 shadow-md shadow-[#6560F0]/10"
                        : "bg-white border-slate-200/80 hover:border-[#6560F0]/40 hover:shadow-md hover:shadow-[#6560F0]/10 hover:-translate-y-0.5 card-hover-unified-sm"
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-4 py-3.5 sm:px-6 sm:py-5 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer focus:outline-none"
                    >
                      <span className="text-xs sm:text-base font-bold text-slate-900 leading-snug">
                        {idx + 1}. {faq.q}
                      </span>
                      <div
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ease-out ${
                          isOpen
                            ? "bg-[#6560F0] text-white shadow-2xs"
                            : "bg-slate-100 text-slate-600 hover:bg-[#6560F0]/10 hover:text-[#6560F0]"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-6 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
