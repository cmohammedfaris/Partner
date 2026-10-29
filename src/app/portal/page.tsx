"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LiviLogo from "@/components/LiviLogo";
import confetti from "canvas-confetti";
import {
  PartnerAccount,
  ReferredBusiness,
  PointsRedemption,
} from "@/data/adminData";
import {
  Sparkles,
  Copy,
  Check,
  Building,
  Award,
  TrendingUp,
  DollarSign,
  Users,
  Layers,
  Share2,
  ExternalLink,
  PlusCircle,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  LogOut,
  Settings,
  User,
  Mail,
  Phone,
  Briefcase,
  AlertCircle,
  HelpCircle,
  Download,
  FileText,
  ChevronRight,
  X,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  Search,
  Filter,
  ArrowLeft,
  Wallet,
} from "lucide-react";

export default function PartnerPortalPage() {
  const router = useRouter();

  // Active Tab & Sidebar Navigation
  const [activeTab, setActiveTab] = useState<"dashboard" | "referrals" | "redeem" | "profile">("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Search & Filter for Referrals
  const [referralSearchQuery, setReferralSearchQuery] = useState("");
  const [referralStatusFilter, setReferralStatusFilter] = useState<"all" | "Active" | "14-Day Free Trial">("all");

  // Partner Profile State
  const [partner, setPartner] = useState<PartnerAccount | null>(null);

  // Quick Action Feedback
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Referral Form inside Portal
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [clientBizName, setClientBizName] = useState("");
  const [clientOwnerName, setClientOwnerName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPlan, setClientPlan] = useState("State Pack (₹448/mo)");
  const [clientStatus, setClientStatus] = useState<"Active" | "14-Day Free Trial">("Active");

  // Redeem Points State
  const [pointsToRedeem, setPointsToRedeem] = useState<number>(2500);
  const [redeemMethod, setRedeemMethod] = useState<"Bank Wire Transfer" | "UPI Transfer" | "PayPal">("Bank Wire Transfer");
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState<string | null>(null);

  // Share State & Modal
  const [shared, setShared] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedShareMessage, setCopiedShareMessage] = useState(false);

  // Profile Edit State
  const [profileForm, setProfileForm] = useState({
    businessName: "",
    ownerName: "",
    phone: "",
    bankName: "",
    accountNumber: "",
    accountHolder: "",
    ifscOrSwift: "",
    upiId: "",
    paypalEmail: "",
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Load Partner on Mount
  useEffect(() => {
    try {
      const activeStr = localStorage.getItem("livileads_active_partner");
      if (activeStr) {
        const parsed: PartnerAccount = JSON.parse(activeStr);
        setPartner(parsed);
        setProfileForm({
          businessName: parsed.businessName || "",
          ownerName: parsed.ownerName || "",
          phone: parsed.phone || "",
          bankName: parsed.payoutDetails?.bankName || "HDFC Bank",
          accountNumber: parsed.payoutDetails?.accountNumber || "50100492819234",
          accountHolder: parsed.payoutDetails?.accountHolder || parsed.ownerName,
          ifscOrSwift: parsed.payoutDetails?.ifscOrSwift || "HDFC0001234",
          upiId: parsed.payoutDetails?.upiId || `${parsed.ownerName.toLowerCase().replace(/\s+/g, "")}@okhdfcbank`,
          paypalEmail: parsed.payoutDetails?.paypalEmail || parsed.email,
        });
      } else {
        // Fallback default partner account if accessing directly
        const defaultPartner: PartnerAccount = {
          id: "LLP-307658",
          businessName: "Sarah Consulting",
          ownerName: "Sarah",
          email: "sarah12@gmail.com",
          phone: "+91 9876543210",
          password: "Livi#Partner2026",
          track: "individual",
          tier: "Platinum",
          commissionRate: 20,
          referralCode: "LIVI-SARAH12",
          referralLink: "https://livileads.com/ref/livi-sarah12",
          liviPoints: 5000,
          pointsValueUSD: 500,
          totalEarningsUSD: 500,
          currentMonthPoints: 0,
          availableBalancePoints: 5000,
          redeemedPoints: 0,
          joinedDate: new Date().toISOString().split("T")[0],
          payoutDetails: {
            bankName: "HDFC Bank",
            accountNumber: "50100492819234",
            accountHolder: "Sarah",
            ifscOrSwift: "HDFC0001234",
            upiId: "sarah@okhdfcbank",
            paypalEmail: "sarah12@gmail.com",
          },
          referredBusinesses: [],
          redemptions: [],
        };
        setPartner(defaultPartner);
        localStorage.setItem("livileads_active_partner", JSON.stringify(defaultPartner));
        setProfileForm({
          businessName: defaultPartner.businessName,
          ownerName: defaultPartner.ownerName,
          phone: defaultPartner.phone,
          bankName: "HDFC Bank",
          accountNumber: "50100492819234",
          accountHolder: "Sarah",
          ifscOrSwift: "HDFC0001234",
          upiId: "sarah@okhdfcbank",
          paypalEmail: "sarah12@gmail.com",
        });
      }
    } catch {
      // ignore
    }
  }, []);

  // Save changes to partner
  const persistPartner = (updated: PartnerAccount) => {
    setPartner(updated);
    try {
      localStorage.setItem("livileads_active_partner", JSON.stringify(updated));

      // Also update in registered partner accounts list
      const accountsStr = localStorage.getItem("livileads_partner_accounts");
      const accounts: PartnerAccount[] = accountsStr ? JSON.parse(accountsStr) : [];
      const updatedAccounts = accounts.map((a) => (a.id === updated.id ? updated : a));
      if (!updatedAccounts.some((a) => a.id === updated.id)) {
        updatedAccounts.push(updated);
      }
      localStorage.setItem("livileads_partner_accounts", JSON.stringify(updatedAccounts));
    } catch (e) {
      console.error(e);
    }
  };

  // Copy Referral Link
  const handleCopyLink = () => {
    if (!partner) return;
    navigator.clipboard.writeText(partner.referralLink);
    setCopiedLink(true);
    showToast("Referral Link copied to clipboard!");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Copy Referral Code
  const handleCopyCode = () => {
    if (!partner) return;
    navigator.clipboard.writeText(partner.referralCode);
    setCopiedCode(true);
    showToast("Referral Code copied to clipboard!");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Open Custom In-App Share Modal (Never trigger Windows OS dialog)
  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  // Keyboard shortcut listener: ESC to close any modal or drawer (Never stuck!)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsReferModalOpen(false);
        setIsShareModalOpen(false);
        setIsMobileSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle Refer a Client Business
  const handleReferClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partner || !clientBizName.trim()) return;

    let planPrice = 448;
    if (clientPlan.includes("1,298") || clientPlan.includes("1298")) {
      planPrice = 1298;
    } else if (clientPlan.includes("398")) {
      planPrice = 398;
    } else {
      planPrice = 448;
    }

    const isPaying = clientStatus === "Active";
    // 20% recurring commission: 20 points per rupee (₹1 = 100 points)
    const pointsEarned = isPaying ? Math.round(planPrice * (partner.commissionRate / 100) * 100) : 0;
    const usdEarned = isPaying ? planPrice * (partner.commissionRate / 100) : 0;

    const newBiz: ReferredBusiness = {
      id: `REF-${Date.now().toString().slice(-4)}`,
      name: clientBizName.trim(),
      ownerName: clientOwnerName.trim() || "Business Lead",
      email: clientEmail.trim() || "lead@company.com",
      plan: clientPlan,
      status: clientStatus,
      monthlyValueUSD: planPrice,
      monthlyPointsEarned: pointsEarned,
      joinedDate: new Date().toISOString().split("T")[0],
    };

    const updatedPartner: PartnerAccount = {
      ...partner,
      liviPoints: partner.liviPoints + pointsEarned,
      availableBalancePoints: partner.availableBalancePoints + pointsEarned,
      totalEarningsUSD: partner.totalEarningsUSD + usdEarned,
      currentMonthPoints: partner.currentMonthPoints + pointsEarned,
      referredBusinesses: [newBiz, ...(partner.referredBusinesses || [])],
    };

    persistPartner(updatedPartner);
    setIsReferModalOpen(false);
    setClientBizName("");
    setClientOwnerName("");
    setClientEmail("");

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    showToast(`Referral registered! +${pointsEarned.toLocaleString()} Livi Points credited.`);
  };

  // Handle Redeem Points
  const handleRedeemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partner) return;

    if (pointsToRedeem <= 0 || pointsToRedeem > partner.availableBalancePoints) {
      alert("Invalid redemption amount. Points must be within your available balance.");
      return;
    }

    setIsRedeeming(true);
    setRedeemSuccess(null);

    setTimeout(() => {
      setIsRedeeming(false);
      const usdValue = pointsToRedeem / 10;
      const refId = "PAY-" + Math.floor(100000 + Math.random() * 900000);

      const destination =
        redeemMethod === "Bank Wire Transfer"
          ? `${profileForm.bankName} (A/C: ••••${profileForm.accountNumber.slice(-4)})`
          : redeemMethod === "UPI Transfer"
          ? profileForm.upiId
          : profileForm.paypalEmail;

      const newRedemption: PointsRedemption = {
        id: `RDM-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        points: pointsToRedeem,
        amountUSD: usdValue,
        method: redeemMethod,
        accountDestination: destination,
        status: "Processing",
        referenceId: refId,
      };

      const updatedPartner: PartnerAccount = {
        ...partner,
        availableBalancePoints: partner.availableBalancePoints - pointsToRedeem,
        redeemedPoints: (partner.redeemedPoints || 0) + pointsToRedeem,
        redemptions: [newRedemption, ...(partner.redemptions || [])],
      };

      persistPartner(updatedPartner);

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }

      setRedeemSuccess(
        `Payout request of $${usdValue.toFixed(2)} USD (${pointsToRedeem.toLocaleString()} pts) submitted successfully! Ref: ${refId}.`
      );
      showToast(`Payout of $${usdValue.toFixed(2)} USD requested!`);
    }, 800);
  };

  // Handle Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partner) return;

    setIsSavingProfile(true);
    setTimeout(() => {
      setIsSavingProfile(false);
      const updated: PartnerAccount = {
        ...partner,
        businessName: profileForm.businessName,
        ownerName: profileForm.ownerName,
        phone: profileForm.phone,
        payoutDetails: {
          bankName: profileForm.bankName,
          accountNumber: profileForm.accountNumber,
          accountHolder: profileForm.accountHolder,
          ifscOrSwift: profileForm.ifscOrSwift,
          upiId: profileForm.upiId,
          paypalEmail: profileForm.paypalEmail,
        },
      };
      persistPartner(updated);
      showToast("Profile & Payout Settings saved successfully!");
    }, 500);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("livileads_active_partner");
    router.push("/login");
  };

  if (!partner) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-800">
        <div className="text-center">
          <p className="text-sm font-bold text-slate-500">Loading Partner Workspace...</p>
        </div>
      </div>
    );
  }

  const usdAvailableBalance = (partner.availableBalancePoints / 10).toFixed(2);
  const totalReferredCount = partner.referredBusinesses?.length || 0;
  const activeSubscribedCount =
    partner.referredBusinesses?.filter((b) => b.status === "Active").length || 0;
  const trialSubscribedCount =
    partner.referredBusinesses?.filter((b) => b.status === "14-Day Free Trial").length || 0;
  const totalMonthlyRecurringPoints =
    partner.referredBusinesses?.reduce(
      (acc, b) => acc + (b.status === "Active" ? b.monthlyPointsEarned : 0),
      0
    ) || partner.currentMonthPoints;

  // Filtered referrals for client directory
  const filteredReferrals = (partner.referredBusinesses || []).filter((biz) => {
    const matchesSearch =
      biz.name.toLowerCase().includes(referralSearchQuery.toLowerCase()) ||
      biz.ownerName.toLowerCase().includes(referralSearchQuery.toLowerCase()) ||
      biz.email.toLowerCase().includes(referralSearchQuery.toLowerCase());
    const matchesStatus =
      referralStatusFilter === "all" || biz.status === referralStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-900 flex font-jakarta font-sans">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-white text-slate-900 px-4 py-3 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Mobile Drawer Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-xs lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div
            className="w-72 max-w-[85vw] h-full bg-white text-slate-900 p-5 flex flex-col justify-between shadow-2xl border-r border-slate-200 animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileSidebarOpen(false)}>
                  <LiviLogo size="sm" showBadge={false} />
                  <span className="text-xs font-black tracking-wider uppercase text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md border border-violet-200">
                    Partner
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 block">
                  Workspace
                </span>

                {/* Dashboard */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("dashboard");
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === "dashboard"
                      ? "bg-violet-600 text-white shadow-md shadow-violet-600/20 font-extrabold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </div>
                </button>

                {/* My Referrals */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("referrals");
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === "referrals"
                      ? "bg-violet-600 text-white shadow-md shadow-violet-600/20 font-extrabold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4" />
                    <span>My Referrals</span>
                  </div>
                  {totalReferredCount > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        activeTab === "referrals"
                          ? "bg-violet-200 text-violet-900"
                          : "bg-violet-100 text-violet-700"
                      }`}
                    >
                      {totalReferredCount}
                    </span>
                  )}
                </button>

                {/* Livi Points & Rewards */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("redeem");
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === "redeem"
                      ? "bg-violet-600 text-white shadow-md shadow-violet-600/20 font-extrabold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Points & Rewards</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      activeTab === "redeem"
                        ? "bg-violet-200 text-violet-900"
                        : "bg-violet-100 text-violet-700"
                    }`}
                  >
                    {partner.availableBalancePoints.toLocaleString()} pts
                  </span>
                </button>

                {/* Profile & Payout */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("profile");
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === "profile"
                      ? "bg-violet-600 text-white shadow-md shadow-violet-600/20 font-extrabold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Settings className="w-4 h-4" />
                    <span>Payout & Profile</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Sidebar Footer */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    {partner.ownerName?.charAt(0) || "P"}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-800 block truncate">{partner.ownerName}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold block truncate">Active Partner</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-8 h-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition cursor-pointer shrink-0"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Expandable / Collapsible Sidebar */}
      <aside
        className={`hidden lg:flex flex-col justify-between border-r border-slate-200/90 bg-white text-slate-800 shrink-0 sticky top-0 h-screen transition-all duration-300 ease-in-out z-30 select-none shadow-xs ${
          isSidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div>
          {/* Sidebar Top: Logo & Collapse Button */}
          <div className="h-16 px-4 border-b border-slate-100 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 min-w-0 overflow-hidden">
              <LiviLogo size="sm" showBadge={false} />
              {!isSidebarCollapsed && (
                <div className="flex items-center gap-1.5 animate-in fade-in duration-200">
                  <span className="text-[10px] font-black tracking-wider uppercase text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                    Partner
                  </span>
                </div>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition cursor-pointer"
              title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isSidebarCollapsed ? (
                <PanelLeftOpen className="w-4 h-4 text-violet-600" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Sidebar Navigation */}
          <div className="p-3 space-y-1.5">
            {!isSidebarCollapsed && (
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1 block">
                Workspace
              </span>
            )}

            {/* Nav 1: Dashboard */}
            <button
              type="button"
              onClick={() => setActiveTab("dashboard")}
              title={isSidebarCollapsed ? "Dashboard" : undefined}
              className={`w-full flex items-center rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                isSidebarCollapsed
                  ? "justify-center p-3"
                  : "justify-between px-3.5 py-2.5"
              } ${
                activeTab === "dashboard"
                  ? "bg-violet-600 text-white shadow-md shadow-violet-600/20 font-extrabold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard
                  className={`w-4 h-4 shrink-0 ${
                    activeTab === "dashboard" ? "text-white" : "text-violet-600"
                  }`}
                />
                {!isSidebarCollapsed && <span>Dashboard</span>}
              </div>
            </button>

            {/* Nav 2: My Referrals */}
            <button
              type="button"
              onClick={() => setActiveTab("referrals")}
              title={isSidebarCollapsed ? "My Referrals" : undefined}
              className={`w-full flex items-center rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                isSidebarCollapsed
                  ? "justify-center p-3 relative"
                  : "justify-between px-3.5 py-2.5"
              } ${
                activeTab === "referrals"
                  ? "bg-violet-600 text-white shadow-md shadow-violet-600/20 font-extrabold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users
                  className={`w-4 h-4 shrink-0 ${
                    activeTab === "referrals" ? "text-white" : "text-violet-600"
                  }`}
                />
                {!isSidebarCollapsed && <span>My Referrals</span>}
              </div>
              {!isSidebarCollapsed && totalReferredCount > 0 && (
                <span
                  className={`px-2 py-0.2 rounded-full text-[10px] font-extrabold ${
                    activeTab === "referrals"
                      ? "bg-violet-200 text-violet-900"
                      : "bg-violet-100 text-violet-800"
                  }`}
                >
                  {totalReferredCount}
                </span>
              )}
              {isSidebarCollapsed && totalReferredCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-violet-600" />
              )}
            </button>

            {/* Nav 3: Livi Points & Rewards */}
            <button
              type="button"
              onClick={() => setActiveTab("redeem")}
              title={isSidebarCollapsed ? "Points & Rewards" : undefined}
              className={`w-full flex items-center rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                isSidebarCollapsed
                  ? "justify-center p-3"
                  : "justify-between px-3.5 py-2.5"
              } ${
                activeTab === "redeem"
                  ? "bg-violet-600 text-white shadow-md shadow-violet-600/20 font-extrabold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles
                  className={`w-4 h-4 shrink-0 ${
                    activeTab === "redeem" ? "text-white" : "text-violet-600"
                  }`}
                />
                {!isSidebarCollapsed && <span>Points & Rewards</span>}
              </div>
              {!isSidebarCollapsed && (
                <span
                  className={`px-2 py-0.2 rounded-full text-[10px] font-extrabold ${
                    activeTab === "redeem"
                      ? "bg-white/20 text-white"
                      : "bg-violet-100 text-violet-800"
                  }`}
                >
                  {partner.availableBalancePoints.toLocaleString()}
                </span>
              )}
            </button>

            {/* Nav 4: Profile & Payout */}
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              title={isSidebarCollapsed ? "Payout & Profile" : undefined}
              className={`w-full flex items-center rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                isSidebarCollapsed
                  ? "justify-center p-3"
                  : "justify-between px-3.5 py-2.5"
              } ${
                activeTab === "profile"
                  ? "bg-violet-600 text-white shadow-md shadow-violet-600/20 font-extrabold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings
                  className={`w-4 h-4 shrink-0 ${
                    activeTab === "profile" ? "text-white" : "text-slate-500"
                  }`}
                />
                {!isSidebarCollapsed && <span>Payout & Profile</span>}
              </div>
            </button>
          </div>
        </div>

        {/* Sidebar Bottom: Partner Identity & Logout */}
        <div className="p-3 border-t border-slate-100">
          <div
            className={`flex items-center bg-slate-50 rounded-xl border border-slate-200/80 ${
              isSidebarCollapsed ? "justify-center p-2" : "justify-between p-2.5"
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                {partner.ownerName?.charAt(0) || "P"}
              </div>
              {!isSidebarCollapsed && (
                <div className="min-w-0 text-left">
                  <span className="text-xs font-bold text-slate-800 block truncate">{partner.ownerName}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold block truncate">Active Partner</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition cursor-pointer shrink-0"
              title="Log out of Partner Workspace"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Right Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-2xs">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            {/* Left: Mobile hamburger & Desktop toggle & Breadcrumbs */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                title="Open Sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="hidden lg:flex p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {isSidebarCollapsed ? (
                  <PanelLeftOpen className="w-4 h-4 text-violet-600" />
                ) : (
                  <PanelLeftClose className="w-4 h-4" />
                )}
              </button>

              <div className="h-5 w-px bg-slate-200 hidden sm:block" />

              <div className="flex items-center gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab("dashboard")}
                  className="text-slate-500 hover:text-violet-700 font-medium transition cursor-pointer"
                  title="Return to Overview Dashboard"
                >
                  Partner Workspace
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-bold text-slate-800 capitalize">
                  {activeTab === "dashboard"
                    ? "Overview Dashboard"
                    : activeTab === "referrals"
                    ? "My Referrals"
                    : activeTab === "redeem"
                    ? "Points & Rewards"
                    : "Profile & Payout"}
                </span>
              </div>
            </div>

            {/* Right: Quick Points Pill + Referral Link Button + Logout */}
            <div className="flex items-center gap-3">
              {/* Livi Points Pill */}
              <button
                type="button"
                onClick={() => setActiveTab("redeem")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-100/70 border border-violet-200 text-violet-900 cursor-pointer hover:bg-violet-200/70 transition"
                title="Click to view & redeem Livi points"
              >
                <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                <span className="text-xs font-extrabold">{partner.availableBalancePoints.toLocaleString()}</span>
                <span className="text-[10px] text-violet-700 font-semibold">pts (${usdAvailableBalance})</span>
              </button>

              {/* Quick Link Copy Pill on desktop */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                title="Copy your referral link"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {partner.ownerName?.charAt(0) || "P"}
                </div>
                <div className="hidden xl:block text-left">
                  <span className="text-xs font-bold text-slate-800 block leading-tight truncate max-w-[120px]">
                    {partner.ownerName}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold block leading-tight">
                    Active Partner
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-8 h-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition cursor-pointer"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
          {/* ========================================================
              TAB 1: DASHBOARD (OVERVIEW)
             ======================================================== */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Light Humanized Welcome Banner */}
              <section className="bg-gradient-to-br from-violet-50/80 via-white to-indigo-50/60 border border-violet-100 rounded-3xl p-6 sm:p-7 shadow-2xs relative overflow-hidden">
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100/70 border border-violet-200 text-violet-800 text-xs font-bold mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                      <span>Verified Partner • {partner.commissionRate}% Lifetime Recurring Rewards</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                      Welcome back, {partner.ownerName}! 👋
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                      Share your unique partner link with businesses. You earn{" "}
                      <strong className="text-violet-700 font-bold">{partner.commissionRate}% recurring commission</strong> converted directly into redeemable cash points every month they remain subscribed.
                    </p>
                  </div>

                  {/* Primary Quick Actions */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsReferModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-violet-600/20 transition cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>+ Introduce a Client</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("redeem")}
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-200 flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
                    >
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span>Redeem Points (${usdAvailableBalance})</span>
                    </button>
                  </div>
                </div>

                {/* Referral Link & Sharing Tools Bar */}
                <div className="mt-6 pt-5 border-t border-slate-200/70 grid md:grid-cols-12 gap-3 items-center">
                  {/* Link Box (6 cols) */}
                  <div className="md:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-3 flex items-center justify-between gap-2 shadow-2xs">
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Your Official Referral Link
                      </span>
                      <span className="font-mono text-xs text-slate-900 font-bold truncate block mt-0.5">
                        {partner.referralLink}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="px-3 py-2 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 text-xs font-bold flex items-center gap-1.5 shrink-0 transition cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
                    </button>
                  </div>

                  {/* Code Box (3 cols) */}
                  <div className="md:col-span-3 bg-white border border-slate-200/90 rounded-2xl p-3 flex items-center justify-between gap-2 shadow-2xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Partner Code
                      </span>
                      <span className="font-mono text-xs text-violet-700 font-extrabold block mt-0.5">
                        {partner.referralCode}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                      title="Copy code"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Common Share Button (3 cols) */}
                  <div className="md:col-span-3">
                    <button
                      type="button"
                      onClick={() => setIsShareModalOpen(true)}
                      className="w-full py-3.5 px-4 min-h-[52px] rounded-2xl bg-violet-600 hover:bg-violet-700 active:scale-[0.99] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm shadow-violet-200 hover:shadow-violet-300 transition cursor-pointer"
                      title="Share referral link"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* 4 Core Metrics Cards */}
              <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                {/* Available Points */}
                <div
                  onClick={() => setActiveTab("redeem")}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-violet-300 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Available Points
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-violet-700">
                      {partner.availableBalancePoints.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-slate-400">pts</span>
                  </div>
                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100 text-[11px]">
                    <span className="font-bold text-emerald-600">≈ ${usdAvailableBalance} USD</span>
                    <span className="text-violet-600 font-bold flex items-center">
                      Redeem <ArrowRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>

                {/* Referred Clients */}
                <div
                  onClick={() => setActiveTab("referrals")}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-violet-300 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Referred Clients
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalReferredCount}</span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {activeSubscribedCount} Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100 text-[11px]">
                    <span className="text-slate-500">{trialSubscribedCount} in trial</span>
                    <span className="text-violet-600 font-bold flex items-center">
                      View All <ArrowRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>

                {/* Monthly Recurring Points */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      This Month Recurring
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
                      +{totalMonthlyRecurringPoints.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-slate-400">pts/mo</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2.5 pt-2 border-t border-slate-100">
                    Auto-credits on each client monthly renewal
                  </p>
                </div>

                {/* Commission Rate */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Lifetime Rate
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{partner.commissionRate}%</span>
                    <span className="text-xs font-bold text-emerald-600">Recurring</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2.5 pt-2 border-t border-slate-100">
                    No expiration as long as client stays active
                  </p>
                </div>
              </section>

              {/* Two Column Grid: Recent Referrals & Payout Snapshot */}
              <div className="grid lg:grid-cols-12 gap-5">
                {/* Recent Referrals (7 cols) */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h2 className="text-sm font-extrabold text-slate-900">Recent Client Referrals</h2>
                      <p className="text-xs text-slate-500">Businesses registered via your link</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsReferModalOpen(true)}
                        className="px-2.5 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-bold transition cursor-pointer flex items-center gap-1"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                      {totalReferredCount > 0 && (
                        <button
                          type="button"
                          onClick={() => setActiveTab("referrals")}
                          className="px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold transition cursor-pointer flex items-center gap-1"
                        >
                          <span>View All ({totalReferredCount})</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {totalReferredCount === 0 ? (
                    <div className="py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-6">
                      <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center mx-auto mb-3">
                        <Building className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-800">No Client Referrals Yet</h3>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                        Introduce businesses looking for automated B2B leads. You can register them directly or share your link.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsReferModalOpen(true)}
                        className="mt-4 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold inline-flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Register First Referral</span>
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {partner.referredBusinesses?.slice(0, 4).map((biz) => (
                        <div key={biz.id} className="py-3 flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-slate-900 block truncate">{biz.name}</span>
                            <span className="text-[11px] text-slate-500 block truncate">
                              {biz.plan} • {biz.ownerName}
                            </span>
                          </div>
                          <div className="text-right shrink-0">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                                biz.status === "Active"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-amber-50 text-amber-700 border border-amber-200"
                              }`}
                            >
                              {biz.status}
                            </span>
                            <span className="text-xs font-extrabold text-violet-700 block mt-0.5">
                              +{biz.monthlyPointsEarned.toLocaleString()} pts
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Payout & Rewards Snapshot (5 cols) */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h2 className="text-sm font-extrabold text-slate-900">Payout & Rewards</h2>
                      <p className="text-xs text-slate-500">Your available cash balance</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("redeem")}
                      className="text-xs font-bold text-violet-600 hover:text-violet-800 transition cursor-pointer"
                    >
                      Redeem History →
                    </button>
                  </div>

                  {/* Balance Display */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-violet-700 uppercase tracking-wider block">
                        Available to Redeem
                      </span>
                      <span className="text-xl font-extrabold text-slate-900">
                        {partner.availableBalancePoints.toLocaleString()} <span className="text-xs font-bold text-slate-500">pts</span>
                      </span>
                    </div>
                    <span className="text-lg font-black text-emerald-600">
                      ${usdAvailableBalance} USD
                    </span>
                  </div>

                  {/* Destination Details Preview */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Default Payout Destination
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveTab("profile")}
                        className="text-violet-600 font-bold hover:underline"
                      >
                        Change →
                      </button>
                    </div>
                    <span className="font-semibold text-slate-800 block">
                      {profileForm.bankName} •••••{profileForm.accountNumber.slice(-4) || "3210"}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Holder: {profileForm.accountHolder} | UPI: {profileForm.upiId}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab("redeem")}
                      className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition cursor-pointer shadow-xs text-center flex items-center justify-center gap-1.5"
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Redeem Cash</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("profile")}
                      className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      <span>Payout Settings</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Simple 3-Step Growth Guide */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                  How Your Partner Earnings Work
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="w-6 h-6 rounded-full bg-violet-600 text-white font-bold text-xs flex items-center justify-center mb-2">
                      1
                    </span>
                    <h4 className="text-xs font-bold text-slate-800">Share Your Link</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Send your link to business owners, sales teams, and agencies looking for automated B2B leads.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="w-6 h-6 rounded-full bg-violet-600 text-white font-bold text-xs flex items-center justify-center mb-2">
                      2
                    </span>
                    <h4 className="text-xs font-bold text-slate-800">Client Subscribes</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Client signs up and selects Starter ($199), Growth ($399), or Enterprise ($799).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="w-6 h-6 rounded-full bg-violet-600 text-white font-bold text-xs flex items-center justify-center mb-2">
                      3
                    </span>
                    <h4 className="text-xs font-bold text-slate-800">Monthly Cash Rewards</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      You receive {partner.commissionRate}% recurring points monthly. Redeem anytime directly to your bank.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: MY REFERRALS (CLIENT DIRECTORY)
             ======================================================== */}
          {activeTab === "referrals" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Header */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("dashboard")}
                    className="text-xs font-semibold text-slate-500 hover:text-violet-700 transition inline-flex items-center gap-1 mb-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Overview Dashboard</span>
                  </button>
                  <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    My Referred Businesses ({totalReferredCount})
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Track client companies introduced through your partner link. You earn {partner.commissionRate}% recurring commission points each month they stay subscribed.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsReferModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ Introduce a Client</span>
                </button>
              </div>

              {/* KPI Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Introduced</span>
                  <span className="text-xl font-extrabold text-slate-900 block mt-0.5">{totalReferredCount}</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Subscribers</span>
                  <span className="text-xl font-extrabold text-emerald-600 block mt-0.5">{activeSubscribedCount}</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">14-Day Free Trials</span>
                  <span className="text-xl font-extrabold text-amber-600 block mt-0.5">{trialSubscribedCount}</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Monthly Points Generated</span>
                  <span className="text-xl font-extrabold text-violet-700 block mt-0.5">+{totalMonthlyRecurringPoints.toLocaleString()} pts/mo</span>
                </div>
              </div>

              {/* Search & Status Filter Bar */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by company name, contact, or email..."
                    value={referralSearchQuery}
                    onChange={(e) => setReferralSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-violet-600"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  {(["all", "Active", "14-Day Free Trial"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setReferralStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        referralStatusFilter === st
                          ? "bg-violet-600 text-white shadow-2xs"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                      }`}
                    >
                      {st === "all" ? `All (${totalReferredCount})` : st === "Active" ? `Active (${activeSubscribedCount})` : `Trial (${trialSubscribedCount})`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table or Empty State */}
              {filteredReferrals.length === 0 ? (
                <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-2xs">
                  <div className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mx-auto mb-3">
                    <Building className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {referralSearchQuery ? "No Matching Referrals Found" : "No Businesses Referred Yet"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
                    {referralSearchQuery
                      ? "Try adjusting your search query or clear the status filter to see all referred companies."
                      : `Start sharing your partner link (${partner.referralLink}) with potential clients or register a referral directly.`}
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    {referralSearchQuery ? (
                      <button
                        type="button"
                        onClick={() => {
                          setReferralSearchQuery("");
                          setReferralStatusFilter("all");
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
                      >
                        Reset Filter
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsReferModalOpen(true)}
                        className="px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-sm transition cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>Register First Business Referral</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                          <th className="py-3 px-4">Company Name</th>
                          <th className="py-3 px-3">Subscription Plan</th>
                          <th className="py-3 px-3">Status</th>
                          <th className="py-3 px-3">Monthly Points Earned</th>
                          <th className="py-3 px-4 text-right">Referral Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredReferrals.map((biz) => (
                          <tr key={biz.id} className="hover:bg-slate-50/80 transition">
                            <td className="py-3.5 px-4 font-bold text-slate-900">
                              {biz.name}
                              <span className="block text-[10px] text-slate-400 font-normal">
                                Contact: {biz.ownerName} ({biz.email})
                              </span>
                            </td>
                            <td className="py-3.5 px-3 font-semibold text-slate-700">{biz.plan}</td>
                            <td className="py-3.5 px-3">
                              <span
                                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block ${
                                  biz.status === "Active"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-amber-50 text-amber-700 border border-amber-200"
                                }`}
                              >
                                {biz.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-3 font-extrabold text-violet-700">
                              +{biz.monthlyPointsEarned.toLocaleString()} pts/mo
                            </td>
                            <td className="py-3.5 px-4 text-right text-slate-500 font-mono text-[11px]">
                              {biz.joinedDate}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 3: LIVI POINTS & CASH REWARDS
             ======================================================== */}
          {activeTab === "redeem" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Header */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("dashboard")}
                    className="text-xs font-semibold text-slate-500 hover:text-violet-700 transition inline-flex items-center gap-1 mb-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Overview Dashboard</span>
                  </button>
                  <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Livi Points & Cash Rewards
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Convert your earned points into real cash deposited directly to your bank account, UPI, or PayPal.
                  </p>
                </div>

                <div className="px-3.5 py-1.5 rounded-xl bg-violet-50 border border-violet-200 text-violet-800 text-xs font-bold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                  <span>10 Livi Points = $1.00 USD</span>
                </div>
              </div>

              {/* Grid: Redeem Form & History */}
              <div className="grid lg:grid-cols-12 gap-6">
                {/* Left: Redeem Points Form (7 cols) */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xs space-y-5">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900">Request Cash Payout</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Select how many points to redeem and choose your destination payout method.
                    </p>
                  </div>

                  {redeemSuccess && (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 animate-in fade-in">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Redemption Request Dispatched!</span>
                        <span>{redeemSuccess}</span>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleRedeemSubmit} className="space-y-4">
                    {/* Available Balance Box */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-violet-700 uppercase tracking-wider block">
                          Available to Redeem
                        </span>
                        <span className="text-2xl font-extrabold text-slate-900">
                          {partner.availableBalancePoints.toLocaleString()} <span className="text-xs font-bold text-slate-500">pts</span>
                        </span>
                      </div>
                      <span className="text-base font-extrabold text-emerald-600">
                        ≈ ${usdAvailableBalance} USD
                      </span>
                    </div>

                    {/* Amount to Redeem */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Points to Redeem
                        </label>
                        <span className="text-xs text-slate-500 font-semibold">
                          = ${(pointsToRedeem / 10).toFixed(2)} USD
                        </span>
                      </div>
                      <input
                        type="number"
                        min={100}
                        max={partner.availableBalancePoints}
                        value={pointsToRedeem}
                        onChange={(e) => setPointsToRedeem(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-violet-600"
                      />

                      {/* Quick Select Chips */}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {[1000, 2500, 5000].map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => setPointsToRedeem(Math.min(amt, partner.availableBalancePoints))}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold cursor-pointer"
                          >
                            {amt.toLocaleString()} pts (${(amt / 10).toFixed(0)})
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => setPointsToRedeem(partner.availableBalancePoints)}
                          className="px-2.5 py-1 rounded-lg bg-violet-100 hover:bg-violet-200 text-violet-800 text-[11px] font-bold cursor-pointer"
                        >
                          Max Available
                        </button>
                      </div>
                    </div>

                    {/* Payout Method */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Payout Destination Method
                      </label>
                      <div className="grid sm:grid-cols-3 gap-2.5">
                        {(["Bank Wire Transfer", "UPI Transfer", "PayPal"] as const).map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setRedeemMethod(method)}
                            className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer text-center ${
                              redeemMethod === method
                                ? "border-violet-600 bg-violet-50 text-violet-800 ring-2 ring-violet-500/20"
                                : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Destination Preview */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Destination Account Preview:
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveTab("profile")}
                          className="text-violet-600 font-bold hover:underline cursor-pointer"
                        >
                          Change in Settings →
                        </button>
                      </div>
                      {redeemMethod === "Bank Wire Transfer" && (
                        <span>
                          {profileForm.bankName} • Account: ••••{profileForm.accountNumber.slice(-4) || "3210"} (IFSC: {profileForm.ifscOrSwift})
                        </span>
                      )}
                      {redeemMethod === "UPI Transfer" && <span>UPI ID: {profileForm.upiId}</span>}
                      {redeemMethod === "PayPal" && <span>PayPal: {profileForm.paypalEmail}</span>}
                    </div>

                    <button
                      type="submit"
                      disabled={isRedeeming || partner.availableBalancePoints <= 0}
                      className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-md hover:shadow-violet-600/30 transition cursor-pointer disabled:opacity-50"
                    >
                      {isRedeeming ? "Processing Transfer..." : `Redeem ${pointsToRedeem.toLocaleString()} Points ($${(pointsToRedeem / 10).toFixed(2)} USD)`}
                    </button>
                  </form>
                </div>

                {/* Right: Payout History (5 cols) */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xs space-y-4">
                  <h2 className="text-base font-extrabold text-slate-900">Redemption History</h2>

                  {partner.redemptions?.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                      <DollarSign className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-700">No Redemptions Yet</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Your payout requests will be logged here with reference ID and status.
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveTab("referrals")}
                        className="mt-4 px-3 py-1.5 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-bold transition cursor-pointer"
                      >
                        View Referrals to Earn More Points →
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {partner.redemptions?.map((rdm) => (
                        <div key={rdm.id} className="py-3 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">${rdm.amountUSD.toFixed(2)} USD</span>
                            <span className="text-[11px] text-slate-500 block">
                              {rdm.method} • {rdm.date}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">{rdm.referenceId}</span>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            {rdm.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 4: PROFILE & PAYOUT SETTINGS
             ======================================================== */}
          {activeTab === "profile" && (
            <div className="space-y-5 animate-in fade-in duration-200 max-w-4xl">
              {/* Header */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("dashboard")}
                    className="text-xs font-semibold text-slate-500 hover:text-violet-700 transition inline-flex items-center gap-1 mb-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Overview Dashboard</span>
                  </button>
                  <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Partner Profile & Payout Settings
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Update your contact info and configure your bank account for receiving monthly commission payouts.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab("redeem")}
                  className="px-4 py-2 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Go to Points & Rewards →</span>
                </button>
              </div>

              {/* Form Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  {/* Personal Details */}
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-violet-700 uppercase tracking-wider block">
                      1. Contact Information
                    </span>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Partner / Owner Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={profileForm.ownerName}
                          onChange={(e) => setProfileForm({ ...profileForm, ownerName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-violet-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Business Entity Name
                        </label>
                        <input
                          type="text"
                          value={profileForm.businessName}
                          onChange={(e) => setProfileForm({ ...profileForm, businessName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-violet-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Email Address (Login ID)
                        </label>
                        <input
                          type="email"
                          disabled
                          value={partner.email}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-500 font-semibold cursor-not-allowed"
                        />
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          Registered partner ID: {partner.id}
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="text"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-violet-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bank & Payout Configuration */}
                  <div className="space-y-4 pt-5 border-t border-slate-100">
                    <span className="text-xs font-bold text-violet-700 uppercase tracking-wider block">
                      2. Payout Account Details (For Points Redemption)
                    </span>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Bank Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. HDFC Bank / Chase"
                          value={profileForm.bankName}
                          onChange={(e) => setProfileForm({ ...profileForm, bankName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-violet-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Account Holder Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Sarah Jenkins"
                          value={profileForm.accountHolder}
                          onChange={(e) => setProfileForm({ ...profileForm, accountHolder: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-violet-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Bank Account Number
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 50100492819234"
                          value={profileForm.accountNumber}
                          onChange={(e) => setProfileForm({ ...profileForm, accountNumber: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-violet-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          IFSC / SWIFT / Routing Code
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. HDFC0001234"
                          value={profileForm.ifscOrSwift}
                          onChange={(e) => setProfileForm({ ...profileForm, ifscOrSwift: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-violet-600 uppercase"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          UPI ID (For Instant India Transfers)
                        </label>
                        <input
                          type="text"
                          placeholder="sarah@okhdfcbank"
                          value={profileForm.upiId}
                          onChange={(e) => setProfileForm({ ...profileForm, upiId: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-violet-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          PayPal Email (For International Transfers)
                        </label>
                        <input
                          type="email"
                          placeholder="paypal@example.com"
                          value={profileForm.paypalEmail}
                          onChange={(e) => setProfileForm({ ...profileForm, paypalEmail: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-violet-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveTab("dashboard")}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer"
                    >
                      ← Back to Dashboard
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingProfile}
                      className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-md transition cursor-pointer"
                    >
                      {isSavingProfile ? "Saving Details..." : "Save Profile & Payout Settings"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================
          MODAL: REFER A BUSINESS LEAD
         ======================================================== */}
      {isReferModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setIsReferModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsReferModalOpen(false)}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Introduce a Business</h3>
                <p className="text-xs text-slate-500">
                  Register a company referral. You earn {partner.commissionRate}% recurring points.
                </p>
              </div>
            </div>

            <form onSubmit={handleReferClientSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company / Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Legal Firm"
                  value={clientBizName}
                  onChange={(e) => setClientBizName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-violet-600"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={clientOwnerName}
                    onChange={(e) => setClientOwnerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-violet-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-violet-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subscription Tier
                </label>
                <select
                  value={clientPlan}
                  onChange={(e) => setClientPlan(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-violet-600 font-medium bg-white"
                >
                  <option value="State Pack (₹448/mo)">State Pack (₹448/mo) — Regional Dominance (+8,960 pts/mo)</option>
                  <option value="City Pack (₹398/mo)">City Pack (₹398/mo) — Local Growth (+7,960 pts/mo)</option>
                  <option value="Export / Country (₹1,298/mo)">Export / Country (₹1,298/mo) — Cross-Border Pro (+25,960 pts/mo)</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="clientStatus"
                    checked={clientStatus === "Active"}
                    onChange={() => setClientStatus("Active")}
                    className="text-violet-600"
                  />
                  <span>Paid Subscription</span>
                </label>
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="clientStatus"
                    checked={clientStatus === "14-Day Free Trial"}
                    onChange={() => setClientStatus("14-Day Free Trial")}
                    className="text-violet-600"
                  />
                  <span>14-Day Trial</span>
                </label>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsReferModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-md transition cursor-pointer"
                >
                  Save & Register Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: SHARE REFERRAL POPUP
         ======================================================== */}
      {isShareModalOpen && partner && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setIsShareModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 border border-slate-200 shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsShareModalOpen(false)}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-5 pr-8">
              <div className="w-10 h-10 rounded-2xl bg-[#6560F0] text-white flex items-center justify-center shadow-xs shrink-0">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Share Referral Link</h3>
                <p className="text-xs text-slate-500">
                  Earn {partner.commissionRate}% recurring reward points for every business you bring.
                </p>
              </div>
            </div>

            {/* 1. Quick Copy Referral Link & Partner Code */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 mb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Your Referral Link
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={partner.referralLink}
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-800 select-all focus:outline-none focus:ring-1 focus:ring-violet-500 truncate"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-xs transition cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
                </button>
              </div>

              {/* Partner Code Chip */}
              <div className="mt-2.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-[11px] font-medium text-slate-500">Partner Code:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-extrabold text-violet-700 bg-violet-50 border border-violet-200 px-2.5 py-0.5 rounded-lg text-xs">
                    {partner.referralCode}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="text-[11px] font-bold text-slate-600 hover:text-violet-700 flex items-center gap-1 cursor-pointer transition"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? "Copied" : "Copy Code"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Social Media Handles Grid */}
            <div className="mb-4">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
                Share via Social & Messaging
              </span>
              <div className="grid grid-cols-4 gap-2.5">
                {/* WhatsApp */}
                <button
                  type="button"
                  onClick={() => {
                    const msg = encodeURIComponent(
                      `Hello! Check out LiviLeads for automated B2B lead generation. Use my referral link: ${partner.referralLink} (Partner Code: ${partner.referralCode})`
                    );
                    window.open(`https://api.whatsapp.com/send?text=${msg}`, "_blank");
                  }}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white hover:bg-emerald-50/70 border border-slate-200/90 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 transition cursor-pointer group shadow-2xs hover:shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.15c-1.49 0-2.95-.4-4.22-1.16l-.3-.18-3.13.82.84-3.05-.2-.31a8.17 8.17 0 01-1.25-4.36c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.85 5.8 2.4 1.55 1.55 2.4 3.61 2.4 5.8 0 4.52-3.68 8.24-8.14 8.24zm4.49-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.3z"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold">WhatsApp</span>
                </button>

                {/* Livi Chat */}
                <button
                  type="button"
                  onClick={() => {
                    const text = `Join the LiviLeads Partner Program using my link: ${partner.referralLink} (Code: ${partner.referralCode})`;
                    navigator.clipboard.writeText(text);
                    showToast("Referral link copied for Livi Chat! Ready to paste into conversation.");
                  }}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white hover:bg-violet-50/70 border border-slate-200/90 hover:border-violet-300 text-slate-700 hover:text-violet-800 transition cursor-pointer group shadow-2xs hover:shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#6560F0] text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition">
                    <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold">Livi Chat</span>
                </button>

                {/* Telegram */}
                <button
                  type="button"
                  onClick={() => {
                    const msg = encodeURIComponent(`Automate your B2B lead generation with LiviLeads! Use my referral link: ${partner.referralLink} (Code: ${partner.referralCode})`);
                    window.open(`https://t.me/share/url?url=${encodeURIComponent(partner.referralLink)}&text=${msg}`, "_blank");
                  }}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white hover:bg-sky-50/70 border border-slate-200/90 hover:border-sky-300 text-slate-700 hover:text-sky-800 transition cursor-pointer group shadow-2xs hover:shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#229ED9] text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold">Telegram</span>
                </button>

                {/* Instagram */}
                <button
                  type="button"
                  onClick={() => {
                    const text = `Automate B2B lead generation with LiviLeads! Referral Link: ${partner.referralLink} (Code: ${partner.referralCode})`;
                    navigator.clipboard.writeText(text);
                    showToast("Caption & link copied! Opening Instagram...");
                    window.open("https://www.instagram.com", "_blank");
                  }}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white hover:bg-pink-50/70 border border-slate-200/90 hover:border-pink-300 text-slate-700 hover:text-pink-800 transition cursor-pointer group shadow-2xs hover:shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold">Instagram</span>
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  onClick={() => {
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(partner.referralLink)}`, "_blank");
                  }}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white hover:bg-blue-50/70 border border-slate-200/90 hover:border-blue-300 text-slate-700 hover:text-blue-800 transition cursor-pointer group shadow-2xs hover:shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1877F2] text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold">Facebook</span>
                </button>

                {/* X (Twitter) */}
                <button
                  type="button"
                  onClick={() => {
                    const msg = encodeURIComponent(`Automate your B2B lead generation with @LiviLeads! Use my referral code: ${partner.referralCode}`);
                    window.open(`https://twitter.com/intent/tweet?text=${msg}&url=${encodeURIComponent(partner.referralLink)}`, "_blank");
                  }}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200/90 hover:border-slate-400 text-slate-700 hover:text-black transition cursor-pointer group shadow-2xs hover:shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold">X</span>
                </button>

                {/* LinkedIn */}
                <button
                  type="button"
                  onClick={() => {
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(partner.referralLink)}`, "_blank");
                  }}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white hover:bg-sky-50/70 border border-slate-200/90 hover:border-sky-300 text-slate-700 hover:text-sky-800 transition cursor-pointer group shadow-2xs hover:shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold">LinkedIn</span>
                </button>

                {/* Email */}
                <button
                  type="button"
                  onClick={() => {
                    const subject = encodeURIComponent("Recommendation: Automated B2B Lead Generation with LiviLeads");
                    const body = encodeURIComponent(
                      `Hi,\n\nI recommend trying LiviLeads for automated B2B lead generation.\n\nYou can register using my official partner referral link:\n${partner.referralLink}\n\nPartner Code: ${partner.referralCode}\n\nBest regards,\n${partner.ownerName || partner.businessName}`
                    );
                    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
                  }}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white hover:bg-rose-50/70 border border-slate-200/90 hover:border-rose-300 text-slate-700 hover:text-rose-800 transition cursor-pointer group shadow-2xs hover:shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-red-600 text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold">Email</span>
                </button>
              </div>
            </div>

            {/* 3. Pre-written Invite Message */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Pre-Written Invite Message
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const fullMsg = `Hello! I partner with LiviLeads for automated B2B lead generation. Check out the platform using my referral link: ${partner.referralLink} (Partner Code: ${partner.referralCode})`;
                    navigator.clipboard.writeText(fullMsg);
                    setCopiedShareMessage(true);
                    showToast("Invite message copied to clipboard!");
                    setTimeout(() => setCopiedShareMessage(false), 2000);
                  }}
                  className="text-xs font-bold text-violet-700 hover:text-violet-800 flex items-center gap-1 cursor-pointer transition"
                >
                  {copiedShareMessage ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedShareMessage ? "Message Copied!" : "Copy Message"}</span>
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-white border border-slate-200/80 rounded-xl p-2.5 font-sans select-all">
                &ldquo;Hello! I partner with LiviLeads for automated B2B lead generation. Check out the platform using my referral link: <span className="font-mono text-violet-700 font-bold">{partner.referralLink}</span> (Partner Code: <span className="font-mono text-violet-700 font-bold">{partner.referralCode}</span>)&rdquo;
              </p>
            </div>



            <button
              type="button"
              onClick={() => setIsShareModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
