const KEY = 'reciply-favorites';
const MAX = 3;

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function getFavoriteIds() {
  if (typeof window === 'undefined') return [];
  return load();
}

export function isFavorite(id) {
  if (typeof window === 'undefined') return false;
  return load().includes(id);
}

export function toggleFavorite(id) {
  const ids = load();
  let updated;
  if (ids.includes(id)) {
    updated = ids.filter((f) => f !== id);
  } else {
    updated = [id, ...ids.filter((f) => f !== id)].slice(0, MAX);
  }
  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated.includes(id);
}
