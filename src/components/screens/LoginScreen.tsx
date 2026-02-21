import React, { useState, useEffect } from 'react';
import { RESUME_DATA } from '@/data/resumeData';

export default function LoginScreen({ onLogin, onModern }: { onLogin: () => void, onModern: () => void }) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [showLogin, setShowLogin] = useState(false); // Controls the transition from Lock Screen to Login Screen

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time without leading zero for hours (e.g., "9:41 AM")
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-between relative text-white overflow-hidden font-sans select-none"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?q=80&w=2072&auto=format&fit=crop")' }}
      onClick={() => setShowLogin(true)} // Clicking anywhere reveals the login prompt
    >
      {/* Dynamic Frosted Glass Overlay */}
      <div className={`absolute inset-0 transition-all duration-700 ease-in-out bg-black/30 ${showLogin ? 'backdrop-blur-2xl bg-black/50' : 'backdrop-blur-none'}`}></div>
      
      {/* Top Section: Lock Screen Time and Date */}
      <div className={`z-10 flex flex-col items-center mt-32 transition-all duration-700 ease-in-out ${showLogin ? '-translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <h1 className="text-8xl font-semibold tracking-tight drop-shadow-md">{time}</h1>
        <p className="text-2xl font-medium mt-4 drop-shadow-md">{date}</p>
      </div>

      {/* Middle Section: User Login (Smoothly scales and fades in) */}
      <div className={`z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-700 delay-100 ease-in-out w-full max-w-sm ${showLogin ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'}`}>
        
        {/* User Avatar */}
        <div className="relative mb-6 group">
          <img 
            src="https://api.dicebear.com/7.x/initials/svg?seed=VF&backgroundColor=0ea5e9" 
            alt="User" 
            className="w-40 h-40 rounded-full shadow-2xl border-4 border-white/10 group-hover:border-white/20 transition-colors"
          />
        </div>
        
        <h2 className="text-3xl font-semibold mb-8 drop-shadow-lg">{RESUME_DATA.name}</h2>
        
        {/* Windows 11 Style Login Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onLogin(); }} 
          className="w-48 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded backdrop-blur-md transition-all font-medium text-lg shadow-lg mb-10 flex items-center justify-center gap-2 group outline-none focus:ring-2 focus:ring-blue-400"
        >
          Sign In
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>

        {/* Modern UI Switcher */}
        <button 
          onClick={(e) => { e.stopPropagation(); onModern(); }} 
          className="text-gray-300 hover:text-white text-sm transition-colors flex items-center gap-2 font-medium px-4 py-2 rounded hover:bg-white/5"
        >
          <span>🌐</span> Switch to Modern UI Portfolio
        </button>
      </div>

      {/* Bottom Right System Icons (Network, Accessibility, Power) */}
      <div className="z-10 w-full flex justify-end p-8 gap-6 text-xl pb-10">
         <span className="hover:text-gray-300 cursor-pointer drop-shadow-md transition-colors" title="Network">📶</span>
         <span className="hover:text-gray-300 cursor-pointer drop-shadow-md transition-colors" title="Accessibility">♿</span>
         <span className="hover:text-gray-300 cursor-pointer drop-shadow-md transition-colors" title="Power">⏻</span>
      </div>
      
      {/* "Click anywhere" hint text (disappears on click) */}
      <div className={`absolute bottom-32 left-1/2 -translate-x-1/2 text-white/70 text-sm animate-pulse transition-opacity duration-300 ${showLogin ? 'opacity-0' : 'opacity-100'}`}>
        Click anywhere to unlock
      </div>
    </div>
  );
}