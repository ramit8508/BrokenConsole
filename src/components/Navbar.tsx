import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Domains", href: "#domains" },
  { label: "Events", href: "#events" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 860) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        role="banner"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: scrolled ? "rgba(5,5,7,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "background-color 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          {/* Logo + Wordmark */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
            aria-label="Broken Console — home"
          >
            <img
              src="/logo.jpeg"
              alt="Broken Console logo"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                objectFit: "cover",
                filter: "drop-shadow(0 0 8px rgba(139,92,246,0.3))",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
                letterSpacing: "0.08em",
                color: "var(--text)",
                display: "flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              BROKEN_CONSOLE<span className="cursor-blink" aria-hidden="true">_</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ul
              style={{ display: "flex", gap: "4px", listStyle: "none", margin: 0, padding: 0 }}
              className="hidden-mobile"
            >
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      transition: "color 150ms ease, background-color 150ms ease",
                      display: "block",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--text)";
                      e.currentTarget.style.backgroundColor = "rgba(139,92,246,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-muted)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#events"
              onClick={(e) => { e.preventDefault(); handleNavClick("#events"); }}
              className="btn btn-primary hidden-mobile"
              style={{ fontSize: "0.8125rem", padding: "8px 18px", marginLeft: "12px" }}
            >
              Register
            </a>

            {/* Hamburger */}
            <button
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
              className="show-mobile"
              style={{
                background: "none",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                cursor: "pointer",
                padding: "8px",
                color: "var(--text)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "5px",
                width: "40px",
                height: "40px",
                transition: "border-color 150ms ease",
              }}
            >
              <span style={{
                display: "block", height: "2px", background: "currentColor", borderRadius: "2px",
                transition: "transform 200ms ease, opacity 200ms ease",
                transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }} />
              <span style={{
                display: "block", height: "2px", background: "currentColor", borderRadius: "2px",
                transition: "opacity 200ms ease",
                opacity: mobileOpen ? 0 : 1,
              }} />
              <span style={{
                display: "block", height: "2px", background: "currentColor", borderRadius: "2px",
                transition: "transform 200ms ease, opacity 200ms ease",
                transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }} />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
            style={{
              position: "fixed",
              top: "72px",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 49,
              background: "rgba(5,5,7,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderTop: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              padding: "32px 24px",
              gap: "4px",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.25 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  textDecoration: "none",
                  padding: "16px 0",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {link.label}
                <span style={{ color: "var(--text-muted)", fontSize: "1rem" }}>→</span>
              </motion.a>
            ))}
            <motion.a
              href="#events"
              onClick={(e) => { e.preventDefault(); handleNavClick("#events"); }}
              className="btn btn-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.25 }}
              style={{ marginTop: "24px", justifyContent: "center", fontSize: "1rem", padding: "16px" }}
            >
              Register Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 860px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 859px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
    </>
  );
}
