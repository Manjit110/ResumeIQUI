import React from "react";
import { MdSchool } from "react-icons/md";

/**
 * items: Array<{
 *   degree: string,
 *   school: string,
 *   location?: string,
 *   date?: string,
 *   logo?: string  // e.g., process.env.PUBLIC_URL + "/logos/concordia.png"
 * }>
 */
export default function EducationGrid({ items = [] }) {
  if (!items.length) return null;

  const Crest = ({ src, alt }) =>
    src ? (
      <img
        src={src}
        alt={`${alt} crest`}
        className="h-9 w-9 rounded-lg object-contain bg-white ring-1 ring-slate-200 p-1 shadow-sm"
      />
    ) : (
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow">
        <MdSchool />
      </span>
    );

  return (
    <section className="w-full max-w-3xl px-4 mb-10">
      <h2 className="text-2xl font-bold mb-4">Education</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((ed, i) => (
          <div
            key={`${ed.school}-${i}`}
            className="rounded-xl border border-slate-200 bg-white/90 backdrop-blur shadow-sm p-4 flex items-start gap-3"
          >
            <Crest src={ed.logo} alt={ed.school} />
            <div className="min-w-0">
              <div className="font-semibold text-slate-900">{ed.degree}</div>
              <div className="text-sm text-slate-600">{ed.school}</div>
              {(ed.location || ed.date) && (
                <div className="text-xs text-slate-500">
                  {ed.location ? ed.location : ""}
                  {ed.location && ed.date ? " • " : ""}
                  {ed.date ? ed.date : ""}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
