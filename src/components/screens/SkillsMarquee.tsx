"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Layers,
  Terminal,
  Database,
  Palette,
  Cpu,
  CheckCircle2,
  Activity,
  Server,
  Cloud,
  Code2,
  Workflow,
  Zap,
} from "lucide-react";

export interface SkillItem {
  name: string;
  category: "frontend" | "backend" | "devops" | "ui-tools";
  icon: string;
  level: "Expert" | "Advanced" | "Intermediate";
  proficiency: number; // 0 - 100%
  tag: string;
  invert?: boolean;
  accentColor: string;
}

// 22 Verified production-grade skills
export const ALL_SKILLS: SkillItem[] = [
  // ── Frontend Core ──
  {
    name: "React 19",
    category: "frontend",
    icon: "/images/stack/React.png",
    level: "Expert",
    proficiency: 95,
    tag: "Hooks & Component Trees",
    accentColor: "#48A1B2",
  },
  {
    name: "Next.js 15",
    category: "frontend",
    icon: "/images/stack/NextJsCircle.png",
    level: "Expert",
    proficiency: 94,
    tag: "App Router & SSR Hydration",
    accentColor: "#FDE5D4",
  },
  {
    name: "TypeScript",
    category: "frontend",
    icon: "/images/stack/Typescript.svg",
    level: "Advanced",
    proficiency: 92,
    tag: "Strict Generics & Type Safety",
    accentColor: "#3150C7",
  },
  {
    name: "JavaScript",
    category: "frontend",
    icon: "/images/stack/Javascript.svg",
    level: "Expert",
    proficiency: 96,
    tag: "ES2024 & Asynchronous APIs",
    accentColor: "#C5A126",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    icon: "/images/stack/Tailwind.png",
    level: "Expert",
    proficiency: 95,
    tag: "Modern Design Token Systems",
    accentColor: "#48A1B2",
  },
  {
    name: "Redux Toolkit",
    category: "frontend",
    icon: "/images/stack/Redux.svg",
    level: "Advanced",
    proficiency: 88,
    tag: "Global State Management",
    accentColor: "#553AC2",
  },
  {
    name: "HTML5",
    category: "frontend",
    icon: "/images/stack/HTML.png",
    level: "Expert",
    proficiency: 98,
    tag: "Semantic Structure & WCAG A11y",
    accentColor: "#BC5E29",
  },
  {
    name: "CSS3 / Sass",
    category: "frontend",
    icon: "/images/stack/Saas.svg",
    level: "Advanced",
    proficiency: 92,
    tag: "Fluid Grid & Micro-Animations",
    accentColor: "#B94265",
  },

  // ── Backend & Database ──
  {
    name: "Node.js",
    category: "backend",
    icon: "/images/stack/NodeJs.svg",
    level: "Advanced",
    proficiency: 90,
    tag: "V8 Event-Driven Architecture",
    accentColor: "#445D48",
  },
  {
    name: "Express.js",
    category: "backend",
    icon: "/images/stack/Express.png",
    level: "Advanced",
    proficiency: 90,
    tag: "RESTful Endpoints & Middleware",
    invert: true,
    accentColor: "#D6CC99",
  },
  {
    name: "MongoDB",
    category: "backend",
    icon: "/images/stack/MongoDB.svg",
    level: "Advanced",
    proficiency: 88,
    tag: "Document Models & Indexing",
    accentColor: "#445D48",
  },
  {
    name: "GraphQL",
    category: "backend",
    icon: "/images/stack/Graphql.svg",
    level: "Intermediate",
    proficiency: 82,
    tag: "Declarative Schema Resolvers",
    accentColor: "#B94265",
  },

  // ── DevOps & Cloud ──
  {
    name: "Docker",
    category: "devops",
    icon: "/images/stack/Docker.svg",
    level: "Advanced",
    proficiency: 88,
    tag: "Multi-Stage Container Builds",
    accentColor: "#48A1B2",
  },
  {
    name: "Kubernetes",
    category: "devops",
    icon: "/images/stack/K8s.svg",
    level: "Intermediate",
    proficiency: 78,
    tag: "Cluster Pod Orchestration",
    accentColor: "#3150C7",
  },
  {
    name: "Git",
    category: "devops",
    icon: "/images/stack/Git.svg",
    level: "Expert",
    proficiency: 95,
    tag: "GitFlow & Branch Management",
    accentColor: "#BC5E29",
  },
  {
    name: "GitHub Actions",
    category: "devops",
    icon: "/images/stack/Github.svg",
    level: "Expert",
    proficiency: 92,
    tag: "Automated CI/CD Workflows",
    invert: true,
    accentColor: "#FDE5D4",
  },
  {
    name: "Vercel",
    category: "devops",
    icon: "/images/stack/Vercel.svg",
    level: "Expert",
    proficiency: 94,
    tag: "Edge Runtime Deployments",
    invert: true,
    accentColor: "#D6CC99",
  },
  {
    name: "Bash / Shell",
    category: "devops",
    icon: "/images/stack/Bash.svg",
    level: "Intermediate",
    proficiency: 82,
    tag: "System Scripting & Automation",
    invert: true,
    accentColor: "#445D48",
  },

  // ── UI / Visual Systems ──
  {
    name: "Chart.js",
    category: "ui-tools",
    icon: "/images/stack/ChartJs.svg",
    level: "Advanced",
    proficiency: 88,
    tag: "Interactive Canvas Telemetry",
    accentColor: "#BC5E29",
  },
  {
    name: "Material UI",
    category: "ui-tools",
    icon: "/images/stack/MaterialUI.svg",
    level: "Advanced",
    proficiency: 86,
    tag: "Enterprise Design Libraries",
    accentColor: "#48A1B2",
  },
  {
    name: "Bootstrap 5",
    category: "ui-tools",
    icon: "/images/stack/Bootstrap.svg",
    level: "Advanced",
    proficiency: 89,
    tag: "Responsive Grid Layouts",
    accentColor: "#553AC2",
  },
  {
    name: "CSS Architecture",
    category: "ui-tools",
    icon: "/images/stack/CSS.png",
    level: "Expert",
    proficiency: 96,
    tag: "CSS Grid & Flexbox Systems",
    accentColor: "#3150C7",
  },
];

