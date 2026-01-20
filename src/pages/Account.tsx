import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Profile, ProfilePrivate } from "@/types/database";
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
  const [privateProfile, setPrivateProfile] = useState<Partial<ProfilePrivate>>({});

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      // Fetch public profile
      const { data: publicData, error: publicError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (publicError) {
        console.error("Error fetching profile:", publicError);
      } else {
        setProfile(publicData);
      }

      // Fetch private profile
      const { data: privateData, error: privateError } = await supabase
        .from("profile_private")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (privateError) {
        console.error("Error fetching private profile:", privateError);
      } else {
        setPrivateProfile(privateData);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handlePublicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePrivateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateProfile({ ...privateProfile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);

    // Update public profile
    const { error: publicError } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
      })
      .eq("user_id", user.id);

    if (publicError) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      setSaving(false);
      return;
    }

    // Update private profile
    const { error: privateError } = await supabase
      .from("profile_private")
      .update({
        phone: privateProfile.phone,
        address_line1: privateProfile.address_line1,
        address_line2: privateProfile.address_line2,
        city: privateProfile.city,
        state: privateProfile.state,
        postal_code: privateProfile.postal_code,
        country: privateProfile.country,
      })
      .eq("user_id", user.id);

    if (privateError) {
      toast({
        title: "Error",
        description: "Failed to update contact information",
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
      <div className="container px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="max-w-2xl">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium mb-6 sm:mb-8">
            My Account
          </h1>

          <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-card rounded-lg border border-border">
            <p className="text-xs sm:text-sm text-muted-foreground">Signed in as</p>
            <p className="font-medium text-sm sm:text-base break-all">{user.email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                name="full_name"
                value={profile.full_name || ""}
                onChange={handlePublicChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={privateProfile.phone || ""}
                onChange={handlePrivateChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address_line1">Address Line 1</Label>
              <Input
                id="address_line1"
                name="address_line1"
                value={privateProfile.address_line1 || ""}
                onChange={handlePrivateChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address_line2">Address Line 2</Label>
              <Input
                id="address_line2"
                name="address_line2"
                value={privateProfile.address_line2 || ""}
                onChange={handlePrivateChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={privateProfile.city || ""}
                  onChange={handlePrivateChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  name="state"
                  value={privateProfile.state || ""}
                  onChange={handlePrivateChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postal_code">Postal Code</Label>
                <Input
                  id="postal_code"
                  name="postal_code"
                  value={privateProfile.postal_code || ""}
                  onChange={handlePrivateChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={privateProfile.country || ""}
                  onChange={handlePrivateChange}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Button type="submit" disabled={saving} className="w-full sm:w-auto">
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" asChild className="w-full sm:w-auto">
                <Link to="/orders">View Orders</Link>
              </Button>
            </div>
          </form>

          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
            <Button variant="outline" onClick={handleSignOut} className="w-full sm:w-auto">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;