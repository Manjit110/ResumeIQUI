import React, { useState } from "react";
import VCardButton from "./VCardButton";
import { FaPhoneAlt, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CA } from "country-flag-icons/react/3x2";
import { IN } from "country-flag-icons/react/3x2";
import { FiCopy, FiCheck } from "react-icons/fi";

// Tooltip + Copy icon
const TooltipCopyIcon = ({ icon: Icon, label, value }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard?.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={label}
        className="p-2 rounded-full bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-gray-800 shadow-sm hover:-translate-y-0.5 hover:shadow transition text-gray-800 dark:text-gray-200"
      >
        <Icon className="text-lg" />
      </button>

      {/* Tooltip */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2 mt-2
          whitespace-nowrap rounded-xl border border-gray-200 dark:border-gray-800
          bg-white/95 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg
          px-2.5 py-1 text-[13px]
          ${open ? "opacity-100" : "opacity-0"}
          transition
          z-50
        `}
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="font-medium">{value}</span>
          <button
            type="button"
            onClick={copyToClipboard}
            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition text-[12px]"
            aria-label="Copy to clipboard"
          >
            {copied ? <FiCheck className="text-green-600" /> : <FiCopy />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Direct LinkedIn icon (opens link instead of copy)
const LinkedInIcon = () => (
  <a
    href="https://www.linkedin.com/in/manjit-singh-705996164/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="p-2 rounded-full bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-gray-800 shadow-sm hover:-translate-y-0.5 hover:shadow transition text-blue-700"
  >
    <FaLinkedin className="text-lg" />
  </a>
);

export default function ContactCTA() {
  return (
    <div className="w-full max-w-3xl px-2 mt-3 mb-6">
      <div
        className="
          relative overflow-visible z-20
          rounded-2xl border border-indigo-200/60
          bg-gradient-to-r from-white/90 via-indigo-50 to-blue-50
          shadow-md
        "
      >
        {/* subtle gradient rim */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-pink-300/10 via-transparent to-blue-300/10" />

        <div className="p-3 sm:p-4">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-700 bg-white/70 border border-indigo-200 rounded-full px-2 py-0.5">
                HR-friendly vCard
              </div>
              <h3 className="mt-1 text-base sm:text-lg font-semibold text-gray-900 truncate">
                Save me to your contacts
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Canada & India numbers and emails included.
              </p>
            </div>

            <div className="shrink-0">
              <VCardButton />
            </div>
          </div>

          {/* Divider */}
          <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />

          {/* Contacts grid */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Canada */}
            <div className="flex items-center justify-between gap-3 rounded-xl bg-white/70 backdrop-blur border border-white/60 px-2.5 py-1.5 relative z-10">
              <div className="flex items-center gap-2 min-w-0">
                <CA title="Canada" className="w-6 h-auto rounded-[2px] shadow" />
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-gray-900">Canada</div>
                  <div className="text-[11px] text-gray-600">Toronto, ON</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <TooltipCopyIcon
                  icon={FaPhoneAlt}
                  label="Canada phone"
                  value="+1 (514) 549-1485"
                />
                <TooltipCopyIcon
                  icon={MdEmail}
                  label="Canada email"
                  value="manjitsingh07.1998@gmail.com"
                />
                <LinkedInIcon /> {/* Added LinkedIn here */}
              </div>
            </div>

            {/* India */}
            <div className="flex items-center justify-between gap-3 rounded-xl bg-white/70 backdrop-blur border border-white/60 px-2.5 py-1.5 relative z-0">
              <div className="flex items-center gap-2 min-w-0">
                <IN title="India" className="w-6 h-auto rounded-[2px] shadow" />
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-gray-900">India</div>
                  <div className="text-[11px] text-gray-600">—</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <TooltipCopyIcon
                  icon={FaPhoneAlt}
                  label="India phone"
                  value="+91 81785 73640"
                />
                <TooltipCopyIcon
                  icon={MdEmail}
                  label="India email"
                  value="ms6554353@gmail.com"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
