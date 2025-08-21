// Use state for small UI interactions
import { useState } from "react";
import ChatPopup from "./components/ChatPopup";
import DownloadResumeButton from "./components/DownloadResumeButton";
import Timeline from "./components/Timeline";
import EducationTimeline from "./components/EducationTimeline";
import HeroSection from "./components/HeroSection";

// External icon library (proper icons only)
import { FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { CA } from "country-flag-icons/react/3x2";
import { IN } from "country-flag-icons/react/3x2";

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
  { degree: "MEngg.: Software Engineering", school: "Concordia University", location: "Montreal", date: "08/2022" },
  { degree: "B.E.: Computer Science & Engineering", school: "Punjab University", location: "Chandigarh", date: "09/2020" }
];

export default function App() {
  // helper to scroll to the absolute bottom smoothly
  const scrollToBottom = () => {
    const h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    window.scrollTo({ top: h, behavior: "smooth" });
  };

  // simple "click to reveal" popovers for contact icons
  const [openInfo, setOpenInfo] = useState(null);
  const toggle = (key) => setOpenInfo((prev) => (prev === key ? null : key));

  const IconReveal = ({ id, icon: Icon, label, children }) => (
    <div className="relative">
      <button
        type="button"
        onClick={() => toggle(id)}
        aria-label={label}
        className="p-2 rounded-full bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-gray-800 shadow-sm hover:-translate-y-0.5 hover:shadow transition text-gray-800 dark:text-gray-200"
      >
        <Icon className="text-xl" />
      </button>
      {openInfo === id && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg px-3 py-1.5 text-sm z-20">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-slate-100 to-blue-100 font-sans relative pb-16 scroll-smooth">
      {/* Primary profile section */}
      <HeroSection />

      {/* 🔝 Top-right scroll cue — scrolls ALL the way down */}
      <button
        onClick={scrollToBottom}
        className="fixed top-4 right-4 z-50 group"
        aria-label="Scroll to bottom"
        type="button"
      >
        <div className="p-[2px] rounded-full bg-gradient-to-r from-pink-500 via-blue-500 to-indigo-500 shadow-lg">
          <div className="rounded-full px-3 py-1.5 bg-white/90 backdrop-blur text-gray-900 text-xs font-semibold flex items-center gap-1.5 hover:bg-white transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 translate-y-0.5 group-hover:translate-y-1 transition-transform animate-bounce"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 16l-6-6h12l-6 6z" />
            </svg>
            <span className="hidden md:inline-block tracking-wide">SCROLL</span>
            <span className="md:hidden inline-block">More</span>
          </div>
        </div>
      </button>

      {/* Contact (icons + flags; Canada line, India line) */}
      <div className="text-center -mt-2 mb-6">
        <h1 className="text-3xl font-bold mb-2">Manjit Singh</h1>

        {/* Canada line */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <CA title="Canada" className="w-7 h-auto rounded-[2px] shadow" />
          <span className="text-sm text-gray-600">Canada</span>
          <div className="flex items-center gap-2">
            <IconReveal id="caPhone" icon={FaPhoneAlt} label="Canada phone">
              <a href="tel:+15145491485" className="hover:underline">+1 (514) 549-1485</a>
            </IconReveal>
            <IconReveal id="caEmail" icon={MdEmail} label="Canada email">
              <a href="mailto:manjitsingh07.1998@gmail.com" className="hover:underline">manjitsingh07.1998@gmail.com</a>
            </IconReveal>
            <IconReveal id="linkedin" icon={FaLinkedin} label="LinkedIn">
              <a
                href="https://www.linkedin.com/in/manjit-singh-705996164/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                linkedin.com/in/manjit-singh-705996164
              </a>
            </IconReveal>
          </div>
        </div>

        {/* India line */}
        <div className="flex items-center justify-center gap-3">
          <IN title="India" className="w-7 h-auto rounded-[2px] shadow" />
          <span className="text-sm text-gray-600">India</span>
          <div className="flex items-center gap-2">
            <IconReveal id="inPhone" icon={FaPhoneAlt} label="India phone">
              <a href="tel:+918178573640" className="hover:underline">+91 81785 73640</a>
            </IconReveal>
            <IconReveal id="inEmail" icon={MdEmail} label="India email">
              <a href="mailto:ms6554353@gmail.com" className="hover:underline">ms6554353@gmail.com</a>
            </IconReveal>
          </div>
        </div>
      </div>

      {/* AI Status & Skills */}
      <div id="content" className="flex flex-col items-center mb-6">
        {/* Live AI Badge */}
        <div className="flex items-center mb-3">
          <span className="relative flex h-4 w-4 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
          </span>
          <span className="text-lg font-bold text-green-700">Live: AI is ON</span>
        </div>

        {/* CTA with inward arrows */}
        <div className="flex items-center gap-3 mb-8">
          {/* Left arrow → pointing to button */}
          <span className="hidden sm:inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-pink-500 animate-pulse drop-shadow"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13.5 5.5l-1.4 1.4 4.1 4.1H4v2h12.2l-4.1 4.1 1.4 1.4L20 12 13.5 5.5z" />
            </svg>
          </span>

          {/* The button itself */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
            className="
              inline-flex items-center gap-2
              rounded-xl
              bg-gradient-to-r from-pink-500 via-black to-blue-500
              px-5 py-2.5
              text-white font-semibold shadow-lg
              hover:shadow-pink-500/40 hover:scale-105 transition
            "
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M8 10h8M8 14h5m-9 6l2-2h9a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4v11z" />
            </svg>
            AI gossip: All about Manjit 🔥
          </button>

          {/* Right arrow ← pointing to button */}
          <span className="hidden sm:inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-500 animate-pulse drop-shadow rotate-180"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13.5 5.5l-1.4 1.4 4.1 4.1H4v2h12.2l-4.1 4.1 1.4 1.4L20 12 13.5 5.5z" />
            </svg>
          </span>
        </div>

        {/* Stylish Skills (capped width) */}
        <div className="mx-auto max-w-[50rem] w-full">
          <ul className="flex flex-wrap justify-center gap-2">
            {allSkills.map((skill) => (
              <li
                key={skill}
                className="
                  group select-none
                  rounded-full border border-gray-200 dark:border-gray-700
                  bg-white/70 dark:bg-white/5
                  px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200
                  shadow-sm backdrop-blur
                  hover:shadow-md transition
                  hover:-translate-y-0.5
                "
              >
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 group-hover:scale-110 transition-transform"></span>
                  {skill}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Work Experience */}
      <div className="w-full max-w-3xl px-4 mb-8">
        <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
        <Timeline experience={experience} />
      </div>

      {/* Education */}
      <div className="w-full max-w-3xl px-4 mb-8">
        <h2 className="text-2xl font-bold mb-4">Education</h2>
        <EducationTimeline education={education} />
      </div>

      {/* Resume */}
      <div className="mb-12">
        <div className="flex gap-4 justify-center">
          <DownloadResumeButton />
        </div>
      </div>

      {/* Chat Popup (self-managed) */}
      <ChatPopup />

      {/* Footer */}
      <footer className="w-full text-center text-gray-400 text-xs py-4">
        © 2025 Manjit Singh
      </footer>
    </div>
  );
}
