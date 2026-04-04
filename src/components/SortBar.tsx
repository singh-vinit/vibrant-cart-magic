import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type SortOption = "relevance" | "price-asc" | "price-desc" | "newest" | "popularity";

interface SortBarProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  totalResults: number;
}

const SortBar: React.FC<SortBarProps> = ({ value, onChange, totalResults }) => {
  return (
    <div className="flex flex-col gap-3 rounded-[1.4rem] border border-border/70 bg-white/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-muted-foreground">{totalResults} products</span>
      <Select value={value} onValueChange={(v) => onChange(v as SortOption)}>
        <SelectTrigger className="w-full rounded-full border-border/80 bg-background sm:w-[200px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">Relevance</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="popularity">Popularity</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortBar;
