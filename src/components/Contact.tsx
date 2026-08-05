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

        <div className="flex flex-col items-center text-center mx-auto mb-16 max-w-3xl">
          <motion.span
            className="eyebrow mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
          >
            Get in touch
          </motion.span>
          <motion.h2
            id="contact-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            Contact us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-body font-bold text-lg text-[var(--text-muted)] max-w-xl mb-12"
          >
            Have a question, a project idea, or want to collaborate? Drop us
            an email — we read everything and reply within 48 hours.
          </motion.p>
          <motion.a
            href="mailto:hello@brokenconsole.dev"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="neo-btn-primary"
            style={{ fontSize: "1.2rem", padding: "16px 32px", textTransform: "none" }}
          >
            hello@brokenconsole.dev
          </motion.a>
        </div>

        <div className="max-w-2xl mx-auto neo-card mt-16 p-0 overflow-hidden">
          <div className="bg-[var(--border)] text-[var(--surface)] font-display p-4 text-center">
            Find us elsewhere
          </div>
          <ul className="flex flex-col m-0 p-0 list-none">
            {SOCIAL_LINKS.map((link, idx) => (
              <li key={link.label} className={idx !== SOCIAL_LINKS.length - 1 ? "border-b-4 border-[var(--border)]" : ""}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center p-6 text-[var(--text)] font-bold font-body text-xl hover:bg-[var(--accent-2)] transition-colors"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-sm tracking-widest uppercase">
                    {link.desc} →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
