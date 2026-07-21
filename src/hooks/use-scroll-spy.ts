import { useEffect, useState } from "react";

const HEADER_OFFSET = 72;

export function useScrollSpy(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const updateActive = () => {
      const scrollY = window.scrollY + HEADER_OFFSET + 8;
      let current = sections[0]!.id;

      for (const section of sections) {
        if (section.offsetTop <= scrollY) {
          current = section.id;
        }
      }

      setActiveId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [sectionIds]);

  return activeId;
}
