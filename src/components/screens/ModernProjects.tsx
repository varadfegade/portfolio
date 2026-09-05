"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Code2, CheckCircle2, Eye, Car, X, Sparkles, ExternalLink } from "lucide-react";

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  tech: { name: string; icon?: string }[];
  points: string[];
  liveLink?: string;
  githubLink?: string;
  bgColor: string; // Exact hex color from Image 1
  badge: string;
  mockupType: "signlingo" | "attension" | "autospace" | "quiz" | "generator" | "planner";
}

// 6 Projects: First 3 updated with user's key projects, remaining 3 preserved
const projects: ProjectData[] = [
  {
    id: "signlingo",
    title: "SignLingo",
    subtitle: "MediaPipe, MERN Stack",
    description: "Real-time computer vision web app translating sign language into text, resolving communication barriers across online platforms.",
    image: "/images/projects/Project1.png",
    tech: [
      { name: "MediaPipe", icon: "/images/stack/NextJsCircle.png" },
      { name: "React", icon: "/images/stack/React.png" },
      { name: "Node.js", icon: "/images/stack/NodeJs.svg" },
      { name: "Express", icon: "/images/stack/Express.png" },
      { name: "MongoDB", icon: "/images/stack/MongoDB.svg" },
    ],
    points: [
      "Engineered a real-time computer vision web app to translate sign language into text, resolving communication barriers for hearing and speech-impaired users across online platforms.",
      "Architected a frontend interface with a state-based history mechanism, optimizing temporary data retrieval without backend storage.",
      "Secured formalized intellectual property rights (Copyright Diary: LD-40782/2025-CO) for proprietary processing architecture.",
    ],
    liveLink: "https://sign-lingo-jade.vercel.app/",
    githubLink: "https://github.com",
    bgColor: "#BC5E29", // Card 1: Terracotta / Orange
    badge: "Computer Vision & AI · Copyright Protected",
    mockupType: "signlingo",
  },
  {
    id: "attension-os",
    title: "AttensionOS",
    subtitle: "Browser APIs, Visual Detection Logic",
    description: "Privacy-first browser extension continuously monitoring user presence and dynamically obscuring sensitive viewport data from unauthorized viewers.",
    image: "/images/projects/Project2.png",
    tech: [
      { name: "Browser APIs", icon: "/images/stack/Javascript.svg" },
      { name: "React", icon: "/images/stack/React.png" },
      { name: "TypeScript", icon: "/images/stack/Typescript.svg" },
      { name: "Tailwind", icon: "/images/stack/Tailwind.png" },
    ],
    points: [
      "Developed a privacy-first browser extension to continuously monitor user presence and dynamically obscure sensitive viewport data from unauthorized viewers.",
      "Implemented visual detection algorithms that trigger automated screen-blurring protocols immediately upon threat detection.",
      "Optimized client-side execution for low-latency threat response within the browser, bolstering end-user digital trust.",
    ],
    liveLink: "https://attension-os.vercel.app/",
    githubLink: "https://github.com",
    bgColor: "#48A1B2", // Card 2: Ocean Teal / Cyan
    badge: "Privacy & Threat Detection",
    mockupType: "attension",
  },
  {
    id: "autospace",
    title: "AutoSpace (Smart Parking)",
    subtitle: "Node.js, Express, React",
    description: "Full-stack smart infrastructure web app enabling advance slot reservations to streamline large-scale parking operations and mitigate congestion.",
    image: "/images/projects/Project3.png",
    tech: [
      { name: "React", icon: "/images/stack/React.png" },
      { name: "Node.js", icon: "/images/stack/NodeJs.svg" },
      { name: "Express", icon: "/images/stack/Express.png" },
      { name: "Chart.js", icon: "/images/stack/ChartJs.svg" },
      { name: "MongoDB", icon: "/images/stack/MongoDB.svg" },
    ],
    points: [
      "Architected a full-stack smart infrastructure web app enabling advance slot reservations to streamline large-scale parking operations.",
      "Engineered an advanced backend paired with a precise vehicle retrieval module, significantly improving spatial efficiency and mitigating congestion.",
      "Designed an administrative dashboard for real-time capacity monitoring and dynamic slot allocation workflows.",
    ],
    liveLink: "https://parking-management-co2t.vercel.app/",
    githubLink: "https://github.com",
    bgColor: "#553AC2", // Card 3: Deep Electric Purple
    badge: "Smart Infrastructure & IoT",
    mockupType: "autospace",
  },
  {
    id: "quiz-arena",
    title: "Quiz Arena",
    subtitle: "JS, TypeScript, Framer Motion",
    description: "Gamified multiplayer trivia battleground featuring algorithmic adaptive difficulty, animated scoreboards, and instant feedback.",
    image: "/images/projects/Project4.png",
    tech: [
      { name: "TypeScript", icon: "/images/stack/Javascript.svg" },
      { name: "React", icon: "/images/stack/React.png" },
      { name: "Redux", icon: "/images/stack/Redux.svg" },
      { name: "CSS", icon: "/images/stack/CSS.png" },
    ],
    points: [
      "Real-time synchronized countdown timers with anti-cheat verification.",
      "Adaptive ELO matchmaking engine processing 5k+ concurrent games.",
    ],
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    bgColor: "#B94265", // Card 4: Crimson Berry Rose
    badge: "Interactive & Gaming",
    mockupType: "quiz",
  },
  {
    id: "generator",
    title: "AI Generator",
    subtitle: "JS, Node, Python, Docker",
    description: "Automated developer CLI and web scaffolding suite that generates production-grade microservice boilerplates in seconds.",
    tech: [
      { name: "Docker", icon: "/images/stack/Docker.svg" },
      { name: "Node.js", icon: "/images/stack/NodeJs.svg" },
      { name: "Bash", icon: "/images/stack/Bash.svg" },
      { name: "Github", icon: "/images/stack/Github.svg" },
    ],
    points: [
      "Dynamic abstract syntax tree generation for microservices.",
      "Embedded container health checks and deployment scripts.",
    ],
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    bgColor: "#C5A126", // Card 5: Golden Ochre / Mustard
    badge: "DevOps & CLI",
    mockupType: "generator",
  },
  {
    id: "planner",
    title: "Smart Planner",
    subtitle: "JS, Bootstrap, PostgreSQL",
    description: "Enterprise work schedule organizer featuring timeline Gantt charts, drag-and-drop resource leveling, and automated shift coordination.",
    tech: [
      { name: "Bootstrap", icon: "/images/stack/Bootstrap.svg" },
      { name: "Node.js", icon: "/images/stack/NodeJs.svg" },
      { name: "React", icon: "/images/stack/React.png" },
      { name: "MongoDB", icon: "/images/stack/MongoDB.svg" },
    ],
    points: [
      "Multi-tier role management with automated shift clash prevention.",
      "Exportable PDF/CSV reporting pipelines with instant sync.",
    ],
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    bgColor: "#3150C7", // Card 6: Electric Cobalt Blue
    badge: "Enterprise SaaS",
    mockupType: "planner",
  },
];

