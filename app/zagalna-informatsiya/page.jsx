import Link from 'next/link';
import StatCounter from '@/components/StatCounter';

export const metadata = {
  title: 'Загальна інформація — Уманська центральна районна лікарня',
  description:
    'Загальна інформація про КНП «Уманська ЦРЛ» Паланської сільської ради: реквізити, організаційна структура, ліжковий фонд та статистика роботи закладу.',
};

const DEPARTMENTS = [
  { name: 'Хірургічне відділення', beds: '70 ліжок', note: 'з урологічними (2), отоларингологічними (4), кардіохірургічними та офтальмологічними (2) ліжками' },
  { name: 'Ортопедо-травматологічне відділення', beds: '62 ліжка', note: 'з нейрохірургічними ліжками (5)' },
  { name: 'Відділення анестезіології та реанімації', beds: '6 ліжок', note: 'ліжка інтенсивної терапії' },
  { name: 'Акушерсько-гінекологічне відділення', beds: '25 ліжок', note: 'з ліжками патології вагітних' },
  { name: 'Інфекційне боксоване відділення', beds: '25 ліжок', note: 'з дитячими та дорослими ліжками' },
  { name: 'Неврологічне відділення', beds: '20 ліжок', note: 'з інсультними та паліативними (4) ліжками' },
  { name: 'Терапевтичне відділення', beds: '18 ліжок', note: 'з кардіологічними, інфарктними та паліативними (6) ліжками' },
  { name: 'Педіатричне відділення', beds: null, note: 'з паліативними ліжками' },
  { name: 'Поліклінічне відділення', beds: null, note: null },
  { name: 'Відділення «Хірургії одного дня»', beds: null, note: null },
  { name: 'Клініко-діагностична лабораторія', beds: null, note: null },
  { name: 'Патанатомічна лабораторія', beds: null, note: null },
  { name: 'Відділення інтервенційної кардіології і реперфузійної терапії', beds: null, note: 'з операційним блоком' },
  { name: 'Діагностично-променеве відділення', beds: null, note: 'УЗД, функціональна діагностика, ендоскопія, рентгенодіагностика' },
  { name: 'Приймально-діагностичне та екстреної допомоги відділення', beds: null, note: null },
  { name: 'Лікарняний банк крові', beds: null, note: null },
  { name: 'Відділ з інфекційного контролю', beds: null, note: null },
  { name: 'Реабілітаційне відділення', beds: '30 ліжок', note: null },
];

const REGIONS = [
  { label: 'Паланська, Дмитрушківська, Ладижинська, Бабанська ТГ', value: '37%' },
  { label: 'Уманська ОТГ', value: '19%' },
  { label: 'Інші райони Черкаської області', value: '21%' },
  { label: 'Жителі інших областей', value: '23%' },
];