const CATEGORY_TABS = [
  { id: "all", label: "Full Arsenal", count: ALL_SKILLS.length, icon: <Layers className="w-3.5 h-3.5" /> },
  { id: "frontend", label: "Frontend", count: 8, icon: <Cpu className="w-3.5 h-3.5" /> },
  { id: "backend", label: "Backend & DB", count: 4, icon: <Database className="w-3.5 h-3.5" /> },
  { id: "devops", label: "DevOps & Cloud", count: 6, icon: <Terminal className="w-3.5 h-3.5" /> },
  { id: "ui-tools", label: "UI & Visuals", count: 4, icon: <Palette className="w-3.5 h-3.5" /> },
] as const;

/* ─────────────────────────────────────────────
   1. Moving Tech Strip Component (Above Projects)
   (Dual parallel strips moving in opposite directions, spaced 7.5mm apart)
───────────────────────────────────────────── */
export function MovingTechStrip() {
  return (
    <div className="relative w-full overflow-hidden pt-4 pb-6 select-none gpu-layer">
      {/* Background ambient gradient aura */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div 
          className="w-full h-32 blur-3xl opacity-30"
          style={{
            background: "linear-gradient(90deg, #445D48 0%, #5E3023 35%, #D6CC99 65%, #445D48 100%)",
          }}
        />
      </div>

      {/* Two parallel strips with exact 7.5mm (~28px) vertical spacing */}
      <div className="relative z-10 w-full flex flex-col gap-[7.5mm]">
        {/* ── Strip 1: Moving Left ── */}
        <div className="relative w-full py-3.5 sm:py-4 bg-[#042035]/85 backdrop-blur-xl border-y border-[#445D48]/40 shadow-xl overflow-hidden">
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-20 sm:w-40 z-20"
            style={{ background: "linear-gradient(to right, #001524, transparent)" }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-20 sm:w-40 z-20"
            style={{ background: "linear-gradient(to left, #001524, transparent)" }}
          />

          <div className="flex w-fit select-none">
            <div className="marquee-track">
              {ALL_SKILLS.map((skill, i) => (
                <div
                  key={`track1-${skill.name}-${i}`}
                  className="flex-shrink-0 flex items-center justify-center select-none"
                  title={skill.name}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className={`w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain transition-all duration-300 ease-out cursor-pointer hover:drop-shadow-[0_0_12px_rgba(253,229,212,0.6)] ${
                      skill.invert ? "filter invert brightness-125" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
            <div className="marquee-track" aria-hidden="true">
              {ALL_SKILLS.map((skill, i) => (
                <div
                  key={`track1-dup-${skill.name}-${i}`}
                  className="flex-shrink-0 flex items-center justify-center select-none"
                  title={skill.name}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className={`w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain transition-all duration-300 ease-out cursor-pointer hover:drop-shadow-[0_0_12px_rgba(253,229,212,0.6)] ${
                      skill.invert ? "filter invert brightness-125" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Strip 2: Moving Right (Opposite Direction, spaced 7-8mm) ── */}
        <div className="relative w-full py-3.5 sm:py-4 bg-[#042035]/85 backdrop-blur-xl border-y border-[#445D48]/40 shadow-xl overflow-hidden">
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-20 sm:w-40 z-20"
            style={{ background: "linear-gradient(to right, #001524, transparent)" }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-20 sm:w-40 z-20"
            style={{ background: "linear-gradient(to left, #001524, transparent)" }}
          />

          <div className="flex w-fit select-none">
            <div className="marquee-track-reverse">
              {[...ALL_SKILLS].reverse().map((skill, i) => (
                <div
                  key={`track2-${skill.name}-${i}`}
                  className="flex-shrink-0 flex items-center justify-center select-none"
                  title={skill.name}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className={`w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain transition-all duration-300 ease-out cursor-pointer hover:drop-shadow-[0_0_12px_rgba(253,229,212,0.6)] ${
                      skill.invert ? "filter invert brightness-125" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
            <div className="marquee-track-reverse" aria-hidden="true">
              {[...ALL_SKILLS].reverse().map((skill, i) => (
                <div
                  key={`track2-dup-${skill.name}-${i}`}
                  className="flex-shrink-0 flex items-center justify-center select-none"
                  title={skill.name}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className={`w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain transition-all duration-300 ease-out cursor-pointer hover:drop-shadow-[0_0_12px_rgba(253,229,212,0.6)] ${
                      skill.invert ? "filter invert brightness-125" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   2. RAPID-SCAN ARCHITECTURAL SKILLS MATRIX
   (Clean layout with continuous corner-to-corner shine repeating every 2s)
───────────────────────────────────────────── */
export function SkillsMatrix() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredSkills = ALL_SKILLS.filter((s) =>
    activeTab === "all" ? true : s.category === activeTab
  );

  return (
    <section id="skills" className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 md:px-12 pt-8 sm:pt-10 pb-7 sm:pb-8 select-none gpu-layer">
      {/* ── Header: Centered & High Contrast with Reduced Vertical Space ── */}
      <div className="flex flex-col items-center text-center gap-1.5 mb-4 sm:mb-5 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#445D48]/35 border border-[#445D48]/60 text-[#D6CC99] text-xs font-semibold uppercase tracking-wider mb-1 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#D6CC99]" />
          Technical Stack &amp; Core Fluency
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#FDE5D4]">
          Skills &amp; Capabilities<span className="text-[#D6CC99]">.</span>
        </h2>

        <p className="text-xs sm:text-sm text-[#D6CC99]/85 max-w-md">
          Production-tested technologies across frontend reactive architecture, backend data pipelines, and DevOps infrastructure.
        </p>

        {/* ── Category Filter Navigation (No button zoom) ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#5E3023] text-[#FDE5D4] border border-[#FDE5D4]/60 shadow-lg"
                  : "bg-[#042035] text-[#D6CC99] hover:bg-[#445D48]/40 hover:text-[#FDE5D4] border border-[#445D48]/50"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeTab === tab.id
                    ? "bg-black/40 text-white"
                    : "bg-[#001524] text-[#D6CC99]/70"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Architectural Telemetry Status Ribbon ── */}
      <div className="mb-5 p-3 rounded-2xl bg-[#042035] border border-[#445D48]/60 flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-[#D6CC99] shadow-lg">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-amber-300" />
          <span>Architecture: <strong className="text-[#FDE5D4]">Next.js 15 &amp; React 19</strong></span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Type Strictness: <strong className="text-emerald-400">Strict TypeScript</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-[#48A1B2]" />
          <span>Execution: <strong className="text-[#FDE5D4]">60FPS Zero Jank</strong></span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Workflow className="w-3.5 h-3.5 text-[#BC5E29]" />
          <span>Cloud CI/CD: <strong className="text-[#D6CC99]">Automated Containers</strong></span>
        </div>
      </div>

      {/* ── Instant-Scan 3-Column Rapid Technology Grid ── */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4"
      >
        <AnimatePresence>
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.35,
                delay: 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative rounded-xl bg-[#042035] border border-[#445D48]/60 hover:border-[#D6CC99] p-3.5 sm:p-4 shadow-lg transition-all duration-300 group overflow-hidden cursor-default hover:shadow-[0_12px_28px_rgba(0,0,0,0.6),0_0_15px_rgba(214,204,153,0.2)]"
            >
              {/* Corner Coordinate Plus Pin */}
              <div className="absolute top-1.5 right-1.5 text-[8px] font-mono text-[#445D48]/70 select-none pointer-events-none group-hover:text-[#D6CC99] transition-colors">+</div>

              {/* Ambient Left Accent Filament */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: skill.accentColor }}
              />

              {/* ── Continuous Shining Effect from Left Corner to Right Corner (Repeats every ~2s simultaneously on all tiles) ── */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl z-20">
                <div
                  className="absolute -inset-full w-[250%] h-[250%] anim-tile-shine pointer-events-none"
                  style={{
                    background: "linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.05) 45%, rgba(255, 255, 255, 0.40) 50%, rgba(255, 255, 255, 0.05) 55%, transparent 60%)",
                  }}
                />
              </div>

              <div className="flex items-center gap-3.5 relative z-10">
                {/* Framed Brand Icon Pod */}
                <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-[#001524] border border-[#445D48]/60 p-2 flex items-center justify-center shadow-inner group-hover:border-[#D6CC99] transition-colors">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className={`w-full h-full object-contain ${
                      skill.invert ? "invert brightness-125" : ""
                    }`}
                  />
                </div>

                {/* Info & Metrics (Clean restored display) */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-sm sm:text-base font-bold text-[#FDE5D4] group-hover:text-white transition-colors truncate">
                      {skill.name}
                    </h3>
                    
                    <span
                      className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: "rgba(0, 21, 36, 0.8)",
                        color: skill.accentColor,
                        border: `1px solid ${skill.accentColor}40`,
                      }}
                    >
                      {skill.level}
                    </span>
                  </div>

                  {/* Core Technical Specialty */}
                  <p className="text-[11px] text-[#D6CC99]/75 truncate font-medium">
                    {skill.tag}
                  </p>

                  {/* Animated Fluency Progress Filament */}
                  <div className="mt-2 w-full h-1.5 rounded-full bg-[#001524] border border-white/10 overflow-hidden flex items-center">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0 }}
                      className="h-full rounded-full anim-skill-filament"
                      style={{
                        background: `linear-gradient(90deg, ${skill.accentColor}80, ${skill.accentColor})`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
