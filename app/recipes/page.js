'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/language';
import { getRecipes } from '@/lib/recipes';
import RecipeCard from '@/components/RecipeCard';

export default function BrowsePage() {
  const { t } = useLanguage();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getRecipes()
      .then(setRecipes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = search
    ? recipes.filter(
        (r) =>
          r.title?.toLowerCase().includes(search.toLowerCase()) ||
          r.tags?.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
      )
    : recipes;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-800">{t.browse.title}</h1>
        <Link
          href="/recipes/new"
          className="px-5 py-2.5 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors"
        >
          + {t.nav.add}
        </Link>
      </div>

      <input
        type="search"
        placeholder={t.browse.search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-orange-100 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-400 text-gray-700"
      />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-9 h-9 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <p className="text-6xl">🍽️</p>
          <p className="text-gray-500 text-lg">{t.browse.empty}</p>
          <Link href="/recipes/new" className="text-brand-500 font-semibold hover:underline">
            {t.browse.addFirst}
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
