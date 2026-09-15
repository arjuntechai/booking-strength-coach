import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/profiles/$userId")({
  component: AdminSingleProfile,
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

function getInitials(first: string | null, last: string | null, email: string) {
  const f = first?.[0] ?? "";
  const l = last?.[0] ?? "";
  if (f || l) return `${f}${l}`.toUpperCase();
  return (email[0] ?? "?").toUpperCase();
}

function AdminSingleProfile() {
  const { userId } = Route.useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [injuryNotes, setInjuryNotes] = useState("");
  const [goals, setGoals] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from("users")
        .select(`
          id, 
          email, 
          role,
          client_profiles(*)
        `)
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfile(data);
        const cp = data.client_profiles || {};
        setFirstName(cp.first_name || "");
        setLastName(cp.last_name || "");
        setPhone(cp.phone || "");
        setEmergencyContact(cp.emergency_contact || "");
        setInjuryNotes(cp.injury_notes || "");
        setGoals(cp.goals || "");
      }
      setLoading(false);
    }
    fetchProfile();
  }, [userId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("client_profiles")
        .upsert({
          user_id: userId,
          first_name: firstName,
          last_name: lastName,
          phone,
          emergency_contact: emergencyContact,
          injury_notes: injuryNotes,
          goals
        });
      
      if (error) throw error;
      toast.success("Profile updated successfully");
      
      setProfile({
        ...profile,
        client_profiles: {
          ...(profile.client_profiles || {}),
          first_name: firstName,
          last_name: lastName,
          phone,
          emergency_contact: emergencyContact,
          injury_notes: injuryNotes,
          goals
        }
      });
    } catch (err: any) {
      toast.error(err.message ?? "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="p-8">Profile not found.</div>;
  }

  const cp = profile.client_profiles || {};
  const initials = getInitials(cp.first_name, cp.last_name, profile.email);
  const fullName = cp.first_name || cp.last_name ? `${cp.first_name || ''} ${cp.last_name || ''}`.trim() : 'No Name Set';

  return (
    <div className="space-y-6 max-w-2xl mx-auto py-8 px-4">
      <Link
        to="/admin/profiles"
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-block mb-4"
      >
        ← Back to Profiles
      </Link>

      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 ring-4 ring-border text-3xl font-bold text-primary">
          {initials}
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">
            {fullName}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{profile.email}</p>
          <span
            className={`mt-2 inline-block rounded-full border px-3 py-0.5 text-xs font-medium capitalize ${getRoleBadgeClass(profile.role)}`}
          >
            {profile.role}
          </span>
        </div>
      </div>

      <form onSubmit={handleSave} className="mt-10 rounded-xl border border-border bg-card p-6 space-y-6">
        <h2 className="font-display text-base font-semibold tracking-tight">
          Edit Profile Data
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>First name</Label>
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Last name</Label>
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={profile.email} readOnly disabled className="opacity-70 bg-muted cursor-not-allowed" />
        </div>

        <div className="space-y-2">
          <Label>Phone</Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        
        <div className="space-y-2">
          <Label>Emergency Contact</Label>
          <Input value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Goals</Label>
          <textarea 
            value={goals} 
            onChange={(e) => setGoals(e.target.value)}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
          />
        </div>
        
        <div className="space-y-2">
          <Label>Injury Notes</Label>
          <textarea 
            value={injuryNotes} 
            onChange={(e) => setInjuryNotes(e.target.value)}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSaving}>
          {isSaving ? "Saving…" : "Save changes"}
        </Button>
      </form>
    </div>
  );
}
