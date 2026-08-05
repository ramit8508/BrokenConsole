import { useEffect, useRef } from "react";

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Non-null aliases after the guard
    const c = canvas;
    const g = ctx;

    let animationFrameId: number;
    const numParticles = 50;
    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    interface Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedY: number;
      angle: number;
      angleSpeed: number;
      vx: number;
      vy: number;
    }

    function createParticle(): Particle {
      return {
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        size: Math.random() * 2 + 2,
        color: Math.random() > 0.5 ? "rgba(139,92,246,0.4)" : "rgba(6,182,212,0.2)",
        speedY: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: Math.random() * 0.02 + 0.01,
        vx: 0,
        vy: 0,
      };
    }

    function updateParticle(p: Particle) {
      if (prefersReducedMotion) return;

      p.y -= p.speedY;
      p.angle += p.angleSpeed;
      p.x += Math.sin(p.angle) * 0.5;

      if (p.y < -10) {
        p.y = c.height + 10;
        p.x = Math.random() * c.width;
      }

      // Mouse interaction — push away
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 150;

      if (distance < maxDistance && distance > 0) {
        const force = (maxDistance - distance) / maxDistance;
        p.vx -= (dx / distance) * force * 0.5;
        p.vy -= (dy / distance) * force * 0.5;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.9;
      p.vy *= 0.9;
    }

    function drawParticle(p: Particle) {
      g.beginPath();
      g.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      g.fillStyle = p.color;
      g.fill();
    }

    let particles: Particle[] = [];

    function initParticles() {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(createParticle());
      }
    }

    function resize() {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      initParticles();
    }

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            g.beginPath();
            g.moveTo(particles[i].x, particles[i].y);
            g.lineTo(particles[j].x, particles[j].y);
            g.strokeStyle = "rgba(139,92,246,0.06)";
            g.lineWidth = 1;
            g.stroke();
          }
        }
      }
    }

    function animate() {
      g.clearRect(0, 0, c.width, c.height);

      for (const p of particles) {
        updateParticle(p);
        drawParticle(p);
      }

      drawLines();

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    }

    window.addEventListener("resize", resize);

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        background: "transparent",
      }}
    />
  );
}
