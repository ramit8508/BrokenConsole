import { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor — Pikachu pixel-art cursor
 * Uses raw DOM transform via requestAnimationFrame for zero-lag tracking.
 * The "glow dot" follows the exact pointer; the Pikachu sprite is offset
 * slightly above the hot-spot so the tip of its feet is the click point.
 */
export function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isHovering, setIsHovering]       = useState(false);

  const spriteRef = useRef<HTMLDivElement>(null);
  const dotRef    = useRef<HTMLDivElement>(null);

  // Track raw mouse for the rAF loop
  const pos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    // Only enable on pointer-fine (mouse) devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setIsTouchDevice(false);

    // ── rAF loop: update transforms directly (bypasses React re-render) ──
    let frame: number;
    const tick = () => {
      const { x, y } = pos.current;
      if (spriteRef.current) {
        spriteRef.current.style.transform = `translate(${x - 20}px, ${y - 40}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    // ── Mouse tracking ────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    // ── Hover detection ───────────────────────────────────────────────────
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest?.('a, button, [role=button], input, textarea, select')) {
        setIsHovering(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest?.('a, button, [role=button], input, textarea, select')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Tiny accent dot at exact pointer position */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: isHovering ? '#facc15' : 'var(--accent)',
          borderRadius: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          mixBlendMode: 'difference',
          transition: 'background-color 0.1s ease, transform 0.05s ease',
        }}
      />

      {/* Pikachu sprite — offset so feet-tip = click point */}
      <div
        ref={spriteRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
        }}
      >
        <img
          src="/cursors/pikachu-cursor.png"
          alt=""
          draggable="false"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            imageRendering: 'pixelated',
            display: 'block',
            filter: isHovering
              ? 'drop-shadow(0 0 8px rgba(250,204,21,0.9)) brightness(1.15)'
              : 'drop-shadow(0 0 3px rgba(250,204,21,0.4))',
            transform: isHovering ? 'scale(1.15)' : 'scale(1)',
            transition: 'filter 0.12s ease, transform 0.12s ease',
          }}
        />
      </div>
    </>
  );
}
