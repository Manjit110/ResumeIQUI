import React from "react";

const skills = [
  "Java", "Spring Boot", "Kafka", "Solace", "SQL", "Docker", "Kubernetes",
  "Python", "System Design", "Financial Markets", "REST APIs", "Linux", "CI/CD"
];

export default function SkillTags() {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {skills.map(skill => (
        <span
          key={skill}
          className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium shadow hover:scale-105 transition"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}
