import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const CODE_STREAM = [
  "01 > boot_sequence --club=broken_console",
  "02 > init_render_pipeline --mode=neon",
  "03 > mount_assets /logo.jpeg",
  "04 > connect_events --status=online",
  "05 > load_modules [ui, gameplay, community]",
  "06 > sync_clock --fps=60",
  "07 INITIALIZING..."
];

const MISSION_BRIEFING = [
  { type: "OK", text: "connect.club()", color: "text-[var(--accent-3)]" },
  { type: "SYNC", text: 'load.logo("/logo.jpeg")', color: "text-[var(--accent)]" },
  { type: "RUN", text: "prepare.events()", color: "text-[var(--accent-2)]" },
  { type: "WARN", text: "skip unlocked", color: "text-[var(--accent-2)]" },
  { type: "OK", text: "broken console online", color: "text-[var(--accent-3)]" },
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 1500);

    const duration = 2500;
    const interval = 30;
    const steps = duration / interval;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(progressInterval);
        setTimeout(handleComplete, 400);
      }
    }, interval);

    return () => {
      clearTimeout(skipTimer);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { 
      if (showSkip || e.key === 'Escape') handleComplete(); 
    };
    const handleClick = () => { if (showSkip) handleComplete(); };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
    };
  }, [showSkip]);

  const handleComplete = () => {
    if (isCompleted) return;
    setIsCompleted(true);
    setTimeout(onComplete, 500);
  };

  const visibleCodeCount = Math.floor((progress / 100) * CODE_STREAM.length);
  const visibleConsoleCount = Math.floor((progress / 100) * MISSION_BRIEFING.length);

  return (
    <AnimatePresence>
      {!isCompleted && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(5px)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)] text-[var(--border)] font-mono overflow-hidden p-4 md:p-8"
        >
          {/* MAIN CONTAINER */}
          <div 
            className="w-full max-w-[1100px] flex flex-col md:flex-row bg-[var(--surface)] border-[4px] border-[var(--border)] shadow-[12px_12px_0px_var(--border)] relative z-10" 
            style={{ maxHeight: "calc(100vh - 4rem)" }}
          >
            
            {/* LEFT PANE */}
            <div className="flex-1 flex flex-col p-6 md:p-8 border-b-[4px] md:border-b-0 md:border-r-[4px] border-[var(--border)] bg-[var(--bg)]">
              
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="font-display text-[10px] tracking-[0.2em] mb-1">SYSTEM_BOOT</div>
                  <div className="text-[var(--accent)] text-sm animate-pulse font-bold tracking-wide">hacking terminal active</div>
                </div>
                <div className="border-[3px] border-[var(--border)] text-[var(--border)] px-3 py-1 text-[10px] tracking-widest bg-[var(--accent-2)] shadow-[4px_4px_0px_var(--border)]">
                  ONLINE
                </div>
              </div>

              {/* Sub-container */}
              <div className="flex-1 border-[4px] border-[var(--border)] bg-[var(--surface)] shadow-[6px_6px_0px_var(--border)] flex flex-col overflow-hidden min-h-[400px]">
                
                {/* Sub-header */}
                <div className="flex justify-between items-center px-5 py-3 border-b-[4px] border-[var(--border)] bg-[var(--border)] text-[var(--surface)] font-bold text-[10px]">
                  <span>root@broken-console:/boot</span>
                  <span>{Math.floor(progress)}%</span>
                </div>

                <div className="flex-1 p-5 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto">
                  
                  {/* CODE STREAM */}
                  <div className="flex flex-col gap-3 text-[11px] leading-relaxed font-bold">
                    <div className="text-[var(--border)] font-display mb-2 flex items-center gap-2 tracking-wider text-[10px]">
                      <div className="w-2 h-2 bg-[var(--accent-3)] border-[2px] border-[var(--border)] animate-pulse" />
                      CODE STREAM
                    </div>
                    {CODE_STREAM.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: i <= visibleCodeCount ? 1 : 0, x: i <= visibleCodeCount ? 0 : -5 }}
                        className={i === CODE_STREAM.length - 1 ? "text-[var(--accent)] mt-2 font-display text-[9px]" : "text-[var(--text-muted)]"}
                      >
                        {line}
                      </motion.div>
                    ))}
                  </div>

                  {/* CENTER CARD */}
                  <div className="border-[4px] border-[var(--border)] bg-[var(--bg)] p-5 flex flex-col items-center text-center h-full">
                    
                    {/* Logo Spinner */}
                    <div className="relative w-28 h-28 mb-5 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-[4px] border-[var(--surface)] shadow-[4px_4px_0px_var(--border)]" />
                      <div 
                        className="absolute inset-0 rounded-full border-[4px] border-transparent border-t-[var(--accent-3)] border-l-[var(--accent-2)]"
                        style={{ transform: `rotate(${progress * 3.6}deg)` }}
                      />
                      <div className="w-20 h-20 bg-[var(--surface)] overflow-hidden border-[4px] border-[var(--border)]">
                        <img src="/logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    
                    <div className="font-display text-[9px] tracking-[0.2em] mb-1">BROKEN CONSOLE</div>
                    <div className="text-[var(--text-muted)] font-bold text-xs mb-auto tracking-wide">Game Dev & Esports Club</div>

                    {/* Status Box */}
                    <div className="w-full border-[3px] border-[var(--border)] p-3 bg-[var(--surface)] text-[10px] font-bold mt-6 shadow-[4px_4px_0px_var(--border)]">
                      <div className="flex justify-between border-b-2 border-dashed border-[var(--border)] pb-2 mb-2">
                        <span className="text-[var(--text-muted)]">status</span>
                        <span className="text-[var(--accent-3)] uppercase">syncing</span>
                      </div>
                      <div className="flex justify-between border-b-2 border-dashed border-[var(--border)] pb-2 mb-2">
                        <span className="text-[var(--text-muted)]">modules</span>
                        <span className="text-[var(--border)]">ui / events / team</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">progress</span>
                        <span className="text-[var(--border)]">{Math.floor(progress)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PANE */}
            <div className="w-full md:w-[380px] p-6 md:p-8 flex flex-col gap-6 bg-[var(--bg)]">
              
              {/* MISSION BRIEFING */}
              <div className="neo-card bg-[var(--surface)] p-5 flex-1 max-h-[220px]">
                <div className="font-display mb-4 flex items-center gap-2 text-[11px] tracking-wider">
                  <div className="w-2 h-2 bg-[var(--accent)] border-[2px] border-[var(--border)]" />
                  MISSION BRIEFING
                </div>
                <div className="flex flex-col gap-4 text-[11px] font-bold">
                  {MISSION_BRIEFING.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: i <= visibleConsoleCount ? 1 : 0 }}
                      className="flex gap-3 border-b-2 border-dashed border-[var(--border)] pb-2"
                    >
                      <span className={`${item.color} font-display text-[9px] uppercase w-12`}>[{item.type}]</span>
                      <span className="text-[var(--text-muted)]">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* MISSION STATS */}
              <div className="neo-card bg-[var(--surface)] p-5">
                <div className="text-[var(--text-muted)] font-display text-[10px] tracking-[0.2em] mb-4">MISSION STATS</div>
                <div className="flex flex-col gap-3 text-[11px] font-bold">
                  <div className="flex justify-between items-center bg-[var(--bg)] p-2 border-[2px] border-[var(--border)] shadow-[2px_2px_0px_var(--border)]">
                    <span className="text-[var(--text-muted)]">Objective</span>
                    <span className="text-[var(--accent-3)]">Unlock the club</span>
                  </div>
                  <div className="flex justify-between items-center bg-[var(--bg)] p-2 border-[2px] border-[var(--border)] shadow-[2px_2px_0px_var(--border)]">
                    <span className="text-[var(--text-muted)]">Mode</span>
                    <span className="text-[var(--accent-2)]">Neon Arcade</span>
                  </div>
                  <div className="flex justify-between items-center bg-[var(--bg)] p-2 border-[2px] border-[var(--border)] shadow-[2px_2px_0px_var(--border)]">
                    <span className="text-[var(--text-muted)]">Signal</span>
                    <span className="text-[var(--accent)]">Stable</span>
                  </div>
                </div>
              </div>

              {/* BOTTOM PROGRESS */}
              <div className="mt-auto pt-4 border-t-[4px] border-[var(--border)]">
                <div className="flex justify-between text-[10px] font-bold mb-2">
                  <span className="tracking-[0.1em] font-display">SYSTEM BOOT</span>
                  <span>{Math.floor(progress)}%</span>
                </div>
                <div className="h-4 w-full bg-[var(--surface)] border-[3px] border-[var(--border)] shadow-[4px_4px_0px_var(--border)] p-[2px] mb-2">
                  <div 
                    className="h-full bg-[var(--accent)] border-r-[3px] border-[var(--border)]" 
                    style={{ width: `${progress}%` }} 
                  />
                </div>
                <div className="text-[var(--accent-3)] font-bold text-[9px] tracking-widest animate-pulse uppercase font-display">
                  Deploying experience...
                </div>
              </div>
            </div>

          </div>

          {/* CLICK TO SKIP CORNER OVERLAY */}
          <AnimatePresence>
            {showSkip && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-6 right-8 text-[10px] font-display tracking-[0.2em] text-[var(--border)] bg-[var(--accent-2)] px-4 py-2 border-[3px] border-[var(--border)] shadow-[4px_4px_0px_var(--border)] cursor-pointer hover:bg-[var(--accent-3)] transition-colors z-20"
                onClick={handleComplete}
              >
                SKIP [ESC]
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
