import React from "react";

const experience = [
  {
    role: "Senior Software Consultant",
    company: "CIBC",
    period: "Sep 2023 – Jun 2025",
    details: [
      "Modernized Fixed Income microservices (Java 17, Spring Boot 3).",
      "Migrated legacy platforms to Kafka/Solace & containerized with Docker.",
      "Implemented real-time portfolio analytics and settlement automation."
    ],
  },
  {
    role: "Software Developer",
    company: "Citibank",
    period: "2022 – 2023",
    details: [
      "Built scalable APIs for trading and reporting platforms.",
      "Streamlined risk data ETL pipelines using Java & SQL.",
    ],
  },
  // Add more as needed
];

export default function ResumeTimeline() {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Work Experience</h3>
      <ol className="relative border-l-4 border-blue-500 dark:border-blue-400 pl-6">
        {experience.map((item, idx) => (
          <li key={idx} className="mb-8">
            <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{item.role}</h4>
            <span className="text-gray-600 dark:text-gray-400">{item.company} • {item.period}</span>
            <ul className="list-disc ml-5 mt-1 text-gray-700 dark:text-gray-200">
              {item.details.map((line, i) => <li key={i}>{line}</li>)}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
