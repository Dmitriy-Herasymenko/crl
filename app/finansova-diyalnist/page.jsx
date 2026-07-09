import Link from 'next/link';
import { fetchPageBySlug } from '@/lib/wp-api.mjs';
import { extractYearGroupedDocuments } from '@/lib/wp-transform.mjs';
import YearAccordion from '@/components/YearAccordion';

// Data is cached for REVALIDATE_SECONDS and refreshed in the background —
// see app/novyny/page.jsx for why.
const REVALIDATE_SECONDS = 45;

export const metadata = {
  title: 'Фінансова діяльність — Уманська центральна районна лікарня',
  description: 'Фінансові плани та звіти про їх виконання КНП «Уманська центральна районна лікарня» Паланської територіальної громади за роками.',
};

async function getGroups() {
  const page = await fetchPageBySlug('finansova-diyalnist', { next: { revalidate: REVALIDATE_SECONDS } });
  if (!page) return [];
  return extractYearGroupedDocuments(page.content.rendered);
}

export default async function FinansovaDiyalnistPage() {
  let groups = [];
  let loadError = false;

  try {
    groups = await getGroups();
  } catch (err) {
    console.error('Failed to load finansova-diyalnist from uman.crl.net.ua:', err);
    loadError = true;
  }

  return (
    <>
      {/* ══════════ PAGE HEADER ══════════ */}
      <section className="page-header-section relative pt-40 pb-16 lg:pt-48 lg:pb-20 bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"></div>
        <div className="absolute top-1/2 right-[6%] -translate-y-1/2 hidden xl:flex items-center justify-center opacity-[0.06]">
          <svg className="w-72 h-72 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Хлібні крихти">
            <Link href="/" className="hover:text-white/70 transition-colors">Головна</Link>
            <span>/</span>
            <span className="text-white/70">Фінансова діяльність</span>
          </nav>
          <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-5">Публічна інформація</p>
          <h1 className="text-4xl lg:text-5xl font-300 text-white leading-tight">
            Фінансова <span className="font-600">діяльність</span>
          </h1>
          <span className="accent mt-5"></span>
        </div>
      </section>

      {/* ══════════ DOCUMENTS BY YEAR ══════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="reveal max-w-3xl mb-12">
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4">Фінансові плани та звіти</p>
            <h2 className="text-2xl sm:text-3xl font-600 text-gray-900 leading-snug">
              Фінансові плани та звіти про їх виконання КНП «Уманська ЦРЛ»
            </h2>
          </div>

          {loadError ? (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">Не вдалося завантажити документи — сайт лікарні тимчасово недоступний.</p>
            </div>
          ) : groups.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">Документів не знайдено.</p>
            </div>
          ) : (
            <YearAccordion groups={groups} />
          )}
        </div>
      </section>
    </>
  );
}
