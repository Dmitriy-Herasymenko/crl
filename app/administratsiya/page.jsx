import Link from 'next/link';

export const metadata = {
  title: 'Адміністрація — Уманська центральна районна лікарня',
  description: 'Адміністрація КНП «Уманська ЦРЛ» Паланської сільської ради: керівний склад закладу.',
};

const STAFF = [
  {
    name: 'Мотузенко Сергій Олександрович',
    role: 'Директор КНП «Уманська центральна районна лікарня»',
    schedule: '2-й та 4-й понеділок з 10:00 до 14:00',
    phone: '3-95-75',
  },
  {
    name: 'Шевчук Юлія Михайлівна',
    role: 'Медичний директор',
    schedule: null,
    phone: null,
  },
];

export default function AdministratsiyaPage() {
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
            <span className="text-white/70">Адміністрація</span>
          </nav>
          <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-5">Про лікарню</p>
          <h1 className="text-4xl lg:text-5xl font-300 text-white leading-tight">
            Адмі<span className="font-600">ністрація</span>
          </h1>
          <span className="accent mt-5"></span>
        </div>
      </section>

      {/* ══════════ TEAM ══════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="reveal max-w-3xl mb-12">
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4">Керівний склад</p>
            <h2 className="text-2xl sm:text-3xl font-600 text-gray-900 leading-snug">
              Адміністрація КНП «Уманська ЦРЛ»
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
            {STAFF.map((person, i) => (
              <div key={person.name} className={`news-card rounded-2xl overflow-hidden bg-white reveal${i === 1 ? ' d1' : ''}`}>
                <img
                  src="/images/team/staff-placeholder.jpg"
                  alt={person.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-base font-semibold text-gray-800 leading-snug mb-1">{person.name}</h3>
                  <p className="text-sm text-blue-600 mb-4">{person.role}</p>

                  {(person.schedule || person.phone) && (
                    <div className="space-y-2 pt-4 border-t border-gray-100">
                      {person.schedule && (
                        <div className="flex items-start gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <span><span className="font-medium text-gray-700">Графік прийому громадян:</span> {person.schedule}</span>
                        </div>
                      )}
                      {person.phone && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                          <span><span className="font-medium text-gray-700">Телефон:</span> {person.phone}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
