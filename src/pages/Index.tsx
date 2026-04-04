import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUp, ShieldCheck, Sparkles, Truck } from "lucide-react";
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
  { label: "Under ₹99", max: 99, description: "Small wins and easy add-ons", gradient: "from-[#f7d7b5] to-[#f3a55e]" },
  { label: "Under ₹199", max: 199, description: "Daily essentials with style", gradient: "from-[#d1ece4] to-[#73a993]" },
  { label: "Under ₹499", max: 499, description: "Giftable picks with room to browse", gradient: "from-[#dce5fb] to-[#7b96d8]" },
  { label: "Under ₹999", max: 999, description: "Bigger upgrades, still light on budget", gradient: "from-[#f2d8d0] to-[#cf7645]" },
];

const promisePoints = [
  { icon: Sparkles, title: "Curated daily", text: "A tighter mix of products so browsing feels quicker and clearer." },
  { icon: Truck, title: "Fast-moving deals", text: "Price-first sections keep the best discounts easy to spot." },
  { icon: ShieldCheck, title: "Confident picks", text: "Ratings, reviews, and clean product details stay visible at a glance." },
];

const SectionHeading = ({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) => (
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div className="max-w-2xl space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">{eyebrow}</p>
      <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{title}</h2>
      <p className="text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
    </div>
    {action}
  </div>
);

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

      <main className="container space-y-16 py-6 md:space-y-20 md:py-8">
        <HeroBanner />

        <section className="space-y-6">
          <SectionHeading
            eyebrow="Browse quickly"
            title="Start with a lane that feels intentional."
            description="Every category shortcut is designed to get you into the catalog with less scrolling and better context."
          />
          <CategoryRow />
          <div className="grid gap-4 md:grid-cols-3">
            {promisePoints.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-[1.5rem] border border-border/70 bg-white/75 p-5 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-secondary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <SectionHeading
            eyebrow="Trending now"
            title="Popular picks moving fast this week."
            description="A compact row of bestselling and trending products, ready for quick scanning on mobile or desktop."
            action={
              <Link to="/products" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                See everything
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          {error && !loading ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : loading ? (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="min-w-[220px]">
                  <Skeleton className="aspect-[0.9] rounded-[1.6rem]" />
                  <Skeleton className="mt-2 h-4 w-3/4" />
                  <Skeleton className="mt-1 h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
              {trending.map((p) => (
                <div key={p.id} className="max-w-[240px] min-w-[220px]">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="grid gap-8 rounded-[2rem] border border-border/70 bg-[#fffaf5]/90 p-6 shadow-sm lg:grid-cols-[0.45fr_1fr] lg:p-8">
          <div className="space-y-5">
            <SectionHeading
              eyebrow="Daily price drop"
              title="Top deals built for quick decisions."
              description="A sharper edit of products with the biggest discounts, kept readable and easy to act on."
            />
            <div className="inline-flex w-fit items-center rounded-full bg-secondary px-4 py-2 text-sm text-secondary-foreground">
              <CountdownTimer />
            </div>
            <Link to="/products?maxPrice=499">
              <Button className="rounded-full px-6">
                Shop deal picks
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {error && !loading ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : loading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="aspect-[0.9] rounded-[1.6rem]" />
                  <Skeleton className="mt-2 h-4 w-3/4" />
                  <Skeleton className="mt-1 h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <ProductGrid products={topDeals} columns={4} />
          )}
        </section>

        <section className="space-y-5">
          <SectionHeading
            eyebrow="Budget routes"
            title="Choose your spend and jump straight in."
            description="These shortcut bands are useful when you know the price ceiling first and want the fastest path to matching products."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {budgetTiles.map((tile) => (
              <Link
                key={tile.label}
                to={`/products?maxPrice=${tile.max}`}
                className={`group rounded-[1.75rem] bg-gradient-to-br ${tile.gradient} p-6 text-left text-secondary shadow-sm transition-transform hover:-translate-y-1`}
              >
                <p className="text-sm font-medium text-secondary/70">Budget cap</p>
                <p className="mt-8 text-3xl font-semibold">{tile.label}</p>
                <p className="mt-3 max-w-[14rem] text-sm leading-6 text-secondary/75">{tile.description}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                  Explore picks
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="gradient-ink rounded-[2rem] px-6 py-10 text-center text-secondary-foreground sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary-foreground/65">
            Full catalog
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-semibold sm:text-4xl">
            Browse the whole collection when you want depth, not just highlights.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-secondary-foreground/72 sm:text-base">
            Search, filter, and voice-navigate across the full product list without losing the cleaner storefront feel.
          </p>
          <div className="mt-8">
            <Link to="/products">
              <Button size="lg" className="rounded-full bg-white px-10 text-secondary hover:bg-white/90">
                View all products
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg transition-transform hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Index;
