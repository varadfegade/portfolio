import React, { useState, useEffect } from 'react';
import { Terminal, Monitor, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GatewayScreen({ onSelectOS, onSelectModern }: { onSelectOS: () => void, onSelectModern: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div className="h-screen w-screen bg-[#07080C] text-[#EDE8DE] flex flex-col items-center justify-center font-mono overflow-hidden relative selection:bg-[#00E5FF] selection:text-black">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(#1A1E2E 1px, transparent 1px),
            linear-gradient(90deg, #1A1E2E 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#07080C_80%)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-4xl p-8 flex flex-col gap-12"
      >
        <div className="flex flex-col gap-2 items-center text-center">
          <div className="text-[#00E5FF] text-xs tracking-[0.3em] mb-4 uppercase flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#00E5FF]"></span>
            System Initialization
            <span className="w-8 h-[1px] bg-[#00E5FF]"></span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-2" style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
            SELECT <span className="font-semibold text-white">ENVIRONMENT</span>
          </h1>
          <p className="text-[#4A5068] text-sm tracking-widest uppercase">Choose your preferred experience protocol</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* OS Mode Button */}
          <button 
            onClick={onSelectOS}
            className="group relative flex flex-col p-8 border border-[#1A1E2E] bg-[#0D0F18] hover:bg-[#111420] hover:border-[#00E5FF] transition-all duration-300 text-left outline-none"
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="mb-6 flex justify-between items-start">
              <div className="p-3 bg-[#1A1E2E] text-[#00E5FF] group-hover:bg-[#00E5FF] group-hover:text-black transition-colors">
                <Terminal size={24} strokeWidth={1.5} />
              </div>
              <span className="text-xs text-[#4A5068] tracking-[0.2em] group-hover:text-[#00E5FF] transition-colors">SEQ_01</span>
            </div>
            
            <h2 className="text-2xl font-medium mb-3 text-white tracking-wide" style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
              Enter Interactive OS Mode
            </h2>
            <p className="text-[#4A5068] text-sm leading-relaxed mb-8 flex-grow">
              Full desktop environment simulation. Includes window management, file system, and immersive app-based portfolio exploration.
            </p>
            
            <div className="flex items-center gap-2 text-[#00E5FF] text-xs tracking-widest uppercase font-semibold">
              Boot Sequence <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Simple UI Mode Button */}
          <button 
            onClick={onSelectModern}
            className="group relative flex flex-col p-8 border border-[#1A1E2E] bg-[#0D0F18] hover:bg-[#111420] hover:border-[#FF3D5A] transition-all duration-300 text-left outline-none"
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF3D5A] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FF3D5A] opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="mb-6 flex justify-between items-start">
              <div className="p-3 bg-[#1A1E2E] text-[#FF3D5A] group-hover:bg-[#FF3D5A] group-hover:text-white transition-colors">
                <Monitor size={24} strokeWidth={1.5} />
              </div>
              <span className="text-xs text-[#4A5068] tracking-[0.2em] group-hover:text-[#FF3D5A] transition-colors">SEQ_02</span>
            </div>
            
            <h2 className="text-2xl font-medium mb-3 text-white tracking-wide" style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
              Enter Simple UI Portfolio
            </h2>
            <p className="text-[#4A5068] text-sm leading-relaxed mb-8 flex-grow">
              Streamlined, high-performance web layout. Focuses purely on data, architecture, and code without desktop metaphors.
            </p>
            
            <div className="flex items-center gap-2 text-[#FF3D5A] text-xs tracking-widest uppercase font-semibold">
              Initialize UI <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
        
        {/* Footer info */}
        <div className="mt-8 flex justify-between items-center text-[10px] text-[#4A5068] tracking-widest border-t border-[#1A1E2E] pt-6 uppercase">
          <div>Status: <span className="text-[#00E5FF]">Awaiting Input</span></div>
          <div>VF.DEV // KERNEL_v1.0</div>
        </div>
      </motion.div>
    </div>
  );
}
