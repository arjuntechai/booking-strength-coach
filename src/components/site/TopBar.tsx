import { Link, useNavigate } from "@tanstack/react-router";
import { BookButton } from "./BookButton";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useCurrentUser } from "@/hooks/use-current-user";
import { scrollToElement } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const NAV_ITEMS = [
  { id: "schedule", label: "Schedule" },
  { id: "coach", label: "Coach" },
  { id: "logistics", label: "Logistics" },
] as const;

function getInitials(user: { email?: string; user_metadata?: { first_name?: string; last_name?: string } } | null): string {
  if (!user) return "?";
  const first = user.user_metadata?.first_name?.[0] ?? "";
  const last = user.user_metadata?.last_name?.[0] ?? "";
  if (first || last) return `${first}${last}`.toUpperCase();
  return (user.email?.[0] ?? "?").toUpperCase();
}

function AvatarDropdown() {
  const { user, role } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setOpen(false);
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  const dashboardPath =
    role === "admin" ? "/admin/dashboard" : "/user/dashboard";

  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const initials = getInitials(user);

  return (
    <div ref={ref} className="relative">
      <button
        id="profile-avatar-btn"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-border hover:ring-primary/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 overflow-hidden"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-primary/20 text-xs font-semibold text-primary">
            {initials}
          </span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-10 z-50 min-w-[160px] rounded-lg border border-border bg-card shadow-lg py-1 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <Link
            to="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
          >
            Profile
          </Link>
          <Link
            to={dashboardPath}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
          >
            Dashboard
          </Link>
          <hr className="my-1 border-border" />
          <button
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-accent transition-colors"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export function TopBar() {
  const activeSection = useScrollSpy(NAV_ITEMS.map((item) => item.id));
  const { user, loading } = useCurrentUser();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    scrollToElement(id);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 sm:px-8">
        <a href="#top" className="flex min-w-0 shrink-0 items-center gap-2">
          <span
            className="inline-block h-2 w-2 shrink-0 rounded-full bg-primary"
            aria-hidden
          />
          <span className="truncate font-display text-sm font-semibold tracking-tight">
            Alex Moreno<span className="text-muted-foreground"> — S&amp;C</span>
          </span>
        </a>

        <nav
          aria-label="Page sections"
          className="hidden min-w-0 flex-1 items-center justify-center gap-1 sm:flex"
        >
          {NAV_ITEMS.map((item) => {
            const active = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "rounded-sm px-3 py-1.5 text-xs font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-4">
          {!loading && (
            <>
              {user ? (
                <AvatarDropdown />
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </>
          )}
          <BookButton size="sm">Book</BookButton>
        </div>
      </div>
    </header>
  );
}
