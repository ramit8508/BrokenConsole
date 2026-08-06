'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Achievement {
  id: string;
  label: string;
  xp: number;
  icon: string;
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
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [achievement]);

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '24px',
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '16px 24px',
            backgroundColor: 'var(--surface)',
            border: '4px solid var(--border)',
            boxShadow: '8px 8px 0px var(--border)',
            maxWidth: '360px',
          }}
        >
          {/* XP burst decoration */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.15 }}
            style={{
              fontSize: '2rem',
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            {current.icon}
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
            {/* Achievement unlocked label */}
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
              }}
            >
              🏆 ACHIEVEMENT UNLOCKED
            </motion.span>

            {/* Achievement name */}
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--text)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {current.label}
            </motion.span>

            {/* XP reward */}
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.3 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                fontWeight: 700,
                color: 'var(--accent-2)',
                letterSpacing: '0.05em',
              }}
            >
              +{current.xp} XP
            </motion.span>
          </div>

          {/* Animated progress flash */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3.5, ease: 'linear', delay: 0.3 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'var(--accent)',
              transformOrigin: 'left',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
