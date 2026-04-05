import React from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories, getCategoryVisual, type CategoryOption } from "@/lib/products";

const CategoryRow: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState<CategoryOption[]>([]);

  React.useEffect(() => {
    let cancelled = false;

    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        if (!cancelled) {
          setCategories(data);
        }
      } catch {
        if (!cancelled) {
          setCategories([]);
        }
      }
    };

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => {
        const visual = getCategoryVisual(cat.slug);

        return (
        <button
          key={cat.slug}
          onClick={() => navigate(`/products?category=${encodeURIComponent(cat.slug)}`)}
          className="group flex items-center gap-3 rounded-full border border-border/80 bg-white/75 px-4 py-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-md"
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full text-xl transition-transform group-hover:scale-110"
            style={{ backgroundColor: visual.color + "20", border: `2px solid ${visual.color}` }}
          >
            {visual.emoji}
          </div>
          <div>
            <p className="whitespace-nowrap text-sm font-semibold text-foreground">{cat.name}</p>
            <p className="text-xs text-muted-foreground">Tap to explore</p>
          </div>
        </button>
        );
      })}
    </div>
  );
};

export default CategoryRow;
