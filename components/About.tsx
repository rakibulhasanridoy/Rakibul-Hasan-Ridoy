"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TECH_STACK = [
  {
    label: "MongoDB",
    color: "#4DB33D",
    svg: (
      <svg className="w-10 h-10 mx-auto mb-2" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#4DB33D" />
        <path d="M12 6l-4 8h8l-4-8z" fill="#4DB33D" />
      </svg>
    ),
  },
  {
    label: "Express.js",
    color: "#aaaaaa",
    svg: (
      <svg className="w-10 h-10 mx-auto mb-2" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#aaaaaa" strokeWidth="2" fill="none" />
        <path d="M12 22V12M2 7l10 5 10-5" stroke="#aaaaaa" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "React",
    color: "#61DAFB",
    svg: (
      <svg className="w-10 h-10 mx-auto mb-2" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    label: "Node.js",
    color: "#68A063",
    svg: (
      <svg className="w-10 h-10 mx-auto mb-2" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l-2 4h4l-2-4z" fill="#68A063" />
        <rect x="8" y="6" width="8" height="12" rx="1" fill="#68A063" />
        <path d="M10 18v4M14 18v4" stroke="#68A063" strokeWidth="2" />
      </svg>
    ),
  },
];

// Animated counter
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        let start = 0;
        const step = Math.ceil(target / 40);
        const interval = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(interval); }
          else setCount(start);
        }, 35);
      },
    });
    return () => trigger.kill();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLParagraphElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });

      tl.from(labelRef.current, { opacity: 0, x: -40, duration: 0.6, ease: "power3.out" })
        .from(headingRef.current, { opacity: 0, y: 50, duration: 0.85, ease: "power3.out" }, "-=0.3")
        .from(lineRef.current, { scaleX: 0, transformOrigin: "left", duration: 0.6, ease: "power3.out" }, "-=0.5")
        .from(textRef.current, { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" }, "-=0.35")
        .from(Array.from(statsRef.current?.children ?? []), {
          opacity: 0, y: 24, stagger: 0.12, duration: 0.6, ease: "power3.out",
        }, "-=0.4");

      gsap.from(cardRef.current, {
        opacity: 0, x: 80, rotation: -4, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 82%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 px-6 z-10 overflow-hidden">
      {/* Ambient blobs */}
      <div className="section-blob-left" />
      <div className="section-blob-right" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* ── Left panel ──────────────────────────────────────────── */}
          <div>
            <p ref={labelRef} className="text-sm tracking-[0.3em] uppercase mb-2 font-semibold"
               style={{ color: "var(--color-primary)" }}>
              About Me
            </p>

            <h2 ref={headingRef} className="font-display text-4xl font-bold mb-6"
                style={{ color: "var(--color-text)" }}>
              Passionate Developer &amp; Problem Solver
            </h2>

            <div ref={lineRef} className="gold-line w-16 mb-6" />

            <p ref={textRef} className="leading-relaxed mb-8"
               style={{ color: "var(--color-text)", opacity: 0.8 }}>
              I am a Frontend Developer dedicated to crafting highly interactive, pixel-perfect web experiences with React and Tailwind CSS. While my true passion lies on the client side—obsessing over sleek UI/UX layout principles and animations—I am deeply rooted in the MERN stack ecosystem. Having this full-stack context allows me to build beautiful, responsive interfaces that connect seamlessly with robust backend architectures.
            </p>

            {/* Animated stat counters */}
            <div ref={statsRef} className="flex gap-8 flex-wrap">
              {[
                { val: 50, suffix: "+", label: "Projects Completed" },
                { val: 3,  suffix: "+", label: "Years Experience"   },
                { val: 30, suffix: "+", label: "Happy Clients"       },
              ].map(({ val, suffix, label }) => (
                <div key={label} className="text-center">
                  <span
                    className="font-display text-3xl font-bold block"
                    style={{ color: "var(--color-primary)" }}
                  >
                    <AnimatedCounter target={val} suffix={suffix} />
                  </span>
                  <p className="text-sm mt-1" style={{ color: "var(--color-text)", opacity: 0.6 }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right panel — MERN stack card ───────────────────────── */}
          <div ref={cardRef} className="relative">
            <div
              className="absolute -inset-4 rounded-2xl opacity-20 blur-xl"
              style={{ background: "var(--color-primary)" }}
            />
            <div
              className="relative p-8 rounded-2xl glass-card border-sweep"
              style={{ border: "1px solid rgba(201,162,39,0.2)" }}
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "var(--color-primary)" }}
                />
                <span className="text-sm tracking-widest uppercase font-semibold"
                      style={{ color: "var(--color-primary)" }}>
                  MERN Stack
                </span>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {TECH_STACK.map(({ label, color, svg }) => (
                  <motion.div
                    key={label}
                    className="tech-icon text-center p-4 rounded-xl cursor-default"
                    style={{ background: "rgba(201,162,39,0.07)", border: "1px solid rgba(201,162,39,0.12)" }}
                    whileHover={{
                      y: -6,
                      borderColor: color,
                      boxShadow: `0 8px 24px ${color}33`,
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 18 }}
                  >
                    {svg}
                    <span className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
