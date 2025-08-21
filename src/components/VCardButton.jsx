import React from "react";

export default function VCardButton({
  fullName = "Manjit Singh",
  title = "Senior Java Developer • Fixed Income Specialist",
  org = "—",
  emailCA = "manjitsingh07.1998@gmail.com",
  emailIN = "ms6554353@gmail.com",
  phoneCA = "+1 514 549 1485",
  phoneIN = "+91 81785 73640",
  location = "Toronto, ON, Canada",
  linkedin = "https://www.linkedin.com/in/manjit-singh-705996164/",
}) {
  const handleDownload = () => {
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:Singh;Manjit;;;`,
      `FN:${fullName}`,
      `TITLE:${title}`,
      `ORG:${org}`,
      `EMAIL;TYPE=INTERNET,HOME:${emailCA}`,
      `EMAIL;TYPE=INTERNET,WORK:${emailIN}`,
      `TEL;TYPE=CELL:${phoneCA}`,
      `TEL;TYPE=CELL:${phoneIN}`,
      `ADR;TYPE=HOME:;;${location};;;;`,
      `URL:${linkedin}`,
      "END:VCARD",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fullName.replace(/\s+/g, "_")}.vcf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      type="button"
      className="inline-flex items-center gap-2 rounded-xl bg-white/90 border border-gray-200 px-4 py-2 text-sm font-semibold shadow hover:shadow-md hover:-translate-y-0.5 transition"
      aria-label="Download contact card (vCard)"
    >
      {/* contact card icon */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"
        viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm3 4h7m-7 4h10M7 8a2 2 0 100-4 2 2 0 000 4z"/>
      </svg>
      Save Contact
    </button>
  );
}
