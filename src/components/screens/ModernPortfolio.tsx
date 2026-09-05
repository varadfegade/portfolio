"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Mail, Github, MapPin } from "lucide-react";

// ─── DESIGN TOKENS (warm-neutral editorial palette) ──────────────────────────
// --linen:      #F4F1EA  — warm sand base background
// --linen-2:    #EAE6DC  — slightly deeper panel bg
// --ink:        #1C1E21  — deep charcoal primary text (high legibility)
// --ink-2:      #4A4A4A  — secondary text
// --ink-3:      #888580  — meta / caption text
// --terracotta: #B85C38  — warm accent (links, highlights)
// --terra-soft: rgba(184,92,56,0.10) — amber-tinted hover fill
// --sage:       #5E7A63  — secondary accent
// --frame:      #FFFFFF  — image card white border/bg
// --border:     rgba(28,30,33,0.12) — neutral hairline

// ─── STYLES ──────────────────────────────────────────────────────────────────
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,600;1,400;1,600&display=swap');

    .pf-root {
      --linen:      #F4F1EA;
      --linen-2:    #EAE6DC;
      --linen-3:    #DDD9CF;
      --ink:        #1C1E21;
      --ink-2:      #4A4A4A;
      --ink-3:      #8C8780;
      --terracotta: #B85C38;
      --terra-soft: rgba(184,92,56,0.09);
      --sage:       #5E7A63;
      --sage-soft:  rgba(94,122,99,0.10);
      --frame:      #FFFFFF;
      --border:     rgba(28,30,33,0.11);
      --shadow-sm:  0 2px 12px rgba(28,30,33,0.07);
      --shadow-md:  0 8px 40px rgba(28,30,33,0.10);

      background-color: var(--linen);
      color: var(--ink);
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      -webkit-font-smoothing: antialiased;
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }

    /* ── Canvas dot-grid layer ── */
    #pf-canvas {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      opacity: 1;
    }

    /* ── Floating nav ── */
    .pf-nav {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 200;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 8px;
      background: rgba(244,241,234,0.82);
      border: 2px solid #ffffff;
      border-radius: 18px;
      box-shadow: 0 12px 36px rgba(0,0,0,0.85), 0 0 24px rgba(255,255,255,0.35);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
    }

    .pf-nav-btn {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: var(--ink-2);
      background: transparent;
      border: 1px solid transparent;
      border-radius: 12px;
      padding: 6px 14px;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: color 0.18s ease, background 0.18s ease, border-color 0.18s ease;
      white-space: nowrap;
      letter-spacing: -0.01em;
    }
    .pf-nav-btn:hover {
      color: var(--ink);
      background: rgba(28,30,33,0.05);
      border-color: var(--border);
    }
    .pf-nav-sep {
      width: 1px;
      height: 18px;
      background: var(--border);
      flex-shrink: 0;
      margin: 0 4px;
    }
    .pf-nav-cta {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12.5px;
      font-weight: 600;
      letter-spacing: 0.01em;
      color: #fff;
      background: var(--terracotta);
      border: none;
      border-radius: 12px;
      padding: 7px 18px;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: opacity 0.18s ease, transform 0.12s ease;
      box-shadow: 0 2px 12px rgba(184,92,56,0.3);
    }
    .pf-nav-cta:hover { opacity: 0.88; transform: scale(0.97); }

    /* ── Hero layout ── */
    .pf-hero {
      position: relative;
      z-index: 1;
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      align-items: center;
      padding: 140px 80px 80px;
      max-width: 1360px;
      margin: 0 auto;
    }
    @media (max-width: 960px) {
      .pf-hero { grid-template-columns: 1fr; padding: 120px 28px 60px; gap: 48px; }
    }

    /* ── Image art-card frame ── */
    .pf-frame-outer {
      position: relative;
      display: flex;
      justify-content: center;
    }
    .pf-frame {
      position: relative;
      width: 100%;
      max-width: 400px;
      aspect-ratio: 3 / 4;
      background: var(--frame);
      border: 2px solid #FFFFFF;
      border-radius: 20px;
      box-shadow:
        0 0 0 1px rgba(28,30,33,0.08),
        0 24px 64px rgba(28,30,33,0.15),
        0 4px 12px rgba(28,30,33,0.08);
      overflow: hidden;
    }
    /* Offset shadow card for depth */
    .pf-frame::before {
      content: '';
      position: absolute;
      inset: -12px;
      z-index: -1;
      border-radius: 28px;
      background: var(--linen-2);
      border: 1px solid var(--border);
      transform: rotate(-2deg);
      box-shadow: var(--shadow-sm);
    }
    .pf-frame-inner {
      width: 100%;
      height: 100%;
      background: linear-gradient(165deg, #E8E0D2 0%, #CEC5B5 50%, #BEB4A4 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    /* Subtle texture lines inside frame */
    .pf-frame-inner::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 40px,
        rgba(255,255,255,0.06) 40px,
        rgba(255,255,255,0.06) 41px
      );
    }
    .pf-monogram {
      font-family: 'Lora', Georgia, serif;
      font-size: clamp(80px, 14vw, 130px);
      font-weight: 600;
      color: rgba(28,30,33,0.12);
      line-height: 1;
      letter-spacing: -0.04em;
      user-select: none;
      position: relative;
      z-index: 1;
    }
    .pf-frame-badge {
      position: absolute;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 18px;
      background: rgba(255,255,255,0.75);
      border: 1px solid rgba(28,30,33,0.08);
      border-radius: 999px;
      backdrop-filter: blur(12px);
      white-space: nowrap;
      box-shadow: 0 2px 16px rgba(28,30,33,0.08);
    }
    .pf-badge-dot {
      width: 8px; height: 8px;
      background: var(--sage);
      border-radius: 50%;
      box-shadow: 0 0 0 3px rgba(94,122,99,0.2);
    }
    .pf-badge-txt {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12px;
      font-weight: 600;
      color: var(--ink);
      letter-spacing: 0.01em;
    }

    /* ── Hero text ── */
    .pf-hero-tag {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--terracotta);
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 22px;
    }
    .pf-hero-tag::before {
      content: '';
      display: block;
      width: 28px;
      height: 1.5px;
      background: var(--terracotta);
      flex-shrink: 0;
    }

    .pf-hero-h1 {
      font-family: 'Lora', Georgia, serif;
      font-size: clamp(48px, 6.5vw, 88px);
      font-weight: 600;
      line-height: 1.05;
      letter-spacing: -0.03em;
      color: var(--ink);
      margin: 0 0 6px;
    }
    .pf-hero-h1-outline {
      font-family: 'Lora', Georgia, serif;
      font-size: clamp(48px, 6.5vw, 88px);
      font-weight: 400;
      font-style: italic;
      line-height: 1.05;
      letter-spacing: -0.03em;
      color: transparent;
      -webkit-text-stroke: 1.5px rgba(28,30,33,0.4);
      margin: 0 0 32px;
    }
    .pf-hero-desc {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.85;
      color: var(--ink-2);
      max-width: 420px;
      margin: 0 0 40px;
    }

    /* ── CTA row ── */
    .pf-cta-row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
    .pf-btn-primary {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.01em;
      color: #fff;
      background: var(--ink);
      border: none;
      border-radius: 999px;
      padding: 13px 28px;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: background 0.2s ease, transform 0.12s ease;
    }
    .pf-btn-primary:hover { background: var(--terracotta); transform: scale(0.98); }
    .pf-btn-secondary {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: var(--ink-2);
      background: transparent;
      border: 1.5px solid var(--border);
      border-radius: 999px;
      padding: 12px 24px;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: border-color 0.2s, color 0.2s, background 0.2s;
    }
    .pf-btn-secondary:hover { border-color: var(--ink-2); color: var(--ink); background: rgba(28,30,33,0.04); }

    /* ── Marquee ── */
    .pf-marquee-shell {
      position: relative;
      z-index: 1;
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      background: var(--linen-2);
      overflow: hidden;
    }
    .pf-marquee-shell::before,
    .pf-marquee-shell::after {
      content: '';
      position: absolute;
      top: 0; bottom: 0;
      width: 100px;
      z-index: 2;
      pointer-events: none;
    }
    .pf-marquee-shell::before { left: 0; background: linear-gradient(90deg, var(--linen-2), transparent); }
    .pf-marquee-shell::after  { right: 0; background: linear-gradient(-90deg, var(--linen-2), transparent); }
    .pf-marquee-track {
      display: flex;
      width: max-content;
      animation: pfScroll 32s linear infinite;
    }
    .pf-marquee-track:hover { animation-play-state: paused; }
    @keyframes pfScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .pf-marquee-item {
      font-family: 'Lora', serif;
      font-style: italic;
      font-size: 19px;
      font-weight: 400;
      color: var(--ink-3);
      padding: 16px 28px;
      flex-shrink: 0;
      transition: color 0.2s;
    }
    .pf-marquee-item:hover { color: var(--ink); }
    .pf-marquee-sep {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 9px;
      color: var(--terracotta);
      padding: 16px 6px;
      flex-shrink: 0;
      line-height: 1.8;
      opacity: 0.7;
    }

    /* ── Sections ── */
    .pf-section {
      position: relative;
      z-index: 1;
      max-width: 1360px;
      margin: 0 auto;
      padding: 100px 80px;
    }
    @media (max-width: 960px) { .pf-section { padding: 72px 28px; } }

    .pf-section-label {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 56px;
    }
    .pf-section-label-txt {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--terracotta);
    }
    .pf-section-label-line {
      flex: 1;
      height: 1px;
      background: var(--border);
    }

    /* ── About grid ── */
    .pf-about-grid {
      display: grid;
      grid-template-columns: 58% 42%;
      gap: 0;
      border: 1px solid var(--border);
      border-radius: 20px;
      overflow: hidden;
      background: var(--frame);
      box-shadow: var(--shadow-sm);
    }
    @media (max-width: 960px) { .pf-about-grid { grid-template-columns: 1fr; } }
    .pf-about-left { padding: 52px; border-right: 1px solid var(--border); }
    .pf-about-right { padding: 52px; background: var(--linen-2); }
    .pf-about-right-heading {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--ink-3);
      margin-bottom: 28px;
    }
    .pf-serif-quote {
      font-family: 'Lora', Georgia, serif;
      font-style: italic;
      font-size: clamp(22px, 2.5vw, 34px);
      line-height: 1.35;
      color: var(--ink);
      margin-bottom: 28px;
    }
    .pf-serif-quote em { color: var(--terracotta); font-style: normal; font-weight: 600; }

    /* ── Education ── */
    .pf-edu-item { padding: 20px 0; border-bottom: 1px solid var(--border); }
    .pf-edu-item:last-child { border-bottom: none; }
    .pf-edu-yr { font-family: 'Plus Jakarta Sans', monospace; font-size: 11px; letter-spacing: 0.12em; color: var(--terracotta); margin-bottom: 6px; text-transform: uppercase; }
    .pf-edu-school { font-family: 'Lora', serif; font-size: 18px; font-weight: 600; color: var(--ink); margin-bottom: 4px; }
    .pf-edu-score { font-size: 13px; color: var(--ink-3); }
    .pf-edu-score span { color: var(--sage); font-weight: 600; }

    /* ── Tech pills ── */
    .pf-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; }
    .pf-pill {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12px; font-weight: 500;
      padding: 5px 14px;
      border: 1px solid var(--border);
      border-radius: 999px;
      color: var(--ink-2);
      background: var(--linen);
      transition: border-color 0.2s, color 0.2s, background 0.2s;
    }
    .pf-pill:hover { border-color: var(--terracotta); color: var(--terracotta); background: var(--terra-soft); }

    /* ── Projects ── */
    .pf-proj-list { display: flex; flex-direction: column; }
    .pf-proj-row {
      display: grid;
      grid-template-columns: 64px 1fr auto;
      gap: 0;
      border-bottom: 1px solid var(--border);
      align-items: stretch;
      text-decoration: none;
      color: inherit;
      transition: background 0.2s;
    }
    .pf-proj-row:hover { background: var(--frame); }
    .pf-proj-num {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 36px 0;
      font-family: 'Plus Jakarta Sans', monospace;
      font-size: 12px;
      font-weight: 600;
      color: var(--ink-3);
      border-right: 1px solid var(--border);
      transition: color 0.2s;
    }
    .pf-proj-row:hover .pf-proj-num { color: var(--terracotta); }
    .pf-proj-body { padding: 36px 40px; border-right: 1px solid var(--border); }
    .pf-proj-title {
      font-family: 'Lora', serif;
      font-size: clamp(20px, 2.2vw, 28px);
      font-weight: 600;
      color: var(--ink);
      margin-bottom: 10px;
      transition: color 0.2s;
    }
    .pf-proj-row:hover .pf-proj-title { color: var(--terracotta); }
    .pf-proj-desc { font-size: 14px; color: var(--ink-2); line-height: 1.75; margin-bottom: 16px; max-width: 560px; }
    .pf-tag {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 11px; font-weight: 500;
      padding: 3px 10px;
      border: 1px solid var(--border);
      border-radius: 6px;
      color: var(--ink-3);
      display: inline-block;
      margin-right: 6px;
      margin-bottom: 4px;
      background: var(--linen);
    }
    .pf-proj-row:hover .pf-tag { border-color: rgba(184,92,56,0.3); }
    .pf-proj-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 36px;
    }
    .pf-arrow-btn {
      width: 44px; height: 44px;
      border: 1.5px solid var(--border);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: var(--ink-3);
      transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.15s;
    }
    .pf-proj-row:hover .pf-arrow-btn {
      border-color: var(--terracotta);
      color: var(--terracotta);
      background: var(--terra-soft);
      transform: rotate(45deg);
    }

    /* ── Contact ── */
    .pf-contact-inner {
      background: var(--ink);
      border-radius: 24px;
      padding: 80px 64px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      box-shadow: var(--shadow-md);
      position: relative;
      overflow: hidden;
    }
    .pf-contact-inner::before {
      content: '';
      position: absolute;
      top: -60px; right: -60px;
      width: 280px; height: 280px;
      border-radius: 50%;
      background: rgba(184,92,56,0.08);
      pointer-events: none;
    }
    .pf-contact-h2 {
      font-family: 'Lora', serif;
      font-size: clamp(34px, 4.5vw, 60px);
      font-weight: 600;
      color: #fff;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin-bottom: 18px;
    }
    .pf-contact-h2 em { color: var(--terracotta); font-style: italic; }
    .pf-contact-sub { font-size: 15px; color: rgba(255,255,255,0.55); line-height: 1.8; max-width: 440px; margin-bottom: 40px; }

    /* ── Footer ── */
    .pf-footer {
      position: relative; z-index: 1;
      border-top: 1px solid var(--border);
      padding: 24px 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    @media (max-width: 960px) { .pf-footer { padding: 20px 28px; flex-direction: column; gap: 12px; } }
    .pf-footer-copy { font-size: 13px; color: var(--ink-3); }
    .pf-footer-copy b { color: var(--terracotta); font-weight: 600; }

    /* ── Scroll reveal ── */
    .pf-r { opacity: 0; transform: translateY(24px); transition: opacity 0.65s ease, transform 0.65s ease; }
    .pf-r.pf-in { opacity: 1; transform: none; }
    .pf-r.d1 { transition-delay: 0.08s; }
    .pf-r.d2 { transition-delay: 0.16s; }
    .pf-r.d3 { transition-delay: 0.24s; }
    .pf-r.d4 { transition-delay: 0.32s; }
  `}</style>
);

// ─── INTERACTIVE DOT-GRID CANVAS ─────────────────────────────────────────────
function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);

  const draw = useRef<() => void>(() => {});

  draw.current = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const SPACING = 36;
    const COLS = Math.ceil(W / SPACING) + 1;
    const ROWS = Math.ceil(H / SPACING) + 1;
    const MAX_INFLUENCE = 130;
    const MAX_SCALE = 3.2;

    ctx.clearRect(0, 0, W, H);

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const bx = c * SPACING;
        const by = r * SPACING;

        const dx = bx - mx;
        const dy = by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / MAX_INFLUENCE);
        const scale = 1 + (MAX_SCALE - 1) * (proximity * proximity);

        const radius = 1.2 * scale;
        const alpha = 0.13 + proximity * 0.42;

        ctx.beginPath();
        ctx.arc(bx, by, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(28,30,33,${alpha})`;
        ctx.fill();
      }
    }

    rafRef.current = requestAnimationFrame(draw.current);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      mouseRef.current = { x: -999, y: -999 };
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    rafRef.current = requestAnimationFrame(draw.current);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  return <canvas ref={canvasRef} id="pf-canvas" aria-hidden="true" />;
}

