import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Product } from "@/types/database";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)
    : 0;

  // const imageUrl =
  // product.images && product.images.length > 0
  //   ? supabase.storage
  //       .from("product-images")
  //       .getPublicUrl(product.images[0]).data.publicUrl
  //   : "/placeholder.svg";

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].startsWith('http')
        ? product.images[0]
        : supabase.storage
            .from("product-images")
            .getPublicUrl(product.images[0]).data.publicUrl
      : "/placeholder.svg";
    


  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
  };

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.is_featured && (
            <span className="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded">
              Featured
            </span>
          )}
          {hasDiscount && (
            <span className="px-2 py-1 text-xs font-medium bg-destructive text-destructive-foreground rounded">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button
            onClick={handleAddToCart}
            className="w-full shadow-luxury"
            size="sm"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="font-display text-lg font-medium text-foreground group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-medium">
            ${product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.compare_at_price!.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}