export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-end gap-6 px-5 py-10 sm:px-8">
        <div className="min-w-0">
          <div className="font-display text-sm font-semibold">Alex Moreno</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Poblenou, Barcelona · Studio &amp; Outdoor coaching
          </div>
        </div>
        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground">Instagram</a>
          <a href="mailto:hello@example.com" className="hover:text-foreground">Email</a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-4 text-[0.7rem] tracking-wider uppercase text-muted-foreground sm:px-8">
          © {new Date().getFullYear()} Alex Moreno S&amp;C
        </div>
      </div>
    </footer>
  );
}
