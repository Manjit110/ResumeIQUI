import React from "react";

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      {/* Clickable profile image with play overlay */}
      <a
        href="https://prezi.com/view/XNHr6fQ1iGT1gETTdhMS/"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group cursor-pointer z-10 block"
        title="View interactive pitch deck"
      >
        <img
          src={process.env.PUBLIC_URL + "/profile.jpg"}  // ensure /public/profile.jpg exists
          alt="Manjit Singh"
          className="w-44 h-44 object-cover rounded-full border-4 border-white shadow-lg transition-transform group-hover:scale-[1.02]"
        />
        {/* Overlay: visible by default on mobile, hover on md+ */}
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white drop-shadow-lg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="sr-only">View interactive pitch deck</span>
        </div>
      </a>

      {/* Socials */}
      <div className="flex gap-3 mt-2">
        <a
          href="https://github.com/Manjit110"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
          aria-label="GitHub"
        >
          <i className="fab fa-github fa-2x"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/your-link"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 transition"
          aria-label="LinkedIn"
        >
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
      </div>
    </div>
  );
}
