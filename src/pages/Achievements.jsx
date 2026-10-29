// src/pages/Achievements.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown, FiArrowLeft } from "react-icons/fi";
import ParticleBackground from "../components/ParticleBackground";
import ChatPopup from "../components/ChatPopup";

const achievements = [
  {
    tag: "Modernization",
    title: "Platform Modernization — Java 8→17, Spring Boot 2→3",
    situation:
      "A suite of core capital markets microservices was running on an aging Java 8 / Spring Boot 2 stack, accumulating legacy dependency and performance issues.",
    action:
      "Led the migration to Java 17 and Spring Boot 3 — moved Joda-Time to the Java Time API and javax.* packages to jakarta.* for Jakarta EE compliance. Ran the old and new environments in parallel and built automated benchmarking scripts (70+ APIs) with QA to validate performance before cutover.",
    result:
      "~20% improvement in boot time and API response time, with the platform positioned for long-term support.",
  },
  {
    tag: "Performance",
    title: "Market Data Latency Reduction (30%)",
    situation:
      "Pricing data from Bloomberg/FISBONDS took as long as 6 minutes end-to-end to reach internal systems, with heavy per-price database lookups driving the delay.",
    action:
      "Optimized long-running SQL queries (explain plans, index scans, unnecessary joins) alongside the DB developer, and introduced a Redis caching layer storing the last-sent state per security/price/position — replacing a 1–5 minute DB-polling cron model with cache comparison on arrival.",
    result:
      "~30% improvement in API response times and price distribution cut from 6 minutes to under 4 minutes, improving responsiveness to market events.",
  },
  {
    tag: "Cost Savings",
    title: "Legacy Decommissioning — Gloss → Arrow",
    situation:
      "Broadridge Gloss, the back-office trade settlement system, cost over $100K annually with functionality largely duplicated by a cheaper alternative.",
    action:
      "Worked with BAs and the trade settlement team to confirm Fixed Income trade types (bonds, repos) had no functional blockers moving to Paramax Arrow. Built microservices publishing settlement messages to Solace, bridged into Arrow via MQBridge, and executed a phased, validated cutover.",
    result:
      "Gloss fully decommissioned — annual cost dropped from $100K+ to under $50K, with zero disruption to trade settlement.",
  },
  {
    tag: "Internal Tooling",
    title: "Self-Service Reporting Framework (pluggable)",
    situation:
      "Business analysts manually ran ad-hoc DB queries and emailed Excel reports to stakeholders — a process that grew error-prone and unsustainable as report volume increased.",
    action:
      "Designed a metadata-driven framework: a GUI where BAs define report name, data source (SQL/API), format (CSV/JSON/XML), and delivery channel (email/SFTP) — picked up automatically by existing AutoSys schedules with no code changes or redeploys required to add a report.",
    result:
      "100+ reports now delivered reliably on schedule, with zero dev involvement needed to onboard a new one.",
  },
  {
    tag: "Architecture",
    title: "Event-Driven Architecture & Secure Vendor Integration",
    situation:
      "Trades, prices, positions, and security updates needed real-time internal distribution, plus controlled external delivery to vendors — without exposing internal infrastructure.",
    action:
      "Used Solace PubSub+ for internal real-time event distribution, and introduced an MQBridge (ActiveMQ) layer as a security and protocol-translation boundary for all external vendor traffic.",
    result:
      "Internal topics are never exposed directly to external networks — an industry-standard pattern for secure, regulated cross-network integration in capital markets.",
  },
  {
    tag: "Security",
    title: "Infrastructure Security & High Availability",
    situation:
      "Production APIs were directly exposed with no reverse proxy, load balancer, or IP restrictions — lower environments (UAT/DEV) were even observed hitting production endpoints.",
    action:
      "Introduced IP whitelisting at the gateway, F5 as the SSL-terminating front door, and NGINX as a reverse proxy managing active-passive failover between nodes.",
    result:
      "Eliminated unauthorized cross-environment traffic, reduced load on sensitive APIs, and improved uptime and failover handling.",
  },
  {
    tag: "DevOps",
    title: "CI/CD Automation — GitHub Actions + JFrog Artifactory",
    situation:
      "Deployments required manual SSH and server-level intervention across Dev, UAT, and Prod environments.",
    action:
      "Standardized GitHub Actions workflows across services to build snapshot/release artifacts, run unit tests, and publish to JFrog Artifactory — a version bump alone triggers deployment to the correct environment.",
    result:
      "Fully automated, repeatable build-and-deploy pipeline with consistent artifact versioning and faster release cycles.",
  },
  {
    tag: "Incident Response",
    title: "Production Incident — 2 a.m. Date-Roll Failure",
    situation:
      "A late, misnamed Bloomberg end-of-day file caused the nightly date-roll job to fail, blocking the entire downstream AutoSys chain that London and Hong Kong trading depended on.",
    action:
      "Diagnosed the root cause from logs alone at 2 a.m., coordinated with QA (who held elevated prod access) to safely rerun the job once the file was confirmed in place, then built a File Watcher AutoSys job so the date-roll can never fire again without a confirmed file.",
    result:
      "Resolved with no business loss or data inconsistency — the File Watcher fix became a standard, permanent part of the job chain.",
  },
  {
    tag: "Compliance",
    title: "Regulatory Compliance Delivery — SEC B2C/B2B Split",
    situation:
      "An updated U.S. SEC rule required separating B2C and B2B flows for foreign trading accounts.",
    action:
      "Designed and delivered the flow separation — CIBC was the first institution to implement the change.",
    result:
      "The new flow carried $6 billion in trades in its first month in production.",
  },
  {
    tag: "Internal Tooling",
    title: "Dynamic Client Onboarding — Central Bank Clients",
    situation:
      "Central bank clients (Bank of Israel, Reserve Bank of India) required trade confirmations, but onboarding new client data required waiting for the next scheduled database release cycle — delaying confirmations.",
    action:
      "Built a GUI with a front-end developer letting internal teams view, update, and onboard client details live, wired directly into the reporting engine so confirmation PDFs reflected the latest data instantly.",
    result:
      "Removed the release-cycle dependency entirely, delivered within a single additional sprint, and empowered internal teams to self-serve.",
  },
  {
    tag: "Delivery Under Pressure",
    title: "300+ AutoSys Job Migration Under a Hard Deadline",
    situation:
      "IBM Solaris licensing was expiring, creating a hard mid-September deadline to migrate 300+ AutoSys jobs (each tied to its own shell script) to RHEL with zero downtime — while still new to the team.",
    action:
      "Rapidly familiarized with 300+ processes, rewrote and validated scripts for Linux compatibility, configured and tested each job under the new environment, and coordinated BA/QA parity testing.",
    result:
      "Completed on time with zero cutover issues — became the team's go-to person for infrastructure questions afterward.",
  },
];

