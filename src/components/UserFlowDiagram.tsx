"use client";

import React, { useState } from "react";
import {
  User,
  Building2,
  FileText,
  UploadCloud,
  Briefcase,
  Send,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Mail,
  LayoutDashboard,
  ShieldCheck,
  ArrowDown,
  ArrowRight,
  GitBranch,
  Search,
  Sparkles,
  ChevronRight,
} from "lucide-react";

interface UserFlowDiagramProps {
  onSelectTrack: (track: "individual" | "business") => void;
}

export default function UserFlowDiagram({ onSelectTrack }: UserFlowDiagramProps) {
  const [activeTab, setActiveTab] = useState<"all" | "individual" | "business">("all");
  const [selectedNode, setSelectedNode] = useState<string>("landing");

  const nodeDetails: Record<
    string,
    { title: string; subtitle: string; description: string; actor: string; outputs: string[] }
  > = {
    landing: {
      title: "Partner Program Landing Page",
      subtitle: "Entry Point",
      description:
        "Visitor explores the LiviLeads Partner Program value proposition, reward rates (10 Pts = $0.50), eligible categories, and earning model.",
      actor: "Visitor / Prospective Partner",
      outputs: ["Hero CTA clicked", "Track exploration", "FAQ consultation"],
    },
    apply_click: {
      title: "Click 'Apply Now'",
      subtitle: "Conversion Action",
      description:
        "Visitor clicks 'Become a Partner' or 'Apply Now' from the navigation, hero, or track cards to start their onboarding application.",
      actor: "Prospective Partner",
      outputs: ["Smooth scroll or navigation to Application Form"],
    },
    app_page: {
      title: "Application Page",
      subtitle: "Form Container",
      description:
        "The multi-step interactive partner application wizard loads with progress tracking and real-time input validation.",
      actor: "System & Applicant",
      outputs: ["Initial step state", "Track selection prompt"],
    },
    track_decision: {
      title: "Individual or Company Decision",
      subtitle: "Branching Gateway",
      description:
        "Applicant selects whether they are applying as an independent professional (Freelancer/Agent/Consultant) or a registered corporate entity.",
      actor: "Applicant Decision",
      outputs: ["Path A: Individual Track", "Path B: Business Entity Track"],
    },

    // Individual Nodes
    ind_basic: {
      title: "1. Basic Details",
      subtitle: "Individual Track",
      description:
        "Applicant enters full legal name, personal email address, mobile phone number, country, state/region, and city.",
      actor: "Individual Applicant",
      outputs: ["Verified contact coordinates", "Geographic assignment"],
    },
    ind_cv: {
      title: "2. Upload CV",
      subtitle: "Individual Track",
      description:
        "Applicant uploads their Curriculum Vitae / Resume in PDF or DOCX format for background, domain experience, and sales track-record review.",
      actor: "Individual Applicant",
      outputs: ["Resume document uploaded (.pdf/.docx up to 10MB)", "Parsed credentials"],
    },
    ind_prof: {
      title: "3. Professional Details",
      subtitle: "Individual Track",
      description:
        "Applicant specifies current profession, partner category (Freelancer, Agent, Consultant), sales experience, estimated network size, and motivation.",
      actor: "Individual Applicant",
      outputs: ["Professional profile", "Network size estimation", "Terms & compliance acceptance"],
    },
    ind_submit: {
      title: "4. Submit Application",
      subtitle: "Individual Track",
      description:
        "Applicant reviews all submitted details, verifies consent agreements, and submits their application into the central admin queue.",
      actor: "Individual Applicant",
      outputs: ["Unique Application Reference Number (LL-APP-2026-XXXXX)", "Timestamped audit record"],
    },

    // Business Nodes
    biz_details: {
      title: "1. Business Details",
      subtitle: "Company Track",
      description:
        "Corporate applicant enters registered company name, corporate tax/registration ID, business classification, corporate website, team size, and operating years.",
      actor: "Company Representative",
      outputs: ["Corporate profile", "Domain & entity verification data"],
    },
    biz_owner: {
      title: "2. Owner Details",
      subtitle: "Company Track",
      description:
        "Applicant submits authorized owner, director, or primary account signatory details including full name, executive designation, official email, and direct phone.",
      actor: "Company Representative",
      outputs: ["Authorized signatory verification", "Executive contact point"],
    },
    biz_proof: {
      title: "3. Upload Proof of Genuineness",
      subtitle: "Company Track",
      description:
        "Upload required verifiable corporate documentation: Certificate of Incorporation, Trade License, or Official Business Tax Registration certificate.",
      actor: "Company Representative",
      outputs: ["Official proof document uploaded (.pdf/.png/.jpg)", "Legal entity documentation"],
    },
    biz_submit: {
      title: "4. Submit Application",
      subtitle: "Company Track",
      description:
        "Corporate representative reviews company profile, confirms partner agreements and policy adherence, and submits application.",
      actor: "Company Representative",
      outputs: ["Unique Corporate Reference Number", "Dispatched to Business Review Queue"],
    },

    // Admin Review Nodes
    admin_panel: {
      title: "Application Reaches Admin Panel",
      subtitle: "Central Processing Queue",
      description:
        "Centralized intake routing the application to appropriate LiviLeads partnership specialists according to partner track.",
      actor: "LiviLeads Partner Operations Team",
      outputs: ["Intake logged in partner CRM", "Automated receipt acknowledgment sent"],
    },
    ind_review: {
      title: "CV & Details Suitable? (Check)",
      subtitle: "Individual Evaluation",
      description:
        "LiviLeads operations team reviews the applicant's CV, work background, and network compatibility. If unsuitable, a constructive rejection notification is sent.",
      actor: "Partnership Manager",
      outputs: ["Yes: Advance to Interview", "No: Constructive Rejection Notice"],
    },
    ind_interview: {
      title: "Schedule & Conduct Interview",
      subtitle: "Individual Evaluation",
      description:
        "Partnership team schedules a 20-minute video or phone interview with the applicant to discuss referral expectations, conduct guidelines, and platform capabilities.",
      actor: "Partnership Specialist & Applicant",
      outputs: ["Interview completed", "Evaluation scorecard recorded"],
    },
    ind_interview_cleared: {
      title: "Interview Cleared?",
      subtitle: "Decision Gateway",
      description:
        "Final assessment of applicant's professionalism, alignment with partner ethics, and understanding of LiviLeads solutions.",
      actor: "Partnership Lead",
      outputs: ["Yes: Approved for Onboarding", "No: Respectful Decline"],
    },
    biz_doc_verify: {
      title: "Documents Genuine? (Verification)",
      subtitle: "Company Evaluation",
      description:
        "Compliance officers verify the uploaded Certificate of Incorporation/Trade License against official government registers and business databases.",
      actor: "Corporate Compliance Officer",
      outputs: ["Yes: Business Entity Approved", "No: Document Discrepancy / Rejection"],
    },
    rejection: {
      title: "Application Rejected",
      subtitle: "Terminal State",
      description:
        "Application does not meet current qualification criteria. Applicant receives an informative email outlining potential future re-application timelines.",
      actor: "Automated System Notification",
      outputs: ["Notification email delivered", "Ticket archived"],
    },

    // Approval & Portal Nodes
    approved: {
      title: "Partner Approved",
      subtitle: "Milestone Reached",
      description:
        "Applicant status is promoted to Active Partner. Partner account ID (e.g. LL-PRT-8821) is provisioned in the core system.",
      actor: "Partner Operations System",
      outputs: ["Partner record activated", "Commission agreement bound to account"],
    },
    email_sent: {
      title: "Automated Confirmation Email Sent",
      subtitle: "Onboarding Trigger",
      description:
        "System automatically dispatches welcome packet, login credentials, unique partner attribution links, and quick-start marketing materials.",
      actor: "Automated Mail Service",
      outputs: ["Welcome email delivered with temp password", "Personalized referral link"],
    },
    portal_access: {
      title: "Grant Login & Access Partner Dashboard",
      subtitle: "Operational Hub",
      description:
        "Partner logs in to the official portal to generate custom tracking links, monitor active business referrals, track Livi Points earnings, and redeem rewards.",
      actor: "Active Partner",
      outputs: ["Dashboard live", "Link generation", "Points accumulation", "Reward redemptions"],
    },
  };

  const selectedInfo = nodeDetails[selectedNode] || nodeDetails["landing"];

  return (
    <section id="user-flow" className="py-24 bg-slate-50/70 relative scroll-mt-20 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#6560F0]">
              Official System User Flow
            </span>
            <span className="w-5 h-[2px] bg-[#6560F0] rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The Complete Partner Journey, From Application to Portal Access.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Architected according to the official LiviLeads FigJam user flow. Explore the exact stages, decision gateways, evaluation reviews, and portal onboarding for both partner categories.
          </p>

          {/* Interactive Filter Tabs */}
          <div className="pt-4 flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Full User Flow (Both Tracks)
            </button>
            <button
              onClick={() => setActiveTab("individual")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "individual"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-blue-700 hover:bg-blue-50 border border-blue-200"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Individual Track (CV + Interview)</span>
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "business"
                  ? "bg-violet-600 text-white shadow-sm"
                  : "bg-white text-violet-700 hover:bg-violet-50 border border-violet-200"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Company Track (Owner + Proof Doc)</span>
            </button>
          </div>
        </div>

        {/* 2-Column: Left Flowchart Canvas / Right Step Inspector Drawer */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Cols: Visual Interactive Flowchart */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-violet-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Interactive Flow Map
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Click any node to inspect requirements
              </span>
            </div>

            {/* FLOWCHART CONTAINER */}
            <div className="space-y-6 flex flex-col items-center max-w-2xl mx-auto">
              {/* STAGE 1: ENTRY POINT */}
              <div
                onClick={() => setSelectedNode("landing")}
                className={`w-64 p-3.5 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                  selectedNode === "landing"
                    ? "border-violet-600 bg-violet-50/70 shadow-md ring-2 ring-violet-500/20"
                    : "border-slate-300 bg-slate-50 hover:border-slate-400"
                }`}
              >
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-0.5">
                  Start Entry
                </span>
                <span className="text-xs font-bold text-slate-900 block">
                  Partner Program Landing Page
                </span>
              </div>

              <ArrowDown className="w-4 h-4 text-slate-400 -my-2" />

              <div
                onClick={() => setSelectedNode("apply_click")}
                className={`w-56 p-3 rounded-xl border transition-all cursor-pointer text-center ${
                  selectedNode === "apply_click"
                    ? "border-violet-600 bg-violet-50/60 shadow-xs"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <span className="text-xs font-bold text-slate-800">
                  Click &ldquo;Apply Now&rdquo;
                </span>
              </div>

              <ArrowDown className="w-4 h-4 text-slate-400 -my-2" />

              <div
                onClick={() => setSelectedNode("app_page")}
                className={`w-56 p-3 rounded-xl border transition-all cursor-pointer text-center ${
                  selectedNode === "app_page"
                    ? "border-violet-600 bg-violet-50/60 shadow-xs"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <span className="text-xs font-bold text-slate-800">
                  Application Page
                </span>
              </div>

              <ArrowDown className="w-4 h-4 text-slate-400 -my-2" />

              {/* DECISION GATEWAY: INDIVIDUAL OR COMPANY? */}
              <div
                onClick={() => setSelectedNode("track_decision")}
                className={`w-60 p-4 rounded-2xl border-2 transition-all cursor-pointer text-center relative ${
                  selectedNode === "track_decision"
                    ? "border-amber-500 bg-amber-50/80 shadow-md ring-2 ring-amber-500/20"
                    : "border-amber-300 bg-amber-50/40 hover:border-amber-400"
                }`}
              >
                <span className="text-[10px] font-bold uppercase text-amber-700 tracking-wider block">
                  Decision Gateway
                </span>
                <span className="text-xs font-extrabold text-slate-900 block mt-0.5">
                  Individual or Company?
                </span>
              </div>

              {/* BRANCHING PATHWAYS */}
              <div className="w-full grid sm:grid-cols-2 gap-6 pt-2">
                {/* LEFT PATH: INDIVIDUAL TRACK (BLUE) */}
                <div
                  className={`rounded-2xl p-4 border-2 transition-all space-y-3 ${
                    activeTab === "business"
                      ? "opacity-35 pointer-events-none"
                      : "border-blue-200 bg-blue-50/30"
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-blue-200/60">
                    <div className="flex items-center gap-1.5 text-blue-700">
                      <User className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Individual Track
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                      CV + Interview
                    </span>
                  </div>

                  <div
                    onClick={() => setSelectedNode("ind_basic")}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                      selectedNode === "ind_basic"
                        ? "border-blue-600 bg-white shadow-xs font-bold text-blue-900"
                        : "border-blue-100 bg-white/80 hover:bg-white text-slate-700"
                    }`}
                  >
                    1. Basic Details
                  </div>

                  <div
                    onClick={() => setSelectedNode("ind_cv")}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                      selectedNode === "ind_cv"
                        ? "border-blue-600 bg-white shadow-xs font-bold text-blue-900"
                        : "border-blue-100 bg-white/80 hover:bg-white text-slate-700"
                    }`}
                  >
                    <span>2. Upload CV</span>
                    <UploadCloud className="w-3.5 h-3.5 text-blue-500" />
                  </div>

                  <div
                    onClick={() => setSelectedNode("ind_prof")}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                      selectedNode === "ind_prof"
                        ? "border-blue-600 bg-white shadow-xs font-bold text-blue-900"
                        : "border-blue-100 bg-white/80 hover:bg-white text-slate-700"
                    }`}
                  >
                    3. Professional Details
                  </div>

                  <div
                    onClick={() => setSelectedNode("ind_submit")}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                      selectedNode === "ind_submit"
                        ? "border-blue-600 bg-blue-600 text-white font-bold"
                        : "border-blue-300 bg-blue-100/70 hover:bg-blue-200/70 text-blue-900 font-semibold"
                    }`}
                  >
                    <span>4. Submit Application</span>
                    <Send className="w-3 h-3" />
                  </div>
                </div>

                {/* RIGHT PATH: COMPANY TRACK (PURPLE) */}
                <div
                  className={`rounded-2xl p-4 border-2 transition-all space-y-3 ${
                    activeTab === "individual"
                      ? "opacity-35 pointer-events-none"
                      : "border-violet-200 bg-violet-50/30"
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-violet-200/60">
                    <div className="flex items-center gap-1.5 text-violet-700">
                      <Building2 className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Company Track
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-violet-600 bg-violet-100 px-2 py-0.5 rounded-full">
                      Proof Document
                    </span>
                  </div>

                  <div
                    onClick={() => setSelectedNode("biz_details")}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                      selectedNode === "biz_details"
                        ? "border-violet-600 bg-white shadow-xs font-bold text-violet-900"
                        : "border-violet-100 bg-white/80 hover:bg-white text-slate-700"
                    }`}
                  >
                    1. Business Details
                  </div>

                  <div
                    onClick={() => setSelectedNode("biz_owner")}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                      selectedNode === "biz_owner"
                        ? "border-violet-600 bg-white shadow-xs font-bold text-violet-900"
                        : "border-violet-100 bg-white/80 hover:bg-white text-slate-700"
                    }`}
                  >
                    2. Owner Details
                  </div>

                  <div
                    onClick={() => setSelectedNode("biz_proof")}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                      selectedNode === "biz_proof"
                        ? "border-violet-600 bg-white shadow-xs font-bold text-violet-900"
                        : "border-violet-100 bg-white/80 hover:bg-white text-slate-700"
                    }`}
                  >
                    <span>3. Upload Proof of Genuineness</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-violet-500" />
                  </div>

                  <div
                    onClick={() => setSelectedNode("biz_submit")}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                      selectedNode === "biz_submit"
                        ? "border-violet-600 bg-violet-600 text-white font-bold"
                        : "border-violet-300 bg-violet-100/70 hover:bg-violet-200/70 text-violet-900 font-semibold"
                    }`}
                  >
                    <span>4. Submit Application</span>
                    <Send className="w-3 h-3" />
                  </div>
                </div>
              </div>

              <ArrowDown className="w-4 h-4 text-slate-400 -my-2" />

              {/* ADMIN PANEL EVALUATION ZONE (ORANGE/AMBER) */}
              <div
                onClick={() => setSelectedNode("admin_panel")}
                className={`w-72 p-3.5 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                  selectedNode === "admin_panel"
                    ? "border-amber-600 bg-amber-50 shadow-md ring-2 ring-amber-500/20"
                    : "border-amber-200 bg-amber-50/50 hover:border-amber-300"
                }`}
              >
                <span className="text-[10px] font-extrabold uppercase text-amber-800 tracking-wider block">
                  Intake & Assessment
                </span>
                <span className="text-xs font-bold text-slate-900 block mt-0.5">
                  Application Reaches Admin Panel
                </span>
              </div>

              {/* EVALUATION COLUMNS: INDIVIDUAL INTERVIEW VS COMPANY DOC VERIFICATION */}
              <div className="w-full grid sm:grid-cols-2 gap-6 pt-1">
                {/* Individual Evaluation Steps */}
                <div
                  className={`rounded-2xl p-4 border border-amber-200 bg-amber-50/20 space-y-2.5 ${
                    activeTab === "business" ? "opacity-35 pointer-events-none" : ""
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-amber-800 block">
                    Individual Evaluation
                  </span>

                  <div
                    onClick={() => setSelectedNode("ind_review")}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                      selectedNode === "ind_review"
                        ? "border-amber-500 bg-white font-bold"
                        : "border-amber-100 bg-white/90 text-slate-700"
                    }`}
                  >
                    Decision: CV & Details Suitable?
                  </div>

                  <div
                    onClick={() => setSelectedNode("ind_interview")}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                      selectedNode === "ind_interview"
                        ? "border-amber-500 bg-white font-bold"
                        : "border-amber-100 bg-white/90 text-slate-700"
                    }`}
                  >
                    <span>Schedule & Conduct Interview</span>
                    <CalendarCheck className="w-3.5 h-3.5 text-amber-600" />
                  </div>

                  <div
                    onClick={() => setSelectedNode("ind_interview_cleared")}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                      selectedNode === "ind_interview_cleared"
                        ? "border-amber-500 bg-white font-bold"
                        : "border-amber-100 bg-white/90 text-slate-700"
                    }`}
                  >
                    Decision: Interview Cleared?
                  </div>
                </div>

                {/* Company Evaluation Steps */}
                <div
                  className={`rounded-2xl p-4 border border-amber-200 bg-amber-50/20 space-y-2.5 ${
                    activeTab === "individual" ? "opacity-35 pointer-events-none" : ""
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-amber-800 block">
                    Company Evaluation
                  </span>

                  <div
                    onClick={() => setSelectedNode("biz_doc_verify")}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                      selectedNode === "biz_doc_verify"
                        ? "border-amber-500 bg-white font-bold"
                        : "border-amber-100 bg-white/90 text-slate-700"
                    }`}
                  >
                    <span>Documents Genuine? (Verify Registry)</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  </div>

                  <div className="p-2.5 rounded-xl border border-dashed border-slate-200 bg-slate-50 text-slate-500 text-[11px]">
                    Fast-track direct approval upon corporate document authentication
                  </div>
                </div>
              </div>

              <ArrowDown className="w-4 h-4 text-slate-400 -my-2" />

              {/* FINAL OUTCOME & ONBOARDING (GREEN) */}
              <div className="w-full bg-emerald-50/60 rounded-2xl p-5 border-2 border-emerald-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Successful Activation Phase
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Active Onboarding
                  </span>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setSelectedNode("approved")}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                      selectedNode === "approved"
                        ? "border-emerald-600 bg-white font-bold text-emerald-950 shadow-xs"
                        : "border-emerald-100 bg-white/80 hover:bg-white text-slate-700"
                    }`}
                  >
                    <span className="text-[10px] font-bold text-emerald-600 block">Milestone</span>
                    Partner Approved
                  </div>

                  <div
                    onClick={() => setSelectedNode("email_sent")}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                      selectedNode === "email_sent"
                        ? "border-emerald-600 bg-white font-bold text-emerald-950 shadow-xs"
                        : "border-emerald-100 bg-white/80 hover:bg-white text-slate-700"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 block">Automated</span>
                      Email Sent
                    </div>
                    <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  </div>

                  <div
                    onClick={() => setSelectedNode("portal_access")}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                      selectedNode === "portal_access"
                        ? "border-emerald-600 bg-white font-bold text-emerald-950 shadow-xs"
                        : "border-emerald-100 bg-white/80 hover:bg-white text-slate-700"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 block">Live Access</span>
                      Partner Dashboard
                    </div>
                    <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 4 Cols: Step Inspector Drawer */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md space-y-6 lg:sticky lg:top-28">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[11px] font-semibold text-[#6560F0] bg-[#6560F0]/10 px-2.5 py-1 rounded-lg border border-[#6560F0]/20">
                Step Inspector
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {selectedInfo.actor}
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {selectedInfo.subtitle}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                {selectedInfo.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                {selectedInfo.description}
              </p>
            </div>

            {/* Expected Outputs / Deliverables */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 space-y-2">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Outputs & Criteria:
              </span>
              <ul className="space-y-1.5">
                {selectedInfo.outputs.map((out, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="text-violet-600 font-bold">•</span>
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Action: Jump to Apply Form with Track pre-selected */}
            <div className="pt-2 border-t border-slate-100 space-y-2.5">
              <button
                onClick={() => {
                  const targetTrack = selectedNode.startsWith("biz_") ? "business" : "individual";
                  onSelectTrack(targetTrack);
                  const el = document.getElementById("apply");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#6560F0] hover:bg-[#524ad9] text-white font-bold text-xs shadow-md shadow-[#6560F0]/20 flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <span>Apply Using This User Flow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                Pre-configures the application wizard for your selected track.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
