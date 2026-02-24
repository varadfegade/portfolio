import React, { useState, useEffect, useRef } from 'react';
import { RESUME_DATA } from '@/data/resumeData';
import { Download, AlertTriangle, Terminal, Cpu, HardDrive, Share2, Search, Trash2, Settings, Wifi, BatteryMedium, Music, FileText, User, FolderOpen, Globe, BarChart2, MapPin, Mail } from 'lucide-react';

export function PdfViewer() {
  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e] text-gray-200 font-sans">
      <div className="h-12 bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center px-4 justify-between shadow-sm z-10 select-none">
        <div className="flex items-center gap-3 text-sm font-medium">
          <FileText size={16} className="text-red-400" />
          <span>resume.pdf</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-gray-400 bg-black/50 px-3 py-1.5 rounded-md font-medium">1 / 1</span>
          <button className="hover:bg-white/10 w-7 h-7 flex items-center justify-center rounded-md transition-colors" title="Zoom Out">−</button>
          <span className="font-medium text-gray-300">100%</span>
          <button className="hover:bg-white/10 w-7 h-7 flex items-center justify-center rounded-md transition-colors" title="Zoom In">+</button>
        </div>
        <a href="/resume.pdf" download className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-500/20">
          <Download size={14} /> Download
        </a>
      </div>
      <div className="flex-1 w-full relative">
        <object data="/resume.pdf" type="application/pdf" className="w-full h-full bg-[#323639]">
          <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-[#121212] p-8">
            <div className="bg-white dark:bg-[#1e1e1e] p-10 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 max-w-md text-center flex flex-col items-center">
              <AlertTriangle size={64} className="text-yellow-500 mb-6 drop-shadow-md" />
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">PDF Not Found</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">Please rename your file to <strong className="text-gray-900 dark:text-white">resume.pdf</strong> and place it in the <strong className="text-gray-900 dark:text-white">public</strong> folder.</p>
            </div>
          </div>
        </object>
      </div>
    </div>
  );
}

export function TerminalContent() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([
    "VaradOS Kernel [Version 1.0.0190]",
    "(c) Varad Corporation. All rights reserved.",
    "",
    "C:\\Users\\Varad> echo Welcome to Varad's Terminal!",
    "Welcome to Varad's Terminal!",
    "Type 'help' to see available commands."
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [output]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newOutput = [...output, `C:\\Users\\Varad> ${input}`];

      switch (cmd) {
        case 'help': newOutput.push("Commands: whoami, contact, skills, clear, certificates"); break;
        case 'whoami': newOutput.push(RESUME_DATA.name + " - " + RESUME_DATA.role); break;
        case 'contact': newOutput.push(`Phone: ${RESUME_DATA.phone} | Email: ${RESUME_DATA.email}`); break;
        case 'skills': newOutput.push("Frontend: " + RESUME_DATA.skills.Frontend, "Backend: " + RESUME_DATA.skills.Backend, "Core: " + RESUME_DATA.skills.Core); break;
        case 'certificates': newOutput.push("--> Decode C++ with DSA Course (Physics Wallah) - Completed"); break;
        case 'clear': setOutput([]); setInput(""); return;
        case '': break;
        default: newOutput.push(`'${cmd}' is not recognized as an internal or external command, operable program or batch file.`);
      }
      setOutput(newOutput);
      setInput("");
    }
  };

  return (
    <div className="bg-[#0c0c0c] text-green-400 font-mono p-5 h-full overflow-y-auto text-sm leading-relaxed" onClick={() => document.getElementById('terminal-input')?.focus()}>
      {output.map((line, i) => <div key={i} className="min-h-[1.5rem] whitespace-pre-wrap opacity-90">{line}</div>)}
      <div className="flex gap-2 mt-2 items-center">
        <span className="text-blue-400">C:\Users\Varad&gt;</span>
        <input id="terminal-input" type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleCommand} className="bg-transparent text-gray-100 outline-none flex-1 font-mono caret-green-400" autoFocus autoComplete="off" />
      </div>
      <div ref={endRef} />
    </div>
  );
}