export default function ZagalnaInformatsiyaPage() {
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
            <span className="text-white/70">Загальна інформація</span>
          </nav>
          <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-5">Про лікарню</p>
          <h1 className="text-4xl lg:text-5xl font-300 text-white leading-tight">
            Загальна <span className="font-600">інформація</span>
          </h1>
          <span className="accent mt-5"></span>
        </div>
      </section>

      {/* ══════════ REQUISITES ══════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="reveal max-w-3xl mb-10">
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4">Реквізити підприємства</p>
            <h2 className="text-2xl sm:text-3xl font-600 text-gray-900 leading-snug">
              Комунальне некомерційне підприємство «Уманська центральна районна лікарня» Паланської сільської ради
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <div className="about-info-card reveal">
              <div className="about-info-ico">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
              </div>
              <div>
                <p className="about-info-label">Юридична адреса</p>
                <p className="about-info-value">с. Родниківка, вул. Київська, 50</p>
                <p className="about-info-sub">Уманський район, Черкаська область</p>
              </div>
            </div>

            <div className="about-info-card reveal d1">
              <div className="about-info-ico">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div>
                <p className="about-info-label">Код ЄДРПОУ</p>
                <p className="about-info-value">02005467</p>
              </div>
            </div>

            <div className="about-info-card reveal d2">
              <div className="about-info-ico">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
              </div>
              <div>
                <p className="about-info-label">Персонал у 2025 році</p>
                <p className="about-info-value">355 працівників</p>
              </div>
            </div>

            <div className="about-info-card reveal d3">
              <div className="about-info-ico">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              </div>
              <div>
                <p className="about-info-label">Статус</p>
                <p className="about-info-value">Комунальне некомерційне підприємство</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 reveal-r">
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 text-center">
              <p className="text-2xl font-700 text-blue-600"><StatCounter count={96} /></p>
              <p className="text-xs text-gray-500 mt-1">лікарів</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 text-center">
              <p className="text-2xl font-700 text-blue-600"><StatCounter count={139} /></p>
              <p className="text-xs text-gray-500 mt-1">середнього мед. персоналу</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 text-center">
              <p className="text-2xl font-700 text-blue-600"><StatCounter count={58} /></p>
              <p className="text-xs text-gray-500 mt-1">молодших медсестер</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 text-center">
              <p className="text-2xl font-700 text-blue-600"><StatCounter count={64} /></p>
              <p className="text-xs text-gray-500 mt-1">адмін. та госп. персоналу</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ STRUCTURE ══════════ */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="reveal mb-10">
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4">Структура закладу</p>
            <h2 className="text-3xl sm:text-4xl font-300 text-gray-900 leading-tight">
              Організаційна <span className="font-600">структура</span>
            </h2>
            <span className="accent mt-5"></span>
          </div>

          <div className="space-y-3 mb-10 reveal-r">
            <p className="text-sm text-gray-600"><span className="font-600 text-gray-900">І.</span> Адміністративно-управлінський підрозділ</p>
            <p className="text-sm text-gray-600"><span className="font-600 text-gray-900">ІІІ.</span> Допоміжні підрозділи</p>
            <p className="text-sm text-gray-600"><span className="font-600 text-gray-900">ІV.</span> Господарсько-обслуговуючий підрозділ</p>
          </div>

          <p className="text-sm font-600 text-gray-900 mb-4 reveal">ІІ. Стаціонарно-діагностичний підрозділ</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEPARTMENTS.map((dept, i) => (
              <div key={dept.name} className={`dept-card reveal${i % 3 === 1 ? ' d1' : i % 3 === 2 ? ' d2' : ''}`}>
                <div className="dept-card-body">
                  <p className="dept-name">{dept.name}</p>
                  {dept.note && <p className="dept-desc">{dept.note}</p>}
                </div>
                {dept.beds && <span className="dept-badge dept-badge--blue">{dept.beds}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ BEDS & STATS ══════════ */}
      <section className="py-16 lg:py-20 bg-gray-900">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="reveal mb-10">
            <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-4">2024 рік у цифрах</p>
            <h2 className="text-3xl sm:text-4xl font-300 text-white leading-tight">
              Ліжковий фонд <span className="font-600">та статистика</span>
            </h2>
            <span className="accent mt-5"></span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8 reveal-r">
            <div className="contact-card items-center text-center">
              <p className="text-3xl font-300 text-white"><StatCounter count={450} /></p>
              <p className="contact-card-sub mt-1">ліжок — проєктна потужність</p>
            </div>
            <div className="contact-card items-center text-center">
              <p className="text-3xl font-300 text-white"><StatCounter count={250} /></p>
              <p className="contact-card-sub mt-1">ліжок — фактична потужність</p>
            </div>
            <div className="contact-card items-center text-center">
              <p className="text-3xl font-300 text-white">5,1</p>
              <p className="contact-card-sub mt-1">днів — середнє перебування</p>
            </div>
            <div className="contact-card items-center text-center">
              <p className="text-3xl font-300 text-white"><StatCounter count={80} />тис.</p>
              <p className="contact-card-sub mt-1">пацієнтів отримали допомогу</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {REGIONS.map((r) => (
              <div key={r.label} className="contact-card">
                <p className="text-2xl font-700 text-blue-400">{r.value}</p>
                <p className="contact-card-sub mt-1">{r.label}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            <div className="contact-card items-center text-center">
              <p className="text-2xl font-700 text-white"><StatCounter count={10500} /></p>
              <p className="contact-card-sub mt-1">стаціонарних пацієнтів</p>
            </div>
            <div className="contact-card items-center text-center">
              <p className="text-2xl font-700 text-white"><StatCounter count={6311} /></p>
              <p className="contact-card-sub mt-1">оперативних втручань</p>
            </div>
            <div className="contact-card items-center text-center">
              <p className="text-2xl font-700 text-white"><StatCounter count={488} /></p>
              <p className="contact-card-sub mt-1">пологів прийнято</p>
            </div>
            <div className="contact-card items-center text-center">
              <p className="text-2xl font-700 text-white"><StatCounter count={710} /></p>
              <p className="contact-card-sub mt-1">пацієнтів з інсультом</p>
            </div>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed reveal">
            З них 147 пацієнтів ВПО та 22 іноземці звернулися за медичною допомогою; проліковано 365 пацієнтів з інфарктом. Проведено 14 317 ультразвукових досліджень, 12 010 рентгенологічних, 5 149 флюорографічних, 1 562 ендоскопічних обстежень; клініко-діагностичною лабораторією зроблено 482 667 аналізів.
          </p>
        </div>
      </section>

      {/* ══════════ PLANS ══════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="reveal max-w-3xl">
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4">Плани розвитку</p>
            <p className="text-gray-600 leading-relaxed text-[15px] sm:text-base">
              ЗОЗ планує за рахунок нового операційного блоку розширити кількість оперативних втручань офтальмологічного профілю. На даний час заклад отримав погодження МОЗ на державне ендопротезування, направлений на навчання фахівець з пластичної хірургії. Заплановано придбання нового обладнання для розширення можливості ендоскопічних, хірургічних втручань.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
