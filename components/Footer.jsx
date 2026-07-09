import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-10">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <img src="/images/logo/logo-sm.png" alt="Уманська ЦРЛ" className="h-7 w-auto object-contain opacity-60" />
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/zagalna-informatsiya" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Про лікарню</Link>
            <Link href="/viddilennya" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Відділення</Link>
            <a href="https://uman.crl.net.ua/platni-poslugy/" target="_blank" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Платні послуги</a>
            <a href="https://uman.crl.net.ua/finansova-diyalnist/" target="_blank" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Фінансова діяльність</a>
            <a href="https://e-tender.ua/prozoro" target="_blank" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Prozorro</a>
            <Link href="/novyny" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Новини</Link>
            <a href="https://uman.crl.net.ua/kontakty/" target="_blank" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Контакти</a>
          </nav>
          <p className="text-xs text-gray-700 flex-shrink-0">© 2026 КНП «Уманська ЦРЛ»</p>
        </div>
      </div>
      <a href="tel:0674977363" className="lg:hidden fixed bottom-5 right-5 z-50 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-xl" aria-label="Подзвонити">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
      </a>
    </footer>
  );
}