export function AboutContent() {
  return (
    <div className="font-sans text-sm p-8 max-w-2xl bg-white dark:bg-[#121212] h-full text-gray-800 dark:text-gray-200 mx-auto">
      <div className="flex items-center gap-6 mb-10 pb-6 border-b border-gray-200 dark:border-gray-800">
        <img src="https://api.dicebear.com/7.x/initials/svg?seed=VF&backgroundColor=0ea5e9" alt="Profile" className="w-24 h-24 rounded-full shadow-lg border-4 border-white dark:border-gray-800" />
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white">{RESUME_DATA.name}</h1>
          <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium">{RESUME_DATA.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-4 shadow-sm">
          <MapPin size={24} className="text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Location</p>
            <p className="font-medium">Pune, Maharashtra</p>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-4 shadow-sm">
          <Mail size={24} className="text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Contact</p>
            <p className="font-medium">{RESUME_DATA.email}</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
        <User size={20} className="text-indigo-500" /> Professional Summary
      </h2>
      <p className="leading-relaxed text-gray-600 dark:text-gray-400 bg-indigo-50/50 dark:bg-indigo-900/10 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 text-[15px]">
        {RESUME_DATA.about}
      </p>
    </div>
  );
}

// Needed imports for AboutContent

export function ThisPCContent() {
  return (
    <div className="p-6 bg-white dark:bg-[#121212] h-full text-gray-800 dark:text-gray-200">
      <h2 className="text-lg font-semibold mb-5 px-2 flex items-center gap-2">
        <FolderOpen size={18} className="text-indigo-500" /> Folders (Education)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {RESUME_DATA.education.map((edu, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-gray-50/50 dark:bg-white/5 hover:bg-blue-50 dark:hover:bg-indigo-900/20 border border-gray-200 dark:border-white/10 hover:border-blue-200 dark:hover:border-indigo-500/30 rounded-xl cursor-pointer transition-all shadow-sm">
            <FolderOpen size={36} fill="currentColor" strokeWidth={1} className="text-yellow-400 drop-shadow-sm" />
            <div className="overflow-hidden">
              <div className="text-sm font-bold truncate text-gray-900 dark:text-white mb-0.5">{edu.year}</div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate opacity-90">{edu.inst}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-5 px-2 pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2">
        <HardDrive size={18} className="text-indigo-500" /> Devices and drives (Skills)
      </h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mx-2">
        {Object.entries(RESUME_DATA.skills).map(([category, skills]) => (
          <div key={category} className="flex items-start gap-5 p-4 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl group transition-all hover:shadow-md hover:border-indigo-500/30">
            <HardDrive size={40} className="text-gray-400 group-hover:text-indigo-500 transition-colors drop-shadow-sm" />
            <div className="w-full">
              <div className="text-sm font-bold mb-1.5 flex justify-between text-gray-900 dark:text-white">
                <span>Local Disk ({category[0]}:)</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 h-3 rounded-full overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-indigo-500 to-blue-400 h-full w-[85%] relative">
                  <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2.5 leading-relaxed bg-white/50 dark:bg-black/20 p-2 rounded-md border border-gray-100 dark:border-white/5">{skills}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectsContent() {
  return (
    <div className="p-8 bg-gray-50 dark:bg-[#0a0a0a] h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {RESUME_DATA.projects.map((proj, i) => (
          <div key={i} className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl rounded-2xl flex flex-col justify-between overflow-hidden group transition-all hover:-translate-y-1">
            <div className="h-2 bg-gradient-to-r from-indigo-500 to-blue-400 w-full"></div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-3 flex items-center gap-2">
                <Share2 size={18} className="text-indigo-500" /> {proj.name}
              </h3>
              <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed flex-1 bg-gray-50 dark:bg-black/20 p-4 rounded-xl border border-gray-100 dark:border-white/5 mb-6">{proj.desc}</p>
              <a href={proj.link} target="_blank" rel="noreferrer" className="w-full bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-600 text-indigo-600 hover:text-white border border-indigo-200 dark:border-indigo-500/30 px-4 py-2.5 text-sm font-semibold text-center rounded-xl transition-all shadow-sm">
                Open Application ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



export function BrowserContent() {
  const [url, setUrl] = useState("https://en.wikipedia.org/wiki/Main_Page");
  const [inputUrl, setInputUrl] = useState("https://en.wikipedia.org");

  const handleNav = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let finalUrl = inputUrl;
      if (!finalUrl.startsWith('http')) finalUrl = 'https://' + finalUrl;
      setUrl(finalUrl);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-[#121212] overflow-hidden">
      <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-white/10">
        <div className="flex gap-1.5 ml-2">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/10 rounded-full text-gray-600 dark:text-gray-400 transition-colors">←</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/10 rounded-full text-gray-600 dark:text-gray-400 transition-colors">→</button>
          <button onClick={() => setUrl(url)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/10 rounded-full text-gray-600 dark:text-gray-400 transition-colors">↻</button>
        </div>
        <div className="flex-1 bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-full px-4 py-1.5 text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2 shadow-sm focus-within:ring-2 ring-indigo-500/50 transition-all mx-2">
          <Globe size={14} className="opacity-50" />
          <input
            type="text"
            value={inputUrl}
            onChange={e => setInputUrl(e.target.value)}
            onKeyDown={handleNav}
            className="bg-transparent border-none outline-none w-full text-gray-800 dark:text-gray-200"
            placeholder="Search or enter web address"
          />
        </div>
        <div className="flex gap-2 mr-2">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/10 rounded-full text-gray-600 dark:text-gray-400 transition-colors"><Settings size={16} /></button>
        </div>
      </div>
      <div className="flex-1 flex flex-col relative bg-white">
        <iframe src={url} className="w-full h-full border-none" sandbox="allow-same-origin allow-scripts allow-forms allow-popups" title="browser"></iframe>
      </div>
    </div>
  );
}

export function RecycleBinContent() {
  return (
    <div className="p-6 bg-white dark:bg-[#121212] h-full flex flex-col">
      <div className="flex items-center gap-4 border-b border-gray-200 dark:border-white/10 pb-4 mb-4">
        <button className="text-sm text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 bg-gray-100 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-red-500/10 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-500/30">
          <Trash2 size={16} /> Empty Recycle Bin
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center text-gray-400 bg-gray-50/50 dark:bg-black/20 rounded-xl border border-dashed border-gray-200 dark:border-gray-800 m-2">
        <div className="text-center">
          <Trash2 size={48} strokeWidth={1} className="mx-auto mb-4 opacity-50 text-gray-500" />
          <p className="font-medium text-gray-500 dark:text-gray-400">This folder is empty.</p>
        </div>
      </div>
    </div>
  );
}

export function SettingsContent({ setWallpaper }: { setWallpaper: (w: string) => void }) {
  const wallpapers = [
    { name: 'macOS Monterey', val: 'url("https://images.unsplash.com/photo-1622737133809-d95047b9e673?q=80&w=2560&auto=format&fit=crop")' },
    { name: 'Dark Ventura', val: 'url("https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2560&auto=format&fit=crop")' },
    { name: 'Fluid Gradient', val: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2560&auto=format&fit=crop")' },
    { name: 'Minimal Mono', val: 'url("https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2560&auto=format&fit=crop")' },
    { name: 'Deep Slate', val: '#0f172a' }
  ];

  return (
    <div className="flex h-full bg-white dark:bg-[#121212] text-gray-800 dark:text-gray-200">
      <div className="w-64 bg-gray-50/80 dark:bg-black/20 p-4 space-y-1.5 text-sm border-r border-gray-200 dark:border-white/10 backdrop-blur-md">
        <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold rounded-xl border border-indigo-100 dark:border-indigo-500/20 flex items-center gap-3">
          <Settings size={18} /> Personalization
        </div>
        <div className="p-3 hover:bg-gray-200/50 dark:hover:bg-white/5 rounded-xl cursor-pointer text-gray-600 dark:text-gray-400 transition-colors flex items-center gap-3 font-medium">
          <Cpu size={18} /> System
        </div>
        <div className="p-3 hover:bg-gray-200/50 dark:hover:bg-white/5 rounded-xl cursor-pointer text-gray-600 dark:text-gray-400 transition-colors flex items-center gap-3 font-medium">
          <Wifi size={18} /> Network & Internet
        </div>
      </div>
      <div className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8 tracking-tight">Personalization</h1>

        <div className="bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-widest flex items-center gap-2">
            Desktop Background
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {wallpapers.map(w => (
              <button key={w.name} onClick={() => setWallpaper(w.val)} className="h-32 border-2 border-transparent hover:border-indigo-500/70 rounded-xl shadow-sm flex items-end p-3 text-white text-sm font-medium bg-cover bg-center transition-all hover:scale-[1.02] overflow-hidden relative group" style={{ background: w.val }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 px-1 drop-shadow-md text-shadow-sm">{w.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SpotifyContent() {
  return (
    <div className="h-full w-full bg-[#121212] flex flex-col overflow-hidden">
      <div className="h-12 bg-[#191919]/90 backdrop-blur-md flex items-center px-4 text-xs tracking-wider text-gray-400 border-b border-[#282828] select-none font-semibold">
        <div className="flex items-center gap-2">
          <Music size={14} className="text-green-500" />
          <span>SPOTIFY FREE</span>
        </div>
      </div>
      <div className="flex-1 relative bg-gradient-to-b from-[#1f1f1f] to-[#121212]">
        <iframe
          style={{ borderRadius: '0 0 16px 16px' }}
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="absolute inset-0"
        ></iframe>
      </div>
    </div>
  );
}


import { motion } from 'framer-motion';

const Speedometer = ({ skill, percent, delay, color }: { skill: string, percent: number, delay: number, color: string }) => {
  const radius = 60;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  // Half circle
  const arcLength = circumference / 2;
  const dashOffset = arcLength - (arcLength * percent) / 100;
  const rotation = -90 + (180 * percent) / 100;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group backdrop-blur-md">
      <div className="relative w-40 h-[100px] overflow-hidden flex items-end justify-center mb-2">
        <svg viewBox="0 0 160 160" className="absolute top-0 w-full h-[160px] drop-shadow-md">
          {/* Background Arc */}
          <circle cx="80" cy="80" r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-gray-300 dark:text-gray-800" strokeLinecap="round" strokeDasharray={`${arcLength} ${circumference}`} strokeDashoffset="0" transform="rotate(-180 80 80)" />

          {/* Foreground Arc */}
          <motion.circle
            initial={{ strokeDashoffset: arcLength }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 2.5, delay, type: "spring", bounce: 0.35, damping: 15 }}
            cx="80" cy="80" r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={`${color}`} strokeLinecap="round" strokeDasharray={`${arcLength} ${circumference}`} transform="rotate(-180 80 80)"
          />

          {/* Needle Base */}
          <circle cx="80" cy="80" r="8" className="fill-gray-800 dark:fill-gray-200" />
          <circle cx="80" cy="80" r="4" className="fill-white dark:fill-black" />

          {/* Needle */}
          <motion.polygon
            initial={{ rotate: -90 }}
            animate={{ rotate: rotation }}
            transition={{ duration: 3, delay, type: "spring", bounce: 0.5, damping: 12, mass: 1.2 }}
            points="77,80 83,80 80,30" className="fill-gray-800 dark:fill-gray-200 origin-[80px_80px] drop-shadow-lg"
          />
        </svg>
        <div className="absolute bottom-0 text-2xl font-bold text-gray-900 dark:text-white pb-1">{percent}<span className="text-sm text-gray-500">%</span></div>
      </div>
      <h3 className="mt-2 text-[13px] font-bold text-gray-700 dark:text-gray-300 tracking-wider uppercase text-center">{skill}</h3>
    </div>
  );
};

export function SkillsMeterContent() {
  const skillsList = [
    { name: "React.js", percent: 95, color: "text-blue-500" },
    { name: "Next.js", percent: 90, color: "text-slate-800 dark:text-gray-300" },
    { name: "TypeScript", percent: 85, color: "text-blue-600" },
    { name: "Tailwind CSS", percent: 92, color: "text-teal-400" },
    { name: "Node.js", percent: 80, color: "text-green-500" },
    { name: "MongoDB", percent: 75, color: "text-emerald-600" },
    { name: "Python", percent: 88, color: "text-yellow-500" },
    { name: "C++", percent: 82, color: "text-indigo-600" },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#121212] font-sans overflow-hidden">
      {/* Header Toolbar */}
      <div className="h-16 border-b border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-black/20 backdrop-blur-md flex items-center justify-between px-8 select-none">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-3">
          <BarChart2 className="text-indigo-500" size={24} />
          Technical Competency
        </h2>
        <div className="text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 px-4 py-1.5 rounded-full shadow-sm font-bold flex items-center gap-2">
          <Cpu size={14} /> LIVE DIAGNOSTICS
        </div>
      </div>

      {/* Speedometer Gauges Grid */}
      <div className="flex-1 overflow-y-auto p-8 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0,transparent_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0,transparent_100%)] pointer-events-none"></div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {skillsList.map((skill, index) => (
            <Speedometer
              key={skill.name}
              skill={skill.name}
              percent={skill.percent}
              delay={index * 0.15 + 0.5}
              color={skill.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}