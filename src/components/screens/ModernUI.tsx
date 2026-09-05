"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ModernProjects from './ModernProjects';
import { MovingTechStrip, SkillsMatrix } from './SkillsMarquee';
import { CertificationsSection, EducationSection, ContactSection } from './ModernInfoSections';
import ComputerMonitor from './ComputerMonitor';

/* ─────────────────────────────────────────
   Shared scroll-triggered reveal with zero-lag settings
───────────────────────────────────────── */
function RevealOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: '-20px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className="gpu-layer"
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Thin accent divider between sections
───────────────────────────────────────── */
function SectionDivider({ accent = "var(--theme-sage)" }: { accent?: string }) {
  return (
    <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 my-2">
      <div className="w-full h-px" style={{ background: `linear-gradient(to right, transparent, ${accent}50, transparent)` }} />
    </div>
  );
}

/* ─────────────────────────────────────────
   JavaScript Typewriter Animation Hook
───────────────────────────────────────── */
const TYPEWRITER_ROLES = [
  "Frontend Developer",
  "Full Stack Developer",
  "Software Engineer",
  "UI / UX Designer",
  "Web Developer",
];

function useTypewriter(words: string[], typingSpeed = 105, deletingSpeed = 60, pauseDuration = 1900) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[index % words.length];

    if (!isDeleting && subIndex === currentWord.length) {
      const pauseTimer = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timer = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [subIndex, index, isDeleting, words, typingSpeed, deletingSpeed, pauseDuration]);

  const currentWord = words[index % words.length];
  return currentWord.substring(0, subIndex);
}

