import React from "react";
import { MdWork } from "react-icons/md";

/**
 * Props:
 *  - items: Array<{
 *      role: string,
 *      company: string,
 *      location?: string,
 *      dates?: string,
 *      details?: string[]   // optional, shown in tooltip/expandable later if you want
 *    }>
 *
 * Usage:
 *   <InteractiveTimeline items={experience} />
 */
export default function InteractiveTimeline({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="w-full max-w-5xl px-4 mb-12">
      <h2 className="text-2xl font-bold mb-4">Career Journey</h2>

      <div
        className="
          relative rounded-2xl border border-slate-200 bg-white/70 backdrop-blur
          shadow-sm overflow-hidden
        "
      >
        {/* “Subway line” background */}
        <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-gradient-to-r from-pink-400 via-indigo-400 to-blue-400 -translate-y-1/2 pointer-events-none" />

        {/* Horizontal scroller */}
        <div
          className="
            overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory
            flex gap-6 p-5
          "
          aria-label="Interactive career timeline"
        >
          {items.map((item, idx) => (
            <div
              key={`${item.company}-${idx}`}
              className="
                snap-center shrink-0
                min-w-[18rem] sm:min-w-[22rem]
                relative
              "
            >
              {/* Connector bumps sit behind the card */}
              <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-indigo-400 shadow" />

              {/* Stop node */}
              <div className="relative z-10 mx-auto max-w-sm">
                <div
                  className="
                    rounded-xl border border-slate-200 bg-white/90
                    shadow hover:shadow-md transition
                    p-4
                  "
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-blue-500 text-white shadow">
                        <MdWork />
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-slate-900">
                        {item.role}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {item.company}
                        {item.location ? ` • ${item.location}` : ""}
                      </p>
                      {item.dates && (
                        <p className="text-xs text-slate-500 mt-1">{item.dates}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* End spacer so the last card can center nicely */}
          <div className="shrink-0 w-4" />
        </div>
      </div>
    </section>
  );
}
