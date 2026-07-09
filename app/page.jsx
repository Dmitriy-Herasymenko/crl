import Link from 'next/link';
import StatCounter from '@/components/StatCounter';
import NewsCarousel from '@/components/NewsCarousel';
import { fetchPostBySlug } from '@/lib/wp-api.mjs';
import { CATEGORY_NOVYNY, CATEGORY_PORADY, transformPost } from '@/lib/wp-transform.mjs';

// Data is cached for REVALIDATE_SECONDS and refreshed in the background —
// see app/novyny/page.jsx for why.
const REVALIDATE_SECONDS = 45;

const FEATURED_SLUG = '100-zhyttya-cherkasy';

const CAROUSEL_SLUGS = [
  { slug: 'natsionalna-sluzhba-zdorov-ya-ukrayiny-pidgotuvala-gid-dlya-veteraniv-prostymy-slovamy-pro-medychni-garantiyi-2026', badge: 'НСЗУ', badgeClass: 'bg-green-100 text-green-700' },
  { slug: 'nszu-skladni-operatsiyi-na-sertsi-u-2026-rotsi-novi-pidhody-do-oplaty-ta-kontsentratsiyi-dopomogy', badge: 'Кардіологія', badgeClass: 'bg-red-100 text-red-700' },
  { slug: '12-travnya-mizhnarodnyj-den-medychnoyi-sestry', badge: 'Свято', badgeClass: 'bg-pink-100 text-pink-700' },
  { slug: 'perelik-likarskyh-zasobiv-shho-pidlyagayut-reimbursatsiyi-u-mezhah-programy-dostupni-liky-nszu', badge: 'Ліки', badgeClass: 'bg-blue-100 text-blue-700' },
];

function mapImageUrl(wpUrl) {
  return `/api/media?src=${encodeURIComponent(wpUrl)}`;
}

async function getPostBySlug(slug) {
  const rawPost = await fetchPostBySlug(slug, [CATEGORY_NOVYNY, CATEGORY_PORADY], { next: { revalidate: REVALIDATE_SECONDS } });
  return rawPost ? transformPost(rawPost, mapImageUrl) : null;
}

