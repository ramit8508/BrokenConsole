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

  useEffect(() => {
    // Check session storage
    if (sessionStorage.getItem('loadingScreenShown')) {
      onComplete();
      return;
    }

    // Show skip button after 1s
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 1000);

    // Typing effect
    const messages = ['INITIALIZING...', 'BROKEN CONSOLE ONLINE'];
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
    sessionStorage.setItem('loadingScreenShown', 'true');
    setIsCompleted(true);
    setTimeout(onComplete, 500); // Allow fade out animation
  };

  if (sessionStorage.getItem('loadingScreenShown') && !isCompleted) {
    return null; // Already completed in previous session
  }

  return (
    <AnimatePresence>
      {!isCompleted && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center font-mono"
          style={{ backgroundColor: 'var(--bg, #050507)', color: 'var(--text, #eeeef0)' }}
        >
          <div className="flex flex-col items-center w-full max-w-md px-6">
            <motion.img
              src="/logo.jpeg"
              alt="Broken Console Logo"
              className="w-32 h-32 mb-10 object-contain rounded-full"
              style={{ filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.5))' }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="h-6 mb-6 text-center text-lg font-bold tracking-wider" style={{ color: 'var(--accent, #8b5cf6)' }}>
              {text}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                _
              </motion.span>
            </div>

            <div className="w-full mb-2 flex justify-between text-xs tracking-widest" style={{ color: 'var(--text-muted, #7a7a8c)' }}>
              <span>SYSTEM_BOOT</span>
              <span>{Math.round(progress)}%</span>
            </div>

            <div 
              className="w-full h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: 'var(--surface, #0e0e14)' }}
            >
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
