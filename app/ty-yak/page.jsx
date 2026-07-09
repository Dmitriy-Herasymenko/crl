import Link from 'next/link';
import { fetchPosts } from '@/lib/wp-api.mjs';
import { CATEGORY_TY_YAK, transformPost } from '@/lib/wp-transform.mjs';
import NewsSearchInput from '@/components/NewsSearchInput';

// Data is cached for REVALIDATE_SECONDS and refreshed in the background —
// see app/novyny/page.jsx for why.
const REVALIDATE_SECONDS = 45;

export const metadata = {
  title: 'Ти як? — Уманська центральна районна лікарня',
  description: 'Рубрика «Ти як?» КНП «Уманська ЦРЛ»: матеріали про ментальне здоров’я та психологічну підтримку.',
};

const PER_PAGE = 12;
const BASE_PATH = '/ty-yak';

function mapImageUrl(wpUrl) {
  return `/api/media?src=${encodeURIComponent(wpUrl)}`;
}

function highlightText(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="bg-yellow-200 text-gray-900 rounded px-0.5">{part}</mark>
      : part
  );
}

function buildHref({ sort, q, page }) {
  const sp = new URLSearchParams();
  if (sort && sort !== 'newest') sp.set('sort', sort);
  if (q) sp.set('q', q);
  if (page && page !== 1) sp.set('page', String(page));
  const qs = sp.toString();
  return qs ? `${BASE_PATH}?${qs}` : BASE_PATH;
}

function pageNumbers(current, totalPages) {
  const pages = new Set([1, totalPages, current, current - 1, current + 1]);
  return [...pages]
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);
}

export default async function TyYakPage({ searchParams }) {
  const sp = await searchParams;
  const sort = sp.sort === 'oldest' ? 'oldest' : 'newest';
  const q = (sp.q || '').trim();
  const page = Math.max(1, parseInt(sp.page, 10) || 1);

  let posts = [];
  let total = 0;
  let totalPages = 0;
  let loadError = false;

  try {
    const result = await fetchPosts(
      {
        categoryIds: [CATEGORY_TY_YAK],
        page,
        perPage: PER_PAGE,
        search: q,
        order: sort === 'oldest' ? 'asc' : 'desc',
      },
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    posts = result.posts.map((post) => transformPost(post, mapImageUrl));
    total = result.total;
    totalPages = result.totalPages;
  } catch (err) {
    console.error('Failed to load ty-yak from uman.crl.net.ua:', err);
    loadError = true;
  }

  const pages = pageNumbers(page, totalPages);

  return (
    <>
      {/* ══════════ PAGE HEADER ══════════ */}
      <section className="page-header-section relative pt-40 pb-16 lg:pt-48 lg:pb-20 bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"></div>
        <div className="absolute top-1/2 right-[6%] -translate-y-1/2 hidden xl:flex items-center justify-center opacity-[0.06]">
          <svg className="w-72 h-72 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Хлібні крихти">
            <Link href="/" className="hover:text-white/70 transition-colors">Головна</Link>
            <span>/</span>
            <span className="text-white/70">Ти як?</span>
          </nav>
          <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-5">Ментальне здоров’я та підтримка</p>
          <h1 className="text-4xl lg:text-5xl font-300 text-white leading-tight">
            Ти <span className="font-600">як?</span>
          </h1>
          <span className="accent mt-5"></span>
        </div>
      </section>

      {/* ══════════ FILTERS ══════════ */}
      <section className="pt-12 pb-4 lg:pt-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-end gap-5 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <NewsSearchInput initialQuery={q} sort={sort} basePath={BASE_PATH} />

              <div className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-full p-1 shadow-sm">
                <svg className="w-3.5 h-3.5 text-gray-300 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9M3 12h5m6 7V8m0 0l-3 3m3-3l3 3" />
                </svg>
                <Link
                  href={buildHref({ sort: 'newest', q })}
                  prefetch={false}
                  aria-current={sort === 'newest'}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    sort === 'newest' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  Спочатку нові
                </Link>
                <Link
                  href={buildHref({ sort: 'oldest', q })}
                  prefetch={false}
                  aria-current={sort === 'oldest'}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    sort === 'oldest' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  Спочатку старі
                </Link>
              </div>
            </div>
          </div>

          {q && (
            <p className="text-sm text-gray-500 mb-2">
              Результати пошуку за запитом «{q}»: {total}
              {' · '}
              <Link href={buildHref({ sort })} prefetch={false} className="text-blue-700 font-medium">Скинути</Link>
            </p>
          )}
        </div>
      </section>

      {/* ══════════ GRID ══════════ */}
      <section className="pt-4 pb-20 lg:pb-28 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          {loadError ? (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">Не вдалося завантажити матеріали — сайт лікарні тимчасово недоступний.</p>
              <Link href={buildHref({ sort, q, page })} prefetch={false} className="text-blue-700 font-medium text-sm">
                Спробувати ще раз
              </Link>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">Нічого не знайдено.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/novyny/${post.slug}`}
                  prefetch={false}
                  className={`news-card rounded-xl overflow-hidden bg-white block reveal${i % 3 === 1 ? ' d1' : i % 3 === 2 ? ' d2' : ''}`}
                >
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide bg-purple-100 text-purple-700">
                        Ти як?
                      </span>
                      <span className="text-xs text-gray-400">{post.date}</span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-800 leading-snug mb-2">{highlightText(post.title, q)}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{highlightText(post.excerpt, q)}</p>
                    <span className="mt-4 text-xs text-blue-700 font-medium flex items-center gap-1.5">
                      Читати далі
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-1.5 mt-14" aria-label="Пагінація">
              <Link
                href={buildHref({ sort, q, page: Math.max(1, page - 1) })}
                prefetch={false}
                aria-disabled={page === 1}
                className={`w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 transition-colors ${page === 1 ? 'pointer-events-none opacity-40' : 'hover:border-blue-300 hover:text-blue-700'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </Link>

              {pages.map((p, i) => (
                <span key={p} className="flex items-center gap-1.5">
                  {i > 0 && pages[i - 1] !== p - 1 && <span className="text-gray-300 px-1">…</span>}
                  <Link
                    href={buildHref({ sort, q, page: p })}
                    prefetch={false}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                      p === page ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-700'
                    }`}
                  >
                    {p}
                  </Link>
                </span>
              ))}

              <Link
                href={buildHref({ sort, q, page: Math.min(totalPages, page + 1) })}
                prefetch={false}
                aria-disabled={page === totalPages}
                className={`w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 transition-colors ${page === totalPages ? 'pointer-events-none opacity-40' : 'hover:border-blue-300 hover:text-blue-700'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
