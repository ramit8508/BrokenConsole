import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { upcomingEvents, pastEvents, type Event, type PastEvent } from "../data/events";

const TAG_LABELS: Record<Event["tag"], string> = {
  beginner:     "BEGINNER",
  intermediate: "INTERMEDIATE",
  open:         "OPEN",
};

// ── Upcoming Event Card ────────────────────────────────────────────────────
function EventCard({ event, index }: { event: Event; index: number }) {
  const seatsLeft    = event.seatsTotal - event.seatsTaken;
  const seatsPercent = (event.seatsTaken / event.seatsTotal) * 100;
  const isLow        = seatsPercent > 85;

  return (
    <motion.article
      className="neo-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.1 }}
      style={{ 
        padding: 0, 
        display: "flex", 
        flexDirection: "column", 
        overflow: "hidden",
        "--surface": "#1a242c",
        "--border": "#8cbdb9",
        "--text": "#f4f0e6",
        "--text-muted": "#a8c0cc",
        "--accent": "#9c1b1b",
        "--accent-2": "#d4af37",
        color: "var(--text)"
      } as React.CSSProperties}
      aria-label={`Event: ${event.title}`}
    >
      {/* Event banner image */}
      <div style={{ position: "relative", aspectRatio: "16/7", overflow: "hidden" }}>
        <img
          src={event.image}
          alt={`${event.title} banner`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            imageRendering: "pixelated",
            transition: "transform 0.4s ease",
          }}
          onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1.04)"; }}
          onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1)"; }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(7,7,10,0.85) 0%, transparent 60%)",
          }}
        />
        {/* Tag pill on image */}
        <span
          className="neo-badge"
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            background: "var(--accent)",
            color: "var(--surface)",
            borderColor: "var(--border)",
            fontFamily: "var(--font-norse)",
            letterSpacing: "0.1em",
          }}
        >
          {TAG_LABELS[event.tag]}
        </span>
        {/* Seats indicator on image */}
        <span
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            fontFamily: "var(--font-display)",
            fontSize: "0.55rem",
            color: "var(--border)",
            background: isLow ? "var(--accent-2)" : "var(--surface)",
            border: "3px solid var(--border)",
            padding: "4px 8px",
            boxShadow: "4px 4px 0px var(--border)",
            letterSpacing: "0.04em",
          }}
          aria-label={`${event.seatsTaken} of ${event.seatsTotal} seats taken`}
        >
          {event.seatsTaken}/{event.seatsTotal} SEATS
        </span>
      </div>

      {/* Card body */}
      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "12px", flexGrow: 1 }}>
        {/* Title */}
        <h3 style={{ fontFamily: "var(--font-norse)", fontSize: "1.8rem", lineHeight: "1.1", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em", color: "#e0e6ed" }}>
          {event.title}
        </h3>

        {/* Meta */}
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--text-muted)", margin: 0 }}>
          {event.date} · {event.mode}
        </p>

        {/* Description */}
        <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.6, flexGrow: 1, margin: 0 }}>
          {event.desc}
        </p>

        {/* Seats progress */}
        <div>
          <div
            style={{ height: "16px", background: "var(--surface)", border: "4px solid var(--border)", borderRadius: 0, overflow: "hidden", boxShadow: "4px 4px 0px var(--border)" }}
            role="progressbar"
            aria-valuenow={event.seatsTaken}
            aria-valuemax={event.seatsTotal}
            aria-label={`${seatsLeft} seats remaining`}
          >
            <div
              style={{
                height: "100%",
                width: `${seatsPercent}%`,
                background: isLow ? "var(--accent-2)" : "var(--accent)",
                borderRight: "4px solid var(--border)",
                transition: "width 0.6s ease",
              }}
            />
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            paddingTop: "12px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <span style={{ fontFamily: "var(--font-norse)", fontSize: "1.2rem", color: "var(--accent-2)", letterSpacing: "0.04em", fontWeight: 700 }}>
            {event.reward}
          </span>
          <a
            href={event.formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn-primary"
            style={{ fontSize: "1.1rem", padding: "8px 16px", fontFamily: "var(--font-norse)", letterSpacing: "0.1em", fontWeight: 700 }}
            aria-label={`Register for ${event.title}`}
          >
            REGISTER
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ── Past Event Row ─────────────────────────────────────────────────────────
function PastEventRow({ event, index }: { event: PastEvent; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      style={{ borderBottom: "4px solid var(--border)", marginBottom: "8px" }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "14px 0",
          background: "none",
          border: "none",
          color: "var(--text)",
          textAlign: "left",
          flexWrap: "wrap",
        }}
        aria-expanded={expanded}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--text-muted)", minWidth: "100px" }}>
          {event.date}
        </span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 400, color: "var(--text)", flexGrow: 1 }}>
          {event.title}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--text-muted)", flexShrink: 0 }}>
          {event.result}
        </span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--accent)", marginLeft: "8px" }}>
          {expanded ? "▲" : "▼"}
        </span>
      </button>

      {/* Expandable image */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingBottom: "16px" }}>
              <img
                src={event.image}
                alt={`${event.title} photo`}
                style={{
                  width: "100%",
                  maxHeight: "220px",
                  objectFit: "cover",
                  display: "block",
                  imageRendering: "pixelated",
                  border: "4px solid var(--border)",
                  boxShadow: "4px 4px 0px var(--border)",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

// ── Main Events Section ────────────────────────────────────────────────────
export function Events() {
  return (
    <section id="events" className="section" aria-labelledby="events-heading">
      <div className="container">
        <div className="flex flex-col items-center text-center mx-auto mb-16 max-w-3xl">
          <motion.h2
            id="events-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.35 }}
            className="mb-0"
          >
            UPCOMING EVENTS
          </motion.h2>
        </div>

        {/* Upcoming event cards */}
        <div
          className="flex flex-wrap justify-center gap-6 mb-16 mx-auto max-w-5xl"
        >
          {upcomingEvents.map((event, i) => (
            <div key={event.id} className="w-full md:w-[calc(50%-12px)] max-w-[450px]">
              <EventCard event={event} index={i} />
            </div>
          ))}
        </div>

        <hr className="divider" style={{ marginBottom: "48px" }} />

        <div className="flex flex-col items-center text-center mx-auto mb-12 max-w-3xl">
          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "16px",
            }}
          >
            Past Events
          </motion.h3>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--text-muted)", margin: 0 }}>
            Click an event to see its photo ↓
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <ol style={{ listStyle: "none", padding: 0, margin: 0 }} aria-label="Past events list">
            {pastEvents.map((event, i) => (
              <PastEventRow key={i} event={event} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
