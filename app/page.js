import Link from "next/link";

const FEATURED = [
  {
    id:       "spaghetti-carbonara",
    title:    "Spaghetti Carbonara",
    time:     "25 min",
    servings: 2,
    emoji:    "🍝",
    tags:     ["Italian", "Pasta"],
  },
  {
    id:       "chicken-tikka-masala",
    title:    "Chicken Tikka Masala",
    time:     "45 min",
    servings: 4,
    emoji:    "🍛",
    tags:     ["Indian", "Curry"],
  },
  {
    id:       "avocado-toast",
    title:    "Avocado Toast",
    time:     "10 min",
    servings: 1,
    emoji:    "🥑",
    tags:     ["Breakfast", "Quick"],
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center py-12 space-y-4">
        <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
          Cook something <span className="text-brand-500">amazing</span> today.
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Browse, save, and share your favourite recipes — all in one place.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            href="/recipes"
            className="px-6 py-3 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors"
          >
            Browse Recipes
          </Link>
          <Link
            href="/recipes/new"
            className="px-6 py-3 rounded-full border border-brand-500 text-brand-600 font-semibold hover:bg-brand-50 transition-colors"
          >
            Add Recipe
          </Link>
        </div>
      </section>

      {/* Featured recipes */}
      <section>
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Featured Recipes</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="group bg-white rounded-2xl shadow-sm border border-orange-100 p-6 hover:shadow-md hover:border-brand-300 transition-all"
            >
              <div className="text-5xl mb-4">{recipe.emoji}</div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-brand-600 transition-colors">
                {recipe.title}
              </h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                <span>⏱ {recipe.time}</span>
                <span>👤 {recipe.servings}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {recipe.tags.map((tag) => (
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
