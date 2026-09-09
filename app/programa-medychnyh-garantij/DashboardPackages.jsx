'use client';

import { useState } from 'react';

function GroupIcon({ name }) {
  const p = { className: 'w-7 h-7', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, viewBox: '0 0 24 24', strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'bed':
      return <svg {...p}><path d="M3 8v11M3 13h15a3 3 0 013 3v3M3 19h18M7 12h4" /></svg>;
    case 'pulse':
      return <svg {...p}><path d="M3 12h4l2-6 4 12 2-6h6" /></svg>;
    case 'baby':
      return <svg {...p}><circle cx="12" cy="5" r="2" /><path d="M9 12a3 3 0 006 0M6 21v-2a6 6 0 0112 0v2" /></svg>;
    case 'tooth':
      return <svg {...p}><path d="M7 4c-2 0-3 2-3 4 0 3 1 4 1.5 7S6 20 7.5 20 8 16 9 16s.5 4 2 4 1.5-2 2-5 1-4 1-7c0-2-1-4-3-4-1.5 0-2 1-3 1s-1.5-1-3-1z" /></svg>;
    case 'scan':
      return <svg {...p}><path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2M4 12h16" /></svg>;
    case 'heart':
      return <svg {...p}><path d="M12 20s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 10c0 5.65-7 10-7 10z" /></svg>;
    case 'brain':
      return <svg {...p}><path d="M9 4a2.5 2.5 0 00-2.5 2.5A3 3 0 004 9.5a3 3 0 00.5 5A3 3 0 009 18.5V4zM15 4a2.5 2.5 0 012.5 2.5A3 3 0 0120 9.5a3 3 0 01-.5 5A3 3 0 0115 18.5V4z" /></svg>;
    case 'clipboard':
      return <svg {...p}><path d="M9 4h6v3H9zM8 5H6a1 1 0 00-1 1v13a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1h-2M9 12h6M9 16h4" /></svg>;
    default:
      return null;
  }
}

export default function DashboardPackages({ groups, year }) {
  const [openIndex, setOpenIndex] = useState(null);
  const current = openIndex === null ? null : groups[openIndex];

  return (
    <div className="bg-[#eef2f6] p-6 lg:p-10">
      <style>{`
        @keyframes pmgFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes pmgFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .pmg-view { animation: pmgFadeIn .25s ease both; }
        .pmg-item { animation: pmgFadeUp .4s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .pmg-view, .pmg-item { animation: none !important; }
        }
      `}</style>
      {current === null ? (
        /* ── List of group tiles ── */
        <div key="list" className="pmg-view flex flex-col gap-4">
          {groups.map((g, i) => (
            <button
              key={g.title}
              type="button"
              onClick={() => setOpenIndex(i)}
              style={{ animationDelay: `${i * 45}ms` }}
              className="pmg-item group w-full flex items-center gap-5 rounded-2xl border border-blue-200 bg-white px-6 py-5 text-left transition-all duration-200 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="flex-shrink-0 text-slate-600 group-hover:text-blue-600 transition-colors">
                <GroupIcon name={g.icon} />
              </span>
              <span className="w-px self-stretch bg-blue-200"></span>
              <span className="flex-1 text-[15px] text-slate-700 leading-snug">{g.title}</span>
              <svg className="w-5 h-5 flex-shrink-0 text-slate-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      ) : (
        /* ── Selected group: sub-items ── */
        <div key={`grp-${openIndex}`} className="pmg-view flex flex-col gap-4">
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Усі напрями
          </button>

          <div className="flex items-center gap-5 rounded-2xl border border-blue-300 bg-white px-6 py-5">
            <span className="flex-shrink-0 text-blue-600">
              <GroupIcon name={current.icon} />
            </span>
            <span className="w-px self-stretch bg-blue-200"></span>
            <span className="flex-1 text-[15px] font-700 text-slate-900 leading-snug">{current.title}</span>
          </div>

          <div className="flex flex-col gap-2">
            {current.items.map((item, i) => (
              <div
                key={item.no}
                style={{ animationDelay: `${80 + i * 50}ms` }}
                className="pmg-item rounded-xl border border-blue-200/70 bg-white px-5 py-3.5 text-sm text-slate-700 leading-snug"
              >
                {item.name}
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400">
            Дата змін: {year} рік. Перелік відповідає додаткам до основного договору з НСЗУ.
          </p>
        </div>
      )}
    </div>
  );
}
