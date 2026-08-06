import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StatusBarProps {
  level: number;
  levelProgress: number;
  totalXP: number;
  achievementCount: number;
  totalAchievements: number;
  latestAchievement: { id: string; label: string } | null;
}

export function StatusBar({ level, levelProgress, totalXP, achievementCount, totalAchievements }: StatusBarProps) {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showPanel, setShowPanel] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  // Track scroll %
  useEffect(() => {
    const handler = () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(dh > 0 ? Math.round((st / dh) * 100) : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Session timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(sessionTime / 60);
  const seconds = sessionTime % 60;
  const timeStr = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="status-bar-wrapper" role="status" aria-live="polite" aria-label="Session progress">
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "44px",
          backgroundColor: "var(--surface)",
          borderTop: "4px solid var(--border)",
          display: "flex",
          alignItems: "center",
          zIndex: 40,
        }}
      >
        {/* Level indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            paddingInline: "16px",
            height: "100%",
            borderRight: "4px solid var(--border)",
            flexShrink: 0,
            cursor: "pointer",
          }}
          onClick={() => setShowPanel(!showPanel)}
          title="Click to view stats"
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.6rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent)",
              whiteSpace: "nowrap",
              fontWeight: 700,
            }}
          >
            LV.{level}
          </span>

          {/* XP Progress bar */}
          <div
            style={{
              width: "80px",
              height: "8px",
              background: "var(--bg)",
              border: "2px solid var(--border)",
              overflow: "hidden",
            }}
            aria-hidden="true"
          >
            <motion.div
              style={{
                height: "100%",
                background: "var(--accent)",
              }}
              animate={{ width: `${levelProgress}%` }}
              transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
            />
          </div>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              color: "var(--text-muted)",
              whiteSpace: "nowrap",
            }}
          >
            {totalXP} XP
          </span>
        </div>

        {/* Center: Achievements count */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            paddingInline: "16px",
            height: "100%",
            borderRight: "4px solid var(--border)",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.55rem",
              color: "var(--accent-2)",
              whiteSpace: "nowrap",
            }}
          >
            🏆 {achievementCount}/{totalAchievements}
          </span>
        </div>

        {/* Session Timer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            paddingInline: "16px",
            height: "100%",
            borderRight: "4px solid var(--border)",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--text-muted)",
              whiteSpace: "nowrap",
            }}
          >
            ⏱ {timeStr}
          </span>
        </div>

        {/* Center: site name */}
        <div style={{ flexGrow: 1, textAlign: "center" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.5rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              opacity: 0.6,
            }}
          >
            BROKEN_CONSOLE
          </span>
        </div>

        {/* Right: scroll percentage */}
        <div
          style={{
            paddingInline: "16px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderLeft: "4px solid var(--border)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.04em",
              color: "var(--text-muted)",
              whiteSpace: "nowrap",
            }}
          >
            SCROLL {scrollPercent}%
          </span>
        </div>
      </div>

      {/* Expandable Stats Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              bottom: "48px",
              left: "8px",
              zIndex: 45,
              width: "280px",
              backgroundColor: "var(--surface)",
              border: "4px solid var(--border)",
              boxShadow: "8px 8px 0px var(--border)",
              padding: "20px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text)",
                marginBottom: "16px",
                paddingBottom: "8px",
                borderBottom: "4px solid var(--border)",
              }}
            >
              📊 SESSION STATS
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <StatRow label="Level" value={`LV.${level}`} accent />
              <StatRow label="Total XP" value={`${totalXP} XP`} />
              <StatRow label="Next Level" value={`${Math.round(levelProgress)}%`} />
              <StatRow label="Achievements" value={`${achievementCount}/${totalAchievements}`} accent />
              <StatRow label="Session Time" value={timeStr} />
              <StatRow label="Scroll" value={`${scrollPercent}%`} />
            </div>

            <div
              style={{
                marginTop: "16px",
                paddingTop: "12px",
                borderTop: "2px dashed var(--border)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                color: "var(--text-muted)",
                textAlign: "center",
                letterSpacing: "0.06em",
              }}
            >
              TIP: Try the Konami Code 🎮
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .status-bar-wrapper { display: none; }
        @media (min-width: 860px) { .status-bar-wrapper { display: block; } }
      `}</style>
    </div>
  );
}

function StatRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "var(--font-mono)",
        fontSize: "0.6rem",
        padding: "4px 8px",
        background: "var(--bg)",
        border: "2px solid var(--border)",
      }}
    >
      <span style={{ color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {label}
      </span>
      <span
        style={{
          color: accent ? "var(--accent)" : "var(--text)",
          fontWeight: 700,
        }}
      >
        {value}
      </span>
    </div>
  );
}
