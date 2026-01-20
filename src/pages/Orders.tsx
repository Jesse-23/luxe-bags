import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Order, OrderItem } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

interface OrderWithItems extends Order {
  order_items: OrderItem[];
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("orders")
        .select(`*, order_items(*)`)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data as OrderWithItems[]);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="font-display text-3xl font-medium mb-4">
            Sign In to View Orders
          </h1>
          <p className="text-muted-foreground mb-8">
            Please sign in to view your order history.
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
          <h1 className="font-display text-3xl font-medium mb-8">My Orders</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (orders.length === 0) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="font-display text-3xl font-medium mb-4">
            No Orders Yet
          </h1>
          <p className="text-muted-foreground mb-8">
            You haven't placed any orders yet.
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
      <div className="container px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium mb-6 sm:mb-8">
          My Orders
        </h1>

        <div className="space-y-4 sm:space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-card rounded-lg border border-border p-4 sm:p-6"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Order ID</p>
                  <p className="font-mono text-xs sm:text-sm truncate">{order.id.slice(0, 8)}...</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Date</p>
                  <p className="text-xs sm:text-sm">
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total</p>
                  <p className="font-medium text-sm sm:text-base">${order.total_amount.toFixed(2)}</p>
                </div>
                <div className="flex items-start">
                  <span
                    className={`inline-block px-2 sm:px-3 py-1 text-xs font-medium rounded-full capitalize ${
                      statusColors[order.status] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-xs sm:text-sm font-medium mb-2">Items</p>
                <div className="space-y-1.5 sm:space-y-2">
                  {order.order_items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-xs sm:text-sm"
                    >
                      <span className="text-muted-foreground truncate mr-2">
                        {item.product_name} × {item.quantity}
                      </span>
                      <span className="flex-shrink-0">${(item.product_price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {order.shipping_address_line1 && (
                <div className="border-t border-border pt-4 mt-4">
                  <p className="text-xs sm:text-sm font-medium mb-2">Shipping Address</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {order.shipping_address_line1}
                    {order.shipping_address_line2 && `, ${order.shipping_address_line2}`}
                    <br />
                    {order.shipping_city}, {order.shipping_state}{" "}
                    {order.shipping_postal_code}
                    <br />
                    {order.shipping_country}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;