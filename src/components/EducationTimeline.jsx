import React from "react";

export default function EducationTimeline({ education }) {
  return (
    <div className="relative ml-4">
      <div className="absolute left-2 top-0 h-full w-1 bg-indigo-300 rounded"></div>
      <ul className="space-y-8">
        {education.map((edu, idx) => (
          <li key={idx} className="relative flex items-start">
            <div className="absolute -left-4 top-0 flex items-center justify-center w-8 h-8">
              <div className="rounded-full bg-indigo-600 w-4 h-4 border-4 border-white"></div>
            </div>
            <div className="ml-8 flex-1">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-lg text-indigo-900">{edu.degree}</span>
                <span className="text-xs text-gray-500">{edu.date}</span>
              </div>
              <div className="font-medium text-gray-700">{edu.school}, {edu.location}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
