import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NEWS, getNewsBySlug } from '@/lib/news';

export function generateStaticParams() {
  return NEWS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) return { title: 'Новину не знайдено — Уманська центральна районна лікарня' };
  return {
    title: `${post.title} — Уманська центральна районна лікарня`,
    description: post.excerpt,
  };
}

export default async function NewsDetailPage({ params }) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) notFound();

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
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-300 text-white leading-snug">{post.title}</h1>
        </div>
      </section>

      {/* ══════════ ARTICLE BODY ══════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-screen-md mx-auto px-6 lg:px-10">
          <img src={post.image} alt={post.title} className="w-full h-64 sm:h-80 object-cover rounded-2xl mb-10" />

          <div className="space-y-5 text-gray-600 leading-relaxed text-[15px] sm:text-base">
            {post.content.map((paragraph, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\n/g, '<br>') }} />
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link href="/novyny" className="text-sm text-blue-700 font-medium inline-flex items-center gap-1.5 hover:gap-3 transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
              Усі новини
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
