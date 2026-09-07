import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function getRoleBadgeClass(role: string | null) {
  switch (role) {
    case "admin":
      return "bg-primary/20 text-primary border-primary/30";
    case "client":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

function ProfilePage() {
  const { user, role, loading } = useCurrentUser();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Guard: redirect if unauthenticated once loading is done
  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/login" });
    }
  }, [loading, user, navigate]);

  // Populate form from user metadata
  useEffect(() => {
    if (user) {
      setFirstName(user.user_metadata?.first_name ?? "");
      setLastName(user.user_metadata?.last_name ?? "");
    }
  }, [user]);

  // Fetch phone from client_profiles for clients and admins
  useEffect(() => {
    if (!user || (role !== "client" && role !== "admin")) return;
    supabase
      .from("client_profiles")
      .select("phone")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data?.phone) setPhone(data.phone);
      });
  }, [user, role]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);

    try {
      const { error: authError } = await supabase.auth.updateUser({
        data: { first_name: firstName, last_name: lastName },
      });
      if (authError) throw authError;

      if (role === "client" || role === "admin") {
        const { error: profileError } = await supabase
          .from("client_profiles")
          .upsert({ user_id: user.id, first_name: firstName, last_name: lastName, phone });
        if (profileError) throw profileError;
      }

      toast.success("Profile saved successfully");
    } catch (err: any) {
      toast.error(err.message ?? "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const dashboardPath = role === "admin" ? "/admin/dashboard" : "/user/dashboard";

  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const initials =
    `${(user?.user_metadata?.first_name?.[0] ?? "")}${(user?.user_metadata?.last_name?.[0] ?? "")}`.toUpperCase() ||
    (user?.email?.[0] ?? "?").toUpperCase();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground text-sm">Loading…</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top nav strip */}
      <header className="border-b border-border/60 bg-background/85 backdrop-blur px-5 py-3 sm:px-8 flex items-center gap-4">
        <Link
          to="/"
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Home
        </Link>
        <span className="text-border">·</span>
        <Link
          to={dashboardPath}
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Dashboard
        </Link>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
        {/* Avatar + identity */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover ring-4 ring-border"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 ring-4 ring-border text-3xl font-bold text-primary">
                {initials}
              </div>
            )}
          </div>

          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">
              {firstName || lastName
                ? `${firstName} ${lastName}`.trim()
                : "Your Profile"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
            {role && (
              <span
                className={`mt-2 inline-block rounded-full border px-3 py-0.5 text-xs font-medium capitalize ${getRoleBadgeClass(role)}`}
              >
                {role}
              </span>
            )}
          </div>
        </div>

        {/* Edit form */}
        <form
          onSubmit={handleSave}
          className="mt-10 rounded-xl border border-border bg-card p-6 space-y-6"
        >
          <h2 className="font-display text-base font-semibold tracking-tight">
            Personal details
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={user.email ?? ""}
              readOnly
              disabled
              className="opacity-60 cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">Email cannot be changed here.</p>
          </div>

          {(role === "client" || role === "admin") && (
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+34 600 000 000"
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSaving}>
            {isSaving ? "Saving…" : "Save changes"}
          </Button>
        </form>
      </main>
    </div>
  );
}
