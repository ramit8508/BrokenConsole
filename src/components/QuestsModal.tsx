import { motion, AnimatePresence } from "framer-motion";
import { type Quest } from "../hooks/useSessionProgress";

interface QuestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  quests: Quest[];
}

export function QuestsModal({ isOpen, onClose, quests }: QuestsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              zIndex: 100,
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-40%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-40%" }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              width: "90%",
              maxWidth: "500px",
              maxHeight: "80vh",
              overflowY: "auto",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "24px",
              zIndex: 101,
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quests-modal-title"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 id="quests-modal-title" style={{ margin: 0, fontSize: "1.5rem", color: "var(--accent)" }}>
                Active Quests
              </h2>
              <button 
                onClick={onClose}
                style={{ 
                  background: "none", 
                  border: "none", 
                  color: "var(--text-muted)", 
                  cursor: "pointer",
                  fontSize: "1.25rem",
                  padding: "4px"
                }}
                aria-label="Close quests modal"
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {quests.map((quest) => (
                <div 
                  key={quest.id}
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    border: `1px solid ${quest.completed ? "var(--success, #10b981)" : "var(--border)"}`,
                    backgroundColor: quest.completed ? "rgba(16, 185, 129, 0.05)" : "var(--surface-2)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    opacity: quest.completed ? 0.7 : 1
                  }}
                >
                  <div style={{ flexGrow: 1 }}>
                    <h3 style={{ 
                      margin: "0 0 4px 0", 
                      fontSize: "1rem", 
                      color: quest.completed ? "var(--success, #10b981)" : "var(--text)",
                      textDecoration: quest.completed ? "line-through" : "none"
                    }}>
                      {quest.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-muted)" }}>
                      {quest.description}
                    </p>
                  </div>
                  
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "4px"
                  }}>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--accent)"
                    }}>
                      +{quest.reward} XP
                    </span>
                    {quest.completed && (
                      <span style={{ fontSize: "0.75rem", color: "var(--success, #10b981)" }}>Completed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
