import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ShieldAlert, LayoutDashboard, Package } from "lucide-react";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { ProductManagement } from "@/components/admin/ProductManagement";

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Loading state
  if (authLoading || adminLoading) {
    return (
      <Layout>
        <div className="container py-12 flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <Layout>
        <div className="container py-12">
          <div className="max-w-md mx-auto text-center">
            <ShieldAlert className="h-16 w-16 mx-auto mb-4 text-destructive" />
            <h1 className="font-display text-3xl font-medium mb-2">
              Access Denied
            </h1>
            <p className="text-muted-foreground mb-6">
              You don't have permission to access this page. Admin privileges
              are required.
            </p>
            <Button onClick={() => navigate("/")}>Go Home</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium mb-2">
            Admin Panel
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your store, products, and view analytics
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full sm:w-auto sm:max-w-md grid-cols-2">
            <TabsTrigger value="dashboard" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <LayoutDashboard className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Products</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
