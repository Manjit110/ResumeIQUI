import React from "react";

export default function DownloadResumeButton() {
  return (
    <a
      href="/Manjit_Singh.pdf"
      download
      className="bg-blue-700 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition-colors mb-10 mt-6"
    >
      Download Resume (PDF)
    </a>
  );
}
