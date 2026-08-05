import { motion } from "framer-motion";

const SOCIAL_LINKS = [
  { label: "Discord", href: "https://discord.gg/brokenconsole", desc: "Join our server" },
  { label: "Instagram", href: "https://instagram.com/brokenconsole", desc: "Follow updates" },
  { label: "GitHub", href: "https://github.com/brokenconsole", desc: "Our projects" },
];

export function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container">
        <hr className="divider" style={{ marginBottom: "64px" }} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
          }}
          className="contact-grid"
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
          >
            <span className="eyebrow">Get in touch</span>
            <h2 id="contact-heading" style={{ marginBottom: "16px" }}>
              Contact us
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "420px", marginBottom: "28px", lineHeight: 1.65 }}>
              Have a question, a project idea, or want to collaborate? Drop us
              an email — we read everything and reply within 48 hours.
            </p>
            <a
              href="mailto:hello@brokenconsole.dev"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1rem",
                letterSpacing: "0.04em",
                color: "var(--accent)",
                textDecoration: "none",
                borderBottom: "1px solid var(--accent)",
                paddingBottom: "2px",
                transition: "opacity 150ms ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              hello@brokenconsole.dev
            </a>
          </motion.div>

          {/* Right — social links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="eyebrow">Find us</span>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0" }}>
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px 0",
                      borderBottom: "1px solid var(--border)",
                      color: "var(--text)",
                      textDecoration: "none",
                      transition: "color 150ms ease",
                      gap: "16px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text)";
                    }}
                    aria-label={`${link.label} — ${link.desc}`}
                  >
                    <span style={{ fontWeight: 500, fontSize: "1.0625rem" }}>{link.label}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {link.desc} →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
