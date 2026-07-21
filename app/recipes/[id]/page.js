'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/language';
import { getRecipe } from '@/lib/recipes';
import { isFavorite, toggleFavorite } from '@/lib/favorites';
import IngredientList from '@/components/IngredientList';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    getRecipe(id)
      .then((r) => {
        if (!r) router.replace('/recipes');
        else setRecipe(r);
      })
      .catch(() => router.replace('/recipes'))
      .finally(() => setLoading(false));
    setFav(isFavorite(id));
  }, [id]);

  const handleFav = () => setFav(toggleFavorite(id));

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="w-9 h-9 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!recipe) return null;

  return (
    <article className="max-w-2xl mx-auto space-y-8">
      {/* Back */}
      <Link href="/recipes" className="text-brand-500 hover:underline text-sm font-medium">
        {t.detail.back}
      </Link>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            {recipe.emoji && <div className="text-6xl">{recipe.emoji}</div>}
            <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">{recipe.title}</h1>
            {recipe.description && (
              <p className="text-gray-500 text-lg leading-relaxed">{recipe.description}</p>
            )}
          </div>
          <button
            onClick={handleFav}
            className={`flex-shrink-0 mt-2 px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${
              fav
                ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100'
                : 'bg-white border-orange-100 text-gray-500 hover:border-brand-400 hover:text-brand-600'
            }`}
          >
            {fav ? t.detail.unfavorite : t.detail.favorite}
          </button>
        </div>
      </div>

      {/* Meta cards */}
      {(recipe.prepTime || recipe.cookTime || recipe.servings) && (
        <div className="flex flex-wrap gap-3">
          {recipe.prepTime && (
            <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-orange-100 text-center min-w-[80px]">
              <div className="text-xs text-gray-400 uppercase tracking-wide">{t.detail.prepTime}</div>
              <div className="text-lg font-bold text-gray-700 mt-0.5">
                {recipe.prepTime} {t.detail.mins}
              </div>
            </div>
          )}
          {recipe.cookTime && (
            <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-orange-100 text-center min-w-[80px]">
              <div className="text-xs text-gray-400 uppercase tracking-wide">{t.detail.cookTime}</div>
              <div className="text-lg font-bold text-gray-700 mt-0.5">
                {recipe.cookTime} {t.detail.mins}
              </div>
            </div>
          )}
          {recipe.servings && (
            <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-orange-100 text-center min-w-[80px]">
              <div className="text-xs text-gray-400 uppercase tracking-wide">{t.recipe.servings}</div>
              <div className="text-lg font-bold text-gray-700 mt-0.5">{recipe.servings}</div>
            </div>
          )}
        </div>
      )}

      {/* Ingredients with checkboxes + WhatsApp */}
      {recipe.ingredients?.length > 0 && (
        <IngredientList ingredients={recipe.ingredients} recipeName={recipe.title} />
      )}

      {/* Instructions */}
      {recipe.instructions && (
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">{t.detail.instructions}</h2>
          <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 space-y-3">
            {recipe.instructions.split('\n').map((line, i) =>
              line.trim() ? (
                <p key={i} className="text-gray-700 leading-relaxed">
                  {line}
                </p>
              ) : (
                <div key={i} className="h-2" />
              )
            )}
          </div>
        </div>
      )}

      {/* Video link */}
      {recipe.videoUrl && (
        <a
          href={recipe.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
        >
          {t.detail.watchVideo}
        </a>
      )}

      {/* Tags */}
      {recipe.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {recipe.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
