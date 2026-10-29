"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PartnerBenefits from "@/components/PartnerBenefits";
import WhoCanJoin from "@/components/WhoCanJoin";
import EarningsAndPoints from "@/components/EarningsAndPoints";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

import { useRouter } from "next/navigation";

// Interactive Modals
import ReferEarnModal from "@/components/modals/ReferEarnModal";
import TermsModal from "@/components/modals/TermsModal";

export default function Home() {
  const router = useRouter();
  const [isReferEarnOpen, setIsReferEarnOpen] = useState(false);
  const [termsModalState, setTermsModalState] = useState<{
    isOpen: boolean;
    tab: "terms" | "rewards" | "privacy";
  }>({
    isOpen: false,
    tab: "terms",
  });

  const handleOpenApply = (type?: "individual" | "business") => {
    if (type) {
      router.push(`/apply?track=${type}`);
    } else {
      router.push("/apply");
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 01. Header & Navigation */}
      <Navbar
        onOpenLogin={() => router.push("/login")}
        onOpenApply={() => handleOpenApply()}
      />

      {/* Main Content Area - Strictly the 5 requested sections */}
      <main className="flex-1">
        {/* 02. Hero Banner */}
        <Hero
          onOpenApply={() => handleOpenApply()}
          onExploreHowItWorks={() => scrollToSection("how-it-works")}
        />

        {/* 03. How It Works */}
        <HowItWorks
          onStartJourney={() => handleOpenApply()}
        />

        {/* 04. Benefits */}
        <PartnerBenefits />

        {/* 05. Who Can Join? */}
        <WhoCanJoin
          onSelectPartnerType={(type) => handleOpenApply(type)}
        />

        {/* 06. Earnings */}
        <EarningsAndPoints onOpenApply={() => handleOpenApply()} />

        {/* 07. FAQs */}
        <FaqSection />

        {/* 08. Final Call to Action */}
        <FinalCta
          onOpenApply={() => handleOpenApply()}
          onExploreBenefits={() => scrollToSection("benefits")}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenLogin={() => router.push("/login")}
        onOpenApply={() => handleOpenApply()}
        onOpenTerms={() => setTermsModalState({ isOpen: true, tab: "terms" })}
        onOpenRewardsPolicy={() =>
          setTermsModalState({ isOpen: true, tab: "rewards" })
        }
        onOpenReferEarn={() => setIsReferEarnOpen(true)}
      />

      {/* ================= MODALS ================= */}
      <ReferEarnModal
        isOpen={isReferEarnOpen}
        onClose={() => setIsReferEarnOpen(false)}
        onApplyPartner={() => handleOpenApply("business")}
      />

      <TermsModal
        isOpen={termsModalState.isOpen}
        tab={termsModalState.tab}
        onClose={() =>
          setTermsModalState((prev) => ({ ...prev, isOpen: false }))
        }
      />
    </div>
  );
}
