import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";

export const Route = createFileRoute("/admin/profiles")({
  component: AdminProfilesList,
});

interface ProfileData {
  id: string;
  email: string;
  role: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

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

function getInitials(first: string | null, last: string | null, email: string) {
  const f = first?.[0] ?? "";
  const l = last?.[0] ?? "";
  if (f || l) return `${f}${l}`.toUpperCase();
  return (email[0] ?? "?").toUpperCase();
}

function AdminProfilesList() {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useCurrentUser();

  useEffect(() => {
    async function fetchProfiles() {
      // In Supabase Auth, getting full user list usually requires the service_role key 
      // or a secure RPC call. However, since the prompt specifies we use `public.users` 
      // which is synced via trigger, we can fetch from there.
      
      const { data, error } = await supabase
        .from("users")
        .select(`
          id, 
          email, 
          role,
          client_profiles(first_name, last_name)
        `);

      if (error) {
        console.error("Error fetching profiles:", error);
        setLoading(false);
        return;
      }

      // We also need avatar_urls which might only exist in auth.users user_metadata.
      // Since we can't easily query auth.users from client without admin API,
      // and we updated the plan to have avatars upload to the bucket, we might not have 
      // direct access to everyone's user_metadata from `public.users` unless we sync it.
      // For now, we will display what we have, and in the detailed view we can fetch more if needed,
      // or just assume we don't have everyone's avatar here unless we add it to `public.users`.
      
      // Let's map it out
      const formatted: ProfileData[] = data.map((u: any) => ({
        id: u.id,
        email: u.email,
        role: u.role,
        first_name: u.client_profiles?.first_name ?? null,
        last_name: u.client_profiles?.last_name ?? null,
        avatar_url: null, // Note: we'd need to sync this to public.users to show in list efficiently
      }));
      
      setProfiles(formatted);
      setLoading(false);
    }
    
    fetchProfiles();
  }, []);

  if (loading) {
    return <div className="p-8">Loading profiles...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profiles</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and view all registered users.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((p) => {
          const initials = getInitials(p.first_name, p.last_name, p.email);
          const fullName = p.first_name || p.last_name ? `${p.first_name || ''} ${p.last_name || ''}`.trim() : 'No Name Set';

          return (
            <Link key={p.id} to={`/admin/profiles/${p.id}`} className="block">
              <Card className="hover:bg-accent/50 transition-colors h-full">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 ring-2 ring-border text-lg font-bold text-primary">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold truncate text-foreground">
                      {fullName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {p.email}
                    </p>
                    <div className="mt-2">
                      <span
                        className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize ${getRoleBadgeClass(p.role)}`}
                      >
                        {p.role}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
