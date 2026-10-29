"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import LiviLogo from "@/components/LiviLogo";
import CountryPhoneInput from "@/components/CountryPhoneInput";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  User,
  Building2,
  UploadCloud,
  FileText,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  X,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building,
  Check,
  ChevronDown,
  Clock,
  Send,
  Loader2,
  Copy,
  Search,
  ArrowUpRight,
  Sparkles,
  ArrowRight,
  Calendar,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { PartnerAccount, ApprovedPartner } from "@/data/adminData";

interface DropdownOption {
  value: string;
  label: string;
  description?: string;
  badge?: string;
}

interface CustomDropdownProps {
  label: string;
  required?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
}

function CustomDropdown({
  label,
  required = true,
  icon: Icon,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  helperText,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>

      {/* Trigger Button following LiviLeads design style */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full relative flex items-center justify-between pl-10 pr-4 py-3 rounded-xl border text-sm text-left transition-all duration-200 cursor-pointer ${
          isOpen
            ? "border-violet-600 ring-2 ring-violet-500/20 bg-white shadow-xs"
            : "border-slate-200 hover:border-slate-300 bg-white"
        }`}
      >
        <Icon
          className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
            isOpen ? "text-violet-600" : "text-slate-400"
          }`}
        />

        <span
          className={`block truncate font-medium ${
            selectedOption ? "text-slate-900" : "text-slate-400"
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
            isOpen ? "rotate-180 text-violet-600" : ""
          }`}
        />
      </button>

      {helperText && (
        <p className="text-[11px] text-slate-500 mt-1">{helperText}</p>
      )}

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute left-0 right-0 top-full mt-2 z-50 bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden py-1.5 max-h-72 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm transition-all duration-200 ease-out cursor-pointer ${
                  isSelected
                    ? "bg-violet-50 text-violet-900 font-bold border-l-4 border-violet-600"
                    : "text-slate-700 hover:bg-violet-50/50 hover:text-violet-900"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate">{option.label}</span>
                    {option.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-100/70 text-violet-700 font-semibold">
                        {option.badge}
                      </span>
                    )}
                  </div>
                  {option.description && (
                    <p
                      className={`text-[11px] mt-0.5 truncate ${
                        isSelected ? "text-violet-600/80" : "text-slate-400"
                      }`}
                    >
                      {option.description}
                    </p>
                  )}
                </div>

                {isSelected && (
                  <Check className="w-4 h-4 text-violet-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ApplyFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Track: 'individual' | 'business'
  const [track, setTrack] = useState<"individual" | "business">("individual");

  // Read track from URL query parameter if present
  useEffect(() => {
    const trackParam = searchParams.get("track") || searchParams.get("type");
    if (trackParam === "business") {
      setTrack("business");
    } else if (trackParam === "individual") {
      setTrack("individual");
    }
  }, [searchParams]);

  // Options for Business Category
  const businessCategoryOptions: DropdownOption[] = [
    {
      value: "Marketing & Digital Agency",
      label: "Marketing & Digital Agency",
      description: "SEO, performance marketing & creative agencies",
    },
    {
      value: "Sales & Lead Gen Agency",
      label: "Sales & Lead Gen Agency",
      description: "B2B prospecting, SDR/BDR outreach teams",
    },
    {
      value: "Telecalling / Call Center Operations",
      label: "Telecalling / Call Center Operations",
      description: "Inside sales, voice outreach & outbound calling",
    },
    {
      value: "Business Consultancy & Advisory",
      label: "Business Consultancy & Advisory",
      description: "Corporate strategy, management consulting & advisors",
    },
    {
      value: "Software / IT Solutions Provider",
      label: "Software / IT Solutions Provider",
      description: "SaaS integrators, IT services & technology firms",
    },
    {
      value: "Industry Association / Trade Group",
      label: "Industry Association / Trade Group",
      description: "Business forums, industry chambers & professional groups",
    },
    {
      value: "Other Corporate Entity",
      label: "Other Corporate Entity",
      description: "Registered commercial companies & enterprise firms",
    },
    {
      value: "Other",
      label: "Other (Please specify)",
      description: "Type your specific industry, agency or enterprise model",
    },
  ];

  // Options for Business Verification Document Type
  const businessDocTypeOptions: DropdownOption[] = [
    {
      value: "Certificate of Incorporation",
      label: "Certificate of Incorporation",
      description: "Official registered company registration certificate",
    },
    {
      value: "Trade License / Commercial License",
      label: "Trade License / Commercial License",
      description: "Municipal or government commercial operating license",
    },
    {
      value: "Tax Registration / GST / VAT Certificate",
      label: "Tax Registration / GST / VAT Certificate",
      description: "Official tax compliance or sales tax registration",
    },
    {
      value: "Company PAN / Tax ID / EIN Document",
      label: "Company PAN / Tax ID / EIN Document",
      description: "National tax identification certificate",
    },
    {
      value: "Memorandum & Articles of Association",
      label: "Memorandum & Articles of Association",
      description: "Constitutional founding bylaws or company charter",
    },
    {
      value: "Other Official Business Proof",
      label: "Other Official Business Proof",
      description: "Bank letterhead, utility verification, or government record",
    },
  ];


  // Individual Partner Form State
  const [individualData, setIndividualData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [individualCvFile, setIndividualCvFile] = useState<File | null>(null);

  // Business Partner Form State
  const [businessData, setBusinessData] = useState({
    businessName: "",
    email: "",
    phone: "",
    businessCategory: "Marketing & Digital Agency",
    customBusinessType: "",
    documentType: "Certificate of Incorporation",
    ownerName: "",
  });
  const [businessDocFile, setBusinessDocFile] = useState<File | null>(null);

  // General States
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Instant Activation States
  const [createdReferralCode, setCreatedReferralCode] = useState("");
  const [createdReferralLink, setCreatedReferralLink] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [createdPartnerName, setCreatedPartnerName] = useState("");

  const handleCopyRef = () => {
    if (applicationId) {
      navigator.clipboard.writeText(applicationId);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const cvInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  // Drag and drop states
  const [isDraggingCv, setIsDraggingCv] = useState(false);
  const [isDraggingDoc, setIsDraggingDoc] = useState(false);
  const [fileDataUrl, setFileDataUrl] = useState<string>("");

  // Helper to read file as data URL
  const readFileAsDataUrl = (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFileDataUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Failed to read file as data URL", err);
    }
  };

  // Handle CV File Select
  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage("File size must be less than 10MB.");
        return;
      }
      setIndividualCvFile(file);
      readFileAsDataUrl(file);
      setErrorMessage("");
    }
  };

  // Handle Business Document File Select
  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 15 * 1024 * 1024) {
        setErrorMessage("Verification document size must be less than 15MB.");
        return;
      }
      setBusinessDocFile(file);
      readFileAsDataUrl(file);
      setErrorMessage("");
    }
  };

  // Drag and drop handlers
  const handleDropCv = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingCv(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage("File size must be less than 10MB.");
        return;
      }
      setIndividualCvFile(file);
      readFileAsDataUrl(file);
      setErrorMessage("");
    }
  };

  const handleDropDoc = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingDoc(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 15 * 1024 * 1024) {
        setErrorMessage("Verification document size must be less than 15MB.");
        return;
      }
      setBusinessDocFile(file);
      readFileAsDataUrl(file);
      setErrorMessage("");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Field validation helpers
  const isValidEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailStr.trim());
  };

  const isValidPhone = (phoneStr: string) => {
    return phoneStr.replace(/\D/g, "").length >= 7;
  };

  // Dynamic validation for Individual track
  const isIndividualValid = Boolean(
    individualData.name.trim().length >= 2 &&
    isValidEmail(individualData.email) &&
    isValidPhone(individualData.phone) &&
    individualData.address.trim().length >= 3 &&
    individualCvFile !== null &&
    agreedToTerms
  );

  // Dynamic validation for Business track
  const isOtherBusinessCategory =
    businessData.businessCategory === "Other Corporate Entity" ||
    businessData.businessCategory === "Other" ||
    businessData.businessCategory.toLowerCase().startsWith("other");

  const isBusinessValid = Boolean(
    businessData.businessName.trim().length >= 2 &&
    businessData.ownerName.trim().length >= 2 &&
    isValidEmail(businessData.email) &&
    isValidPhone(businessData.phone) &&
    businessData.businessCategory.trim() &&
    (!isOtherBusinessCategory || businessData.customBusinessType.trim().length >= 2) &&
    businessData.documentType.trim() &&
    businessDocFile !== null &&
    agreedToTerms
  );

  // Master form validity flag
  const isFormValid = track === "individual" ? isIndividualValid : isBusinessValid;

  // Form Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isFormValid) {
      if (!agreedToTerms) {
        setErrorMessage("Please accept the Partner Program terms and conditions checkbox to proceed.");
      } else {
        setErrorMessage("Please make sure all required fields are filled properly and the required document is attached.");
      }
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const randomRef = "LLP-" + Math.floor(100000 + Math.random() * 900000);
      const partnerName = track === "business" ? businessData.businessName : individualData.name;
      const ownerName = track === "business" ? (businessData.ownerName || businessData.businessName) : individualData.name;
      const email = track === "business" ? businessData.email : individualData.email;
      const phone = track === "business" ? businessData.phone : individualData.phone;
      
      const cleanSlug = (partnerName || "PARTNER")
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 8)
        .toUpperCase() || "PARTNER";
      const referralCode = `LIVI-${cleanSlug}`;
      const referralLink = `https://livileads.com/ref/livi-${cleanSlug.toLowerCase()}`;

      setApplicationId(randomRef);
      setCreatedReferralCode(referralCode);
      setCreatedPartnerName(partnerName);
      setIsSubmitting(false);
      setIsSubmitted(true);

      if (track === "business") {
        // ==========================================
        // BUSINESS TRACK: Instant Corporate Activation
        // Direct dashboard access is fully granted immediately.
        // ==========================================
        setCreatedReferralLink(referralLink);

        const newPartnerAccount: PartnerAccount = {
          id: randomRef,
          businessName: partnerName,
          ownerName: ownerName,
          email: email,
          loginId: randomRef,
          phone: phone,
          password: "Livi#Partner2026",
          track: "business",
          tier: "Corporate Partner",
          commissionRate: 20,
          referralCode,
          referralLink,
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
            accountHolder: ownerName,
            ifscOrSwift: "HDFC0001234",
            upiId: `${ownerName.toLowerCase().replace(/\s+/g, "")}@okhdfcbank`,
            paypalEmail: email,
          },
          referredBusinesses: [],
          redemptions: [],
        };

        try {
          // 1. Immediately log in the corporate partner into active session
          localStorage.setItem("livileads_active_partner", JSON.stringify(newPartnerAccount));

          // 2. Add to registered accounts
          const storedAccountsStr = localStorage.getItem("livileads_partner_accounts");
          const storedAccounts = storedAccountsStr ? JSON.parse(storedAccountsStr) : [];
          localStorage.setItem(
            "livileads_partner_accounts",
            JSON.stringify([newPartnerAccount, ...storedAccounts.filter((a: any) => a.id !== randomRef)])
          );

          // 3. Add to Approved Partners list
          const newApprovedPartner: ApprovedPartner = {
            id: `AP-${Date.now().toString().slice(-5)}`,
            applicationId: randomRef,
            businessName: partnerName,
            ownerName: ownerName,
            email: email,
            loginId: randomRef,
            phone: phone,
            category: isOtherBusinessCategory
              ? businessData.customBusinessType
              : businessData.businessCategory,
            referralCode,
            referralLink,
            tier: "Corporate Partner",
            commissionRate: 20,
            approvedAt: new Date().toISOString(),
            status: "Active",
            totalReferredCount: 0,
            activePayingCount: 0,
            trialCount: 0,
            churnedCount: 0,
            totalEarningsUSD: 0,
            totalLiviPoints: 5000,
            currentMonthPoints: 0,
            availableBalancePoints: 5000,
            referredBusinesses: [],
          };

          const apStr = localStorage.getItem("livileads_approved_partners");
          const apList = apStr ? JSON.parse(apStr) : [];
          localStorage.setItem(
            "livileads_approved_partners",
            JSON.stringify([newApprovedPartner, ...apList.filter((p: any) => p.email !== email)])
          );

          // 4. Save to applications queue with status "Approved"
          const newAppRecord = {
            id: randomRef,
            track: "business",
            businessName: partnerName,
            ownerName: ownerName,
            email: email,
            phone: phone,
            category: isOtherBusinessCategory
              ? businessData.customBusinessType
              : businessData.businessCategory,
            documentType: businessData.documentType,
            fileName: businessDocFile?.name || "Company_Registration_Certificate.pdf",
            fileSize: businessDocFile?.size || 1840000,
            fileDataUrl: fileDataUrl || "",
            address: "Corporate Business Office",
            submittedAt: new Date().toISOString(),
            status: "Approved",
            assignedCode: referralCode,
            assignedTier: "Corporate Partner",
            notes: "Verified Corporate Partner - Instant Active Onboarding",
          };

          const existingStr = localStorage.getItem("livileads_partner_applications");
          const existingList = existingStr ? JSON.parse(existingStr) : [];
          localStorage.setItem(
            "livileads_partner_applications",
            JSON.stringify([newAppRecord, ...existingList.filter((a: any) => a.id !== randomRef)])
          );
        } catch (err) {
          console.error("Failed to sync business application to storage", err);
        }
      } else {
        // ==========================================
        // INDIVIDUAL TRACK: 4-Stage Verification Flow
        // Application Submitted -> Progress -> Interview -> Then Dashboard
        // Do NOT log in to active partner session.
        // Do NOT grant direct dashboard access.
        // ==========================================
        setCreatedReferralLink(""); // locked until interview clearance

        try {
          const newAppRecord = {
            id: randomRef,
            track: "individual",
            businessName: individualData.name,
            ownerName: individualData.name,
            email: individualData.email,
            phone: individualData.phone,
            category: "Independent Consultant / Freelancer",
            documentType: "Resume / CV",
            fileName: individualCvFile?.name || "Professional_Resume.pdf",
            fileSize: individualCvFile?.size || 950000,
            fileDataUrl: fileDataUrl || "",
            address: individualData.address,
            submittedAt: new Date().toISOString(),
            status: "Pending Review",
            assignedCode: referralCode,
            assignedTier: "Starter Partner",
            notes: "Individual Partner - Application submitted. Screening in progress -> Next: Evaluation interview -> Portal activation.",
          };

          const existingStr = localStorage.getItem("livileads_partner_applications");
          const existingList = existingStr ? JSON.parse(existingStr) : [];
          localStorage.setItem(
            "livileads_partner_applications",
            JSON.stringify([newAppRecord, ...existingList.filter((a: any) => a.id !== randomRef)])
          );
        } catch (err) {
          console.error("Failed to sync individual application to storage", err);
        }
      }

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore fallback
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 h-14 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <LiviLogo size="md" showBadge={true} badgeText="Partner Program" />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-bold text-slate-600 hover:text-violet-700 bg-slate-100/80 hover:bg-violet-50 hover:border-violet-200/80 border border-transparent px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-250 ease-out"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Back to Home</span>
            <span className="xs:hidden">Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-8 sm:py-16">
        <div className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8">
          {!isSubmitted ? (
            <div>
              {/* Header */}
              <div className="text-center mb-8 sm:mb-10">
                <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
                  <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#6560F0]">
                    Official Partner Application
                  </span>
                  <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
                </div>

                <h1 className="text-xl xs:text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Join the LiviLeads Partner Network
                </h1>

                <p className="text-xs sm:text-base text-slate-600 mt-2 sm:mt-3 max-w-xl mx-auto leading-relaxed">
                  Choose your partner track below and submit your details to start earning recurring Livi Points.
                </p>
              </div>

              {/* Track Selector Tabs - Expands cleanly to match full width */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4 p-1 sm:p-1.5 bg-slate-200/60 rounded-2xl mb-6 sm:mb-8">
                {/* Tab 1: Individual Partner */}
                <button
                  type="button"
                  onClick={() => {
                    setTrack("individual");
                    setErrorMessage("");
                  }}
                  className={`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3.5 p-2.5 sm:p-4 rounded-xl transition-all duration-300 ease-out cursor-pointer active:scale-[0.98] ${
                    track === "individual"
                      ? "bg-white text-slate-900 shadow-sm border border-[#6560F0]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/70 hover:border-[#6560F0]/40 border border-transparent hover:shadow-md hover:shadow-[#6560F0]/10"
                  }`}
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ease-out ${
                      track === "individual"
                        ? "bg-[#6560F0] text-white shadow-xs"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                      <span className="text-[11px] sm:text-sm font-bold truncate">Individual</span>
                    </div>
                    <span className="text-[9px] sm:text-xs text-slate-500 block mt-0.5 truncate">
                      Freelancers & agents
                    </span>
                  </div>
                </button>

                {/* Tab 2: Business Partner */}
                <button
                  type="button"
                  onClick={() => {
                    setTrack("business");
                    setErrorMessage("");
                  }}
                  className={`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3.5 p-2.5 sm:p-4 rounded-xl transition-all duration-300 ease-out cursor-pointer active:scale-[0.98] ${
                    track === "business"
                      ? "bg-white text-slate-900 shadow-sm border border-[#6560F0]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/70 hover:border-[#6560F0]/40 border border-transparent hover:shadow-md hover:shadow-[#6560F0]/10"
                  }`}
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ease-out ${
                      track === "business"
                        ? "bg-[#6560F0] text-white shadow-xs"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                      <span className="text-[11px] sm:text-sm font-bold truncate">Business</span>
                    </div>
                    <span className="text-[9px] sm:text-xs text-slate-500 block mt-0.5 truncate">
                      Agencies & teams
                    </span>
                  </div>
                </button>
              </div>

              {/* Form Container - Width expands to match top bar */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 border border-slate-200/90 shadow-sm">
                {errorMessage && (
                  <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-xs sm:text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* TRACK A: INDIVIDUAL PARTNER FORM */}
                  {track === "individual" && (
                    <div className="space-y-5">
                      <div className="border-b border-slate-100 pb-3">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">
                          Individual Partner Details
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Please enter your personal contact details and upload your verification document.
                        </p>
                      </div>

                      {/* Row 1: Full Name & Phone Number */}
                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Full Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              placeholder="e.g. Sarah Jenkins"
                              value={individualData.name}
                              onChange={(e) =>
                                setIndividualData({ ...individualData, name: e.target.value })
                              }
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition"
                            />
                          </div>
                        </div>

                        <CountryPhoneInput
                          label="Phone / WhatsApp Number"
                          required={true}
                          value={individualData.phone}
                          countryCode="IN"
                          onChange={(fullNumber) =>
                            setIndividualData({ ...individualData, phone: fullNumber })
                          }
                          id="individual-phone"
                        />
                      </div>

                      {/* Row 2: Email Address */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="email"
                            required
                            placeholder="sarah@example.com"
                            value={individualData.email}
                            onChange={(e) =>
                              setIndividualData({ ...individualData, email: e.target.value })
                            }
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition"
                          />
                        </div>
                      </div>

                      {/* Row 3: Full Address */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Address <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                          <textarea
                            required
                            rows={3}
                            placeholder="Street address, City, State/Province, Postal Code, Country"
                            value={individualData.address}
                            onChange={(e) =>
                              setIndividualData({ ...individualData, address: e.target.value })
                            }
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition"
                          />
                        </div>
                      </div>

                      {/* Row 4: Document File Upload Area */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Attach Document File <span className="text-rose-500">*</span>
                        </label>

                        <input
                          type="file"
                          ref={cvInputRef}
                          onChange={handleCvChange}
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                        />

                        {!individualCvFile ? (
                          <div
                            onDragOver={(e) => {
                              e.preventDefault();
                              setIsDraggingCv(true);
                            }}
                            onDragLeave={() => setIsDraggingCv(false)}
                            onDrop={handleDropCv}
                            onClick={() => cvInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${
                              isDraggingCv
                                ? "border-violet-500 bg-violet-50/50"
                                : "border-slate-300 hover:border-violet-400 bg-slate-50/50 hover:bg-violet-50/20"
                            }`}
                          >
                            <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center mx-auto mb-3 shadow-xs">
                              <UploadCloud className="w-6 h-6" />
                            </div>
                            <p className="text-xs sm:text-sm font-bold text-slate-800">
                              Upload your Resume, CV, or Verification Document
                            </p>
                            <p className="text-[11px] text-slate-500 mt-1">
                              Drag & drop or click to browse (Supported: PDF, DOC, DOCX up to 10MB)
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between p-4 rounded-2xl bg-violet-50/50 border border-violet-200">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                    {individualCvFile.name}
                                  </span>
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-200/60 text-violet-800 font-semibold shrink-0">
                                    Document Attached
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 mt-0.5">
                                  {formatFileSize(individualCvFile.size)} • Ready for submission
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setIndividualCvFile(null)}
                              className="w-8 h-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition shrink-0 cursor-pointer"
                              title="Remove file"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TRACK B: BUSINESS PARTNER FORM */}
                  {track === "business" && (
                    <div className="space-y-5">
                      <div className="border-b border-slate-100 pb-3">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">
                          Business Entity Details
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Enter your organization details and upload official business verification documents.
                        </p>
                      </div>

                      {/* Row 1: Business Name & Owner Name */}
                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Business Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              placeholder="e.g. Apex Marketing Solutions LLC"
                              value={businessData.businessName}
                              onChange={(e) =>
                                setBusinessData({ ...businessData, businessName: e.target.value })
                              }
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Owner / Managing Director Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              placeholder="e.g. David Miller (Managing Director)"
                              value={businessData.ownerName}
                              onChange={(e) =>
                                setBusinessData({ ...businessData, ownerName: e.target.value })
                              }
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Row 2: Business Email & Business Phone */}
                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Official Business Email <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="email"
                              required
                              placeholder="partnerships@apexmarketing.com"
                              value={businessData.email}
                              onChange={(e) =>
                                setBusinessData({ ...businessData, email: e.target.value })
                              }
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition"
                            />
                          </div>
                        </div>

                        <CountryPhoneInput
                          label="Contact Phone Number"
                          required={true}
                          value={businessData.phone}
                          countryCode="IN"
                          onChange={(fullNumber) =>
                            setBusinessData({ ...businessData, phone: fullNumber })
                          }
                          id="business-phone"
                        />
                      </div>

                      {/* Row 3: Business Type / Category & Document Type to Upload */}
                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 items-start">
                        <div className="space-y-3.5">
                          <CustomDropdown
                            label="Business Type or Category"
                            required={true}
                            icon={Briefcase}
                            options={businessCategoryOptions}
                            value={businessData.businessCategory}
                            onChange={(val) =>
                              setBusinessData({
                                ...businessData,
                                businessCategory: val,
                              })
                            }
                            helperText="Select the primary business classification for your entity"
                          />

                          {/* Dynamic Custom Business Type Input when 'Other' is chosen */}
                          {isOtherBusinessCategory && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300 p-3.5 sm:p-4 rounded-xl bg-violet-50/40 border border-violet-200/90 shadow-2xs">
                              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                                Specify Business Type / Category <span className="text-rose-500">*</span>
                              </label>
                              <div className="relative">
                                <Briefcase className="w-4 h-4 text-violet-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input
                                  type="text"
                                  required
                                  autoFocus
                                  placeholder="e.g. Real Estate Agency, Logistics, Healthcare, Media, etc."
                                  value={businessData.customBusinessType}
                                  onChange={(e) =>
                                    setBusinessData({
                                      ...businessData,
                                      customBusinessType: e.target.value,
                                    })
                                  }
                                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20 text-xs sm:text-sm font-medium transition bg-white"
                                />
                              </div>
                              <p className="text-[11px] text-slate-500 mt-1.5">
                                Type your specific organization model or industry specialization
                              </p>
                            </div>
                          )}
                        </div>

                        <CustomDropdown
                          label="Document Type to Upload"
                          required={true}
                          icon={FileCheck}
                          options={businessDocTypeOptions}
                          value={businessData.documentType}
                          onChange={(val) =>
                            setBusinessData({
                              ...businessData,
                              documentType: val,
                            })
                          }
                          helperText="Select the official verification document you are uploading"
                        />
                      </div>

                      {/* Row 4: Verification Document Upload Zone */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Attach Verification Document <span className="text-rose-500">*</span>
                        </label>

                        <input
                          type="file"
                          ref={docInputRef}
                          onChange={handleDocChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                        />

                        {!businessDocFile ? (
                          <div
                            onDragOver={(e) => {
                              e.preventDefault();
                              setIsDraggingDoc(true);
                            }}
                            onDragLeave={() => setIsDraggingDoc(false)}
                            onDrop={handleDropDoc}
                            onClick={() => docInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${
                              isDraggingDoc
                                ? "border-violet-500 bg-violet-50/50"
                                : "border-slate-300 hover:border-violet-400 bg-slate-50/50 hover:bg-violet-50/20"
                            }`}
                          >
                            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto mb-3 shadow-xs">
                              <UploadCloud className="w-6 h-6" />
                            </div>
                            <p className="text-xs sm:text-sm font-bold text-slate-800">
                              Upload your {businessData.documentType}
                            </p>
                            <p className="text-[11px] text-slate-500 mt-1">
                              Drag & drop or click to browse (Supported: PDF, JPG, PNG up to 15MB)
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                    {businessDocFile.name}
                                  </span>
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-200/70 text-indigo-800 font-semibold shrink-0">
                                    {businessData.documentType}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 mt-0.5">
                                  {formatFileSize(businessDocFile.size)} • Document ready for verification
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setBusinessDocFile(null)}
                              className="w-8 h-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition shrink-0 cursor-pointer"
                              title="Remove document"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Terms & Consent Checkbox */}
                  <div className="pt-4 border-t border-slate-100">
                    <label className="flex items-start gap-3 cursor-pointer select-none group">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded text-violet-600 focus:ring-violet-500 border-slate-300 cursor-pointer accent-violet-600"
                      />
                      <span className="text-xs text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
                        I confirm that all provided details and documents are authentic. I agree to the{" "}
                        <span className="font-semibold text-violet-700 underline">
                          LiviLeads Partner Program Terms & Conditions
                        </span>{" "}
                        and understand rewards are credited as Livi Points from qualifying business subscriptions.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className={`w-full py-4 px-6 rounded-2xl text-sm transition-all duration-300 ease-out flex items-center justify-center gap-2 ${
                        isFormValid && !isSubmitting
                          ? "bg-[#6560F0] hover:bg-[#524ad9] active:bg-[#443fa7] text-white font-bold shadow-lg shadow-[#6560F0]/25 hover:shadow-xl hover:shadow-[#6560F0]/35 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                          : "bg-slate-200/90 text-slate-400 border border-slate-300/60 font-semibold cursor-not-allowed shadow-none"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Partner Application</span>
                          <Send
                            className={`w-4 h-4 transition-colors ${
                              isFormValid ? "text-white" : "text-slate-400"
                            }`}
                          />
                        </>
                      )}
                    </button>

                    {!isFormValid && (
                      <p className="text-center text-[11px] text-slate-400 mt-2.5 font-medium">
                        {!agreedToTerms
                          ? "Please check the agreement box above to enable application submission."
                          : track === "individual" && !individualCvFile
                          ? "Please upload your resume or verification document to enable submission."
                          : track === "business" && isOtherBusinessCategory && !businessData.customBusinessType.trim()
                          ? "Please specify your custom business type / category to enable submission."
                          : track === "business" && !businessDocFile
                          ? `Please upload your ${businessData.documentType || "document"} to enable submission.`
                          : "Please fill in all required fields (*) to enable submission."}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          ) : track === "business" ? (
            /* ========================================================
               BUSINESS TRACK: DIRECT DASHBOARD & INSTANT ACTIVATION
               ======================================================== */
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl animate-fade-in max-w-3xl mx-auto">
              {/* Header with celebration */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm shadow-emerald-200">
                  <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold mb-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Corporate Account Activated & Ready</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Welcome to LiviLeads, {createdPartnerName || businessData.businessName}!
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto leading-relaxed">
                  Your corporate partner workspace is live. You can immediately access your dashboard, monitor referrals, and start introducing businesses!
                </p>
              </div>

              {/* Referral Link & Code Box */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 mb-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Your Official Referral Link
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-slate-900 font-bold block truncate bg-white border border-slate-200 rounded-xl px-3 py-2">
                      {createdReferralLink}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!createdReferralLink) return;
                      navigator.clipboard.writeText(createdReferralLink);
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2000);
                    }}
                    className="sm:self-end px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer shrink-0"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? "Link Copied!" : "Copy Link"}</span>
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-medium">Partner Code:</span>
                    <span className="font-mono font-extrabold text-violet-700 bg-violet-50 border border-violet-200 px-2.5 py-0.5 rounded-lg text-xs">
                      {createdReferralCode}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!createdReferralCode) return;
                      navigator.clipboard.writeText(createdReferralCode);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2000);
                    }}
                    className="text-xs font-bold text-slate-600 hover:text-violet-700 flex items-center gap-1 cursor-pointer transition"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? "Code Copied" : "Copy Code"}</span>
                  </button>
                </div>
              </div>

              {/* 3 Core Features & Commission Breakdown */}
              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center mb-2 font-bold text-xs">
                    20%
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Recurring Rewards</h4>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Earn on every renewal: State Pack (+8,960 pts), City Pack (+7,960 pts), Export (+25,960 pts).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 font-bold text-xs">
                    ⚡
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Live Tracking</h4>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Track clients, trial status, and renewals in real-time inside your dashboard.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-2 font-bold text-xs">
                    ₹
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Instant Cash Out</h4>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Redeem your accumulated points directly to Bank Wire, UPI, or PayPal anytime.
                  </p>
                </div>
              </div>

              {/* Corporate Note */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-xs text-slate-600 mb-6 flex items-start gap-2.5 text-left">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-900 block">Corporate Partner Status: Active</span>
                  <span>Your company is registered with instant verified partner status. Direct dashboard access is fully enabled.</span>
                </div>
              </div>

              {/* Main Call to Action: GO TO DASHBOARD & START INVITING */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/portal"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 active:scale-[0.99] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-violet-500/25 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Go to Partner Dashboard & Start Inviting</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/"
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition text-center"
                >
                  Return to Home
                </Link>
              </div>

              {/* Admin note */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <span>Partner ID: <strong className="text-slate-600 font-mono">{applicationId}</strong></span>
                <span>•</span>
                <Link href="/admin" className="text-violet-600 font-bold hover:underline inline-flex items-center gap-0.5">
                  Admin Monitoring <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ) : (
            /* ========================================================
               INDIVIDUAL TRACK: APPLICATION SUBMITTED -> SCREENING -> INTERVIEW -> DASHBOARD
               (NO Direct Dashboard Access!)
               ======================================================== */
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl animate-fade-in max-w-3xl mx-auto">
              {/* Header */}
              <div className="text-center mb-7">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-violet-100 text-[#6560F0] flex items-center justify-center mx-auto mb-4 shadow-sm shadow-violet-200">
                  <Clock className="w-9 h-9 sm:w-11 sm:h-11" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200 text-xs font-bold mb-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#6560F0] animate-pulse" />
                  <span>Application Submitted • Under Screening</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Application Submitted, {createdPartnerName || individualData.name}!
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto leading-relaxed">
                  Thank you for applying to the LiviLeads Partner Program. Your application is now in review. Individual partners complete a quick screening and a short 10-minute evaluation interview before partner dashboard activation.
                </p>
              </div>

              {/* Reference ID Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 mb-7">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-200/60">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Application Reference Number
                    </span>
                    <span className="text-lg sm:text-xl font-mono font-extrabold text-[#6560F0]">
                      {applicationId}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyRef}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-violet-300 text-slate-700 text-xs font-semibold hover:text-violet-700 transition cursor-pointer shadow-2xs"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Reference ID</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-600">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Applicant Name</span>
                    <span className="font-bold text-slate-800">{individualData.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Contact Phone</span>
                    <span className="font-bold text-slate-800">{individualData.phone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Verification Document</span>
                    <span className="font-bold text-slate-800 truncate block">
                      {individualCvFile?.name || "Professional_Resume.pdf"}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4-Stage Onboarding Flow Timeline */}
              <div className="mb-7">
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#6560F0]" />
                    Individual Partner Onboarding Pipeline
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-500">
                    Step 2 of 4 Active
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Stage 1: Application Submitted */}
                  <div className="p-3.5 sm:p-4 rounded-2xl border border-emerald-200/80 bg-emerald-50/40 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-4 h-4 font-bold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                          1. Application Submitted
                        </h4>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Completed
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                        Personal information and verification document successfully uploaded and registered.
                      </p>
                    </div>
                  </div>

                  {/* Stage 2: Profile Screening */}
                  <div className="p-3.5 sm:p-4 rounded-2xl border border-violet-200/90 bg-violet-50/50 flex items-start gap-3.5 ring-1 ring-violet-200/60 shadow-xs">
                    <div className="w-9 h-9 rounded-xl bg-[#6560F0] text-white flex items-center justify-center shrink-0 shadow-sm shadow-violet-400/30 animate-pulse">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                          <span>2. Profile & Screening Review</span>
                          <span className="w-2 h-2 rounded-full bg-[#6560F0] animate-ping" />
                        </h4>
                        <span className="text-[10px] font-bold text-[#6560F0] bg-violet-100 px-2 py-0.5 rounded-full border border-violet-200">
                          In Progress (12–24 hrs)
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                        Our onboarding team is reviewing your profile and credentials to assign your partner tier.
                      </p>
                    </div>
                  </div>

                  {/* Stage 3: Evaluation Interview */}
                  <div className="p-3.5 sm:p-4 rounded-2xl border border-amber-200/80 bg-amber-50/30 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-800">
                          3. Evaluation Interview
                        </h4>
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-200">
                          Upcoming Step
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                        A short 10-minute online or phone call with our partner manager to walk through referral guidelines.
                      </p>
                    </div>
                  </div>

                  {/* Stage 4: Dashboard & Referral Link Activation */}
                  <div className="p-3.5 sm:p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-start gap-3.5 opacity-80">
                    <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-500 flex items-center justify-center shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-500 flex items-center gap-1.5">
                          <span>4. Dashboard & Referral Link Activation</span>
                        </h4>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-full">
                          Locked Until Clearance
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                        Upon interview completion & clearance, your personal partner dashboard and live referral link will be unlocked.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What to Expect Next Notice */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-50/90 to-indigo-50/80 border border-violet-200/80 mb-7 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#6560F0] shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-extrabold text-slate-900 block mb-1">
                    What happens next?
                  </span>
                  <span>
                    Our Partner Success Manager will reach out directly to your WhatsApp / Phone at{" "}
                    <strong className="text-slate-900 font-semibold">{individualData.phone}</strong> and via email at{" "}
                    <strong className="text-slate-900 font-semibold">{individualData.email}</strong> within 24–48 hours to confirm your interview slot.
                  </span>
                </div>
              </div>

              {/* Actions for Individual Track (NO DIRECT DASHBOARD ACCESS!) */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsTrackModalOpen(true)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#6560F0] hover:bg-[#524ad9] active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-violet-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Track Application Status</span>
                </button>

                <Link
                  href="/"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition text-center"
                >
                  Return to Home
                </Link>
              </div>

              {/* Admin Queue Link */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <span>Application ID: <strong className="text-slate-600 font-mono">{applicationId}</strong></span>
                <span>•</span>
                <Link href="/admin" className="text-[#6560F0] font-bold hover:underline inline-flex items-center gap-0.5">
                  Admin Review Queue <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {/* Application Tracking Modal */}
          {isTrackModalOpen && (
            <div
              className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
              onClick={() => setIsTrackModalOpen(false)}
            >
              <div
                className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-7 border border-slate-200 shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsTrackModalOpen(false)}
                  className="absolute right-3.5 top-3.5 sm:right-5 sm:top-5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 hover:scale-110 active:scale-90 flex items-center justify-center transition-all duration-200 ease-out cursor-pointer"
                  title="Close modal"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                {/* Header */}
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#6560F0]/10 text-[#6560F0] flex items-center justify-center shrink-0 shadow-xs">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[#6560F0] bg-[#6560F0]/10 px-2.5 py-0.5 rounded-md border border-[#6560F0]/20">
                      Live Status Tracker
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 sm:mt-1">
                      Application Tracking
                    </h3>
                  </div>
                </div>

                {/* Reference Number Card */}
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80 mb-4 sm:mb-6 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Your Reference ID
                    </span>
                    <span className="text-sm sm:text-base font-mono font-bold text-[#6560F0]">
                      {applicationId || "LLP-718309"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyRef}
                    className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-white border border-slate-200 hover:border-violet-300 text-slate-700 text-xs font-semibold hover:text-violet-700 hover:scale-105 active:scale-95 transition-all duration-200 ease-out cursor-pointer shadow-2xs"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Tracking Progress Steps */}
                <div className="space-y-4 mb-6 relative">
                  {/* Connector line */}
                  <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-200 -z-0" />

                  {track === "individual" ? (
                    <>
                      {/* Step 1: Application Submitted */}
                      <div className="flex items-start gap-3.5 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 ring-4 ring-white shadow-xs">
                          <Check className="w-4 h-4 font-bold" />
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">1. Application Submitted</span>
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              Completed
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Your personal details and verification file have been safely logged into our partner queue.
                          </p>
                        </div>
                      </div>

                      {/* Step 2: Under Review */}
                      <div className="flex items-start gap-3.5 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-[#6560F0] text-white flex items-center justify-center shrink-0 ring-4 ring-violet-100 shadow-md shadow-violet-500/20 animate-pulse">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">2. Profile & CV Screening</span>
                            <span className="text-[10px] font-semibold text-violet-700 bg-violet-100 px-2 py-0.5 rounded-full border border-violet-200">
                              In Progress (12–24 hrs)
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Our onboarding team is reviewing your profile and credentials.
                          </p>
                        </div>
                      </div>

                      {/* Step 3: Evaluation Interview */}
                      <div className="flex items-start gap-3.5 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 ring-4 ring-white border border-amber-300">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800">3. Evaluation Interview</span>
                            <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                              Upcoming Step
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            A quick 10-minute online or phone call with our partner manager to walk through partner guidelines.
                          </p>
                        </div>
                      </div>

                      {/* Step 4: Portal & Link Activation */}
                      <div className="flex items-start gap-3.5 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 ring-4 ring-white border border-slate-200">
                          <Lock className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400">4. Portal & Link Activation</span>
                            <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                              Locked Until Clearance
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Live dashboard credentials and your active referral link will be unlocked upon interview clearance.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Step 1: Corporate Details */}
                      <div className="flex items-start gap-3.5 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 ring-4 ring-white shadow-xs">
                          <Check className="w-4 h-4 font-bold" />
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">1. Corporate Verification</span>
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              Completed
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Company registration and compliance documentation verified.
                          </p>
                        </div>
                      </div>

                      {/* Step 2: Instant Active */}
                      <div className="flex items-start gap-3.5 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 ring-4 ring-emerald-100 shadow-xs">
                          <Check className="w-4 h-4 font-bold" />
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">2. Corporate Partner Active</span>
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Full corporate partner privileges enabled with immediate dashboard access.
                          </p>
                        </div>
                      </div>

                      {/* Step 3: Ready */}
                      <div className="flex items-start gap-3.5 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-[#6560F0] text-white flex items-center justify-center shrink-0 ring-4 ring-violet-100 shadow-xs">
                          <ArrowRight className="w-4 h-4 font-bold" />
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">3. Live Dashboard & Link</span>
                            <span className="text-[10px] font-semibold text-[#6560F0] bg-violet-100 px-2 py-0.5 rounded-full">
                              Ready
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Referral link and live analytics are active.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Assistance Card */}
                <div className="p-3.5 rounded-2xl bg-violet-50/60 border border-violet-100 text-xs text-slate-600 flex items-center justify-between gap-3 mb-5">
                  <span>Need help or have questions regarding your application?</span>
                  <a
                    href="mailto:partners@livileads.com"
                    className="font-bold text-violet-700 hover:underline shrink-0"
                  >
                    Contact Us
                  </a>
                </div>

                {/* Modal Actions */}
                <button
                  type="button"
                  onClick={() => setIsTrackModalOpen(false)}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-white font-bold text-xs sm:text-sm transition-all duration-300 ease-out cursor-pointer text-center"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} LiviLeads Partner Program. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-600">Loading Application...</p>
          </div>
        </div>
      }
    >
      <ApplyFormContent />
    </Suspense>
  );
}
