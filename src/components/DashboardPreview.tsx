"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Users2,
  History,
  Gift,
  UserCheck,
  Copy,
  Check,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  Coins,
  Building2,
  Calendar,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

interface DashboardPreviewProps {
  onOpenApply?: () => void;
}

export default function DashboardPreview({ onOpenApply }: DashboardPreviewProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "referrals" | "history" | "redeem" | "profile"
  >("overview");
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [redeemSuccessMsg, setRedeemSuccessMsg] = useState<string | null>(null);

  const referralData = [
    {
      id: "REF-101",
      name: "Apex Creative Agency",
      date: "Oct 12, 2026",
      plan: "Pro Growth Annual",
      subStatus: "Subscription Active",
      commStatus: "Reward Credited",
      points: 2400,
    },
    {
      id: "REF-102",
      name: "Vertex Retail Group",
      date: "Oct 15, 2026",
      plan: "Business Starter",
      subStatus: "Subscription Active",
      commStatus: "Reward Credited",
      points: 1200,
    },
    {
      id: "REF-103",
      name: "MedCare Health Clinic",
      date: "Oct 18, 2026",
      plan: "Enterprise Suite",
      subStatus: "Renewal Due",
      commStatus: "Reward Credited",
      points: 3600,
    },
    {
      id: "REF-104",
      name: "Nexus Supply Logistics",
      date: "Oct 20, 2026",
      plan: "Pro Growth Monthly",
      subStatus: "Subscription Pending",
      commStatus: "Reward Pending",
      points: 0,
    },
    {
      id: "REF-105",
      name: "Prime Tax Consultants",
      date: "Oct 21, 2026",
      plan: "Starter Plan",
      subStatus: "Registered",
      commStatus: "Reward Pending",
      points: 0,
    },
    {
      id: "REF-106",
      name: "Delta Auto Services",
      date: "Sep 28, 2026",
      plan: "Trial Expired",
      subStatus: "Not Eligible",
      commStatus: "Not Eligible",
      points: 0,
    },
  ];

  const pointsHistoryData = [
    {
      id: "TX-9901",
      date: "Oct 21, 2026",
      reference: "MedCare Health Clinic (Renewal)",
      type: "Recurring Renewal Commission",
      points: 900,
      status: "Credited",
    },
    {
      id: "TX-9902",
      date: "Oct 18, 2026",
      reference: "Apex Creative Agency (Annual)",
      type: "New Subscription Commission",
      points: 2400,
      status: "Credited",
    },
    {
      id: "TX-9903",
      date: "Oct 16, 2026",
      reference: "Vertex Retail Group (Starter)",
      type: "New Subscription Commission",
      points: 1200,
      status: "Credited",
    },
    {
      id: "TX-9904",
      date: "Oct 14, 2026",
      reference: "Marcus Vance (Client Referral)",
      type: "Standard Client Referral Reward",
      points: 100,
      status: "Credited",
    },
    {
      id: "TX-9905",
      date: "Oct 10, 2026",
      reference: "Reward Redemption #RDM-402",
      type: "Gift Card Redemption",
      points: -2000,
      status: "Fulfilled",
    },
  ];

  const rewardCards = [
    {
      id: "RWD-AMZ",
      name: "$50 Amazon e-Gift Card",
      provider: "Amazon.com",
      points: 1000,
      value: "$50.00",
      popular: true,
    },
    {
      id: "RWD-APL",
      name: "$100 Apple Store & Services Card",
      provider: "Apple Inc.",
      points: 2000,
      value: "$100.00",
      popular: false,
    },
    {
      id: "RWD-CLD",
      name: "$250 Cloud & SaaS Credits Voucher",
      provider: "DevOps & Cloud Partners",
      points: 5000,
      value: "$250.00",
      popular: true,
    },
    {
      id: "RWD-MC",
      name: "$25 Gourmet Coffee & Meals Card",
      provider: "Dining Partners",
      points: 500,
      value: "$25.00",
      popular: false,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText("https://livileads.com/join?ref=LL-PRT-8821");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleRedeemClick = (name: string, pts: number) => {
    setRedeemSuccessMsg(
      `Redemption request for ${name} (${pts.toLocaleString()} Pts) submitted! Demo confirmation sent.`
    );
    setTimeout(() => setRedeemSuccessMsg(null), 4000);
  };

  const filteredReferrals = referralData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.plan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      statusFilter === "all" ||
      item.subStatus.toLowerCase().includes(statusFilter.toLowerCase()) ||
      item.commStatus.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const getSubStatusBadge = (status: string) => {
    switch (status) {
      case "Subscription Active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Renewal Due":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Subscription Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Registered":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const getCommStatusBadge = (status: string) => {
    switch (status) {
      case "Reward Credited":
        return "bg-violet-50 text-violet-700 border-violet-200";
      case "Reward Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-slate-100 text-slate-500 border-slate-200";
    }
  };

  return (
    <section id="dashboard" className="py-24 bg-slate-50/70 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#6560F0]">
              Interactive Portal Preview
            </span>
            <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-4">
            Everything You Need to Manage Your Partnerships.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Your partner portal helps you manage referrals, monitor business subscription progress, and keep track of your rewards in one place.
          </p>
        </div>

        {/* Browser Shell Frame */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden transition-all duration-300">
          {/* Mock Browser Header */}
          <div className="px-6 py-3.5 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs text-slate-500 font-medium ml-3 hidden sm:inline">
                partner.livileads.com/portal/dashboard
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-[#6560F0]/10 text-[#6560F0] border border-[#6560F0]/20">
                Partner ID: LL-PRT-8821
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center border-b border-slate-200 bg-white px-6 overflow-x-auto gap-2 sm:gap-4 py-2">
            {[
              { id: "overview", label: "A. Overview", icon: LayoutDashboard },
              { id: "referrals", label: "B. My Referrals", icon: Users2 },
              { id: "history", label: "C. Points History", icon: History },
              { id: "redeem", label: "D. Redeem Rewards", icon: Gift },
              { id: "profile", label: "E. Partner Profile", icon: UserCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-violet-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Notification Banner */}
          {redeemSuccessMsg && (
            <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs px-6 py-2.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-4 h-4 text-emerald-600" />
                {redeemSuccessMsg}
              </span>
              <button
                onClick={() => setRedeemSuccessMsg(null)}
                className="text-emerald-700 font-bold hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Tab Body Content */}
          <div className="p-6 sm:p-8">
            {/* MODULE A: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Partner Performance Overview
                    </h3>
                    <p className="text-xs text-slate-500">
                      Sample illustrative partner dashboard snapshot (Updated 10 mins ago)
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Fast Referral Link:</span>
                    <button
                      onClick={handleCopy}
                      className="px-3 py-1.5 rounded-lg bg-violet-50 text-violet-700 border border-violet-200 text-xs font-semibold flex items-center gap-1.5 hover:bg-violet-100 transition"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied Link!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Referral Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 6 Metric KPI Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-500">
                        Total Businesses Referred
                      </span>
                      <Building2 className="w-4 h-4 text-violet-600" />
                    </div>
                    <div className="text-2xl font-extrabold text-slate-900">42</div>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Across retail, healthcare & professional
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-emerald-800">
                        Active Subscriptions
                      </span>
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-2xl font-extrabold text-emerald-950">31</div>
                    <span className="text-[11px] text-emerald-700 mt-1 block">
                      Paying business subscriptions generating rewards
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-amber-800">
                        Pending Referrals
                      </span>
                      <Users2 className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-2xl font-extrabold text-amber-950">11</div>
                    <span className="text-[11px] text-amber-700 mt-1 block">
                      Registered & evaluating subscription plans
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-purple-800">
                        Total Livi Points Earned
                      </span>
                      <Coins className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="text-2xl font-extrabold text-purple-950">
                      18,450 <span className="text-xs font-semibold text-purple-700">Pts</span>
                    </div>
                    <span className="text-[11px] text-purple-700 mt-1 block">
                      Equiv. proposed value: $922.50
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-500">
                        Points Pending Approval
                      </span>
                      <AlertCircle className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="text-2xl font-extrabold text-slate-900">
                      1,200 <span className="text-xs font-semibold text-slate-500">Pts</span>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      New subscription settlement verification
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-violet-600 text-white shadow-md shadow-violet-600/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-violet-200">
                        Available For Redemption
                      </span>
                      <Gift className="w-4 h-4 text-violet-200" />
                    </div>
                    <div className="text-2xl font-extrabold text-white">
                      14,800 <span className="text-xs font-semibold text-violet-200">Pts</span>
                    </div>
                    <span className="text-[11px] text-violet-200 mt-1 block">
                      Ready to exchange for gift cards & vouchers
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-100 text-xs text-slate-600 flex items-center justify-between">
                  <span>
                    <strong>Illustrative Data:</strong> Numbers shown represent a high-fidelity preview of the actual partner portal experience.
                  </span>
                  <button
                    onClick={() => setActiveTab("referrals")}
                    className="text-violet-700 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>View Referrals Table</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* MODULE B: MY REFERRALS */}
            {activeTab === "referrals" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      My Referred Businesses
                    </h3>
                    <p className="text-xs text-slate-500">
                      Monitor business subscription statuses and eligible points
                    </p>
                  </div>

                  {/* Search and Filters */}
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search business..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-violet-500"
                      />
                    </div>

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="text-xs border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white text-slate-700"
                    >
                      <option value="all">All Statuses</option>
                      <option value="active">Active</option>
                      <option value="renewal">Renewal Due</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full min-w-[620px] text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Business Name</th>
                        <th className="py-3 px-4">Referral Date</th>
                        <th className="py-3 px-4">Subscription Plan</th>
                        <th className="py-3 px-4">Subscription Status</th>
                        <th className="py-3 px-4">Commission Status</th>
                        <th className="py-3 px-4 text-right">Points Earned</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredReferrals.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            {row.name}
                            <span className="block text-[10px] text-slate-400 font-normal">
                              {row.id}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">{row.date}</td>
                          <td className="py-3.5 px-4 font-medium text-slate-700">
                            {row.plan}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getSubStatusBadge(
                                row.subStatus
                              )}`}
                            >
                              {row.subStatus}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getCommStatusBadge(
                                row.commStatus
                              )}`}
                            >
                              {row.commStatus}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right font-extrabold text-violet-700">
                            {row.points > 0 ? `+${row.points.toLocaleString()} Pts` : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MODULE C: POINTS HISTORY */}
            {activeTab === "history" && (
              <div className="space-y-4">
                <div className="pb-2 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900">Points Ledger & History</h3>
                  <p className="text-xs text-slate-500">
                    Transparent log of all subscription commissions, renewals, and redemptions
                  </p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full min-w-[620px] text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Reference / Business</th>
                        <th className="py-3 px-4">Reward Type</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Points Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {pointsHistoryData.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-4 text-slate-600">{item.date}</td>
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            {item.reference}
                            <span className="block text-[10px] text-slate-400 font-normal">
                              {item.id}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 font-medium">
                            {item.type}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {item.status}
                            </span>
                          </td>
                          <td
                            className={`py-3.5 px-4 text-right font-extrabold ${
                              item.points > 0 ? "text-emerald-600" : "text-rose-600"
                            }`}
                          >
                            {item.points > 0 ? `+${item.points}` : item.points} Pts
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MODULE D: REDEEM REWARDS */}
            {activeTab === "redeem" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Rewards & Vouchers Catalog
                    </h3>
                    <p className="text-xs text-slate-500">
                      Redeem accumulated points based on: 10 Livi Points = $0.50 equivalent reward value
                    </p>
                  </div>
                  <div className="bg-violet-50 border border-violet-200 px-4 py-2 rounded-xl text-xs font-bold text-violet-800">
                    Your Redeemable Balance: 14,800 Pts ($740.00 value)
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {rewardCards.map((rwd) => (
                    <div
                      key={rwd.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-violet-300 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        {rwd.popular && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 bg-violet-100 px-2 py-0.5 rounded-full inline-block mb-2">
                            Popular Choice
                          </span>
                        )}
                        <h4 className="text-sm font-bold text-slate-900 mb-1">{rwd.name}</h4>
                        <span className="text-xs text-slate-500 block mb-3">
                          {rwd.provider}
                        </span>
                        <div className="text-xs font-extrabold text-violet-700 bg-violet-50/70 p-2 rounded-lg border border-violet-100">
                          {rwd.points.toLocaleString()} Points ({rwd.value})
                        </div>
                      </div>

                      <button
                        onClick={() => handleRedeemClick(rwd.name, rwd.points)}
                        className="mt-4 w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-violet-700 text-white font-bold text-xs transition"
                      >
                        Redeem Voucher
                      </button>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span>
                    Gift cards and voucher delivery are processed electronically to your registered email address within 24–48 hours.
                  </span>
                  <span className="text-slate-400">100% Policy Compliant</span>
                </div>
              </div>
            )}

            {/* MODULE E: PARTNER PROFILE */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Partner Profile & Terms</h3>
                    <p className="text-xs text-slate-500">
                      Approved partnership credentials and referral links
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Status: Approved & Active
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Account Information */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Account Credentials
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">Partner Type:</span>
                        <span className="font-bold text-slate-800">Business Partner</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">Partner ID:</span>
                        <span className="font-bold text-violet-700">LL-PRT-8821</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">Registered Name:</span>
                        <span className="font-bold text-slate-800">Apex Growth Media LLC</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">Registered Email:</span>
                        <span className="font-bold text-slate-800">partner@apexventures.com</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-500">Agreement Date:</span>
                        <span className="font-bold text-slate-800">September 15, 2026</span>
                      </div>
                    </div>
                  </div>

                  {/* Referral Link & Tools */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Your Unique Referral Mechanism
                    </h4>
                    <p className="text-xs text-slate-600">
                      Share this link directly or embed into marketing campaigns. All business acquisitions are attributed automatically.
                    </p>

                    <div className="p-3 bg-white rounded-xl border border-slate-300 flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-700 truncate mr-2">
                        https://livileads.com/join?ref=LL-PRT-8821
                      </span>
                      <button
                        onClick={handleCopy}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 shrink-0"
                        title="Copy Link"
                      >
                        {copiedLink ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs">
                      <a
                        href="#terms"
                        onClick={(e) => {
                          e.preventDefault();
                          alert("Displaying approved Partner Agreement (Version 2.4).");
                        }}
                        className="text-violet-600 font-semibold hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        View Approved Agreement & Terms
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Card Info Caption (Clean, no redundant CTA) */}
          <div className="py-3.5 px-6 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
            Interactive portal preview. Approved partners receive credentials to manage active referrals and rewards in real time.
          </div>
        </div>
      </div>
    </section>
  );
}
