import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 800);

    const duration = 1800;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(progressInterval);
        setTimeout(handleComplete, 300);
      }
    }, interval);

    return () => {
      clearTimeout(skipTimer);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = () => { if (showSkip) handleComplete(); };
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
    setTimeout(onComplete, 400);
  };

  return (
    <AnimatePresence>
      {!isCompleted && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--accent-2)] text-[var(--border)] overflow-hidden"
        >
          {/* Neobrutal pattern background */}
          <div 
            className="absolute inset-0 opacity-[0.2]" 
            style={{ 
              backgroundImage: `radial-gradient(var(--border) 2px, transparent 2px)`,
              backgroundSize: '24px 24px' 
            }} 
          />

          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl">
            
            {/* Neobrutal Logo Container */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="w-32 h-32 md:w-48 md:h-48 bg-white border-[6px] border-[var(--border)] shadow-[8px_8px_0px_var(--border)] overflow-hidden">
                <img
                  src="/logo.jpeg"
                  alt="Broken Console Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl md:text-6xl lg:text-8xl font-display tracking-tight mb-4"
              style={{
                textShadow: '4px 4px 0px var(--surface), 8px 8px 0px var(--border)'
              }}
            >
              BROKEN CONSOLE
            </motion.h1>

            {/* Subtitle Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="neo-badge bg-[var(--accent)] text-[var(--surface)] mb-12"
            >
              <span className="w-2 h-2 bg-white border-2 border-[var(--border)] animate-pulse" />
              SYSTEM INITIALIZING
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="w-full max-w-md px-6"
            >
              <div className="h-6 w-full bg-[var(--surface)] border-4 border-[var(--border)] shadow-[6px_6px_0px_var(--border)] p-1">
                <motion.div
                  className="h-full bg-[var(--accent-3)] border-r-4 border-[var(--border)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <div className="flex justify-between items-center mt-4 font-display text-sm md:text-base font-bold">
                <span>LOADING...</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Skip Indicator */}
          <AnimatePresence>
            {showSkip && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-8 font-display text-xs md:text-sm tracking-widest bg-[var(--border)] text-[var(--surface)] px-4 py-2"
              >
                PRESS ANY KEY
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
