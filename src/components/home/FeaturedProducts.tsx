import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/database";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true)
        .eq("is_active", true)
        .limit(4);

      if (error) {
        console.error("Error fetching featured products:", error);
      } else {
        setProducts(data as Product[]);
      }
      setLoading(false);
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-medium tracking-widest text-accent uppercase mb-2">
              Curated Selection
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium">
              Featured Collection
            </h2>
          </div>
          <Button variant="ghost" asChild className="group self-start md:self-auto">
            <Link to="/products">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <ProductGrid products={products} loading={loading} />
      </div>
    </section>
  );
}