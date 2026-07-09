import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchPostBySlug, fetchPosts } from '@/lib/wp-api.mjs';
import { CATEGORY_NOVYNY, CATEGORY_PORADY, CATEGORY_TY_YAK, CATEGORY_VAKTSYNATSIYA, transformPost } from '@/lib/wp-transform.mjs';
import ShareButtons from '@/components/ShareButtons';

// Data is cached for REVALIDATE_SECONDS and refreshed in the background —
// see app/novyny/page.jsx for why.
const REVALIDATE_SECONDS = 45;

const BADGE_CLASS = {
  Новини: 'bg-blue-100 text-blue-700',
  'Поради лікаря': 'bg-green-100 text-green-700',
};

function mapImageUrl(wpUrl) {
  return `/api/media?src=${encodeURIComponent(wpUrl)}`;
}

async function getPost(slug) {
  const rawPost = await fetchPostBySlug(slug, [CATEGORY_NOVYNY, CATEGORY_PORADY, CATEGORY_TY_YAK, CATEGORY_VAKTSYNATSIYA], { next: { revalidate: REVALIDATE_SECONDS } });
  return rawPost ? transformPost(rawPost, mapImageUrl) : null;
}

function estimateReadingMinutes(html) {
  const text = html.replace(/<[^>]+>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

async function getRelatedPosts(excludeSlug) {
  try {
    const { posts } = await fetchPosts(
      { categoryIds: [CATEGORY_NOVYNY, CATEGORY_PORADY], page: 1, perPage: 4, order: 'desc' },
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    return posts
      .filter((p) => p.slug !== excludeSlug)
      .slice(0, 3)
      .map((p) => transformPost(p, mapImageUrl));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Новину не знайдено — Уманська центральна районна лікарня' };
  return {
    title: `${post.title} — Уманська центральна районна лікарня`,
    description: post.excerpt,
  };
}

export default async function NewsDetailPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const [related, readingMinutes] = await Promise.all([
    getRelatedPosts(slug),
    Promise.resolve(estimateReadingMinutes(post.contentHtml)),
  ]);

  return (
    <>
      {/* ══════════ ARTICLE HEADER ══════════ */}
      <section className="page-header-section relative pt-40 pb-14 lg:pt-48 lg:pb-16 bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"></div>
        <div className="relative z-10 max-w-screen-md mx-auto px-6 lg:px-10">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Хлібні крихти">
            <Link href="/" className="hover:text-white/70 transition-colors">Головна</Link>
            <span>/</span>
            <Link href="/novyny" className="hover:text-white/70 transition-colors">Новини</Link>
          </nav>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide">{post.category}</span>
            <span className="text-xs text-white/50">{post.date}</span>
            <span className="text-white/20">·</span>
            <span className="text-xs text-white/50">{readingMinutes} хв читання</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-300 text-white leading-snug">{post.title}</h1>
        </div>
      </section>

      {/* ══════════ ARTICLE BODY ══════════ */}
      <section className="py-14 lg:py-16 bg-white">
        <div className="max-w-screen-md mx-auto px-6 lg:px-10">
          <img src={post.image} alt={post.title} className="w-full h-64 sm:h-96 object-cover rounded-2xl shadow-md mb-10" />

          <div className="flex items-center justify-between flex-wrap gap-4 pb-8 mb-8 border-b border-gray-100">
            <Link href="/novyny" className="text-sm text-blue-700 font-medium inline-flex items-center gap-1.5 hover:gap-3 transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
              Усі новини
            </Link>
            <ShareButtons title={post.title} />
          </div>

          <div
            className="prose prose-gray dark:prose-invert sm:prose-lg max-w-none prose-headings:font-600 prose-a:text-blue-700 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
            <Link href="/novyny" className="text-sm text-blue-700 font-medium inline-flex items-center gap-1.5 hover:gap-3 transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
              Усі новини
            </Link>
            <ShareButtons title={post.title} />
          </div>
        </div>
      </section>

      {/* ══════════ RELATED ══════════ */}
      {related.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4">Читайте також</p>
            <h2 className="text-2xl sm:text-3xl font-300 text-gray-900 leading-tight mb-10">
              Інші <span className="font-600">новини</span>
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/novyny/${r.slug}`} className="news-card rounded-xl overflow-hidden bg-white block">
                  <img src={r.image} alt={r.title} className="w-full h-40 object-cover" />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide ${BADGE_CLASS[r.category] || BADGE_CLASS['Новини']}`}>
                        {r.category}
                      </span>
                      <span className="text-xs text-gray-400">{r.date}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-1.5 line-clamp-2">{r.title}</h3>
                    <span className="text-xs text-blue-700 font-medium flex items-center gap-1">
                      Читати
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
