'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Achievement {
  id: string;
  label: string;
}

interface AchievementPopupProps {
  achievement: Achievement | null;
}

export function AchievementPopup({ achievement }: AchievementPopupProps) {
  const [current, setCurrent] = useState<Achievement | null>(null);

  useEffect(() => {
    if (achievement) {
      setCurrent(achievement);
      const timer = setTimeout(() => {
        setCurrent(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [achievement]);

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-[80px] right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl border border-[var(--accent,#8b5cf6)] bg-[var(--surface,#1a1a1a)]"
          style={{
            borderLeftWidth: '4px',
            boxShadow: '0 0 20px rgba(139,92,246,0.2)'
          }}
        >
          <div className="text-2xl">🏆</div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">
              Achievement Unlocked
            </span>
            <span className="text-white font-medium text-sm">
              {current.label}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
