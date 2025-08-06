import React from "react";

export default function Timeline({ experience }) {
  return (
    <div className="relative ml-4">
      <div className="absolute left-2 top-0 h-full w-1 bg-blue-300 rounded"></div>
      <ul className="space-y-8">
        {experience.map((exp, idx) => (
          <li key={idx} className="relative flex items-start">
            <div className="absolute -left-4 top-0 flex items-center justify-center w-8 h-8">
              <div className="rounded-full bg-blue-600 w-4 h-4 border-4 border-white"></div>
            </div>
            <div className="ml-8 flex-1">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-lg text-blue-900">{exp.role}</span>
                <span className="text-xs text-gray-500">{exp.dates}</span>
              </div>
              <div className="font-medium text-gray-700">{exp.company}, {exp.location}</div>
              <ul className="list-disc ml-6 text-gray-600 mt-1">
                {exp.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
