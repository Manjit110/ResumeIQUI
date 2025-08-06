import React, { useState } from "react";
import ChatPopup from "./components/ChatPopup";
import DownloadResumeButton from "./components/DownloadResumeButton";
import Timeline from "./components/Timeline";
import EducationTimeline from "./components/EducationTimeline";

const allSkills = [
  "Java 17", "Python", "Shell", "Spring Boot 2/3", "Spring MVC", "REST APIs", "Catalys FIX Engine", "Docker", "Podman",
  "Unix/Linux", "Solace PubSub+", "Solace MQBridge", "FIX", "SFTP", "Kafka", "Oracle DB", "Databricks", "Redis",
  "NGINX", "F5 Load Balancer", "Git", "IntelliJ IDEA", "Maven", "JUnit 4/5", "GitHub Actions", "JFrog Artifactory",
  "AWS", "Confluence", "AutoSys", "ITRS", "Grafana", "Design Patterns"
];

const experience = [
  {
    role: "Senior Software Consultant – Fixed Income, Capital Markets",
    company: "CIBC",
    location: "Toronto, Canada",
    dates: "09/2023 – 06/2025",
    details: [
      "Modernized and re-architected a suite of event-driven microservices (Java 8 → 17, Spring Boot 2 → 3), reducing average API and job execution times by 20%, containerizing applications with Docker/Podman for rapid scaling, and improving uptime and cost-efficiency by migrating from IBM Solaris to RHEL servers.",
      "Enhanced system scalability, security, and reliability by introducing NGINX and F5 load balancers for high availability, implementing IP whitelisting and audit logging for secure API access, and supporting maintainability through thorough system documentation.",
      "Migrated 300+ AutoSys jobs & shell scripts during the IBM Solaris → RHEL cut-over, ensuring zero downtime and boosting production workflow availability to 99.99% for critical batch and integration processes.",
      "Reduced market data latency by 30% through end-to-end event-driven processing: integrated Bloomberg FIX streams (Catalyst FIX → Solace Topics), and implemented Redis caching to optimize bond price distribution—accelerating thousands of price updates from 6 minutes to 4 minutes and enabling real-time data propagation.",
      "Designed and implemented data streaming architectures for Settlement, Allocation, and Inter-company Messaging using Solace PubSub+, secured external data flows via Solace MQBridge and SFTP.",
      "Decommissioned legacy OMGEO (Allocation Trading System) and GLOSS & ARROW (Back-Office Settlement Systems); introduced modern SFTP + ARROW-based microservices, saving over $100K in annual costs and modernizing data exchange patterns.",
      "Co-authored a pluggable, self-service reporting microservice framework—enabling BAs to onboard and schedule custom data extracts (CSV, XML, JSON) for external consumption via SFTP, email, or API, without dev intervention.",
      "Designed, developed, and maintained RESTful APIs consumed by 10+ internal teams, processing over 10,000+ daily transactions across trades, positions, securities, and prices with 99.99% uptime, enabling reliable access to critical capital markets data and powering automated integration workflows.",
      "Developed comprehensive JUnit 4/5 test suites (90%+ coverage) for all core microservices, integrated into CI/CD (GitHub Actions, JFrog Artifactory) for automated, production-grade releases.",
      "Leveraged GitHub Copilot and CIBC's proprietary LLM-based AI tools to accelerate development workflows, automate repetitive coding tasks, and enhance code quality—resulting in faster feature delivery and improved team productivity.",
    ]
  },
  {
    role: "Functional QA / Technical Tester – Virtual Reality (VR)",
    company: "Keyword Studios",
    location: "Montreal, Canada",
    dates: "03/2023 – 09/2023",
    details: [
      "Designed & executed test plans for Meta Quest (Oculus) VR titles in Unity/C#, using Quest dev tools for performance telemetry.",
      "Logged reproducible defects with 'Action – Expected – Result' Jira titles; prioritized severity and tracked 100+ issues across sprints.",
      "Built comprehensive regression suites and collaborated with engineers to validate hot-fixes in CI builds.",
      "Facilitated cross-disciplinary daily syncs (design, QA, engineering), accelerating bug resolution and ensuring on-time milestone delivery."
    ]
  },
  {
    role: "Software Developer & Machine-Learning Intern",
    company: "SASE Laboratory, DRDO",
    location: "Chandigarh, India",
    dates: "01/2020 – 06/2020",
    details: [
      "Developed a Python-based backend service and automated ML pipeline to predict snow-avalanche risk for Indian Army bases using KNN, SVM, and ANN (83% accuracy).",
      "Implemented data ingestion and auto-preprocessing flows from high-altitude sensors, enabling real-time decision support.",
      "Built a GUI-based model configuration interface allowing users to select algorithms and train models using 5/10/20 years of historical data.",
      "Designed and deployed scheduled pipelines to generate daily avalanche forecasts and CSV reports.",
      "Delivered visual dashboards in Jupyter using Matplotlib for defense analysts to interpret risk scores."
    ]
  }
];

const education = [
  {
    degree: "MEngg.: Software Engineering",
    school: "Concordia University",
    location: "Montreal",
    date: "08/2022"
  },
  {
    degree: "B.E.: Computer Science & Engineering",
    school: "Punjab University",
    location: "Chandigarh",
    date: "09/2020"
  }
];

export default function App() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-slate-100 to-blue-100 font-sans relative">
      {/* Profile Photo */}
      <img
        src={process.env.PUBLIC_URL + "/profile.jpg"}
        alt="Manjit Singh"
        className="rounded-full border-4 border-blue-300 shadow-lg w-44 h-44 object-cover mt-12 mb-4"
      />
      {/* Name & Contact */}
      <h1 className="text-4xl font-bold mb-1">Manjit Singh</h1>
      <p className="text-lg text-gray-700 mb-1">Toronto, ON | +1 (514)-549-1485 | <a href="mailto:manjitsingh07.1998@gmail.com" className="underline">Email</a></p>
      <a
        href="https://www.linkedin.com/in/manjit-singh-705996164/"
        className="text-blue-600 hover:underline text-sm mb-6"
        target="_blank"
        rel="noopener noreferrer"
      >
        linkedin.com/in/manjit-singh-705996164
      </a>

      {/* AI Status & Skills */}
      <div className="flex flex-col items-center mb-6">
        {/* Live AI Badge */}
        <div className="flex items-center mb-3">
          <span className="relative flex h-4 w-4 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
          </span>
          <span className="text-lg font-bold text-green-700">Live: AI is ON</span>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {allSkills.map(skill => (
            <span key={skill} className="bg-slate-200 text-slate-800 px-3 py-1 rounded-xl text-sm font-medium">{skill}</span>
          ))}
        </div>
      </div>

      {/* Work Experience Timeline */}
      <div className="w-full max-w-3xl px-4 mb-8">
        <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
        <Timeline experience={experience} />
      </div>

      {/* Education Timeline */}
      <div className="w-full max-w-3xl px-4 mb-8">
        <h2 className="text-2xl font-bold mb-4">Education</h2>
        <EducationTimeline education={education} />
      </div>

      <DownloadResumeButton />

      {/* Chat Button + Popup */}
      <ChatPopup show={showChat} setShow={setShowChat} />

      {/* Footer */}
      <footer className="fixed bottom-2 w-full text-center text-gray-400 text-xs">
        © 2025 Manjit Singh
      </footer>
    </div>
  );
}
