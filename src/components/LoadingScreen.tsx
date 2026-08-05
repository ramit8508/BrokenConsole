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

  const missionStats = [
    { label: 'Objective', value: 'Unlock the club experience' },
    { label: 'Mode', value: 'Neon Arcade' },
    { label: 'Signal', value: 'Stable' },
  ];

  useEffect(() => {
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 1000);

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
        }, 800);
      }
    };

    typeWriter();

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
        setTimeout(handleComplete, 600);
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
    setTimeout(onComplete, 500);
  };

  const progressPercent = Math.round(progress);
  const ringRadius = 55;
  const ringCircumference = 2 * Math.PI * ringRadius;

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
                'radial-gradient(circle at top left, rgba(6,182,212,0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(139,92,246,0.18), transparent 35%), linear-gradient(180deg, rgba(255,255,255,0.03), transparent 45%)',
            }}
          />

          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            style={{
              backgroundImage:
                'linear-gradient(rgba(139,92,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.08) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />

          <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6 sm:px-6">
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-[#07070c]/95 shadow-[0_0_100px_rgba(0,0,0,0.7)] backdrop-blur-xl"
            >
              <div className="grid min-h-[74vh] lg:grid-cols-[1.2fr_0.95fr]">
                <div className="relative border-b border-white/10 p-5 sm:p-8 lg:border-b-0 lg:border-r">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.34em] text-[var(--text-muted,#7a7a8c)]">system_boot</div>
                      <div className="mt-2 text-lg font-semibold text-[var(--accent,#8b5cf6)]">hacking terminal active</div>
                    </div>
                    <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-emerald-300">
                      online
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[22px] border border-emerald-400/15 bg-[#040509] shadow-[inset_0_0_30px_rgba(6,182,212,0.08)]">
                    <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 text-[11px] text-emerald-300/80">
                      <span>root@broken-console:/boot</span>
                      <span>{progressPercent}%</span>
                    </div>

                    <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1fr_auto] lg:items-stretch">
                      <div className="min-h-[330px] rounded-[16px] border border-emerald-500/10 bg-black/60 p-4 font-mono text-[13px] leading-6 text-emerald-200/90 sm:text-sm">
                        <div className="mb-4 flex items-center gap-2 text-emerald-400">
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.85)]" />
                          <span className="tracking-[0.24em] uppercase">code stream</span>
                        </div>

                        {bootLines.map((line, index) => (
                          <motion.div
                            key={line}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.18 + index * 0.13, duration: 0.35 }}
                            className="mb-2 flex gap-3"
                          >
                            <span className="w-6 shrink-0 text-right text-emerald-500/60">{String(index + 1).padStart(2, '0')}</span>
                            <span className="break-all text-emerald-50">{line}</span>
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

                      <div className="flex flex-col items-center justify-between rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(139,92,246,0.16),rgba(6,182,212,0.08))] p-5 text-center lg:w-64">
                        <div className="relative flex h-36 w-36 items-center justify-center">
                          <motion.div
                            className="absolute inset-0 rounded-full border border-white/10"
                            animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2.2, repeat: Infinity }}
                          />
                          <motion.div
                            className="absolute inset-2 rounded-full border border-cyan-400/30"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                          />
                          <svg viewBox="0 0 140 140" className="h-32 w-32 -rotate-90">
                            <circle cx="70" cy="70" r={ringRadius} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="8" />
                            <motion.circle
                              cx="70"
                              cy="70"
                              r={ringRadius}
                              fill="none"
                              stroke="url(#ringGradient)"
                              strokeWidth="8"
                              strokeLinecap="round"
                              strokeDasharray={ringCircumference}
                              initial={{ strokeDashoffset: ringCircumference }}
                              animate={{ strokeDashoffset: ringCircumference - (ringCircumference * progress) / 100 }}
                              transition={{ duration: 0.12 }}
                            />
                            <defs>
                              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#22d3ee" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                              </linearGradient>
                            </defs>
                          </svg>

                          <motion.img
                            src="/logo.jpeg"
                            alt="Broken Console Logo"
                            className="absolute h-20 w-20 rounded-full object-contain"
                            style={{ filter: 'drop-shadow(0 0 24px rgba(139,92,246,0.55))' }}
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
                        </div>

                        <div className="mt-5 w-full">
                          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted,#7a7a8c)]">Broken Console</div>
                          <div className="mt-2 text-sm text-white/80">Game Dev & Esports Club</div>
                        </div>

                        <div className="mt-6 w-full rounded-[16px] border border-white/10 bg-black/35 p-3 text-left text-xs text-emerald-200/80">
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
                            <span>{progressPercent}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col justify-between p-5 sm:p-8">
                  <div className="grid gap-4">
                    <div className="rounded-[22px] border border-emerald-400/15 bg-black/35 p-4 text-xs text-emerald-200/80">
                      <div className="mb-3 flex items-center gap-2 text-emerald-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span className="tracking-[0.22em] uppercase">mission briefing</span>
                      </div>
                      <div className="space-y-2 font-mono leading-6">
                        <div><span className="text-emerald-400">[OK]</span> connect.club()</div>
                        <div><span className="text-cyan-300">[SYNC]</span> load.logo("/logo.jpeg")</div>
                        <div><span className="text-violet-300">[RUN]</span> prepare.events()</div>
                        <div><span className="text-amber-300">[WARN]</span> skip unlocked</div>
                        <div><span className="text-emerald-400">[OK]</span> broken console online</div>
                      </div>
                    </div>

                    <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                      <div className="text-[10px] uppercase tracking-[0.26em] text-[var(--text-muted,#7a7a8c)]">mission stats</div>
                      <div className="mt-3 space-y-3 text-sm text-white/80">
                        {missionStats.map((stat) => (
                          <div key={stat.label} className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-black/20 px-3 py-2">
                            <span>{stat.label}</span>
                            <span className="text-emerald-300">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[20px] border border-white/10 bg-black/30 p-4">
                    <div className="mb-2 flex justify-between text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted, #7a7a8c)' }}>
                      <span>system boot</span>
                      <span>{progressPercent}%</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/8">
                      <motion.div
                        className="relative h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #22d3ee, #8b5cf6 70%, #a78bfa)' }}
                        initial={{ width: '0%' }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.12 }}
                      >
                        <motion.div
                          className="absolute top-0 right-0 bottom-0 w-8"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45))',
                            filter: 'blur(2px)',
                          }}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </motion.div>
                    </div>
                    <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-emerald-300/80">
                      deploying experience...
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <AnimatePresence>
            {showSkip && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onClick={handleComplete}
                className="absolute bottom-10 right-10 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-[11px] uppercase tracking-[0.26em] text-white/70 transition-all hover:bg-white/10 hover:text-white active:scale-95"
              >
                Skip [Esc]
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
