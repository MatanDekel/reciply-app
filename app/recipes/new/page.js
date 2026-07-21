'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/language';
import { addRecipe } from '@/lib/recipes';
import { parseRecipeText } from '@/lib/parseRecipe';

const emptyIngredient = () => ({ amount: '', unit: '', name: '' });

const emptyForm = () => ({
  title:        '',
  description:  '',
  servings:     '',
  prepTime:     '',
  cookTime:     '',
  ingredients:  [emptyIngredient()],
  instructions: '',
  videoUrl:     '',
  tags:         '',
  emoji:        '🍳',
});

export default function AddRecipePage() {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const [rawText, setRawText] = useState('');
  const [form, setForm]       = useState(emptyForm());
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  /* ── Text parsing (client-side, no API) ─────────────────────── */
  const parseText = () => {
    if (!rawText.trim()) return;
    const { ingredients, instructions } = parseRecipeText(rawText);
    setForm((f) => ({
      ...f,
      ingredients: ingredients.length ? ingredients : [emptyIngredient()],
      instructions,
    }));
  };

  /* ── Ingredient helpers ──────────────────────────────────────── */
  const updateIngredient = (idx, field, value) =>
    setForm((f) => {
      const ingredients = [...f.ingredients];
      ingredients[idx] = { ...ingredients[idx], [field]: value };
      return { ...f, ingredients };
    });

  const addIngredient    = () => setForm((f) => ({ ...f, ingredients: [...f.ingredients, emptyIngredient()] }));
  const removeIngredient = (idx) => setForm((f) => ({ ...f, ingredients: f.ingredients.filter((_, i) => i !== idx) }));

  /* ── Save ────────────────────────────────────────────────────── */
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const id = await addRecipe({
        title:        form.title,
        description:  form.description,
        servings:     Number(form.servings) || null,
        prepTime:     Number(form.prepTime) || null,
        cookTime:     Number(form.cookTime) || null,
        ingredients:  form.ingredients.filter((i) => i.name),
        instructions: form.instructions,
        videoUrl:     form.videoUrl || null,
        tags:         form.tags.split(',').map((s) => s.trim()).filter(Boolean),
        emoji:        form.emoji,
        lang,
      });
      setSaved(true);
      setTimeout(() => router.push(`/recipes/${id}`), 1200);
    } finally {
      setSaving(false);
    }
  };

  const input = 'w-full px-4 py-2.5 rounded-xl border border-orange-100 bg-white focus:outline-none focus:ring-2 focus:ring-brand-400 text-gray-700';

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">{t.add.pageTitle}</h1>

      {/* ── Quick-paste parser ── */}
      <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            {t.add.pasteLabel}
          </label>
          <p className="text-xs text-gray-400 mb-3 whitespace-pre-line">{t.add.pasteHint}</p>
        </div>
        <textarea
          rows={8}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder={t.add.pastePlaceholder}
          className={`${input} resize-y font-mono text-sm`}
          dir="auto"
        />
        <button
          type="button"
          onClick={parseText}
          disabled={!rawText.trim()}
          className="px-5 py-2.5 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600 disabled:opacity-40 transition-colors"
        >
          {t.add.parseBtn}
        </button>
      </div>

      {/* ── Recipe form ── */}
      <form onSubmit={handleSave} className="space-y-6">

        {/* Emoji + Title */}
        <div className="flex gap-3 items-end">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">{t.add.form.emoji}</label>
            <input
              value={form.emoji}
              onChange={(e) => set('emoji', e.target.value)}
              maxLength={2}
              className="w-14 text-2xl text-center px-1 py-2 rounded-xl border border-orange-100 bg-white focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1">{t.add.form.title}</label>
            <input required value={form.title} onChange={(e) => set('title', e.target.value)} className={input} />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">{t.add.form.description}</label>
          <textarea rows={2} value={form.description} onChange={(e) => set('description', e.target.value)} className={`${input} resize-none`} />
        </div>

        {/* Timing row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            ['prepTime', t.add.form.prepTime],
            ['cookTime', t.add.form.cookTime],
            ['servings', t.add.form.servings],
          ].map(([field, label]) => (
            <div key={field}>
              <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
              <input
                type="number"
                min="0"
                value={form[field]}
                onChange={(e) => set(field, e.target.value)}
                className={input}
              />
            </div>
          ))}
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2">{t.add.form.ingredients}</label>
          <div className="space-y-2">
            {form.ingredients.map((ing, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  placeholder={t.add.form.amount}
                  value={ing.amount}
                  onChange={(e) => updateIngredient(idx, 'amount', e.target.value)}
                  className="w-20 px-3 py-2 rounded-xl border border-orange-100 bg-white focus:outline-none focus:ring-2 focus:ring-brand-400 text-gray-700 text-sm"
                />
                <input
                  placeholder={t.add.form.unit}
                  value={ing.unit}
                  onChange={(e) => updateIngredient(idx, 'unit', e.target.value)}
                  className="w-24 px-3 py-2 rounded-xl border border-orange-100 bg-white focus:outline-none focus:ring-2 focus:ring-brand-400 text-gray-700 text-sm"
                />
                <input
                  placeholder={t.add.form.ingredientName}
                  value={ing.name}
                  onChange={(e) => updateIngredient(idx, 'name', e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-orange-100 bg-white focus:outline-none focus:ring-2 focus:ring-brand-400 text-gray-700 text-sm"
                />
                {form.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(idx)}
                    className="text-gray-300 hover:text-red-400 text-2xl leading-none w-6"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addIngredient}
            className="mt-2 text-brand-500 text-sm font-semibold hover:underline"
          >
            {t.add.form.addIngredient}
          </button>
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">{t.add.form.instructions}</label>
          <textarea
            rows={7}
            value={form.instructions}
            onChange={(e) => set('instructions', e.target.value)}
            className={`${input} resize-y`}
            dir="auto"
          />
        </div>

        {/* Video URL */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">{t.add.form.videoUrl}</label>
          <input type="url" value={form.videoUrl} onChange={(e) => set('videoUrl', e.target.value)} className={input} />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">{t.add.form.tags}</label>
          <input value={form.tags} onChange={(e) => set('tags', e.target.value)} className={input} />
        </div>

        {/* Save */}
        <button
          type="submit"
          disabled={saving || saved || !form.title}
          className="w-full py-3 rounded-xl bg-brand-500 text-white font-bold text-lg hover:bg-brand-600 disabled:opacity-40 transition-colors"
        >
          {saved ? t.add.saved : saving ? t.add.saving : t.add.save}
        </button>
      </form>
    </div>
  );
}
