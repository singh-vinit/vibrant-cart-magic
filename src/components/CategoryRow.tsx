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
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => {
        const visual = getCategoryVisual(cat.slug);

        return (
        <button
          key={cat.slug}
          onClick={() => navigate(`/products?category=${encodeURIComponent(cat.slug)}`)}
          className="flex flex-col items-center gap-2 min-w-[80px] group"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110"
            style={{ backgroundColor: visual.color + "20", border: `2px solid ${visual.color}` }}
          >
            {visual.emoji}
          </div>
          <span className="text-xs font-medium text-foreground whitespace-nowrap">{cat.name}</span>
        </button>
        );
      })}
    </div>
  );
};

export default CategoryRow;
