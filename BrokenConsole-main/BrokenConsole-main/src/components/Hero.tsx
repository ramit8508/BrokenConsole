import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CounterProps {
  target: number;
  label: string;
  delay?: number;
}

function Counter({ target, label, delay = 0 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 1200;
      const steps = 40;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const animate = () => {
        currentStep++;
        const progress = Math.min(currentStep / steps, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(target * easeOut));

        if (currentStep < steps) {
          setTimeout(animate, stepDuration);
        }
      };
      animate();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [target, delay]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl md:text-3xl font-display text-[var(--border)] tracking-tight">
        {count}+
      </div>
      <div className="text-xs md:text-sm font-body font-bold text-[var(--text-muted)] uppercase tracking-wider mt-2">
        {label}
      </div>
    </div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut" as const 
    } 
  }
};

export function Hero() {
  const tagline = "Build Games. Play Games. Break Limits.";

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden"
    >
      <div className="container relative z-10 mx-auto px-4">
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
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          {/* Logo Neobrutal */}
          <motion.div variants={itemVariants} className="mb-8">
            <img
              src="/logo.jpeg"
              alt="Broken Console Logo"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[6px] border-[var(--border)] shadow-[8px_8px_0px_var(--border)] object-cover bg-white p-1"
            />
          </motion.div>

          {/* Gamified Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="neo-badge">
              <div className="w-3 h-3 rounded-full bg-[var(--accent)] border-2 border-[var(--border)] animate-pulse" />
              OFFICIAL GAME DEV & ESPORTS CLUB
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display tracking-tight mb-8"
          >
            BROKEN CONSOLE
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-[var(--border)] font-body font-bold max-w-2xl mb-12"
          >
            {tagline}
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 mb-20">
            <a href="#events" className="neo-btn-primary gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5z" />
              </svg>
              EXPLORE EVENTS
            </a>
            <a href="#domains" className="neo-btn-secondary gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              OUR DOMAINS
            </a>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-3xl neo-card grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <Counter target={15} label="Events Hosted" delay={0.2} />
            <Counter target={500} label="Active Gamers" delay={0.4} />
            <Counter target={8} label="Tournaments" delay={0.6} />
            <Counter target={12} label="Projects Built" delay={0.8} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
