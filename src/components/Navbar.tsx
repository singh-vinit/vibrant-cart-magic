import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import VoiceSearchButton from "./VoiceSearchButton";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
];

const Navbar: React.FC = () => {
  const [search, setSearch] = useState("");
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="border-b border-border/70 bg-secondary px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.22em] text-secondary-foreground">
        Fresh markdowns this week
      </div>
      <nav className="border-b border-border/70 bg-background/80 surface-blur supports-[backdrop-filter]:bg-background/65">
        <div className="container flex h-20 items-center gap-3">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-background/95">
            <SheetHeader>
              <SheetTitle className="text-left text-xl font-semibold uppercase tracking-[0.2em] text-secondary">
                ShopZone
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-6">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} className="text-lg font-medium hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
              <Link
                to="/products?maxPrice=499"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                Shop deals
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="hidden shrink-0 md:block">
          <span className="text-xl font-semibold uppercase tracking-[0.28em] text-secondary">
            ShopZone
          </span>
        </Link>
        <Link to="/" className="shrink-0 md:hidden">
          <span className="text-base font-semibold uppercase tracking-[0.24em] text-secondary">
            ShopZone
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="mx-auto flex max-w-2xl flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for style, home, tech..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 rounded-full border-border/80 bg-white/80 pl-9 pr-4 shadow-sm"
            />
          </div>
          <VoiceSearchButton
            onTranscript={(text) => {
              setSearch(text);
              navigate(`/products?search=${encodeURIComponent(text)}`);
            }}
          />
        </form>

        {/* Desktop nav */}
        <div className="hidden items-center gap-5 md:flex">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
          <Link to="/products?maxPrice=499" className="text-sm font-medium text-primary transition-colors hover:text-secondary">
            Deals
          </Link>
        </div>

        {/* Cart */}
        <Button variant="ghost" size="icon" className="relative rounded-full border border-border/70 bg-white/70">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px] bg-primary text-primary-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
