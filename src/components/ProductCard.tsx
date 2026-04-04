import React from "react";
import { Star, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <article className="group">
      <div className="relative aspect-[0.9] overflow-hidden rounded-[1.6rem] bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80" />
        {product.badge && (
          <Badge className="absolute left-3 top-3 border-0 bg-white/90 text-[10px] font-semibold text-secondary">
            {product.badge}
          </Badge>
        )}
        <Badge className="absolute right-3 top-3 border-0 bg-primary text-[10px] text-primary-foreground">
          {product.discount}% OFF
        </Badge>
        <Button
          size="icon"
          onClick={() => addToCart(product)}
          className="absolute bottom-3 right-3 h-11 w-11 rounded-full bg-white text-secondary opacity-100 shadow-lg transition-transform hover:scale-105 group-hover:-translate-y-1"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2 px-1 pb-1 pt-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{product.category}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span>{product.rating}</span>
          </div>
        </div>
        <h3 className="line-clamp-2 text-sm font-semibold leading-6 text-foreground">{product.name}</h3>
        <div className="flex items-end justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-foreground">₹{product.price}</span>
            <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
          </div>
          <span className="text-xs text-muted-foreground">{product.reviews} reviews</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
