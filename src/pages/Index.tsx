import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import CategoryRow from "@/components/CategoryRow";
import ProductCard from "@/components/ProductCard";
import ProductGrid from "@/components/ProductGrid";
import CountdownTimer from "@/components/CountdownTimer";
import Footer from "@/components/Footer";
import { fetchProducts, type Product } from "@/lib/products";

const budgetTiles = [
  { label: "Under ₹99", max: 99, gradient: "from-primary to-secondary" },
  { label: "Under ₹199", max: 199, gradient: "from-secondary to-primary" },
  { label: "Under ₹499", max: 499, gradient: "from-primary/80 to-secondary/80" },
  { label: "Under ₹999", max: 999, gradient: "from-secondary/80 to-primary/80" },
];

const Index: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProducts({ limit: 40 });
        if (!cancelled) {
          setProducts(data);
        }
      } catch (err) {
        if (!cancelled) {
          setProducts([]);
          setError(err instanceof Error ? err.message : "Failed to load products");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const trending = products.filter((p) => p.badge === "Trending" || p.badge === "Bestseller").slice(0, 8);
  const topDeals = [...products].sort((a, b) => b.discount - a.discount).slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-6 space-y-10">
        {/* Hero */}
        <HeroBanner />

        {/* Categories */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Shop by Category</h2>
          <CategoryRow />
        </section>

        {/* Trending */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">🔥 Trending Now</h2>
          {error && !loading ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : loading ? (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="min-w-[200px]">
                  <Skeleton className="aspect-square rounded-lg" />
                  <Skeleton className="h-4 mt-2 w-3/4" />
                  <Skeleton className="h-3 mt-1 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {trending.map((p) => (
                <div key={p.id} className="min-w-[180px] max-w-[200px]">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Top Deals */}
        <section className="bg-muted rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">⚡ Top Deals of the Day</h2>
            <CountdownTimer />
          </div>
          {error && !loading ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="aspect-square rounded-lg" />
                  <Skeleton className="h-4 mt-2 w-3/4" />
                  <Skeleton className="h-3 mt-1 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <ProductGrid products={topDeals} columns={4} />
          )}
        </section>

        {/* Shop by Budget */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">💰 Shop by Budget</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {budgetTiles.map((tile) => (
              <Link
                key={tile.label}
                to={`/products?maxPrice=${tile.max}`}
                className={`bg-gradient-to-br ${tile.gradient} rounded-xl p-6 text-center text-primary-foreground font-bold text-lg hover:scale-105 transition-transform shadow-md`}
              >
                {tile.label}
              </Link>
            ))}
          </div>
        </section>

        {/* View all */}
        <div className="text-center">
          <Link to="/products">
            <Button size="lg" className="gradient-pink-purple text-primary-foreground px-10">
              View All Products
            </Button>
          </Link>
        </div>
      </main>

      <Footer />

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 h-10 w-10 rounded-full gradient-pink-purple text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Index;
