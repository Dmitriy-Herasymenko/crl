import Link from 'next/link';
import StatCounter from '@/components/StatCounter';

export const metadata = {
  title: 'Історія закладу — Уманська центральна районна лікарня',
  description: 'Історія КНП «Уманська центральна районна лікарня»: від заснування у 1959 році до сьогодення.',
};

const SUBUNITS = [
  'Поліклініка потужністю 250 відвідувань за зміну і 25 напрямками прийому',
  'Діагностичне, рентгенологічне, фізіотерапевтичне відділення, інформаційно-аналітичний відділ',
  'Клініко-діагностична лабораторія',
];

const ACHIEVEMENTS = [
  'Вдосконалено техніку оперативних втручань у хірургічному та травматологічному відділеннях — знижено рівень інвазивності, операції проводять з лапароскопічною апаратурою',
  'З 2016 року в хірургічному відділенні впроваджено роботу з лазерним коагулятором — для лікування варикозної хвороби нижніх кінцівок, гемороя, хронічних анальних тріщин, гнійно-некротичних уражень',
  'Під час оперативних втручань під загальним знеболенням використовується інгаляційний анестетик «Севоран»',
  'У травматологічному відділенні борються з ранами, що довго не гояться, трофічними виразками й пролежнями за допомогою VAC-терапії, виконується остеосинтез при переломах кісток та ендопротезування кульшового суглоба',
  'У пологовому відділенні, за відсутності протипоказів, пологи знеболюються методом епідуральної чи спинно-мозкової анестезії',
  'При аденомі простати проводиться трансуретральна резекція простати (ТУРП) — видалення тканин простати без зовнішніх розрізів',
];