export default function ModernProjects() {
  const [modalProject, setModalProject] = useState<ProjectData | null>(null);

  return (
    <section id="work" className="relative z-10 w-full pt-8 sm:pt-10 pb-8 sm:pb-9 px-6 sm:px-10 md:px-12 max-w-[1280px] mx-auto">
      {/* Section Header: Centered horizontally with reduced space around */}
      <header className="mb-5 sm:mb-6 flex flex-col items-center text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#445D48]/30 border border-[#445D48]/60 text-[#D6CC99] text-xs font-semibold tracking-wider uppercase mb-1.5">
          <span className="w-2 h-2 rounded-full bg-[#48A1B2] animate-pulse" />
          Featured Engineering
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#FDE5D4] mb-1.5">
          Featured Projects<span className="text-[#D6CC99]">.</span>
        </h2>
        <p className="text-[#D6CC99]/80 text-xs sm:text-sm leading-relaxed max-w-lg">
          Tactile, high-contrast flashcards inspired by physical exhibition boards. 
          Each card features bespoke engineering details and interactive preview frames.
        </p>
      </header>

      {/* 2-Column Responsive Grid (Clean rectangular flashcard design preserved) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12, margin: "-40px" }}
            transition={{ duration: 0.75, delay: (index % 2) * 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectFlashcard
              project={project}
              index={index}
              onOpenDetails={() => setModalProject(project)}
            />
          </motion.div>
        ))}
      </div>

      {/* Small Window / Modal Popup for "Read More" info */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalProject(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full rounded-2xl bg-[#042035] border border-[#D6CC99]/40 p-6 sm:p-8 shadow-2xl cursor-default overflow-hidden text-left"
              style={{
                boxShadow: `0 20px 60px rgba(0,0,0,0.7), 0 0 30px ${modalProject.bgColor}40`,
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setModalProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badge & Title */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: modalProject.bgColor }}
                >
                  {modalProject.badge}
                </span>
                <span className="text-xs font-mono text-[#D6CC99]">
                  {modalProject.subtitle}
                </span>
              </div>

              {/* Project Screenshot Preview */}
              {modalProject.image && (
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 border border-white/20 bg-black shadow-xl">
                  <img
                    src={modalProject.image}
                    alt={modalProject.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
              )}

              <h3 className="text-2xl sm:text-3xl font-black text-[#FDE5D4] mb-3 leading-tight">
                {modalProject.title}
              </h3>

              <p className="text-sm text-[#D6CC99]/90 leading-relaxed mb-5">
                {modalProject.description}
              </p>

              {/* Full Bullet Points from Resume */}
              <div className="space-y-2.5 mb-6 p-4 rounded-xl bg-[#001524]/70 border border-[#445D48]/40">
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#D6CC99]/80 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#BC5E29]" /> Key Engineering Achievements
                </h4>
                {modalProject.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#FDE5D4] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="mb-6">
                <span className="text-xs text-[#D6CC99]/70 font-semibold block mb-2">Technologies Used:</span>
                <div className="flex flex-wrap gap-2">
                  {modalProject.tech.map((t) => (
                    <span
                      key={t.name}
                      className="px-2.5 py-1 rounded-lg bg-[#001524] border border-[#445D48]/60 text-xs font-medium text-[#FDE5D4] flex items-center gap-1.5"
                    >
                      {t.icon && <img src={t.icon} alt="" className="w-3.5 h-3.5 object-contain" />}
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#445D48]/40">
                {modalProject.liveLink && (
                  <a
                    href={modalProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold text-xs sm:text-sm shadow-lg transition-all"
                    style={{ backgroundColor: modalProject.bgColor }}
                  >
                    Open Live App <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {modalProject.githubLink && (
                  <a
                    href={modalProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#001524] border border-white/20 text-white font-medium text-xs sm:text-sm transition-all"
                  >
                    <Github className="w-3.5 h-3.5" /> View Code
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Laptop Mockup Screen Visuals Tailored to Each Project
───────────────────────────────────────────── */
function LaptopMockup({
  type,
  title,
  image,
}: {
  type: ProjectData["mockupType"];
  title: string;
  image?: string;
}) {
  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[320px] mx-auto aspect-[16/10] flex flex-col items-center justify-end select-none">
      {/* Laptop Lid / Screen Frame */}
      <div className="relative w-full h-[88%] bg-[#1c1d22] rounded-t-xl p-2 pb-1 shadow-2xl border border-neutral-700/80 flex flex-col overflow-hidden">
        {/* Camera notch / dot */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-neutral-800 border border-neutral-600/50 z-20" />
        
        {/* Screen Bezel & Display */}
        <div className="relative w-full flex-1 bg-[#0b0c10] rounded-t-md overflow-hidden border border-neutral-800/80 p-2 flex flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-20" />

          {/* Top miniature app navigation bar */}
          <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-[8px] text-neutral-400">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-1 font-mono text-[7px] text-neutral-300 truncate max-w-[110px]">{title}</span>
            </div>
            <span className="text-[7px] text-emerald-400 font-mono flex items-center gap-0.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> Live
            </span>
          </div>

          {/* Dynamic Mockup Body */}
          <div className="flex-1 my-1 rounded bg-[#13151c]/90 border border-white/5 p-1 flex flex-col justify-center relative overflow-hidden">
            {image ? (
              <div className="w-full h-full relative overflow-hidden rounded-xs">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
              </div>
            ) : (
              <>
                {type === "signlingo" && (
              <div className="w-full h-full relative flex flex-col justify-between p-1">
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#BC5E29_1px,transparent_1px)] [background-size:8px_8px]" />
                <div className="flex items-center justify-between text-[7px] font-mono text-orange-300 z-10">
                  <span>CV: MediaPipe 30FPS</span>
                  <span className="px-1 py-0.2 rounded bg-orange-500/30 text-orange-200">Hand Detected</span>
                </div>
                
                <div className="relative z-10 my-auto flex flex-col items-center justify-center">
                  <div className="p-1 rounded-lg bg-orange-950/50 border border-orange-500/40 text-[7.5px] text-white font-mono text-center shadow-md">
                    <span className="text-orange-300">Detected: </span>
                    <strong className="text-white">&quot;Hello World&quot;</strong>
                  </div>
                  <span className="text-[6.5px] text-neutral-400 mt-0.5">Accuracy: 98.4%</span>
                </div>

                <div className="w-full h-1 bg-orange-500/20 rounded-full overflow-hidden z-10">
                  <div className="w-4/5 h-full bg-orange-400 rounded-full" />
                </div>
              </div>
            )}

            {type === "attension" && (
              <div className="w-full h-full flex flex-col justify-between text-[7px] p-1 font-mono">
                <div className="flex justify-between items-center text-cyan-300">
                  <span className="font-bold flex items-center gap-1">
                    <Eye className="w-2.5 h-2.5 text-cyan-400" /> Attension Monitor
                  </span>
                  <span className="text-emerald-400 text-[6.5px]">Active Shield</span>
                </div>
                
                <div className="my-auto p-1.5 rounded bg-cyan-950/40 border border-cyan-500/30 flex flex-col gap-1">
                  <div className="flex justify-between text-[6.5px] text-neutral-300">
                    <span>Viewer Status:</span>
                    <span className="text-cyan-200 font-bold">Authorized User</span>
                  </div>
                  <div className="flex justify-between text-[6.5px] text-neutral-300">
                    <span>Threat Protocol:</span>
                    <span className="text-emerald-300 font-bold">Auto-Blur Armed</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1 text-[6px] text-center">
                  <div className="bg-white/5 rounded p-0.5 text-cyan-300">Latency: 12ms</div>
                  <div className="bg-white/5 rounded p-0.5 text-emerald-300">Privacy: 100%</div>
                </div>
              </div>
            )}

            {type === "autospace" && (
              <div className="w-full h-full flex flex-col justify-between p-1 text-[7px] font-mono">
                <div className="flex items-center justify-between border-b border-white/10 pb-0.5 text-purple-300">
                  <span className="flex items-center gap-1 font-bold">
                    <Car className="w-2.5 h-2.5 text-purple-400" /> AutoSpace Admin
                  </span>
                  <span className="text-emerald-400 text-[6.5px]">86% Capacity</span>
                </div>

                <div className="grid grid-cols-4 gap-1 py-1">
                  <div className="bg-emerald-500/30 border border-emerald-400/40 rounded p-0.5 text-center text-[6px] text-emerald-300">A1 [Free]</div>
                  <div className="bg-red-500/30 border border-red-400/40 rounded p-0.5 text-center text-[6px] text-red-300">A2 [Busy]</div>
                  <div className="bg-red-500/30 border border-red-400/40 rounded p-0.5 text-center text-[6px] text-red-300">A3 [Busy]</div>
                  <div className="bg-emerald-500/30 border border-emerald-400/40 rounded p-0.5 text-center text-[6px] text-emerald-300">A4 [Free]</div>
                </div>

                <div className="flex justify-between items-center text-[6.5px] text-neutral-400 pt-0.5">
                  <span>Slot B-14: Reserved</span>
                  <span className="text-purple-300">Fast Retrieval Active</span>
                </div>
              </div>
            )}

            {type === "quiz" && (
              <div className="w-full h-full flex flex-col justify-between p-1 text-[7px] font-mono">
                <div className="flex justify-between items-center text-rose-300 font-bold">
                  <span>Battle Arena: Q8/10</span>
                  <span className="text-yellow-400">00:04.2s</span>
                </div>
                <div className="space-y-1 my-auto">
                  <div className="p-1 rounded bg-rose-950/60 border border-rose-500/30 text-white text-[7px]">
                    What is the time complexity of QuickSort?
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[6.5px]">
                    <div className="bg-emerald-950/60 border border-emerald-400/50 p-0.5 rounded text-emerald-200">A: O(N log N) ✓</div>
                    <div className="bg-white/5 p-0.5 rounded text-neutral-300">B: O(N²)</div>
                  </div>
                </div>
              </div>
            )}

            {type === "generator" && (
              <div className="w-full h-full flex flex-col justify-between text-[7px] font-mono p-1">
                <div className="flex items-center gap-1 text-yellow-300 border-b border-white/10 pb-0.5">
                  <span>$ agy scaffold microservice</span>
                </div>
                <div className="space-y-0.5 text-[6.5px] my-auto">
                  <p className="text-emerald-300">✔ Resolving AST modules...</p>
                  <p className="text-yellow-200">✔ Dockerfile injected</p>
                  <p className="text-neutral-400">⚡ Build time: 1.14s</p>
                </div>
                <div className="w-full h-1 bg-yellow-500/20 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-yellow-400 rounded-full" />
                </div>
              </div>
            )}

            {type === "planner" && (
              <div className="w-full h-full flex flex-col justify-between p-1 text-[7px] font-mono">
                <div className="flex justify-between items-center text-blue-300">
                  <span className="font-bold">Team Timeline</span>
                  <span className="text-neutral-400">Oct 2026</span>
                </div>
                <div className="space-y-1 my-auto">
                  <div className="flex items-center gap-1 text-[6.5px]">
                    <span className="w-7 text-neutral-400">Dev Sprint</span>
                    <div className="flex-1 h-2 bg-blue-500/40 border border-blue-400/50 rounded flex items-center px-1 text-[6px] text-white">In Progress</div>
                  </div>
                  <div className="flex items-center gap-1 text-[6.5px]">
                    <span className="w-7 text-neutral-400">QA Audit</span>
                    <div className="w-1/2 h-2 bg-indigo-500/30 border border-indigo-400/40 rounded flex items-center px-1 text-[6px] text-neutral-300">Scheduled</div>
                  </div>
                </div>
              </div>
            )}
              </>
            )}
          </div>
        </div>

        {/* Laptop Keyboard Base */}
        <div className="w-full h-2.5 bg-[#25262c] rounded-b-md border-t border-neutral-600/50 flex justify-center items-center shadow-md">
          <div className="w-8 h-0.5 bg-neutral-500/50 rounded-full" />
        </div>
      </div>
      
      <div className="w-3/4 h-2 bg-black/40 blur-md rounded-full mt-0.5" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Individual Tactile Flashcard Component
   (Exact rectangular design preserved)
───────────────────────────────────────────── */
function ProjectFlashcard({
  project,
  index,
  onOpenDetails,
}: {
  project: ProjectData;
  index: number;
  onOpenDetails: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full pt-5 sm:pt-6 overflow-visible group h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Number: Smoothly emerges from flashcard peeking slightly outside top border */}
      <div
        className="absolute font-black select-none pointer-events-none z-30 tracking-tighter transition-all duration-700 ease-out"
        style={{
          fontSize: "clamp(4.5rem, 11vw, 6.75rem)",
          lineHeight: 0.75,
          top: isHovered ? "4px" : "26px",
          right: isHovered ? "14px" : "22px",
          opacity: isHovered ? 1 : 0.22,
          transform: isHovered ? "scale(1.10)" : "scale(0.95)",
          color: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
          filter: isHovered ? "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.75))" : "none",
        }}
      >
        0{index + 1}
      </div>

      {/* Inner Card Container with Rounded Corners (Rectangular format) */}
      <article
        className="relative w-full flex-1 rounded-[2rem] p-6 sm:p-7 md:p-8 shadow-2xl overflow-hidden transition-all duration-700 ease-out hover:-translate-y-2 cursor-default flex flex-col justify-between"
        style={{
          backgroundColor: project.bgColor, // Exact color from Image 1
          boxShadow: isHovered 
            ? `0 25px 50px -12px ${project.bgColor}80, 0 0 35px ${project.bgColor}50`
            : `0 15px 35px -10px rgba(0, 0, 0, 0.4)`,
        }}
      >
        {/* User reference animation: background sweep wipe with relaxed duration */}
        <div
          className={`absolute inset-0 pointer-events-none z-0 transition-transform duration-1000 ease-out origin-left ${
            isHovered ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
          style={{
            background: "linear-gradient(45deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.08))",
          }}
        />

        {/* Fluorescent Light Sweep Hover Effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ x: "-120%" }}
              animate={{ x: "120%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.7, ease: "easeInOut" }}
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.28) 50%, transparent 100%)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Content Layout: Left text details, Right laptop frame with tech icons underneath */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center min-h-[250px] transition-transform duration-700 ease-out group-hover:scale-[1.01]">
          {/* Left column: Text details (expanded description space without tech icons) */}
          <div className="sm:col-span-7 flex flex-col justify-between gap-3">
            {/* Badge & Subtitle */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-white/90 text-xs sm:text-sm font-semibold italic tracking-wide">
                {project.subtitle}
              </span>
            </div>

            {/* Project Title (bold white) */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              {project.title}
            </h3>

            {/* Expanded 3-Line Description */}
            <p className="text-white/95 text-xs sm:text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>

            {/* Action CTAs: Live App & Read More (Code button removed as requested, no button zoom issue) */}
            <div className="flex items-center gap-2.5 pt-2 flex-wrap">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wipe-card inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/30 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                >
                  Live App <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              )}

              {/* Read More button opening details popup */}
              <button
                onClick={onOpenDetails}
                className="btn-wipe-card inline-flex items-center gap-1 px-4 py-2 rounded-full bg-black/20 text-white font-medium text-xs sm:text-sm border border-white/30 backdrop-blur-xs transition-all cursor-pointer"
              >
                Read More
              </button>
            </div>
          </div>

          {/* Right column: Laptop Mockup + Techstack Icons underneath */}
          <div className="sm:col-span-5 flex flex-col items-center justify-center py-2 gap-2">
            <motion.div
              animate={isHovered ? { scale: 1.04, rotate: -1 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full"
            >
              <LaptopMockup type={project.mockupType} title={project.title} image={project.image} />
            </motion.div>

            {/* Tech stack icons moved below the mockup image as requested */}
            <div className="flex items-center justify-center gap-1.5 pt-1 flex-wrap">
              {project.tech.map((t) => (
                <div
                  key={t.name}
                  title={t.name}
                  className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-black/30 backdrop-blur-xs border border-white/30 text-white shadow-xs hover:scale-115 transition-transform duration-300"
                >
                  {t.icon ? (
                    <img src={t.icon} alt={t.name} className="w-3.5 h-3.5 object-contain filter brightness-110" />
                  ) : (
                    <Code2 className="w-3 h-3" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
