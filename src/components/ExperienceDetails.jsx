import React, { useState } from "react";
import { MdWork } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";

/**
 * items: Array<{
 *   role: string,
 *   company: string,
 *   location?: string,
 *   dates?: string,
 *   details?: string[],
 *   logo?: string   // e.g., process.env.PUBLIC_URL + "/logos/cibc.png"
 * }>
 */
export default function ExperienceDetails({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const Logo = ({ src, alt }) =>
    src ? (
      <img
        src={src}
        alt={`${alt} logo`}
        className="h-9 w-9 rounded-lg object-contain bg-white ring-1 ring-slate-200 p-1 shadow-sm"
      />
    ) : (
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-blue-500 text-white shadow">
        <MdWork />
      </span>
    );

  return (
    <section className="w-full max-w-3xl px-4 mb-10">
      <h2 className="text-2xl font-bold mb-4">Experience — Details</h2>

      <div className="space-y-3">
        {items.map((job, idx) => {
          const open = openIndex === idx;
          return (
            <div
              key={`${job.company}-${idx}`}
              className="rounded-xl border border-slate-200 bg-white/90 backdrop-blur shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : idx)}
                className="w-full flex items-center justify-between gap-3 p-4 text-left"
              >
                <div className="flex items-start gap-3">
                  <Logo src={job.logo} alt={job.company} />
                  <div>
                    <div className="font-semibold text-slate-900">{job.role}</div>
                    <div className="text-sm text-slate-600">
                      {job.company}
                      {job.location ? ` • ${job.location}` : ""}
                    </div>
                    {job.dates && (
                      <div className="text-xs text-slate-500">{job.dates}</div>
                    )}
                  </div>
                </div>
                <FiChevronDown
                  className={`text-xl text-slate-600 transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>

              {open && job.details?.length > 0 && (
                <div className="px-5 pb-4 -mt-1">
                  <ul className="list-disc pl-5 space-y-2 text-[15px] text-slate-800">
                    {job.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
