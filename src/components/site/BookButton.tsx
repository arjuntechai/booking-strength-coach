import { BOOKING_URL } from "@/data/site";

type Props = {
  className?: string;
  children?: React.ReactNode;
  variant?: "solid" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function BookButton({ className = "", children = "Book Your Session", variant = "solid", size = "md" }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium tracking-tight rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60";
  const sizes = {
    sm: "h-9 px-3 text-xs",
    md: "h-11 px-5 text-sm",
    lg: "h-14 px-8 text-base",
  }[size];
  const variants = {
    solid: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost:
      "border border-border bg-transparent text-foreground hover:bg-surface-elevated",
  }[variant];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (BOOKING_URL.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(BOOKING_URL);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <a
      href={BOOKING_URL}
      onClick={handleClick}
      className={`${base} ${sizes} ${variants} ${className}`}
    >
      {children}
      <span aria-hidden className="text-[0.9em]">→</span>
    </a>
  );
}
