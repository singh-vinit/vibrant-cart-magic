import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { categories, brands } from "@/lib/products";
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
}

const discountOptions = [
  { label: "10%+", value: 10 },
  { label: "25%+", value: 25 },
  { label: "50%+", value: 50 },
];

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onChange }) => {
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
    onChange({ categories: [], priceRange: [0, 2000], brands: [], rating: 0, discount: 0 });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs text-primary">
          Clear All
        </Button>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label className="font-medium text-foreground">Category</Label>
        {categories.map((cat) => (
          <label key={cat.name} className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={filters.categories.includes(cat.name)}
              onCheckedChange={() => toggleCategory(cat.name)}
            />
            <span className="text-sm text-foreground">
              {cat.emoji} {cat.name}
            </span>
          </label>
        ))}
      </div>

      {/* Price */}
      <div className="space-y-3">
        <Label className="font-medium text-foreground">Price Range</Label>
        <Slider
          min={0}
          max={2000}
          step={50}
          value={filters.priceRange}
          onValueChange={(v) => onChange({ ...filters, priceRange: v as [number, number] })}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>₹{filters.priceRange[0]}</span>
          <span>₹{filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-2">
        <Label className="font-medium text-foreground">Brand</Label>
        {brands.map((brand) => (
          <label key={brand} className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={filters.brands.includes(brand)}
              onCheckedChange={() => toggleBrand(brand)}
            />
            <span className="text-sm text-foreground">{brand}</span>
          </label>
        ))}
      </div>

      {/* Rating */}
      <div className="space-y-2">
        <Label className="font-medium text-foreground">Minimum Rating</Label>
        <div className="flex gap-2">
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

      {/* Discount */}
      <div className="space-y-2">
        <Label className="font-medium text-foreground">Discount</Label>
        <div className="flex gap-2">
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
