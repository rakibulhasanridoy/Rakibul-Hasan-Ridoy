"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Data ────────────────────────────────────────────────────────────────────
const FRONTEND_SKILLS = [
  { name: "React / Next.js",  value: 95 },
  { name: "TypeScript",       value: 90 },
  { name: "Tailwind CSS",     value: 92 },
  { name: "Redux / Zustand",  value: 88 },
];

const BACKEND_SKILLS = [
  { name: "Node.js / Express",    value: 93 },
  { name: "MongoDB / Mongoose",   value: 91 },
  { name: "REST APIs / GraphQL",  value: 89 },
  { name: "JWT / OAuth",          value: 87 },
];

const EXTRA_SKILLS = [
  { name: "Git / GitHub", href: "https://github.com/rakibulhasanridoy" },
  { name: "Docker",      href: null },
  { name: "Vercel",      href: "https://vercel.com/rakibulhasanridoy1-gmailcoms-projects" },
  { name: "Jest / Testing", href: null },
];

// ── Tabs ─────────────────────────────────────────────────────────────────────
const TABS = ["Frontend", "Backend", "Tools"] as const;
type Tab = typeof TABS[number];

// ── Skill bar ────────────────────────────────────────────────────────────────
interface SkillBarProps {
  name: string;
  value: number;
  barRef: (el: HTMLDivElement | null) => void;
}

