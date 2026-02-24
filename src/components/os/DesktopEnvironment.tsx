
import React, { useState, useEffect, useRef } from 'react';
import { WindowData } from '@/types';
import { RESUME_DATA } from '@/data/resumeData';
import DesktopIcon from './DesktopIcon';
import Win10Window from './Win10Window';
import { AboutContent, PdfViewer, ProjectsContent, SettingsContent, TerminalContent, ThisPCContent, BrowserContent, RecycleBinContent, SkillsMeterContent, SpotifyContent } from '../apps/Apps';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  FolderOpen, Trash2, Globe, Music, BarChart2,
  Settings, User, Gamepad2, FileText, Terminal,
  Linkedin, Github, Search, Wifi, BatteryMedium,
  ChevronUp
} from 'lucide-react';

const APP_ICONS = {
  web: <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg" className="w-[42px] h-[42px] drop-shadow-md object-contain" alt="Chrome" draggable="false" />,
  doc: <img src="https://api.iconify.design/vscode-icons/file-type-text.svg" className="w-[38px] h-[38px] drop-shadow-md object-contain" alt="TXT Document" draggable="false" />,
  stats: <img src="https://api.iconify.design/flat-color-icons/combo-chart.svg" className="w-[38px] h-[38px] drop-shadow-md object-contain" alt="Gauge" draggable="false" />,
  games: <img src="https://cdn-icons-png.flaticon.com/512/808/808439.png" className="w-[38px] h-[38px] drop-shadow-lg object-contain" alt="Xbox" draggable="false" />,
  spotify: <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" className="w-[38px] h-[38px] drop-shadow-md object-contain" alt="Spotify" draggable="false" />,
  settings: <img src="https://api.iconify.design/flat-color-icons/settings.svg" className="w-[38px] h-[38px] drop-shadow-md object-contain" alt="Settings Tools" draggable="false" />,
  linkedin: <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" className="w-[38px] h-[38px] drop-shadow-md rounded-md object-contain" alt="LinkedIn" draggable="false" />,
  terminal: <img src="https://img.icons8.com/fluency/512/console.png" className="w-[38px] h-[38px] drop-shadow-md object-contain" alt="Terminal" draggable="false" />,
  pdf: <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" className="w-[38px] h-[38px] drop-shadow-md object-contain" alt="PDF" draggable="false" />,
  github: <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" className="w-[38px] h-[38px] drop-shadow-md bg-white rounded-full object-contain" alt="GitHub" draggable="false" />,
  thispc: <img src="https://api.iconify.design/fluent-emoji-flat/open-file-folder.svg" className="w-[42px] h-[42px] drop-shadow-md object-contain" alt="Workspace" draggable="false" />,
  recycle: <img src="https://api.iconify.design/flat-color-icons/full-trash.svg" className="w-[38px] h-[38px] drop-shadow-md object-contain" alt="Recycle Bin" draggable="false" />,
  folder: <img src="https://upload.wikimedia.org/wikipedia/commons/5/59/OneDrive_Folder_Icon.svg" className="w-[38px] h-[38px] drop-shadow-md object-contain" alt="Folder" draggable="false" />,
  portfolio: <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" className="w-[38px] h-[38px] drop-shadow-[0_0_10px_rgba(97,218,251,0.5)] object-contain motion-safe:animate-[spin_4s_linear_infinite]" alt="Portfolio" draggable="false" />,
  mail: <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" className="w-[38px] h-[38px] drop-shadow-md object-contain" alt="Mail" draggable="false" />,
};

interface DesktopIconData {
  id: string; icon: React.ReactNode | string; label: string; action: 'window' | 'link' | 'none'; windowId?: string; href?: string;
}

// Custom hook for macOS style dock magnification
function useDockHover(mouseX: any, itemRef: React.RefObject<HTMLButtonElement | null>) {
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = itemRef.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Magnify based on cursor distance
  const widthSync = useTransform(distance, [-100, 0, 100], [44, 70, 44]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 400, damping: 20 });

  return width;
}

