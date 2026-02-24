import React, { useState, useEffect, useRef } from 'react';
import { WindowData } from '@/types';
import { motion } from 'framer-motion';

export default function Win10Window({ win, onClose, onMinimize, onFocus, isFocused }: { win: WindowData, onClose: () => void, onMinimize: () => void, onFocus: () => void, isFocused: boolean }) {
  const [pos, setPos] = useState({ x: win.x, y: win.y });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number, startY: number, initialX: number, initialY: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    setIsDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, initialX: pos.x, initialY: pos.y };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !dragRef.current) return;
    setPos({ x: dragRef.current.initialX + (e.clientX - dragRef.current.startX), y: dragRef.current.initialY + (e.clientY - dragRef.current.startY) });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const isStringIcon = typeof win.icon === 'string';
  const isImage = isStringIcon && ((win.icon as string).startsWith('http') || (win.icon as string).includes('/'));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.9, y: 5, filter: 'blur(8px)' }}
      transition={{ type: "spring", damping: 30, stiffness: 350, mass: 0.8 }}
      onClick={onFocus}
      className={`absolute flex flex-col bg-white/90 dark:bg-[#1e1e1e]/90 backdrop-blur-3xl overflow-hidden rounded-2xl border transition-shadow ${isFocused ? 'border-indigo-500/50 shadow-2xl shadow-indigo-900/30 z-[100]' : 'border-gray-300 dark:border-gray-700 shadow-xl shadow-black/20'}`}
      style={{ left: pos.x, top: pos.y, width: win.width, height: win.height, zIndex: win.zIndex }}
    >

      {/* Modern macOS/Windows Hybrid Title Bar */}
      <div onMouseDown={handleMouseDown} className={`flex justify-between items-center h-12 select-none z-10 ${isFocused ? 'bg-white/50 dark:bg-black/20' : 'bg-white/30 dark:bg-black/10'} backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50`}>

        {/* App Title (Left) */}
        <div className="flex items-center gap-3 pl-5 pointer-events-none">
          {isImage ? (
            <img src={win.icon as string} alt="icon" className="w-5 h-5 object-contain" />
          ) : isStringIcon ? (
            <span className="text-lg">{win.icon as string}</span>
          ) : (
            <div className="text-gray-700 dark:text-gray-300 w-5 h-5 flex items-center justify-center">
              {win.icon}
            </div>
          )}
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wide">{win.title}</span>
        </div>

        {/* Windows 11 Style Window Controls (Right) */}
        <div className="flex items-center h-full">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-[46px] h-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-gray-700 dark:text-gray-300"
            title="Minimize"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4.399V5.5H0V4.399h11z" fill="currentColor" />
            </svg>
          </button>

          <button
            className="w-[46px] h-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-gray-700 dark:text-gray-300"
            title="Maximize"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 0v11H0V0h11zM9.899 1.101H1.101v8.798h8.798V1.101z" fill="currentColor" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-[46px] h-full flex items-center justify-center hover:bg-[#e81123] hover:text-white transition-colors cursor-pointer text-gray-700 dark:text-gray-300 rounded-tr-2xl"
            title="Close"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.279 5.5L11 10.221l-.779.779L5.5 6.279.779 11 0 10.221 4.721 5.5 0 .779.779 0 5.5 4.721 10.221 0 11 .779 6.279 5.5z" fill="currentColor" />
            </svg>
          </button>
        </div>

      </div>

      {/* App Content */}
      <div className="flex-1 overflow-auto bg-gray-50/90 dark:bg-[#121212]/90 relative">
        {win.content}
      </div>
    </motion.div>
  );
}