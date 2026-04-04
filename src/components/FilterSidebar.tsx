import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Filters {
  categories: string[];
  priceRange: [number, number];
  brands: string[];
  rating: number;
  discount: number;
}

interface FilterSidebarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  categoryOptions: Array<{ label: string; value: string; emoji?: string }>;
  brandOptions: string[];
  maxPrice: number;
}

const discountOptions = [
  { label: "10%+", value: 10 },
  { label: "25%+", value: 25 },
  { label: "50%+", value: 50 },
];

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  categoryOptions,
  brandOptions,
  maxPrice,
}) => {
  const toggleCategory = (cat: string) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: next });
  };

  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands: next });
  };

  const clearAll = () =>
    onChange({ categories: [], priceRange: [0, maxPrice], brands: [], rating: 0, discount: 0 });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs text-primary hover:text-secondary">
          Clear All
        </Button>
      </div>

      <div className="space-y-3 rounded-[1.4rem] border border-border/70 bg-white/65 p-4">
        <Label className="font-medium text-foreground">Category</Label>
        {categoryOptions.map((cat) => (
          <label key={cat.value} className="flex cursor-pointer items-center gap-2">
            <Checkbox
              checked={filters.categories.includes(cat.value)}
              onCheckedChange={() => toggleCategory(cat.value)}
            />
            <span className="text-sm text-foreground">
              {cat.emoji ? `${cat.emoji} ` : ""}
              {cat.label}
            </span>
          </label>
        ))}
      </div>

      <div className="space-y-3 rounded-[1.4rem] border border-border/70 bg-white/65 p-4">
        <Label className="font-medium text-foreground">Price Range</Label>
        <Slider
          min={0}
          max={maxPrice}
          step={50}
          value={filters.priceRange}
          onValueChange={(v) => onChange({ ...filters, priceRange: v as [number, number] })}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>₹{filters.priceRange[0]}</span>
          <span>₹{filters.priceRange[1]}</span>
        </div>
      </div>

      <div className="space-y-3 rounded-[1.4rem] border border-border/70 bg-white/65 p-4">
        <Label className="font-medium text-foreground">Brand</Label>
        {brandOptions.map((brand) => (
          <label key={brand} className="flex cursor-pointer items-center gap-2">
            <Checkbox
              checked={filters.brands.includes(brand)}
              onCheckedChange={() => toggleBrand(brand)}
            />
            <span className="text-sm text-foreground">{brand}</span>
          </label>
        ))}
      </div>

      <div className="space-y-3 rounded-[1.4rem] border border-border/70 bg-white/65 p-4">
        <Label className="font-medium text-foreground">Minimum Rating</Label>
        <div className="flex flex-wrap gap-2">
          {[4, 3, 2, 1].map((r) => (
            <Badge
              key={r}
              variant={filters.rating === r ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => onChange({ ...filters, rating: filters.rating === r ? 0 : r })}
            >
              {r}+ <Star className="h-3 w-3 ml-0.5 fill-current" />
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-3 rounded-[1.4rem] border border-border/70 bg-white/65 p-4">
        <Label className="font-medium text-foreground">Discount</Label>
        <div className="flex flex-wrap gap-2">
          {discountOptions.map((d) => (
            <Badge
              key={d.value}
              variant={filters.discount === d.value ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() =>
                onChange({ ...filters, discount: filters.discount === d.value ? 0 : d.value })
              }
            >
              {d.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
