"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  User,
  Building2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  FileText,
  Clock,
  ExternalLink,
  Edit2,
  RotateCcw,
  UploadCloud,
  FileCheck,
  X,
  CalendarCheck,
  Mail,
  LayoutDashboard,
  Check,
} from "lucide-react";

interface ApplicationFormProps {
  selectedTypeProp?: "individual" | "business";
  onOpenTerms: () => void;
  onOpenRewardsPolicy: () => void;
  onOpenDashboard?: () => void;
}

export default function ApplicationForm({
  selectedTypeProp = "individual",
  onOpenTerms,
  onOpenRewardsPolicy,
  onOpenDashboard,
}: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [partnerType, setPartnerType] = useState<"individual" | "business">(selectedTypeProp);

  // Sync if prop changes externally (e.g. from WhoCanJoin card clicks)
  useEffect(() => {
    if (selectedTypeProp) {
      setPartnerType(selectedTypeProp);
    }
  }, [selectedTypeProp]);

  // Form Fields State (Faithfully following FigJam user flow)
  const [formData, setFormData] = useState({
    // INDIVIDUAL: 1. Basic Details
    fullName: "",
    email: "",
    mobile: "",
    country: "United States",
    stateRegion: "",
    city: "",

    // INDIVIDUAL: 2. Upload CV
    cvFileName: "",
    cvFileSize: "",

    // INDIVIDUAL: 3. Professional Details
    profession: "",
    partnerCategory: "Freelancer",
    salesExperience: "3-5 years",
    individualReach: "",
    individualWhy: "",

    // COMPANY: 1. Business Details
    companyName: "",
    businessRegId: "",
    businessType: "Marketing Agency",
    website: "",
    yearsInOperation: "3-5 years",
    teamSize: "10-25 employees",
    businessCountry: "United States",
    businessStateRegion: "",
    businessCity: "",

    // COMPANY: 2. Owner Details
    ownerName: "",
    ownerDesignation: "Managing Director / Owner",
    ownerEmail: "",
    ownerPhone: "",

    // COMPANY: 3. Upload Proof of Genuineness
    proofDocName: "",
    proofDocSize: "",
    partnershipGoals: "",

    // Consents
    agreeTerms: false,
    agreePolicies: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");

  // Simulated FigJam Evaluation Progress State for Step 6
  const [simulatedInterviewStage, setSimulatedInterviewStage] = useState<
    "scheduled" | "conducted" | "cleared"
  >("scheduled");
  const [simulatedDocVerified, setSimulatedDocVerified] = useState<boolean>(true);

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Quick Attach Mock Handlers for demo convenience
  const handleAttachMockCv = () => {
    updateField("cvFileName", "Alex_Morgan_Resume_2026.pdf");
    updateField("cvFileSize", "1.4 MB");
  };

  const handleAttachMockProof = () => {
    updateField("proofDocName", "Certificate_of_Incorporation_Apex.pdf");
    updateField("proofDocSize", "2.1 MB");
  };

  // STEP VALIDATIONS
  const validateStep1 = () => true;

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (partnerType === "individual") {
      // Individual: Basic Details
      if (!formData.fullName.trim()) errs.fullName = "Full legal name is required.";
      if (!formData.email.trim() || !formData.email.includes("@"))
        errs.email = "A valid email address is required.";
      if (!formData.mobile.trim()) errs.mobile = "Mobile number is required.";
      if (!formData.country.trim()) errs.country = "Country is required.";
      if (!formData.stateRegion.trim()) errs.stateRegion = "State or Region is required.";
      if (!formData.city.trim()) errs.city = "City is required.";
    } else {
      // Company: Business Details
      if (!formData.companyName.trim()) errs.companyName = "Registered company name is required.";
      if (!formData.businessRegId.trim())
        errs.businessRegId = "Company registration or tax number is required.";
      if (!formData.businessCountry.trim()) errs.businessCountry = "Country is required.";
      if (!formData.businessCity.trim()) errs.businessCity = "Operating city is required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (partnerType === "individual") {
      // Individual: Upload CV
      if (!formData.cvFileName) {
        errs.cvFile = "Please upload your CV / Resume document (PDF or DOCX).";
      }
    } else {
      // Company: Owner Details
      if (!formData.ownerName.trim()) errs.ownerName = "Owner / authorized signatory name is required.";
      if (!formData.ownerEmail.trim() || !formData.ownerEmail.includes("@"))
        errs.ownerEmail = "A valid official email is required.";
      if (!formData.ownerPhone.trim()) errs.ownerPhone = "Direct phone number is required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep4 = () => {
    const errs: Record<string, string> = {};
    if (partnerType === "individual") {
      // Individual: Professional Details
      if (!formData.profession.trim()) errs.profession = "Current profession is required.";
      if (!formData.partnerCategory) errs.partnerCategory = "Please select a partner category.";
    } else {
      // Company: Upload Proof of Genuineness
      if (!formData.proofDocName) {
        errs.proofDoc = "Please upload corporate proof (Certificate of Incorporation or Trade License).";
      }
    }

    if (!formData.agreeTerms) {
      errs.agreeTerms = "You must accept the LiviLeads Partner Program Terms.";
    }
    if (!formData.agreePolicies) {
      errs.agreePolicies = "You must acknowledge the commissions and Livi Points redemption policy.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    } else if (currentStep === 3) {
      if (validateStep3()) setCurrentStep(4);
    } else if (currentStep === 4) {
      if (validateStep4()) setCurrentStep(5);
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && currentStep < 6) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2() || !validateStep3() || !validateStep4()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const ref = `LL-APP-2026-${randomNum}`;
      setReferenceNumber(ref);
      setSubmissionDate(
        new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
      setCurrentStep(6);

      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ["#6560F0", "#524ad9", "#06b6d4", "#10b981"],
        });
      } catch (err) {
        // Fallback gracefully
      }
    }, 1200);
  };

  const handleResetForm = () => {
    setCurrentStep(1);
    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      country: "United States",
      stateRegion: "",
      city: "",
      cvFileName: "",
      cvFileSize: "",
      profession: "",
      partnerCategory: "Freelancer",
      salesExperience: "3-5 years",
      individualReach: "",
      individualWhy: "",
      companyName: "",
      businessRegId: "",
      businessType: "Marketing Agency",
      website: "",
      yearsInOperation: "3-5 years",
      teamSize: "10-25 employees",
      businessCountry: "United States",
      businessStateRegion: "",
      businessCity: "",
      ownerName: "",
      ownerDesignation: "Managing Director / Owner",
      ownerEmail: "",
      ownerPhone: "",
      proofDocName: "",
      proofDocSize: "",
      partnershipGoals: "",
      agreeTerms: false,
      agreePolicies: false,
    });
    setErrors({});
    setSimulatedInterviewStage("scheduled");
  };

  return (
    <section id="apply" className="py-24 bg-white relative scroll-mt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#6560F0]">
              Official Partner Application
            </span>
            <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-3">
            Apply to the LiviLeads Partner Program
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Configured according to the official FigJam user flow. Choose your track, upload required credentials, and begin your journey toward verified rewards.
          </p>
        </div>

        {/* Multi-Step Wizard Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Progress Header */}
          <div className="bg-slate-50/90 border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2.5">
              <span>
                Step {currentStep} of 6:{" "}
                {currentStep === 1 && "Track Decision"}
                {currentStep === 2 && (partnerType === "individual" ? "1. Basic Details" : "1. Business Details")}
                {currentStep === 3 && (partnerType === "individual" ? "2. Upload CV" : "2. Owner Details")}
                {currentStep === 4 && (partnerType === "individual" ? "3. Professional Details" : "3. Proof of Genuineness")}
                {currentStep === 5 && "4. Review & Submit"}
                {currentStep === 6 && "5. Lifecycle & Onboarding"}
              </span>
              <span className="text-violet-700 font-extrabold">
                {Math.round((currentStep / 6) * 100)}% Completed
              </span>
            </div>

            {/* Stepper Progress Bar */}
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6560F0] transition-all duration-300"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-10">
            {/* ================= STEP 1: TRACK SELECTION ================= */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="text-center max-w-lg mx-auto mb-6">
                  <h3 className="text-xl font-bold text-slate-900">
                    Individual or Company?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Select your partner track as defined in the FigJam architecture.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Individual Option */}
                  <div
                    onClick={() => setPartnerType("individual")}
                    className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      partnerType === "individual"
                        ? "border-blue-600 bg-blue-50/40 shadow-md ring-2 ring-blue-500/10"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                          <User className="w-6 h-6" />
                        </div>
                        <input
                          type="radio"
                          name="partnerType"
                          checked={partnerType === "individual"}
                          onChange={() => setPartnerType("individual")}
                          className="w-4 h-4 text-blue-600 accent-blue-600"
                        />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-1">
                        Individual Track
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        For freelancers, consultants, and independent agents. Requires Basic Details, <strong>CV Upload</strong>, Professional Background, and evaluation interview.
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-blue-700 mt-4 block">
                      Path A: Basic Details → Upload CV → Interview
                    </span>
                  </div>

                  {/* Business Option */}
                  <div
                    onClick={() => setPartnerType("business")}
                    className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      partnerType === "business"
                        ? "border-violet-600 bg-violet-50/40 shadow-md ring-2 ring-violet-500/10"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
                          <Building2 className="w-6 h-6" />
                        </div>
                        <input
                          type="radio"
                          name="partnerType"
                          checked={partnerType === "business"}
                          onChange={() => setPartnerType("business")}
                          className="w-4 h-4 text-violet-600 accent-violet-600"
                        />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-1">
                        Company / Business Track
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        For registered agencies, marketing teams, and corporate entities. Requires Business Details, <strong>Owner Details</strong>, and <strong>Proof of Genuineness</strong> upload.
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-violet-700 mt-4 block">
                      Path B: Business Details → Owner Details → Proof Doc
                    </span>
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3.5 rounded-full bg-[#6560F0] hover:bg-[#524ad9] text-white font-bold text-xs shadow-md shadow-[#6560F0]/20 flex items-center gap-2 cursor-pointer transition"
                  >
                    <span>Proceed to Step 2</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 2: BASIC DETAILS (INDIVIDUAL) OR BUSINESS DETAILS (COMPANY) ================= */}
            {currentStep === 2 && partnerType === "individual" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    FigJam Step 1 — Basic Details
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Applicant Personal & Contact Coordinates
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={formData.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 ${
                        errors.fullName
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-rose-500 mt-1 block">{errors.fullName}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="alex.morgan@example.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 ${
                        errors.email
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-rose-500 mt-1 block">{errors.email}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.mobile}
                      onChange={(e) => updateField("mobile", e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 ${
                        errors.mobile
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    />
                    {errors.mobile && (
                      <span className="text-[11px] text-rose-500 mt-1 block">{errors.mobile}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      placeholder="United States"
                      value={formData.country}
                      onChange={(e) => updateField("country", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      State or Region *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. California"
                      value={formData.stateRegion}
                      onChange={(e) => updateField("stateRegion", e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 ${
                        errors.stateRegion
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. San Francisco"
                      value={formData.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 ${
                        errors.city
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer transition"
                  >
                    <span>Proceed to Upload CV</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 Company: Business Details */}
            {currentStep === 2 && partnerType === "business" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-violet-600 uppercase tracking-wider">
                    FigJam Step 1 — Business Details
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Corporate Entity Information
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Registered Company Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Marketing Group LLC"
                      value={formData.companyName}
                      onChange={(e) => updateField("companyName", e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 ${
                        errors.companyName
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-slate-200 focus:border-violet-500 focus:ring-violet-100"
                      }`}
                    />
                    {errors.companyName && (
                      <span className="text-[11px] text-rose-500 mt-1 block">{errors.companyName}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business Registration / Tax ID *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. EIN-12-3456789 or Reg #884920"
                      value={formData.businessRegId}
                      onChange={(e) => updateField("businessRegId", e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 ${
                        errors.businessRegId
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-slate-200 focus:border-violet-500 focus:ring-violet-100"
                      }`}
                    />
                    {errors.businessRegId && (
                      <span className="text-[11px] text-rose-500 mt-1 block">{errors.businessRegId}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business Classification
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => updateField("businessType", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
                    >
                      <option value="Marketing Agency">Marketing & Advertising Agency</option>
                      <option value="Telecalling Team">Telecalling / BPO Center</option>
                      <option value="Sales Outsourcing">Outsourced Sales Agency</option>
                      <option value="Consultancy">Business Consultancy Firm</option>
                      <option value="IT & Tech Services">IT & Technology Integrator</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Official Website
                    </label>
                    <input
                      type="url"
                      placeholder="https://apexgroup.com"
                      value={formData.website}
                      onChange={(e) => updateField("website", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-violet-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Operating Country
                    </label>
                    <input
                      type="text"
                      placeholder="United States"
                      value={formData.businessCountry}
                      onChange={(e) => updateField("businessCountry", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Headquarters City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Austin"
                      value={formData.businessCity}
                      onChange={(e) => updateField("businessCity", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-7 py-3 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-md shadow-violet-500/20 flex items-center gap-2 cursor-pointer transition"
                  >
                    <span>Proceed to Owner Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 3: UPLOAD CV (INDIVIDUAL) OR OWNER DETAILS (COMPANY) ================= */}
            {currentStep === 3 && partnerType === "individual" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    FigJam Step 2 — Upload CV
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Curriculum Vitae / Resume Submission
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Upload your CV so our partnerships evaluation team can review your sales background, industry experience, and professional network.
                  </p>
                </div>

                {/* CV Dropzone */}
                <div className="border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/20 rounded-3xl p-8 text-center transition group">
                  {formData.cvFileName ? (
                    <div className="max-w-md mx-auto bg-white p-5 rounded-2xl border border-blue-200 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                          <FileCheck className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold text-slate-900 block truncate max-w-[200px]">
                            {formData.cvFileName}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {formData.cvFileSize || "Uploaded • Ready for Review"}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          updateField("cvFileName", "");
                          updateField("cvFileSize", "");
                        }}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-rose-500 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 mx-auto flex items-center justify-center shadow-xs">
                        <UploadCloud className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Drag and drop your CV here, or browse files
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Supported formats: PDF, DOC, DOCX (Maximum file size: 10MB)
                        </p>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handleAttachMockCv}
                          className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200 transition cursor-pointer"
                        >
                          Attach Demo CV (Alex_Morgan_Resume.pdf)
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {errors.cvFile && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errors.cvFile}</span>
                  </div>
                )}

                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer transition"
                  >
                    <span>Proceed to Professional Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 Company: Owner Details */}
            {currentStep === 3 && partnerType === "business" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-violet-600 uppercase tracking-wider">
                    FigJam Step 2 — Owner Details
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Authorized Signatory & Executive Contact
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Provide the primary corporate executive or authorized account holder details for official agreement execution.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Owner / Director Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Marcus Vance"
                      value={formData.ownerName}
                      onChange={(e) => updateField("ownerName", e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 ${
                        errors.ownerName
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-slate-200 focus:border-violet-500 focus:ring-violet-100"
                      }`}
                    />
                    {errors.ownerName && (
                      <span className="text-[11px] text-rose-500 mt-1 block">{errors.ownerName}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Executive Designation *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Managing Partner / CEO"
                      value={formData.ownerDesignation}
                      onChange={(e) => updateField("ownerDesignation", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-violet-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      placeholder="m.vance@apexgroup.com"
                      value={formData.ownerEmail}
                      onChange={(e) => updateField("ownerEmail", e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 ${
                        errors.ownerEmail
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-slate-200 focus:border-violet-500 focus:ring-violet-100"
                      }`}
                    />
                    {errors.ownerEmail && (
                      <span className="text-[11px] text-rose-500 mt-1 block">{errors.ownerEmail}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Direct Mobile / Phone *
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 349-2849"
                      value={formData.ownerPhone}
                      onChange={(e) => updateField("ownerPhone", e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 ${
                        errors.ownerPhone
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-slate-200 focus:border-violet-500 focus:ring-violet-100"
                      }`}
                    />
                    {errors.ownerPhone && (
                      <span className="text-[11px] text-rose-500 mt-1 block">{errors.ownerPhone}</span>
                    )}
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-7 py-3 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-md shadow-violet-500/20 flex items-center gap-2 cursor-pointer transition"
                  >
                    <span>Proceed to Proof of Genuineness</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 4: PROFESSIONAL DETAILS (INDIVIDUAL) OR PROOF OF GENUINENESS (COMPANY) ================= */}
            {currentStep === 4 && partnerType === "individual" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    FigJam Step 3 — Professional Details & Agreements
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Network Profile & Governance Consents
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current Profession *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Independent Sales Representative"
                      value={formData.profession}
                      onChange={(e) => updateField("profession", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Partner Category
                    </label>
                    <select
                      value={formData.partnerCategory}
                      onChange={(e) => updateField("partnerCategory", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                    >
                      <option value="Freelancer">Freelancer / Independent Contractor</option>
                      <option value="Sales Agent">Field Sales Agent</option>
                      <option value="Consultant">Management / Business Consultant</option>
                      <option value="Influencer">Business Network Builder</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Target Network Reach & Why LiviLeads?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe the businesses you interact with and how you plan to introduce LiviLeads..."
                      value={formData.individualReach}
                      onChange={(e) => updateField("individualReach", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* Governance Consents */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3 pt-4">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => updateField("agreeTerms", e.target.checked)}
                      className="w-4 h-4 text-violet-600 rounded mt-0.5"
                    />
                    <span className="text-xs text-slate-600">
                      I accept the{" "}
                      <button
                        type="button"
                        onClick={onOpenTerms}
                        className="text-violet-600 font-bold hover:underline"
                      >
                        LiviLeads Partner Program Terms & Governance
                      </button>
                      .
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <span className="text-[11px] text-rose-500 block">{errors.agreeTerms}</span>
                  )}

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreePolicies}
                      onChange={(e) => updateField("agreePolicies", e.target.checked)}
                      className="w-4 h-4 text-violet-600 rounded mt-0.5"
                    />
                    <span className="text-xs text-slate-600">
                      I understand that partner commissions are credited as Livi Points under the{" "}
                      <button
                        type="button"
                        onClick={onOpenRewardsPolicy}
                        className="text-violet-600 font-bold hover:underline"
                      >
                        Rewards & Redemption Policy
                      </button>
                      .
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer transition"
                  >
                    <span>Proceed to Review</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 Company: Upload Proof of Genuineness */}
            {currentStep === 4 && partnerType === "business" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-violet-600 uppercase tracking-wider">
                    FigJam Step 3 — Upload Proof of Genuineness
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Corporate Verification Document Upload
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Upload official corporate documentation (Certificate of Incorporation, Trade License, or Official Business Tax registration) to fast-track verification.
                  </p>
                </div>

                {/* Proof Document Dropzone */}
                <div className="border-2 border-dashed border-violet-200 hover:border-violet-400 bg-violet-50/20 rounded-3xl p-8 text-center transition group">
                  {formData.proofDocName ? (
                    <div className="max-w-md mx-auto bg-white p-5 rounded-2xl border border-violet-200 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold text-slate-900 block truncate max-w-[200px]">
                            {formData.proofDocName}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {formData.proofDocSize || "Uploaded • Ready for Compliance Check"}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          updateField("proofDocName", "");
                          updateField("proofDocSize", "");
                        }}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-rose-500 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-violet-100 text-violet-700 mx-auto flex items-center justify-center shadow-xs">
                        <ShieldCheck className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Upload Certificate of Incorporation or Trade License
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Supported formats: PDF, PNG, JPG (Maximum file size: 15MB)
                        </p>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handleAttachMockProof}
                          className="px-4 py-2 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 font-bold text-xs border border-violet-200 transition cursor-pointer"
                        >
                          Attach Demo Proof (Certificate_of_Incorporation_Apex.pdf)
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {errors.proofDoc && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errors.proofDoc}</span>
                  </div>
                )}

                {/* Governance Consents */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => updateField("agreeTerms", e.target.checked)}
                      className="w-4 h-4 text-violet-600 rounded mt-0.5"
                    />
                    <span className="text-xs text-slate-600">
                      We represent that this organization agrees to the{" "}
                      <button
                        type="button"
                        onClick={onOpenTerms}
                        className="text-violet-600 font-bold hover:underline"
                      >
                        LiviLeads Partner Program Terms & Governance
                      </button>
                      .
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <span className="text-[11px] text-rose-500 block">{errors.agreeTerms}</span>
                  )}

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreePolicies}
                      onChange={(e) => updateField("agreePolicies", e.target.checked)}
                      className="w-4 h-4 text-violet-600 rounded mt-0.5"
                    />
                    <span className="text-xs text-slate-600">
                      We acknowledge that all partner commissions are credited as Livi Points under the{" "}
                      <button
                        type="button"
                        onClick={onOpenRewardsPolicy}
                        className="text-violet-600 font-bold hover:underline"
                      >
                        Unified Rewards & Redemption Policy
                      </button>
                      .
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-7 py-3 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-md shadow-violet-500/20 flex items-center gap-2 cursor-pointer transition"
                  >
                    <span>Proceed to Review</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 5: REVIEW & SUBMIT APPLICATION ================= */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-violet-600 uppercase tracking-wider">
                    FigJam Step 4 — Submit Application
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Review Your Information Before Final Submission
                  </h3>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Partner Category
                      </span>
                      <h4 className="text-base font-bold text-slate-900 capitalize">
                        {partnerType === "individual" ? "Individual Partner Track" : "Company / Business Track"}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-violet-600 font-bold text-xs hover:underline flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>

                  {partnerType === "individual" ? (
                    <div className="grid sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block font-medium">Applicant Name:</span>
                        <span className="font-bold text-slate-900">{formData.fullName || "Alex Morgan"}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Email Address:</span>
                        <span className="font-bold text-slate-900">{formData.email || "alex.morgan@example.com"}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Attached CV:</span>
                        <span className="font-bold text-blue-700 flex items-center gap-1 mt-0.5">
                          <FileCheck className="w-3.5 h-3.5" />
                          {formData.cvFileName || "Alex_Morgan_Resume_2026.pdf"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Profession & Category:</span>
                        <span className="font-bold text-slate-900">
                          {formData.profession || "Sales Agent"} • {formData.partnerCategory}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block font-medium">Company Name:</span>
                        <span className="font-bold text-slate-900">{formData.companyName || "Apex Marketing Group LLC"}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Registration / Tax ID:</span>
                        <span className="font-bold text-slate-900">{formData.businessRegId || "EIN-12-3456789"}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Owner / Authorized Director:</span>
                        <span className="font-bold text-slate-900">{formData.ownerName || "Marcus Vance"} ({formData.ownerDesignation})</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Proof of Genuineness Document:</span>
                        <span className="font-bold text-violet-700 flex items-center gap-1 mt-0.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          {formData.proofDocName || "Certificate_of_Incorporation_Apex.pdf"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="px-9 py-3.5 rounded-full bg-[#6560F0] hover:bg-[#524ad9] text-white font-bold text-xs shadow-lg shadow-[#6560F0]/25 flex items-center gap-2 cursor-pointer transition disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>Submitting to Admin Queue...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 6: CONFIRMATION & LIVE FIGJAM LIFECYCLE TRACKER ================= */}
            {currentStep === 6 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* Success Header */}
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Application Reached Admin Panel!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                    Thank you, <strong>{formData.fullName || formData.companyName || "Partner"}</strong>. Your application has been logged into our central processing system.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800">
                    <span>Reference #: {referenceNumber}</span>
                  </div>
                </div>

                {/* FigJam Lifecycle Live Stage Tracker */}
                <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Live FigJam Lifecycle Status
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Queue Active
                    </span>
                  </div>

                  {partnerType === "individual" ? (
                    /* Individual Flow: CV Suitability -> Interview -> Approval */
                    <div className="space-y-4">
                      {/* Sub-stage 1: Application Intake */}
                      <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-2xl border border-emerald-200">
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-slate-900">1. Application Intake Logged</h5>
                            <span className="text-[11px] text-emerald-600 font-semibold">Completed</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Basic details and CV document ({formData.cvFileName || "Alex_Morgan_Resume_2026.pdf"}) successfully verified in queue.
                          </p>
                        </div>
                      </div>

                      {/* Sub-stage 2: CV Suitability Check */}
                      <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-2xl border border-blue-200">
                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-slate-900">2. CV & Background Suitability Check</h5>
                            <span className="text-[11px] text-blue-600 font-semibold">Qualified</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Applicant credentials matched with partner network standards.
                          </p>
                        </div>
                      </div>

                      {/* Sub-stage 3: Interview Phase */}
                      <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-2xl border border-amber-200">
                        <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                          {simulatedInterviewStage === "cleared" ? <Check className="w-3.5 h-3.5" /> : "3"}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-slate-900">3. Schedule & Conduct Interview</h5>
                            <span className="text-[11px] font-semibold text-amber-700">
                              {simulatedInterviewStage === "cleared" ? "Interview Cleared" : "Scheduled"}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            20-min onboarding discussion to align on referral practices and earning potential.
                          </p>

                          {simulatedInterviewStage !== "cleared" && (
                            <div className="mt-2.5 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setSimulatedInterviewStage("cleared")}
                                className="px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[11px] font-bold transition cursor-pointer"
                              >
                                Simulate: Pass Interview
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Sub-stage 4: Partner Approved & Automated Email */}
                      <div
                        className={`flex items-start gap-3.5 p-3.5 rounded-2xl border transition ${
                          simulatedInterviewStage === "cleared"
                            ? "bg-emerald-50/70 border-emerald-300"
                            : "bg-slate-100/50 border-slate-200 opacity-60"
                        }`}
                      >
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                          4
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-900">
                            4. Partner Approved & Automated Email Sent
                          </h5>
                          <p className="text-[11px] text-slate-600 mt-0.5">
                            Official credentials and unique partner ID provisioned. Welcome email delivered.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Company Flow: Document Verification -> Commercial Agreement -> Approval */
                    <div className="space-y-4">
                      {/* Sub-stage 1: Application Intake */}
                      <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-2xl border border-emerald-200">
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-slate-900">1. Corporate Application Logged</h5>
                            <span className="text-[11px] text-emerald-600 font-semibold">Completed</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Corporate profile and owner coordinates ({formData.ownerName || "Marcus Vance"}) logged into verification queue.
                          </p>
                        </div>
                      </div>

                      {/* Sub-stage 2: Document Genuineness Verification */}
                      <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-2xl border border-violet-200">
                        <div className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-slate-900">2. Documents Genuine? (Registry Check)</h5>
                            <span className="text-[11px] text-violet-700 font-semibold">Authentic & Verified</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Proof document ({formData.proofDocName || "Certificate_of_Incorporation_Apex.pdf"}) cross-checked with official registries.
                          </p>
                        </div>
                      </div>

                      {/* Sub-stage 3: Commercial Agreement & Approval */}
                      <div className="flex items-start gap-3.5 p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-300">
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-slate-900">3. Corporate Partner Approved</h5>
                            <span className="text-[11px] text-emerald-700 font-semibold">Ready for Activation</span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5">
                            Automated confirmation email with team coordinator credentials delivered to {formData.ownerEmail || "executive@apexgroup.com"}.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Final Direct Portal Access CTA */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById("dashboard");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#6560F0] hover:bg-[#524ad9] text-white font-bold text-xs shadow-md shadow-[#6560F0]/25 flex items-center justify-center gap-2 cursor-pointer transition"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Enter Partner Portal Dashboard</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                      <span>Submit Another Application</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
