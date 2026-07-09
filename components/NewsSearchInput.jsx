'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

function buildHref({ category, sort, q }) {
  const sp = new URLSearchParams();
  if (category && category !== 'all') sp.set('category', category);
  if (sort && sort !== 'newest') sp.set('sort', sort);
  if (q) sp.set('q', q);
  const qs = sp.toString();
  return qs ? `/novyny?${qs}` : '/novyny';
}

export default function NewsSearchInput({ initialQuery, category, sort }) {
  const [value, setValue] = useState(initialQuery);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Guards against the server round-trip for an earlier keystroke clobbering
  // what the user has typed since — without this, a slow live WP fetch
  // resolving mid-typing kept resetting the field to a shorter/older query,
  // which made search feel like it was stuck on empty results.
  const pendingOwnUpdate = useRef(false);

  useEffect(() => {
    if (pendingOwnUpdate.current) {
      pendingOwnUpdate.current = false;
      return;
    }
    setValue(initialQuery);
  }, [initialQuery]);

  // Search as you type, debounced so we're not firing a live WP request on
  // every keystroke.
  useEffect(() => {
    if (value === initialQuery) return;
    const timeout = setTimeout(() => {
      pendingOwnUpdate.current = true;
      startTransition(() => {
        router.replace(buildHref({ category, sort, q: value }), { scroll: false });
      });
    }, 350);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Пошук новин…"
          aria-label="Пошук новин"
          className="field w-48 sm:w-64 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-700 placeholder:text-gray-400"
        />
        {isPending && (
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" aria-hidden="true" />
        )}
      </div>
      <span className="ml-2 w-9 h-9 flex-shrink-0 rounded-lg bg-blue-600 text-white flex items-center justify-center">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
      </span>
    </div>
  );
}