function SkillBar({ name, value, barRef }: SkillBarProps) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium" style={{ color: "var(--color-text)" }}>{name}</span>
        <span className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>{value}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(201,162,39,0.15)" }}>
        <div
          ref={barRef}
          className="h-2 rounded-full"
          style={{ width: 0, background: "linear-gradient(90deg, var(--color-primary), rgba(201,162,39,0.6))" }}
        />
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function Skills() {
  const sectionRef    = useRef<HTMLElement>(null);
  const headerRef     = useRef<HTMLDivElement>(null);
  const frontBarRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const backBarRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("Frontend");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(headerRef.current?.children ?? [], {
        opacity: 0, y: 40, stagger: 0.12, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 82%", once: true },
      });

      // Progress bars
      const animateBars = (
        bars: (HTMLDivElement | null)[],
        skills: { value: number }[],
        trigger: Element | null
      ) => {
        bars.forEach((bar, i) => {
          if (!bar) return;
          gsap.fromTo(bar,
            { width: "0%" },
            {
              width: `${skills[i].value}%`,
              duration: 1.4,
              delay: i * 0.12,
              ease: "power2.out",
              scrollTrigger: { trigger, start: "top 78%", once: true },
            }
          );
        });
      };

      animateBars(frontBarRefs.current, FRONTEND_SKILLS,
        sectionRef.current?.querySelector("#frontend-card") ?? null);
      animateBars(backBarRefs.current, BACKEND_SKILLS,
        sectionRef.current?.querySelector("#backend-card") ?? null);

      // Extra pills
      gsap.from(sectionRef.current?.querySelectorAll(".extra-skill") ?? [], {
        opacity: 0, y: 24, stagger: 0.08, duration: 0.6, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current?.querySelector("#extra-skills"),
          start: "top 85%", once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 px-6 z-10 overflow-hidden"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Ambient blobs */}
      <div className="section-blob-left" />
      <div className="section-blob-right" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div ref={headerRef} className="text-center mb-12">
          <div
            className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{
              background: "rgba(201,162,39,0.1)",
              border: "1px solid rgba(201,162,39,0.25)",
              color: "var(--color-primary)",
            }}
          >
            Expertise
          </div>
          <h2 className="font-display text-4xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
            Technical Skills
          </h2>
          <div className="gold-line w-16 mx-auto" />
        </div>

        {/* ── Tab switcher ────────────────────────────────────────────── */}
        <div className="flex justify-center mb-10">
          <div
            className="flex gap-1 p-1.5 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,162,39,0.1)" }}
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-7 py-2 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer"
                style={
                  activeTab === tab
                    ? {
                        background: "linear-gradient(135deg, rgba(201,162,39,0.35), rgba(201,162,39,0.15))",
                        color: "var(--color-primary)",
                        boxShadow: "0 0 12px rgba(201,162,39,0.2)",
                        border: "1px solid rgba(201,162,39,0.3)",
                      }
                    : { color: "var(--color-text)", opacity: 0.5 }
                }
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Skill cards ─────────────────────────────────────────────── */}
        {(activeTab === "Frontend" || activeTab === "Backend") && (
          <div className="grid md:grid-cols-2 gap-8">

            {/* Frontend */}
            <motion.div
              id="frontend-card"
              className="p-6 rounded-2xl glass-card border-sweep"
              style={{ border: "1px solid rgba(201,162,39,0.2)" }}
              whileHover={{ scale: 1.02, borderColor: "rgba(201,162,39,0.5)", boxShadow: "0 16px 48px rgba(201,162,39,0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <h3
                className="font-display text-xl font-semibold mb-6 flex items-center gap-3"
                style={{ color: "var(--color-primary)" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Frontend Development
              </h3>
              <div className="space-y-4">
                {FRONTEND_SKILLS.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    value={skill.value}
                    barRef={(el) => { frontBarRefs.current[i] = el; }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Backend */}
            <motion.div
              id="backend-card"
              className="p-6 rounded-2xl glass-card border-sweep"
              style={{ border: "1px solid rgba(201,162,39,0.2)" }}
              whileHover={{ scale: 1.02, borderColor: "rgba(201,162,39,0.5)", boxShadow: "0 16px 48px rgba(201,162,39,0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <h3
                className="font-display text-xl font-semibold mb-6 flex items-center gap-3"
                style={{ color: "var(--color-primary)" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
                Backend Development
              </h3>
              <div className="space-y-4">
                {BACKEND_SKILLS.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    value={skill.value}
                    barRef={(el) => { backBarRefs.current[i] = el; }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* ── Tools grid ──────────────────────────────────────────────── */}
        {activeTab === "Tools" && (
          <div id="extra-skills" className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {EXTRA_SKILLS.map(({ name, href }) => (
              <motion.div
                key={name}
                className="extra-skill p-5 rounded-2xl text-center glass-card border-sweep"
                style={{
                  border: "1px solid rgba(201,162,39,0.2)",
                  cursor: href ? "pointer" : "default",
                }}
                whileHover={{ scale: 1.07, borderColor: "var(--color-primary)", boxShadow: "0 8px 24px rgba(201,162,39,0.18)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <span className="font-semibold transition-colors duration-200 group-hover:text-yellow-400"
                          style={{ color: "var(--color-primary)" }}>
                      {name}
                    </span>
                    <span className="flex items-center gap-1 text-xs opacity-60 group-hover:opacity-100 transition-opacity"
                          style={{ color: "var(--color-text)" }}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Visit
                    </span>
                  </a>
                ) : (
                  <span className="font-semibold" style={{ color: "var(--color-text)" }}>{name}</span>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Extra pills (always visible below cards) ─────────────────── */}
        {activeTab !== "Tools" && (
          <div id="extra-skills" className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {EXTRA_SKILLS.map(({ name, href }) => (
              <motion.div
                key={name}
                className="extra-skill p-4 rounded-xl text-center glass-card border-sweep"
                style={{
                  border: "1px solid rgba(201,162,39,0.2)",
                  cursor: href ? "pointer" : "default",
                }}
                whileHover={{ scale: 1.06, borderColor: "var(--color-primary)", boxShadow: "0 8px 24px rgba(201,162,39,0.15)" }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 group"
                  >
                    <span className="text-sm font-semibold transition-colors duration-200"
                          style={{ color: "var(--color-primary)" }}>
                      {name}
                    </span>
                    <svg className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity"
                         fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         style={{ color: "var(--color-primary)" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  <span className="text-sm" style={{ color: "var(--color-text)" }}>{name}</span>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
