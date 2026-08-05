import { useEffect, useRef } from "react";

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const spacing = 40; // Grid spacing for neobrutalist look
    const cols = Math.floor(width / spacing) + 2;
    const rows = Math.floor(height / spacing) + 2;

    const mouse = { x: -1000, y: -1000, radius: 150 };

    class Particle {
      x: number;
      y: number;
      ox: number;
      oy: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.ox = x;
        this.oy = y;
        // Randomly assign a neobrutalist accent color to some points
        const rand = Math.random();
        if (rand > 0.95) this.color = "#ff3b30";
        else if (rand > 0.9) this.color = "#32d74b";
        else if (rand > 0.85) this.color = "#ffd60a";
        else this.color = "#111111";
      }

      update() {
        const dx = mouse.x - this.ox;
        const dy = mouse.y - this.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repel from mouse
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x = this.ox - (dx / dist) * force * 40;
          this.y = this.oy - (dy / dist) * force * 40;
        } else {
          // Spring back to original position
          this.x += (this.ox - this.x) * 0.1;
          this.y += (this.oy - this.y) * 0.1;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        // Draw a stark square instead of a soft circle for neobrutalism
        ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
      }
    }

    // Initialize grid of particles
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        particles.push(new Particle(i * spacing - spacing/2, j * spacing - spacing/2));
      }
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => p.update());

      // Draw connections (wireframe mesh)
      ctx.beginPath();
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const idx = i * rows + j;
          const p = particles[idx];
          
          if (i < cols - 1) {
            const right = particles[(i + 1) * rows + j];
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(right.x, right.y);
          }
          if (j < rows - 1) {
            const bottom = particles[i * rows + (j + 1)];
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(bottom.x, bottom.y);
          }
        }
      }
      ctx.strokeStyle = "rgba(17, 17, 17, 0.15)"; // Stark but faint black lines
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw particle nodes on top
      particles.forEach(p => p.draw());

      animId = requestAnimationFrame(draw);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)",
        maskImage: "linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)"
      }}
    />
  );
}
