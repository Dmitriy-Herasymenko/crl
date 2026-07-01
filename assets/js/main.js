'use strict';

const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('on', window.scrollY > 50);
}, { passive: true });

const burger   = document.getElementById('burger');
const mob      = document.getElementById('mob');
const icoOpen  = document.getElementById('ico-open');
const icoClose = document.getElementById('ico-close');
let mOpen = false;

const scrollTopBtn = () => document.getElementById('scroll-top');

burger.addEventListener('click', () => {
  mOpen = !mOpen;
  mob.classList.toggle('open', mOpen);
  burger.setAttribute('aria-expanded', String(mOpen));
  mob.setAttribute('aria-hidden', String(!mOpen));
  icoOpen.classList.toggle('hidden', mOpen);
  icoClose.classList.toggle('hidden', !mOpen);
  const st = scrollTopBtn();
  if (st) st.style.visibility = mOpen ? 'hidden' : '';
});

function closeMob() {
  mOpen = false;
  mob.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  mob.setAttribute('aria-hidden', 'true');
  icoOpen.classList.remove('hidden');
  icoClose.classList.add('hidden');
  const st = scrollTopBtn();
  if (st) st.style.visibility = '';
}

const mobCtaLink = document.getElementById('mob-cta-link');
if (mobCtaLink) mobCtaLink.addEventListener('click', closeMob);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });

document.querySelectorAll('.reveal, .reveal-r').forEach(el => revealObserver.observe(el));

const statNums = document.querySelectorAll('.stat-num[data-count]');
if (statNums.length) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  statNums.forEach(el => countObserver.observe(el));
}

if (document.querySelector('.news-swiper')) {
  new Swiper('.news-swiper', {
    slidesPerView: 1.15,
    spaceBetween: 16,
    loop: false,
    grabCursor: true,
    pagination: {
      el: '.news-swiper-pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.news-swiper-prev',
      nextEl: '.news-swiper-next',
    },
    breakpoints: {
      640:  { slidesPerView: 2,   spaceBetween: 16 },
      1024: { slidesPerView: 3,   spaceBetween: 20 },
      1280: { slidesPerView: 4,   spaceBetween: 20 },
    },
  });
}

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#nav nav a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 90) current = s.id;
  });
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('text-gray-900', active);
    link.classList.toggle('font-medium', active);
  });
}, { passive: true });
