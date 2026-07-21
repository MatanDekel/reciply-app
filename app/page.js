'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/language';
import { getFavoriteIds } from '@/lib/favorites';
import { getRecipesByIds } from '@/lib/recipes';
import RecipeCard from '@/components/RecipeCard';

export default function HomePage() {
  const { t } = useLanguage();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = getFavoriteIds();
    if (!ids.length) { setLoading(false); return; }
    getRecipesByIds(ids)
      .then(setFavorites)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center py-12 space-y-4">
        <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
          {t.hero.titleParts[0]}
          <span className="text-brand-500">{t.hero.titleParts[1]}</span>
          {t.hero.titleParts[2]}
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">{t.hero.subtitle}</p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            href="/recipes"
            className="px-6 py-3 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors"
          >
            {t.hero.browseBtn}
          </Link>
          <Link
            href="/recipes/new"
            className="px-6 py-3 rounded-full border border-brand-500 text-brand-600 font-semibold hover:bg-brand-50 transition-colors"
          >
            {t.hero.addBtn}
          </Link>
        </div>
      </section>

      {/* Favourites */}
      <section>
        <h2 className="text-2xl font-bold text-gray-700 mb-6">{t.home.favorites}</h2>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl border border-orange-100 text-center gap-2">
            <span className="text-5xl">🤍</span>
            <p className="text-gray-500 font-medium">{t.home.noFavorites}</p>
            <p className="text-sm text-gray-400">{t.home.favHint}</p>
            <Link
              href="/recipes"
              className="mt-3 px-5 py-2 rounded-full bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors"
            >
              {t.nav.browse}
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
