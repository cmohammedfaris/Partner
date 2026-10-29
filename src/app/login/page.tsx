"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import LiviLogo from "@/components/LiviLogo";
import confetti from "canvas-confetti";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  RefreshCw,
  AlertCircle,
  Check,
  ShieldAlert,
} from "lucide-react";

type ViewMode = "login" | "forgot" | "verify_otp" | "create_password" | "authenticated";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [viewMode, setViewMode] = useState<ViewMode>("login");

  // Login Form States
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [passwordSuccessNotice, setPasswordSuccessNotice] = useState("");

  // Forgot Password & Reset States
  const [forgotIdentifier, setForgotIdentifier] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [forgotError, setForgotError] = useState("");

  // OTP Verification States
  const [otpCode, setOtpCode] = useState("");
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Create New Password States
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState("");

  // Check URL query parameters (e.g. ?mode=forgot, ?email=..., ?pass=...)
  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "forgot") {
      setViewMode("forgot");
    }

    const emailParam = searchParams.get("email");
    const passParam = searchParams.get("pass");
    if (emailParam) {
      setIdentifier(emailParam);
    }
    if (passParam) {
      setPassword(passParam);
    }
  }, [searchParams]);

  // Resend countdown timer effect for OTP screen
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (viewMode === "verify_otp" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [viewMode, resendTimer]);

  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setPasswordSuccessNotice("");

    if (!identifier.trim()) {
      setLoginError("Please enter your registered Partner ID or Email.");
      return;
    }
    if (!password) {
      setLoginError("Please enter your password.");
      return;
    }

    setIsLoading(true);

    // Verify against registered accounts or allow valid partner
    setTimeout(() => {
      setIsLoading(false);

      try {
        const storedAccountsStr = localStorage.getItem("livileads_partner_accounts");
        const storedAccounts = storedAccountsStr ? JSON.parse(storedAccountsStr) : [];
        const matched = storedAccounts.find(
          (a: any) =>
            a.email?.toLowerCase() === identifier.trim().toLowerCase() ||
            a.loginId?.toLowerCase() === identifier.trim().toLowerCase() ||
            a.id?.toLowerCase() === identifier.trim().toLowerCase() ||
            a.referralCode?.toLowerCase() === identifier.trim().toLowerCase()
        );

        let activePartner = matched;
        if (!activePartner) {
          activePartner = {
            id: "LLP-" + Math.floor(100000 + Math.random() * 900000),
            businessName: identifier.includes("@") ? identifier.split("@")[0] : identifier,
            ownerName: identifier.includes("@") ? identifier.split("@")[0] : identifier,
            email: identifier.includes("@") ? identifier : `${identifier}@partner.com`,
            phone: "+91 9876543210",
            password: password,
            track: "individual",
            commissionRate: 20,
            referralCode: `LIVI-${identifier.slice(0, 6).toUpperCase()}`,
            referralLink: `https://livileads.com/ref/livi-${identifier.slice(0, 6).toLowerCase()}`,
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
              accountHolder: identifier.includes("@") ? identifier.split("@")[0] : identifier,
              ifscOrSwift: "HDFC0001234",
              upiId: `${identifier.split("@")[0]}@okhdfcbank`,
              paypalEmail: identifier.includes("@") ? identifier : "",
            },
            referredBusinesses: [],
            redemptions: [],
          };
        }

        localStorage.setItem("livileads_active_partner", JSON.stringify(activePartner));
      } catch (err) {
        console.error(err);
      }

      setViewMode("authenticated");

      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.error(err);
      }

      // Redirect directly to Partner Portal
      setTimeout(() => {
        router.push("/portal");
      }, 1200);
    }, 900);
  };

  // Handle Send OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError("");

    if (!forgotIdentifier.trim()) {
      setForgotError("Please enter your registered Partner ID or Email.");
      return;
    }

    setIsSendingOtp(true);

    setTimeout(() => {
      setIsSendingOtp(false);
      setResendTimer(30);
      setCanResend(false);
      setOtpCode("");
      setOtpError("");
      setViewMode("verify_otp");
    }, 900);
  };

  // Handle Resend OTP
  const handleResendOtp = () => {
    if (!canResend) return;
    setCanResend(false);
    setResendTimer(30);
    setOtpError("");
  };

  // Trigger OTP Verification (Used by auto-verify & manual click)
  const triggerOtpVerification = (codeToVerify: string) => {
    if (codeToVerify.length < 6 || isVerifyingOtp) return;

    setIsVerifyingOtp(true);
    setOtpError("");

    setTimeout(() => {
      setIsVerifyingOtp(false);
      setNewPassword("");
      setConfirmPassword("");
      setNewPasswordError("");
      setViewMode("create_password");
    }, 800);
  };

  // Handle OTP Input Change with Auto-Verify when 6 digits are typed
  const handleOtpChange = (val: string) => {
    const cleanDigits = val.replace(/\D/g, "").slice(0, 6);
    setOtpCode(cleanDigits);
    if (otpError) setOtpError("");

    if (cleanDigits.length === 6) {
      triggerOtpVerification(cleanDigits);
    }
  };

  // Handle Save New Password -> Navigate directly back to Login Screen
  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setNewPasswordError("");

    if (!newPassword || newPassword.length < 6) {
      setNewPasswordError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setNewPasswordError("Passwords do not match. Please re-enter.");
      return;
    }

    setIsSavingPassword(true);

    setTimeout(() => {
      setIsSavingPassword(false);

      // Pre-populate identifier on login screen and show confirmation notice
      setIdentifier(forgotIdentifier);
      setPassword("");
      setLoginError("");
      setPasswordSuccessNotice("Password updated successfully! Please sign in with your new password.");

      // Direct transition to login screen as requested
      setViewMode("login");

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.error(err);
      }
    }, 900);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50/40 via-white to-slate-50/60 selection:bg-purple-100 selection:text-purple-900">
      {/* Top Header */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 py-3.5 sm:py-4">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 focus:outline-none"
            aria-label="LiviLeads Partner Program Home"
          >
            <LiviLogo size="md" showBadge={true} badgeText="Partner Portal" />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-bold text-slate-600 hover:text-violet-700 bg-slate-100 hover:bg-violet-50 hover:border-violet-200/80 border border-transparent px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-250 ease-out"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Back to Home</span>
            <span className="xs:hidden">Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center py-8 sm:py-14 px-3.5 sm:px-6 relative overflow-hidden">
        {/* Ambient subtle glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-violet-200/40 via-purple-100/30 to-indigo-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="w-full max-w-md">
          {/* Main Card Container */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 hover:border-violet-400 hover:shadow-2xl hover:shadow-violet-500/15 transition-all duration-300 ease-out overflow-hidden relative">
            {/* Top Accent Bar */}
            <div className="h-1.5 w-full bg-[#6560F0]" />

            {/* SCREEN 1: LOGIN SCREEN */}
            {viewMode === "login" && (
              <div className="p-5 sm:p-8 animate-in fade-in duration-200">
                {/* Header Section */}
                <div className="mb-6">
                  <p className="text-xs font-bold text-[#6560F0] uppercase tracking-wider mb-2">
                    Official Partner Access
                  </p>

                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Welcome Back
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    Log in to manage your referrals, monitor subscriptions, and view Livi Points.
                  </p>
                </div>

                {/* Password Reset Success Notice Banner */}
                {passwordSuccessNotice && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-emerald-800 text-xs animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                    <span className="font-medium">{passwordSuccessNotice}</span>
                  </div>
                )}

                {/* Error Banner */}
                {loginError && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-xs animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <span>{loginError}</span>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {/* Field 1: Partner ID or Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Partner ID or Email <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => {
                          setIdentifier(e.target.value);
                          if (loginError) setLoginError("");
                          if (passwordSuccessNotice) setPasswordSuccessNotice("");
                        }}
                        placeholder="e.g. LL-PRT-8821 or partner@company.com"
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Field 2: Password with Eye/EyeOff toggle & Forgot link */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Password <span className="text-rose-500">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setForgotIdentifier(identifier);
                          setForgotError("");
                          setViewMode("forgot");
                        }}
                        className="text-xs text-violet-600 hover:text-violet-800 font-semibold transition-colors duration-200 ease-out cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (loginError) setLoginError("");
                        }}
                        placeholder="Enter your partner password"
                        className="w-full pl-10 pr-11 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 bg-white transition"
                      />
                      {/* Password View / Hide Eye Button */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-violet-600 hover:scale-110 active:scale-90 transition-all duration-200 ease-out cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-violet-600" />
                        ) : (
                          <Eye className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Options: Remember Me (No "Need help?" as requested) */}
                  <div className="flex items-center text-xs text-slate-600 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-slate-300 text-violet-600 focus:ring-violet-500 w-4 h-4"
                      />
                      <span>Remember this device</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 py-3 px-4 bg-[#6560F0] hover:bg-[#524ad9] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-[#6560F0]/25 hover:shadow-xl hover:shadow-[#6560F0]/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2 transition-all duration-300 ease-out disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-md cursor-pointer group"
                  >
                    {isLoading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Authenticating Partner...</span>
                      </span>
                    ) : (
                      <>
                        <span>Enter Partner Portal</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>

                {/* Footer Switch to Application */}
                <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
                  Not an approved partner yet?{" "}
                  <Link
                    href="/apply"
                    className="text-violet-600 hover:text-violet-800 font-bold transition-all duration-200 ease-out inline-flex items-center gap-1 ml-1 hover:underline group"
                  >
                    <span>Apply to Become a Partner</span>
                    <ArrowRight className="w-3 h-3 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* SCREEN 2: FORGOT PASSWORD (SEND OTP) */}
            {viewMode === "forgot" && (
              <div className="p-5 sm:p-8 animate-in fade-in duration-200">
                {/* Back to Login Header Button */}
                <button
                  type="button"
                  onClick={() => {
                    setForgotError("");
                    setViewMode("login");
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-violet-600 hover:-translate-x-0.5 mb-4 transition-all duration-200 ease-out cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </button>

                {/* Header Section */}
                <div className="mb-6">
                  <div className="w-11 h-11 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center mb-3 shadow-xs">
                    <KeyRound className="w-5 h-5" />
                  </div>

                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Reset Your Password
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    Enter your registered Partner ID or Email address. We will verify your account and send an OTP code.
                  </p>
                </div>

                {/* Error Banner */}
                {forgotError && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-xs animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <span>{forgotError}</span>
                  </div>
                )}

                {/* Send OTP Form */}
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Registered Partner ID or Email <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        autoFocus
                        value={forgotIdentifier}
                        onChange={(e) => {
                          setForgotIdentifier(e.target.value);
                          if (forgotError) setForgotError("");
                        }}
                        placeholder="e.g. LL-PRT-8821 or partner@company.com"
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Send OTP Button (as requested: 'Send reset instruction nn pakaram Send OTp aakkanam') */}
                  <button
                    type="submit"
                    disabled={isSendingOtp}
                    className="w-full py-3 px-4 bg-[#6560F0] hover:bg-[#524ad9] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-[#6560F0]/20 hover:shadow-xl hover:shadow-[#6560F0]/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2 transition-all duration-300 ease-out disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer group"
                  >
                    {isSendingOtp ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending OTP...</span>
                      </span>
                    ) : (
                      <>
                        <span>Send OTP</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Remembered your password?</span>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotError("");
                      setViewMode("login");
                    }}
                    className="text-violet-600 hover:text-violet-800 font-bold hover:underline transition-colors duration-200 ease-out cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 3: VERIFICATION SCREEN (ONLY OTP CODE, NO PASSWORD FIELDS HERE) */}
            {viewMode === "verify_otp" && (
              <div className="p-5 sm:p-8 animate-in fade-in duration-200">
                <button
                  type="button"
                  onClick={() => setViewMode("forgot")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-violet-600 hover:-translate-x-0.5 mb-4 transition-all duration-200 ease-out cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Change Identifier</span>
                </button>

                <div className="mb-6">
                  <div className="w-11 h-11 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center mb-3 shadow-xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>

                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Enter Verification Code
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    We sent a 6-digit recovery code to{" "}
                    <span className="font-semibold text-slate-800">{forgotIdentifier}</span>.
                  </p>
                </div>

                {otpError && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-xs animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <span>{otpError}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* 6-Digit OTP Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        6-Digit Security Code <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[11px] text-violet-600 font-medium">Auto-verifies on 6 digits</span>
                    </div>

                    <input
                      type="text"
                      maxLength={6}
                      required
                      autoFocus
                      value={otpCode}
                      onChange={(e) => handleOtpChange(e.target.value)}
                      placeholder="123456"
                      className="w-full text-center tracking-[0.35em] font-mono text-xl sm:text-2xl font-bold py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 bg-slate-50 focus:bg-white transition"
                    />
                  </div>

                  {/* Resend Code Button & Timer */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span>Didn&apos;t receive code?</span>
                    <button
                      type="button"
                      disabled={!canResend}
                      onClick={handleResendOtp}
                      className={`font-semibold flex items-center gap-1 transition-colors duration-200 ease-out ${
                        canResend
                          ? "text-violet-600 hover:text-violet-800 cursor-pointer"
                          : "text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <RefreshCw className={`w-3 h-3 ${!canResend && "animate-spin"}`} />
                      <span>{canResend ? "Resend OTP" : `Resend in ${resendTimer}s`}</span>
                    </button>
                  </div>

                  {/* Verify OTP Button */}
                  <button
                    type="button"
                    onClick={() => triggerOtpVerification(otpCode)}
                    disabled={otpCode.length < 6 || isVerifyingOtp}
                    className="w-full mt-2 py-3 px-4 bg-[#6560F0] hover:bg-[#524ad9] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-[#6560F0]/20 hover:shadow-xl hover:shadow-[#6560F0]/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2 transition-all duration-300 ease-out disabled:opacity-60 disabled:hover:translate-y-0 cursor-pointer group"
                  >
                    {isVerifyingOtp ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Verifying OTP...</span>
                      </span>
                    ) : (
                      <>
                        <span>Verify OTP</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 4: CREATE NEW PASSWORD (SEPARATE SCREEN AFTER OTP VERIFICATION) */}
            {viewMode === "create_password" && (
              <div className="p-5 sm:p-8 animate-in fade-in duration-200">
                <div className="mb-6">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 shadow-xs">
                    <Lock className="w-5 h-5" />
                  </div>

                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Create New Password
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    OTP verified successfully. Create a secure password for{" "}
                    <span className="font-semibold text-slate-800">{forgotIdentifier}</span>.
                  </p>
                </div>

                {newPasswordError && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-xs animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <span>{newPasswordError}</span>
                  </div>
                )}

                <form onSubmit={handleSaveNewPassword} className="space-y-4">
                  {/* New Password with Eye Icon */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      New Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        required
                        autoFocus
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          if (newPasswordError) setNewPasswordError("");
                        }}
                        placeholder="At least 6 characters"
                        className="w-full pl-10 pr-11 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 bg-white transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-violet-600 hover:scale-110 active:scale-90 transition-all duration-200 ease-out cursor-pointer"
                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-4 h-4 text-violet-600" />
                        ) : (
                          <Eye className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password with Eye Icon */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Confirm New Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (newPasswordError) setNewPasswordError("");
                        }}
                        placeholder="Re-enter your new password"
                        className="w-full pl-10 pr-11 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 bg-white transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-violet-600 hover:scale-110 active:scale-90 transition-all duration-200 ease-out cursor-pointer"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4 text-violet-600" />
                        ) : (
                          <Eye className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button to save and go back directly to login */}
                  <button
                    type="submit"
                    disabled={isSavingPassword}
                    className="w-full mt-2 py-3 px-4 bg-[#6560F0] hover:bg-[#524ad9] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-[#6560F0]/20 hover:shadow-xl hover:shadow-[#6560F0]/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2 transition-all duration-300 ease-out disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer group"
                  >
                    {isSavingPassword ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Updating Password...</span>
                      </span>
                    ) : (
                      <>
                        <span>Save Password & Return to Login</span>
                        <Check className="w-4 h-4 transition-transform duration-200 ease-out group-hover:scale-110" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* SCREEN 5: AUTHENTICATED SUCCESS */}
            {viewMode === "authenticated" && (
              <div className="p-8 sm:p-10 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl mx-auto flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Authenticated Successfully
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                    Welcome to LiviLeads Partner Portal. Loading dashboard...
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-center gap-2 text-xs text-violet-700 font-semibold">
                  <span className="w-4 h-4 border-2 border-violet-200 border-t-violet-700 rounded-full animate-spin" />
                  <span>Redirecting...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-slate-500 text-xs">
          Loading Partner Portal Login...
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
