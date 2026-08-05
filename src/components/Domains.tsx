import { motion } from "framer-motion";

const DOMAINS = [
  {
    id: "dev",
    title: "Game Dev",
    icon: "💻",
    description: "Build immersive worlds using industry-standard engines and frameworks.",
    tools: ["Unity", "Unreal", "Godot"]
  },
  {
    id: "design",
    title: "Game Design",
    icon: "🎨",
    description: "Craft compelling mechanics, levels, and narratives that keep players engaged.",
    tools: ["Blender", "Figma", "Aseprite"]
  },
  {
    id: "esports",
    title: "Esports",
    icon: "🎮",
    description: "Compete in inter-college tournaments and build professional gaming skills.",
    tools: ["Valorant", "CS2", "Rocket League"]
  }
];

function DomainCard({ domain }: { domain: typeof DOMAINS[0] }) {
  return (
    <motion.div
      className="neo-card flex flex-col h-full cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="text-[48px] leading-none mb-4">
        {domain.icon}
      </div>
      <h3 className="mb-4">
        {domain.title}
      </h3>
      <p className="font-body text-[var(--text-muted)] font-bold text-sm md:text-base mb-6 flex-grow">
        {domain.description}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
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
    </motion.div>
  );
}

export function Domains() {
  return (
    <section id="domains" className="section bg-[var(--bg)]">
      <div className="container">
        <div className="mb-16 flex flex-col items-center text-center mx-auto max-w-3xl">
          <span className="eyebrow mb-4">Core Domains</span>
          <h2 className="mb-4">Choose Your Path</h2>
          <p className="font-body text-[var(--text-muted)] font-bold max-w-2xl text-lg md:text-xl">
            Whether you want to build games, design them, or play them competitively — there's a place for you here.
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
