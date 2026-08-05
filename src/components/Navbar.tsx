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
          backgroundColor: scrolled ? "var(--surface)" : "var(--bg)",
          borderBottom: scrolled ? "4px solid var(--border)" : "4px solid transparent",
          transition: "background-color 200ms ease, border-color 200ms ease",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "80px" }}>
          {/* Logo + Wordmark */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              textDecoration: "none",
            }}
            aria-label="Broken Console — home"
          >
            <img
              src="/logo.jpeg"
              alt="Broken Console logo"
              style={{
                width: "48px",
                height: "48px",
                objectFit: "cover",
                border: "3px solid var(--border)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                color: "var(--text)",
                display: "flex",
                alignItems: "center",
                gap: "2px",
              }}
              className="hidden md:flex"
            >
              BROKEN_CONSOLE
            </span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <ul
              style={{ display: "flex", gap: "8px", listStyle: "none", margin: 0, padding: 0 }}
              className="hidden-mobile"
            >
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.75rem",
                      color: "var(--text)",
                      textDecoration: "none",
                      padding: "8px 16px",
                      border: "3px solid transparent",
                      transition: "all 150ms ease",
                      display: "block",
                      textTransform: "uppercase"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--accent-2)";
                      e.currentTarget.style.border = "3px solid var(--border)";
                      e.currentTarget.style.boxShadow = "4px 4px 0px var(--border)";
                      e.currentTarget.style.transform = "translate(-2px, -2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.border = "3px solid transparent";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "none";
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
              className="hidden-mobile"
              style={{ 
                fontSize: "0.75rem", 
                padding: "10px 24px", 
                marginLeft: "8px",
                backgroundColor: "var(--accent)",
                color: "var(--surface)",
                fontFamily: "var(--font-display)",
                textTransform: "uppercase",
                border: "3px solid var(--border)",
                boxShadow: "4px 4px 0px var(--border)",
                transition: "all 0.15s ease",
                textDecoration: "none",
                display: "inline-flex",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-2px, -2px)";
                e.currentTarget.style.boxShadow = "6px 6px 0px var(--border)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "4px 4px 0px var(--border)";
              }}
            >
              Register
            </a>

            {/* Hamburger */}
            <button
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              className="hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: "var(--surface)",
                border: "3px solid var(--border)",
                boxShadow: "4px 4px 0px var(--border)",
                width: "48px",
                height: "48px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
                padding: "0"
              }}
            >
              <span style={{ display: "block", width: "20px", height: "3px", backgroundColor: "var(--border)", transition: "all 0.3s", transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
              <span style={{ display: "block", width: "20px", height: "3px", backgroundColor: "var(--border)", transition: "all 0.3s", opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: "20px", height: "3px", backgroundColor: "var(--border)", transition: "all 0.3s", transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: "80px",
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "var(--bg)",
              zIndex: 40,
              display: "flex",
              flexDirection: "column",
              padding: "2rem",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.2rem",
                    color: "var(--text)",
                    textDecoration: "none",
                    padding: "1rem",
                    border: "4px solid var(--border)",
                    backgroundColor: "var(--surface)",
                    boxShadow: "6px 6px 0px var(--border)",
                    textTransform: "uppercase",
                    textAlign: "center"
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#events"
                onClick={(e) => { e.preventDefault(); handleNavClick("#events"); }}
                style={{
                  marginTop: "1rem",
                  fontFamily: "var(--font-display)",
                  fontSize: "1.2rem",
                  color: "var(--surface)",
                  backgroundColor: "var(--accent)",
                  textDecoration: "none",
                  padding: "1rem",
                  border: "4px solid var(--border)",
                  boxShadow: "6px 6px 0px var(--border)",
                  textTransform: "uppercase",
                  textAlign: "center"
                }}
              >
                Register Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 860px) {
          .hamburger { display: none !important; }
        }
        @media (max-width: 859px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
