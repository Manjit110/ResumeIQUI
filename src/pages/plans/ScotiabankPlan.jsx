// src/pages/plans/ScotiabankPlan.jsx
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ParticleBackground from "../../components/ParticleBackground";

const mapping = [
  {
    req: "Java 17, Spring Boot 3, REST APIs, microservices",
    note: "Direct match — led this exact migration at CIBC.",
    level: "match",
  },
  {
    req: "CI/CD (GitHub Actions)",
    note: "Direct match — standardized CI/CD across core microservices.",
    level: "match",
  },
  {
    req: "Event streaming (Kafka / Pub-Sub)",
    note: "Adjacent — deep Solace PubSub+/MQBridge experience (topics, bridging, replayability); Kafka's API surface (consumer groups, partitions, offsets) is the fast ramp-up.",
    level: "adjacent",
  },
  {
    req: "App security (OAuth 2.0, SSO)",
    note: "Adjacent — built access-control/security boundaries (IP whitelisting, F5/NGINX, secure MQ bridging), not auth-protocol implementation specifically. The real gap to close in week 1.",
    level: "adjacent",
  },
  {
    req: "Kubernetes / Cloud Foundry",
    note: "Adjacent — strong Docker/Podman containerization experience (including rootless security model); orchestration layer itself is new.",
    level: "adjacent",
  },
  {
    req: "MongoDB",
    note: "New — database depth is Oracle/relational; NoSQL is a genuine gap to close.",
    level: "gap",
  },
];

const phases = [
  {
    phase: "Phase 1 — Domain & Gap-Closing",
    weeks: [
      {
        label: "Week 1",
        points: [
          "Get environment/access set up; meet the auth-domain team and understand which services I'll own.",
          "Start closing the OAuth 2.0/SSO gap immediately — read the internal auth architecture docs, trace one real login/token flow end-to-end, and pair with a teammate on an SSO-related ticket.",
        ],
      },
      {
        label: "Week 2",
        points: [
          "Map the Kafka topics/consumers my team owns and how they differ structurally from Solace (consumer groups, partitions, offsets vs. topics/queues) — the event-driven thinking already transfers.",
          "Start a lightweight Kubernetes primer in parallel — I containerized with Docker/Podman at CIBC; orchestration is the new layer on top of that.",
        ],
      },
    ],
  },
  {
    phase: "Phase 2 — Early Contribution",
    weeks: [
      {
        label: "Week 3",
        points: [
          "Ship first PR — ideally touching the auth service, even a small fix, to force fluency with the OAuth2/SSO codebase hands-on rather than staying theoretical.",
        ],
      },
      {
        label: "Week 4",
        points: [
          "Take a Kafka producer/consumer ticket independently.",
          "Get a Kubernetes deployment through the pipeline (even to a dev namespace) to close the orchestration gap hands-on.",
        ],
      },
    ],
  },
  {
    phase: "Phase 3 — Building Momentum",
    weeks: [
      {
        label: "Week 5",
        points: [
          "Own a medium-complexity feature in the auth domain end-to-end — e.g. a token-refresh edge case, session-management improvement, or SSO integration for a new consuming app.",
        ],
      },
      {
        label: "Week 6",
        points: [
          "Deliver it through QA/UAT.",
          "Start looking for a performance or reliability gap in the auth path — auth services are typically hot-path and latency-sensitive, a natural fit for the same instinct that found the DB-polling bottleneck at CIBC.",
        ],
      },
    ],
  },
  {
    phase: "Phase 4 — Technical Ownership",
    weeks: [
      {
        label: "Week 7",
        points: [
          "Propose one focused improvement — e.g. caching for token validation lookups (same pattern as the Redis work that cut price-distribution latency from 6 to 4 minutes at CIBC), or hardening API access boundaries (same playbook as the IP-whitelisting/F5 work).",
        ],
      },
      {
        label: "Week 8",
        points: [
          "Implement it with before/after benchmarks captured — same validation approach used for the Java 17/Spring Boot 3 migration.",
        ],
      },
    ],
  },
  {
    phase: "Phase 5 — Value Delivery",
    weeks: [
      {
        label: "Week 9",
        points: [
          "Roll the improvement to production with monitoring/alerting in place.",
          "Write the runbook — same instinct that produced the File Watcher fix after the CIBC 2 a.m. incident, so the fix doesn't depend on me being the only one who understands it.",
        ],
      },
      {
        label: "Week 10",
        points: [
          "Quantify and share the impact with the team. By now, Kafka, basic Kubernetes operations, and the OAuth2/SSO codebase should be working knowledge, not just \"ramping up.\"",
        ],
      },
    ],
  },
  {
    phase: "Phase 6 — Strategic Contribution & Review",
    weeks: [
      {
        label: "Week 11",
        points: [
          "90-day retrospective with my manager — what shipped, what I learned about the auth domain specifically, honest read on where I still need depth (likely MongoDB).",
        ],
      },
      {
        label: "Week 12",
        points: [
          "Propose next-quarter focus areas — deepening MongoDB/NoSQL if the role needs it, and taking on larger Kubernetes-orchestrated service ownership.",
        ],
      },
    ],
  },
];

const levelStyle = {
  match: "bg-emerald-50 text-emerald-700 border-emerald-200",
  adjacent: "bg-amber-50 text-amber-700 border-amber-200",
  gap: "bg-rose-50 text-rose-700 border-rose-200",
};

const levelLabel = {
  match: "Direct match",
  adjacent: "Adjacent — fast ramp",
  gap: "New",
};

export default function ScotiabankPlan() {
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

        <span className="text-[11px] font-semibold uppercase tracking-wide text-indigo-600 bg-indigo-50 rounded-full px-3 py-1 mb-3">
          Prepared for Scotiabank
        </span>
        <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">
          90-Day Plan — Software Engineer, Digital Banking &amp; Authentication
        </h1>
        <p className="text-slate-600 text-center mb-10 max-w-xl">
          A week-by-week plan for the first 90 days, built around the role's
          actual requirements rather than a generic onboarding template.
        </p>

        {/* JD mapping table */}
        <section className="w-full mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Where my experience maps to this role
          </h2>
          <div className="space-y-2">
            {mapping.map((row) => (
              <div
                key={row.req}
                className="rounded-xl border border-slate-200 bg-white/90 backdrop-blur shadow-sm p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <div className="font-semibold text-slate-900 text-sm">
                    {row.req}
                  </div>
                  <span
                    className={`shrink-0 text-[11px] font-semibold rounded-full border px-2.5 py-0.5 ${levelStyle[row.level]}`}
                  >
                    {levelLabel[row.level]}
                  </span>
                </div>
                <p className="text-sm text-slate-700">{row.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Week-by-week timeline */}
        <section className="w-full">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Week-by-week timeline
          </h2>
          <div className="relative pl-6 border-l-2 border-indigo-200 space-y-8">
            {phases.map((p) => (
              <div key={p.phase}>
                <div className="relative mb-3">
                  <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 ring-4 ring-blue-50" />
                  <h3 className="font-bold text-slate-900">{p.phase}</h3>
                </div>
                <div className="space-y-3">
                  {p.weeks.map((w) => (
                    <div
                      key={w.label}
                      className="rounded-xl border border-slate-200 bg-white/90 backdrop-blur shadow-sm p-4"
                    >
                      <div className="text-xs font-bold uppercase tracking-wide text-indigo-600 mb-2">
                        {w.label}
                      </div>
                      <ul className="list-disc pl-5 space-y-1.5 text-[15px] text-slate-800">
                        {w.points.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
