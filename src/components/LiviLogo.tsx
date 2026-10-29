"use client";

import React from "react";
import Image from "next/image";

interface LiviLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showBadge?: boolean;
  badgeText?: string;
  variant?: "light" | "dark";
}

export default function LiviLogo({
  className = "",
  size = "md",
  showBadge = false,
  badgeText = "Partner Program",
  variant = "light",
}: LiviLogoProps) {
  const dimensions = {
    sm: { width: 73, height: 28, imgClass: "h-7 w-auto" },
    md: { width: 88, height: 34, imgClass: "h-[34px] w-auto" },
    lg: { width: 104, height: 40, imgClass: "h-10 w-auto" },
  };

  const { width, height, imgClass } = dimensions[size];

  if (variant === "dark") {
    return (
      <div className={`inline-flex items-center gap-2 sm:gap-3 ${className}`}>
        <div className="bg-white px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl shadow-xs border border-white/20 inline-flex items-center">
          <Image
            src="/images/livileads_logo.png"
            alt="LiviLeads"
            width={width}
            height={height}
            className={`${imgClass} object-contain`}
            priority
          />
        </div>
        {showBadge && (
          <span className="hidden min-[380px]:inline-flex text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 shadow-2xs">
            {badgeText}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-2.5 ${className}`}>
      <div className="relative inline-flex items-center">
        <Image
          src="/images/livileads_logo.png"
          alt="LiviLeads"
          width={width}
          height={height}
          className={`${imgClass} object-contain`}
          priority
        />
      </div>

      {showBadge && (
        <span className="hidden min-[380px]:inline-flex text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-slate-50 text-[#6560F0] border border-slate-200/90 shadow-2xs">
          {badgeText}
        </span>
      )}
    </div>
  );
}
