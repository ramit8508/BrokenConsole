import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('');
  const [showSkip, setShowSkip] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const bootLines = [
    '> boot_sequence --club=broken_console',
    '> init_render_pipeline --mode=neon',
    '> mount_assets /logo.jpeg',
    '> connect_events --status=online',
    '> load_modules [ui, gameplay, community]',
    '> sync_clock --fps=60',
  ];

  useEffect(() => {
    // Show skip button after 1s
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 1000);

    // Typing effect
    const messages = ['INITIALIZING...', 'BREAKING LIMITS...', 'BROKEN CONSOLE ONLINE'];
    let currentMessageIndex = 0;
    let charIndex = 0;
    
    let currentMessage = messages[currentMessageIndex];
    let typeTimeout: ReturnType<typeof setTimeout>;

    const typeWriter = () => {
      if (charIndex < currentMessage.length) {
        setText(currentMessage.slice(0, charIndex + 1));
        charIndex++;
        typeTimeout = setTimeout(typeWriter, 50);
      } else {
        typeTimeout = setTimeout(() => {
          if (currentMessageIndex < messages.length - 1) {
            currentMessageIndex++;
            currentMessage = messages[currentMessageIndex];
            charIndex = 0;
            typeWriter();
          }
        }, 800); // Wait before next message
      }
    };

    typeWriter();

    // Progress bar
    const duration = 2500;
    const interval = 25;
    const steps = duration / interval;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(progressInterval);
        setTimeout(handleComplete, 600); // Wait a bit after 100% before firing complete
      }
    }, interval);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(typeTimeout);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showSkip) {
        handleComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSkip]);

  const handleComplete = () => {
    if (isCompleted) return;
    setIsCompleted(true);
    setTimeout(onComplete, 500); // Allow fade out animation
  };

  return (
    <AnimatePresence>
      {!isCompleted && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] overflow-hidden font-mono"
          style={{ backgroundColor: 'var(--bg, #050507)', color: 'var(--text, #eeeef0)' }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at top, rgba(139,92,246,0.12), transparent 35%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent 45%)',
            }}
          />

          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(rgba(139,92,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.08) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />

          <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6 sm:px-6">
            <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#08080d]/95 shadow-[0_0_80px_rgba(0,0,0,0.65)] backdrop-blur-xl">
              <div className="grid min-h-[70vh] lg:grid-cols-[1.35fr_0.9fr]">
                <div className="relative border-b border-white/10 p-5 sm:p-8 lg:border-b-0 lg:border-r">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted,#7a7a8c)]">system_boot</div>
                      <div className="mt-1 text-sm text-[var(--accent,#8b5cf6)]">hacking terminal active</div>
                    </div>
                    <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-300">
                      online
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-emerald-400/15 bg-[#05070a]">
                    <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 text-xs text-emerald-300/80">
                      <span>root@broken-console:/boot</span>
                      <span>{Math.round(progress)}%</span>
                    </div>

                    <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1fr_auto] lg:items-stretch">
                      <div className="min-h-[320px] rounded-xl border border-emerald-500/10 bg-black/60 p-4 font-mono text-[13px] leading-6 text-emerald-200/90 sm:text-sm">
                        <div className="mb-4 flex items-center gap-2 text-emerald-400">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                          <span className="tracking-[0.22em] uppercase">code stream</span>
                        </div>

                        {bootLines.map((line, index) => (
                          <motion.div
                            key={line}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 + index * 0.15, duration: 0.35 }}
                            className="mb-2 flex gap-3"
                          >
                            <span className="w-6 shrink-0 text-right text-emerald-500/60">{String(index + 1).padStart(2, '0')}</span>
                            <span className="break-all text-emerald-100">{line}</span>
                          </motion.div>
                        ))}

                        <div className="mt-6 flex gap-3">
                          <span className="w-6 shrink-0 text-right text-emerald-500/60">{String(bootLines.length + 1).padStart(2, '0')}</span>
                          <div className="flex items-center gap-1 text-emerald-300">
                            <span>{text}</span>
                            <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
                              _
                            </motion.span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-between rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(139,92,246,0.12),rgba(6,182,212,0.08))] p-5 text-center lg:w-64">
                        <motion.img
                          src="/logo.jpeg"
                          alt="Broken Console Logo"
                          className="h-32 w-32 rounded-full object-contain"
                          style={{ filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.55))' }}
                          animate={{
                            scale: [1, 1.04, 1],
                            rotate: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2.8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />

                        <div className="mt-5 w-full">
                          <div className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted,#7a7a8c)]">Broken Console</div>
                          <div className="mt-2 text-sm text-white/80">Game Dev & Esports Club</div>
                        </div>

                        <div className="mt-6 w-full rounded-xl border border-white/10 bg-black/35 p-3 text-left text-xs text-emerald-200/80">
                          <div className="mb-2 flex justify-between">
                            <span>status</span>
                            <span className="text-emerald-300">syncing</span>
                          </div>
                          <div className="mb-2 flex justify-between">
                            <span>modules</span>
                            <span>ui / events / team</span>
                          </div>
                          <div className="flex justify-between">
                            <span>progress</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                        </div>

                        <div className="mt-6 w-full">
                          <div className="mb-2 flex justify-between text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted,#7a7a8c)]">
                            <span>boot</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-white/8">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-[var(--accent,#8b5cf6)]"
                              initial={{ width: '0%' }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.1 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col justify-between p-5 sm:p-8">
                  <div className="grid gap-4">
                    <div className="rounded-2xl border border-emerald-400/15 bg-black/35 p-4 text-xs text-emerald-200/80">
                      <div className="mb-3 flex items-center gap-2 text-emerald-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span className="tracking-[0.22em] uppercase">live console</span>
                      </div>
                      <div className="space-y-2 font-mono leading-6">
                        <div><span className="text-emerald-400">[OK]</span> connect.club()</div>
                        <div><span className="text-cyan-300">[SYNC]</span> load.logo("/logo.jpeg")</div>
                        <div><span className="text-violet-300">[RUN]</span> prepare.events()</div>
                        <div><span className="text-amber-300">[WARN]</span> skip button enabled</div>
                        <div><span className="text-emerald-400">[OK]</span> broken console online</div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted,#7a7a8c)]">sequence</div>
                      <div className="mt-3 space-y-3 text-sm text-white/80">
                        <div className="flex justify-between gap-4"><span>auth</span><span className="text-emerald-300">passed</span></div>
                        <div className="flex justify-between gap-4"><span>assets</span><span className="text-emerald-300">loaded</span></div>
                        <div className="flex justify-between gap-4"><span>scene</span><span className="text-emerald-300">ready</span></div>
                        <div className="flex justify-between gap-4"><span>launch</span><span className="text-emerald-300">pending</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="w-full mb-2 flex justify-between text-xs tracking-widest" style={{ color: 'var(--text-muted, #7a7a8c)' }}>
                      <span>SYSTEM_BOOT</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--surface, #0e0e14)' }}>
                      <motion.div
                        className="h-full rounded-full relative"
                        style={{ backgroundColor: 'var(--accent, #8b5cf6)' }}
                        initial={{ width: '0%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      >
                        <motion.div
                          className="absolute top-0 right-0 bottom-0 w-8"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4))',
                            filter: 'blur(2px)'
                          }}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showSkip && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onClick={handleComplete}
                className="absolute bottom-10 right-10 px-4 py-2 text-xs tracking-widest rounded transition-all hover:bg-white/5 active:scale-95"
                style={{ 
                  color: 'var(--text-muted, #7a7a8c)',
                  border: '1px solid var(--border, #1e1e2e)',
                  backgroundColor: 'var(--surface, #0e0e14)'
                }}
              >
                SKIP [ESC]
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