function AchievementCard({ item, open, onToggle }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/90 backdrop-blur shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 p-4 text-left"
      >
        <div>
          <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-indigo-600 bg-indigo-50 rounded-full px-2.5 py-1 mb-2">
            {item.tag}
          </span>
          <div className="font-semibold text-slate-900">{item.title}</div>
        </div>
        <FiChevronDown
          className={`shrink-0 text-xl text-slate-600 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 -mt-1 space-y-3 text-[15px] text-slate-800">
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">
              Situation
            </div>
            <p>{item.situation}</p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">
              Action
            </div>
            <p>{item.action}</p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">
              Result
            </div>
            <p className="font-medium text-slate-900">{item.result}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Achievements() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col items-center bg-gradient-to-b from-blue-50 to-blue-100 font-sans relative pb-16">
      <ParticleBackground />

      <div className="relative z-10 w-full max-w-3xl px-4 pt-10 flex flex-col items-center">
        <Link
          to="/"
          className="self-start inline-flex items-center gap-1.5 text-sm font-medium text-indigo-700 hover:text-indigo-900 mb-6"
        >
          <FiArrowLeft /> Back to portfolio
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">
          Detailed Case Studies & Achievements
        </h1>
        <p className="text-slate-600 text-center mb-8 max-w-xl">
          A deeper look at the problems behind the resume bullets — what the
          situation was, what I actually did, and what it measurably changed.
        </p>

        <div className="w-full space-y-3 mb-10">
          {achievements.map((item, idx) => (
            <AchievementCard
              key={item.title}
              item={item}
              open={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>

      <ChatPopup />
    </div>
  );
}
