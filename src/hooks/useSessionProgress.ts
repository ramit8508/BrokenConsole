import { useState, useEffect, useRef, useCallback } from "react";

export interface Achievement {
  id: string;
  label: string;
}

const ACHIEVEMENTS: Achievement[] = [
  { id: "events", label: "Checked upcoming events" },
  { id: "team", label: "Met the team" },
  { id: "contact", label: "Found us" },
];

function getScrollProgress(): number {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
}

function progressToLevel(progress: number): { level: number; levelProgress: number } {
  // 5 levels: 0–20%, 20–40%, 40–60%, 60–80%, 80–100%
  const level = Math.min(Math.floor(progress * 5) + 1, 5);
  const levelProgress = ((progress * 5) % 1) * 100;
  return { level, levelProgress };
}

export function useSessionProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [latestAchievement, setLatestAchievement] = useState<Achievement | null>(null);
  const unlockedRef = useRef<Set<string>>(new Set());
  const achievementTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const unlockAchievement = useCallback((id: string) => {
    if (unlockedRef.current.has(id)) return;
    unlockedRef.current.add(id);
    const ach = ACHIEVEMENTS.find((a) => a.id === id);
    if (!ach) return;
    setLatestAchievement(ach);
    if (achievementTimerRef.current) clearTimeout(achievementTimerRef.current);
    achievementTimerRef.current = setTimeout(() => {
      setLatestAchievement(null);
    }, 3000);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrollProgress(getScrollProgress());
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (achievementTimerRef.current) clearTimeout(achievementTimerRef.current);
    };
  }, []);

  const { level, levelProgress } = progressToLevel(scrollProgress);

  return {
    scrollProgress,
    level,
    levelProgress,
    latestAchievement,
    unlockAchievement,
  };
}
