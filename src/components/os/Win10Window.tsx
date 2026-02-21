import React, { useState, useEffect, useRef } from 'react';
import { WindowData } from '@/types';

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
return (
    <div onClick={onFocus} className={`absolute flex flex-col bg-white overflow-hidden shadow-2xl rounded-xl resize border transition-shadow ${isFocused ? 'border-indigo-500/50 shadow-indigo-900/20' : 'border-gray-300 shadow-gray-900/20'}`}
         style={{ left: pos.x, top: pos.y, width: win.width, height: win.height, zIndex: win.zIndex }}>
      
      {/* VaradOS Custom Title Bar */}
      <div onMouseDown={handleMouseDown} className={`flex justify-between items-center h-10 select-none cursor-default ${isFocused ? 'bg-[#f8f9fa]' : 'bg-[#ffffff]'}`}>
        
        {/* App Title (Left) */}
        <div className="flex items-center gap-2 pl-4 pointer-events-none">
          {win.icon.startsWith('http') ? (
            <img src={win.icon} alt="icon" className="w-4 h-4 object-contain" />
          ) : (
            <span className="text-md">{win.icon}</span>
          )}
          <span className="text-xs font-semibold text-gray-700">{win.title}</span>
        </div>

        {/* Mac/Linux Style Traffic Light Buttons (Right) */}
        <div className="flex items-center gap-2 pr-4">
          <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="w-3.5 h-3.5 bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 rounded-full flex items-center justify-center group shadow-sm">
            <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-black/60">−</span>
          </button>
          <button className="w-3.5 h-3.5 bg-[#27c93f] hover:bg-[#27c93f]/80 rounded-full flex items-center justify-center group shadow-sm">
            <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-black/60">↗</span>
          </button>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-3.5 h-3.5 bg-[#ff5f56] hover:bg-[#ff5f56]/80 rounded-full flex items-center justify-center group shadow-sm">
            <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-black/60">✕</span>
          </button>
        </div>

      </div>
      
      {/* App Content */}
      <div className="flex-1 overflow-auto bg-gray-50 border-t border-gray-200 relative">
        {win.content}
      </div>
    </div>
  )}