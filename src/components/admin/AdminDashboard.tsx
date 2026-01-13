import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  Loader2,
  Clock,
} from "lucide-react";
import { format, subDays, startOfDay, endOfDay } from "date-fns";

interface Order {
  id: string;
  user_id: string | null;
  total_amount: number;
  status: string;
  created_at: string;
}

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  averageOrderValue: number;
  revenueChange: number;
  ordersToday: number;
  pendingOrders: number;
  lowStockProducts: number;
}

interface RecentOrder {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
  items_count: number;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
};

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [topProducts, setTopProducts] = useState<
    { name: string; sold: number; revenue: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);

    try {
      // Fetch all orders
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch products count and low stock
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("id, stock_quantity");

      if (productsError) throw productsError;

      // Fetch recent orders with item count
      const { data: recentOrdersData, error: recentError } = await supabase
        .from("orders")
        .select(`
          id,
          total_amount,
          status,
          created_at,
          order_items(id)
        `)
        .order("created_at", { ascending: false })
        .limit(10);

      if (recentError) throw recentError;

      // Fetch top selling products
      const { data: orderItems, error: itemsError } = await supabase
        .from("order_items")
        .select("product_name, product_price, quantity");

      if (itemsError) throw itemsError;

      // Calculate stats
      const allOrders = orders as Order[];
      const today = new Date();
      const todayStart = startOfDay(today);
      const todayEnd = endOfDay(today);
      const last7Days = subDays(today, 7);
      const previous7Days = subDays(today, 14);

      // Revenue calculations
      const completedOrders = allOrders.filter(
        (o) => o.status !== "cancelled"
      );
      const totalRevenue = completedOrders.reduce(
        (sum, o) => sum + Number(o.total_amount),
        0
      );

      // Last 7 days vs previous 7 days
      const last7DaysRevenue = completedOrders
        .filter((o) => new Date(o.created_at) >= last7Days)
        .reduce((sum, o) => sum + Number(o.total_amount), 0);

      const previous7DaysRevenue = completedOrders
        .filter(
          (o) =>
            new Date(o.created_at) >= previous7Days &&
            new Date(o.created_at) < last7Days
        )
        .reduce((sum, o) => sum + Number(o.total_amount), 0);

      const revenueChange =
        previous7DaysRevenue > 0
          ? ((last7DaysRevenue - previous7DaysRevenue) / previous7DaysRevenue) *
            100
          : last7DaysRevenue > 0
          ? 100
          : 0;

      // Orders today
      const ordersToday = allOrders.filter(
        (o) =>
          new Date(o.created_at) >= todayStart &&
          new Date(o.created_at) <= todayEnd
      ).length;

      // Pending orders
      const pendingOrders = allOrders.filter(
        (o) => o.status === "pending"
      ).length;

      // Low stock products (less than 10)
      const lowStockProducts = (products || []).filter(
        (p) => p.stock_quantity < 10
      ).length;

      // Average order value
      const averageOrderValue =
        completedOrders.length > 0
          ? totalRevenue / completedOrders.length
          : 0;

      setStats({
        totalRevenue,
        totalOrders: allOrders.length,
        totalProducts: products?.length || 0,
        averageOrderValue,
        revenueChange,
        ordersToday,
        pendingOrders,
        lowStockProducts,
      });

      // Process recent orders
      setRecentOrders(
        (recentOrdersData || []).map((o: any) => ({
          id: o.id,
          total_amount: o.total_amount,
          status: o.status,
          created_at: o.created_at,
          items_count: o.order_items?.length || 0,
        }))
      );

      // Calculate top products
      const productSales: Record<
        string,
        { name: string; sold: number; revenue: number }
      > = {};
      (orderItems || []).forEach((item: any) => {
        if (!productSales[item.product_name]) {
          productSales[item.product_name] = {
            name: item.product_name,
            sold: 0,
            revenue: 0,
          };
        }
        productSales[item.product_name].sold += item.quantity;
        productSales[item.product_name].revenue +=
          item.quantity * Number(item.product_price);
      });

      setTopProducts(
        Object.values(productSales)
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5)
      );
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats?.totalRevenue.toFixed(2)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stats && stats.revenueChange !== 0 && (
                <>
                  {stats.revenueChange > 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                  )}
                  <span
                    className={
                      stats.revenueChange > 0 ? "text-green-500" : "text-red-500"
                    }
                  >
                    {Math.abs(stats.revenueChange).toFixed(1)}%
                  </span>
                  <span className="ml-1">vs last 7 days</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.ordersToday} orders today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats?.averageOrderValue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Per completed order
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.lowStockProducts} low stock alerts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-yellow-600">
              {stats?.pendingOrders}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Orders awaiting processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Package className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-orange-600">
              {stats?.lowStockProducts}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Products with less than 10 units
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No orders yet
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.slice(0, 5).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        <div className="text-sm">
                          #{order.id.slice(0, 8)}...
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(order.created_at), "MMM d, h:mm a")}
                        </div>
                      </TableCell>
                      <TableCell>{order.items_count}</TableCell>
                      <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={statusColors[order.status] || ""}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Top Selling Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            {topProducts.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No sales data yet
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Sold</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product, index) => (
                    <TableRow key={product.name}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground text-sm">
                            #{index + 1}
                          </span>
                          {product.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {product.sold} units
                      </TableCell>
                      <TableCell className="text-right">
                        ${product.revenue.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
