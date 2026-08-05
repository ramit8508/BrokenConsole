export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: "1px solid var(--border)",
        paddingBlock: "32px",
        marginBottom: "48px", // clear status bar height
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.06em",
            color: "var(--text-muted)",
          }}
        >
          © {year} BROKEN_CONSOLE · Build Games. Play Games. Break Limits.
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.04em",
            color: "var(--text-muted)",
          }}
        >
          Made by the club, for the club.
        </p>
      </div>
    </footer>
  );
}