// ─── REVEAL HOOK ──────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".pf-r");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("pf-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ onBack }: { onBack: () => void }) {
  return (
    <motion.nav
      role="navigation"
      aria-label="Portfolio navigation"
      className="pf-nav"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <button onClick={onBack} className="pf-nav-btn">
        <ArrowLeft size={13} strokeWidth={2.5} />
        OS Mode
      </button>
      <div className="pf-nav-sep" />
      {["About", "Projects", "Contact"].map((l) => (
        <a key={l} href={`#${l.toLowerCase()}`} className="pf-nav-btn">
          {l}
        </a>
      ))}
      <div className="pf-nav-sep" />
      <a href="mailto:varadfegade@gmail.com" className="pf-nav-cta">
        Hire Me <ArrowUpRight size={13} strokeWidth={2.5} />
      </a>
    </motion.nav>
  );
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
function SkillMarquee() {
  const items = [
    "React", "Next.js 14", "TypeScript", "MERN Stack",
    "Node.js", "Express", "MongoDB", "C++", "Tailwind CSS",
    "REST APIs", "Git", "Vercel",
  ];
  const all = [...items, ...items];

  return (
    <div className="pf-marquee-shell" role="marquee" aria-label="Skills">
      <div className="pf-marquee-track">
        {all.map((item, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center" }}>
            <span className="pf-marquee-item">{item}</span>
            <span className="pf-marquee-sep" aria-hidden="true">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Parallax layers
  const frameY  = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const bgBlobY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  return (
    <header ref={ref} className="pf-hero">
      {/* Parallax soft blob behind frame */}
      <motion.div
        style={{ y: bgBlobY }}
        aria-hidden="true"
        className="pf-frame-outer"
      >
        {/* Subtle blob */}
        <div
          style={{
            position: "absolute",
            top: "-60px", left: "-40px",
            width: "340px", height: "340px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(184,92,56,0.09) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Art-card frame */}
        <motion.div style={{ y: frameY, position: "relative", zIndex: 1, width: "100%" }}>
          <motion.div
            className="pf-frame"
            initial={{ opacity: 0, x: -40, rotate: -3 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pf-frame-inner">
              <p className="pf-monogram" aria-label="VF initials">VF</p>
            </div>
            <div className="pf-frame-badge" aria-label="Availability status">
              <span className="pf-badge-dot" />
              <span className="pf-badge-txt">Open to Opportunities</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Text column */}
      <motion.div style={{ y: textY }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="pf-hero-tag">
            Full-Stack Developer · Pune, India
          </p>

          <h1 className="pf-hero-h1">Varad</h1>
          <p className="pf-hero-h1-outline" aria-label="Fegade">Fegade</p>

          <p className="pf-hero-desc">
            B.E. Computer Engineering at PCCOER · 9.42 CGPA.
            I ship production-grade web apps — clean REST APIs, optimised React renders,
            and zero fluff in the commit log. 3+ live projects running right now.
          </p>

          <div className="pf-cta-row">
            <a href="#projects" className="pf-btn-primary">
              View Projects <ArrowUpRight size={15} strokeWidth={2.5} />
            </a>
            <a href="mailto:varadfegade@gmail.com" className="pf-btn-secondary">
              <Mail size={14} strokeWidth={2} /> Say Hello
            </a>
          </div>
        </motion.div>
      </motion.div>
    </header>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="pf-section" aria-labelledby="about-heading">
      <div className="pf-section-label pf-r">
        <span className="pf-section-label-txt">§ 01 — About</span>
        <div className="pf-section-label-line" />
      </div>

      <div className="pf-about-grid pf-r">
        <div className="pf-about-left">
          <p className="pf-serif-quote" id="about-heading">
            &ldquo;Architecture first.{" "}
            <em>Abstractions</em> second.&rdquo;
          </p>
          <p style={{ fontSize: "15px", lineHeight: 1.85, color: "var(--ink-2)", marginBottom: "18px" }}>
            Second-year CE student at PCCOER, Pune. I write code that runs in production —
            clean REST contracts, optimized React render cycles, zero fluff in the commit log.
            Every project on this page is accessible via a real URL right now.
          </p>
          <p style={{ fontSize: "15px", lineHeight: 1.85, color: "var(--ink-2)", marginBottom: "28px" }}>
            Currently exploring LLM-backed web services — how to embed them without blowing up
            token budgets or breaking existing API contracts.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {["EN", "HI", "MR"].map((l) => (
              <span key={l} className="pf-pill" style={{ fontWeight: 600 }}>{l}</span>
            ))}
          </div>

          <div className="pf-pills">
            {["React", "Next.js 14", "Node.js", "MongoDB", "TypeScript", "C++"].map((t) => (
              <span key={t} className="pf-pill">{t}</span>
            ))}
          </div>
        </div>

        <div className="pf-about-right">
          <p className="pf-about-right-heading">Education</p>
          {[
            { yr: "2024 – Ongoing", school: "PCCOER — SPPU", deg: "B.E. Computer Engineering", score: "9.42 CGPA", hot: true },
            { yr: "2022 – 2024", school: "Matoshri Jr. College", deg: "HSC · Science", score: "79.83%", hot: false },
            { yr: "2022", school: "K. Narkhede Vidyalaya", deg: "SSC", score: "94.00%", hot: false },
          ].map((e, i) => (
            <article key={i} className="pf-edu-item">
              <div className="pf-edu-yr">{e.yr}</div>
              <div className="pf-edu-school">{e.school}</div>
              <div className="pf-edu-score">
                {e.deg} ·{" "}
                <span style={{ color: e.hot ? "var(--terracotta)" : "var(--sage)" }}>
                  {e.score}
                </span>
              </div>
            </article>
          ))}

          <div style={{ marginTop: "36px", paddingTop: "28px", borderTop: "1px solid var(--border)" }}>
            <p className="pf-about-right-heading" style={{ marginBottom: "16px" }}>Find Me</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <a
                href="https://github.com/varadfegade"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  fontSize: "13px", fontWeight: 500,
                  color: "var(--ink-2)", textDecoration: "none",
                  padding: "7px 14px",
                  border: "1px solid var(--border)", borderRadius: "999px",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--terracotta)"; e.currentTarget.style.color = "var(--terracotta)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--ink-2)"; }}
              >
                <Github size={14} /> GitHub
              </a>
              <a
                href="mailto:varadfegade@gmail.com"
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  fontSize: "13px", fontWeight: 500,
                  color: "var(--ink-2)", textDecoration: "none",
                  padding: "7px 14px",
                  border: "1px solid var(--border)", borderRadius: "999px",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--terracotta)"; e.currentTarget.style.color = "var(--terracotta)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--ink-2)"; }}
              >
                <MapPin size={14} /> Pune, India
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "SignLingo",
    desc: "Real-time sign language interpreter. WebRTC-compatible. Bridges ASL/ISL gestures into text streams for live video calls — no plugin required.",
    tags: ["Computer Vision", "WebRTC", "React.js", "Accessibility"],
    status: "LIVE",
    url: "https://varadfegade.github.io/signLanguageProject/",
  },
  {
    title: "Smart Parking",
    desc: "Pre-booking slot reservation engine with O(1) vehicle retrieval. Eliminates congestion at scale. Persistent state via MongoDB, deployed on Render.",
    tags: ["MERN Stack", "MongoDB", "Express.js"],
    status: "LIVE",
    url: "https://parking-management-3p2t.onrender.com",
  },
  {
    title: "CodeCraft 2K26",
    desc: "Official platform for PCCOER coding club. Handles event publishing, schedule management, and member registration. Zero-downtime deploys on Vercel edge.",
    tags: ["Next.js 14", "TypeScript", "Vercel"],
    status: "DEPLOYED",
    url: "https://codecarft-x-pccoer.vercel.app/",
  },
];

function Projects() {
  return (
    <section id="projects" className="pf-section" aria-labelledby="projects-heading">
      <div className="pf-section-label pf-r">
        <span className="pf-section-label-txt">§ 02 — Projects</span>
        <div className="pf-section-label-line" />
      </div>
      <h2
        id="projects-heading"
        style={{
          fontFamily: "'Lora', serif",
          fontSize: "clamp(28px, 3.5vw, 42px)",
          fontWeight: 600,
          color: "var(--ink)",
          marginBottom: "40px",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}
        className="pf-r"
      >
        Selected Works
      </h2>

      <div
        className="pf-proj-list pf-r"
        style={{ border: "1px solid var(--border)", borderRadius: "20px", overflow: "hidden", background: "var(--frame)", boxShadow: "var(--shadow-sm)" }}
      >
        {PROJECTS.map((p, i) => (
          <a
            key={p.title}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pf-proj-row"
            aria-label={`${p.title} — ${p.status}`}
          >
            <div className="pf-proj-num" aria-hidden="true">0{i + 1}</div>
            <div className="pf-proj-body">
              <h3 className="pf-proj-title">{p.title}</h3>
              <p className="pf-proj-desc">{p.desc}</p>
              <div>
                {p.tags.map((t) => <span key={t} className="pf-tag">{t}</span>)}
                <span className="pf-tag" style={{ borderColor: "rgba(94,122,99,0.4)", color: "var(--sage)" }}>
                  {p.status}
                </span>
              </div>
            </div>
            <div className="pf-proj-arrow" aria-hidden="true">
              <div className="pf-arrow-btn">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="pf-section" aria-labelledby="contact-heading">
      <div className="pf-section-label pf-r">
        <span className="pf-section-label-txt">§ 03 — Contact</span>
        <div className="pf-section-label-line" />
      </div>

      <div className="pf-contact-inner pf-r">
        <h2 id="contact-heading" className="pf-contact-h2">
          Let&apos;s build something <br />
          <em>remarkable</em>.
        </h2>
        <p className="pf-contact-sub">
          Currently open to new roles — full-time, freelance, or just an interesting conversation.
          I respond to every email.
        </p>
        <a href="mailto:varadfegade@gmail.com" className="pf-btn-primary" style={{ background: "var(--terracotta)", boxShadow: "0 4px 24px rgba(184,92,56,0.35)" }}>
          varadfegade@gmail.com <Mail size={15} strokeWidth={2.5} />
        </a>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ onBack }: { onBack: () => void }) {
  return (
    <footer className="pf-footer" role="contentinfo">
      <p className="pf-footer-copy">
        © {new Date().getFullYear()} <b>Varad Fegade</b> · Built with Next.js
      </p>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <a href="https://github.com/varadfegade" target="_blank" rel="noopener noreferrer"
          style={{ fontSize: "13px", color: "var(--ink-3)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
        >
          GitHub
        </a>
        <button
          onClick={onBack}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "13px", fontWeight: 500,
            color: "var(--ink-2)", background: "transparent",
            border: "1px solid var(--border)", borderRadius: "999px",
            padding: "6px 16px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "6px",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--terracotta)"; e.currentTarget.style.color = "var(--terracotta)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--ink-2)"; }}
        >
          <ArrowLeft size={13} /> Return to OS
        </button>
      </div>
    </footer>
  );
}

// ─── ROOT EXPORT ──────────────────────────────────────────────────────────────
export default function ModernPortfolio({ onBack }: { onBack: () => void }) {
  useReveal();

  return (
    <div className="pf-root">
      <Styles />
      <DotGrid />
      <Navbar onBack={onBack} />

      <main role="main">
        <Hero />
        <SkillMarquee />
        <About />
        <Projects />
        <Contact />
      </main>

      <Footer onBack={onBack} />
    </div>
  );
}