export default async function HomePage() {
  const [featured, ...carouselPosts] = await Promise.all([
    getPostBySlug(FEATURED_SLUG),
    ...CAROUSEL_SLUGS.map(({ slug }) => getPostBySlug(slug)),
  ]);

  const carouselSlides = CAROUSEL_SLUGS.map(({ slug, badge, badgeClass }, i) => {
    const post = carouselPosts[i];
    return { slug, badge, badgeClass, image: post.image, date: post.date, title: post.title, excerpt: post.excerpt };
  });

  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <section id="hero" className="hero-section relative min-h-screen flex flex-col hero-img overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-900/60 to-gray-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent"></div>

        <div className="absolute top-1/2 right-[8%] -translate-y-1/2 hidden xl:flex items-center justify-center opacity-[0.06]">
          <svg className="w-96 h-96 text-white hero-cross" fill="currentColor" viewBox="0 0 100 100">
            <rect x="38" y="5" width="24" height="90" rx="4" />
            <rect x="5" y="38" width="90" height="24" rx="4" />
          </svg>
        </div>

        <div className="relative z-10 flex-1 flex items-center">
          <div className="w-full max-w-screen-xl mx-auto px-6 lg:px-10 py-20 lg:py-0">
            <div className="max-w-3xl">
              <div className="hero-badge inline-flex items-center gap-2.5 mb-8">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                </span>
                <span className="text-white/70 text-xs font-medium tracking-widest uppercase">КНП Паланської територіальної громади</span>
              </div>

              <h1 className="hero-title text-white leading-[1.06] tracking-tight mb-7">
                <span className="block text-white/50 font-300 text-3xl sm:text-4xl lg:text-5xl mb-2">Уманська ЦРЛ —</span>
                <span className="block font-600 text-4xl sm:text-5xl lg:text-[4.25rem]">Якісна медична</span>
                <span className="block font-600 text-4xl sm:text-5xl lg:text-[4.25rem] hero-accent-text">допомога</span>
              </h1>

              <div className="hero-divider flex items-center gap-4 mb-7">
                <span className="block w-10 h-px bg-blue-400"></span>
                <p className="text-white/60 text-sm font-300 tracking-wide">Сучасне оснащення · Понад 50 років досвіду</p>
              </div>

              <p className="hero-desc text-white/70 text-lg font-300 leading-relaxed max-w-xl mb-10">
                Кваліфікована консультативно-діагностична та лікувальна допомога. Турбота про кожного пацієнта — наш головний пріоритет.
              </p>

              <div className="hero-cta flex flex-col sm:flex-row gap-3">
                <Link
                  href="/#contacts"
                  className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2.5 transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                >
                  Записатись на прийом
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <a href="tel:0674977363" className="group glass-btn inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5">
                  <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  067 497 73 63
                </a>
                <Link href="/viddilennya" className="group glass-btn inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5">
                  Відділення
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
            <div className="hero-stats grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
              <div className="hero-stat-item py-6 px-0 lg:px-6 lg:first:pl-0">
                <p className="text-3xl font-300 text-white mb-1"><StatCounter count={50} /><span className="text-blue-400 font-500">+</span></p>
                <p className="text-white/40 text-xs uppercase tracking-wider font-medium">років досвіду</p>
              </div>
              <div className="hero-stat-item py-6 px-6 border-l border-white/10">
                <p className="text-3xl font-300 text-white mb-1"><StatCounter count={15} /><span className="text-blue-400 font-500">+</span></p>
                <p className="text-white/40 text-xs uppercase tracking-wider font-medium">відділень</p>
              </div>
              <div className="hero-stat-item py-6 px-6 border-l border-white/10 border-t border-t-white/10 lg:border-t-0">
                <p className="text-3xl font-300 text-white mb-1"><StatCounter count={200} /><span className="text-blue-400 font-500">+</span></p>
                <p className="text-white/40 text-xs uppercase tracking-wider font-medium">спеціалістів</p>
              </div>
              <div className="hero-stat-item py-6 px-6 border-l border-white/10 border-t border-t-white/10 lg:border-t-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-3xl font-300 text-white">24<span className="text-green-400 font-500">/7</span></p>
                  <span className="text-[10px] bg-green-400/15 text-green-400 border border-green-400/20 px-2 py-0.5 rounded-full font-medium ml-1">● Зараз</span>
                </div>
                <p className="text-white/40 text-xs uppercase tracking-wider font-medium">приймальне відд.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ ABOUT ══════════ */}
      <section id="about" className="py-24 lg:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="reveal relative">
              <div className="about-img rounded-2xl h-72 lg:h-[540px] bg-gray-100 overflow-hidden"></div>
              <div className="absolute -bottom-5 -right-5 w-28 h-28 bg-blue-50 rounded-2xl -z-10 hidden lg:block"></div>
              <div className="about-float-card">
                <div className="about-float-ico">
                  <svg width="22" height="22" viewBox="0 0 30 30" fill="none">
                    <rect width="30" height="30" rx="8" fill="#2563eb" />
                    <rect x="12" y="4" width="6" height="22" rx="2" fill="white" />
                    <rect x="4" y="12" width="22" height="6" rx="2" fill="white" />
                  </svg>
                </div>
                <div>
                  <p className="text-xl font-700 text-gray-900 leading-none">50<span className="text-blue-600">+</span></p>
                  <p className="text-xs text-gray-500 mt-0.5">років якісної медицини</p>
                </div>
              </div>
            </div>

            <div className="reveal-r d1">
              <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4">Наша лікарня — наша гордість</p>
              <h2 className="text-4xl lg:text-5xl font-300 text-gray-900 leading-tight tracking-tight mb-5">
                Лікарня, <span className="font-600">якій довіряють</span>
              </h2>
              <span className="accent mb-6"></span>
              <p className="text-gray-500 leading-relaxed mb-8 text-[15px]">
                КНП «Уманська ЦРЛ» забезпечує жителів регіону кваліфікованою консультативно-діагностичною та лікувальною допомогою. Впроваджуємо сучасні протоколи, оновлюємо обладнання та підвищуємо кваліфікацію персоналу.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="about-feature">
                  <span className="about-feature-ico">
                    <svg fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                  </span>
                  <p className="about-feature-title">Ліцензована допомога</p>
                  <p className="about-feature-desc">Держстандарти якості</p>
                </div>
                <div className="about-feature">
                  <span className="about-feature-ico">
                    <svg fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
                  </span>
                  <p className="about-feature-title">200+ спеціалістів</p>
                  <p className="about-feature-desc">Лікарі вищої категорії</p>
                </div>
                <div className="about-feature">
                  <span className="about-feature-ico">
                    <svg fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </span>
                  <p className="about-feature-title">Прийом 24/7</p>
                  <p className="about-feature-desc">Без вихідних та свят</p>
                </div>
              </div>

              <div className="flex justify-center">
                <a href="https://uman.crl.net.ua/zagalna-informatsiya/" target="_blank" className="btn-outline border border-gray-200 text-gray-700 text-sm px-5 py-3 rounded-xl font-medium inline-flex items-center gap-2">
                  Більше про нас
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ DEPARTMENTS ══════════ */}
      <section id="departments" className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="reveal">
              <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4">Структура</p>
              <h2 className="text-4xl lg:text-5xl font-300 text-gray-900 leading-tight">
                Відділення <span className="font-600">лікарні</span>
              </h2>
              <span className="accent mt-5"></span>
            </div>
            <Link href="/viddilennya" className="dept-all-link reveal-r hidden sm:inline-flex">
              Всі відділення
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Link href="/viddilennya" className="dept-card reveal">
              <span className="dept-ico dept-ico--blue">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </span>
              <div className="dept-card-body">
                <p className="dept-name">Терапевтичне</p>
                <p className="dept-desc">Діагностика та лікування внутрішніх захворювань</p>
              </div>
              <svg className="dept-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>

            <Link href="/viddilennya" className="dept-card reveal d1">
              <span className="dept-ico dept-ico--red">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>
              </span>
              <div className="dept-card-body">
                <p className="dept-name">Хірургічне</p>
                <p className="dept-desc">Планові та ургентні оперативні втручання</p>
              </div>
              <svg className="dept-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>

            <Link href="/viddilennya" className="dept-card reveal d2">
              <span className="dept-ico dept-ico--blue">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
              </span>
              <div className="dept-card-body">
                <p className="dept-name">Кардіологічне</p>
                <p className="dept-desc">Серцево-судинні захворювання та кардіохірургія</p>
              </div>
              <span className="dept-badge dept-badge--blue">2026</span>
            </Link>

            <Link href="/viddilennya" className="dept-card reveal d3">
              <span className="dept-ico dept-ico--purple">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </span>
              <div className="dept-card-body">
                <p className="dept-name">Неврологічне</p>
                <p className="dept-desc">Захворювання нервової системи</p>
              </div>
              <svg className="dept-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>

            <Link href="/viddilennya" className="dept-card reveal d4">
              <span className="dept-ico dept-ico--pink">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </span>
              <div className="dept-card-body">
                <p className="dept-name">Акушерське та гінекологічне</p>
                <p className="dept-desc">Ведення вагітності та пологова допомога</p>
              </div>
              <svg className="dept-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>

            <Link href="/viddilennya" className="dept-card reveal d5">
              <span className="dept-ico dept-ico--gray">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
              </span>
              <div className="dept-card-body">
                <p className="dept-name">Реанімація та інтенсивна терапія</p>
                <p className="dept-desc">Невідкладна допомога та реанімація</p>
              </div>
              <span className="dept-badge dept-badge--red">24/7</span>
            </Link>

            <Link href="/viddilennya" className="dept-card reveal d6">
              <span className="dept-ico dept-ico--yellow">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" /></svg>
              </span>
              <div className="dept-card-body">
                <p className="dept-name">Педіатричне</p>
                <p className="dept-desc">Медична допомога дітям всіх вікових груп</p>
              </div>
              <svg className="dept-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>

            <Link href="/viddilennya" className="dept-card reveal hidden sm:flex">
              <span className="dept-ico dept-ico--orange">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </span>
              <div className="dept-card-body">
                <p className="dept-name">Травматологія</p>
                <p className="dept-desc">Переломи, вивихи та травми опорно-рухового апарату</p>
              </div>
              <svg className="dept-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>

            <Link href="/viddilennya" className="dept-card reveal d1 hidden sm:flex">
              <span className="dept-ico dept-ico--teal">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </span>
              <div className="dept-card-body">
                <p className="dept-name">Офтальмологія</p>
                <p className="dept-desc">Діагностика та лікування захворювань ока</p>
              </div>
              <svg className="dept-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>

            <Link href="/viddilennya" className="dept-card reveal d2 hidden sm:flex">
              <span className="dept-ico dept-ico--indigo">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>
              </span>
              <div className="dept-card-body">
                <p className="dept-name">ЛОР-відділення</p>
                <p className="dept-desc">Захворювання вуха, горла та носа</p>
              </div>
              <svg className="dept-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>

            <Link href="/viddilennya" className="dept-card reveal d3 hidden sm:flex">
              <span className="dept-ico dept-ico--green">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.25 48.25 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>
              </span>
              <div className="dept-card-body">
                <p className="dept-name">Інфекційне</p>
                <p className="dept-desc">Лікування інфекційних та паразитарних хвороб</p>
              </div>
              <svg className="dept-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>

            <Link href="/viddilennya" className="dept-card reveal d4 hidden sm:flex">
              <span className="dept-ico dept-ico--gray">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" /></svg>
              </span>
              <div className="dept-card-body">
                <p className="dept-name">Рентгенологія</p>
                <p className="dept-desc">Рентген, КТ та інші методи діагностики</p>
              </div>
              <svg className="dept-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <div className="flex justify-center mt-2 sm:hidden">
            <Link href="/viddilennya" className="dept-all-link">
              Всі відділення
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="relative py-24 cta-img overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/80"></div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-blue-300 text-xs font-semibold tracking-widest uppercase mb-5 reveal">Ваше здоров&apos;я</p>
          <h2 className="text-4xl lg:text-5xl font-300 text-white leading-tight mb-5 reveal d1">
            Довірте Ваше здоров&apos;я<br /><span className="font-600">професіоналам</span>
          </h2>
          <p className="text-blue-200 text-lg max-w-xl mx-auto mb-10 reveal d2">
            Найвірнішим вибором є не зволікати з обстеженням при скаргах на здоров&apos;я, а негайно звернутися за кваліфікованою медичною допомогою.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center reveal d3">
            <Link href="/#contacts" className="btn-primary bg-white text-blue-700 px-8 py-3.5 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2">
              Записатись на прийом
            </Link>
            <Link href="/viddilennya" className="border border-white/30 text-white px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2">
              Наші відділення
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES ══════════ */}
      <section id="services" className="py-24 lg:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="reveal">
              <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4">Послуги та програми</p>
              <h2 className="text-4xl lg:text-5xl font-300 text-gray-900 leading-tight">
                Що ми <span className="font-600">пропонуємо</span>
              </h2>
              <span className="accent mt-5"></span>
            </div>
            <a href="https://uman.crl.net.ua/platni-poslugy/" target="_blank" className="dept-all-link reveal-r hidden sm:inline-flex">
              Всі послуги
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="https://uman.crl.net.ua/platni-poslugy/" target="_blank" className="svc-card2 reveal">
              <span className="svc-ico2 svc-ico2--blue">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              </span>
              <div className="svc-body">
                <h3 className="svc-name">Платні медичні послуги</h3>
                <p className="svc-desc">Консультації, аналізи та діагностика з прозорим ціноутворенням</p>
              </div>
              <div className="svc-footer">
                <span className="svc-link">Дізнатись більше</span>
                <svg className="svc-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </a>

            <Link href="/novyny/perelik-likarskyh-zasobiv-shho-pidlyagayut-reimbursatsiyi-u-mezhah-programy-dostupni-liky-nszu" className="svc-card2 reveal d1">
              <span className="svc-ico2 svc-ico2--green">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              </span>
              <div className="svc-body">
                <h3 className="svc-name">Програма «Доступні ліки»</h3>
                <p className="svc-desc">Безкоштовні та пільгові ліки для пацієнтів з хронічними захворюваннями</p>
              </div>
              <div className="svc-footer">
                <span className="svc-link">Дізнатись більше</span>
                <svg className="svc-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </Link>

            <Link href="/novyny/100-zhyttya-cherkasy" className="svc-card2 reveal d2">
              <span className="svc-ico2 svc-ico2--yellow">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
              </span>
              <div className="svc-body">
                <h3 className="svc-name">Підтримка ветеранів</h3>
                <p className="svc-desc">Пріоритетне обслуговування та розширені медичні гарантії</p>
              </div>
              <div className="svc-footer">
                <span className="svc-link">Дізнатись більше</span>
                <svg className="svc-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </Link>

            <a href="https://uman.crl.net.ua/category/vaktsynatsiya-vid-covid-19/" target="_blank" className="svc-card2 reveal d3">
              <span className="svc-ico2 svc-ico2--indigo">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </span>
              <div className="svc-body">
                <h3 className="svc-name">Вакцинація</h3>
                <p className="svc-desc">Профілактичні щеплення для дітей та дорослих за Нац. календарем</p>
              </div>
              <div className="svc-footer">
                <span className="svc-link">Дізнатись більше</span>
                <svg className="svc-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </a>

            <a href="https://uman.crl.net.ua/finansova-diyalnist/" target="_blank" className="svc-card2 reveal d4">
              <span className="svc-ico2 svc-ico2--gray">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </span>
              <div className="svc-body">
                <h3 className="svc-name">Публічна звітність</h3>
                <p className="svc-desc">Відкрита фінансова звітність та держзакупівлі Prozorro</p>
              </div>
              <div className="svc-footer">
                <span className="svc-link">Дізнатись більше</span>
                <svg className="svc-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </a>

            <a href="https://uman.crl.net.ua/category/porady-likarya/" target="_blank" className="svc-card2 reveal d5">
              <span className="svc-ico2 svc-ico2--purple">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </span>
              <div className="svc-body">
                <h3 className="svc-name">Поради лікаря</h3>
                <p className="svc-desc">Матеріали про здоров&apos;я, профілактику та здоровий спосіб життя</p>
              </div>
              <div className="svc-footer">
                <span className="svc-link">Дізнатись більше</span>
                <svg className="svc-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </a>
          </div>

          <div className="flex justify-center mt-2 sm:hidden">
            <a href="https://uman.crl.net.ua/platni-poslugy/" target="_blank" className="dept-all-link">
              Всі послуги
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════ NEWS ══════════ */}
      <section id="news" className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14">
            <div>
              <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-5 reveal">Актуальні новини та корисні поради</p>
              <h2 className="text-4xl lg:text-5xl font-300 text-gray-900 leading-tight reveal d1">
                Останні <span className="font-600">події</span>
              </h2>
              <span className="accent mt-5 reveal d2"></span>
            </div>
            <div className="flex items-center gap-4 reveal-r">
              <div className="hidden sm:flex items-center gap-2">
                <button className="news-swiper-prev" aria-label="Назад">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button className="news-swiper-next" aria-label="Вперед">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
              <Link href="/novyny" className="hidden sm:flex text-sm text-blue-700 font-medium items-center gap-1.5 hover:gap-3 transition-all">
                Всі новини <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>

          <Link href={`/novyny/${featured.slug}`} className="news-card rounded-2xl overflow-hidden flex flex-col lg:flex-row mb-4 bg-white block reveal">
            <div className="lg:w-2/5 flex-shrink-0 overflow-hidden">
              <img src={featured.image} alt={featured.title} className="w-full h-56 lg:h-full object-cover object-center" />
            </div>
            <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide">Ветерани</span>
                  <span className="text-xs text-gray-400">{featured.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 leading-snug mb-3">{featured.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{featured.excerpt}</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-blue-700 text-sm font-medium">
                Читати далі <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </div>
          </Link>

          <NewsCarousel slides={carouselSlides} />

          <div className="flex justify-center mt-2 sm:hidden">
            <Link href="/novyny" className="text-sm text-blue-700 font-medium flex items-center gap-1.5">
              Всі новини <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ CONTACTS ══════════ */}
      <section id="contacts" className="py-24 lg:py-32 bg-gray-900">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-5 reveal">Контакти</p>
            <h2 className="text-4xl lg:text-5xl font-300 text-white leading-tight reveal d1">
              Зв&apos;яжіться <span className="font-600">з нами</span>
            </h2>
            <span className="accent mt-5 reveal d2"></span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <div className="grid sm:grid-cols-2 gap-3 reveal">
                <div className="contact-card">
                  <div className="contact-card-ico">
                    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <p className="contact-card-label">Телефони</p>
                  <a href="tel:0674977363" className="contact-card-value">067 497 73 63</a>
                  <span className="contact-card-sub">Реєстратура</span>
                  <a href="tel:0674977365" className="contact-card-value mt-3">067 497 73 65</a>
                  <span className="contact-card-sub">Приймальня директора</span>
                </div>

                <div className="contact-card">
                  <div className="contact-card-ico">
                    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  </div>
                  <p className="contact-card-label">Адреса</p>
                  <p className="contact-card-value" style={{ textDecoration: 'none' }}>вул. Білогрудівська 2</p>
                  <span className="contact-card-sub">Комплекс «Білогрудівка», Умань</span>
                  <a href="https://maps.google.com/?q=Білогрудівська+2+Умань" target="_blank" className="contact-card-link">
                    Відкрити на картах
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>

                <div className="contact-card">
                  <div className="contact-card-ico">
                    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                  </div>
                  <p className="contact-card-label">Email</p>
                  <a href="mailto:umancrl@gmail.com" className="contact-card-value">umancrl@gmail.com</a>
                  <span className="contact-card-sub">Офіційна адреса лікарні</span>
                  <a href="https://www.facebook.com/umancrl/" target="_blank" rel="noopener" className="contact-card-link mt-auto pt-3">
                    <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                    Уманська ЦРЛ у Facebook
                  </a>
                </div>

                <div className="contact-card">
                  <div className="contact-card-ico">
                    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <p className="contact-card-label">Графік роботи</p>
                  <div className="space-y-2 mt-1">
                    <div className="flex justify-between">
                      <span className="contact-card-sub">Пн–Пт</span>
                      <span className="contact-card-value" style={{ textDecoration: 'none', fontSize: '13px' }}>08:00–16:45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="contact-card-sub">Сб–Нд</span>
                      <span className="contact-card-sub">Вихідний</span>
                    </div>
                    <div className="flex justify-between pt-2" style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
                      <span className="contact-card-sub">Приймальне відд.</span>
                      <span className="text-green-400 font-semibold" style={{ fontSize: '13px' }}>24 / 7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-r d1">
              <div className="rounded-2xl overflow-hidden h-[280px] sm:h-[360px] lg:h-[480px]">
                <iframe
                  src="https://maps.google.com/maps?q=вул.+Білогрудівська+2,+Умань&output=embed&hl=uk&z=16"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Карта"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
