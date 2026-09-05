"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  ArrowUpRight,
  GraduationCap,
  Calendar,
  CheckCircle2,
  ExternalLink,
  X,
  Sparkles,
  BookOpen,
  Award,
  FileCheck2,
  BookmarkCheck,
  ShieldAlert,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Shared scroll-reveal wrapper
───────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function RevealBlock({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "-40px" }}
      transition={{ duration: 0.75, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   1. CERTIFICATIONS SECTION (Placed BEFORE Education)
   (Single Unified Aesthetic Accent Color: #D6CC99 Warm Sand Khaki)
───────────────────────────────────────────── */
interface CertItem {
  id: string;
  title: string;
  issuer: string;
  image: string;
  pdf?: string;
  skills: string[];
  description: string;
  accentColor: string; // Unified single aesthetic color: #D6CC99
  badge: string;
  expertiseLevel: "Expert" | "Advanced" | "Specialized";
  expertiseBadge: string;
  borderClasses: string;
}

const UNIFIED_AESTHETIC_COLOR = "#D6CC99"; // Warm Sand Khaki / Champagne Ochre

const CERTIFICATIONS_DATA: CertItem[] = [
  {
    id: "pw-dsa",
    title: "DSA (C++)",
    issuer: "PW Skills",
    image: "/images/certificates/c++ dsa certificate physics wallah.png",
    pdf: "/images/certificates/c++ dsa certificate physics wallah.pdf",
    skills: ["Data Structures", "Algorithms", "C++", "Problem Solving"],
    description: "In-depth algorithms, complexity analysis, trees, dynamic programming & competitive programming.",
    accentColor: UNIFIED_AESTHETIC_COLOR,
    badge: "Algorithmic Mastery",
    expertiseLevel: "Expert",
    expertiseBadge: "Expert • Mastery",
    borderClasses: "border-[3.5px] border-white shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_22px_rgba(255,255,255,0.4)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.85),0_0_32px_rgba(255,255,255,0.6)]",
  },
  {
    id: "codehelp-webdev",
    title: "Web Development",
    issuer: "CodeHelp",
    image: "/images/certificates/web dev codehelp.png",
    pdf: "/images/certificates/web dev codehelp.png",
    skills: ["Full Stack", "React", "Node.js", "REST APIs"],
    description: "Full-stack modern web architecture, frontend state management, backend services, and deployment.",
    accentColor: UNIFIED_AESTHETIC_COLOR,
    badge: "Full Stack Engineering",
    expertiseLevel: "Advanced",
    expertiseBadge: "Advanced • Full Stack",
    borderClasses: "border-[3.5px] border-white shadow-[0_10px_28px_rgba(0,0,0,0.65),0_0_18px_rgba(255,255,255,0.32)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_28px_rgba(255,255,255,0.52)]",
  },
  {
    id: "oracle-dbms",
    title: "DBMS",
    issuer: "Oracle",
    image: "/images/certificates/DBMS oracle certificate.png",
    pdf: "/images/certificates/DBMS oracle certificate.pdf",
    skills: ["SQL", "Relational Schema", "Transactions", "Indexing"],
    description: "Relational database design, normalization, ACID transactions, complex queries & optimization.",
    accentColor: UNIFIED_AESTHETIC_COLOR,
    badge: "Database Architecture",
    expertiseLevel: "Advanced",
    expertiseBadge: "Advanced • Relational",
    borderClasses: "border-[3.5px] border-white shadow-[0_10px_28px_rgba(0,0,0,0.65),0_0_18px_rgba(255,255,255,0.32)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_28px_rgba(255,255,255,0.52)]",
  },
  {
    id: "cwh-datascience",
    title: "Data Science",
    issuer: "CodeWithHarry",
    image: "/images/certificates/datascience.png",
    pdf: "/images/certificates/datascience.png",
    skills: ["Python", "Pandas", "NumPy", "Data Analysis"],
    description: "Statistical computing, exploratory data analysis, data wrangling, and predictive modeling.",
    accentColor: UNIFIED_AESTHETIC_COLOR,
    badge: "Data Intelligence",
    expertiseLevel: "Specialized",
    expertiseBadge: "Specialized • Data",
    borderClasses: "border-[3.5px] border-white shadow-[0_10px_28px_rgba(0,0,0,0.65),0_0_18px_rgba(255,255,255,0.32)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_28px_rgba(255,255,255,0.52)]",
  },
];

export function CertificationsSection() {
  const [activeCert, setActiveCert] = useState<CertItem | null>(null);

  return (
    <section
      id="certifications"
      className="relative z-10 w-full pt-8 sm:pt-10 pb-7 sm:pb-8 px-6 sm:px-10 md:px-12 max-w-[1280px] mx-auto gpu-layer"
    >
      {/* Centered Heading with reduced space around */}
      <RevealBlock className="flex flex-col items-center text-center gap-1.5 mb-4 sm:mb-5 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#445D48]/30 border border-[#445D48]/60 text-[#D6CC99] text-xs font-semibold tracking-wider uppercase mb-1 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-[#D6CC99] animate-pulse" />
          Verified Credentials &amp; Licenses
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#FDE5D4]">
          Certifications<span className="text-[#D6CC99]">.</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#D6CC99]/85 max-w-md">
          Technical specializations, professional licenses, and verified skill completions.
        </p>
      </RevealBlock>

      {/* Flashcards aligned in a single line on desktop (lg:grid-cols-4) with Thicker White Borders and No Top Extra Border */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {CERTIFICATIONS_DATA.map((cert, idx) => (
          <RevealBlock
            key={cert.id}
            delay={idx * 0.08}
            className="flex flex-col h-full"
          >
            <div
              onClick={() => setActiveCert(cert)}
              className={`flex-1 flex flex-col justify-between rounded-2xl bg-[#042035] overflow-hidden ${cert.borderClasses} hover:-translate-y-2 transition-all duration-400 group cursor-pointer relative`}
            >
              {/* TOP: Dedicated space for Image of Certification */}
              <div className="relative w-full aspect-[16/10] bg-[#001524] overflow-hidden border-b border-white/20 flex items-center justify-center">
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate - ${cert.issuer}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Issuer Badge on top of image */}
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#001524]/90 backdrop-blur-md border border-white/40 text-[10px] font-bold text-[#FDE5D4] flex items-center gap-1 shadow-md">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                  Verified
                </div>

                {/* Hover Click to Expand Indicator */}
                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                  <span className="px-3 py-1.5 rounded-full bg-[#042035]/95 border border-white text-xs font-semibold text-white flex items-center gap-1.5 shadow-xl">
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                    View Certificate
                  </span>
                </div>
              </div>

              {/* BOTTOM: Structured description below the image */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  {/* Category / Issuer & Prominent White-Bordered Expertise Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#D6CC99]">
                      {cert.issuer}
                    </span>
                    {/* White-Bordered Expertise Pill According to Expertise */}
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-white bg-white/10 text-white shadow-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      {cert.expertiseBadge}
                    </span>
                  </div>

                  {/* Certification Title */}
                  <h3 className="text-base sm:text-lg font-black text-[#FDE5D4] mb-2 leading-tight group-hover:text-white transition-colors">
                    {cert.title}
                  </h3>

                  {/* Description below image */}
                  <p className="text-xs text-[#D6CC99]/80 leading-relaxed mb-4">
                    {cert.description}
                  </p>
                </div>

                {/* Skills tags strip */}
                <div className="pt-3 border-t border-[#445D48]/40 flex flex-wrap gap-1.5 mt-auto">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-2 py-0.5 rounded bg-[#001524]/80 border border-[#445D48]/50 text-[#D6CC99]/90 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </RevealBlock>
        ))}
      </div>

      {/* Lightbox Modal for Certificate Preview */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCert(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full rounded-2xl bg-[#042035] border border-[#D6CC99]/50 p-4 sm:p-6 shadow-2xl cursor-default overflow-hidden"
            >
              <button
                onClick={() => setActiveCert(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 mb-4 bg-black">
                <img
                  src={activeCert.image}
                  alt={activeCert.title}
                  className="w-full h-auto object-contain max-h-[70vh]"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#D6CC99]">
                <div>
                  <h4 className="text-base font-bold text-[#FDE5D4]">
                    {activeCert.title} — {activeCert.issuer}
                  </h4>
                  <p className="text-xs text-[#D6CC99]/85 mt-0.5">
                    {activeCert.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
                  {activeCert.pdf && (
                    <a
                      href={activeCert.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#001524] text-[#FDE5D4] hover:text-white text-xs font-semibold border border-white/30 hover:border-white hover:bg-[#445D48]/40 transition-all shadow-md"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#D6CC99]" />
                      View Document ({activeCert.pdf.endsWith(".pdf") ? "PDF" : "Original"})
                    </a>
                  )}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D6CC99]/20 text-[#D6CC99] font-semibold border border-[#D6CC99]/40">
                    <CheckCircle2 className="w-4 h-4" />
                    Official Credential
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─────────────────────────────────────────────
   2. EDUCATION SECTION: ACADEMIC DOSSIER & LEDGER
   (NO generic AI timeline, NO boxed flashcards.
    Authentic institutional credentials transcript with
    heraldic monograms, distinction seals, and precision metrics)
───────────────────────────────────────────── */
interface AcademicRecord {
  recordId: string;
  institution: string;
  credential: string;
  degreeType: string;
  scoreLabel: string;
  scoreValue: string;
  location: string;
  period: string;
  statusText: string;
  distinctionBadge: string;
  coursework: string[];
  summary: string;
  monogram: string;
}

const ACADEMIC_RECORDS: AcademicRecord[] = [
  {
    recordId: "RECORD // 01 — UNDERGRADUATE",
    institution: "Pimpri Chinchwad College of Engineering and Research (PCCOER)",
    credential: "Bachelor of Engineering (B.E), Computer Engineering",
    degreeType: "Affiliated to Savitribai Phule Pune University (SPPU)",
    scoreLabel: "Current CGPA",
    scoreValue: "9.42 / 10",
    location: "Pune, India",
    period: "2024 – 2028",
    statusText: "Active Degree Candidate",
    distinctionBadge: "★ First Class with Distinction (Top 1%)",
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems (DBMS)",
      "Object-Oriented Programming (C++)",
      "Computer Networks",
      "Operating Systems Architecture",
      "Discrete Mathematics",
    ],
    summary:
      "Four-year intensive Bachelor of Engineering curriculum with focus on foundational computing theory, advanced algorithmic analysis, distributed backend databases, and modern software engineering paradigms.",
    monogram: "PCCOER",
  },
  {
    recordId: "RECORD // 02 — HIGHER SECONDARY",
    institution: "Matoshri Jr. College",
    credential: "Senior Secondary (XII) — Science Stream",
    degreeType: "Maharashtra State Board of Secondary and Higher Secondary Education",
    scoreLabel: "Final Standing",
    scoreValue: "79.83%",
    location: "Nashik, India",
    period: "2024",
    statusText: "Completed / Graduated",
    distinctionBadge: "Science & Engineering Stream",
    coursework: [
      "Higher Mathematics & Calculus",
      "Physics & Mechanics",
      "Chemistry",
      "Computer Science Fundamentals",
    ],
    summary:
      "Rigorous two-year senior secondary scientific curriculum establishing strong analytical foundations in differential calculus, theoretical physics, algorithmic logic, and technical problem solving.",
    monogram: "MJC",
  },
  {
    recordId: "RECORD // 03 — SECONDARY SCHOOL",
    institution: "K. Narkhede Vidyalaya",
    credential: "Secondary School Certificate (X)",
    degreeType: "Maharashtra State Board Examination",
    scoreLabel: "Academic Distinction",
    scoreValue: "94.00%",
    location: "Bhusawal, India",
    period: "2022",
    statusText: "Completed / Graduated",
    distinctionBadge: "★ Top Scholastic Merit Rank (Top 0.5%)",
    coursework: [
      "Advanced Mathematics",
      "General Science & Inquiry",
      "Social Sciences",
      "Language & Communication",
    ],
    summary:
      "Graduated with top-tier scholastic excellence, scoring 94.00% aggregate across all disciplines with highest marks in Mathematics and Scientific Inquiry.",
    monogram: "KNV",
  },
];

export function EducationSection() {
  return (
    <section
      id="education"
      className="relative z-10 w-full pt-8 sm:pt-10 pb-7 sm:pb-8 px-6 sm:px-10 md:px-12 max-w-[1280px] mx-auto gpu-layer"
    >
      {/* Centered Heading with reduced space around */}
      <RevealBlock className="flex flex-col items-center text-center gap-1.5 mb-5 sm:mb-6 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#445D48]/30 border border-[#445D48]/60 text-[#D6CC99] text-xs font-semibold tracking-wider uppercase mb-1 shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-[#D6CC99]" />
          Academic Dossier &amp; Registry
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#FDE5D4]">
          Education<span className="text-[#D6CC99]">.</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#D6CC99]/85 max-w-md">
          Verified academic transcripts, engineering coursework, and scholastic merit standings.
        </p>
      </RevealBlock>

      {/* ── Bespoke Academic Ledger Entries (No timeline, no generic cards) ── */}
      <div className="space-y-5 sm:space-y-6">
        {ACADEMIC_RECORDS.map((record, idx) => (
          <RevealBlock key={record.institution} delay={idx * 0.1}>
            <div className="relative rounded-2xl bg-[#042035] border border-[#445D48]/60 hover:border-[#D6CC99]/80 p-6 sm:p-8 md:p-9 shadow-xl transition-all duration-400 group overflow-hidden">
              {/* Corner Architectural Coordinate Markers */}
              <div className="absolute top-2 left-2 text-[9px] font-mono text-[#445D48] select-none pointer-events-none">+</div>
              <div className="absolute top-2 right-2 text-[9px] font-mono text-[#445D48] select-none pointer-events-none">+</div>
              <div className="absolute bottom-2 left-2 text-[9px] font-mono text-[#445D48] select-none pointer-events-none">+</div>
              <div className="absolute bottom-2 right-2 text-[9px] font-mono text-[#445D48] select-none pointer-events-none">+</div>

              {/* Ambient Left Edge Highlight Rule */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#D6CC99] via-[#445D48] to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Left Column: Institutional Monogram & Identity (4 Cols) */}
                <div className="lg:col-span-4 flex flex-col justify-between gap-4">
                  <div>
                    {/* Official Registration Header */}
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#D6CC99] font-bold">
                        {record.recordId}
                      </span>
                    </div>

                    {/* Monogram Seal + College Name */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-[#001524] border border-[#D6CC99]/40 flex items-center justify-center font-mono font-black text-xs text-[#D6CC99] shadow-md group-hover:border-[#D6CC99] group-hover:scale-105 transition-all">
                        {record.monogram}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-black text-[#FDE5D4] leading-tight group-hover:text-white transition-colors">
                          {record.institution}
                        </h3>
                        <p className="text-[11px] text-[#D6CC99]/70 mt-1 font-mono">
                          {record.degreeType}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Metadata Chips: Period, Location, Status */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    <span className="font-mono px-2.5 py-1 rounded-md bg-[#001524] border border-[#445D48]/60 text-[#D6CC99] font-semibold text-[11px]">
                      {record.period}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#D6CC99]/85 text-[11px] font-medium px-2 py-1 rounded-md bg-[#001524]/60 border border-[#445D48]/40">
                      <MapPin className="w-3 h-3 text-[#BC5E29]" />
                      {record.location}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-[#445D48]/30 border border-[#445D48]/60 text-emerald-400 font-semibold">
                      {record.statusText}
                    </span>
                  </div>
                </div>

                {/* Right Column: Degree Program, Metric Standing & Coursework (8 Cols) */}
                <div className="lg:col-span-8 flex flex-col justify-between gap-4 lg:border-l lg:border-[#445D48]/40 lg:pl-8">
                  {/* Degree Title & Score Gauge Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#445D48]/40">
                    <div>
                      <span className="text-xs font-mono uppercase text-[#D6CC99]/70 tracking-wider font-semibold block mb-0.5">
                        Conferred Credential
                      </span>
                      <h4 className="text-lg sm:text-xl font-black text-[#FDE5D4] leading-snug">
                        {record.credential}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] font-mono uppercase text-[#D6CC99]/70 block">
                          {record.scoreLabel}
                        </span>
                        <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                          {record.scoreValue}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-[#001524] border border-[#D6CC99]/50 flex items-center justify-center text-[#D6CC99]">
                        <GraduationCap className="w-5 h-5 text-[#D6CC99]" />
                      </div>
                    </div>
                  </div>

                  {/* Academic Summary */}
                  <p className="text-xs sm:text-sm text-[#D6CC99]/90 leading-relaxed">
                    {record.summary}
                  </p>

                  {/* Honors Distinction Stamp */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6CC99]/15 border border-[#D6CC99]/40 text-[#D6CC99] font-bold text-xs tracking-wide">
                      <BookmarkCheck className="w-3.5 h-3.5 text-[#D6CC99]" />
                      {record.distinctionBadge}
                    </span>
                  </div>

                  {/* Coursework Modules Strip */}
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#D6CC99]/70 font-semibold block mb-2">
                      Core Academic Disciplines:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {record.coursework.map((course) => (
                        <span
                          key={course}
                          className="px-2.5 py-1 rounded-lg bg-[#001524] border border-[#445D48]/50 text-xs font-medium text-[#FDE5D4] flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#48A1B2]" />
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   3. CONTACT SECTION
───────────────────────────────────────────── */
function ContactBox() {
  const socials = [
    {
      icon: <Mail className="w-4 h-4" />,
      label: "Email",
      value: "varadfegade@example.com",
      href: "mailto:varadfegade@example.com",
      color: "#BC5E29",
    },
    {
      icon: <Github className="w-4 h-4" />,
      label: "GitHub",
      value: "github.com/varadfegade",
      href: "https://github.com",
      color: "#48A1B2",
    },
    {
      icon: <Linkedin className="w-4 h-4" />,
      label: "LinkedIn",
      value: "linkedin.com/in/varad",
      href: "https://linkedin.com",
      color: "#553AC2",
    },
    {
      icon: <Twitter className="w-4 h-4" />,
      label: "Twitter / X",
      value: "@varadfegade",
      href: "https://twitter.com",
      color: "#C5A126",
    },
  ];

  return (
    <div
      className="rounded-[2rem] bg-[#042035] border border-[#445D48]/70 hover:border-[#D6CC99]/80 p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-500 w-full relative overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-center">
        {/* Left: headline + CTA */}
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5E3023]/35 border border-[#5E3023]/70 text-[#FDE5D4] text-xs font-semibold tracking-wider uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#BC5E29] animate-ping" />
            Direct Communication
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#FDE5D4] mb-3 leading-tight tracking-tight">
            Let&apos;s build something
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BC5E29] to-[#D6CC99]">
              remarkable together.
            </span>
          </h3>

          <p className="text-sm sm:text-base text-[#D6CC99]/85 leading-relaxed mb-6 max-w-lg">
            Have an ambitious product idea, an engineering challenge, or want to discuss collaborating? 
            Feel free to reach out directly through any of the channels below.
          </p>

          <a
            href="mailto:varadfegade@example.com"
            className="btn-wipe-card inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[var(--theme-chestnut)] text-[#FDE5D4] font-bold text-sm shadow-xl transition-all"
          >
            Send an Email <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

        {/* Right: contact link rows */}
        <address className="not-italic grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5 p-4 rounded-2xl border border-[#445D48]/50 bg-[#001524]/80 hover:border-[#D6CC99] hover:bg-[#042035] transition-all duration-300 shadow-md"
            >
              <span
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: s.color }}
              >
                {s.icon}
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#D6CC99]/75 font-semibold uppercase tracking-wider">
                  {s.label}
                </span>
                <span className="text-xs sm:text-sm text-[#FDE5D4] font-medium group-hover:underline truncate">
                  {s.value}
                </span>
              </div>
              <ArrowUpRight
                className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#D6CC99]"
              />
            </a>
          ))}
        </address>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   3. CONTACT SECTION & FOOTER
───────────────────────────────────────────── */
export function ContactSection() {
  return (
    <>
      <section
        id="contact"
        className="relative z-10 w-full pt-8 sm:pt-12 pb-8 sm:pb-9 px-6 sm:px-10 md:px-12 max-w-[1280px] mx-auto gpu-layer"
      >
        <RevealBlock className="flex flex-col items-center text-center gap-1.5 mb-4 sm:mb-5 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5E3023]/35 border border-[#5E3023]/70 text-[#FDE5D4] text-xs font-semibold tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-[#BC5E29] animate-ping" />
            Direct Communication
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#FDE5D4]">
            Get In Touch<span className="text-[#BC5E29]">.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#D6CC99]/85 max-w-md">
            Have an ambitious product idea, engineering challenge, or want to collaborate?
          </p>
        </RevealBlock>

        <RevealBlock delay={0.05} className="w-full">
          <ContactBox />
        </RevealBlock>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full py-8 px-6 sm:px-10 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#445D48]/40 max-w-[1280px] mx-auto text-xs text-[#D6CC99]/70">
        <p>
          &copy; {new Date().getFullYear()} Varad Fegade. Designed with bespoke precision.
        </p>
        <p className="font-mono">
          Color Palette: #445D48 · #FDE5D4 · #D6CC99 · #001524 · #5E3023
        </p>
      </footer>
    </>
  );
}

export default function ModernInfoSections() {
  return (
    <>
      <CertificationsSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}
