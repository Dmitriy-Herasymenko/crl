/* ============================================================
   Уманська ЦРЛ — theme.js
   Light/dark theme switching. Toggle button is injected as part
   of the header component (#theme-toggle).
   ============================================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'theme';
  const root = document.documentElement;

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* localStorage unavailable — theme just won't persist */
    }
  }

  function prefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(theme) {
    root.classList.toggle('dark', theme === 'dark');
  }

  // Apply the correct theme immediately (before first paint) to avoid a flash.
  const initialTheme = getStoredTheme() || (prefersDark() ? 'dark' : 'light');
  applyTheme(initialTheme);

  function toggleTheme() {
    const next = root.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next);
    storeTheme(next);
  }

  // Event delegation: the header (and its #theme-toggle button) is injected
  // later by header.js, so we can't bind directly to the button yet.
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('#theme-toggle');
    if (btn) toggleTheme();
  });

  // Follow the OS theme live, unless the user has made an explicit choice.
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!getStoredTheme()) applyTheme(e.matches ? 'dark' : 'light');
    });
  }
})();
