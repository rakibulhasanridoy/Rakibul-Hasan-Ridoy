"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Real project data ─────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "ScholarArchive",
    subtitle: "Online Book Borrowing Platform",
    description:
      "A modern online book borrowing platform built with Next.js. Users can explore curated books across Science, Technology, and Story categories, manage their personal library profile, and authenticate via Google OAuth or email/password through Better Auth.",
    tags: ["Next.js", "MongoDB", "Better Auth", "Google OAuth"],
    tagStyle: "gold",
    liveUrl: "https://rakibulhasanridoy-online-book-borro.vercel.app/",
    icon: (
      <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"
           style={{ color: "var(--color-primary)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, rgba(201,162,39,0.18), rgba(124,106,154,0.15))",
    iconBg: "rgba(201,162,39,0.1)",
  },
  {
    title: "Keen Keeper",
    subtitle: "Friendship Tracking App",
    description:
      "A friendship tracking web app built with React. Log interactions (calls, texts, video chats) with friends, visualize communication habits over time, and get a friends directory with On Track / Almost Due / Overdue status tracking.",
    tags: ["React", "Context API", "Analytics", "Toast"],
    tagStyle: "purple",
    liveUrl: "https://keen-keeper-phi-eight.vercel.app/",
    icon: (
      <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"
           style={{ color: "var(--color-secondary)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, rgba(124,106,154,0.18), rgba(201,162,39,0.15))",
    iconBg: "rgba(124,106,154,0.1)",
  },
  {
    title: "MediQueue",
    subtitle: "Tutor Booking Platform",
    description:
      "A modern tutor booking web application built with Next.js. Students can browse available tutors, book online learning sessions by subject and time, generate digital session tokens for each booking, and manage their scheduled classes efficiently.",
    tags: ["Next.js", "Booking System", "Digital Tokens", "Auth"],
    tagStyle: "gold",
    liveUrl: "https://mediqueue-client-xi.vercel.app/",
    icon: (
      <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"
           style={{ color: "var(--color-primary)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, rgba(201,162,39,0.15), rgba(124,106,154,0.12))",
    iconBg: "rgba(201,162,39,0.08)",
  },
  {
    title: "GitHub Issues Tracker",
    subtitle: "Real-Time GitHub Dashboard",
    description:
      "A sophisticated web app interfacing with the GitHub API to fetch real-time issue data. Features a secure login gateway, interactive dashboard for issue management, Open/Closed issue filtering, and a dedicated single-card deep-dive view.",
    tags: ["JavaScript", "GitHub API", "DOM", "Async JS"],
    tagStyle: "purple",
    liveUrl: "https://assignment05-git-hub-issues-tracker.vercel.app/",
    icon: (
      <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"
           style={{ color: "var(--color-secondary)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, rgba(124,106,154,0.15), rgba(201,162,39,0.12))",
    iconBg: "rgba(124,106,154,0.08)",
  },
];

const TAG_STYLES: Record<string, React.CSSProperties> = {
  gold:   { background: "rgba(201,162,39,0.15)",  color: "var(--color-primary)"   },
  purple: { background: "rgba(124,106,154,0.15)", color: "var(--color-secondary)" },
};

// ── Project card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden glass-card border-sweep group flex flex-col"
      style={{ border: "1px solid rgba(201,162,39,0.18)" }}
      whileHover={{
        y: -10,
        scale: 1.015,
        borderColor: "rgba(201,162,39,0.5)",
        boxShadow: "0 24px 60px rgba(201,162,39,0.15), 0 8px 20px rgba(0,0,0,0.4)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 280, damping: 20, delay: index * 0.08 }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
    >
      {/* Thumbnail */}
      <div
        className="h-44 flex items-center justify-center relative overflow-hidden flex-shrink-0"
        style={{ background: project.gradient }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: project.iconBg }}
        >
          {project.icon}
        </div>
        {/* Hover corner glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "radial-gradient(circle at top right, rgba(201,162,39,0.15), transparent 65%)" }}
        />
        {/* Live badge */}
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
          style={{
            background: "rgba(10,10,15,0.75)",
            border: "1px solid rgba(201,162,39,0.3)",
            color: "var(--color-primary)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
          />
          Live
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-1">
          <span className="text-xs uppercase tracking-widest font-semibold"
                style={{ color: "var(--color-secondary)", opacity: 0.8 }}>
            {project.subtitle}
          </span>
        </div>
        <h3 className="font-display text-xl font-semibold mb-2" style={{ color: "var(--color-text)" }}>
          {project.title}
        </h3>
        <p className="text-sm mb-4 leading-relaxed flex-1"
           style={{ color: "var(--color-text)", opacity: 0.7 }}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full font-semibold"
              style={TAG_STYLES[project.tagStyle]}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        <motion.a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold"
          style={{ color: "var(--color-primary)" }}
          whileHover={{ gap: "14px" }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          View Live
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current?.children ?? [], {
        opacity: 0, y: 50, stagger: 0.12, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 82%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="relative py-24 px-6 z-10 overflow-hidden">
      <div className="section-blob-left" />
      <div className="section-blob-right" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div
            className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{
              background: "rgba(201,162,39,0.1)",
              border: "1px solid rgba(201,162,39,0.25)",
              color: "var(--color-primary)",
            }}
          >
            Portfolio
          </div>
          <h2 className="font-display text-4xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
            Featured Projects
          </h2>
          <div className="gold-line w-16 mx-auto mb-4" />
          <p className="text-sm max-w-xl mx-auto" style={{ color: "var(--color-text)", opacity: 0.65 }}>
            A selection of real-world projects I&apos;ve built and deployed — click any card to explore the live site.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* More on GitHub */}
        <div className="mt-14 text-center">
          <motion.a
            href="https://github.com/rakibulhasanridoy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full font-semibold text-sm tracking-widest uppercase"
            style={{
              border: "1px solid rgba(201,162,39,0.35)",
              color: "var(--color-primary)",
            }}
            whileHover={{
              scale: 1.05,
              background: "rgba(201,162,39,0.08)",
              boxShadow: "0 8px 28px rgba(201,162,39,0.18)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            More on GitHub
          </motion.a>
        </div>
      </div>
    </section>
  );
}
