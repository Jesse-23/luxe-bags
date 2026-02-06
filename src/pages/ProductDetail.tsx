import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Product } from "@/types/database";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag, Minus, Plus, ChevronLeft } from "lucide-react";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;

      const { data, error } = await supabase
        .from("products")
        .select(`*, category:categories(*)`)
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setProduct(data as Product);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="font-display text-3xl font-medium mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/products">Browse All Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

<<<<<<< HEAD
  // const images =
  //   product.images && product.images.length > 0
  //     ? product.images.map(
  //         (img) =>
  //           supabase.storage.from("product-images").getPublicUrl(img).data
  //             .publicUrl,
  //       )
  //     : ["/placeholder.svg"];

  const images = product.images
  ? JSON.parse(product.images as any).map(
      (img: string) =>
        `https://vijawxheqevkpvnrdpre.supabase.co/storage/v1/object/public/product-images/${img}`
    )
  : ["/placeholder.svg"];


  const hasDiscount =
    product.compare_at_price && product.compare_at_price > product.price;

    console.log("Raw images from DB:", product.images);

=======
  const images = product.images.length > 0 ? product.images : ["/placeholder.svg"];
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
>>>>>>> 931b57c9054f3250816b51925f3f01ccd6b4d1ed

  return (
    <Layout>
      <div className="container px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb */}
        <Link
          to="/products"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 sm:mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-3 sm:space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-accent"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {product.category && (
              <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {(product.category as { name: string }).name}
              </p>
            )}
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium mb-3 sm:mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="text-xl sm:text-2xl font-medium">
                ${product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-base sm:text-lg text-muted-foreground line-through">
                  ${product.compare_at_price!.toFixed(2)}
                </span>
              )}
            </div>

            {product.description && (
<<<<<<< HEAD
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                {product.description}
              </p>
=======
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">{product.description}</p>
>>>>>>> 931b57c9054f3250816b51925f3f01ccd6b4d1ed
            )}

            {/* Quantity */}
            <div className="mb-4 sm:mb-6">
              <p className="text-sm font-medium mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setQuantity(Math.min(product.stock_quantity, quantity + 1))
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Stock Status */}
            <p className="text-sm mb-4 sm:mb-6">
              {product.stock_quantity > 0 ? (
                <span className="text-green-600">
                  ✓ In Stock ({product.stock_quantity} available)
                </span>
              ) : (
                <span className="text-destructive">Out of Stock</span>
              )}
            </p>

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={product.stock_quantity === 0}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>

            {/* Features */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
              <h3 className="font-display text-base sm:text-lg font-medium mb-3 sm:mb-4">
                Product Features
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>• Premium genuine leather construction</li>
                <li>• Hand-stitched details</li>
                <li>• Gold-tone hardware</li>
                <li>• Interior pockets and card slots</li>
                <li>• Dust bag included</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

<<<<<<< HEAD
export default ProductDetail;
=======
export default ProductDetail;
>>>>>>> 931b57c9054f3250816b51925f3f01ccd6b4d1ed
