import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Account = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Partial<Profile>>({});

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        address_line1: profile.address_line1,
        address_line2: profile.address_line2,
        city: profile.city,
        state: profile.state,
        postal_code: profile.postal_code,
        country: profile.country,
      })
      .eq("user_id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });
    }

    setSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (!user) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="font-display text-3xl font-medium mb-4">
            Sign In Required
          </h1>
          <p className="text-muted-foreground mb-8">
            Please sign in to view your account.
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
          <h1 className="font-display text-3xl font-medium mb-8">My Account</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl md:text-4xl font-medium mb-8">
            My Account
          </h1>

          <div className="mb-8 p-4 bg-card rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                name="full_name"
                value={profile.full_name || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={profile.phone || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address_line1">Address Line 1</Label>
              <Input
                id="address_line1"
                name="address_line1"
                value={profile.address_line1 || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address_line2">Address Line 2</Label>
              <Input
                id="address_line2"
                name="address_line2"
                value={profile.address_line2 || ""}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={profile.city || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  name="state"
                  value={profile.state || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postal_code">Postal Code</Label>
                <Input
                  id="postal_code"
                  name="postal_code"
                  value={profile.postal_code || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={profile.country || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link to="/orders">View Orders</Link>
              </Button>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-border">
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;