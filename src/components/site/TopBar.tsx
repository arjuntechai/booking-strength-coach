import { BookButton } from "./BookButton";

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 sm:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-2">
          <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
          <span className="truncate font-display text-sm font-semibold tracking-tight">
            Alex Moreno<span className="text-muted-foreground"> — S&amp;C</span>
          </span>
        </a>
        <BookButton size="sm">Book</BookButton>
      </div>
    </header>
  );
}
