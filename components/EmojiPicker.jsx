'use client';

import { useState, useRef, useEffect } from 'react';

const EMOJIS = [
  // Cooked meals
  '🍳','🥘','🍲','🥗','🥙','🌮','🌯','🥪',
  '🍱','🍛','🍜','🍝','🍣','🍤','🍙','🍚',
  // Meat & protein
  '🍗','🥩','🥓','🍖','🐟','🦞','🦐','🥚',
  // Veggies & fruit
  '🥦','🥕','🧅','🧄','🫑','🍅','🫒','🥑',
  '🥒','🌽','🍋','🍊','🍇','🍓','🫐','🍒',
  // Bread & dairy
  '🍕','🥐','🍞','🥨','🧀','🧆','🫙','🥞',
  // Sweets
  '🍰','🧁','🍩','🍪','🎂','🍫','🍮','🍯',
  // Drinks & tools
  '☕','🍵','🥤','🫖','🍺','🍷','🔪','🥄',
];

export default function EmojiPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-11 text-2xl flex items-center justify-center rounded-xl border border-orange-100 bg-white hover:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-colors cursor-pointer"
        title="Pick emoji"
      >
        {value}
      </button>

      {open && (
        <div className="absolute top-12 left-0 z-50 bg-white rounded-2xl shadow-xl border border-orange-100 p-3 w-72">
          <div className="grid grid-cols-8 gap-1">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => { onChange(emoji); setOpen(false); }}
                className={`text-xl p-1.5 rounded-lg hover:bg-brand-50 transition-colors leading-none ${
                  value === emoji ? 'bg-brand-100 ring-1 ring-brand-400' : ''
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
