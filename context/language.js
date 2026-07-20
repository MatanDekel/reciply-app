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
    recipe: {
      time:     'min',
      servings: 'servings',
    },
    footer: (year) => `© ${year} Reciply`,
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
    recipe: {
      time:     'דקות',
      servings: 'מנות',
    },
    footer: (year) => `© ${year} Reciply`,
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