export default function IstoriyaZakladuPage() {
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
            <span className="text-white/70">Історія закладу</span>
          </nav>
          <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-5">Про лікарню</p>
          <h1 className="text-4xl lg:text-5xl font-300 text-white leading-tight">
            Історія <span className="font-600">закладу</span>
          </h1>
          <span className="accent mt-5"></span>
        </div>
      </section>

      {/* ══════════ INTRO / TIMELINE ══════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 reveal">
              <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4">Від витоків до сьогодення</p>
              <h2 className="text-2xl sm:text-3xl font-600 text-gray-900 leading-snug mb-6">
                Понад 65 років турботи про здоров&apos;я громади
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
                <p>
                  Лікарня — традиційний осередок знань і милосердя, куди по допомогу можуть звернутись усі, хто її потребує. Жителям Уманщини пощастило: ще з часів створення району (після злиття з Бабанським і Ладижинським), 12 грудня 1959 року, на базі Ладижинської лікарні запрацювала перспективна Уманська центральна районна лікарня.
                </p>
                <p>
                  Через два неповних роки, 1 листопада 1961 року, молода лікарня переїхала до міста Умань — нагодою став переїзд міського пологового будинку, який залишив по собі придатні для розташування приміщення.
                </p>
                <p>
                  Ріст ЦРЛ не змусив себе чекати: у 1968 році розпочалось будівництво нових корпусів, і з 1971 року, коли їх здали в експлуатацію, тут розмістилась лікарня. Згодом добудували ще два терапевтичних корпуси.
                </p>
              </div>
            </div>

            <div className="reveal-r flex flex-col justify-center gap-4">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-5">
                <p className="text-3xl font-700 text-blue-600"><StatCounter count={1959} /></p>
                <p className="text-xs text-gray-500 mt-1">рік заснування лікарні</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-5">
                <p className="text-3xl font-700 text-blue-600"><StatCounter count={1971} /></p>
                <p className="text-xs text-gray-500 mt-1">здано в експлуатацію нові корпуси</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-5">
                <p className="text-3xl font-700 text-blue-600">ISO 9001:2015</p>
                <p className="text-xs text-gray-500 mt-1">сертифікат системи управління якістю</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ STRUCTURE TODAY ══════════ */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="reveal max-w-3xl mb-10">
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4">Оптимізація та розвиток</p>
            <h2 className="text-2xl sm:text-3xl font-600 text-gray-900 leading-snug mb-5">
              Структура закладу сьогодні
            </h2>
            <p className="text-gray-600 leading-relaxed text-[15px]">
              Усього в лікарні працювало 9 відділень на 400 ліжок. Проте галузь охорони здоров&apos;я реформується, прямуючи до зниження кількості ліжко-днів і тривалості перебування хворого в стаціонарі, тому ліжковий фонд оптимізовано до 205 ліжок (з них 95 — хірургічного профілю). Діють хірургічне (в тому числі по 5 ліжок отоларингологічного та урологічного профілів), травматологічне (з п&apos;ятьма нейрохірургічними ліжками з 30), акушерсько-гінекологічне, неврологічне, інфекційне, терапевтичне, дитяче відділення, а також відділення анестезіології та інтенсивної терапії. Активно функціонує денний стаціонар на 22 ліжка.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl">
            {SUBUNITS.map((item, i) => (
              <div key={item} className={`dept-card reveal${i === 1 ? ' d1' : i === 2 ? ' d2' : ''}`}>
                <span className="dept-ico dept-ico--blue">
                  <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </span>
                <div className="dept-card-body">
                  <p className="dept-desc">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ ACHIEVEMENTS ══════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="reveal max-w-3xl mb-10">
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4">58 років роботи</p>
            <h2 className="text-2xl sm:text-3xl font-600 text-gray-900 leading-snug mb-5">
              Спектр послуг і рівень допомоги значно виросли
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-5xl">
            {ACHIEVEMENTS.map((item, i) => (
              <div key={item} className={`about-info-card reveal${i % 2 === 1 ? ' d1' : ''}`}>
                <div className="about-info-ico">
                  <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                </div>
                <p className="about-info-value" style={{ fontWeight: 400, lineHeight: 1.5 }}>{item}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed text-[15px] max-w-3xl mt-8 reveal">
            На базі Уманської ЦРЛ відкрито відділення гемодіалізу Черкаської обласної лікарні, розраховане на 20 осіб на день. У 2015 році заклад пройшов перевірку та отримав сертифікат системи управління якістю за міжнародною класифікацією ДСТУ ISO 9001:2015 (дата отримання — 3 вересня 2021 року). КНП «Уманська ЦРЛ» має статус «Лікарня, доброзичлива до дитини».
          </p>
        </div>
      </section>

      {/* ══════════ TODAY IN NUMBERS ══════════ */}
      <section className="py-16 lg:py-20 bg-gray-900">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="reveal mb-10">
            <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-4">Заклад сьогодні</p>
            <h2 className="text-2xl sm:text-3xl font-300 text-white leading-tight">
              Уманська ЦРЛ <span className="font-600">у цифрах</span>
            </h2>
            <span className="accent mt-5"></span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 reveal-r">
            <div className="contact-card items-center text-center">
              <p className="text-3xl font-300 text-white"><StatCounter count={66} /></p>
              <p className="contact-card-sub mt-1">лікарів у штаті</p>
            </div>
            <div className="contact-card items-center text-center">
              <p className="text-3xl font-300 text-white"><StatCounter count={187} /></p>
              <p className="contact-card-sub mt-1">осіб середнього мед. персоналу</p>
            </div>
            <div className="contact-card items-center text-center">
              <p className="text-3xl font-300 text-white"><StatCounter count={10} />тис.</p>
              <p className="contact-card-sub mt-1">пацієнтів щорічно</p>
            </div>
            <div className="contact-card items-center text-center">
              <p className="text-3xl font-300 text-white"><StatCounter count={2} />тис.</p>
              <p className="contact-card-sub mt-1">стаціонарних операцій щорічно</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CLOSING ══════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="reveal max-w-3xl">
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4">Наша місія</p>
            <p className="text-gray-600 leading-relaxed text-[15px] sm:text-base">
              За час свого існування Уманська центральна районна лікарня пройшла довгий шлях становлення і вдосконалення, досягла значних звершень у лікувально-діагностичному процесі та зміцненні матеріально-технічної бази. Роки минають, а пріоритетні завдання колективу КНП «Уманська ЦРЛ» залишаються незмінними — забезпечувати населення якісною та доступною медичною допомогою.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
