import React from "react";

export default function Footer() {
  return (
    <footer className="py-6 text-center text-gray-500 dark:text-gray-400 text-sm mt-12">
      &copy; {new Date().getFullYear()} Manjit Singh • Powered by ResumeIQ & AI
    </footer>
  );
}
