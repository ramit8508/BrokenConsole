import { motion } from "framer-motion";
import { upcomingEvents, pastEvents, type Event } from "../data/events";

const TAG_LABELS: Record<Event["tag"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  open: "Open",
  esports: "Esports",
};

function EventCard({ event, index }: { event: Event; index: number }) {
  const seatsLeft = event.seatsTotal - event.seatsTaken;
  const seatsPercent = (event.seatsTaken / event.seatsTotal) * 100;
  const isLow = seatsPercent > 85;

  return (
    <motion.article
      className="card"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
      style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}
      aria-label={`Event: ${event.title}`}
    >
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
        <span className="pill">{TAG_LABELS[event.tag]}</span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8125rem",
            color: isLow ? "var(--warning)" : "var(--text-muted)",
            letterSpacing: "0.04em",
          }}
          aria-label={`${event.seatsTaken} of ${event.seatsTotal} seats taken`}
        >
          {event.seatsTaken}/{event.seatsTotal} seats
        </span>
      </div>

      {/* Title */}
      <h3 style={{ fontFamily: "var(--font-display)", lineHeight: "1.25" }}>{event.title}</h3>

      {/* Meta */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.8125rem",
          color: "var(--text-muted)",
          letterSpacing: "0.04em",
        }}
      >
        {event.date} · {event.mode}
      </p>

      {/* Description */}
      <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.6, flexGrow: 1 }}>
        {event.desc}
      </p>

      {/* Seats progress */}
      <div>
        <div
          style={{ height: "3px", background: "var(--surface-2)", borderRadius: "2px", overflow: "hidden" }}
          role="progressbar"
          aria-valuenow={event.seatsTaken}
          aria-valuemax={event.seatsTotal}
          aria-label={`${seatsLeft} seats remaining`}
        >
          <div
            style={{
              height: "100%",
              width: `${seatsPercent}%`,
              background: isLow ? "var(--warning)" : "var(--accent)",
              borderRadius: "2px",
            }}
          />
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", paddingTop: "4px", borderTop: "1px solid var(--border)" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8125rem",
            color: "var(--accent)",
            letterSpacing: "0.04em",
          }}
        >
          {event.reward}
        </span>
        <a
          href={event.formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ fontSize: "0.875rem", padding: "8px 16px" }}
          aria-label={`Register for ${event.title}`}
        >
          Register →
        </a>
      </div>
    </motion.article>
  );
}

export function Events() {
  return (
    <section id="events" className="section" aria-labelledby="events-heading">
      <div className="container">
        {/* Upcoming */}
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
        >
          Upcoming
        </motion.span>
        <motion.h2
          id="events-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          style={{ marginBottom: "40px" }}
        >
          Events
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            marginBottom: "64px",
          }}
        >
          {upcomingEvents.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>

        <hr className="divider" style={{ marginBottom: "48px" }} />

        {/* Past Events */}
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8125rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: "24px",
          }}
        >
          Past Events
        </motion.h3>

        <ol
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
          aria-label="Past events list"
        >
          {pastEvents.map((event, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "16px",
                padding: "14px 0",
                borderBottom: "1px solid var(--border)",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  minWidth: "80px",
                  letterSpacing: "0.04em",
                }}
              >
                {event.date}
              </span>
              <span style={{ fontWeight: 500, color: "var(--text)", flexShrink: 0 }}>
                {event.title}
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.9375rem", fontFamily: "var(--font-body)" }}>
                {event.result}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
