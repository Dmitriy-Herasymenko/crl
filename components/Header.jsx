'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isZagalna = pathname === '/zagalna-informatsiya';
  const isAdministratsiya = pathname === '/administratsiya';
  const isLitsenzijniDokumenty = pathname === '/litsenzijni-dokumenty';
  const isViddilennya = pathname === '/viddilennya' || pathname.startsWith('/viddilennya/');
  const isIstoriya = pathname === '/istoriya-zakladu';
  const isFotogalereya = pathname === '/fotogalereya';
  const isNovyny = pathname === '/novyny' || pathname.startsWith('/novyny/');
  const isProLikarnyu = isZagalna || isAdministratsiya || isLitsenzijniDokumenty || isViddilennya || isIstoriya || isFotogalereya;

  const [navOn, setNavOn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  // Force-close any open dropdown / mobile menu after a client-side navigation —
  // otherwise a menu opened via CSS :hover/:focus-within would stay visually open
  // over the new page until the pointer physically moves away. The clicked link
  // also keeps browser focus after navigating, so :focus-within needs an explicit
  // blur() too, not just clearing the hover-driven state.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    if (document.activeElement instanceof HTMLElement && document.activeElement.closest('.has-dropdown')) {
      document.activeElement.blur();
    }
  }, [pathname]);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));

    const onScroll = () => setNavOn(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the in-page nav link matching the section currently in view.
  // Only relevant on the homepage, where section anchors (#hero, #contacts, ...) exist.
  useEffect(() => {
    if (!isHome) return;

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#nav nav a[href^="/#"]');

    const onScroll = () => {
      let current = '';
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 90) current = s.id;
      });
      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `/#${current}`;
        link.classList.toggle('text-gray-900', active);
        link.classList.toggle('font-medium', active);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch (e) {
      /* localStorage unavailable — theme just won't persist */
    }
  }

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <>
      {/* ══ TOPBAR ══ */}
      <div id="topbar" className="topbar hidden sm:block">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 h-9 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5 text-xs">
            <a
              href="https://maps.google.com/?q=Білогрудівська+2+Умань"
              target="_blank"
              rel="noopener"
              className="topbar-link flex items-center gap-1.5"
            >
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              вул. Білогрудівська 2, Паланська ТГ
            </a>
            <span className="topbar-divider"></span>
            <a href="mailto:umancrl@gmail.com" className="topbar-link flex items-center gap-1.5">
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              umancrl@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-5 text-xs">
            <span className="flex items-center gap-1.5 text-white/60">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Пн–Пт, 08:00–16:45
            </span>
            <span className="topbar-divider"></span>
            <a href="https://www.facebook.com/umancrl/" target="_blank" rel="noopener" className="topbar-link flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* ══ NAV ══ */}
      <header id="nav" className={`site-header sticky top-0 z-50${navOn ? ' on' : ''}`}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="h-[68px] flex items-center justify-between gap-3 lg:gap-6">
            <Link href="/" className="nav-logo flex items-center gap-3 flex-shrink-0" aria-label="Уманська ЦРЛ — Головна">
              <span className="nav-logo-mark" aria-hidden="true">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <rect width="30" height="30" rx="8" fill="#2563eb" />
                  <rect x="12" y="4" width="6" height="22" rx="2" fill="white" />
                  <rect x="4" y="12" width="22" height="6" rx="2" fill="white" />
                </svg>
              </span>
              <span className="nav-logo-text">
                <span className="nav-logo-title">Уманська ЦРЛ</span>
                <span className="nav-logo-sub">Центральна районна лікарня</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Головне меню">
              <Link href="/" className={`nav-link${isHome ? ' nav-link--active' : ''}`}>
                Головна
              </Link>

              <div
                className={`has-dropdown${openMenu === 'about' ? ' is-open' : ''}`}
                onMouseEnter={() => setOpenMenu('about')}
                onMouseLeave={() => setOpenMenu((v) => (v === 'about' ? null : v))}
              >
                <button className={`nav-link nav-link--dropdown${isProLikarnyu ? ' nav-link--active' : ''}`} aria-haspopup="true" aria-expanded={openMenu === 'about'}>
                  Про лікарню
                  <svg className="nav-chevron" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="dropdown" role="menu">
                  <div className="dropdown-section">
                    <Link href="/zagalna-informatsiya" className={`dropdown-item${isZagalna ? ' dropdown-item--active' : ''}`} role="menuitem">
                      <span className="dropdown-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </span>
                      Загальна інформація
                    </Link>
                    <Link href="/administratsiya" className={`dropdown-item${isAdministratsiya ? ' dropdown-item--active' : ''}`} role="menuitem">
                      <span className="dropdown-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </span>
                      Адміністрація
                    </Link>
                    <Link href="/litsenzijni-dokumenty" className={`dropdown-item${isLitsenzijniDokumenty ? ' dropdown-item--active' : ''}`} role="menuitem">
                      <span className="dropdown-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </span>
                      Установчі документи
                    </Link>
                    <Link href="/viddilennya" className={`dropdown-item${isViddilennya ? ' dropdown-item--active' : ''}`} role="menuitem">
                      <span className="dropdown-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                      </span>
                      Відділення
                    </Link>
                    <Link href="/istoriya-zakladu" className={`dropdown-item${isIstoriya ? ' dropdown-item--active' : ''}`} role="menuitem">
                      <span className="dropdown-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </span>
                      Історія закладу
                    </Link>
                    <Link href="/fotogalereya" className={`dropdown-item${isFotogalereya ? ' dropdown-item--active' : ''}`} role="menuitem">
                      <span className="dropdown-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </span>
                      Фотогалерея
                    </Link>
                  </div>
                </div>
              </div>

              <div
                className={`has-dropdown${openMenu === 'public' ? ' is-open' : ''}`}
                onMouseEnter={() => setOpenMenu('public')}
                onMouseLeave={() => setOpenMenu((v) => (v === 'public' ? null : v))}
              >
                <button className="nav-link nav-link--dropdown" aria-haspopup="true" aria-expanded={openMenu === 'public'}>
                  Публічна інформація
                  <svg className="nav-chevron" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="dropdown dropdown--wide" role="menu">
                  <div className="dropdown-section">
                    <p className="dropdown-label">Фінанси та звітність</p>
                    <a href="https://uman.crl.net.ua/platni-poslugy/" target="_blank" className="dropdown-item" role="menuitem">
                      <span className="dropdown-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                      </span>
                      Платні послуги
                    </a>
                    <a href="https://uman.crl.net.ua/finansova-diyalnist/" target="_blank" className="dropdown-item" role="menuitem">
                      <span className="dropdown-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                      </span>
                      Фінансова діяльність
                    </a>
                    <a href="https://uman.crl.net.ua/analiz-gospodarskoyi-diyalnosti/" target="_blank" className="dropdown-item" role="menuitem">
                      <span className="dropdown-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </span>
                      Аналіз госп. діяльності
                    </a>
                    <a href="https://uman.crl.net.ua/nadhodzhennya-i-vykorystannya-blagodijnyh-vneskiv/" target="_blank" className="dropdown-item" role="menuitem">
                      <span className="dropdown-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </span>
                      Благодійні внески
                    </a>
                  </div>
                  <div className="dropdown-section dropdown-section--border">
                    <p className="dropdown-label">Закупівлі</p>
                    <a href="https://uman.crl.net.ua/zalyshky-likarskyh-zasobiv-za-derzhavni-koshty/" target="_blank" className="dropdown-item" role="menuitem">
                      <span className="dropdown-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                      </span>
                      Залишки лікарських засобів
                    </a>
                    <a href="https://uman.crl.net.ua/obgruntuvannya-2/" target="_blank" className="dropdown-item" role="menuitem">
                      <span className="dropdown-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                      </span>
                      Обгрунтування, відкриті торги
                    </a>
                    <a href="https://e-tender.ua/prozoro" target="_blank" className="dropdown-item dropdown-item--external" role="menuitem">
                      <span className="dropdown-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </span>
                      Держзакупівлі Prozorro ↗
                    </a>
                  </div>
                </div>
              </div>

              <div
                className={`has-dropdown${openMenu === 'pubs' ? ' is-open' : ''}`}
                onMouseEnter={() => setOpenMenu('pubs')}
                onMouseLeave={() => setOpenMenu((v) => (v === 'pubs' ? null : v))}
              >
                <button className={`nav-link nav-link--dropdown${isNovyny ? ' nav-link--active' : ''}`} aria-haspopup="true" aria-expanded={openMenu === 'pubs'}>
                  Публікації
                  <svg className="nav-chevron" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="dropdown" role="menu">
                  <div className="dropdown-section">
                    <Link href="/novyny" className={`dropdown-item${isNovyny ? ' dropdown-item--active' : ''}`} role="menuitem">
                      <span className="dropdown-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                      </span>
                      Новини
                    </Link>
                    <a href="https://uman.crl.net.ua/category/porady-likarya/" target="_blank" className="dropdown-item" role="menuitem">
                      <span className="dropdown-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </span>
                      Поради лікаря
                    </a>
                    <a href="https://uman.crl.net.ua/category/ty-yak/" target="_blank" className="dropdown-item" role="menuitem">
                      <span className="dropdown-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </span>
                      Ти як?
                    </a>
                    <a href="https://uman.crl.net.ua/category/vaktsynatsiya-vid-covid-19/" target="_blank" className="dropdown-item" role="menuitem">
                      <span className="dropdown-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                      </span>
                      Вакцинація від COVID-19
                    </a>
                    <a href="https://uman.crl.net.ua/korysni-posylannya/" target="_blank" className="dropdown-item" role="menuitem">
                      <span className="dropdown-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      </span>
                      Корисні посилання
                    </a>
                  </div>
                </div>
              </div>

              <Link href="/#contacts" className="nav-link">Контакти</Link>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button id="theme-toggle" className="nav-theme-toggle" aria-label="Перемкнути тему" onClick={toggleTheme}>
                <svg className="theme-icon-moon" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
                <svg className="theme-icon-sun" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m9-9h-1.5m-15 0H3m15.364 6.364l-1.06-1.06M6.696 6.696l-1.06-1.06m12.728 0l-1.06 1.06M6.696 17.304l-1.06 1.06M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                </svg>
              </button>
              <Link href="/#contacts" className="nav-cta hidden sm:inline-flex items-center gap-1.5">
                Записатись
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <button
                id="burger"
                className="nav-burger lg:hidden"
                aria-label="Відкрити меню"
                aria-expanded={mobileOpen}
                aria-controls="mob"
                onClick={() => setMobileOpen((v) => !v)}
              >
                <svg id="ico-open" className={`w-5 h-5${mobileOpen ? ' hidden' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                <svg id="ico-close" className={`w-5 h-5${mobileOpen ? '' : ' hidden'}`} fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div id="mob" className={mobileOpen ? 'open' : ''} aria-hidden={!mobileOpen}>
          <div className="mob-inner max-w-screen-xl mx-auto px-6">
            <div className="mob-section">
              <p className="mob-label">Навігація</p>
              <Link href="/" onClick={closeMobile} className={`mob-item${isHome ? ' mob-item--active' : ''}`}>Головна</Link>
              <Link href="/zagalna-informatsiya" onClick={closeMobile} className={`mob-item${isZagalna ? ' mob-item--active' : ''}`}>Загальна інформація</Link>
              <Link href="/viddilennya" onClick={closeMobile} className={`mob-item${isViddilennya ? ' mob-item--active' : ''}`}>Відділення</Link>
              <Link href="/administratsiya" onClick={closeMobile} className={`mob-item${isAdministratsiya ? ' mob-item--active' : ''}`}>Адміністрація</Link>
              <Link href="/istoriya-zakladu" onClick={closeMobile} className={`mob-item${isIstoriya ? ' mob-item--active' : ''}`}>Історія закладу</Link>
              <Link href="/fotogalereya" onClick={closeMobile} className={`mob-item${isFotogalereya ? ' mob-item--active' : ''}`}>Фотогалерея</Link>
            </div>
            <div className="mob-section">
              <p className="mob-label">Публічна інформація</p>
              <a href="https://uman.crl.net.ua/platni-poslugy/" target="_blank" className="mob-item">Платні послуги</a>
              <a href="https://uman.crl.net.ua/finansova-diyalnist/" target="_blank" className="mob-item">Фінансова діяльність</a>
              <a href="https://e-tender.ua/prozoro" target="_blank" className="mob-item">Держзакупівлі Prozorro ↗</a>
            </div>
            <div className="mob-section">
              <p className="mob-label">Публікації</p>
              <Link href="/novyny" onClick={closeMobile} className={`mob-item${isNovyny ? ' mob-item--active' : ''}`}>Новини</Link>
              <a href="https://uman.crl.net.ua/category/porady-likarya/" target="_blank" className="mob-item">Поради лікаря</a>
              <a href="https://uman.crl.net.ua/category/vaktsynatsiya-vid-covid-19/" target="_blank" className="mob-item">Вакцинація</a>
            </div>
            <div className="mob-actions">
              <Link href="/#contacts" onClick={closeMobile} className="mob-cta" id="mob-cta-link">Записатись</Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
