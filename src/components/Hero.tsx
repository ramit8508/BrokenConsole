import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { upcomingEvents } from "../data/events";

function useCountdown(targetDate: string) {
  const getTimeLeft = () => {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    const s = Math.floor(diff / 1000);
    return {
      d: Math.floor(s / 86400),
      h: Math.floor((s % 86400) / 3600),
      m: Math.floor((s % 3600) / 60),
      s: s % 60,
    };
  };
  const [time, setTime] = useState(getTimeLeft);
  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  });
  return time;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function parseEventDate(dateStr: string): string {
  const cleaned = dateStr.replace(/–\d+/, "");
  return cleaned;
}

function NextEventPanel() {
  const next = upcomingEvents[0];
  const time = useCountdown(parseEventDate(next.date));

  const seatsPercent = (next.seatsTaken / next.seatsTotal) * 100;
  const isLow = seatsPercent > 85;

  return (
    <div
      style={{
        background: "rgba(22, 22, 31, 0.6)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
      aria-label="Next upcoming event details"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow" style={{ marginBottom: 0, fontSize: "0.7rem" }}>Next Event</span>
        <span
          className="pill"
          style={{
            color: isLow ? "var(--warning)" : "var(--text-muted)",
            borderColor: isLow ? "var(--warning)" : "var(--border)",
            fontSize: "0.7rem",
            padding: "2px 8px"
          }}
        >
          {next.seatsTaken}/{next.seatsTotal} seats
        </span>
      </div>

      <div>
        <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "4px", fontSize: "1.25rem" }}>{next.title}</h3>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            letterSpacing: "0.04em",
          }}
        >
          {next.date} · {next.mode}
        </p>
      </div>

      <div>
        <span className="eyebrow" style={{ marginBottom: "8px", fontSize: "0.7rem" }}>Starts in</span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "6px",
          }}
          aria-label="Countdown timer"
        >
          {[
            { label: "D", value: time.d },
            { label: "H", value: time.h },
            { label: "M", value: time.m },
            { label: "S", value: time.s },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                background: "rgba(14, 14, 20, 0.8)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "8px 4px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.125rem",
                  fontWeight: 500,
                  color: "var(--text)",
                  lineHeight: 1,
                }}
              >
                {pad(value)}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.5rem",
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                  marginTop: "4px",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <a
        href={next.formUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
        style={{ textAlign: "center", justifyContent: "center", padding: "8px 16px", fontSize: "0.875rem" }}
      >
        Register →
      </a>
    </div>
  );
}

function AnimatedCounter({ target, label, delay = 0 }: { target: number, label: string, delay?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;
    
    let startTime: number | null = null;
    const duration = 2000;

    const timeout = setTimeout(() => {
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(ease * (end - start) + start));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [target, delay]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", fontWeight: "bold", color: "var(--text)", lineHeight: 1 }}>
        {count}+
      </div>
      <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "8px" }}>
        {label}
      </div>
    </div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } }
};

export function Hero() {
  const tagline = "Build Games. Play Games. Break Limits.";
  
  return (
    <section
      id="home"
      aria-label="Hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "96px",
        paddingBottom: "64px",
        overflow: "hidden"
      }}
    >
      <div className="container" style={{ width: "100%", position: "relative", zIndex: 2 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {/* Logo */}
          <motion.div variants={itemVariants} style={{ marginBottom: "24px" }}>
            <img 
              src="/logo.jpeg" 
              alt="Broken Console Logo" 
              style={{
                width: "160px",
                maxWidth: "100%",
                borderRadius: "50%",
                filter: "drop-shadow(0 0 30px rgba(139,92,246,0.5))"
              }}
              className="hero-logo"
            />
          </motion.div>

          {/* Eyebrow */}
          <motion.div variants={itemVariants} style={{ marginBottom: "16px" }}>
            <span
              style={{
                fontFamily: "var(--font-hero)",
                fontSize: "0.875rem",
                letterSpacing: "0.1em",
                color: "var(--accent-2)",
                textTransform: "uppercase",
                background: "rgba(6, 182, 212, 0.1)",
                padding: "6px 12px",
                borderRadius: "100px",
                border: "1px solid rgba(6, 182, 212, 0.2)"
              }}
            >
              GAME DEV &amp; ESPORTS CLUB
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={itemVariants}
            style={{ 
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              lineHeight: 1.1,
              marginBottom: "24px",
              background: "linear-gradient(135deg, #eeeef0, #8b5cf6)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textTransform: "uppercase"
            }}
          >
            Broken<br />Console
          </motion.h1>

          {/* Tagline */}
          <motion.div variants={itemVariants} style={{ marginBottom: "40px", fontSize: "1.25rem", color: "var(--text-muted)", maxWidth: "600px", display: "inline-block" }}>
            {tagline.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.5 + index * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div variants={itemVariants} style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "64px" }}>
            <a
              href="#events"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn btn-primary"
              style={{ padding: "12px 32px", fontSize: "1.125rem", background: "var(--accent)", color: "#fff", border: "none" }}
            >
              View Events
            </a>
            <a
              href="#team"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("team")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn btn-outline"
              style={{ padding: "12px 32px", fontSize: "1.125rem" }}
            >
              Meet the Team
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "32px",
              width: "100%",
              maxWidth: "800px",
              padding: "32px",
              background: "rgba(22, 22, 31, 0.4)",
              border: "1px solid var(--border)",
              borderRadius: "24px",
              backdropFilter: "blur(12px)"
            }}
            className="stats-grid"
          >
            <AnimatedCounter target={120} label="Members" delay={0.8} />
            <AnimatedCounter target={30} label="Projects" delay={0.9} />
            <AnimatedCounter target={50} label="Events" delay={1.0} />
            <AnimatedCounter target={15} label="Awards" delay={1.1} />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Next Event Panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="next-event-floating"
      >
        <NextEventPanel />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        style={{
          position: "absolute",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 2,
        }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: [0.42, 0, 0.58, 1] as const }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </motion.div>

      <style>{`
        .next-event-floating {
          display: none;
        }
        @media (min-width: 1024px) {
          .next-event-floating {
            display: block;
            position: absolute;
            right: 48px;
            top: 50%;
            transform: translateY(-50%) !important;
            width: 320px;
            z-index: 10;
          }
          .hero-logo {
            width: 200px !important;
          }
        }
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
            padding: 24px !important;
          }
          .hero-logo {
            width: 140px !important;
          }
        }
      `}</style>
    </section>
  );
}
