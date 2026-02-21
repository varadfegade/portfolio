
import React, { useState, useEffect, useRef } from 'react';
import { WindowData } from '@/types';
import { RESUME_DATA } from '@/data/resumeData';
import DesktopIcon from './DesktopIcon';
import Win10Window from './Win10Window';
import { AboutContent, PdfViewer, ProjectsContent, SettingsContent, TerminalContent, ThisPCContent, BrowserContent, RecycleBinContent, SkillsMeterContent, SpotifyContent } from '../apps/Apps';

const APP_ICONS = {
  web: "https://img.icons8.com/fluency/48/domain.png",
  doc: "https://img.icons8.com/fluency/48/document.png",
  stats: "https://img.icons8.com/fluency/48/combo-chart.png",
  games: "https://img.icons8.com/fluency/48/controller.png",
  spotify: "https://img.icons8.com/fluency/48/spotify.png",
  settings: "https://img.icons8.com/fluency/48/settings.png",
  linkedin: "https://img.icons8.com/fluency/48/linkedin.png",
  terminal: "https://img.icons8.com/fluency/48/console.png",
  pdf: "https://img.icons8.com/fluency/48/pdf.png",
  github: "https://img.icons8.com/fluency/48/github.png",
  thispc: "https://img.icons8.com/fluency/48/workstation.png",
  recycle: "https://img.icons8.com/fluency/48/trash.png",
  folder: "https://img.icons8.com/fluency/48/folder-invoices.png"
};

interface DesktopIconData {
  id: string; icon: string; label: string; action: 'window' | 'link' | 'none'; windowId?: string; href?: string;
}

