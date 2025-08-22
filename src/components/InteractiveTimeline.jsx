import React from "react";
import { MdWork } from "react-icons/md";

export default function InteractiveTimeline({ items = [] }) {
  if (!items.length) return null;

  // Shared card content (uniform height + tidy wrapping)
  const Card = ({ item }) => (
    <article
      className="
        relative z-10 rounded-xl border border-slate-200 bg-white/90 shadow hover:shadow-md transition
        p-4
        min-h-[140px] flex
      "
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-blue-500 text-white shadow">
          <MdWork />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-slate-900 break-words whitespace-normal leading-snug line-clamp-2">
            {item.role}
          </h3>
          <p className="text-sm text-slate-600 break-words whitespace-normal leading-snug">
            {item.company}{item.location ? ` • ${item.location}` : ""}
          </p>
          {item.dates && (
            <p className="text-xs text-slate-500 mt-1 break-words whitespace-normal leading-snug">
              {item.dates}
            </p>
          )}
        </div>
      </div>
    </article>
  );

  return (
    <section className="w-full mb-12">
      {/* Title centered */}
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Career Journey</h2>
      </div>

      {/* ---------- Mobile: full-bleed horizontal (kept as-is since it works) ---------- */}
      <div
        className="
          md:hidden
          relative w-screen max-w-screen
          rounded-2xl border border-slate-200 bg-white/70 backdrop-blur shadow-sm
          overflow-hidden
        "
      >
        <div className="pointer-events-none absolute top-1/2 left-0 right-0 h-[3px] bg-gradient-to-r from-pink-400 via-indigo-400 to-blue-400 -translate-y-1/2" />
        <div
          className="
            w-screen max-w-screen
            overflow-x-auto no-scrollbar ios-bounce touch-pan-x scroll-smooth
            px-4
          "
          aria-label="Interactive career timeline"
        >
          <div className="inline-flex w-max gap-4 py-4">
            {items.map((item, idx) => (
              <div
                key={`${item.company}-${idx}`}
                className="shrink-0 w-[85vw] relative"
              >
                <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-indigo-400 shadow" />
                <Card item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Desktop/Tablet: centered container, NOT full-bleed ---------- */}
      <div className="hidden md:block">
        <div
          className="
            relative mx-auto max-w-5xl
            rounded-2xl border border-slate-200 bg-white/70 backdrop-blur shadow-sm
            overflow-hidden
          "
        >
          <div className="pointer-events-none absolute top-1/2 left-0 right-0 h-[3px] bg-gradient-to-r from-pink-400 via-indigo-400 to-blue-400 -translate-y-1/2" />
          <div
            className="
              w-full overflow-x-auto no-scrollbar scroll-smooth px-4
            "
            aria-label="Interactive career timeline"
          >
            <div className="inline-flex w-max gap-6 py-4">
              {items.map((item, idx) => (
                <div
                  key={`${item.company}-${idx}`}
                  className="shrink-0 w-[22rem] relative"
                >
                  <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-indigo-400 shadow" />
                  <Card item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
