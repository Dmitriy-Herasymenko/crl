import Link from 'next/link';
import { DEPARTMENTS } from '@/lib/departments';

export const metadata = {
  title: 'Відділення — Уманська центральна районна лікарня',
  description: 'Відділення КНП «Уманська ЦРЛ» Паланської сільської ради: завідувачі, напрямки роботи та графіки прийому.',
};

export default function DepartmentsPage() {
  return (
    <>
      {/* ══════════ PAGE HEADER ══════════ */}
      <section className="page-header-section relative pt-40 pb-16 lg:pt-48 lg:pb-20 bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"></div>
        <div className="absolute top-1/2 right-[6%] -translate-y-1/2 hidden xl:flex items-center justify-center opacity-[0.06]">
          <svg className="w-72 h-72 text-white" fill="currentColor" viewBox="0 0 100 100">
            <rect x="38" y="5" width="24" height="90" rx="4" />
            <rect x="5" y="38" width="90" height="24" rx="4" />
          </svg>
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-white/40 mb-6" aria-label="Хлібні крихти">
            <Link href="/" className="hover:text-white/70 transition-colors">Головна</Link>
            <span>/</span>
            <span className="text-white/70">Про лікарню</span>
            <span>/</span>
            <span className="text-white/70">Відділення</span>
          </nav>
          <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-5">Про лікарню</p>
          <h1 className="text-4xl lg:text-5xl font-300 text-white leading-tight">
            Відділення <span className="font-600">лікарні</span>
          </h1>
          <span className="accent mt-5"></span>
        </div>
      </section>

      {/* ══════════ DEPARTMENTS GRID ══════════ */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.map((dept, i) => (
              <Link
                key={dept.slug}
                href={`/viddilennya/${dept.slug}`}
                className={`news-card rounded-xl overflow-hidden bg-white block reveal${i % 3 === 1 ? ' d1' : i % 3 === 2 ? ' d2' : ''}`}
              >
                <img src={dept.image} alt={dept.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-base font-semibold text-gray-800 leading-snug mb-2">{dept.shortName || dept.name}</h3>
                  {dept.head && <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{dept.head}</p>}
                  <span className="mt-4 text-xs text-blue-700 font-medium flex items-center gap-1.5">
                    Детальніше
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
