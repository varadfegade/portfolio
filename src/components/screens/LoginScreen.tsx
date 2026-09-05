import React, { useState, useEffect } from 'react';
import { RESUME_DATA } from '@/data/resumeData';
import { Wifi, Accessibility, Power, ArrowRight, MonitorSmartphone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginScreen({ onLogin, onModern }: { onLogin: () => void, onModern: () => void }) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [showLogin, setShowLogin] = useState(false); // Controls the transition from Lock Screen to Login Screen

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-between relative text-white overflow-hidden font-sans select-none bg-black"
      onClick={() => setShowLogin(true)} // Clicking anywhere reveals the login prompt
    >
      {/* Hyper-realistic Slow Parallax Background */}
      <motion.div
        animate={{ scale: showLogin ? 1.05 : 1, filter: showLogin ? 'blur(10px) brightness(0.6)' : 'blur(0px) brightness(1)' }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 bg-cover bg-center origin-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2560&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
      </motion.div>

      {/* Top Section: Lock Screen Time and Date */}
      <div className={`z-10 flex flex-col items-center mt-32 transition-all duration-700 ease-in-out ${showLogin ? '-translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <h1 className="text-8xl font-medium tracking-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">{time}</h1>
        <p className="text-2xl font-medium mt-4 drop-shadow-md">{date}</p>
      </div>

      {/* Middle Section: User Login */}
      <div className={`z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-700 delay-100 ease-in-out w-full max-w-sm ${showLogin ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'}`}>

        {/* Animated User Avatar with Glow */}
        <div className="relative mb-6">
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-2 rounded-full border border-white/20 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-md pointer-events-none"
          ></motion.div>

          <div className="relative w-40 h-40 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.5)] border shadow-black/50 border-white/10 bg-gradient-to-b from-white/20 to-transparent p-1 transition-transform hover:scale-105 duration-300">
            <img
              src="/images/userAsset/UserImage.png"
              alt="Varad Fegade"
              className="w-full h-full rounded-full object-cover object-top inner-shadow"
            />
            {/* Glossy specular highlight */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent opacity-40 pointer-events-none mix-blend-overlay"></div>
          </div>
        </div>

        <h2 className="text-3xl font-semibold mb-8 drop-shadow-lg tracking-wide">{RESUME_DATA.name}</h2>

        {/* Tactile 3D Login Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onLogin(); }}
          className="w-56 py-3 bg-white/10 hover:bg-white/20 border border-t-white/30 border-b-black/30 border-x-white/10 rounded-xl backdrop-blur-xl transition-all font-medium text-lg shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] mb-8 flex items-center justify-center gap-3 group outline-none focus:ring-2 focus:ring-indigo-400 relative overflow-hidden"
        >
          {/* Specular highlight for button */}
          <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
          Sign In
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform opacity-80" />
        </button>

        {/* Modern UI Switcher */}
        <button
          onClick={(e) => { e.stopPropagation(); onModern(); }}
          className="text-gray-300 hover:text-white text-sm transition-colors flex items-center gap-2 font-medium px-5 py-2.5 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/10 shadow-sm"
        >
          <MonitorSmartphone size={16} /> Switch to Standard Web UI
        </button>
      </div>

      {/* Bottom Right System Icons inside Glossy Containers */}
      <div className="z-10 absolute bottom-8 right-8 flex gap-4 text-white/80">
        <div className="p-2.5 rounded-full bg-black/30 border border-t-white/20 border-white/5 backdrop-blur-md hover:bg-white/20 hover:text-white cursor-pointer transition-all shadow-lg hover:-translate-y-1" title="Network">
          <Wifi size={20} />
        </div>
        <div className="p-2.5 rounded-full bg-black/30 border border-t-white/20 border-white/5 backdrop-blur-md hover:bg-white/20 hover:text-white cursor-pointer transition-all shadow-lg hover:-translate-y-1" title="Accessibility">
          <Accessibility size={20} />
        </div>
        <div className="p-2.5 rounded-full bg-black/30 border border-t-white/20 border-white/5 backdrop-blur-md hover:red-500 hover:text-white hover:bg-red-500/80 cursor-pointer transition-all shadow-lg hover:-translate-y-1" title="Power">
          <Power size={20} />
        </div>
      </div>

      {/* "Click anywhere" hint text */}
      <div className={`absolute bottom-16 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-wider font-light animate-pulse transition-opacity duration-300 ${showLogin ? 'opacity-0' : 'opacity-100'}`}>
        Click anywhere to unlock
      </div>
    </div>
  );
}