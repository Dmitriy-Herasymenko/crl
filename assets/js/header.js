/* ============================================================
   Уманська ЦРЛ — header.js
   Injects the site header as a reusable component.
   Works with file:// protocol (no fetch needed).
   ============================================================ */

(function () {
  'use strict';

  const HEADER_HTML = `
<!-- ══ TOPBAR ══ -->
<div id="topbar" class="topbar hidden sm:block">
  <div class="max-w-screen-xl mx-auto px-6 lg:px-10 h-9 flex items-center justify-between gap-4">

    <div class="flex items-center gap-5 text-xs">
      <a href="https://maps.google.com/?q=Білогрудівська+2+Умань" target="_blank"
         class="topbar-link flex items-center gap-1.5">
        <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        вул. Білогрудівська 2, Паланська ТГ
      </a>
      <span class="topbar-divider"></span>
      <a href="mailto:umancrl@gmail.com" class="topbar-link flex items-center gap-1.5">
        <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
        umancrl@gmail.com
      </a>
    </div>

    <div class="flex items-center gap-5 text-xs">
      <span class="flex items-center gap-1.5 text-white/60">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Пн–Пт, 08:00–16:45
      </span>
      <span class="topbar-divider"></span>
      <a href="https://www.facebook.com/umancrl/" target="_blank" rel="noopener"
         class="topbar-link flex items-center gap-1.5">
        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        Facebook
      </a>
    </div>

  </div>
</div>

<!-- ══ NAV ══ -->
<header id="nav" class="site-header sticky top-0 z-50">
  <div class="max-w-screen-xl mx-auto px-6 lg:px-10">
    <div class="h-[68px] flex items-center justify-between gap-3 lg:gap-6">

      <!-- Logo -->
      <a href="index.html" class="nav-logo flex items-center gap-3 flex-shrink-0" aria-label="Уманська ЦРЛ — Головна">
        <span class="nav-logo-mark" aria-hidden="true">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <rect width="30" height="30" rx="8" fill="#2563eb"/>
            <rect x="12" y="4"  width="6" height="22" rx="2" fill="white"/>
            <rect x="4"  y="12" width="22" height="6"  rx="2" fill="white"/>
          </svg>
        </span>
        <span class="nav-logo-text">
          <span class="nav-logo-title">Уманська ЦРЛ</span>
          <span class="nav-logo-sub">Центральна районна лікарня</span>
        </span>
      </a>

      <!-- Desktop nav -->
      <nav class="hidden lg:flex items-center gap-1" role="navigation" aria-label="Головне меню">

        <a href="index.html" class="nav-link nav-link--active">Головна</a>

        <!-- Про лікарню -->
        <div class="has-dropdown">
          <button class="nav-link nav-link--dropdown" aria-haspopup="true" aria-expanded="false">
            Про лікарню
            <svg class="nav-chevron" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div class="dropdown" role="menu">
            <div class="dropdown-section">
              <a href="https://uman.crl.net.ua/zagalna-informatsiya/" target="_blank" class="dropdown-item" role="menuitem">
                <span class="dropdown-icon"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></span>
                Загальна інформація
              </a>
              <a href="https://uman.crl.net.ua/administratsiya-2/" target="_blank" class="dropdown-item" role="menuitem">
                <span class="dropdown-icon"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg></span>
                Адміністрація
              </a>
              <a href="https://uman.crl.net.ua/litsenzijni-dokumenty/" target="_blank" class="dropdown-item" role="menuitem">
                <span class="dropdown-icon"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></span>
                Установчі документи
              </a>
              <a href="https://uman.crl.net.ua/viddilennya/" target="_blank" class="dropdown-item" role="menuitem">
                <span class="dropdown-icon"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg></span>
                Відділення
              </a>
              <a href="https://uman.crl.net.ua/istoriya-zakladu/" target="_blank" class="dropdown-item" role="menuitem">
                <span class="dropdown-icon"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></span>
                Історія закладу
              </a>
              <a href="https://uman.crl.net.ua/fotogalereya/" target="_blank" class="dropdown-item" role="menuitem">
                <span class="dropdown-icon"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></span>
                Фотогалерея
              </a>
            </div>
          </div>
        </div>

        <!-- Публічна інформація -->
        <div class="has-dropdown">
          <button class="nav-link nav-link--dropdown" aria-haspopup="true" aria-expanded="false">
            Публічна інформація
            <svg class="nav-chevron" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div class="dropdown dropdown--wide" role="menu">
            <div class="dropdown-section">
              <p class="dropdown-label">Фінанси та звітність</p>
              <a href="https://uman.crl.net.ua/platni-poslugy/" target="_blank" class="dropdown-item" role="menuitem">
                <span class="dropdown-icon"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg></span>
                Платні послуги
              </a>
              <a href="https://uman.crl.net.ua/finansova-diyalnist/" target="_blank" class="dropdown-item" role="menuitem">
                <span class="dropdown-icon"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg></span>
                Фінансова діяльність
              </a>
              <a href="https://uman.crl.net.ua/analiz-gospodarskoyi-diyalnosti/" target="_blank" class="dropdown-item" role="menuitem">
                <span class="dropdown-icon"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></span>
                Аналіз госп. діяльності
              </a>
              <a href="https://uman.crl.net.ua/nadhodzhennya-i-vykorystannya-blagodijnyh-vneskiv/" target="_blank" class="dropdown-item" role="menuitem">
                <span class="dropdown-icon"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg></span>
                Благодійні внески
              </a>
            </div>
            <div class="dropdown-section dropdown-section--border">
              <p class="dropdown-label">Закупівлі</p>
              <a href="https://uman.crl.net.ua/zalyshky-likarskyh-zasobiv-za-derzhavni-koshty/" target="_blank" class="dropdown-item" role="menuitem">
                <span class="dropdown-icon"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg></span>
                Залишки лікарських засобів
              </a>
              <a href="https://uman.crl.net.ua/obgruntuvannya-2/" target="_blank" class="dropdown-item" role="menuitem">
                <span class="dropdown-icon"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg></span>
                Обгрунтування, відкриті торги
              </a>
              <a href="https://e-tender.ua/prozoro" target="_blank" class="dropdown-item dropdown-item--external" role="menuitem">
                <span class="dropdown-icon"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></span>
                Держзакупівлі Prozorro ↗
              </a>
            </div>
          </div>
        </div>

        <!-- Публікації -->
        <div class="has-dropdown">
          <button class="nav-link nav-link--dropdown" aria-haspopup="true" aria-expanded="false">
            Публікації
            <svg class="nav-chevron" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div class="dropdown" role="menu">
            <div class="dropdown-section">
              <a href="https://uman.crl.net.ua/category/novyny/" target="_blank" class="dropdown-item" role="menuitem">
                <span class="dropdown-icon"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg></span>
                Новини
              </a>
              <a href="https://uman.crl.net.ua/category/porady-likarya/" target="_blank" class="dropdown-item" role="menuitem">
                <span class="dropdown-icon"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg></span>
                Поради лікаря
              </a>
              <a href="https://uman.crl.net.ua/category/ty-yak/" target="_blank" class="dropdown-item" role="menuitem">
                <span class="dropdown-icon"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></span>
                Ти як?
              </a>
              <a href="https://uman.crl.net.ua/category/vaktsynatsiya-vid-covid-19/" target="_blank" class="dropdown-item" role="menuitem">
                <span class="dropdown-icon"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg></span>
                Вакцинація від COVID-19
              </a>
              <a href="https://uman.crl.net.ua/korysni-posylannya/" target="_blank" class="dropdown-item" role="menuitem">
                <span class="dropdown-icon"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></span>
                Корисні посилання
              </a>
            </div>
          </div>
        </div>

        <a href="#contacts" class="nav-link">Контакти</a>
      </nav>

      <!-- Right actions -->
      <div class="flex items-center gap-2">
        <button id="theme-toggle" class="nav-theme-toggle" aria-label="Перемкнути тему">
          <svg class="theme-icon-moon" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
          <svg class="theme-icon-sun" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1.5m0 15V21m9-9h-1.5m-15 0H3m15.364 6.364l-1.06-1.06M6.696 6.696l-1.06-1.06m12.728 0l-1.06 1.06M6.696 17.304l-1.06 1.06M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"/>
          </svg>
        </button>
        <a href="#contacts" class="nav-cta hidden sm:inline-flex items-center gap-1.5">
          Записатись
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
        <button id="burger" class="nav-burger lg:hidden" aria-label="Відкрити меню" aria-expanded="false" aria-controls="mob">
          <svg id="ico-open"  class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          <svg id="ico-close" class="w-5 h-5 hidden" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

    </div>
  </div>

  <!-- Mobile menu panel -->
  <div id="mob" aria-hidden="true">
    <div class="mob-inner max-w-screen-xl mx-auto px-6">
      <div class="mob-section">
        <p class="mob-label">Навігація</p>
        <a href="index.html"                                                                    class="mob-item">Головна</a>
        <a href="https://uman.crl.net.ua/zagalna-informatsiya/"                  target="_blank" class="mob-item">Загальна інформація</a>
        <a href="https://uman.crl.net.ua/viddilennya/"                           target="_blank" class="mob-item">Відділення</a>
        <a href="https://uman.crl.net.ua/administratsiya-2/"                     target="_blank" class="mob-item">Адміністрація</a>
        <a href="https://uman.crl.net.ua/istoriya-zakladu/"                      target="_blank" class="mob-item">Історія закладу</a>
        <a href="https://uman.crl.net.ua/fotogalereya/"                          target="_blank" class="mob-item">Фотогалерея</a>
      </div>
      <div class="mob-section">
        <p class="mob-label">Публічна інформація</p>
        <a href="https://uman.crl.net.ua/platni-poslugy/"                        target="_blank" class="mob-item">Платні послуги</a>
        <a href="https://uman.crl.net.ua/finansova-diyalnist/"                   target="_blank" class="mob-item">Фінансова діяльність</a>
        <a href="https://e-tender.ua/prozoro"                                    target="_blank" class="mob-item">Держзакупівлі Prozorro ↗</a>
      </div>
      <div class="mob-section">
        <p class="mob-label">Публікації</p>
        <a href="https://uman.crl.net.ua/category/novyny/"                       target="_blank" class="mob-item">Новини</a>
        <a href="https://uman.crl.net.ua/category/porady-likarya/"               target="_blank" class="mob-item">Поради лікаря</a>
        <a href="https://uman.crl.net.ua/category/vaktsynatsiya-vid-covid-19/"   target="_blank" class="mob-item">Вакцинація</a>
      </div>
      <div class="mob-actions">
        <a href="#contacts" class="mob-cta" id="mob-cta-link">Записатись</a>
      </div>
    </div>
  </div>
</header>
`;

  const mount = document.getElementById('site-header');
  if (mount) {
    mount.innerHTML = HEADER_HTML;
  }
})();
