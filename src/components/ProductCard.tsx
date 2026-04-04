import React from "react";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl border-border/50">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        {product.badge && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-[10px] font-bold">
            {product.badge}
          </Badge>
        )}
        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px]">
          {product.discount}% OFF
        </Badge>
        <Button
          size="sm"
          onClick={() => addToCart(product)}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity gradient-pink-purple text-primary-foreground text-xs"
        >
          Add to Cart
        </Button>
      </div>
      <CardContent className="p-3">
        <h3 className="text-sm font-medium line-clamp-2 mb-1 text-foreground">{product.name}</h3>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base font-bold text-foreground">₹{product.price}</span>
          <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-accent text-accent" />
          <span>{product.rating}</span>
          <span>•</span>
          <span>{product.reviews} reviews</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
