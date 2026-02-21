import React, { useState, useEffect, useRef } from 'react';
import { RESUME_DATA } from '@/data/resumeData';

export function PdfViewer() {
  return (
    <div className="w-full h-full flex flex-col bg-[#525659]">
      <div className="h-10 bg-[#323639] text-white flex items-center px-4 justify-between shadow-md z-10">
        <div className="flex items-center gap-4 text-sm font-medium"><span>resume.pdf</span></div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-300 bg-black/30 px-2 py-1 rounded">1 / 1</span>
          <button className="hover:bg-white/10 p-1 rounded" title="Zoom Out">−</button>
          <span className="text-xs">100%</span>
          <button className="hover:bg-white/10 p-1 rounded" title="Zoom In">+</button>
        </div>
        <a href="/resume.pdf" download className="bg-[#4285f4] hover:bg-[#3367d6] text-white px-3 py-1 rounded text-xs flex items-center gap-2 transition-colors shadow-sm">
          <span>📥</span> Download
        </a>
      </div>
      <div className="flex-1 w-full relative">
        <object data="/resume.pdf" type="application/pdf" className="w-full h-full">
          <div className="w-full h-full flex items-center justify-center bg-gray-100 p-8">
             <div className="bg-white p-8 rounded shadow-xl border border-gray-300 max-w-md text-center">
                <span className="text-6xl mb-4 block">⚠️</span>
                <h3 className="text-xl font-bold mb-2">PDF Not Found</h3>
                <p className="text-sm text-gray-600 mb-4">Please rename your file to <strong>resume.pdf</strong> and place it in the <strong>public</strong> folder.</p>
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
    "Microsoft Windows [Version 10.0.19045.2965]",
    "(c) Microsoft Corporation. All rights reserved.",
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
      
      switch(cmd) {
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
    <div className="bg-black text-gray-200 font-mono p-4 h-full overflow-y-auto text-sm" onClick={() => document.getElementById('terminal-input')?.focus()}>
      {output.map((line, i) => <div key={i} className="min-h-[1.25rem] whitespace-pre-wrap">{line}</div>)}
      <div className="flex gap-2 mt-1">
        <span>C:\Users\Varad&gt;</span>
        <input id="terminal-input" type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleCommand} className="bg-transparent text-white outline-none flex-1 font-mono" autoFocus autoComplete="off" />
      </div>
      <div ref={endRef} />
    </div>
  );
}

export function AboutContent() {
  return (
    <div className="font-sans text-sm p-6 max-w-2xl bg-white h-full">
      <h1 className="text-3xl font-light text-blue-600 mb-6">{RESUME_DATA.name}</h1>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 text-gray-500 font-medium">Role:</div><div className="col-span-2">{RESUME_DATA.role}</div>
        <div className="col-span-1 text-gray-500 font-medium">Location:</div><div className="col-span-2">Pune, Maharashtra</div>
        <div className="col-span-1 text-gray-500 font-medium">Contact:</div><div className="col-span-2">{RESUME_DATA.phone} | {RESUME_DATA.email}</div>
      </div>
      <h2 className="text-lg font-semibold border-b pb-2 mb-4">Summary</h2>
      <p className="leading-relaxed text-gray-700 bg-gray-50 p-4 border-l-4 border-blue-500 rounded-r">
        {RESUME_DATA.about}
      </p>
    </div>
  );
}

