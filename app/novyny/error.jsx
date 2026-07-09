'use client';

import Link from 'next/link';

export default function NewsError({ reset }) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-gray-500 mb-6">
          Не вдалося завантажити новини — сайт лікарні тимчасово недоступний або відповідає надто довго.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            Спробувати ще раз
          </button>
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-700">
            На головну
          </Link>
        </div>
      </div>
    </section>
  );
}
