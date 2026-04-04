import React from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "@/lib/products";

const CategoryRow: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}
          className="flex flex-col items-center gap-2 min-w-[80px] group"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110"
            style={{ backgroundColor: cat.color + "20", border: `2px solid ${cat.color}` }}
          >
            {cat.emoji}
          </div>
          <span className="text-xs font-medium text-foreground whitespace-nowrap">{cat.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryRow;
