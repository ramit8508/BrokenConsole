import { useEffect, useRef } from "react";

export function useSectionAchievement(
  sectionId: string,
  achievementId: string,
  unlock: (id: string) => void
) {
  const ref = useRef<HTMLElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    ref.current = el;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          unlock(achievementId);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionId, achievementId, unlock]);
}
