import { motion, AnimatePresence } from "framer-motion";

interface StatusBarProps {
  level: number;
  levelProgress: number;
  latestAchievement: { id: string; label: string } | null;
  points?: number;
  onOpenQuests?: () => void;
}

export function StatusBar({ level, levelProgress, points, onOpenQuests }: StatusBarProps) {
  return (
    <div className="status-bar-wrapper" role="status" aria-live="polite" aria-label="Session progress">
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40px",
          backgroundColor: "rgba(5,5,7,0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          zIndex: 40,
        }}
      >
        {/* Session level — left */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            paddingInline: "20px",
            height: "100%",
            borderRight: "1px solid var(--border)",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--accent)",
              whiteSpace: "nowrap",
              fontWeight: 500,
            }}
          >
            LV.{level}
          </span>

          {/* Progress bar */}
          <div
            style={{
              width: "100px",
              height: "3px",
              background: "var(--border)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
            aria-hidden="true"
          >
            <motion.div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, var(--accent), #06b6d4)",
                borderRadius: "2px",
              }}
              animate={{ width: `${levelProgress}%` }}
              transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
            />
          </div>
        </div>

        {/* Center: site name */}
        <div style={{ flexGrow: 1, textAlign: "center" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              opacity: 0.5,
            }}
          >
            BROKEN_CONSOLE
          </span>
        </div>

        {/* Right: gamification & scroll */}
        <div
          style={{
            paddingInline: "20px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            borderLeft: "1px solid var(--border)",
          }}
        >
          {points !== undefined && (
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
              color: "var(--accent)",
              fontWeight: 600,
            }}>
              {points} XP
            </span>
          )}
          
          {onOpenQuests && (
            <button
              onClick={onOpenQuests}
              style={{
                background: "rgba(6, 182, 212, 0.1)",
                border: "1px solid var(--accent)",
                color: "var(--accent)",
                padding: "4px 12px",
                borderRadius: "4px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(6, 182, 212, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(6, 182, 212, 0.1)";
              }}
            >
              Quests
            </button>
          )}

          <div style={{ width: "1px", height: "16px", background: "var(--border)" }} />

          <AnimatePresence mode="wait">
            <motion.span
              key={Math.round(levelProgress)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.06em",
                color: "var(--text-muted)",
                whiteSpace: "nowrap",
              }}
            >
              {Math.round(((level - 1) * 20) + (levelProgress / 5))}%
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .status-bar-wrapper { display: none; }
        @media (min-width: 860px) { .status-bar-wrapper { display: block; } }
      `}</style>
    </div>
  );
}
