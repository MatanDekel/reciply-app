'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/language';

export default function IngredientList({ ingredients = [], recipeName }) {
  const { t } = useLanguage();
  const [checked, setChecked] = useState({});

  const toggle = (i) => setChecked((prev) => ({ ...prev, [i]: !prev[i] }));

  const shareToWhatsApp = () => {
    const lines = ingredients
      .map((ing) => `• ${[ing.amount, ing.unit, ing.name].filter(Boolean).join(' ')}`)
      .join('\n');
    const text = `🍳 *${recipeName}*\n${t.detail.ingredients}:\n\n${lines}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-brand-50 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-bold text-gray-800">{t.detail.ingredients}</h2>
        <button
          onClick={shareToWhatsApp}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-colors"
        >
          <span>📤</span>
          {t.detail.shareWhatsapp}
        </button>
      </div>

      <ul className="space-y-2">
        {ingredients.map((ing, i) => (
          <li
            key={i}
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => toggle(i)}
          >
            <input
              type="checkbox"
              checked={!!checked[i]}
              onChange={() => toggle(i)}
              onClick={(e) => e.stopPropagation()}
              className="w-4 h-4 accent-brand-500 cursor-pointer flex-shrink-0"
            />
            <span
              className={`text-gray-700 transition-opacity ${
                checked[i] ? 'line-through opacity-40' : ''
              }`}
            >
              {[ing.amount, ing.unit, ing.name].filter(Boolean).join(' ')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