/* ─────────────────────────────────────────
   Static Grid: Clearly Visible Globally (No Hover Effect)
───────────────────────────────────────── */
function StaticBackgroundGrid() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden gpu-layer opacity-70"
      style={{ contain: "strict" }}
    >
      <div
        className="w-full h-full pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(253, 224, 71, 0.85) 1.5px, transparent 0),
            linear-gradient(to right, rgba(214, 204, 153, 0.38) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(214, 204, 153, 0.38) 1px, transparent 1px)
          `,
          backgroundSize: "34px 34px",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Modern UI Shell
───────────────────────────────────────── */
export default function ModernUI({ onBack }: { onBack: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentRole = useTypewriter(TYPEWRITER_ROLES, 100, 60, 1900);

  return (
    <div
      ref={containerRef}
      className="modern-theme relative min-h-screen w-full overflow-x-hidden selection:bg-[var(--theme-chestnut)] selection:text-[var(--theme-peach)]"
    >
      {/* ── Dynamic Background (GPU Accelerated, Zero Scroll Lag) ───────── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#001524]">
        {/* Static Background Grid (Clearly visible, NO hovering effect) */}
        <StaticBackgroundGrid />

        {/* Ambient Atmospheres (No glow behind typewriter) */}
        <div
          className="absolute top-[38%] right-[6%] w-[460px] h-[460px] rounded-full pointer-events-none gpu-layer"
          style={{
            background: "radial-gradient(circle, rgba(94, 48, 35, 0.25) 0%, rgba(94, 48, 35, 0.08) 45%, transparent 70%)",
            transform: "translate3d(0, 0, 0)",
          }}
        />
        <div
          className="absolute bottom-[8%] left-[18%] w-[500px] h-[500px] rounded-full pointer-events-none gpu-layer"
          style={{
            background: "radial-gradient(circle, rgba(214, 204, 153, 0.18) 0%, rgba(214, 204, 153, 0.05) 45%, transparent 70%)",
            transform: "translate3d(0, 0, 0)",
          }}
        />
      </div>

      {/* ── Floating Navbar (Accurate Sequence: Work -> Certs -> Skills -> Education -> Contact) ── */}
      <motion.nav
        className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 max-w-[96vw] px-1 sm:px-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        <div
          className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#042035]/95 backdrop-blur-xl border-2 border-white rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_24px_rgba(255,255,255,0.35)] text-[11px] sm:text-xs md:text-sm font-medium text-[#FDE5D4] overflow-x-auto"
          style={{ border: "2px solid #ffffff" }}
        >
          <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full overflow-hidden border border-white/50 flex-shrink-0 shadow-xs mr-0.5">
            <img src="/images/userAsset/NavLogo.jpg" alt="Varad" className="w-full h-full object-cover" />
          </div>
          <button
            onClick={onBack}
            className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full hover:bg-[#445D48]/30 transition-colors text-[#D6CC99] flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#48A1B2]" />
            OS Mode
          </button>
          <div className="w-px h-3.5 sm:h-4 bg-[#445D48]/50 mx-0.5 sm:mx-1" />
          <a href="#work"           className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-[#445D48]/30 hover:text-[#FDE5D4] transition-colors whitespace-nowrap">Work</a>
          <a href="#certifications" className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-[#445D48]/30 hover:text-[#FDE5D4] transition-colors whitespace-nowrap">Certs</a>
          <a href="#skills"         className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-[#445D48]/30 hover:text-[#FDE5D4] transition-colors whitespace-nowrap">Skills</a>
          <a href="#education"      className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-[#445D48]/30 hover:text-[#FDE5D4] transition-colors whitespace-nowrap">Education</a>
          <a href="#contact"        className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-[#445D48]/30 hover:text-[#FDE5D4] transition-colors whitespace-nowrap">Contact</a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wipe-card ml-1 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[var(--theme-chestnut)] text-[#FDE5D4] transition-all font-semibold shadow-md whitespace-nowrap"
          >
            Resume
          </a>
        </div>
      </motion.nav>

      {/* ── Starting Hero Section (Reduced Padding, Clean Layout) ── */}
      <main className="relative z-10 pt-24 sm:pt-28 pb-6 sm:pb-8 px-6 sm:px-10 md:px-12 w-full max-w-[1280px] mx-auto min-h-[65vh] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full">
          {/* Left Column: Greeting, Stabilized Typewriter, Description & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start gap-4 sm:gap-5"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#FDE5D4]">
              Hi! Varad
            </h1>

            {/* Typewriter Line with Invariant Height (No layout shift) */}
            <div className="h-10 sm:h-12 md:h-14 lg:h-16 flex items-center whitespace-nowrap overflow-visible text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              <span className="text-[#FDE5D4] mr-2.5 sm:mr-3.5 select-none">
                I am a
              </span>
              <span className="text-[#4E45D5] font-black inline-flex items-center min-w-[180px] sm:min-w-[240px] md:min-w-[320px]">
                {currentRole}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
                  className="inline-block text-[#4E45D5] font-light ml-1 select-none"
                >
                  |
                </motion.span>
              </span>
            </div>

            <div className="text-sm sm:text-base md:text-lg text-[#D6CC99]/85 max-w-xl leading-relaxed space-y-1 font-normal pt-1">
              <p>I’m a software developer and here is my portfolio website.</p>
              <p>Here you’ll learn about my journey as a software developer.</p>
            </div>

            {/* Flashcard-style 'Hire me' CTA button (NO ZOOM JUMP ISSUE) */}
            <div className="pt-3 sm:pt-4">
              <a
                href="#contact"
                className="btn-wipe-card inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#BC5E29] text-white text-sm sm:text-base font-bold shadow-[0_8px_25px_rgba(188,94,41,0.4)] tracking-wide transition-all"
              >
                <span>Hire me</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Hyper-Realistic Studio Display Monitor */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:col-span-5 flex justify-center lg:justify-end w-full"
          >
            <ComputerMonitor onLaunchOS={onBack} />
          </motion.div>
        </div>
      </main>

      {/* ── Top Moving Marquee Strip (Above Projects) ── */}
      <MovingTechStrip />

      {/* ── 1. Projects Section (6 Flashcards with Read More Popups) ── */}
      <RevealOnScroll>
        <ModernProjects />
      </RevealOnScroll>

      {/* ── 2. Certifications Section (Exchanged Position: BEFORE Skills) ── */}
      <RevealOnScroll>
        <SectionDivider accent="var(--theme-sage)" />
        <CertificationsSection />
        <SectionDivider accent="var(--theme-sage)" />
      </RevealOnScroll>

      {/* ── 3. Skills Section (Exchanged Position: AFTER Certifications) ── */}
      <RevealOnScroll>
        <SkillsMatrix />
        <SectionDivider accent="var(--theme-sage)" />
      </RevealOnScroll>

      {/* ── 4. Education Section (Academic Dossier & Ledger Registry) ── */}
      <RevealOnScroll>
        <EducationSection />
      </RevealOnScroll>

      {/* ── 5. Contact Section & Footer ── */}
      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>
    </div>
  );
}
