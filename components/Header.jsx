'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/language';

export default function Header() {
  const { t, toggle } = useLanguage();

  return (
    <header className="bg-white border-b border-orange-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🍳</span>
          <span className="text-xl font-bold text-brand-600 tracking-tight">Reciply</span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex items-center gap-3 text-sm font-medium text-gray-500">
            <Link href="/recipes" className="hover:text-brand-600 transition-colors">
              {t.nav.browse}
            </Link>
            <Link
              href="/recipes/new"
              className="px-4 py-1.5 rounded-full bg-brand-500 text-white hover:bg-brand-600 transition-colors"
            >
              {t.nav.add}
            </Link>
          </nav>

          <button
            onClick={toggle}
            className="px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-brand-400 hover:text-brand-600 transition-colors"
            aria-label="Switch language"
          >
            {t.toggleLabel}
          </button>
        </div>
      </div>
    </header>
  );
}
