'use client';

import { useState } from 'react';

export default function ShareButtons({ title }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  }

  function shareFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'noopener,width=600,height=500');
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-400 font-medium mr-1">Поділитися:</span>
      <button
        type="button"
        onClick={shareFacebook}
        aria-label="Поділитися у Facebook"
        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-blue-700 flex items-center justify-center transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
      </button>
      <button
        type="button"
        onClick={copyLink}
        aria-label="Скопіювати посилання"
        className="h-8 px-3 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-blue-700 flex items-center gap-1.5 text-xs font-medium transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
        {copied ? 'Скопійовано!' : 'Копіювати посилання'}
      </button>
    </div>
  );
}
