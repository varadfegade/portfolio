"use client";

import React, { useState, useEffect, useRef } from "react";

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=Fira+Code:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:       #07080C;
      --bg2:      #0D0F18;
      --bg3:      #111420;
      --line:     #1A1E2E;
      --cream:    #EDE8DE;
      --dim:      #4A5068;
      --cyan:     #00E5FF;
      --coral:    #FF3D5A;
      --cyan-glow: rgba(0,229,255,0.18);
      --coral-glow: rgba(255,61,90,0.18);
      --f-display: 'Bebas Neue', sans-serif;
      --f-serif:   'DM Serif Display', serif;
      --f-mono:    'Fira Code', monospace;
    }

    html { scroll-behavior: smooth; }
    body {
      background: var(--bg);
      color: var(--cream);
      font-family: var(--f-mono);
      overflow-x: hidden;
      cursor: none;
    }

    /* CURSOR — crosshair style */
    #cur-h, #cur-v, #cur-dot {
      position: fixed; pointer-events: none; z-index: 9999; transition: opacity 0.2s;
    }
    #cur-h { height: 1px; width: 24px; background: var(--cyan); transform: translateY(-50%); }
    #cur-v { width: 1px;  height: 24px; background: var(--cyan); transform: translateX(-50%); }
    #cur-dot {
      width: 5px; height: 5px; background: var(--cyan); border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 8px 2px var(--cyan);
    }
    #cur-ring {
      position: fixed; pointer-events: none; z-index: 9998;
      width: 40px; height: 40px; border: 1px solid var(--cyan);
      border-radius: 0; /* square ring = brutal */
      transform: translate(-50%, -50%);
      opacity: 0.35; transition: width 0.15s, height 0.15s, opacity 0.2s;
    }

    /* SCROLLBAR */
    ::-webkit-scrollbar { width: 2px; }
    ::-webkit-scrollbar-thumb { background: var(--cyan); }
    ::-webkit-scrollbar-track { background: var(--bg); }

    /* NAV */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 200;
      display: flex; align-items: center; justify-content: space-between;
      padding: 18px 56px;
      background: rgba(7,8,12,0.85);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--line);
    }
    .n-logo {
      font-family: var(--f-display); font-size: 22px; letter-spacing: 0.12em;
      color: var(--cream); text-decoration: none;
    }
    .n-logo span { color: var(--cyan); }
    .n-links { display: flex; gap: 36px; list-style: none; align-items: center; }
    .n-link {
      font-size: 10px; letter-spacing: 0.18em; color: var(--dim);
      text-decoration: none; transition: color 0.2s; text-transform: uppercase;
      position: relative; cursor: none; background: transparent; border: none; font-family: var(--f-mono);
    }
    .n-link::after {
      content: ''; position: absolute; left: 0; bottom: -3px;
      width: 0; height: 1px; background: var(--cyan); transition: width 0.3s;
    }
    .n-link:hover { color: var(--cyan); }
    .n-link:hover::after { width: 100%; }
    .n-cta {
      font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.14em;
      color: var(--bg); background: var(--cyan); border: none;
      padding: 10px 22px; cursor: none; text-decoration: none;
      text-transform: uppercase; transition: all 0.2s;
      box-shadow: 0 0 16px rgba(0,229,255,0.3);
    }
    .n-cta:hover { background: var(--coral); box-shadow: 0 0 16px rgba(255,61,90,0.4); }

    /* SECTION */
    section { position: relative; }
    .wrap { padding: 100px 56px; }

    /* LABEL */
    .lbl {
      font-family: var(--f-mono); font-size: 9px; letter-spacing: 0.22em;
      color: var(--cyan); text-transform: uppercase;
      display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
    }
    .lbl-line { width: 32px; height: 1px; background: var(--cyan); }

    /* BIG NUM BG */
    .bnum {
      position: absolute; font-family: var(--f-display);
      font-size: clamp(180px, 22vw, 320px); color: var(--bg2);
      line-height: 1; pointer-events: none; user-select: none;
      z-index: 0; letter-spacing: -0.02em;
    }

    /* REVEAL */
    .r { opacity: 0; transform: translateY(36px) skewY(1deg); transition: opacity 0.65s ease, transform 0.65s ease; }
    .r.in { opacity: 1; transform: none; }
    .r.d1 { transition-delay: 0.08s; }
    .r.d2 { transition-delay: 0.16s; }
    .r.d3 { transition-delay: 0.24s; }
    .r.d4 { transition-delay: 0.32s; }

    /* MARQUEE */
    .marquee-wrap { overflow: hidden; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
    .marquee-track {
      display: flex; gap: 0; white-space: nowrap;
      animation: marquee 22s linear infinite;
    }
    .marquee-track:hover { animation-play-state: paused; }
    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .m-item {
      font-family: var(--f-display); font-size: 13px; letter-spacing: 0.14em;
      color: var(--dim); padding: 14px 28px; flex-shrink: 0;
      transition: color 0.2s;
    }
    .m-item:hover { color: var(--cyan); }
    .m-dot { color: var(--coral); padding: 14px 4px; font-size: 18px; flex-shrink: 0; line-height: 1.2; }

    /* HERO */
    .hero {
      min-height: 100vh; display: flex; flex-direction: column; justify-content: flex-end;
      padding: 0 56px 72px; background: var(--bg);
      border-bottom: 1px solid var(--line); overflow: hidden;
    }
    .hero-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(var(--line) 1px, transparent 1px),
        linear-gradient(90deg, var(--line) 1px, transparent 1px);
      background-size: 64px 64px;
      opacity: 0.6;
    }
    .hero-vignette {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at 20% 80%, rgba(0,229,255,0.04) 0%, transparent 50%),
                  radial-gradient(ellipse at 80% 20%, rgba(255,61,90,0.04) 0%, transparent 50%);
    }
    .hero-tag {
      font-family: var(--f-mono); font-size: 11px; letter-spacing: 0.15em;
      color: var(--dim); margin-bottom: 16px; position: relative; z-index: 1;
    }
    .hero-tag span { color: var(--cyan); }
    .h1-big {
      font-family: var(--f-display);
      font-size: clamp(80px, 15vw, 220px);
      line-height: 0.88; letter-spacing: 0.01em;
      color: var(--cream); position: relative; z-index: 1;
    }
    .h1-big .stroke {
      -webkit-text-stroke: 1px var(--cream);
      color: transparent;
    }
    .h1-big .glow {
      color: var(--cyan);
      text-shadow: 0 0 60px rgba(0,229,255,0.4), 0 0 120px rgba(0,229,255,0.15);
    }
    .hero-sub {
      display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
      margin-top: 48px; padding-top: 32px;
      border-top: 1px solid var(--line); position: relative; z-index: 1;
    }
    .hero-desc {
      font-family: var(--f-mono); font-size: 12px; color: var(--dim); line-height: 1.9;
    }
    .hero-stats { display: flex; gap: 40px; align-items: flex-end; justify-content: flex-end; }
    .hstat-v {
      font-family: var(--f-display); font-size: 52px; color: var(--cyan); line-height: 1;
      text-shadow: 0 0 30px rgba(0,229,255,0.35);
    }
    .hstat-l { font-size: 9px; letter-spacing: 0.15em; color: var(--dim); margin-top: 4px; }

    /* ABOUT */
    .about-grid {
      display: grid; grid-template-columns: 55% 45%; gap: 0;
      border: 1px solid var(--line); position: relative; z-index: 1;
    }
    .about-left { padding: 56px; border-right: 1px solid var(--line); }
    .about-right { padding: 56px; background: var(--bg2); }
    .serif-quote {
      font-family: var(--f-serif); font-style: italic;
      font-size: clamp(28px, 3.5vw, 46px); line-height: 1.3;
      color: var(--cream); margin-bottom: 32px;
    }
    .serif-quote em { color: var(--cyan); font-style: normal; }

    /* EDU ITEM */
    .edu-item {
      padding: 20px 0;
      border-bottom: 1px solid var(--line);
    }
    .edu-item:last-child { border-bottom: none; }
    .edu-yr { font-size: 9px; letter-spacing: 0.14em; color: var(--coral); margin-bottom: 6px; }
    .edu-school { font-family: var(--f-display); font-size: 20px; letter-spacing: 0.06em; color: var(--cream); }
    .edu-score {
      font-size: 10px; color: var(--dim); margin-top: 4px;
    }
    .edu-score span { color: var(--cyan); }

    /* STACK SECTION */
    .stack-section { background: var(--bg2); }
    .stack-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      border: 1px solid var(--line); position: relative; z-index: 1;
    }
    .stack-cell {
      padding: 28px 32px; border-right: 1px solid var(--line);
      border-bottom: 1px solid var(--line);
      transition: background 0.25s;
      position: relative; overflow: hidden;
    }
    .stack-cell:hover { background: var(--bg3); }
    .stack-cell::after {
      content: ''; position: absolute; left: 0; top: 0;
      width: 3px; height: 0; background: var(--cyan);
      transition: height 0.3s;
    }
    .stack-cell:hover::after { height: 100%; }
    .stack-cell:nth-child(3n) { border-right: none; }
    .stack-cell:nth-last-child(-n+3) { border-bottom: none; }
    .sc-cat {
      font-size: 9px; letter-spacing: 0.18em; color: var(--cyan);
      text-transform: uppercase; margin-bottom: 12px;
    }
    .sc-items { font-size: 11px; color: var(--dim); line-height: 2; }

    /* ORBIT */
    .orbit-wrap {
      position: relative; height: 480px; display: flex;
      align-items: center; justify-content: center;
      overflow: hidden;
    }
    .o-center {
      position: absolute; z-index: 10;
      width: 68px; height: 68px;
      border: 1px solid var(--cyan); border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 0 24px rgba(0,229,255,0.25), inset 0 0 16px rgba(0,229,255,0.08);
    }
    .o-center-txt { font-size: 8px; letter-spacing: 0.06em; color: var(--cyan); text-align: center; line-height: 1.5; }
    .o-ring {
      position: absolute; border-radius: 50%;
      border: 1px dashed var(--line);
      animation: ospin linear infinite;
    }
    @keyframes ospin { to { transform: rotate(360deg); } }
    .o-node {
      position: absolute; animation: ospin linear infinite reverse;
    }
    .o-pill {
      font-size: 9px; letter-spacing: 0.08em; white-space: nowrap;
      padding: 4px 10px; color: var(--dim);
      border: 1px solid var(--line); background: var(--bg2);
      transition: all 0.25s; cursor: none;
    }
    .o-pill:hover {
      color: var(--cyan); border-color: var(--cyan);
      box-shadow: 0 0 10px rgba(0,229,255,0.2);
    }

    /* PROJECTS */
    .proj-section { background: var(--bg); }
    .proj-list { display: flex; flex-direction: column; gap: 0; position: relative; z-index: 1; }
    .proj-item {
      display: grid; grid-template-columns: 80px 1fr 1fr auto;
      gap: 0; border: 1px solid var(--line); margin-bottom: -1px;
      transition: background 0.3s;
      position: relative; overflow: hidden;
    }
    .proj-item::before {
      content: ''; position: absolute; left: 0; top: 0;
      width: 0; height: 100%; background: var(--cyan-glow);
      transition: width 0.4s ease;
    }
    .proj-item:hover::before { width: 100%; }
    .proj-item:hover { border-color: var(--cyan); z-index: 2; }

    .proj-num {
      padding: 32px 24px;
      border-right: 1px solid var(--line);
      display: flex; align-items: flex-start; justify-content: center;
      font-family: var(--f-display); font-size: 28px; color: var(--line);
      transition: color 0.3s;
    }
    .proj-item:hover .proj-num { color: var(--cyan); }

    .proj-info { padding: 32px 36px; border-right: 1px solid var(--line); }
    .proj-title {
      font-family: var(--f-display); font-size: 32px; letter-spacing: 0.04em;
      color: var(--cream); line-height: 1; margin-bottom: 12px;
      transition: color 0.3s;
    }
    .proj-item:hover .proj-title { color: var(--cyan); }
    .proj-desc { font-size: 11px; color: var(--dim); line-height: 1.8; }

    .proj-tags {
      padding: 32px 36px; border-right: 1px solid var(--line);
      display: flex; flex-direction: column; justify-content: center; gap: 8px;
    }
    .tag {
      font-size: 9px; letter-spacing: 0.1em; padding: 4px 10px;
      border: 1px solid var(--line); color: var(--dim); display: inline-block;
      width: fit-content; transition: all 0.25s;
    }
    .proj-item:hover .tag { border-color: rgba(0,229,255,0.3); color: var(--cyan); }

    .proj-cta {
      padding: 32px 28px; display: flex;
      align-items: center; justify-content: center;
    }
    .arrow-btn {
      width: 48px; height: 48px; border: 1px solid var(--line);
      display: flex; align-items: center; justify-content: center;
      color: var(--dim); font-size: 18px; text-decoration: none;
      transition: all 0.25s; cursor: none;
    }
    .proj-item:hover .arrow-btn {
      border-color: var(--cyan); color: var(--cyan);
      box-shadow: 0 0 16px rgba(0,229,255,0.2);
    }

    /* CONTACT */
    .contact-section { background: var(--bg2); }
    .contact-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 0; border: 1px solid var(--line); position: relative; z-index: 1;
    }
    .c-left { padding: 56px; border-right: 1px solid var(--line); }
    .c-right { padding: 56px; }
    .c-heading {
      font-family: var(--f-display); font-size: clamp(42px, 6vw, 84px);
      line-height: 0.92; letter-spacing: 0.02em; color: var(--cream);
      margin-bottom: 28px;
    }
    .c-heading .hl { color: var(--coral); text-shadow: 0 0 40px rgba(255,61,90,0.3); }
    .c-body { font-size: 11px; color: var(--dim); line-height: 1.9; margin-bottom: 40px; }
    .c-link-row {
      display: flex; align-items: baseline; gap: 16px;
      padding: 14px 0; border-bottom: 1px solid var(--line);
    }
    .c-link-row:first-of-type { border-top: 1px solid var(--line); }
    .c-lbl { font-size: 9px; letter-spacing: 0.18em; color: var(--coral); min-width: 68px; }
    .c-val {
      font-size: 11px; color: var(--cream); text-decoration: none;
      transition: color 0.2s; cursor: none;
    }
    .c-val:hover { color: var(--cyan); }

    /* FORM */
    .f-group { margin-bottom: 28px; }
    .f-label { font-size: 9px; letter-spacing: 0.18em; color: var(--cyan); display: block; margin-bottom: 8px; }
    .f-input {
      width: 100%; background: var(--bg); border: 1px solid var(--line);
      font-family: var(--f-mono); font-size: 12px; color: var(--cream);
      padding: 12px 14px; outline: none; transition: border-color 0.2s; cursor: none;
    }
    .f-input:focus { border-color: var(--cyan); box-shadow: 0 0 12px rgba(0,229,255,0.1); }
    .f-input::placeholder { color: var(--dim); font-size: 10px; }
    .f-submit {
      font-family: var(--f-display); font-size: 18px; letter-spacing: 0.1em;
      color: var(--bg); background: var(--cyan); border: none;
      padding: 16px 36px; cursor: none; transition: all 0.25s;
      box-shadow: 0 0 24px rgba(0,229,255,0.25);
    }
    .f-submit:hover { background: var(--coral); box-shadow: 0 0 24px rgba(255,61,90,0.3); }
    .f-sent {
      height: 100%; display: flex; align-items: center; justify-content: center;
      flex-direction: column; gap: 12px; text-align: center;
    }
    .f-sent-h { font-family: var(--f-display); font-size: 36px; color: var(--cyan); }

    /* FOOTER */
    footer {
      padding: 24px 56px; border-top: 1px solid var(--line);
      display: flex; justify-content: space-between; align-items: center;
      background: var(--bg);
    }
    footer span { font-size: 10px; color: var(--dim); letter-spacing: 0.1em; }
    footer span b { color: var(--coral); font-weight: 400; }

    /* SCRAMBLE */
    .scramble { display: inline; }

    @media (max-width: 900px) {
      .wrap { padding: 80px 24px; }
      nav { padding: 16px 24px; }
      .n-links { display: none; }
      .hero { padding: 0 24px 56px; }
      .about-grid, .contact-grid { grid-template-columns: 1fr; }
      .about-left, .about-right, .c-left, .c-right { border-right: none; border-bottom: 1px solid var(--line); }
      .proj-item { grid-template-columns: 60px 1fr; grid-template-rows: auto auto auto; }
      .proj-tags, .proj-cta { display: none; }
      .stack-grid { grid-template-columns: 1fr 1fr; }
      .hero-sub { grid-template-columns: 1fr; }
    }
  `}</style>
);

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
const Cursor = () => {
  const hRef  = useRef<HTMLDivElement>(null);
  const vRef  = useRef<HTMLDivElement>(null);
  const dRef  = useRef<HTMLDivElement>(null);
  const rRef  = useRef<HTMLDivElement>(null);
  const pos   = useRef({ x: -200, y: -200 });
  const ring  = useRef({ x: -200, y: -200 });
  const raf   = useRef<number | null>(null);

  useEffect(() => {
    const mv = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", mv);

    const tick = () => {
      const { x, y } = pos.current;
      if (hRef.current)  { hRef.current.style.left = (x - 12) + "px"; hRef.current.style.top = y + "px"; }
      if (vRef.current)  { vRef.current.style.left = x + "px"; vRef.current.style.top = (y - 12) + "px"; }
      if (dRef.current)  { dRef.current.style.left = x + "px"; dRef.current.style.top = y + "px"; }
      if (rRef.current)  {
        ring.current.x += (x - ring.current.x) * 0.1;
        ring.current.y += (y - ring.current.y) * 0.1;
        rRef.current.style.left = ring.current.x + "px";
        rRef.current.style.top  = ring.current.y + "px";
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { 
      window.removeEventListener("mousemove", mv); 
      if (raf.current) cancelAnimationFrame(raf.current); 
    };
  }, []);

  return (
    <>
      <div id="cur-h" ref={hRef} />
      <div id="cur-v" ref={vRef} />
      <div id="cur-dot" ref={dRef} />
      <div id="cur-ring" ref={rRef} />
    </>
  );
};

// ─── SCRAMBLE TEXT ────────────────────────────────────────────────────────────
const GLYPHS = "!<>-_\\/[]{}—=+*^?#@$%&0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const Scramble = ({ text, delay = 0, className = "", as: Tag = "span" }: any) => {
  const [out, setOut] = useState(text.split("").map((c: string) => c === " " ? " " : "█"));
  const done = useRef(new Array(text.length).fill(false));

  useEffect(() => {
    let frame = 0;
    const t = setTimeout(() => {
      const id = setInterval(() => {
        setOut(text.split("").map((c: string, i: number) => {
          if (c === " ") return " ";
          if (i <= frame * 0.5) { done.current[i] = true; return c; }
          return done.current[i] ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }));
        frame++;
        if (frame > text.length * 2.2) clearInterval(id);
      }, 35);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);

  return <Tag className={className}>{out.join("")}</Tag>;
};

// ─── WARPED GRID HERO ─────────────────────────────────────────────────────────
const WarpGrid = () => {
  const ref   = useRef<SVGSVGElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const raf   = useRef<number | null>(null);
  const COLS  = 16, ROWS = 9;

  const [pts, setPts] = useState(() => {
    const a = [];
    for (let r = 0; r <= ROWS; r++)
      for (let c = 0; c <= COLS; c++)
        a.push({ bx: c / COLS, by: r / ROWS, x: c / COLS, y: r / ROWS });
    return a;
  });

  useEffect(() => {
    const mv = (e: MouseEvent) => {
      const rc = ref.current?.getBoundingClientRect();
      if (!rc) return;
      mouse.current = { x: (e.clientX - rc.left) / rc.width, y: (e.clientY - rc.top) / rc.height };
    };
    window.addEventListener("mousemove", mv);

    const tick = () => {
      setPts(p => p.map(pt => {
        const dx = pt.bx - mouse.current.x, dy = pt.by - mouse.current.y;
        const d = Math.sqrt(dx * dx + dy * dy) + 0.001;
        const f = Math.max(0, 0.1 - d) * 80;
        const tx = pt.bx + (dx / d) * f * 0.012;
        const ty = pt.by + (dy / d) * f * 0.012;
        return { ...pt, x: pt.x + (tx - pt.x) * 0.09, y: pt.y + (ty - pt.y) * 0.09 };
      }));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { 
      window.removeEventListener("mousemove", mv); 
      if (raf.current) cancelAnimationFrame(raf.current); 
    };
  }, []);

  const g = (r: number, c: number) => pts[r * (COLS + 1) + c];
  return (
    <svg ref={ref} viewBox="0 0 100 100" preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.22 }}>
      {Array.from({ length: ROWS }, (_, r) =>
        Array.from({ length: COLS }, (_, c) => {
          const p = g(r,c), pr = g(r,c+1), pb = g(r+1,c);
          return (
            <g key={`${r}-${c}`}>
              <line x1={p.x*100} y1={p.y*100} x2={pr.x*100} y2={pr.y*100} stroke="#00E5FF" strokeWidth="0.12" />
              <line x1={p.x*100} y1={p.y*100} x2={pb.x*100} y2={pb.y*100} stroke="#00E5FF" strokeWidth="0.12" />
            </g>
          );
        })
      )}
      {pts.filter((_, i) => i % 3 === 0).map((p, i) => (
        <circle key={i} cx={p.x*100} cy={p.y*100} r="0.35" fill="#00E5FF" opacity="0.5" />
      ))}
    </svg>
  );
};

// ─── MARQUEE ─────────────────────────────────────────────────────────────────
const Marquee = () => {
  const items = ["React.js", "Next.js 14", "Node.js", "Express.js", "TypeScript",
                 "Tailwind CSS", "MERN Stack", "C++", "Python", "JavaScript",
                 "DSA", "Git", "Vercel", "HTML5", "CSS3"];
  const all = [...items, ...items]; // duplicate for seamless loop
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {all.map((item, i) => (
          <span key={i}>
            <span className="m-item">{item}</span>
            <span className="m-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── TECH ORBIT ──────────────────────────────────────────────────────────────
const Orbit = () => {
  const rings = [
    { r: 85,  dur: 22, nodes: ["React.js", "Node.js"] },
    { r: 140, dur: 36, nodes: ["Next.js 14", "Express.js", "TypeScript"] },
    { r: 195, dur: 50, nodes: ["Tailwind", "HTML5", "CSS3", "Git"] },
    { r: 230, dur: 65, nodes: ["C++", "Java", "Python", "Vercel"] },
  ];
  return (
    <div className="orbit-wrap">
      <div className="o-center">
        <span className="o-center-txt">VF<br/>CORE</span>
      </div>
      {rings.map((ring, ri) => (
        <div key={ri} className="o-ring"
          style={{ width: ring.r*2, height: ring.r*2, animationDuration: ring.dur+"s" }}>
          {ring.nodes.map((n, ni) => {
            const a = (ni / ring.nodes.length) * 360;
            const rad = a * Math.PI / 180;
            return (
              <div key={n} className="o-node"
                style={{
                  left: ring.r + ring.r * Math.cos(rad),
                  top:  ring.r + ring.r * Math.sin(rad),
                  animationDuration: ring.dur+"s",
                }}>
                <span className="o-pill">{n}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// ─── BLUEPRINT PROJECT CARD ───────────────────────────────────────────────────
const ProjItem = ({ project, index }: any) => (
  <div className="proj-item r">
    <div className="proj-num">0{index + 1}</div>
    <div className="proj-info">
      <div className="proj-title">{project.title}</div>
      <div className="proj-desc">{project.desc}</div>
    </div>
    <div className="proj-tags">
      {project.tags.map((t: string) => <span key={t} className="tag">{t}</span>)}
      <span className="tag" style={{ borderColor: "var(--coral)", color: "var(--coral)" }}>
        {project.status}
      </span>
    </div>
    <div className="proj-cta">
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="arrow-btn">
        ↗
      </a>
    </div>
  </div>
);

// ─── REVEAL HOOK ─────────────────────────────────────────────────────────────
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".r");
    const io = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("in"), i * 70);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "SIGNLINGO",
    desc: "Real-time sign language interpreter. WebRTC-compatible. Bridges ASL/ISL gestures into text streams for use inside live video calls — no plugin required.",
    tags: ["Computer Vision", "WebRTC", "React.js", "A11y"],
    status: "LIVE",
    url: "https://varadfegade.github.io/signLanguageProject/",
  },
  {
    title: "SMART PARKING",
    desc: "Pre-booking slot reservation engine with O(1) vehicle retrieval. Eliminates congestion at scale. Persistent state via MongoDB, deployed on Render.",
    tags: ["MERN Stack", "MongoDB", "Express.js", "Reservations"],
    status: "LIVE",
    url: "https://parking-management-3p2t.onrender.com",
  },
  {
    title: "CODECRAFT 2K26",
    desc: "Official platform for PCCOER's coding club. Handles event publishing, schedule management, and member registration. Zero-downtime deploys on Vercel edge.",
    tags: ["Next.js 14", "TypeScript", "Vercel", "Club Platform"],
    status: "DEPLOYED",
    url: "https://codecarft-x-pccoer.vercel.app/",
  },
];

// ─── APP ──────────────────────────────────────────────────────────────────────
// IMPORTANT: We added `onBack` here so you can navigate back to VaradOS
export default function Portfolio({ onBack }: { onBack: () => void }) {
  useReveal();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <G />
      <Cursor />

      {/* NAV */}
      <nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Back button to return to the OS view */}
          <button onClick={onBack} className="n-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>←</span> RETURN TO OS
          </button>
          <a href="#" className="n-logo">VF<span>.</span>DEV</a>
        </div>
        
        <ul className="n-links">
          {["about","stack","projects","contact"].map(l => (
            <li key={l}><a href={`#${l}`} className="n-link">{l}</a></li>
          ))}
        </ul>
        <a href="mailto:varadfegade@gmail.com" className="n-cta">hire_me</a>
      </nav>

      {/* HERO */}
      <section className="hero" style={{ paddingTop: "140px" }}>
        <div className="hero-grid" />
        <div className="hero-vignette" />
        <WarpGrid />

        {/* Oversized bg text */}
        <span className="bnum" style={{ top: "50%", left: "-20px", transform: "translateY(-55%)", opacity: 0.06 }}>
          DEV
        </span>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-tag">
            <Scramble text="// B.E. Computer Engineering · PCCOER, Pune · 9.42 CGPA" delay={300} />
          </div>
          <h1 className="h1-big">
            <Scramble text="VARAD" delay={700} as="span" /><br />
            <span className="stroke">
              <Scramble text="FEGADE" delay={1050} as="span" />
            </span>
          </h1>
          <div className="hero-sub">
            <div className="hero-desc">
              <Scramble
                as="span"
                text="Full-stack dev. 3 live projects. Ships on Vercel, Render, and GitHub Pages."
                delay={1500}
              />
              <br />
              <span style={{ color: "var(--dim)", fontSize: "11px" }}>
                Exploring LLM-to-web integration without torching the CI pipeline.
              </span>
            </div>
            <div className="hero-stats">
              {[
                { v: "9.42", l: "CGPA" },
                { v: "3+",  l: "LIVE_PROJECTS" },
                { v: "94%",  l: "SSC_SCORE" },
              ].map(s => (
                <div key={s.l}>
                  <div className="hstat-v">{s.v}</div>
                  <div className="hstat-l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* ABOUT */}
      <section id="about">
        <div className="wrap" style={{ position: "relative" }}>
          <span className="bnum" style={{ bottom: -40, right: -20, opacity: 0.04 }}>01</span>
          <div className="lbl r"><span className="lbl-line" />§ 01 · ABOUT</div>
          <div className="about-grid r">
            <div className="about-left">
              <p className="serif-quote r">
                "Architecture first.<br />
                <em>Abstractions</em> second."
              </p>
              <p style={{ fontSize: "12px", color: "var(--dim)", lineHeight: 1.9, marginBottom: "20px" }} className="r d1">
                Second-year CE student at PCCOER, Pune. I write code that runs in production —
                clean REST contracts, optimized React render cycles, zero
                fluff in the commit log. Every project on this page is accessible via
                a real URL right now.
              </p>
              <p style={{ fontSize: "12px", color: "var(--dim)", lineHeight: 1.9, marginBottom: "32px" }} className="r d2">
                Currently digging into LLM-backed web services — specifically how to embed
                them without blowing up token budgets or breaking existing API contracts.
              </p>
              <div className="r d3" style={{ display: "flex", gap: "10px" }}>
                {["EN","HI","MR"].map(l => (
                  <span key={l} style={{
                    fontSize: "9px", letterSpacing: "0.14em", padding: "6px 14px",
                    border: "1px solid var(--line)", color: "var(--dim)"
                  }}>{l}</span>
                ))}
              </div>
            </div>

            <div className="about-right">
              <div className="lbl r" style={{ marginBottom: "24px" }}>
                <span className="lbl-line" />EDUCATION
              </div>
              {[
                { yr: "2024–ONGOING", school: "PCCOER — SPPU", deg: "B.E. Computer Engineering", score: "9.42 CGPA", hot: true },
                { yr: "2022–2024",    school: "Matoshri Jr. College", deg: "HSC · Science", score: "79.83%" },
                { yr: "2022",         school: "K. Narkhede Vidyalaya", deg: "SSC", score: "94.00%" },
              ].map((e, i) => (
                <div key={i} className={`edu-item r d${i}`}>
                  <div className="edu-yr">{e.yr}</div>
                  <div className="edu-school">{e.school}</div>
                  <div className="edu-score">
                    {e.deg} · <span style={{ color: e.hot ? "var(--cyan)" : "var(--coral)" }}>{e.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="stack-section">
        <div className="wrap" style={{ position: "relative" }}>
          <span className="bnum" style={{ top: -60, right: -20, opacity: 0.04 }}>02</span>
          <div className="lbl r"><span className="lbl-line" />§ 02 · TECH_GRAPH</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
            <div>
              <h2 className="r" style={{
                fontFamily: "var(--f-display)", fontSize: "clamp(32px, 5vw, 64px)",
                color: "var(--cream)", lineHeight: 1.05, marginBottom: "16px", letterSpacing: "0.03em"
              }}>
                DEPENDENCY<br />
                <span style={{ color: "var(--cyan)", textShadow: "0 0 40px rgba(0,229,255,0.3)" }}>GRAPH</span>
              </h2>
              <p className="r d1" style={{ fontSize: "11px", color: "var(--dim)", lineHeight: 1.8, marginBottom: "36px" }}>
                // Orbit speed ∝ production frequency.<br />
                Hover nodes to inspect. Four rings, 14 nodes.
              </p>
              <div className="stack-grid r d2">
                {[
                  { cat: "Frontend",  items: "React.js · Next.js 14 · TypeScript · Tailwind · HTML5 · CSS3" },
                  { cat: "Backend",   items: "Node.js · Express.js · REST APIs · MERN" },
                  { cat: "Languages", items: "JavaScript · C++ · Java · Python · C" },
                  { cat: "Tooling",   items: "Git · GitHub · Vercel · OBS Studio" },
                  { cat: "CS Core",   items: "DSA in C++ · Algorithms" },
                  { cat: "AI/ML",     items: "LLM integration · OpenCV · Gesture ML" },
                ].map(s => (
                  <div key={s.cat} className="stack-cell">
                    <div className="sc-cat">{s.cat}</div>
                    <div className="sc-items">{s.items}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="r d1">
              <Orbit />
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="proj-section">
        <div className="wrap" style={{ position: "relative" }}>
          <span className="bnum" style={{ top: -40, left: -20, opacity: 0.04 }}>03</span>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
            <div>
              <div className="lbl r"><span className="lbl-line" />§ 03 · PROJECT_FILES</div>
              <h2 className="r d1" style={{
                fontFamily: "var(--f-display)", fontSize: "clamp(32px, 5vw, 64px)",
                color: "var(--cream)", letterSpacing: "0.03em", lineHeight: 1
              }}>
                SHIPPED.<br />
                <span style={{ color: "var(--coral)", textShadow: "0 0 40px rgba(255,61,90,0.3)" }}>
                  NOT DEMOED.
                </span>
              </h2>
            </div>
            <span className="r" style={{ fontSize: "10px", color: "var(--dim)", letterSpacing: "0.08em" }}>
              // hover row to inspect
            </span>
          </div>
          <div className="proj-list">
            {PROJECTS.map((p, i) => <ProjItem key={p.title} project={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="wrap" style={{ position: "relative" }}>
          <span className="bnum" style={{ bottom: -60, right: -20, opacity: 0.04 }}>04</span>
          <div className="lbl r"><span className="lbl-line" />§ 04 · CONTACT</div>
          <div className="contact-grid r">
            <div className="c-left">
              <h2 className="c-heading r">
                LET'S<br />
                BUILD<br />
                <span className="hl">PRECISE.</span>
              </h2>
              <p className="c-body r d1">
                Open to internships, contracts, and collabs where<br />
                the spec is clear and git blame matters.
              </p>

              {[
                { lbl: "EMAIL",    val: "varadfegade@gmail.com",  href: "mailto:varadfegade@gmail.com" },
                { lbl: "GITHUB",   val: "github.com/varadfegade", href: "https://github.com/varadfegade" },
                { lbl: "LINKEDIN", val: "varad-fegade",           href: "https://www.linkedin.com/in/varad-fegade-683455311/" },
                { lbl: "PHONE",    val: "+91 7249053481",         href: "tel:+917249053481" },
                { lbl: "LOCATION", val: "Pune, Maharashtra, IN",  href: null },
              ].map((c, i) => (
                <div key={c.lbl} className={`c-link-row r d${i}`}>
                  <span className="c-lbl">{c.lbl}</span>
                  {c.href
                    ? <a href={c.href} target="_blank" rel="noopener noreferrer" className="c-val">{c.val}</a>
                    : <span className="c-val" style={{ color: "var(--dim)" }}>{c.val}</span>
                  }
                </div>
              ))}
            </div>

            <div className="c-right">
              {sent ? (
                <div className="f-sent">
                  <div className="f-sent-h">QUEUED.</div>
                  <div style={{ fontSize: "11px", color: "var(--dim)", lineHeight: 1.8 }}>
                    // Response within 24h.<br />
                    // Signal received, noise discarded.
                  </div>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <div className="f-group r">
                    <label className="f-label">NAME</label>
                    <input className="f-input" placeholder="your_name" required
                      value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div className="f-group r d1">
                    <label className="f-label">EMAIL</label>
                    <input className="f-input" type="email" placeholder="you@company.io" required
                      value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div className="f-group r d2">
                    <label className="f-label">MESSAGE</label>
                    <textarea className="f-input" rows={5} placeholder="// what are we building?"
                      style={{ resize: "vertical" }} required
                      value={form.msg} onChange={e => setForm(f => ({ ...f, msg: e.target.value }))} />
                  </div>
                  <div className="r d3">
                    <button type="submit" className="f-submit">SEND MESSAGE</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span>© 2026 Varad Fegade · <b>VF.DEV</b></span>
        <span>Pune, MH · v2.0.0</span>
      </footer>
    </div>
  );
}