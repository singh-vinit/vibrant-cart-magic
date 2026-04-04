import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu } from "lucide-react";
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
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="text-left gradient-pink-purple bg-clip-text text-transparent text-xl font-bold">
                ShopZone
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-6">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} className="text-lg font-medium hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="hidden md:block">
          <span className="text-xl font-bold gradient-pink-purple bg-clip-text text-transparent">
            ShopZone
          </span>
        </Link>
        <Link to="/" className="md:hidden">
          <span className="text-lg font-bold gradient-pink-purple bg-clip-text text-transparent">
            ShopZone
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2 max-w-xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-2"
            />
          </div>
          <VoiceSearchButton onTranscript={(text) => {
            setSearch(text);
            navigate(`/products?search=${encodeURIComponent(text)}`);
          }} />
        </form>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm font-medium hover:text-primary transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Cart */}
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
