import Link from 'next/link';
import PhotoGallery from '@/components/PhotoGallery';

export const metadata = {
  title: 'Фотогалерея — Уманська центральна районна лікарня',
  description: 'Фотогалерея КНП «Уманська ЦРЛ» Паланської сільської ради: заклад та колектив лікарні.',
};

const PHOTOS = [
  { src: '/images/gallery/photo-1.jpg', alt: 'Будівля лікарні' },
  { src: '/images/gallery/photo-2.jpg', alt: 'Фото з життя лікарні' },
  { src: '/images/gallery/photo-3.jpg', alt: 'Колектив лікарні' },
  { src: '/images/gallery/photo-4.jpg', alt: 'Колектив лікарні' },
  { src: '/images/gallery/photo-5.jpg', alt: 'Фото з життя лікарні' },
  { src: '/images/gallery/photo-6.jpg', alt: 'Фото з життя лікарні' },
  { src: '/images/gallery/photo-7.jpg', alt: 'Колектив лікарні на заході' },
  { src: '/images/gallery/photo-8.jpg', alt: 'Фото з життя лікарні' },
];

export default function FotogalereyaPage() {
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
            <span className="text-white/70">Фотогалерея</span>
          </nav>
          <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-5">Про лікарню</p>
          <h1 className="text-4xl lg:text-5xl font-300 text-white leading-tight">
            Фото<span className="font-600">галерея</span>
          </h1>
          <span className="accent mt-5"></span>
        </div>
      </section>

      {/* ══════════ GALLERY GRID ══════════ */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <PhotoGallery photos={PHOTOS} />
        </div>
      </section>
    </>
  );
}
