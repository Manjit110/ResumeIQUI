import React from "react";

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <img
        src="/profile.jpg"
        alt="Manjit Singh"
        className="w-44 h-44 object-cover rounded-full border-4 border-white shadow-lg"
      />
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
        Manjit Singh
      </h1>
      <h2 className="text-xl text-blue-700 dark:text-blue-400 font-semibold">
        Senior Java Developer • Fixed Income Specialist
      </h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-xl text-center">
        Passionate about building scalable financial software, real-time risk analytics, and innovative AI-driven solutions for capital markets.
      </p>
      <div className="flex gap-3 mt-2">
        <a
          href="https://github.com/Manjit110"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
        >
          <i className="fab fa-github fa-2x"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/your-link"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 transition"
        >
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
      </div>
      <div className="mt-1 text-green-600 dark:text-green-400 font-medium text-base animate-pulse">
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
          AI is online — Ask me anything!
        </span>
      </div>
    </div>
  );
}
