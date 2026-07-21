import { BookButton } from "./BookButton";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { scrollToElement } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "schedule", label: "Schedule" },
  { id: "coach", label: "Coach" },
  { id: "logistics", label: "Logistics" },
] as const;

export function TopBar() {
  const activeSection = useScrollSpy(NAV_ITEMS.map((item) => item.id));

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

        <BookButton size="sm" className="ml-auto shrink-0">
          Book
        </BookButton>
      </div>
    </header>
  );
}
