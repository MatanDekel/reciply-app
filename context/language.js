'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    dir: 'ltr',
    nav: {
      browse: 'Browse Recipes',
      add:    'Add Recipe',
    },
    hero: {
      titleParts: ['Cook something ', 'amazing', ' today.'],
      subtitle:   'Browse, save, and share your favourite recipes — all in one place.',
      browseBtn:  'Browse Recipes',
      addBtn:     'Add Recipe',
    },
    home: {
      featured: 'Featured Recipes',
    },
    browse: {
      title:    'Browse Recipes',
      search:   'Search recipes...',
      empty:    'No recipes yet.',
      addFirst: 'Be the first to add one!',
    },
    detail: {
      back:          '← Back to Recipes',
      ingredients:   'Ingredients',
      instructions:  'How to make it',
      watchVideo:    '▶ Watch Video',
      shareWhatsapp: 'Send to WhatsApp',
      prepTime:      'Prep',
      cookTime:      'Cook',
      mins:          'min',
    },
    add: {
      pageTitle:  'Add Recipe',
      pasteLabel: 'Paste recipe text — AI will extract it for you',
      parseBtn:   '✨ Parse with AI',
      parsing:    'Parsing...',
      parseError: 'Could not parse. Check your ANTHROPIC_API_KEY and try again.',
      form: {
        title:          'Recipe title *',
        description:    'Description',
        servings:       'Servings',
        prepTime:       'Prep (min)',
        cookTime:       'Cook (min)',
        ingredients:    'Ingredients',
        amount:         'Qty',
        unit:           'Unit',
        ingredientName: 'Ingredient',
        addIngredient:  '+ Add ingredient',
        instructions:   'Instructions',
        videoUrl:       'Video URL (optional)',
        tags:           'Tags (comma separated)',
        emoji:          'Emoji',
      },
      save:   'Save Recipe',
      saving: 'Saving...',
      saved:  '✓ Saved! Redirecting...',
    },
    recipe: {
      servings: 'servings',
    },
    footer:      (year) => `© ${year} Reciply`,
    toggleLabel: 'עברית',
  },

  he: {
    dir: 'rtl',
    nav: {
      browse: 'עיון במתכונים',
      add:    'הוסף מתכון',
    },
    hero: {
      titleParts: ['בשל משהו ', 'מדהים', ' היום.'],
      subtitle:   'גלה, שמור ושתף את המתכונים האהובים עליך — הכל במקום אחד.',
      browseBtn:  'עיון במתכונים',
      addBtn:     'הוסף מתכון',
    },
    home: {
      featured: 'מתכונים מומלצים',
    },
    browse: {
      title:    'עיון במתכונים',
      search:   'חיפוש מתכונים...',
      empty:    'אין מתכונים עדיין.',
      addFirst: 'היה הראשון להוסיף!',
    },
    detail: {
      back:          'חזרה למתכונים →',
      ingredients:   'מצרכים',
      instructions:  'אופן ההכנה',
      watchVideo:    '▶ צפה בסרטון',
      shareWhatsapp: 'שלח לוואטסאפ',
      prepTime:      'הכנה',
      cookTime:      'בישול',
      mins:          'דקות',
    },
    add: {
      pageTitle:  'הוסף מתכון',
      pasteLabel: 'הדבק טקסט מתכון — ה-AI יעבד אותו עבורך',
      parseBtn:   '✨ עבד עם AI',
      parsing:    'מעבד...',
      parseError: 'לא הצלחנו לעבד. בדוק את ANTHROPIC_API_KEY ונסה שוב.',
      form: {
        title:          'שם המתכון *',
        description:    'תיאור',
        servings:       'מנות',
        prepTime:       'הכנה (דקות)',
        cookTime:       'בישול (דקות)',
        ingredients:    'מצרכים',
        amount:         'כמות',
        unit:           'יחידה',
        ingredientName: 'מצרך',
        addIngredient:  '+ הוסף מצרך',
        instructions:   'אופן ההכנה',
        videoUrl:       'קישור לסרטון (אופציונלי)',
        tags:           'תגיות (מופרדות בפסיקים)',
        emoji:          'אימוג׳י',
      },
      save:   'שמור מתכון',
      saving: 'שומר...',
      saved:  '✓ נשמר! מעביר...',
    },
    recipe: {
      servings: 'מנות',
    },
    footer:      (year) => `© ${year} Reciply`,
    toggleLabel: 'English',
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('reciply-lang');
    if (saved === 'he' || saved === 'en') setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('reciply-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = translations[lang].dir;
  }, [lang]);

  const toggle = () => setLang((l) => (l === 'en' ? 'he' : 'en'));

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
