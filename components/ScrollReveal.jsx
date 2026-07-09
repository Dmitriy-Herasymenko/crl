'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -24px 0px' }
    );

    const observeAll = () => {
      document.querySelectorAll('.reveal:not(.in), .reveal-r:not(.in)').forEach((el) => observer.observe(el));
    };

    observeAll();

    // Client-side navigations that only change search params (filters, sort,
    // search, pagination) keep the same pathname, so watching pathname alone
    // misses newly rendered .reveal elements — they'd sit at opacity:0
    // forever. Watch the DOM directly instead, which catches every case.
    const mutationObserver = new MutationObserver(observeAll);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
