import { useState, useEffect, useRef, useCallback } from "react";

export interface Achievement {
  id: string;
  label: string;
  reward?: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
}

const ACHIEVEMENTS: Achievement[] = [
  { id: "events", label: "Checked upcoming events", reward: 50 },
  { id: "team", label: "Met the team", reward: 50 },
  { id: "contact", label: "Found us", reward: 50 },
];

const INITIAL_QUESTS: Quest[] = [
  { id: "first_registration", title: "Join the Resistance", description: "Register for your first event.", reward: 100, completed: false },
  { id: "explore_events", title: "Intel Gathering", description: "Check upcoming events.", reward: 50, completed: false },
  { id: "explore_team", title: "Meet the Operatives", description: "Check out the team section.", reward: 50, completed: false },
  { id: "explore_contact", title: "Establish Comm Link", description: "Find our contact info.", reward: 50, completed: false },
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
  
  // Gamification State
  const [points, setPoints] = useState<number>(() => {
    const saved = localStorage.getItem("bc_points");
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [quests, setQuests] = useState<Quest[]>(() => {
    const saved = localStorage.getItem("bc_quests");
    return saved ? JSON.parse(saved) : INITIAL_QUESTS;
  });

  const unlockedRef = useRef<Set<string>>(new Set(
    quests.filter(q => q.completed).map(q => q.id.replace('explore_', ''))
  ));
  
  const achievementTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("bc_points", points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem("bc_quests", JSON.stringify(quests));
  }, [quests]);

  const addPoints = useCallback((amount: number) => {
    setPoints(prev => prev + amount);
  }, []);

  const completeQuest = useCallback((id: string) => {
    setQuests(prev => {
      const isAlreadyCompleted = prev.find(q => q.id === id)?.completed;
      if (isAlreadyCompleted) return prev;
      
      const newQuests = prev.map(q => 
        q.id === id ? { ...q, completed: true } : q
      );
      
      // Add points for the quest
      const quest = newQuests.find(q => q.id === id);
      if (quest) {
        addPoints(quest.reward);
      }
      return newQuests;
    });
  }, [addPoints]);

  const unlockAchievement = useCallback((id: string) => {
    if (unlockedRef.current.has(id)) return;
    unlockedRef.current.add(id);
    
    // Check if there's a corresponding explore quest
    completeQuest(`explore_${id}`);

    const ach = ACHIEVEMENTS.find((a) => a.id === id);
    if (!ach) return;
    setLatestAchievement(ach);
    
    if (achievementTimerRef.current) clearTimeout(achievementTimerRef.current);
    achievementTimerRef.current = setTimeout(() => {
      setLatestAchievement(null);
    }, 3000);
  }, [completeQuest]);

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
    points,
    addPoints,
    quests,
    completeQuest
  };
}
