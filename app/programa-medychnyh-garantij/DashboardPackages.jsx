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

// Темні відтінки — Tailwind slate-* збігаються з палітрою сайту (globals.css):
// slate-900 #0f172a (фон), slate-800 #1e293b (картка), slate-700 #334155 (рамка),
// slate-100 #f1f5f9 (текст), slate-400 #94a3b8, blue-400 #60a5fa (акцент).
// Картки — bg-[#ffffff] (не bg-white), щоб не конфліктувати з `.dark .bg-white`.
const CARD = 'border bg-[#ffffff] dark:bg-slate-800 border-blue-200 dark:border-slate-700';

// Заглушка для тултипа. Пізніше кожному пакету можна додати власне поле `desc`.
const PLACEHOLDER_DESC =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

export default function DashboardPackages({ groups, year }) {
  const [openIndex, setOpenIndex] = useState(null);
  const current = openIndex === null ? null : groups[openIndex];

  return (
    <div className="bg-[#eef2f6] dark:bg-slate-900 p-6 lg:p-10 rounded-b-2xl lg:rounded-b-none lg:rounded-r-2xl">
      <style>{`
        @keyframes pmgFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes pmgFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .pmg-view { animation: pmgFadeIn .25s ease both; }
        .pmg-item { animation: pmgFadeUp .4s cubic-bezier(.16,1,.3,1) both; }

        /* Tooltip — default (mobile / md / lg): above the row, right-aligned, never leaves the panel */
        .pmg-tip {
          position: absolute;
          z-index: 30;
          right: 0;
          bottom: calc(100% + 8px);
          width: 18rem;
          max-width: calc(100% - 1rem);
          opacity: 0;
          pointer-events: none;
          transform: translate(0, 6px);
          transition: opacity .15s ease, transform .15s ease;
        }
        .pmg-row:hover .pmg-tip,
        .pmg-row:focus-within .pmg-tip {
          opacity: 1;
          transform: translate(0, 0);
        }
        /* xl+: room to the right — show it beside the row, no overlap */
        @media (min-width: 1280px) {
          .pmg-tip {
            right: auto;
            bottom: auto;
            left: calc(100% + 14px);
            top: 50%;
            width: 17rem;
            max-width: none;
            transform: translate(8px, -50%);
          }
          .pmg-row:hover .pmg-tip,
          .pmg-row:focus-within .pmg-tip { transform: translate(0, -50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pmg-view, .pmg-item { animation: none !important; }
          .pmg-tip { transition: opacity .15s ease; transform: translate(0, 0); }
          @media (min-width: 1280px) {
            .pmg-tip { transform: translate(0, -50%); }
          }
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
              className={`pmg-item group w-full flex items-center gap-5 rounded-2xl px-6 py-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-blue-400 dark:hover:border-slate-600 ${CARD}`}
            >
              <span className="flex-shrink-0 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <GroupIcon name={g.icon} />
              </span>
              <span className="w-px self-stretch bg-blue-200 dark:bg-slate-700"></span>
              <span className="flex-1 text-[15px] text-slate-700 dark:text-slate-100 leading-snug">{g.title}</span>
              <svg className="w-5 h-5 flex-shrink-0 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Усі напрями
          </button>

          <div className={`flex items-center gap-5 rounded-2xl px-6 py-5 border-blue-300 dark:border-slate-600 ${CARD}`}>
            <span className="flex-shrink-0 text-blue-600 dark:text-blue-400">
              <GroupIcon name={current.icon} />
            </span>
            <span className="w-px self-stretch bg-blue-200 dark:bg-slate-700"></span>
            <span className="flex-1 text-[15px] font-700 text-slate-900 dark:text-slate-100 leading-snug">{current.title}</span>
          </div>

          <div className="flex flex-col gap-2 xl:max-w-[460px]">
            {current.items.map((item, i) => (
              <div
                key={item.no}
                style={{ animationDelay: `${80 + i * 50}ms` }}
                className={`pmg-item pmg-row group/row relative flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm text-slate-700 dark:text-slate-200 leading-snug transition-colors cursor-pointer hover:border-blue-400 dark:hover:border-slate-600 ${CARD}`}
                tabIndex={0}
              >
                <span className="flex-1">{item.name}</span>

                <span className="flex-shrink-0 text-blue-500 dark:text-blue-400 group-hover/row:text-blue-600 dark:group-hover/row:text-blue-300 transition-colors" aria-hidden="true">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>

                {/* Тултип — з правого боку рядка (на вузьких екранах — зверху). Позиція керується CSS .pmg-tip */}
                <span
                  role="tooltip"
                  className="pmg-tip rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300 shadow-xl"
                >
                  {item.desc || PLACEHOLDER_DESC}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500">
            Дата змін: {year} рік. Перелік відповідає додаткам до основного договору з НСЗУ.
          </p>
        </div>
      )}
    </div>
  );
}
