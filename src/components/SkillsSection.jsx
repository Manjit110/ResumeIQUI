import React from "react";

const skills = [
  "Java 17", "Spring Boot 3", "Kafka", "Solace PubSub+", "Docker", "Podman", "Oracle DB", "Redis", "NGINX",
  "F5", "AutoSys", "GitHub Actions", "CI/CD", "Grafana", "ITRS", "SFTP", "FIX", "AWS", "Python", "C#", "Unity", "Machine Learning"
  // ...add or update with your latest list
];

const SkillsScroller = () => (
  <div className="w-full mt-6">
    <h3 className="font-semibold text-lg mb-2">Skills</h3>
    <div className="flex overflow-x-auto gap-2 pb-2">
      {skills.map((skill, idx) => (
        <span
          key={idx}
          className="bg-gray-200 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap border hover:bg-blue-100 transition"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

export default SkillsScroller;