export default function DesktopEnvironment({ onLogout }: { onLogout: () => void }) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [activeZIndex, setActiveZIndex] = useState(10);
  const [wallpaper, setWallpaper] = useState('url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2560&auto=format&fit=crop")');
  
  const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number }>({ visible: false, x: 0, y: 0 });
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const [desktopIcons, setDesktopIcons] = useState<DesktopIconData[]>([
    { id: 'thispc', icon: APP_ICONS.thispc, label: 'Workspace', action: 'window', windowId: 'thispc' },
    { id: 'recycleBin', icon: APP_ICONS.recycle, label: 'Trash', action: 'window', windowId: 'recycleBin' },
    { id: 'browser', icon: APP_ICONS.web, label: 'Web Browser', action: 'window', windowId: 'browser' },
    { id: 'spotify', icon: APP_ICONS.spotify, label: 'Spotify', action: 'window', windowId: 'spotify' },
    { id: 'skills', icon: APP_ICONS.stats, label: 'Analytics', action: 'window', windowId: 'skills' },
    { id: 'settings', icon: APP_ICONS.settings, label: 'Preferences', action: 'window', windowId: 'settings' },
    { id: 'about', icon: APP_ICONS.doc, label: 'About Me', action: 'window', windowId: 'about' },
    { id: 'projects', icon: APP_ICONS.games, label: 'Projects', action: 'window', windowId: 'projects' },
    { id: 'resume', icon: APP_ICONS.pdf, label: 'Resume', action: 'window', windowId: 'resume' },
    { id: 'terminal', icon: APP_ICONS.terminal, label: 'Terminal', action: 'window', windowId: 'terminal' },
    { id: 'linkedin', icon: APP_ICONS.linkedin, label: 'LinkedIn', action: 'link', href: RESUME_DATA.linkedin },
    { id: 'github', icon: APP_ICONS.github, label: 'GitHub', action: 'link', href: RESUME_DATA.github },
  ]);

  const [windows, setWindows] = useState<Record<string, WindowData>>({
    thispc: { id: 'thispc', title: 'System Workspace', isOpen: false, isMinimized: false, x: 50, y: 50, width: 700, height: 500, zIndex: 1, content: <ThisPCContent />, icon: APP_ICONS.thispc },
    about: { id: 'about', title: 'About_Varad.md', isOpen: false, isMinimized: false, x: 100, y: 100, width: 500, height: 400, zIndex: 2, content: <AboutContent />, icon: APP_ICONS.doc },
    projects: { id: 'projects', title: 'Project Hub', isOpen: false, isMinimized: false, x: 150, y: 80, width: 750, height: 500, zIndex: 3, content: <ProjectsContent />, icon: APP_ICONS.games },
    resume: { id: 'resume', title: 'Resume_Viewer.pdf', isOpen: false, isMinimized: false, x: 200, y: 60, width: 800, height: 600, zIndex: 4, content: <PdfViewer />, icon: APP_ICONS.pdf },
    terminal: { id: 'terminal', title: 'Dev Terminal', isOpen: false, isMinimized: false, x: 250, y: 150, width: 600, height: 350, zIndex: 5, content: <TerminalContent />, icon: APP_ICONS.terminal },
    browser: { id: 'browser', title: 'Internet Browser', isOpen: false, isMinimized: false, x: 350, y: 80, width: 800, height: 550, zIndex: 6, content: <BrowserContent />, icon: APP_ICONS.web },
    recycleBin: { id: 'recycleBin', title: 'Trash Bin', isOpen: false, isMinimized: false, x: 400, y: 200, width: 500, height: 400, zIndex: 7, content: <RecycleBinContent />, icon: APP_ICONS.recycle },
    settings: { id: 'settings', title: 'System Preferences', isOpen: false, isMinimized: false, x: 300, y: 120, width: 700, height: 500, zIndex: 8, content: <SettingsContent setWallpaper={setWallpaper} />, icon: APP_ICONS.settings },
    skills: { id: 'skills', title: 'Performance Metrics', isOpen: false, isMinimized: false, x: 450, y: 150, width: 650, height: 450, zIndex: 9, content: <SkillsMeterContent />, icon: APP_ICONS.stats },
    spotify: { id: 'spotify', title: 'Music Player', isOpen: false, isMinimized: false, x: 500, y: 100, width: 400, height: 600, zIndex: 10, content: <SpotifyContent />, icon: APP_ICONS.spotify }
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString('en-US'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearInterval(interval);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contextMenu]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  const handleNewFolder = () => {
    const newId = `newfolder-${Date.now()}`;
    setDesktopIcons([...desktopIcons, { id: newId, icon: APP_ICONS.folder, label: 'New folder', action: 'none' }]);
    setContextMenu({ ...contextMenu, visible: false });
  };

  const openWindow = (id: string) => {
    setActiveZIndex(prev => prev + 1);
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: activeZIndex + 1 } }));
    setStartMenuOpen(false);
  };

  const closeWindow = (id: string) => setWindows(prev => ({ ...prev, [id]: { ...prev[id], isOpen: false } }));
  const toggleMinimize = (id: string) => setWindows(prev => ({ ...prev, [id]: { ...prev[id], isMinimized: !prev[id].isMinimized } }));
  const focusWindow = (id: string) => {
    if (windows[id].isMinimized) toggleMinimize(id);
    setActiveZIndex(prev => prev + 1);
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], zIndex: activeZIndex + 1 } }));
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative font-sans text-gray-900 bg-cover bg-center transition-all duration-500" 
      style={{ backgroundImage: wallpaper }} 
      onClick={() => { startMenuOpen && setStartMenuOpen(false); if(contextMenu.visible) setContextMenu({...contextMenu, visible: false}); }}
      onContextMenu={handleContextMenu}
    >
      
      {/* MASSIVE BACKGROUND TYPOGRAPHY */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 mix-blend-overlay opacity-40">
        <h1 className="text-[18vw] leading-none font-black tracking-tighter text-white drop-shadow-2xl uppercase">VARAD</h1>
        <h2 className="text-[5vw] leading-none font-bold tracking-[0.5em] text-white/90 uppercase ml-[0.5em] mt-[-2vw]">PORTFOLIO</h2>
      </div>

      <div className="flex flex-col flex-wrap h-[calc(100vh-100px)] gap-2 p-4 content-start z-10 relative">
        {desktopIcons.map(icon => {
          if (icon.action === 'window' && icon.windowId) {
            return <DesktopIcon key={icon.id} icon={icon.icon} label={icon.label} onDoubleClick={() => openWindow(icon.windowId!)} />;
          } else if (icon.action === 'link' && icon.href) {
            return <DesktopIcon key={icon.id} icon={icon.icon} label={icon.label} href={icon.href} className={icon.id === 'github' ? 'mt-4' : ''} />;
          } else {
            return <DesktopIcon key={icon.id} icon={icon.icon} label={icon.label} onDoubleClick={() => {}} />;
          }
        })}
      </div>

      {contextMenu.visible && (
        <div 
          ref={contextMenuRef}
          className="absolute z-100 w-48 bg-[#fafafa]/95 dark:bg-[#2d2d2d]/95 backdrop-blur-xl border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl py-2 text-sm text-gray-800 dark:text-gray-200 select-none animate-in fade-in zoom-in-95 duration-100"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <div className="px-4 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer flex items-center gap-2"><span>👁️</span> View</div>
          <div className="px-4 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer flex items-center gap-2"><span>🔃</span> Sort by</div>
          <div onClick={() => window.location.reload()} className="px-4 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer flex items-center gap-2"><span>🔄</span> Refresh OS</div>
          <div className="my-1 border-b border-gray-300/50 dark:border-gray-600/50"></div>
          <div onClick={handleNewFolder} className="px-4 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer flex items-center gap-2">
            <img src={APP_ICONS.folder} className="w-4 h-4 object-contain" alt="folder" /> New Folder
          </div>
          <div className="my-1 border-b border-gray-300/50 dark:border-gray-600/50"></div>
          <div onClick={() => { openWindow('settings'); setContextMenu({ ...contextMenu, visible: false }); }} className="px-4 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer flex items-center gap-2">
             <img src={APP_ICONS.settings} className="w-4 h-4 object-contain" alt="settings" /> Preferences
          </div>
        </div>
      )}

      {Object.values(windows).map(win => win.isOpen && !win.isMinimized && (
        <Win10Window key={win.id} win={win} onClose={() => closeWindow(win.id)} onMinimize={() => toggleMinimize(win.id)} onFocus={() => focusWindow(win.id)} isFocused={win.zIndex === activeZIndex} />
      ))}

      {/* STRETCHED FLOATING DOCK (Taskbar) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[96%] max-w-7xl h-16 bg-[#f3f3f3]/80 dark:bg-[#1c1c1c]/80 backdrop-blur-2xl border border-white/30 dark:border-white/10 flex items-center justify-between z-50 text-white select-none shadow-2xl rounded-2xl px-6 gap-6 transition-all">
        
        {/* Left Side: App Drawer Button */}
        <div className="flex items-center h-full py-2">
          <button onClick={(e) => { e.stopPropagation(); setStartMenuOpen(!startMenuOpen); }} className={`h-10 w-10 flex items-center justify-center rounded-xl transition-all ${startMenuOpen ? 'bg-indigo-500 shadow-lg shadow-indigo-500/30' : 'hover:bg-black/10 dark:hover:bg-white/10'}`}>
             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={startMenuOpen ? "white" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={startMenuOpen ? "" : "text-gray-800 dark:text-gray-200"}>
               <rect x="3" y="3" width="7" height="7" rx="1"></rect>
               <rect x="14" y="3" width="7" height="7" rx="1"></rect>
               <rect x="14" y="14" width="7" height="7" rx="1"></rect>
               <rect x="3" y="14" width="7" height="7" rx="1"></rect>
             </svg>
          </button>
        </div>

        {/* Center: Open App Icons */}
        <div className="flex-1 flex items-center justify-center gap-3 h-full overflow-hidden">
          {Object.values(windows).map(win => win.isOpen && (
            <button key={`taskbar-${win.id}`} onClick={() => focusWindow(win.id)} className={`h-10 w-10 flex flex-col items-center justify-center rounded-xl transition-all relative group ${win.zIndex === activeZIndex && !win.isMinimized ? 'bg-black/10 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}>
              <div className="flex justify-center items-center group-hover:-translate-y-1 transition-transform">
                {win.icon.startsWith('http') ? (
                  <img src={win.icon} alt={win.title} className="w-7 h-7 object-contain drop-shadow-md" />
                ) : (
                  <span className="text-xl drop-shadow-md">{win.icon}</span>
                )}
              </div>
              <span className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full transition-all ${win.zIndex === activeZIndex && !win.isMinimized ? 'bg-indigo-500 scale-100' : 'bg-gray-400 opacity-0 group-hover:opacity-50 scale-75'}`}></span>
            </button>
          ))}
        </div>

        {/* Right Side: System Tray */}
        <div className="flex h-full items-center text-xs gap-3 text-gray-800 dark:text-gray-200 font-medium tracking-wide">
          <div className="flex items-center gap-2 px-2 h-8 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg cursor-pointer transition-colors text-lg">
             <span>📶</span>
             <span>🔋</span>
          </div>
          <div className="h-8 px-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg flex flex-col items-end justify-center leading-tight cursor-pointer transition-colors">
            <span className="text-sm">{time}</span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400">{date}</span>
          </div>
        </div>

      </div>

      {startMenuOpen && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-150 h-125 bg-[#fafafa]/90 dark:bg-[#1c1c1c]/90 backdrop-blur-3xl border border-gray-300 dark:border-gray-700 rounded-3xl z-50 flex flex-col shadow-2xl select-none overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-10" onClick={e => e.stopPropagation()}>
          <div className="p-8 pb-2">
            <div className="w-full bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm focus-within:ring-2 ring-indigo-500 transition-all">
               <span className="text-gray-400">🔍</span>
               <input type="text" placeholder="Search applications..." className="bg-transparent outline-none flex-1 text-sm text-gray-800 dark:text-gray-200 font-medium" />
            </div>
          </div>

          <div className="px-8 py-4 flex-1 overflow-y-auto">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-wider">Applications</h3>
            <div className="grid grid-cols-5 gap-y-6 gap-x-2 text-center">
               {[
                 { id: 'browser', icon: APP_ICONS.web, label: 'Web' },
                 { id: 'about', icon: APP_ICONS.doc, label: 'Docs' },
                 { id: 'skills', icon: APP_ICONS.stats, label: 'Metrics' },
                 { id: 'projects', icon: APP_ICONS.games, label: 'Arcade' },
                 { id: 'spotify', icon: APP_ICONS.spotify, label: 'Music' },
                 { id: 'settings', icon: APP_ICONS.settings, label: 'Config' },
                 { id: 'linkedin', icon: APP_ICONS.linkedin, label: 'Connect' },
                 { id: 'resume', icon: APP_ICONS.pdf, label: 'CV' },
                 { id: 'terminal', icon: APP_ICONS.terminal, label: 'Console' },
                 { id: 'thispc', icon: APP_ICONS.thispc, label: 'Files' }
               ].map(app => (
                 <div key={app.id} onClick={() => { if (app.id === 'linkedin') window.open(RESUME_DATA.linkedin, '_blank'); else openWindow(app.id); }} className="flex flex-col items-center gap-3 p-3 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl cursor-pointer transition-all group">
                    {app.icon.startsWith('http') ? (
                      <img src={app.icon} alt={app.label} className="w-10 h-10 object-contain drop-shadow-sm group-hover:scale-110 transition-transform" />
                    ) : (
                      <span className="text-4xl drop-shadow-sm group-hover:scale-110 transition-transform">{app.icon}</span>
                    )}
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate w-full">{app.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}