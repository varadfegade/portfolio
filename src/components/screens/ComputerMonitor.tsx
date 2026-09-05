"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  FolderGit2,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Wifi,
  Volume2,
  Code2,
  Search,
  CheckCircle2,
} from "lucide-react";

interface ComputerMonitorProps {
  onLaunchOS: () => void;
}

export default function ComputerMonitor({ onLaunchOS }: ComputerMonitorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="relative flex flex-col items-center select-none w-full max-w-[500px] mx-auto group cursor-pointer"
      onClick={onLaunchOS}
      role="button"
      tabIndex={0}
      aria-label="Click Here For OS Mode"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onLaunchOS();
        }
      }}
    >
      {/* ── 1. Realistic Ambient Studio Wall Backlight ── */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-[#4E45D5]/35 via-[#445D48]/30 to-[#D6CC99]/25 rounded-[3.5rem] blur-3xl opacity-45 group-hover:opacity-85 transition-opacity duration-700 pointer-events-none" />

      {/* ── 2. Outer Precision-Milled Aluminum Unibody Chassis (Space Gray / Matte Titanium) ── */}
      <motion.div
        whileHover={{ y: -5, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full aspect-[16/10] bg-gradient-to-b from-[#343e4f] via-[#1e2532] to-[#12161f] p-[6px] sm:p-[7px] rounded-[1.85rem] sm:rounded-[2.15rem] border border-white/25 shadow-[0_35px_80px_rgba(0,0,0,0.85),0_0_35px_rgba(78,69,213,0.22)] overflow-hidden flex flex-col justify-between"
      >
        {/* Diamond-Cut Chamfered Top Highlight Line */}
        <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-30" />

        {/* ── 3. Inner Flush Display Assembly (Slim Matte Black Bezel + Display Panel) ── */}
        <div className="relative w-full h-full bg-[#070b11] rounded-[1.5rem] sm:rounded-[1.75rem] overflow-hidden border border-black/90 flex flex-col justify-between shadow-inner">
          {/* Top Bezel: Micro Camera Housing + Microphone Pinhole + Green LED */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 pointer-events-none bg-black/75 backdrop-blur-md px-3 py-0.5 rounded-full border border-white/15 shadow-md">
            {/* Mic pinhole */}
            <div className="w-1 h-1 rounded-full bg-neutral-900 border border-neutral-700" />

            {/* Multi-element camera lens with violet anti-reflective sheen */}
            <div className="relative w-2.5 h-2.5 rounded-full bg-[#0e131e] border border-neutral-600 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-violet-950" />
              <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 rounded-full bg-white/80" />
            </div>

            {/* Active Studio Camera Micro-LED */}
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
          </div>

          {/* ── Active Monitor Screen Canvas: Zooms in smoothly when hovered ── */}
          <div className="absolute inset-0 flex flex-col justify-between transition-transform duration-500 ease-out group-hover:scale-105 sm:group-hover:scale-110 origin-center will-change-transform">
            {/* Screen Background: Deep Modern Abstract Desktop Wallpaper */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop')`,
              }}
            >
              {/* Color grading & dark mode contrast overlay */}
              <div className="absolute inset-0 bg-[#001524]/60 backdrop-brightness-90 backdrop-contrast-105" />
            </div>

            {/* ── 4. Screen Desktop Workspace Content ── */}
            <div className="relative z-10 flex-1 p-3 sm:p-4 flex flex-col justify-between">
            {/* Top Row: Floating Code Editor Window + System Monitor */}
            <div className="grid grid-cols-12 gap-2.5 items-start">
              {/* Left IDE Window: VS Code Style Editor */}
              <div className="col-span-7 bg-[#001524]/92 backdrop-blur-xl rounded-xl border border-white/20 p-2.5 shadow-2xl">
                {/* Window Titlebar */}
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10 text-[8px] font-mono text-neutral-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                    <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                    <span className="text-white/80 ml-1 truncate font-medium">portfolio.ts</span>
                  </div>
                  <span className="text-[7.5px] text-[#D6CC99] font-semibold">TypeScript</span>
                </div>

                {/* Syntax-Highlighted Code Lines */}
                <div className="font-mono text-[7.5px] sm:text-[8.5px] leading-relaxed space-y-0.5 text-neutral-300">
                  <p>
                    <span className="text-sky-400 font-bold">const</span>{" "}
                    <span className="text-amber-300">engineer</span> = &#123;
                  </p>
                  <p className="pl-2">
                    <span className="text-[#D6CC99]">name</span>:{" "}
                    <span className="text-emerald-300">&quot;Varad Fegade&quot;</span>,
                  </p>
                  <p className="pl-2">
                    <span className="text-[#D6CC99]">role</span>:{" "}
                    <span className="text-emerald-300">&quot;Full Stack Dev&quot;</span>,
                  </p>
                  <p className="pl-2">
                    <span className="text-[#D6CC99]">system</span>:{" "}
                    <span className="text-sky-300 font-semibold">60FPS_OPTIMIZED</span>
                  </p>
                  <p>&#125;;</p>
                </div>
              </div>

              {/* Right Mini Window: Active Terminal Stream */}
              <div className="col-span-5 bg-[#001524]/92 backdrop-blur-xl rounded-xl border border-white/20 p-2.5 shadow-2xl">
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10 text-[8px] font-mono text-neutral-300">
                  <div className="flex items-center gap-1">
                    <Terminal className="w-2.5 h-2.5 text-emerald-400" />
                    <span className="text-white/80 font-medium">terminal</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="font-mono text-[7.5px] text-emerald-400 space-y-0.5 leading-tight">
                  <p className="text-neutral-400">&gt; npm run dev</p>
                  <p>&gt; ready: localhost:3000</p>
                  <p className="text-[#D6CC99]">&gt; OS Mode: STANDBY</p>
                </div>
              </div>
            </div>

            {/* Center Attractive OS Mode Launch Badge Widget */}
            <div className="my-auto py-1.5 flex flex-col items-center justify-center text-center">
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl bg-[#001524]/90 backdrop-blur-xl border border-[#48A1B2]/60 group-hover:border-[#D6CC99] shadow-[0_10px_25px_rgba(0,0,0,0.7)] text-white transition-all group-hover:shadow-[0_12px_32px_rgba(72,161,178,0.4)]">
                <Sparkles className="w-3.5 h-3.5 text-[#D6CC99] animate-spin" style={{ animationDuration: '6s' }} />
                <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase text-[#FDE5D4] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  Click To Enter OS Mode
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#48A1B2] group-hover:translate-x-1 transition-transform" />
              </div>

              <span className="text-[9px] sm:text-[10px] font-semibold text-[#D6CC99] mt-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                Interactive Windows 10 Virtual Desktop
              </span>
            </div>

            {/* Bottom Desktop Taskbar / Dock */}
            <div className="h-6 sm:h-7 -mx-3 -mb-3 sm:-mx-4 sm:-mb-4 bg-[#001524]/95 backdrop-blur-2xl border-t border-white/15 px-3 flex items-center justify-between text-[9px] text-white">
              <div className="flex items-center gap-2 sm:gap-2.5">
                {/* Windows Start Button */}
                <div className="grid grid-cols-2 gap-0.5 w-3 h-3 text-sky-400">
                  <div className="bg-sky-400 w-1.5 h-1.5 rounded-[0.5px]" />
                  <div className="bg-sky-400 w-1.5 h-1.5 rounded-[0.5px]" />
                  <div className="bg-sky-400 w-1.5 h-1.5 rounded-[0.5px]" />
                  <div className="bg-sky-400 w-1.5 h-1.5 rounded-[0.5px]" />
                </div>

                {/* Search Pill */}
                <div className="w-20 sm:w-24 h-3.5 bg-white/10 rounded-md border border-white/10 px-1.5 text-[7px] sm:text-[8px] text-white/55 flex items-center gap-1 font-mono">
                  <Search className="w-2 h-2 text-white/50" />
                  <span>Search apps...</span>
                </div>

                {/* App Dock Icons */}
                <div className="hidden sm:flex items-center gap-1 pl-1">
                  <div className="w-3.5 h-3.5 rounded-xs bg-[#001524] border border-white/20 flex items-center justify-center text-[7px] text-[#48A1B2]">
                    <Code2 className="w-2.5 h-2.5" />
                  </div>
                  <div className="w-3.5 h-3.5 rounded-xs bg-[#001524] border border-white/20 flex items-center justify-center text-[7px] text-emerald-400">
                    <Terminal className="w-2.5 h-2.5" />
                  </div>
                  <div className="w-3.5 h-3.5 rounded-xs bg-[#001524] border border-white/20 flex items-center justify-center text-[7px] text-[#D6CC99]">
                    <FolderGit2 className="w-2.5 h-2.5" />
                  </div>
                </div>
              </div>

              {/* System Tray Clock & Icons */}
              <div className="flex items-center gap-2 font-mono text-[8px] text-white/85">
                <Wifi className="w-2.5 h-2.5 text-white/70" />
                <Volume2 className="w-2.5 h-2.5 text-white/70" />
                <span>ENG</span>
                <span className="font-bold text-[#D6CC99]">12:00 AM</span>
              </div>
            </div>
          </div>
          </div>

          {/* Multi-Angle Glass Glare / Specular Light Sheen */}
          <div
            className="pointer-events-none absolute inset-0 opacity-45 group-hover:opacity-60 transition-opacity z-20"
            style={{
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.05) 28%, transparent 55%)",
            }}
          />
        </div>

        {/* Realistic Bottom Metallic Bezel Chin with Subtle Studio Monogram */}
        <div className="h-4 sm:h-5 bg-gradient-to-r from-[#202735] via-[#2c3648] to-[#202735] -mx-[6px] -mb-[6px] sm:-mx-[7px] sm:-mb-[7px] border-t border-black/60 flex items-center justify-center relative">
          <span className="font-mono text-[7px] tracking-widest text-neutral-400/80 font-bold uppercase select-none">
            STUDIO DISPLAY // PRO EDITION
          </span>
        </div>
      </motion.div>

      {/* ── 5. Die-Cast Aluminum Stand Neck with Cable Routing Port ── */}
      <div className="relative w-12 sm:w-14 h-8 sm:h-10 bg-gradient-to-b from-[#2e3747] via-[#1e2532] to-[#12161f] border-x border-white/15 -mt-0.5 flex items-center justify-center shadow-xl">
        {/* Metallic cylindrical hinge seam */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-black/70 border-b border-white/10" />
        {/* Cable routing pass-through port */}
        <div className="w-4 h-2.5 rounded-full bg-[#070b10] border border-white/20 shadow-inner" />
      </div>

      {/* ── 6. Precision Aluminum Pedestal Foot Base ── */}
      <div className="w-38 sm:w-46 h-2.5 sm:h-3 bg-gradient-to-r from-[#222937] via-[#3c495e] to-[#222937] rounded-full border border-white/30 shadow-2xl mx-auto relative">
        <div className="absolute inset-x-6 top-0 h-px bg-white/50" />
      </div>

      {/* ── 7. Realistic Ambient Desk Contact Drop Shadow ── */}
      <div className="w-48 sm:w-60 h-3.5 bg-black/85 blur-md rounded-full mt-0.5 mx-auto pointer-events-none" />
    </motion.div>
  );
}
