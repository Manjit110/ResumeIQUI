import React from "react";

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center gap-4 mb-6 pt-8"> 
      {/* ↑ added pt-8 so image doesn't hit the browser top */}

      {/* Clickable profile image with glow + corner play badge */}
      <a
        href="https://prezi.com/view/XNHr6fQ1iGT1gETTdhMS/"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group cursor-pointer z-10 block"
        title="View interactive pitch deck"
        aria-label="Open interactive pitch deck"
      >
        {/* Soft glow ring */}
        <span
          className="
            absolute inset-0 rounded-full
            bg-gradient-to-br from-pink-500/30 via-indigo-500/20 to-blue-500/30
            blur-md animate-soft-pulse
          "
          aria-hidden="true"
        />

        {/* Avatar */}
        <img
          src={process.env.PUBLIC_URL + "/profile.jpg"}
          alt="Manjit Singh"
          className="
            relative z-10 w-44 h-44 object-cover rounded-full
            border-4 border-white shadow-lg
            animate-subtle-bounce
            [transform-origin:center] will-change-transform
          "
        />

        {/* Corner play badge */}
        <span
          className="
            absolute -bottom-1 -right-1 z-20
            inline-flex items-center justify-center
            w-10 h-10 rounded-full
            bg-gradient-to-br from-pink-500 to-blue-500 text-white shadow-lg
            ring-2 ring-white
          "
        >
          {/* subtle pulse aura */}
          <span className="absolute inset-0 rounded-full animate-ping bg-pink-500/40" aria-hidden="true"></span>

          {/* play icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="relative h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="sr-only">Play interactive resume</span>
        </span>
      </a>

      {/* Socials */}
      <div className="flex gap-3 mt-3">
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
