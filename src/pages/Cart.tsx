import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/database";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { cartItems, loading, updateQuantity, removeFromCart, totalPrice } =
    useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="font-display text-3xl font-medium mb-4">
            Sign In to View Your Cart
          </h1>
          <p className="text-muted-foreground mb-8">
            Please sign in to add items to your cart and checkout.
          </p>
          <Button asChild>
            <Link to="/auth">Sign In</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <h1 className="font-display text-3xl font-medium mb-8">Your Cart</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="font-display text-3xl font-medium mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button asChild>
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <h1 className="font-display text-3xl md:text-4xl font-medium mb-8">
          Your Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const product = item.product as Product;
              if (!product) return null;

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border border-border"
                >
                  <div className="w-full sm:w-24 h-32 sm:h-24 flex-shrink-0 rounded-md overflow-hidden bg-secondary">
                    <img
                      src={product.images?.[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <Link
                        to={`/products/${product.slug}`}
                        className="font-display text-base sm:text-lg font-medium hover:text-accent transition-colors line-clamp-2 sm:truncate"
                      >
                        {product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <p className="text-muted-foreground text-sm mt-1">
                      ${product.price.toFixed(2)} each
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <p className="font-medium">
                        ${(product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <h2 className="font-display text-xl font-medium mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-border text-base font-medium">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full mt-6" size="lg" asChild>
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;