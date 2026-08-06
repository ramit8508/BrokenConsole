import { useState, useEffect, useRef, useCallback } from "react";

export interface Achievement {
  id: string;
  label: string;
  xp: number;
  icon: string;
}

const ACHIEVEMENTS: Achievement[] = [
  { id: "first_scroll", label: "First Steps", xp: 10, icon: "🚶" },
  { id: "domains", label: "Path Explorer — Viewed Domains", xp: 25, icon: "🗺️" },
  { id: "events", label: "Event Scout — Checked Events", xp: 25, icon: "📅" },
  { id: "team", label: "Social Butterfly — Met the Team", xp: 25, icon: "🤝" },
  { id: "contact", label: "Connector — Found Contact", xp: 25, icon: "📬" },
  { id: "scroll_50", label: "Halfway There — 50% Scrolled", xp: 15, icon: "⚡" },
  { id: "scroll_100", label: "Full Send — 100% Scrolled", xp: 30, icon: "🏁" },
  { id: "speed_scroll", label: "Speed Runner — Reached bottom fast", xp: 40, icon: "💨" },
  { id: "konami", label: "Cheat Code Activated", xp: 50, icon: "🎮" },
  { id: "click_combo", label: "Button Masher — 5 clicks combo", xp: 20, icon: "🔥" },
  { id: "curious", label: "Curious Cat — Expanded past event", xp: 15, icon: "🐱" },
  { id: "night_owl", label: "Night Owl — Visiting after midnight", xp: 20, icon: "🦉" },
];

function getScrollProgress(): number {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
}

const XP_PER_LEVEL = 50; // XP needed to level up

export function useSessionProgress() {
  const [totalXP, setTotalXP] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [latestAchievement, setLatestAchievement] = useState<Achievement | null>(null);
  const [achievementCount, setAchievementCount] = useState(0);
  const unlockedRef = useRef<Set<string>>(new Set());
  const achievementTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef(Date.now());
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const unlockAchievement = useCallback((id: string) => {
    if (unlockedRef.current.has(id)) return;
    unlockedRef.current.add(id);
    const ach = ACHIEVEMENTS.find((a) => a.id === id);
    if (!ach) return;
    setTotalXP((prev) => prev + ach.xp);
    setAchievementCount((prev) => prev + 1);
    setLatestAchievement(ach);
    if (achievementTimerRef.current) clearTimeout(achievementTimerRef.current);
    achievementTimerRef.current = setTimeout(() => {
      setLatestAchievement(null);
    }, 4000);
  }, []);

  // Track click combos
  const registerClick = useCallback(() => {
    clickCountRef.current++;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1500);
    if (clickCountRef.current >= 5) {
      unlockAchievement("click_combo");
      clickCountRef.current = 0;
    }
  }, [unlockAchievement]);

  // Scroll tracking + scroll-based achievements
  useEffect(() => {
    let firstScrollFired = false;
    const onScroll = () => {
      const progress = getScrollProgress();
      setScrollProgress(progress);

      if (!firstScrollFired && progress > 0.02) {
        firstScrollFired = true;
        unlockAchievement("first_scroll");
      }
      if (progress >= 0.5) unlockAchievement("scroll_50");
      if (progress >= 0.98) {
        unlockAchievement("scroll_100");
        // Speed runner: if reached bottom within 30 seconds
        if (Date.now() - startTimeRef.current < 30000) {
          unlockAchievement("speed_scroll");
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [unlockAchievement]);

  // Night owl achievement
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) {
      unlockAchievement("night_owl");
    }
  }, [unlockAchievement]);

  // Konami code easter egg
  useEffect(() => {
    const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let konamiIndex = 0;

    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === KONAMI.length) {
          unlockAchievement("konami");
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [unlockAchievement]);

  // Global click tracker for combo
  useEffect(() => {
    const handler = () => registerClick();
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [registerClick]);

  useEffect(() => {
    return () => {
      if (achievementTimerRef.current) clearTimeout(achievementTimerRef.current);
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, []);

  const level = Math.floor(totalXP / XP_PER_LEVEL) + 1;
  const levelProgress = ((totalXP % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;

  return {
    scrollProgress,
    totalXP,
    level,
    levelProgress,
    latestAchievement,
    achievementCount,
    totalAchievements: ACHIEVEMENTS.length,
    unlockAchievement,
    registerClick,
  };
}
