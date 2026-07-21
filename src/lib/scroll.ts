export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function scrollToElement(
  target: Element | string | null | undefined,
  options?: ScrollIntoViewOptions,
) {
  const el =
    typeof target === "string" ? document.getElementById(target) : target;
  if (!el) return;

  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
    ...options,
  });
}