const DockItem = ({ win, isFocused, mouseX, onClick }: { win: WindowData, isFocused: boolean, mouseX: any, onClick: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const width = useDockHover(mouseX, ref);

  return (
    <motion.button
      ref={ref}
      style={{ width, height: width }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: 10 }}
      whileTap={{ scale: 0.95 }}
      key={`taskbar-${win.id}`}
      onClick={onClick}
      className={`flex flex-col items-center justify-center rounded-xl transition-colors relative group ${isFocused && !win.isMinimized ? 'bg-white/20 border-t border-white/50 border-white/10 shadow-lg' : 'bg-transparent hover:bg-white/10 border border-transparent'}`}
    >
      <div className="flex justify-center items-center drop-shadow-xl transition-transform h-full w-full">
        {win.icon}
      </div>
      <span className={`absolute -bottom-1 w-2.5 h-1 rounded-full transition-all duration-300 ${isFocused && !win.isMinimized ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,1)] scale-100' : 'bg-white/40 opacity-0 group-hover:opacity-100 scale-50'}`}></span>
    </motion.button>
  );
};

export default function DesktopEnvironment({ onLogout, onModern }: { onLogout: () => void, onModern?: () => void }) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [activeZIndex, setActiveZIndex] = useState(10);
  const [wallpaper, setWallpaper] = useState('url("https://images.unsplash.com/photo-1622737133809-d95047b9e673?q=80&w=2560&auto=format&fit=crop")');

  const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number }>({ visible: false, x: 0, y: 0 });
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const [desktopIcons, setDesktopIcons] = useState<DesktopIconData[]>([
    { id: 'thispc', icon: APP_ICONS.thispc, label: 'Workspace', action: 'window', windowId: 'thispc' },
    { id: 'recycleBin', icon: APP_ICONS.recycle, label: 'Trash', action: 'window', windowId: 'recycleBin' },
    { id: 'browser', icon: APP_ICONS.web, label: 'Browser', action: 'window', windowId: 'browser' },
    { id: 'spotify', icon: APP_ICONS.spotify, label: 'Spotify', action: 'window', windowId: 'spotify' },
    { id: 'skills', icon: APP_ICONS.stats, label: 'Skills Meter', action: 'window', windowId: 'skills' },
    { id: 'settings', icon: APP_ICONS.settings, label: 'Settings', action: 'window', windowId: 'settings' },
    { id: 'about', icon: APP_ICONS.doc, label: 'About Me', action: 'window', windowId: 'about' },
    { id: 'projects', icon: APP_ICONS.games, label: 'Projects', action: 'window', windowId: 'projects' },
    { id: 'resume', icon: APP_ICONS.pdf, label: 'Resume', action: 'window', windowId: 'resume' },
    { id: 'terminal', icon: APP_ICONS.terminal, label: 'Terminal', action: 'window', windowId: 'terminal' },
    { id: 'mail', icon: APP_ICONS.mail, label: 'Hire Me', action: 'link', href: `mailto:${RESUME_DATA.email}` },
    { id: 'linkedin', icon: APP_ICONS.linkedin, label: 'LinkedIn', action: 'link', href: RESUME_DATA.linkedin },
    { id: 'github', icon: APP_ICONS.github, label: 'GitHub', action: 'link', href: RESUME_DATA.github },
    { id: 'modern', icon: APP_ICONS.portfolio, label: 'Modern UI', action: 'window', windowId: 'modern' }, // We use window here but intercept it
  ]);

  const [windows, setWindows] = useState<Record<string, WindowData>>({
    thispc: { id: 'thispc', title: 'File Manager', isOpen: false, isMinimized: false, x: 50, y: 50, width: 700, height: 500, zIndex: 1, content: <ThisPCContent />, icon: <FolderOpen size={16} className="text-yellow-500" /> },
    about: { id: 'about', title: 'About_Varad.md', isOpen: false, isMinimized: false, x: 100, y: 100, width: 500, height: 400, zIndex: 2, content: <AboutContent />, icon: <User size={16} className="text-emerald-500" /> },
    projects: { id: 'projects', title: 'Project Hub', isOpen: false, isMinimized: false, x: 150, y: 80, width: 750, height: 500, zIndex: 3, content: <ProjectsContent />, icon: <Gamepad2 size={16} className="text-purple-500" /> },
    resume: { id: 'resume', title: 'Resume_Viewer.pdf', isOpen: false, isMinimized: false, x: 200, y: 60, width: 800, height: 600, zIndex: 4, content: <PdfViewer />, icon: <FileText size={16} className="text-red-500" /> },
    terminal: { id: 'terminal', title: 'Dev Terminal', isOpen: false, isMinimized: false, x: 250, y: 150, width: 600, height: 350, zIndex: 5, content: <TerminalContent />, icon: <Terminal size={16} className="text-gray-300" /> },
    browser: { id: 'browser', title: 'Internet Browser', isOpen: false, isMinimized: false, x: 350, y: 80, width: 800, height: 550, zIndex: 6, content: <BrowserContent />, icon: <Globe size={16} className="text-blue-500" /> },
    recycleBin: { id: 'recycleBin', title: 'Trash Bin', isOpen: false, isMinimized: false, x: 400, y: 200, width: 500, height: 400, zIndex: 7, content: <RecycleBinContent />, icon: <Trash2 size={16} className="text-gray-400" /> },
    settings: { id: 'settings', title: 'Settings', isOpen: false, isMinimized: false, x: 300, y: 120, width: 700, height: 500, zIndex: 8, content: <SettingsContent setWallpaper={setWallpaper} />, icon: <Settings size={16} className="text-gray-400" /> },
    skills: { id: 'skills', title: 'Skills Meter', isOpen: false, isMinimized: false, x: 450, y: 150, width: 650, height: 450, zIndex: 9, content: <SkillsMeterContent />, icon: <BarChart2 size={16} className="text-orange-500" /> },
    spotify: { id: 'spotify', title: 'Music Player', isOpen: false, isMinimized: false, x: 500, y: 100, width: 400, height: 600, zIndex: 10, content: <SpotifyContent />, icon: <Music size={16} className="text-green-500" /> }
  });

  const mouseX = useMotionValue(Infinity);

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
    if (id === 'modern' && onModern) {
      onModern();
      return;
    }
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

  const handleMailClick = async () => {
    try {
      await navigator.clipboard.writeText(RESUME_DATA.email);
      alert('Email copied to clipboard! Opening Gmail...');
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
    // Attempt to open Gmail compose window specifically
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${RESUME_DATA.email}`, '_blank');
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden relative font-sans text-gray-900 bg-cover bg-center transition-all duration-700"
      style={{ backgroundImage: wallpaper }}
      onClick={() => { startMenuOpen && setStartMenuOpen(false); if (contextMenu.visible) setContextMenu({ ...contextMenu, visible: false }); }}
      onContextMenu={handleContextMenu}
    >

      {/* Dynamic Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none z-0"></div>

      {/* Background Watermark */}
      <div className="absolute top-8 right-12 z-0 pointer-events-none opacity-40 select-none flex flex-col items-end">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg tracking-tight">Varad<span className="text-indigo-300">OS</span></h1>
        <p className="text-xl font-medium text-white/80 mt-1 tracking-widest uppercase">Portfolio Space</p>
      </div>

      <div className="flex flex-col flex-wrap h-[calc(100vh-100px)] gap-4 p-6 content-start z-10 relative">
        <AnimatePresence>
          {desktopIcons.map((icon, index) => (
            <motion.div
              key={icon.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, type: 'spring' }}
            >
              {icon.action === 'window' && icon.windowId ? (
                <DesktopIcon icon={icon.icon} label={icon.label} onDoubleClick={() => openWindow(icon.windowId!)} />
              ) : icon.action === 'link' && icon.id === 'mail' ? (
                <DesktopIcon icon={icon.icon} label={icon.label} onDoubleClick={handleMailClick} />
              ) : icon.action === 'link' && icon.href ? (
                <DesktopIcon icon={icon.icon} label={icon.label} href={icon.href} className={icon.id === 'github' ? 'mt-4' : ''} />
              ) : (
                <DesktopIcon icon={icon.icon} label={icon.label} onDoubleClick={() => { }} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {contextMenu.visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            ref={contextMenuRef}
            className="absolute z-[200] w-56 bg-white/70 dark:bg-black/70 backdrop-blur-3xl border border-white/30 dark:border-white/10 rounded-xl shadow-2xl py-2 text-sm text-gray-800 dark:text-gray-200 select-none"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <div className="px-5 py-2 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer flex items-center gap-3 transition-colors">
              <Search size={16} /> View
            </div>
            <div className="px-5 py-2 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer flex items-center gap-3 transition-colors">
              <ChevronUp size={16} /> Sort by
            </div>
            <div onClick={() => window.location.reload()} className="px-5 py-2 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer flex items-center gap-3 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M3 22v-6h6" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /></svg>
              Refresh OS
            </div>
            <div className="my-1.5 border-b border-gray-300/30 dark:border-gray-600/30 mx-2"></div>
            <div onClick={handleNewFolder} className="px-5 py-2 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer flex items-center gap-3 transition-colors">
              <FolderOpen size={16} className="text-yellow-500 drop-shadow-sm" /> New Folder
            </div>
            <div className="my-1.5 border-b border-gray-300/30 dark:border-gray-600/30 mx-2"></div>
            <div onClick={() => { openWindow('settings'); setContextMenu({ ...contextMenu, visible: false }); }} className="px-5 py-2 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer flex items-center gap-3 transition-colors">
              <Settings size={16} className="text-gray-500" /> Personalize
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {Object.values(windows).map(win => win.isOpen && !win.isMinimized && (
          <Win10Window key={win.id} win={win} onClose={() => closeWindow(win.id)} onMinimize={() => toggleMinimize(win.id)} onFocus={() => focusWindow(win.id)} isFocused={win.zIndex === activeZIndex} />
        ))}
      </AnimatePresence>

      {/* STRETCHED FLOATING DOCK (Taskbar) - macOS/Win11 Hybrid with Realistic Glass Details */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-max min-w-[300px] h-[68px] bg-white/20 dark:bg-black/30 backdrop-blur-3xl border border-white/40 dark:border-white/10 flex items-center justify-between z-[150] text-gray-800 dark:text-gray-200 select-none shadow-[0_20px_40px_rgba(0,0,0,0.3)] rounded-3xl px-4 gap-6 overflow-visible"
      >
        {/* Specular horizontal highlight across the top edge of the taskbar */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none rounded-t-2xl"></div>

        {/* Left Side: App Drawer Button */}
        <div className="flex items-center h-full py-2 z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); setStartMenuOpen(!startMenuOpen); }}
            className={`h-11 w-11 flex items-center justify-center rounded-xl transition-all ${startMenuOpen ? 'bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.6)] text-white border-t border-indigo-300' : 'bg-white/10 hover:bg-white/20 border-t border-white/30 border-b border-black/20 shadow-sm text-gray-800 dark:text-gray-200 hover:shadow-lg'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
              <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
              <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
            </svg>
          </motion.button>
        </div>

        {/* Center: Open App Icons (Dock) - macOS Hover Animation */}
        <div
          className="flex-1 flex items-end justify-center gap-2 h-full z-10 pb-2.5 px-4"
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
        >
          <AnimatePresence>
            {Object.values(windows).map(win => win.isOpen && (
              <DockItem
                key={win.id}
                win={win}
                isFocused={win.zIndex === activeZIndex}
                mouseX={mouseX}
                onClick={() => focusWindow(win.id)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Right Side: System Tray */}
        <div className="flex h-full items-center text-xs gap-3 font-medium tracking-wide z-10">
          <div className="flex items-center gap-3 px-3 h-10 bg-white/10 hover:bg-white/20 border-t border-white/30 border-b border-black/20 shadow-sm rounded-xl cursor-pointer transition-colors backdrop-blur-md">
            <Wifi size={16} className="drop-shadow-md text-gray-800 dark:text-gray-100" />
            <BatteryMedium size={18} className="drop-shadow-md text-gray-800 dark:text-gray-100" />
          </div>
          <div className="h-10 px-4 bg-white/10 hover:bg-white/20 border-t border-white/30 border-b border-black/20 shadow-sm rounded-xl flex flex-col items-end justify-center leading-tight cursor-pointer transition-colors backdrop-blur-md text-gray-900 dark:text-gray-100">
            <span className="text-sm font-semibold tracking-wider text-shadow-sm">{time}</span>
            <span className="text-[10px] opacity-90">{date}</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {startMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-white/60 dark:bg-[#1c1c1c]/70 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-3xl z-[150] flex flex-col shadow-2xl overflow-hidden select-none"
            onClick={e => e.stopPropagation()}
          >
            {/* Start Menu Search Bar */}
            <div className="px-8 pt-8 pb-4">
              <div className="w-full bg-white/50 dark:bg-black/30 backdrop-blur-md border border-white/50 dark:border-gray-600/50 rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm focus-within:bg-white/80 dark:focus-within:bg-black/50 focus-within:ring-2 ring-indigo-500/50 transition-all">
                <Search size={18} className="text-gray-500" />
                <input type="text" placeholder="Search apps, settings, and documents..." className="bg-transparent outline-none flex-1 text-sm text-gray-800 dark:text-gray-200 font-medium placeholder-gray-500/70" />
              </div>
            </div>

            {/* Pinned Apps Grid */}
            <div className="px-8 py-4 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold text-gray-800 dark:text-gray-300 tracking-wider">Pinned</h3>
                <button className="text-xs bg-white/30 dark:bg-white/10 px-3 py-1 rounded-full border border-white/20 hover:bg-white/50 transition-colors shadow-sm">All apps &gt;</button>
              </div>

              <div className="grid grid-cols-5 gap-y-8 gap-x-2 text-center">
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
                ].map((app, index) => (
                  <motion.div
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    key={app.id}
                    onClick={() => { if (app.id === 'linkedin') window.open(RESUME_DATA.linkedin, '_blank'); else openWindow(app.id); }}
                    className="flex flex-col items-center gap-3 p-2 hover:bg-white/30 dark:hover:bg-white/10 rounded-2xl cursor-pointer transition-colors"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-white/40 dark:bg-black/20 shadow-sm border border-white/30 dark:border-white/10 rounded-xl drop-shadow-sm">
                      {app.icon}
                    </div>
                    <span className="text-[11px] font-medium text-gray-800 dark:text-gray-300 truncate w-full">{app.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom User Area */}
            <div className="h-16 bg-white/40 dark:bg-black/30 border-t border-white/30 dark:border-white/10 flex items-center justify-between px-8 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <img src="https://api.dicebear.com/7.x/initials/svg?seed=VF&backgroundColor=0ea5e9" alt="User" className="w-8 h-8 rounded-full shadow-sm border border-white/50" />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{RESUME_DATA.name}</span>
              </div>
              <button onClick={() => { setStartMenuOpen(false); onLogout(); }} className="w-8 h-8 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors" title="Power / Log Out">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0" /><line x1="12" y1="2" x2="12" y2="12" /></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}