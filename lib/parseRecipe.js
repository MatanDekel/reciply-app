const UNITS = new Set([
  // Hebrew
  'גרם', 'ק"ג', 'קילו', 'ליטר', 'מ"ל', 'מיליליטר',
  'כוס', 'כוסות', 'כף', 'כפות', 'כפית', 'כפיות',
  "יח'", 'חתיכה', 'חתיכות', 'פרוסה', 'פרוסות',
  'ענף', 'ענפים', 'שן', 'שיני',
  // English
  'g', 'kg', 'ml', 'l', 'cup', 'cups', 'tbsp', 'tsp',
  'oz', 'lb', 'lbs', 'piece', 'pieces', 'clove', 'cloves', 'slice', 'slices',
]);

function parseIngredientLine(line) {
  const parts = line.split(/\s+/).filter(Boolean);
  if (!parts.length) return null;

  let i = 0;
  let amount = '';
  let unit = '';

  // First token is a quantity if it starts with a digit or is a fraction (e.g. 1/2)
  if (/^\d|^\d+\/\d+/.test(parts[0])) {
    amount = parts[0];
    i = 1;
  }

  // Next token is a unit if it matches a known unit word
  if (i < parts.length && UNITS.has(parts[i])) {
    unit = parts[i];
    i++;
  }

  const name = parts.slice(i).join(' ');
  if (!name && !amount) return null;

  return { amount, unit, name: name || parts[0] };
}

const INGREDIENT_HEADERS = /^(מצרכים|מרכיבים|ingredients)\s*:?\s*$/i;
const INSTRUCTION_HEADERS = /^(הוראות|אופן הכנה|הכנה|instructions|steps|preparation)\s*:?\s*$/i;
const NUMBERED_STEP = /^\d+[\.\)\s]/;

export function parseRecipeText(text) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);

  const ingredients = [];
  const steps = [];
  let section = null; // null = auto-detect per line

  for (const line of lines) {
    if (INGREDIENT_HEADERS.test(line)) { section = 'ing'; continue; }
    if (INSTRUCTION_HEADERS.test(line)) { section = 'ins'; continue; }

    if (section === 'ing') {
      const ing = parseIngredientLine(line);
      if (ing) ingredients.push(ing);
    } else if (section === 'ins') {
      steps.push(line.replace(/^\d+[\.\)\s]+/, '').trim());
    } else {
      // Auto: numbered line → step, anything else → ingredient
      if (NUMBERED_STEP.test(line)) {
        steps.push(line.replace(/^\d+[\.\)\s]+/, '').trim());
      } else {
        const ing = parseIngredientLine(line);
        if (ing) ingredients.push(ing);
      }
    }
  }

  return {
    ingredients,
    instructions: steps.join('\n'),
  };
}
