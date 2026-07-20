'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/language';

const FEATURED = [
  {
    id:       'spaghetti-carbonara',
    title:    { en: 'Spaghetti Carbonara', he: 'ספגטי קרבונרה' },
    time:     25,
    servings: 2,
    emoji:    '🍝',
    tags:     { en: ['Italian', 'Pasta'], he: ['איטלקי', 'פסטה'] },
  },
  {
    id:       'chicken-tikka-masala',
    title:    { en: 'Chicken Tikka Masala', he: 'עוף טיקה מסאלה' },
    time:     45,
    servings: 4,
    emoji:    '🍛',
    tags:     { en: ['Indian', 'Curry'], he: ['הודי', 'קארי'] },
  },
  {
    id:       'avocado-toast',
    title:    { en: 'Avocado Toast', he: 'טוסט אבוקדו' },
    time:     10,
    servings: 1,
    emoji:    '🥑',
    tags:     { en: ['Breakfast', 'Quick'], he: ['ארוחת בוקר', 'מהיר'] },
  },
];

export default function HomePage() {
  const { lang, t } = useLanguage();

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

      {/* Featured recipes */}
      <section>
        <h2 className="text-2xl font-bold text-gray-700 mb-6">{t.home.featured}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="group bg-white rounded-2xl shadow-sm border border-orange-100 p-6 hover:shadow-md hover:border-brand-300 transition-all"
            >
              <div className="text-5xl mb-4">{recipe.emoji}</div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-brand-600 transition-colors">
                {recipe.title[lang]}
              </h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                <span>⏱ {recipe.time} {t.recipe.time}</span>
                <span>👤 {recipe.servings} {t.recipe.servings}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {recipe.tags[lang].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
