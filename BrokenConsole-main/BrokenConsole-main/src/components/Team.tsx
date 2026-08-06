import { motion } from "framer-motion";
import { team, type TeamMember } from "../data/team";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Deterministic accent-tinted background from name
function getAvatarBg(name: string): string {
  const hues = [252, 230, 270, 210, 290, 220, 260, 240];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const hue = hues[Math.abs(hash) % hues.length];
  return `hsl(${hue}, 45%, 20%)`;
}

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.article
      className="neo-card w-full"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
      style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", height: "100%" }}
      aria-label={`Team member: ${member.name}, ${member.role}`}
    >
      {/* Avatar */}
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: getAvatarBg(member.name),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-mono)",
          fontSize: "0.875rem",
          fontWeight: 500,
          color: "var(--text)",
          flexShrink: 0,
          letterSpacing: "0.04em",
        }}
        aria-hidden="true"
      >
        {getInitials(member.name)}
      </div>

      {/* Name + role */}
      <div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", marginBottom: "4px" }}>
          {member.name}
        </h3>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {member.role}
        </span>
      </div>

      {/* Quote */}
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "0.9375rem",
          lineHeight: 1.55,
          fontStyle: "italic",
          flexGrow: 1,
        }}
      >
        "{member.quote}"
      </p>

      {/* Contact links — labeled, not icon-only */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          paddingTop: "12px",
          borderTop: "4px solid var(--border)",
          flexWrap: "wrap",
        }}
      >
        <a
          href={`mailto:${member.email}`}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
            textDecoration: "none",
            transition: "color 150ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          aria-label={`Email ${member.name}`}
        >
          Email
        </a>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
            textDecoration: "none",
            transition: "color 150ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          aria-label={`${member.name} on LinkedIn`}
        >
          LinkedIn
        </a>
        <a
          href={member.instagram}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
            textDecoration: "none",
            transition: "color 150ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          aria-label={`${member.name} on Instagram`}
        >
          Instagram
        </a>
      </div>
    </motion.article>
  );
}

export function Team() {
  return (
    <section id="team" className="section" aria-labelledby="team-heading">
      <div className="container">
        <div className="flex flex-col items-center text-center mx-auto mb-16 max-w-3xl">
          <motion.span
            className="eyebrow mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4 }}
          >
            Core Team
          </motion.span>
          <motion.h2
            id="team-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-0"
          >
            Who runs it
          </motion.h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mx-auto max-w-6xl">
          {team.map((member, i) => (
            <div key={member.email} className="flex w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] max-w-[320px]">
              <TeamCard member={member} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
