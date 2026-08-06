import { useState } from "react";
import { motion } from "framer-motion";

const DOMAINS = [
  {
    id: "dev",
    title: "Game Dev",
    icon: "💻",
    description: "Build immersive worlds using industry-standard engines and frameworks.",
    tools: ["Unity", "Unreal", "Godot"],
    difficulty: "INTERMEDIATE",
    xpReward: "+150 XP",
    questLine: "The Builder's Path",
  },
  {
    id: "design",
    title: "Game Design",
    icon: "🎨",
    description: "Craft compelling mechanics, levels, and narratives that keep players engaged.",
    tools: ["Blender", "Figma", "Aseprite"],
    difficulty: "BEGINNER",
    xpReward: "+100 XP",
    questLine: "The Creator's Path",
  },
  {
    id: "esports",
    title: "Esports",
    icon: "🎮",
    description: "Compete in inter-college tournaments and build professional gaming skills.",
    tools: ["Valorant", "CS2", "Rocket League"],
    difficulty: "ALL LEVELS",
    xpReward: "+200 XP",
    questLine: "The Champion's Path",
  }
];

const DIFFICULTY_COLORS: Record<string, string> = {
  "BEGINNER": "var(--accent-3)",
  "INTERMEDIATE": "var(--accent-2)",
  "ALL LEVELS": "var(--accent)",
};

function DomainCard({ domain }: { domain: typeof DOMAINS[0] }) {
  const [selected, setSelected] = useState(false);

  return (
    <motion.div
      className="neo-card flex flex-col h-full cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={() => setSelected(!selected)}
      style={{
        border: selected ? "4px solid var(--accent)" : undefined,
        boxShadow: selected ? "8px 8px 0px var(--accent)" : undefined,
      }}
    >
      {/* Top row: icon + difficulty badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <div className="text-[48px] leading-none">
          {domain.icon}
        </div>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.5rem",
            letterSpacing: "0.08em",
            padding: "4px 8px",
            border: "2px solid var(--border)",
            backgroundColor: "var(--bg)",
            color: DIFFICULTY_COLORS[domain.difficulty] || "var(--text)",
            whiteSpace: "nowrap",
          }}
        >
          {domain.difficulty}
        </span>
      </div>

      {/* Quest line label */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.08em",
          color: "var(--accent)",
          marginBottom: "4px",
          textTransform: "uppercase",
        }}
      >
        ◆ {domain.questLine}
      </div>

      <h3 className="mb-4">
        {domain.title}
      </h3>
      <p className="font-body text-[var(--text-muted)] font-bold text-sm md:text-base mb-6 flex-grow">
        {domain.description}
      </p>

      {/* Tools as "skills" */}
      <div style={{ marginBottom: "12px" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.5rem",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            marginBottom: "8px",
            textTransform: "uppercase",
          }}
        >
          REQUIRED SKILLS
        </div>
        <div className="flex flex-wrap gap-2">
          {domain.tools.map(tool => (
            <span
              key={tool}
              className="px-2 py-1 text-xs md:text-sm border-2 border-[var(--border)] bg-[var(--surface)] text-[var(--border)] font-bold uppercase"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* XP reward + select state */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "12px",
          borderTop: "4px solid var(--border)",
          marginTop: "auto",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "var(--accent-2)",
            letterSpacing: "0.04em",
          }}
        >
          {domain.xpReward}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.5rem",
            letterSpacing: "0.08em",
            padding: "4px 12px",
            border: "2px solid var(--border)",
            backgroundColor: selected ? "var(--accent)" : "var(--surface)",
            color: selected ? "var(--surface)" : "var(--text)",
            boxShadow: selected ? "none" : "4px 4px 0px var(--border)",
            transition: "all 0.15s ease",
          }}
        >
          {selected ? "✓ SELECTED" : "SELECT PATH"}
        </span>
      </div>
    </motion.div>
  );
}

export function Domains() {
  return (
    <section id="domains" className="section bg-[var(--bg)]">
      <div className="container">
        <div className="mb-16 flex flex-col items-center text-center mx-auto max-w-3xl">
          <span className="eyebrow mb-4">⚔️ Quest Board</span>
          <h2 className="mb-4">Choose Your Path</h2>
          <p className="font-body text-[var(--text-muted)] font-bold max-w-2xl text-lg md:text-xl">
            Select your domain to begin your quest. Each path unlocks unique skills and XP rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {DOMAINS.map((domain, i) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <DomainCard domain={domain} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
