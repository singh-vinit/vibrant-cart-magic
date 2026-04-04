import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import FilterSidebar, { type Filters } from "@/components/FilterSidebar";
import FilterSheet from "@/components/FilterSheet";
import SortBar, { type SortOption } from "@/components/SortBar";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 12;

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";
  const maxPriceParam = searchParams.get("maxPrice");

  const [filters, setFilters] = useState<Filters>({
    categories: categoryParam ? [categoryParam] : [],
    priceRange: [0, maxPriceParam ? parseInt(maxPriceParam) : 2000],
    brands: [],
    rating: 0,
    discount: 0,
  });
  const [sort, setSort] = useState<SortOption>("relevance");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    if (filters.rating > 0) {
      result = result.filter((p) => p.rating >= filters.rating);
    }

    if (filters.discount > 0) {
      result = result.filter((p) => p.discount >= filters.discount);
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popularity":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [filters, sort, searchQuery]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const activeFilterTags: { label: string; clear: () => void }[] = [];
  filters.categories.forEach((c) =>
    activeFilterTags.push({
      label: c,
      clear: () => setFilters((f) => ({ ...f, categories: f.categories.filter((x) => x !== c) })),
    })
  );
  filters.brands.forEach((b) =>
    activeFilterTags.push({
      label: b,
      clear: () => setFilters((f) => ({ ...f, brands: f.brands.filter((x) => x !== b) })),
    })
  );
  if (filters.rating > 0)
    activeFilterTags.push({
      label: `${filters.rating}+ Stars`,
      clear: () => setFilters((f) => ({ ...f, rating: 0 })),
    });
  if (filters.discount > 0)
    activeFilterTags.push({
      label: `${filters.discount}%+ Off`,
      clear: () => setFilters((f) => ({ ...f, discount: 0 })),
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-6">
        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-20 border rounded-lg p-4">
              <FilterSidebar filters={filters} onChange={setFilters} />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <FilterSheet filters={filters} onChange={setFilters} />
              <div className="flex-1">
                <SortBar value={sort} onChange={setSort} totalResults={filtered.length} />
              </div>
            </div>

            {/* Active filters */}
            {activeFilterTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {activeFilterTags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="gap-1 cursor-pointer" onClick={tag.clear}>
                    {tag.label}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
              </div>
            )}

            {searchQuery && (
              <p className="text-sm text-muted-foreground">
                Showing results for "<span className="font-medium text-foreground">{searchQuery}</span>"
              </p>
            )}

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="aspect-square rounded-lg" />
                    <Skeleton className="h-4 mt-2 w-3/4" />
                    <Skeleton className="h-3 mt-1 w-1/2" />
                  </div>
                ))}
              </div>
            ) : paginated.length > 0 ? (
              <ProductGrid products={paginated} columns={3} />
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                No products found. Try adjusting your filters.
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={page === i + 1}
                        onClick={() => setPage(i + 1)}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
