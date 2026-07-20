'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/language';

export default function RecipeCard({ recipe }) {
  const { t } = useLanguage();

  const timeParts = [
    recipe.prepTime && `${recipe.prepTime} ${t.detail.mins}`,
    recipe.cookTime && `+ ${recipe.cookTime} ${t.detail.mins}`,
  ].filter(Boolean);

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group bg-white rounded-2xl shadow-sm border border-orange-100 p-6 hover:shadow-md hover:border-brand-300 transition-all flex flex-col"
    >
      <div className="text-5xl mb-4">{recipe.emoji || '🍽️'}</div>
      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-brand-600 transition-colors line-clamp-2 flex-1">
        {recipe.title}
      </h3>
      {recipe.description && (
        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{recipe.description}</p>
      )}
      <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
        {timeParts.length > 0 && <span>⏱ {timeParts.join(' ')}</span>}
        {recipe.servings && <span>👤 {recipe.servings} {t.recipe.servings}</span>}
      </div>
      {recipe.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
