"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Search, Check, X, Phone } from "lucide-react";

export interface CountryItem {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  placeholder: string;
}

// Curated list of countries with priority for common partner regions + global coverage
export const COUNTRIES: CountryItem[] = [
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳", placeholder: "98765 43210" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪", placeholder: "50 123 4567" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦", placeholder: "50 123 4567" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸", placeholder: "(555) 019-2834" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧", placeholder: "7911 123456" },
  { code: "QA", name: "Qatar", dialCode: "+974", flag: "🇶🇦", placeholder: "3312 3456" },
  { code: "OM", name: "Oman", dialCode: "+968", flag: "🇴🇲", placeholder: "9123 4567" },
  { code: "KW", name: "Kuwait", dialCode: "+965", flag: "🇰🇼", placeholder: "9123 4567" },
  { code: "BH", name: "Bahrain", dialCode: "+973", flag: "🇧🇭", placeholder: "3612 3456" },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬", placeholder: "8123 4567" },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾", placeholder: "12-345 6789" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦", placeholder: "(555) 019-2834" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺", placeholder: "412 345 678" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪", placeholder: "151 12345678" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷", placeholder: "6 12 34 56 78" },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱", placeholder: "6 12345678" },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸", placeholder: "612 34 56 78" },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹", placeholder: "312 345 6789" },
  { code: "IE", name: "Ireland", dialCode: "+353", flag: "🇮🇪", placeholder: "85 123 4567" },
  { code: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭", placeholder: "78 123 45 67" },
  { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪", placeholder: "70 123 45 67" },
  { code: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴", placeholder: "412 34 567" },
  { code: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰", placeholder: "20 12 34 56" },
  { code: "PL", name: "Poland", dialCode: "+48", flag: "🇵🇱", placeholder: "512 345 678" },
  { code: "PT", name: "Portugal", dialCode: "+351", flag: "🇵🇹", placeholder: "912 345 678" },
  { code: "NZ", name: "New Zealand", dialCode: "+64", flag: "🇳🇿", placeholder: "21 123 4567" },
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦", placeholder: "71 123 4567" },
  { code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬", placeholder: "802 123 4567" },
  { code: "KE", name: "Kenya", dialCode: "+254", flag: "🇰🇪", placeholder: "712 345678" },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬", placeholder: "100 123 4567" },
  { code: "TR", name: "Turkey", dialCode: "+90", flag: "🇹🇷", placeholder: "532 123 4567" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵", placeholder: "90 1234 5678" },
  { code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷", placeholder: "10 1234 5678" },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳", placeholder: "138 0013 8000" },
  { code: "HK", name: "Hong Kong", dialCode: "+852", flag: "🇭🇰", placeholder: "9123 4567" },
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩", placeholder: "812-3456-7890" },
  { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭", placeholder: "917 123 4567" },
  { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭", placeholder: "81 234 5678" },
  { code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳", placeholder: "91 234 5678" },
  { code: "PK", name: "Pakistan", dialCode: "+92", flag: "🇵🇰", placeholder: "300 1234567" },
  { code: "BD", name: "Bangladesh", dialCode: "+880", flag: "🇧🇩", placeholder: "1712-345678" },
  { code: "LK", name: "Sri Lanka", dialCode: "+94", flag: "🇱🇰", placeholder: "71 234 5678" },
  { code: "NP", name: "Nepal", dialCode: "+977", flag: "🇳🇵", placeholder: "984-1234567" },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷", placeholder: "11 91234-5678" },
  { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽", placeholder: "55 1234 5678" },
];

interface CountryPhoneInputProps {
  label: string;
  required?: boolean;
  value: string;
  countryCode?: string; // e.g. "IN" or "US"
  onChange: (fullNumber: string, country: CountryItem, rawNationalNumber: string) => void;
  helperText?: string;
  id?: string;
}

export default function CountryPhoneInput({
  label,
  required = true,
  value,
  countryCode = "IN",
  onChange,
  helperText,
  id,
}: CountryPhoneInputProps) {
  // Find initial country or fallback to first
  const initialCountry =
    COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[0];

  const [selectedCountry, setSelectedCountry] = useState<CountryItem>(initialCountry);
  const [nationalNumber, setNationalNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Sync internal national number when value changes from outside (e.g. form reset)
  useEffect(() => {
    if (!value) {
      setNationalNumber("");
      return;
    }
    // If value already starts with selected country dial code, strip it for national number display
    if (value.startsWith(selectedCountry.dialCode)) {
      const stripped = value.slice(selectedCountry.dialCode.length).trim();
      setNationalNumber(stripped);
    } else {
      // Check if it starts with another country's dial code
      const matchingCountry = COUNTRIES.find((c) => value.startsWith(c.dialCode));
      if (matchingCountry) {
        setSelectedCountry(matchingCountry);
        setNationalNumber(value.slice(matchingCountry.dialCode.length).trim());
      } else {
        setNationalNumber(value);
      }
    }
  }, [value, selectedCountry.dialCode]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Auto-focus search input when opened
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle national number typing
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    setNationalNumber(rawVal);
    const formattedFull = rawVal.trim()
      ? `${selectedCountry.dialCode} ${rawVal.trim()}`
      : "";
    onChange(formattedFull, selectedCountry, rawVal);
  };

  // Handle country selection
  const handleSelectCountry = (country: CountryItem) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery("");
    const formattedFull = nationalNumber.trim()
      ? `${country.dialCode} ${nationalNumber.trim()}`
      : "";
    onChange(formattedFull, country, nationalNumber);
    phoneInputRef.current?.focus();
  };

  // Filter countries by search query (name, dial code, or 2-letter code)
  const filteredCountries = COUNTRIES.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim().replace("+", "");
    return (
      c.name.toLowerCase().includes(q) ||
      c.dialCode.replace("+", "").includes(q) ||
      c.code.toLowerCase().includes(q)
    );
  });

  return (
    <div className="relative" ref={dropdownRef}>
      <label
        htmlFor={id}
        className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
      >
        {label} {required && <span className="text-rose-500">*</span>}
      </label>

      {/* Composite Input Box */}
      <div
        className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
          isOpen
            ? "border-violet-600 ring-2 ring-violet-500/20 shadow-xs"
            : "border-slate-200 hover:border-slate-300 focus-within:border-violet-600 focus-within:ring-2 focus-within:ring-violet-500/20"
        }`}
      >
        {/* Country Code Selector Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="h-full flex items-center gap-1.5 sm:gap-2 pl-2.5 sm:pl-3.5 pr-2 sm:pr-2.5 py-2.5 sm:py-3 border-r border-slate-200/90 bg-slate-50/70 hover:bg-slate-100/90 rounded-l-xl transition-all duration-200 ease-out cursor-pointer select-none shrink-0 group active:bg-slate-200/70"
          title={`Country: ${selectedCountry.name} (${selectedCountry.dialCode})`}
          aria-expanded={isOpen}
        >
          {/* Flag (Crisp Retina Flag Image with Emoji Fallback) */}
          <span className="w-5 h-3.5 rounded-xs overflow-hidden shadow-2xs border border-slate-300/60 bg-white flex items-center justify-center shrink-0">
            <img
              src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
              alt={selectedCountry.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                // If flagcdn fails, fallback to rendering the flag emoji
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="text-xs leading-none sr-only">{selectedCountry.flag}</span>
          </span>

          {/* Dial Code text */}
          <span className="text-xs sm:text-sm font-bold text-slate-800">
            {selectedCountry.dialCode}
          </span>

          {/* Subtle Chevron */}
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform duration-200 ml-0.5 ${
              isOpen ? "rotate-180 text-violet-600" : ""
            }`}
          />
        </button>

        {/* National Number Input */}
        <div className="relative flex-1 min-w-0 flex items-center">
          <input
            id={id}
            ref={phoneInputRef}
            type="tel"
            required={required}
            value={nationalNumber}
            onChange={handleNumberChange}
            placeholder={selectedCountry.placeholder}
            className="w-full pl-2.5 sm:pl-3.5 pr-3 sm:pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none rounded-r-xl font-medium"
          />
        </div>
      </div>

      {helperText && (
        <p className="text-[11px] text-slate-500 mt-1.5">{helperText}</p>
      )}

      {/* Country Dropdown Popup with Search */}
      {isOpen && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute left-0 top-full mt-2 z-50 w-[calc(100vw-2.5rem)] max-w-xs sm:w-80 bg-white rounded-2xl border border-slate-200/90 shadow-2xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Search Header */}
          <div className="px-3 pt-1 pb-2 border-b border-slate-100">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or dial code..."
                className="w-full pl-8 pr-7 py-2 bg-slate-50 rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:bg-white focus:border-violet-600 focus:ring-1 focus:ring-violet-500/20 transition font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Countries Scrollable List */}
          <div className="max-h-64 overflow-y-auto py-1 divide-y divide-slate-100/50">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => {
                const isSelected = c.code === selectedCountry.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleSelectCountry(c)}
                    className={`w-full px-3.5 py-2.5 text-left flex items-center justify-between gap-2.5 text-xs sm:text-sm transition-all duration-200 ease-out cursor-pointer ${
                      isSelected
                        ? "bg-violet-50 text-violet-900 font-bold border-l-4 border-violet-600"
                        : "text-slate-700 hover:bg-violet-50/50 hover:text-violet-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Flag */}
                      <span className="w-5 h-3.5 rounded-xs overflow-hidden shadow-2xs border border-slate-300/60 bg-white flex items-center justify-center shrink-0">
                        <img
                          src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                          alt={c.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <span className="text-xs leading-none sr-only">{c.flag}</span>
                      </span>

                      {/* Country Name */}
                      <span className="truncate">{c.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-md font-mono font-medium ${
                          isSelected
                            ? "bg-violet-100/80 text-violet-800 font-bold"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {c.dialCode}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-6 px-4 text-center text-xs text-slate-400">
                <p>No countries found matching "{searchQuery}"</p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-1.5 text-violet-600 font-semibold hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