export function ThisPCContent() {
  return (
    <div className="p-4 bg-white h-full">
      <h2 className="text-xl font-light text-gray-800 mb-4 px-2">Folders (Education)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {RESUME_DATA.education.map((edu, i) => (
          <div key={i} className="flex items-center gap-4 p-3 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded cursor-pointer transition-colors">
            <span className="text-4xl text-yellow-400 drop-shadow-sm">📁</span>
            <div>
              <div className="text-sm font-medium text-gray-800 truncate">{edu.year}</div>
              <div className="text-xs text-gray-500 truncate">{edu.inst}</div>
            </div>
          </div>
        ))}
      </div>
      
      <h2 className="text-xl font-light text-gray-800 mb-4 px-2 pt-4 border-t">Devices and drives (Skills)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
        {Object.entries(RESUME_DATA.skills).map(([category, skills]) => (
          <div key={category} className="flex items-start gap-4 p-2 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded cursor-pointer group">
            <span className="text-4xl text-gray-600 drop-shadow-sm group-hover:text-blue-500 transition-colors">💽</span>
            <div className="w-full">
              <div className="text-sm font-bold text-gray-800 flex justify-between">
                <span>Local Disk ({category[0]}:)</span>
              </div>
              <div className="w-full bg-gray-200 h-4 mt-2 rounded-sm border border-gray-300 relative overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-full w-[85%] absolute top-0 left-0"></div>
              </div>
              <div className="text-[10px] text-gray-600 mt-1 leading-tight">{skills}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectsContent() {
  return (
    <div className="p-6 bg-[#f0f0f0] h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESUME_DATA.projects.map((proj, i) => (
          <div key={i} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group">
            <div className="h-2 bg-blue-500 w-full group-hover:bg-blue-600 transition-colors"></div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-gray-800 text-lg mb-2">{proj.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">{proj.desc}</p>
              <a href={proj.link} target="_blank" rel="noreferrer" className="mt-4 bg-[#e1e1e1] hover:bg-[#d0d0d0] text-gray-800 px-4 py-2 text-xs font-semibold text-center rounded transition-colors w-max">
                Open Project ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



export function BrowserContent() {
  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="flex items-center gap-2 p-2 bg-gray-200 border-b border-gray-300">
        <div className="flex gap-1">
          <button className="px-2 hover:bg-gray-300 rounded text-gray-600">←</button>
          <button className="px-2 hover:bg-gray-300 rounded text-gray-600">→</button>
          <button className="px-2 hover:bg-gray-300 rounded text-gray-600">↻</button>
        </div>
        <div className="flex-1 bg-white border border-gray-300 rounded px-3 py-1 text-sm text-gray-600 flex items-center gap-2">
          <span>🔒</span> https://github.com/varadfegade
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-500">
        <span className="text-6xl mb-4">🌐</span>
        <h2 className="text-xl font-medium text-gray-700">Web Browser</h2>
        <p className="text-sm">Connected to the internet.</p>
      </div>
    </div>
  );
}

export function RecycleBinContent() {
  return (
    <div className="p-4 bg-white h-full flex flex-col">
      <div className="flex items-center gap-4 border-b border-gray-200 pb-2 mb-4">
        <button className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-2">
          <span>🗑️</span> Empty Recycle Bin
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <div className="text-center">
          <span className="text-5xl block mb-2 opacity-50">📂</span>
          <p>This folder is empty.</p>
        </div>
      </div>
    </div>
  );
}

// ADD THIS NEW APP TO Apps.tsx


// REPLACE YOUR EXISTING SettingsContent IN Apps.tsx WITH THIS
export function SettingsContent({ setWallpaper }: { setWallpaper: (w: string) => void }) {
  // Premium, modern OS wallpapers (Abstract, 3D Fluid, Minimalist)
  const wallpapers = [
    { name: 'VaradOS Default', val: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2560&auto=format&fit=crop")' },
    { name: 'Dark Glass', val: 'url("https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2560&auto=format&fit=crop")' },
    { name: 'Vibrant Fluid', val: 'url("https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2560&auto=format&fit=crop")' },
    { name: 'Midnight Mesh', val: 'url("https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2560&auto=format&fit=crop")' },
    { name: 'Deep Slate', val: '#0f172a' }
  ];

  return (
    <div className="flex h-full bg-white">
      <div className="w-48 bg-[#f3f3f3] p-2 space-y-1 text-sm border-r border-gray-200">
        <div className="p-2 bg-indigo-100 text-indigo-700 font-medium rounded">Personalization</div>
        <div className="p-2 hover:bg-gray-200 rounded cursor-pointer text-gray-600 transition-colors">System</div>
        <div className="p-2 hover:bg-gray-200 rounded cursor-pointer text-gray-600 transition-colors">Network & Internet</div>
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Personalization</h1>
        <h2 className="text-sm font-medium text-gray-600 mb-3 uppercase tracking-wider">Select a theme to apply</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {wallpapers.map(w => (
            <button key={w.name} onClick={() => setWallpaper(w.val)} className="h-28 border border-gray-300 hover:border-indigo-500 rounded-xl shadow-sm flex items-end p-3 text-white text-sm font-medium bg-cover bg-center transition-all hover:scale-[1.02]" style={{ background: w.val }}>
               <span className="bg-black/60 px-2 py-1 rounded backdrop-blur-md">{w.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
// Don't forget to export this!
export function SpotifyContent() {
  return (
    <div className="h-full w-full bg-[#121212] flex flex-col">
      {/* A Windows-like title bar for the app content */}
      <div className="h-8 bg-[#191919] flex items-center px-3 text-xs text-gray-400 border-b border-[#282828]">
        <span className="font-medium">Spotify Free</span>
      </div>
      <div className="flex-1 relative">
        {/* Embed a public Spotify playlist. You can replace the 'src' with your own playlist link. */}
        <iframe
          style={{ borderRadius: '12px' }}
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="absolute inset-0 p-2"
        ></iframe>
      </div>
    </div>
  );
}


export function SkillsMeterContent() {
  const [activeTab, setActiveTab] = useState('Processes');
  
  // Your actual skills represented as system processes
  const skillsList = [
    { name: "React.js / Next.js", type: "Frontend Engine", cpu: "92.4", mem: "1.2 GB", status: "Running" },
    { name: "C++ & Data Structures", type: "Core Logic", cpu: "95.0", mem: "2.4 GB", status: "High Priority" },
    { name: "Node.js / Express", type: "Backend Server", cpu: "84.2", mem: "840 MB", status: "Running" },
    { name: "TypeScript", type: "Type Checker", cpu: "78.1", mem: "512 MB", status: "Running" },
    { name: "Tailwind CSS", type: "Style Compiler", cpu: "88.5", mem: "128 MB", status: "Running" },
    { name: "MongoDB", type: "Database Service", cpu: "75.0", mem: "1.8 GB", status: "Background" },
  ];

  return (
    <div className="flex flex-col h-full bg-white select-none font-sans">
      {/* Task Manager Toolbar */}
      <div className="h-14 border-b border-gray-200 bg-[#f9f9f9] flex items-center justify-between px-4">
        <div className="flex bg-white rounded-md border border-gray-300 shadow-sm overflow-hidden text-xs font-medium">
          {['Processes', 'Performance', 'App history', 'Startup'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-1.5 border-r border-gray-200 last:border-0 ${activeTab === tab ? 'bg-blue-50 text-blue-700 shadow-inner' : 'text-gray-600 hover:bg-gray-50'}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded shadow-sm">
          Simulation Mode
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Data Table */}
        <div className="flex-1 border-r border-gray-200 overflow-y-auto bg-white">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-[#f3f3f3] border-b border-gray-200 sticky top-0 shadow-sm z-10">
              <tr>
                <th className="font-semibold py-2 px-4 border-r border-gray-200">Skill / Process</th>
                <th className="font-semibold py-2 px-3 border-r border-gray-200">Type</th>
                <th className="font-semibold py-2 px-3 border-r border-gray-200">% Utilization</th>
                <th className="font-semibold py-2 px-3 border-r border-gray-200">Memory</th>
                <th className="font-semibold py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {skillsList.map((skill, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                  <td className="py-2 px-4 font-medium flex items-center gap-2">
                    <span className="text-blue-500 text-lg leading-none">⚙️</span> {skill.name}
                  </td>
                  <td className="py-2 px-3 text-gray-500">{skill.type}</td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-gray-200 rounded-sm h-2 overflow-hidden">
                         <div className="bg-blue-500 h-full" style={{ width: `${skill.cpu}%` }}></div>
                      </div>
                      {skill.cpu}%
                    </div>
                  </td>
                  <td className="py-2 px-3">{skill.mem}</td>
                  <td className={`py-2 px-3 ${skill.status === 'High Priority' ? 'text-blue-600 font-medium' : 'text-green-600'}`}>{skill.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Side: Live Graph Area */}
        <div className="w-72 bg-[#fdfdfd] flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Overall Competency</h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-light text-gray-800">89%</div>
              <div className="text-xs text-green-600 font-medium">Optimal</div>
            </div>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-2 relative">
            <div className="text-xs text-gray-400 flex justify-between"><span>100%</span></div>
            
            {/* Animated Graph using CSS */}
            <div className="flex-1 border border-blue-200 bg-blue-50/30 rounded-md relative overflow-hidden flex items-end shadow-inner">
               {/* Grid lines */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#93c5fd_1px,transparent_1px),linear-gradient(to_bottom,#93c5fd_1px,transparent_1px)] bg-size-[20px_20px] opacity-30"></div>
               
               {/* Simulated Moving Graph Wave */}
               <svg className="absolute bottom-0 w-[200%] h-full animate-[slideLeft_8s_linear_infinite]" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,100 L0,40 Q10,10 20,30 T40,50 T60,20 T80,40 T100,30 L100,100 Z" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="1.5" />
                  <path d="M0,100 L0,40 Q10,10 20,30 T40,50 T60,20 T80,40 T100,30 L100,100 Z" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="1.5" transform="translate(-100, 0)" />
               </svg>
            </div>
            
            <div className="text-[10px] text-gray-400 flex justify-between uppercase"><span>0%</span><span>60 Seconds</span></div>
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes slideLeft {
              from { transform: translateX(0); }
              to { transform: translateX(50%); }
            }
          `}} />
        </div>
      </div>
    </div>
  );
}