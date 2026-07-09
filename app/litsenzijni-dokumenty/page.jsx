import Link from 'next/link';

export const metadata = {
  title: 'Установчі документи — Уманська центральна районна лікарня',
  description: 'Установчі документи КНП «Уманська центральна районна лікарня» Паланської сільської ради: ліцензії та дозвільні документи.',
};

const DOCUMENTS = [
  {
    title: 'Ліцензійний реєстр',
    desc: 'На право здійснення господарської діяльності з обігу наркотичних засобів, психотропних речовин і прекурсорів',
    href: 'https://uman.crl.net.ua/wp-content/uploads/2021/02/dhnndhudhdhnndhdhdhdhndhdhndhdhdh-1.pdf',
  },
  {
    title: 'Ліцензія',
    desc: 'На право використання джерел іонізуючого випромінювання (зміни від 28.09.2022)',
    href: 'https://uman.crl.net.ua/wp-content/uploads/2023/01/litsenziia-div-zmina-1-vid-28_09_2022.pdf',
  },
];

export default function LitsenzijniDokumentyPage() {
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
            <span className="text-white/70">Установчі документи</span>
          </nav>
          <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-5">Про лікарню</p>
          <h1 className="text-4xl lg:text-5xl font-300 text-white leading-tight">
            Установчі <span className="font-600">документи</span>
          </h1>
          <span className="accent mt-5"></span>
        </div>
      </section>

      {/* ══════════ DOCUMENTS ══════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="reveal max-w-3xl mb-10">
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4">Ліцензії та дозвільні документи</p>
            <h2 className="text-2xl sm:text-3xl font-600 text-gray-900 leading-snug">
              Установчі документи КНП «Уманська центральна районна лікарня» Паланської сільської ради
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
            {DOCUMENTS.map((doc, i) => (
              <a
                key={doc.title}
                href={doc.href}
                target="_blank"
                rel="noopener"
                className={`svc-card2 reveal${i === 1 ? ' d1' : ''}`}
              >
                <span className="svc-ico2 svc-ico2--blue">
                  <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </span>
                <div className="svc-body">
                  <h3 className="svc-name">{doc.title}</h3>
                  <p className="svc-desc">{doc.desc}</p>
                </div>
                <div className="svc-footer">
                  <span className="svc-link">Переглянути PDF</span>
                  <svg className="svc-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
