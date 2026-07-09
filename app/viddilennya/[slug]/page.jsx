import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DEPARTMENTS, getDepartmentBySlug } from '@/lib/departments';

export function generateStaticParams() {
  return DEPARTMENTS.map((dept) => ({ slug: dept.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dept = getDepartmentBySlug(slug);
  if (!dept) return { title: 'Відділення не знайдено — Уманська центральна районна лікарня' };
  return {
    title: `${dept.name} — Уманська центральна районна лікарня`,
    description: dept.head || dept.name,
  };
}

export default async function DepartmentDetailPage({ params }) {
  const { slug } = await params;
  const dept = getDepartmentBySlug(slug);
  if (!dept) notFound();

  return (
    <>
      {/* ══════════ ARTICLE HEADER ══════════ */}
      <section className="page-header-section relative pt-40 pb-14 lg:pt-48 lg:pb-16 bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"></div>
        <div className="relative z-10 max-w-screen-md mx-auto px-6 lg:px-10">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-white/40 mb-6" aria-label="Хлібні крихти">
            <Link href="/" className="hover:text-white/70 transition-colors">Головна</Link>
            <span>/</span>
            <Link href="/viddilennya" className="hover:text-white/70 transition-colors">Відділення</Link>
          </nav>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-300 text-white leading-snug">{dept.name}</h1>
          {dept.desc && <p className="text-sm text-white/50 mt-3">{dept.desc}</p>}
        </div>
      </section>

      {/* ══════════ ARTICLE BODY ══════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-screen-md mx-auto px-6 lg:px-10">
          <img src={dept.image} alt={dept.name} className="w-full h-64 sm:h-80 object-cover rounded-2xl mb-10" />

          {dept.head && (
            <p className="text-base font-semibold text-gray-900 mb-2">{dept.head}</p>
          )}
          {dept.schedule && (
            <p className="text-sm text-gray-500 mb-8">{dept.schedule}</p>
          )}

          {dept.services && (
            <>
              <p className="text-sm font-semibold text-gray-900 mt-8 mb-4">Медичні послуги, які пацієнт може отримати у надавача:</p>
              <ol className="space-y-2.5 list-decimal list-inside text-[15px] text-gray-600 leading-relaxed">
                {dept.services.map((service, i) => (
                  <li key={i}>{service}</li>
                ))}
              </ol>
            </>
          )}

          {dept.gallery && (
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {dept.gallery.map((src) => (
                <img key={src} src={src} alt={dept.name} className="w-full h-56 object-cover rounded-xl" />
              ))}
            </div>
          )}

          {!dept.head && !dept.services && !dept.gallery && (
            <p className="text-sm text-gray-400">Детальна інформація про відділення уточнюється.</p>
          )}

          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link href="/viddilennya" className="text-sm text-blue-700 font-medium inline-flex items-center gap-1.5 hover:gap-3 transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
              Усі відділення
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
