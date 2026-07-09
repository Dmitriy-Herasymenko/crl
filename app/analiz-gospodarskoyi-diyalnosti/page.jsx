import Link from 'next/link';
import { fetchPageBySlug } from '@/lib/wp-api.mjs';
import { extractDocumentLinks } from '@/lib/wp-transform.mjs';

// Data is cached for REVALIDATE_SECONDS and refreshed in the background —
// see app/novyny/page.jsx for why.
const REVALIDATE_SECONDS = 45;

export const metadata = {
  title: 'Аналіз господарської діяльності — Уманська центральна районна лікарня',
  description: 'Аналіз результатів господарської діяльності КНП «Уманська центральна районна лікарня» Паланської територіальної громади.',
};

function fileKind(href) {
  const ext = href.split('.').pop().toLowerCase();
  if (ext === 'xls' || ext === 'xlsx') return { label: 'XLS', colorClass: 'svc-ico2--green' };
  if (ext === 'pdf') return { label: 'PDF', colorClass: 'svc-ico2--blue' };
  return { label: 'Файл', colorClass: 'svc-ico2--gray' };
}

async function getDocuments() {
  const page = await fetchPageBySlug('analiz-gospodarskoyi-diyalnosti', { next: { revalidate: REVALIDATE_SECONDS } });
  if (!page) return [];
  return extractDocumentLinks(page.content.rendered);
}

export default async function AnalizGospodarskoyiDiyalnostiPage() {
  let documents = [];
  let loadError = false;

  try {
    documents = await getDocuments();
  } catch (err) {
    console.error('Failed to load analiz-gospodarskoyi-diyalnosti from uman.crl.net.ua:', err);
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
            <span className="text-white/70">Аналіз господарської діяльності</span>
          </nav>
          <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-5">Публічна інформація</p>
          <h1 className="text-4xl lg:text-5xl font-300 text-white leading-tight">
            Аналіз господарської <span className="font-600">діяльності</span>
          </h1>
          <span className="accent mt-5"></span>
        </div>
      </section>

      {/* ══════════ DOCUMENTS ══════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="reveal max-w-3xl mb-10">
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4">Звіти та документи</p>
            <h2 className="text-2xl sm:text-3xl font-600 text-gray-900 leading-snug">
              Аналіз результатів господарської діяльності КНП «Уманська ЦРЛ»
            </h2>
          </div>

          {loadError ? (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">Не вдалося завантажити документи — сайт лікарні тимчасово недоступний.</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">Документів не знайдено.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {documents.map((doc, i) => {
                const kind = fileKind(doc.href);
                return (
                  <a
                    key={doc.href}
                    href={doc.href}
                    target="_blank"
                    rel="noopener"
                    className={`svc-card2 reveal${i % 4 === 1 ? ' d1' : i % 4 === 2 ? ' d2' : i % 4 === 3 ? ' d3' : ''}`}
                  >
                    <span className={`svc-ico2 ${kind.colorClass}`}>
                      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </span>
                    <div className="svc-body">
                      <h3 className="svc-name">{doc.title}</h3>
                    </div>
                    <div className="svc-footer">
                      <span className="svc-link">Переглянути {kind.label}</span>
                      <svg className="svc-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
