import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Product, Category } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A-Z" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  const categorySlug = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from("categories").select("*");
      if (data) setCategories(data as Category[]);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let query = supabase
        .from("products")
        .select(`*, category:categories(*)`)
        .eq("is_active", true);

      // Filter by category
      if (categorySlug) {
        const category = categories.find((c) => c.slug === categorySlug);
        if (category) {
          query = query.eq("category_id", category.id);
        }
      }

      // Search by name or description
      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      // Sort
      switch (sortBy) {
        case "price-asc":
          query = query.order("price", { ascending: true });
          break;
        case "price-desc":
          query = query.order("price", { ascending: false });
          break;
        case "name":
          query = query.order("name", { ascending: true });
          break;
        default:
          query = query.order("created_at", { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data as Product[]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [categorySlug, sortBy, categories, searchQuery]);

  const handleCategoryChange = (slug: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug) {
      newParams.set("category", slug);
    } else {
      newParams.delete("category");
    }
    setSearchParams(newParams);
  };

  const clearSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    setSearchParams(newParams);
  };

  const getPageTitle = () => {
    if (searchQuery) {
      return `Search: "${searchQuery}"`;
    }
    if (categorySlug) {
      return categories.find((c) => c.slug === categorySlug)?.name || "Products";
    }
    return "All Bags";
  };

  return (
    <Layout>
      <div className="container px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-2">
            {getPageTitle()}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {searchQuery
              ? `Found ${products.length} result${products.length !== 1 ? "s" : ""}`
              : "Discover our collection of handcrafted luxury bags"}
          </p>
        </div>

        {/* Active Search Badge */}
        {searchQuery && (
          <div className="mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{searchQuery}</span>
              <button
                onClick={clearSearch}
                className="p-0.5 hover:bg-muted rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={categorySlug === null && !searchQuery ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(null)}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={categorySlug === category.slug ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category.slug)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="flex justify-end">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid products={products} loading={loading} />
      </div>
    </Layout>
  );
};

export default Products;