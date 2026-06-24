import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PanInfo } from 'framer-motion';

interface LegalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function LegalDrawer({ isOpen, onClose, children }: LegalDrawerProps) {
  // High-end spring physics for natural, physical movement
  const springTransition = {
    type: "spring" as const,
    stiffness: 350,
    damping: 35,
    mass: 1,
  };

  // Handle drag to dismiss
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    const velocity = info.velocity.y;
    
    // Dismiss if dragged past threshold or flicked down quickly
    if (info.offset.y > threshold || velocity > 400) {
      onClose();
    }
  };

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end items-center sm:px-4 sm:pb-4">
          {/* High-end Frosted Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Drawer Sheet */}
          <motion.div
            className="relative w-full max-w-3xl mx-auto bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.1)] ring-1 ring-black/5 flex flex-col overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 2rem)' }}
            initial={{ y: '100%', scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: '100%', scale: 0.95, opacity: 0 }}
            transition={springTransition}
            drag="y"
            dragDirectionLock
            onDragEnd={handleDragEnd}
            dragElastic={{ top: 0, bottom: 0.5 }}
            dragConstraints={{ top: 0, bottom: 0 }}
          >
            {/* Minimalist Drag Handle & Header */}
            <div className="w-full flex justify-center p-5 cursor-grab active:cursor-grabbing shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100/50">
              <div className="w-12 h-1.5 bg-gray-200 hover:bg-gray-300 transition-colors rounded-full" />
              <button 
                onClick={onClose}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 p-2.5 rounded-full transition-all active:scale-95"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-8 md:p-10 scrollbar-hide">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
